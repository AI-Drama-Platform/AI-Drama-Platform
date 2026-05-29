# AI 漫剧平台

这是 AI 漫剧创作平台的 MVP 骨架。当前阶段只搭建最小前后端基础，不实现业务功能：

- FastAPI 后端，包含 `GET /api/health`
- React + Vite + TypeScript 前端
- 预留 SQLite 配置
- 预留项目、角色、分镜、任务、Provider、文件存储等后续目录

当前阶段没有 AI 业务逻辑、模型调用或 ComfyUI 接入。

## 项目结构

```text
backend/
  app/
    api/routes/health.py
    core/config.py
    main.py
  tests/
frontend/
  src/
docs/
```

## 环境配置

本地开发前，先复制环境变量示例文件：

```powershell
Copy-Item .env.example .env
```

## 后端

创建并启用虚拟环境，然后安装依赖：

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
```

健康检查：

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
```

预期响应：

```json
{
  "status": "ok",
  "service": "AI Drama Platform",
  "environment": "local"
}
```

运行后端测试：

```powershell
cd backend
pytest
```

## 前端

安装依赖并启动 Vite：

```powershell
cd frontend
npm install
npm run dev
```

打开：

```text
http://127.0.0.1:5173
```

如果 PowerShell 拦截 `npm.ps1`，使用 `npm.cmd`：

```powershell
npm.cmd install
npm.cmd run dev
```

依赖安装完成后，也可以使用便捷启动脚本：

```powershell
.\scripts\dev-backend.cmd
.\scripts\dev-frontend.cmd
```

## 下一阶段

继续执行 `docs/tasks.md` 的阶段 1：

- 添加项目、角色、场景、分镜、素材的数据模型。
- 实现 CRUD API。
- 添加聚焦的测试。
