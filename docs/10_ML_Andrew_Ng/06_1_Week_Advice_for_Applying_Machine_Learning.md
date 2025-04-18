---
sidebar_label: "06-1 Week Advice for Applying Machine Learning"
---

# 06-1 Week Advice for Applying Machine Learning

Date：2022/05/08

------



[TOC]



------



# Evaluating a Learning Algorithm

## Deciding What to Try Next

![image-20220508220809178](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508220809178.png)

![image-20220508221021792](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221021792.png)

![image-20220508221044920](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221044920.png)



## Evaluating a Hypothesis

![image-20220508221310457](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221310457.png)

![image-20220508221604973](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221604973.png)

![image-20220508221520233](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221520233.png)

![image-20220508221736194](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508221736194.png)

![image-20220508222117666](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508222117666.png)



## Evaluating a Hypothesis

Once we have done some trouble shooting for errors in our predictions by: 

- Getting more training examples
- Trying smaller sets of features
- Trying additional features
- Trying polynomial features
- Increasing or decreasing λ

We can move on to evaluate our new hypothesis. 

A hypothesis may have a low error for the training examples but still be inaccurate (because of overfitting). Thus, to evaluate a hypothesis, given a dataset of training examples, we can split up the data into two sets: a **training set** and a **test set**. Typically, the training set consists of 70 % of your data and the test set is the remaining 30 %. 

The new procedure using these two sets is then:

1. Learn $\Theta$ and minimize $J_{train}(\Theta)$ using the training set
2. Compute the test set error $J_{test}(\Theta)$

## The test set error

1. For linear regression: $J_{test}(\Theta) = \dfrac{1}{2m_{test}} \sum_{i=1}^{m_{test}}(h_\Theta(x^{(i)}_{test}) - y^{(i)}_{test})^2$
2. For classification ~ Misclassification error (aka 0/1 misclassification error):

![image-20220508222245625](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508222245625.png)

This gives us a binary 0 or 1 error result based on a misclassification. The average test error for the test set is:

![image-20220508222255382](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220508222255382.png)

This gives us the proportion of the test data that was misclassified.



## Model Selection and Train/Validation/Test Sets

![image-20220510163213063](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510163213063.png)

![image-20220510163734920](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510163734920.png)

![image-20220510163920433](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510163920433.png)

![image-20220510164006671](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510164006671.png)

![image-20220510164207462](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510164207462.png)

![image-20220510164504305](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510164504305.png)



## Model Selection and Train/Validation/Test Sets

Just because a learning algorithm fits a training set well, that does not mean it is a good hypothesis. It could over fit and as a result your predictions on the test set would be poor. The error of your hypothesis as measured on the data set with which you trained the parameters will be lower than the error on any other data set. 

Given many models with ==different polynomial degrees==, we can use a systematic approach to identify the 'best' function. In order to choose the model of your hypothesis, you can ==test each degree of polynomial and look at the error result==.

One way to break down our dataset into the three sets is:

- Training set: 60%
- Cross validation set: 20%
- Test set: 20%

We can now calculate three separate error values for the three different sets using the following method:

1. ==Optimize the parameters in Θ== using the training set for each polynomial degree.
2. Find the ==polynomial degree d== with the ==least error== using the cross validation set.
3. Estimate the ==generalization error== using the test set with $J_{test}(\Theta^{(d)})$, (d = theta from polynomial with lower error);

This way, the degree of the polynomial d has not been trained using the test set.

------

# Bias vs. Variance

## Diagnosing Bias vs. Variance

![image-20220510220443669](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510220443669.png)

![image-20220510220731334](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510220731334.png)

![image-20220510221031176](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510221031176.png)

* 【The difference between high bias and high variance can diagnose by the tangent or the up and down of slope from the equations ? If the curves go with the same direction the problem is high bias, if not, is high variance ?】【BUT an answer seems to right below.】【==High bias is underfitting and high variance is overfitting==】

![image-20220510221437531](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510221437531.png)



## Diagnosing Bias vs. Variance

In this section we examine the ==relationship between== the degree of the polynomial d and the underfitting or overfitting of our hypothesis.

- We need to ==distinguish== whether **bias** or **variance** is ==the problem== contributing to bad predictions.
- ==High bias is underfitting and high variance is overfitting==. Ideally, we need to find a golden mean between these two.

The ==training error== will tend to **decrease** as we increase the degree d of the polynomial.

At the same time, the ==cross validation error== will tend to **decrease** as we increase d up to a point, and then it will **increase** as d is increased, forming a convex curve.

**High bias (underfitting)**: ==both== $J_{train}(\Theta)$ and $J_{CV}(\Theta)$ will be ==high==. Also, $J_{CV}(\Theta) \approx J_{train}(\Theta)$.

**High variance (overfitting)**: $J_{train}(\Theta)$ will be ==low== and $J_{CV}(\Theta)$ will be much ==greater== than $J_{train}(\Theta)$.

The is summarized in the figure below:

![image-20220510221935519](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510221935519.png)



## Regularization and Bias/Variance

![image-20220510223230333](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510223230333.png)

* 【**Note:** [The regularization term below and through out the video should be $\frac \lambda {2m} \sum _{j=1}^n \theta_j ^2$ and **NOT** $\frac \lambda {2m} \sum _{j=1}^m \theta_j ^2$]】



![image-20220510223335735](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510223335735.png)

* 【**Note:** [The regularization term below and through out the video should be $\frac \lambda {2m} \sum _{j=1}^n \theta_j ^2$ and **NOT** $\frac \lambda {2m} \sum _{j=1}^m \theta_j ^2$]】



![image-20220510223653421](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510223653421.png)

* 【**Note:** [The regularization term below and through out the video should be $\frac \lambda {2m} \sum _{j=1}^n \theta_j ^2$ and **NOT** $\frac \lambda {2m} \sum _{j=1}^m \theta_j ^2$]】



![image-20220510223954749](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510223954749.png)

![image-20220510224025810](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510224025810.png)

* 【Pay attention to the x-axis is lambda, the y-axis is J of theta.】

![image-20220510224455939](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220510224455939.png)

* 【**Note:** [The regularization term below and through out the video should be $\frac \lambda {2m} \sum _{j=1}^n \theta_j ^2$ and **NOT** $\frac \lambda {2m} \sum _{j=1}^m \theta_j ^2$]】



## Regularization and Bias/Variance

**Note:** [The regularization term ==below== and through out the video should be $\frac \lambda {2m} \sum _{j=1}^n \theta_j ^2$ and **NOT** $\frac \lambda {2m} \sum _{j=1}^m \theta_j ^2$]

![img](images/06_1_Week_Advice_for_Applying_Machine_Learning/3XyCytntEeataRJ74fuL6g_3b6c06d065d24e0bf8d557e59027e87a_Screenshot-2017-01-13-16.09.36.png)

In the figure above, we see that as $\lambda$ increases, our fit becomes more rigid. On the other hand, as $\lambda$ approaches 0, we tend to over overfit the data. So how do we choose our parameter $\lambda$ to get it 'just right' ? In order to choose the model and the regularization term λ, we need to:

1. Create a ==list== of lambdas (i.e. λ∈{0,0.01,0.02,0.04,0.08,0.16,0.32,0.64,1.28,2.56,5.12,10.24});
2. Create a set of ==models== with different degrees or any other variants.
3. ==Iterate== through the $\lambda$s and for each $\lambda$ go through all the models to learn some $\Theta$.
4. ==Compute== the cross validation error using the learned Θ (computed with λ) on the $J_{CV}(\Theta)$ **without** regularization or λ = 0.
5. Select the ==best== combo that produces the lowest error on the cross validation set.
6. Using the ==best== combo Θ and λ, apply it on $J_{test}(\Theta)$ to see if it has a good generalization of the problem.



## Learning Curves

![image-20220511211244135](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511211244135.png)

![image-20220511211826405](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511211826405.png)

![image-20220511212142841](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511212142841.png)

![image-20220511212349396](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511212349396.png)



## Learning Curves

Training an algorithm on ==a very few== number of data points (such as 1, 2 or 3) will easily have ==0 errors== because we can always find a quadratic curve that touches exactly those number of points. Hence:

- As the training set gets larger, the ==error== for a quadratic function ==increases==.
- The error value will ==plateau out== after a certain m, or training set size.

**Experiencing high bias:**

**Low training set size**: causes $J_{train}(\Theta)$ to be low and $J_{CV}(\Theta)$ to be high.

**Large training set size**: causes both $J_{train}(\Theta)$ and $J_{CV}(\Theta)$ to be high with $J_{train}(\Theta)≈J_{CV}(\Theta)$.

If a learning algorithm is suffering from **high bias**, getting more training data will ==not== **(by itself)** help much.

![img](images/06_1_Week_Advice_for_Applying_Machine_Learning/bpAOvt9uEeaQlg5FcsXQDA_ecad653e01ee824b231ff8b5df7208d9_2-am.png)

**Experiencing high variance:**

**Low training set size**: $J_{train}(\Theta)$ will be low and $J_{CV}(\Theta)$ will be high.

**Large training set size**: $J_{train}(\Theta)$ increases with training set size and $J_{CV}(\Theta)$ continues to decrease without leveling off. Also, $J_{train}(\Theta) < J_{CV}(\Theta)$ but the difference between them remains significant.

If a learning algorithm is suffering from **high variance**, getting more training data is likely to ==help==.

![img](images/06_1_Week_Advice_for_Applying_Machine_Learning/vqlG7t9uEeaizBK307J26A_3e3e9f42b5e3ce9e3466a0416c4368ee_ITu3antfEeam4BLcQYZr8Q_37fe6be97e7b0740d1871ba99d4c2ed9_300px-Learning1.png)



## Deciding What to Do Next Revisited

![image-20220511213604672](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511213604672.png)

![image-20220511214258055](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511214258055.png)

![image-20220511214630505](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511214630505.png)

* 【May be it's about increasing the number of hidden units but not the size of training examples. In this case, "high variance" is true, but it's not help when increasing the number of hidden units.】



## Deciding What to Do Next Revisited

Our decision process can be broken down as follows:

- **Getting more training examples:** Fixes high variance

- **Trying smaller sets of features:** Fixes high variance

- **Adding features:** Fixes high ==bias==

- **Adding polynomial features:** Fixes high ==bias==

- **Decreasing λ:** Fixes high ==bias==

- **Increasing λ:** Fixes high variance.

### **Diagnosing Neural Networks**

- A neural network with fewer parameters is **prone to underfitting**. It is also **computationally cheaper**.
- A large neural network with more parameters is **prone to overfitting**. It is also **computationally expensive**. In this case you can use regularization (==increase λ==) to address the overfitting.

Using ==a single hidden layer== is a good ==starting== default. You can train your neural network on a number of hidden layers using your cross validation set. You can then ==select== the one that performs best. 

**Model Complexity Effects:**

- ==Lower-order polynomials== (low model complexity) have high bias and low variance. In this case, the model fits poorly consistently.
- ==Higher-order polynomials== (high model complexity) fit the training data extremely well and the test data extremely poorly. These have low bias on the training data, but very high variance.
- In reality, we would want to ==choose== a model somewhere in ==between==, that can ==generalize well== but also ==fits the data== reasonably well.



------



# 【Exam】

![image-20220511223358725](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511223358725.png)

![image-20220511223553424](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511223553424.png)

![image-20220511223657472](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511223657472.png)

![image-20220511224329548](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511224329548.png)

![image-20220511224520856](images/06_1_Week_Advice_for_Applying_Machine_Learning/image-20220511224520856.png)



2022/05/11 22:49:14 15min