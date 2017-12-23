<!-- 这是横向进度条 -->
<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!--这是走过的位置-->
      <div class="progress" ref="progress"></div>
      <!--拉动组件就是touch-->
      <div class="progress-btn-wrapper" ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    props:{
      /*进度条滑动的百分比*/
      percent:{
        type:Number,
        default:0
      }
    },
    created(){
      this.touch={}
    },
    methods:{
      progressTouchStart(e) {
        /*touch的初始化，这是在定义key*/
       this.touch.initiated=true
       /*第一个手指触摸到的地方，这个都是从头算*/
       this.touch.startX=e.touches[0].pageX
       /*已经移动过的距离*/
       this.touch.left=this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        /*如果没有走第一步就返回*/
       if (!this.touch.initiated) {
          return
        }
        /*触摸和放开之间的距离*/
        const deltaX = e.touches[0].pageX - this.touch.startX
        /*Math.min防止划出进度条设置最小距离，Math.max这是选择滑动最大距离*/
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(0,this.touch.left+deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated=false
        /*可以与时间同步*/
        this._triggerPercent()
      },
      progressClick(e) {
        /*getBoundingClientRect()rectObject.top：元素上边到视窗上边的距离;rectObject.right：元素右边到视窗左边的rectObject.left：元素左边到视窗左边的距离;*/
        const rect = this.$refs.progressBar.getBoundingClientRect()
        console.log(rect.left)
        console.log(e.pageX)
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对 第二次点击会回到第一次的地方
         //this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent(){
        /*现在就是反过来的比例传给父，就是滑动距离比总距离*/
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        /*滑动比上总*/
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit("percentChange",percent)
      },
      _offset(offsetWidth){
        /*移动的距离*/
        this.$refs.progress.style.width=`${offsetWidth}px`
        /*小球的偏移*/
        this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch:{
      /*用了监听这个百分比*/
      percent(newPercent){
        if(newPercent>=0 && !this.touch.initiated){
          /*这是进度条的总长度要减去小球*/
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth
          /*这是百分比*总长*/
          const offsetWidth=newPercent*barWidth
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>