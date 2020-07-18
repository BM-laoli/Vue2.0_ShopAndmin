<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card bg-defaultPink">
      <!-- heder头部 -->
        <hader-from @data-query="queryLoadList" is-pagination.sync="ispagination"></hader-from>
    </el-card>  

    
    <el-card class="box-card bg-defaultPink">
        <!-- body 身体 -->
      <div class="tabbe-box">
        <div class="">
           <el-table
              :data="tableData.list"
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="店铺编号"
                width="100"
                #default="{row:shoplist}">
                <el-tooltip class="item" effect="dark"
                  :content="(shoplist._id)" 
                  placement="top-start">
                <span>
                  {{ shoplist._id |reduceText(3,4) }}</span>                
                </el-tooltip>
              </el-table-column>
             <el-table-column
                label="店铺名称"
                width="110"
                #default="{row:shoplist}">
                <el-tooltip class="item" effect="dark"
                :content="(shoplist.shop_name + '-' + shoplist.shop_level_name)" 
                  placement="top-start">
                  <span> 
                      {{ (shoplist.shop_name + '-' + shoplist.shop_level_name) | reduceText(3,4)  }} 
                  </span>
                </el-tooltip>
              
              </el-table-column>
              <el-table-column
                prop="industry"
                label="店铺行业"
                width="150">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="店铺地址"
                  width="125"
                  #default="{row:shoplist}">
                  <el-tooltip class="item" effect="dark"
                  :content="shoplist.address" 
                    placement="top-start">
                    <span> 
                        {{ shoplist.address | reduceText(6,7)  }} 
                    </span>
                  </el-tooltip>
                
                </el-table-column>
              <el-table-column
                prop="phone"
                width="150" 
                label="联系电话">
              </el-table-column>
              <el-table-column
                label="推广人ID"
                prop="_id"
              >
              </el-table-column>
              <el-table-column
                label="权益级别"
                width="150"
              >
              <span>一级权限</span>
              </el-table-column>
                <el-table-column
                label="销售额"
                width="100"
              >
              <span>2333</span>元
              </el-table-column>
                <el-table-column
                label="操作"
                #default="{row:shopbase}"
              >
               <!-- <el-button type="primary" size="mini">详情</el-button> -->
               <el-button  type="primary"  @click="$router.push( {path:'/home/shops/shopDetail',query:{id: shopbase._id}} )">详情</el-button>
               <el-button  type="primary"  @click="$router.push( {path:'/home/shops/productList', query:{id: shopbase._id}} )">查看商品</el-button>
               <el-button  type="primary"  @click="$router.push( {path:'/home/shops/businessAnalysis', query:{id: shopbase._id+''}} )">经营分析</el-button>
              </el-table-column>
            </el-table>
        </div>
             <el-pagination
              v-show="ispagination"
              @size-change="onLoadList()"
              @current-change="onLoadList()"
              :current-page.sync="tableData.queryInfo.page"
              :page-sizes="[2, 5, 10]"
              :page-size.sync="tableData.queryInfo.size"
              layout="total, sizes, prev, pager, next,jumper, slot"
              :total="tableData.queryInfo.total">
            </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getBusinessListPublic } from '../../api/mock/business-district'
import  HaderFrom from '../../components/business-district/hader-from'
  export default {
    components: {
      breadCrumbs,
      HaderFrom
    },
    data() {
      return {
          ispagination:true,
          tableData:{
            list:[],
            queryInfo:{
              total:0,
              size:5,
              page:1
            }
          }
        }
    },
  created () {
    this.onLoadList()
  },
   methods: {
    async onLoadList(){
      console.log(666666);
      try {
        const {data:res } = await getBusinessListPublic( this.tableData.queryInfo)
        this.tableData.list = res.records
          // 为分页器传输配置
        this.tableData.queryInfo.total = res.total,
        this.tableData.queryInfo.size = res.size,
        this.tableData.queryInfo.page = res.page
        this.ispagination = true
      } catch (error) {
        console.log(error);
      }

    },
    queryLoadList(value){
      this.tableData.list = value 
      this.ispagination = false
    }
   },
  }
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  padding: 8px;
}
.hedaer-box {
  width: 100%;
  margin-bottom: 15px;
  .el-form {
    padding-top: 20px;
  }
  .comfrim {
    margin-left: 55px;
  }
}

.tabbe-box {  
  width: 100%;
}

.el-pagination {
  margin-top: 15px;
}

</style>



