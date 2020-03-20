<template>
<div class="birthday">
    <h5>{{$t("index.birthday_blessing_wall")}}</h5>
    <el-tabs v-model="activeTabs" class="block-tabs">
        <el-tab-pane :label="`${$t('index.this_month')}(${mon.length||0}${$t('index.num')})`" name="mon" v-if="fimon">
            <p class="mon-title">{{curMonth}}</p>
            <swiper :options="monOptions" v-if="mon.peoples && mon.peoples.length"
                    class="mon-swiper" ref="mon" @someSwiperEvent="callback">
                <swiper-slide class="mon-slide" v-for="(bd, i) in mon.peoples" :key="i">
                    <ul class="mon">
                        <p class="title">{{moment(bd.end_date).format("D")}}<b>{{moment(bd.end_date).format("dd")}}</b></p>
                        <li  v-for="(item, j) in bd.items" :key="i+'-'+j" @click="select(item)">
                            <img class="head"  :src="$f.getPic(item.people.avatar)"/>
                            <!--<avatar class="head"  :src="$f.getPic(item.people.avatar)" :sex="item.people.gender"></avatar>-->
                            <span>{{item.people.people_name}}</span>
                        </li>
                    </ul>
                </swiper-slide>
                <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('mon', true)"></i>
                <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('mon')"></i>
            </swiper>
            <div v-else v-nodata="{have: mon.peoples&& mon.peoples.length}"></div>
        </el-tab-pane>
        <el-tab-pane :label="`${$t('index.today')}(${day.length||0}${$t('index.num')})`" name="day" v-if="fiday" >
            <swiper :options="dayOptions" v-if="day.peoples && day.peoples.length"
                    class="day-swiper" ref="day" @someSwiperEvent="callback">
                <swiper-slide v-for="(item, i) in day.peoples[0].items" :key="i">
                    <div :class="{day: true, size}" @click="select(item)">
                        <div class="left">
                            <img class="hb" src="~as/img/staff-home/happy-birthday.svg"/>
                            <img class="cake" src="~as/img/staff-home/cake.svg"/>
                            <p>今天是TA的生日</p>
                        </div>
                        <div class="photo">
                            <avatar class="head"  :src="$f.getPic(item.people.avatar)" :sex="item.people.gender"></avatar>
                            <img class="crown" src="~as/img/staff-home/crown.svg"/>
                            <p>{{item.people.people_name}}</p>
                            <span>{{`${item.people.ou_name}/${item.people.position_name}`}}</span>
                        </div>
                    </div>
                </swiper-slide>
                <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('day', true)"></i>
                <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('day')"></i>
            </swiper>
            <div v-else v-nodata="{have: day.peoples&& day.peoples.length}"></div>
        </el-tab-pane>
        
    </el-tabs>

    <el-dialog
            :title="(p.people &&p.people.people_name)+'的生日'"
            :visible.sync="pshow"
            custom-class="birthday-detail"
            :append-to-body="true"
            width="700px">
        <div :class="{day: true, size}" v-if="p.people">
            <div class="left">
                <img class="hb" src="~as/img/staff-home/happy-birthday.svg"/>
                <img class="cake" src="~as/img/staff-home/cake.svg"/>
                <p>{{moment(p.people.birthday).format("M月D日")}}是TA的生日</p>
            </div>
            <div class="photo" >
                <img class="head" :src="$f.getPic(p.people.avatar)"/>
<!--                <avatar class="head" :src="$f.getPic(p.people.avatar)" :sex="p.people.gender"></avatar>-->
                <img class="crown" src="~as/img/staff-home/crown.svg"/>
                <p>{{p.people.people_name}} <span>{{p.people.people_no}}</span></p>
                <span>{{`${p.people.ou_name}/${p.people.position_name}`}}</span>
                <span>{{moment(p.people.start_service_date).format("YY年M月D日")}}入职</span>
                <span>{{p.people.zodiac}}</span>
            </div>
        </div>
        <p slot="footer" class="footer">
            <el-button type="primary" size="small" @click="pshow=false">{{$t("index.know")}}</el-button>
        </p>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: "Birthday",
    props: {
        size:{
            default: 'half'
        },
        "conf":{}
    },
    data(){
        return{
            activeTabs: 'mon',
            dayOptions:{
                watchOverflow: true,
                // prevButton: '.swiper-button-prev',
                // nextButton: '.swiper-button-next',
            },
            monOptions:{
                slidesPerView : "auto",
                spaceBetween : 20,
                slidesOffsetBefore : 20,
                slidesOffsetAfter : 20,
                // prevButton:'.swiper-button-prev',
                // nextButton:'.swiper-button-next',
            },
            pshow: false,
            p:{},
            day: {},
            mon: {},
        }
    },
    computed:{
        fiday(){
            let data= this.conf.pages.day
            return data&& data.able && data.show && data.fields
        },
        fimon(){
            let data= this.conf.pages.mon
            return data&& data.able && data.show && data.fields
        },
        curMonth (){
            return new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月"
        }
    },
    mounted(){
        this.activeTabs=  this.fimon && 'mon' || this.fiday && 'day'
        this.getData()
        this.getData("month")
    },
    methods:{
        callback(){},
        getData(month){
            this.$axios.get("/api/feishu/user/birthdaydata_index",{params:{index: month||''}}).then(data=>{
                month? this.mon=data: this.day= data
            })
        },
        select(it){
            this.p= it
            this.pshow= true
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
@import "common";
@mixin birthday(){
width: 100%;
height: 100%;
position: relative;
.left{
    position: absolute;
    top: 46%;
    transform: translateY(-50%);
    left: 8%;
    .cake{
        width: 300px;
        position: relative;
        margin-bottom: 20px;
    }
    .hb{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .05;
    }
    p{
        font-size: 24px;
        text-align: center;
    }
}

.photo{
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    right: 8%;
    overflow: visible;
    white-space: nowrap;
    padding-left: 110px;
    .head{
        border-radius: 100%;
        overflow: hidden;
        width: 100px;
        height: 100px;
        border: 1px solid $color-border;
        box-shadow:0 4px 8px 0 rgba(0,0,0,0.08);
        position: absolute;
        left: 0;
        top: 0;
    }
    .crown{
        width: 54px;
        position: absolute;
        top: -20px;
        left: 60px;
    }
    p{
        font-size: 16px;
        font-weight: 500;
        margin: 30px 0 4px;
    }
    span{
        font-size: 12px;
        max-width: 100px;
        display: inline-block;
        white-space: normal;
    }
}
}
.birthday{
    @include block;
    .day-swiper{
        height: 100%;
        .day{
            @include birthday;
        }
        .mon{

        }
    }
    .mon-title{
        font-size: 16px;
        font-weight: 500;
        line-height: 60px;
        margin-left: 20px;
    }
    .mon-swiper{
        height: $bl - 100 +px;
        .mon{
            width: auto;
            height: 180px;
            border-radius:10px;
            background-color: $color-gray-light;
            padding: 70px 20px 20px;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            position: relative;
            >p{
                position: absolute;
                top: 20px;
                left: 20px;
                font-size: 16px;
                font-weight: 500;
                b{
                    font-size: 12px;
                    font-weight: 400;
                    color: $color-gray;
                    margin-left: 10px;
                }
            }
            li{
                display: inline-block;
                width: 60px;
                text-align: center;
                margin: 0 14px;
                cursor: pointer;
                img{
                    width: 100%;
                    margin-bottom: 10px;
                    border-radius: 100%;
                }
                span{
                    display: block;
                }
            }
        }
        .mon-slide{
            width: auto;
        }
    }
}
.birthday-detail{
    .day{
        @include birthday;
        height: 300px;
        .photo{
            padding-left: 130px;
            right: auto;
            left: 50px;
            >p, >span{
                white-space: nowrap;
                display: block;
                margin-bottom: 4px;
            }
            p{margin-top: 0}

        }
        .left{
            left: auto;
            right: 60px;
        }
    }
}
</style>