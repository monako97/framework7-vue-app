<template>
  <f7-page color-theme="pink">
    <f7-navbar 
      no-shadow 
      no-hairline 
      title="Today" 
      title-large="Today">
      <f7-nav-right>
        <f7-link
         icon-ios="f7:person_round" 
         icon-aurora="f7:person_round" 
         icon-md="f7:person_round" color="pink">
        </f7-link>
      </f7-nav-right>
      
    </f7-navbar>
    <f7-block-title>3月23日 星期六</f7-block-title>
    <div class="expandable-cards-views">
      <f7-card expandable v-for="card in Cardinfo" :key="card.id" :cardid="card.id">
        <f7-card-content :padding="false">
          <div :style="{height: '350px', background: 'url('+ card.cardImg +') no-repeat '+card.position, 'background-size':'cover'}">
            <f7-card-header :text-color="card.textColor" class="display-block">
              <f7-block-title :style="'color:'+card.typeColor">{{ card.type }}</f7-block-title>
                {{ card.title }}
              <br />
              <small :style="{opacity: 0.7,color:card.subtitleColor}">{{ card.subtitle }}</small>
            </f7-card-header>
            <f7-link
             card-close
             :color="card.closeLinkColor" 
             class="card-opened-fade-in" 
             :style="{position: 'absolute', right: '15px', top: '15px'}" 
             icon-f7="close_round_fill">
            </f7-link>
          </div>
          <div class="card-content-padding">
            <f7-preloader :color="card.closeColor" v-if="!closebtn"></f7-preloader>
            <f7-block v-html="CardDetails"></f7-block>
            <p>
              <f7-button fill round large card-close :color="card.closeColor" v-if="closebtn">关闭</f7-button>
            </p>
          </div>
        </f7-card-content>
      </f7-card>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7NavRight, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader } from 'framework7-vue';
  export default {
    data () {
      return {
        Cardinfo: [],
        CardDetails: {},
        closebtn: false
      }
    },
    components: {
      f7Navbar, f7NavRight, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader
    },
    mounted(){
      let self = this;
      this.$f7ready((f7) => {
        f7.request.promise.post('http://localhost:1338/Today').then( data => {
          self.Cardinfo = JSON.parse(data);
        });
        f7.on('cardBeforeOpen', function (card,prevent) {
          self.$$('.fab[class*="-bottom"]').css("bottom",'-60px');
          f7.toolbar.hide('.toolbar',true); // 隐藏工具栏
          f7.request.promise.post('http://localhost:1338/TodayDetails',{ id: self.$$(card).attr('cardid') }).then( data => {
            self.CardDetails = JSON.parse(data).details.content;
            self.closebtn = true;
          });
        });
        f7.on('cardClose', function (card,prevent) {
          f7.toolbar.show('.toolbar',true);
          self.$$('.fab[class*="-bottom"]').css("bottom",'15px');
          self.closebtn = false;
        });
      });
    }
  };
</script>
<style lang="scss" scoped>

.navbar-inner{
  filter: blur(50px);
  .block-title{
    position: absolute;
    left: 0;
    margin: .9rem 1rem 0;
    font-size: .9rem;
    z-index: 6;
  }
  .right{
    margin-top: 0.5rem;
    transition: all .5s;
  }
     
}
.title-large{
    margin-top: -2px;
  } 
.navbar-inner-large-collapsed{
  .right{
    margin-top: 0;
    transition: all .4s;
  }
  .block-title{
    display: none;
    transition: all .5s;
  }
} 
.card-expandable{
  .card-content{
    .card-content-padding{
      .preloader{
        display: block;
        margin: 0 auto;
      }
    }
  }
  height: 330px;
  box-shadow: 0 0 50px 0px rgba(0,0,0,0.1);
  .card-header{
    width: 80%;
    height: inherit;
    .block-title{
      line-height: inherit;
      font-size: .9rem;
      margin: 0;
    }
    small{
      font-size: .9rem;
      position: absolute;
      bottom: 30px;
      color: #6d6d72;
    }
  }
}

</style>

