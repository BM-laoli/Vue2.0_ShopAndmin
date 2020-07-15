<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card>
      素材名称<el-input
        v-model="input"
        placeholder="请输入内容"
        class="publicInput"
      ></el-input>
      素材类别<el-select v-model="selectDad" placeholder="请选择">
        <el-option
          v-for="item in dataSelect[0]"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="selectSon" placeholder="请选择">
        <el-option
          v-for="item in dataSelect[1]"
          :key="item.id"
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
        <el-table-column label="素材图" #default="{row}">
          <img :src="row.image" alt="" />
        </el-table-column>
        <el-table-column label="素材类别 " #default="{row}">
          {{ row.sort + '-' + row.sort1 }}
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="date" label="上传日期 "> </el-table-column>
        <el-table-column label="操作" width="180">
          <el-button>操作</el-button>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getMaterial, getclassMaterial } from '../../api/mock/zjc'
export default {
  components: {
    breadCrumbs,
  },
  data() {
    return {
      input: '',
      selectDad: '',
      selectSon: '',
      tableData: [
        {
          name: '名称1',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2150,
          date: '1996-12-20',
        },
        {
          name: '名称2',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2250,
          date: '1996-08-14',
        },
        {
          name: '名称3',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2350,
          date: '1970-11-09',
        },
        {
          name: '名称4',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2450,
          date: '2009-05-19',
        },
        {
          name: '名称5',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2550,
          date: '1997-03-12',
        },
        {
          name: '名称6',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2650,
          date: '1979-04-05',
        },
        {
          name: '名称7',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2750,
          date: '1981-02-06',
        },
        {
          name: '名称8',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2850,
          date: '2007-06-10',
        },
        {
          name: '名称9',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2950,
          date: '1977-04-07',
        },
        {
          name: '名称10',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类',
          price: 3050,
          date: '1976-05-03',
        },
        {
          name: '名称1',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2150,
          date: '1996-12-20',
        },
        {
          name: '名称2',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2250,
          date: '1996-08-14',
        },
        {
          name: '名称3',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2350,
          date: '1970-11-09',
        },
        {
          name: '名称4',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类1',
          price: 2450,
          date: '2009-05-19',
        },
        {
          name: '名称5',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2550,
          date: '1997-03-12',
        },
        {
          name: '名称6',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2650,
          date: '1979-04-05',
        },
        {
          name: '名称7',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2750,
          date: '1981-02-06',
        },
        {
          name: '名称8',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2850,
          date: '2007-06-10',
        },
        {
          name: '名称9',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类2',
          price: 2950,
          date: '1977-04-07',
        },
        {
          name: '名称10',
          image: 'http://dummyimage.com/200x100',
          sort: '父分类',
          sort1: '子分类',
          price: 3050,
          date: '1976-05-03',
        },
      ],
      dataSelect: [
        [
          {
            id: '1',
            value: '父分类',
            label: '父分类',
          },
          {
            id: '2',
            value: '父分类1',
            label: '父分类1',
          },
          {
            id: '3',
            value: '父分类2',
            label: '父分类2',
          },
        ],
        [
          {
            id: '1',
            value: '子分类',
            label: '子分类',
          },
          {
            id: '2',
            value: '子分类1',
            label: '子分类1',
          },
          {
            id: '3',
            value: '子分类2',
            label: '子分类2',
          },
        ],
      ],
      currentPage: 1,
      total: 20,
      pageSizes: [2, 5, 8, 10],
      pageSize: 10,
      saveArr: [],
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      const start = (this.currentPage - 1) * this.pageSize
      const cut = start + this.pageSize
      this.tableData = this.saveArr
      this.tableData = this.tableData.slice(start, cut)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      const start = (this.currentPage - 1) * this.pageSize
      const cut = start + this.pageSize
      this.tableData = this.saveArr
      this.tableData = this.tableData.slice(start, cut)
    },
  },
  mounted() {
    this.saveArr = this.tableData
    this.handleSizeChange(this.pageSize)
  },
}
</script>

<style lang="scss" scoped>
.publicInput {
  width: 200px;
}
.block {
  margin-top: 30px;
}
</style>
