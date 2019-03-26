<template>
  <!-- 主 Framework7 应用组件 -->
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <!-- 初始页是在 routes. js 中指定的 -->
    <f7-panel left cover>
      <f7-view url="/panel-left" links-view=".view-main"></f7-view>
    </f7-panel>
    <f7-panel right reveal>
      <f7-view url="/panel-right"></f7-view>
    </f7-panel>
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>
<script>
  import { f7App, f7Panel, f7View, f7Statusbar } from 'framework7-vue';
  import routes from '../router/router';
  export default {
    components: { f7App, f7Panel, f7View, f7Statusbar },
    data() {
      return {
        f7params: { routes,
          name: 'Nyapass',
          id: 'com.nyapass.moe',
          statusbar: {
            enabled: false,
            iosOverlaysWebView: true,
            androidOverlaysWebView: true,
            scrollTopOnClick: true,
          },
          navbar: {
            // hideOnPageScroll: true, //页面滚动隐藏导航栏
            iosCenterTitle: true, //标题置于iOS主题的中心
          },
          touch: {
            fastClicks: true,// 删除链接和表单元素300毫秒的延迟
            iosTouchRipple: true, //为iOS主题启用触摸涟漪效果
            auroraTouchRipple: true, //为Aurora主题启用触摸涟漪效果
          }
        }
      }
    },
    mounted(){
      this.$f7ready((f7) => {
        f7.statusbar.hide();
      });
    }
  }
</script>
<style lang="scss">

#framework7-root{
  list-style: none;
  .statusbar{
    transition: 400ms;
  }
  .page-content{
    background: rgb(247,247,248);
    .card-content-padding{
      .block{
        padding: 20px;
        p{
          text-indent: 2em;
        }
        img{
          width: 100%;
          border-radius: 5px;
          box-shadow: 0 0 50px 0px rgba(0,0,0,0.1);
        }
      }
    }
  }
  
}
</style>
