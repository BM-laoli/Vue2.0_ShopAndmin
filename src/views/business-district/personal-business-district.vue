<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <!-- 切换之前 -->
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
       <personal-hader-from></personal-hader-from>
      </div>
      <!-- 中间 -->
      <div class="border-middleware">
        <div> 用户数量：<span> 15111  </span> </div>
        <div> 订单数量：<span> 1511131 </span> </div>
        <div> 消费总额：<span> 1555w </span> </div>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <div>
           <el-table
              :data="tableData.list"
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="用户ID"
                width="100">
              </el-table-column>
             <el-table-column
                label="用户昵称"
                prop="username"
                >
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话"
               >
              </el-table-column>
              <el-table-column
                  prop="business_district"
                  label="商圈店铺数量"
                  >
                </el-table-column>
              <el-table-column
                prop="order"
                width="150" 
                label="订单数量">
              </el-table-column>
              <el-table-column
                label="消费额"
                prop="consumption"
                
                #default="{row:personal}"
              >
              <div>
                <span>{{personal.consumption}}元</span>
              </div>
              </el-table-column>
              <el-table-column
                label="消费频次"
                prop="frequency"
                width="150"
                #default="{row:personal}"
              >
              <span>{{personal.frequency}}次/天</span>
              </el-table-column>

                <el-table-column
                  label="操作"
                  >
                <el-link :underline="false" icon="el-icon-s-marketing" @click="switchPage = true">消费分析</el-link>
              </el-table-column>
            </el-table>
        </div>
             <!-- <el-pagination
              @size-change="onLoadList()"
              @current-change="onLoadList()"
              :current-page.sync="tableData.queryInfo.page"
              :page-sizes="[2, 5, 10]"
              :page-size.sync="tableData.queryInfo.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.queryInfo.total">
            </el-pagination> -->
      </div>
    </el-card>
    <el-dialog
      :visible.sync="switchPage"
      width="90%"
      top="5vh"
      >
      <personal-analysis @close=" () => {switchPage = false}"></personal-analysis>
    </el-dialog>


  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getBusinessListPublic,getPersinalData } from '../../api/mock/business-district'
import  PersonalHaderFrom from '../../components/business-district/personal-hader-from'
import PersonalAnalysis from '../../components/business-district/personal-analysis'
  export default {
    name:'Personal',
    components: {
      breadCrumbs,
      PersonalHaderFrom,
      PersonalAnalysis
    },
    data() {
      return {
          tableData:{
            list:[],
            queryInfo:{
              total:0,
              size:5,
              page:1
            }
          },
          switchPage:false
        }
    },
  created () {
    this.onLoadList()
  },
   methods: {
    async onLoadList(){
      try {
        // const {data:res } = await getBusinessListPublic( this.tableData.queryInfo)
        // this.tableData.list = res.records
        //   // 为分页器传输配置
        // this.tableData.queryInfo.total = res.total,
        // this.tableData.queryInfo.size = res.size,
        // this.tableData.queryInfo.page = res.page
        const {data:res} = await getPersinalData()
        console.log(res);
        this.tableData.list = res.data.data
        
      } catch (error) {
        console.log(error);
      }

    },
    handleClose(){}
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
  // height: 150px;
  background-color: pink;
  .el-form {
    padding-top: 20px;
  }
  .comfrim {
    margin-left: 55px;
  }
}
.tabbe-box {
  width: 100%;
  height: 1000px;
  background-color: cornflowerblue;
}

.border-middleware {
  width: 100%;
  height: 80px;
  background-color: yellowgreen;
  margin: 10px 0;
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
.slidebox {
  overflow: hidden;
}
</style>