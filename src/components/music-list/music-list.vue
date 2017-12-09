<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="Bgstyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" class="play" v-show="songs.length>0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <!--这是为滚动坐了一个滚动层-->
    <div class="bg-layer" ref="layer"></div>
    <!--:data="songs"为了获取内容和高度-->
    <Scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <songList :songs="songs"></songList>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'
import {prefixStyle} from 'common/js/dom'
import loading from 'base/loading/loading'
const transform=prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
const RESERVED_HEIGHT=40
  export default{
    props:{
      /*从父元素传过来的数据*/
      bgImage:{
        type:String,
        default:''
      },
      songs:{
        type:Array,
        default:[]
      },
      title:{
        type:String,
        default:''
      }
    },
    computed:{
      /*定义背景*/
      Bgstyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    data(){
      return {
        scrollY:0
      }
    },
    created(){
      /*为了做监听的滚动*/
      this.probeType=3,
      this.listenScroll = true
    },
    mounted(){
      /*在生命周期中变量可以使用this.xxx*/
      this.imageHeight=this.$refs.bgImage.clientHeight
      /*设置一个到图片的滚动值，向上就是负负的正*/
      this.minTransalteY=-this.imageHeight+RESERVED_HEIGHT
      /*在挂载的时候可以看到图片和列表，这个样式是width：100%和padding-top：70%,这个$el是dom用于样式*/
      this.$refs.list.$el.style.top=`${this.imageHeight}px`
    },
    components:{
      Scroll,
      songList,
      loading
    },
    methods:{
      /*做监听scroll滚动了多少，赋值给this.scrollY*/
      scroll(pos){
        this.scrollY=pos.y
      },
      back(){
        /*利用路由返回*/
        this.$router.back()
      }
    },
    watch:{
      scrollY(newY){
        /*当滚到一定的时候zIndex让image出现，高度改变 向上推*/
        let zIndex=0
        /*当滚动到top为0的时候，开始scale缩放*/
        let scale=1
        /*向上滚动时候做高斯模糊*/
        let blur=0
        /*缩放的比例计算就是根据下拉距离，来缩放图片大小 abs是绝对值*/
        const percent=Math.abs(newY/this.minTransalteY)
        /*比较滚动和滚动到图片的两个值的大小 newY按top算的*/
        let translateY=Math.max(this.minTransalteY,newY)
        if(newY>0){
          scale=1+percent
          zIndex=10
        }else{
          blur=Math.min(20*percent,20)
        }
        /*将scroll监听到的高度给滚动层赋值*/
        this.$refs.layer.style[transform]=`translate3d(0,${translateY}px,0)`
        /*模糊效果在filter，backdrop-filter对图片背景的模糊*/
        this.$refs.filter.style[backdrop]=`blur(${blur}px)`
        if(newY<this.minTransalteY){
          zIndex=10
          this.$refs.bgImage.style.paddingTop=0
          this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display='none'
        }else{
          this.$refs.bgImage.style.paddingTop='70%'
          this.$refs.bgImage.style.height=0
          this.$refs.playBtn.style.display=''
        }
        this.$refs.bgImage.style.zIndex=zIndex
        this.$refs.bgImage.style[transform]=`scale(${scale})`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      /*为了做体验更好*/
      //overflow:hidden
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>