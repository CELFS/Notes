"use strict";(self.webpackChunknotes_new=self.webpackChunknotes_new||[]).push([[3512],{256:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605010835598-e12d4834955ec445adb28eed8bfdfb29.png"},3774:(A,e,a)=>{a.d(e,{R:()=>i,x:()=>d});var s=a(36672);const n={},t=s.createContext(n);function i(A){const e=s.useContext(t);return s.useMemo((function(){return"function"==typeof A?A(e):{...e,...A}}),[e,A])}function d(A){let e;return e=A.disableParentContext?"function"==typeof A.components?A.components(n):A.components||n:i(A.components),s.createElement(t.Provider,{value:e},A.children)}},7839:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605010130683-5364c0b109c9ecf31aa68eaa7c2deff7.png"},7974:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604174922256-99fb3badd13d4a53b441bea51d00f9f7.png"},8054:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605020411344-93305b6d02cb6b7b329d12a2db89243d.png"},11978:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605011449680-eeffcd8bb1099e4900c54c969a7374dc.png"},13163:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605011705288-f41f2179dce7f99177d6fa88267eabe7.png"},17188:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220603170305711-36c2aa69cc7bd5ad15818bdbac6972c7.png"},22826:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605015555534-462ed50af0fb44f8bf915195e82c8eff.png"},30968:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604175104152-4cff2090dad265a0c51b66b95007f977.png"},32868:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604175451593-e8e470164a6b225a34d6619ea64e6254.png"},33364:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604173543281-ba7cec1e7a01faf762f78d5592a778ec.png"},41265:(A,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>d,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>r});const s=JSON.parse('{"id":"ML_Andrew_Ng/10_1_Week_Large_Scale_Machine_Learning","title":"10-1 Week Large Scale Machine Learning","description":"Date\uff1a2022/06/03 1641","source":"@site/docs/10_ML_Andrew_Ng/10_1_Week_Large_Scale_Machine_Learning.md","sourceDirName":"10_ML_Andrew_Ng","slug":"/ML_Andrew_Ng/10_1_Week_Large_Scale_Machine_Learning","permalink":"/Notes/docs/ML_Andrew_Ng/10_1_Week_Large_Scale_Machine_Learning","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"sidebar_label":"10-1 Week Large Scale Machine Learning"},"sidebar":"tutorialSidebar","previous":{"title":"09-9 Week Exercise","permalink":"/Notes/docs/ML_Andrew_Ng/09_9_Exercise"},"next":{"title":"11-1 Week Photo OCR","permalink":"/Notes/docs/ML_Andrew_Ng/11_1_Week_Photo_OCR"}}');var n=a(23420),t=a(3774);const i={sidebar_label:"10-1 Week Large Scale Machine Learning"},d="10-1 Week Large Scale Machine Learning",c={},r=[{value:"Learning With Large Datasets",id:"learning-with-large-datasets",level:2},{value:"Stochastic Gradient Descent",id:"stochastic-gradient-descent",level:2},{value:"Mini-Batch Gradient Descent",id:"mini-batch-gradient-descent",level:2},{value:"Stochastic Gradient Descent Convergence",id:"stochastic-gradient-descent-convergence",level:2},{value:"Online Learning",id:"online-learning",level:2},{value:"Map Reduce and Data Parallelism",id:"map-reduce-and-data-parallelism",level:2}];function g(A){const e={annotation:"annotation",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",math:"math",mi:"mi",mrow:"mrow",p:"p",semantics:"semantics",span:"span",ul:"ul",...(0,t.R)(),...A.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"10-1-week-large-scale-machine-learning",children:"10-1 Week Large Scale Machine Learning"})}),"\n",(0,n.jsx)(e.p,{children:"Date\uff1a2022/06/03 16:47:41"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsx)(e.p,{children:"[TOC]"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsx)(e.h1,{id:"gradient-descent-with-large-datasets",children:"Gradient Descent with Large Datasets"}),"\n",(0,n.jsx)(e.h2,{id:"learning-with-large-datasets",children:"Learning With Large Datasets"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220603165051878",src:a(49514).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220603170116566",src:a(75146).A+"",width:"1389",height:"361"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220603170305711",src:a(17188).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.h2,{id:"stochastic-gradient-descent",children:"Stochastic Gradient Descent"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604172705660",src:a(98530).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"\u3010What's actually Batcb ?\u3011"}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604173031516",src:a(93845).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604173543281",src:a(33364).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604173911594",src:a(85050).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604174318233",src:a(83826).A+"",width:"1832",height:"1084"})}),"\n",(0,n.jsx)(e.h2,{id:"mini-batch-gradient-descent",children:"Mini-Batch Gradient Descent"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604174619684",src:a(52628).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"\u3010It's seems to the anomaly system\u3011"}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604174922256",src:a(7974).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604175104152",src:a(30968).A+"",width:"1848",height:"655"})}),"\n",(0,n.jsx)(e.h2,{id:"stochastic-gradient-descent-convergence",children:"Stochastic Gradient Descent Convergence"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604175451593",src:a(32868).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604175908352",src:a(42522).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604180025769",src:a(72586).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604180119223",src:a(56273).A+"",width:"2560",height:"1600"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220604180431626",src:a(79173).A+"",width:"1848",height:"1124"})}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["\u3010A larger ",(0,n.jsxs)(e.span,{className:"katex",children:[(0,n.jsx)(e.span,{className:"katex-mathml",children:(0,n.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,n.jsxs)(e.semantics,{children:[(0,n.jsx)(e.mrow,{children:(0,n.jsx)(e.mi,{children:"\u03b1"})}),(0,n.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\alpha"})]})})}),(0,n.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,n.jsxs)(e.span,{className:"base",children:[(0,n.jsx)(e.span,{className:"strut",style:{height:"0.4306em"}}),(0,n.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.0037em"},children:"\u03b1"})]})})]})," ?\u3011"]}),"\n"]}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsx)(e.h1,{id:"advanced-topics",children:"Advanced Topics"}),"\n",(0,n.jsx)(e.h2,{id:"online-learning",children:"Online Learning"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605010130683",src:a(7839).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605010845054",src:a(86918).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605010835598",src:a(256).A+"",width:"949",height:"492"})}),"\n",(0,n.jsx)(e.h2,{id:"map-reduce-and-data-parallelism",children:"Map Reduce and Data Parallelism"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605011347471",src:a(78871).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605011449680",src:a(11978).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605011705288",src:a(13163).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605011837646",src:a(60969).A+"",width:"1920",height:"1079"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605012010566",src:a(41320).A+"",width:"1004",height:"392"})}),"\n",(0,n.jsx)(e.p,{children:"2022/06/05 1:50:03 1h"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsx)(e.h1,{id:"exam",children:"\u3010Exam\u3011"}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605015420628",src:a(55997).A+"",width:"855",height:"308"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605015555534",src:a(22826).A+"",width:"850",height:"332"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605020717366",src:a(44329).A+"",width:"822",height:"160"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605020018248",src:a(61304).A+"",width:"822",height:"337"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605020411344",src:a(8054).A+"",width:"835",height:"341"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.img,{alt:"image-20220605020655908",src:a(76910).A+"",width:"849",height:"316"})}),"\n",(0,n.jsx)(e.p,{children:"18min"})]})}function m(A={}){const{wrapper:e}={...(0,t.R)(),...A.components};return e?(0,n.jsx)(e,{...A,children:(0,n.jsx)(g,{...A})}):g(A)}},41320:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605012010566-f7c879eb3cb131cecfe7217f5d392c5d.png"},42522:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604175908352-b7476d178048bd13fbeef06368b05570.png"},44329:(A,e,a)=>{a.d(e,{A:()=>s});const s="data:image/png;base64,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"},49514:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220603165051878-47701a6a2267f9336569e67b2fb9e5ae.png"},52628:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604174619684-0319882d4410c90f479331a95a624ee7.png"},55997:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605015420628-ddbc8648603bc219065c399c9968cd6f.png"},56273:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604180119223-108aad04fe45c2288d18deba562b4b48.png"},60969:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605011837646-8a2bd36a66009568c6d4ac75fbf9bdb0.png"},61304:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605020018248-c8c4cb97ab144783724f201647e8b445.png"},72586:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604180025769-2bc82de56327c465d090a1900929e97c.png"},75146:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220603170116566-53263d4351b580479baa8954e9121456.png"},76910:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605020655908-d299fe695a5cdb1b447068f5657765f4.png"},78871:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605011347471-0f537c315bc69ce7dc18953cf62bfbd0.png"},79173:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604180431626-a85df8b06027be7a47a3492046461794.png"},83826:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604174318233-d0e45e41ccf8f9de6cf0be5dd94df042.png"},85050:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604173911594-d308e8a0ce9d0ca81fb5b9c07fe8cb22.png"},86918:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220605010845054-aac676fd31f911ba73ad7d6d68cc8233.png"},93845:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604173031516-acba8c88b71c9b58794fe8fcdd1383b0.png"},98530:(A,e,a)=>{a.d(e,{A:()=>s});const s=a.p+"assets/images/image-20220604172705660-b640fb86666370f770dd6e398a263615.png"}}]);