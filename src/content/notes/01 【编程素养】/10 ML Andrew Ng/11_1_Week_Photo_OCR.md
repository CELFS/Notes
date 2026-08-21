# 11-1 Week Photo OCR

Date：2022/06/05 13:49:47

------





[TOC]



------



# Problem Description and Pipeline

![image-20220605135053589](http://img.celfs.site/typora/2025/11/22/1763820921462-image-20220605135053589.png)

![image-20220605145819872](http://img.celfs.site/typora/2025/11/22/1763820920746-image-20220605145819872.png)

![image-20220605135317221](http://img.celfs.site/typora/2025/11/22/1763820920757-image-20220605135317221.png)

![image-20220605135438039](http://img.celfs.site/typora/2025/11/22/1763820920686-image-20220605135438039.png)

![image-20220605135603972](http://img.celfs.site/typora/2025/11/22/1763820920602-image-20220605135603972.png)



## Sliding Windows

![image-20220605135902354](http://img.celfs.site/typora/2025/11/22/1763820920613-image-20220605135902354.png)

![image-20220605140004586](http://img.celfs.site/typora/2025/11/22/1763820920537-image-20220605140004586.png)

![image-20220605140130387](http://img.celfs.site/typora/2025/11/22/1763820920548-image-20220605140130387.png)

![image-20220605150032039](http://img.celfs.site/typora/2025/11/22/1763820920476-image-20220605150032039.png)

![image-20220605140211553](http://img.celfs.site/typora/2025/11/22/1763820920436-image-20220605140211553.png)

![image-20220605150046028](http://img.celfs.site/typora/2025/11/22/1763820920397-image-20220605150046028.png)

![image-20220605150113666](http://img.celfs.site/typora/2025/11/22/1763820920297-image-20220605150113666.png)

* different size of rectangles.



![image-20220605140231364](http://img.celfs.site/typora/2025/11/22/1763820920249-image-20220605140231364.png)

![image-20220605140257229](http://img.celfs.site/typora/2025/11/22/1763820919717-image-20220605140257229.png)

![image-20220605140614736](http://img.celfs.site/typora/2025/11/22/1763820919375-image-20220605140614736.png)

![image-20220605141035089](http://img.celfs.site/typora/2025/11/22/1763820919338-image-20220605141035089.png)

![image-20220605141230850](http://img.celfs.site/typora/2025/11/22/1763820919212-image-20220605141230850.png)

![image-20220605150138240](http://img.celfs.site/typora/2025/11/22/1763820919130-image-20220605150138240.png)



![image-20220605141332940](http://img.celfs.site/typora/2025/11/22/1763820919013-image-20220605141332940.png)



## Getting Lots of Data and Artificial Data

![image-20220605141515722](http://img.celfs.site/typora/2025/11/22/1763820917198-image-20220605141515722.png)

![image-20220605141634728](http://img.celfs.site/typora/2025/11/22/1763820917254-image-20220605141634728.png)

![image-20220605141751251](http://img.celfs.site/typora/2025/11/22/1763820917248-image-20220605141751251.png)

![image-20220605141846802](http://img.celfs.site/typora/2025/11/22/1763820917293-image-20220605141846802.png)

* 【失真、信息冗余的意义是什么？提高可读性、可解释性？例如根据统计，英语的冗余信息通常比中文多】

![image-20220605142014554](http://img.celfs.site/typora/2025/11/22/1763820917197-image-20220605142014554.png)

* www.pdsounds.org

![image-20220605142130097](http://img.celfs.site/typora/2025/11/22/1763820917251-image-20220605142130097.png)

![image-20220605142424489](http://img.celfs.site/typora/2025/11/22/1763820917196-image-20220605142424489.png)

![image-20220605142855532](http://img.celfs.site/typora/2025/11/22/1763820917243-image-20220605142855532.png)

* low bias classifier



![image-20220605142946428](http://img.celfs.site/typora/2025/11/22/1763820917245-image-20220605142946428.png)

* 【数据增强？】

![image-20220605143312249](http://img.celfs.site/typora/2025/11/22/1763820917169-image-20220605143312249.png)

* 【10000 * 10 / 60 / 60 / 8 ≈ 3.47】



## Ceiling Analysis: What Part of the Pipeline to Work on Next

![image-20220605144019555](http://img.celfs.site/typora/2025/11/22/1763820917199-image-20220605144019555.png)

![image-20220605144817193](http://img.celfs.site/typora/2025/11/22/1763820917191-image-20220605144817193.png)

![image-20220605145354000](http://img.celfs.site/typora/2025/11/22/1763820917171-image-20220605145354000.png)

![image-20220605145515063](http://img.celfs.site/typora/2025/11/22/1763820917090-image-20220605145515063.png)

* 【这里不是很理解】



![image-20220605145546782](http://img.celfs.site/typora/2025/11/22/1763820917089-image-20220605145546782.png)



2022/06/05 15:10:23 1h22min

------



# 【Exam】

![image-20220605152225683](http://img.celfs.site/typora/2025/11/22/1763820917090-image-20220605152225683.png)

![image-20220605154146246](http://img.celfs.site/typora/2025/11/22/1763820917088-image-20220605154146246.png)



![image-20220605152232613](http://img.celfs.site/typora/2025/11/22/1763820917088-image-20220605152232613.png)

![image-20220605154208689](http://img.celfs.site/typora/2025/11/22/1763820917085-image-20220605154208689.png)



![image-20220605152607137](http://img.celfs.site/typora/2025/11/22/1763820917086-image-20220605152607137.png)

* May be just only tells us the performance of a component, but not concrete reason.

![image-20220605154223589](http://img.celfs.site/typora/2025/11/22/1763820917085-image-20220605154223589.png)



![image-20220605153302243](http://img.celfs.site/typora/2025/11/22/1763820917087-image-20220605153302243.png)

![image-20220605154242376](http://img.celfs.site/typora/2025/11/22/1763820917084-image-20220605154242376.png)



![image-20220605154128978](http://img.celfs.site/typora/2025/11/22/1763820917084-image-20220605154128978.png)

![image-20220605154251912](http://img.celfs.site/typora/2025/11/22/1763820917083-image-20220605154251912.png)



------



![image-20220605154634482](http://img.celfs.site/typora/2025/11/22/1763820917016-image-20220605154634482.png)

![image-20220605154710188](http://img.celfs.site/typora/2025/11/22/1763820916992-image-20220605154710188.png)

![image-20220605154351707](http://img.celfs.site/typora/2025/11/22/1763820916858-image-20220605154351707.png)

![image-20220605154642529](http://img.celfs.site/typora/2025/11/22/1763820916855-image-20220605154642529.png)





------



![image-20220605154819863](http://img.celfs.site/typora/2025/11/22/1763820916856-image-20220605154819863.png)

![image-20220605154943835](http://img.celfs.site/typora/2025/11/22/1763820916830-image-20220605154943835.png)

![image-20220605154958682](http://img.celfs.site/typora/2025/11/22/1763820916857-image-20220605154958682.png)





2022/06/05 15:50:20 37min 三次

------