// 引入树形菜单所在的路由页面
import  Home from '../views/home/index.vue'

const dynamicRoutes = [
    {
        path:'/',
        component:Home,
        children:[]
    },
    {
        path: "*",
        component: () => import( /*webpackChunkName: "page404"*/ "../views/page404/page404.vue")
    }
]

export  default dynamicRoutes