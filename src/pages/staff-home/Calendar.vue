<template>
<div class="calendar">
    <h5>{{$t("index.me_calendar")}}</h5>
    <el-tooltip class="work-calendar" effect="dark" content="工作日历" placement="top-start">
        <i class="fa fa-mail-forward" @click="$f.href('/admin/pm/work_plan/bbform')"></i>
    </el-tooltip>
    <vue-cal class="vue-cal" locale="zh-cn" ref="vcal"
             resize-x show-all-day-events events-on-month-view  today-button hide-view-selector
             :events="events" :transitions="false" :cell-click-hold="true" :editable-events="false"
             :on-event-click="tagClick" @cell-click="create">
<!--        <template v-slot:events-count="{ events, view }">-->

<!--        </template>-->
        <template v-slot:title="{ title, view }">
            <div class="title">
                <span v-show="view.id === 'month'">{{ view.startDate.format('YYYY年MM月') }}</span>
                <span v-show="view.id === 'week'">{{getWeek(view)}}</span>
                <span v-show="view.id === 'day'">{{ view.startDate.format('YYYY年MM月DD日') }}</span>
            </div>
            <div class="switch">
                <p :class="view.id === 'month'&&'on'" @click="switchCal($event, 'month')">{{$t("index.month")}}</p>
                <p :class="view.id === 'week'&&'on'" @click="switchCal($event, 'week')">{{$t("index.week")}}</p>
                <p :class="view.id === 'day'&&'on'" @click="switchCal($event, 'day')">{{$t("index.day")}}</p>
            </div>
        </template>
        <i slot="arrow-prev" class="fa fa-chevron-left"></i>
        <div slot="today-button" class="today">{{showNow}}</div>
        <i slot="arrow-next" class="fa fa-chevron-right"></i>

        <template v-slot:weekday-heading="{heading, view}">
            {{heading.label}}
            <span style="margin-left: 6px" v-show="view.id === 'week'">{{weekdayHeading(heading)}}</span>
        </template>

    </vue-cal>

    <el-dialog
            :visible.sync="dishow"
            custom-class="dialog"
            width="600px">
        <p slot="title" class="title">{{form._id ?'修改' :'添加'}}{{$t("index.event")}}</p>
        <div class="content">
            <div :class="['check-tag pri',{on: form.is_private}]" @click="form.is_private=!form.is_private"
            ><i class="fa fa-check-circle"></i>{{$t("index.private")}}</div>
            <div :class="['check-tag com',{on: form.is_complete}]" @click="form.is_complete=!form.is_complete"
            ><i class="fa fa-check-circle"></i>{{$t("index.complete")}}</div>
            <h2 v-if="form._id">{{subtitle}}</h2>

            <el-form ref="form" :model="form" label-width="80px" size="mini" class="form">
                <el-form-item label="事件名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="添加详情">
                    <el-input v-model="form.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="添加地点">
                    <el-input v-model="form.location" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="事件时间">
                    <el-switch
                            @change="changeallday"
                            v-model="form.allDay"
                            active-color="#13ce66"
                            inactive-color="#409eff"
                            :active-text="form.allDay? '全天' :'自定义'">
                    </el-switch>
                    <div>
                        <el-date-picker
                                @blur="changetime(true, $event)"
                                v-model="form.start"
                                type="datetime"
                                placeholder="开始时间"
                                default-time="12:00:00">
                        </el-date-picker>
                        <el-date-picker
                                @blur="changetime(false, $event)"
                                :picker-options="{disabledDate }"
                                v-model="form.end"
                                type="datetime"
                                placeholder="结束时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </div>

                </el-form-item>
                <el-form-item label="提醒时间">
                    <el-switch
                            v-model="form.alarm_date_type"
                            active-value="A"
                            inactive-value="R"
                            active-color="#13ce66"
                            inactive-color="#409eff"
                            :active-text="form.alarm_date_type=='R'? '自定义': '相对时间'">
                    </el-switch>
                    <div>
                        <el-select placeholder="请选择" size="mini"
                                   v-show="form.alarm_date_type=='A'" v-model="form.alarm_date_offset" clearable>
                            <el-option label="不提醒" :value="0"></el-option>
                            <el-option label="提前5分钟" :value="-5"></el-option>
                            <el-option label="提前15分钟" :value="-15"></el-option>
                            <el-option label="提前30分钟" :value="-30"></el-option>
                            <el-option label="提前1小时" :value="-60"></el-option>
                            <el-option label="提前2小时" :value="-120"></el-option>
                            <el-option label="提前1天" :value="-1440"></el-option>
                            <el-option label="提前2天" :value="-2880"></el-option>
                            <el-option label="提前1星期" :value="-10080"></el-option>
                        </el-select>
                        <el-date-picker
                                v-show="form.alarm_date_type=='R'"
                                v-model="form.alarm_date_absolute"
                                type="datetime"
                                placeholder="提醒时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="共享对象">
                    <el-button type="primary" size="mini" @click="staffshow= true">{{$t("index.select")}}</el-button>
                    <li v-for="(item, i) in forward_people_new" :key="i">
                        <span>{{item.name}}</span>
                        <i class="el-icon-error" @click="forward_people_new.splice(i,1)"></i>
                    </li>
                    <el-input v-show="forward_people_new.length" v-model="form.forward_summary"
                              placeholder="共享消息" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="添加附件">
                    <el-button type="primary" size="mini" @click="upfile">{{$t("index.select")}}</el-button>
                    <li v-for="(item, i) in form.attachments" :key="i">
                        <span>{{item.filename}}</span> <i class="el-icon-delete-solid" @click="dfile(i)"></i>
                    </li>
                </el-form-item>
                <el-form-item label="添加备注">
                    <el-input v-model="form.comments" type="textarea"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <p slot="footer" class="footer">
            <el-button plain size="small" @click="dishow= false">{{$t("index.cancel")}}</el-button>
            <el-button type="danger" size="small" v-show="!!form._id && isMine" @click="del(true)">{{$t("index.refuse")}}</el-button>
            <el-button type="danger" size="small" v-show="!!form._id && !isMine" @click="del(false)">{{$t("index.delete")}}</el-button>
            <el-button type="primary" size="small" @click="save">{{$t("index.save")}}</el-button>
        </p>
    </el-dialog>

    <staff-select v-if="staffMount" :visible="staffshow" @close="staffshow= false" @ok="getShare"></staff-select>
</div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/zh-cn.js'
import StaffSelect from "co/staff-select"
let form= JSON.stringify({
    title: "",
    startEditable: true,
    durationEditable: true,
    is_complete: false,
    is_private: false,
    allDay: false,
    start: null,
    end: null,
    alarm_date_type: "R",
    alarm_date_absolute: null,
    alarm_date_offset: null,
    forward_people_new: [],
    forward_summary: "",
    attachments:[],
    comments: "",
})
export default {
    name: "Calendar",
    components: {VueCal, StaffSelect},
    data(){
        return{
            events: [],
            dishow: false,
            form: JSON.parse(form),
            staffshow: false,
            forward_people_new:[],
            staffMount: false,
            mounted: false
        }
    },
    computed:{
        nowView(){
            return this.mounted && this.$refs.vcal.view.id
        },
        showNow(){
            let now=""
            switch (this.nowView) {
                case "week":{
                    now= this.$t("index.this_week")
                    break
                }
                case "day":{
                    now= this.$t("index.today")
                    break
                }
                default:{
                    now= this.$t("index.this_month")
                }
            }
            return now
        },
        isMine(){
            return this.form && this.form.creator && this.form.creator._id== this.$store.getters.userId
        },
        subtitle(){
            let msg="", da= this.form
            if(this.isMine){
                msg= `由${da.creator.people_name} ${this.$f.getRelativeDate(da.createDate)}前创建`
            }else{
                msg= `受到${da.creator.people_name}/${da.creator.position_name} ${this.$f.getRelativeDate(da.createDate)}前邀请`
            }

        }
    },
    mounted(){
        this.mounted= true
        this.getData()
        setTimeout(()=>{
            this.staffMount= true
        },1000)
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/calendar/list").then(data=>{
                // console.log("data", data)
                    data.map(item=>{
                        this.pushEvent(item)
                    })

            })
            this.$axios.get("/api/feishu/calendar/get_holiday_day").then(data=>{
                if(data)
                data.map(item=>{
                    this.events.push({
                        start: this.time(item.date, "YYYY-MM-DD"),
                        end: this.time(item.date, "YYYY-MM-DD"),
                        // start: moment("2020-2-13").format("YYYY-MM-DD"),
                        // end: moment("2020-2-13").format("YYYY-MM-DD") ,
                        title: item.holiday_name,
                        class: 'holiday orange',
                        allDay: true,
                        deletable: false,
                    })
                })
            })
        },
        pushEvent(item){
            let color="", st= moment(item.start), et= moment(item.end)
            if(item.is_complete){
                color= "green"
            }else{
                if(moment().isBefore(st)){
                    color= "blue"
                }else if(moment().isAfter(et)){
                    color= "red"
                }else{
                    color= "blue"
                }
            }
            let tag={
                class: `event ${color}`,
                deletable: false,
                ...item,
                start: this.time(item.start),
                end: this.time(item.end),
                // title: item.title,
                // people: item.people,
                // forward_people: item.forward_people,
                // forward_people_msg: item.forward_people_msg,
            }
            this.events.push(tag)
        },
        switchCal(e, type){
            this.$refs.vcal.switchView(type)
            // console.log("switchCal")
            e.stopPropagation()
        },
        create(date, a, b, c){
            // console.log("create(date)", date, a, b, c)
            let view= this.$refs.vcal.view.id
            let time= date.date|| date
            if(view.indexOf("year")<0){
                this.form= JSON.parse(form)
                this.form.start=  this.time(time)
                this.form.end= this.time(moment(time).add(30, 'minutes'))
                if(this.nowView=='month'|| date.date){
                    this.form.allDay= true
                    this.changeallday(true)
                }
                this.dishow= true
            }
            this.forward_people_new=[]
        },
        getWeek(view){

            let {startDate, endDate}= view
            let s= moment(startDate)
            let e= moment(endDate)
            let ss="", se="", et="DD日"
            // console.log(s)
            ss= s.format('YYYY年MM月DD日')
            if(s.toObject().years==e.toObject().years){
                if(s.toObject().months==e.toObject().months){
                    se= e.format(et)
                }else{
                    se= e.format("MM月"+et)
                }
            }else{
                se= e.format("YYYY年MM月DD日"+et)
            }
            return ss+"～"+se
        },
        changeallday(status){
            if(status){
                this.form.start= this.time(this.form.start, "YYYY-MM-DD 00:00:00")
                this.form.end= this.time(this.form.end, "YYYY-MM-DD 23:59:59")
            }
        },
        tagClick(data, e){
            // console.log(data, e)
            if(data.class.includes("event")){
                this.form= JSON.parse(JSON.stringify(data))
                this.dishow= true
            }
            this.forward_people_new=[]
            e.stopPropagation()
        },
        changetime(flag, vn){
            let val= vn.displayValue
            let time= moment( val)
            let allday= true
            let least= null
            let st= moment(this.form.start)
            let et= moment(this.form.end)
            if(this.form.allDay){
                if(flag){
                    this.form.start= val
                    if(time.hour()!=0 || time.minute()!=0 ||time.second()!=0){
                        allday= false
                    }
                }else{
                    this.form.end= val
                    if(time.hour()!=23 || time.minute()!=59 ||time.second()!=59){
                        allday= false
                    }
                }
                this.form.allDay= allday
            }
            if(flag){
                least= time.add(30, 'm')
                if(et.isBefore(least)){
                    this.form.end= this.time(least)
                }
            }else{
                // least= st.add(30, 'm')
                if(time.isBefore(st)){
                    this.form.end= this.form.start
                }
            }
        },
        getShare(arr){
            this.forward_people_new= arr.map(it=>{
                return {name: it.name, id: it.id}
            })
        },
        upfile(){
            this.$f.upfile((res)=>{
                // console.log(res)
                this.form.attachments= this.form.attachments.concat(res.success)
            })
        },
        dfile(i){
            this.form.attachments.splice(i,1)
        },
        save(){
            let method='post', url= '/api/feishu/calendar/create', msg= "创建"
            if(this.form._id){
                method= 'put'
                url= '/api/feishu/calendar/update/:wp_id'+ this.form._id
                msg= "修改"
            }
            let param= {data: this.form}
            param.forward_people_new= this.forward_people_new.map(it=>{
                return it.id
            })
            this.$axios[method]( url, param).then(data=>{
                this.dishow= false
                this.$msg({message:msg+"成功", type: "success"})
                if(!this.form._id) this.pushEvent(data)
            })
        },
        del(refuse){
            let url= "/api/feishu/calendar/delete/", msg= "删除", id= this.form._id
            if(refuse){
                url= "/admin/pm/work_plan/bb/"
                msg= "拒绝"
            }
            this.$axios.delete(url+ id).then(data=>{
                this.dishow= false
                this.$msg({message:msg+"成功", type: "success"})
                // this.events= []
                // this.getData()
                this.delevent(id)
            })
        },
        delevent(id){
            for(let i in this.events){
                if(this.events[i]._id== id){
                    this.events.splice( i, 1)
                    break;
                }
            }

        },
        time(val, format){
            return moment(val).format(format || "YYYY-MM-DD HH:mm:ss")
        },
        weekdayHeading(val){
            return moment(val.date).format("M/D")
        },
        disabledDate(date){
            let st= moment(this.form.start)
            let d= moment(date)
            // console.log("data",data)
            return d.isBefore(st, "day");
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.calendar{
    @include block;
    /*height: auto;*/
    height: 400px;
    .dialog{
        .content{
            padding: 10px 20px;
            max-height: 500px;
            overflow: auto;
            h2{
                margin-top: 10px;
                color: $color-gray;
                font-size: 14px;
            }
            .check-tag{
                display: inline-block;
                line-height: 24px;
                font-size: 12px;
                padding: 0 10px;
                margin-right: 10px;
                border: 1px solid ;
                border-color: $color-line-light;
                color: $color-gray;
                cursor: pointer;
                i{
                    font-size: 15px;
                    margin-right: 4px;
                    vertical-align: middle;
                }
                &.pri.on{
                    color: red;
                    border-color: red;
                }
                &.com.on{
                    color: #13ce66;
                    border-color: #13ce66;
                }
            }
            .form{
                margin-top: 10px;
            }
            .el-icon-error, .el-icon-delete-solid{
                font-size: 16px;
                color: $color-red;
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
    .work-calendar{
        position: absolute;
        top: 12px;
        right: 10px;
        z-index: 1;
        cursor: pointer;
        i{
            color: $color-gray-dark;

        }
    }

    /deep/ .vue-cal{
        height: 100%;
        font-size: 14px;
        .vuecal__title-bar{
            background-color: white;
            height: 40px;
            position: relative;
            border-bottom: 1px solid $color-border;
            .vuecal__flex.vuecal__title{position: initial}
            .title{
                position: absolute;
                left: 100px;
                top: 50%;
                transform: translateY(-50%);
                span{
                    display: block;
                }
            }
            .switch{
                position: absolute;
                right: 120px;
                top: 50%;
                transform: translateY(-50%);
                p{
                    font-size: 14px;
                    display: inline-block;
                    border-bottom: 2px solid transparent;
                    padding: 4px 14px;
                    cursor: pointer;
                    &.on{
                        color: $color-primary;
                        border-color: $color-primary;
                    }
                }
            }
        }
        .vuecal__arrow--prev{
            position: absolute;
            right: 87px;
            padding: 0 4px;
            top: 13px;
        }
        .vuecal__today-btn{
            position: absolute;
            right: 54px;
            padding: 0 4px;
            cursor: pointer;
            .today{font-size: 14px}
        }
        .vuecal__arrow--next{
            position: absolute;
            right: 34px;
            padding: 0 4px;
            top: 13px;
        }
        .vuecal__arrow{
            i{
                color: $color-gray-dark;
                font-size: 12px;
            }
        }
        .event{
            cursor: pointer;
            opacity: .8;
            &.red{
                background-color: #f5babc;
                border: 1px solid #f4a4a6;
            }
            &.green{
                background-color: #d5faf2;
                border: 1px solid transparent;
            }
            &.orange{
                background-color: orange;
            }
            &.blue{
                background-color: #7acfff;
            }
        }
        &.vuecal--events-on-month-view{
            .vuecal__all-day{
                padding-right: 15px;
            }
        }

        .vuecal__event-title--edit, .vuecal__event-title--edit:focus, .vuecal__event-title--edit:hover{
            border: 0;
            background: none;
            pointer-events: none;
        }
    }
}



</style>