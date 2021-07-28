<template>
    <div class="Welcome">
        <div class="table">
            <el-table
                :data="tableData"
                :cell-style='cellStyle'
                :header-cell-style='headerStyle'
                border
                style="">
                <el-table-column
                prop="ip"
                label="ip地址"
                width="180">
                </el-table-column>
                <el-table-column
                prop="username"
                label="登录名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="lastLoginTime"
                label="上次登录时间">
                </el-table-column>
                <el-table-column
                prop="nowLoginTime"
                label="本次登录时间">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>
import {getLoginLog} from '@/api/home'
export default {
    data () {
        return {
            tableData: [],
            //单元格样式
            cellStyle:{
               'text-align':'center' ,
            },
            headerStyle:{
                'text-align':'center' ,
                'line-height':'20px',
                'font-size':'20px'
            }
        }
    },
    methods:{
        // 获取登入日志
        getLoginLogM () {
            getLoginLog().then( res => {
               res.data.forEach( ele => {
                   ele.ip = ele.lastLogin.ip
                   ele.lastLoginTime = ele.lastLogin.loginTime
                   ele.nowLoginTime = ele.nowLogin.loginTime
               })
               this.tableData = res.data
            })
        },
    },
    mounted () {
        this.getLoginLogM()
    }
}
</script>

<style scoped>
    .Welcome {
        padding: 30px;
    }
</style>