<template>
  <div class="recommend">
    <!--我们在打开页码的时候，开始渲染是没有高度的，没有数据的，而scroll实在mounted的方法下，所以就滚动不了
      所以我们可以给他加data方法让他有数据，数据不为null，discList在轮播后加载，所以会撑开内容的高度
      所以就可以实现向上滚动了，还有就是加以一个div将轮播和内容全部抱在一起，父用子元素方法时候可以使用
      v-bing的方法-->
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <Slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <!--fastclick是npm模块绑定在body身上，现在监听到needClick时候才会有点击效果-->
                <img class="needClick" :src="item.picUrl" @load="loadImgage">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <!--:src="item.imgurl"这是赖加载模块的功能-->
                <img  width="60" height="60" v-lazy="item.imgurl">
              </div>
              <!--v-html就是转易，防止有代码-->
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <Loading></Loading>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Slider from "base/slider/slider"
import {getRecomment,getDiscList} from "api/recommend"
import {ERR_OK} from "api/config"
import Scroll from "base/scroll/scroll"
import Loading from "base/loading/loading"
  export default{
    data(){
      return {
        recommends:[],
        discList:[]
      }
    },
  	created(){
     /* setTimeout(()=>{
        this._getRecomment()
      },5000)*///测试滚动
      /*setTimeout(()=>{
        this._getDiscList()
      },6000)*///测试loading
  		this._getRecomment()//轮播数据
      this._getDiscList()//歌单数据
  	},
  	methods:{
  		/*获取轮播的数据*/
  		_getRecomment(){
  			/*getRecomment已经是promise了*/
  			getRecomment().then((res)=>{
  				if(res.code===ERR_OK){
  					this.recommends=res.data.slider
  				}
  			})
  		},
      _getDiscList(){
        getDiscList().then((res)=>{
          if(res.code===ERR_OK){
            //console.log(res.data.list)
            this.discList=res.data.list
          }
        })
      },
      /*有一张图片加载好了就会重新异步刷新页面，确定滚动的高度,否则下边的看不到，这是优化*/
      loadImgage(){
        if(!this.checkloaded){
          this.$refs.scroll.refresh()
          this.checkloaded=true
        }
      }
  	},
    components:{
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          //这是flex横向居中的方法
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            //纵向排列居中
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 100%
        //transform: translateY(-50%)
</style>