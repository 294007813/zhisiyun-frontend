<template>
<div class="train">
    <ul :class="{to: true, single: !fibo}" v-if="fito">
        <h6>{{$t("index.training_num")}}<i v-if="fito.more" class="iconfont iconyoujiantou" @click="$f.href('/admin/course/train_plan/mylist')"></i></h6>
        <li v-if="fito.participate"  @click="$f.href('/admin/course/train_record/my_list')">
            <p><b>{{to.trainingRecord_number||0}}</b>{{$t("index.nums")}}</p>
            <span>{{$t("index.in_train")}}</span>
        </li>
        <li v-if="fito.doing"  @click="$f.href('/admin/course/train_plan/mylist?type=index')">
            <p><b>{{to.publicTraining_number||0}}</b>{{$t("index.nums")}}</p>
            <span>{{$t("index.on_active")}}</span>
        </li>
    </ul>
    <ul class="bo" v-if="fibo">
        <h6>{{$t("index.process_num")}}<i v-if="fibo.more" class="iconfont iconyoujiantou" @click="$f.href('/admin/wf/process_instance/mylist')"></i></h6>
        <li v-if="fibo.start" @click="$f.href('/admin/wf/finished_list')">
            <p><b>{{bo.start ||0}}</b>{{$t("index.nums")}}</p>
            <span>{{$t("index.self_init")}}</span>
        </li>
        <li v-if="fibo.handle" @click="$f.href('/admin/wf/finished_list')">
            <p><b>{{bo.process||0}}</b>{{$t("index.nums")}}</p>
            <span>{{$t("index.self_deal")}}</span>
        </li>
        <li v-if="fibo.doing2" @click="$f.href('/admin/wf/process_instance/mylist')">
            <p><b>{{bo.ing||0}}</b>{{$t("index.nums")}}</p>
            <span>{{$t("index.ongoing")}}</span>
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
            return data&& data.able && data.show && data.fields
        },
        fibo(){
            let data= this.conf.pages.bo
            return data&& data.able && data.show && data.fields
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
li {
    cursor: pointer;
}
</style>