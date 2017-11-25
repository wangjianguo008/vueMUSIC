<!-- 基础组件 -->
<template>
  <div class="slider" ref="slider">
   <div class="slider-group" ref="sliderGroup">
    <!--vue插槽，slider引用的dom都会插到slot中-->  
     <slot>
       
     </slot>
   </div>
   <div class="dots">
     <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></span>
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
    data(){
      return {
        dots:[],
        currentPageIndex: 0//默认点的下标是0
      }
    },
    mounted(){
      /*$nextTick也可以归定时间加载*/
      setTimeout(()=>{
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if(this.autoPlay){
          this._play()
        }
      },20)
      /*解决窗口适配的问题,解决后变成图片随浏览器适配,resize是better-scroll的事件*/
      window.addEventListener("resize",()=>{
        if(!this.slider){
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()//刷新better-scroll的方法
      })
    },
    methods:{
      /*获取每个图的宽度的方法*/
      _setSliderWidth(isResize){
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
        /*有了改变就停止了*/
        if(this.loop&&!isResize){
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
          snapSpeed:400/*滑动的速度*/
          /*click:true去掉了否则手机无法点击（反正是手机端）*/
        })
        /*每次在滚动完毕后，会有一个scrollEND事件，getCurrentPage()获得当前页面，better-scroll方法*/
        this.slider.on("scrollEnd",()=>{
          let pageIndex=this.slider.getCurrentPage().pageX//第几个子元素
          /*如果循环，他就减少一个图片拼接是7个*/
          if(this.loop){
            pageIndex-=1
          }
          this.currentPageIndex=pageIndex
          /*解决轮播滚动到第二张停顿的问题*/
          if(this.autoPlay){
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      /*轮播上的点*/
      _initDots(){
        this.dots=new Array(this.children.length)
      },
      /*自动轮播*/
      _play(){
        let pageIndex=this.currentPageIndex+1
        if(this.loop){
          pageIndex+=1
        }
        this.timer=setTimeout(()=>{
          this.slider.goToPage(pageIndex,0,400)//这是better-scroll的方法最后时间和上边滑动时间一样
        },this.interval)
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