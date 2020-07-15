<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card>
      素材名称<el-input
        v-model="input"
        placeholder="请输入内容"
        class="publicInput"
      ></el-input>
      素材类别<el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in data1options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in data1options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-button type="warning">重置</el-button>
    </el-card>

    <el-card style="margin-top:15px">
      <el-button type="success">上传</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top:25px">
        <el-table-column prop="name" label="素材名称"> </el-table-column>
        <el-table-column prop="image" label="素材图"> </el-table-column>

        <el-table-column prop="sort" label="素材类别 "> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="date" label="上传日期 "> </el-table-column>
        <el-table-column label="操作" width="180">
          <el-button>操作</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getMaterial } from '../../api/mock/zjc'
export default {
  components: {
    breadCrumbs,
  },
  data() {
    return {
      input: '',
      data1options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value1: '',
      data2options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value2: '',
      tableData: [],
    }
  },
  async created() {
    const { data: res } = await getMaterial()
    console.log(res)
    this.tableData = res.data
  },
}
</script>

<style lang="scss" scoped>
.publicInput {
  width: 200px;
}
</style>
