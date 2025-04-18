---
sidebar_label: "Task06 自然语言处理基础"
---

### Task06 自然语言处理基础

Date：2023/03/27 15:58:19

------



[TOC]



------





### 6.1 自然语言处理综述

![image-20230327155836048](images/task06/image-20230327155836048.png)



------



#### 6.1.1自然语言处理概述

![image-20230327155853673](images/task06/image-20230327155853673.png)



![image-20230327160112586](images/task06/image-20230327160112586.png)

* 指数增长（ 找找这种图的来源）

![image-20230327160253355](images/task06/image-20230327160253355.png)



![image-20230327160420667](images/task06/image-20230327160420667.png)

* 预训练模型：NLP 核心方向（BERT 为分割点，重中之重）
  * 逐渐往大模型的方向发展



------



#### 6.1.2自然语言处理发展史

![image-20230327160813003](images/task06/image-20230327160813003.png)

* 1950前后兴起、1956符号主义、1980连接主义、2006深度学习

![image-20230327161135833](images/task06/image-20230327161135833.png)

![image-20230327161229543](images/task06/image-20230327161229543.png)

![image-20230327161249634](images/task06/image-20230327161249634.png)

![image-20230327161309620](images/task06/image-20230327161309620.png)

![image-20230327161332968](images/task06/image-20230327161332968.png)

![image-20230327161429735](images/task06/image-20230327161429735.png)

* 特征工程的内容很多，而且换模型后基本不适用

![image-20230327161548129](images/task06/image-20230327161548129.png)

![image-20230327161558041](images/task06/image-20230327161558041.png)



------



#### 6.1.3自然语言处理技术全景

![image-20230327161708404](images/task06/image-20230327161708404.png)

![image-20230327162613183](images/task06/image-20230327162613183.png)

![image-20230327162639238](images/task06/image-20230327162639238.png)

![image-20230327162734135](images/task06/image-20230327162734135.png)

![image-20230327162813208](images/task06/image-20230327162813208.png)

* 这位老师讲得非常好，学习他的讲述方式、链接词、例子、切入点
* 另外，课件的形式也值得学习



------



### 6.2 词向量：迈向 NLP 领域的第 1 步台阶

#### 6.2.1 语言模型

![image-20230327172016468](images/task06/image-20230327172016468.png)

* 语言模型对应理解后面的词向量和词方法很重要
* 组成语句语序出现可能性的最大概率

![image-20230327172827091](images/task06/image-20230327172827091.png)

* 语言模型的问题：无法建模更远的关系、词相关性不足、泛化能力不高
* 矩阵 $ C $ 的渊源
* 这里提到的信息量蛮大的，而且 PPT 外的讲解较多



------



#### 6.2.2 词向量基础概念

![image-20230327173253979](images/task06/image-20230327173253979.png)

![image-20230327173302650](images/task06/image-20230327173302650.png)

* 词向量：高维空间里面的降维操作

![image-20230327173417689](images/task06/image-20230327173417689.png)

![image-20230327173515627](images/task06/image-20230327173515627.png)

* 排序

![image-20230327173609331](images/task06/image-20230327173609331.png)

* 多义词，语料关系很多，通常是用不同的语料库进行训练，以提高模型在相应上下文环境的泛化能力



------



#### 6.2.3 词向量算法

![image-20230327173801631](images/task06/image-20230327173801631.png)

* 最经典的算法，这篇文献要读读

![image-20230327173853846](images/task06/image-20230327173853846.png)

* CBOW 模型结构如图

![image-20230327174005130](images/task06/image-20230327174005130.png)

![image-20230327174109162](images/task06/image-20230327174109162.png)

![image-20230327174303562](images/task06/image-20230327174303562.png)

* 提到交叉熵

![image-20230327174323001](images/task06/image-20230327174323001.png)

![image-20230327174511366](images/task06/image-20230327174511366.png)

* softmax 计算每一位都有算，所以累加的计算量很大

![image-20230327174551639](images/task06/image-20230327174551639.png)



------



#### 6.2.4 用飞桨实现 Skip-gram

![image-20230327174741179](images/task06/image-20230327174741179.png)

![image-20230327174802893](images/task06/image-20230327174802893.png)

![image-20230327174822942](images/task06/image-20230327174822942.png)

![image-20230327174847330](images/task06/image-20230327174847330.png)

![image-20230327174910720](images/task06/image-20230327174910720.png)

* 建立带 id 的词典

![image-20230327174955935](images/task06/image-20230327174955935.png)

* 根据 id 序列表征句子

![image-20230327175019179](images/task06/image-20230327175019179.png)

* 有些词对训练效果的影响不好（例如 “的、地、呢”）

![image-20230327175126454](images/task06/image-20230327175126454.png)

![image-20230327175215028](images/task06/image-20230327175215028.png)

![image-20230327175251344](images/task06/image-20230327175251344.png)



![image-20230327175404778](images/task06/image-20230327175404778.png)

![image-20230327175547453](images/task06/image-20230327175547453.png)

![image-20230327175556849](images/task06/image-20230327175556849.png)

![image-20230327175634937](images/task06/image-20230327175634937.png)



------



#### 6.2.5 用 PaddleNLP 加载词向量

![image-20230327175708918](images/task06/image-20230327175708918.png)

![image-20230327175946097](images/task06/image-20230327175946097.png)

![image-20230327180035050](images/task06/image-20230327180035050.png)

![image-20230327180042101](images/task06/image-20230327180042101.png)

![image-20230327180153908](images/task06/image-20230327180153908.png)



![image-20230327180231195](images/task06/image-20230327180231195.png)

* 2023/03/27 18:02:01



------



























