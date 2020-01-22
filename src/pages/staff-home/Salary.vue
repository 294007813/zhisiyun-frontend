<template>
<div class="salary">
    <h5>薪资信息<i class="iconfont iconyanjing"></i></h5>
    <el-tabs v-model="activeTabs" @tab-click="salaryClick">
        <el-tab-pane label="月度" name="mon">
            <div class="mon">
                <p class="title">2019年</p>
                <ul>
                    <li><label>3月</label><p>10,000.00</p></li>
                    <li><label>4月</label><p>10,000.00</p></li>
                    <li><label>5月</label><p>10,000.00</p></li>
                    <li><label>6月</label><p>10,000.00</p></li>
                    <li><label>7月</label><p>10,000.00</p></li>
                    <li><label>8月</label><p>10,000.00</p></li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane label="趋势" name="trend">
            <div class="trend" v-if="ismounted && showTrend ">
                <p class="title">2019年10月 <span>实发工资：</span><b>9,000.00</b></p>
                <v-chart :options="trendChart" class="chart" ref="salarytc" autoresize/>
            </div>
        </el-tab-pane>
        <el-tab-pane label="统计" name="sta">
            <el-date-picker
                    prefix-icon="iconfont iconshaixuan"
                    class="dp"
                    size="mini"
                    v-model="stadate"
                    type="monthrange"
                    range-separator="-"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份">
            </el-date-picker>

            <ul class="sta">

                <li><label>累计发放</label><p>24个月</p></li>
                <li><label>累计公司应缴公积金</label><p>21,000.00</p></li>
                <li><label>累计发放</label><p>24个月</p></li>
                <li><label>累计公司应缴公积金</label><p>21,000.00</p></li>
                <li><label>累计发放</label><p>24个月</p></li>
                <li><label>累计公司应缴公积金</label><p>21,000.00</p></li>
                <li><label>累计发放</label><p>24个月</p></li>
                <li><label>累计公司应缴公积金</label><p>21,000.00</p></li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import salarytrendChart from '../aqi-beijing'
export default {
    name: "Salary",
    data(){
        return {
            ismounted: false,
            activeTabs: 'mon',
            showTrend: false,
            stadate: null,
            trendChart:{
                // title: {
                //     text: 'Beijing AQI'
                // },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data:salarytrendChart.map(function (item) {
                        return item[0];
                    })
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '2014-06-01'
                }, {
                    type: 'inside'
                }],
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 50,
                        color: '#096'
                    }, {
                        gt: 50,
                        lte: 100,
                        color: '#ffde33'
                    }, {
                        gt: 100,
                        lte: 150,
                        color: '#ff9933'
                    }, {
                        gt: 150,
                        lte: 200,
                        color: '#cc0033'
                    }, {
                        gt: 200,
                        lte: 300,
                        color: '#660099'
                    }, {
                        gt: 300,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: {
                    name: 'Beijing AQI',
                    type: 'line',
                    data: salarytrendChart.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                    }
                }
            }
        }
    },
    mounted() {
        this.ismounted= true
    },
    methods:{
        salaryClick({name}){
            switch (name) {
                case 'trend':{
                    this.showTrend= true;
                    break;
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.salary{
    @include block;
    h5{
        i{
            font-size: 12px;
            color: $color-gray-dark;
            margin-left: 4px;
            cursor: pointer;
        }
    }
    .mon{
        height: $bl - 40 +px;
        overflow: auto;
        padding: 0 10px;
        .title{
            font-size: 18px;
            margin-top: 20px;
            padding-left: 10px;
            font-weight: 500;
        }
        ul{
            li{
                display: inline-block;
                padding: 10px;
                border : 10px solid transparent;
                width: 1/3*100%;
                position: relative;
                cursor: pointer;
                label{
                    font-size: 14px;
                    font-weight: 600;
                    display: block;
                    margin-bottom: 6px;
                }
                p{
                    font-size: 12px;
                }
                &:after{
                    z-index: 0;
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    border: 1px solid $color-line-light;
                }
                &:hover{
                    :after{
                        border-color: transparent;
                        box-shadow:0px 4px 8px 0px rgba(0,0,0,0.16);
                    }
                }
            }
        }
    }
    .trend{
        .chart{
            height: $bl - 40 +px;
            width: 100%;
        }
        .title{
            position: absolute;
            left: 20px;
            top: 10px;
            span{
                margin-left: 10px;
            }
            b{
                font-weight: 600;
            }
        }
    }
    .dp{
        width: 340px;
        border: 0;
        margin: 4px 10px 0;
        color: $color-black;

    }
    .sta{
        height: $bl - 40 - 30 +px;
        padding: 10px;
        overflow: auto;
        background-color: white;

        li{
            display: inline-block;
            padding: 10px;
            border : 10px solid transparent;
            width: 50%;
            text-align: center;
            &, & *{position: relative;}
            label{
                font-size: 12px;
                display: block;
                margin-bottom: 6px;
                z-index: 1;
            }
            p{
                font-size: 14px;
                z-index: 1;
                font-weight: 600;
            }
            &:after{
                z-index: 0;
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: $color-gray-light;
            }
        }
    }
}
</style>