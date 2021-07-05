<template>
    <el-dialog :visible.sync="visible" width="45%" title="实习评分">
        <div style="margin:8px 0">评分项:</div>
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
        <el-row>
            <el-col :span="18">
                <div style="margin:8px 0">实习评语:</div>
                <el-input type="textarea">

                </el-input>
            </el-col>
        </el-row>
        <div slot="footer">
            <el-button type="primary">提交</el-button>
            <el-button @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "internshipScore",
        data(){
            return{
                fieldData:[
                    {item:'理论考试',itemScore:'',standard: 'XXXXXXXXXXXX',realScore:''}
                ],
                visible:false
            }
        }
    }
</script>

<style scoped>

</style>
