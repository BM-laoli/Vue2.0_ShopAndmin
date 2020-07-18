<template>
    <el-table class="table-list" :data="list" :border="false">
        <el-table-column prop="username" label="账号" width="200">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="role" label="职位"> </el-table-column>
        <el-table-column prop="status" label="状态" #default="{row}">
            {{ row.status == true ? '启用' : '停用' }}
        </el-table-column>
        <el-table-column label="操作" width="400" #default="{row}">
            <el-button
                type="primary"
                size="mini"
                @click="$emit('show-dialog', row)"
                >编辑</el-button
            >
            <el-button
                type="warning"
                size="mini"
                @click="$emit('reset-password', row)"
                >重置密码</el-button
            >
            <el-button
                type="primary"
                plain
                size="mini"
                @click="$emit('stop-use', row)"
                >{{ row.status == true ? '停用' : '启用' }}</el-button
            >
            <el-button
                type="danger"
                size="mini"
                @click="$emit('delete-user', row._id)"
                >删除</el-button
            >
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'UserList',
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {};
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

::v-deep .el-table__header-wrapper {
    border: 3px solid #000;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}
::v-deep .el-table td {
    border: 0;
}

// .table-list {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// }
</style>
