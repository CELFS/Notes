---
sidebar_label: "07-1 Week Support Vector Machines"
---

# 07-1 Week Support Vector Machines

Date：2022/05/16 21:11:19

------



[TOC]



------



# Large Margin Classification

## Optimization Objective

![image-20220516211832873](images/07_1_Week_Support_Vector_Machines/image-20220516211832873.png)

* 【QUESTION : Why the results of y = 1 and y = 0 were compared with the ZERO ? And to explain the >> or >> , NO NO NO, I need to come back to the sigmoid function, may be I have misunderstood the X-axis an the Y-axis in the graph.】
  * 【I get it ! 2022/05/20 15:46:05】【x-axis is z, y-axis is h, WE WANT h approach to 1 when y = 1, hence the z = $\theta^Tx$ will be tend to infinity or much bigger than 0 (far from the point of (0, 0)), just like a inverse function】

![image-20220516212900873](images/07_1_Week_Support_Vector_Machines/image-20220516212900873.png)

![image-20220516213516915](images/07_1_Week_Support_Vector_Machines/image-20220516213516915.png)

* 【$C = \frac{1}{\lambda}$ , let the coefficient of B to 1, in the equations $\frac{1}{m} A + \frac{\lambda}{2m} B = 0$ and $CA + \frac{1}{2} B = 0$】

![image-20220516213717693](images/07_1_Week_Support_Vector_Machines/image-20220516213717693.png)

![image-20220516213811947](images/07_1_Week_Support_Vector_Machines/image-20220516213811947.png)



## Large Margin Intuition

![image-20220517213434275](images/07_1_Week_Support_Vector_Machines/image-20220517213434275.png)

* 【On the right figure above, z ≤ 1, may be z ≤ -1】

![image-20220517213647464](images/07_1_Week_Support_Vector_Machines/image-20220517213647464.png)

![image-20220517213902475](images/07_1_Week_Support_Vector_Machines/image-20220517213902475.png)

![image-20220517214152323](images/07_1_Week_Support_Vector_Machines/image-20220517214152323.png)

![image-20220517214515733](images/07_1_Week_Support_Vector_Machines/image-20220517214515733.png)

* 【What I think is that : if C is very large, the theta or the value of h will need to be smaller(like the magenta line above, the slope got more smooth), the value of CA need to be balanced.】



## Mathematics Behind Large Margin Classification

![image-20220517220138271](images/07_1_Week_Support_Vector_Machines/image-20220517220138271.png)

* $u^T v$ : inner products
  * can be negative if the angle between them is greater than 90 degree
* $||\vec{v}||$ : length of a vector
* p : length of projection of v onto u. (magnitude of the projection)

![image-20220518154515527](images/07_1_Week_Support_Vector_Machines/image-20220518154515527.png)

* the equations above will give the same answer.(commutative or inner products or use p)
* 【What I think】
  * Let the value of $\vec{u}^T \vec{v}$ to a scalar p multiple the norm of $\vec{u}$ , that the inner products can explain to a projection of the length of $\vec{u}$ with a coefficient p => which can be explained by Linear Combination.
  * ==CAUSE VS EFFECT== (the problem come from)



![image-20220518155844550](images/07_1_Week_Support_Vector_Machines/image-20220518155844550.png)

* ==【From $\theta^T x^{(i)}$ to $p^{(i)} \cdot ||\theta||$】== 

![image-20220518160930902](images/07_1_Week_Support_Vector_Machines/image-20220518160930902.png)



![image-20220518161545095](images/07_1_Week_Support_Vector_Machines/image-20220518161545095.png)

![image-20220518161722365](images/07_1_Week_Support_Vector_Machines/image-20220518161722365.png)

![image-20220518162012664](images/07_1_Week_Support_Vector_Machines/image-20220518162012664.png)

* 【WRONG】



------

# Kernels

## Kernels I

![image-20220519183021611](images/07_1_Week_Support_Vector_Machines/image-20220519183021611.png)

![image-20220519183411233](images/07_1_Week_Support_Vector_Machines/image-20220519183411233.png)

* Gaussian Kernels

![image-20220519183738558](images/07_1_Week_Support_Vector_Machines/image-20220519183738558.png)

![image-20220519184026495](images/07_1_Week_Support_Vector_Machines/image-20220519184026495.png)

* 【sigma 越小，说明 f 与 x 越接近，即差异越少，展示的图像信息将越集中，当然，还要回到 exp 函数图像中理解，这是一种用 f 对 x 的近似表达，我的理解是增加了训练样本的操作冗余度，即提升鲁棒性，增加 “容忍” 度，从而提高模型的泛化能力。接下来就是要回到数学问题上去寻求理解了。】

![image-20220519184143145](images/07_1_Week_Support_Vector_Machines/image-20220519184143145.png)

![image-20220519184312536](images/07_1_Week_Support_Vector_Machines/image-20220519184312536.png)



![image-20220519184850294](images/07_1_Week_Support_Vector_Machines/image-20220519184850294.png)

* 【留意到，当 y = 1，决策边界圈定了 l1 和 l2 的范围，从这个点出发，可以进一步理解这几步的意义】
* 【注意，x、y 轴分别是 x1，x2】



## Kernels II

![image-20220520145509111](images/07_1_Week_Support_Vector_Machines/image-20220520145509111.png)

![image-20220520145831071](images/07_1_Week_Support_Vector_Machines/image-20220520145831071.png)

* ==New feature to represent the training example.== 

![image-20220520150727794](images/07_1_Week_Support_Vector_Machines/image-20220520150727794.png)

![image-20220520151146054](images/07_1_Week_Support_Vector_Machines/image-20220520151146054.png)

* 【可否这样理解：C 越大，正则项的作用越小，theta 代表的 假设函数权重越大，因此多项式的影响变大，从而导致 high variance —— 或者回到 high variance 的定义上，去看前面关于 sigma 的图，也许 C 的两类影响是类似的，要么高方差，要么高偏差】

![image-20220520151256783](images/07_1_Week_Support_Vector_Machines/image-20220520151256783.png)



# SVM in Practice

## Using An SVM

![image-20220520151823461](images/07_1_Week_Support_Vector_Machines/image-20220520151823461.png)

* 超参数问题

![image-20220520152256408](images/07_1_Week_Support_Vector_Machines/image-20220520152256408.png)

* feature scaling

![image-20220520153056603](images/07_1_Week_Support_Vector_Machines/image-20220520153056603.png)

![image-20220520153427175](images/07_1_Week_Support_Vector_Machines/image-20220520153427175.png)



![image-20220520153604046](images/07_1_Week_Support_Vector_Machines/image-20220520153604046.png)

![image-20220520154139808](images/07_1_Week_Support_Vector_Machines/image-20220520154139808.png)



2022/05/20 17:18:26 2h28min kernel II to the end

------



# 【Exam】

![image-20220520182135556](images/07_1_Week_Support_Vector_Machines/image-20220520182135556.png)

![image-20220520184023596](images/07_1_Week_Support_Vector_Machines/image-20220520184023596.png)



![image-20220520182228989](images/07_1_Week_Support_Vector_Machines/image-20220520182228989.png)

![image-20220520182620904](images/07_1_Week_Support_Vector_Machines/image-20220520182620904.png)

![image-20220520184035344](images/07_1_Week_Support_Vector_Machines/image-20220520184035344.png)



![image-20220520182827942](images/07_1_Week_Support_Vector_Machines/image-20220520182827942.png)

![image-20220520184046817](images/07_1_Week_Support_Vector_Machines/image-20220520184046817.png)



![image-20220520183659665](images/07_1_Week_Support_Vector_Machines/image-20220520183659665.png)

![image-20220520184059363](images/07_1_Week_Support_Vector_Machines/image-20220520184059363.png)



![image-20220520184011673](images/07_1_Week_Support_Vector_Machines/image-20220520184011673.png)

![image-20220520184115282](images/07_1_Week_Support_Vector_Machines/image-20220520184115282.png)





![image-20220520184632734](images/07_1_Week_Support_Vector_Machines/image-20220520184632734.png)

![image-20220520184654710](images/07_1_Week_Support_Vector_Machines/image-20220520184654710.png)

![image-20220520184507611](images/07_1_Week_Support_Vector_Machines/image-20220520184507611.png)

![image-20220520184709075](images/07_1_Week_Support_Vector_Machines/image-20220520184709075.png)



2022/05/20 18:47:18 28min