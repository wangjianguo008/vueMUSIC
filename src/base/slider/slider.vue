<!-- 基础组件 -->
<template>
  <div class="slider" ref="slider">
   <div class="slider-group" ref="sliderGroup">
    <!--vue插槽，slider引用的dom都会插到slot中-->  
     <slot>
       
     </slot>
   </div>
   <div class="dots">
     
   </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import {addClass} from "common/js/dom"
  export default {
    props:{
      /*loop循环，autoplay自动轮播，interval间隔时间*/
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:4000
      }
    },
    mounted(){
      /*$nextTick也可以归定时间加载*/
      setTimeout(()=>{
        this._setSliderWidth()
        this._initSlider()
      },20)
    },
    methods:{
      /*获取每个图的宽度的方法*/
      _setSliderWidth(){
        this.children=this.$refs.sliderGroup.children
        /*width是全部图片的宽度*/
        let width=0
        /*初始的宽度就是slider的宽，使用clientwidth方法*/
        let sliderWidth=this.$refs.slider.clientWidth
        for(let i=0;i<this.children.length;i++){
          let child=this.children[i]
          /*接下来就是添加样式，专用了额一个方法*/
          addClass(child,'slider-item')
          /*child的宽*/
          child.style.width=sliderWidth+'px'
          width+=sliderWidth
        }
        if(this.loop){
          width+=2*sliderWidth
        }
        this.$refs.sliderGroup.style.width=width+'px'
      },
      /*初始话*/
      _initSlider(){
        this.slider=new BScroll(this.$refs.slider,{
          scrollX:true,/*横向滚动*/
          scrollY:false,/*竖向不滚动*/
          momentum:false, /*当快速滑动时是否开启滑动惯性*/
          snap: true, /*该属性是给 slider 组件使用的，普通的列表滚动不需要配置*/
          snapLoop:this.loop,/*循环*/
          snapThreshold: 0.3, /*用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页*/
          snapSpeed:400,/*滑动的速度*/
          click:true
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>