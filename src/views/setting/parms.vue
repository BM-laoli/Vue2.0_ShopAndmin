<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
          
      </div>

      <div class="border-middleware">
          
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        
      </div>
      
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
  export default {
    components: {
      breadCrumbs,
    },  
  }
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color:#e6e6fa;
  width: 60%;
  border-radius: 10px;
  .box {
    margin-left: 50px;
    margin-top: 20px;

    input {
      width: 30px;
      height: 20px;
      margin: 0 10px;
    }
  }
}
.tabbe-box {
  width: 100%;
  height: 1000px;
  background-color: cornflowerblue;
}

.border-middleware {
  width: 100%;
  height: 80px;
  background-color: yellowgreen;
  margin: 10px 0;
}
</style>
