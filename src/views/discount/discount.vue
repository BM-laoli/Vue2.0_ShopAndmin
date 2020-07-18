<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <el-card class="box-card">
        <!-- 搜索 -->
        <div slot="header" class="clearfix">
          <el-form ref="form" :model="searchForm">
            <el-form-item label="优惠券">
              <el-input v-model="searchForm.name" placeholder="优惠券名称"></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker v-model="searchForm.date" type="daterange" align="right" unlink-panels
                range-separator="至">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button style="float: right; padding: 3px 0" type="text" @click="searchCoupon">查询</el-button>
              <el-button style="float: right; padding: 3px 0" type="text" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="main">
          <div class="add">
            <el-button type="primary" @click="addCouponDialogVisible = true">新增优惠券</el-button>
            <div class="text">
              <!-- 发放总数量 -->
              <div class="countNum">发放总数量：{{countNum}}张</div>
              <!-- 发放总价格 -->
              <div class="countPrice">领取总金额：{{countPrice}}元</div>
            </div>
          </div>
          <el-table :data="coupon" style="width: 100%" stripe>
            <el-table-column prop="name" label="优惠券名称">
            </el-table-column>
            <el-table-column prop="coupon_price" label="优惠券金额(元)">
            </el-table-column>
            <el-table-column label="使用金额限制">
              <template v-slot="scope">
                <div>
                  {{ scope.row.coupon_limit ? scope.row.coupon_limit + '元':'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="使用时限/天">
              <template v-slot="scope">
                <div>
                  {{ scope.row.coupon_time ? scope.row.coupon_time + '天':'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="领取限制/张">
              <template v-slot="scope">
                <div>
                  {{ scope.row.get_coupon_limt ? scope.row.get_coupon_limt + '张':'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="push_coupon_limt" label="发放总数量/张">
            </el-table-column>
            <el-table-column prop="receive_coupon_limt" label="领取金额/元">
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template v-slot="scope">
                <div>
                  <el-button type="primary" size="small" @click="getCoupon(scope.row._id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteCoupon(scope.row._id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagationData.page"
          :page-size="pagationData.size" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
    </el-card>

    <!-- 添加优惠券 -->
    <el-dialog title="添加优惠券" :visible.sync="addCouponDialogVisible" width="50%" @close="$refs.ruleForm.resetFields()">
      <el-form :model="addCouponForm" :rules="addCouponRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="addCouponForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" prop="coupon_price">
          <el-input v-model.number="addCouponForm.coupon_price"></el-input>
        </el-form-item>
        <el-form-item label="使用金额限制">
          <el-input v-model.number="addCouponForm.coupon_limit"></el-input>
          （0即为无使用金额限制）
        </el-form-item>
        <el-form-item label="使用时限">
          <el-input v-model.number="addCouponForm.coupon_time"></el-input>
          (0即为无使用时限)
        </el-form-item>
        <el-form-item label="账号领取上限">
          <el-input v-model.number="addCouponForm.get_coupon_limt"></el-input>
          （0即不限制领取数量）
        </el-form-item>
        <el-form-item label="发放总数量" prop="push_coupon_limt">
          <el-input v-model.number="addCouponForm.push_coupon_limt"></el-input>
        </el-form-item>
        <el-form-item label="领取金额" prop="receive_coupon_limt">
          <el-input v-model.number="addCouponForm.receive_coupon_limt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addCouponDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCoupon">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改优惠券" :visible.sync="modifyCouponDialogVisible" width="50%">
      <el-form :model="modifyCouponForm" :rules="addCouponRules" ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="modifyCouponForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" prop="coupon_price">
          <el-input v-model.number="modifyCouponForm.coupon_price"></el-input>
        </el-form-item>
        <el-form-item label="使用金额限制">
          <el-input v-model.number="modifyCouponForm.coupon_limit"></el-input>
          （0即为无使用金额限制）
        </el-form-item>
        <el-form-item label="使用时限">
          <el-input v-model.number="modifyCouponForm.coupon_time"></el-input>
          (0即为无使用时限)
        </el-form-item>
        <el-form-item label="账号领取上限">
          <el-input v-model.number="modifyCouponForm.get_coupon_limt"></el-input>
          （0即不限制领取数量）
        </el-form-item>
        <el-form-item label="发放总数量" prop="push_coupon_limt">
          <el-input v-model.number="modifyCouponForm.push_coupon_limt"></el-input>
        </el-form-item>
        <el-form-item label="领取金额" prop="receive_coupon_limt">
          <el-input v-model.number="modifyCouponForm.receive_coupon_limt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="modifyCouponDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyCoupon">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getCouponListApi, addCouponApi, updateCouponApi, deleteCouponApi, getQueryCouponApi } from '../../api/coupon/coupon'
import { getCouponApi } from '@/api/mock/discount'
export default {
  components: {
    breadCrumbs,
  },
  data () {
    return {
      // 搜索表单数据
      searchForm: {
        name: '',
        start: '',
        end: ''
      },
      // 分页表单数据
      pagationData: {
        size: 5,
        page: 1
      },
      // 数据总量
      total: 0,
      // 存放优惠券列表的数组
      coupon: [],
      // 添加弹出框
      addCouponDialogVisible: false,
      // 添加优惠券
      addCouponForm: {
        name: '',
        coupon_price: 0,
        coupon_limit: 0,
        coupon_time: 0,
        get_coupon_limt: 0,
        push_coupon_limt: 0,
        receive_coupon_limt: 0,
        id_start: true
      },
      // 添加优惠券的校验规则
      addCouponRules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        coupon_price: [
          { required: true, message: '请输入优惠券金额', trigger: 'blur' },
          { type: 'number', message: '金额必须是数字', trigger: 'blur' }
        ],
        coupon_limit: [
          { type: 'number', message: '金额必须是数字,如果想无使用优惠金额限制，请输入0', trigger: 'blur' }
        ],
        coupon_time: [
          { type: 'number', message: '时间必须是数字,如果想无使用时间限制，请输入0', trigger: 'blur' }
        ],
        get_coupon_limt: [
          { type: 'number', message: '数量必须是数字,如果想无使用领取数量限制，请输入0', trigger: 'blur' }
        ],
        push_coupon_limt: [
          { required: true, message: '请输入发送数量', trigger: 'blur' },
          { type: 'number', message: '数量必须是整数', trigger: 'blur' },
        ],
        receive_coupon_limt: [
          { required: true, message: '请输入领取金额', trigger: 'blur' },
          { type: 'number', message: '金额必须是数字', trigger: 'blur' },
        ]
      },
      modifyCouponDialogVisible: false,
      modifyCouponForm: {},
      curPage: 1,
    }
  },
  methods: {
    // 获取优惠券列表
    async getCouponList () {
      const { data: res } = await getCouponListApi(this.pagationData)
      this.total = res.total
      this.coupon = res.records
      console.log(res);
    },
    // 添加优惠券
    addCoupon () {
      this.$refs.ruleForm.validate(async resovle => {
        if (!resovle) return
        const res = await addCouponApi(this.addCouponForm)
        console.log(res);
        if (res.status === 201) {
          this.addCouponDialogVisible = false
          this.coupon.unshift(res.data)
        }
        this.$message.success('添加成功')
      })
    },
    // 修改优惠券
    async modifyCoupon () {
      try {
        const res = await updateCouponApi(this.modifyCouponForm._id, this.modifyCouponForm);
        if (res.status == 200) {
          this.modifyCouponDialogVisible = false;
          this.getCouponList();
          this.$message.success('修改成功')
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取优惠券详情
    getCoupon (id) {
      this.modifyCouponForm = this.coupon.find(v => v._id == id)
      this.modifyCouponDialogVisible = true;
    },
    // 删除优惠券
    async deleteCoupon (id) {
      let res = this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.success('已取消删除')
      })
      if (res === 'confirm') {

      }
      const { data } = await deleteCouponApi(id);
      if (data.code === 200) {
        this.$message.success('删除成功')
        this.coupon = this.coupon.filter(v => v.id !== id)
      }
    },
    async handleCurrentChange (newNum) {
      this.pagationData.page = newNum
      this.getCouponList()
    },
    // 查询优惠券
    async searchCoupon () {
      this.pagationData.page = 1
      const res = await getQueryCouponApi({
        keyword1: this.searchForm.name,
        keyword2: this.searchForm.start,
        keyword3: this.searchForm.end,
        page: this.pagationData.page
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.coupon = res.data.records
      }
    },
    resetSearch () {
      this.searchForm = {
        name: '',
        date: ''
      }
      this.getCouponList();
    }
  },
  computed: {
    countNum () {
      return this.coupon.reduce((countNum, cur, i) => {
        return countNum += cur.push_coupon_limt
      }, 0)
    },
    countPrice () {
      return this.coupon.reduce((countNum, cur, i) => {
        return countNum += cur.receive_coupon_limt * cur.push_coupon_limt
      }, 0)
    }
  },
  created () {
    this.getCouponList();
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  ::v-deep.el-card__header {
    height: 63px;
    border: 1px solid #000;
    padding: 0;
    .el-form {
      width: 100%;
      height: 63px;
      display: flex;
      justify-content: space-around;
      .el-form-item {
        display: flex;
        align-items: center;
        margin: 0;
        .el-input__inner {
          width: 166px;
          height: 30px;
        }
        .el-date-editor {
          display: flex;
          align-items: center;
          width: 250px;
          i {
            line-height: 22px;
          }
          span {
            line-height: 22px;
          }
          .el-range-separator {
            width: 30px;
          }
        }
        .el-button {
          padding: 5px 15px !important;
          border: 1px solid #ccc;
          margin: 0 10px;
        }
      }
    }
  }
  .main {
    .add {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      height: 40px;
      .text {
        display: flex;
        justify-content: flex-start;
        .countPrice {
          margin-left: 100px;
        }
      }
    }
  }
}
</style>