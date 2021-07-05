<template>
    <div class="common-container">
        <div style="padding-left: 10px">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
        </div>
        <div class="table_padding">
            <el-form :inline="true" :model="queryForm" size="small">
                <el-form-item label="学校">
                    <el-select v-model="queryForm.school">
                        <el-option :value="1" label="浦东校区"></el-option>
                        <el-option :value="2" label="静安校区"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" label-width="60px">
                    <el-select v-model="queryForm.class">
                        <el-option :value="1" label="春季班"></el-option>
                        <el-option :value="2" label="夏季班"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="60px">
                    <el-select v-model="queryForm.status">
                        <el-option :value="1" label="淘汰"></el-option>
                        <el-option :value="2" label="毕业"></el-option>
                        <el-option :value="3" label="就业"></el-option>
                        <el-option :value="4" label="学习"></el-option>
                        <el-option :value="5" label="待面试"></el-option>
                        <el-option :value="6" label="面试未通过"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" label-width="60px">
                    <el-input v-model="queryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="60px">
                    <el-input v-model="queryForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="学号" label-width="60px">
                    <el-input v-model="queryForm.studentId"></el-input>
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
                <el-table-column prop="studentId" label="学号" width="180" align="center"></el-table-column>
                <el-table-column prop="school" label="校区" width="180" align="center"></el-table-column>
                <el-table-column prop="class" label="班级" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row,index}">
                        <el-button type="text" @click="check">查看</el-button>
                        <el-button type="text" @click="edit">修改</el-button>
                        <el-button type="text" v-if="row.status == '淘汰'||row.status == '面试未通过'" @click="changeEliminate">状态更改</el-button>
                        <el-button type="text" v-if="row.status == '毕业'" @click="employment">去向选择</el-button>
                        <el-button type="text" v-if="row.status == '就业'" @click="toLearn">再学习</el-button>
                        <el-button type="text" v-if="row.status == '学习'" @click="toLearn">分班</el-button>
                        <el-button type="text" v-if="row.status == '学习'" @click="graduation">毕业</el-button>
                        <el-button type="text" v-if="row.status == '待面试'" @click="faceView">面试结果</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <add-and-edit ref="addAndEdit"></add-and-edit>
        <eliminate ref="eliminate"></eliminate>
        <to-learn ref="toLearn"></to-learn>
        <graduation ref="graduation"></graduation>
        <employment ref="employment"></employment>
        <face-view ref="faceView"></face-view>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb";
    import Pagination from "@/components/Pagination";
    import addAndEdit from "@/views/personnelManage/studentsList/module/addAndEdit";
    import eliminate from "@/views/personnelManage/studentsList/module/eliminate";
    import toLearn from "@/views/personnelManage/studentsList/module/toLearn";
    import graduation from "@/views/personnelManage/studentsList/module/graduation";
    import employment from "@/views/personnelManage/studentsList/module/employment";
    import faceView from "@/views/personnelManage/studentsList/module/faceView";
    export default {
        name: "index",
        components: {
            Breadcrumb, Pagination,addAndEdit,
            eliminate,toLearn,graduation,employment,faceView
        },
        data() {
            return {
                visible:false,
                total:1,
                queryForm: {
                    school:'',
                    class: "",
                    status:'',
                    name:'',
                    phone:'',
                    studentId:'',
                    pageSize:10,
                    pageNo:1
                },
                tableData: [
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'淘汰',studentId:'0001',sex:'男'},
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'毕业',studentId:'0001',sex:'男'},
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'就业',studentId:'0001',sex:'男'},
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'学习',studentId:'0001',sex:'男'},
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'待面试',studentId:'0001',sex:'男'},
                    {school:'静安校区',class:'春季班',name: '黄历', phone: '13000000000',status:'面试未通过',studentId:'0001',sex:'男'},
                ],
            }
        },
        methods:{
            resetData(value){
                console.log(value)
            },
            init(){

            },
            add(){
                this.$refs.addAndEdit.visible = true
                this.$refs.addAndEdit.title = 1
            },
            edit(){
                this.$refs.addAndEdit.visible = true
                this.$refs.addAndEdit.title = 2
            },
            check(){
                this.$refs.addAndEdit.visible = true
                this.$refs.addAndEdit.title = 3
            },
            changeEliminate(){
                this.$refs.eliminate.visible = true
            },
            toLearn(){
                this.$refs.toLearn.visible = true
            },
            graduation(){
                this.$refs.graduation.visible = true
            },
            employment(){
                this.$refs.employment.visible = true
            },
            faceView(){
                this.$refs.faceView.visible = true
            },
        }
    }
</script>

<style scoped>

</style>
