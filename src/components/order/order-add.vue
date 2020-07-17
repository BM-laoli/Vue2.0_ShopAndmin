<template>
  <div class="box">
    <el-drawer class="drawerBox" title="新增订单" :visible.sync="drawer" direction="rtl">
      <el-form ref="addFormRef" :model="formData" label-width="100px">
        <el-form-item label="商户列表:">
          <el-select v-model="chooseCommercial" filterable placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品列表:">
          <el-select v-model="chooseCommodity" multiple placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品数量:">
          <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="商品总价:">
          <el-input class="commodityTotal"></el-input>
        </el-form-item>
        <el-form-item label="收货信息:">
          <el-input class="location"></el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select v-model="value" placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <div class="addBtns">
          <el-button type="primary">添加</el-button>
          <el-button type="info">重置</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "OrderAdd",
  data() {
    return {
      drawer: false,
      formData: {
        data: {
          chooseCommercial: "",
          chooseCommodity: [],
          count: ""
        }
      }
    };
  },
  methods: {
    checkDrawer() {
      this.drawer = true;
    }
  },
  async mounted() {}
};
</script>
<style lang="scss" scoped>
::v-deep .box {
  .drawerBox {
    .el-drawer__body {
      padding-left: 20px !important;
    }
  }
}
.commodityTotal {
  width: 150px;
}
.location {
  padding-right: 20px;
}
.addBtns {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
