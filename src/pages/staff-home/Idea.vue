<template>
<div class="idea">
    <h5>{{$t("index.suggestion_box")}}</h5>
    <div>
        <img src="~as/img/staff-home/idea.svg">
        <p @click="$f.href('/admin/culture/suggestion')">{{$t("index.exist")}}<b>{{num}}</b>条意见</p>
        <el-button size="small" type="primary" plain class="but"  @click="suggest">{{$t("index.delivery_advice")}}</el-button>
        <el-select placeholder="请选择" size="small" class="select"
            v-show="typeList.length" v-model="type" @change="getData">
            <el-option v-for="(item, ind) in typeList"
                    :key="ind" :label="item.name" :value="item._id">
            </el-option>
        </el-select>
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
            <span style="float: left">投递到：
                <el-select placeholder="请选择" size="small" class="select"
                           v-show="typeList.length" v-model="form.type">
                    <el-option v-for="(item, ind) in typeList"
                               :key="ind" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </span>

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
                desc: "",
                type: ""
            },
            typeList: [],
            type: ""
        }
    },
    mounted(){
        this.getType()
    },
    methods:{
        getType(){
            this.$axios.get("/api/employeesindexpage/suggestion_items").then(data=>{
                this.typeList= data
                this.type= this.form.type= data[0]._id
                this.getData()
            })
        },
        getData(){
            this.$axios.get(`/api/employeesindexpage/suggestion_num?type=${this.type}`).then(data=>{
                this.num= data
            })
        },
        suggest () {
             this.show = true;
        },
        save () {
             this.$axios.get("/api/feishu/base/client_culture_suggestion_bb_create",{params: this.form}).then(data=>{
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
        position: relative;
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
        .select{
            position: absolute;
            left: 10px;
            top: 50px;
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