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
                <el-form-item label="城市" label-width="60px">
                    <el-input v-model="queryForm.city"></el-input>
                </el-form-item>
                <el-form-item label="区域" label-width="60px">
                    <el-input v-model="queryForm.district"></el-input>
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
                <el-table-column prop="name" label="校区名称" width="180" align="center"></el-table-column>
                <el-table-column prop="headmaster" label="校长" width="180" align="center"></el-table-column>
                <el-table-column prop="headmasterPhone" label="校长电话" width="180" align="center"></el-table-column>
                <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="{row,index}">
                        <el-button type="text">查看</el-button>
                        <el-button type="text">修改</el-button>
                        <el-button type="text">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination style="text-align: right" :total="total" :limit="queryForm.pageSize" :page="queryForm.pageNo" @pagination="resetData"/>
        </div>
        <el-dialog :title="title ==1?'新增':'修改'" :visible.sync="visible" width="55%">
            <el-form size="small" :model="addForm" label-width="80px" :rules="rules" ref="addForm" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input type="text" v-model="addForm.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="选择校长" prop="headmaster">
                            <el-select v-model="addForm.headmaster">
                                <el-option :value="1" :label="'张三'"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机" prop="headmasterPhone">
                            <el-input type="number" v-model="addForm.headmasterPhone" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="省/市/区">
                            <province-package @getData="getProvince" :provinceId="addForm.provinceId"
                                              :cityId="addForm.cityId"
                                              :districtId="addForm.districtId"
                            ></province-package>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细地址" prop="address">
                            <el-input type="textarea" v-model="addForm.address" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb";
    import Pagination from "@/components/Pagination";
    import ProvincePackage from "@/components/ProvincePackage/ProvincePackage"

    var checkPhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            // console.log(typeof value)
            // console.log(reg.test(value));
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        }
    }
    export default {
        name: "index",
        components: {
            Breadcrumb,
            Pagination,
            ProvincePackage
        },
        data() {
            return {
                visible:false,
                title:1,
                total:1,
                queryForm: {
                    name: '',
                    city: "",
                    district: "",
                    pageSize:10,
                    pageNo:1
                },
                addForm:{
                    name:"",
                    headmaster:null,
                    headmasterPhone:null,
                    province:'',
                    city:'',
                    district:'',
                    address:'',
                    provinceId:null,
                    cityId:null,
                    districtId:null
                },
                rules: {
                    name: [{ required: true, message: '请填写学校名称!', trigger: 'blur' }],
                    headmaster: [{ required: true, message: '请选择校长!', trigger: 'change' }],
                    headmasterPhone: [{validator: checkPhone, trigger: 'blur',required:true}],
                    address: [{ required: true, message: '请填写详细地址!', trigger: 'blur' }],
                },
                tableData: [{name: '上海静安校区', headmaster: '黄平', headmasterPhone: '13000000000',province:'上海市',city:'上海市',area:'静安区',address:'上海市上海静安区长兴路173号'}]
            }
        },
        methods:{
            resetData(value){
                console.log(value)
            },
            init(){

            },
            add(){
                this.visible = true
                this.title = 1
            },
            getProvince(data){
                console.log(data)
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        console.log(this.addForm)
                    }else{
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
