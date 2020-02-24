<template>
<div class="mobile-config">
    <div class="left">
        <div class="title">
            <h3>已添加模块 <span><b>*</b>长按“拖拽”模块进行排序布局</span></h3>
        </div>
        <ul class="drag-body" ref="dragbody">
            <li v-for="(item, ind) in left" :key="item.code" :class=" {fixed: item.fix}"
                :ref="'drag-'+item.code" :style="{top: item.top +'px'}">
                <div class="content" v-drag="{ cb: item.fix? false: movedone, item, rowind: ind, only: 'y', exclude: 'button'}">
                    <p class="name">{{item.name}}
<!--                        <b>{{item.subtitle}}</b>-->
                    </p>
                    <p class="button">
                        <el-button type="primary" size="mini" round plain
                                   @click="remove(ind)" v-if="!item.fix">隐藏</el-button>
                        <el-button type="primary" size="mini" round >配置</el-button>
                    </p>
                    <!--                <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
                </div>
            </li>
            <div class="row" v-for="ind in showlinenum" :key="ind"></div>
        </ul>
    </div>
    <div class="right">
        <div class="title"><h3>未添加模块</h3></div>
        <ul class="hide-body">
            <li v-for="(item, ind) in list.hide" :key="item.code" >
                <div class="content">
                    <p class="name">{{item.name}}</p>
                    <p class="button">
                        <el-button type="primary" size="mini" round plain
                                   @click="remove(ind, true)">显示</el-button>
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
    props:{
        conf: {
            default:()=>[]
        },
    },
    data(){
        return{
            bemounted: false,
            list: {
                show:[],
                hide:[],
            },
        }
    },
    computed: {
        // hidelinenum() {
        //     return this.list.hide.length
        // },
        lineHeight() {
            return 70
        },
        bodyInfo() {
            let pos= this.bemounted && this.$refs.dragbody.getBoundingClientRect()
            return this.bemounted && {
                // width: this.$refs.dragbody.offsetWidth,
                width: pos.width,
                top: pos.top,
                left: pos.left
            }
        },
        left() {
            // let setL= (l, hide)=> {
            //     let tl= al[l]
            //     for(let si in tl){
            //         let i = parseInt(si)
            //         tl[i].top= i * this.lineHeight;
            //     }
            // }

            let tl= this.list.show
            for(let si in tl){
                let i = parseInt(si)
                tl[i].top= i * this.lineHeight;
            }
            // setL("sl");
            return tl
        },
        showlinenum() {
            return this.list.show.length
        },
    },
    watch:{
        conf(val){
            this.init()
        }
    },
    mounted() {
        this.init()
        // this.list= this.conf
        this.bemounted = true
    },
    methods: {
        init(){
            let al= {sl: [], hl: []}
            this.conf.forEach((it)=>{
                if(it.disable){
                    al.sl.push(it)
                }else{
                    al.hl.push(it)
                }
            })


            let setL= (l, hide)=> {
                let tl= al[l]
                for(let si in tl){
                    let i = parseInt(si)
                    tl[i].top= i * this.lineHeight;
                }
            }
            setL("sl");

            // setL("hl", true);
            this.list= {show: al.sl, hide: al.hl}
        },
        remove(ind, show){
            let l= (!!show)? "hide" : "show"
            let r= (!show)? "hide" : "show"
            console.log(l)
            let item= this.list[l].splice(ind, 1)[0]
            item.disable= !!show
            this.list[r].push(item)
        },
        openModsetup(){
            this.modsetupShow= true
        },
        getMovePos(y){
            let top = y - this.bodyInfo.top;
            let torow = Math.floor(top / this.lineHeight);
            console.log(y, this.bodyInfo.top)
            torow= torow<0 ? 0 :torow
            return torow
        },
        movedone({y, rowind}) {
            // console.log(x, y, item)
            let torow = this.getMovePos(y)
            let samerow= rowind == torow;
            if(samerow){
                return
            }
            console.log(y, rowind, torow)
            let l= this.list.show
            let item= l.splice(rowind, 1)[0]
            l.splice(torow, 0, item)
        },

    },
}
</script>

<style scoped lang="scss">

$bwith: 460px;
.mobile-config{
    padding: 40px 0;
    background-color: white;
    overflow: hidden;
    position: relative;
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
            color: $color-black;
            h3{
                width: $bwith;
                display: inline-block;
                font-size: 16px;
                font-weight: 400;
                text-align: left;
                span{
                    font-size: 12px;
                    margin-left: 10px;
                    color: $color-gray;
                    b{
                        color: red;
                    }
                }
            }
        }
        .drag-body, .hide-body{
            display: inline-block;
            min-height: 600px;
            width: $bwith;
            padding-bottom: 20px;
            /*padding: 0 20px 20px;*/
            border: 1px solid $color-line-light;
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
                    //border: 1px solid $color-black;
                    border: 1px solid transparent;
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
                        font-size: 14px;
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
                            background-color: $color-line-light;
                        }
                    }
                }
                &.fixed .content{
                    cursor: default;
                }

            }
        }

        .drag-body{
            background-color: $color-gray-light;
        }
        .hide-body{
            /*border: 0;*/
            li{
                /*height: 70px;*/
                position: relative;
                /*padding: 20px 20px 0 20px;*/
                .content{
                    border-color: $color-gray-light;
                    background-color: $color-gray-light;
                    cursor: default;
                    .button a{
                        border-color: $color-black;
                        background-color: $color-black;
                        color: white;
                    }
                }
            }
        }
    }
    .left{
        &:after{
            content: "";
            position: absolute;
            width: 1px;
            height: 90%;
            display: block;
            right: 0;
            border-right: 1px solid $color-line-light;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>