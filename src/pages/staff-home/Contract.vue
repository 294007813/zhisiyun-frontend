<template>
<div class="contract">
    <ul class="to" v-if="fito">
        <h6>合同<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>{{da.n1}}</b>份</p>
            <span>已签合同</span>
        </li>
        <li>
            <p><b>{{da.h.years ||"-"}}</b>年<b>{{da.h.months||"-"}}</b>月<b>{{da.h.days||"-"}}</b>天</p>
            <span>合同有效期还剩</span>
        </li>
    </ul>
    <ul class="bo" v-if="fibo">
        <h6>协议<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>{{da.n2}}</b>份</p>
            <span>已签协议</span>
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
}
</style>