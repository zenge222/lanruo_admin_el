<template>
    <el-dialog :visible.sync="visible" width="50%" title="毕业">
        <el-row>
            <el-form :model="addForm" label-width="120px" size="small">
                <el-col :span="24">
                    <el-form-item label="学习情况：">
                        <el-row>
                            <el-col :span="3" class="grid-content">姓名</el-col>
                            <el-col :span="3" class="grid-content">校区</el-col>
                            <el-col :span="3" class="grid-content">班级</el-col>
                            <el-col :span="3" class="grid-content">平时分</el-col>
                            <el-col :span="3" class="grid-content">上课分</el-col>
                            <el-col :span="3" class="grid-content">考试总分</el-col>
                            <el-col :span="3" class="grid-content">实习得分</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3" class="grid-content">张三</el-col>
                            <el-col :span="3" class="grid-content">上海静安校区</el-col>
                            <el-col :span="3" class="grid-content">春季班</el-col>
                            <el-col :span="3" class="grid-content">80</el-col>
                            <el-col :span="3" class="grid-content">90</el-col>
                            <el-col :span="3" class="grid-content">100</el-col>
                            <el-col :span="3" class="grid-content">90</el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="实习评语">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="政府技能认证">
                        <el-radio-group>
                            <el-radio :value="0" label="通过"></el-radio>
                            <el-radio :value="1" label="未通过"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="是否予以毕业">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="">
                        <el-radio-group>
                            <el-radio :value="0" label="合格予以毕业"></el-radio>
                            <el-radio :value="1" label="不合格不予以毕业"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <div slot="footer">
            <el-button type="primary">提交</el-button>
            <el-button @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "graduation",
        data(){
            return{
                visible:false,
                addForm:{

                }
            }
        }
    }
</script>

<style scoped>
.grid-content{
    border: 1px solid #dddddd;
    text-align: center;
}
</style>
