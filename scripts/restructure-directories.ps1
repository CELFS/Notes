# 重构笔记网站目录结构
# �?docsify 结构转换�?Docusaurus 结构

# 1. 创建必要的目录结�?
Write-Host "正在创建新的目录结构..." -ForegroundColor Green

# 创建主要目录
$basePath = "D:\Notes"
$directories = @(
    "docs",
    "static", "static\img", "static\assets",
    "src", "src\css", "src\components",
    "deprecated", "deprecated\docsify", "deprecated\original_dirs"
)

# 文档分类目录
$docCategories = @(
    "javascript", "typescript", "vue", "css", "ajax", "es6", "node",
    "server", "database", "operating-system", "algorithm", "qt",
    "machine-learning", "reading-notes", "linux"
)

foreach ($dir in $directories) {
    $path = Join-Path -Path $basePath -ChildPath $dir
    if (-not (Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "  已创�? $path" -ForegroundColor Gray
    }
}

foreach ($category in $docCategories) {
    $path = Join-Path -Path $basePath -ChildPath "docs\$category"
    if (-not (Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "  已创建文档目�? $category" -ForegroundColor Gray
    }
    
    # 为每个分类创建图片目�?
    $imgPath = Join-Path -Path $basePath -ChildPath "static\img\$category"
    if (-not (Test-Path $imgPath)) {
        New-Item -Path $imgPath -ItemType Directory -Force | Out-Null
    }
}

# 2. 定义目录映射关系
$dirMapping = @{
    "docs\03_JS" = "docs\javascript"
    "docs\03_TS" = "docs\typescript"
    "docs\03_Vue3" = "docs\vue"
    "docs\03_CSS" = "docs\css"
    "docs\03_Ajax" = "docs\ajax"
    "docs\03_ES6" = "docs\es6"
    "docs\03_Node" = "docs\node"
    "docs\06_cpp_server" = "docs\server"
    "docs\06_TinyWebServer" = "docs\server\tiny-web-server"
    "docs\06_database_mysql" = "docs\database"
    "docs\06_introduction_to_operating_system" = "docs\operating-system"
    "docs\06_alg_thinking_of_code" = "docs\algorithm"
    "docs\06_qt" = "docs\qt"
    "docs\10_machine_learning" = "docs\machine-learning\basic"
    "docs\10_ML_Andrew_Ng" = "docs\machine-learning\andrew-ng"
    "docs\10_paddle_deep_learning" = "docs\machine-learning\paddle"
    "docs\10_pytroch_deep_learning" = "docs\machine-learning\pytorch"
    "docs\103_information_theory" = "docs\reading-notes\information-theory"
    "docs\103_wj_plenties" = "docs\reading-notes\wj-plenties"
    "docs\01_linux" = "docs\linux"
}

# 创建这些目录
foreach ($target in $dirMapping.Values) {
    $path = Join-Path -Path $basePath -ChildPath $target
    if (-not (Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "  已创建子目录: $target" -ForegroundColor Gray
    }
}

# 3. 移动文档文件
Write-Host "`n正在复制Markdown文件到新目录..." -ForegroundColor Green

foreach ($mapping in $dirMapping.GetEnumerator()) {
    $sourcePath = Join-Path -Path $basePath -ChildPath $mapping.Key
    $targetPath = Join-Path -Path $basePath -ChildPath $mapping.Value
    
    if (Test-Path $sourcePath) {
        # 复制所有Markdown文件
        $files = Get-ChildItem -Path $sourcePath -Filter "*.md" -File
        foreach ($file in $files) {
            $targetFile = Join-Path -Path $targetPath -ChildPath $file.Name
            Copy-Item -Path $file.FullName -Destination $targetFile -Force
            Write-Host "  已复�? $($file.Name) -> $($mapping.Value)" -ForegroundColor Gray
        }
        
        # 复制子目录中的Markdown文件
        $subDirs = Get-ChildItem -Path $sourcePath -Directory
        foreach ($dir in $subDirs) {
            $subTargetPath = Join-Path -Path $targetPath -ChildPath $dir.Name
            if (-not (Test-Path $subTargetPath)) {
                New-Item -Path $subTargetPath -ItemType Directory -Force | Out-Null
            }
            
            $subFiles = Get-ChildItem -Path $dir.FullName -Filter "*.md" -File
            foreach ($file in $subFiles) {
                $subTargetFile = Join-Path -Path $subTargetPath -ChildPath $file.Name
                Copy-Item -Path $file.FullName -Destination $subTargetFile -Force
                Write-Host "  已复�? $($dir.Name)\$($file.Name) -> $($mapping.Value)\$($dir.Name)" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "  警告: 源目录不存在 - $($mapping.Key)" -ForegroundColor Yellow
    }
}

# 4. 收集和移动图片文�?
Write-Host "`n正在收集图片文件..." -ForegroundColor Green

$imageExtensions = @("*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg", "*.webp", "*.ico")

foreach ($mapping in $dirMapping.GetEnumerator()) {
    $sourcePath = Join-Path -Path $basePath -ChildPath $mapping.Key
    $category = ($mapping.Value -split '\\')[-1]
    $targetImgPath = Join-Path -Path $basePath -ChildPath "static\img\$category"
    
    if (Test-Path $sourcePath) {
        foreach ($ext in $imageExtensions) {
            $imageFiles = Get-ChildItem -Path $sourcePath -Filter $ext -File -Recurse
            foreach ($img in $imageFiles) {
                # 保留子目录结�?
                $relativePath = $img.DirectoryName.Substring($sourcePath.Length)
                if ($relativePath.StartsWith('\')) { $relativePath = $relativePath.Substring(1) }
                
                $targetDir = Join-Path -Path $targetImgPath -ChildPath $relativePath
                if (-not (Test-Path $targetDir)) {
                    New-Item -Path $targetDir -ItemType Directory -Force | Out-Null
                }
                
                $targetImgFile = Join-Path -Path $targetDir -ChildPath $img.Name
                Copy-Item -Path $img.FullName -Destination $targetImgFile -Force
                Write-Host "  已移动图�? $($img.Name) -> static\img\$category\$relativePath" -ForegroundColor Gray
            }
        }
    }
}

# 5. 移动原有的docsify文件到deprecated目录
Write-Host "`n正在保存docsify文件到deprecated目录..." -ForegroundColor Green

$docsifyFiles = @(
    "index.html", "index_dark.html", "index_clear.html", 
    "_sidebar.md", "darklight-theme-diy.css", ".nojekyll"
)

foreach ($file in $docsifyFiles) {
    $sourcePath = Join-Path -Path $basePath -ChildPath "docs\$file"
    $targetPath = Join-Path -Path $basePath -ChildPath "deprecated\docsify\$file"
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $targetPath -Force
        Write-Host "  已保�? $file -> deprecated\docsify\" -ForegroundColor Gray
    }
}

# 6. 备份原始目录结构
Write-Host "`n正在备份原始目录结构..." -ForegroundColor Green

foreach ($source in $dirMapping.Keys) {
    $targetPath = Join-Path -Path $basePath -ChildPath "deprecated\original_dirs\$source"
    
    if (-not (Test-Path $targetPath)) {
        New-Item -Path $targetPath -ItemType Directory -Force | Out-Null
        Write-Host "  已备份目录结�? $source" -ForegroundColor Gray
    }
}

# 7. 添加README.md到根目录
$readmePath = Join-Path -Path $basePath -ChildPath "README.md"
$readmeContent = @"
# 编程内外笔记

这是一个使用Docusaurus构建的个人编程学习笔记网站�?

## 目录结构

- `/docs` - 文档内容
- `/src` - 自定义组件和样式
- `/static` - 静态资源（图片等）
- `/deprecated` - 原有的弃用文�?

## 本地开�?

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start
```

## 构建

```bash
# 构建生产版本
pnpm build
```
"@

Set-Content -Path $readmePath -Value $readmeContent

Write-Host "`n目录结构重构完成�? -ForegroundColor Green
Write-Host "下一�? 在项目根目录初始化Docusaurus" -ForegroundColor Cyan
