import Vue from "vue";
import Router from "vue-router";
import login from "../views/login/index.vue";
import home from "../views/home/index.vue"
import allRoutes from "./allrouters/index"
import VueRouter from "vue-router";
Vue.use(Router);


// 解决同一路径报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
   
    // {
    //   path: "/",
    //   component:home,
    //   children:allRoutes
    // },
  
      
  ]
  
  
});



