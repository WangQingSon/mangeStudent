<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人资料" name="first">
        <div class="personalData">
            <h1>个人资料</h1>
        </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码" name="second">
        <div class="changePassword">

           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名:" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码:" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {postChangePassword} from '@/api/home'
  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };  
       var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };  
      return {
        // tab标签
        activeName: 'second',
        ruleForm: {
          username: '',
          oldPass: '',
          newPass: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      postChangePasswordM () {
        let username = this.ruleForm.username
        let oldPassword = this.ruleForm.oldPass
        let newPassword = this.ruleForm.newPass
        let token = localStorage.getItem('qf_token')
        // console.log(username,oldPassword,newPassword,token);
        postChangePassword(username,oldPassword,newPassword,token).then( res => {
            console.log(res);
            if(res.status === '403' && res.state == false && res.code === '10026') {
                this.$message.error('抱歉，您没有权限修改此身份的用户名和密码')
            }
        })
      },
      //tab切换
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // 表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postChangePasswordM ()
          } else {
            this.$message.error('内容要输入完整再提交哦！')
            return false;
          }
        });
      },
      // 重置内容
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
        
    }
  };
</script>