<template>
<div class="base" v-if="done">
    <img class="bg" src="~as/img/staff-home/info-bg.svg"/>
    <h1 class="name"><p>{{info.people_name}}</p><span>{{info.people_no}}</span>
        <a v-if="field.status">{{es[info.employee_status||'H']}}</a>
    </h1>
    <div class="title" v-if="field.level">{{`${info.ou_name}/${info.position_name}`}}
        <b>{{`${get_full_jobname}`}}</b>
    </div>
    <p><label>{{$t("index.constellation")}}：</label>{{info.zodiac.zodiac}}</p>
    <p><label>{{$t("index.zodiac")}}：</label>{{info.zodiac.shengxiao}}</p>
    <p><label>{{$t("index.birthday")}}：</label>{{info.zodiac.shengri}}</p>
    <p><label>{{$t("index.entry_data")}}：</label>{{start_service_date}}
        <span class="click-hand" v-if="field.sub" @click="$f.href('/admin/masterdata/people_contact/new/contacts')">{{$t("index.subordinate")}}：{{info.my_team}}{{$t("index.people")}}</span></p>
    <a v-if="field.look" @click="$f.href('/profile_user')">{{$t("index.view_files")}}<i class="iconfont iconyoujiantou"></i></a>
    <div class="head">
        <span @click="$f.href(`/admin/pm/pp_skill/${info._id}`)">
            <img class="click-hand" :src="avatar"/>
<!--            <avatar class="click-hand" :src="avatar" :sex="info.gender"></avatar>-->
        </span>
        <p v-if="field.medal" @click="openmedal">
            <i class="iconfont iconxunzhangtubiao"></i>{{info.numberOf_MEDALS}}{{$t("index.number")}}</p>
    </div>

    <el-dialog
            :title="$t('index.medal_wall')"
            :visible.sync="medalshow"
            custom-class="medalwall"
            :append-to-body="true"
            width="400px">
        <ul style="min-height: 200px" v-nodata="{have: medal.length, msg:$t('index.no_medal')}">
            <li v-for="(it, ind) in medal" :key="ind">
                <i class="tag"><span>{{$t("index.prize")}}</span></i>
                <img :src="$conf.linkUrl+it.reward_punish.rap_medal"/>
                <p>{{it.reward_punish.rap_name}}</p>
                <span>{{getdate(it.current_time)}}{{$t("index.obtain")}}</span>
            </li>
        </ul>
        <p slot="footer" class="footer">
            <el-button type="primary" size="small" @click="medalshow=false">{{$t("index.confirm")}}</el-button>
        </p>
    </el-dialog>

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
            done: false,
            medalshow: false,
            medal:[]
        }
    },
    computed:{
        start_service_date(){
            return this.info.start_service_date && this.getdate(this.info.start_service_date);
        },
        avatar(){
            return this.done && this.$f.getPic(this.info.avatar)
        },
        field(){
            return this.conf.pages.default.fields
        },
        get_full_jobname() {
            let l_name = this.info.joblevel ? this.info.joblevel.joblevel_name : ''
            let r_name = this.info.jobrank ? this.info.jobrank.jobrank_name : ''
            return  l_name + (l_name && r_name ? '-' : '')  + r_name
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/base/info").then(data=>{
                this.info= data[0]
                // this.$store.commit("setUser", data[0]);
                this.done= true
            })

        },
        openmedal(){
            if(!this.medal.length){
                this.$axios.get("/people_card",{dataLevel: "api"}).then(data=>{
                    if(data && data.rp &&data.rp.reward_punishs){
                        this.medal= data.rp.reward_punishs
                    }
                })
            }
            this.medalshow= true
        },
        getdate(date){
            return moment(date).format('YYYY-MM-DD');
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
            height: 100px;
            border: 1px solid $color-border;
            object-fit: cover;
            margin-bottom: 10px;
            background-color: white;
        }
        p{
            display: inline-block;
            padding: 0 5px;
            font-size: 12px;
            width: 50px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            border-radius: 10px;
            background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
            box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
            color: white;
            cursor: pointer;
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
    .click-hand {
        /*cursor: pointer;*/

    }

}
.medalwall ul{
    /*padding: 10px;*/
    li{
        display: inline-block;
        width: 160px;
        height: 140px;
        margin: 15px 20px;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        border-radius: 4px;
        background-color: #fafafa;
        .tag{
            display: block;
            width: 0;
            height: 0;
            border-top: 42px solid #ffb142;
            border-right: 42px solid transparent;
            position: relative;
            color: #fff;
            span{
                position: absolute;
                margin-top: -38px;
                margin-left: 6px;
            }
        }
        img{
            margin-top: -30px;
            height: 80px;
        }
        >p{
            font-size: 14px;
            line-height: 20px;
            color: #666;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        >span{
            font-size: 12px;
            color: #999;
        }
    }
}
</style>