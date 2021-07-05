<template>
    <div id="myChart" style="width: 100%; height: 100%;"></div>
</template>

<script>
    export default {
        name: "lineChart",
        props:{
            xData:{
                type:Array,
            },
            yData:{
                type:Array,
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine(){
                let that = this
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '每月毕业人数预计',left:20 ,top:15},
                    xAxis: {
                        type: 'category',
                        data: that.xData
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '30%',
                        bottom:'15%'
                    },
                    yAxis: {
                        type: 'value',
                        min:'dataMin',
                        max:'dataMax',
                        name:'人数（人）'
                    },
                    series: [{
                        data: that.yData,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color:'#ecdce9'
                        },
                        itemStyle:{
                            color:'#7F1770'
                        }
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
