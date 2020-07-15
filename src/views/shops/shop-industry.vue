<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card bg-dark">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="行业数量">
          <el-input v-model="input" placeholder="请输入内容" style="width: 200px;margin:0 15px 0 15px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round style="margin:0 15px 0 220px" @click="onSelect">查 询</el-button>
          <el-button type="info" round @click="onResetForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="title_box">
      <div class="num">行业数量：xxx</div>
      <el-button type="primary" round slot="reference" @click="addindustry">新增行业</el-button>
    </div>
    <el-card class="bg-dark js-start">
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'id', order: 'name'}">
        <el-table-column prop="uname" label="行业名称" sortable></el-table-column>
        <el-table-column prop="uid" label="排序" sortable></el-table-column>
        <el-table-column prop="address" label="操作" #default="{row:shopData}">
          <el-button @click="editData(shopData)" icon="el-icon-edit" type="text">编 辑</el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            style="color: red"
            @click="deleteData(shopData)"
          >删 除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增行业弹框 -->
    <el-dialog title="新增行业" :visible.sync="addDialogFormVisible">
      <el-form :model="form" ref="addIndustryFrom">
        <el-form-item label="行业名称" label-width="120px">
          <el-input v-model="addIndustryValue" autocomplete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="排 序" label-width="120px">
          <el-input
            v-model="addIndustrySortValue"
            placeholder="输入数字"
            autocomplete="off"
            style="width:90px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addindustryClose()">取 消</el-button>
        <el-button type="primary" @click="addDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑行业弹框 -->
    <el-dialog title="编辑行业" :visible.sync="editDialogFormVisible">
      <el-form :model="form" ref="editIndustryFrom">
        <el-form-item label="行业名称" label-width="120px">
          <el-input v-model="editIndustryValue" autocomplete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="排 序" label-width="120px">
          <el-input
            v-model="editIndustrySortValue"
            placeholder="输入数字"
            autocomplete="off"
            style="width:90px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editIndustryClose()">取 消</el-button>
        <el-button type="primary" @click="editDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { industryData } from "@/api/mock/test";
import breadCrumbs from "../../components/common/bread-crumbs";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      input: "",
      form: {},
      addIndustryValue: "",
      addIndustrySortValue: "",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      editIndustryValue: "",
      editIndustrySortValue: "",
      tableData: []
    };
  },
  created() {
    this.getIndustryData();
  },
  methods: {
    async getIndustryData() {
      const { data: res } = await industryData();
      this.tableData = res.data;
      console.log(res);
    },
    onSelect() {
      console.log(this.input);
    },
    onResetForm() {
      this.input = "";
    },
    editData(v) {
      this.editDialogFormVisible = true;
      this.editIndustryValue = v.uname;
      this.editIndustrySortValue = v.uid;
      console.log(v);
    },
    deleteData() {
      console.log(1);
    },
    addindustry() {
      this.addDialogFormVisible = true;
    },
    addindustryClose() {
      this.addDialogFormVisible = false;
      //不知道为什么，这个重置方法没作用
      this.$nextTick(() => {
        this.$refs.addIndustryFrom.resetFields();
        console.log(this.$refs.addIndustryFrom);
      });
    },
    editIndustry() {
      this.editDialogFormVisible = true;
    },
    editIndustryClose() {
      this.editDialogFormVisible = false;
      //不知道为什么，这个重置方法没作用
      this.$nextTick(() => {
        this.$refs.editIndustryFrom.resetFields();
        console.log(this.$refs.editIndustryFrom);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 10px;
  // margin-top: 22px;
  border-radius: 10px;
  // background-color:	#E6E6FA;
}
.title_box {
  .num {
    float: left;
    margin-left: 47px;
    line-height: 40px;
  }
  .el-button {
    margin-left: 450px;
  }
}
.el-form--inline {
  height: 40px;
}
</style>