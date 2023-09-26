# 02-4 Week Exercise

Date：2022/04/27 3:01:46

------



[TOC]



------



（2022/04/27 3:02:37 4h55min）



## 【QUESTIONS】

* `.*` VS `*` 
  * ==A*B => matrix multiply==
  * ==A.*B => element-wise multiplication==
* Math => Code



```octave
>> A = [1 2; 3 4; 5 6]
A =

   1   2
   3   4
   5   6

% *2 == .*2
>> A .* 2
ans =

    2    4
    6    8
   10   12

>> A * 2
ans =

    2    4
    6    8
   10   12


>> x = [1; 2; 3]
x =

   1
   2
   3

% .* == 对位相乘
>> A .* x
ans =

    1    2
    6    8
   15   18

>> A * x
error: operator *: nonconformant arguments (op1 is 3x2, op2 is 3x1)
>> A(:,1) .* x
ans =

    1
    6
   15

>>
```



* Cost Function

```octave
function J = computeCost(X, y, theta)
%COMPUTECOST Compute cost for linear regression
%   J = COMPUTECOST(X, y, theta) computes the cost of using theta as the
%   parameter for linear regression to fit the data points in X and y

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta
%               You should set J to the cost.

predictions = X * theta; 	% predictions of hypothesis on all m examples
sqrErrors = (predictions - y) .^2;	% squared errors
J = 1 / (2 * m) * sum(sqrErrors)

% =========================================================================

end
```



* Gradient Descent

```octave
function [theta, J_history] = gradientDescent(X, y, theta, alpha, num_iters)
%GRADIENTDESCENT Performs gradient descent to learn theta
%   theta = GRADIENTDESCENT(X, y, theta, alpha, num_iters) updates theta by 
%   taking num_iters gradient steps with learning rate alpha

% Initialize some useful values
m = length(y); % number of training examples
J_history = zeros(num_iters, 1);

for iter = 1:num_iters

    % ====================== YOUR CODE HERE ======================
    % Instructions: Perform a single gradient step on the parameter vector
    %               theta. 
    %
    % Hint: While debugging, it can be useful to print out the values
    %       of the cost function (computeCost) and gradient here.
    %
    
    
    % d1 = sum(y - X * theta)* X(1)
    % d2 = sum(y - X * theta)* X(2)
    % theta(1) = theta(1) + alpha * d1
    % theta(2) = theta(2) + alpha * d2
    
    %d1 = sum(X * theta - y)* X(1)
    %d2 = sum(X * theta - y)* X(2)
    %theta(1) = theta(1) + alpha * d1
    %theta(2) = theta(2) + alpha * d2
    
    %h = X * theta - y
    %theta(1) = theta(1) - alpha * sum(h * X(:, 1)') / m
    %theta(2) = theta(2) - alpha * sum(h * X(:, 2)') / m
    % theta = theta - alpha * sum((X * theta - y) * X) / m
   
    % theta(1) = theta(1) - alpha * sum(X * theta - y) * X(:,1) / m
    % theta(2) = theta(2) - alpha * sum(X * theta - y) * X(:,2) / m
    
    temp = theta
    for j = 1:2,
      theta(j) = theta(j) - alpha / m * sum((X * temp - y) .* X(:, j)) 
    endfor
    
    % ============================================================

    % Save the cost J in every iteration    
    J_history(iter) = computeCost(X, y, theta);

end

end
```