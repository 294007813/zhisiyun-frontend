<template>
<div class="contract">
    <ul class="to">
        <h6>合同<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>4</b>份</p>
            <span>已签合同</span>
        </li>
        <li>
            <p><b>2</b>年<b>6</b>月<b>15</b>天</p>
            <span>合同有效期还剩</span>
        </li>
    </ul>
    <ul class="bo">
        <h6>协议<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>23</b>份</p>
            <span>已签协议</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Contract",
    data(){
        return{
            da:{
                n1: 0,
                h: '',
                n2: 0
            }
        }
    },
    mounted(){
        this.getTo()
        this.getBo()
    },
    methods:{
        getTo(){
            this.$axios.get("/api/feishu/agreement/list").then(data=>{
                this.da.n1= data.newContract.length
                this.da.n2= data.newContractAgreement.length
                if(this.da.n1){
                    let date= data.newContract.effective_date
                    this.$f.moment().diff(date)
                    this.da.h= ``
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