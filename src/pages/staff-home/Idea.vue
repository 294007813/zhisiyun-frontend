<template>
<div class="idea">
    <h5>{{$t("index.suggestion_box")}}</h5>

    <swiper class="swiper" ref="swiper" :options="{watchOverflow: true}" v-if="typeList.length">
        <swiper-slide v-for="(item, i) in typeList" :key="i">
            <div class="ibox">
                <img src="~as/img/staff-home/idea.svg">
                <span>{{item.name}}</span>
                <p @click="$f.href('/admin/culture/suggestion')"><b>{{nums[i]|| 0}}</b>{{$t("index.comments_1")}}</p>
                <el-button size="small" type="primary" plain class="but"
                       @click="suggest(item, i)">{{$t("index.delivery_advice")}}</el-button>
            </div>
        </swiper-slide>
        <template v-if="typeList.length>1">
            <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('swiper', true)"></i>
            <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('swiper')"></i>
        </template>
    </swiper>

    <el-dialog
            :visible.sync="show"
            :append-to-body="true"
            width="500px">
        <p slot="title" class="title">{{$t("index.fill_comments")}}</p>
        <div style="padding: 10px">
            <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="说点什么"
                    v-model="form.desc"/>
        </div>
        <p slot="footer" class="footer">
            <span style="float: left;line-height: 34px;">投递到：{{name}}
<!--                <el-select placeholder="请选择" size="small" class="select"-->
<!--                           v-show="typeList.length>1" v-model="form.type">-->
<!--                    <el-option v-for="(item, ind) in typeList"-->
<!--                               :key="ind" :label="item.name" :value="item._id">-->
<!--                    </el-option>-->
<!--                </el-select>-->
            </span>

            <el-checkbox v-model="form.anonymous" style="margin-right: 10px">{{$t("index.submit_anonymously")}}</el-checkbox>
            <el-button type="primary" size="small" @click="save">{{$t("index.confirm")}}</el-button>
        </p>
    </el-dialog>
</div>
</template>

<script>
let form= JSON.stringify({
    anonymous: false,
    desc: "",
    type: "",
})
export default {
    name: "Idea",
    data(){
        return{
            show: false,
            form: JSON.parse(form),
            typeList: [],
            nums:{},
            name: "",
            i: null


        }
    },
    mounted(){
        this.getType()
    },
    methods:{
        getType(){
            this.$axios.get("/api/employeesindexpage/suggestion_items").then(data=>{
                this.typeList= data
                data.forEach((it, i)=>{
                    this.getData(it._id, i)
                })
            })
        },
        getData(id, i){
            this.$axios.get(`/api/employeesindexpage/suggestion_num?type=${id}`).then(data=>{
                // this.nums[i]= data
                this.$set(this.nums, i, data)
            })
        },
        suggest (it, i) {
            this.form= JSON.parse(form)
            this.form.type= it._id
            this.name= it.name
            this.i= i
            this.show = true;
        },
        save () {
             this.$axios.post("/api/feishu/base/client_culture_suggestion_bb_create", this.form).then(data=>{
                 this.show = false
                 this.getData(data.type, this.i)
            })
        },
        next(ref, back){
            if(back){
                this.$refs[ref].swiper.slidePrev()
            }else{
                this.$refs[ref].swiper.slideNext()
            }
        },
    }
}
</script>

<style scoped lang="scss">
@import "common";
.idea{
    @include block;
    .ibox{
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
            margin: 10px 0;
            height: 180px;
        }
        >span{
            font-size: 16px;
            font-weight: 600;
            color: $color-black;
            position: absolute;
            top: 186px;
            left: 50%;
            transform: translateX(-50%);
        }
        p{
            font-size: 12px;
            color: $color-gray;
            margin-bottom: 12px;
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