<template>
    <div class="promotion-details">
        <bread-crumbs :level="this.$route.meta"></bread-crumbs>
        <!-- 返回推广列表按钮 -->
        <el-button
            type="success"
            plain
            style="margin:5px 50px; width:210px;height:40px"
            @click="$router.back(-1)"
            >返回推广列表</el-button
        >

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
                    label="店铺ID/昵称"
                    style="margin:0 120px 0 0;"
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
                        <el-button
                            type="primary"
                            size="mini"
                            @click="toFindShop"
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

        <!-- 推广店铺、收益区域start -->
        <div style="margin-left:100px">
            <span>推广店铺数量： {{ shopCount }}</span
            ><span style="margin-left:50px"
                >推广收益金额： {{ earnings + '元' }}</span
            >
        </div>
        <!-- 推广店铺、收益区域end -->

        <!-- 推广店铺start -->
        <el-card class="box-card">
            <el-table class="table-list" :data="list" :border="false">
                <el-table-column prop="shop_id" label="店铺ID">
                </el-table-column>
                <el-table-column prop="shop_name" label="店铺名称">
                </el-table-column>
                <el-table-column prop="address" label="店铺地址">
                </el-table-column>
                <el-table-column prop="shop_tel" label="店铺联系电话">
                </el-table-column>
                <el-table-column prop="open_date" label="推广开店日期">
                </el-table-column>
                <el-table-column
                    prop="earnings"
                    label="推广收益"
                    #default="{row}"
                >
                    {{ row.earnings + '元' }}
                </el-table-column>
            </el-table>

            <!-- 分页区域start -->
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
            <!-- 分页区域end -->
        </el-card>
        <!-- 推广店铺end -->
    </div>
</template>

<script>
import breadCrumbs from '../../components/common/bread-crumbs';
import { getShopListById } from '../../api/mock/cuzHttp';
export default {
    name: 'PromotionDetails',
    components: { breadCrumbs },
    data() {
        return {
            total: 0,
            earnings: 0,
            shopCount: 0,
            findShop: {},
            list: [],
            findForm: {
                id: this.$route.params.id,
                query: '',
                date: null,
                page: 1,
                size: 10,
            },
            findFormRules: {
                query: [
                    {
                        required: true,
                        message: '请输入店铺id/昵称',
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
            },
        };
    },
    methods: {
        // 点击查询店铺
        async toFindShop() {
            await this.$refs.findFormRef.validate((valid) => {
                if (!valid) return;

                this.loadShopList();
                this.resetForm();
            });
        },
        // 点击重置查询表单
        resetForm() {
            this.$refs.findFormRef.resetFields();
        },
        // 监听size变化
        handleSizeChange(newSize) {
            this.findForm.size = newSize;
            this.loadShopList();
        },
        // 监听页码变化
        handleCurrentChange(newPage) {
            this.findForm.page = newPage;
            this.loadShopList();
        },
        async loadShopList() {
            // console.log(this.$route.params.id);
            const { data: res } = await getShopListById(this.findForm);
            console.log(res);
            this.list = res.data;
            this.total = res.total;
            this.earnings = res.earnings_count;
            this.shopCount = res.shopCount;
        },
    },
    async created() {
        this.loadShopList();
    },
};
</script>

<style lang="scss" scoped>
.el-card {
    margin: 15px;
    margin-top: 22px;
    background-color: #e6e6fa;
}
::v-deep .el-table th,
::v-deep .el-table td {
    text-align: center !important;
}

::v-deep .el-table__header-wrapper {
    border: 3px solid #000;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}
.table-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
