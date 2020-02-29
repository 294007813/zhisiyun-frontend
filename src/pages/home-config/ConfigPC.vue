<template>
<div class="pc-config">
    <div class="head">已添加模块 <span><b>*</b>长按“拖拽”模块进行排序布局</span></div>
    <div class="drag-body" ref="dragbody">
        <template v-for="(ritem, rowind) in blockList.show" v-if="bemounted">
            <div v-for="(citem, colind) in ritem" :key="ritem.code" :class="['drag-block',[citem.size], {fixed: citem.fixed}]"
                 :style="{top: citem.top +'px', left: citem.left + 'px', width: citem.width+ 'px'}"
            :ref="'drag-'+citem.code">
                <div class="content" v-drag="{
                    donecb: citem.fixed? false: movedone,
                    movecb: moving,
                    exclude: 'button',
                    interval: 100,
                    item:citem, rowind, colind}">
                    <p class="title">{{citem.title}}
<!--                        <span v-if="citem.subtitle">{{citem.subtitle}}</span>-->
                    </p>
                    <div class="button">
                        <el-button type="primary" size="mini" round plain v-if="!citem.fixed"
                                   @click="tohide(rowind, colind, citem)">隐藏</el-button>
                        <el-button type="primary" size="mini" round
                                   v-if="citem.pages &&Object.keys(citem.pages).length" @click="openModsetup(citem)">配置</el-button>
                    </div>
                </div>
            </div>
        </template>
        <div class="row" v-for="ind in showlinenum" :key="ind"></div>
        <i class="ins-cursor" :style="cursorto"></i>
    </div>
    <div class="head">未添加模块</div>
    <div class="disable-body">
        <disable-block v-for="ind in 2" :key="ind" v-bind="{list: blockList.hide[0], long: !!(ind-1) , bemounted, openModsetup, toshow}"></disable-block>
    </div>
    <mod-setup ref="modsetup"
               :visible="modsetupShow" @close="modsetupShow= false" :admin="admin" modname="home" platform="pc"
    ></mod-setup>
</div>
</template>

<script>
import ModSetup from "./ModSetup";
export default {
    name: "StaffConfigPc",
    components: {
        DisableBlock:{
            template: `
                <div v-if="bemounted">
                    <div v-for="(citem, colind) in list" :key="citem.code" :class="['disable-block',{long: citem.long}]"
                         v-if="access(citem) && (long? citem.long: !citem.long)">
                        <div class="content">
                            <p class="title">{{citem.title}}<b v-if="citem.subtitle">{{citem.subtitle}}</b></p>
                            <div class="button">
                                <el-button type="primary" size="mini" round plain v-if="!citem.fixed"
                                           @click="toshow(citem.code)">显示</el-button>
                            </div>
                        </div>
                    </div>
                </div>`,
            props: ['list', 'long', 'bemounted', 'openModsetup', 'toshow'],
            methods:{
                access(it){
                    let haskey= it.hasOwnProperty("access")
                    return !haskey || (haskey && it.access)
                }
            }
        },
        ModSetup
    },
    props:{
        conf: {
            default(){
                return {show: [], hide: [], disable:[]}
            }
        },
        admin: {
            default: false
        }
    },
    data() {
        return {
            bemounted: false,
            list: {
                show: [],
                hide: [],
                disable: [],
            },
            modsetupShow: false,
            cursorto: {
                display: "none",
                top: "0",
                left: "0"
            }
        }
    },
    computed: {
        showlinenum() {
            return this.list.show? this.list.show.length :0
        },
        lineHeight() {
            return 80
        },
        bodyInfo() {
            let pos= this.bemounted && this.$refs.dragbody&& this.$refs.dragbody.getBoundingClientRect()
            return this.bemounted && {
                // width: this.$refs.dragbody.offsetWidth,
                width: pos.width,
                top: pos.top,
                left: pos.left
            }
        },
        hideKey(){
            return this.admin? 'disable': 'hide'
        },
        blockList() {
            let al= {
                sl: this.list.show,
                hl: this.list[this.hideKey]
            }
            let blockstyle = {
                small: 1 / 3,
                half: 1 / 2,
                long: 1
            }

            let setL= (l, hide)=> {
                let tl= al[l]
                for(let si in tl){
                    let i = parseInt(si)
                    for( let sj in tl[i]){
                        let j = parseInt(sj)
                        let size= tl[i][j].long? 'long': (tl[i].length<=2&&!hide? 'half': 'small');
                        tl[i][j].size= size;
                        tl[i][j].top= i * this.lineHeight;
                        tl[i][j].left= this.bodyInfo.width * blockstyle[size] * j;
                        tl[i][j].width = this.bodyInfo.width * blockstyle[size];
                    }
                }
            }
            setL("sl");
            setL("hl", true);

            return {show: al.sl, hide: al.hl}
        },
    },
    watch:{
        conf(val){
            // console.log(val)
            this.list= val
        }
    },
    mounted() {
        this.list= this.conf
        // setTimeout(()=>{
            this.bemounted = true
        // },100)
        // console.log("mounted")
    },
    methods: {
        openModsetup(item){
            this.modsetupShow= true
            // console.log(JSON.stringify(item))
            this.$refs.modsetup.set(item)

        },
        tohide(rowind, colind, citem) {
            let s= this.list.show, h= this.list[this.hideKey][0];
            let item= s[rowind].splice(colind, 1)
            if(!s[rowind].length){
                s.splice(rowind, 1)
            }
            h.push(...item)
        },
        toshow(code) {
            let s= this.list.show, h= this.list[this.hideKey][0], ind;
            h.forEach((it, i)=>{
                if(it.code== code){
                    ind=i
                }
            })
            let item= h.splice(ind, 1)
            s.push(item)

        },
        getMovePos({x, y, item, rowind, colind}){
            let left = x - this.bodyInfo.left, top = y - this.bodyInfo.top
            let torow = Math.floor(top / this.lineHeight), tocol = 0
            let show = this.blockList.show, width = 0
            for (let i in show[torow]) {
                width = width || show[torow][i].width
                if (left <= width) {
                    tocol = parseInt(i)
                    break
                }
                width += show[torow][i].left + show[torow][i].width
            }
            torow= torow<0 ? 0 :torow
            tocol= tocol<0 ? 0 :tocol
            return {torow, tocol}
        },
        // moveRow(index, up){
        //     let l= this.blockList.show
        //     for(let i in l){
        //         if(i>= index){
        //             for(let j in l[i]){
        //                 let lel= this.$refs['drag-'+ l[i][j].code][0]
        //                 lel.style.top= lel.offsetTop+ (up? (-this.lineHeight): (this.lineHeight)) + 'px'
        //             }
        //         }
        //
        //     }
        // },

        //在滑动过程中只改变dom样式，不改变数据
        //找到要去的行/列计算本身和其他块的样式
        // moving({x, y, item, rowind, colind}){
        //     let el= this.$refs['drag-'+item.code][0]
        //     // console.log("item", item)
        //     console.log("el", el)
        //     let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
        //     // console.log(x, y, item, rowind, colind)
        //     console.log(torow, tocol)
        //     let l= this.blockList.show, bw= this.bodyInfo.width
        //     let samerow= rowind == torow, sameall= rowind == torow&& colind== tocol;
        //     if(sameall){
        //         return
        //     }
        //     if(item.long){
        //         this.moveRow(torow)
        //         // this.moveRow(rowind+1, true)
        //         el.style.top= torow * this.lineHeight + 'px'
        //     }else{
        //         let tlength= l[torow].length
        //         let width2= bw/ 2, width3= bw/ 3
        //         // console.log(width2, width3)
        //         // console.log( el.style.width)
        //         // console.log( el.style.width)
        //         for(let si in l[torow]){
        //             let i= parseInt(si)
        //             let sitem= l[torow][i]
        //             let sel=  this.$refs['drag-'+sitem.code][0]
        //             let twidth= bw/ (tlength==3? 3 :(tlength+ (samerow ?0:1)))
        //
        //             if(i<2){
        //                 sel.style.width= twidth + 'px'
        //                 sel.style.left= twidth * (i<tocol? i: i+1) + 'px'
        //             }else{
        //                 this.tempLine++
        //                 samerow? false: this.moveRow(torow+1)
        //                 sel.style.width= width2  + 'px'
        //                 sel.style.left= 0
        //                 sel.style.top= sel.offsetTop+ this.lineHeight + 'px'
        //             }
        //         }
        //         if(!samerow){
        //             for(let si in l[rowind]){
        //                 let i= parseInt(si)
        //                 let slength= l[rowind].length-1
        //                 let sitem= l[rowind][i]
        //                 let swidth= bw/ (slength==1 ? 2 : slength)
        //                 let sel=  this.$refs['drag-'+sitem.code][0]
        //                 if(sitem.code== item.code){
        //                     continue;
        //                 }
        //                 sel.style.width= swidth + 'px'
        //                 sel.style.left= swidth * (i<colind? i: i-1) + 'px'
        //             }
        //         }
        //
        //         el.style.width= (samerow? bw/tlength: (tlength>1 ? width3: width2))  + 'px'
        //         el.style.left= (samerow? bw/tlength: (tlength>1 ? width3: width2))* tocol + 'px'
        //         el.style.top= this.lineHeight * torow + 'px'
        //     }
        // },
        moving({x, y, item, rowind, colind}){
            console.log("moving")
            let l= this.list.show
            let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            if( l[torow][tocol].fixed) return
            let top= torow * this.lineHeight + "px"
            let left= l[torow][tocol].long|| item.long? 0: (l[torow].length>2? (tocol *33.5)+"%" : (tocol *51)+"%");
            console.log("torow, tocol",  torow, tocol)
            console.log("top, left",  top, left)
            this.$set(this.cursorto, "display", "block")
            this.$set(this.cursorto, "left", left)
            this.$set(this.cursorto, "top", top)
        },
        movedone({x, y, item, rowind, colind}) {
            console.log("movedone")
            this.$set(this.cursorto, "display", "none")
            // console.log(x, y, item)
            let l= this.list.show
            let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
            let samerow= rowind == torow, samecol=colind== tocol, sameall= rowind == torow&& colind== tocol;
            // console.log("torow, tocol", torow, tocol)
            // console.log("x, y", x, y)
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            if(sameall || l[torow][tocol].fixed){
                return
            }
            if(item.long){
                let thisrow=l.splice(rowind, 1)[0]
                console.log("thisrow", thisrow)
                l.splice(torow,0, thisrow)
            }else{
                let thiscol=l[rowind].splice(colind, 1)[0]
                console.log("thiscol", thiscol)
                if(l[rowind].length==0){
                    l.splice(rowind, 1)
                }

                if(l[torow][0].long){
                    l.splice(torow+1,0, [thiscol])
                }else{
                    l[torow].splice(tocol, 0, thiscol)
                    if(l[torow].length>3){
                        let o= l[torow].splice(3, 1)
                        console.log("o", o)
                        l.splice(torow+1,0, o)
                    }
                }
            }
        },
       
    },
}
</script>

<style scoped lang="scss">

$bhv: 60;
$phv: 20;
$block-height: $bhv+px;
$row-height: $bhv+$phv+px;
@mixin content(){
    .content {
        background-color: white;
        text-align: left;
        /*padding: 20px;*/
        display: inline-block;
        border: 1px solid $color-line-light;
        border-radius: 2px;
        width: 100%;
        height: 100%;
        position: relative;
        cursor: grab;

        &.moving {
            cursor: grabbing;
            background-color: #f2f2f2;
            border-style: dashed;
            box-shadow: 0 4px 9px 3px #adadad;
            z-index: 1;
        }
        .title {
            font-size: 14px;
            left: 20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .button {
            overflow: hidden;
            /*text-align: right;*/
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
           /* /deep/ .is-plain{
                &, &:focus, &:active{
                background-color: white;
                color: $color-primary;
                }
                &:hover{
                    background-color: $color-primary;
                    color: white;
                }
            }*/
        }
    }
}
.pc-config {
    min-height: 500px;
    background-color: white;
    padding: 20px;
    .head {
        padding-left: 10px;
        font-size: 16px;
        /*line-height: 30px;*/
        border-left: 4px solid $color-primary;

        span {
            margin-left: 10px;
            font-size: 12px;
            color: $color-gray;
            b {
                color: red;
            }
        }
    }

    .drag-body, .disable-body {
        margin-top: 20px;
        min-width: 800px;
        min-height: 400px;
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        .row {
            height: $row-height;
        }
        .ins-cursor{
            width: 2px;
            height: $block-height;
            background-color: red;
            display: block;
            position: absolute;
            left: 1px;
            top: 0;
            &:before, &:after{
                content: " ";
                width: 6px;
                height: 2px;
                display: block;
                position: absolute;
                top: 0;
                left: -2px;
                background-color: red;
            }
            &:after{
                background-color: red;
                top: auto;
                bottom: 0;
            }
        }
        .drag-block{
            /*width: 470px;*/
            height: $block-height;
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            transition: all .3s;
            padding: 0 10px;
            @include content;

            &.fixed .content{
                cursor: default;
                .title{
                    color: $color-gray;
                }
            }

        }
        /deep/ .disable-block{
            height: $block-height;
            display: inline-block;
            padding: 0 10px;
            width: 1/3*100%;
            margin-bottom: 20px;
            &.long{
                width: 100%;
            }
            @include content;
            .content{
                background-color: $color-gray-light;
                border: none;
                cursor: default;
            }
        }
        &.disable-body{
            min-height: 200px;
        }
    }
/*
    @mixin checkbox(){
        position: relative;
        display: inline-block;
        width: 25%;
        padding: 0 10px;
        &.long{
            width: 100%;
        }
        >i{
            position: absolute;
            top: -8px;
            font-size: 20px;
            right: 2px;
            background-color: white;
            border-radius: 8px;
            z-index: 10;
            overflow: hidden;
            cursor: pointer;
            display: none;
            color: $color-gray;
        }
        &:hover >i{
            display: block;
        }
    }
    /deep/ .modsetup{
        .title{
            color: $color-black;
            font-size: 14px;
            margin-left: 10px;
            span{
                font-weight: 400;
                color: $color-gray;
                margin-left: 20px;
                font-size: 12px;
            }
        }
        .body{
            padding: 10px;
            .msg{
                font-size: 14px;
                color: $color-black;
                margin: 0  0 10px 10px;
                span{
                    margin-left: 10px;
                    color: $color-gray;
                    font-size: 12px;
                    b{
                        color: red;
                    }
                }
            }
            .show-list{
                margin-bottom: 10px;
                .item{
                   @include checkbox;
                     .check-tag{
                        cursor: default;
                        width: 100%;
                        padding: 0;
                         margin-bottom: 10px;
                        /deep/ .el-checkbox-button__inner{
                            width: 100%;
                            border-color: $color-line-light;
                            border-radius: 0;
                        }
                        /deep/ &.is-checked:first-child .el-checkbox-button__inner, &.is-checked .el-checkbox-button__inner{
                            color: white;
                            background-color: $color-primary;
                            border-color: $color-primary;
                        }
                        .el-checkbox__input{
                            position: absolute;
                            opacity: 0;

                        }
                        .el-checkbox__label{
                            width: 100%;
                            border-radius: 0;
                            line-height: 32px;
                            border: 1px solid $color-line-light;
                            padding: 0;
                            text-align: center;
                            color: $color-black;
                            transition: all .2s;
                            cursor: pointer;
                            &:hover{
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.34902);
                            }
                        }
                        &.is-checked .el-checkbox__label{
                            color: white;
                            background-color: $color-primary;
                            border-color: $color-primary;
                        }
                    }
                }
            }
            .hide-list{
                .item{
                    @include checkbox;
                    .check-tag{
                        width: 100%;
                        line-height: 32px;
                        border: 1px solid $color-line-light;
                        text-align: center;
                        color: $color-black;
                        cursor: default;
                    }
                    i{
                        display: block;
                    }
                    &.long{
                        width: 100%;
                    }
                }
            }
        }

    }
*/
}
</style>
