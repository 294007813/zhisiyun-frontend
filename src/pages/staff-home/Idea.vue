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
            custom-class="dialog"
            width="630px">
        <p slot="title" class="title">填写意见</p>
        <div class="content">
            <textarea cols="100" rows="10" placeholder="说点什么"></textarea>
        </div>
        <p slot="footer" class="footer">
            <input type="checkbox" @click="anonymous= !anonymous">
            <span>匿名提交</span>
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
            anonymous: false,
            num: 0
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
             this.$axios.post("/admin/culture/suggestion/create", {
                 desc: "aa",
                 anonymous: this.anonymous,
                 type: "5e4f3ced7ddd3a1242ded7f8"
             }).then(data=>{
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
    div{
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