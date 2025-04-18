---
sidebar_label: "Task09 推荐系统"
---

### Task09 推荐系统

Date：2023/04/02 20:12:24

------



[TOC]



------





### 9.1 推荐系统介绍

![image-20230402201222504](images/task09/image-20230402201222504.png)

![image-20230402201555407](images/task09/image-20230402201555407.png)

![image-20230402201608630](images/task09/image-20230402201608630.png)

![image-20230402201952416](images/task09/image-20230402201952416.png)

* 给出理由的意义，用相应的句式，哪怕无厘头

![image-20230402202233660](images/task09/image-20230402202233660.png)

* 组合推荐，本节所用

![image-20230402202500287](images/task09/image-20230402202500287.png)

* gap

![image-20230402202558209](images/task09/image-20230402202558209.png)



------



### 9.2 数据处理与读取

![image-20230402203021240](images/task09/image-20230402203021240.png)

![image-20230402203038710](images/task09/image-20230402203038710.png)

* 双塔模型，变体很多

![image-20230402203143230](images/task09/image-20230402203143230.png)

![image-20230402203527902](images/task09/image-20230402203527902.png)

![image-20230402203558024](images/task09/image-20230402203558024.png)

![image-20230402204037117](images/task09/image-20230402204037117.png)

* 加速通常不用整数，因为硬件设计考虑到二进制

![image-20230402204118286](images/task09/image-20230402204118286.png)

![image-20230402204134390](images/task09/image-20230402204134390.png)

* 模型究竟在学什么
  * 此处是学 user 和 item 之间的有效映射



------



### 9.3 电影推荐模型设计

### 9.4 模型训练与特征保存

![image-20230402204354681](images/task09/image-20230402204354681.png)

![image-20230402204403184](images/task09/image-20230402204403184.png)

![image-20230402204628186](images/task09/image-20230402204628186.png)

![image-20230402205419471](images/task09/image-20230402205419471.png)

![image-20230402205531257](images/task09/image-20230402205531257.png)



------



#### 9.4.1电影推荐系统实战-数据处理

![image-20230402205711665](images/task09/image-20230402205711665.png)

![image-20230402205719261](images/task09/image-20230402205719261.png)

![image-20230402205756754](images/task09/image-20230402205756754.png)

![image-20230402210615666](images/task09/image-20230402210615666.png)

![image-20230402210754553](images/task09/image-20230402210754553.png)

![image-20230402210834219](images/task09/image-20230402210834219.png)

![image-20230402210951160](images/task09/image-20230402210951160.png)

![image-20230402211059636](images/task09/image-20230402211059636.png)

![image-20230402211115603](images/task09/image-20230402211115603.png)

![image-20230402211235826](images/task09/image-20230402211235826.png)



------



#### 9.4.2 构建简易的推荐模型

![image-20230402211330366](images/task09/image-20230402211330366.png)

![image-20230402211411057](images/task09/image-20230402211411057.png)

![image-20230402211503342](images/task09/image-20230402211503342.png)

![image-20230402211731596](images/task09/image-20230402211731596.png)

![image-20230402211842035](images/task09/image-20230402211842035.png)



------



#### 9.4.3 完整组网代码串联

![image-20230402211949083](images/task09/image-20230402211949083.png)

![image-20230402212055460](images/task09/image-20230402212055460.png)

* embedding 做了不定长处理

![image-20230402212137721](images/task09/image-20230402212137721.png)

![image-20230402212244065](images/task09/image-20230402212244065.png)



------



#### 9.4.4 网络结构：输入层表示层和匹配层

![image-20230402212349198](images/task09/image-20230402212349198.png)

![image-20230402212510924](images/task09/image-20230402212510924.png)

![image-20230402212527328](images/task09/image-20230402212527328.png)

![image-20230402212726507](images/task09/image-20230402212726507.png)

* 对于较为复杂的特征

* 卷积，尺寸缩减，提纯

![image-20230402212959376](images/task09/image-20230402212959376.png)

* 只是简单地初始连接和对齐，因此要接入全连接层，以存储更多的信息
* 两个分开写，因为参数不共享

![image-20230402213307270](images/task09/image-20230402213307270.png)



------



#### 9.4.5 训练过程：训练评估和预测

![image-20230402213429622](images/task09/image-20230402213429622.png)

![image-20230402213604731](images/task09/image-20230402213604731.png)

![image-20230402213653699](images/task09/image-20230402213653699.png)

* 2023/04/02 21:37:58 9.1-9.4



------



### 9.5 电影推荐







------



### 9.6 PaddleRec 加速推荐系统开发







------



### 9.7 实践：基于PaddleRec实现点击率预估





------

