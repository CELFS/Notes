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
* 概要：本书通过一个例子，展示了 MySQL 若干不同模块的命令示例。



------



### 00 安装

* 类型与网络

![image-20231129174858500](http://img.celfs.site/typora/2025/11/22/1763818571383-image-20231129174858500.png)

* 用户，密码 4 位

![image-20231129175032765](http://img.celfs.site/typora/2025/11/22/1763818571382-image-20231129175032765.png)



------





### 00 MySQL 整体认知（简化为速查表）

* 用户管理：创建、授权、删除、切换、登录验证、更新密码
* 架构层级：两层模型、存储引擎
* 数据结构
  * 数据库：创建、删除、更新、查询、索引
  * 表：创建
  * 列/行
* 语法
  * 数据类型、函数类型、数据操作类型
* 算法/操作
  * 排序、过滤、分组、正则、检索、索引、索引类型、计算、批处理、联结、集合运算
* 操作空间的改变、当前操作所在的空间是什么？
* 便捷
  * 插件mycli、代码补全、颜色shell



------



### 01 重要概念

* 主键（primary key）：任意符合的一列，该列的每一行都是唯一值，即可用来标识整个表。
* 外键（foreign Key）：一种表的引用关系，利用一个表的主键特征，联系另一个表的主键特征。通常，出于资源利用率，一个表的主键，很自然地可以作为关系数据库的外键。
* SQL（S-Q-L / sequel，Structured Query Language）
* 表、聚集函数
* 补充
  * 自动增量、行 0、完全限定表名、子句（clause）、逻辑操作符
  * 子句次序：`FORM > WHERE > ORDER BY > LIMIT` 



------



### 02 软件控制 & 用户管理

```bash
# 启动(.service 可选)
sudo systemctl start mysql
sudo service mysql start # 有何区别？

# 停止
sudo systemctl stop mysql

# 重启
sudo systemctl restart mysql

# 状态查询
sudo systemctl status mysql

# 用户登录(若无密码，直接 enter，-p 可选，本机设置root 123/celfs sql)
mysql -u root -p
```

```mysql
-- 设置密码(旧版 password() 已弃用)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sql';

-- 刷新权限(或直接重启 mysql)
FLUSH PRIVILEGES;
```

* /etc/my.cnf 该方法可临时跳过授权表，但不再适用于重置密码

```bash
[mysqld]
skip-grant-tables
```

* 注册新用户

```mysql
-- 注册 | localhost 可根据填入 IP 管理用户组？
CREATE USER [new_user] IDENTIFIED BY '[new_password]';

-- 授权特定数据库(添加后，可于 DATABASES 查看数据库清单)
GRANT SELECT, INSERT, UPDATE, DELETE ON your_database.* TO [new_user]@[localhost];

-- 修改用户名
RENAME USER [user_name] TO [new_user_name];

-- 修改密码
SET PASSWORD FOR [user_name] = Password('[new_pwd]');

-- 删除用户
DROP USER [user_name];

-- 查看用户权限 | （报错，已解决完成测试）
-- ERROR 1141 (42000): There is no such grant defined for user 'celfs' on host '%'
SHOW GRANTS FOR [user_name];
-- 这样创建的用户，赋权不会报错 | 那么已创建的用户，如何赋权？
create user [user_name]@[%] identified with mysql_native_password by [pwd];


-- 用户授权
-- ERROR 1141 (42000): You are not allowed to create a user with GRANT.
GRANT [grant_name] ON [db_name].[table_name] TO [user_name];

-- 撤销授权 | 撤销报错，可能因为没有 test 库？只有 root 可以，权限太乱
-- ERROR 1044 (42000): Access denied for user 'ccc'@'%' to database 'test'
REVOKE [grant_name] ON [db_name].[table_name] FROM [user_name];
```

* [授权问题的解决——参考博客](https://www.cnblogs.com/qzqdy/p/15375300.html#:~:text=%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98%EF%BC%9AERROR%201410%20%2842000%29%3A%20You%20are%20not%20allowed%20to,set%20host%20%3D%20%27%25%27%20where%20user%20%3D%20%27root%27%3B) 

```mysql
-- 执行以下命令，上述对 ccc 授权操作不再报错
update user set host = '%' where user = 'root';
update user set host = '%' where user = 'root' and host='localhost'; --  | 执行后，celfs 用户才有效
GRANT ALL ON *.* TO 'root'@'%';

-- 权限分析，user 有 root、celfs、ccc
	-- 其中 root 可控制 grant 的赋予以及 revoke 操作
	-- 普通用户无法访问其他用户的 grant 列表，无法 revoke 自身的 grant 权限
    -- root 用户无法对 update 之前的用户创建 grant
    -- 整体而言，要实现 grant，需要 root 的权限发放权、普通用户的权限接受权，还是蛮麻烦的，有没有更好的用户权限管理方式？
    
-- 补充 /etc/mysql/my.cnf | 设置后，普通创建用户，即可带 grants
[mysqld]
default-authentication-plugin=mysql_native_password
```

* 进入、登录、指定信息、退出

```mysql
-- mysql 命令行实用程序 (prompt)
mysql>

-- 指定用户登录名
mysql -u username;

-- 切换用户


-- 给定用户名、主机名、端口、口令
mysql -u username -p -h myserver -P 9999;
-- 默认值 (这句可能报错)
mysql -u username -p -h localhost -P 3306;

-- 帮助
mysql --help;

-- 退出(可省略分号;)
mysql> exit;
```

* 基本操作
  * 命令结束：`;` 、`\g` 
  * 帮助：`help` 、`\h` 、`help command_name`
  * 退出：`quit` 、`exit` 
* MySQL 组件
  * MySQL 命令行实用程序
  * MySQL Administrator（GUI，MySQL 管理器，简化服务器管理）
  * MySQL Query Browser（GUI，编写和执行 MySQL 命令）



2023/11/21 18:34:10 更新

------



### 03 数据库 & 表检索

```mysql
-- 创建数据库
CREATE DATABASE [db_name];

-- 选择数据库
USE crashcourse;


-- 显示所有数据库
SHOW DATABASES;
-- 显示库中的所有表
SHOW TABLES;

-- 显示特定表内容
SELECT * FROM row_name;
-- 确认当前数据库(无则NULL)
SELECT DATABASE();


-- 显示列(单独提取各列名称)
SHOW COLUMNS FROM customers;
-- 等价的快捷命令
DESCRIBE customers;


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

### 03 增 | 删 | 改 | 查

```mysql
-- 增

-- 删

-- 改
UPDATE test_table_01 SET col_02 = 100 WHERE id = 1;

-- 查
SELECT * FROM test_table_01;
```



### 03 事务

```mysql
START TRANSACTION;
set autocommit=0;
SELECT COUNT(*) FROM information_schema.innodb_trx;

COMMIT;
ROLLBACK; -- 回溯，使得UPDATE回滚到事务开始前的状态

ALTER TABLE -- 与事务隔离无关，会直接发生修改，那么如何在事务中新增列？
```



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

* 子查询：嵌套在其他查询中的查询。
  * SELECT 中，子查询总是从内向外处理。
  * 实际开发中，由于性能限制，不能嵌套过多的子查询。
  * 此类检索（信息过滤），更有效的办法通常不是子查询，而是联结表（C15）。
  * 子查询的建立和测试：由内层逐渐向外扩（使用硬编码数据调试即可）。
* 格式化 SQL：如果子查询较为复杂，应当将单行语句适当分解为多行，并缩进
* 相关子查询（correlated subquery）：涉及外部查询的子查询 => 为避免歧义，需使用完全限定列名。

```mysql
-- 用法一：过滤信息
-- 两个 SELECT 查询
SELECT order_num
FROM orderitems
WHERE prod_id = 'TNT2';

SELECT cust_id
FROM orders
WHERE order_num IN (20005, 20007);

-- 子查询示例，组合前面两个查询
SELECT cust_id
FROM orders
WHERE order_num IN (SELECT order_num
                   FROM orderitems
                   WHERE prod_id = 'TNT2');

-- 格式化 SQL 示例
SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                 FROM orders
                 WHERE order_num IN (SELECT order_num
                                     FROM orderitems
                                     WHERE prod_id = 'TNT2'));


-- 用法二：创建计算字段
SELECT COUNT(*) AS orders
FROM orders
WHERE cust_id = 10001;

-- 子查询示例，使用了”完全限定列名“(C04)
SELECT cust_name,
	   cust_state,
	   (SELECT COUNT(*)
       FROM orders
       WHERE orders.cust_id = customers.cust_id) AS orders
FROM customers
ORDER BY cust_name;
```



* 2024/04/01 3:16:02

------



### 15 联结表**

* 关系表：把信息分解为多个表，一类型一个表。各表通过某些常用的值（关系，relational）互相关联。
  * e.g.：一个产品目录表（描述、价格、供应商），一个供应商信息表（名称、地址、联系方式），两者分开存储（降时空复杂度、易更新、无重复/数据一致、可伸缩性）
    * vendors 存供应商信息，每个供应商唯一标识（primary key）
    * products 存产品信息，对于 vendors，只存其 ID（foreign Key）
* 联结：在单 SELECT 语句中关联表。
* 可伸缩性（scale）：能够适应不断增加的工作量而不失败。
* 笛卡尔积（Cartesian product）：由**无联结条件**的表关系返回的结果（一种“强制”匹配，DM、高代和动手学DL里面学过）
* 叉联结（cross join）：返回叉联结的笛卡尔积联结类型（类似叉乘）
* 内部联结 / 等值联结（equijoin）：基于两个表之间的相等测试。
* 关键概念：
  * 避免相同数据重复出现——关系型数据库的设计基础。
  * 外键定义了两个表之间的关系。
  * 联结并非物理实体（实际数据库表中不存在，由 MySQL 按需建立，是查询执行过程中的产物 / 不可见性），简言之：**关系是在运行中构造的**。
  * 维护引用完整性（仅在关系列中插入合法的数据，例如禁止插入非法的 vendors ID，C21）
  * 应当保证所有联结具有 WHERE 子句，避免不符合预期的笛卡尔积
  * **ANSI SQL 规范**：首先 INNER JOIN 语法（即明确的联结语法，ON 便于确保不遗漏联结条件）
  * **联结的表越多，性能下降越明显**。找到最合适具体情况的方法，应当**对不同的选择机制进行实验**，性能可能受操作类型、表中数据量、是否存在索引或键，以及其他一些条件的影响。
* 疑问/感悟
  * 如果有个图就很清晰了。

```mysql
-- 创建联结表，规定需联结的所有表，以及它们如何关联
-- 以下是位于两个不同表的三列，其中 vend_(T1)， prod(T2)
SELECT vend_name, prod_name, prod_price
FROM vendors, products -- 列出两个表
WHERE vendors.vend_id = products.vend_id -- 表示联结条件
ORDER BY vend_name, prod_name;

-- 笛卡尔积示例 (<a, b> 总数为 size(A) * size(B))
SELECT vend_name, prod_name, prod_price
FROM vendors, products -- 列出两个表
ORDER BY vend_name, prod_name;

-- 等值联结，用例一的等价语句 (特化)
SELECT vend_name, prod_name, prod_price
FROM vendors INNER JOIN products -- 联结关系的组成
ON vendors.vend_id = products.vend_id; -- 表示联结条件

-- 联结多个表 | 注意性能影响
SELECT prod_name, vend_name, prod_price, quantity
FROM orderitems, products, vendors
WHERE products.vend_id = vendors.vend_id 
  AND orderitems.prod_id = products.prod_id
  AND order_num = 20005;
  
-- 替代子查询的联结语句 (C14)
SELECT cust_name, cust_contact
FROM customers, orders, orderitems
WHERE customers.cust_id = order.cust_id
  AND orderitems.order_num = orders.order_num
  AND prod_id = 'TNT2';
```



* 2024/04/01 16:17:21

------



### 16 创建高级联结

```mysql

```



------



### 17 组合查询

```mysql

```



------



### 18 全文本搜索

```mysql

```



------



### 19 插入数据

```mysql

```



------



### 20 更新和删除数据

```mysql

```



------



### 21 创建和操纵表

```mysql

```



------



### 22 使用视图

```mysql

```



------



### 23 使用存储过程

```mysql

```



------



### 24 使用游标

```mysql

```



------



### 25 使用触发器

```mysql

```



------



### 26 管理事务处理

```mysql

```



------



### 27 全球化和本地化

```mysql

```



------



### 28 安全管理

```mysql

```



------



### 29 数据库维护

```mysql

```



------



### 30 改善性能

```mysql

```



------



### 附录 A-E

#### A MySQL入门

#### B 样例表

#### C MySQL语法

#### D MySQL数据类型

#### E MySQL保留字

* 可类似魔方公式表，用过的标记，直到全灭

### 索引







