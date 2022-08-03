const path = require('path')
module.exports = {
    title: '丁东辉',
    description: '欢迎光临',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/cat.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            { text: 'javaScript', link: '/java/' },
            { text: 'react', link: '/react/' },
            { text: 'vue', link: '/vue/' },
            { text: 'electron', link: '/electron/' }
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
};