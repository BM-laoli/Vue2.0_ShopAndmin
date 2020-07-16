<template>
  <div class="shop-audit">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
      <el-breadcrumb-item>开店审核</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :label-position="labelPosition" :model="formLabelAlign" :inline="true" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="3" class="text-style" style="height:60px;line-height:60px">店铺头像</el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.avatar" fit="cover"></el-image>
          </el-col>
          <el-col class="text-style" :span="3" style="height:60px;line-height:60px">店铺实拍</el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.shop_id_image_positive" fit="cover"></el-image>
          </el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.shop_id_image_reverse" fit="cover"></el-image>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="text-style" :span="3" style="height:60px;line-height:60px">主要产品图</el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.shop_product_images.image1" fit="cover"></el-image>
          </el-col>
          <el-col class="text-style" :span="3" style="height:60px;line-height:60px">营业证照</el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.shop_product_images.image2" fit="cover"></el-image>
          </el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.shop_product_images.image3" fit="cover"></el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="店铺名称">
              <el-input v-model="formLabelAlign.shop_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺分店名称">
              <el-input v-model="formLabelAlign.shop_level_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="身份证号">
              <el-input v-model="formLabelAlign.shop_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="text-style" :span="3" style="height:60px;line-height:60px">身份证照</el-col>
          <el-col :span="4">
            <el-image style="width: 60px; height: 60px" :src="formLabelAlign.avatar" fit="cover"></el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="formLabelAlign.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="邀请码">
              <el-input v-model="formLabelAlign.shop_license_images._id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货方式">
              <el-checkbox :checked="formLabelAlign.delivery.is_self.flag">到店自提</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="    ">
              <el-checkbox :checked="formLabelAlign.delivery.sime_city.flag">同城配送</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label="      ">
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起配价" class="mini-input-price-type">
              <el-input type="text" v-model="formLabelAlign.delivery.sime_city.start_price"></el-input>
            </el-form-item>
            <span style="line-height:45px">元</span>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配送费" class="mini-input-price-type">
              <el-input v-model="formLabelAlign.delivery.sime_city.total_price"></el-input>
            </el-form-item>
            <span style="line-height:45px">元</span>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配送时间" class="mini-input-price-type-large">
              <el-time-picker style="width:200px" is-range v-model="formLabelAlign.peisongTime" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="    ">
              <el-checkbox :checked="formLabelAlign.delivery.region.flag">区域配送</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label="      ">
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起配价" class="mini-input-price-type">
              <el-input v-model="formLabelAlign.delivery.region.start_price"></el-input>
            </el-form-item>
            <span style="line-height:45px">元</span>
          </el-col>
          <el-col :span="5">
            <el-form-item label="配送范围" class="mini-input-price-type-large">
              <el-input v-model="formLabelAlign.delivery.region.over"></el-input>
            </el-form-item>
            <span style="line-height:45px;font-size:14px">公里(以内)</span>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配送费" class="mini-input-price-type">
              <el-input v-model="formLabelAlign.delivery.region.total_price"></el-input>
            </el-form-item>
            <span style="line-height:45px">元</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配送时间" class="mini-input-price-type-large">
              <el-time-picker style="width:200px" is-range v-model="formLabelAlign.peisongQuyuTime" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="    ">
              <el-checkbox :checked="formLabelAlign.delivery.cross_city.flag">跨城配送</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label="      ">
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配送费" class="mini-input-price-type">
              <el-input v-model="formLabelAlign.delivery.cross_city.total_price"></el-input>
            </el-form-item>
            <span style="line-height:45px">元</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核备注">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" size="medium" :autosize="{ minRows: 4, maxRows: 8}" v-model="textareaBeiZhu">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="      ">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary">审核通过</el-button>
              <el-button type="warning">审核不通过</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { shopAuditDetail } from '@/api/shops/index'
export default {
  name: 'ShopAudit',
  data () {
    return {
      textareaBeiZhu: '',
      labelPosition: 'left',
      formLabelAlign: {
        peisongTime: [start_time, end_time],
        // avatar: '',
        // name: '',
        // region: '',
        // type: '',
        // uname: '',
        // unum: '',
        // umobile: '',
        peisongQuyuTime: [start_time, end_time],
        // inviteCode: ''
      }
    }
  },
  async created () {
    try {
      const { data: res } = await shopAuditDetail(this.$route.query.id)
      console.log(res)
      this.formLabelAlign = res
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-style {
  height: 60px;
  line-height: 60px;
  font-size: 14px !important;
  color: #606266;
}
::v-deep .mini-input-price-type {
  .el-form-item__label {
    width: 60px !important;
  }
  .el-input__inner {
    width: 65px;
  }
}

::v-deep .mini-input-price-type-large {
  .el-form-item__label {
    width: 70px !important;
  }
  .el-input__inner {
    width: 65px;
  }
}
</style>