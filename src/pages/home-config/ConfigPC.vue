<template>
<div class="pc-config">
    <div class="head">{{$t("index.module_added")}} <span><b>*</b>{{$t("index.you_can_drag")}}</span></div> 
    <div class="drag-body" ref="dragbody">
        <template v-for="(ritem, rowind) in blockList.show" v-if="bemounted">
            <div v-for="(citem, colind) in ritem" :key="ritem.code" :class="['drag-block',[citem.size], {fixed: citem.fixed}]"
                 :style="{top: citem.top +'px', left: citem.left + 'px', width: citem.width+ 'px'}"
            :ref="'drag-'+citem.code">
                <div class="content" v-drag="{
                    donecb: citem.fixed? false: movedone,
                    movecb: moving,
                    exclude: 'button',
                    interval: 0,
                    item:citem, rowind, colind}"
                     @mousedown="mup"
                    >
                    <p class="title">{{citem.title}}
<!--                        <span v-if="citem.subtitle">{{citem.subtitle}}</span>-->
                    </p>
                    <div class="button">
                        <el-button type="primary" size="mini" round plain v-if="!citem.fixed"
                                   @click.self="tohide(rowind, colind, citem, $event)">{{$t("index.hidden_module")}}</el-button>
                        <el-button type="primary" size="mini" round
                                   v-if="citem.pages &&Object.keys(citem.pages).length" @click="openModsetup(citem)">{{$t("index.to_configure")}}</el-button>
                    </div>
                </div>
            </div>
        </template>
        <div class="row" v-for="ind in showlinenum" :key="ind"></div>
        <i class="ins-cursor" :style="{...cursorto, display: insCursorShow? cursorto.display: 'none'}"></i>
    </div>
    <div class="head">{{$t("index.module_not_added")}}</div>
    <div class="disable-body">
        <disable-block v-for="ind in 2" :key="ind" v-bind="{list: blockList.hide[0], long: !!(ind-1) , bemounted, openModsetup, toshow}"></disable-block>
    </div>
    <mod-setup ref="modsetup"
               :visible="modsetupShow" @close="modsetupShow= false" :admin="admin" tabname="home" platform="pc"
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
                         v-if="access(citem) && (long? citem.long: !citem.long) && !citem.noaccess">
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
            },
            insCursorShow: false
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
            // console.log("this.$refs.dragbody", this.$refs.dragbody.offsetWidth)
            return this.bemounted && {
                // width: this.$refs.dragbody.offsetWidth,
                width: pos.width-15,
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
        mup(){
            // console.log("mup")
            this.insCursorShow= true
        },
        openModsetup(item){
            this.modsetupShow= true
            // console.log(JSON.stringify(item))
            this.$refs.modsetup.set(item)

        },
        tohide(rowind, colind, citem, e) {
            let s= this.$f.deepClone(this.list.show), h= this.$f.deepClone(this.list[this.hideKey][0]);
            let item= s[rowind].splice(colind, 1)
            if(!s[rowind].length){
                s.splice(rowind, 1)
            }
            h.push(...item)
            this.list.show= this.clearup(s)
            this.list[this.hideKey]= [h]
            // setTimeout(()=>{
                e.target.blur()
            // },10)

        },
        toshow(code) {
            let s= this.$f.deepClone(this.list.show) , h= this.$f.deepClone(this.list[this.hideKey][0]), ind;
            h.forEach((it, i)=>{
                if(it.code== code){
                    ind=i
                }
            })
            let item= h.splice(ind, 1)
            s.push(item)
            this.list.show= this.clearup(s)
            this.list[this.hideKey]= [h]
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
            // console.log("torow", torow)
            if(torow<0) torow=0
            if(tocol<0) tocol=0
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            if(show[torow].length==1){
                width += show[torow][0].width
                if (left <= width) {
                    tocol = 1
                }
            }

            return {torow, tocol}
        },

        moving({x, y, item, rowind, colind}){
            // console.log("moving")
            let l= this.list.show
            let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            // console.log("torow", torow)
            // if(torow<0){
            //     this.$set(this.cursorto, "display", "none")
            //     return;
            // }
            if( l[torow][tocol] && l[torow][tocol].fixed || l[torow][0].long){
                this.$set(this.cursorto, "display", "none")
                return
            }
            if(item.long &&l[torow][0]&&l[torow][0].fixed){
                return;
            }
            let top= torow * this.lineHeight + "px"
            let left=( l[torow][tocol] && l[torow][tocol].long)|| item.long? 0: (l[torow].length>2? (tocol *33.33)+"%" : (tocol *50)+"%");
            // console.log("torow, tocol",  torow, tocol)
            // console.log("top, left",  top, left)
            this.$set(this.cursorto, "display", "block")
            this.$set(this.cursorto, "left", left)
            this.$set(this.cursorto, "top", top)
        },
        movedone({x, y, item, rowind, colind}) {
            // console.log("movedone")
            this.$set(this.cursorto, "display", "none")
            this.insCursorShow= false
            // console.log(x, y, item)
            let l= JSON.parse(JSON.stringify( this.list.show))
            let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
            let samerow= rowind == torow, samecol=colind== tocol, sameall= rowind == torow&& colind== tocol;
            // console.log("torow, tocol", torow, tocol)
            // console.log("x, y", x, y)
            if(torow>=this.showlinenum){
                torow= this.showlinenum-1
            }
            console.log("torow, tocol", torow, tocol)
            if(sameall || (l[torow][tocol]&& l[torow][tocol].fixed) || l[torow][0].long){
                return
            }
            if(item.long){
                // console.log("long")
                let thisrow= []
                if(l[torow][0]&&l[torow][0].fixed){
                    return;
                }
                thisrow=l.splice(rowind, 1)[0]
                // console.log("thisrow", thisrow)
                l.splice(torow,0, thisrow)
            }else{
                let thiscol=l[rowind].splice(colind, 1)[0]
                // console.log("thiscol", thiscol)
                if(l[rowind].length==0){
                    l.splice(rowind, 1)
                }

                if(l[torow][0].long){
                    l.splice(torow+1,0, [thiscol])
                }else{
                    l[torow].splice(tocol, 0, thiscol)
                    if(l[torow].length>3){
                        let o= l[torow].splice(3, 1)
                        // console.log("o", o)
                        l.splice(torow+1,0, o)
                    }
                }
            }
            this.list.show= []
            this.$nextTick(() => {
                this.list.show= this.clearup(l)
            })

        },
        clearup(list){
            // console.log("list", JSON.stringify(list))
            let arr= this.$f.deepClone(list)
            for(let i = arr.length - 1; i >= 0; i--){
                if(i>=0){
                    if(arr[i].length== 1 && !arr[i][0].long && (arr[i-1]&& arr[i-1].length== 1 && !arr[i-1][0].long)){
                        let it= arr[i].splice(0,1)[0]
                        arr[i-1].push(it)
                        arr.splice(i,1)
                    }
                }
            }
            return arr
        }
       
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
            opacity: .7;
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
