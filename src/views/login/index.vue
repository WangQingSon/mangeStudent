<template>
  <div class="login">
      <div class="form">
        <h1>后台管理系统</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="username" >
            <el-input type="input" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="captcha" >
            <div class="yzm">
              <el-input v-model="ruleForm.captcha" style="width:200px;" @keydown.enter.native="submitForm()"></el-input>
              <span v-html="captchaRes" @click="reCap()"></span>
            </div>
          </el-form-item>
          <el-form-item class="form_btn">
            <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="switchLoginMethod">
           <svg class="switchIcon" aria-hidden="true" @click="switchMethod">
                    <use :xlink:href="isQrCode==true ? '#icon-erweima' : '#icon-diannao'"></use>
           </svg>
           
        </div>
      </div>
      <div class="qrCode" v-show="isQrCode">
             <img :src="qrImgurl" alt="" >
             <h3>请使用微信扫码登录</h3>
      </div>
  </div>
</template>

<script>
import  {getWeath,postLogin,getCaptch,checkCaptch,getMenuList,getQrCode,getWechatLogin}  from  "@/api/home"
//引入二维码生成插件
import qr from "qrcode";
//引入socket.io客户端
import io from "socket.io-client";
export default {
  name: "login",
  components: {
  
  },
  data () {
    var checkCaptcha = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        } else if (value.length != 5) {
          return callback(new Error('验证码长度不对'))
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      return {
        // 控制二维码是否显示
        isQrCode:false,
        // 二维码
        qrImgurl:'',
        // 验证码
        captchaRes:'',
        // 表单数据
        ruleForm: {
          username: '',
          password: '',
          captcha: ''
        },
        // 表单校验
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          captcha: [
            { validator: checkCaptcha, trigger: 'blur' }
          ]
        }
      };
  },
  methods:{
    // 控制二维码显示
    switchMethod () {
       if(this.isQrCode == false) {
         this.isQrCode = true
       } else {
         this.isQrCode = false
       }
    },
    // 重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    // 获取天气
    getWeathM () {
      getWeath().then( res => {
        console.log(res.data);
      })
    },
     // 获取侧边栏菜单
    getMenuListM () {
      getMenuList().then( res => {
        console.log(res.data);
      })
    },
    // 获取验证码
    getCaptchM () {
      getCaptch().then( res => {
        this.captchaRes = res.img
      })
    },
    // 获取二维码
    getQrCodeM () {
      getQrCode().then( res => {
        let qrUrl = res.scanCodeUrl
        qr.toDataURL(qrUrl,(err,imgUrl) => {
          if(err) throw err;
          this.qrImgurl = imgUrl
        })
      })
    },
    // 微信登入接口
    getWechatLoginM (wechatCode) {
       getWechatLogin (wechatCode).then( res => {
         console.log(res);
         if(res.token) {
           localStorage.setItem('qf_token',res.token)
           localStorage.setItem('qf_nickName',res.userInfo.nickname)
           sessionStorage.setItem('permission',res.permission.buttons)
           this.$store.commit('SET_USERINFO',res.userInfo)
           this.$router.push('/Welcome')
         } 
       })
    },
    // 校验验证码
    checkCaptchM () {
      let captcha = this.ruleForm.captcha
     checkCaptch(captcha).then( res => {

      })
    },
    // 登陆接口
    postLoginM () {
      let username = this.ruleForm.username
      let password = this.ruleForm.password
      const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
      //调接口
      postLogin(username,password).then( res => {
          console.log(res);
           // 拼命加载中
          setTimeout(() => {
            loading.close();
          }, 2000);
         if(res.token) {
            // localStorage.setItem('csToken',res.token)
           localStorage.setItem('qf_token',res.token)
           localStorage.setItem('qf_nickName',res.userInfo.nickname)
           sessionStorage.setItem('permission',res.permission.buttons)
           this.$store.commit('SET_USERINFO',res.userInfo)
           this.$router.push('/Welcome')

           this.$message({
            showClose: true,
            message: '恭喜您，登录成功鸭！',
            type: 'success'
          },1000);
         } else {
           this.$message({
            showClose: true,
            message: '用户名或密码错误！！！',
            type: 'error'
          },1000);
         }
      })
    },
    // 刷新验证码 
    reCap () {
      this.getCaptchM()
    },
    // 登录按钮
    submitForm() {
      if(this.ruleForm.captcha == '' || this.ruleForm.username == '' || this.ruleForm.password == '') {return this.$message({message:'一项都不能为空哦~'},1000)}
      this.checkCaptchM ()
      this.postLoginM()
    }
  },
  watch:{
    isQrCode(nval) {
      if(nval === true) { // 如果是扫码登录
        let socket = io('ws://chst.vip')
        // 连接成功触发
        socket.on('connect',() => {
          console.log('连接成功');
          // 获取二维码
          this.getQrCodeM()
        })
        // 扫码成功时触发
        // console.log(socket);
        socket.on('scancodeSuccess',(data) => {
          let wechatCode = data.wechatCode
          this.getWechatLoginM(wechatCode)
        })
      }
    }
  },
  mounted () {
    // this.getWeathM()
    this.getCaptchM()
    this.getQrCodeM()
    // this.checkCaptchM()
  }

};
</script>

<style scoped>
   .login {
     height: 100%;
     background:url('../../assets/imgs/真实伤害_亚索.jpg');
     position: relative;
   }
   .form {
     width: 600px;
     height: 400px;
     position: absolute;
     right: 3%;
     top: 25%;
     box-shadow: 10px 10px 5px #000;
     background: rgba(0, 0, 0, 0.7);
    
   }
   .form .switchLoginMethod {
     position: absolute;
     z-index: 10;
     top: 0px;
     right: 0px;
   }
   .form .switchLoginMethod .switchIcon {
     cursor: pointer;
     width: 50px;
     height: 50px;
   }
   .qrCode {
     width: 600px;
     height: 400px;
     position: absolute;
     right: 3%;
     top: 25%;
     background:url('../../../src/assets/imgs/iu.jpg') no-repeat; 
     background-size: cover;
   }
   .qrCode img {
     position: absolute;
     top: 30%;
     left: 35%;
     width: 170px;
     height: 170px;
   }
   .qrCode h3 {
     margin-left: 207px;
     margin-top: 70px;
   }
    .label {
     color: hotpink;
   }
   .form h1 {
     margin-left: 35%;
     color: hotpink;
   }
   .form .form_btn {
     margin-left: 20%;
   }
   .yzm {
     position: relative;
   }
   .yzm .el-input {
     top: -18px;
   }
   .yzm span {
    display: inline-block;
    border-radius: 10%;
    background: hotpink;
    margin-left: 20px;
    cursor: pointer;
   }
</style>

<style >
  .login .form .el-form-item__label {
    color: hotpink;
  }
  .login .form .el-form-item__content .el-button--primary  {
    background: green;
    color: hotpink;
  }
  .login .form .el-input__inner {
    width: 370px;
    background: rgba(0, 0, 0, 0.7);
  }
  .login .form  .yzm .el-input__inner{
    width: 200px;
  }
  .login .form .el-form-item__content .el-button--default {
    background: green;
    color: red;
  }
</style>
 
