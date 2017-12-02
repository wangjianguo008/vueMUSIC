<!-- 这是一个类似于通讯录的组件 -->
<template>
    <Scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
      <!--歌手这个循环是头部标题的循环-->
      <ul>
        <li class="list-group" v-for="group in data"ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <!--这是内容的循环-->
          <ul>
            <li class="list-group-item" v-for="item in group.items">
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 这里没有使用better-scroll的touch事件，自己绑定 比较click没有延迟 可以认为是移入移出-->
      <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <!--为了获取索引才使用index-->
          <li class="item" v-for="(item,index) in shortcutList" :data-index="index" :class="{'current':currentIndex===index}">
            {{item}}
          </li>
        </ul>
      </div>
    </Scroll>
</template>

<script>
import Scroll from "base/scroll/scroll"
import {getData} from "common/js/dom"
const ANCHOR_HEIGHT=18//每个字的大小和padding加在一起的高度
 export default{
  created(){
    /*onShortcutTouchStart和onShortcutTouchMove创建一个公用的的，可以调用的object,不在data中建立，因为data中有get和set的方法*/
    this.touch={}
    this.listenScroll = true,//可以派发滚动事件
    this.listHeight = []//默认
    this.probeType=3//在3的情况下就可以发生依次下拉数据
  },
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  data(){
    return {
      scrollY: -1,//观测一个y轴，初始化一个上线
      currentIndex: 0// 当前对第几个高亮
    }
  },
  /*计算右侧距离*/
  computed:{
    /*显示右侧的字母a-z,然而shortcutList这是一个字母的集合数组*/
    shortcutList(){
      return this.data.map((group)=>{
        return group.title.substr(0,1)
      })
    }
  },
  methods:{
    /*获取data-index上的index*/
      onShortcutTouchStart(e){//e就是点击上去的element,getData（el,name,val）的第三参数可以不写
          let anchorIndex = getData(e.target, 'index')//这里的组合是一个字符串
          let firstTouch=e.touches[0]//手指触碰的第一字母，默认(刷新)在热字
          this.touch.y1=firstTouch.pageY//为touch添加y1
          this.touch.anchorIndex=anchorIndex//保存为了move使用
          this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e){
        let lastTouch=e.touches[0]
        this.touch.y2=lastTouch.pageY//移动到某个字母的距离
        let delta=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT | 0//|0就是match.floor向下取整，计算共有多少个字母
        let anchorIndex =parseInt(this.touch.anchorIndex)+delta
        this._scrollTo(anchorIndex)
      },
      _scrollTo(index){
        /*到上线的一个位置*/
        //console.log(index)
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
         /*左侧对应的索引，滚动到对应的element*/
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      },
      scroll(pos){
        /*为了监听到better-scroll的y距离*/
        this.scrollY=pos.y
      },
      /*计算高度看每区间group的高度，对应高亮*/
      _calculateHeight(){
        this.listHeight=[]
        /*获取有多少group*/
        const list=this.$refs.listGroup
        let height=0
        this.listHeight.push(height)//第一组的高度就是0
        for(var i=0;i<list.length;i++){
          let item=list[i]
          /*由于是dom元素所以可以使用clientHeight获得高*/
          height+=item.clientHeight
          this.listHeight.push(height)//每一个group的高度算出来
        }
      }
  },
  watch:{
    /*只有data发生了变化_calculateHeight才可以计算*/
    data(){
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY(newY){
      const listHeight=this.listHeight
      // 当滚动到顶部，newY>0
      if(newY>0){
        this.currentIndex=0
        return
      }
      // 在中间部分滚动listHeight.length-1因为better-scroll有上下限
      for(let i=0;i<listHeight.length-1;i++){
        let height1=listHeight[i]
        let height2=listHeight[i+1]
        /*往下走y轴是负数*/
        if(-newY>=height1&&-newY<height2){
          this.currentIndex=i
          //console.log(this.currentIndex)
          return 
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex=listHeight.length-2
    }
  },
  components:{
    Scroll
  }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
