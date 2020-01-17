<template>
<div class="mobile-config">
    <p class="msg">* 长按<b>“拖拽”</b>模块进行排序布局</p>
    <div class="left">
        <p class="title">已添加模块</p>
        <ul class="drag-body" ref="dragbody">
            <div class="row" v-for="ind in showlinenum" :key="ind"></div>
            <li v-for="(item, ind) in blockList.show" :key="item.code" :class=" {fixed: item.fixed}"
                :ref="'drag-'+item.code" :style="{top: item.top +'px'}">
                <div class="content" v-drag="{ cb: item.fixed? false: movedone, item, rowind: ind, only: 'y'}">
                    <p class="name">{{item.title}} <b>{{item.subtitle}}</b></p>
                    <p class="button">
                        <a class="conf">配置</a>
                        <a class="hide">隐藏</a>
                    </p>
                    <!--                <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
                </div>
            </li>
        </ul>
    </div>
    <div class="right">
        <p class="title">未添加模块</p>
        <ul class="hide-body">
            <li v-for="(item, ind) in blockList.hide" :key="item.code" >
                <div class="content">
                    <p class="name">模块名称</p>
                    <p class="button">
                        <a class="show">显示</a>
                    </p>
                    <!--                <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: "ConfigMobile",
    data(){
        return{
            bemounted: false,
            list: {
                "show": [
                    {
                        "title": "基本信息模块",
                        "subtitle": "(固定模块)",
                        "fixed": true,
                        "code": "base"
                    }, {
                        "title": "考勤信息模块",
                        "code": "checkin"
                    }, {
                        "title": "薪资信息模块",
                        "code": "salary"},
                    {
                        "title": "待办事宜模块",
                        "code": "needdo"
                    }, {
                        "title": "绩效信息模块",
                        "code": "Perf"
                    }, {
                        "title": "消息动态模块",
                        "code": "msg"
                    },
                    {
                        "title": "生日祝福模块",
                        "code": "birthday"
                    }, {
                        "title": "公司之星模块",
                        "code": "comstar"},
                    {
                        "title": "技能之星模块",
                        "code": "skillstar"
                    }, {
                        "title": "培训流程模块",
                        "code": "train"
                    },
                    {
                        "title": "合同协议模块",
                        "code": "contract"
                    }, {
                        "title": "意见箱模块",
                        "code": "idea"
                    },
                    {
                        "title": "我的日历模块",
                        "long":true,
                        "code": "calendar"
                    },
                    {
                        "title": "常用应用模块1",
                        "long":true,
                        "code": "common"
                    },
                    {
                        "title": "常用应用模块2",
                        "long":true,
                        "code": "commons"
                    },
                    {
                        "title": "常用应用模块3",
                        "long":true,
                        "code": "commonss"
                    }
                ],
                "hide": [
                    {
                        "title": "常用应用模块4",
                        "code": "common4",
                        "long":true,
                    },{
                        "title": "常用应用模块1",
                        "code": "common1"
                    },{
                        "title": "常用应用模块2",
                        "code": "common2"
                    },{
                        "title": "常用应用模块22",
                        "code": "common22",
                        "long":true,
                    },{
                        "title": "常用应用模块5",
                        "code": "common5",
                        "long":true,
                    },{
                        "title": "常用应用模块3",
                        "code": "common3"
                    },{
                        "title": "常用应用模块288",
                        "code": "common288"
                    },
                    ]
            },
        }
    },
    computed: {
        showlinenum() {
            return this.list.show.length
        },
        // hidelinenum() {
        //     return this.list.hide.length
        // },
        lineHeight() {
            return 70
        },
        bodyInfo() {
            return this.bemounted && {
                width: this.$refs.dragbody.offsetWidth,
                left: this.$refs.dragbody.offsetLeft,
                top: this.$refs.dragbody.offsetTop,
            }
        },
        blockList() {
            let al= {
                sl: this.list.show,
                hl: this.list.hide
            }

            let setL= (l, hide)=> {
                let tl= al[l]
                for(let si in tl){
                    let i = parseInt(si)
                    tl[i].top= i * this.lineHeight;
                }
            }
            setL("sl");
            // setL("hl", true);

            return {show: al.sl, hide: al.hl}
        },
    },
    mounted() {
        this.bemounted = true
    },
    methods: {
        openModsetup(){
            this.modsetupShow= true
        },
        tohide(rowind) {
            let s= this.list.show, h= this.list.hide;
            let item= s.splice(rowind, 1)
            h.push(...item)
        },
        toshow(ind, hitem) {
            let s= this.list.show, h= this.list.hide;
            let item= h.splice(ind, 1)[0]
            s.push(item)
        },
        getMovePos(y){
            let top = y - this.bodyInfo.top;
            let torow = Math.floor(top / this.lineHeight);
            // let show = this.blockList.show;
            torow= torow<0 ? 0 :torow
            return torow
        },
        movedone({y, rowind}) {
            // console.log(x, y, item)
            let l= this.list.show
            let torow = this.getMovePos(y)
            let samerow= rowind == torow;
            if(samerow){
                return
            }
            let item= l.splice(rowind, 1)[0]
            l.splice(torow, 0, item)
        },

    },
}
</script>

<style scoped lang="scss">
@import "~as/styles/zsy-base";
.mobile-config{
    padding: 40px 0;
    background-color: white;
    overflow: hidden;
    position: relative;
    .msg{
        position: absolute;
        top: 0;
        right: 40px;
        line-height: 30px;
        font-size: 14px;
        color: #7F7F7F;
        b {
            font-weight: 400;
            color: black;
        }
    }
    .left, .right{
        width: 50%;
        float: left;
        min-height: 600px;
        text-align: center;
        position: relative;
        .title{
            text-align: center;
            margin-bottom: 20px;
            font-size: 20px;
            color: $black;
        }
        .drag-body, .hide-body{
            display: inline-block;
            min-height: 600px;
            width: 460px;
            padding: 0 20px 20px;
            border: 1px solid $black;
            position: relative;
            .row {
                height: 70px;
            }
            li{
                width: 100%;
                height: 70px;
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
                text-align: center;
                transition: all .3s;
                padding: 20px 20px 0 20px;
                .content {
                    background-color: white;
                    text-align: left;
                    display: inline-block;
                    border: 1px solid $black;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    cursor: grab;
                    &.moving {
                        cursor: grabbing;
                        /*background-color: #f2f2f2;*/
                        border-style: dashed;
                        box-shadow: 0 4px 9px 3px #adadad;
                        z-index: 1;
                    }
                    &:not(.moving){
                        /*transition: all .3s;*/
                    }

                    .name {
                        font-size: 18px;
                        line-height: 48px;
                        margin-left: 20px;
                        b {
                            color: #AAAAAA;
                            font-weight: 400;
                        }
                    }

                    .button {
                        overflow: hidden;
                        text-align: right;
                        position: absolute;
                        top: 50%;
                        right: 20px;
                        transform: translateY(-50%);
                        a {
                            display: inline-block;
                            width: 80px;
                            height: 24px;
                            line-height: 22px;
                            border-radius: 15px;
                            margin-left: 20px;
                            border: 1px solid #7F7F7F;
                            text-align: center;
                            background-color: white;
                            color: #7F7F7F;
                            cursor: pointer;
                            font-size: 12px;
                        }
                        .hide {
                            background-color: $light-line;
                        }
                    }
                }
                &.fixed .content{
                    cursor: default;
                }

            }
        }

        .hide-body{
            border: 0;
            li{
                height: 50px;
                margin-bottom: 20px;
                position: relative;
                padding-top: 0;
                .content{
                    border-color: $light-line;
                    background-color: $light-line;
                    cursor: default;
                    .button a{
                        border-color: $black;
                        background-color: $black;
                        color: white;
                    }
                }
            }
        }
    }
    .left{
        border-right: 1px solid $light-line;
    }
}
</style>