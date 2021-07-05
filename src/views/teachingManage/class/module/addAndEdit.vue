<template>
    <el-dialog :visible.sync="visible" width="75%" :title="title ==1?'新增':'修改'" top="2vh">
        <el-form size="small" label-width="100px" :inline="true">
            <el-form-item label="校区：">
                <el-select>
                    <el-option :value="1" label="浦东校区"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级名称：">
                <el-input style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="开班时间：">
                <el-date-picker type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-date-picker type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="班主任：">
                <el-select>
                    <el-option :value="1" label="张三"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计划培训人数：">
                <el-input type="number" style="width:220px"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
            <el-calendar>
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p style="display: flex;justify-content: space-between">
                        <span>{{ data.day.split('-').slice(1).join('-') }}</span>
                        <span class="el-icon-plus" @click="addLesson({date, data})">添加</span>
                    </p>
                    <div style="height: 50px;overflow-y: auto;color: red" v-for="item in lessonList" v-if="item.year == data.day.split('-')[0]&&item.month == data.day.split('-')[1]&&item.day == data.day.split('-')[2]">
                        <p v-for="_item in item.itemList">
                            {{_item.start}}-{{_item.end}}  {{_item.name}}  {{_item.lesson}}
                        </p>
                    </div>
                </template>
            </el-calendar>
        </el-row>
        <div slot="footer">
            <el-button type="primary">提交</el-button>
            <el-button @click="visible = false">取消</el-button>
        </div>
        <el-dialog width="30%" title="排课" append-to-body :visible.sync="planLesson">
            <el-form label-width="100px" size="small">
                <el-form-item label="开始时间:">
                    <el-time-picker :picker-options="{selectableRange: '09:00:00 - 17:00:00'}"></el-time-picker>
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-time-picker :picker-options="{selectableRange: '09:00:00 - 17:00:00'}"></el-time-picker>
                </el-form-item>
                <el-form-item label="课程:">
                    <el-select>
                        <el-option :value="1" label="课程01"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任课老师:">
                    <el-select>
                        <el-option :value="1" label="张三"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small">提交</el-button>
                <el-button size="small" @click="planLesson = false">取消</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<script>
    export default {
        name: "addAndEdit",
        data(){
            return{
                visible:false,
                title:1,
                planLesson:false,
                lessonList:[
                    {
                        year:'2021',
                        month:'04',
                        day:'15',
                        itemList:[
                            {start:'09:00',end:'11:00',name:'浦东校区',lesson:'日常保洁'}
                        ]
                    },
                    {
                        year:'2021',
                        month:'05',
                        day:'01',
                        itemList:[
                            {start:'09:00',end:'11:00',name:'浦东校区',lesson:'日常保洁'}
                        ]
                    }
                ]
            }
        },
        methods:{
            addLesson(data){
                console.log(data)
                this.planLesson = true
            }
        }
    }
</script>

<style scoped>

</style>
