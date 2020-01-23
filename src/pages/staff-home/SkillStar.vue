<template>
<div class="skill-star">
    <h5>技能之星</h5>
    <el-input class="query" size="mini" placeholder="输入关键词查询" suffix-icon="fa fa-search" v-model="query"></el-input>
    <div class="db">
        <swiper :options="op" class="swiper" ref="day">
            <swiper-slide v-for="i in 3">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <img src="~as/img/staff-home/head.png"/>
                        <p>周蒙奇</p>
                        <span>开发部/开发总监</span>
                    </div>
                    <ul class="info">
                        <p><b>18</b>个赞 <i class="fa fa-thumbs-up"></i></p>
                        <li>结果导向<b>6个赞</b></li>
                        <li>领导力<b>6个赞</b></li>
                        <li>技术大牛牛牛牛<b>6个赞</b></li>
                        <li>结果导向<b>6个赞</b></li>
                        <li>人品大大大大好<b>6个赞</b></li>
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
    name: "SkillStar",
    props: {
        size:{
            default: 'half'
        }
    },
    data(){
        return{
            query: '',
            op:{

            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "comstar&skillstar";
.skill-star{
    @include style;
    .db .swiper .ssb{
        background-color: $color-bg-light;
        .left{
            img{
                margin-top: 40px;
            }
            span{
                display: inline-block;
                margin-top: 4px;
                font-size: 12px;
                color: $color-gray;
            }
        }
        .info{
            display: inline-flex;
            flex-wrap: wrap;
            align-content: center;
            p{
                width: 100%;
                height: 30px;
                b{
                    font-size: 18px;
                    font-weight: 600;
                }
                i{
                    margin-left: 4px;
                    font-size: 24px;
                    background:linear-gradient(233deg,rgba(255,108,108,1) 0%,rgba(255,208,111,1) 100%);
                    -webkit-text-fill-color: transparent;
                    -webkit-background-clip: text;
                }
            }
            li{
                display: inline-block;
                white-space: nowrap;
                word-break: keep-all;
                line-height: 20px;
                padding: 0 14px;
                background: white;
                border-radius:10px;
                border:1px solid $color-line-light;
                margin: 0 6px 10px 0;
                font-size: 12px;
                b{
                    font-size: 12px;
                    font-weight: 600;
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>