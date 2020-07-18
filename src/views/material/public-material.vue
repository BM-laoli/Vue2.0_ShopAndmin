<template>
  <div>
    <bread-crumbs :level="this.$route.meta"></bread-crumbs>
    <el-card>
      素材名称
      <el-input v-model="input" placeholder="请输入内容" class="publicInput"></el-input>素材类别
      <el-select v-model="selectDad" placeholder="请选择" @change="changeDad($event)">
        <el-option
          v-for="item in dataSelect[0]"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button type="primary" @click="queryData">查询</el-button>
      <el-button type="warning">重置</el-button>
    </el-card>

    <el-card style="margin-top:15px">
      <el-button type="success" @click="addPic.dialogVisible = true">上传</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top:25px">
        <el-table-column prop="name" label="素材名称"></el-table-column>
        <el-table-column label="素材图" #default="{row}">
          {{
          row.image
          }}
        </el-table-column>
        <el-table-column label="素材类别 " #default="{row}">
          {{
          row.category
          }}
        </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column label="上传日期 " #default="{row}">
          {{
          row.public_date | dateFormat
          }}
        </el-table-column>
        <el-table-column label="操作" width="180" #default="{row}">
          <el-button @click="editPicUpload(row._id)">操作</el-button>
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
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="添加素材"
      :visible.sync="addPic.dialogVisible"
      width="30%"
      :before-close="addPic.handleClose"
    >
      <el-form
        ref="addPicform"
        :model="addPic.form.data"
        :rules="addPic.form.rules"
        label-width="80px"
      >
        <el-form-item label="素材名称" prop="name">
          <el-input v-model="addPic.form.data.name" placeholder="请输入内容" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="素材分类" prop="category">
          <el-select v-model="addPic.form.data.category" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in dataSelect[0]"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="素材价格" prop="price">
          <el-input
            v-model.number="addPic.form.data.price"
            placeholder="请输入内容"
            class="publicInput"
            style="width:95%"
          ></el-input>元
        </el-form-item>
        <el-form-item label="素材上传">
          <el-upload
            action="#"
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :on-change="addChange"
            style="margin-top:15px"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!addPic.uploadPic.disabled"
                  class="el-upload-list__item-delete"
                  @click="addPic.uploadPic.handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPic.dialogVisible = false">取消上传</el-button>
        <el-button type="primary" @click="addPic.onOK()">确认上传</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改素材"
      :visible.sync="editPic.dialogVisible"
      width="30%"
      :before-close="editPic.handleClose"
    >
      <el-form
        ref="editPicform"
        :model="editPic.form.data"
        :rules="editPic.form.rules"
        label-width="80px"
      >
        <el-form-item label="素材名称" prop="name">
          <el-input v-model="editPic.form.data.name" placeholder="请输入内容" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="素材分类" prop="category">
          <el-select v-model="editPic.form.data.category" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in dataSelect[0]"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="素材价格" prop="price">
          <el-input
            v-model.number="editPic.form.data.price"
            placeholder="请输入内容"
            class="publicInput"
            style="width:95%"
          ></el-input>元
        </el-form-item>
        <el-form-item label="素材上传">
          <el-upload
            action="#"
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :on-change="addChange"
            style="margin-top:15px"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!editPic.uploadPic.disabled"
                  class="el-upload-list__item-delete"
                  @click="editPic.uploadPic.handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPic.dialogVisible = false">取消上传</el-button>
        <el-button type="primary" @click="editPic.onOK()">确认上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumbs from "../../components/common/bread-crumbs";
import {
  getMaterial,
  createStyleQuery,
  getStyleEdit,
  getStyleQuery
} from "../../api/mock/zjc";
export default {
  components: {
    breadCrumbs
  },
  data() {
    return {
      input: "",
      selectDad: "",
      selectSon: "",

      tableData: [],
      addPic: {
        dialogVisible: false,
        handleClose(done) {
          this.$confirm("确认关闭？")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        onOK: async () => {
          console.log(this.addPic.form.data);
          try {
            await createStyleQuery(this.addPic.form.data);
          } catch (err) {
            console.log(err);
          }
          // this.addPic.form.data.name = "";
          // this.addPic.form.data.category = "";
          // this.addPic.form.data.file = "";
          // this.addPic.form.data.price = "";
          this.$refs["addPicform"].resetFields();
          this.loader();

          this.addPic.dialogVisible = false;
        },
        form: {
          data: {
            name: "",
            category: "",
            price: 0,
            file: "",
            image: "hehehe",
            is_free: true,
            css_name: "heheh",
            updateId: "5f0dc762e9e6c49180f3c382",
            ispublic: false,
            public_date: "2020-07-17T10:38:55.957Z",
            remarks: "asdadsasd",
            createdAt: "2020-07-17T10:38:55.957Z",
            updatedAt: "2020-07-17T10:38:55.957Z"
          },
          rules: {
            name: [
              { required: true, message: "请输入素材名称", trigger: "blur" },
              {
                min: 2,
                max: 8,
                message: "长度在 2 到 8 个字符",
                trigger: "blur"
              }
            ],
            category: [
              { required: true, message: "请选择素材分类", trigger: "change" }
            ],
            price: [
              {
                required: true,
                min: 1,
                max: 999,
                type: "number",
                message: "请输入1-999之间的价格",
                trigger: "blur"
              }
            ]
          }
        },
        uploadPic: {
          dialogImageUrl: "",
          dialogVisible: false,
          disabled: false,
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = false;
            console.log(file);
          }
        }
      },
      editPic: {
        dialogVisible: false,
        handleClose(done) {
          this.$confirm("确认关闭？")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        onOK: async () => {
          console.log(this.addPic.form.data);
          try {
            await getStyleEdit(
              this.editPic.form.data.updateId,
              this.editPic.form.data
            );
          } catch (err) {
            console.log(err);
          }
          this.loader();
          this.$refs["editPicform"].resetFields();
          this.editPic.dialogVisible = false;
        },
        form: {
          data: {
            name: "",
            category: "",
            price: 0,
            file: "",
            image: "hehehe",
            is_free: true,
            css_name: "heheh",
            updateId: "",
            ispublic: false,
            public_date: "2020-07-17T10:38:55.957Z",
            remarks: "asdadsasd",
            createdAt: "2020-07-17T10:38:55.957Z",
            updatedAt: "2020-07-17T10:38:55.957Z"
          },
          rules: {
            name: [
              { required: true, message: "请输入素材名称", trigger: "blur" },
              {
                min: 2,
                max: 8,
                message: "长度在 2 到 8 个字符",
                trigger: "blur"
              }
            ],
            category: [
              { required: true, message: "请选择素材分类", trigger: "change" }
            ],
            price: [
              {
                required: true,
                min: 1,
                max: 999,
                type: "number",
                message: "请输入1-999之间的价格",
                trigger: "blur"
              }
            ]
          }
        },
        uploadPic: {
          dialogImageUrl: "",
          dialogVisible: false,
          disabled: false,
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = false;
            console.log(file);
          }
        }
      },
      dataSelect: [
        [
          {
            id: "1",
            value: "父分类",
            label: "父分类"
          },
          {
            id: "2",
            value: "父分类1",
            label: "父分类1"
          },
          {
            id: "3",
            value: "父分类2",
            label: "父分类2"
          }
        ],
        [
          {
            id: "1",
            value: "子分类",
            label: "子分类"
          },
          {
            id: "2",
            value: "子分类1",
            label: "子分类1"
          },
          {
            id: "3",
            value: "子分类2",
            label: "子分类2"
          }
        ]
      ],
      currentPage: 1,
      total: 20,
      pageSizes: [2, 5, 8, 10],
      pageSize: 10,
      saveArr: []
    };
  },
  methods: {
    async queryData() {
      const { data: res } = await getStyleQuery({
        keyword2: this.selectDad,
        keyword1: this.input,
        page: this.currentPage,
        size: this.pageSize
      });
      console.log(res);
      this.total = res.total;
      this.currentPage = res.page;
      this.pageSize = res.size;

      this.tableData = res.records;
    },
    addChange(file, fileList) {
      this.addPic.form.data.file = file.url;
      console.log(file, fileList);
    },
    editPicUpload(id) {
      this.editPic.dialogVisible = true;
      console.log(id);
      const data = this.tableData.find(v => v._id === id);
      console.log(data);
      this.editPic.form.data.name = data.name;
      this.editPic.form.data.price = data.price;
      this.editPic.form.data.category = data.category;
      this.editPic.form.data.updateId = id;
    },
    changeDad(e) {
      console.log(e);
      // this.tableData = this.saveArr;
      // this.tableData = this.tableData.filter(v => v.sort === e);
    },
    changeSon(e) {
      console.log(e);
      // this.tableData = this.saveArr;
      // this.tableData = this.tableData.filter(v => v.sort1 === e);
    },
    async handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      if (!this.input) {
        this.loader();
      } else {
        this.queryData();
      }
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;

      if (!this.input) {
        this.loader();
      } else {
        this.queryData();
      }
    },
    async loader() {
      const { data: res } = await getMaterial({
        page: this.currentPage,
        size: this.pageSize
      });
      this.tableData = res.records;
      this.total = res.total;
    }
  },
  mounted() {
    this.loader();
  }
};
</script>

<style lang="scss" scoped>
.publicInput {
  width: 200px;
}
.block {
  margin-top: 30px;
}
</style>
