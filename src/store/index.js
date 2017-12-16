/*vuex的入口文件*/
import Vue from "vue"
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'//修改m时候的记录和打印
/*注册插件*/
Vue.use(Vuex)
/*报错通知，线上不使用*/
//const debug=process.env.NOOD_ENV !=='production'
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations
	//strict:debug,
	//plugins:debug?[createLogger()]:[]//记录数据放在数组中
})