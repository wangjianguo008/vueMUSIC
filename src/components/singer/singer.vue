<template>
  <div class="singer">
   	<Listview :data="singers"></Listview>
  </div>
</template>

<script>
import {getSingerList} from "api/singer"
import {ERR_OK} from "api/config"
import Singer from 'common/js/singer'
import Listview from "base/listview/listview"
/*热门取前10条*/
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
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
  					this.singers=this._normalizeSinger(res.data.list)
  					//console.log(this.singers)
  				}
  			})
  		},
  		/*现在打印出来的数据没有办法使用，将数据全部归总后筛选出需要的数据,做成一维数组,先要找到热门*/
  		_normalizeSinger(list){
  			let map={// 建立一个map对象，将热门的数据保存一下，就是10条
  				hot:{
  					title:HOT_NAME,
  					items:[]
  				}
  			}
  			/*遍历list下的数据获取热门和a-z全部数据*/
  			list.forEach((item,index)=>{
  				/*热门的数据*/
  				if(index<HOT_SINGER_LEN){
  					map.hot.items.push(new Singer({
  						name:item.Fsinger_name,
  						id:item.Fsinger_mid
  					}))//使用es6（class）方法就的使用new
  				}
  				/*a-z名字的数据*/
  				const key=item.Findex
  				if(!map[key]){
  					map[key]={
  						title:key,
  						items:[]
  					}
  				}
  				map[key].items.push(new Singer({
        		name: item.Fsinger_name,
        		id: item.Fsinger_mid
      		}))
  			})
        //console.log(map)
  			/*获取有序列表就是将热门和a-z作划分*/
  			const ret=[]
  			const hot=[]
  			for(let key in map){
  				var val=map[key]
  				if(val.title.match(/[a-zA-Z]/)){
  					ret.push(val)
            //console.log(ret)
  				}else if(val.title === HOT_NAME){
  					hot.push(val)
            //console.log(hot)
  				}

  			}
  			/*做a-z的排序，charCodeAt返回的字母的数字编码Unicode*/
  			ret.sort((a,b)=>{
  				return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  			})
  			return hot.concat(ret)
  		}
  	},
    components:{
      Listview
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