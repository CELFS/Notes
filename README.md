# Notes

个人静态笔记站。站点使用 Astro 构建，公开页面部署在：<https://celfs.github.io/Notes/>。

## 发布边界

`src/content/notes/` 是唯一的笔记发布目录。完整 Typora 笔记库不属于构建输入，也不应复制到仓库；只把已经确认可以公开的 Markdown 原文件或目录复制到这里。

发布目录中的结构会直接形成网站目录与路由：

- 文件夹自动形成侧边栏分组；
- `README.md` 或 `index.md` 自动成为所在目录的首页；
- 其他 Markdown 文件按照相对路径生成页面；
- 页面标题依次取可选的 `title`、文档首个标题、文件名；
- 无需添加 `sidebar_label`，也无需运行文档预处理脚本。

## 新增与同步公开笔记

同步脚本只读取本机清单中明确列出的 Markdown，并单向写入 `src/content/notes/`。本机清单 `.notes-publish.local.json` 已被 Git 忽略，可参考 `.notes-publish.example.json` 配置。

新增单篇笔记或整个目录时，可以使用相对于 Typora 根目录的路径，也可以把 Finder 中的文件或目录直接拖进终端。目录会递归展开成逐篇清单；以后目录中新建的笔记不会自动公开。

只预览将要新增的笔记，不修改清单也不复制：

```bash
pnpm notes:add:dry -- "/完整路径/笔记或目录"
```

确认预览结果后，加入本机发布清单并复制：

```bash
pnpm notes:add -- "/完整路径/笔记或目录" --write
```

只预览已选笔记的更新：

```bash
pnpm notes:update:dry
```

确认预览结果后执行更新：

```bash
pnpm notes:update -- --write
```

查看当前本机发布清单：

```bash
pnpm notes:list
```

`notes:add` 和 `notes:update` 在没有 `--write` 时同样只会预览。脚本自动忽略隐藏目录和 `.backup`，不会修改、移动、重命名或删除 Typora 源文件，也不会自动清理发布目录。

## 本地构建

项目要求 Node.js 22.12 或更高版本，并使用 pnpm。

```bash
pnpm install
pnpm check
pnpm build
```

需要本地预览时运行：

```bash
pnpm dev
```

开发服务运行后，可以一键检查全部公开笔记路由：

```bash
pnpm notes:check-routes
```

检查已经部署的站点时指定站点根地址：

```bash
pnpm notes:check-routes -- --base-url https://celfs.github.io/Notes/
```

脚本会核对 Markdown 与搜索索引的数量，并逐一请求首页和全部笔记页面。任一路由缺失、重复、越过站点根路径或返回非 2xx 时，命令都会失败并列出具体地址。

## 图床域名

复制 `.env.example` 为 `.env`，配置旧地址和当前公开图床地址：

```dotenv
IMAGE_SOURCE_ORIGINS=http://img.celfs.site,https://img.celfs.site
PUBLIC_IMAGE_ORIGIN=https://img.example.com
```

构建时只会改写匹配源地址的 Markdown 图片和 HTML `<img>` 输出，不会修改 Markdown 文件。其他外部图片地址保持不变。

GitHub Pages 使用仓库的 Actions variables 读取同名配置。切换域名时更新 `PUBLIC_IMAGE_ORIGIN` 即可；PicGo 仍应同步更新上传域名，确保以后写入 Typora 的新图片地址正确。

## 部署

推送到 `main` 后，GitHub Actions 会构建静态文件并通过 Pages Artifact 发布，不再维护 `gh-pages` 分支。仓库的 Pages Source 需要设置为 **GitHub Actions**。
