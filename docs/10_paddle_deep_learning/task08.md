### Task08 自然语言处理任务的新范式：预训练语言模型*

Date：2023/03/28 16:52:29

------



[TOC]



------



### 8.1 预训练语言模型 BERT

![image-20230328165322706](images/task08/image-20230328165322706.png)

#### 8.1.1 BERT 网络结构

![image-20230328165404001](images/task08/image-20230328165404001.png)

* 通用无监督数据（超大规模预料，对比之前 YOLO 项目，模型复杂程度也高很多）

![image-20230328165810160](images/task08/image-20230328165810160.png)

![image-20230328165918514](images/task08/image-20230328165918514.png)

* Positional Embedding

![image-20230328170518906](images/task08/image-20230328170518906.png)

![image-20230328170638111](images/task08/image-20230328170638111.png)

* 2023/03/28 17:09:14



------



#### 8.1.2 BERT 模型的预训练任务

![image-20230328171041282](images/task08/image-20230328171041282.png)

* MLM 和 NSP
* `[mask]` 80%、10%、10%

![image-20230328173836956](images/task08/image-20230328173836956.png)

* 编出句子对



------



#### 8.1.3 预训练模型拓展

![image-20230328175517429](images/task08/image-20230328175517429.png)



------



#### 8.1.4 PaddleNLP 中预训练模型

* **一定要牢记：预训练模型的范式表** 

![image-20230328180232831](images/task08/image-20230328180232831.png)

![image-20230328180423759](images/task08/image-20230328180423759.png)

![image-20230328180519082](images/task08/image-20230328180519082.png)

![image-20230328180927973](images/task08/image-20230328180927973.png)



------



### 8.2 NLP 主流任务和快速实践

#### 8.2.1 基于BERT实现 NLP 主流任务

![image-20230328181645776](images/task08/image-20230328181645776.png)

* BERT 微调形式：

![image-20230328181837901](images/task08/image-20230328181837901.png)

![image-20230328183305216](images/task08/image-20230328183305216.png)

![image-20230328183344159](images/task08/image-20230328183344159.png)



------



#### 8.2.2 基于BERT实现文本匹配*

![image-20230328183438218](images/task08/image-20230328183438218.png)

![image-20230328183508104](images/task08/image-20230328183508104.png)

![image-20230328183544725](images/task08/image-20230328183544725.png)

![image-20230328183732593](images/task08/image-20230328183732593.png)

![image-20230328184533598](images/task08/image-20230328184533598.png)

![image-20230328184625755](images/task08/image-20230328184625755.png)

![image-20230328192128453](images/task08/image-20230328192128453.png)

* warm up 策略，常用

![image-20230328192451921](images/task08/image-20230328192451921.png)

![image-20230328192626777](images/task08/image-20230328192626777.png)

* 总结

![image-20230328192639522](images/task08/image-20230328192639522.png)

* 2023/03/28 19:48:14



------



* 学完要总结不同老师的讲述方式、知识编排顺序、提出的问题，并思考或完成练习题

















