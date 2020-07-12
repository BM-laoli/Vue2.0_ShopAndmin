<template>
  <el-row>
    <el-col :span="24"
      ><div class="grid-content bg-purple-dark">
        <el-form
          :rules="findUserFormRules"
          ref="findRef"
          :model="form"
          label-width="80px"
          inline
        >
          <el-form-item label="账号" style="margin:0 120px 0 0" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" style="margin:0 120px 0 0" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" style="margin:0 120px 0 0" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <span style="line-height:35px">
            <el-button
              type="primary"
              size="mini"
              @click="$emit('find-user', form)"
              >查询</el-button
            >
            <el-button
              type="info"
              size="mini"
              style="margin-left:30px"
              @click="$emit('reset-find')"
              >重置</el-button
            >
          </span>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "FindUser",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      findUserFormRules: {
        username: [
          // { required: true, meeage: "请输入账号", trigger: "blur" },
          { mix: 4, max: 15, message: "长度在6到15位之间", trigger: "blur" }
        ],
        name: [{ required: true, meeage: "请输入姓名", trigger: "blur" }]
        // phone: [{ required: true, meeage: "请输入手机号", trigger: "blur" }]
      }
    };
  }
};
</script>