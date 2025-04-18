# Docusaurus 项目部署与迁移指南

## 基本命令

[INFO] 在 Docusaurus 项目目录中，可以运行以下命令：

  `pnpm start`
    启动开发服务器，用于本地开发和预览。

  `pnpm build`
    将网站打包为生产环境的静态文件。

  `pnpm serve`
    在本地提供已构建网站的服务。

  `pnpm deploy`
    将网站发布到 GitHub Pages。

## 项目迁移步骤

1. 将 notes-new 项目移至根目录：

   ```powershell
   # 复制核心配置文件到根目录
   Copy-Item -Path "notes-new\docusaurus.config.ts" -Destination "."
   Copy-Item -Path "notes-new\package.json" -Destination "."
   Copy-Item -Path "notes-new\tsconfig.json" -Destination "."
   Copy-Item -Path "notes-new\sidebars.ts" -Destination "."
   Copy-Item -Path "notes-new\babel.config.js" -Destination "."
   Copy-Item -Path "notes-new\pnpm-lock.yaml" -Destination "."
   
   # 复制项目目录
   Copy-Item -Path "notes-new\src" -Destination "." -Recurse
   Copy-Item -Path "notes-new\static" -Destination "." -Recurse
   Copy-Item -Path "notes-new\.github" -Destination "." -Recurse -Force
   ```

2. 调整配置文件：
   - 修改 `docusaurus.config.ts` 确保路径正确
   - 确保 GitHub Pages 部署配置正确

3. 文档内容迁移：
   - 将现有 Markdown 文件按主题整理到 `/docs` 目录
   - 将图片资源整理到 `/static/img` 目录
   - 为文档添加 Docusaurus 所需的前置元数据

## 部署流程

### 本地测试

1. 安装依赖：

   ```powershell
   pnpm install
   ```

2. 启动开发服务器：

   ```powershell
   pnpm start
   ```

3. 在浏览器中访问：<http://localhost:3000> 预览网站

### 构建与部署

1. 构建网站：

   ```powershell
   pnpm build
   ```

2. 配置 GitHub Pages 自动部署：
   - 创建 `.github/workflows/deploy.yml` 文件
   - 设置正确的部署分支和目录

3. 推送更改到 GitHub：

   ```powershell
   git add .
   git commit -m "Configure Docusaurus site"
   git push
   ```

4. 在 GitHub 仓库设置中配置 Pages：
   - 设置 Source 为 `gh-pages` 分支
   - 保存设置等待自动部署

## MDX 编译错误解决方案

构建时遇到 `Could not parse expression with acorn` 错误，需要修复以下问题：

1. 特殊字符问题：
   - 文件名中包含特殊字符（如 `Neural_Networks：Learning.md` 中的全角冒号）
   - 重命名文件，使用英文字符，例如 `Neural_Networks_Learning.md`

2. Markdown 语法错误：
   - 检查错误文件中指定行的语法问题，主要检查：
     - 错误格式的代码块（缺少闭合符号）
     - 错误的 JSX/HTML 标签（未闭合标签）
     - 数学公式语法错误（`$` 和 `$$` 标记）
     - 特殊字符需要转义（如 `{`、`}`、`<`、`>`）

3. 批量修复命令：

   ```powershell
   # 重命名包含特殊字符的文件
   Rename-Item -Path "docs\10_ML_Andrew_Ng\05_1_Week_Neural_Networks：Learning.md" -NewName "05_1_Week_Neural_Networks_Learning.md"
   
   # 使用脚本自动修复常见问题
   # 需要创建一个脚本来扫描并修复Markdown文件中的问题
   ```

4. 临时解决方案：
   - 在 `docusaurus.config.ts` 中添加配置，禁用严格模式：

   ```typescript
   markdown: {
     mdx1Compat: {
       comments: true,
       admonitions: true,
       headingIds: true
     },
   }
   ```

   - 或者临时排除问题文件：

   ```typescript
   exclude: [
     '**/10_ML_Andrew_Ng/05_1_Week_Neural_Networks：Learning.md',
     '**/10_ML_Andrew_Ng/06_1_Week_Advice_for_Applying_Machine_Learning.md',
     // 其他问题文件...
   ]
   ```

## 项目需求与待办事项

- [ ] 整理文档目录结构，简化命名
- [ ] 将原 docsify 站点的文件移至 `deprecated` 目录
- [ ] 添加主题切换功能（明/暗模式）
- [ ] 配置数学公式支持（KaTeX）
- [ ] 配置代码高亮和复制功能
- [ ] 自定义样式以匹配原有网站风格
- [ ] 设置多级侧边栏导航
- [ ] 优化图片加载和显示
- [ ] 添加搜索功能
- [ ] 完善文档元数据和标签
- [ ] 修复 MDX 编译错误，使构建成功

## 特别注意事项

1. 图片路径需要更新：
   - 使用 `/img/category/image.png` 格式的路径
   - 或使用相对路径 `../../../static/img/image.png`

2. 内部链接格式需要调整：
   - 使用 `/docs/category/document` 格式
   - 移除 `.md` 扩展名

3. 部署前确认 `baseUrl` 配置正确：
   - 确保设置为 `/Notes/`（或适当的仓库名）

4. Markdown 语法兼容性问题：
   - Docusaurus 使用 MDX 解析器，比普通 Markdown 更严格
   - 需要确保所有文件符合 MDX 语法规范
   - 特别注意数学公式、代码块和特殊字符的使用

Happy building awesome websites!
