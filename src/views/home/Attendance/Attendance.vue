<template>
    <div class="Attendance">
        <!-- <h1>考勤管理</h1> -->
        <!-- 承载二维码容器 -->
        <div class="wx_dialog_toiast_delltet" id="login_container"></div>
        <div class="wx_dialog_button_delete" @click="close_wchat_qrcode">
            <i class="el-icon-close" style="font-size: 26px"></i>
        </div>
    </div> 
    
</template>


<script>
export default {
   data(){
        return{            
            Wechat_authorized_login:false,
        }
    },
    mounted () {
        this.get_wx_qrcode();   //获取微信的登录二维码
    },
    methods:{
        //点击微信登陆
        wechatLogin(){
            this.Wechat_authorized_login = true
        },
        get_wx_qrcode(){
            //从微信的开发文档不难看出回调域名需要经过encodeURIComponent处理
            var obj = new WxLogin({
                self_redirect: false,  //值为true时，直接在二维码的弹窗中进行页面跳转及其余操作,
                id: "login_container",       //需要承载二维码的容器id  
                appid: "你的appid",
                scope: "snsapi_login",     //网页授权，目前网页只有这一种方式，静默授权
                redirect_uri: encodeURIComponent('http://localhost:8080/loginSuccess'),     //回调域名(地址前部分是项目域名，后部分loginSuccess是微信需要跳转的路径（vue中的路由名称）)
                state: Math.random(),
                style: "white",
                href: "",
            });
        },
        close_wchat_qrcode(){
            this.Wechat_authorized_login = false;
            this.get_wx_qrcode();
        }
    }
}
</script>

<style scoped>
.wx_dialog_toiast {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 9854647;
    background: rgba(0, 0, 0, 0.2);
    display:flex;
    justify-content:center;
    align-items:center;
}
.wx_dialog_toiast_delltet {
    width: 500px;
    height: 500px;
    background: #606266;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wx_dialog_button_delete {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
    

</style>
