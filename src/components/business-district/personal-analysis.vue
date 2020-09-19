<template>
  <div class="hander-container">
      <div class="hander-box box-radius">
        <div>
         <el-button type="primary" @click="$emit('close')">返回列表</el-button>
        </div>
        <div class="mymessage">
          <div>用户ID:  {{tableData.userid}}</div>
          <div>用户昵称:{{tableData.username}}</div>
          <div>联系电话:{{tableData.userphone }}</div>
        </div>
      </div>
      <div class="conter-box box-radius">
        <span>用户消费情况</span>
        <div class="data-box">日期: 
           <el-date-picker
            v-model="value"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
       <div id="main-sale" style="width: 500px;height:500px;"></div>
        <div class="totalBOX">
          <div>总  订  单:10w</div>
          <div>总消费额：150w</div>
        </div>
      </div>
      <!-- 数据报表统计模块 -->
     <div class="tabbe-box box-radius">
        <div>
           <el-table
              class="box-radius"
              :data="tableData.list"
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="商户编号"
                width="100">
              </el-table-column>
             <el-table-column
                label="商户名"
                prop="shop_name"
                >
              </el-table-column>
              <el-table-column
                prop="industry"
                label="行业"
               >
              </el-table-column>
              <el-table-column
                prop="shop_sales"
                width="150" 
                label="订单商品数量">
              </el-table-column>
              <el-table-column
                label="定单金额"
                prop="consumption"
                #default="{row:personal}"
              >
              <div>
                <span>{{( Math.random() * 150).toFixed(2)}}元</span>
              </div>
              </el-table-column>
              <el-table-column
                prop="shop_hours_start"
                label="消费日期"
                #default="{row:personal}" 
                >
                <span> {{personal.shop_hours_start| dateFormat }} </span>
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
  </div>
</template>

<script>
import ECharts from "@/lib/echarts.js";
// import ECharts from 'echarts'
import { getConsumpPersonById,getPersinalData } from '@/api/mock/business-district'
  export default {
    name:'PersonalAnalysis',
    props: {
      crentId: {
        type: String,
      },
    },
    mounted () {
      this.drawSale() 
    },
    created () {
      this.onLoadList()
    },
    data() {
      return {
        info: {
          uid: "5ee77d61ca8c9a7398261dc7",
          shop_name: "美佳宜",
          shop_level_name: "保利店",
          phone: 18376621755,
          industry: "航天制造业",
          saleSituation: {
            total_order: 1234,
            total_money: 3425789,
            start_date: "2019-07-14T03:13:17.821Z",
            end_date: "2020-07-14T03:13:17.821Z",
            shopType: {
              男装: 200.0,
              女装: 300.0,
              男鞋: 400.0,
              女鞋: 367.0
            }
          },
          consumSituation: {
            模板费: 100.0,
            素材费: 200.0,
            收益费: 300.0
          }
        },
         pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: '',
        tableData:{
          list:[],
          userid:'',
          username:'',
          userphone:'',
          queryInfo:{
            total:0,
            size:5,
            page:1
          }
        },
        
      }
    },
      methods: {
        async onLoadList(){
          try {
            const {data:res } = await getConsumpPersonById({id:this.crentId})
            console.log(res);
            this.tableData.list = res.records[0].shop_id
            console.log();
            this.tableData.userid =  res.records[0]._id
            this.tableData.username = res.records[0].name
            this.tableData.userphone = res.records[0].phone
            //   // 为分页器传输配置
            // this.tableData.queryInfo.total = res.total,
            // this.tableData.queryInfo.size = res.size,
            // this.tableData.queryInfo.page = res.page
            // const {data:res} = await getPersinalData()
            // console.log(res,'heheh');
            // this.tableData.list = res.data.data
            
          } catch (error) {
            console.log(error);
          }
       },
        drawSale() {
          var saleEchart = ECharts.init(document.getElementById("main-sale"));
          var data = [];
          const shopType = this.info.saleSituation.shopType;
          for (var k in shopType) {
            var obj = {};
            obj.name = k + " : " + shopType[k] + "元";
            obj.value = shopType[k];
            data.push(obj);
          }

          var option = {
            tooltip: { // 提示框
              trigger: "item", // 触发的类型  数据项图形触发，饼图就是点击触发
              formatter: "{a} <br/> {b}({d}%)"  // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式。,具体的配置项还有很多
              // a b d 都是占位符号 表示的是  系列名称，数据项名称，百分比
            },

            visualMap: { // 是视觉映射组件
              show: false,  // 是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。注意数据的映射还是存在的
              min: 80,  // 视觉映射的最大最小值
              max: 600,
              inRange: {  // 定义 在选中范围中 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）
                colorLightness: [0, 1]  // 演示的明暗程度
              }
            },
            series: [  // 系列里列表，说白了 就是类型
              {
                name: "销售情况",
                type: "pie",
                radius: "65%",
                center: ["50%", "50%"],
                data: data.sort(function(a, b) {  // 获取数据
                  return a.value - b.value;
                }), 
                roseType: "radius",  // 是否显示南丁格尔图 通过半径区分数据大小。
                label: {
                  color: "#1E1E1E"
                },
                labelLine: {
                  lineStyle: {
                    color: "#1E1E1E"
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                itemStyle: {
                  color: "#c23531",
                  shadowBlur: 200,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },

                animationType: "scale",  // 初始动画效果
                animationEasing: "elasticOut",  // 初始化的时候 动画的效果曲线
                animationDelay: function(idx) {  // 动画的缓动延迟时间
                  return Math.random() * 200;
                }
              }
            ]
          };

          saleEchart.setOption(option);
        },
    }

  }
</script>

<style lang='scss'  scoped>
.hander-container {
  display: flex;
  flex-direction: column;
  padding: 35px;
  background-color: #e6e6fa;

}
.hander-box {
  display: felx;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  background-color: #fff;
    .el-button{
    margin-top: 15px;
  }
}
.mymessage {
  display: flex;
  div{
    width: 150px;
    height: 55px;
    font-size: 15px;
    line-height: 55px;
    margin-right: 150px;  
  }
}

.conter-box {
  width: 100%;
  height: 550px;
  background-color:#fff;
  border-bottom: 2px solid #ccc;
  margin: 10px 0;
  border-top: 1px solid #ccc;
  span{
    display: block;
    font-size: 17px;
    padding: 15px;
  }
  .data-box{
    font-size: 20px;
    padding: 15px;
    position: relative;
  }
}
.Chartbox {
    position: absolute;
    left: 750px;
    top: 100px;
    width: 420px;
    height: 550px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0px;
    border-width: 0px;
}
.totalBOX {
  display: flex;
  position: absolute;
  top: 440px;
  left: 375px;
  font-size: 15px;
  flex-direction:column ;
  div{
    margin: 15px;
  }
}

#main-sale {
  left: 50%;
  transform: translate(-50%,-15%);
}
</style>