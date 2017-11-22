import originJSONP from 'jsonp'

/*封装一个jsonp(url,opts(param就是定义的一个数据名;timeout超时；prefix就是可以等于某个东西；name就是全局注册的放发名),fn)的通用方法*/
/*这里的data是为了拼接url,这是一个拼接url的技巧*/
export default function jsonp(url,data,option){
	url+=(url.indexOf("?")<0? "?":"&")+param(data)
	return new Promise((resolve,reject)=>{
		originJSONP(url,option,(err,data)=>{
			if(!err){
				resolve(data)
			}else{
				reject(err)
			}
		})
	})
}

function param(data){
	let url=''
	/*循环这个data的数据,路经一般就一个*/
	for(var k in data){
		let value=data[k]!==undefined? data[k]:''
		url+=`&${k}=${encodeURIComponent(value)}`
	}
	/*substring() 方法用于提取字符串中介于两个指定下标之间的字符。*/
	return url? url.substring(1):''
}
