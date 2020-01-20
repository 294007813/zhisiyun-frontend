<template>
<div class="staff-home">
    <li class="border small">
        <div class="base">
            <img class="bg" src="~as/img/staff-home/info-bg.svg"/>
            <h1 class="name"><p>周比利</p><span>001</span><a>正式</a></h1>
            <div class="title">销售部/销售经理 <b>高级-L1-1</b></div>
            <p><label>星座：</label>双鱼座</p>
            <p><label>属相：</label>羊</p>
            <p><label>生日：</label>02-15</p>
            <p><label>入职日期：</label>2017-01-02 <span>下属：23人</span></p>
            <a>查看档案<i class="iconfont iconyoujiantou"></i></a>
            <div class="head">
                <img src="~as/img/staff-home/head.png"/>
                <p><i class="iconfont iconxunzhangtubiao"></i>3枚</p>
            </div>

        </div>
    </li>

    <li class="border small">
        <div class="checkin">
            <ul class="sta">
                <h5>本月考勤统计<i class="iconfont iconyoujiantou"></i></h5>
                <li>
                    <p>23<b>天</b></p>
                    <span>出勤天数</span>
                </li>
                <li>
                    <p>0<b>天</b></p>
                    <span>请假</span>
                </li>
                <li>
                    <p>1<b>次</b></p>
                    <span>迟到早退</span>
                </li>
                 <li>
                    <p>23<b>次</b></p>
                    <span>缺卡</span>
                </li>
            </ul>
            <ul class="balance">
                <h5>假期余额<i class="iconfont iconyoujiantou"></i></h5>
                <li>
                    <p>16<b>时</b></p>
                    <span>年假余额</span>
                </li>
                <li>
                    <p>0<b>时</b></p>
                    <span>调休假余额</span>
                </li>
            </ul>
            <ul class="flow">
                <h5>考勤流程<i class="iconfont iconyoujiantou"></i></h5>
                <li><el-button size="small" type="primary" plain>请假</el-button></li>
                <li><el-button size="small" type="primary" plain>加班</el-button></li>
                <li><el-button size="small" type="primary" plain>出差</el-button></li>
                <li><el-button size="small" type="primary" plain>公干</el-button></li>
            </ul>
        </div>
    </li>

    <li class="border small">
        <div class="salary">
            <h5>本月考勤统计<i class="iconfont iconyanjing"></i></h5>
            <el-tabs v-model="salary.activeTabs" @tab-click="salaryClick">
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
                    <div class="trend" v-if="ismounted && salary.showTrend ">
                        <v-chart :options="salary.trendChart" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="统计" name="sta">

                </el-tab-pane>
            </el-tabs>
        </div>
    </li>

</div>
</template>

<script>
export default {
    name: "staff-home",
    data(){
        return{
            ismounted: false,
            salary: {
                activeTabs: 'mon',
                showTrend: false,
                trendChart:{
                    title: {
                        text: 'Beijing AQI'
                    },
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
                        name: 'Beijing AQI',
                        type: 'line',
                        data: [],
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
        }
    },
    mounted() {
        this.ismounted= true
    },
    methods:{
        salaryClick({name}){
            switch (name) {
                case 'trend':{
                    this.salary.showTrend= true;
                    break;
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "~as/img/staff-home/iconfont/iconfont.css";
$bl: 320;
$blh: $bl+px;
.staff-home{
    min-width: 1000px;
    min-height: 500px;
    padding: 20px 10px;
    background-color: $color-bg;
    .border{
        padding: 0 10px;
        margin-bottom: 20px;
        display: inline-block;
        >div{
            background-color: white;
            height: $blh;
            box-shadow:0 1px 2px 0 rgba(0,0,0,0.12);
            position: relative;
            overflow: hidden;
            color: $color-black;
        }
        &.small{
            width: 1/3*100%;
        }
        &.half{
            width: 50%;
        }
        &.long{
            width: 100%;
        }
        h5{
            font-weight: 500;
            font-size: 16px;
        }

        /deep/ .el-tabs.el-tabs--top{
            .el-tabs__header{
                margin: 0;
                .el-tabs__nav-wrap{
                    &:after{
                        height: 1px;
                        background-color: $color-border;
                    }
                    .el-tabs__nav-scroll .el-tabs__nav{
                        margin: 0 20px;
                        float: right;
                        .el-tabs__item:not(.is-active){
                            color: $color-gray-dark;
                        }
                    }
                }
            }
        }
    }
}
.staff-home .border{
    .base{
        padding: 36px;
        >*{position: relative}
        .bg{
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
        }
        .name{
            vertical-align: middle;
            margin: 16px 0;
            *{display: inline-block; vertical-align: middle;}
            p{
                font-weight: 600;
                font-size: 24px;
            }
            span{
                display: inline-block;
                padding: 0 10px;
                font-size: 12px;
            }
            a{
                font-size: 12px;
                color: white;
                background-color: #3075F1;
                line-height: 20px;
                padding: 0 10px;
                border-radius: 2px;
            }
        }
        .title{
            font-size: 14px;
            margin-bottom: 10px;
            b{
                margin-left: 10px;
                font-weight: 400;
                font-size: 12px;
                color: $color-gray-dark;
            }
        }
        >p{
            font-size: 14px;
            position: relative;
            margin-bottom: 10px;
            label{color: $color-gray;}
            span{
                display: inline-block;
                font-size: 12px;
                line-height: 28px;
                padding: 0 10px;
                color: $color-primary;
                border: 1px solid $color-primary;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 20px;
            }
        }
        .head{
            position: absolute;
            top: 40px;
            right: 40px;
            width: 100px;
            overflow: hidden;
            text-align: center;
            img{
                border-radius: 100%;
                overflow: hidden;
                width: 100%;
                height: auto;
                border: 1px solid $color-border;
                margin-bottom: 10px;
            }
            p{
                display: inline-block;
                font-size: 12px;
                width: 50px;
                height: 20px;
                line-height: 20px;
                vertical-align: middle;
                border-radius: 10px;
                background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
                box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
                color: white;
                i{
                    font-size: 10px;
                    margin-right: 4px;
                }
            }
        }
        >a{
            cursor: pointer;
            display: inline-block;
            font-size: 12px;
            margin-top: 10px;
            color: $color-gray;
            i{
                font-size: 12px;
            }
        }
    }
    .checkin{
        padding: 6px 20px;
        ul{
            padding-top: 10px;
            height: 1/3*100%;
            &:not(:last-child){border-bottom: 1px solid $color-border;}
            h5{
                margin-bottom: 14px;
                position: relative;
                i{
                    font-weight: 400;
                    color: $color-gray;
                    font-size: 12px;
                    position: absolute;
                    right: -10px;
                    padding: 10px;
                    cursor: pointer;
                    top: 50%;
                    transform: translateY(-50%);
                    vertical-align: middle;
                }
            }
            li{
                width: 25%;
                text-align: center;
                display: inline-block;
            }
        }
        .sta,.balance{
            li{
                p{
                    font-size: 16px;
                    margin-bottom: 4px;
                    b{ font-size: 12px; margin-left: 6px}
                }
                span{ font-size: 12px}
            }
        }
    }
    .salary{
        h5{
            position: absolute;
            left: 20px;
            top: 8px;
            z-index: 1;
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
                    :after{
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
    }
}
</style>