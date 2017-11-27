// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"//这是关于es6的补丁
import Vue from 'vue'
import App from './App'
import router from './router'//使用路由
import fastclick from 'fastclick'//这是一个移动端的300ms点击延迟的优化
import "common/stylus/index.styl"
import VueLazyLoad from "vue-lazyload"//一个图片赖加载的插件（好处就是节省流量，加载快）
/*语法糖关于fastclick*/
fastclick.attach(document.body)//绑定在body上
/* eslint-disable no-new */
Vue.use(VueLazyLoad,{
	loading:require("common/image/default.png")//加载图片的路劲，这个是没有加载的前图片
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
