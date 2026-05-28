# Codex 分阶段开发任务拆分

本文件用于后续让 Codex 分批执行。每个任务都应小步提交、可运行、可测试，不要一次生成完整大项目。

## 阶段 0：确认技术栈与项目骨架

目标：只创建最小可运行骨架，不写业务大模块。

任务：

1. 初始化后端 `FastAPI + SQLite + SQLModel/SQLAlchemy`。
2. 初始化前端 `React + Vite + TypeScript`。
3. 添加基础开发脚本。
4. 添加 `.env.example`。
5. 添加最小健康检查接口 `GET /api/health`。
6. 添加基础 README。

验收：

- 后端可启动。
- 前端可启动。
- 健康检查返回正常。
- 没有引入真实模型依赖。

## 阶段 1：核心数据模型与 CRUD

目标：先把“项目、角色、分镜、素材”的业务骨架跑通。

任务：

1. 建立表：`projects`、`characters`、`scenes`、`shots`、`assets`。
2. 实现项目 CRUD。
3. 实现角色 CRUD。
4. 实现分镜 CRUD 与排序。
5. 实现素材元数据 CRUD。
6. 添加单元/集成测试。

验收：

- 可用 API 创建项目、角色、分镜。
- 分镜顺序可调整。
- 测试覆盖主要 CRUD。

## 阶段 2：本地文件存储与上传

目标：让素材库真正能保存文件。

任务：

1. 实现 `LocalStorageService`。
2. 实现图片上传 API。
3. 文件校验 MIME、大小、路径穿越。
4. 静态文件预览接口。
5. 前端素材库基础页面。

验收：

- 上传图片后可预览。
- Asset 表记录文件元数据。
- 删除项目时暂不物理删除文件，只标记资源，避免误删。

## 阶段 3：任务系统与 Mock Provider

目标：跑通生成任务闭环。

任务：

1. 建立 `generation_tasks` 表。
2. 实现任务创建、查询、重试 API。
3. 实现内置后台 Worker。
4. 定义 Provider 接口。
5. 实现 `MockProvider.generate_image`。
6. 生成占位图并保存为 Asset。
7. 前端任务中心显示状态。

验收：

- 点击镜头“生成图片”后创建任务。
- 任务从 queued → running → succeeded。
- 镜头关联生成图片。
- 可模拟失败并重试。

## 阶段 4：项目工作台前端

目标：让创作者能完整编辑一个项目。

任务：

1. 项目列表页。
2. 项目概览页。
3. 角色管理页。
4. 分镜管理页。
5. 镜头详情页。
6. 生成按钮接入 Mock Provider。
7. 任务状态轮询或 SSE。

验收：

- 用户从 UI 创建项目、角色、分镜。
- 可生成并查看镜头图。
- 页面刷新后数据仍存在。

## 阶段 5：ComfyUI Provider

目标：接入真实生成引擎。

任务：

1. 建立 `providers`、`workflow_templates` 表。
2. Provider 设置页面。
3. ComfyUI 连通性测试。
4. Workflow JSON 模板保存。
5. 输入映射和输出映射配置。
6. 调用 ComfyUI `/prompt` 并获取产物。
7. 错误处理和超时重试。

验收：

- 未配置 ComfyUI 时 Mock 可继续使用。
- 配置正确 ComfyUI 时能生成低分辨率镜头图。
- 失败信息可读，不吞错误。

## 阶段 6：剧本结构化与导出

目标：完善从文本到分镜、从项目到交付物。

任务：

1. 新增 `scripts` 表。
2. 实现剧本文本保存。
3. 先用 Mock 结构化生成角色/场景/分镜。
4. 预留 LLM Provider 接口。
5. 导出 Markdown 分镜表。
6. 导出项目 JSON。
7. 导出镜头图 ZIP。

验收：

- 输入故事后可生成初始角色和分镜草案。
- 导出文件包含项目、角色、分镜、素材信息。

## 阶段 7：质量与可维护性

目标：把 MVP 做到可以继续迭代。

任务：

1. 补充端到端测试。
2. 增加错误码规范。
3. 增加日志和任务诊断信息。
4. 完善 README 本地运行说明。
5. 增加示例 ComfyUI workflow 模板说明。
6. 清理 UI 交互和空状态。

验收：

- 新开发者能按 README 跑起来。
- Mock 流程端到端稳定。
- ComfyUI Provider 有清晰调试文档。

## 推荐下一步给 Codex 的开发提示词

```text
请基于 docs/research.md、docs/mvp-plan.md、docs/architecture.md、docs/tasks.md，开始执行阶段 0。

要求：
1. 只初始化最小项目骨架，不写 AI 业务功能。
2. 后端使用 FastAPI + SQLite，前端使用 React + Vite + TypeScript。
3. 添加 GET /api/health。
4. 添加 .env.example 和 README 本地运行说明。
5. 保持代码结构便于后续添加 projects、characters、shots、tasks、providers。
6. 完成后运行最小验证命令，并说明如何启动前后端。
```

## 后续任务提示词模板

### 阶段 1 提示词

```text
请继续执行 docs/tasks.md 的阶段 1：核心数据模型与 CRUD。
只实现 projects、characters、scenes、shots、assets 的数据库模型和 API，不接入 AI。
请添加必要测试，并保持 API 命名与 docs/architecture.md 一致。
```

### 阶段 3 提示词

```text
请继续执行 docs/tasks.md 的阶段 3：任务系统与 Mock Provider。
实现 generation_tasks、Provider 接口、MockProvider.generate_image、任务重试和状态查询。
要求 Mock 生成也必须保存 Asset，并能被镜头选中。
```

### 阶段 5 提示词

```text
请继续执行 docs/tasks.md 的阶段 5：ComfyUI Provider。
先实现 Provider 配置、连通性测试、workflow_templates 表和最小调用链。
不要内置大模型或下载模型，只通过用户配置的 ComfyUI base_url 调用。
```
