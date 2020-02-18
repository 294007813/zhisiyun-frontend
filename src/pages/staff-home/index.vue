<template>
<div class="staff-home">
    <template v-for="(row, r) in list">
        <template v-for="(item, i) in row">
            <li :class="'border '+ (item.long ? 'long' :(row.length==3? 'small': 'half'))">
                <base-info v-if="item.code=='base'" :conf="item"></base-info>
                <checkin v-if="item.code=='checkin'" :conf="item"></checkin>
                <salary v-if="item.code=='salary'" :conf="item"></salary>
                <g-tasks v-if="item.code=='gtasks'" :conf="item"></g-tasks>
                <birthday v-if="item.code=='birthday'" :conf="item"></birthday>
                <often v-if="item.code=='often'" :conf="item"></often>
                <msg v-if="item.code=='msg'" :conf="item"></msg>
                <perf v-if="item.code=='perf'" :conf="item"></perf>
                <idea v-if="item.code=='idea'" :conf="item"></idea>
                <train v-if="item.code=='train'" :conf="item"></train>
                <contract v-if="item.code=='contract'" :conf="item"></contract>
                <com-star v-if="item.code=='comstar'" :conf="item"></com-star>
                <skill-star v-if="item.code=='skillstar'" :conf="item"></skill-star>
                <v-calendar v-if="item.code=='calendar'" :conf="item"></v-calendar>
            </li>
        </template>
    </template>

    <!--
    <li class="border small">
        <base-info></base-info>
    </li>
    <li class="border small">
       <checkin></checkin>
    </li>
    <li class="border small">
        <salary></salary>
    </li>
    <li class="border half">
       <g-tasks></g-tasks>
    </li>
    <li class="border half">
        <birthday></birthday>
    </li>
    <li class="border long">
        <often></often>
    </li>
    <li class="border small">
        <msg></msg>
    </li>
    <li class="border small">
        <perf></perf>
    </li>
    <li class="border small">
        <idea></idea>
    </li>
    <li class="border half">
       <train></train>
    </li>
    <li class="border half">
        <contract></contract>
    </li>
    <li class="border half">
        <com-star></com-star>
    </li>
    <li class="border half">
        <skill-star></skill-star>
    </li>
    <li class="border long">
        <v-calendar></v-calendar>
    </li>
    -->
    <div class="bottom">
        <router-link to="/staff-config">
            <i class="iconfont iconshezhi"></i>首页配置
        </router-link>
    </div>
</div>
</template>

<script>
import BaseInfo from "./Base";
import Checkin from "./Checkin";
import Salary from "./Salary";
import GTasks from "./GTasks";
import Birthday from "./Birthday";
import Often from "./Often";
import Msg from "./Msg";
import Perf from "./Perf";
import Idea from "./Idea";
import Train from "./Train";
import Contract from "./Contract";
import ComStar from "./ComStar";
import SkillStar from "./SkillStar";
import VCalendar from "./Calendar";

import conf from "pa/home-config/config";
export default {
    name: "staff-home",
    components: { BaseInfo, Checkin, Salary, GTasks, Birthday, Often, Msg, Perf, Idea, Train, Contract, ComStar, SkillStar, VCalendar},
    data(){
        return{
            ismounted: false,
            list: conf.home.show
        }
    },
    mounted() {
        this.ismounted= true
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{

            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.staff-home{
    min-width: 1000px;
    min-height: 500px;
    padding: 20px 10px;
    background-color: $color-bg;
    .border{
        padding: 0 10px;
        margin-bottom: 20px;
        display: inline-block;

        &.small{
            width: 1/3*100%;
        }
        &.half{
            width: 50%;
        }
        &.long{
            width: 100%;
        }
    }
    .bottom{
        padding: 10px;
        text-align: center;
        a{
            display: inline-block;
            cursor: pointer;
            padding: 10px 24px;
            border-radius: 25px;
            background-color: white;
            font-size: 14px;
            color: $color-black;
            i{
                font-size: 13px;
                margin-right: 10px;
            }
        }
    }
}
</style>