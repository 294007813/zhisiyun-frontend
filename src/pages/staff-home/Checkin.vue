<template>
    <div class="checkin">
        <ul class="sta" v-if="fich">
            <h5>{{$t("index.attendance_statistics_month")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/cardrecord/hr_list_v2')"></i></h5>
            <li v-if="fich.checkin">
                <p>{{kq.cq}}<b>{{$t("index.day")}}</b></p>
                <span>{{$t("index.attendance_days")}}</span>
            </li>
            <li v-if="fich.leave">
                <p>{{kq.qj}}<b>{{$t("index.day")}}</b></p>
                <span>{{$t("index.leaves")}}</span>
            </li>
            <li v-if="fich.late">
                <p>{{kq.cd}}<b>{{$t("index.nums")}}</b></p>
                <span>{{$t("index.late_leave")}}</span>
            </li>
            <li v-if="fich.miss">
                <p>{{kq.qk}}<b>{{$t("index.nums")}}</b></p>
                <span>{{$t("index.absence")}}</span>
            </li>
        </ul>
        <ul class="balance" v-if="fiba">
            <h5>{{$t("index.holiday_balance")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/absence/report_emp_leave_list')"></i></h5>
            <li v-if="fiba.year">
                <p>{{bl.year}}<b>{{$t("index.hour")}}</b></p>
                <span>{{$t("index.Annualleavebalance")}}</span>
            </li>
            <li v-if="fiba.rest">
                <p>{{bl.exchange}}<b>{{$t("index.hour")}}</b></p>
                <span>{{$t("index.Balancevacationadjustment")}}</span>
            </li>
        </ul>
        <ul class="flow" v-if="fifl">
            <h5>{{$t("index.attendance_process")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/cardrecord/my_attend_report')"></i></h5>
            <li v-if="fifl.leave"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/wf_leave_of_absence/start')">{{$t("index.leaves")}}</el-button></li>
            <li v-if="fifl.overtime"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/beyond_work/start')">{{$t("index.overtime")}}</el-button></li>
            <li v-if="fifl.trip"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/work_travel/start')">{{$t("index.on_business_trip")}}</el-button></li>
            <li v-if="fifl.official"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/work_city/start')">{{$t("index.in_business")}}</el-button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Checkin",
    props: ["conf"],
    data(){
        return {
            kq: {
                //出勤
                cq: 0,
                //请假
                qj: 0,
                //迟到早退
                cd: 0,
                //缺卡
                qk: 0,
            },
            bl: {},
        }
    },
    computed:{
        fich(){
            let data= this.conf.pages.checkin
            return data.able && data.show && data.fields
        },
        fiba(){
            let data= this.conf.pages.balance
            return data.able && data.show && data.fields
        },
        fifl(){
            let data= this.conf.pages.flow
            return data.able && data.show && data.fields
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            // let mo= moment()
            this.$axios.get("/api/feishu/wt/kqreport", {params:{
                    // startdate: mo.format('YYYY-MM-01'),
                    // enddate: mo.format('YYYY-MM-DD'),
                    startdate: '2019-12-01',
                    enddate: '2019-12-20',
            }}).then(data=>{
                for(let key in data){
                    let item= data[key][0]
                    item.is_job_day && !item.absenteeism && this.kq.cq++
                    item.ask_for_leave && this.kq.qj++
                    item.is_job_day && (item.is_come_late || item.is_leave_early) && this.kq.cd++
                    item.is_job_day && (item.no_sign_in || item.no_sign_out) && this.kq.qk++

                }
            })
            this.$axios.get("/api/feishu/wt/blancedata").then(data=>{
                this.bl= data
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.checkin{
    @include block;
    padding: 6px 20px;
    ul{
        padding-top: 10px;
        height: 1/3*100%;
        &:not(:last-child){border-bottom: 1px solid $color-border;}
        h5{
            margin-bottom: 14px;
            position: relative;
            left: 0;
            top: 0;
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
</style>