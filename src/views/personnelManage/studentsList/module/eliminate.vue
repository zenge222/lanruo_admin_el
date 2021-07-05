<template>
    <el-dialog :visible.sync="visible" width="50%" title="淘汰/面试未通过">
        <el-row>
            <el-form :model="addForm" label-width="120px" size="small">
                <el-col :span="16">
                    <el-form-item label="面试不通过：">
                        2020年12月31日
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="原因：">
                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="状态修改：">
                        <el-select>
                            <el-option :value="1" label="学习"></el-option>
                            <el-option :value="2" label="待面试"></el-option>
                            <el-option :value="3" label="毕业"></el-option>
                            <el-option :value="4" label="就业"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="状态修改说明：">
                        <el-input type="textarea"></el-input>
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
        name: "eliminate",
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
