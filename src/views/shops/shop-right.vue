<template>
  <keep-alive>
    <div>
      <bread-crumbs :level="this.$route.meta"></bread-crumbs>
      <el-form :inline="true" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-card>
          <div style="width:100%;background:#fff;padding-bottom:15px">
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
                <el-form-item label="可上架商品数量" class="mini-input-price-type-large" prop="right1.all_public_num">
                  <el-input v-model.number="ruleForm.right1.all_public_num"></el-input>
                </el-form-item>
                <span style="line-height:45px">个</span>
              </el-col>
              <el-col :span="6">
                <el-form-item label=" " class="mini-input-price-type-large" prop="right1.price">
                  <el-input v-model.number="ruleForm.right1.price"></el-input>
                </el-form-item>
                <span style="line-height:45px">元/年</span>
              </el-col>
              <el-col :span="8" style="border-left:1px solid #ccc;">
                <el-form-item label="优惠价" class="mini-input-price-type-large" prop="right1.cheapPrice">
                  <el-input v-model.number="ruleForm.right1.cheapPrice"></el-input>
                </el-form-item>
                <span style="line-height:45px">元/年</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card>
          <div style="width:100%;background:#fff;padding-bottom:15px">
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
                <el-form-item label="可上架商品数量" class="mini-input-price-type-large" prop="right2.all_public_num">
                  <el-input v-model.number="ruleForm.right2.all_public_num"></el-input>
                </el-form-item>
                <span style="line-height:45px">个</span>
              </el-col>
              <el-col :span="6">
                <el-form-item label=" " class="mini-input-price-type-large" prop="right2.price">
                  <el-input v-model.number="ruleForm.right2.price"></el-input>
                </el-form-item>
                <span style="line-height:45px">元/年</span>
              </el-col>
              <el-col :span="8" style="border-left:1px solid #ccc;">
                <el-form-item label="优惠价" class="mini-input-price-type-large" prop="right2.cheapPrice">
                  <el-input v-model.number="ruleForm.right2.cheapPrice"></el-input>
                </el-form-item>
                <span style="line-height:45px">元/年</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card>
          <div style="width:100%;background:#fff;">
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
                <el-form-item label="可上架商品数量" class="mini-input-price-type-large" prop="right3.all_public_num">
                  <el-input v-model.number="ruleForm.right3.all_public_num"></el-input>
                </el-form-item>
                <span style="line-height:45px">个</span>
              </el-col>
              <el-col :span="6">
                <el-form-item label=" " class="mini-input-price-type-large" prop="right3.price">
                  <el-input v-model.number="ruleForm.right3.price"></el-input>
                </el-form-item>
                <span style="line-height:45px">元/年</span>
              </el-col>
              <el-col :span="8" style="border-left:1px solid #ccc;">
                <el-form-item label="优惠价" class="mini-input-price-type-large" prop="right3.cheapPrice">
                  <el-input v-model.number="ruleForm.right3.cheapPrice"></el-input>
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
                  <el-button type="primary" @click="confirmRight(ruleForm)"> 保存 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
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
      ruleForm: {
        right1: {
          all_public_num: '',
          price: '',
          cheapPrice: '',
          level: 1
        },
        right2: {
          all_public_num: '',
          price: '',
          cheapPrice: '',
          level: 2
        },
        right3: {
          all_public_num: '',
          price: '',
          cheapPrice: '',
          level: 3
        },
      },
      rules: {
        right1: {
          all_public_num: [
            { required: true, message: '商品数量不能为空' },
            { type: 'number', message: '商品数量必须为数字值' }
          ],
          price: [
            { required: true, message: '价格不能为空' },
            { type: 'number', message: '价格必须为数字值' }
          ],
          cheapPrice: [
            { required: true, message: '优惠价不能为空' },
            { type: 'number', message: '优惠价必须为数字值' }
          ],
        },
        right2: {
          all_public_num: [
            { required: true, message: '商品数量不能为空' },
            { type: 'number', message: '商品数量必须为数字值' }
          ],
          price: [
            { required: true, message: '价格不能为空' },
            { type: 'number', message: '价格必须为数字值' }
          ],
          cheapPrice: [
            { required: true, message: '优惠价不能为空' },
            { type: 'number', message: '优惠价必须为数字值' }
          ],
        },
        right3: {
          all_public_num: [
            { required: true, message: '商品数量不能为空' },
            { type: 'number', message: '商品数量必须为数字值' }
          ],
          price: [
            { required: true, message: '价格不能为空' },
            { type: 'number', message: '价格必须为数字值' }
          ],
          cheapPrice: [
            { required: true, message: '优惠价不能为空' },
            { type: 'number', message: '优惠价必须为数字值' }
          ],
        }
      }
    }
  },
  methods: {
    confirmRight (ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  async mounted () {
    const { data: res } = await this.$http.get('/api/shops/rights')
    // console.log(res)
    this.ruleForm = res
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  border-radius: 10px !important;
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