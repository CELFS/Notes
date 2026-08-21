## 00 Task React 18

Date：2024/08/08 10:02:24

------



[TOC]



------



### 00 进度

* 开始课程（2024/08/08）
* Hooks 两种缓存钩子简单过了一下，后面项目碰到再补；
* 综合案例没有看，优先看项目文档，这两天抽时间看一遍即可，大概预览内容，依然是经典的 TodoList 案例，技术为 TypeScript、React18 与 Next.js，与项目的技术栈高度一致，可以提前看。
* 下一步
  * LobeChat
    * [目录架构](https://github.com/lobehub/lobe-chat/wiki/Folder-Structure.zh-CN) 
    * [前端架构](https://github.com/lobehub/lobe-chat/wiki/Architecture.zh-CN#%E5%89%8D%E7%AB%AF%E6%9E%B6%E6%9E%84) 
    * [技术开发指南](https://github.com/lobehub/lobe-chat/wiki/Intro.zh-CN) 
    * [前端页面开发](https://github.com/lobehub/lobe-chat/wiki/Feature-Development-Frontend.zh-CN#3-%E5%88%9B%E5%BB%BA-zustand-store) 
    * [状态管理](https://github.com/lobehub/lobe-chat/wiki/State-Management-Intro.zh-CN) 
  * 综合案例，零碎时间看完，重点理解项目构建的流程与工具协作关系；
  * [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) 简短教程；
  * [SWR](https://swr.bootcss.com/index.html) 用于数据请求的 React Hooks 库。
  * [Next.js](https://nextjs.frontendx.cn/docs/#%E5%AE%89%E8%A3%85) 



------



## 01 核心语法

### 01 介绍

![image-20240808101119669](http://img.celfs.site/typora/2025/11/22/1763818357523-image-20240808101119669.png)



------



### 02 项目搭建

* 创建项目（两种）
  * 1）引入核心文件 `react.js` 
  * 2）使用脚手架 `create-react-app` 

```bash
# 启动脚手架
npx create-react-app projectName

# 切换到目录，运行项目
cd projectName
npm start
```

* 目录结构
  * 类似 Vue（ `src`、`public` 等）
  * `main.js` 入口文件
    * 两个关键词库 `React` 与 `ReactDom` 
  * `App.js` 根组件
    * 导入缺省后缀为 `.js` 
    * 创建方式
      * 1）函数组件（官方主推）
      * 2）类组件（生命周期管理，较复杂冗余）

```react
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

```react
// App.js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
```



------



### 03 JSX

* JavaScript + HTML --> 模板语法（比 Vue 的 JSX 融合更深）

#### 语法规则

* 命名
  * 小驼峰（例如 `onClick` ），而不是普通 Label 的约定
* 返回值
  * `return (XXXcode);` 换行必须加括号，建议都加括号；
* 根元素
  * JSX 只能有一个根元素（类似 Vue 2 template 仅支持单根元素）；
  * 1）外层包一层容器；
  * 2）空标签 `<></>` 不进行渲染，多级标签语境需求下可用；

![image-20240808104011724](http://img.celfs.site/typora/2025/11/22/1763818357491-image-20240808104011724.png)

```react
function App() {
  return ( // 小括号
    <>	   // 空标签
      <div className="App">
        <header className="App-header">
      	  123
        </header>
      </div>
      <div>678</div>
    </>
  );
}
```

* 标签
  * 正确的标签闭合 `<单标签闭合 />`，`<>双标签闭合</>` 
* 插值
  * 1）标签内容
  * 2）标签属性（注意，不得双引号）

```react
function App() {
  const divContent = '标签内容';
  const divTitle = '标签标题';

  return (
    <div title={divTitle}>
      {divContent}
    </div>
  );
}
```



------



### 04 数据渲染

* 1）条件渲染

```react
function App() {
  const divTitle = '标签标题';

  const flag = true;
  let divContent = '';
  if (flag) {
    divContent= <span>flag is true</span>
  } else {
    divContent= <p>flag is false</p>
  }

  return (
    <div title="{divTitle}">
      {divContent}
    </div>
  );
}
```

* 2）列表渲染
  * 遍历：for 循环、`.map()` 方法（具有返回值，相比 `.ForEach()` ）

```react
function App() {
  const list = ['Maxwell', 'Mike', 'Jim'];
  const listContent =  list.map(item => (
    <li>{item}</li>
  ));

  return (
    <ul>{listContent}</ul>
  );
}
```

* 需添加唯一 key 属性（同级元素 key 唯一即可）
  * key 用于保证虚拟 DOM  中当前元素的唯一性；
  * 可确保任意情况下，渲染的正确性；

![image-20240808112138499](http://img.celfs.site/typora/2025/11/22/1763818357515-image-20240808112138499.png)

* 修改数据格式
  * 添加 id（开发环境由后端返回）

```react
function App() {
  const list = [
    {id: 1, name: 'Maxwell'}, 
    {id: 2, name: 'Mike'}, 
    {id: 3, name: 'Jim'},
  ];

  const listContent =  list.map(item => (
    <li key={item.id}>{item.name}</li>
  ));

  return (
    <ul>{listContent}</ul>
  );
}
```

* 单个根元素
  * 空标签无法使用 key 属性；
  * 引入 Fragment 组件；

```react
import { Fragment } from "react";

function App() {
  const list = [
    {id: 1, name: 'Maxwell'}, 
    {id: 2, name: 'Mike'}, 
    {id: 3, name: 'Jim'},
  ];

  const listContent =  list.map(item => (
    <Fragment key={item.id}>
      <li>{item.name}</li>
      <li>-----------</li>
    </Fragment>
  ));

  return (
    <ul>{listContent}</ul>
  );
}

export default App;
```

* 疑问
  * React 是否有类似 Vue 的 method 管理方式？是否需要考虑挂载？函数组件不需要考虑挂载？
  * 如何理解 `item => ()` 与 `item => {}` 的区别？这个从语法习惯上，对比 Vue 需时间适应理解。

```javascript
const listContent =  list.map(item => (
  <li>{item}</li>
));
```



------



### 05 事件处理

```react
// 事件处理，普通变量，非响应式数据 --> 修改无效
function App() {
  let divContent = 'defalut content';

  function handleClick() {
    divContent = 'NEW CONTENT';
  }

  return (
    <>
      <div>{divContent}</div>
      <button onClick={handleClick}>BTN</button>
    </>
  );
}

export default App;
```



------



### 06 状态处理

* 函数式组件默认没有响应式数据，需使用 `userState` 将数据返回（理解为，其使用形式类似实现了一种数据通信方式）。
* `useState` 
  * 返回一个数组；
  * 解构接收 `[content, setContent]` ；
    * `content` 用于**读**取本次渲染的数据；
    * `setContent` 用于修**改**渲染的数据；
  * 状态变量对页面负担很大，因此，通常一个页面只有两三个状态变量。
  * 状态形式
    * 字符串
    * 对象（适用关联形式的数据）
    * 数组（有序，根据不同 `...data` 位置，改变结果）

```react
// 状态形式：字符串
import { useState } from "react";

function App() {
  const [content, setContent] = useState('defalut content');

  function handleClick() {
    setContent();
  }

  return (
    <>
      <div>{divContent}</div>
      <button onClick={handleClick}>BTN</button>
    </>
  );
}

export default App;
```

```react
// 状态形式：对象
function App() {
  const [data, setData] = useState({
    title: 'default title',
    content: 'default content',
  });

  function handleClick() {
    setData({
      ...data,
      title: 'new title', // 新属性需后写
    });
  }

  return (
    <>
      <div title={data.title}>{data.content}</div>
      <button onClick={handleClick}>BTN</button>
    </>
  );
}
```

```react
// 状态形式：数组
function App() {
  const [data, setData] = useState([
    {id: 1, name: 'Maxwell'}, 
    {id: 2, name: 'Mike'}, 
    {id: 3, name: 'Jim'},
  ]);

  const listData = data.map(item => (
    <li key={item.id}>{item.name}</li>
  ));

  // let id = 3;
  function handleClick() {
    // setData([
    //   {id: ++id, name: 'Hilbert'},
    //   ...data, // 有序
    // ]);
    setData(data.filter(item => item.id !== 2));
  }

  return (
    <>
      <ul>{listData}</ul>
      <button onClick={handleClick}>BTN</button>
    </>
  );
}
```

* 疑问
  * `useState` 返回对象，除了提到的两种属性或方法外，是否还有其他内容？
  * 如何理解前置后置 `++` 在 key 生成时产生的重复 key 问题？需考虑 id 更新的时间，才能清晰理解前后置 `++` 在相应上下文中的作用时机与作用行为。
    * 其实这个问题不用纠结，仅仅演示了一个局部变量为基础的 id 累加，只能生效一次，其后就会发生 key 重复。
    * 另外，id 通常由后端返回数据，并不需要前端手动设置。



------



## 02 组件通信与插槽



* 组件类型
  * React DOM 组件（指支持的所有 HTML 与 SVG 标签）
    * Props（类似 HTML 属性，但有变化，用法也有区别）
  * React 组件


### 01 React DOM 组件

* React DOM 组件 Props 设置
  * `className` 避免与原生 `class` 冲突；
  * 使用插值变量形式传递样式（JSX 内联）；
  * JSX 展开语法
    * 将属性预制为一个 JS 对象（ `alt=""` 由于规范则必须内联）
    * JSX 展开操作 `...` 并非 ES6 的扩展运算符；
      * ES6 扩展运算符依赖容器，不能单独使用，仅仅是将对象键值插入当前位置，整体是从对象取属性，又放在一个对象字面量中，最后组成一个新对象。可用于拷贝逻辑；
      * JSX 展开操作则是**编译时的额外操作**，并非解开直接可以将变量的内容插入到标签中（插值标记 VS 对象变量花括号）。

```react
// 样式对象变量
import image from './logo.svg';

function App() {
  const imgStyleObj = {
      width: 200,
      height: 200,
      backgroundColor: 'gray'
  }

  return (
    <div>
      <img 
        src={image}
        alt=""
        className='small'
        style= {imgStyleObj}
      />
    </div>
  );
}

export default App;
```

```react
// JSX 展开运算符
function App() {
  const imgData = {
    className: 'small',
    style: {
      width:  200,
      height: 200,
      backgroundColor: 'gray'
    }
  }

  return (
    <div>
      <img 
        src={image}
        alt=""
        {...imgData}
      />
    </div>
  );
}
```

```react
// 解开变量时，style 使用双花括号
// 外层为 JSX 插值标记，内层为对象变量
className='small'
style={{
  width: 200,
  height: 200,
  backgroundColor: 'gray'
}}
```



------



### 02 React 组件

* 1）React 组件 Props 设置

```react
function Article ({title, content, active}) { // 通常使用解构赋值，更为简洁
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>状态：{active ? '显示中' : '已隐藏'}</p>
    </div>
  );
}

export default function App () {
  return (
    <>
      <Article
        title="标题1"
        content="内容1"
        active
      />
      <Article
        title="标题2"
        content="内容2"
      />
      <Article
        title="标题3"
        content="内容3"
        active
      />
    </>
  );
}
```

* 2）在 React 组件中展开 Props 的使用场景
  * 实现了父组件向子组件传值的处理；
  * 根据业务，可使用 Type 判断不同组件的使用，例如替换下面代码的 `detailData` 部分，从而针对性加载组件。

```react
function Detail ({content, active}) {
  return (
    <>
      <p>{content}</p>
      <p>状态：{active ? '显示中' : '已隐藏'}</p>
    </>
  );
}

function Article ({title, articleData}) {
  return (
    <div>
      <h2>{title}</h2>
      <Detail {...articleData} />
    </div>
  );
}

export default function App () {
  const articleData = {
    title: '标题1',
    detailData: {
      content: '内容',
      active: true
    }
  };

  return (
    <>
      <Article
        {...articleData}
      />
    </>
  );
}
```

* 组件复用的操作步骤
  * 1）请求功能所需的数据（如文章信息）；
  * 2）创建多个 Article 组件；
  * 3）将文章数据分别传递给 Article。

* 经验
  * 复用是指逻辑复用，而内容一般是不会复用的。



------



### 03 组件插槽

* React 实际上没有插槽概念，其实是使用 JSX 实现了类似效果，通常称作 “将 JSX 作为 Props 传递给子组件”，以 `children` 关键字接收。

#### 将 JSX 作为 Props 传递

```react
function List({children}) {
  return (
    <ul>
      {children}
    </ul>
  );
}

export default function App () {
  return (
    <>
      <List>
        <li>列表项1</li>
        <li>列表项1</li>
        <li>列表项1</li>
      </List>
      <List>
        <li>列表项2</li>
        <li>列表项2</li>
        <li>列表项2</li>
      </List>
    </>
  );
}
```

#### 1）向多个位置传递 JSX

* 对应 Vue 默认插槽、具名插槽等

```react
function List({children, title, footer=<div>默认底部</div>}) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {children}
      </ul>
      {footer}
    </>
  );
}

export default function App () {
  return (
    <>
      <List
        title="列表1"
        footer={<p>这是底部内容1</p>}
      >
        <li>列表项1</li>
        <li>列表项1</li>
        <li>列表项1</li>
      </List>
      <List
        title="列表2"
        footer={<p>这是底部内容2</p>}
      >
        <li>列表项2</li>
        <li>列表项2</li>
        <li>列表项2</li>
      </List>
      <List
        title="列表3"
      >
        <li>列表项3</li>
        <li>列表项3</li>
        <li>列表项3</li>
      </List>
    </>
  );
}
```

#### 2）子组件向父组件传值

* 由父组件给子组件进行自定义事件设置，触发事件时，向父组件传递参数。
* e.g. 购物车，由父组件进行状态控制，十分常用，子组件向父组件传值。实际项目中的购物车，往往比较复杂，包含多级的组件回传机制。

```react
// 实现状态控制的点击事件，而父组件此处并未与子组件建立通信关系
import { useState } from 'react';

function Detail () {
  const [status, setStatus] = useState(false); 

  function handleClick () {
    setStatus(!status);
  }

  return (
    <div>
      <button onClick={handleClick}>按钮</button>
      <p style={{
        display: status ? 'block' : 'none'
      }}>Detail的内容</p>
    </div>
  );
}

export default function App () {
  return (
    <>
      <Detail
      
      />
    </>
  );
}
```

```react
// 实现父组件接收子组件的状态（利用自定义属性）
import { useState } from 'react';

function Detail ({ onActive }) {
  const [status, setStatus] = useState(false); 

  function handleClick () {
    setStatus(!status);
    onActive(status);
  }

  return (
    <div>
      <button onClick={handleClick}>按钮</button>
      <p style={{
        display: status ? 'block' : 'none'
      }}>Detail的内容</p>
    </div>
  );
}

export default function App () {
  function handleActive (status) {
    console.log(status);
  }

  return (
    <>
      <Detail
        onActive={handleActive}
      />
    </>
  );
}
```

#### 3）同级组件传值

* 借助父组件中转。

#### 4）使用 Context 进行多级组件传值

* Context 是 React 的钩子，**属性穿透**钩子
  * `createContext` --> `useContext` 
  * 帕斯卡命名法（单词开头全大写）
* 多级标题，可使用原生 JS 递归实现。

```react
// 多级组件，嵌套复杂
export function Section ({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

export function Heading ({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error(`Invalid level: ${level}`);
  }
}

export function App () {
  return (
    <>
      <Section>
        <Heading level={1}>主标题</Heading>
        <Section>
          <Heading level={2}>副标题</Heading>
          <Heading level={2}>副标题</Heading>
          <Heading level={2}>副标题</Heading>
          <Section>
            <Heading level={3}>子标题</Heading>
            <Heading level={3}>子标题</Heading>
            <Heading level={3}>子标题</Heading>
            <Section>
              <Heading level={4}>子子标题</Heading>
              <Heading level={4}>子子标题</Heading>
              <Heading level={4}>子子标题</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </>
  );
}

export default App;
```

```react
import { useContext, createContext } from 'react';

export function Section ({ children }) {
  const level = useContext(LevelContext);

  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

export function Heading ({ children }) {
  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error(`Invalid level: ${level}`);
  }
}

const LevelContext = createContext(0); // 默认层级

export function App () {
  return (
    <>
      <Section>
        <Heading>主标题</Heading>
          
        <Section>
          <Heading>副标题</Heading>
          <Heading>副标题</Heading>
          <Heading>副标题</Heading>
            
          <Section>
            <Heading>子标题</Heading>
            <Heading>子标题</Heading>
            <Heading>子标题</Heading>
              
            <Section>
              <Heading>子子标题</Heading>
              <Heading>子子标题</Heading>
              <Heading>子子标题</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </>
  );
}

export default App;
```

* 经验
  * 可选项可以给一个默认值，避免因为传入参数不一致导致的错误。
  * VSC `Ctrl + D` 快速选择。
    * 通常，HTML用作结构呈现，CSS进行样式处理。无论 h1 到 h6 呈现怎也的网页效果，都应该自己根据网页的设计进行相应的设置，哪怕默认的样式跟需要的一致，也要进行设置，这样可以避免意外的样式。
* 疑问
  * 在不同组件复杂度的情况下，分别如何进行状态处理？
  * ~~如何理解 `onActive` 从 `Detail` 以及 `handleActive` 传递过程中，其**作为参数或者作为函数名称的角色变化**？~~
    * 首先，`onActive` 作为子组件的自定义属性，充当组件通信的媒介；
    * 其次，`onActive` 媒介传入子组件，以函数形式接受一个由点击事件传入的 `status` 状态参数；
    * 最后， 状态参数以 `onActive` 属性值的形式，由  `handleActive` 函数接收，回传到 App 父组件；
    * 由此，实现了将 `status` 状态以参数形式在父子组件之间流动的全过程，即实现了子组件向父组件传值。



* 2024/08/08 20:10:54
* 2024/08/09 15:02:16

------



## 03 React Hooks 速成

### 01 reducer

* Reducer 用于统一管理状态的操作方式。尤其是较为复杂的状态，可以单独定义状态函数，使用 `action.type` 对其进行命名封装，从而简化调用位置的代码，并且便于集中代码逻辑，便于扩展其他操作。

```react
import { useReducer, useState } from 'react';

// 定义一个计数器reducer函数
function countReducer (state, action) {
  // 根据action.type的值，返回不同的state
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
}

export default function App () {
  // 使用useReducer来管理计数器的状态
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(countReducer, 0);
  // const handleIncrement = () => setCount(count + 1);
  // 定义一个增加计数的函数
  const handleIncrement = () => dispatch({ type: 'increment' });
  // 定义一个减少计数的函数
  const handleDecrement = () => dispatch({ type: 'decrement' });

  return (
    <div style={{ padding: 10 }}>
      <button onClick={handleIncrement}>+</button>
      <span> {state} </span>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```



------



### 02 ref

* `useRef` 可用于记录状态更新前的数值。

```react
import { useState, useRef } from 'react'

export default function App () {
  const [count,setCount]=useState(0);
  const prevCount = useRef();

  function handleClick() {
    prevCount.current = count;
    setCount(count +1);
  }

  return (
    <div>
      <p>最新的count: {count}</p>
      <p>上次的count: {prevCount.current}</p>
      <button onClick={handleClick}>增大count</button>
    </div>
  );
}
```

```react
// useRef 获取标签
import { useRef } from 'react'

export default function App () {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}
```



------



### 03 useImperativeHandle & forwardRef

* 默认情况下，子组件不对外开放它内部的功能。
  * 子组件定义方式
    * 需使用函数表达式；
    * 需使用 `forwardRef` 进行处理；

* `forwardRef` 可用于获取子组件。

* `useImperativeHandle` 可以将子组件的方法暴露给父组件，即将内部方法开放给外部访问。

```react
// useRef 获取子组件 | 代码还有问题
import { forwardRef, useRef } from 'react'

// 使用forwardRef函数创建一个子组件
const Child = forwardRef(function (props, ref) {
  // 返回一个div元素，内容为“子组件”
  return (
    <div>子组件</div>
  );
});

// 导出App组件
export default function App () {
  // 创建一个ref对象，用于引用子组件
  const childRef = useRef();

  // 定义一个点击事件处理函数
  function handleClick() {
  }

  // 返回一个div元素，包含子组件和一个按钮
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}
```

```react
import { forwardRef, useImperativeHandle, useRef } from 'react'

// 使用forwardRef函数创建一个子组件
const Child = forwardRef(function (props, ref) {

  useImperativeHandle(ref, () => ({ // 传入外部设置的 ref
    // 暴露一个方法给父组件调用
    myFn: () => {
      console.log('子组件的 myFn 方法被调用了');
    }
  }));

  // 返回一个div元素，内容为“子组件”
  return (
    <div>子组件</div>
  );
});

// 导出App组件
export default function App () {
  // 创建一个ref对象，用于引用子组件
  const childRef = useRef();

  // 定义一个点击事件处理函数
  function handleClick() {
    childRef.current.myFn();
  }

  // 返回一个div元素，包含子组件和一个按钮
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}
```



------



### 04 useEffect

* `useEffect` 副作用函数，例如希望在组件加载或组件更新时（非用户操作触发的），能够执行一些副作用。
  * 默认组件渲染时执行；
  * React 严格模式下，默认对每个函数组件执行两次，以检查是否出现函数不纯的情况；
  * 参数二，依赖数组
    * 用以指定哪些状态发生变化时，会导致副作用函数执行。
    * 若传入空数组，则任何状态变更都不会导致函数执行。

```react
import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  
  useEffect(() => {
    console.log('useEffect');
  }, [count]);

  return (
    <div style={{ padding: 10 }}>
      <button onClick={handleIncrement}>+</button>
      <span> {count} </span>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```



------



### 05 useMemo

* 用于缓存数据（类似 Vue 的计算属性？）。
* 通常，父组件的状态变更，会导致内部子组件也重新执行，而使用缓存后，可以避免无差别的重新执行。



------



### 06 useCallBack

* 同为使用缓存实现组件优化目的的钩子，缓存形式不同，用于缓存函数。
* 可实现对组件整体优化缓存的方式。



* 2024/08/09 16:46:38

------



## 04 React + TypeScript 综合案例

* TodoList







------





