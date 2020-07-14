<template>
  <div class="hander-container">
      <div class="hander-box">
        <div>
         <el-button type="primary" @click="$emit('close')">返回列表</el-button>
        </div>
        <div class="mymessage">
          <div>用户ID:4544654</div>
          <div>用户昵称:4544654</div>
          <div>用户昵称:联系电话</div>
        </div>
      </div>
      <div class="conter-box">
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
        <div id="myChart" class="Chartbox" :style="{width: '420px', height: '100%'}"></div>
        <div class="totalBOX">
          <div>总  订  单:10w</div>
          <div>总消费额：150w</div>
        </div>
      </div>
      <!-- 数据报表统计模块 -->
     <div class="tabbe-box">
        <div>
           <el-table
              :data="tableData.list"
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="商户编号"
                width="100">
              </el-table-column>
             <el-table-column
                label="商户名"
                prop="username"
                >
              </el-table-column>
              <el-table-column
                prop="phone"
                label="行业"
               >
              </el-table-column>
              <el-table-column
                prop="order"
                width="150" 
                label="订单商品数量">
              </el-table-column>
              <el-table-column
                label="定单金额"
                prop="consumption"
                #default="{row:personal}"
              >
              <div>
                <span>{{personal.consumption}}元</span>
              </div>
              </el-table-column>
              <el-table-column
                label="消费日期"
                >
                <span>2020-1-25</span>
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
var weatherIcons = {
    'Sunny':  'https://echarts-www.cdn.bcebos.com/examples/data/asset/img/weather/sunny_128.png',
    'Cloudy': 'https://echarts-www.cdn.bcebos.com/examples/data/asset/img/weather/cloudy_128.png',
    'Showers': 'https://echarts-www.cdn.bcebos.com/examples/data/asset/img/weather/showers_128.png'
};

let  option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },  
    legend: {
        orient: 'vertical',
        top: 'middle',
        bottom: 10,
        left: 'right',
        data: ['居家', '益州', '兖州', '荆州', '幽州']
    },
    series: [
        {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
                {
                    value: 1548,
                    name: '幽州',
                    label: {
                        formatter: [
                            '{title|{b}}{abg|}',
                            '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                            '{hr|}',
                            '  {Sunny|}{value|202}{rate|55.3%}',
                            '  {Cloudy|}{value|142}{rate|38.9%}',
                            '  {Showers|}{value|21}{rate|5.8%}'
                        ].join('\n'),
                        backgroundColor: '#eee',
                        borderColor: '#777',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            title: {
                                color: '#eee',
                                align: 'center'
                            },
                            abg: {
                                backgroundColor: '#333',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            },
                            Sunny: {
                                height: 30,
                                align: 'left',
                                backgroundColor: {
                                    image: weatherIcons.Sunny
                                }
                            },
                            Cloudy: {
                                height: 30,
                                align: 'left',
                                backgroundColor: {
                                    image: weatherIcons.Cloudy
                                }
                            },
                            Showers: {
                                height: 30,
                                align: 'left',
                                backgroundColor: {
                                    image: weatherIcons.Showers
                                }
                            },
                            weatherHead: {
                                color: '#333',
                                height: 24,
                                align: 'left'
                            },
                            hr: {
                                borderColor: '#777',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            value: {
                                width: 20,
                                padding: [0, 20, 0, 30],
                                align: 'left'
                            },
                            valueHead: {
                                color: '#333',
                                width: 20,
                                padding: [0, 20, 0, 30],
                                align: 'center'
                            },
                            rate: {
                                width: 40,
                                align: 'right',
                                padding: [0, 10, 0, 0]
                            },
                            rateHead: {
                                color: '#333',
                                width: 40,
                                align: 'center',
                                padding: [0, 10, 0, 0]
                            }
                        }
                    }
                },
                {value: 535, name: '荆州',
                    
                },
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
import { getBusinessListPublic,getPersinalData } from '../../api/mock/business-district'
  export default {
    name:'PersonalAnalysis',
    mounted () {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      myChart.setOption(option);
    },
    created () {
      this.onLoadList()
    },
    data() {
      return {
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
  // border: 1px solid #cccccc;
  background-color: pink;
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

</style>