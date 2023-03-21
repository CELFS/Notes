### Task02 预备知识

Date：2023/03/19 17:39:33

------



[TOC]



------





### 01 资源背景

* Task02 任务安排：[在线地址](https://learning.datawhale.club/p/t_pc/course_pc_detail/image_text/i_6407161ce4b030cacb20bdf0)

* **线性代数：**用于处理表格数据（矩阵运算的基本原理及实现）
* **微积分：**用于算法优化（决定调参方式）
* **概率统计：**用于预测（在不确定的情况下进行严格推断）
* 补充
  * [中文在线（预备知识）](https://zh-v2.d2l.ai/chapter_preliminaries/linear-algebra.html) 
  * [英文在线（数理补充）](https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html) 



------



### 02 数据操作

* 张量类（ $n$ 维数组，对应 `Numpy` 的 `ndarray`）
  * 优势：支持 GPU 加速，支持自动微分
  * **结构：**
    * 轴/维度（两个以上轴的张量没有特定数学名称）
    * 元素（element） `x.numel()` （size）
    * 形状（shape）
      * `x.shape` （沿每个轴的长度）
      * `x.reshape(height, width)` （只改形状，**不改大小**，`-1` 自动）
    * **初始化**
      * `torch.arange(12)` 
      * `torch.zeros((2, 3, 4))` 
      * `torch.ones((2, 3, 4))` 
      * `torch.randn((3, 4))` （从特定概率分布随机采样）
  * **运算：**
    * **按元素（elementwise）**
      * 前提：具有相同形状的张量
      * 运算：`+, -, *, /, **` 
        * `torch.tensor([1, 2, 3, 4]) + torch.tensor([1, 1, 0, 0])` （ `x + y` ）
        * `torch.exp(x)` （支持求幂……etc.）
      * $f:\mathbb{R} \to \mathbb{R}, \quad f:\mathbb{R},\mathbb{R} \to \mathbb{R}$ 
      * $\mathbf{c} = F(\mathbf{u}, \mathbf{v}), \quad c_i \leftarrow f(u_i, v_i), \quad F:\mathbb{R}^d, \mathbb{R}^d \to \mathbb{R}^d$ （标量函数升级）
    * 连接（concatenate）（端对端叠起来）
      * `torch.cat((X, Y), dim=0)` （按行叠 `dim=0`，按列叠 `dim=1` ）
    * 向量点积、矩阵乘法（2.3节）
    * 逻辑运算： `X ==Y` 
    * 求和：`X.sum()` （得到单元素张量 `Out: tenser(sum_result)` ）
    * **广播机制（broadcasting mechanism）**
      * 背景：形状不同的张量运算需求 ===> 根据情况复制列、复制行，按元素运算（按大复制）
      * `ts([[0], [1], [2]]) + ts([[0, 1]])` $\longrightarrow$ `ts([[0, 1], [1, 2], [2, 3]])` 
    * 索引、切片、赋值
      * `X[0:2, :] = 12` ， `0:2` （1, 2行）， `:` （所有列）
  * **内存优化：**
    * 避免不必要的内存分配，原地更新（避免误引用旧数据）
    * `Y[:] = <expression>` 切片表示法（指向同一内存地址 `id()`，浅拷贝）
  * 类型转换：
    * `torch` 张量转为 `Numpy` 张量（共享内存，就地操作）
    * 大小为 `1` 的张量转为 `Python` 标量（`item()` 或内置函数）



------



### 03 数据预处理

* **读取数据集**
  *  `pandas` , `CSV` 文件
  *  `data = pandas.read_csv(data_file)` 
* **处理缺失值**
  *  `.iloc[row, col]`，`.fillna()`，`.mean()` 
  * 类别值/离散值（把 “NaN” 当作一种特征）
    *  `inputs = pd.get_dummies(inputs, dummy_na=True)` 
* 所有条目转换为**张量格式**
  *  `X, y = torch.tensor(inputs.values), torch.tensor(outputs.values)` 



------



### 04 补充

* **QA 话题参考**
  * 维度辨析 `.ndim()`、可视化工具的编程效率、多维数组的熟悉、内存释放
  * `Numpy` vs 线性代数、`Numpy` VS `Pytorch` 、`Jax` VS `Numpy` 
  * `tensor` VS `array` 、`reshape` VS `view` 

* 补充
  * 注意区分 `shape` , 比较下面 `b, c` 的维度，可用 `.ndim()` 

```python
a = torch.arange(3).reshape((3, 1))
b = torch.arange(2).reshape((1, 2))
c = torch.arange(2)
```

```python
>>> a, b, c
(tensor([[0],		# a
         [1],
         [2]]),
 tensor([[0, 1]]),  # b
 tensor([0, 1]))	# c

>>> a.shape, b.shape, c.shape
(torch.Size([3, 1]), torch.Size([1, 2]), torch.Size([2]))
```

*  `dir()` 、`help(command)`
* 练习（待补充）



------

* 2023/03/21 20:40:43



### 05 矩阵计算（线性代数）

* 必要概念
  * 基本数学对象
    * 标量（标量、变量、实数、空间）
    * 向量（元素/分量）、矩阵（方阵、转置 `X.T`、对称矩阵）
    * 张量（哈达玛积）
  * 性质（元素、长度、维度、形状、范数 `.norm(u)` ）
  * 运算：
    * 降维、非降维求和
    * 点积 `.dot(x, y)` 
      * 矩阵-向量积 `.mv(A, x)` 、矩阵-矩阵乘法 `.mm(A, B)` 
    * 哈达玛积 `A * B` 



------



### 06 自动求导（微积分）

* 必要概念
  * 导数、微分（可微）、多元函数、偏导数、梯度、链式法则（复合）
* 自动微分
  * 存储梯度、非标量变量的反响传播、分离计算、Python 控制流的梯度计算
  * `.requires_grad(True)` 、`x.grad` 



------



### 07 概率

* 背景：人类感官具有生理极限，而机器学习本质在做预测，可辅助给出判断的程度
* 概率：提供一种正式的途径来说明我们的确定性水平
* 从结果上，关键区别：二选一（确定）、随机事件（不确定）
* 必要概念
  * 基本概率论（事件、大数定律、抽样、分布、多项分布）
    * 概率论公理（样本空间/结果空间、结果、事件、概率、互斥）
    * 随机变量（随机变量、分布、离散、连续、密度）
  * 处理多个随机变量
    * 联合概率、条件概率、贝叶斯定理（乘法法则、联合分布、条件分布）
    * 边际化（求和法则、边际概率/边际分布）
    * 独立性（依赖、独立、条件独立）
  * 期望和方差（期望/平均值、方差、标准差）
* 包：`multinomial` 



------

* 2023/03/21 22:42:48 





















