<template>
    <div class="editStudent">
        <el-dialog
        title="编辑学员"
        :visible.sync="dialogVisible"
        @close='handleClose'
        width="30%"
        center>
            <div class="form">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.headimgurl" :src="ruleForm.headimgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="input" v-model="ruleForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄：" prop="age">
                        <el-input type="input" v-model="ruleForm.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="班级：" prop="class" >
                        <el-input v-model.number="ruleForm.class" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="城市：" prop="city" >
                        <el-input v-model.number="ruleForm.city" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学历:" prop="degree">
                        <el-input v-model="ruleForm.degree"></el-input>
                    </el-form-item>
                    <el-form-item label="自我评价：" prop="description">
                        <el-input type="input" v-model="ruleForm.description" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目地址：" prop="productUrl">
                        <el-input type="input" v-model="ruleForm.productUrl" autocomplete="off"></el-input>
                    </el-form-item>
                        <h1></h1>
                </el-form>
            </div>



            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose('ruleForm')">取 消</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="editDataFn()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { postEditStudent,getStudentsInfo} from "@/api/home"
export default {
    name:'editStudent',
    props:['editData'],
    data() {
      // 姓名校验
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      // 年龄校验
      var validateAge = (rule, value, callback) => {
        if (value === '' ) {
          callback(new Error('请输入年龄'));
        } else {
          callback();
        }
      };
      // 班级校验 
      var validateClass = (rule, value, callback) => {
        if (value === '' ) {
          callback(new Error('请输入班级'));
        } else {
          callback();
        }
      };
      // 城市校验 
      var validateCity = (rule, value, callback) => {
        if (value === '' ) {
          callback(new Error('请输入城市'));
        } else {
          callback();
        }
      };
      // 学历校验
      var validateDegree = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学历'));
        } else {
          callback();
        }
      };
      // 自我评价校验
      var validateDescription = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入自我评价'));
        } else {
          callback();
        }
      };
      // 项目地址校验
      var validateProductUrl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入项目地址'));
        } else {
          callback();
        }
      };
        return {
            // 控制弹窗开关
            dialogVisible: false,
            // 表单校验数据
            ruleForm: {
                sId:'',
                // token:localStorage.getItem('qf_token'),
                headimgurl:'',
                name: '',
                age: '',
                class: '',
                city:'',
                degree:'',
                description:'',
                productUrl:'',
            },
            // 表单校验规则
            rules: {
                name: [
                    { validator:  validateName, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ],
                class: [
                    { validator: validateClass, trigger: 'blur' }
                ],
                city: [
                    { validator: validateCity, trigger: 'blur' }
                ],
                degree: [
                    { validator: validateDegree, trigger: 'blur' }
                ],
                description: [
                    { validator: validateDescription, trigger: 'blur' }
                ],
                productUrl: [
                    { validator: validateProductUrl, trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        // 新增学员接口
         postEditStudentM () {
            let params = {
                sId:this.ruleForm.sId,
                token:localStorage.getItem('qf_token'),
                headimgurl:this.ruleForm.headimgurl,
                name:this.ruleForm.name,
                class:this.ruleForm.class,
                age:this.ruleForm.age,
                degree:this.ruleForm.degree,
                city:this.ruleForm.city,
                productUrl:this.ruleForm.productUrl,
                description:this.ruleForm.description
            }
             postEditStudent(params).then( res => {
               if(res.state === true && res.status == 200) {
                   this.$message.success('修改学员信息成功哦~')
               } else {
                   this.$message.error('添加失败，您这是啥操作')
               }
            })
        },
        // 获取学员信息
        getStudentsInfoM () {
            getStudentsInfo().then( res => {
                if(res.state && res.status == 1) {
                    // console.log(res.data);
                    this.studentsData = res.data
                } else {
                    this.$message.error('请求错误！')
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
            this.$emit('showCtrlEditDialog')
        },
        // 修改数据
        editDataFn () {
            this. postEditStudentM  ()
            this.handleClose()
            this.getStudentsInfoM()
        },
        // 头像上传
        handleAvatarSuccess(res, file) {
            this.ruleForm.headimgurl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    watch:{
        // 监听弹窗开关
        editData: {
           deep:true,
           handler:function(nval,oval) {
               this.ruleForm = nval.editTarget
               this.dialogVisible = nval.showEditDialog
           }
        }
    },
    mounted () {

    }
};
</script>

<style >
  .editStudent .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .editStudent .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .editStudent .avatar-uploader .el-upload--text {
      line-height: 50px;
  }
   .editStudent .avatar-uploader-icon {
    font-size: 80px;
    color: blue;
    width: 100px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .editStudent .el-dialog__header {
      line-height: 60px;
  }
  .editStudent .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
