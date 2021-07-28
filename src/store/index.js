import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
//获取用户权限菜单
import {getMenuList} from '@/api/home'
//引入递归函数
import recursionRoutes from '../untils/recursionRoutes'
//引入所有路由
import allRoutes from '../router/allrouters/index'
//引入按需加载路由
import dynamicRoutes from '../router/dynaRoutes'
import router from "../router";
Vue.use(Vuex);
export default new Vuex.Store({
  // vuex数据刷新就丢失解决
  // plugins: [createPersistedState(
  //   {userInfo:window.sessionStorage}
  // )],
  state: {
    // 存放用户信息
    userInfo:{},
    // 存放用户侧边栏
    menuList:[],
    // 存放面包屑
    curmbs:[]
  },
  mutations: {
    // 获取用户登录信息
    SET_USERINFO(state,payload) {
      state.userInfo.username = payload.username
      state.userInfo.nickName = payload.nickname
      state.userInfo.roleName = payload.roleName
      state.userInfo.phone = payload.phone
    },

    //面包屑
    SET_CRUMBS(state,payload) {
      state.curmbs = payload
      // console.log(state.curmbs);
    }
  ,

    // 权限菜单
    SET_MENULIST(state,payload) {
      // 将获取的菜单数据赋值到state中
      state.menuList = payload
      // 找出路径为'/'的路由，因为从后台获取的菜单列表是它的子路由
      let target = dynamicRoutes.find( item => item.path === '/')
      // 给目标路由添加子路由
      target.children = [...state.menuList]
      // 动态添加到路由上
      router.addRoutes(dynamicRoutes)
    },
    // 清除菜单数据
    SET_CLEARMENU(state) {
      state.menuList = []
      state.userInfo = {}
    }
   
  },
  actions: {
    //侧边菜单路由获取
    async FETCH_MENULIST ({commit}) {
      let result = await getMenuList ()
      // 调用递归函数得到符合的路由
      let userMenu = recursionRoutes(allRoutes,result.menuList)
      // 将数据提交到mutations
      commit('SET_MENULIST',userMenu)
    },
    CLEAR_MENU({commit}) {
      commit('SET_CLEARMENU')
    }
  }
});
