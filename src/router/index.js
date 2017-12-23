import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "components/recommend/recommend"//推荐页面
import Rank from "components/rank/rank"//排行
import Search from "components/search/search"//搜索
import Singer from "components/singer/singer"//歌手
import SingerDetail from "components/singer-detail/singer-detail"//歌手点击后的详情页面
import Disc from 'components/disc/disc'//这是首页下面的热榜的详情
import TopList from 'components/top-list/top-list'//这是排行榜
import UserCenter from 'components/user-center/user-center'//我的收藏

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'//默认
    },
    {
      path: '/recommend',
      component:Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component:Rank,
      children:[
        {
          path:':id',
          component:TopList
        }
      ]
    },
    {
      path: '/search',
      component:Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component:Singer,
      children:[
        {
          path:':id',//这里的：就是变量id
          component:SingerDetail//配置歌手的详情的页面
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
