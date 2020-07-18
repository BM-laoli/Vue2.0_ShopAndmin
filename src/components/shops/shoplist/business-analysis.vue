<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card" v-if="loading">
      <el-button
        type="primary"
        @click="$router.push('/home/shops/shopsList')"
        style="margin-bottom:20px"
      >返回店铺列表</el-button>
      <el-row>
        <el-col :span="8">
          <div style="font-size:14px; margin-bottom:5px">店铺编号：{{info.uid}}</div>
          <div style="font-size:14px;">行 业:{{info.industry}}</div>
        </el-col>
        <el-col :span="16">
          <div
            style="font-size:14px; margin-bottom:5px"
          >店铺名称：{{info.shop_name}}-{{info.shop_level_name}}</div>
          <div style="font-size:14px;">联系电话：{{info.phone}}</div>
        </el-col>
      </el-row>
      <hr />
      <div class="wrap line-bottom">
        <h5>店铺销售情况</h5>
        <el-row style="width:55%;">
          <el-col :span="3">日期：</el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="info.saleSituation.start_date"
              type="date"
              placeholder="选择日期"
              size="small"
              style="width:150px"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="info.saleSituation.end_date"
              type="date"
              placeholder="选择日期"
              size="small"
              style="width:150px"
            ></el-date-picker>
          </el-col>
        </el-row>
        <div class="sale-chart">
          <h6>销售额：{{info.saleSituation.total_money}}元</h6>
          <h6>总订单量：{{info.saleSituation.total_order}}单</h6>
          <div id="main-sale" style="width: 500px;height:500px;"></div>
        </div>
      </div>
      <div class="wrap">
        <h5>店铺消费情况</h5>
        <div class="consum-chart">
          <div id="main-consum" style="width: 500px;height:500px;"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "@/components/common/bread-crumbs";
// import ECharts from "echarts";
import ECharts from "@/lib/echarts.js";
import { getAnalysis } from "@/api/mock/cjhttp";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      loading: false,
      info: {}
    };
  },
  mounted() {
    this.getAnalysisFn();
  },
  created() {},
  methods: {
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
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "销售情况",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            data: data.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
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

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      saleEchart.setOption(option);
    },
    drawConsum() {
      var consumEchart = ECharts.init(document.getElementById("main-consum"));
      var data = [];
      const consum = this.info.consumSituation;
      for (var k in consum) {
        var obj = {};
        obj.name = k + " : " + consum[k] + "元";
        obj.value = consum[k];
        data.push(obj);
      }

      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "销售情况",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            data: data.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
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

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      consumEchart.setOption(option);
    },
    async getAnalysisFn() {
      const id = this.$route.query.id;
      const { data: res } = await getAnalysis(id);
      console.log("analysis", res);
      this.info = res;
      this.loading = true;
      this.$nextTick(() => {
        this.drawSale();
        this.drawConsum();
      });

      // this.drawConsum();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  position: relative;
  .line-bottom {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .sale-chart,
  .consum-chart {
    width: 500px;
    text-align: center;
    // 占据原来的位置
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    h6 {
      display: inline-block;
      margin: 20px;
    }
  }
}
</style>