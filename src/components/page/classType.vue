<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课程类型管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.classTypeName" placeholder="类型名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="insertEdit">新增</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header">
                <el-table-column prop="typeId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="classTypeName" label="课程名称"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.start"
                        :page-size="query.limit"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="课程类型名称">
                    <el-input v-model="form.classTypeName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="insertData" v-show="insertVisible">保 存</el-button>
                <el-button type="primary" @click="saveEdit" v-show="saveVisible">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {quillEditor} from "vue-quill-editor";
    import {deleteClassInfo, getClassInfoList, insertClassInfo, updateClassInfo} from "../../api/classInfo";

    export default {
        name: 'baseTable',
        data() {
            return {
                query: {
                    start: 1,
                    limit: 10,
                    classTypeName: '',
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                saveVisible: false,
                insertVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        components: {
            quillEditor
        },
        created() {
            this.getData();
        },
        methods: {
            getData(params) {
                getClassInfoList(params).then(res => {
                    this.tableData = res.result.list;
                    this.query.limit = res.result.pageSize;
                    this.pageTotal = res.result.total;
                });
            },
            //按名称搜索
            handleSearch() {
                this.$set(this.query, 'start', 1);
                this.getData(this.query);
            },
            //删除单条数据
            handleDelete(row) {
                //二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteClassInfo(row.typeId).then(res => {
                            if (res.rtnCode === "0") {
                                this.$message.success(res.rtnMsg);
                                this.$set(this.query, 'start', 1);
                                this.getData();
                            } else {
                                this.$message.warning(res.rtnMsg);
                            }
                        });
                    })
                    .catch(() => {
                    });
            },
            //编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
                this.saveVisible = true;
                this.insertVisible = false;
            },
            //取消操作
            cancelEdit() {
                this.editVisible = false;
                this.saveVisible = false;
                this.insertVisible = false;
            },
            //新增操作
            insertEdit() {
                this.form = {};
                this.saveVisible = false;
                this.editVisible = true;
                this.insertVisible = true;
            },
            //插入数据
            insertData() {
                if (this.form.classTypeName === undefined || this.form.classTypeName === '') {
                    this.$message.warning('名称为空!');
                } else {
                    insertClassInfo(this.form).then(res => {
                        if (res.rtnCode === "0") {
                            this.cancelEdit();
                            this.$message.success(res.rtnMsg);
                            this.$set(this.query, 'start', 1);
                            this.getData(this.query);
                        } else {
                            this.$message.warning(res.rtnMsg);
                        }
                    });
                }
            },
            //保存编辑
            saveEdit() {
                if (this.form.classTypeName === undefined || this.form.classTypeName === '') {
                    this.$message.warning('名称为空!');
                } else {
                    updateClassInfo(this.form).then(res => {
                        this.cancelEdit();
                        if (res.rtnCode === "0") {
                            this.$message.success(res.rtnMsg);
                        } else {
                            this.$message.warning(res.rtnMsg);
                        }
                        this.$set(this.query, 'start', 1);
                        this.getData(this.query);
                    });
                }
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'start', val);
                this.getData(this.query);
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
