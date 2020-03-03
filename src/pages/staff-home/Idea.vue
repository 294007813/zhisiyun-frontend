<template>
<div class="idea">
    <h5>{{$t("index.suggestion_box")}}</h5>
    <div>
        <img src="~as/img/staff-home/idea.svg">
        <p @click="$f.href('/admin/culture/suggestion')">{{$t("index.exist")}}<b>{{num}}</b>条意见</p>
        <el-button size="small" type="primary" plain class="but"  @click="suggest">{{$t("index.delivery_advice")}}</el-button>
    </div>

    <el-dialog
            :visible.sync="show"
            :append-to-body="true"
            width="500px">
        <p slot="title" class="title">填写意见</p>
        <div style="padding: 10px">
            <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="说点什么"
                    v-model="form.desc"/>
        </div>
        <p slot="footer" class="footer">
            <el-checkbox v-model="form.anonymous" style="margin-right: 10px">匿名提交</el-checkbox>
            <el-button type="primary" size="small" @click="save">确认</el-button>
        </p>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: "Idea",
    data(){
        return{
            show: false,
            num: 0,
            form:{
                anonymous: false,
                desc: ""
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/employeesindexpage/suggestion_num").then(data=>{
                this.num= data
            })
        },
        suggest () {
             this.show = true;
        },
        save () {
             this.$axios.post("/api/feishu/base/client_culture_suggestion_bb_create", this.form).then(data=>{
                 this.show = false
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.idea{
    @include block;
    >div{
        padding-top: 40px;
        overflow: hidden;
        text-align: center;
        &:before{
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: $color-border;
            left: 0;
            top: 40px;
        }
        img{
            margin-top: 20px;
            height: 160px;
            margin-bottom: 20px;
        }
        p{
            font-size: 12px;
            color: $color-gray;
            margin-bottom: 6px;
            cursor: pointer;
            b{color: $color-black;}
        }
        .title {
            text-align: left;
            font-size: 16px;
        }
    }
}
</style>