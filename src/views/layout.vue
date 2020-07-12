<template>
  <div class="home-container">
    <!-- 容器 start -->
    <el-container class="home-container">
      
      <el-container>
        <!-- 侧边栏 start -->
            <!-- 折叠 -->
              <el-menu
                background-color="#2f4050" 
                text-color="#ffff"
                default-active="1" 
                @open="handleOpen" 
                @close="handleClose" 
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
                router>
                <!-- 标题栏 -->
                <el-menu-item v-show="!isCollapse">
                  <h3>新零售商户管理后台</h3>
                </el-menu-item>

                <el-menu-item index="/"
                class="index_onde">
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">主页</span>
                </el-menu-item>

                <!-- 商铺管理 -->
                <el-submenu  index="/Main">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">商铺管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/shops/shopsList">商铺列表</el-menu-item>
                    <el-menu-item index="/home/shops/productList">商品列表</el-menu-item>
                    <el-menu-item index="/home/shops/openShop">开店审核</el-menu-item>
                    <el-menu-item index="/home/shops/shopRight">店铺权益设置</el-menu-item>
                    <el-menu-item index="/home/shops/shopIndustry">店铺行业管理</el-menu-item>
                    <el-menu-item index="/home/shops/productCategroy">商品类别管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!-- 商圈管理 -->
                <el-submenu  index="/BusinessDistrict">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">商圈管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/publicBusinessDistrict">共享商圈管理</el-menu-item>
                    <el-menu-item index="/home/personalBusinessDistrict">个人商圈管理</el-menu-item>、
                  </el-menu-item-group>
                </el-submenu>
                  <!-- 订单管理 -->
                <el-submenu  index="/order">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">订单管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/orderList">订单列表</el-menu-item>
                    <el-menu-item index="/home/orderCalculation">订单统计</el-menu-item>、
                  </el-menu-item-group>
                </el-submenu>
                <!-- 优惠卷管理 -->
                <el-submenu  index="/discount">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">优惠卷管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/discount">通用优惠卷</el-menu-item>
                    <el-menu-item index="/home/shopDiscount">店铺优惠卷</el-menu-item>、
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/home/commentList">
                    <i class="el-icon-s-comment"></i>
                    <span slot="title">推广列表</span>
                </el-menu-item>
                <!-- 素材库管理 -->
                <el-submenu  index="/material">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">素材库管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/publicMaterial">官方素材库</el-menu-item>
                    <el-menu-item index="/home/material">素材审核</el-menu-item>、
                    <el-menu-item index="/home/userMaterial">用户素材管理</el-menu-item>、
                  </el-menu-item-group>
                </el-submenu>

                  <!-- 财务管理 -->
                <el-submenu  index="/finance">
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">财务管理</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/finance">提现管理</el-menu-item>
                    <el-menu-item index="/home/financeOut">平台收入明细</el-menu-item>、
                    <el-menu-item index="/home/financeJion">平台支出明细</el-menu-item>、
                  </el-menu-item-group>
                </el-submenu>


                <el-submenu index="/stegin" >
                  <!-- 如果想做插槽就拿这个做就好了 -->
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                  </template>
                  <!-- 子列 -->
                  <el-menu-item-group>
                    <el-menu-item index="/home/user">账号设置</el-menu-item>
                    <el-menu-item index="/home/parms">参数设置</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>


        

        <el-container>
          <el-main>
              <el-header>
                <div class="toggle-button" @click="toggleMeume"> 
                  <i :class=" !isCollapse ? 'el-icon-s-fold':'el-icon-s-unfold'" size="mini"></i>  
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-user">修改密码</el-button>
                  <el-button el-button type='info' icon="el-icon-circle-close" @click="logout" >退出</el-button> 
                  <el-button el-button type='info' icon="el-icon-circle-close" @click="tests" >测试接口</el-button> 
                </div>
              </el-header>
            <router-view></router-view>
          </el-main>
        </el-container>

      </el-container>
    </el-container>
    <!-- 容器 end -->
  </div>
</template>

<script>
// 测试数据
let datas = {
	"username": "admin1",
	"password": "123456",
	"name": "liszhiengg",
	"phone": '13617713259',
	"role": "推广经理",
	"status": false,
	"rule": {
		"buisness": {
			"authName": "商圈管理",
			"children": [
				{
					"authName": "共享商圈"
				},
				{
					"authName": "个人商圈"
				}
			]
		},
		"shops": {
			"authName": "店铺管理",
			"children": [
				{
					"authName": "店铺列表"
				},
				{
					"authName": "商品列表"
				},
				{
					"authName": "开店审核"
				},
				{
					"authName": "店铺权益管理"
				}
			]
		}
	}
}
import  {testMock }  from '../api/mock/test'
  export default {
    data() {
      return {
        isCollapse:false
      }
    },
    methods: {
      async tests(){
        let {data:res}  = await testMock()
        console.log(res);
      },
      toggleMeume(){
        this.isCollapse =!this.isCollapse
      },
      handleOpen(){},
      handleClose(){},
      // 退出
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
    },
    created () {
    },
  }
</script>

<style lang="scss" scoped>
// 修改自定义样式
.el-header {
  background-color: #ffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  font-size: 18px;
  // color: aliceblue;
}
.el-home {
  background-color:#f8f9fb;
  padding: 0px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-submenu__title {
    color: #f8f9fb!important;
  }

.el-menu-item {
  background-color: #243443;
}

// 自定义样式
.home-container {
  height: 100%;
}
.toggle-button {
  // background-color:#67C23A;
  font-size: 24px;
  color:#243443;
}

.index_onde {
  margin-top: 22px;
}

</style>