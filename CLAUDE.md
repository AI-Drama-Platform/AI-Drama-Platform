# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指导。

## 约束条例

- **所有说明、注释、总结、文档必须使用中文**，除非中文会导致编码乱码。代码中的变量名、函数名、类名等标识符不受此限制。

## 项目概述

AI 漫剧平台 (AI Drama Platform) — AI 驱动的漫画/短剧分镜制作工作台。当前处于第 0 阶段（骨架阶段）。项目采用 **Agent-first 混合架构**，由多智能体系统驱动制作流水线，前端提供人工审核控制台。

## 命令

### 后端 (Python 3.11+, FastAPI, pip)

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate   # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
uvicorn app.main:app --reload          # 运行于 :8000
pytest                                  # 运行所有测试
pytest tests/test_health.py -k "test_name"  # 运行单个测试
```

健康检查：`Invoke-RestMethod http://127.0.0.1:8000/api/health` (PowerShell) 或 `curl http://127.0.0.1:8000/api/health`

### 前端 (Node.js, React, Vite)

```bash
cd frontend
npm.cmd install         # 若 PowerShell 阻止 npm.ps1，请使用 npm.cmd
npm.cmd run dev         # 运行于 :5173，/api 代理到 :8000
npm.cmd run build       # tsc -b && vite build
```

### 开发脚本

- `scripts/dev-backend.cmd` — 启动 uvicorn
- `scripts/dev-frontend.cmd` — 启动 Vite 开发服务器

## 架构

### 后端目录结构 (`backend/app/`)

| 目录/文件 | 用途 |
|---|---|
| `main.py` | 应用工厂 (`create_app()`)、CORS 配置、路由注册 |
| `core/config.py` | Pydantic Settings，使用 `AI_DRAMA_` 环境变量前缀 |
| `api/routes/` | 路由模块（目前仅有 `health.py`） |
| `db/` | 数据库初始化（占位） |
| `models/` | SQLModel ORM 模型（占位） |
| `schemas/` | Pydantic 请求/响应模式（占位） |
| `services/` | 业务逻辑层（占位） |

`main.py` 中的应用工厂模式创建 FastAPI 实例，从配置中读取 CORS 设置，并注册路由。Settings 通过 `@lru_cache` 缓存，从 `.env` 文件读取。

### 前端目录结构 (`frontend/src/`)

| 文件 | 用途 |
|---|---|
| `main.tsx` | React 入口，使用 StrictMode |
| `App.tsx` | 主组件，健康检查 UI |
| `lib/api.ts` | API 客户端函数 |
| `styles.css` | 全局样式（尚未集成 Tailwind） |

Vite 开发服务器将 `/api` 请求代理到 `http://127.0.0.1:8000`（在 `vite.config.ts` 中配置）。

### 核心依赖

- **后端**：fastapi 0.115.6、sqlmodel 0.0.22、pydantic-settings 2.7.1、uvicorn 0.34.0
- **前端**：react、vite、typescript、lucide-react（图标）
- 尚未配置代码检查工具、格式化工具、Docker 或 CI/CD

### 配置说明

所有后端设置使用 `AI_DRAMA_` 环境变量前缀（例如 `AI_DRAMA_DATABASE_URL`）。详见 `backend/app/core/config.py` 中的可用字段。启动前请将 `.env.example` 复制为 `.env`。

## 规划架构（来自 docs/）

项目在 `docs/` 下有详细的架构文档，描述了两种架构方向。当前采用的是 **Agent-first** 方案（参见 `docs/decision/agent-first-vs-traditional-web.md`）：

- 11 个专业智能体（选题、故事、分镜、角色、图像提示词、视频提示词、ComfyUI 工作流、资产管理、审核、发布、回顾），各智能体的标准操作流程定义在 `docs/architecture/agent-sop-map.md`
- 所有 AI 生成的提供者抽象层（LLM、ComfyUI、视频、TTS）
- 异步任务队列 + SSE/轮询实现非阻塞生成
- 每个关键智能体步骤均需人工确认
- 工作流状态机由编排器管理步骤依赖关系

分阶段路线图见 `docs/roadmap/multi-agent-mvp-roadmap.md`（P0→P4）。
