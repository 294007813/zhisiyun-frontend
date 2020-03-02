<template>
<div class="mobile-config">
    <div class="left">
        <div class="title">
            <h3>已添加模块 <span><b>*</b>拖拽模块进行排序布局</span></h3>
        </div>
        <ul class="drag-body" ref="dragbody">
            <li v-for="(item, ind) in left" :key="'l-'+ind" :class=" {fixed: item.fix}"
                :ref="'drag-'+item.name" :style="{top: item.top +'px'}">
                <div class="content" v-drag="{
                    donecb: item.fix? false: movedone,
                    movecb: moving,
                    interval: 60,
                    item, rowind: ind, only: 'y',
                    exclude: 'button'}">
                    <p class="name">{{$t(`tab.${tabname}.modules.${item.name}`)}}
<!--                        <b>{{item.subtitle}}</b>-->
                    </p>
                    <p class="button">
                        <el-button type="primary" size="mini" round plain
                                   @click.self="remove(ind, false,$event)" v-if="!item.fix">隐藏</el-button>
                        <el-button type="primary" size="mini" round @click="openModsetup(item)">配置</el-button>
                    </p>
                    <!--                <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
                </div>
            </li>
            <div class="row" v-for="ind in showlinenum" :key="ind"></div>
<!--            <i class="ins-cursor" :style="cursorto"></i>-->
        </ul>
    </div>
    <div class="right">
        <div class="title"><h3>未添加模块</h3></div>
        <ul class="hide-body">
            <li v-for="(item, ind) in list.hide" :key="item.name" >
                <div class="content">
                    <p class="name">
                        {{$t(`tab.${tabname}.modules.${item.name}`)}}
                    </p>
                    <p class="button">
                        <el-button type="primary" size="mini" round plain
                                   @click="remove(ind, true)">显示</el-button>
                    </p>
                    <!--                <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
                </div>
            </li>
        </ul>
    </div>
    <mod-setup ref="modsetup" @close="modsetupShow= false"
               v-bind="{visible: modsetupShow, admin: true, tabname, platform: 'mobile'}"
    ></mod-setup>
</div>
</template>

<script>
import ModSetup from "./ModSetup";
import men  from "./config/en"
import mzh from "./config/zh"
export default {
    name: "ConfigMobile",
    components: { ModSetup},
    props:{
        conf: {
            default:()=>[]
        },
        tabname:{
            required: true,
        },
    },
    data(){
        console.log(this)
        return{
            bemounted: false,
            modsetupShow: false,
            list: {
                show:[],
                hide:[],
            },
            cursorto: {
                display: "none",
                top: "0",
            }
        }
    },
    computed: {
        left(){
            return this.list.show
        },
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
        showlinenum() {
            return this.list.show.length
        },
    },
    watch:{
        conf(val){
            this.init()
        },
        left(){
            this.calcheight(this.list.show)
        }
    },
    mounted() {
        this.init()
        console.log("mounted")
        // this.list= this.conf
        this.bemounted = true
    },
    methods: {
        init(){
            JSON.parse(JSON.stringify( this.conf)).forEach((it)=>{
                if(it.disable){
                    this.list.show.push(it)
                }else{
                    this.list.hide.push(it)
                }
            })
            this.calcheight(this.list.show)
        },
        calcheight(l){
            for(let li in l){
                let i = parseInt(li)
                l[i].top= i * this.lineHeight;
            }
        },
        remove(ind, show, e){
            let l= (!!show)? "hide" : "show"
            let r= (!show)? "hide" : "show"
            console.log(l)
            let item= this.list[l].splice(ind, 1)[0]
            item.disable= !!show
            this.list[r].push(item)

            e.target.blur()
        },
        openModsetup(item){
            this.modsetupShow= true
            // console.log(JSON.stringify(item))
            // for(let key in item.pages){
            //     let it= item.pages[key]
            //     let obj= {}
            //     it.fields.forEach((fi)=>{
            //         Object.assign(obj, fi)
            //     })
            //     item.fields= obj
            // }
            // _.mapObject(item.pages,(it, key)=>{
            //     let obj= {}
            //     it.fields.forEach((fi)=>{
            //         // console.log(fi)
            //         Object.assign(obj, fi)
            //     })
            //     it.fields= obj
            // })
            this.$refs.modsetup.set(item)

        },
        getMovePos(y){
            let top = y - this.bodyInfo.top;
            let torow = Math.floor(top / this.lineHeight);
            // console.log(y, this.bodyInfo.top)
            torow= torow<0 ? 0 :torow
            return torow
        },
        moving({y, rowind}){
            console.log("moving")
            let l= this.list.show
            let torow = this.getMovePos(y)
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            if(!torow || l[torow].fixed) return
            let top= torow * this.lineHeight+ 10 + "px"
            // console.log("torow,",  torow)
            // console.log("top, ",  top)
            this.$set(this.cursorto, "display", "block")
            this.$set(this.cursorto, "top", top)
        },
        movedone({y, rowind, item}) {
            // console.log("movedone")
            this.$set(this.cursorto, "display", "none")
            let torow = this.getMovePos(y)

            let samerow= rowind == torow;
            let l= JSON.parse(JSON.stringify( this.list.show))
            if(torow>=this.showlinenum ){
                torow= this.showlinenum-1
            }
            if(samerow||  l[torow].fix){
                return
            }
            // console.log("rowind item torow", rowind, item, torow)
            let it= l.splice(rowind, 1)[0]
            l.splice(torow, 0, it)
            this.$set(this.list, "show", l)
        },
    },
    i18n: {
        messages: {
            en: {
                tab: men
            },
            zh: {
                tab: mzh
            }
        }
    }
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
            .ins-cursor{
                width: 420px;
                height: 2px;
                background-color: red;
                display: block;
                position: absolute;
                left: 18px;
                top: 0;
                &:before, &:after{
                    content: " ";
                    width: 2px;
                    height: 6px;
                    display: block;
                    position: absolute;
                    top: -2px;
                    left: 0;
                    background-color: red;
                }
                &:after{
                    background-color: red;
                    left: auto;
                    right: 0;
                }
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