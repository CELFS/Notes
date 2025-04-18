---
sidebar_label: "09-2 Week Recommender Systems"
---

# 09-2 Week Recommender Systems

Date：2022/06/01 16:42:21

------





[TOC]



------



# Predicting Movie Ratings

## Problem Formulation

![image-20220601170020132](images/09_2_Week_Recommender_Systems/image-20220601170020132.png)

![image-20220601170324730](images/09_2_Week_Recommender_Systems/image-20220601170324730.png)

* r 表示有无进行评分。
* y 表示具体分数。



## Content Based Recommendations

![image-20220601170955304](images/09_2_Week_Recommender_Systems/image-20220601170955304.png)

![image-20220601173007341](images/09_2_Week_Recommender_Systems/image-20220601173007341.png)

* 【Not sure. But can calculate.】【OK】【Solved】
* 【some problem came from the operation sequence】
  * x0 => 0 (placeholder)
  * x1 => x1 (score)
  * x2 => x2 (score)

```octave
A = [  1      1     1;
      0.9    0.1    0;
       0      1    0.9]
   
b = [0; 5; 5]
##b;  % If don't have a ";" will recognzie to a command of Octave.
  
theta3_ans = [0; 0; 5]
theta3_cal = [0; 50; -50]
A1 = A(:, 1)

##cA = theta3_cal' * A
A_c = A * theta3_cal
A_a = A * theta3_ans % Only this answer can get the right values of y^(i,3).

##theta3_o1 = [0; 5; 0]
##theta3_o2 = [0; 0; 1]
##theta3_o3 = [1; 0; 4]
##A_o1 = A * theta3_o1
##A_o2 = A * theta3_o2
##A_o3 = A * theta3_o3
##AT_o1 = A' * theta3_o1 % Regardless of operation order, we only discuss the values of results.
##AT_o2 = A' * theta3_o2
##AT_o3 = A' * theta3_o3

AT_a = A' * theta3_ans % We get the right order of y^(i,3).
```

```Octave
A_c =
        0
   5.0000
   5.0000

A_a =
   5.0000
        0
   4.5000

AT_a =
        0
   5.0000
   4.5000
```



![image-20220601174406146](images/09_2_Week_Recommender_Systems/image-20220601174406146.png)

![image-20220601174527373](images/09_2_Week_Recommender_Systems/image-20220601174527373.png)

![image-20220601174748029](images/09_2_Week_Recommender_Systems/image-20220601174748029.png)



2022/06/01 18:46:23 2h7min + 8min

------



# Collaborative Filtering

## Collaborative Filtering

![image-20220602122328523](images/09_2_Week_Recommender_Systems/image-20220602122328523.png)

* 【上面的顺序问题解决了。关键是在这里找到数值实际代表的含义，以及对 0 元素的处理】

![image-20220602122351333](images/09_2_Week_Recommender_Systems/image-20220602122351333.png)

![image-20220602122625519](images/09_2_Week_Recommender_Systems/image-20220602122625519.png)

![image-20220602122858651](images/09_2_Week_Recommender_Systems/image-20220602122858651.png)

* 【多元微积分求导问题，还是回到了 Calculus】
  * 以及分布模型

![image-20220602123047313](images/09_2_Week_Recommender_Systems/image-20220602123047313.png)



## Collaborative Filtering Algorithm

![image-20220602123645367](images/09_2_Week_Recommender_Systems/image-20220602123645367.png)

* 【different between $\theta_{k}^{(j)}$ with $x_k^{(i)}$ of the regularization item.】
  * Cost function => Add the different terms.

![image-20220602123856937](images/09_2_Week_Recommender_Systems/image-20220602123856937.png)

![image-20220602123940294](images/09_2_Week_Recommender_Systems/image-20220602123940294.png)



# Low Rank Matrix Factorization

## Vectorization: Low Rank Matrix Factorization

![image-20220602124155175](images/09_2_Week_Recommender_Systems/image-20220602124155175.png)

![image-20220602124635732](images/09_2_Week_Recommender_Systems/image-20220602124635732.png)

* 【X】
  * 原数据默认为列向量。维度 $3 \times 1$ 
  * 转置。维度 $1 \times 3$ 
  * 各行整合，共 $n_m$ 行。分别代表不同 users 的评分标准。
  * 维度 $n_m \times 3$ 
* 【Theta】
  * 原数据默认为列向量。维度 $n_{m} \times 1$ 
  * 转置。维度 $1 \times n_{m}$ 
  * 各行整合，共 $n_{u} $ 行。分别代表不同 users 对不同 movies 的评分结果。
  * 维度 $n_u \times n_m$ 
* 根据以上推导，两种合法的运算
  * $\Theta \times X$ 
  * $X^T \times \Theta^T$ 

![image-20220602124644489](images/09_2_Week_Recommender_Systems/image-20220602124644489.png)

* 【需清晰化】
* 根据以上推理结果，为了表示上图矩阵的向量化形式
  * 将 Theta 的各行，表示为与 X 的各列的积
    * 即将 Theta 作为参数，于是写于右侧
    * Theta 转置，以匹配 X 的各列。
  * 【但，这会引出一个维度问题】
    * 如果上述操作可执行，即有意义，或者说符合矩阵的积运算定义
    * 前提是 Theta 转置后的列维度，需要与 X 的行维度匹配
      * 即 $n_{u} = n_{m}$ 
      * 但似乎前面几周的很多练习，都没有考虑这个问题 ？或者是我还没看懂其中的特殊化处理 ？
      * 或者，这里的维度不取决于 u、m，而是 n ？至少现在还看不出来。

![image-20220602124912050](images/09_2_Week_Recommender_Systems/image-20220602124912050.png)

* 【Beyond expectation (or not, who knows), norm can use for that !】



## Implementational Detail: Mean Normalization

![image-20220602130424112](images/09_2_Week_Recommender_Systems/image-20220602130424112.png)

![image-20220602130754814](images/09_2_Week_Recommender_Systems/image-20220602130754814.png)

![image-20220602131023817](images/09_2_Week_Recommender_Systems/image-20220602131023817.png)

* 【这里对 “?” 的处理，还没看懂】



2022/06/02 14:05:20 1h48min

------



# 【Exam】

![image-20220602195651841](images/09_2_Week_Recommender_Systems/image-20220602195651841.png)

![image-20220602195910236](images/09_2_Week_Recommender_Systems/image-20220602195910236.png)

![image-20220602202136640](images/09_2_Week_Recommender_Systems/image-20220602202136640.png)



![image-20220602200132132](images/09_2_Week_Recommender_Systems/image-20220602200132132.png)

![image-20220602200756837](images/09_2_Week_Recommender_Systems/image-20220602200756837.png)

![image-20220602201700244](images/09_2_Week_Recommender_Systems/image-20220602201700244.png)

![image-20220602201653470](images/09_2_Week_Recommender_Systems/image-20220602201653470.png)







![image-20220602203051704](images/09_2_Week_Recommender_Systems/image-20220602203051704.png)

![image-20220602203058400](images/09_2_Week_Recommender_Systems/image-20220602203058400.png)

![image-20220602202810535](images/09_2_Week_Recommender_Systems/image-20220602202810535.png)

![image-20220602202657267](images/09_2_Week_Recommender_Systems/image-20220602202657267.png)

![image-20220602203110095](images/09_2_Week_Recommender_Systems/image-20220602203110095.png)



2022/06/02 20:42:58 50min