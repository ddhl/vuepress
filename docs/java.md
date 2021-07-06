# 前端面试基础

- hook useRef()的用法
- 什么是 webpack
- 几个常见的 loader
- webpack 的基本功能
- 前端缓存
- 事件循环
- this 指针
- JavaScript 中 call,apply,bind 方法的总结
- ES6 的新特性
- ES6 Class 基本语法
- HTTP 请求流程
- 闭包
- JS 防抖(debounce) 与 节流(throttle)

> 前端面试问题总结

---

## hook useRef()的用法

相信有过 React 使用经验的人对 ref 都会熟悉，它可以用来获取组件实例对象或者是 DOM 对象。

而 useRef 这个 hooks 函数，除了传统的用法之外，它还可以“跨渲染周期”保存数据。

在一个组件中有什么东西可以跨渲染周期，也就是在组件被多次渲染之后依旧不变的属性？第一个想到的应该是 state。没错，一个组件的 state 可以在多次渲染之后依旧不变。但是，state 的问题在于一旦修改了它就会造成组件的重新渲染。

那么这个时候就可以使用 useRef 来跨越渲染周期存储数据，而且对它修改也不会引起组件渲染。

## 什么是 webpack

webpack 是一个打包模块化 javascript 的工具，在 webpack 里一切文件皆模块，通过 loader 转换文件，通过 plugin 注入钩子，最后输出由多个模块组合成的文件，webpack 专注构建模块化项目。
WebPack 可以看做是模块打包机：它做的事情是，分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其打包为合适的格式以供浏览器使用。

### webpack 的基本功能

1. 代码转换
1. 文件优化
1. 代码分割
1. 模块合并
1. 自动刷新
1. 自动发布

### 几个常见的 loader

1. file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
1. furl-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
1. fsource-map-loader：加载额外的 Source Map 文件，以方便断点调试
1. fimage-loader：加载并且压缩图片文件
1. fbabel-loader：把 ES6 转换成 ES5
1. fcss-loader：加载 CSS，支持模块化、压缩、文件导入等特性
1. fstyle-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
1. feslint-loader：通过 ESLint 检查 JavaScript 代码

## 前端缓存

### cookie

大小 4KB；数据保存在客户端，同源共享。即使不需要也要在 http 请求中携带，在浏览器和服务器之间传递。
有有效期的说法：一般由服务器生成，可设置失效时间。如果在浏览器端生成 Cookie，默认是关闭浏览器后失效。
如果浏览器使用的是 cookie，那么所有的数据都保存在浏览器端。使用 cookie 被攻击的可能性比较大。

### localstorage

大小 5M；被同源策略限制，仅在客户端中保存，不参与服务端的通信。存储的数据是永久性的，除非用户人为删除否则会一直存在。
在同一个浏览器内，同源文档之间共享 localStorage 数据，可以互相读取、覆盖。

### sessionstorage

大小 5M；被同源策略限制，仅在客户端中保存，不参与服务端的通信。一旦窗口或者标签页被关闭，
那么所有通过 sessionStorage 存储的数据也会被删除。只有同一浏览器、同一窗口的同源文档才能共享数据。
保存为 key 和 value 的键值对，其中 value 一定要是字符串的数据类型

## 事件循环

JavaScript 是单线程语言，判断同步还是异步，先执行同步，同步任务放在主线程主线程，异步任务进入任务队列，区分微任务和宏任务（settimeout），先执行微任务（promise）

## this 指针

this 指的是函数运行时所在的环境， this 一般情况下，都是指向函数的拥有者，在函数自执行里，this 指向的是 window 对象。
构造函数版 this， new 一个构造函数的时候的时候，this 指向被改变了。

## JavaScript 中 call,apply,bind 方法的总结

一般用来指定 this 的环境。

### call

用法区别，call 第一个参数添加要把方法添加到哪个环境中（ a.call(b,item1,item2,...) ）并且调用改方法，后面可以跟多个参数。

### apply

apply 跟 call 类似，后面参数是数组。例子：a.call(b,[item1,item2,...])

### bind

bind 这是将返回一个修改了 this 的函数，不会调用。call 和 apply 都是改变上下文中的 this 并立即执行这个函数，
bind 方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加，这是它们的区别，根据自己的实际情况来选择使用。

## ES6 的新特性

### const 与 let 变量

let 与 const 的作用域为块级作用域，在作用域外会被销毁。

### 模板字面量

```JavaScript
    const cat = { name: 'tom' }
    const text = `my name is ${cat.name}` // my name is tom
```

### 对象字面量简写法

```JavaScript
    let name = 'tom'
    const cat = { name } // cat.name === 'tom'
```

### 解构

```JavaScript
    const cat = { name: 'tom' }
    const { name } = cat // name = 'tom'
```

### 向对象添加属性

```JavaScript
    const animal = { type:'animal' };
    const cat = { ...animal, name: 'tom' } // cat = { type:'animal', name: 'tom' }
```

### 合并对象

```JavaScript
    const animal = { type:'animal' };
    const name = { name: 'tom' }
    const cat = { ...animal, ...name } // cat = { type:'animal', name: 'tom' }
```

### 展开运算符

```JavaScript
    const animals = ['cat', 'dog'];
    const fish = ['fish']
    const all = [ ...animals, ...fish ] // all = ['cat', 'dog', 'fish']
```

### 箭头函数

1. 简化了代码形式，默认 return 表达式结果。

1. 自动绑定语义 this，即定义函数时的 this。

## ES6 Class 基本语法

JavaScript 语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子。

```JavaScript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。
基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
上面的代码用 ES6 的“类”改写，就是下面这样。

```JavaScript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

## JS 基本类型判断

> 基本类型：String、Number、Boolean、Symbol、Undefined、Null

> 引用类型：Object

### typeof

**注意：无法区分引用类型, 主要用于检测基本类型**

**引用类型：object。里面包含的 function、Array、Date。**

```JavaScript
typeof ""; //string
typeof 10; //number
typeof false; //boolean
typeof undefined; //undefined
typeof function(){}; //function
typeof {}; //object
typeof Symbol(); //symbol
typeof null; //object
typeof []; //object
typeof new Date(); //object
typeof new RegExp(); //object
```

### instanceof

**主要用于检测引用类型**

instanceof 用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true，否则返回 false。instanceof 检测的是原型，内部机制是通过判断对象的原型链中是否有类型的原型。

```JavaScript
{} instanceof Object; //true
[] instanceof Array;  //true
[] instanceof Object; //true
"1" instanceof String; //false
new String(1) instanceof String; //true
```

### Object.prototype.toString.call()

**检测类型准确，无论是基本类型还是引用引用类型都可检测**

```JavaScript
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
```

## HTTP 请求流程

域名解析 --> 发起 TCP 的 3 次握手 --> 建立 TCP 连接后发起 http 请求 --> 服务器响应 http 请求，浏览器得到 html 代码 --> 浏览器解析 html 代码，并请求 html 代码中的资源（如 js、css、图片等） --> 浏览器对页面进行渲染呈现给用户

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。最简单的使用例子。

```JavaScript
function person(name) {
    // 变量作用域为函数内部，外部无法访问，防止了变量名冲突和污染
    var name = '小明';
    this.sayName= function() {
        alert(name)
    }
    this.changeName= function(newName) {
        name = newName
    }
}
// 外部无法访问内部变量
let a = new person()
console.log(a.name) // undefiend
a.changeName('小白')
// 这里修改的name会保存下来
a.sayName() // 小白
```

## JS 防抖(debounce) 与 节流(throttle)

### 防抖(debounce)

对于短时间内连续触发的事件（上面的滚动事件），防抖的含义就是让某个时间期限（如上面的 1000 毫秒）内，事件处理函数只执行一次。代码例子如下：

```JavaScript
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,delay) // 简化写法
    }
}
```

### 节流(throttle)

如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。代码例子如下：

```JavaScript
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
```
