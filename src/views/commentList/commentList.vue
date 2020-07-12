<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <!-- 查询区域start -->
    <el-card class="box-card">
      <el-form
        :rules="findFormRules"
        ref="findFormRef"
        :model="findForm"
        label-width="100px"
        inline
      >
        <el-form-item
          label="用户ID/昵称"
          style="margin:0 120px 0 0"
          prop="username"
        >
          <el-input v-model="findForm.id"></el-input>
        </el-form-item>
        <el-form-item
          label="推广收益筛选"
          style="margin:0 120px 0 0"
          prop="date"
        >
          <el-date-picker
            v-model="findForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <div style="margin-left:800px; margin-top:20px">
          <span style="line-height:35px">
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="info" size="mini" style="margin-left:30px"
              >重置</el-button
            >
          </span>
        </div>
      </el-form>
    </el-card>
    <!-- 查询区域end -->

    <!-- 推广人数 店铺数展示start -->
    <div style="margin-left:40px">
      <span>推广人数量： {{ userCount }}</span
      ><span style="margin-left:50px">推广店铺总数： {{ shopCount }}</span>
    </div>
    <!-- 推广人数 店铺数展示end -->

    <el-card class="box-card">
      <el-table :data="list" style="width: 100%" :border="false">
        <el-table-column prop="id" label="用户ID" width="350">
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="300">
        </el-table-column>
        <el-table-column prop="phone" label="推广人联系电话" width="300">
        </el-table-column>
        <el-table-column prop="tgCount" label="推广数量" width="300">
        </el-table-column>
        <el-table-column prop="earnings" label="推广收益" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">推广详情</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
export default {
  name: "CommentList",
  components: {
    breadCrumbs
  },
  data() {
    return {
      findForm: {}, // 查询推广用户表单
      findFormRules: {}, // 验证查询参数表单
      userCount: 0, // 推广人数量
      shopCount: 0, // 推广店铺总数
      list: [
        {
          id: 1654485,
          nickName: "奥利给",
          phone: "13688888888",
          tgCount: 100,
          earnings: 20000
        }
      ] // 推广人列表
    };
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
}
::v-deep .el-table__header-wrapper {
  border: 3px solid #000;
  border-radius: 10px;
  width: 100%;
}
::v-deep .el-table td {
  border: 0;
}
</style>