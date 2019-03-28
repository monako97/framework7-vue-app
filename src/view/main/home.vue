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


            <!-- <p>你可能会被《QQ飞车》中那些手持光剑、背带翅膀x身披霓虹战甲的赛车手们迷惑，认为这是一个欢乐搞怪的休闲游戏。确实，你可以不在意成绩，自由自在地瞎玩一甚至可以在休闲模 式里离开赛道，和朋友一起奔向海边。然而，这个游戏的深度可能远超你的想象。</p>
              <f7-block>
                <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190324003435.jpg"/>
              </f7-block>
              <p>“WCW喷”“断位双喷” “飘移撞墙反弹” “甩尾飘移”“进阶氮气出弯”...作为一个赛车游戏，飘移只是最基本的操作，只有掌握上面这些听上去就很强的技巧，才能保证你在真人对战时不一路吃灰。</p>
              <f7-block>
                <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190323163200.jpg"/>
              </f7-block>
              <p>除了像个赛车手般孤独地冲击极限以外，你还可以使用道具模式。扔个香蕉皮让对手打滑，用炸弹拖住第一名....各种奇妙道具，让原本全由实力说话的赛道，变得充满可能性。在组队道具模式中，你可以和队友互相使用道具，在这里，策略和驾驶技巧一样关键。</p>
              <p>当然，没有一辆好车，再好的技术也无法让你成为顶尖赛车手。</p>
              <f7-block>
                <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190324003055.jpg"/>
              </f7-block>
              <p>《QQ飞车》正在举行一系列活动，iPhone 和iPad用户将享受以下独家特惠:</p>
              <p>累计登录7天，每天都会让你获得一定科技点或点券。前者可以用来升级改造你的爱车，后者可以用来直接购买更高级的赛车。</p>
              <f7-block>
                <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190323151922.jpg"/>
              </f7-block>
              <p>你可以用八八折的价格购买首发B级新车“甜蜜旋风”</p>
              <p>还有其他很多首发新车、新时装，例如B级新车“炽愿”、全火焰特效A级新车“火神”、飞花踏叶套装等等，都在准备充实你的飞驰人生。</p> -->

              

              <small :style="{color:card.subtitleColor}">{{ card.subtitle }}</small>
            </f7-card-header>
            <f7-link card-close :color="card.closeLinkColor"  class="card-opened-fade-in" icon-f7="close_round_fill"></f7-link>
          </div>
          <div class="card-content-padding" :style="{ marginTop: card.bgheig=='240px'?'30px':'0' }">
            <f7-preloader :color="card.closeColor" v-if="load"></f7-preloader>
            <f7-block :class="'CardDetails'+card.id"></f7-block>
            <!-- <f7-photo-browser :photos="photos" ref="standalone"></f7-photo-browser> -->
            <!-- <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190324003055.jpg" @click="$refs.standalone.open()" /> -->
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

  import { f7Navbar, f7NavRight, f7View, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader, f7PhotoBrowser } from 'framework7-vue';
  export default {
    data () {
      return {
        Cardinfo: '',
        closebtn: false,
        load: false,
        cunkcid: '',
      }
    },
    components: {
      f7Navbar, f7NavRight, f7View, f7Page, f7Block, f7BlockTitle, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button, f7Preloader, f7PhotoBrowser
    },
    created(){
      this.cardInit();
    },
    mounted(){
      let self = this;
      this.$f7ready((f7) => {
        // framework组件加载完毕后
        
        // 卡片监听：动画打开的时候
        f7.on('cardBeforeOpen', function (card,prevent) {
          // 当前卡片id
          this.cunkcid = self.$$(card).attr('cardid');
          // 打开卡片时，隐藏状态栏工具栏和小圆点
          self.$$('.fab[class*="-bottom"]').css("bottom",'-60px');
          f7.toolbar.hide('.toolbar',true);
          // 显示加载
          self.load = true;
          f7.request.promise.post('http://localhost:1338/TodayDetails',{ id: this.cunkcid },"json").then( data => {
            // 使用闭包 创建一个图片浏览器
            (function(data,cunkcid){
                // 展示内容
                self.$$('.CardDetails'+cunkcid).html(data.details.content);
                let PhotoBrowser = f7.photoBrowser.create({
                  photos : data.photos,
                  navbar:false, toolbar:false
                });
                // 点击图片打开照片浏览器组件 ：不要touch事件触发
                self.$$('.CardDetails'+cunkcid).find("img").on("click",()=>{
                  PhotoBrowser.open();
                });
                // 显示关闭按钮
                self.closebtn = true;
                // 关闭加载
                self.load = false;
            })(data,this.cunkcid);
          });
        });
        // 卡片监听：关闭动画结束的时候
        f7.on('cardClosed', function (card,prevent) {
          // 显示状态栏工具栏小圆点
          f7.toolbar.show('.toolbar',true);
          self.$$('.fab[class*="-bottom"]').css("bottom",'15px');
          // 关闭按钮隐藏状态
          self.closebtn = false;
          // 隐藏加载状态
          self.load = false;
        });
      });
    },
    methods:{
      cardInit(){ // 获取today数据，初始化页面
        this.$f7.request.promise.post('http://localhost:1338/Today',"json").then( data => {
          this.Cardinfo = data;
        });
      },

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

