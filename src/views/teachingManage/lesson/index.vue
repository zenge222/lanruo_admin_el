<template>
    <div class="common-container">
        <div style="padding-left: 10px">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
        </div>
        <div class="table_padding">
            <el-form :inline="true" :model="queryForm" size="small">
                <el-form-item label="课程名称">
                    <el-input v-model="queryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="授课老师" label-width="60px">
                    <el-input v-model="queryForm.teach"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="init">搜索</el-button>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                border
                size="small"
                style="width: 100%" align="center">
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
                <el-table-column prop="teach" label="上课老师" align="center"></el-table-column>
                <el-table-column prop="dec" label="课程描述" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="{row,index}">
                        <el-button type="text" @click="lessonItem">课程表</el-button>
                        <el-button type="text" @click="edit">修改</el-button>
                        <el-button type="text">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <el-dialog :visible.sync="visible" width="50%" :title="title==1?'新增':title==2?'修改':'查看'">
            <el-row>
                <el-form label-width="100px" size="small">
                    <el-col :span="24">
                        <el-form-item label="课程名称:">
                            <el-input style="width: 200px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上课老师:">
                            <el-select>
                                <el-option :value="1" label="张三"></el-option>
                                <el-option :value="2" label="李四"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="课程简述:">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button type="primary">提交</el-button>
                <el-button @click="visible = false">取消</el-button>
            </div>
        </el-dialog>
        <lesson-item ref="lessonItem"></lesson-item>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Pagination from'@/components/Pagination'
    import lessonItem from "@/views/teachingManage/lesson/module/lessonItem";
    export default {
        name: "index",
        components:{
            Pagination,Breadcrumb,lessonItem
        },
        data(){
            return{
                total:1,
                visible:false,
                queryForm:{
                    name: '',
                    teach: "",
                    pageSize:10,
                    pageNo:1
                },
                tableData:[
                    {name:'礼仪课',teach:'张三',dec:''},
                    {name:'日常保洁',teach:'李四',dec:''}
                ]
            }
        },
        methods:{
            init(){

            },
            add(){
                this.visible = true
                this.title = 1
            },
            edit(){
                this.visible = true
                this.title = 2
            },
            resetData(value){
                console.log(value)
            },
            lessonItem(){
                this.$refs.lessonItem.visible = true
            }
        }
    }
</script>

<style scoped>

</style>
