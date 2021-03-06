// 根据服务器用护返回得menulist数据和allRoutes进行匹配
// import allRoutes from "../router/allrouters/index"
const recursionRoutes = (allRoutes, menuList) => {
    let userRoutes = []
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            if (item.meta.name === v.name) {
                // 如果有子路由，则再递归执行
                if (v.children && v.children.length > 0) {
                    item.children = recursionRoutes(item.children, v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}
// 测试递归函数
// let menuList = [{
//         "name": "管理首页"
//     },
//     {
//         "name": "学员管理",
//         "children": [{
//             "name": "学员项目管理"
//         }]
//     },
//     {
//         "name": "我的中心"
//     }
// ]

// console.log(recursionRoutes(allRoutes, menuList));


export default recursionRoutes