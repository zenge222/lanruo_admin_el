<template>
    <el-dialog :visible.sync="visible" width="60%" title="评分">
        <el-row>
            <el-col :span="13">
                <el-form size="small" label-width="100px">
                    <el-col :span="24">
                        <el-form-item label="姓名:">
                            张三
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="校区:">
                            上海静安校区s
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="班级:">
                            春季班
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="目前得分:">
                            80
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="评分:">
                            <el-button type="primary" plain>认真听讲+5</el-button>
                            <el-button type="primary" plain>上课玩手机-8</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="额外评分:">
                            <span>评分项: <el-input style="width: 150px"></el-input></span>
                            <span style="margin-left: 8px">评分: <el-input style="width: 150px"></el-input></span>
                            <el-button type="primary" style="margin-left: 8px">添加</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="评分明细:">
                            <el-table
                                :data="tableData"
                                border
                                size="small"
                                style="width: 100%">
                                <el-table-column prop="name" label="评分项" width="180" align="center"></el-table-column>
                                <el-table-column prop="score" label="得分" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="{row,index}">
                                        <el-button type="text">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="总分:">
                            80
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-row style="margin-top: 60px">
                                <el-button type="primary" @click="submit">提交</el-button>
                                <el-button type="primary" @click="visible = false">取消</el-button>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="1">
                <div style="font-weight: 600;color: #333333;font-size: 18px;margin-bottom: 30px">历史得分项</div>
                <div style="border: 1px solid #dddddd;min-height: 420px">
                    <el-row style="margin-top: 8px;"><el-col :span="12">上课玩手机</el-col><el-col :span="12">8次</el-col></el-row>
                    <el-row style="margin-top: 8px"><el-col :span="12">认真听讲</el-col><el-col :span="12">2次</el-col></el-row>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    export default {
        name: "dailyScore",
        data(){
            return{
                visible:false,
                tableData: [
                    {name: '日常保洁', score: '5'}
                ]
            }
        },
        methods:{
            submit(){

            },
        }
    }
</script>

<style scoped>

</style>
