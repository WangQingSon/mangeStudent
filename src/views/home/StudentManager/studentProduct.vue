<template>
    <div class="studentProduct">
        <div class="editContain">
            <!-- 搜索区域 -->
            <div class="selectStudents">
                <!-- 搜索 -->
                <el-input v-model="selectValue" @blur="selectStudentsFn(selectValue)" @focus="getStudentsInfoM" placeholder="请输入学生姓名"></el-input>
                <!-- 新增 -->
                <el-button type="primary" @click="addStudent" v-has="'add'" class="el-icon-circle-plus-outline"></el-button>
            </div>
        </div>
        <div class="showContain">
            <div class="excel">
                <svg class="icon" aria-hidden="true" @click="exportExcel('all')">
                    <use xlink:href="#icon-excel"></use>
                </svg>
                 <svg class="iconSmall" aria-hidden="true" @click="exportExcel">
                    <use xlink:href="#icon-excel"></use>
                </svg>
            </div>
            <el-table
                :data="studentsData.slice((page-1)*size,page*size)"
                :cell-style='cellStyle'
                :header-cell-style='headerStyle'
                style="width: 100%">
                    <el-table-column
                        label="头像"
                        width="180">
                        <template slot-scope="scope">
                            <img v-show="scope.row.headimgurl == '' ? false :true " :src="scope.row.headimgurl"  style="width:50px;height:50px">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄">
                    </el-table-column>
                    <el-table-column
                        prop="class"
                        label="班级">
                    </el-table-column>
                    <el-table-column
                        prop="degree"
                        label="学历">
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="自我评价">
                    </el-table-column>
                     <el-table-column
                        prop="productUrl"
                        label="项目地址">
                    </el-table-column>
                    <el-table-column
                        width="300"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="readStudent(scope.row)" type="primary "  size="small" icon="el-icon-view"></el-button>
                           <el-button @click="editStudent(scope.row)" type="primary " v-has="'edit'"  size="small" icon="el-icon-edit"></el-button>
                           <el-button @click="deleteStudent(scope.row.sId)" type="danger"  v-has="'delet'" size="small" icon="el-icon-delete"></el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <div class="paging">
                <el-pagination
                background
                :current-page="page"
                :page-size="size"
                @size-change="sizeChange"
                @current-change="currentChange"
                layout="prev, pager, next"
                :total="studentsData.length">
                </el-pagination>
            </div>
        </div>
         <add-student :showDialog="showDialog" @showCtrlDialog="showCtrlDialog"></add-student>
         <edit-student :editData="editData" @showCtrlEditDialog="showCtrlEditDialog"></edit-student>
    </div>
</template>

 <script>
 import qee from "qf-export-excel" // 此为excel导出插件
 import {getStudentsInfo,getSearchStudentsInfo,getDeleteStudent} from "@/api/home"
 import addStudent from '../addStudent/index.vue'
 import editStudent from '../editStudent/index.vue'
    export default {
      components:{
        addStudent,
        editStudent
      },
      data() {
        return {
          //分页实现
          page:1,  //当前页
          size:5,  //每页条数
          // 控制新增弹窗
            showDialog:false,
          // 控制编辑弹窗
          editData:{
            showEditDialog:false, 
            editTarget:[]
          }, 
          // 搜索框加载
          loading:false,  
          //搜索学生结果
          selectStudents:[],
          //selectValue
          selectValue:'',
          //表格数据
          studentsData: [],
          // 
        //   excelexcelTitleList:[{
        //         title: '姓名',
        //         key: 'name'
        //     }, {
        //         title: '年龄',
        //         key: 'age'
        //     }, {
        //         title: '班级',
        //         key: 'class'
        //     },{
        //         title: '学历',
        //         key: 'degree'
        //     },{
        //         title: '自我评价',
        //         key: 'description'
        //     },{
        //         title: '项目地址',
        //         key: 'productUrl'
        //     },],
          //单元格样式
          cellStyle:{
            'text-align':'center' ,
          },
          //表头样式
          headerStyle:{
            'line-height':'20px',
            'font-size':'20px',
            'text-align':'center'
          }
        }
      },
      methods:{
        // 获取学员信息接口
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
        // 搜索学员信息接口
        getSearchStudentsInfoM (key) {
            getSearchStudentsInfo(key).then( res => {
                this.studentsData = res.data
            })
        },
        // 删除学员信息接口
        getDeleteStudentM(sId) {
            getDeleteStudent(sId).then( res=> {
                if(res.state === true && res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                }
            })
        },
        // 搜索学员
        selectStudentsFn(key) {
            this.getSearchStudentsInfoM(key)
            this.selectValue = ''
        },
        // 新增学员
        addStudent() {
            this.showDialog = true
        },
        // 编辑学员
        editStudent(targetStudent) {
            // console.log(targetStudent);
            this.editData.editTarget = targetStudent
            this.editData.showEditDialog = true
        },
        // 删除学员
        deleteStudent (sId) {
          this.$confirm('您确定要删除该学员信息?', '警告!', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.getDeleteStudentM(sId)
            this.getStudentsInfoM()
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        // 查看学员
        readStudent(targetStudent) {
            this.$router.push({
                query:{targetStudent},
                path:'/StudentManager/studentProfile'
            })
        },
        // 监听新增弹窗
        showCtrlDialog() {
           this.showDialog = false
        },  
        // 监听编辑弹窗
        showCtrlEditDialog() {
            this.editData.showEditDialog = false
        },
        //分页实现
        // val每页条数
        sizeChange(val) {
            this.size = val
            this.page = 1
        },
        // val当前页
        currentChange(val) {
            this.page = val
        },
        // 导出数据
        exportExcel(item) {
            console.log(item);
            let excelTitleList = [{
                title: '姓名',
                key: 'name'
            }, {
                title: '年龄',
                key: 'age'
            }, {
                title: '班级',
                key: 'class'
            },{
                title: '学历',
                key: 'degree'
            },{
                title: '自我评价',
                key: 'description'
            },{
                title: '项目地址',
                key: 'productUrl'
            },]
            // 手动定义excel头部   要导出的表格数据    表名
            if(item == 'all') {
                qee(excelTitleList,this.studentsData,'学生信息表')  //导出所有数据
            } else {
                qee(excelTitleList,this.studentsData.slice((this.page-1)*this.size,this.page*this.size),'当前页学生信息表') // 导出当前数据
            }
        
           
        }
      },
      mounted () {
         this.getStudentsInfoM()
      }
    }
  </script>

  <style scoped>
    .studentProduct {
        /* display: flex;
        flex-direction: column;
        justify-content: center; */
    }
    .studentProduct .editContain {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .studentProduct .editContain .selectStudents {
        display: flex;
        /* justify-content: center; */
    }
    .studentProduct .editContain .selectStudents .el-icon-circle-plus-outline {
        display: inline-block;
        width: 40px;
        height:40px;
        font-size: 28px;
        line-height: 10px;
        text-align: center;
        padding-right: 46px;
        margin-left: 50px;
        margin-top: 6px;
    }
    .studentProduct .showContain .excel {
        line-height: 0px;
        padding: 20px;
        position: relative;

    }
    .studentProduct .showContain .excel .icon {
        font-size: 42px;
        position: absolute;
        right: 10%;
        bottom: 30px;
        cursor: pointer;
    }
    .studentProduct .showContain .excel .iconSmall {
        width: 30px;
        height: 30px;
        font-size: 42px;
        position: absolute;
        right: 15%;
        bottom: 30px;
        cursor: pointer;
    }
    .studentProduct .showContain img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .studentProduct .showContain .paging {
        margin-top: 50px;
    }
  </style>
<style>
    .studentProduct .editContain .selectStudents .el-input {
        width: 200px;
        height: 50px;
        line-height: 50px;
    }
</style>