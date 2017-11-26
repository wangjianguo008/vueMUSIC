/*该页获取Recommend数据,使用模块jsp*/
import jsonp from "common/js/jsonp"
import {commonParams,options} from "./config"
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

/*获取歌单的数据*/
export function getDiscList(){
	const url="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg";
	const data=Object.assign({},commonParams,{
		platform: 'yqq',
	    hostUin: 0,
	    sin: 0,
	    ein: 29,
	    sortId: 5,
	    needNewCode: 0,
	    categoryId: 10000000,
	    rnd: Math.random(),
	    format: 'jsonp'
	})
	return jsonp(url,data,options)
}