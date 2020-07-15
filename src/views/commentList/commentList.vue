<template>
    <div>
        <bread-crumbs :level="this.$route.meta"></bread-crumbs>
        <!-- 查询区域start -->
        <el-card class="box-card">
            <el-form
                :rules="findFormRules"
                ref="findFormRef"
                :model="findForm"
                label-width="110px"
                inline
            >
                <el-form-item
                    label="用户ID/昵称"
                    style="margin:0 120px 0 0"
                    prop="query"
                >
                    <el-input v-model="findForm.query"></el-input>
                </el-form-item>
                <el-form-item
                    label="推广收益筛选"
                    style="margin:0 120px 0 0"
                    prop="date"
                >
                    <el-date-picker
                        v-model="findForm.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <div style="margin-left:800px; margin-top:20px">
                    <span style="line-height:35px">
                        <el-button type="primary" size="mini" @click="findUser"
                            >查询</el-button
                        >
                        <el-button
                            type="info"
                            size="mini"
                            style="margin-left:30px"
                            @click="resetForm"
                            >重置</el-button
                        >
                    </span>
                </div>
            </el-form>
        </el-card>
        <!-- 查询区域end -->

        <!-- 推广人数 店铺数展示start -->
        <div style="margin-left:40px">
            <span>推广人数量： {{ userCount }}</span
            ><span style="margin-left:50px"
                >推广店铺总数： {{ shopCount }}</span
            >
        </div>
        <!-- 推广人数 店铺数展示end -->

        <!-- 推广用户列表start -->
        <el-card class="box-card">
            <el-table :data="list" class="table-list" :border="false">
                <el-table-column prop="id" label="用户ID"> </el-table-column>
                <el-table-column prop="nickName" label="用户昵称">
                </el-table-column>
                <el-table-column prop="phone" label="推广人联系电话">
                </el-table-column>
                <el-table-column prop="tgCount" label="推广数量">
                </el-table-column>
                <el-table-column
                    prop="earnings"
                    label="推广收益"
                    #default="{row}"
                >
                    {{ row.earnings + '元' }}
                </el-table-column>
                <el-table-column label="操作" #default="{row}">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="goDetails(row)"
                        >推广详情</el-button
                    >
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="findForm.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="findForm.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
        <!-- 推广用户列表end -->
    </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs';
import { getUserList } from '../../api/mock/cuzHttp';
export default {
    name: 'CommentList',
    components: {
        breadCrumbs,
    },
    data() {
        return {
            findFormRules: {
                query: [
                    {
                        required: true,
                        message: '请输入id/昵称',
                        trigger: 'blur',
                    },
                ],
                date: [
                    {
                        required: true,
                        message: '请选择筛选时间',
                        trigger: 'blur',
                    },
                ],
            }, // 验证查询参数表单
            userCount: 0, // 推广人数量
            shopCount: 0, // 推广店铺总数
            list: [], // 推广人列表

            findForm: {
                query: '',
                date: null,
                page: 1,
                size: 10,
            },
            total: 0,
        };
    },
    created() {
        this.loadUserList();
    },
    methods: {
        goDetails(row) {
            this.$router.push(`/home/commentList/details/${row.id}`);
        },
        // 点击重置查询表单
        resetForm() {
            this.$refs.findFormRef.resetFields();
        },
        // 点击确定查询推广用户
        async findUser() {
            await this.$refs.findFormRef.validate((valid) => {
                if (!valid) return;

                this.loadUserList();
                this.resetForm();
            });
        },
        // 加载推广用户列表
        async loadUserList() {
            const { data: res } = await getUserList(this.findForm);
            console.log(res);
            if (res.code !== 200) {
                this.$message.error('获取推广用户列表失败');
            }

            this.list = res.data;
            this.total = res.total;
            this.shopCount = res.shop_count;
            this.userCount = res.user_count;
        },
        // 监听size变化
        handleSizeChange(newSize) {
            this.findForm.size = newSize;
            this.loadUserList();
        },
        // 监听页码变化
        handleCurrentChange(newPage) {
            this.findForm.page = newPage;
            this.loadUserList();
        },
    },
};
</script>

<style lang="scss" scoped>
.el-card {
    margin: 15px;
    margin-top: 22px;
    background-color: #e6e6fa;
}
::v-deep .el-table__header-wrapper {
    border: 3px solid #000;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}
::v-deep .el-table th,
::v-deep .el-table td {
    text-align: center !important;
}
.table-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
