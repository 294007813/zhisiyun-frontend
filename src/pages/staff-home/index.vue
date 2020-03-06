<template>
<div class="staff-home">
    <template v-for="(row, r) in list">
        <template v-for="(item, i) in row">
            <li :class="'border '+ (item.long ? 'long' :(row.length==3? 'small': 'half'))">
<!--                <base-info v-if="item.code=='base'" :conf="item"></base-info>-->
<!--                <checkin v-if="item.code=='TM'" :conf="item"></checkin>-->
<!--                <salary v-if="item.code=='PY'" :conf="item"></salary>-->
<!--                <g-tasks v-if="item.code=='gtasks'" :conf="item"></g-tasks>-->
<!--                <birthday v-if="item.code=='birthday'" :conf="item"></birthday>-->
<!--                <often v-if="item.code=='often'" :conf="item"></often>-->
<!--                <msg v-if="item.code=='msg'" :conf="item"></msg>-->
                <perf v-if="item.code=='PM'" :conf="item"></perf>
<!--                <idea v-if="item.code=='ADM'" :conf="item"></idea>-->
<!--                <train v-if="item.code=='TR'" :conf="item"></train>-->
<!--                <contract v-if="item.code=='PA'" :conf="item"></contract>-->
<!--                <com-star v-if="item.code=='comstar'" :conf="item"></com-star>-->
<!--                <skill-star v-if="item.code=='TA'" :conf="item"></skill-star>-->
<!--                <v-calendar v-if="item.code=='calendar'" :conf="item"></v-calendar>-->
            </li>
        </template>
        <div></div>
    </template>

    <div class="bottom">
        <router-link to="/staff-config">
            <i class="iconfont iconshezhi"></i>{{$t("index.page_config")}}
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

import conf from "pa/home-config/config/config-pc";
export default {
    name: "staff-home",
    components: { BaseInfo, Checkin, Salary, GTasks, Birthday, Often, Msg, Perf, Idea, Train, Contract, ComStar, SkillStar, VCalendar},
    data(){
        return{
            ismounted: false,
            // list: conf.home.show,
            list: [],
        }
    },
    mounted() {
        this.ismounted= true
        this.getData()
    },
    methods:{
        getData(){
            let load= this.$loading({ fullscreen: true })
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{
                this.list= data.conf.home.show
                load.close()
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