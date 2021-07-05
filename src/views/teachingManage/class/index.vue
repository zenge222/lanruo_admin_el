<template>
    <div class="common-container">
        <div style="padding-left: 10px">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
        </div>
        <div class="table_padding">
            <el-form :inline="true" :model="queryForm" size="small">
                <el-form-item label="校区选择">
                    <el-select v-model="queryForm.school">
                        <el-option :value="1" label="浦东校区"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级选择" label-width="60px">
                    <el-select v-model="queryForm.class">
                        <el-option :value="1" label="春季班"></el-option>
                    </el-select>
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
                <el-table-column prop="school" label="校区" align="center"></el-table-column>
                <el-table-column prop="class" label="班级" align="center"></el-table-column>
                <el-table-column prop="start" label="开班时间" align="center"></el-table-column>
                <el-table-column prop="end" label="结束时间" align="center"></el-table-column>
                <el-table-column prop="teacher" label="班主任" align="center"></el-table-column>
                <el-table-column prop="amount" label="培训人数" align="center"></el-table-column>
                <el-table-column prop="status" label="班级状态" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="{row,index}">
                        <el-button type="text" @click="check">查看</el-button>
                        <el-button type="text" @click="edit">修改</el-button>
<!--                        <el-button type="text" @click="arrange">排课</el-button>-->
                        <el-button type="text">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <add-and-edit ref="addAndEdit"></add-and-edit>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Pagination from'@/components/Pagination'
    import addAndEdit from "@/views/teachingManage/class/module/addAndEdit";
    export default {
        name: "index",
        components:{
            Pagination,Breadcrumb,addAndEdit
        },
        data(){
            return{
                total:1,
                visible:false,
                queryForm:{
                    school: '',
                    class: "",
                    pageSize:10,
                    pageNo:1
                },
                tableData:[
                    {school:'上海静安校区',class:'2021春季班',start:'2021.01.01',end:'2021.01.30',teacher:'张三',amount:'15/30',status:'教学中'},
                    {school:'上海静安校区',class:'2021春季班',start:'2021.01.01',end:'2021.01.30',teacher:'张三',amount:'15/30',status:'等待开始'},
                    {school:'上海静安校区',class:'2021春季班',start:'2021.01.01',end:'2021.01.30',teacher:'张三',amount:'15/30',status:'关闭'},
                ]
            }
        },
        methods:{
            init(){

            },
            add(){
                this.$refs.addAndEdit.visible = true
                this.$refs.addAndEdit.title = 1
            },
            edit(){

            },
            check(){

            },
            resetData(value){
                console.log(value)
            },
            // arrange(){
            //
            // }
        }
    }
</script>

<style scoped>

</style>
