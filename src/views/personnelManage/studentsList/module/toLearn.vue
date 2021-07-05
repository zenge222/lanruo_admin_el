<template>
    <el-dialog :visible.sync="visible" width="50%" title="分班">
        <el-row>
            <el-form :model="addForm" label-width="120px" size="small">
                <el-col :span="16">
                    <el-form-item label="选择校区：">
                        <el-select>
                            <el-option :value="1" label="学习"></el-option>
                            <el-option :value="2" label="待面试"></el-option>
                            <el-option :value="3" label="毕业"></el-option>
                            <el-option :value="4" label="就业"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="选择班级：">
                        <el-select>
                            <el-option :value="1" label="学习"></el-option>
                            <el-option :value="2" label="待面试"></el-option>
                            <el-option :value="3" label="毕业"></el-option>
                            <el-option :value="4" label="就业"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="开班时间：">
                        2021年1月1日
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="结束时间：">
                        2021年1月30日
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="班主任：">
                        黄校长
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="报名人数：">
                        15/30人
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="学号：">
                        0001
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
        name: "toLearn",
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

</style>
