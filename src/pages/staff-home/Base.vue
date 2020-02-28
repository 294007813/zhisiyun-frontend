<template>
<div class="base" v-if="done">
    <img class="bg" src="~as/img/staff-home/info-bg.svg"/>
    <h1 class="name"><p>{{info.people_name}}</p><span>{{info.people_no}}</span>
        <a v-if="field.status">{{es[info.employee_status||'H']}}</a>
    </h1>
    <div class="title" v-if="field.level">{{`${info.ou_name}/${info.position_name}`}}
        <b>{{`${info.joblevel.joblevel_name}-${info.jobrank.jobrank_name}`}}</b>
    </div>
    <p><label>{{$t("index.constellation")}}：</label>{{info.zodiac.zodiac}}</p>
    <p><label>{{$t("index.zodiac")}}：</label>{{info.zodiac.shengxiao}}</p>
    <p><label>{{$t("index.birthday")}}：</label>{{info.zodiac.shengri}}</p>
    <p><label>{{$t("index.entry_data")}}：</label>{{start_service_date}} <span v-if="field.sub">{{$t("index.subordinate")}}：{{info.my_team}}{{$t("index.people")}}</span></p>
    <a v-if="field.look">{{$t("index.view_files")}}<i class="iconfont iconyoujiantou"></i></a>
    <div class="head">
<!--        <img :src="avatar"/>-->
        <avatar :src="avatar" :sex="info.gender"></avatar>
        <p v-if="field.medal"><i class="iconfont iconxunzhangtubiao"></i>{{info.numberOf_MEDALS}}{{$t("index.number")}}</p>
    </div>
</div>
</template>

<script>
let es={
    'H':'正式',
    'P':'试用期',
    'R':'已离职',
    'L':'停薪留职',
    'S':'供应链成员',
}
export default {
    name: "Base",
    props: ["conf"],
    data(){
        return{
            info: {

            },
            es,
            done: false
        }
    },
    computed:{
        start_service_date(){
            return this.info.start_service_date && moment(this.info.start_service_date).format('YYYY-MM-DD');
        },
        avatar(){
            return this.done && this.$f.getPic(this.info.avatar)
        },
        field(){
            return this.conf.pages.default.fields
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/base/info").then(data=>{
                this.info= data[0]
                this.done= true
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.base{
    @include block;
    padding: 36px;
    >*{position: relative}
    .bg{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
    .name{
        vertical-align: middle;
        margin: 16px 0;
        *{display: inline-block; vertical-align: middle;}
        p{
            font-weight: 600;
            font-size: 24px;
        }
        span{
            display: inline-block;
            padding: 0 10px;
            font-size: 12px;
        }
        a{
            font-size: 12px;
            color: white;
            background-color: #3075F1;
            line-height: 20px;
            padding: 0 10px;
            border-radius: 2px;
        }
    }
    .title{
        font-size: 14px;
        margin-bottom: 10px;
        b{
            margin-left: 10px;
            font-weight: 400;
            font-size: 12px;
            color: $color-gray-dark;
        }
    }
    >p{
        font-size: 14px;
        position: relative;
        margin-bottom: 10px;
        label{color: $color-gray;}
        span{
            display: inline-block;
            font-size: 12px;
            line-height: 28px;
            padding: 0 10px;
            color: $color-primary;
            border: 1px solid $color-primary;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 20px;
        }
    }
    .head{
        position: absolute;
        top: 40px;
        right: 40px;
        width: 100px;
        overflow: hidden;
        text-align: center;
        img{
            border-radius: 100%;
            overflow: hidden;
            width: 100%;
            height: auto;
            border: 1px solid $color-border;
            object-fit: cover;
            margin-bottom: 10px;
        }
        p{
            display: inline-block;
            font-size: 12px;
            width: 50px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            border-radius: 10px;
            background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
            box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
            color: white;
            i{
                font-size: 10px;
                margin-right: 4px;
            }
        }
    }
    >a{
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        margin-top: 10px;
        color: $color-gray;
        i{
            font-size: 12px;
        }
    }
}
</style>