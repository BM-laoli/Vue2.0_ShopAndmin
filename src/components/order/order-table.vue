<template>
  <div>
    <el-table :data="orderData" border style="width: 100%">
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
      <el-table-column prop="address" label="收货地址/提货人" width="160"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{row}">
          <el-button
            class="checkOrder"
            type="text"
            size="small"
            @click="orderDialogTableVisible=true"
          >查看订单</el-button>
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
        <span>123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">商户名称：</span>
        <span>123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">订单号：</span>
        <span></span>
      </div>
      <div class="order-data">
        <span class="order-left">配送方式：</span>
        <span>123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">收货地址：</span>
        <span>123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">选购商品：</span>
        <span>123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">包装</span>
        <span class="order-right">123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠活动</span>
        <span class="order-right">123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠卷</span>
        <span class="order-right">123123</span>
      </div>
      <div class="order-data">
        <span class="order-left">配送费</span>
        <span class="order-right">123123</span>
      </div>
      <div class="total">合计 ￥85.4</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "OrderTable",
  props: ["orderData"],
  data() {
    return {
      orderDialogTableVisible: false
    };
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
