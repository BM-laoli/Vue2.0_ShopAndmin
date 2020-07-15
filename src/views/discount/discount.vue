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
              <el-button style="float: right; padding: 3px 0" type="text">查询</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">重置</el-button>
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
            <el-table-column prop="price" label="优惠券金额(元)">
            </el-table-column>
            <el-table-column label="使用金额限制">
              <template v-slot="scope">
                <div>
                  {{ scope.row.priceRestrict ? scope.row.priceRestrict:'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="使用时限/天">
              <template v-slot="scope">
                <div>
                  {{ scope.row.time ? scope.row.time:'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="领取限制/张">
              <template v-slot="scope">
                <div>
                  {{ scope.row.countRestrict ? scope.row.countRestrict:'无' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="发放总数量/张">
            </el-table-column>
            <el-table-column prop="countPrice" label="领取金额/元">
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template v-slot="scope">
                <div>
                  <el-button type="primary" size="small" @click="getCoupon(scope.row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteCoupon(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="curPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </el-card>
    </el-card>

    <!-- 添加优惠券 -->
    <el-dialog title="添加优惠券" :visible.sync="addCouponDialogVisible" width="50%" @close="$refs.ruleForm.resetFields()">
      <el-form :model="addCouponForm" :rules="addCouponRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="addCouponForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" prop="price">
          <el-input v-model="addCouponForm.price"></el-input>
        </el-form-item>
        <el-form-item label="使用金额限制">
          <el-input v-model="addCouponForm.priceRestrict"></el-input>
          （不填写即为无使用金额限制）
        </el-form-item>
        <el-form-item label="使用时限">
          <el-input v-model="addCouponForm.time"></el-input>
          (不填写即为无使用时限)
        </el-form-item>
        <el-form-item label="账号领取上限">
          <el-input v-model="addCouponForm.countRestrict"></el-input>
          （不填写即不限制领取数量）
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
        <el-form-item label="优惠券金额" prop="price">
          <el-input v-model="modifyCouponForm.price"></el-input>
        </el-form-item>
        <el-form-item label="使用金额限制">
          <el-input v-model="modifyCouponForm.priceRestrict"></el-input>
          （不填写即为无使用金额限制）
        </el-form-item>
        <el-form-item label="使用时限">
          <el-input v-model="modifyCouponForm.time"></el-input>
          (不填写即为无使用时限)
        </el-form-item>
        <el-form-item label="账号领取上限">
          <el-input v-model="modifyCouponForm.countRestrict"></el-input>
          （不填写即不限制领取数量）
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
import { getCouponApi, addCouponApi, updateCouponApi, detailCoupon, deleteCouponApi } from '@/api/mock/discount'
export default {
  components: {
    breadCrumbs,
  },
  data () {
    return {
      searchForm: {
        name: '',
        date: ''
      },
      coupon: [],
      uid: '5ee77d61ca8c9a7398261dc7',
      addCouponDialogVisible: false,
      addCouponForm: {
        name: '',
        price: 1,
        isPriceRestrict: '',
        time: '',
        countRestrict: ''
      },
      addCouponRules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入优惠券金额', trigger: 'blur' },
          { type: 'number', message: '金额必须是整数', trigger: 'blur' }
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
      const { data: res } = await getCouponApi(this.uid)
      res.data.map(v => {
        v.countPrice = v.price * v.count;
      })
      this.coupon = res.data
    },
    // 添加优惠券
    addCoupon () {
      this.$refs.ruleForm.validate(async resovle => {
        if (!resovle) return
        const res = await addCouponApi(this.uid, this.addCouponForm)
        if (res.data.code === 200) {
          this.addCouponDialogVisible = false
          this.coupon.unshift({ ...this.addCouponForm })
        }
        this.$message.success('添加成功')
      })
    },
    // 修改优惠券
    async modifyCoupon () {
      try {
        const { data } = await updateCouponApi(this.modifyCouponForm.id);
        console.log(data);
        if (data.code === 200) {
          this.$message.success('修改成功');
          this.modifyCouponDialogVisible = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取优惠券详情
    async getCoupon (id) {
      try {
        const { data } = await detailCoupon(id);
        this.modifyCouponForm = data.data
        this.modifyCouponDialogVisible = true;
      } catch (err) {

      }
    },
    async deleteCoupon (id) {
      const { data } = await deleteCouponApi(id);
      if (data.code === 200) {
        this.$message.success('删除成功')
        this.coupon = this.coupon.filter(v => v.id !== id)
      }
    },
    async handleSizeChange () {
      const { data: res } = await getCouponApi(this.uid)
      res.data.map(v => {
        v.countPrice = v.price * v.count;
      })
      this.coupon = res.data
    },
    async handleCurrentChange () {
      const { data: res } = await getCouponApi(this.uid)
      res.data.map(v => {
        v.countPrice = v.price * v.count;
      })
      this.coupon = res.data
    }
  },
  computed: {
    countNum () {
      return this.coupon.reduce((countNum, cur, i) => {
        return countNum += cur.count
      }, 0)
    },
    countPrice () {
      return this.coupon.reduce((countNum, cur, i) => {
        return countNum += cur.countPrice
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
        justify-content: end;
        .countPrice {
          margin-left: 100px;
        }
      }
    }
  }
}
</style>