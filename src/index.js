// 初始化 启用 Framete7 Vue 插件:
Vue.use(Framework7Vue);
// 初始化 Vue 应用
new Vue({
    // 应用根元素
    el: '#app',
    // 初始化 Framework7. 所有 Framework7 参数都应在 "framework7" 属性中传递:
    framework7: {
        // 应用根元素, 应与组件根 "el" 相同
        root: '#app',
        // 路由
        routes: [],
        // 其他参数
        animateNavBackIcon: true,
        swipePanel: 'left'
    },
    data: {
    },
    methods: {
    }
})