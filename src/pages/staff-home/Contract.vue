<template>
<div class="contract">
    <ul :class="{to: true, single: !fibo}" v-if="fito">
        <h6>{{$t("index.contract")}}<i class="iconfont iconyoujiantou" @click="$f.href(userInfoUrl)"></i></h6>
        <li  @click="$f.href(userInfoUrl)">
            <p><b>{{da.n1}}</b>{{$t("index.numbers")}}{{$t("index.signed_contract")}}</p>
        </li>
        <li @click="$f.href(userInfoUrl)">
            <p v-show="notime"><b>{{notime}}</b></p>
            <p v-show="!notime">
                <template v-if="da.h.years"><b>{{Math.abs(da.h.years)}}</b>{{$t("index.year")}}</template>
                <template v-if="da.h.months"><b>{{Math.abs(da.h.months)}}</b>{{$t("index.month")}}</template>
                <b>{{Math.abs(da.h.days|| 0)}}</b>{{$t("index.day_timeday_time")}}
            </p>
            <span>{{$t("index.contract_still_valid")}}</span>
        </li>
    </ul>
    <ul class="bo" v-if="fibo">
        <h6>{{$t("index.agreement")}}<i class="iconfont iconyoujiantou" @click="$f.href(userInfoUrl)"></i></h6>
        <li @click="$f.href(userInfoUrl)">
            <p><b>{{da.n2}}</b>{{$t("index.numbers")}}</p>
            <span>{{$t("index.signed_agreement")}}</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Contract",
    props: ["conf"],
    data(){
        return{
            da:{
                n1: 0,
                n2: 0,
                h: {},
            },
            notime: ""
        }
    },
    computed:{
        fito(){
            let data= this.conf.pages.to
            return data&& data.able && data.show && data.fields
        },
        fibo(){
            let data= this.conf.pages.bo
            return data&& data.able && data.show && data.fields
        },
        userInfoUrl() {
            return '/admin/masterdata/people/form/' + this.$store.getters.userId + '?mode=view'
        }
    },
    mounted(){
        this.getTo()
        // this.getBo()
    },
    methods:{
        getTo(){
            require("li/moment-precise-range.js")
            let n= this.$t("index.Nofixeddeadline")
            this.$axios.get("/api/feishu/agreement/list").then(data=>{
                this.da.n1= data.newContract.length
                this.da.n2= data.newContractAgreement.length
                if(this.da.n1){
                    let arr= data.newContract, date=""
                    arr.forEach(it=>{
                        let d= it.expire_date
                        if(d){
                            date= date? (moment(d).isBefore(date)? d: date) :d
                        }
                    })
                    if(date){
                        this.da.h= moment.preciseDiff(moment().format("YYYY-MM-DD"), moment(date).format("YYYY-MM-DD"), true);
                        // let t= moment().diff(date)
                        console.log("this.da.h", this.da.h)
                        // this.da.h= moment.duration(t)._data
                        if(Math.abs(this.da.h.years)>100){
                            this.notime= n
                        }
                    }else{
                        this.notime= n
                    }
                }
            })
        },
    }
}
</script>

<style scoped lang="scss">
@import "train&contract";
.contract{
    @include style;
    
    >ul.bo li{
        width: 100%;
    }
    li {
        cursor: pointer;
    }
}
</style>