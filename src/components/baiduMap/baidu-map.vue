<template>
  <div id="map" style="width: 600px">
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="height:400px; width:600px"
      :scroll-wheel-zoom="true"
      :double-click-zoom="false"
    >
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    </baidu-map>
    <el-input
      disabled
      style="width:250px; display: inline-block; margin-right:50px; margin-top:20px"
      v-model="preAddress"
    ></el-input>
    <el-input
      disabled
      style="width:250px; display: inline-block;margin-top:20px"
      v-model="detailAddress"
    ></el-input>
  </div>
</template>

<script>
import Vue from "vue";
import BaiduMap from "vue-baidu-map";

Vue.use(BaiduMap, {
  ak: "oOkYI5VsEGiXVZzVcAoLb9kD1eAq8lBz"
});
export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      center: {},
      zoom: 20,
      preAddress: "",
      detailAddress: ""
    };
  },
  created() {
    // 对父组件传过来的地址进行解析
    const arr = this.address.split(".");
    this.preAddress = "湖南省" + arr[0] + arr[1];
    this.detailAddress = arr[2] + arr[3];
  },
  mounted() {},
  methods: {
    // 地图一开始渲染时触发
    handler({ BMap, map }) {
      const geocoder = new BMap.Geocoder();
      geocoder.getPoint(this.preAddress + this.detailAddress, function(res) {
        console.log(res);
        const { lng, lat } = res;
        // 用于描述地图上点的经纬度。
        var point = new BMap.Point(lng, lat);
        console.log("point", point);
        map.centerAndZoom(point, 15);
        var myIcon = new BMap.Icon(
          require("../../assets/baidu.png"),
          new BMap.Size(60, 60)
        );
        var marker = new BMap.Marker(point, {
          icon: myIcon
        });
        map.addOverlay(marker);
        // var circle = new BMap.Circle(point, 6, {
        //   strokeColor: "Red",
        //   strokeWeight: 6,
        //   strokeOpacity: 1,
        //   Color: "Red",
        //   fillColor: "#f03"
        // });
        // map.addOverlay(circle);
        // 这是为了将map挂载到全局，方便后续调用
        window.map = map;
      });
    }
    // 当第一个地址input失焦时触发，在页面上显示该地址对于的点
    // getMapPoint() {
    //   // console.log("this.address", this.address);
    //   const geocoder = new BMap.Geocoder();
    //   geocoder.getPoint(this.preAddress, function(res) {
    //     console.log(res);
    //     const { lng, lat } = res;
    //     var point = new BMap.Point(lng, lat); // 用于描述地图上点的经纬度。
    //     map.centerAndZoom(point, 13);
    //     var marker = new BMap.Marker(point); // 创建标注
    //     console.log("marker----", marker);

    //     map.addOverlay(marker); // 将标注添加到地图中
    //     var circle = new BMap.Circle(point, 6, {
    //       strokeColor: "Red",
    //       strokeWeight: 6,
    //       strokeOpacity: 1,
    //       Color: "Red",
    //       fillColor: "#f03"
    //     });
    //     map.addOverlay(circle);
    //   });
    // },

    // 点击地图上到位置可在input框中显示具体的中文地址
    // getClickInfo(e) {
    //   console.log("e.point", e.point);
    //   map.clearOverlays();
    //   this.center.lng = e.point.lng;
    //   this.center.lat = e.point.lat;
    //   var point = new BMap.Point(this.center.lng, this.center.lat); // 用于描述地图上点的经纬度。
    //   var marker = new BMap.Marker(point); // 创建标注
    //   console.log("marker----", marker);

    //   map.addOverlay(marker); // 将标注添加到地图中
    //   var circle = new BMap.Circle(point, 1, {
    //     strokeColor: "Red",
    //     strokeWeight: 6,
    //     strokeOpacity: 1,
    //     Color: "Red",
    //     fillColor: "#f03"
    //   });
    //   map.addOverlay(circle);
    //   var geocoder = new BMap.Geocoder();
    //   geocoder.getLocation(e.point, rs => {
    //     console.log("地址描述(string)", rs.address); // 地址描述(string)

    //     console.log("结构化的地址描述(object)", rs.addressComponents); // 结构化的地址描述(object)

    //     this.preAddress =
    //       rs.addressComponents.province +
    //       rs.addressComponents.city +
    //       rs.addressComponents.district;
    //     this.detailAddress =
    //       rs.addressComponents.street + rs.addressComponents.streetNumber;
    //     console.log("省", rs.addressComponents.province); // 省
    //     console.log("城市", rs.addressComponents.city); // 城市
    //     console.log("区县", rs.addressComponents.district); // 区县
    //     console.log("街道", rs.addressComponents.street); // 街道
    //     console.log("门牌号", rs.addressComponents.streetNumber); // 门牌号

    //     console.log("附近的POI点(array)", rs.surroundingPois); // 附近的POI点(array)

    //     console.log("商圈字段，代表此点所属的商圈(string)", rs.business); // 商圈字段，代表此点所属的商圈(string)
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
</style>
