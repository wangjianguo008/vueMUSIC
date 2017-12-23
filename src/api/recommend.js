/*该页获取Recommend数据,使用模块jsp*/
import jsonp from "common/js/jsonp"
import {commonParams,options} from "./config"
import axios from "axios"
/*获取轮播图片的数据*/
export function getRecomment(){
	const url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
	/*es6新语法拼接方法的新语法*/
	const data=Object.assign({},commonParams,{
		uin:0,
		platform:'h5',
		needNewCode:1
	});
	/*使用jsonp的方法*/
	return jsonp(url,data,options)
}

/*获取歌单的数据*//*获取不到数据，因为host引起，找不到路劲，方法使用后台axios*/
export function getDiscList(){
	const url="/api/getDiscList";
	const data=Object.assign({},commonParams,{
		platform: 'yqq',
	    hostUin: 0,
	    sin: 0,
	    ein: 29,
	    sortId: 5,
	    needNewCode: 0,
	    categoryId: 10000000,
	    rnd: Math.random(),
	    format: 'json'
	})
	/*从后台获取数据是json不是jsonp所以重写方法axios:url(method、data)*/
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}

/*首页歌曲的列表*/
export function getSongList(disstid) {
  const url = '/api/getDisc'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}
