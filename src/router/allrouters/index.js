// 首先引入路由数据源(组件)
import Attendance from "../../views/home/Attendance/Attendance.vue"
import Mine from "../../views/home/Mine/Mine.vue"
import Users from "../../views/home/Users/Users.vue"
import Statistics from '../../views/home/Statistics/Statistics.vue'
import Welcome from '../../views/home/Welcome/Welcome.vue'
import StudentManager from "../../views/home/StudentManager/index.vue"
import studentProduct from '../../views/home/StudentManager/studentProduct.vue'
import studentDormitory from '../../views/home/StudentManager/studentDormitory.vue'
import studentProfile from '../../views/home/StudentManager/studentProfile.vue'


const allRoutes = [{
    path: 'Welcome',
    name: 'Welcome',
    component: Welcome,
    //数据缓存区
    meta: {
        name: '管理首页', //菜单名
        icon: 'el-icon-s-shop', //菜单图标类名
        fullPath: "/Welcome"
    }
},
{
    path: 'StudentManager',
    name: 'StudentManager',
    redirect: "/StudentManager/studentProduct",
    component: StudentManager,
    meta: {
        name: '学员管理',
        icon: 'el-icon-menu'
    },
    children: [{
            path: 'studentProduct',
            name: 'studentProduct',
            component: studentProduct,
            meta: {
                name: '学员项目管理',
                icon: 'el-icon-folder-opened',
            },
        },
        {
            path: 'studentProfile',
            name: 'studentProfile',
            component: studentProfile,
            meta: {
                name: '学员资料',
                icon: 'el-icon-document'
            }
        },
        {
            path: 'studentDormitory',
            name: 'studentDormitory',
            component: studentDormitory,
            meta: {
                name: '学员宿舍',
                icon: 'el-icon-s-home'
            }
        }
    ]
},
{
    path: 'Attendance',
    name: 'Attendance',
    component: Attendance,
    meta: {
        name: '考勤管理',
        icon: 'el-icon-thumb'
    }
},
{
    path: 'Users',
    name: 'Users',
    component: Users,
    meta: {
        name: '用户管理',
        icon: 'iconfont icon-yonghu'
    }
},
{
    path: 'Statistics',
    name: 'Statistics',
    component: Statistics,
    meta: {
        name: '数据统计',
        icon: 'el-icon-pie-chart'
    }
},
{
    path: 'Mine',
    name: 'Mine',
    component: Mine,
    meta: {
        name: '我的中心',
        icon: 'iconfont icon-wode'
    }
}
]
  
export default allRoutes