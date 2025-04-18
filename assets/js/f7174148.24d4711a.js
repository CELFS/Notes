"use strict";(self.webpackChunknotes_new=self.webpackChunknotes_new||[]).push([[9351],{3774:(n,r,e)=>{e.d(r,{R:()=>d,x:()=>c});var t=e(36672);const i={},a=t.createContext(i);function d(n){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(r):{...r,...n}}),[r,n])}function c(n){let r;return r=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),t.createElement(a.Provider,{value:r},n.children)}},23732:(n,r,e)=>{e.r(r),e.d(r,{assets:()=>s,contentTitle:()=>c,default:()=>o,frontMatter:()=>d,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"introduction_to_operating_system/02-2_code","title":"02-2_code","description":"02 \u5e76\u53d1\uff08\u4ee3\u7801\uff09","source":"@site/docs/06_introduction_to_operating_system/02-2_code.md","sourceDirName":"06_introduction_to_operating_system","slug":"/introduction_to_operating_system/02-2_code","permalink":"/Notes/docs/introduction_to_operating_system/02-2_code","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"02-1_\u5e76\u53d1","permalink":"/Notes/docs/introduction_to_operating_system/02-1_\u5e76\u53d1"},"next":{"title":"03-1_\u6301\u4e45\u5316","permalink":"/Notes/docs/introduction_to_operating_system/03-1_\u6301\u4e45\u5316"}}');var i=e(23420),a=e(3774);const d={},c=void 0,s={},l=[{value:"02 \u5e76\u53d1\uff08\u4ee3\u7801\uff09",id:"02-\u5e76\u53d1\u4ee3\u7801",level:3},{value:"\u7b2c25\u7ae0 \u5173\u4e8e\u5e76\u53d1\u7684\u5bf9\u8bdd",id:"\u7b2c25\u7ae0-\u5173\u4e8e\u5e76\u53d1\u7684\u5bf9\u8bdd",level:3},{value:"\u7b2c26\u7ae0 \u5e76\u53d1\uff1a\u4ecb\u7ecd",id:"\u7b2c26\u7ae0-\u5e76\u53d1\u4ecb\u7ecd",level:3},{value:"\u7b2c27\u7ae0 \u63d2\u53d9\uff1a\u7ebf\u7a0bAPI",id:"\u7b2c27\u7ae0-\u63d2\u53d9\u7ebf\u7a0bapi",level:3},{value:"\u7b2c28\u7ae0 \u9501",id:"\u7b2c28\u7ae0-\u9501",level:3},{value:"\u7b2c29\u7ae0 \u57fa\u4e8e\u9501\u7684\u5e76\u53d1\u6570\u636e\u7ed3\u6784",id:"\u7b2c29\u7ae0-\u57fa\u4e8e\u9501\u7684\u5e76\u53d1\u6570\u636e\u7ed3\u6784",level:3},{value:"\u7b2c30\u7ae0 \u6761\u4ef6\u53d8\u91cf",id:"\u7b2c30\u7ae0-\u6761\u4ef6\u53d8\u91cf",level:3},{value:"\u7b2c31\u7ae0 \u4fe1\u53f7\u91cf",id:"\u7b2c31\u7ae0-\u4fe1\u53f7\u91cf",level:3},{value:"\u7b2c32\u7ae0 \u5e38\u89c1\u5e76\u53d1\u95ee\u9898",id:"\u7b2c32\u7ae0-\u5e38\u89c1\u5e76\u53d1\u95ee\u9898",level:3},{value:"\u7b2c33\u7ae0 \u57fa\u4e8e\u4e8b\u4ef6\u7684\u5e76\u53d1\uff08\u8fdb\u9636\uff09",id:"\u7b2c33\u7ae0-\u57fa\u4e8e\u4e8b\u4ef6\u7684\u5e76\u53d1\u8fdb\u9636",level:3},{value:"\u7b2c34\u7ae0 \u5e76\u53d1\u7684\u603b\u7ed3\u5bf9\u8bdd",id:"\u7b2c34\u7ae0-\u5e76\u53d1\u7684\u603b\u7ed3\u5bf9\u8bdd",level:3}];function h(n){const r={code:"code",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h3,{id:"02-\u5e76\u53d1\u4ee3\u7801",children:"02 \u5e76\u53d1\uff08\u4ee3\u7801\uff09"}),"\n",(0,i.jsx)(r.p,{children:"Date\uff1a2023/05/28 16:54:49"}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.p,{children:"[TOC]"}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c25\u7ae0-\u5173\u4e8e\u5e76\u53d1\u7684\u5bf9\u8bdd",children:"\u7b2c25\u7ae0 \u5173\u4e8e\u5e76\u53d1\u7684\u5bf9\u8bdd"}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c26\u7ae0-\u5e76\u53d1\u4ecb\u7ecd",children:"\u7b2c26\u7ae0 \u5e76\u53d1\uff1a\u4ecb\u7ecd"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'#include <stdio.h>\r\n#include <assert.h>\r\n#include <pthread.h>\r\n\r\nvoid *mythread(void *arg) {\r\n    printf("%s\\n", (char *) arg);\r\n    return NULL;\r\n}\r\n\r\nint main(int argc, char *argv[]) {\r\n    pthread_t p1, p2;\r\n    int rc;\r\n    printf("main: begin\\n");\r\n    rc = pthread_create(&p1, NULL, mythread, "A"); assert(rc == 0);\r\n    rc = pthread_create(&p2, NULL, mythread, "B"); assert(rc == 0);\r\n    // join waits for the threads to finish\r\n    rc = pthread_join(p1, NULL); assert(rc == 0);\r\n    rc = pthread_join(p2, NULL); assert(rc == 0);\r\n    printf("main: end\\n");\r\n    return 0;\r\n}\n'})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'#include <stdio.h>\r\n#include <pthread.h>\r\n#include "mythreads.h"\r\n\r\nstatic volatile int counter = 0;\r\n\r\n//\r\n// mythread()\r\n//\r\n// Simply adds 1 to counter repeatedly, in a loop\r\n// No, this is not how you would add 10,000,000 to\r\n// a counter, but it shows the problem nicely.\r\n//\r\nvoid * mythread(void *arg) {\r\n    printf("%s: begin\\n", (char *) arg);\r\n    int i;\r\n    for (i = 0; i < 1e7; i++) {\r\n        counter = counter + 1;\r\n    }\r\n    printf("%s: done\\n", (char *) arg);\r\n    return NULL;\r\n}\r\n\r\n//\r\n// main()\r\n//\r\n// Just launches two threads (pthread_create)\r\n// and then waits for them (pthread_join)\r\n//\r\nint main(int argc, char *argv[]) {\r\n    pthread_t p1, p2;\r\n    printf("main: begin (counter = %d)\\n", counter);\r\n    Pthread_create(&p1, NULL, mythread, "A");\r\n    Pthread_create(&p2, NULL, mythread, "B");\r\n    \r\n    // join waits for the threads to finish\r\n    Pthread_join(p1, NULL);\r\n    Pthread_join(p2, NULL);\r\n    printf("main: done with both (counter = %d)\\n", counter);\r\n    return 0;\r\n}\n'})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5982\u4f55\u7406\u89e3 \u201cPthread_join()\u201d \uff1f"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"# \u9884\u671f\u7ed3\u679c\r\nprompt> gcc -o main main.c -Wall -pthread \r\nprompt> ./main\r\nmain: begin (counter = 0) \r\nA: begin\r\nB: begin \r\nA: done \r\nB: done\r\nmain: done with both (counter = 20000000)\n"})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"# \u53ef\u80fd\u7ed3\u679c\r\nprompt> ./main\r\nmain: begin (counter = 0) \r\nA: begin\r\nB: begin \r\nA: done \r\nB: done\r\nmain: done with both (counter = 19221041)\n"})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-assembly",children:"mov 0x8049a1c, %eax \r\nadd $0x1, %eax\r\nmov %eax, 0x8049a1c\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u6c47\u7f16\u7684\u53c2\u6570\u987a\u5e8f\uff0c\u5fd8\u8bb0\u4e86\uff08\u5b9e\u9645\u4e0a\uff0c\u662f\u6307\u5b9a\u5730\u5740\uff0c\u5c06\u8be5\u5730\u5740\u5df2\u6709\u7684\u503c\u5b58\u4e8e eax \u5bc4\u5b58\u5668\uff0c\u5bf9\u5bc4\u5b58\u5668\u7684\u503c+1\uff0c\u6700\u540e\uff0c\u5c06\u5bc4\u5b58\u5668\u5f97\u5230\u7684\u7ed3\u679c\uff0c\u5b58\u5230\u6307\u5b9a\u7684\u5730\u5740\u4e2d\uff09"}),"\n",(0,i.jsx)(r.li,{children:"\u8fd9\u4e2a\u4f8b\u5b50\u5047\u5b9a\uff0c\u53d8\u91cfcounter\u4f4d\u4e8e\u5730\u57400x8049a1c\u3002\u5728\u8fd93\u6761\u6307\u4ee4\u4e2d\uff0c\u5148\u7528x86\u7684mov\u6307\u4ee4\uff0c\u4ece\u5185\u5b58\u5730\u5740\u5904\u53d6\u51fa\u503c\uff0c\u653e\u5165eax\u3002\u7136\u540e\uff0c\u7ed9eax\u5bc4\u5b58\u5668\u7684\u503c\u52a01\uff080x1\uff09\u3002\u6700\u540e\uff0ceax\u7684\u503c\u88ab\u5b58\u56de\u5185\u5b58\u4e2d\u76f8\u540c\u7684\u5730\u5740\u3002"}),"\n"]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c27\u7ae0-\u63d2\u53d9\u7ebf\u7a0bapi",children:"\u7b2c27\u7ae0 \u63d2\u53d9\uff1a\u7ebf\u7a0bAPI"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"#include <pthread.h> \r\nint\r\npthread_create(      pthread_t *        thread,\r\n               const pthread_attr_t *  attr,\r\n                     void *             (*start_routine)(void*),\r\n                     void *             arg);\n"})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int pthread_create(..., // first two args are the same\r\n                   void *    (*start_routine)(int), \r\n                   int       arg);\n"})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int pthread_create(..., // first two args are the same\r\n                   int       (*start_routine)(void *),\r\n                   void *     arg);\n"})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'int pthread_join(pthread_t thread, void **value_ptr);\r\n\r\n#include <pthread.h>\r\n\r\ntypedef struct  myarg_t {\r\n    int a;\r\n    int b;\r\n} myarg_t;\r\n\r\nvoid *mythread(void *arg) {\r\n    myarg_t *m = (myarg_t *) arg;\r\n    printf("%d %d\\n", m->a, m->b);\r\n    return NULL;\r\n}\r\n\r\nint main(int argc, char *argv[]) {\r\n    pthread_t p;\r\n    int rc;\r\n\r\n    myarg_t args;\r\n    args.a = 10;\r\n    args.b = 20;\r\n    rc = pthread_create(&p, NULL, mythread, &args);\r\n    ...\r\n}\n'})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5176\u5b9e\u6211\u4e00\u76f4\u4e0d\u7406\u89e3\uff0c\u4e3a\u4ec0\u4e48\u5b9a\u4e49\u7ed3\u6784\u4f53\u8981\u5199\u4e24\u6b21\u540d\u5b57\uff0c\u8fd9\u6837\u663e\u5f97\u7d2f\u8d58\uff1f\u4f46\u5370\u8c61\u4e2d\uff0c\u672b\u5c3e\u5206\u53f7\u4e2d\u7684\u540d\u5b57\uff0c\u662f\u8981\u8bed\u6cd5\u542b\u4e49\u7684\u3002"}),"\n",(0,i.jsxs)(r.li,{children:["\u5982\u4f55\u7406\u89e3\u4e3b\u51fd\u6570\u91cc\u9762\u7684 ",(0,i.jsx)(r.code,{children:"&args"})," \uff0c\u81ea\u5b9a\u4e49\u7684\u7c7b\u578b\uff0c\u4f7f\u7528\u5730\u5740\u5f15\u7528\u4f20\u53c2\uff1f\u8fd9\u662f\u5426\u76f8\u5f53\u4e8e\u628a\u81ea\u5b9a\u4e49\u7c7b\u578b\u53d8\u6210\u4e86\u4e00\u4e2a\u6570\u7ec4\uff1f\u8fd8\u662f\u8bf4\uff0c\u5982\u540c\u539f\u6587\u7684 \u201c\u53c2\u6570\u89e3\u5305\u201d \uff1f"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'#include <stdio.h>\r\n#include <pthread.h>\r\n#include <assert.h>\r\n#include <stdlib.h>\r\n\r\ntypedef struct  myarg_t {\r\n    int a;\r\n    int b;\r\n} myarg_t;\r\n\r\ntypedef struct  myret_t {\r\n    int x;\r\n    int y;\r\n} myret_t;\r\n\r\nvoid *mythread(void *arg) {\r\n    myarg_t *m = (myarg_t *) arg;\r\n    printf("%d %d\\n", m->a, m->b);\r\n    myret_t *r = Malloc(sizeof(myret_t));\r\n    r->x = 1;\r\n    r->y = 2;\r\n    return (void *) r;\r\n}\r\n\r\nint\r\nmain(int argc, char *argv[]) {\r\n    int rc;\r\n    pthread_t p;\r\n    myret_t *m;\r\n\r\n    myarg_t args;\r\n    args.a = 10;\r\n    args.b = 20;\r\n    Pthread_create(&p, NULL, mythread, &args);\r\n    Pthread_join(p, (void **) &m);\r\n    printf("returned %d %d\\n", m->x, m->y);\r\n    return 0;\r\n}\n'})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u4f20\u5165\u4e00\u4e2a\u503c\uff0c\u4e0d\u5fc5\u6253\u5305"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'void *mythread(void *arg) { \r\n    int m = (int) arg; \r\n    printf("%d\\n", m);\r\n    return (void *) (arg + 1);\r\n}\r\n\r\nint main(int argc, char *argv[]) { \r\n    pthread_t p;\r\n    int rc, m;\r\n    Pthread_create(&p, NULL, mythread, (void *) 100); \r\n    Pthread_join(p, (void **) &m);\r\n    printf("returned %d\\n", m);\r\n    return 0;\r\n}\n'})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u6c38\u8fdc\u4e0d\u8981\u8fd4\u56de\u4e00\u4e2a\u6307\u9488\uff0c\u5e76\u8ba9\u5b83\u6307\u5411\u7ebf\u7a0b\u8c03\u7528\u6808\u4e0a\u5206\u914d\u7684\u4e1c\u897f\uff0c\u4e00\u6bb5\u5371\u9669\u4ee3\u7801\uff1a\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u53d8\u91cf r \u88ab\u5206\u914d\u5728 mythread \u7684\u6808\u4e0a\u3002\u4f46\u662f\uff0c\u5f53\u5b83\u8fd4\u56de\u65f6\uff0c\u8be5\u503c\u4f1a\u81ea\u52a8\u91ca\u653e\uff0c\u56e0\u6b64\uff0c\u5c06\u6307\u9488\u4f20\u56de\u73b0\u5728\u5df2\u91ca\u653e\u7684\u53d8\u91cf\u5c06\u5bfc\u81f4\u5404\u79cd\u4e0d\u597d\u7684\u7ed3\u679c\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:'void *mythread(void *arg) {\r\n    myarg_t *m = (myarg_t *) arg;\r\n    printf("%d %d\\n", m->a, m->b);\r\n    myret_t r; // ALLOCATED ON STACK: BAD!\r\n    r.x = 1;\r\n    r.y = 2;\r\n    return (void *) &r;\r\n}\n'})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c28\u7ae0-\u9501",children:"\u7b2c28\u7ae0 \u9501"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5173\u4e8e\u9501\u7684\u4e00\u5bf9\u51fd\u6570"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int pthread_mutex_lock(pthread_mutex_t *mutex); \r\nint pthread_mutex_unlock(pthread_mutex_t *mutex);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u5982\u679c\u5728\u8c03\u7528 ",(0,i.jsx)(r.code,{children:"pthread_mutex_lock()"})," \u65f6\u6ca1\u6709\u5176\u4ed6\u7ebf\u7a0b\u6301\u6709\u9501\uff0c\u7ebf\u7a0b\u5c06\u83b7\u53d6\u8be5\u9501\u5e76\u8fdb\u5165\u4e34\u754c\u533a\uff08\u6301\u6709\u8be5\u9501\u7684\u7ebf\u7a0b\u901a\u8fc7\u89e3\u9501\u8c03\u7528\u91ca\u653e\u8be5\u9501\uff09\uff1a\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u7f3a\u4e4f\u6b63\u786e\u7684\u521d\u59cb\u5316\uff08lack of proper initialization\uff09"}),"\n",(0,i.jsx)(r.li,{children:"\u5728\u8c03\u7528\u83b7\u53d6\u9501\u548c\u91ca\u653e\u9501\u65f6\u6ca1\u6709\u68c0\u67e5\u9519\u8bef\u4ee3\u7801"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"pthread_mutex_t lock; \r\npthread_mutex_lock(&lock);\r\nx = x + 1; // or whatever your critical section is \r\npthread_mutex_unlock(&lock);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u521d\u59cb\u5316\u9501\uff08\u6cd5\u4e00\uff0c\u9759\u6001\u65b9\u6cd5\uff09"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"\u521d\u59cb\u5316\u9501\uff08\u6cd5\u4e8c\uff0c\u52a8\u6001\u65b9\u6cd5\uff0c\u5e38\u7528\uff09"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u7b2c\u4e00\u4e2a\u53c2\u6570\u662f\u9501\u672c\u8eab\u7684\u5730\u5740"}),"\n",(0,i.jsx)(r.li,{children:"\u7b2c\u4e8c\u4e2a\u53c2\u6570\u662f\u4e00\u7ec4\u53ef\u9009\u5c5e\u6027\uff08NULL \u9ed8\u8ba4\u503c\uff09"}),"\n",(0,i.jsxs)(r.li,{children:["\u7528\u5b8c\u9501\u540e\uff1a",(0,i.jsx)(r.code,{children:"pthread_mutex_destroy()"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int rc = pthread_mutex_init(&lock, NULL); \r\nassert(rc == 0); // always check success!\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u52a0\u5165\u9519\u8bef\u68c0\u67e5"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"// Use this to keep your code clean but check for failures\r\n// Only use if exiting program is OK upon failure \r\nvoid Pthread_mutex_lock(pthread_mutex_t *mutex) {\r\n  int rc = pthread_mutex_lock(mutex);\r\n  assert(rc == 0);\r\n}\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u901a\u5e38\u5e94\u907f\u514d\u4f7f\u7528\u4e0b\u9762\u4e24\u4e2a\u7248\u672c\uff08\u4f46\u6709\u4e9b\u60c5\u51b5\u4e0b\uff0c\u907f\u514d\u5361\u5728\uff08\u53ef\u80fd\u65e0\u9650\u671f\u7684\uff09\u83b7\u53d6\u9501\u7684\u51fd\u6570\u4e2d\u4f1a\u5f88\u6709\u7528\uff09\uff1a"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int pthread_mutex_trylock(pthread_mutex_t *mutex); \r\nint pthread_mutex_timedlock(pthread_mutex_t *mutex,\r\n                           struct timespec *abs_timeout);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u6761\u4ef6\u53d8\u91cf\uff08\u7b49\u5f85\uff0c\u7ebf\u7a0b\u4ea4\u4e92\uff09\uff1a\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u8981\u4f7f\u7528\u6761\u4ef6\u53d8\u91cf\uff0c\u5fc5\u987b\u53e6\u5916\u6709\u4e00\u4e2a\u4e0e\u6b64\u6761\u4ef6\u76f8\u5173\u7684\u9501"}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"_wait"})," \uff1a\u4f7f\u8c03\u7528\u7ebf\u7a0b\u8fdb\u5165\u4f11\u7720\u72b6\u6001"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex); \r\nint pthread_cond_signal(pthread_cond_t *cond);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"_wait"})," \u7528\u6cd5\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5982\u4f55\u7406\u89e3\u6b64\u5904\u7684\u4e24\u4e2a\u521d\u59cb\u5316\uff1f\uff08\u9759\u6001\u521d\u59cb\u5316\uff09"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER; \r\npthread_cond_t cond = PTHREAD_COND_INITIALIZER;\r\n\r\nPthread_mutex_lock(&lock); \r\nwhile (ready == 0)\r\n    Pthread_cond_wait(&cond, &lock); // \u4e0d\u53ef\u7528\u6807\u8bb0\u53d8\u91cf\u7b80\u5316\uff0c\u6613\u9519\r\nPthread_mutex_unlock(&lock);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u5524\u9192\u7ebf\u7a0b\uff1a\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u4fee\u6539\u524d\uff0c\u59cb\u7ec8\u786e\u4fdd\u6301\u6709\u9501\uff1b"}),"\n",(0,i.jsx)(r.li,{children:"\u7b49\u5f85\u8c03\u7528\u9664\u4e86\u4f7f\u8c03\u7528\u7ebf\u7a0b\u8fdb\u5165\u7761\u7720\u72b6\u6001\u5916\uff0c\u8fd8\u4f1a\u8ba9\u8c03\u7528\u8005\u7761\u7720\u65f6\u91ca\u653e\u9501\uff1b"}),"\n",(0,i.jsx)(r.li,{children:"\u91cd\u65b0\u83b7\u53d6\u8be5\u9501\uff0c\u4ece\u800c\u786e\u4fdd\u7b49\u5f85\u7ebf\u7a0b\u5728\u7b49\u5f85\u5e8f\u5217\u5f00\u59cb\u65f6\u83b7\u53d6\u9501\u4e0e\u7ed3\u675f\u65f6\u91ca\u653e\u9501\u4e4b\u95f4\u8fd0\u884c\u7684\u4efb\u4f55\u65f6\u95f4\uff0c\u5b83\u6301\u6709\u9501\uff1b"}),"\n",(0,i.jsx)(r.li,{children:"\u7b49\u5f85\u7ebf\u7a0b\u5728 while \u5faa\u73af\u4e2d\u91cd\u65b0\u68c0\u67e5\u6761\u4ef6\uff0c\u800c\u4e0d\u662f\u7b80\u5355\u7684 if \u8bed\u53e5\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-cpp",children:"Pthread_mutex_lock(&lock); \r\nready = 1; \r\nPthread_cond_signal(&cond); \r\nPthread_mutex_unlock(&lock);\n"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u7f16\u8bd1\u4e0e\u8fd0\u884c"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"// pthread.h\r\nprompt> gcc -o main main.c -Wall -pthread\n"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c29\u7ae0-\u57fa\u4e8e\u9501\u7684\u5e76\u53d1\u6570\u636e\u7ed3\u6784",children:"\u7b2c29\u7ae0 \u57fa\u4e8e\u9501\u7684\u5e76\u53d1\u6570\u636e\u7ed3\u6784"}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c30\u7ae0-\u6761\u4ef6\u53d8\u91cf",children:"\u7b2c30\u7ae0 \u6761\u4ef6\u53d8\u91cf"}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c31\u7ae0-\u4fe1\u53f7\u91cf",children:"\u7b2c31\u7ae0 \u4fe1\u53f7\u91cf"}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c32\u7ae0-\u5e38\u89c1\u5e76\u53d1\u95ee\u9898",children:"\u7b2c32\u7ae0 \u5e38\u89c1\u5e76\u53d1\u95ee\u9898"}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c33\u7ae0-\u57fa\u4e8e\u4e8b\u4ef6\u7684\u5e76\u53d1\u8fdb\u9636",children:"\u7b2c33\u7ae0 \u57fa\u4e8e\u4e8b\u4ef6\u7684\u5e76\u53d1\uff08\u8fdb\u9636\uff09"}),"\n",(0,i.jsx)(r.h3,{id:"\u7b2c34\u7ae0-\u5e76\u53d1\u7684\u603b\u7ed3\u5bf9\u8bdd",children:"\u7b2c34\u7ae0 \u5e76\u53d1\u7684\u603b\u7ed3\u5bf9\u8bdd"}),"\n",(0,i.jsx)(r.hr,{})]})}function o(n={}){const{wrapper:r}={...(0,a.R)(),...n.components};return r?(0,i.jsx)(r,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}}}]);