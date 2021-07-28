import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementUI from 'element-ui';
import qfSubMenu from 'qf-sub-menu' 
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 引入icon
import './assets/icons/iconfont/iconfont'
import './assets/icons/iconfont/iconfont.css'

//全局自定义指令
Vue.directive('has', {
  inserted: (el, binding, vnode) => {
   let permissionList = sessionStorage.getItem('permission')
   if (permissionList.includes(binding.value) == false) {
     //禁用按钮
     el.disabled = true
     el.style.cursor = 'not-allowed'
   }
  }
 })

// 路由前置钩子
router.beforeEach((to, form,next) => { 
	// 获取 token
	const token = localStorage.getItem('qf_token') || ''
  if(token) {
    if(store.state.menuList.length == 0) {
      store.dispatch('FETCH_MENULIST').then( () => {
        next({path:to.path})
      })
    } else {
      next()
    }
  } else { // 无token
    // 在登录页
    if(to.path === '/login') {
      next()
    } else {
      // 未登录，访问login 不拦截
      next({path:'/login'})
    }
  }

})


//  路由后置钩子（处理面包屑）
router.afterEach( (to) => {
  // 因为mtached数组中第一个是无效的所以删除
  // console.log(to.matched);
  let routerList = to.matched.slice(1)
  store.commit('SET_CRUMBS',routerList)
})



Vue.config.productionTip = false;
Vue.use(ElementUI,axios)
Vue.use(qfSubMenu)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
