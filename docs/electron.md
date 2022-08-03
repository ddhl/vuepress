# 从零开始创建一个 electron 项目

## create-react-app 创建 react 项目

现在公司前端开发主要使用的都是 react，利用 create-react-app 先创建一个 react 开发环境。

```JavaScript

# 安装 create-react-app 命令,如果已将安装请忽略
npm install -g create-react-app
# 创建 react 项目
create-react-app reactInit
# 启动项目
cd reactInit && npm start

```

于是，浏览器 http://localhost:3000/ 就会出现着如下图界面，一个 react 项目创建成功：

![test](/react.jpg)

将 electron 包添加到项目中

```JavaScript

npm install --save electron

```

## 创建 electron 入口文件 main.js

```Javascript

// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require('electron')
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow
function createWindow() {
//创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // 是否集成 Nodejs
            preload: path.resolve(__dirname, './preload.js'),//preload.js 文件路径
            contextIsolation: false,
        },
    })

    // 加载应用----适用于 react 项目
    mainWindow.loadURL('http://localhost:3001/');

    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools()
    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow()
    }
})

```

其中 preload.js 里面的代码如下，这块后面渲染进程与主进程通信时才能正确引入

```Javascript
window.ipcRenderer = require('electron').ipcRenderer;
```

安装完成后，配置一下 package.json 文件，先启动 web 项目，再启动 electron

其中 main.js 为 electron 的入口文件

```Javascript
"main":"main.js",
"scripts": {
    "start": "concurrently \"npm run start:web\" \"npm run start:electron\" ",
    "start:web": "react-scripts start",
    "start:electron": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

```

## 启动项目

命令行输入

```JavaScript

npm run start:web

npm run start:electron

```

启动完成后，如下，现在我们就有了 electron 跟 react 的开发环境了

![test](/electron.jpg)

## 添加 electron 热更新

现在有个问题，就是修改完 main.js 文件后，每次都要重新启动项目，现在我们在启动 electron 的时间，添加一下 gulp-watch 来监控 main.js 文件的变化，实现热更新

### 安装 gulp-watch 依赖

```JavaScript

npm install gulp

npm install gulp-watch

```

### 修改 package.json 文件启动命令

```Javascript
"main":"main.js",
"scripts": {
    "start:electron": "gulp watch:electron",
  },

```

### 增加 gulpfile.js 文件

在根目录新建一个 gulpfile.js 文件，用来执行监控更新代码，文件中加入以下代码

```Javascript
const gulp = require('gulp');
const watch = require('gulp-watch')
const electron = require('electron');
const path = require('path')
const { spawn } = require('child_process')
let electronProcess = null;
let manualRestart = false;
let electronUrl = "./main.js"

gulp.task('watch:electron', function () {
    startElectron();
    watch([electronUrl, "./electron/**/*"], function (data) {
        if (electronProcess && electronProcess.kill) {
            manualRestart = true
            process.kill(electronProcess.pid)
            electronProcess = null
            startElectron()

            setTimeout(() => {
                manualRestart = false
            }, 5000)
        }
    });
});
//chrome://inspect
//--inspect-brk
function startElectron() {
    var args = [
        '-inspect-brk=5858',
        path.join(__dirname, electronUrl),
        "development"
    ]

    electronProcess = spawn(electron, args)

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}
```

## 启动 electron 项目（热更新）

命令行输入

```JavaScript

npm run start:electron

```

接下来我们随便修改一下 main.js 代码，项目就自动重新启动了。

## main 主进程与渲染进程通信

主进程相当于一个 nodejs 的服务进程，我们可以在这块添加 web 页面没有的功能，比如执行 exe 文件，或者保存一些持久化数据。

渲染进程就是我们打开的窗口，前端页面内容。如果我们打开了多个窗口，也可以通过向主进程发送消息来时间渲染进程间的通信。

### 创建 electron 文件夹

我们在根目录创建一个 electron 文件夹，里面放一些进程通信代码。

创建 ipcAction.js 文件, 写入如下代码，并在 main.js 中引入代码

```JavaScript
const { ipcMain } = require("electron");
const { createWindow } = require('./creatWin')
ipcMain.on("creatNewWin", (event, title) => { //渲染进程发送消息到主进程
    createWindow(title);
});

ipcMain.on("getMessageAndReturnSync", (event, data) => { //渲染进程发送消息到主进程, 主进程同步返回消息
    event.returnValue = `${data} recived`
});


ipcMain.on("getMessageAndReturn", (event, data) => { //渲染进程发送消息到主进程, 主进程异步返回消息
    event.reply('sendToWindow1', `${data} recived`)
});


```

### 渲染进程代码

在 App.js 中写入如下代码

```JavaScript
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window;
function App() {
    const [title, setTitle] = useState('Electron');
    useEffect(() => {
        ipcRenderer.on('sendToWindow1', setTitle)
        return () => {
            ipcRenderer.removeListener('sendToWindow1', setTitle)
        }
    }, [])
    const onClick = () => {
        const title_ = ipcRenderer.sendSync('getMessageAndReturnSync', '同步')
        setTitle(title_)
    }
    const onClick2 = () => {
        const title_ = ipcRenderer.sendSync('getMessageAndReturnSync', '异步')
        setTitle(title_)
    }
    const onClick3 = () => {
        ipcRenderer.send('creatNewWin', 'Second')
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>{title}</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={onClick}>点击，同步设置标题</button>
                <button onClick={onClick2}>点击，异步设置标题</button>
                <button onClick={onClick3}>创建新窗口</button>
            </header>
        </div>
    );
}

export default App;

```

显示结果如下

![test](/electron1.jpg)


