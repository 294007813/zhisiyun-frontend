<template>
<div class="staff-home">
    <template v-for="(row, r) in list">
        <template v-for="(item, i) in row">
            <li :class="'border '+ (item.long ? 'long' :(row.length==3? 'small': 'half'))">
<!--                <base-info v-if="item.name=='basic_information_module'" :conf="item"></base-info>-->
<!--                <checkin v-if="item.name=='attendance_information_module'" :conf="item"></checkin>-->
<!--                <salary v-if="item.name=='salary_information_module'" :conf="item"></salary>-->
<!--                <g-tasks v-if="item.name=='to_do_module'" :conf="item"></g-tasks>-->
<!--                <birthday v-if="item.name=='birthday_blessing_module'" :conf="item"></birthday>-->
<!--                <often v-if="item.name=='common_application_module'" :conf="item"></often>-->
<!--                <msg v-if="item.name=='message_dynamic_module'" :conf="item"></msg>-->
<!--                <perf v-if="item.name=='performance_information_module'" :conf="item"></perf>-->
<!--                <idea v-if="item.name=='suggestion_box_module'" :conf="item"></idea>-->
<!--                <train v-if="item.name=='training_process_module'" :conf="item"></train>-->
<!--                <contract v-if="item.name=='contract_agreement_module'" :conf="item"></contract>-->
<!--                <com-star v-if="item.name=='company_star_module'" :conf="item"></com-star>-->
<!--                <skill-star v-if="item.name=='skill_star_module'" :conf="item"></skill-star>-->
                <v-calendar v-if="item.name=='me_calendar_module'" :conf="item"></v-calendar>
            </li>
        </template>
        <div></div>
    </template>

    <div class="bottom">
        <a @click="$f.href('/index_page_new_people')">
            <i class="iconfont iconshezhi"></i>{{$t("index.page_config")}}
        </a>
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
            contract_modules:[]
        }
    },
    mounted() {
        this.ismounted= true
        this.getData()
    },
    methods:{
        getData(){
            let load= this.$loading({ fullscreen: true })
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people",{
                params:{
                    flag: "PC",
                    tp: new Date().getTime(),
                }
            }).then(data=>{  
                this.contract_modules = data.modules.contract_modules
                let testdata = this.contract_process(data.conf.home.show, data.modules.contract_modules)
                 console.log('list:', testdata)
                this.list = testdata  // data.conf.home.show
               
                load.close()
            })
        },

        contract_process(listData,contract_modules){
            let result = []
            for(let i=0;i<listData.length;i++){
                let v=listData[i], tmparr = []
                for(let j=0;j<v.length;j++){
                    if(contract_modules[v[j].code] ===false){
                        console.log(' ==模块无权限:', v[j].code)
                        //delete v[j]
                    } else {
                        tmparr.push(v[j])
                    }
                }
                if(tmparr.length) result.push(tmparr)
            }
            console.log(result)
            return result
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
        vertical-align: top;
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