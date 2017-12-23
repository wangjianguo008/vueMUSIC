<template>
  <transition name="slide">
    <MusicList class="singer-detail" :songs="songs" :bg-image="bgImage" :title="title"></MusicList>
  </transition>
</template>

<script>
/*获取数据*/
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from "components/music-list/music-list"
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      ...mapGetters([
        /*这里的singer就是getters下的singer,已经取到数据*/
        'singer'
      ]),
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      }
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
          return
        }
        /*getSingerDetail这里有promise,获取歌手详情的数据*/
        getSingerDetail(this.singer.id).then((res)=>{
          if(res.code===ERR_OK){
            //console.log(res.data.list)
            this.songs=this._normalizeSongs(res.data.list)
            //console.log(this.songs)
          }
        })
      },
      /*对数据的一个解析*/
      _normalizeSongs(list){
        let ret=[]
        list.forEach((item)=>{
          let {musicData}=item
          /*用musicData转化成类song  songid,albummid必须要有的*/
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components:{
      MusicList
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