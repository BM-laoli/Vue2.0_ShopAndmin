<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <h1>在是一个模板页面</h1>
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
  background-color:	#E6E6FA;
}

</style>