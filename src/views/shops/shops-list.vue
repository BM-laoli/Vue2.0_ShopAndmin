<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card colors_dark">
      <!-- heder头部 -->
      <div class="hedaer-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="店铺名称/编号">
            <el-input v-model="formInline.name" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="formInline.industry" placeholder="选择所属行业">
              <el-option label="航天制造业" value="航天制造业"></el-option>
              <el-option label="生鲜" value="生鲜"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-form>
        <div class="box2">
          <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
          <el-button size="mini" type="primary" @click="onCancel">重置</el-button>
        </div>
      </div>

      <!-- <div class="border-middleware" v-if="shopsData.shopsList.length !== 0"> -->
      <div class="border-middleware">
        <div>
          商铺数量：
          <span>{{shopsData.shopsList.length}}</span>
        </div>
        <div>
          共享商铺数量：
          <span>{{ shopsData.shopsList | totalFilter('shop_shared',false) }}</span>
        </div>
        <div>
          销售总额：
          <span>1555w</span>
        </div>
      </div>
      <!-- body 身体 -->
      <div class="tabbe-box">
        <!-- 数据统计项 -->
        <el-table :data="shopsData.shopsList" style="width: 100%">
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
          <el-table-column label="操作" #default="{row:shopbase}" width="300px">
            <!-- <el-link :underline="false" icon="el-icon-more">详情</el-link>
        <el-link :underline="false" icon="el-icon-s-management">查看商品</el-link>
        <el-link :underline="false" icon="el-icon-s-marketing">经营分析</el-link>
        <el-link :underline="false" icon="el-icon-refresh">启用</el-link>
            <el-link :underline="false" icon="el-icon-delete">删除</el-link>-->
            <router-link :to="{path:'/home/shops/shopDetail', query:{id: shopbase._id}}">详情</router-link>
            <router-link :to="{path:'/home/shops/productList', query:{id: shopbase._id}}">查看商品</router-link>
            <router-link
              :to="{path:'/home/shops/businessAnalysis', query:{id: shopbase._id+''}}"
            >经营分析</router-link>
            <router-link :to="{path:'/rest/public_shop_base/byId', query:{id: shopbase._id}}">启用</router-link>
            <router-link to="{path:'//rest/public_shop_base/byId', query:{id: _id}}">删除</router-link>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->

        <el-pagination
          @size-change="getShoplist()"
          @current-change="getShoplist()"
          :current-page.sync="queryInfo.page"
          :page-sizes="[2, 5, 10]"
          :page-size.sync="queryInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import { getShopList } from "../../api/mock/cjhttp";
export default {
  name: "shopList",
  components: {
    breadCrumbs
  },
  created() {
    this.getShoplistFn();
  },
  data() {
    return {
      formInline: {
        name: "",
        industry: ""
      },
      shopsData: {
        shopsList: []
      },
      queryInfo: {
        total: 0,
        size: 5,
        page: 1
      }
    };
  },
  methods: {
    async getShoplistFn() {
      const { data: res } = await getShopList(this.queryInfo);
      this.shopsData.shopsList = res.records;
      // 为分页器传输配置
      (this.queryInfo.total = res.total),
        (this.queryInfo.size = res.size),
        (this.queryInfo.page = res.page);
    },
    // 根据商铺名和行业查询商铺
    onSubmit() {
      console.log(this.formInline);
    },
    onCancel() {}
  }
};
</script>

<style lang="scss" scoped>
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
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
  // background-color: pink;
}
.tabbe-box {
  width: 100%;
  border-radius: 10px;
  background-color: #e6e6fa;
  padding: 20px;
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
</style>