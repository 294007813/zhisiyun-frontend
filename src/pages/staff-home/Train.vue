<template>
<div class="train">
    <ul class="to" v-if="fito">
        <h6>培训统计<i v-if="fito.more" class="iconfont iconyoujiantou"></i></h6>
        <li v-if="fito.participate">
            <p><b>{{to.trainingRecord_number}}</b>次</p>
            <span>参与培训</span>
        </li>
        <li v-if="fito.doing">
            <p><b>{{to.publicTraining_number}}</b>场</p>
            <span>进行中的活动</span>
        </li>
    </ul>
    <ul class="bo" v-if="fibo">
        <h6>流程统计<i v-if="fibo.more" class="iconfont iconyoujiantou"></i></h6>
        <li v-if="fibo.start">
            <p><b>{{bo.start}}</b>条</p>
            <span>我发起的</span>
        </li>
        <li v-if="fibo.handle">
            <p><b>{{bo.process}}</b>条</p>
            <span>我处理的</span>
        </li>
        <li v-if="fibo.doing">
            <p><b>{{bo.ing}}</b>条</p>
            <span>进行中的</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Train",
    props: ["conf"],
    data(){
        return{
            to:{},
            bo:{},
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
        this.getBo()
    },
    methods:{
        getTo(){
            this.$axios.get("/api/feishu_index_page/training_control/getTrained_experience").then(data=>{
                this.to= data
            })
        },
        getBo(){
            this.$axios.get("/api/feishu/workflow/list").then(data=>{
                this.bo= data
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "train&contract";
.train{
   @include style;
}
</style>