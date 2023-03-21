### Task02 预备知识

Date：2023/03/19 17:39:33

------



[TOC]



------





### 00 内容总结

#### 01 课程

* Task02 任务安排：[在线地址](https://learning.datawhale.club/p/t_pc/course_pc_detail/image_text/i_6407161ce4b030cacb20bdf0)



------



#### 02 数理基础

* **线性代数：**用于处理表格数据（矩阵运算的基本原理及实现）
* **微积分：**用于算法优化（决定调参方式）
* **概率统计：**用于预测（在不确定的情况下进行严格推断）
* 补充
  * [中文在线（预备知识）](https://zh-v2.d2l.ai/chapter_preliminaries/linear-algebra.html) 
  * [英文在线（数理补充）](https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html) 



------



#### 03 数据操作

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



#### 04 数据预处理

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



#### 05 补充

* **QA 话题参考**
  * `.ndim()` 维度辨析、可视化工具编程效率、多维数组的熟悉、内存释放
  * `Numpy` vs 线性代数、`Numpy` VS `Pytorch` 、`tensor` VS `array` 、`Jax` VS `Numpy` 、`reshape` VS `view` 

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

* 练习（待补充）



------

* 2023/03/21 20:40:43



### 03 线性代数



### 04 矩阵计算



### 05 自动求导



### 微积分

### 自动微分

### 概率

### 查阅文档



























