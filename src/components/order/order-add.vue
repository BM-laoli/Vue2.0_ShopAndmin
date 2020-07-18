<template>
  <div class="box">
    <el-drawer class="drawerBox" title="新增订单" :visible.sync="drawer" direction="rtl">
      <el-form ref="addFormRef" :model="formData.data" label-width="100px">
        <el-form-item prop="shopid" label="商户列表:">
          <el-select
            filterable
            clearable
            v-model="formData.data.shopid"
            placeholder="请选择"
            @change="chooseShop"
            @clear="clearShop"
          >
            <el-option v-for="v in shopListOptions" :key="v.id" :label="v.value" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品列表:">
          <el-select
            filterable
            clearable
            v-model="formData.chooseCommodity"
            multiple
            placeholder="请选择"
            @change="chooseProduct"
          >
            <el-option v-for="v in productOptions" :key="v.id" :label="v.value" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="delivery_price" label="商品数量:" class="productCount" v-if="countStatus">
          <div class="product-list" v-for="(v,i) in formData.data.delivery_price" :key="i">
            <span>{{v.value}}</span>
            <el-input-number controls-position="right" v-model="v.count"></el-input-number>
          </div>
        </el-form-item>
        <el-form-item prop="total" label="商品总价:">
          <el-input v-model.number="formData.data.total" class="commodityTotal"></el-input>
        </el-form-item>
        <el-form-item prop="receipt_message" label="收货信息:">
          <el-input v-model="formData.data.receipt_message.location" class="location"></el-input>
        </el-form-item>
        <el-form-item prop="package" label="订单状态:">
          <el-select v-model="formData.data.package" placeholder="请选择">
            <el-option v-for="(v,i) in statusArray" :key="i" :label="v" :value="i"></el-option>
          </el-select>
        </el-form-item>
        <div class="addBtns">
          <el-button type="primary" @click="postData">添加</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { getAllShopList, getProducts, addOrder } from "@/api/shops/order.js";
export default {
  name: "OrderAdd",
  data() {
    return {
      drawer: false,
      formData: {
        chooseCommodity: [],
        data: {
          cid: "5f0f1f1f2fcab04b0459a432",
          shopid: "",
          delivery_price: [],
          total: null,
          receipt_message: {
            name: "张先生",
            phone: 18376621755,
            location: "长沙市.岳麓区.桐梓坡路.麓谷林语"
          },
          package: "",
          delivery: "到点自提",
          delivery_price: 10,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          status: {
            is_pay: "1",
            is_self_mention: false,
            is_delivery: false,
            is_comfort: false,
            is_ship: false,
            is_get_ship: false,
            is_after_sale: false,
            is_cancel: false,
            is_cancel_confirm: false
          }
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
      countStatus: false
    };
  },
  methods: {
    checkDrawer() {
      this.drawer = true;
    },
    resetForm() {
      this.countStatus = false;
      this.formData.chooseCommodity = [];
      this.$refs.addFormRef.resetFields();
    },
    // 选择商户触发事件
    chooseShop(v) {
      if (v) {
        this.productOptions = [];
        this.getProduct(v);
      }
    },
    // 请求商户中的商品请求
    async getProduct(id) {
      const { data: res } = await getProducts(id);
      console.log(res);
      res.records.forEach(v =>
        this.productOptions.push({ id: v._id, value: v.name, count: 1 })
      );
    },
    // 选中商品的事件
    chooseProduct(ids) {
      this.countStatus = false;
      this.formData.data.delivery_price = [];
      var arr = [];
      ids.forEach(id => {
        // 这里的choose还是老地址
        const choose = this.productOptions.find(v => {
          return v.id === id;
        });
        // choose.count = 1;
        arr.push(choose);
      });
      this.formData.data.delivery_price = arr;
      this.countStatus = true;
    },
    // 清除商户事件
    clearShop() {
      this.productOptions = [];
      this.formData.chooseCommodity = [];
    },
    // 添加手工单据事件
    async postData() {
      try {
        const { data: res } = await addOrder(this.formData.data);
        console.log(res);
        this.resetForm();
        this.drawer = false;
        this.$emit("reset");
        this.$message.success("添加成功");
      } catch (err) {
        this.$message.error("添加失败");
      }
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
