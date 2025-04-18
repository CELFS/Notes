---
sidebar_label: "02 并发（代码）"
---

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

```cpp
#include <pthread.h> 
int
pthread_create(      pthread_t *        thread,
               const pthread_attr_t *  attr,
                     void *             (*start_routine)(void*),
                     void *             arg);
```

```cpp
int pthread_create(..., // first two args are the same
                   void *    (*start_routine)(int), 
                   int       arg);
```

```cpp
int pthread_create(..., // first two args are the same
                   int       (*start_routine)(void *),
                   void *     arg);
```



```cpp
int pthread_join(pthread_t thread, void **value_ptr);

#include <pthread.h>

typedef struct  myarg_t {
    int a;
    int b;
} myarg_t;

void *mythread(void *arg) {
    myarg_t *m = (myarg_t *) arg;
    printf("%d %d\n", m->a, m->b);
    return NULL;
}

int main(int argc, char *argv[]) {
    pthread_t p;
    int rc;

    myarg_t args;
    args.a = 10;
    args.b = 20;
    rc = pthread_create(&p, NULL, mythread, &args);
    ...
}
```

* 其实我一直不理解，为什么定义结构体要写两次名字，这样显得累赘？但印象中，末尾分号中的名字，是要语法含义的。
* 如何理解主函数里面的 `&args` ，自定义的类型，使用地址引用传参？这是否相当于把自定义类型变成了一个数组？还是说，如同原文的 “参数解包” ？

```cpp
#include <stdio.h>
#include <pthread.h>
#include <assert.h>
#include <stdlib.h>

typedef struct  myarg_t {
    int a;
    int b;
} myarg_t;

typedef struct  myret_t {
    int x;
    int y;
} myret_t;

void *mythread(void *arg) {
    myarg_t *m = (myarg_t *) arg;
    printf("%d %d\n", m->a, m->b);
    myret_t *r = Malloc(sizeof(myret_t));
    r->x = 1;
    r->y = 2;
    return (void *) r;
}

int
main(int argc, char *argv[]) {
    int rc;
    pthread_t p;
    myret_t *m;

    myarg_t args;
    args.a = 10;
    args.b = 20;
    Pthread_create(&p, NULL, mythread, &args);
    Pthread_join(p, (void **) &m);
    printf("returned %d %d\n", m->x, m->y);
    return 0;
}
```

* 传入一个值，不必打包

```cpp
void *mythread(void *arg) { 
    int m = (int) arg; 
    printf("%d\n", m);
    return (void *) (arg + 1);
}

int main(int argc, char *argv[]) { 
    pthread_t p;
    int rc, m;
    Pthread_create(&p, NULL, mythread, (void *) 100); 
    Pthread_join(p, (void **) &m);
    printf("returned %d\n", m);
    return 0;
}
```

* 永远不要返回一个指针，并让它指向线程调用栈上分配的东西，一段危险代码：
  * 变量 r 被分配在 mythread 的栈上。但是，当它返回时，该值会自动释放，因此，将指针传回现在已释放的变量将导致各种不好的结果。

```cpp
void *mythread(void *arg) {
    myarg_t *m = (myarg_t *) arg;
    printf("%d %d\n", m->a, m->b);
    myret_t r; // ALLOCATED ON STACK: BAD!
    r.x = 1;
    r.y = 2;
    return (void *) &r;
}
```



------



### 第28章 锁

* 关于锁的一对函数

```cpp
int pthread_mutex_lock(pthread_mutex_t *mutex); 
int pthread_mutex_unlock(pthread_mutex_t *mutex);
```

* 如果在调用 `pthread_mutex_lock()` 时没有其他线程持有锁，线程将获取该锁并进入临界区（持有该锁的线程通过解锁调用释放该锁）：
  * 缺乏正确的初始化（lack of proper initialization）
  * 在调用获取锁和释放锁时没有检查错误代码

```cpp
pthread_mutex_t lock; 
pthread_mutex_lock(&lock);
x = x + 1; // or whatever your critical section is 
pthread_mutex_unlock(&lock);
```

* 初始化锁（法一，静态方法）

```
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
```

* **初始化锁（法二，动态方法，常用）**
  * 第一个参数是锁本身的地址
  * 第二个参数是一组可选属性（NULL 默认值）
  * 用完锁后：`pthread_mutex_destroy()` 

```cpp
int rc = pthread_mutex_init(&lock, NULL); 
assert(rc == 0); // always check success!
```

* 加入错误检查

```cpp
// Use this to keep your code clean but check for failures
// Only use if exiting program is OK upon failure 
void Pthread_mutex_lock(pthread_mutex_t *mutex) {
  int rc = pthread_mutex_lock(mutex);
  assert(rc == 0);
}
```

* 通常应避免使用下面两个版本（但有些情况下，避免卡在（可能无限期的）获取锁的函数中会很有用）：

```cpp
int pthread_mutex_trylock(pthread_mutex_t *mutex); 
int pthread_mutex_timedlock(pthread_mutex_t *mutex,
                           struct timespec *abs_timeout);
```

* 条件变量（等待，线程交互）：
  * 要使用条件变量，必须另外有一个与此条件相关的锁
  * `_wait` ：使调用线程进入休眠状态

```cpp
int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex); 
int pthread_cond_signal(pthread_cond_t *cond);
```

* `_wait` 用法
  * 如何理解此处的两个初始化？（静态初始化）

```cpp
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER; 
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

Pthread_mutex_lock(&lock); 
while (ready == 0)
    Pthread_cond_wait(&cond, &lock); // 不可用标记变量简化，易错
Pthread_mutex_unlock(&lock);
```

* 唤醒线程：
  * 修改前，始终确保持有锁；
  * 等待调用除了使调用线程进入睡眠状态外，还会让调用者睡眠时释放锁；
  * 重新获取该锁，从而确保等待线程在等待序列开始时获取锁与结束时释放锁之间运行的任何时间，它持有锁；
  * 等待线程在 while 循环中重新检查条件，而不是简单的 if 语句。

```cpp
Pthread_mutex_lock(&lock); 
ready = 1; 
Pthread_cond_signal(&cond); 
Pthread_mutex_unlock(&lock);
```

* 编译与运行

```bash
// pthread.h
prompt> gcc -o main main.c -Wall -pthread
```



------



### 第29章 基于锁的并发数据结构











------



### 第30章 条件变量







### 第31章 信号量
### 第32章 常见并发问题
### 第33章 基于事件的并发（进阶）
### 第34章 并发的总结对话



------


