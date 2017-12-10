<template>
  <div class="player" v-show="playlist.length>0">
    <!--动画的钩子函数-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <!--这是展开的播放器--> 
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref='cdWrapper'>
              <div class="cd">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <!--这是min的播放器-->
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
/*这是一个可以做c3动画的一个js的npm插件*/
import animations from 'create-keyframe-animation'
import {prefixStyle} from 'common/js/dom'
const transform=prefixStyle('transform')
  export default{
    computed:{
      ...mapGetters([
        'fullScreen',/*全屏选择*/
        'playlist',
        'currentSong'//从musiclist传过来的
      ])
    },
    methods:{
      back(){
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
      },
      /*不能直接修改this.fullScreen为false，不起作用，只能修改mapMutations({})后才能起作用*/
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN'
      }),
      /*动画的钩子动画,参数done执行的时候会到after中*/
      enter(el,done){
        const {x,y,scale}=this._getPosAndScale()
        /*从小到大*/
        let animation={
          0:{
            transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }
        // 注册动画
        animations.registerAnimation({
          name: 'move',
          // 插入自定义的动画
          animation,
          // 参数配置
          presets: {
            duration:400, // 持续时间
            easing: 'linear'// 过度效果
            /*delay: 500, // 延迟时间
            terations: 1, // 实现动画的次数
        　　delay: 0, // 延迟 
        　　direction: 'normal', // 方向
        　　resetWhenDone: false, // if true ：将最后动画状态应用为“变换”属性
        　　clearTransformsBeforeStart: false // 是否在动画开始之前清除现有的转换*/
          }
        })
        /*开跑*/
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter(){
        /*取消动画*/
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation=''
      },
      leave(el,done){
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        /*动画结束就是transitionend*/
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave(){
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      /*获取两个图的位置和缩放的尺寸（都是计算的中心点）*/
      _getPosAndScale(){
        /*底部小圆的width*/
        const tragetWidth=40
        /*底部小圆的中心到最左端的距离*/
        const paddingLeft=40
        /*底部小圆的中心到最底部的距离*/
        const paddingBottom=30
        /*大圆中心到上边的距离*/
        const paddingTop=80
        /*width的计算大图大小*/
        const width=window.innerWidth*0.8
        /*缩放的比例公式*/
        const scale=tragetWidth/width
        /*按left和top的移动来算正负*/
        const x=-(window.innerWidth/2-paddingLeft)
        const y=window.innerHeight-paddingTop-paddingBottom-width/2
        return {
          x,
          y,
          scale
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>