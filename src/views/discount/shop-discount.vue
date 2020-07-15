<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="search-card">
      <div class="search">
        <div class="shopName">
          <span>店铺ID/名称</span>
          <el-input v-model="searchForm.shopName" placeholder="搜索店铺ID/名称"></el-input>
        </div>
        <div class="couponName">
          <span>优惠券</span>
          <el-input v-model="searchForm.couponName" placeholder="搜索优惠券名称"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary">查询</el-button>
          <el-button type="danger">重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="tabel-card">
      <div class="count">
        <div class="couponCount">
          发放总数量：{{ couponCount }}张
        </div>
        <div class="priceCount">
          领取总金额：{{ priceCount }}元
        </div>
      </div>
      <el-table :data="couponList" style="width: 100%">
        <el-table-column prop="id" label="店铺id" width="100">
        </el-table-column>
        <el-table-column prop="shop_name" label="店铺名称">
        </el-table-column>
        <el-table-column prop="coupon_name" label="优惠券名称">
        </el-table-column>
        <el-table-column prop="coupon_price" label="优惠券金额/元">
        </el-table-column>
        <el-table-column label="使用金额限制">
          <template v-slot="scope">
            <div>
              {{ scope.row.price_limit ? scope.row.price_limit :'无' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="使用时限/天">
          <template v-slot="scope">
            <div>
              {{ scope.row.coupon_day ? scope.row.coupon_day :'无' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="coupon_count" label="发放总数量/张">
        </el-table-column>
        <el-table-column prop="price_count" label="领取金额/元">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getShopCouponAPI } from '@/api/mock/shop_discount'
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
      couponList: []
    }
  },
  methods: {
    async getShopCoupon () {
      const { data } = await getShopCouponAPI();
      data.data.data.map(v => {
        v.price_count = v.coupon_count * v.coupon_price
      })
      this.couponList = data.data.data;
    }
  },
  computed: {
    couponCount () {
      return this.couponList.reduce((count, cur, i) => {
        return count += cur.coupon_count
      }, 0)
    },
    priceCount () {
      return this.couponList.reduce((count, cur, i) => {
        return count += cur.price_count
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