<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card" v-if="isflase">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺ID">
              <el-input disabled v-model="form.uid"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称">
              <el-input disabled v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="分店名称">
              <el-input disabled v-model="form.shop_level_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input disabled v-model="form.shop_id"></el-input>
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
          <el-input disabled v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-row style="width:50%">
            <el-col :span="11">
              <el-form-item prop="shop_hours_start">
                <el-time-picker
                  disabled
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
                  disabled
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
            <el-checkbox disabled label="is_self" style="display:block">到店自提</el-checkbox>
            <el-checkbox disabled label="sime_city" style="display:block">
              同城配送
              <el-row style="width:50%">
                <el-col :span="12">
                  <el-form-item label="起配价">
                    <el-input disabled v-model="form.delivery.sime_city.start_price"></el-input>元
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="配送费">
                    <el-input disabled v-model="form.delivery.sime_city.total_price"></el-input>元
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="配送时间">
                <el-row style="width:50%">
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_start">
                      <el-time-picker
                        disabled
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
                        disabled
                        placeholder="选择时间"
                        v-model="form.delivery.sime_city.end_time"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-checkbox>
            <el-checkbox disabled label="region" style="display:block">
              区域配送
              <el-form-item label="配送时间">
                <el-row style="width:50%">
                  <el-col :span="11">
                    <el-form-item prop="shop_hours_start">
                      <el-time-picker
                        disabled
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
                        disabled
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
                    <el-input disabled v-model="form.delivery.region.start_price"></el-input>元
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="配送范围">
                    <el-input disabled v-model="form.delivery.region.over"></el-input>公里（以内）
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="配送费" label-width="150px">
                    <el-input disabled v-model="form.delivery.region.total_price"></el-input>元
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox>
            <el-checkbox disabled label="cross_city" style="display:block">
              跨域配送
              <el-row style="width:50%">
                <el-col :span="24">
                  <el-form-item label="配送费">
                    <el-input disabled v-model="form.delivery.cross_city.total_price"></el-input>元
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
import breadCrumbs from "@/components/common/bread-crumbs";
import BaiDuMap from "@/components/baiduMap/baidu-map";
import { getShopDetail } from "../../../api/mock/cjhttp";
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
      },
      isflase: false
    };
  },
  created() {
    // uid传过来的为null
    // console.log("this.$route.params.id", this.$route.params.id);
    // Mock.mock();
  },
  mounted() {
    this.getShopDetailFn();
    this.getCheckBox();
  },
  methods: {
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
    },
    async getShopDetailFn() {
      const id = this.$route.query.id;
      console.log(id);
      try {
        const res = await getShopDetail(id);
        console.log("res", res);
        this.form = res.data;
         this.isflase = true
      } catch (err) {
        this.$message.error("获取商铺详情失败，请重试！");
      }
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