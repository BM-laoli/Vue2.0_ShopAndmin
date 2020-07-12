<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="店铺名称/编号">
              <el-input v-model="formInline.query" placeholder="店铺名称/编号"></el-input>
            </el-form-item>
            <el-form-item label="行业">
              <el-select v-model="formInline.industry" placeholder="选择所属行业">
                <el-option label="航天制造业" value="航天制造业"></el-option>
                <el-option label="生鲜" value="生鲜"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </el-form>
          <div class="box2">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onCancel">重置</el-button>
          </div>
      </div>


      <div class="border-middleware" v-if="shopsData.shopsList.length !== 0">
          <div> 商铺数量：<span> {{shopsData.shopsList.length}} </span> </div>
          <div> 共享商铺数量：<span> {{ shopsData.shopsList | totalFilter('shop_shared',false) }} </span> </div>
          <div> 销售总额：<span> 1555w </span> </div>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <!-- 数据统计项 -->
         <el-table
         :data="shopsData.shopsList"
          style="width: 100%">
          <el-table-column
            label="店铺编号"
            width="80"
            #default="{row:shopbase}">
            <span>
              {{shopbase._id.slice(0,5)}}
            </span>
          </el-table-column>
          <el-table-column
            label="店铺名称"
            width="110"
            #default="{row:shopbase}">
            <el-tooltip class="item" effect="dark"
             :content="(shopbase.shop_name + '-' + shopbase.shop_level_name)" 
               placement="top-start">
               <span> 
                  {{ (shopbase.shop_name + '-' + shopbase.shop_level_name) | reduceText(3,4)  }} 
               </span>
            </el-tooltip>
          
          </el-table-column>
          <el-table-column
            prop="industry"
            label="店铺行业"
             width="90">
          </el-table-column>
          <el-table-column
            prop="address"
            label="店铺地址"
            width="125"
            #default="{row:shopbase}">
            <el-tooltip class="item" effect="dark"
             :content="shopbase.address" 
               placement="top-start">
               <span> 
                  {{ shopbase.address | reduceText(6,7)  }} 
               </span>
            </el-tooltip>
          
          </el-table-column>
          <el-table-column
            prop="phone"
            width="100"
            label="联系电话">
          </el-table-column>
          <el-table-column
            label="推广人ID"
            width="80"
            #default="{row:shopbase}">
            <el-tooltip class="item" effect="dark"
              :content="shopbase._id" 
                placement="top-start">
                <span> 
                    {{ shopbase._id | reduceText(6,7)  }} 
                </span>
            </el-tooltip>
          
          </el-table-column>
          <el-table-column
            prop="__v"
            width="100"
            label="权益级别">
          </el-table-column>
          <el-table-column
           width="90"
            label="权益时限制">
            <span>233h</span>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="销售额"
             width="125"
            #default="{row:shopbase}"
            >
            <span>
            ￥{{shopbase.phone}}
            </span>
          </el-table-column>
          <el-table-column
            prop="is_approved"
            label="运营状态"
             width="90"
            #default="{row:shopbase}">
            <span>独立运营</span>
          </el-table-column>
           <el-table-column
            prop="is_approved"
            label="状态"
             width="90"
            #default="{row:shopbase}">
            <span>
              {{shopbase.is_approved ? '启用中' :'已停用' }}
            </span>
          </el-table-column>
          <el-table-column
            prop="shop_id"
            label="备注"
             width="160"
            #default="{row:shopbase}">
            <span>社会我大天朝的店铺</span>
          </el-table-column>
          <el-table-column
          label="操作"
          #default="{row:shopbase}"
          >
        <el-link :underline="false" icon="el-icon-more">详情</el-link>
        <el-link :underline="false" icon="el-icon-s-management">查看商品</el-link>
        <el-link :underline="false" icon="el-icon-s-marketing">经营分析</el-link>
        <el-link :underline="false" icon="el-icon-refresh">启用</el-link>
        <el-link :underline="false" icon="el-icon-delete">删除</el-link>
          </el-table-column>
        </el-table>      
      <!-- 分页器 -->
      
      <el-pagination
        @size-change="getShoplist()"
        @current-change="getShoplist()"
        :current-page.sync="queryInfo.page"
        :page-sizes="[2, 5, 10]"
        :page-size.sync="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total">
      </el-pagination>
      </div>

    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
  export default {
    name:'shopList',
    components: {
      breadCrumbs,
    },  
    created () {
      this.getShoplist()
    },
    data() {
      return {
        formInline: {
        },
        shopsData:{
          shopsList:[]
        },  
        queryInfo:{
          total:0,
          size:5,
          page:1
        }
      }
    },
    methods: {
      async getShoplist() {
       const {data:res} =  await this.$http.get('/rest/public_shop_base/all',
       { params:this.queryInfo })
      this.shopsData.shopsList = res.records
      // 为分页器传输配置
      this.queryInfo.total = res.total,
      this.queryInfo.size = res.size,
      this.queryInfo.page = res.page
      },
      onSubmit(){
        console.log(this.formInline);
      },
      onCancel(){}
    },
  }
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color:	#E6E6FA;
  padding: 8px;
}
.hedaer-box {
  width: 100%;
  height: 80px;
  background-color: pink;
  border-radius: 10px;
  position: relative;
}

.tabbe-box {
  width: 100%;
  // height: 1000px;
  background-color: cornflowerblue;
  padding: 8px;
}
.box2 {
  position: absolute;
  right: 15%;
  top: 25%;
  .el-button {
    margin-left: 25px;
  }
}

.el-form {
  position: absolute;
  top: 25%;
  left: 3%;
  color: black;
}
.border-middleware {
  width: 100%;
  height: 80px;
  background-color: yellowgreen;
  margin: 10px 0;
}

.border-middleware {
  display: flex;
  justify-self: start;
  align-items: center;
  div{
    margin-left: 25px;
  }
  span {
    color:red
  }
}

::v-deep.el-table__header-wrapper{
border: 5px solid black;
border-radius: 10px;
width: 1400px;
color:red;
}
.el-link {
  font-size: 12px;
  padding: 5px;
}

</style>