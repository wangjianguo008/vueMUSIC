<template>
  <div class="singer">
   	
  </div>
</template>

<script>
import {getSingerList} from "api/singer"
import {ERR_OK} from "api/config"
  export default {
  	data(){
  		return {
  			singers:[]
  		}
  	},
  	created(){
  		/*歌手的列表*/
  		this._getSingerList()
  	},
  	methods:{
  		_getSingerList(){//渲染到页面到数据
  			getSingerList().then((res)=>{
  				if(res.code===ERR_OK){
  					this.singers=res.data.list
  					//console.log(this.singers)
  				}
  			})
  		}
  	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>