<template>
<div class="birthday">
    <h5>生日祝福墙</h5>
    <el-tabs v-model="activeTabs">
        <el-tab-pane label="今日(2位)" name="day">
            <swiper :options="day" class="day-swiper" ref="day" @someSwiperEvent="callback">
                <swiper-slide v-for="i in 3">
                    <div :class="{day: true, size}">
                        <div class="left">
                            <img class="hb" src="~as/img/staff-home/happy-birthday.svg"/>
                            <img class="cake" src="~as/img/staff-home/cake.svg"/>
                            <p>今天是TA的生日</p>
                        </div>
                        <div class="photo">
                            <img class="head" src="~as/img/staff-home/head.png"/>
                            <img class="crown" src="~as/img/staff-home/crown.svg"/>
                            <p>周若霖</p>
                            <span>技术开发部/开发经理</span>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </el-tab-pane>
        <el-tab-pane label="本月(12位)" name="mon">
            <p class="mon-title">2019年9月</p>
            <swiper :options="mon"  class="mon-swiper"ref="mon" @someSwiperEvent="callback">
                <swiper-slide class="mon-slide" v-for="i in 10 ">
                    <ul class="mon">
                        <p class="title">3日<b>周四</b></p>
                        <li  v-for="i in (parseInt(Math.random()*10+1)) ">
                            <img class="head" src="~as/img/staff-home/head.png"/>
                            <span>周若霖</span>
                        </li>
                    </ul>
                </swiper-slide>
<!--                <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--                <div class="swiper-button-next" slot="button-next"></div>-->
            </swiper>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: "Birthday",
    props: {
        size:{
            default: 'half'
        }
    },
    data(){
        return{
            activeTabs: 'day',
            day:{
                watchOverflow: true
            },
            mon:{
                slidesPerView : "auto",
                spaceBetween : 20,
                slidesOffsetBefore : 20,
                slidesOffsetAfter : 20,
            },
        }
    },
    methods:{
        callback(){}
    }
}
</script>

<style scoped lang="scss">
@import "common";
.birthday{
    @include block;
    .day-swiper{
        height: 100%;
        .day{
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
                    height: auto;
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
                }
            }
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
</style>