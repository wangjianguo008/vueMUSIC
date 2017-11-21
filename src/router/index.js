import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "components/recommend/recommend"//推荐页面
import Rank from "components/rank/rank"//排行
import Search from "components/search/search"//搜索
import Singer from "components/singer/singer"//歌手

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'//默认
    },
    {
      path: '/recommend',
      component:Recommend
    },
    {
      path: '/rank',
      component:Rank
    },
    {
      path: '/search',
      component:Search
    },
    {
      path: '/singer',
      component:Singer
    }
  ]
})
