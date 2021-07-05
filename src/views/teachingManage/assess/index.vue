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
                <el-form-item label="姓名" label-width="60px">
                    <el-input v-model="queryForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="init">搜索</el-button>
                    <el-button type="primary">批量评分</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                border
                size="small"
                style="width: 100%" align="center" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="school" label="校区" align="center"></el-table-column>
                <el-table-column prop="class" label="班级" align="center"></el-table-column>
                <el-table-column prop="ordinaryPoints" label="平时分" align="center"></el-table-column>
                <el-table-column prop="classPoints" label="上课分" align="center"></el-table-column>
                <el-table-column prop="totalGrade" label="考试总成绩" align="center"></el-table-column>
                <el-table-column prop="internshipPoints" label="实习打分" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="400">
                    <template slot-scope="{row,index}">
                        <el-button type="text" @click="dailyScore">平时打分</el-button>
                        <el-button type="text" @click="classScore">上课打分</el-button>
                        <el-button type="text" @click="testScore">考试打分</el-button>
                        <el-button type="text" @click="internshipSore">实习打分</el-button>
                        <el-button type="text" @click="checkScore">查看评分</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <daily-score ref="dailyScore"></daily-score>
        <test-score ref="testScore"></test-score>
        <internship-score ref="internshipScore"></internship-score>
        <check-score ref="checkScore"></check-score>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Pagination from'@/components/Pagination'
    import dailyScore from "@/views/teachingManage/assess/module/dailyScore";
    import testScore from "@/views/teachingManage/assess/module/testScore";
    import internshipScore from "@/views/teachingManage/assess/module/internshipScore";
    import checkScore from "@/views/teachingManage/assess/module/checkScore";
    export default {
        name: "index",
        components:{
            Pagination,Breadcrumb,dailyScore,testScore,
            internshipScore,checkScore
        },
        data(){
            return{
                total:1,
                visible:false,
                multipleSelection:[],
                queryForm:{
                    school: '',
                    class: "",
                    name:'',
                    pageSize:10,
                    pageNo:1
                },
                tableData:[
                    {school:'上海静安校区',class:'2021春季班',name:'张三',ordinaryPoints:'80',classPoints:'90',totalGrade:'100',internshipPoints:'88'},
                    {school:'上海静安校区',class:'2021春季班',name:'李四',ordinaryPoints:'80',classPoints:'90',totalGrade:'100',internshipPoints:'88'},
                ]
            }
        },
        methods:{
            init(){

            },
            resetData(value){
                console.log(value)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            dailyScore(){
                this.$refs.dailyScore.visible = true
            },
            classScore(){
                this.$refs.dailyScore.visible = true
            },
            testScore(){
                this.$refs.testScore.visible = true
            },
            internshipSore(){
                this.$refs.internshipScore.visible = true
            },
            checkScore(){
                this.$refs.checkScore.visible = true
            },
        }
    }
</script>

<style scoped>

</style>
