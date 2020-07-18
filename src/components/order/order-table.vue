<template>
  <div>
    <el-table :data="orderData.records" border style="width: 100%">
      <el-table-column prop="id" label="商户ID" width="110"></el-table-column>
      <el-table-column prop="name" label="商户名称" width="120"></el-table-column>
      <el-table-column prop="orderId" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderList" label="商品列表" width="120">
        <template #default="{row}">
          <div v-for="(v,i) in row.orderList" :key="i">
            <span>{{v.commodity}}</span>
            <span>*{{v.count}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="total" label="订单总金额" width="100">
        <template #default="{row}">{{row.total}}元</template>
      </el-table-column>
      <el-table-column prop="distribution" label="配送方式" width="80"></el-table-column>
      <el-table-column prop="address" label="收货地址/提货人"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{row}">
          <el-button class="checkOrder" type="text" size="small" @click="lookDetailedData">查看订单</el-button>
          <el-button
            v-if="row.orderStatus!=='已收货' && row.orderStatus!=='已取消'"
            type="text"
            size="small"
          >取消订单</el-button>
          <el-button v-if="row.orderStatus==='待发货'" type="text" size="small">确认发货</el-button>
          <el-button v-if="row.orderStatus==='待配送'" type="text" size="small">确认配送</el-button>
          <el-button v-if="row.orderStatus==='已发货'" type="text" size="small">查看发货单</el-button>
          <el-button v-if="row.orderStatus==='待退款'" type="text" size="small">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 订单详情模态框 -->
    <el-dialog title="订单详情" :visible.sync="orderDialogTableVisible" width="40%">
      <div class="order-data">
        <span class="order-left">商户ID：</span>
        <span>{{order.id}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">商户名称：</span>
        <span>{{order.name}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">订单号：</span>
        <span>{{order.orderId}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">配送方式：</span>
        <span>{{order.distribution}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">收货地址：</span>
        <span>{{order.address}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">选购商品：</span>
        <div v-for="(v,i) in order.orderList" :key="i">
          <div class="orderCount">
            <img class="orderImg" :src="v.orderImg" />
            <i>{{v.commodity}}</i>
            <i>×{{v.count}}</i>
          </div>
        </div>
      </div>
      <div class="order-data">
        <span class="order-left">包装</span>
        <span class="order-right">￥{{order.packing}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠活动</span>
        <span class="order-right">￥{{order.discounts}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠卷</span>
        <span class="order-right">￥{{order.coupon}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">配送费</span>
        <span class="order-right">￥{{order.shippingFee}}</span>
      </div>
      <div class="total">合计 ￥{{total}}</div>
    </el-dialog>
  </div>
</template>
<script>
import { detailedMock } from "@/api/mock/test.js";
export default {
  name: "OrderTable",
  props: ["orderData"],
  data() {
    return {
      orderDialogTableVisible: false,
      order: {},
      loading: true
    };
  },
  methods: {
    async lookDetailedData() {
      this.orderDialogTableVisible = true;
      const {
        data: { data }
      } = await detailedMock();
      this.loading = false;
      this.order = data.array;
    }
  },
  computed: {
    total() {
      return (
        this.order.total -
        this.order.packing -
        this.order.shippingFee -
        this.order.coupon
      );
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .checkOrder {
  margin-left: 10px;
}
::v-deep .el-dialog {
  .order-data {
    margin-bottom: 20px;
    .orderCount {
      line-height: 50px;
      margin-left: 100px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .orderImg {
      width: 50px;
      height: 50px;
      display: inline-block;
    }
    .order-left {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    .order-right {
      float: right;
    }
  }
  .total {
    text-align: right;
    font-size: 25px;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-right: 50px;
  }
}
</style>
