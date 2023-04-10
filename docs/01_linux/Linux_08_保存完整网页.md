### 08 Linux 保存完整网页

Date：2022/03/01 4:33:28

------



* 由于个别网页在本机无法访问，但在云服务器可以访问。
  * 尝试过搭建爬虫，以递归保存网页，可惜技术不精，参考了几个也没有达到效果；
  * 尝试过 Firefox，但 Linux 字符界面提示说没有支持的展示环境（要 GUI 界面）；
  * 最后，使用 wget，很好地保存了网页；

* Downloading an Entire Web Site with wget | Linux Journal  https://www.linuxjournal.com/content/downloading-entire-web-site-wget

```bash
wget --recursive --page-requisites url
```



The options are:

- --recursive: download the entire Web site.
- --domains website.org: don't follow links outside website.org.
- --no-parent: don't follow links outside the directory tutorials/html/.
- --page-requisites: get all the elements that compose the page (images, CSS and so on).
- --html-extension: save files with the .html extension.
- --convert-links: convert links so that they work locally, off-line.
- --restrict-file-names=windows: modify filenames so that they will work in Windows as well.
- --no-clobber: don't overwrite any existing files (used in case the download is interrupted and resumed).



2022/03/01 4:38:38 1h38min

------



```bash
wget --recursive --page-requisites --html-extension --convert-links --restrict-file-names=windows https://time.geekbang.org/column/intro/100008701
```

