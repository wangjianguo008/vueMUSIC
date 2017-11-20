<template>
  <div id="app">
    <MHeader></MHeader>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header"
export default {
  components:{
  	MHeader
  }
}
</script>

<style lang="stylus">
/*样式的引入是@import，common配置在webpack.base.conf.js*/
@import "~common/stylus/variable"

</style>
