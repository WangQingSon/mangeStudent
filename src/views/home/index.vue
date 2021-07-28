<template>
    <div class="home">
        
        <el-container>
            <el-header class="header">
                <div class="head_left" >
                    <div class="cityWeath">
                        <div>
                             <el-input
                             placeholder="按回车查"
                             @keydown.enter.native="queryWeath"
                            v-model="cityName"
                            clearable>
                            </el-input>
                        </div>
                    </div>
                    <span>{{cityWea}}</span>
                    <div :class="cityWea == '晴' && cityWea != undefined ? 'el-icon-sunny' : 'el-icon-cloudy'"></div>
                </div>
                <div class="header_btn"><span @click="ctrlOpenClose" :class="isCollapse == false ? 'el-icon-s-unfold' :'el-icon-s-fold'"></span></div>
                <div class="head_center">
                    <div class="title"><b>后台管理系统</b></div>
                </div>
                <div class="head_right">
                    <div class="zhuce">
                        <span class="iconfont icon-zhuce" style="cursor:pointer" v-if="nickName == '管理员' ? true : false" @click="openDialog()"></span>
                    </div>
                    <div class="userInfo" >
                        <div class="userImg">
                            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="userImg" style="marginTop:10px">
                        </div>
                        <div class="userTitle"><b style="margin:0px">欢迎您：{{nickName}}</b></div>
                        
                    </div>
                    <div class="exit">
                        <span class="el-icon-circle-close" @click="exitUser()" style="cursor:pointer;color:red"></span>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside >

                    <!-- 侧边栏 -->
                    <el-col :span="24">
                    
                        <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse"
                        >
                         <qf-sub-menu :sideMenu='menuList'></qf-sub-menu>
                        </el-menu>
                    </el-col>
                   
                </el-aside>
                <el-main>
                     <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/Welcome' }">首页 </el-breadcrumb-item>
                                <el-breadcrumb-item v-for="curmb in curmbs " :key="curmb.id">
                                    {{curmb.meta.name}}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
        <register :showDialog="showDialog" @showCtrlDialog="showCtrlDialog"></register>
    </div>
</template>

<script>
// 防抖函数
const delay = (function () {
 let timer = 0
 return function (callback, ms) {
  clearTimeout(timer)
  timer = setTimeout(callback, ms)
 }
})()
console.log(delay);
import register from './register/index.vue'
import {getWeath} from '@/api/home'
import {mapState} from 'vuex'
export default {
    name:'home',
    components:{
        register
    },
    data () {
        return {
            // 控制弹窗
            showDialog:false,
            // 存放用户名
            nickName:'',
            // 城市名
            cityName:'南京',
            // 城市天气
            cityWea:'',
            // 控制侧边菜单
            isCollapse: false,
        }
    },
    methods:{
        // 注册
        openDialog () {
            this.showDialog = true
        },
        // 监听子组件弹窗关闭触发    子组件调用
        showCtrlDialog() {
           this.showDialog = false
        },  
        // 用户退出
        exitUser () {
            localStorage.removeItem('qf_token')
            localStorage.removeItem('qf_nickName')
            // 清除菜单数据
            this.$store.commit('SET_CLEARMENU')
            this.$router.push('/login')
            //执行刷新页面，解决两种身份登录会缓存上一种问题
            window.location.reload()
        },
        // 获取天气
        getWeathM () {
            let city = this.cityName
            getWeath(city).then( res => {
                if(res.data != undefined) {
                    this.cityWea = res.data[0].wea
                }
            })
        },
        
        // 查询天气
        queryWeath () {
           // 防抖，一分钟只能查询一次天气
           delay( () => {
               this.getWeathM ()
           },1000)
        },
        // 侧边菜单收起
        ctrlOpenClose() {
          if(this.isCollapse == true) {
              this.isCollapse = false
          } else {
              this.isCollapse = true
          }
         
        }
    },
    mounted () {
        
        this.nickName = localStorage.getItem('qf_nickName')
        // 默认获取南京天气
        getWeath('南京').then( res => {
                if(res.data != undefined) {
                    this.cityWea = res.data[0].wea
                }
        })
        
    },
    // 计算属性
    computed:{
        // 映射vuex的数据
        ...mapState(['userInfo','menuList','curmbs']),

    },
    watch:{
        userInfo:{
            handler(nval,oval) {
                
            },
            deep:true
        }
    }
}
</script>

<style scoped>
    .home {
        height: 100%;
        /* background: url('../../assets/imgs/真实伤害_阿卡丽.jpg') no-repeat; */
    }

    /* 头、体、左侧样式 */
    .el-container {
        height: 100%;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

   
    
    .el-main {
        /* background-color: #E9EEF3; */
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
   
    /* 头部设置 */
    .header {
        display: flex;
        justify-content: space-around;
        position: relative;
    }
    .header .head_left {
        width: 300px;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background: blue;
        color: hotpink;
        display: flex;
        justify-content: space-between;
    }
     
    .header .head_left .el-icon-sunny,.el-icon-cloudy {
        font-size: 34px;
        margin: 10px;
    }
    .header .head_left span {
        margin-top: 0px ;
        margin-right: 30px;
    }
    .header_btn {
        position: absolute;
        left: 30%;
        line-height: 66px;
    }
    .header_btn span {
        color: green;
        cursor: pointer;
        font-size: 30px;
    }
    .header .head_right {
        width: 400px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        position: absolute;
        right: 0px;
    }
    .zhuce .icon-zhuce {
        font-size: 38px;
        color: blue;
    }
    .userInfo  .userImg{
        margin-right: 4px;
        border-radius: 50%;
        height: 40px;
    }
    .userInfo {
        display: flex;
        justify-content: space-between;
    }
    .exit span{
        font-size: 34px;
        margin-top: 14px;
    }
</style>

<style >
    .header .head_left .el-input__inner {
        width: 100px;
        background: hotpink;
        color: green;
        /* margin-right: 20px; */
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 100%;
        min-height: 400px;
    }
    .home .el-menu-vertical-demo {
        height: 600px;
        background: rgba(168, 155, 214, 0.534);
    }
    
</style>