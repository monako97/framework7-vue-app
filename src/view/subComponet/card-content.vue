<template>
    <f7-page>
        <h1>card</h1>
    </f7-page>
</template>
<script>
import { f7Page } from "framework7-vue";
export default {
    components:{ f7Page },
    data(){
        return {
            data: ''
        }
    },
    mounted(){
        let self = this;
        this.$f7ready((f7) => {
            console.log('self.$f7router')
            console.log(self.$f7router)
        })
    }
}
</script>
