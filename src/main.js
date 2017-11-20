// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"//这是关于es6的补丁
import Vue from 'vue'
import App from './App'
//import router from './router'
import fastclick from 'fastclick'//这是一个移动端的300ms点击延迟的优化
import "common/stylus/index.styl"
/*语法糖关于fastclick*/
fastclick.attach(document.body)//帮在body上
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
