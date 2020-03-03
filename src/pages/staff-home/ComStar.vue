<template>
<div class="com-star">
    <h5>{{$t("index.star_company")}}</h5>
    <el-input class="query" size="mini" placeholder="输入关键词查询" suffix-icon="fa fa-search"
              v-model="query" v-if="field.query" @change="toquery"></el-input>
    <div class="db" v-nodata="{have: list.length}">
        <swiper :options="op" class="swiper" ref="swiper">
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
                        <li><label>{{$t("index.star_company")}}：</label>{{it.people.people_no}}</li>
                        <li><label>{{$t("index.department")}}：</label>{{it.people.ou_name}}</li>
                        <li><label>{{$t("index.position")}}：</label>{{it.people.position_name}}</li>
<!--                        <li><label>部门/职位：</label>信息技术部/开发总监</li>-->
                        <li><label>{{$t("index.entry_data")}}：</label>{{moment(it.people.start_service_date).format("YYYY-MM-DD")}}</li>
                        <li><label>{{$t("index.birthday")}}：</label>{{moment(it.people.birthday).format("MM月DD日")}}</li>
                        <li><label>{{$t("index.constellation")}}：</label>{{it.people.zodiac}}</li>
                    </ul>
                </div>
            </swiper-slide>
            <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('swiper', true)"></i>
            <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('swiper')"></i>
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
        toquery(val){
            // console.log(val)
            let name="", to= null
            this.list.forEach((it, i)=>{
                name= it.people.people_name
                if(name.includes(val) || val.includes(name)){
                    to= i
                }
            })
            if(to!==null){
                this.$refs.swiper.swiper.slideTo(to)
            }
        },
        next(ref, back){
            if(back){
                this.$refs[ref].swiper.slidePrev()
            }else{
                this.$refs[ref].swiper.slideNext()
            }
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