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

</div>
</template>

<script>
import BaseInfo from "./Base";
import Checkin from "./Checkin";
import Salary from "./Salary";
import GTasks from "./GTasks";
import Birthday from "./Birthday";
export default {
    name: "staff-home",
    components: { BaseInfo, Checkin, Salary, GTasks, Birthday},
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
        /deep/ >div{
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

    }
}
.staff-home .border{

}
</style>