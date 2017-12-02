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

/*获取data-index的值，封装的方法*/
export function getData(el,name,val){
	const prefix='data-';
	name=prefix+name;
	if(val){
		return el.setAttribute(name,val)
	}else{
		return el.getAttribute(name)
	}
}