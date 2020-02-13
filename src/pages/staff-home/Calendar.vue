<template>
<div class="calendar">
    <h5>我的日历</h5>
    <vue-cal class="vue-cal" default-view="week" locale="zh-cn"
    :events="events" :transitions="false"  resizeX show-all-day-events events-on-month-view
             :on-event-click="tagClick"
    ></vue-cal>

    <el-dialog
            :visible.sync="dishow"
            custom-class="dialog"
            width="600px">
        <p slot="title" class="title">添加事件</p>
        <div class="form">
            <el-checkbox label="备选项1" border size="mini">私人</el-checkbox>
            <el-checkbox label="备选项2" border size="mini">完成</el-checkbox>
            <h2>由我1天前创建</h2>
            <h1>测试</h1>
            <el-form ref="form" :model="form" label-width="80px" size="mini">
                <el-form-item label="事件名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="添加详情">
                    <el-input v-model="form.name" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="添加地点">
                    <el-input v-model="form.name" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="事件时间">
                    <el-switch
                            v-model="form.allDay"
                            active-color="#13ce66"
                            active-text="全天"
                            inactive-color="#ff4949">
                    </el-switch>
                    <div>
                        <el-date-picker
                                v-model="form.start"
                                type="datetime"
                                placeholder="开始时间"
                                default-time="12:00:00">
                        </el-date-picker>
                        <el-date-picker
                                v-model="form.end"
                                type="datetime"
                                placeholder="结束时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </div>

                </el-form-item>
                <el-form-item label="提醒时间">
                    <el-switch
                            v-model="form.remind"
                            active-color="#13ce66"
                            inactive-color="#409eff"
                            :active-text="form.remind? '自定义': '相对时间'">
                    </el-switch>
                    <div>
                        <el-select placeholder="请选择" size="mini"
                                   v-show="!form.remind" v-model="form.remindR"  clearable >
                            <el-option label="提前5分钟" value="m5"></el-option>
                            <el-option label="提前15分钟" value="m15"></el-option>
                            <el-option label="提前30分钟" value="m30"></el-option>
                        </el-select>
                        <el-date-picker
                                v-show="form.remind"
                                v-model="form.end"
                                type="datetime"
                                placeholder="提醒时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="共享对象">

                </el-form-item>
                <el-form-item label="添加附件">

                </el-form-item>
                <el-form-item label="添加备注">
                    <el-input v-model="form.name" type="textarea"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <p slot="footer" class="footer">
            <el-button plain size="small">取消</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">保存</el-button>
        </p>

    </el-dialog>

    <staff-select :visible="true"></staff-select>
</div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/zh-cn.js'
import StaffSelect from "co/staff-select"
export default {
    name: "Calendar",
    components: {VueCal, StaffSelect},
    data(){
        return{
            events: [
                {
                    start: '2020-2-12',
                    end: '2020-2-12',
                    title: '春节',
                    class: 'leisure',
                    allDay: true,

                },
                {
                    start: '2020-2-12',
                    end: '2018-2-12',
                    title: 'Golf with John',
                    content: '<i class="v-icon material-icons">golf_course</i>',
                    class: 'sport',
                    allDay: true
                },
                {
                    start: '2020-2-12 T00:00:00.000Z',
                    end: '2020-2-12 T00:00:00.000Z',
                    title: 'Dad\'s birthday!',
                    content: '<i class="v-icon material-icons">cake</i>',
                    class: 'sport',
                    resizable: true
                }
            ],
            dishow: true,
            checkboxGroup2: [],
            form:{
                remind: false,
                remindR: ""
            },

        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/calendar/list").then(data=>{
                // console.log("data", data)
                data.map(item=>{
                    let tag={
                        start: this.time(item.start),
                        end: this.time(item.end),
                        title: item.title,
                        class: 'event',
                        people: item.people,
                        forward_people: item.forward_people,
                        forward_people_msg: item.forward_people_msg,
                    }
                    this.events.push(tag)
                })
            })
            this.$axios.get("/api/feishu/calendar/get_holiday_day").then(data=>{
                data.map(item=>{
                    this.events.push({
                        start: this.time(item.date, "YYYY-MM-DD"),
                        end: this.time(item.date, "YYYY-MM-DD"),
                        // start: this.$fun.moment("2020-2-13").format("YYYY-MM-DD"),
                        // end: this.$fun.moment("2020-2-13").format("YYYY-MM-DD") ,
                        title: item.holiday_name,
                        class: 'holiday',
                        allDay: true
                    })
                })
            })
        },
        time(val, format){
            return this.$fun.moment(val).format(format || "YYYY-MM-DD HH:MM")
        },
        tagClick(data, e){
            if(data.class=="event"){

            }

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
    /deep/ .vue-cal{
        height: 100%;
        font-size: 14px;
        .vuecal__all-day {
            padding-right: 15px;
        }
    }

    .dialog{
        .form{
            padding: 20px;

        }
    }
}
/deep/ .el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
    width: 3px;
    height: 6px;
}
.el-scrollbar__wrap--hidden-default::-webkit-scrollbar-track{
    width: 3px!important;
}
</style>