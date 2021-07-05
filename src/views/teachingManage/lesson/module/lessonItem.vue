<template>
    <el-dialog title="课程表" :visible.sync="visible" width="75%" top="3vh">
        <el-row>
            <el-col :span="24" style=" margin-bottom: 20px;">课程名称:  礼仪课</el-col>
            <el-col :span="24" style=" margin-bottom: 20px;">上课老师:  张三</el-col>
            <el-col :span="24" style=" margin-bottom: 20px;">课程简述:  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-col>
        </el-row>
        <div style="margin-top: 20px;font-weight: 600;color:#333333">排课</div>
        <el-calendar>
            <template
                slot="dateCell"
                slot-scope="{date, data}">
                <p>
                    {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div style="height: 50px;overflow-y: auto;color: red" v-for="item in lessonList" v-if="item.year == data.day.split('-')[0]&&item.month == data.day.split('-')[1]&&item.day == data.day.split('-')[2]">
                    <p v-for="_item in item.itemList">
                        {{_item.start}}-{{_item.end}}  {{_item.name}}  {{_item.lesson}}
                    </p>
                </div>
            </template>
        </el-calendar>
    </el-dialog>
</template>

<script>
    export default {
        name: "lessonItem",
        data(){
            return{
                visible:false,
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
    }
</script>

<style scoped>

</style>
