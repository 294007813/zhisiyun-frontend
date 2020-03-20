<template>
<div class="salary">
    <h5>{{$t("index.salary_information")}}
        <el-tooltip class="tooltip" effect="dark" :content="`${ishide?'查看': '隐藏'}薪资`" placement="bottom-start">
            <span>
                <i class="iconfont iconyanjing open" @click="checkPassword(true)" v-show="!ishide"></i>
                <img class="close" src="~as/img/staff-home/iconfont/close.png" v-show="ishide" @click="checkPassword(false)"/>
            </span>
        </el-tooltip>
    </h5>
    <el-tabs v-model="activeTabs" @tab-click="salaryClick" class="block-tabs">
        <el-tab-pane :label="$t('xc.monthly')" name="mon" v-if="fimon">
            <div class="mon" v-if="mon">
                <template v-for="(it, key) in revmon">
                    <p class="title">{{it.year}}{{$t("index.year")}}</p>
                    <ul>
                        <li v-for="(item, i) in it.item" :key="i"><label>{{item.mon}}{{$t("index.month")}}</label><p>{{hidstr || $f.currencyFilter(item.amount)}}</p></li>
                    </ul>
                </template>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('xc.trend')" name="trend" v-if="fitrend">
            <div class="trend" v-if="ismounted && showTrend">
                <!-- <p class="title">2019年10月 <span>{{$t("index.real_wage")}}：</span><b>9,000.00</b></p>
                <v-chart :options="trendChart" class="chart" ref="salarytc" autoresize/> -->
                <!-- 趋势图 -->
                <trend v-if="Object.keys(slideList).length" :eyes="hidstr" :dateInterval="dateInterval" :trendList="slideList"></trend>
                <div v-else v-nodata="{have: !Object.keys(slideList).length}"></div>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('xc.statistics')" name="sta" v-if="fista">
            <el-date-picker
                    @change="getTrend"
                    prefix-icon="iconfont iconshaixuan"
                    class="dp"
                    size="mini"
                    :clearable="false"
                    v-model="stadate"
                    type="monthrange"
                    value-format="yyyy-MM"
                    range-separator="-"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
            :picker-options="{disabledDate}">
            </el-date-picker>

            <ul class="sta">
                <li><label>{{$t("xc.grand_total")}}</label><p>{{sta.sum_month}} {{$t("index.the_month")}}</p></li>
                <li><label>{{$t("xc.accumulated_wages")}}</label><p>{{hidstr || $f.currencyFilter(sta.p_all_income)}}</p></li>
                <template v-for="(item, key) in sta.huizong">
                    <li><label>{{item.name}}</label><p>{{hidstr || $f.currencyFilter(item.count)}}</p></li>
                </template>
                <li><label>{{$t("xc.accumulated_individual_deduction")}}</label><p>{{hidstr || $f.currencyFilter(sta.dikou_total)}}</p></li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import trend from "./components/trend";
import cookie from 'js-cookie'
export default {
    name: "Salary",
    props: ["conf"],
    components: {
        trend
    },
    data(){
        return {
            ishide: true,
            ismounted: false,
            activeTabs: 'mon',
            showTrend: false,
            stadate: null,
            mon: null,
            sta: {},
            
            // 趋势图
            dateInterval: [],
            slideList: {}
        }
    },
    computed:{
        uid(){
            return this.$store.getters.userId
        },
        ssd(){
            return this.$store.getters.userInfo.start_service_date
        },
        hidstr(){
            return this.ishide ? "******" : ''
        },
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
        },
        revmon(){
            let arr=[]
            for(let y in this.mon){
                let ys= this.mon[y], ms=[]
                for(let m in ys){
                    ms.unshift({mon: m, amount: ys[m]})
                }
                arr.unshift({year: y, item: ms})
            }
            // console.log(JSON.stringify(arr))
            return arr
        }
    },
    mounted() {
        this.activeTabs= this.fimon && 'mon' || this.fitrend && 'trend' || this.fista && 'sta'
        this.stadate=[moment(this.ssd).format("YYYY-MM"), moment().format("YYYY-MM")]
        this.ismounted= true
        this.getMon()
        this.getTrend()
    },
    methods:{
        getMon(){
            this.$axios.get("/api/feishu/xc/allBaseinfo").then(data=>{
                // let arr= data.slice(-6)
                let arr= data
                this.mon= {}
                for(let i = arr.length - 1; i >= 0; i--){
                    let item= arr[i], addn= item.ci_items.length && (item.ci_items[0].amount ||0)
                    let {years, months}= moment(item.cpi.month).toObject()
                    this.mon[years]= this.mon[years] ||{};
                    if( this.mon[years].hasOwnProperty(months+1)){
                        this.mon[years][months+1]+= addn
                    }else{
                        this.mon[years][months+1]= addn
                    }
                }
                console.log("this.mon", JSON.stringify(this.mon))

                // let trend= data.slice(-18)
                let trend= data
                let xv=[], yv=[]
                trend.map(item =>{
                    xv.push(item.cpi.month)
                    yv.push( item.ci_items.length && (item.ci_items[0].amount ||0))
                })
                // this.trendChart.dataZoom[0].startValue= xv[xv.length-6]
                // this.trendChart.xAxis.data= xv
                // this.trendChart.series.data= yv
                const dest = {};
                data.map((item, index) => {
                    const money = item.ci_items.length && (item.ci_items[0].amount || 0);
                    if (index && dest[item.cpi.month]) {
                        dest[item.cpi.month] +=  money;
                    } else {
                        dest[item.cpi.month] = money;
                    }
                });   
                this.slideList = dest;
                this.dateInterval = [
                    Object.keys(dest)[0],
                    Object.keys(dest)[Object.keys(dest).length - 1]
                ];
            })
        },
        getTrend(){
            // 这是统计
            this.$axios.post("/api/feishu/xc/totalinfo2",this.stadate &&{
                start_date: this.stadate[0],
                end_date: this.stadate[1]
            }).then(data=>{
                if (data) {
                    this.sta = data
                } else {
                    this.sta = {
                        sum_month: 0,
                        p_all_income: 0,
                        dikou_total: 0,
                        huizong: []
                    }
                }
            })
        },
        geteye(cb){
            this.$axios.get("/api/feishu/xc/eye_status",).then(data=>{
                if(cb){
                    cb(data)
                }
            })
        },
        salaryClick({name}){
            this.showTrend= false;
            switch (name) {
                case 'trend':{
                    this.showTrend= true;
                    break;
                }
                case 'sta':{

                }
            }
        },
        checkPassword(hide){
            if(hide){
                this.ishide= true
            }else{
                this.geteye((stat)=>{
                    if(stat){
                        this.ishide = false
                    }else{
                        this.$msgbox.confirm( "",{
                            title: "请输入密码",
                            showInput: true,
                            closeOnClickModal: false,
                            inputPlaceholder: "请输入密码",
                            inputType: "password"
                        }).then(({value}) => {
                            this.$axios.get("/api/feishu/xc/match_password" + "?password_input=" + value).then(data => {
                                if (!data) {
                                    this.$msg({
                                        message: "系统错误",
                                        type: 'error'
                                    })
                                } else if (typeof data === 'string') {
                                    this.$msg({
                                        message: data,
                                        type: 'warning'
                                    })
                                } else {
                                    this.ishide = false
                                }
                            })
                        })
                    }
                })
            }
        },
        disabledDate(date){
            let st= this.ssd
            let d= moment(date)
            // console.log("data",data)
            return d.isBefore(moment(st), 'month') || d.isAfter(moment(), 'month');
        },
    },
}
</script>

<style scoped lang="scss">
@import "common";
.salary{
    @include block;
    h5{
        .open{
            font-size: 12px;
            color: $color-gray;
            margin-left: 4px;
            cursor: pointer;
        }
        .close{
            width: 17px;
            margin-left: 4px;
            cursor: pointer;
            margin-top: 4px;
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
            &:last-child{
                margin-bottom: 12px;
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
            &:last-child{
                margin-bottom: 12px;
            }
        }
    }
}
</style>