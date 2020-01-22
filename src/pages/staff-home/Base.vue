<template>
<div class="base">
    <img class="bg" src="~as/img/staff-home/info-bg.svg"/>
    <h1 class="name"><p>周比利</p><span>001</span><a>正式</a></h1>
    <div class="title">销售部/销售经理 <b>高级-L1-1</b></div>
    <p><label>星座：</label>双鱼座</p>
    <p><label>属相：</label>羊</p>
    <p><label>生日：</label>02-15</p>
    <p><label>入职日期：</label>2017-01-02 <span>下属：23人</span></p>
    <a>查看档案<i class="iconfont iconyoujiantou"></i></a>
    <div class="head">
        <img src="~as/img/staff-home/head.png"/>
        <p><i class="iconfont iconxunzhangtubiao"></i>3枚</p>
    </div>

</div>
</template>

<script>
export default {
    name: "Base"
}
</script>

<style scoped lang="scss">
@import "common";
.base{
    @include block;
    padding: 36px;
    >*{position: relative}
    .bg{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
    .name{
        vertical-align: middle;
        margin: 16px 0;
        *{display: inline-block; vertical-align: middle;}
        p{
            font-weight: 600;
            font-size: 24px;
        }
        span{
            display: inline-block;
            padding: 0 10px;
            font-size: 12px;
        }
        a{
            font-size: 12px;
            color: white;
            background-color: #3075F1;
            line-height: 20px;
            padding: 0 10px;
            border-radius: 2px;
        }
    }
    .title{
        font-size: 14px;
        margin-bottom: 10px;
        b{
            margin-left: 10px;
            font-weight: 400;
            font-size: 12px;
            color: $color-gray-dark;
        }
    }
    >p{
        font-size: 14px;
        position: relative;
        margin-bottom: 10px;
        label{color: $color-gray;}
        span{
            display: inline-block;
            font-size: 12px;
            line-height: 28px;
            padding: 0 10px;
            color: $color-primary;
            border: 1px solid $color-primary;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 20px;
        }
    }
    .head{
        position: absolute;
        top: 40px;
        right: 40px;
        width: 100px;
        overflow: hidden;
        text-align: center;
        img{
            border-radius: 100%;
            overflow: hidden;
            width: 100%;
            height: auto;
            border: 1px solid $color-border;
            margin-bottom: 10px;
        }
        p{
            display: inline-block;
            font-size: 12px;
            width: 50px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            border-radius: 10px;
            background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
            box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
            color: white;
            i{
                font-size: 10px;
                margin-right: 4px;
            }
        }
    }
    >a{
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        margin-top: 10px;
        color: $color-gray;
        i{
            font-size: 12px;
        }
    }
}
</style>