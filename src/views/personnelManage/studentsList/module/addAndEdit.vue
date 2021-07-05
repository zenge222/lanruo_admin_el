<template>
    <el-dialog :visible.sync="visible" width="85%" :title="title==1?'新增':'修改'" top="2vh">
        <el-form :model="addForm" size="small" label-width="120px" :disabled="title ==3">
            <el-row>
                <el-col :span="14">
                    <el-col :span="16">
                        <el-form-item label="真实姓名">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="手机号码">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="性别">
                            <el-radio-group>
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="民族">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="身份证号">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="身份证地址">
                            <province-package @getData="getProvince" district-id="" city-id="" province-id=""></province-package>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="详细地址">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="出生日期">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="现居住地址">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="紧急联系人">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="紧急联系人电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="家庭成员">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="学员来源">
                            <el-select>
                                <el-option :value="1" label="自主招生"></el-option>
                                <el-option :value="2" label="个人介绍"></el-option>
                                <el-option :value="3" label="中介介绍"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="家庭成员">
                            <el-row :gutter="16">
                                <el-col :span="5">工作单位</el-col>
                                <el-col :span="5">姓名</el-col>
                                <el-col :span="5">联系电话</el-col>
                                <el-col :span="5">是学员的什么人</el-col>
                            </el-row>
                            <el-row :gutter="16" v-for="(item,index) in addForm.familyList" :key="index" style="margin-bottom:12px">
                                <el-col :span="5">
                                    <el-input v-model="item.job"></el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-input v-model="item.name"></el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-input v-model="item.phone"></el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-input v-model="item.relation"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button icon="el-icon-plus" @click="addFamily"></el-button>
                                    <el-button icon="el-icon-minus" v-if="addForm.familyList.length>1" @click="delFamily(index)"></el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="10">
                    <el-col :span="16">
                        <el-form-item label="学员头像">
                            <el-upload
                                v-loading="picture"
                                action="#"
                                class="avatar-uploader"
                                accept="image/png,image/gif,image/jpg,image/jpeg"
                                :show-file-list="false"
                                :before-upload="handleBeforeUpload"
                            >
                                <img v-if="addForm.avatar" :src="baseUrl + addForm.avatar" class="avatar"/>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="脸型">
                            <el-radio-group>
                                <el-radio :label="1">圆脸</el-radio>
                                <el-radio :label="2">瓜子脸</el-radio>
                                <el-radio :label="3">鹅蛋脸</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="身材">
                            <el-radio-group>
                                <el-radio :label="1">纤细苗条</el-radio>
                                <el-radio :label="2">微胖富态</el-radio>
                                <el-radio :label="3">圆润有力</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="属相">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="星座">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="血型">
                            <el-select>
                                <el-option :value="1" label="A型"></el-option>
                                <el-option :value="2" label="B型"></el-option>
                                <el-option :value="3" label="O型"></el-option>
                                <el-option :value="4" label="AB型"></el-option>
                                <el-option :value="5" label="其它血型"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="宗教信仰">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="兴趣爱好">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="性格">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="备注">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="点击添加认证信息">
                    <el-button>健康认证</el-button>
                    <el-button>技能认证</el-button>
                    <el-button>身份证信息</el-button>
                    <el-button>信用认证</el-button>
                    <el-button>荣誉认证</el-button>
                    <el-button>公安认证</el-button>
                    <el-button>政府技能认证</el-button>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="经验">
                        <el-select>
                            <el-option :value="1" label="1年内"></el-option>
                            <el-option :value="2" label="1-3年"></el-option>
                            <el-option :value="3" label="3-5年"></el-option>
                            <el-option :value="4" label="5年以上"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="擅长技能">
                        <el-radio-checkbox>
                            <el-checkbox :label="1">日式收纳</el-checkbox>
                            <el-checkbox :label="2">沙发保养</el-checkbox>
                            <el-checkbox :label="3">日常保洁</el-checkbox>
                        </el-radio-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="从业经历">
                        <el-row :gutter="16">
                            <el-col :span="4">开始时间</el-col>
                            <el-col :span="4">结束时间</el-col>
                            <el-col :span="4">公司名称</el-col>
                            <el-col :span="4">职位</el-col>
                            <el-col :span="4">离职原因</el-col>
                        </el-row>
                        <el-row :gutter="16" v-for="(item,index) in addForm.workingExperience" :key="index" style="margin-bottom:12px">
                            <el-col :span="4">
                                <el-date-picker v-model="item.start" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker v-model="item.end" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="item.company"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="item.position"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="item.result"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button icon="el-icon-plus" @click="addWorking"></el-button>
                                <el-button icon="el-icon-minus" v-if="addForm.workingExperience.length>1" @click="delWorking(index)"></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="培训经历">
                        <el-row :gutter="16">
                            <el-col :span="4">开始时间</el-col>
                            <el-col :span="4">结束时间</el-col>
                            <el-col :span="4">描述</el-col>
                        </el-row>
                        <el-row :gutter="16" v-for="(item,index) in addForm.trainList" :key="index" style="margin-bottom:12px">
                            <el-col :span="4">
                                <el-date-picker v-model="item.start" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker v-model="item.end" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="item.description"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button icon="el-icon-plus" @click="addTrain"></el-button>
                                <el-button icon="el-icon-minus" v-if="addForm.trainList.length>1" @click="delTrain(index)"></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="综合介绍">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="submit">添加</el-button>
            <el-button>取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import ProvincePackage from "@/components/ProvincePackage/ProvincePackage";
    import {_uploadPic} from "@/api/common";
    export default {
        name: "addAndEdit",
        components:{ProvincePackage},
        data(){
            return{
                baseUrl:'',
                visible:false,
                title:1,
                picture:false,
                addForm:{
                    avatar:'',//头像
                    familyList:[
                        {job:'',name:'',phone:'',relation:''}
                    ],
                    workingExperience:[
                        {start:'2014-10-19',end:'2021-04-19',company:'',position:'',result:''}
                    ],
                    trainList:[
                        {start:'',end:'',description:''}
                    ]
                }
            }
        },
        methods:{
            getProvince(value){
                console.log(value)
            },
            addFamily(){
                let obj = {job:'',name:'',phone:'',relation:''}
                this.addForm.familyList.push(obj)
            },
            delFamily(index){
                this.addForm.familyList.splice(index,1)
            },
            addWorking(){
                let obj = {start:'',end:'',company:'',position:'',result:''}
                this.addForm.workingExperience.push(obj)
            },
            delWorking(index){
                this.addForm.workingExperience.splice(index,1)
            },
            addTrain(){
                let obj = {start:'',end:'',description:''}
                this.addForm.trainList.push(obj)
            },
            delTrain(index){
                this.addForm.trainList.splice(index,1)
            },
            submit(){
                console.log(this.addForm)
            },
            handleBeforeUpload(file) {
                this.picture = true
                if (
                    !(
                        file.type === "image/png" ||
                        file.type === "image/gif" ||
                        file.type === "image/jpg" ||
                        file.type === "image/jpeg"
                    )
                ) {
                    this.$message({
                        message:
                            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
                        type: "warning",
                    });
                    return;
                }
                let size = file.size / 1024 / 1024 / 2;
                if (size > 2) {
                    this.$message({
                        message: "图片大小必须小于2M",
                        type: "warning",
                    });
                    return;
                }
                let fd = new FormData(); //通过form数据格式来传
                fd.append("filename", file); //传文件
                _uploadPic(fd).then((res) => {
                    if (res.code == 1) {
                        this.baseUrl = res.data.baseUrl;
                        this.addForm.avatar = res.data.key;
                        this.picture = false
                    } else {
                        this.$message({ message: res.msg, type: "warning" });
                        this.picture = false
                    }
                });
            },
        }
    }
</script>

<style>
    .avatar-uploader{
        display: inline-block!important;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 145px;
        height: 145px;
        line-height: 145px;
        text-align: center;
    }

    .avatar {
        width: 145px;
        height: 145px;
        display: block;
    }
</style>
<style scoped>

</style>
