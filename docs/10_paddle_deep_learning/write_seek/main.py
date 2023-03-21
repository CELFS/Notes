with open(r"task03.md", 'r+', encoding="UTF8") as fw:
    with open(r'copy.md', 'x+', encoding="UTF8") as w:
        for line in fw.readlines():
            res = line.replace('D:\\TyporaTxt\\PicCopy\\', "test/")
            w.write(f"{res}")
