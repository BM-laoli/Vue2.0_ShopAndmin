<template>
  <div class="box">
    <el-drawer class="drawerBox" title="新增订单" :visible.sync="drawer" direction="rtl">
      <el-form ref="addFormRef" :model="formData.data" label-width="100px">
        <el-form-item prop="chooseCommercial" label="商户列表:">
          <el-select
            filterable
            clearable
            v-model="formData.data.chooseCommercial"
            placeholder="请选择"
            @change="chooseShop"
          >
            <el-option v-for="v in shopListOptions" :key="v.id" :label="v.value" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="chooseCommodity" label="商品列表:">
          <el-select
            filterable
            clearable
            v-model="formData.data.chooseCommodity"
            multiple
            placeholder="请选择"
            @blur="chooseProduct"
          >
            <el-option v-for="v in productOptions" :key="v.id" :label="v.value" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="counts" label="商品数量:" class="productCount">
          <div class="product-list" v-for="(v,i) in chooseProducts" :key="i">
            <span>{{v.value}}</span>
            <el-input-number v-model="formData.data.counts" :min="1" :max="10"></el-input-number>
          </div>
        </el-form-item>
        <el-form-item prop="total" label="商品总价:">
          <el-input v-model="formData.data.total" class="commodityTotal"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="收货信息:">
          <el-input v-model="formData.data.location" class="location"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="订单状态:">
          <el-select v-model="formData.data.status" placeholder="请选择">
            <el-option v-for="(v,i) in statusArray" :key="i" :label="v" :value="i"></el-option>
          </el-select>
        </el-form-item>
        <div class="addBtns">
          <el-button type="primary">添加</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { getAllShopList, getProducts } from "@/api/shops/order.js";
export default {
  name: "OrderAdd",
  data() {
    return {
      drawer: false,
      formData: {
        data: {
          chooseCommercial: "",
          chooseCommodity: [],
          counts: "",
          total: null,
          location: "",
          status: ""
        }
      },
      statusArray: [
        "待支付",
        "已支付待配送",
        "待发货",
        "已发货",
        "已收货",
        "确认收货",
        "申请退款",
        "已退款",
        "已取消",
        "订单完成"
      ],
      shopListOptions: [],
      productOptions: [],
      chooseProducts: []
    };
  },
  methods: {
    checkDrawer() {
      this.drawer = true;
    },
    resetForm() {
      this.$refs.addFormRef.resetFields();
    },
    // 选择商户触发事件
    chooseShop(v) {
      this.getProduct(v);
    },
    // 请求商户中的商品请求
    async getProduct(id) {
      const { data: res } = await getProducts(id);
      res.records.forEach(v =>
        this.productOptions.push({ id: v._id, value: v.name })
      );
    },
    // 选中商品的事件
    chooseProduct(ids) {
      ids.forEach(id => {
        console.log(
          this.productOptions.find(v => {
            return v.id === id;
          })
        );
      });
    }
  },
  async created() {
    const { data: res } = await getAllShopList();
    console.log(res.records);
    res.records.forEach(v => {
      this.shopListOptions.push({ id: v._id, value: v.shop_name });
    });
  }
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
  text-align: center;
  margin-top: 50px;
}
::v-deep .productCount {
  .el-form-item__content {
    .product-list {
      display: flex;
      justify-content: space-around;
      margin-bottom: 15px;
    }
  }
}
</style>
