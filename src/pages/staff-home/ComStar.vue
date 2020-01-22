<template>
<div class="com-star">
    <h5>公司之星</h5>
    <el-input class="query" size="mini" placeholder="输入关键词查询" suffix-icon="fa fa-search" v-model="query"></el-input>
    <div class="db">
        <swiper :options="op" class="day-swiper" ref="day">
            <swiper-slide v-for="i in 3">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <i>NO.1</i>
                        <img src="~as/img/staff-home/head.png"/>
                        <p>周蒙奇</p>
                    </div>
                    <div class="info">
                        <p><label>工号：</label>0091</p>
                        <p><label>部门/职位：</label>信息技术部/开发总监</p>
                        <p><label>入职：</label>2019年01月</p>
                        <p><label>生日：</label>09月08日</p>
                        <p><label>星座：</label>双鱼座</p>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
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
        }
    },
    data(){
        return{
            query: '',
            op:{}
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.com-star{
    @include block;
    .query{
        width: 200px;
        position: absolute;
        top: 6px;
        right: 20px;
    }
    .db{
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

    }
}
</style>