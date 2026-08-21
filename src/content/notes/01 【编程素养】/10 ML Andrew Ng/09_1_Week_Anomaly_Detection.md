# 09-1 Week Anomaly Detection

Date：2022/05/29 21:37:16

------





[TOC]



------

# Density Estimation

## Problem Motivation

![image-20220529214038669](http://img.celfs.site/typora/2025/11/22/1763820844515-image-20220529214038669.png)

![image-20220529214230556](http://img.celfs.site/typora/2025/11/22/1763820844404-image-20220529214230556.png)

![image-20220529214737357](http://img.celfs.site/typora/2025/11/22/1763820843401-image-20220529214737357.png)

![image-20220529214841449](http://img.celfs.site/typora/2025/11/22/1763820840287-image-20220529214841449.png)





## Gaussian Distribution

![image-20220529215243841](http://img.celfs.site/typora/2025/11/22/1763820837805-image-20220529215243841.png)

![image-20220529215504521](http://img.celfs.site/typora/2025/11/22/1763820837208-image-20220529215504521.png)

![image-20220529215912112](http://img.celfs.site/typora/2025/11/22/1763820835719-image-20220529215912112.png)

![image-20220529220035942](http://img.celfs.site/typora/2025/11/22/1763820834999-image-20220529220035942.png)

![image-20220529220045353](http://img.celfs.site/typora/2025/11/22/1763820831265-image-20220529220045353.png)



## Algorithm

![image-20220529220604246](http://img.celfs.site/typora/2025/11/22/1763820831163-image-20220529220604246.png)

![image-20220529220711164](http://img.celfs.site/typora/2025/11/22/1763820830941-image-20220529220711164.png)

![image-20220529221011209](http://img.celfs.site/typora/2025/11/22/1763820830950-image-20220529221011209.png)

![image-20220529221415411](http://img.celfs.site/typora/2025/11/22/1763820830884-image-20220529221415411.png)



2022/05/29 22:15:37 39min

------



# Building an Anomaly Detection System

## Developing and Evaluating an Anomaly Detection System

![image-20220530173734337](http://img.celfs.site/typora/2025/11/22/1763820830811-image-20220530173734337.png)

![image-20220530174121234](http://img.celfs.site/typora/2025/11/22/1763820830775-image-20220530174121234.png)

![image-20220530174208969](http://img.celfs.site/typora/2025/11/22/1763820830734-image-20220530174208969.png)

![image-20220530174554364](http://img.celfs.site/typora/2025/11/22/1763820830699-image-20220530174554364.png)

* 【WRONG】
  * 只考虑 “分类算法的精度” 是否能够 “很好地衡量算法性能” 。
  * 对比下文异常检测与有监督学习，可以知道异常检测类似分类算法，都具有类倾斜的特征，由于类倾斜，性能评估就会有偏好，因此不能很好地衡量一个算法的性能。

![image-20220530174744160](http://img.celfs.site/typora/2025/11/22/1763820830664-image-20220530174744160.png)



## Anomaly Detection vs. Supervised Learning

![image-20220530175246849](http://img.celfs.site/typora/2025/11/22/1763820830624-image-20220530175246849.png)

![image-20220530175547984](http://img.celfs.site/typora/2025/11/22/1763820829971-image-20220530175547984.png)

![image-20220530175601172](http://img.celfs.site/typora/2025/11/22/1763820829930-image-20220530175601172.png)



## Choosing What Features to Use

![image-20220530175945821](http://img.celfs.site/typora/2025/11/22/1763820829875-image-20220530175945821.png)

![image-20220530180129339](http://img.celfs.site/typora/2025/11/22/1763820829774-image-20220530180129339.png)

![image-20220530180154758](http://img.celfs.site/typora/2025/11/22/1763820829734-image-20220530180154758.png)



![image-20220530180446780](http://img.celfs.site/typora/2025/11/22/1763820829500-image-20220530180446780.png)

![image-20220530180652775](http://img.celfs.site/typora/2025/11/22/1763820829464-image-20220530180652775.png)

![image-20220530180919401](http://img.celfs.site/typora/2025/11/22/1763820829429-image-20220530180919401.png)





# Multivariate Gaussian Distribution (Optional)

## Multivariate Gaussian Distribution 

![image-20220531151301290](http://img.celfs.site/typora/2025/11/22/1763820829285-image-20220531151301290.png)

![image-20220531151457689](http://img.celfs.site/typora/2025/11/22/1763820829204-image-20220531151457689.png)

![image-20220531151753944](http://img.celfs.site/typora/2025/11/22/1763820828779-image-20220531151753944.png)

* 【线性变换的内容】

![image-20220531151859676](http://img.celfs.site/typora/2025/11/22/1763820828756-image-20220531151859676.png)

![image-20220531151936497](http://img.celfs.site/typora/2025/11/22/1763820828753-image-20220531151936497.png)

![image-20220531152057870](http://img.celfs.site/typora/2025/11/22/1763820828700-image-20220531152057870.png)

![image-20220531152130271](http://img.celfs.site/typora/2025/11/22/1763820828697-image-20220531152130271.png)

![image-20220531152236211](http://img.celfs.site/typora/2025/11/22/1763820828691-image-20220531152236211.png)

* 【把 mu 两个参数，第一个看作 x，第二个看作 y，整体构成（x, y）。于是具体参数可以分别看作 x 轴和 y 轴上的作用。但也只能变换一维的位置】
* 【Sigma 相当于对二维的作用，可变换二维的对象。比如图形的拉伸、压缩等】

![image-20220531152329158](http://img.celfs.site/typora/2025/11/22/1763820828459-image-20220531152329158.png)



## Anomaly Detection using the Multivariate Gaussian Distribution

![image-20220531152648277](http://img.celfs.site/typora/2025/11/22/1763820828683-image-20220531152648277.png)

![image-20220531152812145](http://img.celfs.site/typora/2025/11/22/1763820828687-image-20220531152812145.png)

![image-20220531152921131](http://img.celfs.site/typora/2025/11/22/1763820828680-image-20220531152921131.png)

![image-20220531153200030](http://img.celfs.site/typora/2025/11/22/1763820828748-image-20220531153200030.png)

![image-20220531153842517](http://img.celfs.site/typora/2025/11/22/1763820828677-image-20220531153842517.png)

![image-20220531154342110](http://img.celfs.site/typora/2025/11/22/1763820828458-image-20220531154342110.png)



2022/05/31 16:33:02 1h28min MGD + Review

------



# 【Exam】

![image-20220531163934372](http://img.celfs.site/typora/2025/11/22/1763820828457-image-20220531163934372.png)

![image-20220531165517800](http://img.celfs.site/typora/2025/11/22/1763820828456-image-20220531165517800.png)



![image-20220531164010599](http://img.celfs.site/typora/2025/11/22/1763820828454-image-20220531164010599.png)

![image-20220531165432223](http://img.celfs.site/typora/2025/11/22/1763820828456-image-20220531165432223.png)



![image-20220531164557719](http://img.celfs.site/typora/2025/11/22/1763820828455-image-20220531164557719.png)

![image-20220531165406748](http://img.celfs.site/typora/2025/11/22/1763820828454-image-20220531165406748.png)



![image-20220531165042857](http://img.celfs.site/typora/2025/11/22/1763820828453-image-20220531165042857.png)

![image-20220531165718940](http://img.celfs.site/typora/2025/11/22/1763820828452-image-20220531165718940.png)



![image-20220531165251188](http://img.celfs.site/typora/2025/11/22/1763820828436-image-20220531165251188.png)

![image-20220531165335558](http://img.celfs.site/typora/2025/11/22/1763820828435-image-20220531165335558.png)







![image-20220531165752519](http://img.celfs.site/typora/2025/11/22/1763820828434-image-20220531165752519.png)

![image-20220531170403585](http://img.celfs.site/typora/2025/11/22/1763820828406-image-20220531170403585.png)

![image-20220531165827179](http://img.celfs.site/typora/2025/11/22/1763820828264-image-20220531165827179.png)

![image-20220531170414382](http://img.celfs.site/typora/2025/11/22/1763820828260-image-20220531170414382.png)

![image-20220531170347817](http://img.celfs.site/typora/2025/11/22/1763820828265-image-20220531170347817.png)

![image-20220531170433955](http://img.celfs.site/typora/2025/11/22/1763820828405-image-20220531170433955.png)







![image-20220531170608261](http://img.celfs.site/typora/2025/11/22/1763820828220-image-20220531170608261.png)

![image-20220531170727860](http://img.celfs.site/typora/2025/11/22/1763820828264-image-20220531170727860.png)

![image-20220531170755014](http://img.celfs.site/typora/2025/11/22/1763820828262-image-20220531170755014.png)



2022/05/31 17:09:08 35min 三次

------