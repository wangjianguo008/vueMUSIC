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
/*异步加载为了打包可以小点，加载也快*/
/*const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}

const TopList = (resolve) => {
  import('components/top-list/top-list').then((module) => {
    resolve(module)
  })
}

const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
}*/


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
