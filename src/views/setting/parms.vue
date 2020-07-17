
 <template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <span>店铺订单抽佣比例</span>
      <div class="box">
        <span>抽佣比</span>
        <input type="text" v-model="shopMoney" />
        <span>%</span>
      </div>
    </el-card>
    <el-card class="box-card">
      <span>用户素材收佣比例</span>
      <div class="box">
        <span>抽佣比</span>
        <input type="text" v-model="userMoney" />
        <span>%</span>
      </div>
    </el-card>
    <el-button type="primary" class="saveBtn" @click="saveParams"
      >保存</el-button
    >
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import { getParamsList, saveParamsSetting } from "../../api/mock/cuzHttp";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      shopMoney: null,
      userMoney: null
    };
  },
  created() {
    this.loadParamsList();
  },
  methods: {
    // 保存参数设置
    async saveParams() {
      const { data: res } = await saveParamsSetting({
        shop_money: this.shopMoney,
        user_money: this.userMoney
      });
      // console.log(res);
      if (res.code !== 200) {
        this.$message.error("保存失败，请重试");
      }
      const data = JSON.parse(res.data.body);
      this.shopMoney = data.shop_money;
      this.userMoney = data.user_money;
      this.$message.success("保存成功");
    },
    // 加载参数设置
    async loadParamsList() {
      const { data: res } = await getParamsList();
      // console.log(res);
      if (res.code !== 200) {
        this.$message.error("获取参数设置失败");
      }

      this.shopMoney = res.data.shop_money;
      this.userMoney = res.data.user_money;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  width: 60%;
  border-radius: 10px;
  .box {
    margin-left: 50px;
    margin-top: 20px;

    input {
      width: 30px;
      height: 20px;
      margin: 0 10px;
    }
  }
}
.saveBtn {
  width: 150px;
  height: 40px;
  margin: 20px 0 0 60px;
}
</style>