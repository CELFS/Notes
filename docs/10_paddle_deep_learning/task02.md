---
sidebar_label: "Task02 一个案例吃透深度学习"
---

### Task02 一个案例吃透深度学习

Date: 2023/03/13 15:26:15

------



[TOC]



------





### 2.1 "横纵式"学习法完整掌握深度学习模型的建模

![image-20230313153542348](D:\TyporaTxt\PicCopy\image-20230313153542348.png)

#### 2.1 从房价预测到手写数字识别

![image-20230313153554819](D:\TyporaTxt\PicCopy\image-20230313153554819.png)

![image-20230313153615948](D:\TyporaTxt\PicCopy\image-20230313153615948.png)

* CNN 对于 CV 非常好用 (图灵奖)

![image-20230313153806814](D:\TyporaTxt\PicCopy\image-20230313153806814.png)

* 套路一样 (模式)

![image-20230313153905266](D:\TyporaTxt\PicCopy\image-20230313153905266.png)

* **本章的讲述框架 (非常值得学习)**

![image-20230313153946469](D:\TyporaTxt\PicCopy\image-20230313153946469.png)

* **先纵向, 用最简单的实现过一遍, 再横向补充 (学习数学也可以模仿, 类似进度表, 但更进阶, 具有强逻辑的学习框架)**
* 等每个环节都展开后, 就发现可以写 300~400 行的深度学习模型了
* baseline 模型先跑通, 再根据实际需要, 一步步优化



------



### 2.2 通过极简方案快速完成手写数字识别任务
#### 2.2.1 读入数据和飞桨API查阅

![image-20230313155328887](D:\TyporaTxt\PicCopy\image-20230313155328887.png)

* step 1: 实现一个完整的 baseline

![image-20230313155403411](D:\TyporaTxt\PicCopy\image-20230313155403411.png)

* step 2: 后续会频繁用到 API 信息
  * 注意版本选择, 可能会有 API 差异
  * 可以根据 demo, 研究 API 的输入和输出

![image-20230313155529421](D:\TyporaTxt\PicCopy\image-20230313155529421.png)

* 2023/03/13 15:59:38



#### 2.2.2 模型设计、训练和测试

![image-20230313155958976](D:\TyporaTxt\PicCopy\image-20230313155958976.png)

![image-20230313160008795](D:\TyporaTxt\PicCopy\image-20230313160008795.png)

![image-20230313160135426](D:\TyporaTxt\PicCopy\image-20230313160135426.png)



![image-20230313160353197](D:\TyporaTxt\PicCopy\image-20230313160353197.png)

* 从房价迁移的模型, 需深度优化才可用于手写识别

![image-20230313160445901](D:\TyporaTxt\PicCopy\image-20230313160445901.png)





### 2.3 数据处理
#### 2.3.1 分析数据集结构拆分训练和测试集

![image-20230313161716187](D:\TyporaTxt\PicCopy\image-20230313161716187.png)

![image-20230313161728156](D:\TyporaTxt\PicCopy\image-20230313161728156.png)

* 这里提到较多的超参数
  * paddle 数据集(学习)和实际开发数据集的区别
    * 乱数据, 脏数据, 缺失值, 问题数据 (需数据逻辑校验)
  * 多层还是单层
  * 训练过程用些什么方法
  * 抑制参数复杂度(防止过拟合, 抑制多大)
  * 训练步长

![image-20230313162602890](D:\TyporaTxt\PicCopy\image-20230313162602890.png)

* 见过的数据, 不可避免会学到这个数据集本身的特性, 而不是我们需要的真相规律(终于理解了西瓜书里面"真相"和"版本空间"的意义了)

![image-20230313163138610](D:\TyporaTxt\PicCopy\image-20230313163138610.png)

* 因此, 需新数据(未污染的数据), **一定要保持 test 的清洁**
* **不同的模型, 用 test dataset, 实际上相当于用这些数据对不同模型的表达形式做筛选, 而这其实应当是 validation dataset 的工作; 而 test 应当从未被污染 (即当作从来没有出现)** 
* 通过若干机构的成果融合, 相当于把 test 做成了 validation, 因此这个数据集的表现, 我们并不能 100% 信任它
* **判断方法**
  * 从成果的角度: 不明显的提升, 通常意义不大
  * 从技巧的角度: 越精妙, 往往越难迁移; 越朴素, 往往更具有通用意义



#### 2.3.2 完整处理流程和异步读取数据

![image-20230313164230705](D:\TyporaTxt\PicCopy\image-20230313164230705.png)

![image-20230313164248220](D:\TyporaTxt\PicCopy\image-20230313164248220.png)

* 使用 yield, 异步执行, 提高效率, 而不用 return

![image-20230313164508461](D:\TyporaTxt\PicCopy\image-20230313164508461.png)

* 非常常用的方法: 异步读取数据
* 让两个环节脱钩, 并行来做, 整体会非常高效
* 讲了 batch 凑不够的数据如何处理

![image-20230313165033954](D:\TyporaTxt\PicCopy\image-20230313165033954.png)

* **任何数学技巧, 都不能弥补信息的缺失**
  * 如果像电影里面, 摄像头模糊的图像, 被还原为清晰的图像, 似乎就不合理了
* **关键在于 "合理伪造"**
  * 那么, 这个合理是如何得到的呢? 如果针对的是抽象的数据?(例如糖尿病遗传风险预测)
  * 提升了模型在这些特殊情况下的精度

![image-20230313165529016](D:\TyporaTxt\PicCopy\image-20230313165529016.png)

* OCR 例子
* 2023/03/13 17:03:10



------



### 2.4 网络结构
#### 2.4 网络结构

![image-20230313205322117](D:\TyporaTxt\PicCopy\image-20230313205322117.png)

![image-20230313205328880](D:\TyporaTxt\PicCopy\image-20230313205328880.png)

* 这个搬, 不一定合理

![image-20230313205518152](D:\TyporaTxt\PicCopy\image-20230313205518152.png)

* 激活函数的工作是实现非线性变换

![image-20230313205734205](D:\TyporaTxt\PicCopy\image-20230313205734205.png)

* 这种图怎么做?
* 视觉细胞用来做听觉感知----模型要有针对性, 匹配的才是最好的

![image-20230313210037283](D:\TyporaTxt\PicCopy\image-20230313210037283.png)







------



### 2.5 损失函数
#### 2.5.1 分类任务应该用什么损失函数

![image-20230313210325553](D:\TyporaTxt\PicCopy\image-20230313210325553.png)

![image-20230313210333840](D:\TyporaTxt\PicCopy\image-20230313210333840.png)

* 选择合适的损失函数
* label 输出的背后, 是由概率分布支撑的

![image-20230313210639998](D:\TyporaTxt\PicCopy\image-20230313210639998.png)

* 淋浴的例子很好
* 迎难而上的目标, 集中在模糊地带的处理

![image-20230313211045354](D:\TyporaTxt\PicCopy\image-20230313211045354.png)

* **最大似然思想**
  * 讲得太好了!!
  * 哪个假设更容易生成看到的结果, 这个假设就大概率是这个数据背后的规律 (也能理解 "似然" 的意思了)



#### 2.5.2 交叉熵的代码实现

![image-20230313211559341](D:\TyporaTxt\PicCopy\image-20230313211559341.png)

![image-20230313211615680](D:\TyporaTxt\PicCopy\image-20230313211615680.png)

![image-20230313211858585](D:\TyporaTxt\PicCopy\image-20230313211858585.png)

* 熟悉 softmax 之后, 对于读很多论文和案例有帮助



------



### 2.6 优化算法
#### 2.6 优化算法

![image-20230313212734119](D:\TyporaTxt\PicCopy\image-20230313212734119.png)

![image-20230313212754242](D:\TyporaTxt\PicCopy\image-20230313212754242.png)

* SGD 盲人法

![image-20230313213030850](D:\TyporaTxt\PicCopy\image-20230313213030850.png)

* 这里例子非常形象

![image-20230313213335940](D:\TyporaTxt\PicCopy\image-20230313213335940.png)







------



### 2.7 资源配置
#### 2.7 资源配置

![image-20230313215300878](D:\TyporaTxt\PicCopy\image-20230313215300878.png)

![image-20230313215309872](D:\TyporaTxt\PicCopy\image-20230313215309872.png)

* 控制 cpu 和 gpu, 感受速度差别

![image-20230313215738455](D:\TyporaTxt\PicCopy\image-20230313215738455.png)

* 分布式训练 (计算机集群)

* 大模型兴起 (2020? 参考前面的历史背景)

![image-20230313220606489](D:\TyporaTxt\PicCopy\image-20230313220606489.png)

* 代码层面的修改是简单的(多卡)

![image-20230313220733020](D:\TyporaTxt\PicCopy\image-20230313220733020.png)

* 2023/03/13 22:21:00 2.4-2.7 1h18min



------



### 2.8 训练调试与优化
#### 2.8.1 训练过程中的关键问题

![image-20230314114535175](D:\TyporaTxt\PicCopy\image-20230314114535175.png)

![image-20230314114543300](D:\TyporaTxt\PicCopy\image-20230314114543300.png)

![image-20230314114658135](D:\TyporaTxt\PicCopy\image-20230314114658135.png)

![image-20230314114908797](D:\TyporaTxt\PicCopy\image-20230314114908797.png)

![image-20230314115127556](D:\TyporaTxt\PicCopy\image-20230314115127556.png)

* 这个学生可能只是学会了例题, 没有学会背后本质的内容



#### 2.8.2 过拟合的原理和解决方案

![image-20230314115338055](D:\TyporaTxt\PicCopy\image-20230314115338055.png)

* **学术理解 + 简单理解**

* **欠拟合 or 过拟合: 听不懂 or 一句话琢磨半天**

![image-20230314115916053](D:\TyporaTxt\PicCopy\image-20230314115916053.png)

* eg: 侦探(非常生动)

![image-20230314120054287](D:\TyporaTxt\PicCopy\image-20230314120054287.png)

* 正则化项: 加入模型限制 (模型层面相当于; 又找到了一种基于抽象的映射关系)
* L1, L2 正则化(对应阶数)



#### 2.8.3 可视化分析训练效果

![image-20230314120537709](D:\TyporaTxt\PicCopy\image-20230314120537709.png)

![image-20230314120545942](D:\TyporaTxt\PicCopy\image-20230314120545942.png)

![image-20230314120655573](D:\TyporaTxt\PicCopy\image-20230314120655573.png)

* 作业

![image-20230314120856838](D:\TyporaTxt\PicCopy\image-20230314120856838.png)



------



### 2.9 恢复训练
#### 2.9 恢复训练

![image-20230315232059145](D:\TyporaTxt\PicCopy\image-20230315232059145.png)

![image-20230315232112256](D:\TyporaTxt\PicCopy\image-20230315232112256.png)

![image-20230315233246060](D:\TyporaTxt\PicCopy\image-20230315233246060.png)

* 可对比打断前后的 loss 变化，会发现结果一样



------



### 2.10 动转静部署
#### 2.10 动转静部署

![image-20230314123946009](D:\TyporaTxt\PicCopy\image-20230314123946009.png)

![image-20230314124001839](D:\TyporaTxt\PicCopy\image-20230314124001839.png)

![image-20230314124117875](D:\TyporaTxt\PicCopy\image-20230314124117875.png)

![image-20230314124210246](D:\TyporaTxt\PicCopy\image-20230314124210246.png)

* 回顾

![image-20230314124346415](D:\TyporaTxt\PicCopy\image-20230314124346415.png)

* 作业

![image-20230314124440768](D:\TyporaTxt\PicCopy\image-20230314124440768.png)

* 2 在实际开发中是常态

* 2023/03/14 12:47:53
* 2023/03/16 17:21:18 复习，总结完毕



### 作业

![image-20230316180400941](D:\TyporaTxt\PicCopy\image-20230316180400941.png)

![image-20230316180409648](D:\TyporaTxt\PicCopy\image-20230316180409648.png)

![image-20230316180418089](D:\TyporaTxt\PicCopy\image-20230316180418089.png)

![image-20230316180424936](D:\TyporaTxt\PicCopy\image-20230316180424936.png)



![image-20230316180433748](D:\TyporaTxt\PicCopy\image-20230316180433748.png)

* 看错了，可惜

![image-20230316180448029](D:\TyporaTxt\PicCopy\image-20230316180448029.png)

* 2023/03/16 18:04:50 35min



* 原始参数，430秒

![image-20230316191618620](D:\TyporaTxt\PicCopy\image-20230316191618620.png)

* epoch = 10，857.355秒

![image-20230316192208771](D:\TyporaTxt\PicCopy\image-20230316192208771.png)

* 原始参数，softmax，435.038秒

![image-20230316193059901](D:\TyporaTxt\PicCopy\image-20230316193059901.png)

* 原始参数，learning_rate = 0.001，可能过拟合【满足】

![image-20230316193938652](D:\TyporaTxt\PicCopy\image-20230316193938652.png)

* epoch = 10，learning_rate = 0.001，871.052秒【满足】

![image-20230316195714121](D:\TyporaTxt\PicCopy\image-20230316195714121.png)

* 原始参数，SGD，435.406秒

![image-20230316204257811](D:\TyporaTxt\PicCopy\image-20230316204257811.png)

* 原始参数，Momentum，434.226秒【满足】

![image-20230316205124413](D:\TyporaTxt\PicCopy\image-20230316205124413.png)

* 原始参数，Adagrad，482.836秒【满足】

![image-20230316210743043](D:\TyporaTxt\PicCopy\image-20230316210743043.png)

* epoch = 10，learning_rate = 0.001，添加一卷积层和一池化层，1081.393秒

![image-20230317002706598](D:\TyporaTxt\PicCopy\image-20230317002706598.png)

* epoch = 10，learning_rate = 0.001，conv3 + max_pool3
* 增加层
* dropout



* 整理
  * 原始参数，430秒【acc=0.975】
  * epoch = 10，857.355秒【acc=0.982】
  * 原始参数，softmax，435.038秒【acc=0.10】
  * 原始参数，learning_rate = 0.001，可能过拟合【acc=0.988，满足】
  * epoch = 10，learning_rate = 0.001，871.052秒【acc=0.990，满足，02】
  * 原始参数，SGD，435.406秒【acc=0.98】
  * 原始参数，Momentum，434.226秒【acc=0.986，满足】
  * 原始参数，Adagrad，482.836秒【acc=0.988，满足】
  * epoch = 10，learning_rate = 0.001，添加一卷积层和一池化层，1081.393秒【acc=0.993，满足，目前最大】
    * 选用本地 GPU，179秒
* 2023/03/17 0:32:22 2h3min

