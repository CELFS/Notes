# 03-1 Week Logistic Regression

Date：2022/04/28 1:22:19

------



[TOC]



------



# Classification and Representation

## Classification

![image-20220428015936879](images/03_1_Week_Logistic_Regression/image-20220428015936879.png)

![image-20220428020029776](images/03_1_Week_Logistic_Regression/image-20220428020029776.png)

![image-20220428020433970](images/03_1_Week_Logistic_Regression/image-20220428020433970.png)



## Classification 

To attempt classification, one method is to use linear regression and map all predictions greater than 0.5 as a 1 and all less than 0.5 as a 0. However, this method doesn't work well because ==classification is not actually a linear function==.

The classification problem is just like the regression problem, except that the values we now want to predict take on only a small number of ==discrete values==. For now, we will focus on the **binary classification** **problem** in which y can take on only two values, 0 and 1. (Most of what we say here will also generalize to the multiple-class case.) For instance, if we are trying to build a spam classifier for email, then $x^{(i)}$ may be some features of a piece of email, and y may be 1 if it is a piece of spam mail, and 0 otherwise. Hence, ==y∈{0,1}==. 0 is also called the ==negative class==, and 1 the ==positive class==, and they are sometimes also denoted by the ==symbols “-” and “+.”== Given $x^{(i)}$, the corresponding $y^{(i)}$ is also called the label for the training example. 



## Hypothesis Representation

![image-20220428021707253](images/03_1_Week_Logistic_Regression/image-20220428021707253.png)

![image-20220428022052607](images/03_1_Week_Logistic_Regression/image-20220428022052607.png)

![image-20220428022232217](images/03_1_Week_Logistic_Regression/image-20220428022232217.png)



## Hypothesis Representation

We could approach the classification problem ==ignoring== the fact that y is discrete-valued, and use our ==old linear regression algorithm== to try to predict y given x. However, it is easy to construct examples where this method performs very poorly. Intuitively, it also ==doesn’t make sense== for $h_\theta (x)$ to take values larger than 1 or smaller than 0 when we know that y ∈ {0, 1}. To fix this, let’s ==change the form for our hypotheses== $h_\theta (x)$ to satisfy  $0\leq h_\theta (x) \leq 1$. This is accomplished by plugging $\theta^Tx$ into the Logistic Function.

Our new form uses the "==Sigmoid Function==," also called the "==Logistic Function==":

![image-20220428022348122](images/03_1_Week_Logistic_Regression/image-20220428022348122.png)

The following image shows us what the sigmoid function looks like: 

![img](images/03_1_Week_Logistic_Regression/1WFqZHntEead-BJkoDOYOw_2413fbec8ff9fa1f19aaf78265b8a33b_Logistic_function.png)



The function g(z), shown here, maps any real number to the (0, 1) interval, making it useful for transforming an ==arbitrary-valued function== into a function better ==suited for classification==.

$h_\theta(x) $ will give us the ==**probability**== that our output is 1. For example, $h_\theta(x)=0.7 $ gives us a probability of 70% that our output is 1. Our probability that our prediction is 0 is just the complement of our probability that it is 1 (e.g. if probability that it is 1 is 70%, then the probability that it is 0 is 30%).

![image-20220428022400615](images/03_1_Week_Logistic_Regression/image-20220428022400615.png)



## Decision Boundary

![image-20220428023608621](images/03_1_Week_Logistic_Regression/image-20220428023608621.png)

![image-20220428024221601](images/03_1_Week_Logistic_Regression/image-20220428024221601.png)

![image-20220428024446089](images/03_1_Week_Logistic_Regression/image-20220428024446089.png)

![image-20220428025022217](images/03_1_Week_Logistic_Regression/image-20220428025022217.png)



## Decision Boundary 

In order to get our discrete 0 or 1 classification, we can ==translate the output of the hypothesis== function as follows:

![image-20220428025109522](images/03_1_Week_Logistic_Regression/image-20220428025109522.png)

The way our logistic function g behaves is that when its input is greater than or equal to zero, its output is greater than or equal to 0.5:

![image-20220428025117062](images/03_1_Week_Logistic_Regression/image-20220428025117062.png)

Remember.

![image-20220428025124600](images/03_1_Week_Logistic_Regression/image-20220428025124600.png)

So if our input to g is $\theta^T X$, then that means:

![image-20220428025130902](images/03_1_Week_Logistic_Regression/image-20220428025130902.png)

From these statements we can now say:

![image-20220428025137526](images/03_1_Week_Logistic_Regression/image-20220428025137526.png)The **decision boundary** is the line that separates the area where y = 0 and where y = 1. ==It is created by our hypothesis function.== 

**Example**:

![image-20220428025145964](images/03_1_Week_Logistic_Regression/image-20220428025145964.png)

In this case, our decision boundary is a straight vertical line placed on the graph where $x_1 = 5$, and everything to the left of that denotes y = 1, while everything to the right denotes y = 0.

Again, the ==input== to the sigmoid function g(z) (e.g. $\theta^T X$) ==doesn't need to be linear, and could be a function that describes a circle== (e.g. $z = \theta_0 + \theta_1 x_1^2 +\theta_2 x_2^2$) or any shape to fit our data.



# Logistic Regression Model

## Cost Function

![image-20220428030153704](images/03_1_Week_Logistic_Regression/image-20220428030153704.png)

![image-20220428030604568](images/03_1_Week_Logistic_Regression/image-20220428030604568.png)

![image-20220428030758149](images/03_1_Week_Logistic_Regression/image-20220428030758149.png)

![image-20220428031000485](images/03_1_Week_Logistic_Regression/image-20220428031000485.png)

![image-20220428031149563](images/03_1_Week_Logistic_Regression/image-20220428031149563.png)

![image-20220428031801128](images/03_1_Week_Logistic_Regression/image-20220428031801128.png)



## Cost Function

We cannot use the same cost function that we use for linear regression because the Logistic Function will cause the output to be wavy, causing many local optima. In other words, it will not be a convex function.

Instead, our cost function for logistic regression looks like:

![image-20220428032140995](images/03_1_Week_Logistic_Regression/image-20220428032140995.png)

When y = 1, we get the following plot for $J(\theta)$ vs $h_\theta (x)$:

![img](images/03_1_Week_Logistic_Regression/Q9sX8nnxEeamDApmnD43Fw_1cb67ecfac77b134606532f5caf98ee4_Logistic_regression_cost_function_positive_class.png)

Similarly, when y = 0, we get the following plot for $J(\theta)$ vs $h_\theta (x)$:

![img](images/03_1_Week_Logistic_Regression/Ut7vvXnxEead-BJkoDOYOw_f719f2858d78dd66d80c5ec0d8e6b3fa_Logistic_regression_cost_function_negative_class.png)



![image-20220428032159106](images/03_1_Week_Logistic_Regression/image-20220428032159106.png)

If our correct answer 'y' is 0, then the cost function will be 0 if our hypothesis function also outputs 0. If our hypothesis approaches 1, then the cost function will approach infinity.

If our correct answer 'y' is 1, then the cost function will be 0 if our hypothesis function outputs 1. If our hypothesis approaches 0, then the cost function will approach infinity.

Note that writing the cost function in this way ==guarantees that J(θ) is convex== for logistic regression.



## Simplified Cost Function and Gradient Descent

![image-20220428033808277](images/03_1_Week_Logistic_Regression/image-20220428033808277.png)

![image-20220428034217634](images/03_1_Week_Logistic_Regression/image-20220428034217634.png)

* a maximum of likelihood function

![image-20220428034344710](images/03_1_Week_Logistic_Regression/image-20220428034344710.png)

![image-20220428035247482](images/03_1_Week_Logistic_Regression/image-20220428035247482.png)

* But the hypothesis function is different.
  * **Note:** [6:53 - the gradient descent equation ==should have a 1/m factor==]【Errara】



![image-20220428034807356](images/03_1_Week_Logistic_Regression/image-20220428034807356.png)

![image-20220428035214426](images/03_1_Week_Logistic_Regression/image-20220428035214426.png)



## Simplified Cost Function and Gradient Descent 

**Note:** [6:53 - the gradient descent equation should have a 1/m factor]

We can compress our cost function's two conditional cases into one case:

![image-20220428035431104](images/03_1_Week_Logistic_Regression/image-20220428035431104.png)

Notice that when y is equal to 1, then the second term $(1-y)\log(1-h_\theta(x))$ will be zero and will not affect the result. If y is equal to 0, then the first term $-y \log(h_\theta(x))$ will be zero and will not affect the result.

* 【It's magic, how clever the man who created this case of function ! It reminds me of the Gates of binary in the book Code.】

We can fully write out our entire cost function as follows:

![image-20220428035439735](images/03_1_Week_Logistic_Regression/image-20220428035439735.png)A vectorized implementation is:

![image-20220428035448920](images/03_1_Week_Logistic_Regression/image-20220428035448920.png)

### Gradient Descent

Remember that the general form of gradient descent is:

![image-20220428035512155](images/03_1_Week_Logistic_Regression/image-20220428035512155.png)

We can work out the derivative part using calculus to get:

![image-20220428035520075](images/03_1_Week_Logistic_Regression/image-20220428035520075.png)

Notice that this algorithm is identical to the one we used in linear regression. We still have to simultaneously update all values in theta.

A vectorized implementation is:

![image-20220428035529803](images/03_1_Week_Logistic_Regression/image-20220428035529803.png)



## Advanced Optimization

![image-20220428041008179](images/03_1_Week_Logistic_Regression/image-20220428041008179.png)

![image-20220428041543976](images/03_1_Week_Logistic_Regression/image-20220428041543976.png)

* line search algorithm

![image-20220428042232018](images/03_1_Week_Logistic_Regression/image-20220428042232018.png)

**Note:** [7:35 - '100' should be 100 instead. The value provided should be an integer and not a character string.]



![image-20220428042707745](images/03_1_Week_Logistic_Regression/image-20220428042707745.png)

![image-20220428042628619](images/03_1_Week_Logistic_Regression/image-20220428042628619.png)



## Advanced Optimization

**Note:** [7:35 - '100' should be 100 instead. The value provided should be an integer and not a character string.]

=="Conjugate gradient", "BFGS", and "L-BFGS"== are more sophisticated, faster ways to optimize θ that can be used instead of gradient descent. We suggest that ==you should not write these more sophisticated algorithms yourself== (unless you are an expert in numerical computing) but use the ==libraries instead==, as they're already tested and highly optimized. Octave provides them.

We first need to ==provide a function== that evaluates the following two functions for a given input value θ:

![image-20220428043000740](images/03_1_Week_Logistic_Regression/image-20220428043000740.png)

We can write a single function that returns both of these:

```octave
function [jVal, gradient] = costFunction(theta)
	jVal = [...code to compute J(theta)...];
	gradient = [...code to compute 	derivative of J(theta)...];
end
```

Then we can use octave's =="fminunc()" optimization algorithm== along with the =="optimset()" function== that creates an object containing the options we want to send to "fminunc()". (Note: the value for MaxIter should be an integer, not a character string - errata in the video at 7:30)【OK】

```octave
options = optimset('GradObj', 'on', 'MaxIter', 100);
initialTheta = zeros(2,1);
[optTheta, functionVal, exitFlag] = 
	fminunc(@costFunction, initialTheta, options); 
```

We give to the function "fminunc()" our cost function, our initial vector of theta values, and the "options" object that we created beforehand.



# Multiclass Classification: One-vs-all

![image-20220428043655551](images/03_1_Week_Logistic_Regression/image-20220428043655551.png)

![image-20220428043741639](images/03_1_Week_Logistic_Regression/image-20220428043741639.png)

![image-20220428044041874](images/03_1_Week_Logistic_Regression/image-20220428044041874.png)

![image-20220428044255146](images/03_1_Week_Logistic_Regression/image-20220428044255146.png)

![image-20220428044402262](images/03_1_Week_Logistic_Regression/image-20220428044402262.png)



## Multiclass Classification: One-vs-all

Now we will approach the classification of data when we have more than two categories. Instead of y = {0,1} we will expand our definition so that y = {0,1...n}.

Since y = {0,1...n}, we divide our problem into n+1 (+1 because the index starts at 0) binary classification problems; in each one, we ==predict the probability that 'y' is a member of one of our classes.== 

![image-20220428044500161](images/03_1_Week_Logistic_Regression/image-20220428044500161.png)

==We are basically choosing one class and then lumping all the others into a single second class.== We do this repeatedly, applying binary logistic regression to each case, and then use the hypothesis that ==returned the highest value as our prediction==.

The following image shows how one could classify 3 classes: 

![img](images/03_1_Week_Logistic_Regression/cqmPjanSEeawbAp5ByfpEg_299fcfbd527b6b5a7440825628339c54_Screenshot-2016-11-13-10.52.29.png)

**To summarize:** 

* Train a logistic regression classifier $h_\theta(x)$ for each class￼ to predict the probability that ￼ ￼y = i￼ ￼. 

* To make a prediction on a new x, pick the class ￼that maximizes  $h_\theta (x) $ 



# 【QUESTIONS】

* We are basically choosing one class and then lumping all the others into a single second class. 【May be like the plot above】
* Note that writing the cost function in this way ==guarantees that J(θ) is convex== for logistic regression.





（2022/04/28 4:52:21 3h）

------



# 【Exam】

![image-20220428052600710](images/03_1_Week_Logistic_Regression/image-20220428052600710.png)

![image-20220428054541492](images/03_1_Week_Logistic_Regression/image-20220428054541492.png)



![image-20220428053058140](images/03_1_Week_Logistic_Regression/image-20220428053058140.png)

* 【Problem】

![image-20220428054534071](images/03_1_Week_Logistic_Regression/image-20220428054534071.png)



![image-20220428053240339](images/03_1_Week_Logistic_Regression/image-20220428053240339.png)

![image-20220428053732450](images/03_1_Week_Logistic_Regression/image-20220428053732450.png)

![image-20220428054523644](images/03_1_Week_Logistic_Regression/image-20220428054523644.png)



![image-20220428054057758](images/03_1_Week_Logistic_Regression/image-20220428054057758.png)

![image-20220428054104937](images/03_1_Week_Logistic_Regression/image-20220428054104937.png)





![image-20220428054926829](images/03_1_Week_Logistic_Regression/image-20220428054926829.png)

![image-20220428055510365](images/03_1_Week_Logistic_Regression/image-20220428055510365.png)

![image-20220428061104468](images/03_1_Week_Logistic_Regression/image-20220428061104468.png)



![image-20220428060632636](images/03_1_Week_Logistic_Regression/image-20220428060632636.png)

![image-20220428061054990](images/03_1_Week_Logistic_Regression/image-20220428061054990.png)



![image-20220428062113285](images/03_1_Week_Logistic_Regression/image-20220428062113285.png)

![image-20220428062206294](images/03_1_Week_Logistic_Regression/image-20220428062206294.png)

![image-20220428061713823](images/03_1_Week_Logistic_Regression/image-20220428061713823.png)

![image-20220428062201722](images/03_1_Week_Logistic_Regression/image-20220428062201722.png)



（2022/04/28 6:27:21 1h）