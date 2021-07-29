<template>
    <div class="Attendance">
        <h1>考勤管理</h1>

         <vue-qr 
         :text="downloadData.url" 
         :margin="0" 
         colorDark="#f67b29" 
         colorLight="#fff" 
         :logoSrc="downloadData.icon" 
         :logoScale="0.3" 
         :size="200"></vue-qr>
    </div> 
    
</template>


<script>
import vueQr from 'vue-qr'
export default {
   components:{
       vueQr
   },
   data(){
        return{            
            downloadData: {
                url: 'https://www.baidu.com/',
                icon: require('../../../assets/imgs/真实伤害_亚索.jpg')
            }
        }
    },
    mounted () {
     
    },
    methods:{
        
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
