-- Codex：“先阅读 code/PROJECT_CONTEXT.md，再处理任务。”

# VermilionVoid 项目上下文

> 面向 Codex、其他 AI 编程助手和新贡献者的快速背景说明。开始修改前先阅读本文件和仓库根目录的 `README.md`；若文档与代码或依赖清单冲突，以实际代码、`package.json` 和 lockfile 为准。

## 1. 项目目标

VermilionVoid 是时歌的个人静态博客，线上站点为 <https://www.lapis.cafe>。项目不仅发布普通文章，还包含：

- 碎碎念（thoughts）
- 读书、论文和漫画书架
- 学习追踪（studies）
- 加密文章与“工作”聚合页
- 自托管评论、点赞和访问统计
- 从飞书、flomo、腾讯云 COS 等外部来源同步内容的自动化链路

核心原则是：公开站点保持纯静态输出；需要写入的评论等能力由独立 Cloudflare Worker 提供。

## 2. 系统边界

```text
浏览器
├─ Vercel 上的 Astro 静态站点
│  ├─ Astro 页面与布局
│  ├─ React islands / Radix UI / Tailwind CSS
│  ├─ Markdown / MDX 内容
│  └─ Pagefind 构建时搜索索引
└─ cwd-widget
   └─ cwd-api（Cloudflare Worker）
      ├─ D1：评论、点赞、访问统计、配置
      ├─ KV：会话和失败计数
      └─ SMTP / Telegram：通知

外部内容源
├─ 飞书多维表 → 书、论文、漫画 JSON
├─ flomo → thoughts
└─ 腾讯云 COS → studies 等内容
```

仓库实际包含三个相互独立的 Node/pnpm 边界：

1. **仓库根目录**：Astro 静态站点与内容同步脚本。
2. **`cwd-api/`**：评论系统 Cloudflare Worker，有独立的 `package.json` 和 `pnpm-lock.yaml`，不属于根 workspace。
3. **`sync-trigger/`**：定时触发 GitHub Actions 的 Cloudflare Worker，也有自己的包配置。

不要在某个子项目中顺手升级或安装另一个子项目的依赖。

## 3. 当前技术栈

- Astro，`output: "static"`，路由统一保留尾斜杠
- React 19 islands
- Tailwind CSS 4 + Radix UI
- TypeScript strict 配置，`@/*` 指向 `src/*`
- Markdown / MDX、remark、rehype、KaTeX、Expressive Code
- Pagefind 构建时索引
- Vercel 托管静态站点
- Hono + Cloudflare Workers、D1、KV（评论后端）
- pnpm 包管理器

根 `package.json` 当前声明的 Astro 版本高于 `README.md` 中的历史描述。判断版本兼容性时，以 `package.json` 和 `pnpm-lock.yaml` 为准。

## 4. 目录职责

| 路径 | 职责 |
|---|---|
| `src/pages/` | Astro 文件路由入口；包括首页、文章、时间线、书架、学习追踪、碎碎念、RSS 等 |
| `src/layouts/BaseLayout.astro` | 全站页面骨架 |
| `src/components/` | Astro/React 业务组件 |
| `src/components/ui/` | 可复用的基础 UI 组件 |
| `src/content/config.ts` | 内容集合 schema，是 frontmatter 的权威定义 |
| `src/content/posts/` | 正式文章；支持 Markdown/MDX 和子目录 |
| `src/content/thoughts/` | 碎碎念，通常由同步脚本生成 |
| `src/content/studies/` | 学习追踪，通常由同步脚本生成 |
| `src/data/` | 个人资料、友链、免责声明等站点数据 |
| `src/lib/`、`src/hooks/` | 查询、转换和前端支撑逻辑 |
| `src/plugins/` | 自定义 remark、rehype、Expressive Code 插件 |
| `src/styles/` | 全局样式与文章排版 |
| `public/` | 原样发布的静态资源，以及同步生成的书架 JSON/图片 |
| `scripts/` | flomo、COS、飞书、komiic 等内容同步脚本 |
| `.github/workflows/` | 内容同步的定时与手动工作流 |
| `cwd-api/` | 独立评论后端 |
| `sync-trigger/` | 独立的定时触发 Worker |
| `dist/`、`.astro/` | 生成物，不手工修改 |

## 5. 内容模型

### posts

正式文章放在 `src/content/posts/`。常用 frontmatter：

```yaml
title: 文章标题
published: 2026-08-17
updated: 2026-08-18
description: 摘要
image: /images/cover.webp
tags: [Astro, 前端]
category: TechnicalTutorials
pinned: false
draft: false
```

- 新文章使用 `posts`；`articles` 是早期结构，不再新增内容。
- `draft: true` 的文章不进入正式构建。
- 加密文章使用 `encrypted: true` 和 `password`；标题、日期和手写摘要仍可能公开。
- `disclaimer` 应引用 `src/data/disclaimers.ts` 中的预设文案。

### thoughts

只要求 `published`，`title` 可选。通常由同步流程维护，不应在不了解同步来源时批量手改。

### studies

要求 `title`、`started` 和 `status`。`status` 只能是：`在读`、`沉淀中`、`暂搁`、`已结`。URL 由内容条目的相对路径/`entry.id` 决定，不依赖 frontmatter 中的 `slug`。

## 6. 关键实现入口

- 修改页面或路由：从 `src/pages/` 开始，向布局和组件追踪。
- 修改站点外观：优先查看 `src/styles/`、`src/components/` 和 `astro.config.mjs`。
- 修改文章读取/排序：查看 `src/lib/posts.ts` 和 `src/content/config.ts`。
- 修改碎碎念或学习追踪：查看对应页面、`src/lib/thoughts.ts`、`src/lib/studies.ts` 以及同步脚本。
- 修改评论前端接入：`src/components/Comments.astro`。
- 修改评论接口：`cwd-api/src/index.ts`、`cwd-api/src/api/` 和 `cwd-api/src/utils/`。
- 修改同步行为：先读 `docs/thoughts-sync.md`、相关 `scripts/` 和 `.github/workflows/`，确认数据源与生成落点。

## 7. 不可破坏的安全约束

评论系统是本项目风险最高的部分，修改时必须保持以下不变量：

1. `PUBLIC_CWD_API_BASE_URL` 留空时，评论区不应渲染；不要把陌生线上评论 API 写进示例配置。
2. `post_slug` 是评论归属标识，值为页面完整 URL（origin + pathname）。
3. 评论、访问统计和页面点赞等写接口必须校验 `post_slug` 域名白名单；相关逻辑在 `cwd-api/src/utils/allowedOrigin.ts`。
4. 不要建议把 `localhost` 或 `127.0.0.1` 加入生产白名单。
5. `ADMIN_NAME`、`ADMIN_PASSWORD` 等凭据必须通过 Cloudflare secrets 配置，不能提交到仓库或写进普通明文变量。
6. SMTP 密码会以可还原形式存储，不得复用其他系统密码，也不得在日志、示例或导出展示中泄露。
7. 任何真实 API key、token、数据库 ID、邮箱凭据和个人隐私都不得写入代码、文档或测试样例。
8. 操作远程 D1 时必须明确使用 `--remote`；省略该参数会落到本地模拟数据。

## 8. 同步数据约束

- `public/data/books.json`、`papers.json`、`comics.json` 以及对应图片由同步流程维护。
- `src/content/thoughts/`、`src/content/studies/` 可能被自动同步覆盖。
- 写飞书多维表必须使用支持 `user_access_token` 的 `lark-cli`；Python + tenant token 会遇到权限错误 91403。
- komiic 同步只能在本地运行，GitHub Actions 出口 IP 会被 Cloudflare 拦截。
- 修改生成数据前，先确认用户要改的是数据源、同步脚本还是一次性的生成结果。

## 9. 开发与验证命令

### 根站点

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

- `pnpm check`：Astro 类型和内容校验。
- `pnpm build`：生成 `dist/`，随后由 Pagefind 建立搜索索引。
- 项目没有根级单元测试框架；涉及页面或样式的改动还需要浏览器检查。

### 评论后端

```bash
cd cwd-api
pnpm install --ignore-workspace
pnpm dev
pnpm test
pnpm cf-typegen
```

部署和远程数据操作会影响外部系统，只有在用户明确要求时执行。

### 同步触发 Worker

```bash
cd sync-trigger
pnpm install
pnpm dev
pnpm cf-typegen
```

## 10. 编码与修改规范

- Astro、TypeScript、TSX 使用 2 空格缩进；没有统一 formatter，遵循相邻文件风格。
- 组件文件同时存在 `PascalCase` 和 `kebab-case`，新增文件跟随所在目录惯例。
- 优先复用现有 UI 组件、样式变量和工具函数，避免引入第二套设计体系。
- 保持静态站点边界；除非需求明确，不要把页面改为依赖常驻服务端渲染。
- 修改内容 schema 时，同步检查所有读取逻辑、动态路由、RSS 和现有 Markdown 数据。
- 修改 URL 规则时，同步检查 sitemap、RSS、canonical、Pagefind 和评论 `post_slug`。
- 不直接编辑 `dist/`、`.astro/`、`node_modules/` 等生成目录。
- 不覆盖用户未提交的改动；开始工作前查看 `git status`，只改任务相关文件。
- 不随意升级依赖或重写 lockfile；依赖变化必须与任务直接相关。

## 11. AI 执行任务时的推荐流程

1. 阅读本文件、根 `README.md`、相关配置和目标代码。
2. 用搜索定位真实调用链，不根据文件名猜测行为。
3. 明确改动属于静态站点、评论后端还是同步系统。
4. 只修改完成任务所需的最小范围，并保留现有行为与用户改动。
5. 运行与改动范围匹配的检查；至少报告已运行和未运行的验证。
6. 若改动影响架构、安全约束、命令或数据来源，同步更新本上下文。

## 12. 信息优先级

遇到矛盾时按以下顺序判断：

1. 用户当前明确要求
2. 实际代码与配置
3. `package.json` / lockfile / 内容 schema
4. 本项目上下文
5. 根 `README.md` 和其他说明文档

不确定外部服务现状、线上配置或密钥时，不猜测，也不自动部署；先通过只读方式核实，必要时询问用户。
