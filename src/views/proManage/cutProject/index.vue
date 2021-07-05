<template>
    <div class="big">
        <div class="top">
            <div class="campus">
                <div class="items">
                    <div class="count">12</div>
                    <div class="dec">
                        <img src="@/assets/images/campus01.png" alt="">
                        <span>运营中的校区</span>
                    </div>
                </div>
                <div class="items">
                    <div class="count">32</div>
                    <div class="dec">
                        <img src="@/assets/images/campus02.png" alt="">
                        <span>培训中的班级</span>
                    </div>
                </div>
                <div class="items">
                    <div class="count">705</div>
                    <div class="dec">
                        <img src="@/assets/images/campus03.png" alt="">
                        <span>培训中的人数</span>
                    </div>
                </div>
                <div class="items">
                    <div class="count">81</div>
                    <div class="dec">
                        <img src="@/assets/images/campus04.png" alt="">
                        <span>开设课程</span>
                    </div>
                </div>
                <div class="items">
                    <div class="count">56</div>
                    <div class="dec">
                        <img src="@/assets/images/campus06.png" alt="">
                        <span>教师人数</span>
                    </div>
                </div>
                <div class="items">
                    <div class="count">3280</div>
                    <div class="dec">
                        <img src="@/assets/images/campus05.png" alt="">
                        <span>毕业人数</span>
                    </div>
                </div>
            </div>
            <div class="graduation">
                <line-chart :y-data="[415,412,408,416,414, 416, 422, 421, 426, 424,420,417]" :x-data="['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']"></line-chart>
            </div>
        </div>
        <div class="middle">
            <div class="items" v-for="item in 4" :key="item">
                <div class="title">
                    <img src="@/assets/images/campus01.png" alt="">
                    <span>上海静安校区</span>
                </div>
                <div class="title">
                    <img src="@/assets/images/campus03.png" alt="">
                    <span>培训中人数: <span style="font-weight: 600">50人</span></span>
                </div>
                <div>
                    <div class="time">毕业时间表</div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="class" label="班级" ></el-table-column>
                        <el-table-column prop="time" label="毕业时间" ></el-table-column>
                        <el-table-column prop="number" label="预计毕业人数"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="items">
                <bar-chart :x-data="['1月','2月','3月','4月','5月','6月']" :y-data="[23,41,32,43,52,57]" id="barChart01" title="月开班数量" color="#9270CA" tag="班级数（个）"></bar-chart>
            </div>
            <div class="items">
                <bar-chart :x-data="['1月','2月','3月','4月','5月','6月']" :y-data="[23,41,32,43,52,57]" id="barChart02" title="月招生人数" color="#5AD8A6" tag="人数（人）"></bar-chart>
            </div>
            <div class="items">
                <bar-chart :x-data="['1月','2月','3月','4月','5月','6月']" :y-data="[23,41,32,43,52,57]" id="barChart03" title="月毕业率" color="#F2637B" tag="百分比%"></bar-chart>
            </div>
        </div>
    </div>
</template>

<script>

    import lineChart from "./module/lineChart";
    import barChart from "./module/barChart";
    export default {
        name: "Dashboard",
        data() {
            return {
                tableData:[
                    {class:'春季班',time:'2021.04.01',number:19},
                    {class:'春季班2期',time:'2021.04.01',number:19},
                ]
            };
        },
        components: {
            lineChart,barChart
        },
        mounted() {

        },
        methods: {

        },
    };
</script>

<style lang="less" scoped>
    .big {
        background-color: rgb(243, 243, 243);
        height: calc(100vh - 84px);
        display: flex;
        flex-direction: column;
        padding: 15px;

        .top {
            display: flex;
            justify-content: space-between;
            flex: 1;
            margin-bottom: 20px;

            .campus {
                display: flex;
                flex-wrap: wrap;
                flex: 1;
                margin-right: 20px;
                justify-content: space-around;

                .items {
                    width: 33.1%;
                    height: 49%;
                    margin-bottom: 2px;
                    background: #ffffff;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding-left: 40px;
                    .count {
                        font-size: 26px;
                        font-weight: 600;
                        margin-bottom: 15px;
                    }
                    .dec{
                        display: flex;
                        align-items: center;
                        img{
                            width: 22px;
                            margin-right:4px ;
                        }
                    }
                }
            }
            .graduation {
                flex: 1;
                background: #ffffff;
            }
        }
        .middle {
            flex: 1;
            display: flex;
            margin-bottom: 20px;
            .items{
                background: #ffffff;
                width: 25%;
                margin-right: 20px;
                padding:20px 20px 0;
                box-sizing: border-box;
                .title{
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                    img{
                        width: 22px;
                        margin-right: 4px;
                    }
                }
                .time{
                    padding-bottom: 8px
                }
            }
            :last-child{
                margin-right: 0;
            }
        }

        .footer {
            flex: 1;
            display: flex;
            .items{
                flex: 1;
                margin-right: 20px;
                background: #ffffff;
            }
            :last-child{
                margin-right: 0;
            }
        }
    }
</style>
