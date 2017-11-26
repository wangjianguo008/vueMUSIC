<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <!--keep-alive主要是解决切换时不会刷新页面，会保持之前的状态-->
    <keep-alive>
    	<router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header"
import Tab from "components/tab/tab"
export default {
  components:{
  	MHeader,
  	Tab
  }
}
</script>

<style lang="stylus">
/*样式的引入是@import，common配置在webpack.base.conf.js*/
@import "~common/stylus/variable"

</style>
