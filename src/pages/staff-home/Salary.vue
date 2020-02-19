<template>
<div class="salary">
    <h5>薪资信息<i class="iconfont iconyanjing"></i></h5>
    <el-tabs v-model="activeTabs" @tab-click="salaryClick">
        <el-tab-pane label="月度" name="mon" v-if="fimon">
            <div class="mon" v-if="mon">
                <template v-for="(arr, key) in mon">
                    <p class="title">{{key}}年</p>
                    <ul>
                        <li v-for="(item, i) in arr" :key="i"><label>{{item.mon}}月</label><p>{{item.amount}}</p></li>
                    </ul>
                </template>
            </div>
        </el-tab-pane>
        <el-tab-pane label="趋势" name="trend" v-if="fitrend">
            <div class="trend" v-if="ismounted && showTrend ">
                <p class="title">2019年10月 <span>实发工资：</span><b>9,000.00</b></p>
                <v-chart :options="trendChart" class="chart" ref="salarytc" autoresize/>
            </div>
        </el-tab-pane>
        <el-tab-pane label="统计" name="sta" v-if="fista">
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

            <ul class="sta" v-if="sta">
                <template v-for="(item, key) in sta.huizong">
                    <li><label>累计发放</label><p>{{sta.sum_month}} 个月</p></li>
                    <li><label>{{item.name}}</label><p>{{item.count}}</p></li>
                </template>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: "Salary",
    props: ["conf"],
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
                    data:[]
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
                    name: '实发工资',
                    type: 'line',
                    data: [],
                }
            },
            mon: null,
            sta: null
        }
    },
    computed:{
        fimon(){
            let data= this.conf.pages.mon
            return data.able && data.show && data.fields
        },
        fitrend(){
            let data= this.conf.pages.trend
            return data.able && data.show && data.fields
        },
        fista(){
            let data= this.conf.pages.sta
            return data.able && data.show && data.fields
        }
    },
    mounted() {
        this.activeTabs= this.fimon && 'mon' || this.fitrend && 'trend' || this.fista && 'sta'
        this.ismounted= true
        this.getMon()
        this.getTrend()
        this.getSta()
    },
    methods:{
        getMon(){
            this.$axios.get("/api/feishu/xc/allBaseinfo").then(data=>{
                let arr= data.slice(-6)
                this.mon= {}
                arr.map(item=>{
                    let {years, months}= this.$f.moment(item.cpi.month).toObject()
                    this.mon[years]? false: this.mon[years]= []
                    this.mon[years].push({mon: months+1, amount: item.ci_items.length && (item.ci_items[0].amount ||0)})
                })

                let trend= data.slice(-18)
                let xv=[], yv=[]
                trend.map(item =>{
                    xv.push(item.cpi.month)
                    yv.push( item.ci_items.length && (item.ci_items[0].amount ||0))
                })
                this.trendChart.dataZoom[0].startValue= xv[xv.length-6]
                this.trendChart.xAxis.data= xv
                this.trendChart.series.data= yv
            })
        },
        getTrend(){
            this.$axios.post("/api/feishu/xc/totalinfo2",this.stadate &&{
                start_date: this.stadate[0],
                end_date: this.stadate[1],
            }).then(data=>{
                this.sta= data
            })
        },
        getSta(){
            this.$axios.post("/api/feishu/xc/totalinfo",{
                start_date: "2019-6",
                end_date: "2019-12",
            }).then(data=>{

            })
        },
        salaryClick({name}){
            switch (name) {
                case 'trend':{
                    this.showTrend= true;
                    break;
                }
                case 'sta':{

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
        padding: 0 10px;
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