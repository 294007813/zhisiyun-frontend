<template>
<div class="pc-config">
    <div class="head">已添加模块 <span>* 长按<b>“拖拽”</b>模块进行排序布局</span></div>
    <div class="drag-body">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="drag-block">
            <p class="title">基本信息模块<b>(固定模块)</b></p>
            <div class="button">
                <a class="conf">配置</a>
                <a class="hide">隐藏</a>
            </div>
        </div>

        <template v-for="(item, key) in list">
            <div v-if="item.show" :class="['drag-block',[item.size]]" :key="key">
                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>
                <div class="button">
                    <a class="conf">配置</a>
                    <a class="hide" v-if="!item.need">隐藏</a>
                </div>
            </div>
        </template>

    </div>
    <div class="head">未添加模块</div>
    <div class="disable-body">
        <template v-for="(item, key) in list">
            <div v-if="!item.show && !item.need" :class="['drag-block',[item.size]]" :key="key">
                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>
                <div class="button">
<!--                    <a class="conf">配置</a>-->
                    <a class="hide">显示</a>
                </div>
            </div>
        </template>
    </div>
</div>
</template>

<script>
export default {
    name: "HomeConfigPc",
    data(){
        return{
            list: {
                base:{
                    title: "基本信息模块", suntitle: "(固定模块)",
                    row: 0, col: 0, size: "small", show: true, need:true
                },
                checkin:{
                    title: "考勤信息模块",
                    row: 0, col: 1, size: "small", show: true
                },
                salary:{
                    title: "薪资信息模块",
                    row: 0, col: 2, size: "small", show: true
                },
                needdo:{
                    title: "待办事宜模块",
                    row: 1, col: 0, size: "small", show: true
                },
                Perf:{
                    title: "绩效信息模块",
                    row: 1, col: 1, size: "small", show: true
                },
                msg:{
                    title: "消息动态模块",
                    row: 1, col: 2, size: "small", show: true
                },
                birthday:{
                    title: "生日祝福模块",
                    row: 2, col: 0, size: "half", show: true
                },
                comstar:{
                    title: "公司之星模块",
                    row: 2, col: 1, size: "half", show: true
                },
                skillstar:{
                    title: "技能之星模块",
                    row: 3, col: 0, size: "half", show: true
                },
                train:{
                    title: "培训流程模块",
                    row: 3, col: 1, size: "half", show: true
                },
                contract:{
                    title: "合同协议模块",
                    row: 4, col: 0, size: "half", show: true
                },
                idea:{
                    title: "意见箱模块",
                    row: 4, col: 1, size: "half", show: true
                },
                calendar:{
                    title: "我的日历模块",
                    row: 5, col: 0, size: "long", show: true
                },
                common:{
                    title: "常用应用模块",
                    row: 6, col: 0, size: "long", show: true
                },
                common1:{
                    title: "常用应用模块",
                    row: 6, col: 0, size: "small", show: false
                },
                common2:{
                    title: "常用应用模块",
                    row: 6, col: 0, size: "small", show: false
                },
                common3:{
                    title: "常用应用模块",
                    row: 6, col: 0, size: "half", show: false
                },
                common4:{
                    title: "常用应用模块",
                    row: 6, col: 0, size: "long", show: false
                },
            }
        }
    },
    computed:{

    }

}
</script>

<style scoped lang="less">
.pc-config{
    min-height: 500px;
    background-color: white;
    padding: 30px 36px;
    .head{
        font-size: 20px;
        line-height: 30px;
        span{
            float: right;
            line-height: 30px;
            font-size: 14px;
            color: #7F7F7F;
            b{
                font-weight: 400;
                color: black;
            }
        }
    }
    .drag-body{
        margin-top: 20px;
        min-width: 800px;
        width: 100%;
        position: relative;
        .row{
            height: 160px;
        }
        .drag-block{
            padding: 20px;
            width: 470px;
            height: 140px;
            display: inline-block;
            border: 1px solid #aaaaaa;
            border-radius: 4px;
            position: absolute;
            top: 0;
            left: 0;
            .title{
                font-size: 20px;
                b{
                    color: #AAAAAA;
                    font-weight: 400;
                }
            }
            .button{
                overflow: hidden;
                text-align: right;
                position: absolute;
                bottom: 20px;
                right: 20px;
                a{
                    display: inline-block;
                    width: 86px;
                    height: 40px;
                    border-radius: 4px;
                    margin-left: 30px;
                    border: 1px solid #7F7F7F;
                    text-align: center;
                    background-color: #f2f2f2;
                    color: #7F7F7F;
                    line-height: 38px;
                    cursor: pointer;
                }
                .conf{

                }
                .hide{
                    background-color: #555555;
                    color: white;
                }
            }
        }
    }
}
</style>