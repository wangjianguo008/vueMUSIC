/*添加样式class*/
export function addClass(el,className){
	if(hasClass(el,className)){
		return
	}
	let newClass=el.className.split(' ')//变成数组
	newClass.push(className)
	el.className=newClass.join(' ')
}

export function hasClass(el,className){
	/*开头(^|\\s)可以是空*/
	let reg=new RegExp("(^|\\s)"+className+"(\\s|$)")
	return reg.test(el.className)
}