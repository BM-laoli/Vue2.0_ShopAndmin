<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
          <el-form-item label="商品：" prop="name">
            <el-input v-model="form.keyword3" placeholder="商品名称" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="所属店铺：">
            <el-input v-model="form.shopname" placeholder="店铺名称" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <el-select
              v-model="form.type1"
              placeholder="分类1"
              style="width:150px; margin-right:10px"
            >
              <el-option :label="v.name" :value="v._id" v-for="(v,i) in productType1" :key="i"></el-option>
            </el-select>
            <el-select v-model="form.type2" placeholder="分类2" style="width:150px">
              <el-option :label="v.name" :value="v._id" v-for="(v,i) in productType2" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button native-type="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="border-middleware">
        <el-button type="info" style="float: right" size="mini" @click="excel">导出</el-button>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <el-table id="table" :data="tableData" style="width: 100%;" size="mini" v-loading="loading">
          <el-table-column align="center" prop="_id" label="商品编号"></el-table-column>
          <el-table-column align="center" prop="uid.shop_name" label="所属店铺"></el-table-column>
          <el-table-column align="center" label="商品图" #default="{row}">
            <el-image
              style="width: 60px; height: 60px;"
              :src="row.image[0]"
              :preview-src-list="row.image"
            ></el-image>
          </el-table-column>
          <el-table-column align="center" prop="name" label="商品名称" :min-width="100"></el-table-column>
          <el-table-column
            align="center"
            label="商品类型"
            #default="{row}"
          >{{row.parent.parent.name}}/{{row.parent.name}}</el-table-column>
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
            {{row.active.is_active?'限时秒杀':''}}
            {{row.active.is_first?'打折促销':''}}
            {{(!row.active.is_active && !row.active.is_first) ? '暂无活动':''}}
          </el-table-column>
          <el-table-column align="center" label="热销" #default="{row}">{{row.is_hot?'是':'否'}}</el-table-column>
          <el-table-column align="center" label="推荐" #default="{row}">{{row.is_recommed?'是':'否'}}</el-table-column>
          <el-table-column
            align="center"
            prop="is_public"
            label="状态"
            #default="{row}"
          >{{row.is_approved?'上架':'下架'}}</el-table-column>
          <el-table-column align="center" label="操作" #default="{row}">
            <span class="cut-down" @click="upToggle(row._id)">{{row.is_approved?'下架':'上架'}}</span>
            <span class="delete" @click="delProduct(row._id)">删除</span>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[1, 3, 5, 10]"
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
import {
  getProductList,
  getProductById,
  getProductType1,
  getProductType2,
  getProductByName
} from "../../api/mock/cjhttp";
import { filterImg } from "../../filters/LSZ-text-abbreviation";
import table2excel from "element-ui-excel2table";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      loading: false,
      // 查询商品时的传参表单
      form: {
        keyword3: "",
        shopname: "",
        type1: "",
        type2: ""
      },
      // 表格数据
      tableData: [],
      // 分页数据
      query: {
        total: 0,
        size: 5,
        page: 1
      },
      productType1: [],
      productType2: []
    };
  },
  created() {
    this.handleCurrentChange();
    this.getProductTypeFn();
    // this.getProductListFn();
  },
  methods: {
    // 导出表格
    excel() {
      table2excel.tableToExcel("#table", "商品列表.xls");
    },
    // 分页展示每页的数据size变化时
    handleSizeChange(size) {
      this.query.size = size;
      // console.log(this.query.size);
      this.handleCurrentChange();
    },
    // 当前页变化时获取商品列表
    async handleCurrentChange(page) {
      this.loading = true;
      this.query.page = page || 1;
      const id = this.$route.query.id;
      if (id) {
        const { data: res } = await getProductById({
          page: this.query.page,
          size: this.query.size,
          id: id
        });
        // console.log("productbyid", res.records);
        this.query.total = res.total;
        let records = res.records;
        filterImg(records);
        this.tableData = records;
        this.loading = false;
      } else {
        const { data: res } = await getProductList(this.query);
        // console.log("product", res.records);
        this.query.total = res.total;
        let records = res.records;
        filterImg(records);
        this.tableData = records;
        // console.log("records", records);
        this.loading = false;
      }
    },
    // 表格数据格式化
    formatter(row, column, cellValue, index) {
      return cellValue + "元";
    },
    // 获取所有商品类别
    async getProductTypeFn() {
      // 获取商品一级分类
      const { data: result } = await getProductType1();
      this.productType1 = result.records;
      console.log("ProductType1", result.records);
      // 获取商品二级分类
      const { data: res } = await getProductType2();
      this.productType2 = res.records;
      console.log("ProductType2", res.records);
    },
    // 商品查询
    async onSubmit() {
      console.log(this.form);
      const { data: res } = await getProductByName(this.form);
      console.log("查询", res);
      this.query.total = 1;
      // array
      const records = res.records;
      filterImg(records);
      this.tableData = res.records;
    },
    // 上架下架切换
    async upToggle(id) {
      // 前端对数组进行操作实现切换
      const table = this.tableData;
      table.forEach(v => {
        if (v._id === id) {
          return (v.is_approved = !v.is_approved);
        }
      });
    },
    // 删除商品
    async delProduct(id) {
      this.$msgbox({
        type: "info",
        message: "你确认要删除该商品吗？",
        showClose: true,
        showCancelButton: true,
        callback: action => {
          if (action === "confirm") {
            const table = this.tableData;
            this.tableData = table.filter(v => {
              return v._id != id;
            });
            this.query.total--;
            this.query.size--;
            this.$message.success("删除成功！");
          } else {
            return;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  margin-top: 22px;
  padding: 8px;
}
.hedaer-box {
  width: 100%;
  border-radius: 10px;
  padding-top: 20px;
  padding-left: 10px;
  background-color: #e6e6fa;
  // background-color: pink;
}
.tabbe-box {
  width: 100%;
  font-size: 12px !important;
  border-radius: 10px;
  background-color: #e6e6fa;
  padding: 20px;
  .cut-down {
    color: blue;
    text-decoration: underline;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
  }
  .delete {
    color: red;
    text-decoration: underline;
    cursor: pointer;
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