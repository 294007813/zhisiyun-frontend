<template>
<div class="com-star">
    <h5>公司之星</h5>
    <el-input class="query" size="mini" placeholder="输入关键词查询" suffix-icon="fa fa-search"
              v-model="query" v-if="field.query"></el-input>
    <div class="db">
        <swiper :options="op" class="swiper" ref="day">
            <swiper-slide v-for="(it, i) in list" :key="i">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <i>NO.1</i>
<!--                        <img src="~as/img/staff-home/head.png"/>-->
<!--                        <img :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`"/>-->
                        <avatar :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`" :sex="it.people.gender"></avatar>

                        <p>{{it.people.people_name}}</p>
                    </div>
                    <ul class="info">
                        <li><label>工号：</label>{{it.people.people_no}}</li>
                        <li><label>部门：</label>{{it.people.ou_name}}</li>
                        <li><label>职位：</label>{{it.people.position_name}}</li>
<!--                        <li><label>部门/职位：</label>信息技术部/开发总监</li>-->
                        <li><label>入职：</label>{{moment(it.people.start_service_date).format("YYYY-MM-DD")}}</li>
                        <li><label>生日：</label>{{moment(it.people.birthday).format("MM月DD日")}}</li>
                        <li><label>星座：</label>{{it.people.zodiac}}</li>
                    </ul>
                </div>
            </swiper-slide>
<!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--            <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
    </div>
</div>
</template>

<script>
export default {
    name: "ComStar",
    props: {
        size:{
            default: 'half'
        },
        conf:{}
    },
    data(){
        return{
            query: '',
            op:{

            },
            list: []
        }
    },
    computed:{
        field(){
            return this.conf.pages.default.fields
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/user/stardata").then(data=>{
                this.list= data
            })
        },
        moment: window.moment
    }
}
</script>

<style scoped lang="scss">
@import "comstar&skillstar";
.com-star{
    @include style;
    .db .swiper .ssb{
        .left{
            background-color: #EDF8FF;
            i{
                font-size: 12px;
                width:54px;
                height:20px;
                background:linear-gradient(270deg,rgba(255,255,168,1) 0%,rgba(255,208,111,1) 100%);
                box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
                border-radius:10px;
                display: inline-block;
                margin-top: 30px;
                line-height: 20px;
            }
        }
        .info{
            display: inline-flex;
            flex-wrap: wrap;
            align-content: space-around;
            padding: 10px 20px;
            li{
                height: 20px;
                line-height: 20px;
                width: 50%;
                font-size: 12px;
                label{
                    color: $color-gray;
                }
            }
        }
    }
}


</style>