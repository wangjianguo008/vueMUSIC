/*热门歌手的选择字段,使用es6 class方法面向对象*/
export default class Singer{
	constructor(props){//es6父元素上的只有一个变量，而在子元素上可以使用两个变量
		this.id=props.id,
		this.name=props.name,
		this.avatar=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${props.id}.jpg?max_age=2592000`
	}
}