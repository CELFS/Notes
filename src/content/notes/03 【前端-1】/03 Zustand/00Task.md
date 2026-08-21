## 00 Task Zustand

Date：2024/08/24 20:05:26

------



[TOC]



------



### 00 进度

* 课程资源
  * [React Zustand 状态管理库教程](https://www.bilibili.com/video/BV1Tr4y1Z7h7/?spm_id_from=333.337.top_right_bar_window_custom_collection.content.click&vd_source=1e9ce768698d539dc8e4dbecfe72afaa) 





------



### 01 基本用法







------



### 02 状态管理模式

留意到，store 目录下的次级目录或者内部子目录，使用 slices、utils、selectors 等作为名称；而内部文件有 index、initialState、selectors、helpers、store、reducer、utils、actions等等，但我不知道它们的含义和内容分配。

这些目录和文件名反映了一种常见的状态管理模式，特别是在使用 Redux 或类似库（如 Zustand）时。让我为您解释这些命名约定的含义和通常包含的内容：

1. 目录结构：

   - `slices/`: 包含状态的不同"切片"，每个切片通常对应应用的一个主要功能区域。
   - `utils/`: 包含通用的工具函数，可能被多个切片或组件使用。
   - `selectors/`: 包含用于从状态中提取特定数据的函数。

2. 文件命名：

   a. `index.ts`: 
      - 通常作为模块的主入口点。
      - 可能导出该目录下的所有公共接口。

   b. `initialState.ts`:
      - 定义状态的初始值。
      - 包含状态的默认结构和值。

   c. `selectors.ts`:
      - 包含选择器函数。
      - 这些函数用于从状态中提取特定的数据片段。

   d. `helpers.ts`:
      - 包含辅助函数。
      - 这些函数通常用于处理特定领域的逻辑，但不直接修改状态。

   e. `store.ts`:
      - 定义和创建主要的状态存储。
      - 在 Zustand 中，这通常是创建 store 的地方。

   f. `reducer.ts`:
      - 包含 reducer 函数（主要用于 Redux）。
      - 定义如何根据不同的 actions 更新状态。

   g. `utils.ts`:
      - 包含通用的工具函数。
      - 这些函数可能被该模块的多个部分使用。

   h. `actions.ts`:
      - 定义可以被分发以更新状态的 actions。
      - 在 Zustand 中，这可能包含更新状态的函数。

3. 内容分配：

   - `slices/`: 每个切片可能包含自己的 `actions.ts`, `reducer.ts`, 和 `selectors.ts`。
   - `initialState.ts`: 定义整个 store 或特定切片的初始状态。
   - `selectors.ts`: 包含用于从状态中提取数据的函数。
   - `store.ts`: 创建和配置主 store，可能组合多个切片。
   - `actions.ts`: 定义可以被触发以更新状态的函数。
   - `utils.ts` 和 `helpers.ts`: 包含辅助函数，但不直接与状态管理相关。

4. 示例结构：

```bash
store/
├── index.ts
├── store.ts
├── initialState.ts
├── selectors.ts
├── utils.ts
├── slices/
│   ├── user/
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   └── selectors.ts
│   └── chat/
│       ├── actions.ts
│       ├── reducer.ts
│       └── selectors.ts
└── utils/
    ├── apiHelpers.ts
    └── formatters.ts
```

这种结构提供了良好的组织和模块化，使得大型应用的状态管理更加清晰和可维护。它允许开发者轻松地找到和修改特定功能的相关代码，同时保持了整体结构的一致性。

根据项目的具体需求和使用的状态管理库（如 Redux、Zustand 等），这些文件的具体内容和作用可能会有所不同。但总体来说，这种结构旨在提供一个清晰、可扩展的状态管理架构。



------



### 03 自定义 Hook 与 SWR

* 回顾总结：
  * Store 中定义的，只是一个返回钩子类型的函数，而实际  Hook 会在组件渲染时被调用，因此，定义逻辑与实际调用分离，并不违反 Hook 的设置原则。

好像并不能直接在 store 中使用 useSWR 钩子？但为什么 action 又可以？

这里确实存在一些特殊情况，让我来解释一下：

1. 在 Store 中直接使用 Hooks 的限制：
   
- React Hooks（包括 `useSWR`）通常不能直接在 store 定义中使用，因为 Hooks 只能在 React 函数组件或自定义 Hooks 中使用。
  
2. 为什么 action 中看起来可以使用 `useSWR`：
   - 实际上，这里的 `useFetchTopics` 和 `useSearchTopics` 并不是直接使用 `useSWR`，而是返回一个函数，这个函数在被调用时才会使用 `useSWR`。
   - 这些函数实际上是自定义 Hooks，它们被定义在 store 中，但只有在 React 组件中调用时才会真正执行 `useSWR`。

3. `useClientDataSWR` 的特殊性：
   - 这可能是一个自定义的 Hook，它可能在内部处理了一些逻辑，使其可以在非 React 环境中使用。
   - 它可能是对 `useSWR` 的一个包装，添加了一些额外的逻辑或错误处理。

4. Store 中的 "use" 函数：
   - 在 store 中定义的以 "use" 开头的函数（如 `useFetchTopics`）通常是为了在组件中使用而设计的。
   - 这些函数返回了 `SWRResponse`，意味着它们是设计用来在 React 组件中调用的。

5. 实际使用方式：
   - 这些函数会在 React 组件中被调用，例如：

     ```typescript
     const MyComponent = () => {
       const { useFetchTopics } = useStore();
       const { data, error } = useFetchTopics(sessionId);
       // ...
     }
     ```

6. 状态更新的处理：
   
   - 注意 `onSuccess` 回调中的 `set` 调用，这是在数据成功获取后更新 Zustand store 的方式。

总结：
- **这种模式允许在 store 中定义数据获取逻辑，但实际的 Hook 调用发生在 React 组件中**。（数据获取逻辑与实际调用分离）
- 这种方法结合了 Zustand 的状态管理和 SWR 的数据获取能力，提供了一种灵活的方式来管理异步数据和本地状态。
- 虽然看起来像是在 store 中直接使用了 Hooks，但实际上是创建了可以在组件中使用的自定义 Hooks。

这种模式可能看起来有点复杂，但它提供了一种强大的方式来组织数据获取逻辑和状态管理，特别是在大型应用中。（一种上限很高的开发模式）



------



### 04 功能实现逻辑

结合 chat 目录，梳理一条合适的路径，我要开发 knowledge 相关的状态；另外，留意到，内部文件大多是先引入了 const、config、type 等目录，可否理解为，需要先做 type 的设计？

在开发 knowledge 相关的状态时，我们可以遵循以下路径，并且确实应该先进行类型设计。以下是一个建议的开发路径：

1. 类型设计 (在 `src/types/knowledge.ts` 中):
   首先定义 knowledge 相关的类型，例如：

```typescript
export interface KnowledgeItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  parentId?: string;
}

export interface KnowledgeState {
  items: KnowledgeItem[];
  isLoading: boolean;
  error: string | null;
}
```

2. 常量定义 (在 `src/const/knowledge.ts` 中):
   定义一些常量，如：

```typescript
export const KNOWLEDGE_ITEM_TYPES = {
  FILE: 'file',
  FOLDER: 'folder',
};
```

3. 创建 knowledge store (在 `src/store/knowledge/store.ts` 中):
   参考其他 store 的结构，例如：


```1:25:src/store/knowledge/store.ts
// sort-imports-ignore
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../middleware/createDevtools';
import { ChatStoreState, initialState } from './initialState';
import { ChatBuiltinToolAction, chatToolSlice } from './slices/builtinTool/action';
import { ChatPortalAction, chatPortalSlice } from './slices/portal/action';
import { ChatEnhanceAction, chatEnhance } from './slices/enchance/action';
import { ChatMessageAction, chatMessage } from './slices/message/action';
import { ChatPluginAction, chatPlugin } from './slices/plugin/action';
import { ShareAction, chatShare } from './slices/share/action';
import { ChatTopicAction, chatTopic } from './slices/topic/action';

export interface ChatStoreAction
  extends ChatMessageAction,
    ChatTopicAction,
    ShareAction,
    ChatEnhanceAction,
    ChatPluginAction,
    ChatBuiltinToolAction,
    ChatPortalAction {}

```


4. 创建 actions (在 `src/store/knowledge/slices/action.ts` 中):
   定义操作 knowledge 状态的动作，例如：

```typescript
import { StateCreator } from 'zustand/vanilla';
import { KnowledgeState, KnowledgeItem } from '@/types/knowledge';

export interface KnowledgeAction {
  addItem: (item: KnowledgeItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<KnowledgeItem>) => void;
}

export const createKnowledgeSlice: StateCreator<
  KnowledgeState & KnowledgeAction,
  [],
  [],
  KnowledgeAction
> = (set) => ({
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),
});
```

5. 创建 selectors (在 `src/store/knowledge/slices/selectors.ts` 中):
   定义用于选择 knowledge 状态的选择器，例如：

```typescript
import { KnowledgeState } from '@/types/knowledge';

export const knowledgeSelectors = {
  getAllItems: (state: KnowledgeState) => state.items,
  getItemById: (id: string) => (state: KnowledgeState) =>
    state.items.find((item) => item.id === id),
  getFolders: (state: KnowledgeState) => state.items.filter((item) => item.type === 'folder'),
  getFiles: (state: KnowledgeState) => state.items.filter((item) => item.type === 'file'),
};
```

6. 更新主 store 文件 (在 `src/store/knowledge/store.ts` 中):
   整合所有部分，例如：

```typescript
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../middleware/createDevtools';
import { KnowledgeState, initialState } from './initialState';
import { KnowledgeAction, createKnowledgeSlice } from './slices/action';

export type KnowledgeStore = KnowledgeState & KnowledgeAction;

const createStore: StateCreator<KnowledgeStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createKnowledgeSlice(...parameters),
});

const devtools = createDevtools('knowledge');

export const useKnowledgeStore = createWithEqualityFn<KnowledgeStore>()(
  devtools(createStore),
  shallow
);
```

7. 导出 selectors (在 `src/store/knowledge/index.ts` 中):

```typescript
export { useKnowledgeStore } from './store';
export { knowledgeSelectors } from './slices/selectors';
```

这个路径遵循了您观察到的模式，先定义类型和常量，然后创建 store、actions 和 selectors。这种方法可以确保类型安全，并使代码结构清晰、易于维护。



------

























