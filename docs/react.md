# React

## 架构

[架构](https://www.kancloud.cn/freya001/haoke/1666914)

## redux 单向数据流

![test](/lifecycle.png)

页面视图 View 触发 dispatch -> Actions 进入 State，state 先深复制再通过 reducer 修改数据，修改完成后返回一个新的数据，然后页面 View 自动更新

## JSX 的本质是什么

react 通过 babel 把 JSX 转成 createElement 函数，生成 ReactElement 对象，然后通过 ReactDOM.render 函数把 ReactElement 渲染成真是的 DOM 元素

## 什么是 Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 为什么使用 Hook

### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

### 复杂组件变得难以理解

Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

### 难以理解的 class

Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

## Hook 的优点

1. 更容易复用代码
1. 清爽的代码风格
1. 代码量更少

## 常用的 Hook 有哪些？

### useState()

状态钩子。为函数组建提供内部状态，下面看一下官网的例子。

```JavaScript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useContext()

共享钩子。该钩子的作用是，在组件之间共享状态。 可以解决 react 逐层通过 Porps 传递数据，它接受 React.createContext()的返回结果作为参数，使用 useContext 将不再需要 Provider 和 Consumer。

```JavaScript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

useContext 可以在不需要传 props 的情况下，将结果传入子组件。

### useReducer()

Action 钩子。useReducer() 提供了状态管理，其基本原理是通过用户在页面中发起 action, 从而通过 reducer 方法来改变 state, 从而实现页面和状态的通信。使用很像 redux

```JavaScript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useEffect()

副作用钩子。它接收两个参数， 第一个是进行的异步操作， 第二个是数组，用来给出 Effect 的依赖项

```JavaScript
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useRef()

获取组件的实例；渲染周期之间共享数据的存储(state 不能存储跨渲染周期的数据，因为 state 的保存会触发组件重渲染）

```JavaScript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

传入一个参数 initValue，并创建一个对象{ current: initValue }给函数组件使用，在整个生命周期中该对象保持不变。

### useCallback()

```JavaScript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个 memoized 回调函数。

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

### useMemo()

可缓存函数的引用或值，useMemo 用在计算值的缓存，注意不用滥用。经常用在下面两种场景
（要保持引用相等；对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo/useCallback）

```JavaScript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useLayoutEffect()

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。
在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。可以使用它来读取 DOM 布局并同步触发重渲染。
