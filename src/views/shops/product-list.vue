<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="商品：">
            <el-input v-model="formInline.user" placeholder="商品编号/商品名称" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="所属店铺：">
            <el-input v-model="formInline.user" placeholder="店铺名称" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <el-select
              v-model="formInline.region"
              placeholder="活动区域"
              style="width:150px; margin-right:10px"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="formInline.region" placeholder="活动区域" style="width:150px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="border-middleware">
        <el-button type="info" style="float: right" size="mini">导出</el-button>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <el-table :data="tableData" style="width: 100%;" size="mini">
          <el-table-column align="center" prop="productId" label="商品编号"></el-table-column>
          <el-table-column align="center" prop="shopname" label="所属店铺"></el-table-column>
          <el-table-column align="center" prop="image" label="商品图" #default="{row}">
            <el-image
              style="width: 60px; height: 60px;"
              :src="row.images[0]"
              :preview-src-list="row.images"
            ></el-image>
          </el-table-column>
          <el-table-column align="center" prop="name" label="商品名称" :min-width="100"></el-table-column>
          <el-table-column align="center" prop="productType" label="商品类型"></el-table-column>
          <el-table-column align="center" prop="cost" label="成本价" :formatter="formatter"></el-table-column>
          <el-table-column align="center" prop="o_price" label="原价" :formatter="formatter"></el-table-column>
          <el-table-column align="center" prop="price" label="销售价" :formatter="formatter"></el-table-column>
          <el-table-column align="center" prop="stock" label="库存量"></el-table-column>
          <el-table-column align="center" prop="month_sales" label="月销量" :sortable="true"></el-table-column>
          <el-table-column align="center" prop="total_sales" label="总销量" :sortable="true"></el-table-column>
          <el-table-column
            align="center"
            prop="month_price"
            label="月销售额"
            :sortable="true"
            :formatter="formatter"
            :width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="total_price"
            label="总销售额"
            :sortable="true"
            :width="100"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column align="center" label="参与活动" #default="{row}">
            {{row.active.second_kill?'限时秒杀':''}}
            {{row.active.is_discount?'打折促销':''}}
            {{(!row.active.second_kill && !row.active.is_discount) ? '暂无活动':''}}
          </el-table-column>
          <el-table-column align="center" label="热销" #default="{row}">{{row.is_hot?'是':'否'}}</el-table-column>
          <el-table-column align="center" label="推荐" #default="{row}">{{row.is_recommed?'是':'否'}}</el-table-column>
          <el-table-column
            align="center"
            prop="is_public"
            label="状态"
            #default="{row}"
          >{{row.is_public?'上架':'下架'}}</el-table-column>
          <el-table-column align="center" label="操作" #default="{row}">
            <span class="cut-down">{{row.is_public?'下架':'上架'}}</span>
            <span class="delete">删除</span>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="query.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import { getProductList } from "../../api/mock/cjhttp";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      query: {
        total: 0,
        size: 5,
        page: 1
      }
    };
  },
  created() {
    this.getProductListFn();
  },
  methods: {
    // 分页展示每页的数据size变化时
    handleSizeChange() {},
    // 当前页变化时
    handleCurrentChange() {},
    // 表格数据格式化
    formatter(row, column, cellValue, index) {
      return cellValue + "元";
    },
    // 获取所有商品列表数据
    async getProductListFn() {
      const { data: res } = await getProductList();
      console.log(res.data);
      this.tableData = res.data;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #e6e6fa;
  padding: 8px;
}
.hedaer-box {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-top: 20px;
  padding-left: 10px;
  // background-color: pink;
}
.tabbe-box {
  width: 100%;
  height: 1000px;
  font-size: 12px !important;
  background-color: cornflowerblue;
  .cut-down {
    color: blue;
    text-decoration: underline;
    display: inline-block;
    margin-right: 10px;
  }
  .delete {
    color: red;
    text-decoration: underline;
  }
}

.border-middleware {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}
.demo-form-inline {
  display: flex;
  justify-content: space-between;
}
</style>