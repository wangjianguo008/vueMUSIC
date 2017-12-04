/*抓取歌手的数据从qq音乐中*/
import jsonp from "common/js/jsonp"
import {commonParams,options} from "./config"

export function getSingerList(){
  const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'//歌手的数据包
  const data=Object.assign({},commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url,data,options)
}

export function getSingerDetail(singerId){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data=Object.assign({},commonParams,{
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    singermid:singerId,
    order:'listen',
    begin:0,
    num:80,
    songstatus:1
  })
  return jsonp(url,data,options)
}