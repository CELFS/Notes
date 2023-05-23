### 01 虚拟化（代码）
Date：2023/04/06 19:34:59

------



[TOC]



------



### 第2章 操作系统介绍

```C
// 循环打印的代码 cpu.c
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>
#include <assert.h>
#include "common.h"

int
main(int argc, char *argv[])
{
   if (argc != 2) {
        fprintf(stderr, "usage: cpu <string>\n");
       exit(1);
   }
   char *str = argv[1];
   while (1) {
       Spin(1);
       printf("%s\n", str);
   }
   return 0;
}
```

```C
// mem.c
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include "common.h"

int
main(int argc, char *argv[])
{
    int *p = malloc(sizeof(int));              // a1
    assert(p != NULL);
    printf("(%d) memory address of p: %08x\n",
           getpid(), (unsigned) p);            // a2
    *p = 0;                                    // a3
    while (1) {
        Spin(1);
        *p = *p + 1;
         printf("(%d) p: %d\n", getpid(), *p); // a4
    }
    return 0;
}
```

```C
// threads.c
#include <stdio.h>
#include <stdlib.h>
#include "common.h"

volatile int counter = 0;
int loops;

void *worker(void *arg) {
    int i;
    for (i = 0; i < loops; i++) {
        counter++;
    }
    return NULL;
}

int
main(int argc, char *argv[])
{ 
    if (argc != 2) {
        fprintf(stderr, "usage: threads <value>\n");
        exit(1);
    }
    loops = atoi(argv[1]);
    pthread_t p1, p2;
    printf("Initial value : %d\n", counter);

    Pthread_create(&p1, NULL, worker, NULL);
    Pthread_create(&p2, NULL, worker, NULL);
    Pthread_join(p1, NULL);
    Pthread_join(p2, NULL);
    printf("Final value    : %d\n", counter);
    return 0;
}
```



------



### 第3章 关于虚拟化的对话





------



### 第4章 抽象：进程

```c
// xv6 的 proc 结构
// the registers xv6 will save and restore
// to stop and subsequently restart a process
struct context {
  int eip;
  int esp;
  int ebx;
  int ecx;
  int edx;
  int esi;
  int edi;
  int ebp;
};

// the different states a process can be in
enum proc_state { UNUSED, EMBRYO, SLEEPING,
                  RUNNABLE, RUNNING, ZOMBIE };

// the information xv6 tracks about each process
// including its register context and state
struct proc {
  char *mem;                   // Start of process memory
  uint sz;                     // Size of process memory
  char *kstack;                // Bottom of kernel stack
                               // for this process
  enum proc_state state;       // Process state
  int pid;                     // Process ID
  struct proc *parent;         // Parent process
  void *chan;                  // If non-zero, sleeping on chan
  int killed;                  // If non-zero, have been killed
  struct file *ofile[NOFILE];  // Open files
  struct inode *cwd;           // Current directory
  struct context context;      // Switch here to run process
  struct trapframe *tf;        // Trap frame for the
                               // current interrupt
};
```



------



### 第5章 插叙：进程API

```C
// p1.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {

    printf("hello world (pid:%d)\n", (int) getpid());
    int rc = fork();
    if (rc < 0) {
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc == 0) {
        printf("hello, I am child (pid:%d)\n", (int) getpid());
    } else {
        printf("hello, I am parent of %d (pid:%d)\n", rc, (int) getpid());
    }

    return 0;
}
```

```zsh
celfs@ub code_from_book % ./a.out
hello world (pid:8852)
hello, I am parent of 8853 (pid:8852)
hello, I am child (pid:8853)
```



------



### 第6章 机制：受限直接执行

```Perl
# xv6的上下文切换代码 (必须知道一点x86和一点xv6)    
# void swtch(struct context **old, struct context *new);
#
# Save current register context in old and then load register context from new.
.globl swtch
swtch:
  # Save old registers
  movl 4(%esp), %eax # put old ptr into eax
  popl 0(%eax)        # save the old IP
  movl %esp, 4(%eax) # and stack
  movl %ebx, 8(%eax) # and other registers
  movl %ecx, 12(%eax)
  movl %edx, 16(%eax)
  movl %esi, 20(%eax)
  movl %edi, 24(%eax)
  movl %ebp, 28(%eax)

  # Load new registers
  movl 4(%esp), %eax # put new ptr into eax
  movl 28(%eax), %ebp # restore other registers
  movl 24(%eax), %edi
  movl 20(%eax), %esi
  movl 16(%eax), %edx
  movl 12(%eax), %ecx
  movl 8(%eax), %ebx
  movl 4(%eax), %esp  # stack is switched here
  pushl 0(%eax)       # return addr put in place
  ret                 # finally return into new ctxt
```



------



### 第7章 进程调度：介绍





------



### 第8章 调度：多级反馈队列





------



### 第9章 调度：比例份额

```C++
// counter: used to track if we've found the winner yet
int counter = 0;
// winner: use some call to a random number generator to
//         get a value, between 0 and the total # of tickets
int winner = getrandom(0, totaltickets);
// current: use this to walk through the list of jobs
node_t *current = head;

// loop until the sum of ticket values is > the winner
while (current) {
    counter = counter + current->tickets;
    if (counter > winner)
        break; // found the winner
    current = current->next;
}
// 'current' is the winner: schedule it...
```



------



### 第10章 多处理器调度（高级）
### 第11章 关于CPU虚拟化的总结对话
### 第12章 关于内存虚拟化的对话



------



### 第13章 抽象：地址空间

```C
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    printf("location of code : %p\n", (void *) main);
    printf("location of heap : %p\n", (void *) malloc(1));
    int x = 3;
    printf("location of stack : %p\n", (void *) &x);
    return x;
}
```



------



### 第14章 插叙：内存操作API
### 第15章 机制：地址转换





------



### 第16章 分段

```pseudocode
1    // get top 2 bits of 14-bit VA
2    Segment = (VirtualAddress & SEG_MASK) >> SEG_SHIFT
3    // now get offset
4    Offset = VirtualAddress & OFFSET_MASK
5    if (Offset >= Bounds[Segment])
6        RaiseException(PROTECTION_FAULT)
7    else
8        PhysAddr = Base[Segment] + Offset
9        Register = AccessMemory(PhysAddr)
```



------



### 第17章 空闲空间管理

```c
typedef struct header_t { 
    int size;
    int magic;
} header_t;
```

```c
void free(void *ptr) {
    header_t *hptr = (void *)ptr - sizeof(header_t);
}
```

* 如何理解 `(void *)ptr` ？
  * 将一个指向要释放的内存块的指针，转换为 `void` 类型指针。
  * 定义 `header_t` 类型的 `hptr` 变量，减去自定义结构体 `header_t` 的大小，得到内存块之前的**头部信息的起始地址**。
* 未理解以下代码的内嵌 `struct` ：
  * 为什么是得到 8 字节？`node_t` 初始化为 4 + 4 ？
  * 几种参数分别是？

```C
typedef struct node_t { 
    int size;
    struct node_t *next;
} node_t;
```

```C
// mmap() returns a pointer to a chunk of free space 
node_t *head = mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_ANON|MAP_PRIVATE, -1, 0);
head->size = 4096 - sizeof(node_t); 
head->next = NULL;
```





------



### 第18章 分页：介绍

```assembly
movl <virtual address>, %eax
```

```assembly
movl 21, %eax
```

```C
VPN     = (VirtualAddress & VPN_MASK) >> SHIFT // VPN_MASK =  0x30 or 110000, SHIFT = 4
PTEAddr = PageTableBaseRegister + (VPN * sizeof(PTE))
```

```C
offset   = VirtualAddress & OFFSET_MASK 
PhysAddr = (PFN << SHIFT) | offset
// Extract the VPN from the virtual address
VPN = (VirtualAddress & VPN_MASK) >> SHIFT

// Form the address of the page-table entry (PTE)
PTEAddr = PTBR + (VPN * sizeof(PTE))

// Fetch the PTE
PTE = AccessMemory(PTEAddr)

// Check if process can access the page
if (PTE.Valid == False)
    RaiseException(SEGMENTATION_FAULT)
else if (CanAccess(PTE.ProtectBits) == False)
    RaiseException(PROTECTION_FAULT)
else
    // Access is OK: form physical address and fetch it
    offset   = VirtualAddress & OFFSET_MASK
    PhysAddr = (PTE.PFN << PFN_SHIFT) | offset
    Register = AccessMemory(PhysAddr)
```

* 一个是右移，一个是左移，可否理解为 “右移裁剪了一部分，得到期望值”，“右移也裁剪了一部分，得到期望值”，两者合并得到最终期望结果？
* 描述了在每个内存引用上发生的情况的初始协议。无论如何，分页都需要我们执行一个额外的内存引用，以便首先从页表中获取地址转换。开销很大。

```C
int array[1000];
...
for (i = 0; i < 1000; i++) 
    array[i] = 0;
```

```C
prompt> gcc -o array array.c -Wall -O 
prompt> ./array
```

* objdump / otool 反汇编（以下需一点 x86 基础）

```assembly
0x1024 movl $0x0,(%edi,%eax,4) 
0x1028 incl %eax
0x102c cmpl $0x03e8,%eax 
0x1030 jne 0x1024
```





------



### 第19章 分页：快速地址转换（TLB）

```C
VPN = (VirtualAddress & VPN_MASK) >> SHIFT
(Success, TlbEntry) = TLB_Lookup(VPN)
if (Success == True)    // TLB Hit
    if (CanAccess(TlbEntry.ProtectBits) == True)
        Offset   = VirtualAddress & OFFSET_MASK
        PhysAddr = (TlbEntry.PFN << SHIFT) | Offset
        AccessMemory(PhysAddr)
    else
        RaiseException(PROTECTION_FAULT)
else    // TLB Miss
    PTEAddr = PTBR + (VPN * sizeof(PTE))
    PTE = AccessMemory(PTEAddr)
    if (PTE.Valid == False)
        RaiseException(SEGMENTATION_FAULT)
    else if (CanAccess(PTE.ProtectBits) == False)
        RaiseException(PROTECTION_FAULT)
    else
        TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits)
        RetryInstruction()
```









------



### 第20章 分页：较小的表

```cpp
SN           = (VirtualAddress & SEG_MASK) >> SN_SHIFT 
VPN          = (VirtualAddress & VPN_MASK) >> VPN_SHIFT 
AddressOfPTE = Base[SN] + (VPN * sizeof(PTE))
```

* 此段代码，可以了解掩码的意义

```cpp
PDEAddr = PageDirBase +（PDIndex×sizeof（PDE））
PTEAddr = (PDE.PFN << SHIFT) + (PTIndex * sizeof(PTE))
```

* 先用一定长度的 VPN 位获取 PDE，再用剩余的 VPN 位获取 PTE
* 从下面代码可以看到，在任何复杂的多级页表访问发生之前，硬件首先检查TLB。在命中时，物理地址直接形成，而不像之前一样访问页表。只有在TLB未命中时，硬件才需要执行完整的多级查找。在这条路径上，可以看到传统的两级页表的成本：两次额外的内存访问来查找有效的转换映射（第 13  行与 21 行）。

```cpp
VPN = (VirtualAddress & VPN_MASK) >> SHIFT
(Success, TlbEntry) = TLB_Lookup(VPN)
if (Success == True)    // TLB Hit
    if (CanAccess(TlbEntry.ProtectBits) == True)
        Offset   = VirtualAddress & OFFSET_MASK
        PhysAddr = (TlbEntry.PFN << SHIFT) | Offset
        Register = AccessMemory(PhysAddr)
    else
        RaiseException(PROTECTION_FAULT)
else                  // TLB Miss
    // first, get page directory entry
    PDIndex = (VPN & PD_MASK) >> PD_SHIFT
    PDEAddr = PDBR + (PDIndex * sizeof(PDE))
    PDE     = AccessMemory(PDEAddr)
    if (PDE.Valid == False)
        RaiseException(SEGMENTATION_FAULT)
    else
        // PDE is valid: now fetch PTE from page table
        PTIndex = (VPN & PT_MASK) >> PT_SHIFT
        PTEAddr = (PDE.PFN << SHIFT) + (PTIndex * sizeof(PTE))
        PTE     = AccessMemory(PTEAddr)
        if (PTE.Valid == False)
            RaiseException(SEGMENTATION_FAULT)
        else if (CanAccess(PTE.ProtectBits) == False)
            RaiseException(PROTECTION_FAULT)
        else
            TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits)
            RetryInstruction()
```











------



### 第21章 超越物理内存：机制
### 第22章 超越物理内存：策略
### 第23章 VAX/VMS虚拟内存系统
### 第24章 内存虚拟化总结对话



------


