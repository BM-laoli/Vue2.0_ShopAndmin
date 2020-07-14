<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form class="searchForm" ref="form" :model="searchForm" label-width="80px">
          <el-form-item label="商户ID/名称:">
            <el-input v-model="searchForm.data.orderName"></el-input>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="searchForm.data.orderNumber"></el-input>
          </el-form-item>
          <el-form-item label="配送方式:">
            <el-select v-model="searchForm.data.distribution" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单日期:">
            <el-date-picker
              v-model="searchForm.data.orderDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="searchForm.data.phone"></el-input>
          </el-form-item>
          <span class="searchBtns">
            <el-button type="primary">查询</el-button>
            <el-button type="success">重置</el-button>
          </span>
        </el-form>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="全部" name="first">
            <order-table :orderData="orderData"></order-table>
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
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import OrderTable from "@/components/order/order-table.vue";
import { orderMock } from "@/api/mock/test";
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
      orderData: []
    };
  },
  components: {
    breadCrumbs,
    OrderTable
  },
  async mounted() {
    const {
      data: { data }
    } = await orderMock();
    this.orderData = data.array;
    console.log(data);
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
  background-color: pink;
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