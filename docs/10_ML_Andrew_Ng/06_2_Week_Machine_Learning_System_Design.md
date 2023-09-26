# 06-2 Week Machine Learning System Design

Date：2022/05/12

------



[TOC]



------



# Building a Spam Classifier

## Prioritizing What to Work On

![image-20220512220043964](images/06_2_Week_Machine_Learning_System_Design/image-20220512220043964.png)

![image-20220512220419391](images/06_2_Week_Machine_Learning_System_Design/image-20220512220419391.png)

![image-20220512221309628](images/06_2_Week_Machine_Learning_System_Design/image-20220512221309628.png)

![image-20220512221216091](images/06_2_Week_Machine_Learning_System_Design/image-20220512221216091.png)



## Prioritizing What to Work On

**System Design Example:**

Given a data set of emails, we could construct a vector for each email. Each entry in this vector represents a word. The vector normally contains 10,000 to 50,000 entries gathered by finding the most frequently used words in our data set.  If a word is to be found in the email, we would assign its respective entry a 1, else if it is not found, that entry would be a 0. Once we have all our x vectors ready, we train our algorithm and finally, we could use it to classify if an email is a spam or not.

![img](images/06_2_Week_Machine_Learning_System_Design/Ys5NKOLJEeaPWBJZo44gSg_aba93cf4ce4507175d7e47ab5f9b7ce4_Screenshot-2017-01-24-22.29.45.png)

So how could you spend your time to improve the accuracy of this classifier?

- Collect lots of data (for example "honeypot" project but doesn't always work)
- Develop sophisticated features (for example: using email header data in spam emails)
- Develop algorithms to process your input in different ways (recognizing misspellings in spam).

==It is difficult to tell which of the options will be most helpful.==



## Error Analysis

![image-20220513211241666](images/06_2_Week_Machine_Learning_System_Design/image-20220513211241666.png)

![image-20220513211635723](images/06_2_Week_Machine_Learning_System_Design/image-20220513211635723.png)

![image-20220513212338325](images/06_2_Week_Machine_Learning_System_Design/image-20220513212338325.png)

![image-20220513212032355](images/06_2_Week_Machine_Learning_System_Design/image-20220513212032355.png)



## Error Analysis

The recommended approach to ==solving machine learning problems== is to:

- ==Start== with a ==simple== algorithm, implement it quickly, and test it early on your cross validation data.
- ==Plot== learning curves to ==decide== if more data, more features, etc. are likely to help.
- ==Manually examine the errors== on examples in the cross validation set and try to spot a trend where most of the errors were made.

For example, assume that we have 500 emails and our algorithm ==misclassifies== a 100 of them. We could manually analyze the 100 emails and categorize them based on what type of emails they are. We could then try to come up with new cues and features that would help us classify these 100 emails correctly. Hence, if most of our misclassified emails are those which try to steal passwords, then we could find some features that are particular to those emails and add them to our model. We could also see how classifying each word according to its ==root changes== our error rate:

![img](images/06_2_Week_Machine_Learning_System_Design/kky-ouM6EeacbA6ydECl3A_01b1fa64fcc9a7eb5da8e946f6a12636_Screenshot-2017-01-25-12.08.23.png)

==It is very important to get error results as a single, numerical value.== Otherwise it is difficult to assess your algorithm's performance. For example if we use stemming, which is the process of treating the same word with different forms (fail/failing/failed) as one word (fail), and get a 3% error rate instead of 5%, then we should definitely add it to our model. However, if we try to distinguish between upper case and lower case letters and end up getting a 3.2% error rate instead of 3%, then we should avoid using this new feature.  Hence, we should try new things, ==get a numerical value for our error rate==, and based on our result ==decide== whether we want to ==keep the new feature or not==. 



## Error Metrics for Skewed Classes

![image-20220515215153217](images/06_2_Week_Machine_Learning_System_Design/image-20220515215153217.png)

* 【QUESTION: What's the mean of "ignore x" ? How to get it ?】

![image-20220515220301979](images/06_2_Week_Machine_Learning_System_Design/image-20220515220301979.png)

* 【分母实际上是用全概率公式进行展开 ?】

![image-20220515220032379](images/06_2_Week_Machine_Learning_System_Design/image-20220515220032379.png)

![image-20220515220139767](images/06_2_Week_Machine_Learning_System_Design/image-20220515220139767.png)



## Trading Off Precision and Recall

![image-20220515221103017](images/06_2_Week_Machine_Learning_System_Design/image-20220515221103017.png)

![image-20220515222019667](images/06_2_Week_Machine_Learning_System_Design/image-20220515222019667.png)

![image-20220515222003804](images/06_2_Week_Machine_Learning_System_Design/image-20220515222003804.png)



# Using Large Data Sets

## Data For Machine Learning

![image-20220515222813381](images/06_2_Week_Machine_Learning_System_Design/image-20220515222813381.png)

![image-20220515223203070](images/06_2_Week_Machine_Learning_System_Design/image-20220515223203070.png)

![image-20220515223448800](images/06_2_Week_Machine_Learning_System_Design/image-20220515223448800.png)

![image-20220515223806337](images/06_2_Week_Machine_Learning_System_Design/image-20220515223806337.png)

* So this gives us a set of conditions rather hopefully some understanding of what's the sort of problem where if you have a lot of data and you train a learning algorithm with lot of parameters, that might be a good way to give a high performance learning algorithm and really, I think the key test that I often ask myself are first, ==can a human experts look at the features x and confidently predict the value of y==. Because that's sort of a certification that y can be predicted accurately from the features x and second, ==can we actually get a large training set, and train the learning algorithm with a lot of parameters in the training set== and if you can't do both then that's more often give you a very kind performance learning algorithm.



------



# 【Exam】

![image-20220515232256408](images/06_2_Week_Machine_Learning_System_Design/image-20220515232256408.png)

![image-20220515232558513](images/06_2_Week_Machine_Learning_System_Design/image-20220515232558513.png)

![image-20220515233952197](images/06_2_Week_Machine_Learning_System_Design/image-20220515233952197.png)



![image-20220515233101931](images/06_2_Week_Machine_Learning_System_Design/image-20220515233101931.png)

![image-20220515234033236](images/06_2_Week_Machine_Learning_System_Design/image-20220515234033236.png)



![image-20220515233335958](images/06_2_Week_Machine_Learning_System_Design/image-20220515233335958.png)

![image-20220515234235700](images/06_2_Week_Machine_Learning_System_Design/image-20220515234235700.png)

![image-20220515234349847](images/06_2_Week_Machine_Learning_System_Design/image-20220515234349847.png)



![image-20220515233903846](images/06_2_Week_Machine_Learning_System_Design/image-20220515233903846.png)

![image-20220515234414479](images/06_2_Week_Machine_Learning_System_Design/image-20220515234414479.png)





![image-20220515234821692](images/06_2_Week_Machine_Learning_System_Design/image-20220515234821692.png)

![image-20220515235003334](images/06_2_Week_Machine_Learning_System_Design/image-20220515235003334.png)

![image-20220516000942373](images/06_2_Week_Machine_Learning_System_Design/image-20220516000942373.png)

![image-20220516001014253](images/06_2_Week_Machine_Learning_System_Design/image-20220516001014253.png)

![image-20220516001025143](images/06_2_Week_Machine_Learning_System_Design/image-20220516001025143.png)



![image-20220515235452013](images/06_2_Week_Machine_Learning_System_Design/image-20220515235452013.png)



![image-20220516003441836](images/06_2_Week_Machine_Learning_System_Design/image-20220516003441836.png)

![image-20220516003434321](images/06_2_Week_Machine_Learning_System_Design/image-20220516003434321.png)



2022/05/16 0:38:57 1h21min 第一次用完三次机会都没有做全对