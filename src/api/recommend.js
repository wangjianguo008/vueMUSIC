/*该页获取Recommend数据,使用模块jsp*/
import jsonp from "common/js/jsonp"
import {commonParams,options} from "./config"

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
