<template>
  <div>
      <el-form  :inline="true" label-width="150px" size="medium" :model="from" class="from" ref="industry">
        <el-form-item label="店铺编号/名称">
          <el-input v-model="from.keyword2" placeholder="请输入店铺编号/名称"></el-input>
        </el-form-item>
        <el-form-item label="行业"> 
          <el-select v-model="from.keyword1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <!-- 注意这两个选择器要进行联动 -->
        

        </el-form-item>
        <el-form-item>
          <div class="comfrim">
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button type="primary" @click="onRest">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import  {getPersinaCategrory,getPersinaCategroryByQueryinfo} from '../../api/mock/business-district'
import { log } from 'util'
  export default {
    name:'HaderFrom',
    props: {
      IsPagination:{
        type: Boolean,
      },
    },
    data() {
      return {
         from:{ 
            keyword2:'',
            keyword1:''
          },
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
    mounted () {
      this.onloadCategeroy()
    },
    methods: {
      async onQuery() {
        const {data:res} = await getPersinaCategroryByQueryinfo(this.from)
        this.$emit('data-query',res)
        
      },
      async onloadCategeroy(){
        const {data:res} = await getPersinaCategrory()
        this.options = res.records
        

      },
      handleChange(value){
      console.log(value);
      },
      onRest(){
        this.from.keyword2 = ''
        this.from.keyword1 = ''
        this.$parent.$parent.onLoadList()
      }
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