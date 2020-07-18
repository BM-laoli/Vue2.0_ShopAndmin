<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form class="searchForm" ref="searchFormRef" :model="searchForm.data" label-width="80px">
          <el-form-item label="商户ID/名称:" prop="orderName">
            <el-input v-model="searchForm.data.orderName"></el-input>
          </el-form-item>
          <el-form-item label="订单号:" prop="orderNumber">
            <el-input v-model="searchForm.data.orderNumber"></el-input>
          </el-form-item>
          <el-form-item label="配送方式:" prop="distribution">
            <el-select v-model="searchForm.data.distribution" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单日期:" prop="orderDate">
            <el-date-picker
              v-model="searchForm.data.orderDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="searchForm.data.phone"></el-input>
          </el-form-item>
          <span class="searchBtns">
            <el-button type="primary">查询</el-button>
            <el-button type="info" @click="formReset">重置</el-button>
            <el-button type="success" @click="addOrder">手工订单</el-button>
          </span>
        </el-form>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="全部" name="first">
            <order-table
              :orderData="orderData"
              @changeSize="($event)=>{parmas.size=$event}"
              @changeCurrent="($event)=>{parmas.page=$event}"
              @changeStatus="changeStatus($event)"
            ></order-table>
          </el-tab-pane>
          <el-tab-pane label="待支付" name="second">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="待自提" name="third">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="待配送" name="fourth">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="five">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="已收货" name="six">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="售后退款" name="seven">
            <order-table></order-table>
          </el-tab-pane>
          <el-tab-pane label="已取消" name="eight">
            <order-table></order-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 手工订单模态框 -->
      <order-add ref="orderAddRef"></order-add>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import OrderTable from "@/components/order/order-table.vue";
import OrderAdd from "@/components/order/order-add.vue";
import { orderMock } from "@/api/mock/test";
import { getOrder } from "@/api/shops/order.js";
export default {
  name: "OrderList",
  data() {
    return {
      searchForm: {
        data: {
          orderName: "",
          orderNumber: "",
          distribution: "",
          orderDate: "",
          phone: ""
        },
        rules: []
      },
      activeName: "first",
      orderData: {},
      parmas: {
        size: 10,
        page: 1
      }
    };
  },
  components: {
    breadCrumbs,
    OrderTable,
    OrderAdd
  },
  methods: {
    formReset() {
      console.log(this.$refs.searchFormRef);
      this.$refs.searchFormRef.resetFields();
    },
    addOrder() {
      this.$refs.orderAddRef.checkDrawer();
    },
    async init() {
      const { data: res } = await getOrder(this.parmas);
      this.orderData = res;
    },
    // 修改本条数据的状态
    changeStatus(e) {
      const data = this.orderData.records.find(v => v._id === e.id);
      data.package = e.package;
    }
  },
  mounted() {
    this.init();
    this.$watch(
      "parmas",
      () => {
        this.init();
      },
      {
        deep: true
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  padding: 8px;
}
::v-deep.hedaer-box {
  width: 100%;
  background-color: #fff;
  .searchForm {
    .el-form-item {
      margin: 16px;
      display: inline-block;
      .el-form-item__label {
        width: auto !important;
      }
      .el-form-item__content {
        margin-left: 94px !important;
      }
    }
    .searchBtns {
      margin-left: 50px;
    }
  }
}
.tabbe-box {
  width: 100%;
  height: auto;
}

.border-middleware {
  width: 100%;
  height: 80px;
  background-color: yellowgreen;
  margin: 10px 0;
}
</style>