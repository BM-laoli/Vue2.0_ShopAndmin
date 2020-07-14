<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺ID">
              <el-input v-model="form.uid"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称">
              <el-input v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="分店名称">
              <el-input v-model="form.shop_level_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照">
              <el-image
                style="width: 60px; height: 60px"
                :src="form.shop_id_image_positive"
                :preview-src-list="[form.shop_id_image_positive]"
              ></el-image>
            </el-form-item>
            <el-form-item label="身份证反面照">
              <el-image
                style="width: 60px; height: 60px"
                :src="form.shop_id_image_positive"
                :preview-src-list="[form.shop_id_image_reverse]"
              ></el-image>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺头像">
              <el-image
                style="width: 60px; height: 60px; margin-right:10px"
                :src="form.avatar"
                :preview-src-list="[form.avatar]"
              ></el-image>
            </el-form-item>
            <el-form-item label="主要产品图">
              <el-image
                style="width: 60px; height: 60px; margin-right:10px"
                :src="v"
                :preview-src-list="[v]"
                v-for="(v,k,i) in form.shop_product_images"
                :key="i"
              ></el-image>
            </el-form-item>
            <el-form-item label="店铺实拍图">
              <el-image
                style="width: 60px; height: 60px; margin-right:10px"
                :src="v"
                :preview-src-list="[v]"
                v-for="(v,i) in form.shop_internal_images"
                :key="i"
              ></el-image>
            </el-form-item>
            <el-form-item label="营业证件照">
              <el-image
                style="width: 60px; height: 60px; margin-right:10px"
                :src="v"
                :preview-src-list="[v]"
                v-for="(v,i) in form.shop_license_images"
                :key="i"
              ></el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="店铺地址">
          <bai-du-map :address="form.address"></bai-du-map>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-row style="width:50%">
            <el-col :span="11">
              <el-form-item prop="shop_hours_start">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.shop_hours_start"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item prop="shop_hours_end">
                <!-- <el-tag>{{form.shop_hours_end | timePicker}}</el-tag> -->
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.shop_hours_end"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="发货方式">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="is_self" style="display:block">到店自提</el-checkbox>
            <el-checkbox label="sime_city" style="display:block">
              同城配送
              <el-row style="width:50%">
                <el-col :span="12">
                  <el-form-item label="起配价">
                    <el-input v-model="form.delivery.sime_city.start_price"></el-input>元
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="配送费">
                    <el-input v-model="form.delivery.sime_city.total_price"></el-input>元
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="配送时间">
                <el-row style="width:50%">
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_start">
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="form.delivery.sime_city.start_time"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">至</el-col>
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_end">
                      <!-- <el-tag>{{form.shop_hours_end | timePicker}}</el-tag> -->
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="form.delivery.sime_city.end_time"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-checkbox>
            <el-checkbox label="region" style="display:block">
              区域配送
              <el-form-item label="配送时间">
                <el-row style="width:50%">
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_start">
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="form.delivery.region.start_time"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">至</el-col>
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_end">
                      <!-- <el-tag>{{form.shop_hours_end | timePicker}}</el-tag> -->
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="form.delivery.region.end_time"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row style="width:70%">
                <el-col :span="7">
                  <el-form-item label="起配价">
                    <el-input v-model="form.delivery.region.start_price"></el-input>元
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="配送范围">
                    <el-input v-model="form.delivery.region.over"></el-input>公里（以内）
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="配送费" label-width="0px">
                    <el-input v-model="form.delivery.region.total_price"></el-input>元
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox>
            <el-checkbox label="cross_city" style="display:block">
              跨域配送
              <el-row style="width:50%">
                <el-col :span="24">
                  <el-form-item label="配送费">
                    <el-input v-model="form.delivery.cross_city.total_price"></el-input>元
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Mock from "mockjs";
import breadCrumbs from "@/components/common/bread-crumbs";
import BaiDuMap from "@/components/baiduMap/baidu-map";

export default {
  components: {
    breadCrumbs,
    BaiDuMap
  },
  // v-model不能使用过滤器，过滤器只能在{{}}和v-binld中使用
  // filters: {
  //   timePickerStart() {
  //     const arr = this.form.shop_hours_start.split(":");
  //     return new Date(2020, 7, 15, arr[0], arr[1], arr[2]);
  //     // return 1;
  //   },
  //   timePickerEnd() {
  //     const arr = this.form.shop_hours_end.split(":");
  //     return new Date(2020, 7, 15, arr[0], arr[1], arr[2]);
  //   }
  // },

  // 计算属性也不能用在v-model里
  // computed: {
  //   timePicker(value) {
  //     const arr = value.split(":");
  //     return new Date(2020, 7, 15, arr[0], arr[1], arr[2]);
  //   }
  // },
  data() {
    return {
      checkList: [],
      form: {
        is_public: false,
        uid: "5ee77d61ca8c9a7398261dc7",
        shop_name: "美佳宜",
        shop_level_name: "保利店",
        industry: "航天制造业",
        shop_id: "45032419990421491X",
        shop_id_image_positive:
          "http://img0.imgtn.bdimg.com/it/u=1616849429,1853515969&fm=26&gp=0.jpg",
        shop_id_image_reverse:
          "http://img0.imgtn.bdimg.com/it/u=1616849429,1853515969&fm=26&gp=0.jpg",
        avatar:
          "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
        shop_product_images: {
          image1:
            "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
          image2:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00",
          image3:
            "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
          image4:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00"
        },
        shop_internal_images: {
          image1:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00",
          image2:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00",
          image3:
            "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
          image4:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00"
        },
        shop_license_images: {
          image1:
            "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
          image2:
            "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1595313169&t=f9215647e3ee7b178487d0a9058bb61b",
          image3:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00",
          image4:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_17970619_1553157184612.jpg?x=0&y=0&h=150&w=242&vh=92.98&vw=150.00&oh=150.00&ow=242.00"
        },
        phone: 18376621755,
        shop_hours_start: "2020-07-14T03:13:17.821Z",
        shop_hours_end: "2020-07-14T03:13:17.821Z",
        shop_shared: false,
        address: "长沙市.岳麓区.桐梓坡路.麓谷林语",
        delivery: {
          is_self: {
            flag: false
          },
          sime_city: {
            flag: true,
            start_price: 2,
            total_price: 12,
            start_time: "2020-07-14T03:13:17.821Z",
            end_time: "2020-07-14T03:13:17.821Z"
          },
          region: {
            flag: true,
            start_time: "2020-07-14T03:13:17.821Z",
            end_time: "2020-07-14T03:13:17.821Z",
            start_price: 45,
            over: 5,
            total_price: 66
          },
          cross_city: {
            flag: true,
            total_price: 108
          }
        }
      }
    };
  },
  created() {
    // uid传过来的为null
    // console.log("this.$route.params.id", this.$route.params.id);
    Mock.mock();
  },
  mounted() {
    this.getCheckBox();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getCheckBox() {
      const delivery = this.form.delivery;
      for (var k in delivery) {
        console.log(k);
        if (delivery[k].flag) {
          this.checkList.push(k);
        }
      }
      console.log("this.checkList", this.checkList);
      return this.checkList;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
}
</style>