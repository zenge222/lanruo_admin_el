<template>
    <div :id="id" style="width: 100%; height: 100%;"></div>
</template>

<script>
    export default {
        name: "barChart",
        props:{
            xData:{
                type:Array,
            },
            yData:{
                type:Array,
            },
            id:{
                type:String
            },
            title:{
                type:String
            },
            color:{
                type:String
            },
            tag:{
                type:String
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine(){
                let that = this
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(that.id))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: that.title,
                        left:20 ,
                        top:15
                    },
                    grid: {
                        top: '30%',
                        bottom:'15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: that.xData
                    },
                    yAxis: {
                        type: 'value',
                        name:that.tag,
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    series: [{
                        data: that.yData,
                        type: 'bar',
                        itemStyle:{
                            color:that.color
                        },
                        barWidth:'35%',
                    }]
                });
                let listener= function (){
                    myChart.resize()
                }
                window.addEventListener('resize', listener)
            }
        },
    }
</script>

<style scoped>

</style>
