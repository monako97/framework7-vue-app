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
      <f7-card
       expandable 
       expandable-animate-width
       v-for="card in Cardinfo" 
       :key="card.id"
       :cardid="card.id">
        <f7-card-content :padding="false">
          <div :style="{height: card.bgheig, background: 'url('+ card.cardImg +') no-repeat '+card.position, 'background-size':'cover'}">
            <f7-card-header :text-color="card.textColor" class="display-block">
              <f7-block-title
               :style="{color:card.typeColor,height:card.bgheig=='240px'?'230px':'0'}">
               {{ card.type }}
              </f7-block-title>
              {{ card.title }}
              <br />
              <small :style="{color:card.subtitleColor}">{{ card.subtitle }}</small>
            </f7-card-header>
            <f7-link card-close :color="card.closeLinkColor"  class="card-opened-fade-in" icon-f7="close_round_fill"></f7-link>
          </div>
          <div class="card-content-padding" :style="{ marginTop: card.bgheig=='240px'?'30px':'0' }">
            <f7-preloader :color="card.closeColor" v-if="load"></f7-preloader>
            <!-- <f7-block v-html="CardDetails"></f7-block> -->
            <f7-block :class="'CardDetails'+card.id"></f7-block>
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

  import { f7Navbar, f7NavRight, f7View, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader } from 'framework7-vue';
  export default {
    data () {
      return {
        Cardinfo: '',
        CardDetails: '',
        closebtn: false,
        load: false
      }
    },
    components: {
      f7Navbar, f7NavRight, f7View, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader
    },
    mounted(){
      let self = this;
      this.$f7ready((f7) => {
        f7.request.promise.post('http://localhost:1338/Today').then( data => {
          self.Cardinfo = JSON.parse(data);
        });
        f7.on('cardBeforeOpen', function (card,prevent) {
          let cunkcid = self.$$(card).attr('cardid');
          self.$$('.fab[class*="-bottom"]').css("bottom",'-60px');
          f7.toolbar.hide('.toolbar',true); // 隐藏工具栏
          self.load = true;
          f7.request.promise.post('http://localhost:1338/TodayDetails',{ id: cunkcid }).then( data => {
            // self.CardDetails = JSON.parse(data).details.content;
            self.$$('.CardDetails'+cunkcid).html(JSON.parse(data).details.content)
            self.closebtn = true;
            self.load = false;
          });
        });
        f7.on('cardClosed', function (card,prevent) {
          f7.toolbar.show('.toolbar',true);
          self.$$('.fab[class*="-bottom"]').css("bottom",'15px');
          self.CardDetails = '';
          self.closebtn = false;
          self.load = false;
        });
      });
    }
  };
</script>
<style lang="scss" scoped>

.navbar-inner{
  .right{
    margin-top: 0.5rem;
    transition: all .5s;
  }
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
        margin: 60px auto;
      }
    }
  }
  .card-opened-fade-in{
      position: absolute;
      right: 15px;
      top: 15px;
    }
  .card-header{
    width: 90%;
    height: inherit;
    // line-height: 50px;
    
    .block-title{
      line-height: inherit;
      font-size: .9rem;
      margin: 15px 0 0;
    }
    small{
      font-size: .9rem;
      position: absolute;
      bottom: 30px;
      opacity: 0.7;
    }
  }
}

</style>

