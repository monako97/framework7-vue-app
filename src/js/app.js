// 导入 Vue
import Vue from 'vue';
// 导入 Framework7 库
import Framework7 from 'framework7/framework7.esm.bundle';
// 导入 Framework7 Vue 插件 默认情况下，它只导出Framework7-Vue插件而不包含任何组件。要单独导入组件，我们需要使用命名导入：
import Framework7Vue from 'framework7-vue';
// 导入 App 组件
import App from '../view/app.vue';
// 初始化/使用模块
Framework7.use(Framework7Vue);
import "framework7/css/framework7.bundle.min.css";
// 安装字体图标
import "framework7-icons";
// 初始化 app 组件
export default new Vue({
  el: '#app',
  render: c => c(App),
});