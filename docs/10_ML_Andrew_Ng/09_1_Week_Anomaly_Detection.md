---
sidebar_label: "09-1 Week Anomaly Detection"
---

# 09-1 Week Anomaly Detection

Date：2022/05/29 21:37:16

------





[TOC]



------

# Density Estimation

## Problem Motivation

![image-20220529214038669](images/09_1_Week_Anomaly_Detection/image-20220529214038669.png)

![image-20220529214230556](images/09_1_Week_Anomaly_Detection/image-20220529214230556.png)

![image-20220529214737357](images/09_1_Week_Anomaly_Detection/image-20220529214737357.png)

![image-20220529214841449](images/09_1_Week_Anomaly_Detection/image-20220529214841449.png)





## Gaussian Distribution

![image-20220529215243841](images/09_1_Week_Anomaly_Detection/image-20220529215243841.png)

![image-20220529215504521](images/09_1_Week_Anomaly_Detection/image-20220529215504521.png)

![image-20220529215912112](images/09_1_Week_Anomaly_Detection/image-20220529215912112.png)

![image-20220529220035942](images/09_1_Week_Anomaly_Detection/image-20220529220035942.png)

![image-20220529220045353](images/09_1_Week_Anomaly_Detection/image-20220529220045353.png)



## Algorithm

![image-20220529220604246](images/09_1_Week_Anomaly_Detection/image-20220529220604246.png)

![image-20220529220711164](images/09_1_Week_Anomaly_Detection/image-20220529220711164.png)

![image-20220529221011209](images/09_1_Week_Anomaly_Detection/image-20220529221011209.png)

![image-20220529221415411](images/09_1_Week_Anomaly_Detection/image-20220529221415411.png)



2022/05/29 22:15:37 39min

------



# Building an Anomaly Detection System

## Developing and Evaluating an Anomaly Detection System

![image-20220530173734337](images/09_1_Week_Anomaly_Detection/image-20220530173734337.png)

![image-20220530174121234](images/09_1_Week_Anomaly_Detection/image-20220530174121234.png)

![image-20220530174208969](images/09_1_Week_Anomaly_Detection/image-20220530174208969.png)

![image-20220530174554364](images/09_1_Week_Anomaly_Detection/image-20220530174554364.png)

* 【WRONG】
  * 只考虑 “分类算法的精度” 是否能够 “很好地衡量算法性能” 。
  * 对比下文异常检测与有监督学习，可以知道异常检测类似分类算法，都具有类倾斜的特征，由于类倾斜，性能评估就会有偏好，因此不能很好地衡量一个算法的性能。

![image-20220530174744160](images/09_1_Week_Anomaly_Detection/image-20220530174744160.png)



## Anomaly Detection vs. Supervised Learning

![image-20220530175246849](images/09_1_Week_Anomaly_Detection/image-20220530175246849.png)

![image-20220530175547984](images/09_1_Week_Anomaly_Detection/image-20220530175547984.png)

![image-20220530175601172](images/09_1_Week_Anomaly_Detection/image-20220530175601172.png)



## Choosing What Features to Use

![image-20220530175945821](images/09_1_Week_Anomaly_Detection/image-20220530175945821.png)

![image-20220530180129339](images/09_1_Week_Anomaly_Detection/image-20220530180129339.png)

![image-20220530180154758](images/09_1_Week_Anomaly_Detection/image-20220530180154758.png)



![image-20220530180446780](images/09_1_Week_Anomaly_Detection/image-20220530180446780.png)

![image-20220530180652775](images/09_1_Week_Anomaly_Detection/image-20220530180652775.png)

![image-20220530180919401](images/09_1_Week_Anomaly_Detection/image-20220530180919401.png)





# Multivariate Gaussian Distribution (Optional)

## Multivariate Gaussian Distribution 

![image-20220531151301290](images/09_1_Week_Anomaly_Detection/image-20220531151301290.png)

![image-20220531151457689](images/09_1_Week_Anomaly_Detection/image-20220531151457689.png)

![image-20220531151753944](images/09_1_Week_Anomaly_Detection/image-20220531151753944.png)

* 【线性变换的内容】

![image-20220531151859676](images/09_1_Week_Anomaly_Detection/image-20220531151859676.png)

![image-20220531151936497](images/09_1_Week_Anomaly_Detection/image-20220531151936497.png)

![image-20220531152057870](images/09_1_Week_Anomaly_Detection/image-20220531152057870.png)

![image-20220531152130271](images/09_1_Week_Anomaly_Detection/image-20220531152130271.png)

![image-20220531152236211](images/09_1_Week_Anomaly_Detection/image-20220531152236211.png)

* 【把 mu 两个参数，第一个看作 x，第二个看作 y，整体构成（x, y）。于是具体参数可以分别看作 x 轴和 y 轴上的作用。但也只能变换一维的位置】
* 【Sigma 相当于对二维的作用，可变换二维的对象。比如图形的拉伸、压缩等】

![image-20220531152329158](images/09_1_Week_Anomaly_Detection/image-20220531152329158.png)



## Anomaly Detection using the Multivariate Gaussian Distribution

![image-20220531152648277](images/09_1_Week_Anomaly_Detection/image-20220531152648277.png)

![image-20220531152812145](images/09_1_Week_Anomaly_Detection/image-20220531152812145.png)

![image-20220531152921131](images/09_1_Week_Anomaly_Detection/image-20220531152921131.png)

![image-20220531153200030](images/09_1_Week_Anomaly_Detection/image-20220531153200030.png)

![image-20220531153842517](images/09_1_Week_Anomaly_Detection/image-20220531153842517.png)

![image-20220531154342110](images/09_1_Week_Anomaly_Detection/image-20220531154342110.png)



2022/05/31 16:33:02 1h28min MGD + Review

------



# 【Exam】

![image-20220531163934372](images/09_1_Week_Anomaly_Detection/image-20220531163934372.png)

![image-20220531165517800](images/09_1_Week_Anomaly_Detection/image-20220531165517800.png)



![image-20220531164010599](images/09_1_Week_Anomaly_Detection/image-20220531164010599.png)

![image-20220531165432223](images/09_1_Week_Anomaly_Detection/image-20220531165432223.png)



![image-20220531164557719](images/09_1_Week_Anomaly_Detection/image-20220531164557719.png)

![image-20220531165406748](images/09_1_Week_Anomaly_Detection/image-20220531165406748.png)



![image-20220531165042857](images/09_1_Week_Anomaly_Detection/image-20220531165042857.png)

![image-20220531165718940](images/09_1_Week_Anomaly_Detection/image-20220531165718940.png)



![image-20220531165251188](images/09_1_Week_Anomaly_Detection/image-20220531165251188.png)

![image-20220531165335558](images/09_1_Week_Anomaly_Detection/image-20220531165335558.png)







![image-20220531165752519](images/09_1_Week_Anomaly_Detection/image-20220531165752519.png)

![image-20220531170403585](images/09_1_Week_Anomaly_Detection/image-20220531170403585.png)

![image-20220531165827179](images/09_1_Week_Anomaly_Detection/image-20220531165827179.png)

![image-20220531170414382](images/09_1_Week_Anomaly_Detection/image-20220531170414382.png)

![image-20220531170347817](images/09_1_Week_Anomaly_Detection/image-20220531170347817.png)

![image-20220531170433955](images/09_1_Week_Anomaly_Detection/image-20220531170433955.png)







![image-20220531170608261](images/09_1_Week_Anomaly_Detection/image-20220531170608261.png)

![image-20220531170727860](images/09_1_Week_Anomaly_Detection/image-20220531170727860.png)

![image-20220531170755014](images/09_1_Week_Anomaly_Detection/image-20220531170755014.png)



2022/05/31 17:09:08 35min 三次

------