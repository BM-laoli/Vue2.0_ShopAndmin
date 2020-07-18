<template>
  <div >
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <!-- 提现 -->
          <div class="muner font-md">
            <div shadow="always" class="sonCard">
              <div class="card-box">
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
              </div>
              <div class="features">
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <div>
                  <el-button size="mini" type="primary" @click="()=>{$router.push('/home/finance')}">提现管理 </el-button>
                </div>
                <el-button size="mini" type="primary" @click="()=>{ $router.push('/home/financeOut') }">平台支持明细 </el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 提现 -->
          <div class="muner font-md">
            <div shadow="always" class="sonCard">
              <div class="card-box">
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
                <div>
                  总提现金额：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
              </div>
              <div class="features">
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <div>
                  <el-button size="mini" type="primary" @click="()=>{ $router.push('/home/shops/shopsList') }">商铺列表 </el-button>
                </div>
                <el-button size="mini" type="primary" @click="()=>{ $router.push('/home/shops/productList') }" >商品列表 </el-button>
              </div>
            </div>
          </div>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- 提现 -->
          <div class="muner font-md">
            <div shadow="always" class="sonCard">
              <div class="card-box">
                <div>
                  共享商圈收益：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
                <div>
                  个人商圈收益：<span>{{(Math.random() * 100000).toFixed(2)}}元</span>
                </div>
              
              </div>
              <div class="features">
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <!-- <el-button size="mini" type="primary">5 </el-button> -->
                <div>
                  <el-button size="mini" type="primary" @click="()=>{ $router.push('/home/publicBusinessDistrict') }">共享商圈 </el-button>
                </div>
                <el-button size="mini" type="primary" @click="()=>{ $router.push('/home/personalBusinessDistrict') }">个人商圈</el-button>
              </div>
            </div>
          </div>

        </el-col>
        
      </el-row>
     

    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
export default {
  components: {
    breadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  height: 1000px;
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
}
.muner {
  padding: 15px;
  width: 80%;
  height: 150px;
}
.el-row {
  margin-top: 88px;
}
.el-row:nth-child(1) {
  margin-top: 0;
}
.sonCard {
  width: 100%;
  padding: 5px;
  height: 150%;
  background-color: #fff;
  line-height: 35px;  
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.card-box {
  span {
    color: red;
  }
}
.features {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-button {
    width: 150px;
    margin-top: 15px;
  }
}
</style>