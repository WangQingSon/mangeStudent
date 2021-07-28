// 引入get、post方法
import {get,post} from "../request/https"


// 获取天气接口
export function getWeath(city) {
    return get({url:'/weather/getWeather',params:{city}})
}
// 登入接口
export function postLogin(username,password) {
    return post({url:'/users/login',params:{username,password}})
}
// 验证码接口 
export function getCaptch() {
    return get({url:'/users/getCaptcha'})
}
// 校验验证码接口
export function checkCaptch(captch) {
    return get({url:'/users/verifyCaptcha',params:{captch}})
}
// 用户注册接口(仅root)  roles 否必填
export function postRegister(username,password,phone,nickname) {
    return post({url:'/users/register',params:{username,password,phone,nickname}})
}
// 获取用户权限(侧边栏菜单)
export function getMenuList() {
    return get({url:'/permission/getMenuList'})
}
//获取登入日志
export function getLoginLog() {
    return get({url:'/getloginlog'})
}
//修改用户名密码(此后台接口可以请求，但是没权限修改用户名和密码)
export function postChangePassword(username,oldPassword,newPassword,token) {
    return post({url:'/users/updatePassword',params:{username,oldPassword,newPassword,token}})
}
// 获取学员信息
export function getStudentsInfo() {
    return get({url:'/students/getstulist'})
}
// 搜索学员信息
export function getSearchStudentsInfo(key) {
    return get({url:'/students/searchstu',params:{key}})
}
//新增学员
export function postAddStudent(params) {
    return post({url:'/students/addstu',params})
}
// 编辑学员
export function postEditStudent(params) {
    return post({url:'/students/updatestu',params})
}
// 删除学员
export function getDeleteStudent(sId) {
    return get({url:'/students/delstu',params:{sId}})
}
// 上传学员头像
export function postUploadStudentImg(headimgurl) {
    return post({url:'/students/uploadStuAvatar',params:{headimgurl}})
}