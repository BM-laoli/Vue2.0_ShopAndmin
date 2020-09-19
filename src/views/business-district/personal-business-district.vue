<template>
  <div>
   <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <!-- 切换之前 -->
    <el-card class="box-card">
       <personal-hader-from @data-change="(value)=>{ tableData.list = value}"></personal-hader-from>
     </el-card>
      <!-- 中间 -->
      <el-card class="box-card">
        <div class="border-middleware bg-defaultPink">
          <div> 用户数量：<span> {{ tableData.countToatal.usernumber}}  </span> </div>
          <div> 订单数量：<span> {{ tableData.countToatal.ordernumber}} </span> </div>
          <div> 消费总额：<span> {{ tableData.countToatal.total_price}} </span> </div>
        </div>
     </el-card>

      <el-card class="box-card">
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
                prop="name"
                >
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话"
               >
              </el-table-column>
              <el-table-column
                  prop="businesnumber"
                  label="商圈店铺数量"
                  >
                </el-table-column>
              <el-table-column
                prop="ordernumber"
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
                prop="consumptionnumber"
                width="150"
                #default="{row:personal}"
              >
              <span>{{personal.consumptionnumber}}次/天</span>
              </el-table-column>

                <el-table-column
                  label="操作"
                  #default="{row}"
                  >
                <!-- <el-link  :underline="false" icon="el-icon-s-marketing"  ></el-link> -->
                    <el-button  type="primary"  @click="showAnakysis(row._id)" >消费分析</el-button>
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

      <el-pagination
        @size-change="onLoadList()"
        @current-change="onLoadList()"
        :current-page.sync="tableData.queryInfo.page"
        :page-sizes="[2, 5, 10]"
        :page-size.sync="tableData.queryInfo.size"
        layout="total, sizes, prev, pager, next,jumper, slot"
        :total="tableData.queryInfo.total">
      </el-pagination>
    </el-card>



    <el-dialog
      :visible.sync="switchPage"
      width="90%"
      top="5vh"
      @closed="switchPageOver = false"
      @open="switchPageOver = true"
      >
      <personal-analysis :crent-id="crentId" v-if="switchPageOver" @close=" () => {switchPage = false}"></personal-analysis>
    </el-dialog>


  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getPersinaBusinessList} from '../../api/mock/business-district'
import  PersonalHaderFrom from '../../components/business-district/personal-hader-from'
import PersonalAnalysis from '../../components/business-district/personal-analysis'
import { log } from 'util'
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
            countToatal:{
             usernumber: 0,
             ordernumber: 0,
             total_price: 0 
            },
            queryInfo:{
              total:0,
              size:5,
              page:1
            }
          },
          switchPageOver:false,
          switchPage:false,
          crentId:''
        }
    },
  created () {
    this.onLoadList()
  },
   methods: {
    async onLoadList(){
      try {
        let { data:res } = await getPersinaBusinessList( this.tableData.queryInfo)
        this.tableData.list = res.querydata.records

        // 为分页器传输配置
        this.tableData.queryInfo.total = res.querydata.total,
        this.tableData.queryInfo.size = res.querydata.size,
        this.tableData.queryInfo.page = res.querydata.page

        // 统计
        this.tableData.countToatal.usernumber = res.usernumber
        this.tableData.countToatal.ordernumber = res.ordernumber
        this.tableData.countToatal.total_price = res.total_price

        // const {data:res} = await getPersinalData()
        // console.log(res);
        // this.tableData.list = res.data.data
        
      } catch (error) {
        console.log(error);
      }

    },
    showAnakysis(value){
      this.switchPage = true
      this.crentId = value

    },
    handleClose(){},
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

.border-middleware {
  width: 100%;
  // height: px;
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

.el-pagination {
  margin-top: 15px;
}
</style>