<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form ref="form" :model="searchForm" label-width="110px">
          <el-form-item label="商户ID/名称：">
            <el-input v-model="searchForm.data.name"></el-input>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="searchForm.data.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="行业：">
            <el-select v-model="searchForm.data.industry" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="searchFormBtns">
          <el-button type="primary">查询</el-button>
          <el-button type="info">重置</el-button>
        </div>
        <div style="clear:both"></div>
      </div>
      <!-- 统计列 -->
      <div class="border-middleware">
        <div class="middleware-left">
          <span class="countTotal">订单数量：</span>
          <span class="orderTotal">订单总金额：</span>
        </div>
        <div class="middleware-right">
          <span>退款/售后订单数量：</span>
          <span>退款/售后率：</span>
          <span>确认退款订单数量：</span>
          <span>确认退款率：</span>
        </div>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="商户ID" width="110"></el-table-column>
          <el-table-column prop="name" label="商户名称" width="120"></el-table-column>
          <el-table-column prop="business" label="行业"></el-table-column>
          <el-table-column prop="orderCount" label="订单总数量"></el-table-column>
          <el-table-column prop="orderTotal" label="订单总金额">
            <template #default="{row}">￥{{row.orderTotal}}</template>
          </el-table-column>
          <el-table-column prop="reimburseCount" label="退款/售后订单数量" width="150"></el-table-column>
          <el-table-column prop="address" label="退款/售后率">
            <template #default="{row}">{{((row.reimburseCount/row.orderCount)*100).toFixed(2)}}%</template>
          </el-table-column>
          <el-table-column prop="affirmReimburse" label="确认退款订单数量" width="150"></el-table-column>
          <el-table-column prop="reimburseTotal" label="确认退款金额">
            <template #default="{row}">￥{{row.reimburseTotal}}</template>
          </el-table-column>
          <el-table-column prop="address" label="确认退款率">
            <template #default="{row}">{{((row.affirmReimburse/row.orderCount)*100).toFixed(2)}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import { calculationMock } from "@/api/mock/test.js";
export default {
  name: "OrderCalculation",
  data() {
    return {
      searchForm: {
        data: {
          industry: "",
          time: "",
          name: ""
        }
      },
      tableData: []
    };
  },
  computed: {
    orderCount() {
      this.tableData;
      return null;
    }
  },
  components: {
    breadCrumbs
  },
  async mounted() {
    const {
      data: { data }
    } = await calculationMock();
    this.tableData = data.data;
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
::v-deep .hedaer-box {
  padding-top: 20px;
  width: 100%;
  height: auto;

  .el-form {
    .el-form-item {
      display: inline-block;
    }
  }
  .searchFormBtns {
    float: right;
    margin-right: 20px;
  }
}
.tabbe-box {
  width: 100%;
  height: auto;
}

::v-deep .border-middleware {
  width: 100%;
  box-sizing: border-box;
  margin-top: 80px;
  padding: 10px;
  background-color: #fff;
  margin: 10px 0;
  display: flex;
  .middleware-left {
    display: flex;
    flex: 1;
    .countTotal {
      flex: 1;
    }
    .orderTotal {
      flex: 2;
    }
  }
  .middleware-right {
    display: flex;
    flex: 1.5;
    justify-content: space-between;
  }
}
</style>