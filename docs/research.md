# AI 漫剧平台 MVP 开源项目调研

调研时间：2026-05-28  
调研范围：GitHub、Gitee/Gitee AI、开源社区页面  
目标：筛选可学习的 AI 漫剧、短剧、漫画编辑、ComfyUI 工作流、AIGC 内容生产平台，为 MVP 架构设计提供依据。

## 1. 调研结论摘要

AI 漫剧平台不应从“单模型 Demo”开始，而应从“内容生产工作台”切入。最小闭环是：故事/剧本输入 → 角色与世界观 → 分镜脚本 → 镜头图 → 镜头视频/动效 → 字幕/配音 → 成片导出。开源项目里很少有一个项目完全覆盖“漫剧”这个中文内容形态，但可以从三类项目拼出可靠方案：

- 漫画/分镜生成：AI Comic Factory、StoryDiffusion、PanelPachi、Koharu。
- 短剧/短视频自动化：Huobao Drama、Toonflow、Pixelle-Video、OpenShorts、MoneyPrinterTurbo、NarratoAI、Short-video-factory。
- 生成引擎/工作流 Provider：ComfyUI、Pixelle-MCP、Krita AI Diffusion、Jaaz。

建议 MVP 学习对象排序：

1. `chatfire-AI/huobao-drama`：最接近“Web 版 AI 短剧/漫剧生产平台”，技术栈轻、流程完整。
2. `HBAI-Ltd/Toonflow-app`：更像“AI 漫剧/短剧创作工作台”，画布、Agent、任务、素材管理值得学习，但范围偏大。
3. `Comfy-Org/ComfyUI`：不是业务平台，但它是图像/视频生成工作流 Provider 的事实标准之一，MVP 应优先兼容它。

`AI Comic Factory` 和 `StoryDiffusion` 对“漫画分格、角色一致性”非常有启发，但前者已归档且本地运行链路不完整，后者偏研究实现而非完整产品。适合学设计，不适合照搬架构。

## 2. 候选项目评分表

评分说明：匹配度、代码质量、学习价值为 1-5 分；Star 与更新时间为 2026-05-28 调研时页面显示的约数或最新 Release/更新日志信息。

| 项目 | 方向 | Star | 最近更新/活跃 | 技术栈 | 本地运行 | Docker | 前端 | 后端 | AI 链路 | ComfyUI/模型 API | 许可证 | 匹配度 | 代码质量 | 学习价值 | 主要风险 |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- |
| [Huobao Drama](https://github.com/chatfire-AI/huobao-drama) | AI 短剧/漫剧平台 | 12.5k | v2.0 更新日志 2026-04 | Nuxt 3、Vue 3、TypeScript、Hono、Drizzle、SQLite、Mastra、FFmpeg | 是 | 是，单镜像/Compose | 是 | 是 | 剧本解析、角色、分镜、图生视频、TTS、合成 | 多厂商媒体 Adapter，OpenAI 兼容、本地 Ollama | 页面未明确标准许可证，需核验仓库 LICENSE | 5 | 4 | 5 | 业务很接近但已有商业站点，许可证和品牌边界需谨慎 |
| [Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) / [Gitee](https://gitee.com/HBAI-Ltd/Toonflow-app) | AI 短剧/漫剧工作台 | GitHub 9k，Gitee 418 | v1.1.7，2026-05-01 | TypeScript、Express 5、SQLite、Electron、Socket.IO、Vercel AI SDK、ONNX | 是 | 是 | 是，内置 Web/Electron | 是 | 编剧 Agent、分镜、素材、视频、任务、记忆 | 多模型供应商系统 | Apache-2.0 + 补充商业协议 | 5 | 3 | 5 | 功能过大，补充商业协议限制分发，代码语言比例显示前端构建产物较多 |
| [ComfyUI](https://github.com/Comfy-Org/ComfyUI) | AIGC 节点工作流/后端 | 115k | v0.22.0，2026-05-20 | Python、PyTorch、节点图、独立前端 | 是 | 社区/第三方常见，官方仓库以本地安装为主 | 是 | 是 | 图像、视频、3D、音频、多模型工作流 | 原生工作流/API | GPL-3.0 | 4 | 5 | 5 | GPL 传染性；节点生态更新快，工作流兼容性风险 |
| [AI Comic Factory](https://github.com/jbilcke-hf/ai-comic-factory) | AI 漫画分格生成 | 1.3k | 2025-10-31 已归档 | Next.js、TypeScript、Tailwind、LLM + SDXL Provider | 部分可行 | 有 Dockerfile/HF Space | 是 | Next.js API/服务端逻辑 | Prompt → 分镜 JSON → SDXL 面板图 | HF、OpenAI、Groq、Anthropic、Replicate/VideoChain | Apache-2.0 | 4 | 3 | 5 | 已归档；README 明确不是开箱即用单体，本地跑通成本高 |
| [StoryDiffusion](https://github.com/HVision-NKU/StoryDiffusion) | 角色一致性漫画/视频生成 | 6.4k | NeurIPS 2024，87 commits | Python、Gradio、Diffusers、SDXL/SD1.5 | 是，偏研究环境 | 无标准 Compose，含 Cog/Replicate 文件 | Gradio | Python 推理 | 多 Prompt 一致角色图像 + 图生视频 | 可接入 SD/SDXL，非平台化 API | Apache-2.0 | 4 | 4 | 5 | 更像算法实现，不含生产级任务/数据/素材管理 |
| [Pixelle-Video](https://github.com/AIDC-AI/Pixelle-Video) | AI 全自动短视频引擎 | 20.1k | v0.1.15，2026-01-27 | Python、Streamlit、FFmpeg、ComfyUI/RunningHub | 是 | 未见主流程 Compose，支持整合包/源码 | 是，Streamlit | Python 模块 | 文案、配图/视频、TTS、BGM、合成 | ComfyUI、RunningHub、LLM API | Apache-2.0 | 4 | 4 | 4 | 偏短视频而非漫剧；Streamlit 不适合长期产品化前端 |
| [OpenShorts](https://github.com/mutonby/openshorts) | 自托管 AI 视频平台 | 2.2k | 无 Release，页面活跃 | FastAPI、React、Vite、Tailwind、FFmpeg、S3 | 是 | 是，Docker Compose | 是 | 是 | 长视频切片、AI UGC、字幕、发布 | Gemini、fal.ai、ElevenLabs 等云 API | MIT | 3 | 4 | 4 | 依赖商业 API 和社媒发布；与“漫剧分镜”距离较远 |
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 一键短视频生成 | 61.7k | 547 commits，持续维护 | Python、Streamlit、FastAPI、MoviePy/FFmpeg | 是 | 是，含 GPU Compose | 是，Streamlit | 是，API 文档 | 主题/脚本、素材、TTS、字幕、BGM、合成 | 多 LLM Provider、素材/TTS 服务 | MIT | 3 | 4 | 4 | 目标是泛短视频，不解决角色/分镜一致性 |
| [NarratoAI](https://github.com/linyqh/NarratoAI) | AI 解说/剪辑 | 9.5k | 页面显示未来计划持续迭代 | Python、Streamlit、MoviePy | 是 | 是，Compose | 是，Streamlit | 弱后端 | 视频理解、解说、剪辑、字幕 | Gemini/LLM 等 | 页面显示 View license，需核验 | 3 | 3 | 3 | 更多是解说/混剪，不是从零生成漫剧 |
| [Koharu](https://github.com/mayocream/koharu) | AI 漫画翻译/编辑 | 4.5k | v0.59.2，2026-05-23 | Rust、Tauri、TypeScript、candle、llama.cpp | 是 | 是，Headless Docker | 是，桌面/网页 Headless | 本地 HTTP/MCP | 检测、OCR、修补、翻译、文字渲染、PSD 导出 | 本地/远程 LLM、OpenAI 兼容 | GPL-3.0 | 3 | 5 | 5 | GPL；偏后期编辑/翻译，不是原创漫剧生成 |
| [PanelPachi](https://github.com/KaKasher/PanelPachi) | AI 漫画编辑器 | 25 | 40 commits | TypeScript、Python、Docker Compose | 是 | 是 | 是 | 是 | OCR、DeepL 翻译、Inpainting、文字回填 | manga-ocr、DeepL、修补模型 | 未见明确许可证 | 3 | 2 | 3 | Star 少、许可证不清、功能较窄 |
| [Jaaz](https://github.com/11cafe/jaaz) | 本地优先 AI 设计 Agent/画布 | 6.2k | Release 1.0.30，2025-08-09 | React/Vite、Python、Agent、ComfyUI/Ollama | 是 | 未见清晰 Compose | 是 | 是 | 无限画布、故事板、图像生成/编辑 | ComfyUI、本地/云模型 | View license，需核验 | 4 | 3 | 4 | 产品边界偏设计工具；许可证需核验；手动安装链路较散 |
| [Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) | ComfyUI + MCP + LLM AIGC 框架 | 1k | 481 commits，页面活跃 | Python、Chainlit、MCP、ComfyUI、RunningHub | 是 | 是，Compose | 是，Chainlit | 是 | 将 ComfyUI workflow 转成 MCP tool | 本地 ComfyUI、RunningHub、LLM | MIT | 4 | 4 | 4 | 更像底层连接层，不提供漫剧业务 UI |
| [Krita AI Diffusion](https://github.com/Acly/krita-ai-diffusion) | AI 图像编辑插件 | 10.1k | v1.50.0，2026-05-03 | Python、Krita 插件、ComfyUI | 是 | 主要是插件/托管安装，不是平台 Docker | Krita 插件 UI | ComfyUI 后端 | 局部生成、修补、扩图、ControlNet/IP-Adapter | ComfyUI | GPL-3.0 | 3 | 5 | 4 | 依赖 Krita 桌面生态；GPL；不是 Web 平台 |
| [Short-video-factory](https://github.com/YILS-LIN/short-video-factory) / Gitee AI | AI 短视频桌面工厂 | 4k | v1.2.2，2026-04-07 | TypeScript、Vue、Electron、better-sqlite3 | 是 | 不突出，偏桌面 Release | 是 | Electron 本地服务 | 文案、TTS、剪辑、字幕、批量 | OpenAI 兼容、EdgeTTS | AGPL-3.0 | 3 | 3 | 3 | AGPL；偏营销/泛内容短视频，缺少剧本/角色/分镜体系 |

## 3. Top 3 深度拆解

### 3.1 Huobao Drama

产品定位：面向短剧生产的一站式 Web 平台，强调“一句话/剧本到成片”。它比泛短视频工具更接近我们要做的 AI 漫剧平台，因为它显式包含剧本解析、角色设计、分镜制作、图生视频、TTS、整集导出。

核心用户流程：

1. 新建短剧/单集项目。
2. 输入小说、故事梗概或剧本。
3. AI Agent 提取角色、场景、分镜。
4. 为角色生成形象与音色，管理角色素材。
5. 为每个分镜生成镜头描述、镜头图、首尾帧。
6. 调用图生视频/文生视频服务生成单镜头视频。
7. TTS 生成配音，FFmpeg 合成字幕、音频、视频。
8. 拼接整集并导出。

页面结构：项目/单集工作台、角色管理、分镜制作、配音/视频生成、设置、素材库。README 显示前端为 Nuxt 3 SPA，开发模式前端 `3013`，后端 API `5679/api/v1`，也支持单服务模式。

前端技术栈：Nuxt 3、Vue 3、TypeScript、文件路由、纯 CSS/CSS Variables、Lucide Vue。

后端技术栈：Node.js 20、Hono、Drizzle ORM、better-sqlite3、Mastra AI Agents、AI SDK、FFmpeg/fluent-ffmpeg、Sharp。

数据模型：README 暴露 SQLite、本地存储、自动建表。可推断核心实体包括 project、episode/chapter、character、scene、shot/storyboard、asset、generation_task、voice/audio、settings/provider_config。

AI 生成流程：`script_rewriter` 将小说改为剧本；`extractor` 提取角色/场景；`storyboard_breaker` 拆分分镜；`voice_assigner` 分配音色；`grid_prompt_generator` 生成角色/场景/宫格提示词。媒体 Provider 支持图片、视频、TTS 多厂商。

任务队列/异步任务设计：README 提到任务进度追踪，但未展示独立队列服务。MVP 可采用数据库任务表 + 后端 Worker + 轮询/SSE，先不引入 Redis。

文件存储设计：默认 `data/storage`，`base_url` 由后端 `/static` 暴露。Docker 使用 volume 挂载 `data/` 持久化。

部署方式：开发模式前后端分离；生产可构建前端后由后端单端口提供；Docker Compose/单镜像；支持容器访问宿主机 Ollama。

值得模仿：轻量 SQLite、单端口 Docker、Agent 分工、媒体 Adapter、多厂商配置、角色/分镜/视频的完整数据链。

不适合照搬：功能已接近商业产品；许可证未在页面上清晰展示；Mastra/Skill 体系可学思想但不要复制提示词和业务结构。

### 3.2 Toonflow-app

产品定位：AI 短剧/漫剧桌面与 Web 工作台，将小说、剧本转为动画短剧。它的亮点是无限画布、Agent 记忆、可编程供应商、章节事件图谱，比 Huobao Drama 更“创作工具化”。

核心用户流程：

1. 登录本地系统。
2. 配置文本/图像/视频模型供应商。
3. 新建项目，导入原著或剧本。
4. 提取章节事件，生成故事骨架和改编策略。
5. 用 ScriptAgent 生成结构化剧本。
6. 进入 ProductionAgent，在画布中组织分镜、角色、素材、视频节点。
7. 节点化精调镜头图并回流工作台。
8. 视频拼接与导出。

页面结构：登录、项目、设置中心、ScriptAgent、ProductionAgent、无限画布、素材/角色/分镜/任务管理、模型选择、系统调试。README 的路由结构显示 `project`、`script`、`production`、`cornerScape`、`assets`、`task`、`setting` 等模块。

前端技术栈：Electron 内置前端，相关前端仓库为 Vue/Vite；本仓库包含 Web 构建产物。

后端技术栈：Node.js 23.11+、TypeScript、Express 5、SQLite、better-sqlite3/knex、Socket.IO、Vercel AI SDK、Sharp、ONNX 本地推理。

数据模型：README 展示 `data/oss`、`data/models`、`data/skills`、`src/routes/project`、`novel`、`script`、`production`、`task` 等结构。可学习其按“项目/小说/脚本/生产/素材/任务”分区。

AI 生成流程：三层 Agent 协作、ScriptAgent 与 ProductionAgent、Skill 文件化提示词、章节事件图谱、Agent 记忆、供应商系统。适合学习“长文本 IP 改编”和“多轮创作上下文”。

任务队列/异步任务设计：包含 `task` 路由和 Socket.IO 实时通信。MVP 可学习“任务状态 + WebSocket/SSE 推送”的体验，但实现先用单 Worker。

文件存储设计：`data/oss` 作为对象存储，`OSSURL` 控制静态资源访问。适合 MVP 采用“本地对象存储抽象”，未来扩展 S3/R2/OSS。

部署方式：Electron 桌面、Docker、本地 Node 服务、PM2 云端部署。Gitee 镜像存在，国内开发可访问性更好。

值得模仿：创作工作台视角、画布/节点组织、项目运行时数据目录、任务实时反馈、供应商可配置思想。

不适合照搬：范围过大；Apache-2.0 外有补充商业协议；默认账号密码和内置前端产物不适合作为我们代码结构参考；Node 23+ 要求对 MVP 团队不友好。

### 3.3 ComfyUI

产品定位：节点式多模态生成引擎，不是业务平台。它提供图像、视频、3D、音频等工作流编排能力，是 AI 漫剧平台生成后端的理想可选 Provider。

核心用户流程：

1. 用户或管理员在 ComfyUI 中准备工作流。
2. 导出 workflow JSON/API payload。
3. 平台将角色图、分镜 prompt、参考图、尺寸、seed 注入工作流。
4. 调用 ComfyUI `/prompt` 或 WebSocket 监听任务。
5. 获取输出图片/视频，入库为 Asset。

页面结构：ComfyUI 自带节点编辑器，MVP 平台不应复制节点编辑器，只需要“Provider 配置页 + 工作流模板管理 + 生成任务日志”。

前端技术栈：ComfyUI 已迁移新前端，业务平台只需管理少量配置与结果预览。

后端技术栈：Python、PyTorch、节点扩展生态、模型目录、workflow JSON、WebSocket。业务平台后端通过 HTTP/WebSocket 调用。

数据模型：ComfyUI 自己不管理业务数据；MVP 需保存 provider、workflow_template、generation_task、asset、shot 与 workflow input/output 映射。

AI 生成流程：适合镜头图、角色一致性参考图、首尾帧、局部修图、图生视频。视频生成可依赖 WanVideo、AnimateDiff、LTX、HunyuanVideo、Kling/RunningHub 等节点或云端封装。

任务队列/异步任务设计：ComfyUI 自身有 prompt queue；平台侧仍需要业务任务表，负责状态、重试、取消、产物归档。

文件存储设计：ComfyUI 输出目录只是临时生成目录，业务平台应下载/拷贝到自己的 `storage/assets`，不要把 ComfyUI 输出目录当业务存储。

部署方式：本机 GPU、云 GPU、独立 ComfyUI 服务、容器化社区镜像。MVP 可假设 ComfyUI 独立运行，通过 URL 配置接入。

值得模仿：节点化工作流、workflow JSON 模板、可插拔模型生态、API 队列。

不适合直接照搬：GPL-3.0 许可证不适合嵌入复制代码；节点 UI 很复杂，MVP 不应重做；工作流兼容性随版本变化，需要模板版本管理。

## 4. 综合建议

AI 漫剧平台 MVP 应采用“业务平台 + Provider 插件”的架构，而不是把模型、队列、画布、剪辑全部写在一个巨型应用里。第一版只实现：

- 项目、角色、分镜、镜头图、任务、素材的结构化管理。
- Mock Provider 用于无 GPU/无 API Key 的开发闭环。
- ComfyUI Provider 用于真实图像生成，视频 Provider 先预留接口。
- 导出先做“图文分镜 PDF/Markdown/JSON”，短视频合成后置到第二阶段。

最需要避开的坑：

- 不要一开始做无限画布和完整视频剪辑器。
- 不要把 ComfyUI 工作流 JSON 写死在业务代码里。
- 不要让前端直接持有模型 API Key。
- 不要依赖单一商业媒体 API。
- 不要使用 GPL/AGPL 项目的代码片段，除非未来项目许可证策略明确。

## 5. 主要来源

- Huobao Drama: https://github.com/chatfire-AI/huobao-drama
- Huobao Drama on Gitee AI: https://ai.gitee.com/apps/cd4a53e5-71b1-4fd2-9768-0ad1496cb7f1
- Toonflow-app: https://github.com/HBAI-Ltd/Toonflow-app
- Toonflow-app on Gitee: https://gitee.com/HBAI-Ltd/Toonflow-app
- ComfyUI: https://github.com/Comfy-Org/ComfyUI
- AI Comic Factory: https://github.com/jbilcke-hf/ai-comic-factory
- StoryDiffusion: https://github.com/HVision-NKU/StoryDiffusion
- Pixelle-Video: https://github.com/AIDC-AI/Pixelle-Video
- OpenShorts: https://github.com/mutonby/openshorts
- MoneyPrinterTurbo: https://github.com/harry0703/MoneyPrinterTurbo
- NarratoAI: https://github.com/linyqh/NarratoAI
- Koharu: https://github.com/mayocream/koharu
- PanelPachi: https://github.com/KaKasher/PanelPachi
- Jaaz: https://github.com/11cafe/jaaz
- Pixelle-MCP: https://github.com/AIDC-AI/Pixelle-MCP
- Krita AI Diffusion: https://github.com/Acly/krita-ai-diffusion
- Short-video-factory: https://github.com/YILS-LIN/short-video-factory
