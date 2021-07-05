<template>
    <el-dialog :visible.sync="visible" width="50%" title="就业去向">
        <el-form size="small" :inline="true" label-width="90px">
            <el-form-item label="去向">
                <el-select>
                    <el-option :value="1" label="嘉美美家"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select>
                    <el-option :value="1" label="宁波鄞州一店"></el-option>
                    <el-option :value="2" label="上海静安一店"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary">提交</el-button>
            <el-button @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "employment",
        data(){
            return{
                visible:false
            }
        },
    }
</script>

<style scoped>

</style>
