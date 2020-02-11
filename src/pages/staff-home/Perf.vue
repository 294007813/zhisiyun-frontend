<template>
<div class="perf">
    <h5>我的绩效</h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick">
        <el-tab-pane label="当前绩效" name="now">
            <div class="now" v-if="ismounted">
                <v-chart :options="nowChart" class="chart" ref="now" autoresize/>
                <el-button size="small" type="primary" plain class="but">进入绩效首页</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="近期趋势" name="trend">
            <div class="trend" v-if="ismounted && showTrend ">
                <v-chart :options="trendChart" class="chart" ref="trend" autoresize/>
            </div>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: "Perf",
    data(){
        return{
            activeTabs: 'now',
            ismounted: false,
            showTrend: false,
            nowChart: {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {formatter: '绩效分数{value}'},
                        // detail: {value: 50, name: '良好'},
                        data: [{value: 50, name: '良好'}]
                        // data: [{formatter: '绩效分数{value}'}]
                    }
                ]
            },
            trendChart: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            }
        }
    },
    mounted() {
        this.ismounted= true
        this.getTM()
        this.getRange()
    },
    methods:{
        tabClick({name}){
            switch (name) {
                case 'trend':{
                    this.showTrend= true;
                    break;
                }
            }
        },
        getTM(){
            this.$axios.get("/api/feishu/jx/onedata").then(data=>{
                let od= {value: 0,  name: '良好'}
                if(data.length){
                    od= {value: data[0].ai_score, name: data[0].ai_grade}
                }
                this.nowChart.series[0].data= [od]
            })
        },
        getRange(){
            this.$axios.get("/api/feishu/jx/rangedatas").then(data=>{
                data.sort((a, b)=>{
                    return a.period_value< b.period_value
                })
                let xAxis= [],series=[]
                data.map(item=>{
                    xAxis.push(item.period_name)
                    series.push(item.ai_score)
                })
                this.trendChart.xAxis.data=xAxis
                this.trendChart.series.data=series
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.perf{
    @include block;
    .now, .trend{
        .chart{
            height: $bl - 40 +px;
            width: 100%;
        }
        .but{
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>