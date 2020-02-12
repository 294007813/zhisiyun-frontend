<template>
<div class="calendar">
    <h5>我的日历</h5>
    <vue-cal class="vue-cal" default-view="week" locale="zh-cn"
    :events="events" :transitions="false"  resizeX show-all-day-events events-on-month-view
    ></vue-cal>
</div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/zh-cn.js'
export default {
    name: "Calendar",
    components: {VueCal},
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
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/calendar/list").then(data=>{
                console.log("data", data)
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
}
</style>