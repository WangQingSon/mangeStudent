<template>
    <div class="studentProfile">
        <h1>学员资料</h1>
        <img :src="studentInfo == undefined ? '' : studentInfo.headimgurl" alt="">
        <!-- <h1>{{studentInfo. headimgurl}}</h1> -->
    </div>
</template>


<script>
export default {
    data () {
        return {
            // 学生信息
            studentInfo:{}
        }
    },
    mounted () {
        // console.log(this.$route.query);
        this.studentInfo = this.$route.query.targetStudent
        console.log(this.studentInfo);
    }
}
</script>