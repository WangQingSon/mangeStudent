<template>
    <div class="register">
        <el-dialog
        title="注册用户"
        :visible.sync="dialogVisible"
        @close='handleClose'
        width="30%"
        center>
            <div class="form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名：" prop="username">
                        <el-input type="input" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="手机号：" prop="phone" >
                        <el-input v-model.number="ruleForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称:" prop="nickName">
                        <el-input v-model="ruleForm.nickName"></el-input>
                    </el-form-item>
                </el-form>
            </div>



            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose('ruleForm')">取 消</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="register()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>

<script>
import {postRegister} from "@/api/home"
export default {
    name:'register',
    props:['showDialog'],
    data() {
      // 用户名校验
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      // 密码校验
      var validatePassword = (rule, value, callback) => {
        if (value === '' ) {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      // 手机号校验
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } 
        else if (!(/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/).test(value)) {
            callback(new Error('请输入正确格式的手机号'))
        } 
        else {
          callback();
        }
      };
      // 昵称校验
      var validateNickName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
        return {
            // 控制弹窗开关
            dialogVisible: false,
            // 表单校验数据
            ruleForm: {
                username: '',
                password: '',
                phone: '',
                nickName:'',
            },
            // 表单校验规则
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                nickName: [
                    { validator: validateNickName, trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        // 注册接口
        postRegisterM () {
            let username = this.ruleForm.username
            let password = this.ruleForm.password
            let phone = this.ruleForm.phone
            let nickName = this.ruleForm.nickName
            postRegister(username,password,phone,nickName).then( res => {
                if (res.state === true && res.status === 1) {
                    this.$message.success('恭喜你，注册成功！');
                } else {
                    console.log(res);
                    this.$message.error('对不起，用户已注册');
                }
                
            })
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 关闭弹窗
        handleClose(formName) {
            // 若用户为点重置按钮则进行清空
            if (formName != undefined) {
                this.$refs[formName].resetFields();
            }
            this.$emit('showCtrlDialog')
        },
        // 提交数据
        register () {
            this.postRegisterM  ()
            this.handleClose()
        }
    },
    watch:{
        // 监听弹窗开关
        showDialog(nval,oval) {
            this.dialogVisible = nval
           
        }
    },
    mounted () {
       
    }
};
</script>
