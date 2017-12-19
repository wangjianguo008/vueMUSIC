/*做映射,取数据到组件中从state*/
/*箭头函数的方法*/
export const singer=state=>state.singer

export const playing=state=>state.playing

export const fullScreen=state=>state.fullScreen

export const playlist=state=>state.playlist

export const sequenceList=state=>state.sequenceList

export const mode=state=>state.mode

export const currentIndex=state=>state.currentIndex
/*取song可以从getters下做计算*/
export const currentSong=(state)=>{
	return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory