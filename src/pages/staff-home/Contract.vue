<template>
<div class="contract">
    <ul class="to" v-if="fito">
        <h6>{{$t("index.contract")}}<i class="iconfont iconyoujiantou" @click="$f.href(userInfoUrl)"></i></h6>
        <li  @click="$f.href(userInfoUrl)">
            <p><b>{{da.n1}}</b>{{$t("index.numbers")}}</p>
            <span>{{$t("index.signed_contract")}}</span>
        </li>
        <li @click="$f.href(userInfoUrl)">
            <p><b>{{da.h.years || ''}}</b>{{da.h.years ? $t("index.year") : ''}}<b>{{da.h.months||''}}</b>{{da.h.months ? $t("index.month") : ''}}<b>{{da.h.days||"0"}}</b>{{$t("index.day_time")}}</p>
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
            }
        }
    },
    computed:{
        fito(){
            let data= this.conf.pages.to
            return data.able && data.show && data.fields
        },
        fibo(){
            let data= this.conf.pages.bo
            return data.able && data.show && data.fields
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
            this.$axios.get("/api/feishu/agreement/list").then(data=>{
                this.da.n1= data.newContract.length
                this.da.n2= data.newContractAgreement.length
                if(this.da.n1){
                    let arr= data.newContract, date=""
                    arr.forEach(it=>{
                        date= date? (moment(it.effective_date).isBefore(date)? it.effective_date: date) :it.effective_date
                    })
                    let t= moment().diff(date)
                    // console.log("diff", moment().diff(date).toObject())
                    this.da.h= moment.duration(t)._data
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