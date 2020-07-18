<template>
    <div>
        <bread-crumbs :level="this.$route.meta"></bread-crumbs>
        <!-- 查询用户表单start -->
        <el-card class="box-card" style="height:80px">
            <!-- 查找用户组件start -->
            <find-user
                ref="findUserRef"
                :form="findUserForm"
                @find-user="findUser($event)"
                @reset-find="resetFindUserForm()"
            ></find-user>
            <!-- 查找用户组件end -->
        </el-card>
        <!-- 查询用户表单end -->

        <!-- 新增账号start -->
        <el-button type="success" style="margin:0 0 0 40px" @click="openAdd"
            >新增账号</el-button
        >
        <!-- 新增账号end -->

        <!-- 用户列表组件start -->
        <el-card>
            <user-list
                :list="userList"
                @show-dialog="showDialog($event)"
                @reset-password="resetPassword($event)"
                @stop-use="stopUse($event)"
                @delete-user="deleteUserById($event)"
            ></user-list>
            <!-- 用户列表组件end -->

            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="findUserForm.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="findUserForm.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>

        <!-- 添加账号对话框start -->
        <el-dialog
            title="新增账号"
            :visible.sync="addUserDialogVisible"
            width="20%"
            @close="addUserDialogClosed"
        >
            <el-form
                ref="userFormRef"
                :model="userForm"
                label-width="70px"
                :rules="userFormRules"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="userForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="userForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="role">
                    <el-input v-model="userForm.role"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="rule" v-if="open">
                    <!-- 树形控件 -->
                    <el-tree
                        ref="treeRef"
                        :data="treedata"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :props="ruleProps"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加账号对话框end -->

        <!-- 修改账号对话框start -->
        <el-dialog
            title="编辑账号"
            v-if="editUserDialogVisible"
            :visible.sync="editUserDialogVisible"
            width="20%"
            @close="editUserDialogClosed"
        >
            <el-form
                ref="editUserFormRef"
                :model="editUserForm"
                label-width="70px"
                :rules="editUserFormRules"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="editUserForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="editUserForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="role">
                    <el-input v-model="editUserForm.role"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="rule">
                    <!-- 树形控件 -->
                    <el-tree
                        current-node-key="id"
                        ref="treeRef"
                        :data="treedata"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="editFrom"
                        default-expand-all
                        :props="ruleProps"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改账号对话框end -->

        <!-- 重置密码对话框start -->
        <el-dialog
            title="请输入新密码"
            :visible.sync="resetPasswordDialogVisible"
            width="50%"
            @close="resetPasswordClosed"
        >
            <el-form ref="resetPasswordForm">
                <el-form-item>
                    <el-input v-model="newPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetPasswordDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="setNewPassword"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <!-- 重置密码对话框end -->
    </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs';
import UserList from '../../components/setting/user-list';
import FindUser from '../../components/setting/find-user';
export default {
    components: {
        breadCrumbs,
        UserList,
        FindUser,
    },
    data() {
        return {
            // aaa: null,
            open: false,
            // 编辑用户的复选框存储点
            editFrom: null,
            ruleProps: {
                label: 'label',
                children: 'children',
            },
            treedata: [
                {
                    id: '店铺管理',
                    label: '店铺管理',
                    children: [
                        {
                            id: '店铺列表',
                            label: '店铺列表',
                        },
                        {
                            id: '商品列表',
                            label: '商品列表',
                        },
                        {
                            id: '开店审核',
                            label: '开店审核',
                        },
                        {
                            id: '店铺权益管理',
                            label: '店铺权益管理',
                        },
                    ],
                },
                {
                    id: '商圈管理',
                    label: '商圈管理',
                    children: [
                        {
                            id: '共享商圈',
                            label: '共享商圈',
                        },
                        {
                            id: '个人商圈',
                            label: '个人商圈',
                        },
                    ],
                },
            ],
            // 添加表单验证规则
            userFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                ],
                role: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                rule: [
                    { required: true, message: '请勾选权限', trigger: 'blur' },
                ],
            },
            // 编辑表单验证规则
            editUserFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                ],
                role: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                rule: [
                    { required: true, message: '请勾选权限', trigger: 'blur' },
                ],
            },
            userForm: {
                username: '',
                password: '',
                phone: '',
                role: '',
                rule: {
                    buisness: {
                        authName: '商圈管理',
                        children: [],
                    },
                    shops: {
                        authName: '店铺管理',
                        children: [],
                    },
                },
                name: '小李',
                status: false,
            }, // 添加/编辑表单
            addUserDialogVisible: false, // 添加账号对话框开关
            // 用户列表
            userList: [],

            // 查询用户表单
            findUserForm: {
                username: '',
                name: '',
                phone: '',
                size: 10,
                page: 1,
            },
            total: 0,
            text: '停用',
            resetPasswordDialogVisible: false,
            resetPasswordForm: {},
            newPassword: '',
            // 控制编辑账号对话框的开关
            editUserDialogVisible: false,
            editUserForm: {},
        };
    },
    methods: {
        openAdd() {
            this.addUserDialogVisible = true;
            this.open = true;
        },
        // 监听重置密码对话框关闭事件
        resetPasswordClosed() {
            this.$refs.resetPasswordForm.resetFields();
        },
        // 点击确定  重置密码
        async setNewPassword() {
            this.resetPasswordForm.password = this.newPassword;
            const res = await this.$http.put(
                `rest/operation_user/${this.resetPasswordForm._id}`,
                this.resetPasswordForm
            );

            if (res.status !== 200) {
                this.$message.error('重置密码失败');
            }

            this.$message.success('重置成功');

            this.resetPasswordDialogVisible = false;
        },
        // 点击停用按钮  修改账号状态
        async stopUse(row) {
            row.status = !row.status;
            const data = await this.$http.put(
                `rest/operation_user/${row._id}`,
                row
            );
            // console.log(data);
            if (data.status !== 200) {
                return this.$message.error('操作失败');
            }
            this.$message.success('操作成功');

            this.getUserList();
        },
        // 监听添加账号对话框的关闭事件
        addUserDialogClosed() {
            this.$refs.userFormRef.resetFields();
            this.open = false;
        },
        // 点击确定按钮  完成添加账户
        async add() {
            const selectArr = this.$refs.treeRef.getCheckedKeys();
            console.log(selectArr);
            selectArr.forEach((v) => {
                if (v === '共享商圈' || v === '个人商圈') {
                    this.userForm.rule.shops.children.push({ authName: v });
                } else {
                    this.userForm.rule.buisness.children.push({ authName: v });
                }
                if (this.userForm.rule.shops.children.length === 0) {
                    this.userForm.rule.shops.children = [];
                }
                if (this.userForm.rule.buisness.children.length === 0) {
                    this.userForm.rule.buisness.children = [];
                }
            });
            console.log(this.userForm);
            const res = await this.$http.post(
                'rest/operation_user',
                this.userForm
            );
            console.log(res);
            if (res.status !== 200) {
                return this.$message.error('添加账户失败');
            }

            this.$message.success('添加成功');
            this.getUserList();

            this.addUserDialogVisible = false;
        },
        // 监听页码变化
        handleCurrentChange(newPagenum) {
            this.findUserForm.page = newPagenum;
            this.getUserList();
        },
        // 监听每页数据条数变化
        handleSizeChange(newPageSize) {
            this.findUserForm.size = newPageSize;
            this.getUserList();
        },
        // 点击重置密码按钮
        resetPassword(row) {
            this.resetPasswordForm = row;
            this.resetPasswordDialogVisible = true;
        },
        // 点击删除按钮
        async deleteUserById(id) {
            const res = await this.$confirm('您确定要删除该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).catch((err) => err);

            if (res !== 'confirm') {
                return this.$message.info('已经取消删除');
            }
            const data = await this.$http.delete(`rest/operation_user/${id}`);

            if (data.status !== 200) {
                return this.$message.error('删除失败');
            }

            this.getUserList();
            this.$message.success('删除成功');
        },
        // 点击确定  完成编辑功能
        edit() {
            console.log(aaa);
            console.log(this.editUserForm);
            this.$refs.editUserFormRef.validate(async (valid) => {
                if (!valid) return;
                const data = await this.$http.put(
                    `rest/operation_user/${this.editUserForm._id}`,
                    this.editUserForm
                );
                console.log(data);

                this.editUserDialogVisible = false;
            });
        },
        editUserDialogClosed() {
            this.$refs.editUserFormRef.resetFields();
            this.editFrom = [];
            // this.editUserForm = null
        },
        // 点击编辑按钮  展示对话框
        showDialog(row) {
            this.editUserForm = row;
            // console.log(this.editUserForm);
            let array = [];
            let obj = row.rule;
            for (let key in obj) {
                obj[key].children.forEach((v) => {
                    array.push(v.authName);
                });
            }
            this.editFrom = array;
            this.editUserDialogVisible = true;
        },
        // 查找账户
        async findUser(form) {
            this.findUserForm = form;
            console.log(this.findUserForm);
            const res = await this.$http.get(
                `rest/operation_user/unitedquery/`,
                {
                    params: this.findUserForm,
                }
            );

            if (res.status !== 200) {
                return this.$message.error('查询失败');
            }

            this.userList = res.data.records;
        },
        // 点击重置按钮  清空查找表单输入
        resetFindUserForm() {
            // console.log(this.$refs.findUserRef);s
            this.$refs.findUserRef.$refs.findRef.resetFields();
            this.getUserList();
        },
        // 获取所有账号列表信息
        async getUserList() {
            const res = await this.$http.get('rest/operation_user', {
                params: this.findUserForm,
            });

            if (res.status !== 200) {
                return this.$message.error('获取账户列表信息失败');
            }

            this.userList = res.data.records;
            this.total = res.data.total;
        },
    },
    created() {
        this.getUserList();
    },
};
</script>

<style lang="scss" scoped>
.el-card {
    margin: 15px;
    margin-top: 22px;
    background-color: #e6e6fa;
}
.el-pagination {
    margin-top: 20px;
}
</style>
