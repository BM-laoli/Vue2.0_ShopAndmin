<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{level.levelOne}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{level.levelTow}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      level: {
        type: Object,
        default: () => {
          return new Object()
        }
      },
    },
    created () {
    },
  }
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 20px;
  margin: 15px;
}
</style>