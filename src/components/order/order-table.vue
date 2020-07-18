<template>
  <div v-if="orderData">
    <el-table :data="orderData.records" border style="width: 100%">
      <el-table-column prop="shopid[uid]" label="商户ID" width="110"></el-table-column>
      <el-table-column prop="shopid[shop_name]" label="商户名称" width="120"></el-table-column>
      <el-table-column prop="_id" label="订单号" width="100"></el-table-column>
      <el-table-column prop="delivery_price" label="商品列表" width="120">
        <template #default="{row}">
          <div v-for="(v,i) in row.delivery_price" :key="i">
            <span>{{v[0].value}}</span>
            <span>*{{v[0].count}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="下单时间" width="180">
        <template #default="{row}">{{row.createdAt | timer('YYYY-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column prop="total" label="订单总金额" width="100">
        <template #default="{row}">{{row.total}}元</template>
      </el-table-column>
      <el-table-column prop="delivery" label="配送方式" width="80"></el-table-column>
      <el-table-column prop="address" label="收货地址/提货人">
        <template
          #default="{row}"
        >{{row.receipt_message.name}} {{row.receipt_message.phone}} {{row.receipt_message.location}}</template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="100">
        <template #default="{row}">{{row.package |orderStatus }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{row}">
          <el-button class="checkOrder" type="text" size="small" @click="lookDetailedData(row)">查看订单</el-button>
          <el-button
            v-if="row.package<=2"
            type="text"
            size="small"
            @click="changeStatus(row._id,8)"
          >取消订单</el-button>
          <el-button
            v-if="row.package===5||row.package===7||row.package===8"
            type="text"
            size="small"
            @click="changeStatus(row._id,9)"
          >完成订单</el-button>
          <el-button
            v-if="row.package===2"
            type="text"
            size="small"
            @click="changeStatus(row._id,3)"
          >确认发货</el-button>
          <el-button
            v-if="row.package===1"
            type="text"
            size="small"
            @click="changeStatus(row._id,2)"
          >确认配送</el-button>
          <el-button v-if="row.package===3" type="text" size="small">查看发货单</el-button>
          <el-button
            v-if="row.package===6"
            type="text"
            size="small"
            @click="changeStatus(row._id,7)"
          >退款</el-button>
          <el-button
            v-if="row.package===6"
            type="text"
            size="small"
            @click="changeStatus(row._id,5)"
          >拒绝退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderData.page"
      :page-sizes="[5,10,20,50]"
      :page-size.sync="orderData.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderData.total"
    ></el-pagination>
    <!-- 订单详情模态框 -->
    <el-dialog title="订单详情" :visible.sync="orderDialogTableVisible" width="40%">
      <div class="order-data">
        <span class="order-left">商户ID：</span>
        <span>{{order.shopid && order.shopid.shop_id}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">商户名称：</span>
        <span>{{order.shopid && order.shopid.shop_name}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">订单号：</span>
        <span>{{order._id}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">配送方式：</span>
        <span>{{order.shopid && order.delivery}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">收货地址：</span>
        <span>{{order.receipt_message && order.receipt_message.location}}-{{order.receipt_message && order.receipt_message.name}}-{{order.receipt_message && order.receipt_message.phone}}</span>
      </div>
      <div class="order-data">
        <span class="order-left">选购商品：</span>
        <div v-for="(v,i) in order.delivery_price" :key="i">
          <div class="orderCount">
            <img
              class="orderImg"
              src="https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b"
            />
            <i>{{order.delivery_price[i][0].value}}</i>
            <i>×{{order.delivery_price[i][0].count}}</i>
          </div>
        </div>
      </div>
      <div class="order-data">
        <span class="order-left">包装</span>
        <span class="order-right">￥2</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠活动</span>
        <span class="order-right">￥10</span>
      </div>
      <div class="order-data">
        <span class="order-left">优惠卷</span>
        <span class="order-right">￥30</span>
      </div>
      <div class="order-data">
        <span class="order-left">配送费</span>
        <span class="order-right">￥10</span>
      </div>
      <div class="total">合计 ￥{{order.total}}</div>
    </el-dialog>
  </div>
</template>
<script>
import { detailedMock } from "@/api/mock/test.js";
import { changeOrderStatus, getOrderData } from "@/api/shops/order.js";
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
    async lookDetailedData(row) {
      this.orderDialogTableVisible = true;
      const { data: res } = await getOrderData(row._id);
      console.log(res);
      this.loading = false;
      this.order = res.records[0];
    },
    // 分页功能
    handleSizeChange(v) {
      this.$emit("changeSize", v);
    },
    handleCurrentChange(v) {
      this.$emit("changeCurrent", v);
    },
    // 修改状态功能集
    changeStatus(id, v) {
      this.$confirm("此操作将修改订单的状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            const data = await changeOrderStatus(id, v);
            this.$emit("changeStatus", { id, package: v });
            this.$message.success("修改成功");
          } catch (err) {
            this.$message.error("修改失败");
          }
        })
        .catch(() => {
          return null;
        });
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
