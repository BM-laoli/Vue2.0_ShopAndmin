
 <template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <span>店铺订单抽佣比例</span>
      <div class="box">
        <span>抽佣比</span>
        <input type="text" />
        <span>%</span>
      </div>
    </el-card>
    <el-card class="box-card">
      <span>用户素材收佣比例</span>
      <div class="box">
        <span>抽佣比</span>
        <input type="text" />
        <span>%</span>
      </div>
    </el-card>
    <el-button type="primary" class="saveBtn">保存</el-button>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
export default {
  components: {
    breadCrumbs
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