<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="search-card">
      <div class="search">
        <div class="shopName">
          <span>店铺ID/名称</span>
          <el-input v-model="searchForm.keyword2" placeholder="搜索店铺ID"></el-input>
        </div>
        <div class="couponName">
          <span>优惠券</span>
          <el-input v-model="searchForm.keyword1" placeholder="搜索优惠券名称"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="tabel-card">
      <div class="count">
        <div class="couponCount">
          发放总数量：{{ countNum }}张
        </div>
        <div class="priceCount">
          领取总金额：{{ countPrice }}元
        </div>
      </div>
      <el-table :data="couponList" style="width: 100%">
        <el-table-column prop="shopebaseid._id" label="店铺id" width="200">
        </el-table-column>
        <el-table-column prop="shopebaseid.shop_name" label="店铺名称">
        </el-table-column>
        <el-table-column prop="name" label="优惠券名称">
        </el-table-column>
        <el-table-column prop="coupon_price" label="优惠券金额/元">
        </el-table-column>
        <el-table-column prop="coupon_limit" label="使用金额限制">
        </el-table-column>
        <el-table-column prop="coupon_time" label="使用时限/天">
        </el-table-column>
        <el-table-column prop="push_coupon_limt" label="发放总数量/张">
        </el-table-column>
        <el-table-column prop="receive_coupon_limt" label="领取金额/元">
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagationData.page"
        :page-size="pagationData.size" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getShopCouponListApi, getQueryShopCouponApi } from '@/api/coupon/coupon_shop'
export default {
  components: {
    breadCrumbs,
  },
  data () {
    return {
      searchForm: {
        shopName: '',
        couponName: ''
      },
      pagationData: {
        size: 10,
        page: 1
      },
      couponList: [],
      total: 0,
    }
  },
  methods: {
    // 获取商铺优惠券列表
    async getShopCoupon () {
      const { data } = await getShopCouponListApi(this.pagationData);
      this.total = data.total
      this.couponList = data.records
    },
    // 重置表单
    resetForm () {
      this.searchForm = {
        keyword2: '',  //店铺名称
        keyword1: ''    // 优惠券名称
      }
      this.getShopCoupon()
    },
    // 搜索
    async search () {
      if (this.searchForm.keyword2.trim().length === 0 && this.searchForm.keyword1.trim().length === 0) {
        return null
      }
      let res = await getQueryShopCouponApi(this.searchForm)
      this.couponList = res.data
    },
    handleCurrentChange (newPage) {
      this.pagationData.page = newPage
      this.getShopCoupon()
    }
  },
  computed: {
    countNum () {
      return this.couponList.reduce((countNum, cur, i) => {
        return countNum += cur.push_coupon_limt
      }, 0)
    },
    countPrice () {
      return this.couponList.reduce((countNum, cur, i) => {
        return countNum += cur.receive_coupon_limt * cur.push_coupon_limt
      }, 0)
    }
  },
  created () {
    this.getShopCoupon()
  }
}
</script>

<style lang="scss" scoped>
.search-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  .search {
    display: flex;
    justify-content: space-around;
    & > div {
      display: flex;
      align-items: center;
      text-align: center;
      span {
        width: 140px;
      }
    }
  }
}
.count {
  display: flex;
  justify-content: flex-end;
  .couponCount {
    margin-right: 20px;
  }
  .priceCount {
    margin-right: 20px;
  }
}
</style>