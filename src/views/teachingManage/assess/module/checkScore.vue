<template>
    <el-dialog width="65%" title="查看评分" :visible.sync="visible" top="1vh">
        <el-form size="small" label-width="120px">
            <el-form-item label="姓名:">张三</el-form-item>
            <el-form-item label="校区:">上海浦东校区</el-form-item>
            <el-form-item label="班级:">春季班</el-form-item>
            <el-form-item label="学号:">001</el-form-item>
            <el-form-item label="手机:">13100000000</el-form-item>
            <el-form-item label="开始时间:">2020年3月1日</el-form-item>
            <el-form-item label="结束时间:">2020年4月1日</el-form-item>
            <el-form-item label="平时分:">
                <el-table :data="dailyData"
                          border
                          size="mini"
                          style="width: 100%">
                    <el-table-column prop="item" label="加/扣分项" align="center"></el-table-column>
                    <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                    <el-table-column prop="times" label="次数" align="center"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="上课分:">
                <el-table :data="dailyData"
                          border
                          size="mini"
                          style="width: 100%">
                    <el-table-column prop="item" label="加/扣分项" align="center"></el-table-column>
                    <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                    <el-table-column prop="times" label="次数" align="center"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="考试总分:">
                <div>300</div>
                <div v-for="(item,index) in 2" :key="index">
                    <div style="font-weight: 600;display: flex;justify-content: space-between">
                        <span style="font-weight: 600;text-decoration: underline">礼仪课</span>
                        <span style="color: #20a0ff;cursor: pointer" @click="handleClick(index)">{{activeIndex == index?'收起':'查看明细'}} <i :class="activeIndex == index?'el-icon-arrow-down':'el-icon-arrow-right'"></i></span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="activeIndex == index">
                            <div style="margin:8px 0">理论分:</div>
                            <el-table :data="theoryData"
                                      border
                                      size="mini"
                                      style="width: 100%">
                                <el-table-column prop="item" label="评分项" align="center"></el-table-column>
                                <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                                <el-table-column prop="standard" label="评分标准" align="center"></el-table-column>
                                <el-table-column prop="realScore" label="得分" align="center"></el-table-column>
                            </el-table>
                            <div style="margin:8px 0">实操分:</div>
                            <el-table :data="fieldData"
                                      border
                                      size="small"
                                      style="width: 100%">
                                <el-table-column prop="item" label="评分项" align="center"></el-table-column>
                                <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                                <el-table-column prop="standard" label="评分标准" align="center"></el-table-column>
                                <el-table-column prop="realScore" label="得分" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-transition>
                </div>
            </el-form-item>
            <el-form-item label="实习评分:">
                <el-table :data="internshipData"
                          border
                          size="small"
                          style="width: 100%">
                    <el-table-column prop="item" label="评分项" align="center"></el-table-column>
                    <el-table-column prop="itemScore" label="分值" align="center"></el-table-column>
                    <el-table-column prop="standard" label="评分标准" align="center"></el-table-column>
                    <el-table-column prop="realScore" label="得分" align="center" width="200"></el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="18">
                        <div style="margin:8px 0">实习评语:</div>
                        <el-input type="textarea" disabled>

                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="visible = false">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "checkScore",
        data(){
            return{
                activeIndex:null,
                visible:false,
                dailyData:[
                    {item:'上课玩手机',score:'5',times:'8'},
                    {item:'认真听讲',score:'-5',times:'8'},
                ],
                theoryData:[
                    {item:'理论考试',itemScore:'',standard: '',realScore:''}
                ],
                fieldData:[
                    {item:'玻璃清洗',itemScore:'',standard: '',realScore:''}
                ],
                internshipData:[
                    {item:'理论考试',itemScore:'',standard: '',realScore:''}
                ]
            }
        },
        methods:{
            handleClick(i){
                if(this.activeIndex == i) {
                    this.activeIndex = null
                }else {
                    this.activeIndex = i
                }
            }
        }
    }
</script>

<style scoped>

</style>
