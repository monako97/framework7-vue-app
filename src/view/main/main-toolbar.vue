<template>
  <f7-page :page-content="false">

    <div class="fab-morph-target">
      <f7-block-title class="fab-close">Choose Something</f7-block-title>
    </div>
    <f7-fab position="center-bottom" morph-to=".fab-morph-target" color="pink" class="morph">
      <f7-icon ios="f7:tune" aurora="f7:tune" md="material:tune"></f7-icon>
    </f7-fab>
    <f7-toolbar tabbar labels bottom no-hairline no-shadow>
      <f7-link  v-for="(toolbar,i) in toolbar" 
       :key="toolbar.name"
       :tab-link="toolbar.name==''?'':'#'+toolbar.name"
       :tab-link-active="i?false:true">
          <f7-icon :ios="toolbar.icon" :aurora="toolbar.icon" :md="toolbar.icon">
            <f7-badge color="pink" v-if="toolbar.page===''?false:true">{{ toolbar.page }}</f7-badge>
          </f7-icon>
          <span class="tabbar-label">{{ toolbar.text }}</span>
      </f7-link>
   </f7-toolbar>
   <f7-tabs>
      <f7-tab class="page-content" id="home" tab-active>
        <f7-view url="/home" links-view=".view-main"></f7-view>
      </f7-tab>
      <f7-tab class="page-content" id="chat">
        <f7-view url="/chat"></f7-view>
      </f7-tab>
      <f7-tab class="page-content" id="tune">
        <f7-view url="/tune"></f7-view>
      </f7-tab>
      <f7-tab class="page-content" id="person">
        <f7-view url="/person"></f7-view>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>
  import { f7View ,f7Navbar, f7Page, f7Badge, f7Block, f7Link, f7Toolbar, f7Tab, f7Tabs, f7Fab, f7Icon, f7BlockTitle, f7Views } from 'framework7-vue';
  export default {
    data () {
      return {
        toolbar:[
          { path: '/home', name: "home", icon: "f7:home", text: "Today", page: "1" },
          { path: '/chat', name: "chat", icon: "f7:chat_bubble", text: "Chat", page: "2" },
          { path: '', name: "", icon: "", text: "", page: "" },
          { path: '/tune', name: "tune", icon: "f7:tune", text: "Tune", page: "3" },
          { path: '/person', name: "person", icon: "f7:person_round", text: "Person", page: "4" },
        ]
      }
    },
    components: { f7View ,f7Navbar, f7Page, f7Badge, f7Block, f7Link, f7Toolbar, f7Fab, f7Tab, f7Tabs, f7Icon, f7BlockTitle, f7Views },
    mounted() {
      let self = this;
      // Framework7完全初始化时将执行的回调函数
      this.$f7ready((f7) => {
        self.$$('.morph').touchstart(function(){
          self.$$('.tabs').eq(0).addClass('blur');
          self.$$('.toolbar').eq(0).addClass('blur');
        });
        self.$$('.fab-close').touchstart(function(){
          self.$$('.tabs').eq(0).removeClass('blur');
          self.$$('.toolbar').eq(0).removeClass('blur');
        });
      });
    }
  };
</script>
<style lang="scss" scoped>
.tabs .page-content{
  padding-bottom: 0;
}
.toolbar{
  background-color: rgba(255, 255, 255, 0.9);
}
.toolbar,.tabs {
  transition: transform 0.3s,filter 0.3s;
  -moz-transition: transform 0.3s,filter 0.3s;
  -webkit-transition: transform 0.3s,filter 0.3s;
  -o-transition: transform 0.3s,filter 0.3s;
}
.toolbar-bottom~.fab[class*="-bottom"]{
  margin-bottom: 0;
  z-index: 6000;
  position: fixed;
  transition: bottom .5s;
}
.fab-opened{
  background-color: transparent;
  box-shadow: none;
}
.blur{
  filter: blur(40px);
  -webkit-filter: blur(40px);
  -moz-filter: blur(40px);
  -o-filter: blur(40px);
  -ms-filter: blur(40px);
}
.fab-morph-target{
  padding: 80px 40px 0;
  height: inherit;
  width: calc(100% - 80px);
  position: absolute;
  z-index: 2;
}
</style>
