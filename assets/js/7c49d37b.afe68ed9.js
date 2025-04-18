"use strict";(self.webpackChunknotes_new=self.webpackChunknotes_new||[]).push([[3124],{3774:(e,n,l)=>{l.d(n,{R:()=>d,x:()=>r});var s=l(36672);const t={},i=s.createContext(t);function d(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),s.createElement(i.Provider,{value:n},e.children)}},30053:(e,n,l)=>{l.d(n,{A:()=>s});const s=l.p+"assets/images/image-20210614174041576-4a104991f4561a9b3bc4c0d835885dcd.png"},32036:(e,n,l)=>{l.d(n,{A:()=>s});const s=l.p+"assets/images/image-20210614174832258-44a7f05bc0a3595a1eb82a0d504c6e52.png"},73700:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>x,frontMatter:()=>d,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"linux/Linux_02_shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528","title":"Linux_02_shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528","description":"02 shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528","source":"@site/docs/01_linux/Linux_02_shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528.md","sourceDirName":"01_linux","slug":"/linux/Linux_02_shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528","permalink":"/Notes/docs/linux/Linux_02_shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Linux_01_Linux\u73af\u5883\u4e0b\uff0c\u90e8\u5206\u8f6f\u4ef6\u5b89\u88c5","permalink":"/Notes/docs/linux/Linux_01_Linux\u73af\u5883\u4e0b\uff0c\u90e8\u5206\u8f6f\u4ef6\u5b89\u88c5"},"next":{"title":"Linux_03_\u6587\u4ef6\u7684\u7279\u6b8a\u6743\u9650","permalink":"/Notes/docs/linux/Linux_03_\u6587\u4ef6\u7684\u7279\u6b8a\u6743\u9650"}}');var t=l(23420),i=l(3774);const d={},r=void 0,c={},h=[{value:"02 shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528",id:"02-shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528",level:3},{value:"\u529f\u80fd\u9700\u6c42 &amp; \u9700\u6c42\u5206\u6790",id:"\u529f\u80fd\u9700\u6c42--\u9700\u6c42\u5206\u6790",level:3},{value:"\u4ee3\u7801\u5b9e\u73b0",id:"\u4ee3\u7801\u5b9e\u73b0",level:3},{value:"1 \u663e\u793a\u5f53\u524d\u7528\u6237\u6700\u8fd1\u767b\u5f55\u6b21\u6570",id:"1-\u663e\u793a\u5f53\u524d\u7528\u6237\u6700\u8fd1\u767b\u5f55\u6b21\u6570",level:4},{value:"2 \u4e0a\u6b21\u767b\u5f55\u505c\u7559\u65f6\u95f4",id:"2-\u4e0a\u6b21\u767b\u5f55\u505c\u7559\u65f6\u95f4",level:4},{value:"3 \u5f53\u5730\u5f53\u65e5\u5929\u6c14",id:"3-\u5f53\u5730\u5f53\u65e5\u5929\u6c14",level:4},{value:"4 \u63a8\u8350\u540d\u4eba\u540d\u8a00",id:"4-\u63a8\u8350\u540d\u4eba\u540d\u8a00",level:4},{value:"5 \u95ee\u5019\u8bed",id:"5-\u95ee\u5019\u8bed",level:4},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:3}];function a(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"02-shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528",children:"02 shell\u73af\u5883\u7684\u719f\u6089\u4e0e\u4f7f\u7528"}),"\n",(0,t.jsx)(n.h3,{id:"\u529f\u80fd\u9700\u6c42--\u9700\u6c42\u5206\u6790",children:"\u529f\u80fd\u9700\u6c42 & \u9700\u6c42\u5206\u6790"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u5728\u6bcf\u6b21\u901a\u8fc7\u8fdc\u7a0b\u8fde\u63a5",(0,t.jsx)(n.strong,{children:"\u8fdb\u2f0a\u7cfb\u7edf\u65f6"}),"\uff0c\u544a\u77e5\u2f64\u6237\u76f8\u5173\u4fe1\u606f\uff1b"]}),"\n",(0,t.jsxs)(n.li,{children:["\u8981\u6c42\u663e\u793a\u7f8e\u89c2\uff0c\u6709\u2f00\u5b9a\u7684",(0,t.jsx)(n.strong,{children:"\u989c\u2f8a"}),"\u3002"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"}}),(0,t.jsx)(n.th,{children:"\u529f\u80fd\u9700\u6c42"}),(0,t.jsx)(n.th,{children:"\u9700\u6c42\u5206\u6790"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"1"}),(0,t.jsx)(n.td,{children:"\u6700\u8fd1\u2f00\u6bb5\u65f6\u95f4\uff0c\u5f53\u524d\u2f64\u6237\uff0c\u4e5f\u5c31\u662f\u4f60\uff0c\u767b\u5f55\u4e86\u591a\u5c11\u6b21"}),(0,t.jsx)(n.td,{children:"last\u7edf\u8ba1\u7528\u6237\u540d\u79f0\u8bcd\u9891"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"2"}),(0,t.jsx)(n.td,{children:"\u4e0a\u2f00\u6b21\u767b\u5f55\u7cfb\u7edf\uff0c\u505c\u7559\u4e86\u591a\u5c11\u65f6\u95f4"}),(0,t.jsx)(n.td,{children:"last"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"3"}),(0,t.jsx)(n.td,{children:"\u7ed9\u2f64\u6237\u63a8\u8350\u2f00\u53e5\u540d\u2f08\u540d\u2f94\uff0c\u5510\u8bd7\u4e09\u767e\u2fb8\u4e4b\u7c7b\u7684"}),(0,t.jsx)(n.td,{children:"\u6dfb\u52a0\u5230\u9ed8\u8ba4shell\u914d\u7f6e\u6587\u4ef6"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"4"}),(0,t.jsx)(n.td,{children:"\u6700\u597d\u8fd8\u80fd\u544a\u77e5\u2f00\u4e0b\u5f53\u5730\u5f53\u2f47\u5929\u2f53\u9884\u62a5"}),(0,t.jsx)(n.td,{children:"\u9700\u67e5\u8d44\u6599"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"5"}),(0,t.jsx)(n.td,{children:"\u2f00\u4e2a\u6e29\u99a8\u7684\u95ee\u5019"}),(0,t.jsx)(n.td,{children:"\u6dfb\u52a0\u5230\u9ed8\u8ba4shell\u914d\u7f6e\u6587\u4ef6"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"6"}),(0,t.jsx)(n.td,{children:"\u4fe1\u606f\u989c\u8272"}),(0,t.jsx)(n.td,{children:"\u9700\u67e5\u8d44\u6599"})]})]})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.p,{children:"\u6700\u540e\u4fee\u6539\u4fe1\u606f\uff1a2021\u5e746\u670814\u65e517:55:22  By CELFS"}),"\n",(0,t.jsx)(n.h3,{id:"\u4ee3\u7801\u5b9e\u73b0",children:"\u4ee3\u7801\u5b9e\u73b0"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u8fd0\u884c\u622a\u56fe",(0,t.jsx)(n.img,{alt:"image-20210614174832258",src:l(32036).A+"",width:"2560",height:"1600"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"1-\u663e\u793a\u5f53\u524d\u7528\u6237\u6700\u8fd1\u767b\u5f55\u6b21\u6570",children:"1 \u663e\u793a\u5f53\u524d\u7528\u6237\u6700\u8fd1\u767b\u5f55\u6b21\u6570"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"Name=`whoami`\r\nlogin_cnt=`last | cut -d ' ' -f 1 | grep -w ${Name} | wc -l`\r\necho \"033[1;33mYou had log \\033[1;34m${login_cnt}\\033[0m times.\\n\"\n"})}),"\n",(0,t.jsx)(n.h4,{id:"2-\u4e0a\u6b21\u767b\u5f55\u505c\u7559\u65f6\u95f4",children:"2 \u4e0a\u6b21\u767b\u5f55\u505c\u7559\u65f6\u95f4"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"landingtime=`last | grep -w ${Name} | head -2 | tail -1 | cut -d '(' -f2 | cut -d ')' -f1`\r\necho \"033[1;33mThe last online time : \\033[1;34m${landingtime}\\033[0m\\n\"\n"})}),"\n",(0,t.jsx)(n.h4,{id:"3-\u5f53\u5730\u5f53\u65e5\u5929\u6c14",children:"3 \u5f53\u5730\u5f53\u65e5\u5929\u6c14"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl wttr.in/\u5e7f\u5dde\\?0\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4e0a\u5348\u8c03\u7528\u8fd8\u80fd\u7528\uff0c\u4e0b\u5348\u5929\u6c14\u8f6f\u4ef6\u7ef4\u62a4\u4e86\u65e0\u6cd5\u663e\u793a"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"image-20210614174041576",src:l(30053).A+"",width:"1689",height:"387"})}),"\n",(0,t.jsx)(n.h4,{id:"4-\u63a8\u8350\u540d\u4eba\u540d\u8a00",children:"4 \u63a8\u8350\u540d\u4eba\u540d\u8a00"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'echo "A man who never makes mistakes must never try anything new.\\n"\r\necho "                      \t                --Albert Einstein\\n"\n'})}),"\n",(0,t.jsx)(n.h4,{id:"5-\u95ee\u5019\u8bed",children:"5 \u95ee\u5019\u8bed"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'echo "Hi , ${Name} , have you made any progress today ?\\n"\n'})}),"\n",(0,t.jsx)(n.h3,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Linux\u64cd\u4f5c\u7cfb\u7edf\u5b66\u4e60\u7b14\u8bb02\u2014\u6b22\u8fce\u767b\u9646\u754c\u9762_\u5b9e\u7ec3_Lioba\u7684\u535a\u5ba2-CSDN\u535a\u5ba2  ",(0,t.jsx)(n.a,{href:"https://blog.csdn.net/qq_39660009/article/details/112591744",children:"https://blog.csdn.net/qq_39660009/article/details/112591744"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u4e2a\u6027\u5316\u8bbe\u7f6eLinux\u7528\u6237\u767b\u5f55\u4fe1\u606f_Rowinner\u7684\u535a\u5ba2-CSDN\u535a\u5ba2  ",(0,t.jsx)(n.a,{href:"https://blog.csdn.net/Rowinner/article/details/110824404",children:"https://blog.csdn.net/Rowinner/article/details/110824404"})]}),"\n",(0,t.jsxs)(n.li,{children:["\\033[0;30m \u4e4b\u8d85\u7ea7\u7ec8\u7aef\u7684\u5b57\u4f53\u80cc\u666f\u548c\u989c\u8272\u663e\u793a\u7b49_\u591c\u98ce\u7684\u535a\u5ba2-CSDN\u535a\u5ba2  ",(0,t.jsx)(n.a,{href:"https://blog.csdn.net/u014470361/article/details/81512330",children:"https://blog.csdn.net/u014470361/article/details/81512330"})]}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}}}]);