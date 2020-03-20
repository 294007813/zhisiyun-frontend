<template>
    <div class="checkin">
        <ul class="sta" v-if="fich">
            <h5>{{$t("index.attendance_statistics_month")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/cardrecord/hr_list_v2')"></i></h5>
            <!-- <li v-if="fich.checkin">
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
            </li> -->
            <AttendanceCount :dict="fich" :viewList="attendanceArr" :attendanceStatistics="attendanceStatistics" 
                :translate="propsTranslate('wtpage')"
            />
        </ul>
        <ul class="balance" v-if="fiba">
            <h5>{{$t("index.holiday_balance")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/absence/report_emp_leave_list')"></i></h5>
            <li v-if="fiba.year"
                @click="$f.href('/admin/tm/absence/report_emp_leave_list')"
                >
                <p>{{bl.year| toFixed(2, true)}}<b>{{$t("index.hour")}}</b></p>
                <span>{{$t("index.Annualleavebalance")}}</span>
            </li>
            <li v-if="fiba.restbalance"
                @click="$f.href('/admin/tm/absence/report_emp_leave_list')"

            >
                <p>{{bl.exchange| toFixed(2, true)}}<b>{{$t("index.hour")}}</b></p>
                <span>{{$t("index.Balancevacationadjustment")}}</span>
            </li>
            <li></li>
            <li></li>
        </ul>
        <ul class="flow" v-if="fifl">
            <h5>{{$t("index.attendance_process")}}<i class="iconfont iconyoujiantou" @click="$f.href('/admin/tm/cardrecord/my_attend_report')"></i></h5>
            <li v-if="fifl.leave"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/wf_leave_of_absence/start')">{{$t("index.leaves")}}</el-button></li>
            <li v-if="fifl.overtime"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/beyond_work/start')">{{$t("index.overtime")}}</el-button></li>
            <li v-if="fifl.trip"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/work_travel/start')">{{$t("index.on_business_trip")}}</el-button></li>
            <li v-if="fifl.official"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/work_city/start')">{{$t("index.in_business")}}</el-button></li>
            <li v-if="fifl.abnormal"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/cardrecord/hr_list_v2')">{{$t("wt.abnormal_attendance")}}</el-button></li>
            <li v-if="fifl.adjust"><el-button size="small" type="primary" plain @click="$f.href('/admin/tm/wf_back_after_leave_of_absence/start?pd='+ $store.getters.userId)">{{$t("wt.adjust_holiday")}}</el-button></li>
        </ul>
    </div>
</template>

<script>

import AttendanceCount from "./components/attendanceCount";
const moment  = require("moment");

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
            attendanceArr: [],
            attendanceStatistics: {
                // 出勤
                // attendance_days: 0,
                // // 加班
                // ask_for_overtime: 0,
                // // 请假
                // leaves: 0,
                // // 迟到早退
                // late_leave: 0,
                // // 缺卡
                // miss_card: 0,
                // // 休息
                // rest: 0,
                // // 旷工
                // sign_out_change: 0,
                // // 缺勤
                // absence: 0,
                // // 外勤
                // outwork_time: 0,
                checkin: 0,
                late: 0,
                early: 0,
                earlylate: 0,
                leave: 0,
                miss: 0,
                rest: 0,
                absent: 0,
                short: 0,
                outside: 0,
                overtime: 0,
                official: 0,
                trip: 0
            },
        }
    },
    computed:{
        fich(){
            let data= this.conf.pages.checkin
            console.log("data::::", data)
            return data&& data.able && data.show && data.fields
        },
        fiba(){
            let data= this.conf.pages.balance
            return data&& data.able && data.show && data.fields
        },
        fifl(){
            let data= this.conf.pages.flow
            return data&& data.able && data.show && data.fields
        }
    },
    mounted(){
        this.attendanceArr = [
                // checkin: true, //出勤
                // late: true, //迟到
                // leave: true, //请假
                // early: true, //早退

                // rest: false, //休息
                // outside: false, //外勤
                // absent: false, //旷工

                // short: false, //缺勤
        {
            key: "checkin",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/hr_list_v2"
        },
        {
            key: "late",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/hr_list_v2"
        },
        // 请假
        {
            key: "leave",
            nuit: this.$t("mobileLang.mainPages.wt.times"),
            url: "/admin/tm/cardrecord/my_attend_report"
        },
        {
            key: "early",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/hr_list_v2"

        },
        {
            key: "absent",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/hr_list_v2"

        },
        // 缺卡
        {
            key: "miss",
            nuit: this.$t("mobileLang.mainPages.wt.times"),
            url: "/admin/tm/cardrecord/hr_list_v2"

        },
        // 缺勤
        {
            key: "short",
            nuit: this.$t("mobileLang.mainPages.wt.min"),
            url: "/admin/tm/cardrecord/my_attend_report"

        },
        {
            key: "outside",
            nuit: this.$t("mobileLang.mainPages.wt.times"),
            url: "/admin/tm/cardrecord/hr_list_v2"
        },
        {
            key: "overtime",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/my_attend_report"

        },
        // 休息
        {
            key: "rest",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/hr_list_v2"

        },
        //    trip: "出差",
        {
            key: "trip",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/my_attend_report"

        },
        // 公干
        {
            key: "official",
            nuit: this.$t("mobileLang.mainPages.wt.day"),
            url: "/admin/tm/cardrecord/my_attend_report"

        }
        ];
        this.getCardrecord();
        this.$axios.get("/api/feishu/wt/blancedata").then(data=>{
            this.bl= data;
        })
    },
    methods:{
        propsTranslate(code) {
            return function(val) {
                return this.$t(`index.${val}`);
            };
        },
        getCardrecord() {
            const url = "/admin/tm_reborn/cardrecord/get_work_result_period_feishu";
            // const url = `${api.cardrecord}`;
            this.$axios({
                url: url,
                method: "GET"
            }).then(res => {
                let lastMonthDay = "";
                if (res.from_date > moment().date()) {
                    lastMonthDay = moment(moment().format("YYYY-MM") + "-" + res.from_date)
                        .subtract(1, "months")
                        .format("YYYY-MM-DD");
                } else {
                    lastMonthDay = moment().format("YYYY-MM") + "-" + res.from_date;
                }
                const nowMonthDay = moment()
                    .subtract(1, "day")
                    .format("YYYY-MM-DD");
                this.lastMonthDay = lastMonthDay;
                this.nowMonthDay = nowMonthDay;
                this.getData(lastMonthDay, nowMonthDay);
            });
        },
        getData(lastMonthDay, nowMonthDay){
            this.$axios({
                url: "/api/feishu/wt/kqreport",
                params: {
                startdate: lastMonthDay,
                enddate: nowMonthDay
                }
            }).then(res => {
                let obj = {
                    // 出勤
                    is_full_work: 0,
                    // 缺勤
                    absentFlag: 0,
                    // // 加班
                    ask_for_overtime: 0,
                    // 迟到
                    is_come_late: 0,
                    // 早退
                    is_leave_early: 0,
                    // 旷工
                    absenteeism: 0,
                    // 上班打卡
                    no_sign_in: 0,
                    // 下班打卡
                    no_sign_out: 0,
                    // 请假
                    ask_for_leave: 0,
                    // 休息
                    is_job_day: 0,
                    // 外勤
                    waiqin: 0,
                    // 缺勤时间 min
                    short: 0
                };
                Object.keys(res).forEach(item => {
                    obj.is_full_work +=
                        res[item][0]["is_job_day"] && !res[item][0]["absenteeism"] ? 1 : 0;
                    obj.absentFlag += res[item][0]["is_full_work"] ? 0 : 1;
                    obj.ask_for_overtime += res[item][0]["ask_for_overtime"] ? 1 : 0;
                    obj.is_come_late += res[item][0]["is_come_late"] ? 1 : 0;
                    obj.is_leave_early += res[item][0]["is_leave_early"] ? 1 : 0;
                    obj.absenteeism += res[item][0]["absenteeism"] ? 1 : 0;
                    obj.no_sign_in += res[item][0]["no_sign_in"] ? 1 : 0;
                    obj.no_sign_out += res[item][0]["no_sign_out"] ? 1 : 0;
                    obj.ask_for_leave += res[item][0]["ask_for_leave"] ? 1 : 0;
                    obj.is_job_day += res[item][0]["is_job_day"] ? 0 : 1;
                    obj.waiqin += res[item][0]["waiqin"] ? 1 : 0;
                    obj.short += res[item][0]["absent_mins"]
                });
                this.dateRange = res;
                this.attendanceStatistics = {
                    checkin: obj.is_full_work,
                    // 请假
                    leave: obj.ask_for_leave,
                    early: obj.is_leave_early,
                    late: obj.is_come_late,
                    // 迟到早退
                    // earlylate: obj.is_come_late + obj.is_leave_early,
                    miss: obj.no_sign_in + obj.no_sign_out,
                    rest: obj.is_job_day,
                    absent: obj.absenteeism,
                    short: obj.short,
                    outside: obj.waiqin,
                    // 加班
                    overtime: obj.ask_for_overtime,
                    trip: 0,
                    official: 0,
                };
            });
        }
    },
    components: {
        AttendanceCount
    }
}
</script>

<style scoped lang="scss">
@import "common";
.checkin{
    @include block;
    padding: 6px 20px;
    ul{
        // padding-top: 10px;
        min-height: 1/3*100%;
        &:not(:last-child){border-bottom: 1px solid $color-border;}
        h5{
            margin-bottom: 10px;
            position: relative;
            height: 28px;
            left: 0;
            top: 10px;
            flex-basis: 100%;
            i{
                font-weight: 400;
                color: $color-gray;
                font-size: 12px;
                position: absolute;
                right: -10px;
                padding: 10px;
                cursor: pointer;
                top: 30%;
                transform: translateY(-50%);
                vertical-align: middle;
            }
        }
        >div{
            padding-bottom: 10px;
        }
    }
    /deep/.sta > div ,.balance, .flow {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        li{
            // flex: 1;
            display: inline-block;
            width: calc(25% - 20px);
            margin-left: 10px;
            margin-right: 10px;
            text-align: center;
            cursor: pointer;

            .el-button {
                width: 100%;
            }
            p{
                font-size: 16px;
                margin-bottom: 4px;
                white-space: nowrap;
                b{ font-size: 12px; margin-left: 6px}
            }
            span{ font-size: 12px}
        }
        li {
            .el-button {
                padding-left: 0;
                padding-right: 0;
                text-align: center;
                overflow: hidden;
            }
        }
        li:nth-of-type(4n) {
            margin-bottom: 10px;
        }
    }
}
</style>