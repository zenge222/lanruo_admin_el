<template>
    <el-dialog :visible.sync="visible" width="45%" title="评分" top="3vh">
        <el-row>
            <el-col :span="24">
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
                        <el-form-item label="平时分:">
                            80
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上课分:">
                            90
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="考试打分:">
                            <el-table
                                :data="tableData"
                                border
                                size="small"
                                style="width: 100%">
                                <el-table-column prop="class" label="课程" align="center"></el-table-column>
                                <el-table-column prop="theory" label="理论" align="center"></el-table-column>
                                <el-table-column prop="field" label="实操" align="center"></el-table-column>
                                <el-table-column prop="total" label="总分" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="{row,index}">
                                        <el-button type="text" @click="score">评分</el-button>
                                        <el-button type="text">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="总成绩:">
                            80
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="平均分:">
                            90
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
        </el-row>
        <div slot="footer">
            <el-button type="primary">提交</el-button>
            <el-button @click="visible=false">取消</el-button>
        </div>
        <el-dialog :visible.sync="scoreVisible" title="打分" width="45%" append-to-body>
            <div style="font-size: 16px;font-weight: 600;margin-bottom: 15px">礼仪课</div>
            <div>
                <div style="margin:8px 0">理论分:</div>
                <el-table :data="theoryData"
                          border
                          size="mini"
                          style="width: 100%">
                    <el-table-column prop="item" label="评分项" align="center"></el-table-column>
                    <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                    <el-table-column prop="standard" label="评分标准" align="center"></el-table-column>
                    <el-table-column label="打分" align="center" width="200">
                        <template slot-scope="{row,index}">
                            <el-input v-model="row.realScore" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <div style="margin:8px 0">实操分:</div>
                <el-table :data="fieldData"
                          border
                          size="small"
                          style="width: 100%">
                    <el-table-column prop="item" label="评分项" align="center"></el-table-column>
                    <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                    <el-table-column prop="standard" label="评分标准" align="center"></el-table-column>
                    <el-table-column label="打分" align="center" width="200">
                        <template slot-scope="{row,index}">
                            <el-input v-model="row.realScore" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button type="primary">提交</el-button>
                <el-button type="取消" @click="scoreVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<script>
    export default {
        name: "testScore",
        data(){
            return{
                visible:false,
                scoreVisible:false,
                tableData:[
                    {class:'礼仪课',theory:'',field:'',total:''},
                    {class:'日常保洁',theory:'',field:'',total:''},
                    {class:'日式收纳',theory:'',field:'',total:''},
                    {class:'职业素养',theory:'',field:'',total:''},
                ],
                theoryData:[
                    {item:'理论考试',itemScore:'',standard: '',realScore:''}
                ],
                fieldData:[
                    {item:'玻璃清洗',itemScore:'',standard: '',realScore:''}
                ]
            }
        },
        methods:{
            submit(){

            },
            score(){
                this.scoreVisible = true
            },
        }
    }
</script>

<style scoped>

</style>
