/*VUEX可以修改的地方和actions都可以修改传到state，定义修改的操作*/
/*这是es6语法 * as types 相当于从该文件里面一个一个查找方法*/
import * as types from './mutation-types'
/*这里就是修改的每一个方法*/
const matutaions={
	/*第一个参数是state.js下的状态，第二就是提交给action的数据*/
	[types.SET_SINGER](state,singer){
		state.singer=singer
	}
}
export default matutaions