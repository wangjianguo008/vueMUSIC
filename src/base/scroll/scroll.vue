<!-- 建立scroll组件 -->
<template>
  <div ref="wapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default{
    props:{
      probeType:{//下拉的速度，就是截流
        type:Number,
        default:1
      },
      click:{
        type:Boolean,
        default:true
      },
      data:{//数据改变，为了refresh()
        type:Array,
        default:null
      }
    },
    mounted(){
      /*浏览器是17ms*/
      setTimeout(()=>{
        this._initScroll()
      },20)
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wapper){//没有至就是data为null
          return
        }
        this.scroll=new BScroll(this.$refs.wapper,{
          probeType:this.probeType,
          click:this.click
        })
      },
      /*以下就是better-scroll代理，就是将方法套用了下,this.scroll是指向better-scroll的实例*/
      enable(){//允许
        this.scroll && this.scroll.enable()
      },
      disable(){//禁止
        this.scroll && this.scroll.disable()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      scrollTo(){//apply会接受一些数据
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    /*监听data变化，如果有变化在初始化的时候刷新*/
    watch:{
      data(){
        setTimeout(()=>{
          this.refresh()
        },20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
