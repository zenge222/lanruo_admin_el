<template>
    <el-dialog title="面试结果" width="50%" :visible.sync="visible">
        <el-row>
            <el-form label-width="150px">
                <el-col :span="24">
                    <el-form-item label="是否符合招生要求:">
                        <el-radio-group>
                            <el-radio :value="1" label="符合"></el-radio>
                            <el-radio :value="0" label="不符合"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="面试评价:">
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
        name: "faceView",
        data(){
            return{
                visible:false
            }
        },
    }
</script>

<style scoped>

</style>
