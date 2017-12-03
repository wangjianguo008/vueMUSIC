<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
/*获取数据*/
import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters([
        /*这里的singer就是getters下的singer,已经取到数据*/
        'singer'
      ])
    },
    created(){
      console.log(this.singer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"  
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>