<template>
  <div id="app">
    
    <router-view />
  </div>
</template>
<script>
//   //在页面加载时读取sessionStorage里的状态信息
// if (sessionStorage.getItem("store") ) {
//  this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))     
// } 
// //在页面刷新时将vuex里的信息保存到sessionStorage里
// window.addEventListener("beforeunload",()=>{
//   sessionStorage.setItem("store",JSON.stringify(this.$store.state))
// })
 export default {
   mounted () {
    
   }
 }
</script>
<style>
  html,body,#app{
    height: 100%;
  }
  .icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
