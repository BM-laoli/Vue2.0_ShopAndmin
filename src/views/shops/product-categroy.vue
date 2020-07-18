<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card class="box-card bg-dark">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="类别数量">
          <el-input v-model="input" placeholder="请输入内容" style="width: 200px;margin:0 15px 0 15px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round style="margin:0 15px 0 220px" @click="onSelect">查 询</el-button>
          <el-button type="info" round @click="onResetForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="title_box">
      <div class="num">类别数量：{{cateNum}}</div>
      <div class="num">子类别数量：{{cateChildNum}}</div>
      <el-button type="primary" round @click="addindustry">新增类别</el-button>
    </div>
    <el-card class="bg-dark">
      <el-table
        class="js-start"
        :data="tableData"
        style="width: 100%"
        row-key="_id"
        height="500"
        :tree-props="{children: 'children', hasChildren: true}"
        :default-sort="{prop: 'sortnumber', order: 'name'}"
      >
        <el-table-column prop="name" label="类别名称" sortable></el-table-column>
        <el-table-column prop="sortnumber" label="排序" sortable></el-table-column>
        <el-table-column prop="sortnumber" label="子类别数量" sortable></el-table-column>
        <el-table-column label="操作" #default="{row:shopData}">
          <el-button
            @click="editData(shopData)"
            icon="el-icon-edit"
            type="text"
            v-if="shopData.children"
          >编 辑</el-button>
          <el-button
            @click="toSubCate(shopData)"
            icon="el-icon-share"
            type="text"
            v-if="!shopData.children || shopData.children.length == []"
          >子类别管理</el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            style="color: red"
            @click="deleteData(shopData)"
            v-if="shopData.children"
          >删 除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增类别弹框 -->
    <el-dialog title="新增类别" :visible.sync="addDialogFormVisible">
      <el-form :model="form" ref="addIndustryFrom">
        <el-form-item label="类别名称" label-width="120px">
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
        <el-button type="primary" @click="addOneProductCategroy">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑类别弹框 -->
    <el-dialog title="编辑类别" :visible.sync="editDialogFormVisible">
      <el-form :model="form" ref="editIndustryFrom">
        <el-form-item label="类别名称" label-width="120px">
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
// import { categroyData } from "@/api/mock/test";
import {
  getAllCategroy,
  getCategroyByName,
  addOneCategroy,
  getParentCategroy
} from "@/api/shops/categroy";
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
      cateNum: 0,
      cateChildNum: 0,
      parent: [],
      child: [],
      tableData: []
    };
  },
  created() {
    this.AllcategroyData();
  },
  methods: {
    async AllcategroyData() {
      const { data: res } = await getAllCategroy();
      const { data: ret } = await getParentCategroy();
      this.child = res.records;
      this.parent = ret.records;
      this.parent.forEach(v => {
        v.children = [];
        this.child.forEach((s, i) => {
          if (v._id === s.parent._id) {
            v.children.push(s);
          }
          // delete s.parent;
          s.sortnumber = i + 1;
        });
      });
      // this.formData(res);
      this.tableData = this.parent;
      this.cateNum = this.tableData.length;
      this.cateChildNum = this.child.length;
      console.log(this.parent, this.child);
    },
    //数组对象去重
    // deteleObject(obj) {
    //   var uniques = [];
    //   var stringify = {};
    //   for (var i = 0; i < obj.length; i++) {
    //     var keys = Object.keys(obj[i]);
    //     keys.sort(function(a, b) {
    //       return Number(a) - Number(b);
    //     });
    //     var str = "";
    //     for (var j = 0; j < keys.length; j++) {
    //       str += JSON.stringify(keys[j]);
    //       str += JSON.stringify(obj[i][keys[j]]);
    //     }
    //     if (!stringify.hasOwnProperty(str)) {
    //       uniques.push(obj[i]);
    //       stringify[str] = true;
    //     }
    //   }
    //   uniques = uniques;
    //   return uniques;
    // },
    //类别数据处理
    // formData(res) {
    //   this.parent = res.records.map(v => {
    //     return v.parent;
    //   });
    //   this.child = res.records;
    //   this.parent = this.deteleObject(this.parent);
    //   this.parent.forEach(v => {
    //     v.children = [];
    //     this.child.forEach(s => {
    //       if (v._id === s.parent._id) {
    //         v.children.push(s);
    //       }
    //     });
    //   });
    //   this.parent.forEach(v => {
    //     v.children.forEach((s, i) => {
    //       delete s.parent;
    //       s.sortnumber = i + 1;
    //     });
    //   });
    //   this.tableData = this.parent;
    // },
    //查找
    async onSelect() {
      try {
        const { data: res } = await getCategroyByName({
          keyword1: this.input
        });
        let id = res.records[0]._id;
        var index = this.tableData.findIndex(v => v._id === id);
        this.tableData = this.tableData.splice(index, 1);
        console.log(this.tableData);
      } catch (err) {
        console.log(err);
      }
    },
    onResetForm() {
      this.input = "";
      this.AllcategroyData();
    },
    editData(v) {
      this.editDialogFormVisible = true;
      this.editIndustryValue = v.cateName;
      this.editIndustrySortValue = v.cateId;
      console.log(v);
    },
    deleteData() {
      console.log(this.$route.meta);
    },
    addindustry() {
      this.addDialogFormVisible = true;
    },
    //添加
    async addOneProductCategroy() {
      if (this.addIndustryValue.trim() && isNaN(this.addIndustrySortValue)) {
        return;
      }
      const { data: res } = await addOneCategroy({
        name: this.addIndustryValue,
        sortnumber: this.addIndustrySortValue
      });
      console.log(res);
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
    },
    toSubCate(data) {
      this.$router.push("/home/shops/productSubCategroy/" + data.cateId);
      console.log(data.cateId);
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