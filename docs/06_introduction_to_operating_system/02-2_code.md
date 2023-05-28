### 02 并发（代码）
Date：2023/05/28 16:54:49

------



[TOC]



------



### 第25章 关于并发的对话



------



### 第26章 并发：介绍

```cpp
#include <stdio.h>
#include <assert.h>
#include <pthread.h>

void *mythread(void *arg) {
    printf("%s\n", (char *) arg);
    return NULL;
}

int main(int argc, char *argv[]) {
    pthread_t p1, p2;
    int rc;
    printf("main: begin\n");
    rc = pthread_create(&p1, NULL, mythread, "A"); assert(rc == 0);
    rc = pthread_create(&p2, NULL, mythread, "B"); assert(rc == 0);
    // join waits for the threads to finish
    rc = pthread_join(p1, NULL); assert(rc == 0);
    rc = pthread_join(p2, NULL); assert(rc == 0);
    printf("main: end\n");
    return 0;
}
```

```cpp
#include <stdio.h>
#include <pthread.h>
#include "mythreads.h"

static volatile int counter = 0;

//
// mythread()
//
// Simply adds 1 to counter repeatedly, in a loop
// No, this is not how you would add 10,000,000 to
// a counter, but it shows the problem nicely.
//
void * mythread(void *arg) {
    printf("%s: begin\n", (char *) arg);
    int i;
    for (i = 0; i < 1e7; i++) {
        counter = counter + 1;
    }
    printf("%s: done\n", (char *) arg);
    return NULL;
}

//
// main()
//
// Just launches two threads (pthread_create)
// and then waits for them (pthread_join)
//
int main(int argc, char *argv[]) {
    pthread_t p1, p2;
    printf("main: begin (counter = %d)\n", counter);
    Pthread_create(&p1, NULL, mythread, "A");
    Pthread_create(&p2, NULL, mythread, "B");
    
    // join waits for the threads to finish
    Pthread_join(p1, NULL);
    Pthread_join(p2, NULL);
    printf("main: done with both (counter = %d)\n", counter);
    return 0;
}
```

* 如何理解 “Pthread_join()” ？

```bash
# 预期结果
prompt> gcc -o main main.c -Wall -pthread 
prompt> ./main
main: begin (counter = 0) 
A: begin
B: begin 
A: done 
B: done
main: done with both (counter = 20000000)
```

```bash
# 可能结果
prompt> ./main
main: begin (counter = 0) 
A: begin
B: begin 
A: done 
B: done
main: done with both (counter = 19221041)
```

```assembly
mov 0x8049a1c, %eax 
add $0x1, %eax
mov %eax, 0x8049a1c
```

* 汇编的参数顺序，忘记了（实际上，是指定地址，将该地址已有的值存于 eax 寄存器，对寄存器的值+1，最后，将寄存器得到的结果，存到指定的地址中）
* 这个例子假定，变量counter位于地址0x8049a1c。在这3条指令中，先用x86的mov指令，从内存地址处取出值，放入eax。然后，给eax寄存器的值加1（0x1）。最后，eax的值被存回内存中相同的地址。



------



### 第27章 插叙：线程API
### 第28章 锁
### 第29章 基于锁的并发数据结构
### 第30章 条件变量
### 第31章 信号量
### 第32章 常见并发问题
### 第33章 基于事件的并发（进阶）
### 第34章 并发的总结对话



------


