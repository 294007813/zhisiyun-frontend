<template>
<div class="staff-home">
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
export default {
    name: "staff-home",
    components: { BaseInfo, Checkin, Salary, GTasks, Birthday, Often, Msg, Perf, Idea, Train, Contract, ComStar, SkillStar, VCalendar},
    data(){
        return{
            ismounted: false,
        }
    },
    mounted() {
        this.ismounted= true
    },
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
}
.staff-home .border{

}
</style>