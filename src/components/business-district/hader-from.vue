<template>
  <div>
      <el-form  :inline="true" label-width="150px" size="medium" :model="from" class="from">
        <el-form-item label="店铺编号/名称">
          <el-input v-model="from.user" placeholder="请输入店铺编号/名称"></el-input>
        </el-form-item>
        <el-form-item label="行业"> 
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 注意这两个选择器要进行联动 -->
          ---
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
          <div class="comfrim">
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button type="primary" @click="onQuery">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
    name:'HaderFrom',
    data() {
      return {
         from:{ 
            user:'',
            region:''
          },
          value:'',
          options: [{
            value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
      }
    },
    methods: {
      onQuery() {
      console.log(this.from);
     },
     handleChange(value){
      console.log(value);
     },
    },
  }
</script>

<style lang="scss" scoped>
 .el-form {
    padding-top: 20px;
  }
.comfrim {
    margin-left: 55px;
  }
</style>