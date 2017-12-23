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

/*浏览其器前缀的问题，统一的管理全加*/
let elementStyle=document.createElement('div').style
/*创建快速的方法*/
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
/*类似vendor就是key style.charAt(0).toUpperCase()就是T style.substr(1)就是ransfrom 最后拼接*/
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

