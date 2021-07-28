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
      </div>
  </div>
</template>

<script>
import  {getWeath,postLogin,getCaptch,checkCaptch,getMenuList}  from  "@/api/home"

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
        // 验证码
        captchaRes:'',
        ruleForm: {
          username: '',
          password: '',
          captcha: ''
        },
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
  mounted () {
    // this.getWeathM()
    this.getCaptchM()
    
    // this.checkCaptchM()
  }

};
</script>

<style scoped>
   .login {
     height: 100%;
     /* background:url('../../assets/imgs/真实伤害_亚索.jpg'); */
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
 
