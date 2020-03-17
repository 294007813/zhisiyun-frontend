<template>
<div class="com-star">
    <h5>{{$t("index.star_company")}}</h5>
    <el-input class="query" size="mini" :placeholder="$t('index.keyword_search')"
              @keydown.enter.native="enter"
              v-model="query" v-if="field.query">
              <el-button slot="append" icon="el-icon-search"  @click="toquery(query)"></el-button></el-input>
    <div class="db" v-nodata="{have: list.length}">
        <swiper :options="op" class="swiper" ref="swiper" v-if="list.length">
            <swiper-slide v-for="(it, i) in list" :key="i">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <!-- <i>NO.1</i> -->
                        <img :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`"/>
<!--                        <avatar :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`" :sex="it.people.gender"></avatar>-->
                        <p class="medal" @click="openmedal(it.people.reward_punishs)"><i class="iconfont iconxunzhangtubiao"></i>{{it.people.reward_punishs.length}}{{$t("index.number")}}</p>
                        <p class="name">{{it.people.people_name}}</p>
                    </div>
                    <ul class="info">
                        <li><label>{{$t("index.work_number")}}：</label>{{it.people.people_no}}</li>
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
    <el-dialog
        title="勋章墙"
        :visible.sync="medalshow"
        custom-class="medalwall"
        :append-to-body="true"
        width="400px">
        <ul style="min-height: 200px" v-nodata="{have: medal.length, msg:'暂无勋章'}">
            <li v-for="(it, ind) in medal">
                <i class="tag"><span>奖</span></i>
                <img :src="$conf.linkUrl+it.reward_punish.rap_medal"/>
                <p>{{it.reward_punish.rap_name}}</p>
                <span>{{getdate(it.current_time)}}获得</span>
            </li>
        </ul>
        <p slot="footer" class="footer">
            <el-button type="primary" size="small" @click="medalshow=false">确认</el-button>
        </p>
</el-dialog>
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
            list: [],
            decoy: [],
            // 勋章墙
            medalshow: false,
            medal:[]
        }
    },
    watch: {
        query() {
            this.list = this.decoy;
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
        // 打开勋章墙
        openmedal(reward_punishs){
            this.medal= reward_punishs
            this.$nextTick(()=>{
                this.medalshow= true
            })
        },
        getData(){
            this.$axios.get("/api/feishu/user/stardata_index").then(data=>{
                this.decoy = data;
                this.list= data
            })
        },
        enter(e){
            if (e.keyCode == 13) {
                this.toquery(this.query)
            }
        },
        toquery(val){
             this.list = this.list.filter(v => {
                let flag= false
                 if(
                     v.people.people_name.includes(val) ||
                     v.people.position_name.includes(val) ||
                     v.people.ou_name.includes(val) ||
                     v.people.zodiac.includes(val)

                 ){
                     flag= true
                 }
                return flag
            });
        },
        next(ref, back){
            if(back){
                this.$refs[ref].swiper.slidePrev()
            }else{
                this.$refs[ref].swiper.slideNext()
            }
        },
        getdate(date){
            return moment(date).format('YYYY-MM-DD');
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
            padding-top: 30px;
            .medal{
                display: inline-block;
                padding: 0 5px;
                font-size: 12px;
                width: 50px;
                height: 20px;
                line-height: 20px;
                vertical-align: middle;
                border-radius: 10px;
                background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
                box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
                color: white;
                cursor: pointer;
                i{
                    font-size: 10px;
                    margin-right: 4px;
                }
            }
            .name {
                font-size: 14px;
                margin-top: 5px;
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

.medalwall ul{
    /*padding: 10px;*/
    li{
        display: inline-block;
        width: 160px;
        height: 140px;
        margin: 15px 20px;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        border-radius: 4px;
        background-color: #fafafa;
        .tag{
            display: block;
            width: 0;
            height: 0;
            border-top: 42px solid #ffb142;
            border-right: 42px solid transparent;
            position: relative;
            color: #fff;
            span{
                position: absolute;
                margin-top: -38px;
                margin-left: 6px;
            }
        }
        img{
            margin-top: -30px;
            height: 80px;
        }
        >p{
            font-size: 14px;
            line-height: 20px;
            color: #666;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        >span{
            font-size: 12px;
            color: #999;
        }
    }
}

</style>

<style>
.com-star .el-input-group__append {
    background: #fff;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
