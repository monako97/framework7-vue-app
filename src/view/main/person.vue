<template>
  <f7-page>
    <f7-navbar no-shadow no-hairline title="Photo Browser" subtitle="3月23日 星期六" title-large="Photo Browser"></f7-navbar>
    <f7-photo-browser :photos="photos" ref="standalone"></f7-photo-browser>

    <img src="https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190324003055.jpg" @click="$refs.standalone.open()" />
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7PhotoBrowser, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7PhotoBrowser,
      f7Button,
    },
    data() {
      return {
        photos: [
          {
            url: 'https://raw.githubusercontent.com/merry1997/GraphicBed/master/20190324003055.jpg',
            caption: 'Amazing beach in Goa, India',
          },
          {
            url: 'http://placekitten.com/1024/1024',
            caption: 'I met this monkey in Chinese placekitten',
          },
        ],
      };
    },
  };
</script>
<style lang="scss" scoped>
.page-content{
    text-align: center;
    img{
        width: 80%;
        display: block;
        margin: 0 auto;
    }
}
</style>
