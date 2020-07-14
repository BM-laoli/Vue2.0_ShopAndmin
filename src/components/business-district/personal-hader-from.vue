<template>
  <div>
      <el-form :inline="true"  label-width="150px" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID/昵称">
          <el-input v-model="formInline.query" placeholder="请输入用户ID/昵称"></el-input>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="value"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
       

        <el-form-item>  
           <div class="comfrim">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onCancel">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    
  </div>
</template>

<script>
  export default {
    name:'HaderForm',
    data() {
      return {
        formInline: {
          query:'',
        },
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
        value: ''

      }
    },
    methods: {
      onSubmit() {
        
      },
      onCancel(){}
    },
  }
</script>

<style lang="scss" scoped>
 .el-form {
    padding-top: 20px;
  }
.comfrim {
    margin-left: 150px;
    padding-right: 15px;
  }
</style>