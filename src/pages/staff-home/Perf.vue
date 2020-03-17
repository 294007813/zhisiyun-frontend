<template>
<div class="perf">
    <h5>{{$t("index.perform")}}</h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick" class="block-tabs">
        <el-tab-pane :label="(title ||$t('index.current')) +$t('index.monthly_pfm')" name="now" v-if="finow">
            <div class="now" v-if="ismounted">
                <v-chart :options="nowChart" class="chart" ref="now" autoresize/>
                <el-button size="small" type="primary" plain class="but"
                    v-if="finow.enter" @click="$f.href('/admin/pm/pm_index/form')">{{$t("index.enter_perform")}}</el-button>
                <h3 class="od">{{od.name}}</h3>
                <p class="od">{{$t("index.performance_scores")}}<span>{{od.value}}</span></p>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('index.recent_trends')" name="trend" v-if="fitrend">
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
    props: ["conf"],
    data(){
        let self= this
        return{
            activeTabs: 'now',
            ismounted: false,
            showTrend: false,
            nowChart: {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                // toolbox: {
                //     feature: {
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                series: [
                    {
                        name: "我的绩效",
                        type: 'gauge',
                        splitNumber: 4,
                        title: {
                            show: false,
                        },
                        detail: {
                            show: false,
                            formatter: '绩效分数{value}'
                        },
                        pointer: {
                            width: 5,
                        },
                        data: [{value: 0, name: '绩效分数'}],
                        splitLine:{
                            length: 30,
                        },
                        axisLine: {            // 坐标轴线
                            show: true,
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 14,
                                color: [[0.2, '#5D77FF'], [0.4, '#5992fe'], [0.6, '#589ffd'], [0.8, '#55b9fc'], [1, '#54C7FC']]
                            }
                        },
                        axisTick: {
                            splitNumber: 11,
                            length: 19,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'white',
                                width: 6
                            }
                        },
                        itemStyle:{
                            color: "auto"
                        }
                    }
                ]
            },
            trendChart: {
                grid: {
                    // show: true,
                    //grid 组件离容器左侧的距离。
                    top: "10%",
                    left: "5%",
                    //grid 组件离容器右侧的距离。
                    right: "5%",
                    //grid 组件离容器下侧的距离。
                    bottom: "8%",
                    //grid 区域是否包含坐标轴的刻度标签。true这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
                    containLabel: true,
                    // 网格背景色，此配置项生效的前提是，设置了 show: true
                    backgroundColor: "#fff"
                },
                xAxis: {
                    axisLine: {
                        show: false,
                    },
                    type: 'category',
                    axisTick: {show : false},
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    offset: 8
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    axisTick: {show : false},
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#EEEEEE"
                        },

                    },
                },
                tooltip: {
                    show: true,
                    formatter: function ({data: {level},value}, c) {
                        return `${self.$t("index.fraction")}：${value}${self.$t("index.fraction_1")}<br />${self.$t("index.grade")}：${level}`
                    },
                    position: function (point, params, dom, rect, size) {
                        const {contentSize: { 0: domWidth}, viewSize} = size;
                        if (domWidth + point[0] > viewSize[0]) {
                            return [point[0] - domWidth, point[1]-40];
                        }
                        return [point[0], point[1]-40];
                    },
                    backgroundColor: "rgba(255,255,255,0.9)",
                    textStyle: {
                        color: "rgba(102,102,102,1)",
                        fontSize: 12
                    },
                    extraCssText: "box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);border-radius:4px;"

                },
                series: [{
                    data: [],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: {
                                type: "linear",
                                    x:0, y:0, x2:0, y2:1,  //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                                    colorStops: [
                                        {offset: 0, color: 'rgba(84,199,252,1)'},
                                        {offset: 1, color: 'rgba(93,119,255,1)'},
                                    ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                            }
                        }
                    },
                    barWidth: '30px',
                    formatter: function ({value}) {
                        // console.log(arguments);
                        return value
                    }
                }]
            },
            od: {value: 0,  name: '暂无数据'},
            title: ""
        }
    },
    computed:{
        finow(){
            let data= this.conf.pages.now
            return data.able && data.show && data.fields
        },
        fitrend(){
            let data= this.conf.pages.trend
            return data.able && data.show && data.fields
        },
    },
    mounted() {
        this.activeTabs= this.finow && 'now' || this.fitrend && 'trend'
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
                // let od= {value: 0,  name: '暂无数据'}
                if(data.length){
                    this.od= {value: data[0].ai_score, name: data[0].ai_grade}
                    let ti= data[0].period_name.split("年")
                    this.title= ti.length==2? ti[1]: ti[0]
                }
                this.nowChart.series[0].data= [this.od]
            })
        },
        getRange(){
            this.$axios.get("/api/feishu/jx/rangedatas").then(data=>{
                // data.sort((a, b)=>{
                //     return a.period_value< b.period_value
                // })
                // 过滤
                // let newData = []
                // data.forEach(v => {
                //     if (v.year && (v.period_value || v.period_value === 0)) newData.push(v)
                // })
                let xAxis= [],series=[]
                //
                // newData.map(item=>{
                //     // xAxis.push(item.period_name)
                //     let month = item.period_value < 9 ? '0' + (item.period_value + 1) : item.period_value + 1 + ''
                //     xAxis.push(item.year&&item.year.substring(2) + '/' + month)
                //     series.push({
                //         level: item.ai_grade,
                //         value: item.ai_score
                //     })
                // })
                for(let i=data.length-1; i>=0; i--){
                    let item= data[i]
                    if (item.year && (item.period_value || item.period_value === 0)){
                        let month = item.period_value < 9 ? '0' + (item.period_value + 1) : item.period_value + 1 + ''
                        xAxis.push(item.year&&item.year.substring(2) + '/' + month)
                        series.push({
                            level: item.ai_grade,
                            value: item.ai_score
                        })
                    }
                }

                this.trendChart.xAxis.data=xAxis
                this.trendChart.series[0].data=series
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
        .od{
            position: absolute;
            bottom: 64px;
            left: 50%;
            transform: translateX(-50%);
        }
        h3.od{
            font-size: 24px;
            font-weight: 500;
            bottom: 86px;
            padding: 4px 10px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 20px;
        }
        p.od{
            color: $color-gray-dark;
            span{ color: $color-black}
        }
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