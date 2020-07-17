<template>
  <keep-alive>
    <div>
      <bread-crumbs :level="this.$route.meta"></bread-crumbs>
      <el-form :inline="true" label-width="120px">
        <el-card>
          <el-row>
            <el-col :span="6">
              <el-form-item label="   ">
                一级权益
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label="      ">
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="可上架商品数量:" class="mini-input-price-type-large">
                <el-input v-model="right1.all_public_num"></el-input>
              </el-form-item>
              <span style="line-height:45px">个</span>
            </el-col>
            <el-col :span="6">
              <el-form-item label=" " class="mini-input-price-type-large">
                <el-input v-model="right1.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
            <el-col :span="8" style="border-left:1px solid #ccc;">
              <el-form-item label="优惠价" class="mini-input-price-type-large">
                <el-input v-model="right1.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-row>
            <el-col :span="6">
              <el-form-item label="   ">
                二级权益
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label="      ">
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="可上架商品数量:" class="mini-input-price-type-large">
                <el-input v-model="right2.all_public_num"></el-input>
              </el-form-item>
              <span style="line-height:45px">个</span>
            </el-col>
            <el-col :span="6">
              <el-form-item label=" " class="mini-input-price-type-large">
                <el-input v-model="right2.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
            <el-col :span="8" style="border-left:1px solid #ccc;">
              <el-form-item label="优惠价" class="mini-input-price-type-large">
                <el-input v-model="right2.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-row>
            <el-col :span="6">
              <el-form-item label="   ">
                三级权益
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label="      ">
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="可上架商品数量:" class="mini-input-price-type-large">
                <el-input v-model="right3.all_public_num"></el-input>
              </el-form-item>
              <span style="line-height:45px">个</span>
            </el-col>
            <el-col :span="6">
              <el-form-item label=" " class="mini-input-price-type-large">
                <el-input v-model="right3.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
            <el-col :span="8" style="border-left:1px solid #ccc;">
              <el-form-item label="优惠价" class="mini-input-price-type-large">
                <el-input v-model="right3.price"></el-input>
              </el-form-item>
              <span style="line-height:45px">元/年</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="      ">
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="confirmRight"> 保存 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
  </keep-alive>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { updateRight, getRight } from '../../api/shops/index'
export default {
  name: 'ShopRight',
  components: {
    breadCrumbs,
  },
  data () {
    return {
      right1: {
        all_public_num: '',
        price: '',
        level: 1
      },
      right2: {
        all_public_num: '22',
        price: '22',
        level: 2
      },
      right3: {
        all_public_num: '',
        price: '',
        level: 3
      },
    }
  },
  methods: {
    async confirmRight () {
      try {
        if (this.right1.all_public_num && this.right1.price && this.right2.all_public_num && this.right2.price && this.right3.all_public_num && this.right3.price !== '') {
          await updateRight(this.right1)
          await updateRight(this.right2)
          await updateRight(this.right3)
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败,请填写正确的参数')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    const { data: res } = await getRight()
    // console.log(res.records)
    const right1 = res.records.filter(v => v.level === 1)
    const right2 = res.records.filter(v => v.level === 2)
    const right3 = res.records.filter(v => v.level === 3)
    this.right1 = right1[0]
    // this.right2 = right2[0]
    this.right3 = right3[0]
    console.log(this.right1)
    // console.log(this.right2)
    console.log(this.right3)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 15px;
  margin-top: 22px;
  .mini-input-price-type-large {
    .el-form-item__label {
      width: 70px;
    }
    .el-input__inner {
      width: 60px;
    }
  }
}
</style>