---
sidebar_label: "《MySQL 必知必会》笔记整理"
---

### 《MySQL 必知必会》笔记整理

Date：2023/07/18 21:24:15

------



[TOC]



------



### 00 配套资源+背景

* 配套资源 http://forta.com/books/0672327120/
  * 例子，数据库： `crashcourse` 
* MySQL 安装
  * http://dev.mysql.com/downloads/
  * 
* MySQL 版本控制：4.1 以上
* 背景
  * DBMS 两大类：
    * 基于共享文件系统的 DBMS
      * 如 Microsoft Access、FileMakeer
    * 基于基于客户机-服务器的 DBMS
      * 如 MySQL、Oracle、Microsoft SQL Server
  * 服务器软件：负责所有数据访问和处理的软件
    * MySQL DBMS、本地副本、远程服务器等
  * 数据库服务器：运行数据库的计算机
  * 客户机
    * MySQL 提供的工具、脚本语言、Web 应用开发语言、程序设计语言等



------



### 00 环境配置（未开展）





------



### 01 重要概念

* 主键（primary key）：一（组）列，其值可唯一标识表中每个行。
* 外键
* SQL（S-Q-L / sequel，Structured Query Language）
* 表、聚集函数
* 补充
  * 自动增量、行 0、完全限定表名、子句（clause）、逻辑操作符
  * 子句次序：`FORM > WHERE > ORDER BY > LIMIT` 



------



### 02 MySQL 工具

```mysql
-- mysql 命令行实用程序 (prompt)
mysql>


-- 指定用户登录名
mysql -u username;


-- 给定用户名、主机名、端口、口令
mysql -u username -p -h myserver -P 9999;
-- 默认值 (这句可能报错)
mysql -u username -p -h localhost -P 3306;


-- 帮助
mysql --help;
```

* 基本操作
  * 命令结束：`;` 、`\g` 
  * 帮助：`help` 、`\h` 、`help command_name`
  * 退出：`quit` 、`exit` 
* MySQL 组件
  * MySQL 命令行实用程序
  * MySQL Administrator（GUI，MySQL 管理器，简化服务器管理）
  * MySQL Query Browser（GUI，编写和执行 MySQL 命令）



------



### 03 使用 MySQL

```mysql
-- 选择数据库
USE crashcourse;


-- 显示 (数据库、表、列、用户、权限等)
SHOW DATABASES;
SHOW TABLES;


-- 显示列 == 快捷命令
SHOW COLUMNS FROM customers; / DESCRIBE customers;


-- 其他 SHOW 语句
SHOW STATUS; -- 显示广泛服务器状态信息

SHOW CREATE DATABASE;
SHOW CREATE TABLE;

SHOW GRANTS; -- 显示用户权限

SHOW ERRORS;
SHOW WARNINGS;

HELP SHOW; -- help


-- 获得和过滤模式信息 (MySQL 5)
INFORMATION_SCHEMA;
```



* 2023/07/18 22:10:03

------



### 04 检索信息

```mysql
-- 检索单个列
SELECT prod_name
FROM products;
-- 检索多个列
SELECT prod_id, prod_name, prod_price
FROM products;
-- 检索所有列
SELECT *
FROM products;


-- 检索不同行
SELECT vend_id
FROM products;
-- 只返回不同 (唯一) 行 (去重)
SELECT DISTINCT vend_id
FROM products;


-- 限制结果 (返回不多于 5 行)
SELECT prod_name
FROM products
LIMIT 5;
LIMIT 5, 5; -- 返回从行 5 开始的 5 行


-- 完全限定列名
SELECT products.prod_name
FROM products;
-- 完全限定表名
SELECT products.prod_name
FROM crashcourse.products;
```



------



### 05 排序数据

```mysql
-- 排序
SELECT prod_name
FROM products
ORDER BY prod_name;

-- 按多个列排序
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price, prod_name;

-- 指定排序方向
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price DESC; -- 降序 (多个列需多个 DESC)


```



------



### 06 过滤数据

```mysql
SELECT prod_name, prod_price
FROM products
WHERE prod_price = 2.50;

SELECT prod_name, prod_price
FROM products
WHERE prod_name = 'fuses';

SELECT prod_name, prod_price
FROM products
WHERE prod_price < 10;

-- 不匹配检查
SELECT vend_id, prod_name
FROM products
WHERE vend_id <> 1003; -- or !=

-- 范围值检查
SELECT prod_name, prod_price
FROM products
WHERE prod_price BETWEEN 5 AND 10;

-- 空值检查
SELECT prod_name
FROM products
WHERE prod_price IS NULL;
```

* WHERE 字句操作符

| 操作符  |      说明      |
| :-----: | :------------: |
|    =    |                |
|   <>    |     不等于     |
|   !=    |     不等于     |
|    <    |                |
|   <=    |                |
|    >    |                |
|   >=    |                |
| BETWEEN | 指定两个值之间 |



------



### 07 数据过滤

```mysql
-- AND
SELECT prod_id, prod_price, prod_name
FROM products
WHERE vend_id = 1003 AND prod_price <= 10;


-- OR
SELECT prod_name, prod_price
FROM products
WHERE vend_id = 1002 OR vend_id = 1003;


-- 计算次序
SELECT prod_name, prod_price
FROM products
WHERE vend_id = 1002 OR vend_id = 1003 AND prod_price >= 10;
WHERE (vend_id = 1002 OR vend_id = 1003) AND prod_price >= 10;


-- IN
SELECT prod_name, prod_price
FROM products
WHERE vend_id IN (1002, 1003) -- 等价于 v = 1002 OR v = 1003
ORDER BY prod_name;


-- NOT IN
SELECT prod_name, prod_price
FROM products
WHERE vend_id IN (1002, 1003) -- 等价于 v = 1002 OR v = 1003
ORDER BY prod_name;
```

* （逻辑）操作符：联结或改变 WHERE 字句中的字句的关键字。
* 计算次序，圆括号



* 2023/07/23 0:14:22

------



### 08 通配符过滤

```mysql
-- LIKE & %
SELECT prod_id, prod_name
FROM products
WHERE prod_name LIKE 'jet%'; 	-- 以 jet 开头
WHERE prod_name LIKE '%anvil%'  -- 包含文本 anvil
WHERE prod_name LIKE 's%e'; 	-- 以 s 开头，以 e 结尾


-- 下划线 _
SELECT prod_id, prod_name
FROM products
WHERE prod_name LIKE '_ ton anvil'; -- 匹配单个字符
```



------



### 09 正则表达式搜索

```mysql
-- REGEXP
SELECT prod_name
FROM products
WHERE prod_name REGEXP '1000'
ORDER BY prod_name;


-- BINARY 匹配区分大小写
WHERE prod_name REGEXP BINARY 'JetPack .000';


-- OR 匹配 | 或者 []
WHERE prod_name REGEXP '1000|2000';
WHERE prod_name REGEXP '[123] Ton';


-- 匹配特殊字符，如 | - [] .
SELECT vend_name
FROM vendors
WHERE vend_name REGEXP '\\.'
ORDER BY vend_name;
```

* 正则表达式字符

|      |       说明       |            示例            |
| :--: | :--------------: | :------------------------: |
|  .   | 匹配任意一个字符 |  .000 匹配 1000、2000 等   |
|  ^   |   定位 / 否定    |   [^123] 不匹配 123 字符   |
|  -   |     匹配范围     |  [1-9]、[a-z]、[1-3] Ton   |
| \\\  |   匹配特殊字符   | 若匹配反斜杠，需 3 个 '\\' |

* 空白元字符

| 元字符 |   说明   |
| :----: | :------: |
|  \\\f  |   换页   |
|  \\\n  |   换行   |
|  \\\r  |   回车   |
|  \\\t  |   制表   |
|  \\\v  | 纵向制表 |

* 字符类

|     类     |                  说明                  |
| :--------: | :------------------------------------: |
| [:alnum:]  |             同 [a-zA-Z0-9]             |
| [:alpha:]  |              同 [a-zA-Z]               |
| [:blank:]  |               同 [\\\t]                |
| [:cntrl:]  |          ASCII 0 到 31 和 127          |
| [:digit:]  |                同 [0-9]                |
| [:graph:]  |         同 [:print:]，不含空格         |
| [:lower:]  |                同 [a-z]                |
| [:print:]  |             任意可打印字符             |
| [:punct:]  | 除 [:alnum:] 和 [:cntrl:] 外的任意字符 |
| [:space:]  |       同 [\\\f\\\n\\\r\\\t\\\v]        |
| [:upper:]  |                同 [A-Z]                |
| [:xdigit:] |      任意十六进制数字 [a-fA-F0-9]      |

* 重复元字符

| 元字符 |              说明              |
| :----: | :----------------------------: |
|   *    |         0 个或多个匹配         |
|   +    |   1 个或多个匹配（同 {1, }）   |
|   ?    |  0 个或 1 个匹配（同 {0, 1}）  |
|  {n}   |         指定数目的匹配         |
| {n, }  |      不少于指定数目的匹配      |
| {n, m} | 匹配数目的范围（m 不超过 255） |

```mysql
-- ? 元字符
SELECT prod_name
FROM products
WHERE prod_name REGEXP '\\([0-9] sticks?\\)'
ORDER BY prod_name; -- (1 stick), (2 sticks) 注意末尾 s


-- 匹配连一起的 4 位数字
SELECT prod_name
FROM products
WHERE prod_name REGEXP '[[:digit:]]{4}'
ORDER BY prod_name; -- {4} 要求前面的字符出现 4 次
-- 同 WHERE prod_name REGEXP '[0-9][0-9][0-9][0-9]'
```

* 为什么要两个 '[[]]' ？
  * `[:digit:]` 为 `[0-9]` 
  * `[[0-9]]` 为 0-9 任意数字匹配，总觉得外围中括号有点多此一举

* 定位元字符

| 元字符  |    说明    |
| :-----: | :--------: |
|    ^    | 文本的开始 |
|    $    | 文本的结尾 |
| [[:<:]] |  词的开始  |
| [[:>:]] |  词的结尾  |

```mysql
-- 匹配以一个数（或小数点）开始的所有产品
SELECT prod_name
FROM products
WHERE prod_name REGEXP '^[0-9]\\.'
ORDER BY prod_name;


-- 测试正则表达式
SELECT 'hello' REGEXP '[0-9]';
```

* LIKE 匹配整个串，REGEXP 匹配子串
  * ~~如何理解通过 '^' 开始每个表达式，'$' 结束每个表达式，使得 REGEXP 实现与 LIKE 相同的作用？~~
  * 懂了，因为两者区别只有串的匹配范围，利用定位符，可以将匹配拓展到整个串。



* 2023/07/24 19:21:09

------



### 10 创建计算字段

* 字段（常用于计算字段连接） ≈ 列（常用于数据库列）
* 拼接（concatenate）、别名（alias / 导出列 derived column）

```mysql
-- 拼接
SELECT Concat(vend_name, ' (', vend_country, ')')
FROM vendors
ORDER BY vend_name;


-- 删除右侧多余空格 RTrim()
SELECT Concat(RTrim(vend_name), ' (', RTrim(vend_country), ')')
FROM vendors
ORDER BY vend_name;


-- 别名
SELECT Concat(RTrim(vend_name), ' (', RTrim(vend_country), ')') AS vend_title
FROM vendors
ORDER BY vend_name;


-- 执行算术计算
SELECT prod_id,
	   quantity,
	   item_price,
	   quantity*item_price AS expanded_price
FROM orderitems
WHERE order_num = 20005;


-- 测试计算
SELECT 3*2; -- return 6
SELECT Trim('abc'); -- return abc
SELECT Now(); -- 当前时间，是否有额外参数？待验证
```

* MySQL 算术操作符：+、-、*、/



------



### 11 使用数据处理函数

```mysql
-- 文本处理函数
SELECT vend_name, Upper(vend_name) AS vend_name_upcase
FROM vendors
ORDER BY vend_name;


-- 语音值检索
SELECT cust_name, cust_contact
FROM customers
WHERE cust_contact = 'Y. Lie'; -- 假设输入错误，实际为 Y.Lee
WHERE Soundex(cust_contact) = Soundex('Y Lie'); -- 则根据语音库匹配近似数据
```

* 常用文本处理函数

|    函数     |             说明              |
| :---------: | :---------------------------: |
|   Left()    |       返回串左边的字符        |
|  Length()   |         返回串的长度          |
|  Locate()   |       找出串的一个子串        |
|   Lower()   |        将串转换为小写         |
|   LTrim()   |       去掉串左边的空格        |
|   Right()   |       返回串右边的字符        |
|   RTrim()   |       去掉串右边的空格        |
|  Soundex()  | 返回串的 SOUNDEX 值（语音值） |
| SubString() |        返回子串的字符         |
|   Upper()   |        将串转换为大写         |

```mysql
-- 年份值比较(以确保值为正确日期)
SELECT cust_id, order_num
FORM orders
WHERE Date(order_date) = '2005-09-01';


-- 范围日期检索
SELECT cust_id, order_num
FORM orders
WHERE Date(order_date) BETWEEN '2005-09-01' AND '2005-09-30';
-- 另一种简洁实现
WHERE Year(order_date) = 2005 AND Month(order_date) = 9;
```

* 日期和时间处理函数

|     函数      |              说明              |
| :-----------: | :----------------------------: |
|   AddDate()   |    增加一个日期（天、周等）    |
|   AddTime()   |    增加一个时间（时、分等）    |
|   CurDate()   |          返回当前日期          |
|   CurTime()   |          返回当前时间          |
|    Date()     |     返回日期时间的日期部分     |
|  DateDiff()   |        计算两个日期之差        |
|  Date_Add()   |     高度灵活的日期运算函数     |
| Date_Format() |  返回一个格式化的日期或时间串  |
|     Day()     |     返回一个日期的天数部分     |
|  DayOfWeek()  | 对于一个日期，返回对应的星期几 |
|    Hour()     |     返回一个时间的小时部分     |
|   Minute()    |     返回一个时间的分钟部分     |
|    Month()    |     返回一个日期的月份部分     |
|     Now()     |       返回当前日期和时间       |
|   Second()    |      返回一个时间的秒部分      |
|    Time()     |   返回一个日期时间的时间部分   |
|    Year()     |     返回一个日期的年份部分     |

* 注意
  * 年份总是使用 4 位数
  * Date() 和 Time() 都是 MySQL 4.1.1 第一次引入的（该版本更新了较多时间和日期函数）

* 数值处理函数

|  函数  |        说明        |
| :----: | :----------------: |
| Abs()  | 返回一个数的绝对值 |
| Cos()  | 返回一个角度的余弦 |
| Exp()  | 返回一个数的指数值 |
| Mod()  |  返回除操作的余数  |
|  Pi()  |     返回圆周率     |
| Rand() |   返回一个随机数   |
| Sin()  | 返回一个角度的正弦 |
| Sqrt() | 返回一个数的平方根 |
| Tan()  | 返回一个角度的正切 |



* 2023/07/30 22:17:09

------



### 12 汇总数据

* 聚集函数（aggregate function）、标准偏差聚集函数

```mysql
-- AVG()
SELECT AVG(prod_price) AS avg_price
FROM products; -- 返回所有
WHERE vend_id = 1003; -- 返回特定, 多个列需多个 AVG()


-- COUNT(*) 包含空值返回, COUNT(column) 忽略空值返回
SELECT COUNT(*) AS num_cust
FROM customers;


-- MAX() 可用于非数值, MIN() 同理
SELECT MAX(prod_price) AS max_price
FROM products;


-- SUM(column) or SUM(expression)
SELECT SUM(quantity) AS items_ordered
FROM orderitems
WHERE order_num = 20005;


-- DISTINCT 参数(以上聚集函数默认 ALL) 只考虑不同值, 不用于 (*)
SELECT AVG(DISTINCT prod_price) AS avg_price
FROM products;
WHERE vend_id = 1003;


-- 组合聚集函数, 取别名
SELECT COUNT(*) AS num_items,
	   MIN(prod_price) AS price_min,
	   MAX(prod_price) AS price_max,
	   AVG(prod_price) AS price_avg
FROM products;
```

* SQL 聚集函数

|  函数   |       说明       |
| :-----: | :--------------: |
|  AVG()  | 返回某列的平均值 |
| COUNT() |  返回某列的行数  |
|  MAX()  | 返回某列的最大值 |
|  MIN()  | 返回某列的最小值 |
|  SUM()  |  返回某列值之和  |



* 2023/08/02 18:37:34

------



### 13 分组数据

* 分组：把数据分为多个逻辑组

```mysql
-- 创建分组
SELECT vend_id, COUNT(*) AS num_prods
FROM products
GROUP BY vend_id;


-- WITH ROLLUP 获得每个分组以及对应每个分组汇总级别的值 (未理解)
SELECT vend_id, COUNT(*) AS num_prods
FROM products
GROUP BY vend_id WITH ROLLUP;


-- HAVING 过滤分组 (基于完整分组, 分组后), WHERE 过滤行 (分组前)
SELECT cust_id, COUNT(*) AS orders
FROM orders
GROUP BY cust_id
HAVING COUNT(*) >= 2;


-- 同时使用 HAVING 与 WHERE
SELECT vend_id, COUNT(*) AS num_prods
FROM products
WHERE prod_price >= 10
GROUP BY vend_id
HAVING COUNT(*) >= 2;


-- 分组排序 (保序)
SELECT order_num, SUM(quantity*item_price) AS ordertotal
FROM orderitems
GROUP BY order_num
HAVING SUM(quantity*item_price) >= 50
ORDER BY ordertotal;
```

* 对比 ORDER BY 与 GROUP BY
  * 一般使用 GROUP BY 的同时，要给出 ORDER BY，以确保输出的排序唯一

| ORDER BY                         | GROUP BY                                             |
| :------------------------------- | ---------------------------------------------------- |
| 排序产生的输出                   | 分组行。但输出可能并非分组的顺序                     |
| 任意列都可使用（包括非选择的列） | 只能使用选择列或表达式列，且必须使用每个选择列表达式 |
| 不一定需要                       | 若与聚集函数一并使用列（或表达式），则必须使用       |

* SELECT 子句及其顺序

|   子句   | 说明               |      是否必须使用      |
| :------: | :----------------- | :--------------------: |
|  SELECT  | 要返回的列或表达式 |           是           |
|   FROM   | 从中检索数据的表   |  仅从表选择数据时使用  |
|  WHERE   | 行级过滤           |           否           |
| GROUP BY | 分组说明           | 仅在按组计算聚集时使用 |
|  HAVING  | 组级过滤           |           否           |
| ORDER BY | 输出排序顺序       |           否           |
|  LIMIT   | 要检索的行数       |           否           |



* 2023/08/06 15:49:04

------



### 14 使用子查询

```mysql

```



------



### 15 联结表*

```mysql

```



------



### 16

```mysql

```



------



### 17

```mysql

```



------



### 18

```mysql

```



------



### 19

```mysql

```



------



### 20

```mysql

```



------



### 21

```mysql

```



------



### 22

```mysql

```



------



### 23

```mysql

```



------



### 24

```mysql

```



------



### 25

```mysql

```



------



### 26

```mysql

```



------



### 27

```mysql

```



------



### 28

```mysql

```



------



### 29

```mysql

```



------



### 30

```mysql

```



------













