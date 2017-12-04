<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
/*获取数据*/
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
  export default {
    computed:{
      ...mapGetters([
        /*这里的singer就是getters下的singer,已经取到数据*/
        'singer'
      ])
    },
    created(){
      /*这是测试...mapGetters下的singer*/
      //console.log(this.singer)
      this._getDetail()
    },
    methods:{
      _getDetail(){
        /*没有id的情况下自动回到singer*/
        if(!this.singer.id){
          this.$router.push({
            path:"/singer"
          })
        }
        /*getSingerDetail这里有promise,获取歌手详情的数据*/
        getSingerDetail(this.singer.id).then((res)=>{
          if(res.code===ERR_OK){
            console.log(res.data.list)
          }
        })
      }
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