import os
import re
import argparse

# 解析命令行参数
parser = argparse.ArgumentParser(description='批量处理 Markdown 文件，添加 front matter')
parser.add_argument('--test_mode', action='store_true', help='测试模式，不实际修改文件')
args = parser.parse_args()

# 定位 docs 目录（相对于脚本位置的上一级目录中的 docs 文件夹）
script_path = os.path.dirname(os.path.abspath(__file__))
docs_path = os.path.join(os.path.dirname(script_path), 'docs')

# 统计信息
total_files = 0
processed_files = 0
skipped_files_with_front_matter = 0
skipped_files_no_title = 0

# 检查 docs 目录是否存在
if not os.path.isdir(docs_path):
    print(f"错误：找不到 docs 目录：{docs_path}")
    exit(1)

# 获取所有 .md 文件
md_files = []
for root, dirs, files in os.walk(docs_path):
    for file in files:
        if file.endswith('.md'):
            md_files.append(os.path.join(root, file))

total_files = len(md_files)
print(f"找到 {total_files} 个 Markdown 文件，开始处理...")

for file in md_files:
    # 读取文件内容
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查是否已有 front matter
    if re.match(r'^---[\s\S]*?---', content):
        print(f"已有 front matter，跳过: {file}")
        skipped_files_with_front_matter += 1
        continue

    # 提取第一个标题行
    match = re.search(r'^(#+\s+(.+?))$', content, re.MULTILINE)
    if match:
        title_line = match.group(1)
        title = match.group(2).strip()

        # 构建 front matter，给 sidebar_label 的值加上双引号
        front_matter = f'---\nsidebar_label: "{title}"\n---\n\n'

        # 添加 front matter 到文件内容
        new_content = front_matter + content

        if not args.test_mode:
            # 写入文件
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"已添加 front matter: {file} - {title}")
        else:
            print(f"测试模式 - 将添加 front matter: {file} - {title}")

        processed_files += 1
    else:
        print(f"无法找到标题行，跳过: {file}")
        skipped_files_no_title += 1

# 输出统计信息
print("\n处理完成！")
print(f"总文件数: {total_files}")
print(f"成功添加 front matter: {processed_files}")
print(f"已有 front matter 而跳过: {skipped_files_with_front_matter}")
print(f"无标题行而跳过: {skipped_files_no_title}")

if args.test_mode:
    print("\n这是测试模式，没有实际修改文件。要实际修改文件，请移除 --test_mode 参数。")