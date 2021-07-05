<template>
    <el-dialog :title="title ==1?'新增':'修改'" :visible.sync="visible" width="60%" top="5vh">
        <el-form size="small" :model="addForm" label-width="80px" :rules="rules" ref="addForm">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="名称" prop="name">
                        <el-input type="text" v-model="addForm.name"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="addForm.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="头像" prop="avatar">
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
                <el-col :span="10">
                    <el-form-item label="出生日期" prop="birthday">
                        <el-date-picker
                            v-model="addForm.birthday"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="名族" prop="ethnic">
                        <el-input type="text" v-model="addForm.ethnic"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="籍贯" prop="native">
                        <el-input type="text" v-model="addForm.native"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="政治面貌" prop="political">
                        <el-select v-model="addForm.political">
                            <el-option :value="1">团员</el-option>
                            <el-option :value="2">党员</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="婚姻状况" prop="marriage">
                        <el-radio-group v-model="addForm.marriage">
                            <el-radio :label="0">未婚</el-radio>
                            <el-radio :label="1">已婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="学历" prop="education">
                        <el-select v-model="addForm.education">
                            <el-option :value="1">初中</el-option>
                            <el-option :value="2">高中</el-option>
                            <el-option :value="3">大专</el-option>
                            <el-option :value="4">本科</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="毕业院校" prop="college">
                        <el-input type="text" v-model="addForm.college"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="专业" prop="major">
                        <el-input type="text" v-model="addForm.major"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="addForm.phone"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="addForm.email"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="家庭住址" prop="address">
                        <el-input type="text" v-model="addForm.address"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="职位" prop="position">
                        <el-select v-model="addForm.position" multiple >
                            <el-option :value="1" label="校长"></el-option>
                            <el-option :value="2" label="教务组长"></el-option>
                            <el-option :value="3" label="授课老师"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="登录账号" prop="loginAccount">
                        <el-input type="text" v-model="addForm.loginAccount"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="用户密码" prop="password">
                        <el-input type="text" v-model="addForm.password"/>
                    </el-form-item>
                </el-col>

                <el-col :span="10">
                    <el-form-item label="所在部门" prop="department">
                        <el-select v-model="addForm.department">
                            <el-option :value="1">教育一部</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {_uploadPic} from "@/api/common";
    var checkPhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空!'));
        } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            // console.log(typeof value)
            // console.log(reg.test(value));
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号!'));
            }
        }
    }
    export default {
        name: "checkAddAndEdit",
        data() {
            return {
                visible: false,
                title: 1,
                picture:false,
                baseUrl:'',
                addForm: {
                    name: "",
                    sex:'',
                    birthday:'',
                    avatar:'',//头像
                    ethnic:'',//名族
                    native:'',//籍贯
                    political:'',//政治面貌
                    marriage:'',//婚姻状况
                    education:'',//学历
                    college:'',//毕业学校
                    major:'',//专业
                    phone:'',
                    email:'',
                    address:'',
                    position:[],//职位
                    loginAccount:'',//登录账号
                    password:'',//登录密码
                    department:'',//部门
                },
                rules: {
                    name: [{required: true, message: '请填写学校名称!', trigger: 'blur'}],
                    sex: [{required: true, message: '请选择性别!', trigger: 'change'}],
                    avatar: [{required: true, message: '请上传头像!', trigger: 'change'}],
                    phone: [{validator: checkPhone, trigger: 'blur', required: true}],
                    marriage: [{required: true, message: '请选择婚姻状况!', trigger: 'change'}],
                    loginAccount: [{required: true, message: '请填写登录账号!', trigger: 'blur'}],
                    password: [{required: true, message: '请填写用户密码!', trigger: 'blur'}],
                },
            }
        },
        methods: {
            submit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        console.log(this.addForm)
                    } else {
                        return false
                    }
                })
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
