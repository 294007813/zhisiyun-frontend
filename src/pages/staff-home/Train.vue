<template>
<div class="train">
    <ul class="to">
        <h6>培训统计<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>{{to.trainingRecord_number}}</b>次</p>
            <span>参与培训</span>
        </li>
        <li>
            <p><b>{{to.publicTraining_number}}</b>场</p>
            <span>进行中的活动</span>
        </li>
    </ul>
    <ul class="bo">
        <h6>流程统计<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>{{bo.start}}</b>条</p>
            <span>我发起的</span>
        </li>
        <li>
            <p><b>{{bo.process}}</b>条</p>
            <span>我处理的</span>
        </li>
        <li>
            <p><b>{{bo.ing}}</b>条</p>
            <span>进行中的</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Train",
    data(){
        return{
            to:{},
            bo:{},
        }
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