---
sidebar_label: "Task07 自然语言处理模型的网络结构"
---

### Task07 自然语言处理模型的网络结构

Date：

------



[TOC]



------





### 7.1 NLP经典神经网络

![image-20230327201718686](images/task07/image-20230327201718686.png)

#### 7.1.1RNN、LSTM、评估指标

![image-20230327201851236](images/task07/image-20230327201851236.png)

* 或者 “递归神经网络”

![image-20230327202018052](images/task07/image-20230327202018052.png)

* 面对长序列，性能不佳，因此改进，有了 LSTM

![image-20230327202103422](images/task07/image-20230327202103422.png)

![image-20230327202211382](images/task07/image-20230327202211382.png)

* 门结构

![image-20230327202258070](images/task07/image-20230327202258070.png)

![image-20230327202432015](images/task07/image-20230327202432015.png)



------



#### 7.1.2 情感分析、建模方式、模型架构

* 情感分析（Hello World）

![image-20230327202545136](images/task07/image-20230327202545136.png)

![image-20230327202636398](images/task07/image-20230327202636398.png)

![image-20230327202746600](images/task07/image-20230327202746600.png)

![image-20230327202802592](images/task07/image-20230327202802592.png)

![image-20230327202937477](images/task07/image-20230327202937477.png)

* 2023/03/27 20:32:41



------



#### 7.1.3 用飞桨实现情感分析

![image-20230327212927345](images/task07/image-20230327212927345.png)

![image-20230327212933702](images/task07/image-20230327212933702.png)

![image-20230327212939103](images/task07/image-20230327212939103.png)

* 经典入门 NLP 数据集

![image-20230327212955525](images/task07/image-20230327212955525.png)

* 关键是做成迭代器

![image-20230327213020405](images/task07/image-20230327213020405.png)

![image-20230327213054683](images/task07/image-20230327213054683.png)

![image-20230327213123764](images/task07/image-20230327213123764.png)

* 模型搭建：

![image-20230327213224027](images/task07/image-20230327213224027.png)

* 分析网络如何搭建：

![image-20230327213335239](images/task07/image-20230327213335239.png)

![image-20230327213530038](images/task07/image-20230327213530038.png)

![image-20230327213617327](images/task07/image-20230327213617327.png)

![image-20230327213631229](images/task07/image-20230327213631229.png)



------



### 7.2 Transformer网络结构

#### 7.2.1自注意力模型

![image-20230327213739598](images/task07/image-20230327213739598.png)

* 为了解决 RNN 长距离依赖、不能进行并行计算的缺点

![image-20230327213832898](images/task07/image-20230327213832898.png)

* $\alpha$ 即注意力系数

![image-20230327213832898](images/task07/image-20230327213832898.png)

* 因为结果值比较大，需要归一化处理，而结果又涉及概率，除以 $\sqrt{D_k}$ 可以使得数据变集中；而除法之后得到的是数值，因此为了得到系数，用 Softmax 处理

![image-20230327214105866](images/task07/image-20230327214105866.png)

![image-20230327214150545](images/task07/image-20230327214150545.png)

* 模型单元：

![image-20230327214230955](images/task07/image-20230327214230955.png)

![image-20230327214242787](images/task07/image-20230327214242787.png)

![image-20230327214322124](images/task07/image-20230327214322124.png)

![image-20230327214418829](images/task07/image-20230327214418829.png)

* 2023/03/27 21:44:57 



------



#### 7.2.2 Seq2Seq模型

![image-20230328144338691](images/task07/image-20230328144338691.png)

* 这种结构很重要，泛用性很广

![image-20230328144407003](images/task07/image-20230328144407003.png)

![image-20230328145016459](images/task07/image-20230328145016459.png)

* 自控制结构的实现

![image-20230328145132283](images/task07/image-20230328145132283.png)

![image-20230328145254320](images/task07/image-20230328145254320.png)



------



#### 7.2.3 Transformer模型 *

![image-20230328150548932](images/task07/image-20230328150548932.png)

* 本内容后面学习，只会用到左边的结构，而像 GPT 模型，则需要加上右边的结构

![image-20230328155044524](images/task07/image-20230328155044524.png)

* 六层

![image-20230328161850062](images/task07/image-20230328161850062.png)

![image-20230328162344338](images/task07/image-20230328162344338.png)

* 利用周期性变化，表征位置信息

![image-20230328162427395](images/task07/image-20230328162427395.png)

![image-20230328162529838](images/task07/image-20230328162529838.png)

![image-20230328162610397](images/task07/image-20230328162610397.png)

* Layer Normalization 归一化处理，很适合 NLP 模型
* 观察其余结构，都是线性的，而 Feed Forward 可处理非线性内容，加入后能够提升模型性能（论文）

* 思考模型设计的意义



------



#### 7.2.4 新闻分类任务实现

![image-20230328163026292](images/task07/image-20230328163026292.png)

![image-20230328163107313](images/task07/image-20230328163107313.png)

![image-20230328163133084](images/task07/image-20230328163133084.png)

![image-20230328163305062](images/task07/image-20230328163305062.png)

![image-20230328163411054](images/task07/image-20230328163411054.png)

![image-20230328163440774](images/task07/image-20230328163440774.png)

![image-20230328163544683](images/task07/image-20230328163544683.png)

* 先搭建一层 `encoder_layer`，再用 `TransformerEncoder` 搭六层结构（层层叠加）

![image-20230328164057494](images/task07/image-20230328164057494.png)

![image-20230328164325141](images/task07/image-20230328164325141.png)

* 权重衰减 line 27
* 模型很多操作都是为了减少过拟合（层多了就容易过拟合，就像人一样，学得多了，如果不丢弃一些，或者做一些规范整理，思绪就会更具有倾向性而妨碍了进步）

![image-20230328164548425](images/task07/image-20230328164548425.png)

* 当完成所有模型训练，认为模型收敛之后，就可以做模型测试

![image-20230328164707659](images/task07/image-20230328164707659.png)

* 作业

![image-20230328164754251](images/task07/image-20230328164754251.png)

* 总结

![image-20230328164814081](images/task07/image-20230328164814081.png)

* 2023/03/28 16:48:15



------



### 第三周 直播课 LLM 模型

* 2023/03/27 20:30

* 零样本预测能力
* 思维链涌现 OCT

![image-20230327203800302](images/task07/image-20230327203800302.png)

* 插件补短板

![image-20230327204042543](images/task07/image-20230327204042543.png)

* 数据飞轮的形成
* 达芬奇 002

![image-20230327204614092](images/task07/image-20230327204614092.png)

* 必然逃不过理论基础，Transformer 的 decode 结构
* 自编码模型，自回归模型

![image-20230327204836242](images/task07/image-20230327204836242.png)

* 沿用了预训练 + 微调的结构（YOLO 作业也是这么做了）

![image-20230327205158783](images/task07/image-20230327205158783.png)

* 发现：零样本的多任务能力（涌现）

![image-20230327205454653](images/task07/image-20230327205454653.png)

* GPT-3 2020 年，60 页报告（讲训练过程、实现思路）
* 两种问题
  * 胡说八道
  * 安全风险

* API、玩等方式，形成了数据飞轮的闭环

![image-20230327210021399](images/task07/image-20230327210021399.png)

* 后续课程讲解

![image-20230327210105283](images/task07/image-20230327210105283.png)

* 第八节很关键
* GPT 开源中间件
* GPT-3 预训练模型不建议继续微调，因为成本太高（几千的集群）
  * 官方更希望基于 prompt 挖掘
  * 应该储备的知识：如何写 prompt、如何对接数据库，等到 API
* 文心千帆（2023/03/27 下午发布）
* 跟上，多学，挖掘工具能力
* ChatGPT + Plugins 新生态
* toB 商业化变现













