<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <el-form
        :model="financeRuleJionForm"
        :rules="financeJionRules"
        ref="ruleForm"
        label-width="140px"
        inline
      >
        <el-form-item
          label="店铺ID/名称"
          prop="shopName"
          style="margin:0 100px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleJionForm.shopName"></el-input>
        </el-form-item>
        <el-form-item
          label="用户ID/昵称"
          prop="userName"
          style="margin:0 300px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleJionForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state" size="small">
          <el-select
            v-model="financeRuleJionForm.region"
            placeholder="请选择状态"
          >
            <el-option label="待处理" value="店铺提现"></el-option>
            <el-option label="已提现" value="用户提现"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="提现单号"
          prop="orderNumber"
          style="margin:0 100px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleJionForm.orderNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="申请提现日期"
          size="small"
          style="margin:0 250px 0 0"
        >
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="financeRuleJionForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="financeRuleJionForm.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="danger">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div>
        <span>店铺提现金额:XXX元</span>
        <span style="margin-left:100px">用户提现金额:XXX元</span>
        <span style="margin-left:100px">总提现金额:XXX元</span>
      </div>
    </el-card>
    <el-card>
      <el-table :data="userlist" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="交易类型" prop="type"></el-table-column>
        <el-table-column label="店铺ID/名称" prop="shopName"></el-table-column>
        <el-table-column label="用户ID/昵称" prop="userName"></el-table-column>
        <el-table-column label="提现单号" prop="orderNumber"> </el-table-column>
        <el-table-column label="提现金额" prop="money"> </el-table-column>
        <el-table-column label="提现时间" prop="time"> </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import { getFinanceList } from "../../api/mock/finance";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      userlist: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      financeRuleJionForm: {
        shopName: "",
        userName: "",
        state: "",
        orderNumber: "",
        data1: "",
        data2: ""
      },
      financeJionRules: {
        userName: [
          {
            required: true,
            message: "请输入店铺ID/名称",
            trigger: "blur"
          },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ],
        shopName: [
          {
            required: true,
            message: "请输入用户ID/昵称",
            trigger: "blur"
          },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        orderNumber: {
          required: true,
          message: "请输入订单号",
          trigger: "blur"
        }
      }
    };
  },
  created() {
    this.onFinanceJionList();
  },
  methods: {
    async onFinanceJionList() {
      const { data: res } = await getFinanceList(this.queryInfo);
      this.userlist = res.data;
      this.total = res.total;
      console.log(res);
    },
    // 监听pagesize事件
    handleSizeChange(newsize) {
      console.log(newsize);
      this.queryInfo.pagesize = newsize;
      this.onFinanceList();
    },
    // 监听页面
    handleCurrentChange(newnum) {
      console.log(newnum);
      this.queryInfo.pagenum = newnum;
      this.onFinanceList();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
}
</style>