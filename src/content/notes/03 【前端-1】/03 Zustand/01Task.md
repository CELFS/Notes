## 01 Task Zustand Guide

Date：2024/09/19 15:14:02

------



[TOC]



------





## 01 基本用法

* 定义 Store
  * `useXxxx` 即为约定的 hook 名称；
  * **自动合并第一层状态（变量）**，而**内层状态**需使用 `...state` 赋值，其余可具体罗列以示覆盖更新；

```typescript
// bearStore.ts
import { create } from "zustand";

type TBearStoreState = {
  bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>()((set) => ({
    bear: 0,
    increasePopulation: () => 
    	set((state) => ({
            bears: state.bears + 1,
        })),
    removeAllBears: () => set({ bears: 0 }),
}));
```

* 导入 Store
  * `(state => state.propName)` 从回调返回的全状态 state 中，返回指定的变量，并赋值；
  * `{p1, p2, p3, fn1} = useXxxxStore` 使用全状态，可能导致不必要的重渲染，即具有一些不同的语法特性，因此，仅仅为了偷懒写法不可取；

* async
  * 可直接定义 Promise 类型，使用 fetch 拉取数据；

![image-20240919131508532](http://img.celfs.site/typora/2025/11/22/1763818381452-image-20240919131508532.png)



------



## 02 set、get 与 immer 中间件

* create --> `set`：
  * 用于更新 state；
  * state 需当作 immutable 处理（不可变对象）；
* `...state`：
  * 解包、调用；
  * `cats: {...state.cats, bigCats: state.cats.bigCats + 1}` 解包 cats 并赋值给 bigCats；
* 快捷键
  * smart selection `Ctrl + Shift + → → ` 用于全选所需语句块（尝试了，无效）

* single state selector
  * 可以获取单个属性（应该就是这样而划分了 `selector.tsx` 文件）
  * ~~但这样写会不会太繁琐了？是否有批量获取的语法？实际开发中也使用过解构语法，但是这个视频教程提到，两种写法会有语法逻辑上的差异（待进一步确定）。~~（简写仅适用于使用全部 store 的情况，否则会导致不必要的重渲染）

![image-20241001234016623](http://img.celfs.site/typora/2025/11/22/1763818380099-image-20241001234016623.png)

* Immer Middleware
  * 可简化状态表示，例如解包 `...` 的繁琐写法，中间件可将状态当作可变对象处理，从而不必再次 `...` 解包并且赋值，而可以直接更新状态。
  * 需安装 `immer`，使用时，将 `immer` 函数套在状态变量与状态函数整体的最外层，将 set 内部改为花括号，继而内部可省略解包与额外赋值操作，并且可省略显示的 return 操作返回。

![image-20241001235240383](http://img.celfs.site/typora/2025/11/22/1763818379244-image-20241001235240383.png)

* get
  * 用于获取 state 的状态，通常用于需要在 set 外部获取状态的场景，例如下图计算两个状态两的总和。

![image-20241001235512872](http://img.celfs.site/typora/2025/11/22/1763818378807-image-20241001235512872.png)

* 状态获取的简写
  * 注意，这种写法**只适用于你需要使用全部 store 的情况**；如果你只需要使用一部分的状态，那么这种写法会**导致不必要的重渲染**。

![image-20241001235701586](http://img.celfs.site/typora/2025/11/22/1763818378237-image-20241001235701586.png)



------



## 03 selector 与自动 selector

* selector
  * 使用选择器进行状态的调用，可以避免不必要的重渲染。

* [Auto Generating Selectors](https://zustand.docs.pmnd.rs/guides/auto-generating-selectors#create-the-following-function:-createselectors) 
  * 创建一个 `util/createSelectores.ts`，导入官方给定的代码；
  * 在状态 Store 中，套一层 `createSelectores` 方法；
  * 在组件中，使用 `xx.use.xxx` 调用所需的状态。
  * 注意，该 auto 方法仅能用于返回第一层的 state，内层未定义（看来作用不算大，另外，模板项目也没有使用这个方法，那么该项目是如何避免重渲染的呢？不过，使用 `use` 进行单点调用也是一种办法，只是侧重于体力活，那么，自然地，就需要批量选择状态的语法了）。

```typescript
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
```

![image-20241002001645742](http://img.celfs.site/typora/2025/11/22/1763818378157-image-20241002001645742.png)



------



## 04 选择多个状态、shallow

* functional state（action）
  * 通常不会改变值（终于看到 action 的含义了）。
* shallow
  * 该属性会判断生成的对象是否值相同，若相同，则不会触发重渲染，因此，这是一个对性能优化很重要的属性。
  * 以下是批量导入状态的写法，本质还是单个导入，但将 selector 写在一起了。
  * 注意，shallow 只比较第一层的值，若需要复杂的情况，可自定义比较函数。
* 返回一个对象

![image-20241002002535263](http://img.celfs.site/typora/2025/11/22/1763818378222-image-20241002002535263.png)

* 返回一个数组

![image-20241002003517961](http://img.celfs.site/typora/2025/11/22/1763818378153-image-20241002003517961.png)

* 模板项目在导入状态时，使用的是数组对齐的方式，示例如下：

![image-20241002003200324](http://img.celfs.site/typora/2025/11/22/1763818378146-image-20241002003200324.png)



* 2024/10/02 00:37:56，P02-04

------



## 05 devtools 调试工具

* Redux DevTools
  * 可在浏览器查看 State 的变化；
* devtools
  * 导入中间件，套在最外层；
  * 控制台 --> Redux

![image-20241002004829720](http://img.celfs.site/typora/2025/11/22/1763818378148-image-20241002004829720.png)

* 状态值的变化

![image-20241002005259128](http://img.celfs.site/typora/2025/11/22/1763818378145-image-20241002005259128.png)

* 使用 enabled 属性
  * false 可关闭调试工具，用于生产环境屏蔽该组件。

![image-20241002005628824](http://img.celfs.site/typora/2025/11/22/1763818378154-image-20241002005628824.png)

* 若存在中间件 immer，则 devtools 应当写在 immer 内部
  * Zustand 有解释，immer 会改变状态，而 devtools 需要监控状态的变化
    * 这里有些疑问，既然 immer 会改变状态，不应该写在调试工具的内部吗？在外层怎么被 devtool 监控？

![image-20241002010034227](http://img.celfs.site/typora/2025/11/22/1763818378218-image-20241002010034227.png)

* 多状态调试兼容
  * 方法一：自动选择 instance 状态，以匹配相应的状态内容（Autoselect instances）
  * 方法二：自定义状态名 `name: "cat store"` 属性；

![image-20241002010251606](http://img.celfs.site/typora/2025/11/22/1763818378143-image-20241002010251606.png)



* 2024/10/02 01:06:43

------



## 06 persist 保存状态

* 状态的持久化
  * 例如美颜状态，刷新后依然生效，否则用户每次都要重新设置，或者设置了切换页面就不生效了，于是，需要做好状态的持久化处理。
* persist
  * [详细文档](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) 
  * 默认保存在 Local Storage 中；
  * 可设置保存在 Session Storage 或者 Indexed DB 中；
  * 移动端可设置保存在 Async Storage 中。
* 使用 name（唯一）、storage 属性：

![image-20241004032547713](http://img.celfs.site/typora/2025/11/22/1763818378150-image-20241004032547713.png)

* Partialize 保持部分状态
  * 只保存 Partialize 处理过的状态，其余 color、size 等不保存。

![image-20241004175003634](http://img.celfs.site/typora/2025/11/22/1763818378118-image-20241004175003634.png)

* 排除状态
  * 可过滤指定的状态，如下图实现了与上面相同的效果。

![image-20241004175336180](http://img.celfs.site/typora/2025/11/22/1763818378114-image-20241004175336180.png)

* 清除 Storage
  * 注意 clear storage 并不是 reset state，因此，清除的仅仅是 storage，而非 memory。

![image-20241004180845470](http://img.celfs.site/typora/2025/11/22/1763818378115-image-20241004180845470.png)

* Reset Storage
  * 定义并设置初始值，实现重置。

![image-20241004175906824](http://img.celfs.site/typora/2025/11/22/1763818378093-image-20241004175906824.png)

* persist 中间件的调用顺序

![image-20241004181707502](http://img.celfs.site/typora/2025/11/22/1763818378089-image-20241004181707502.png)

* 疑问
  * 可考虑加入到目前一些界面状态的记录，例如“工具设置”弹窗，切换组件或刷新后，依然保留操作的状态。之前，在实现一些 checked 风格的样式时，使用了 State 来标识状态，但既然 Zustand 自带一个 persist 中间件，那么用这个比频繁地使用 State 合适。



* 2024/10/04 03:28:57 一半内容
* 2024/10/04 18:21:59

------



## 07 subscribe

* 仅指前端状态之间的订阅，而非前后端之间的订阅（WebSocket）
* reactive 状态
  * 前面由 selector 选中的状态，都属于 reactive 状态，每次状态改变，都需要重渲染。
* subscribe 状态







------



## 08 store 外控制状态











## 09 typescript 建议







------



## 00 疑问 / 经验

* Store 导入的方式不同，可能导致不必要的重渲染，可以使用 `Math.random` 进行测试，实际项目中，好像也碰到很多不必要的文件重加载，会不会是因为状态导入的方式不正确？例如 `KnowledgeList` 的每次请求触发。
  * 可以考虑添加 shallow 属性，观察是否减少了请求与渲染数量；
  * 可考虑使用 devTools，观察状态变更，看是否有重复请求；
* 可能后面还需要重构状态管理的代码，将 `action` 文件中直接获取的状态，改到 `selector` 文件中，从而避免项目复杂度提高而带来的重渲染性能问题。
* 如果简写仅适用于需要使用所有 store 的情况，那么这个语法设计出来的应用面会不会太窄了？另外，不是可以直接使用 `{ * }` 类似的通配符导入所有的状态？或者后者并非具名语法，所以才有前面的全解构命名导入？
* 为什么 debug 工具每次都是到后面才学到？如果像 Next 全栈的项目，如何进行 debug 调试？
* 在经历了项目的洗礼，甚至没有很详细地学过 Zustand，现在相当于有了经验回头补充理论知识，感悟深很多，把之前一些疑问，也有了解决的方向，也懂得了某些自己观察的用法的实际含义，后面再使用 Zustand，就能更准确了，也懂得了优化的方向。
* 其实无论是 `use` 状态选中、还是全局导入或者多状态选中的语法，都可以整理之后根据实际需要进行使用，并没有想象中那么混乱和多样，如果**对它们的区别足够了解**，就能得心应手地用在需要的地方了。这种 “对于**并列概念的足够区分度**” 的认知，可以推广到任意领域，整理 --> 辨析 --> 使用，可以形成一个正向迭代，类似学习的 “对比、反思、总结” 循环。
* 可考虑结合 JSON 格式，以**数据 + 自然语言驱动**，实现 AI 助手的编程开发范式，这样一来，只要定义好了 API 文档与数据结构，就能得到一个比较符合预期的、能够**缩短从静态资源到 API 衔接的开发周期**。
* 以后，可以直接在 Typora 当中引入文件路径，例如 [Zustand 学习 0 号文件](./00Task)，参考万维钢 [我怎样管理信息](https://www.dedao.cn/course/article?id=BM30m4na5NkyKQjwxVjvDg7Eowd2GW&source=search) 一文，非常有用。这篇文章，帮助了我梳理了前段时间笔记整理的一些疑问和想法，及时将有价值的素材以一种简洁的方式（例如链接）记录下来，等到素材积累足够、想法成熟时，编写文章的这个行为就是水到渠成的。未来，整理微信这两年记录的随笔杂谈，也可以使用类似的方式，例如搜到某文章的启发，就可以将链接和相关的素材放在一起。以“想法立项”或者”想法片段“的形式分类记录。当然，Typora 还需要一些额外的能力，或者可以 DIY 开发：
  * 需求1：更重要的是，Evernote这已经是在模拟人脑的思维！人脑发挥创造力最重要的一个手段，就是把两个不同的想法连接起来。这个连接越是意想不到，创造出来的东西就可能越有意思。想要让想法连接，你得先拥有很多很多想法才行，而现在你可以把想法寄存在一个外部工具里，让计算机帮你建立连接！
  * 需求2：自动告诉我一条笔记都被哪些笔记引用过。
  * 需求3：自动合并类似的问题，或者自动整合、整理提过的问题，从而避免重复，而专注于同一个问题的叠加式思考，起码让想法是迭代的，而不是重复的。
  * 需求4：样式格式化。
  * 需求5：文件整理，例如这里写下来的并不属于 Zustand 的内容，而只是我的一些关键思考，这些具有启发性的内容，可以服务于不久的将来，但我过于专注并希望记录下来这些关键想法，就临时找了个位置来写。（已迁移到[信息管理-文件](../../01 统一方法论/想法立项/信息管理)）
* 检查重渲染
  * 使用随机数，每次更新状态，可查看随机数是否刷新，刷新则组件进行了重渲染，否则没有。
  * 使用 `<p>{Math.random()}</p>` 类似语法，植入组件即可。
  * 可以考虑使用同样的方法，对项目已有的组件进行判断，例如创建页面的组件，又或者是 list 的组件。
  * 另外，是否可以直接从 Redux Devtools 中间件进行判断？



------



