<template>
  <div>
    <el-card>
      <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    </el-card>
    <el-card>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <span style="font-size:12px;width: 110px;line-height: 38px;">店铺编号/名称:</span>
              <el-input placeholder="请输入内容" v-model="shopNumberinput" clearable>
              </el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <span style="font-size:12px;width: 45px;line-height: 38px;">行业:</span>
              <el-select v-model="fristValue" placeholder="请选择">
                <el-option v-for="(item, index) in options1" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="secondValue" placeholder="请选择">
                <el-option v-for="(item, index) in options2" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class=" bg-purple-dark">
              <el-button @click="shopSearch">查询</el-button>
              <el-button native-type="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="店铺编号" width="125">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.shop_id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺名称" width="125">
                <template slot-scope="scope">
                  <!-- <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover> -->
                  <span>{{ scope.row.shop_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺行业" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.shop_name }}-{{ scope.row.industry }}</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺地址" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="推广人ID" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.is_approved ? '已审核':'未审核' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="125">
                <template slot-scope="scope">
                  <span>{{ scope.row.remarks }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <!-- 分页 -->
        <el-pagination @size-change="getShopAuditList()" @current-change="getShopAuditList()" :current-page.sync="queryInfo.page" :page-sizes="[2, 3, 5]" :page-size.sync="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs'
import { getShopAudit, searchShopAudit } from '@/api/shops/index'
export default {
  components: {
    breadCrumbs,
  },
  data () {
    return {
      // 查询条件
      queryInfo: {
        size: 5,
        page: 1
      },
      // 数据总条数
      total: 0,
      // 商品编号输入
      shopNumberinput: '',
      // 选择框第一个值绑定
      fristValue: '',
      // 选择框第二个值绑定
      secondValue: '',
      // 表格数据
      tableData: [],
      // {
      //   value: '选项1',
      //   label: '黄金糕'
      // }, {
      //   value: '选项2',
      //   label: '双皮奶'
      // }, {
      //   value: '选项3',
      //   label: '蚵仔煎'
      // }, {
      //   value: '选项4',
      //   label: '龙须面'
      // }, {
      //   value: '选项5',
      //   label: '北京烤鸭'
      // }
      options1: [],
      options2: [],
      value: ''
    }
  },
  methods: {
    // 店铺查询
    async shopSearch () {
      if (this.shopNumberinput === '' || this.secondValue === '') {
        this.$message.error('参数请输入完整')
      }
      try {
        const { data: res } = await searchShopAudit({
          params: {
            keyword2: this.shopNumberinput,
            keyword1: this.secondValue
          }
        })
        // console.log(res)
        this.tableData = res
      } catch (error) {
        console.log(error)
      }
    },
    // 审核
    handleEdit (index, row) {
      // this.$router.push('/home/shops/openShop/audit')
      this.$router.push({ path: '/home/shops/openShop/audit', query: { id: `${row._id}` } })
    },
    async getShopAuditList () {
      try {
        const { data } = await getShopAudit(
          { params: this.queryInfo }
        )
        // console.log(data)
        this.tableData = data.records
        this.queryInfo.page = data.pages
        this.queryInfo.size = data.size
        this.total = data.total

        data.records.forEach(v => {
          this.options1.push({
            value: v.shop_name,
            label: v.shop_name
          })
          this.options2.push({
            value: v.industry,
            label: v.industry
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getShopAuditList()
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  .el-card__body {
    padding: 10px;
  }
  .grid-content {
    display: flex;
    justify-content: space-between;
  }
}
</style>