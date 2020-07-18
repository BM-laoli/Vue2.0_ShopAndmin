<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card colors_dark">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="店铺名称/编号">
            <el-input v-model="formInline.keyword2" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="formInline.keyword1" placeholder="选择所属行业">
              <el-option :label="v.name" :value="v.name" v-for="(v,i) in industries" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <div class="box2">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button native-type="reset" @click="handleCurrentChange()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- <div class="border-middleware" v-if="shopsData.shopsList.length !== 0"> -->
      <div class="border-middleware">
        <div>
          商铺数量：
          <span>{{query.total}}</span>
        </div>
        <div>
          共享商铺数量：
          <span>{{ shopsData.shopsList | totalFilter('shop_shared',false) }}</span>
        </div>
        <div>
          销售总额：
          <span>{{(Math.random()*10000).toFixed(2)}}w</span>
        </div>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <!-- 数据统计项 -->
        <el-table :data="shopsData.shopsList" style="width: 100%" v-loading="loading">
          <el-table-column label="店铺编号" width="80" #default="{row:shopbase}">
            <span>{{shopbase._id.slice(0,5)}}</span>
          </el-table-column>
          <el-table-column label="店铺名称" width="110" #default="{row:shopbase}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="(shopbase.shop_name + '-' + shopbase.shop_level_name)"
              placement="top-start"
            >
              <span>{{ (shopbase.shop_name + '-' + shopbase.shop_level_name) | reduceText(3,4) }}</span>
            </el-tooltip>
          </el-table-column>
          <el-table-column prop="industry" label="店铺行业" width="90"></el-table-column>
          <el-table-column prop="address" label="店铺地址" width="125" #default="{row:shopbase}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="shopbase.address"
              placement="top-start"
            >
              <span>{{ shopbase.address | reduceText(6,7) }}</span>
            </el-tooltip>
          </el-table-column>
          <el-table-column prop="phone" width="100" label="联系电话"></el-table-column>
          <el-table-column label="推广人ID" width="80" #default="{row:shopbase}">
            <el-tooltip class="item" effect="dark" :content="shopbase._id" placement="top-start">
              <span>{{ shopbase._id | reduceText(6,7) }}</span>
            </el-tooltip>
          </el-table-column>
          <el-table-column prop="__v" width="100" label="权益级别"></el-table-column>
          <el-table-column width="90" label="权益时限制">
            <span>233h</span>
          </el-table-column>
          <el-table-column prop="phone" label="销售额" width="125" #default="{row:shopbase}">
            <span>￥{{shopbase.phone}}</span>
          </el-table-column>
          <el-table-column prop="is_approved" label="运营状态" width="90" #default="{row:shopbase}">
            <span>独立运营</span>
          </el-table-column>
          <el-table-column prop="is_approved" label="状态" width="90" #default="{row:shopbase}">
            <span>{{shopbase.is_approved ? '启用中' :'已停用' }}</span>
          </el-table-column>
          <el-table-column prop="shop_id" label="备注" width="160" #default="{row:shopbase}">
            <span>社会我大天朝的店铺</span>
          </el-table-column>
          <el-table-column label="操作" #default="{row:shopbase}" min-width="400">
            <!-- <el-link :underline="false" icon="el-icon-more">详情</el-link>
        <el-link :underline="false" icon="el-icon-s-management">查看商品</el-link>
        <el-link :underline="false" icon="el-icon-s-marketing">经营分析</el-link>
        <el-link :underline="false" icon="el-icon-refresh">启用</el-link>
            <el-link :underline="false" icon="el-icon-delete">删除</el-link>-->
            <router-link
              class="cut-down"
              :to="{path:'/home/shops/shopDetail', query:{id: shopbase._id}}"
            >
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
            <router-link
              class="cut-down"
              :to="{path:'/home/shops/productList', query:{id: shopbase._id}}"
            >
              <el-button type="primary" size="mini">查看商品</el-button>
            </router-link>
            <router-link
              class="cut-down"
              :to="{path:'/home/shops/businessAnalysis', query:{id: shopbase._id+''}}"
            >
              <el-button type="primary" size="mini">经营分析</el-button>
            </router-link>
            <el-button
              type="warning"
              size="mini"
              @click="stateChange(shopbase._id)"
            >{{shopbase.is_approved ? '停用' :'启用' }}</el-button>
            <el-button type="danger" size="mini" @click="delShop(shopbase._id)">删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[1, 2,3,4, 5, 10]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="query.total"
          style="margin-top:15px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import {
  getShopList,
  getAllIndustry,
  getIndustry
} from "../../api/mock/cjhttp";
export default {
  name: "shopList",
  components: {
    breadCrumbs
  },
  data() {
    return {
      industries: [],
      loading: false,
      formInline: {
        // 商铺名
        keyword2: "",
        // 行业
        keyword1: ""
      },
      shopsData: {
        shopsList: []
      },
      query: {
        total: 0,
        size: 5,
        page: 1
      }
    };
  },
  created() {
    // this.getShoplistFn();
    this.handleCurrentChange();
    this.getAllIndustryFn();
  },
  methods: {
    // 启用和停用之间切换
    stateChange(id) {
      const table = this.shopsData.shopsList;
      table.map(v => {
        if (v._id === id) {
          v.is_approved = !v.is_approved;
        }
      });
    },
    // 获取所有行业
    async getAllIndustryFn() {
      this.industries = [];
      try {
        const { data: res } = await getAllIndustry();
        console.log("industries", res);
        this.industries = res.records;
      } catch (err) {
        this.$message.error("获取行业列表失败！");
      }
    },
    // 删除商铺
    delShop(id) {
      this.$msgbox({
        type: "info",
        message: "你确认要删除该商铺吗？",
        showClose: true,
        showCancelButton: true,
        callback: action => {
          console.log(id);
          if (action === "confirm") {
            const table = this.shopsData.shopsList;
            this.shopsData.shopsList = table.filter(v => {
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
    },
    // 分页展示每页的数据size变化时
    handleSizeChange(size) {
      this.query.size = size;
      this.handleCurrentChange();
    },
    // 当前页变化时获取商品列表
    async handleCurrentChange(page) {
      this.formInline.keyword1 = "";
      this.query.page = page || 1;
      // this.getShoplistFn();
      this.loading = true;
      try {
        const { data: res } = await getShopList(this.query);
        this.shopsData.shopsList = res.records;
        // 为分页器传输配置
        this.query.total = res.total;
      } catch (err) {
        this.$message.error("获取商铺列表失败！");
      }

      this.loading = false;
    },
    // 根据商铺名和行业查询商铺ju
    async onSubmit() {
      try {
        const { data: res } = await getIndustry(this.formInline);
        console.log("chaxun", res);
        this.shopsData.shopsList = res;
      } catch (err) {
        this.$message.error("查询失败！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cut-down {
  color: blue;
  text-decoration: underline;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.el-card {
  margin: 15px;
  margin-top: 22px;
  background-color: #fff;
  padding: 8px;
}
.hedaer-box {
  width: 100%;
  border-radius: 10px;
  background-color: #e6e6fa;
  padding: 20px 20px 0;
  // background-color: pink;
}
.demo-form-inline {
  display: flex;
  justify-content: space-between;
}
.tabbe-box {
  width: 100%;
  border-radius: 10px;
  background-color: #e6e6fa;
  padding: 10px;
  // background-color: cornflowerblue;
}

.border-middleware {
  width: 100%;
  // background-color: yellowgreen;
  margin: 10px 0;
}

.border-middleware {
  display: flex;
  justify-self: start;
  align-items: center;
  div {
    margin-left: 25px;
  }
  span {
    color: red;
  }
}

::v-deep.el-table__header-wrapper {
  border: 5px solid black;
  border-radius: 10px;
  width: 1400px;
  color: red;
}
.el-link {
  font-size: 12px;
  padding: 5px;
}
.delete {
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
</style>