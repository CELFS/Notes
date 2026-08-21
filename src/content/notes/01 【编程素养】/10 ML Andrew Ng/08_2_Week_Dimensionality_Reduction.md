# 08-2 Week Dimensionality Reduction

Date：2022/05/24 10:52:14

------





[TOC]



------



# Motivation

## Motivation I: Data Compression

![image-20220524105643925](http://img.celfs.site/typora/2025/11/22/1763820804910-image-20220524105643925.png)

![image-20220524105936022](http://img.celfs.site/typora/2025/11/22/1763820804878-image-20220524105936022.png)

* 【这里想起了二元关系里的合成，左合成、右合成 composite】



![image-20220524110545688](http://img.celfs.site/typora/2025/11/22/1763820804839-image-20220524110545688.png)

![image-20220524110713248](http://img.celfs.site/typora/2025/11/22/1763820804802-image-20220524110713248.png)



![image-20220524110938860](http://img.celfs.site/typora/2025/11/22/1763820804767-image-20220524110938860.png)

* 【因为想起二元关系，所以做对了】



## Motivation II: Visualization

![image-20220524111213444](http://img.celfs.site/typora/2025/11/22/1763820804724-image-20220524111213444.png)

![image-20220524111316252](http://img.celfs.site/typora/2025/11/22/1763820804657-image-20220524111316252.png)

![image-20220524111534099](http://img.celfs.site/typora/2025/11/22/1763820804623-image-20220524111534099.png)

![image-20220524111713273](http://img.celfs.site/typora/2025/11/22/1763820804613-image-20220524111713273.png)

* Visualization



2022/05/24 11:18:00 29min

------



# Principal Component Analysis

## Principal Component Analysis Problem Formulation

* PCA
* 【前置知识：线性代数，投影几何】

![image-20220525164823667](http://img.celfs.site/typora/2025/11/22/1763820804560-image-20220525164823667.png)

![image-20220525164800032](http://img.celfs.site/typora/2025/11/22/1763820804531-image-20220525164800032.png)

![image-20220525165054557](http://img.celfs.site/typora/2025/11/22/1763820804493-image-20220525165054557.png)

![image-20220525165446791](http://img.celfs.site/typora/2025/11/22/1763820804457-image-20220525165446791.png)

![image-20220525165434064](http://img.celfs.site/typora/2025/11/22/1763820804423-image-20220525165434064.png)



## Principal Component Analysis Algorithm

* 【算法背景信息，发明时间、发明人、发明原因、如何受到启发的……可能是某论文、某书提出。范畴，例如信息论中提出、生物科学中、计算机科学中……算法论坛？算法期刊？或者只是某个项目中的具体应用，再发展到理论推广的？】

![image-20220525171622085](http://img.celfs.site/typora/2025/11/22/1763820804385-image-20220525171622085.png)

![image-20220525172108980](http://img.celfs.site/typora/2025/11/22/1763820804292-image-20220525172108980.png)

![image-20220525172544276](http://img.celfs.site/typora/2025/11/22/1763820803259-image-20220525172544276.png)

* 【SVD 协方差矩阵、对称正定……】



![image-20220525172839990](http://img.celfs.site/typora/2025/11/22/1763820803037-image-20220525172839990.png)

* 【Why the U is n-by-n-dimensions ? Include the figure above.】



![image-20220525173100413](http://img.celfs.site/typora/2025/11/22/1763820802925-image-20220525173100413.png)

* 【数学中的矩阵运算顺序，与代码中的矩阵运算顺序？】

![image-20220525173548147](http://img.celfs.site/typora/2025/11/22/1763820802803-image-20220525173548147.png)

* 【WRONG】



# Applying PCA

## Reconstruction from Compressed Representation

![image-20220525175135182](http://img.celfs.site/typora/2025/11/22/1763820801235-image-20220525175135182.png)

![image-20220525180039110](http://img.celfs.site/typora/2025/11/22/1763820801189-image-20220525180039110.png)





## Choosing the Number of Principal Components

* This number K is a parameter of the PCA algorithm.

* This number K is also called the number of principle components or the number of principle components that we've retained.

![image-20220525180731578](http://img.celfs.site/typora/2025/11/22/1763820801224-image-20220525180731578.png)

![image-20220525181210818](http://img.celfs.site/typora/2025/11/22/1763820801229-image-20220525181210818.png)

![image-20220525181425607](http://img.celfs.site/typora/2025/11/22/1763820801186-image-20220525181425607.png)

![image-20220525181414396](http://img.celfs.site/typora/2025/11/22/1763820801181-image-20220525181414396.png)



## Advice for Applying PCA

![image-20220525182215616](http://img.celfs.site/typora/2025/11/22/1763820801238-image-20220525182215616.png)

![image-20220525182343139](http://img.celfs.site/typora/2025/11/22/1763820801148-image-20220525182343139.png)

![image-20220525182627147](http://img.celfs.site/typora/2025/11/22/1763820801182-image-20220525182627147.png)

![image-20220525182945537](http://img.celfs.site/typora/2025/11/22/1763820801217-image-20220525182945537.png)

![image-20220525183717880](http://img.celfs.site/typora/2025/11/22/1763820801145-image-20220525183717880.png)



2022/05/25 18:38:19 1h23min

------



# 【Exam】

![image-20220527193356317](http://img.celfs.site/typora/2025/11/22/1763820801147-image-20220527193356317.png)

![image-20220527193709184](http://img.celfs.site/typora/2025/11/22/1763820801146-image-20220527193709184.png)

![image-20220527193716658](http://img.celfs.site/typora/2025/11/22/1763820801081-image-20220527193716658.png)

![image-20220527193529047](http://img.celfs.site/typora/2025/11/22/1763820801079-image-20220527193529047.png)

![image-20220527193534231](http://img.celfs.site/typora/2025/11/22/1763820801082-image-20220527193534231.png)



![image-20220527193854715](http://img.celfs.site/typora/2025/11/22/1763820801080-image-20220527193854715.png)

![image-20220527194441121](http://img.celfs.site/typora/2025/11/22/1763820801078-image-20220527194441121.png)



![image-20220527193929679](http://img.celfs.site/typora/2025/11/22/1763820801077-image-20220527193929679.png)



![image-20220527194126223](http://img.celfs.site/typora/2025/11/22/1763820801076-image-20220527194126223.png)

![image-20220527194813748](http://img.celfs.site/typora/2025/11/22/1763820801075-image-20220527194813748.png)



![image-20220527194416032](http://img.celfs.site/typora/2025/11/22/1763820800980-image-20220527194416032.png)

![image-20220527194855486](http://img.celfs.site/typora/2025/11/22/1763820800979-image-20220527194855486.png)







![image-20220527195009669](http://img.celfs.site/typora/2025/11/22/1763820800976-image-20220527195009669.png)

![image-20220527195303504](http://img.celfs.site/typora/2025/11/22/1763820800976-image-20220527195303504.png)



![image-20220527195335984](http://img.celfs.site/typora/2025/11/22/1763820800979-image-20220527195335984.png)



![image-20220527195235403](http://img.celfs.site/typora/2025/11/22/1763820800978-image-20220527195235403.png)

![image-20220527195325940](http://img.celfs.site/typora/2025/11/22/1763820800977-image-20220527195325940.png)







![image-20220527195834096](http://img.celfs.site/typora/2025/11/22/1763820800906-image-20220527195834096.png)

![image-20220527195859921](http://img.celfs.site/typora/2025/11/22/1763820800841-image-20220527195859921.png)



![image-20220527195845324](http://img.celfs.site/typora/2025/11/22/1763820800907-image-20220527195845324.png)

![image-20220527195935063](http://img.celfs.site/typora/2025/11/22/1763820800843-image-20220527195935063.png)