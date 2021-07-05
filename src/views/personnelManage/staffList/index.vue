<template>
    <div class="common-container">
        <div style="padding-left: 10px">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
        </div>
        <div class="table_padding">
            <el-form :inline="true" :model="queryForm" size="small">
                <el-form-item label="名称">
                    <el-input v-model="queryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="60px">
                    <el-input v-model="queryForm.phone"></el-input>
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
                <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" width="180" align="center"></el-table-column>
                <el-table-column prop="position" label="职位" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row,index}">
                        <el-button type="text">账号启用</el-button>
                        <el-button type="text">在职</el-button>
                        <el-button type="text" @click="curriculum">课程表</el-button>
                        <el-button type="text">查看</el-button>
                        <el-button type="text">修改</el-button>
                        <el-button type="text">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <check-add-and-edit ref="checkAddAndEdit"></check-add-and-edit>
        <el-dialog title="课程表" :visible.sync="visible" width="75%" top="5vh">
            <el-row>
                <el-col :span="4">姓名:  张三</el-col>
                <el-col :span="8">电话:  1300000000</el-col>
            </el-row>
            <div style="margin-top: 20px;font-weight: 600;color:#333333">排课</div>
            <el-calendar>
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p>
                        {{ data.day.split('-').slice(1).join('-') }}
                    </p>
                    <div style="height: 50px;overflow-y: auto" v-for="item in lessonList" v-if="item.year == data.day.split('-')[0]&&item.month == data.day.split('-')[1]&&item.day == data.day.split('-')[2]">
                        <p v-for="_item in item.itemList">
                            {{_item.start}}-{{_item.end}}  {{_item.name}}  {{_item.lesson}}
                        </p>
                    </div>
                </template>
            </el-calendar>
        </el-dialog>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb";
    import Pagination from "@/components/Pagination";
    import checkAddAndEdit from "@/views/personnelManage/staffList/module/checkAddAndEdit";
    export default {
        name: "index",
        components: {
            Breadcrumb, Pagination,checkAddAndEdit
        },
        data() {
            return {
                visible:false,
                total:1,
                queryForm: {
                    name: '',
                    phone: "",
                    pageSize:10,
                    pageNo:1
                },
                tableData: [{name: '黄历', sex: '男', phone: '13000000000',position:'校长'}],
                lessonList:[
                    {
                        year:'2021',
                        month:'04',
                        day:'15',
                        itemList:[
                            {start:'09:00',end:'11:00',name:'浦东校区',lesson:'日常保洁'}
                        ]
                    },
                    {
                        year:'2021',
                        month:'05',
                        day:'01',
                        itemList:[
                            {start:'09:00',end:'11:00',name:'浦东校区',lesson:'日常保洁'}
                        ]
                    }
                ]
            }
        },
        methods:{
            resetData(value){
                console.log(value)
            },
            init(){

            },
            add(){
                this.$refs.checkAddAndEdit.visible = true
                this.$refs.checkAddAndEdit.title = 1
            },
            curriculum(){
                this.visible = true
            },
        }
    }
</script>

<style scoped>

</style>
