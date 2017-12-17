/*创建详情歌手歌单的页面song类,album专辑，duration为了做播放器的时间,这是在筛选需要的字段*/
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song{
	constructor({id,mid,singer,name,album,duration,image,url}){
		this.id=id
		this.mid=mid
		this.singer=singer
		this.name=name
		this.album=album
		this.duration=duration
		this.image=image
		this.url=url
	}
	getLyric(){
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getLyric(this.mid).then((res)=>{
				if(res.retcode===ERR_OK){
					/*base64解码成汉字*/
					this.lyric=Base64.decode(res.lyric)
					resolve(this.lyric)
					//console.log(this.lyric)
				}else{
					reject('no lyric')
				}
			})
		})
	}
}
/*一个公用的*/
export function createSong(musicData){
	return new Song({
		id:musicData.songid,
		mid:musicData.songmid,
		singer:filterSinger(musicData.singer),
		name:musicData.songname,
		album:musicData.albumname,
		duration:musicData.interval,
		image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`//这个域名在网上自己找下
	})
}

/*因为singer是对象格式问题重做了一个方法*/
export function filterSinger(singer){
	let ret=[]
	if(!singer){
		return ""
	}
	singer.forEach((s)=>{
		ret.push(s.name)
	})
	return ret.join("/")
}