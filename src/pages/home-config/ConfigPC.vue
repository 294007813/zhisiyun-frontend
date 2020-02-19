<template>
<div class="pc-config">
    <div class="head">已添加模块 <span><b>*</b>长按“拖拽”模块进行排序布局</span></div>
    <div class="drag-body" ref="dragbody">
        <template v-for="(ritem, rowind) in blockList.show" v-if="bemounted">
            <div v-for="(citem, colind) in ritem" :key="ritem.code" :class="['drag-block',[citem.size], {fixed: citem.fixed}]"
                 :style="{top: citem.top +'px', left: citem.left + 'px', width: citem.width+ 'px'}"
            :ref="'drag-'+citem.code">
                <div class="content" v-drag="{ cb: citem.fixed? false: movedone, exclude: 'button', item:citem, rowind, colind}">
                    <p class="title">{{citem.title}}<span v-if="citem.subtitle">{{citem.subtitle}}</span></p>
                    <div class="button">
<!--                        <a class="hide" v-if="!citem.fixed" @click="tohide(rowind, colind, citem)">隐藏</a>-->
<!--                        <a class="conf" @click="openModsetup">配置</a>-->
                        <el-button type="primary" size="mini" round plain v-if="!citem.fixed"
                                   @click="tohide(rowind, colind, citem)">隐藏</el-button>
                        <el-button type="primary" size="mini" round @click="openModsetup">配置</el-button>
                    </div>
                </div>
            </div>
        </template>
        <div class="row" v-for="ind in showlinenum" :key="ind"></div>
    </div>

    <div class="head">未添加模块</div>
    <div class="disable-body">
        <disable-block v-for="ind in 2" :key="ind" v-bind="{list: blockList.hide[0], long: !!(ind-1) , bemounted, openModsetup, toshow}"></disable-block>
    </div>
    
    <el-dialog
        :visible.sync="modsetupShow"
        custom-class="modsetup"
        width="600px">
       <p slot="title" class="title">模块项目配置<span>已添加的可选项员工可自行配置</span></p>
        <div class="body">
            <p class="msg">已添加可选项 <span><b>*</b>点击选中的项目可在更新后的员工页面中默认显示</span></p>
            <el-checkbox-group v-model="modsetl.showval" class="show-list">
                <div class="item long">
                    <i class="fa fa-times-circle"></i>
                    <el-checkbox-button :label="111" class="check-tag">页签名称配置</el-checkbox-button>
                </div>
                <div class="item"  v-for="(item, ind) in modsetl.show" :key="ind">
                    <i class="fa fa-times-circle"></i>
                    <el-checkbox-button :label="item.code" class="check-tag">{{item.name}}</el-checkbox-button>
                </div>
            </el-checkbox-group>
            <p class="msg">未添加可选项</p>
            <ul class="hide-list">
                <div class="item" v-for="(item, ind) in modsetl.hide" :key="ind">
                    <div class="check-tag">{{item.name}}</div>
                    <i class="fa fa-plus-circle"></i>
                </div>
            </ul>
        </div>
        <p slot="footer" class="footer">
            <el-button plain size="small">取消</el-button>
            <el-button type="primary" size="small">确定</el-button>
        </p>
    </el-dialog>

</div>
</template>



<script>
export default {
    name: "StaffConfigPc",
    components: {
        DisableBlock:{
            template: `
                <div v-if="bemounted">
                    <div v-for="(citem, colind) in list" :key="citem.code" :class="['disable-block',{long: citem.long}]"
                         v-if="long? citem.long: !citem.long">
                        <div class="content">
                            <p class="title">{{citem.title}}<b v-if="citem.subtitle">{{citem.subtitle}}</b></p>
                            <div class="button">
                                <el-button type="primary" size="mini" round plain v-if="!citem.fixed"
                                           @click="toshow">显示</el-button>
                            </div>
                        </div>
                    </div>
                </div>`,
            props: ['list', 'long', 'bemounted', 'openModsetup', 'toshow']
        }
    },
    props:{
        conf: {
            default(){
                return {show: [], hide: [],}
            }
        }
    },
    data() {
        return {
            bemounted: false,
            list: {
                "show": [
                    [{
                        "title": "基本信息模块",
                        "subtitle": "(固定模块)",
                        "fixed": true,
                        "code": "base"
                    }, {
                        "title": "考勤信息模块",
                        "code": "checkin"
                    }, {
                        "title": "薪资信息模块",
                        "code": "salary"}],
                    [{
                        "title": "待办事宜模块",
                        "code": "gtasks"
                    }, {
                        "title": "绩效信息模块",
                        "code": "Perf"
                    }, {
                        "title": "消息动态模块",
                        "code": "msg"
                    }],
                    [{
                        "title": "生日祝福模块",
                        "code": "birthday"
                    }, {
                        "title": "公司之星模块",
                        "code": "comstar"}],
                    [{
                        "title": "技能之星模块",
                        "code": "skillstar"
                    }, {
                        "title": "培训流程模块",
                        "code": "train"
                    }],
                    [{
                        "title": "合同协议模块",
                        "code": "contract"
                    }, {
                        "title": "意见箱模块",
                        "code": "idea"
                    }],
                    [{
                        "title": "我的日历模块",
                        "long":true,
                        "code": "calendar"
                    }],
                    [{
                        "title": "常用应用模块1",
                        "long":true,
                        "code": "common"
                    }],
                    [{
                        "title": "常用应用模块2",
                        "long":true,
                        "code": "commons"
                    }],
                    [{
                        "title": "常用应用模块3",
                        "long":true,
                        "code": "commonss"
                    }]
                ],
                "hide": [
                    [{
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
                ]]
            },
            modsetupShow: false,
            modsetl: {
                show: [
                    {code: "1", name: '项目名称1' },
                    {code: "2", name: '项目名称2' },
                    {code: "3", name: '项目名称3' },
                    {code: "4", name: '项目名称4' },
                    {code: "5", name: '项目名称5' },
                    {code: "6", name: '项目名称6' },
                ],
                showval: [],
                hide: [
                    {code: "7", name: '项目名称7' },
                    {code: "8", name: '项目名称8' },
                    {code: "9", name: '项目名称9' },
                ],
            }
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
            return 80
        },
        // bodyInfo() {
        //     return this.bemounted && {
        //         width: this.$refs.dragbody.offsetWidth,
        //         top: this.$refs.dragbody.scrollTop,
        //         left: this.$refs.dragbody.scrollLeft
        //     }
        // },
        bodyInfo() {
            let pos= this.bemounted && this.$refs.dragbody&& this.$refs.dragbody.getBoundingClientRect()
            return this.bemounted && {
                // width: this.$refs.dragbody.offsetWidth,
                width: pos.width,
                top: pos.top,
                left: pos.left
            }
        },
        blockList() {
            let al= {
                sl: this.list.show,
                hl: this.list.hide
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
            this.list= val
        }
    },
    mounted() {
        this.list= this.conf
        // setTimeout(()=>{
            this.bemounted = true
        // },100)
        console.log("mounted")
    },
    methods: {
        openModsetup(){
            this.modsetupShow= true
        },
        tohide(rowind, colind, citem) {
            let s= this.list.show, h= this.list.hide[0];
            let item= s[rowind].splice(colind, 1)
            if(!s[rowind].length){
                s.splice(rowind, 1)
            }
            h.push(...item)
        },
        toshow(ind, hitem) {
            let s= this.list.show, h= this.list.hide[0];
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
        movedone({x, y, item, rowind, colind}) {
            // console.log(x, y, item)
            let l= this.list.show
            let {torow, tocol} = this.getMovePos({x, y, item, rowind, colind})
            let samerow= rowind == torow, samecol=colind== tocol, sameall= rowind == torow&& colind== tocol;
            if(sameall){
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
        min-height: 500px;
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        .row {
            height: $row-height;
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
    .modsetup{
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
                }
            }
        }

    }
}
</style>
