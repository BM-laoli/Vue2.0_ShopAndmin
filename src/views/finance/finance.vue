<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <el-form
        :model="financeRuleForm"
        :rules="financeRules"
        ref="ruleForm"
        label-width="150px"
        inline
      >
        <el-form-item
          label="店铺ID/名称"
          prop="shopName"
          style="margin:0 100px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleForm.shopName"></el-input>
        </el-form-item>
        <el-form-item
          label="用户ID/昵称"
          prop="userName"
          style="margin:0 300px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state" size="small">
          <el-select v-model="financeRuleForm.region" placeholder="请选择状态">
            <el-option label="待处理" value="待处理"></el-option>
            <el-option label="已提现" value="已提现"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="提现单号"
          prop="orderNumber"
          style="margin:0 100px 0 0"
          size="small"
        >
          <el-input v-model="financeRuleForm.orderNumber"></el-input>
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
              v-model="financeRuleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="financeRuleForm.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="danger">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="userlist" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="交易类型" prop="type"></el-table-column>
        <el-table-column label="店铺ID/名称" prop="shopName"></el-table-column>
        <el-table-column label="用户ID/昵称" prop="userName"></el-table-column>
        <el-table-column label="提现单号" prop="orderNumber"> </el-table-column>
        <el-table-column label="提现金额" prop="money"> </el-table-column>
        <el-table-column label="申请提现时间" prop="ordertime">
        </el-table-column>
        <el-table-column label="状态" prop="state"> </el-table-column>
        <el-table-column label="提现时间" prop="time"> </el-table-column>
        <el-table-column label="提现备注" prop="remake"> </el-table-column>
        <el-table-column label="操作" :span="2">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="editUser(scope.row.id)"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
      title="确认用户/商户“xxxxx”提现申请已打款"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="editaForm"
        :rules="editarules"
        ref="editaRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editaForm.remake"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      editaForm: {},
      editarules: {
        remake: [
          { required: true, message: "请输入提现备注", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 20个字符", trigger: "blur" }
        ]
      },
      total: 0,
      dialogFormVisible: false,
      textarea: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      financeRuleForm: {
        shopName: "",
        userName: "",
        state: "",
        orderNumber: "",
        date1: "",
        date2: ""
      },
      financeRules: {
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
    this.onFinanceList();
  },
  methods: {
    async onFinanceList() {
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
    },
    async editUser(id) {
      console.log(id);
      const { data: res } = await getFinanceList(id);
      this.editaForm = res.data;
      this.dialogFormVisible = true;
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