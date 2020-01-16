<template>
<div class="pc-config">
        <div class="head">已添加模块 <span>* 长按<b>“拖拽”</b>模块进行排序布局</span></div>
        <div class="drag-body" ref="dragbody">
            <div class="row" v-for="ind in showlinenum" :key="ind"></div>

            <template v-for="(ritem, rowind) in blockList.show" v-if="bemounted">
                <div v-for="(citem, colind) in ritem" :key="ritem.code" :class="['drag-block',[citem.size]]"
                     :style="{top: citem.top +'px', left: citem.left + 'px', width: citem.width+ 'px'}"
                :ref="'drag-'+citem.code">
                    <div class="content" v-drag="{ movedone, item:citem, rowind, colind}">
                        <p class="title">{{citem.title}}<b v-if="citem.subtitle">{{citem.subtitle}}</b></p>
                        <div class="button">
                            <a class="conf" @click="openModsetup">配置</a>
                            <a class="hide" v-if="!citem.need" @click="tohide">隐藏</a>
                        </div>
                    </div>
                </div>
            </template>

        </div>
        <div class="head">未添加模块</div>
        <div class="disable-body">
        <disable-block :list="blockList.hide" :long="false"
                       v-bind="{list: blockList.hide, long: false, bemounted, openModsetup, tohide}"></disable-block>
        <disable-block :list="blockList.hide" :long="true"
                       v-bind="{list: blockList.hide, long: false, bemounted, openModsetup, tohide}"></disable-block>
    </div>
    
    <el-dialog
        :visible.sync="modsetupShow"
        custom-class="modsetup"
        width="600px">
       <p slot="title" class="title">模块项目配置<b>已添加的可选项员工可自行配置</b></p>
        <div class="body">
            <p class="msg">已添加可选项 <span>*点击选中的项目可在更新后的员工页面中默认显示</span></p>
            <el-checkbox-group v-model="modsetl.showval" class="show-list">
                <div class="item"  v-for="(item, ind) in modsetl.show" :key="ind">
                    <el-checkbox-button :label="item.code" class="check-tag">{{item.name}}</el-checkbox-button>
                    <i class="fa fa-times-circle"></i>
                </div>
            </el-checkbox-group>
            <p class="msg">未添加可选项</p>
            <ul class="show-list">
                <li v-for="(item, ind) in modsetl.hide">{{item.name}}
                    <i class="fa fa-plus-circle"></i>
                </li>
            </ul>

        </div>

        <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

</div>
</template>



<script>
export default {
    name: "HomeConfigPc",
    components: {
        DisableBlock:{
            template: `
                <div>
                <template v-for="(ritem, rowind) in list" v-if="bemounted">
                <div v-for="(citem, colind) in ritem" :key="ritem.code" :class="['disable-block',{long: citem.long}]"
                     v-if="long? citem.long: !citem.long">
                    <div class="content">
                        <p class="title">{{citem.title}}<b v-if="citem.subtitle">{{citem.subtitle}}</b></p>
                        <div class="button">
                            <a class="conf" @click="openModsetup">配置</a>
                            <a class="hide" @click="tohide">显示</a>
                        </div>
                    </div>
                </div>
                </template>
                </div>`,
            props: ['list', 'long', 'bemounted', 'openModsetup', 'tohide']
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
                        "need": true,
                        "code": "base"
                    }, {
                        "title": "考勤信息模块",
                        "code": "checkin"
                    }, {
                        "title": "薪资信息模块",
                        "code": "salary"}],
                    [{
                        "title": "待办事宜模块",
                        "code": "needdo"
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
                        "title": "常用应用模块",
                        "code": "common1"
                    },{
                        "title": "常用应用模块",
                        "code": "common2"
                    },{
                        "title": "常用应用模块22",
                        "code": "common22",
                        "long":true,
                    }],
                   [{
                        "title": "常用应用模块",
                        "code": "common3"
                    }],
                    [{
                        "title": "常用应用模块",
                        "code": "common4",
                        "long":true,
                    }]
                ]
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
            return 160
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
    mounted() {
        this.bemounted = true
    },
    methods: {
        openModsetup(){
            this.modsetupShow= true
        },
        tohide() {

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
    directives: {
        drag: {
            bind(el, binding, vnode) {
                // console.log("vnode", vnode)
                // console.log("order", el.attributes.order.value)
                // console.log("el", el)
                // console.log("el.offset", el.offsetTop, el.offsetLeft)
                let top = el.pageX + 'px'
                let left = el.pageY + 'px'
                // el.style.top= top
                // el.style.left= left

                // el.parentNode.style.width= el.parentNode.offsetWidth+ 'px'
                // el.parentNode.style.height= el.parentNode.offsetHeight+ 'px'
                // console.log("el.parentNode", el.parentNode)
                let {moving, movedone, item, rowind, colind}= binding.value
                let disx = null
                let disy = null
                let timer = null

                function mousedown(e) {
                    disx = e.pageX - el.offsetLeft;
                    disy = e.pageY - el.offsetTop;
                    el.classList.add("moving")
                }

                function mounemove(e) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        // moving({x: e.pageX, y: e.pageY, item, rowind, colind })
                        // mouseup(e)
                        // movedone({e})
                    }, 400)
                    el.style.left = e.pageX - disx + 'px';
                    el.style.top = e.pageY - disy + 'px';
                }

                function mouseup(e) {
                    el.classList.remove("moving")
                    document.onmouseup = document.onmousemove = null
                    movedone({x: e.pageX, y: e.pageY, item, rowind, colind })
                    el.style.top = 0
                    el.style.left = 0
                }

                el.onmousedown = function (e) {
                    if (e.target.tagName == 'A') {
                        return
                    }
                    // timer= setTimeout(function () {
                    mousedown(e)
                    // },500)


                    // let list= binding.value.blocks
                    // console.log("binding", binding)

                    document.onmousemove = function (e) {
                        mounemove(e)
                        // console.log("e", e)
                        // let obj= el.getClientRects()[0];
                        // let top= obj.top
                        // let left= obj.left
                        // for(let i in list){
                        //     if(top> list[i].top && top< list[i].top+list[i].height && left >list[i].left && left< list[i].left+ list[i].width+ 20){
                        //         let item= list[parseInt(el.attributes.order.value)]
                        //         list.splice(parseInt(el.attributes.order.value), 1)
                        //         list.splice(i+1,0, item )
                        //         break
                        //     }
                        // }
                    }
                    document.onmouseup = function (e) {
                        // el.parentNode.style.pointer= "default"
                        // el.style.top = 0
                        // el.style.left = 0

                        //
                        // el.parentNode.classList.remove("move")
                        // console.log("list",list)
                        mouseup(e)
                    }
                    e.preventDefault();
                    // e.stopPropagation();
                }
            }
        }
    }

}
</script>

<style scoped lang="scss">
    $black: #333333;
.pc-config {
    min-height: 500px;
    background-color: white;
    padding: 30px;

    .head {
        font-size: 20px;
        line-height: 30px;
        margin-left: 10px;

        span {
            float: right;
            line-height: 30px;
            font-size: 14px;
            color: #7F7F7F;

            b {
                font-weight: 400;
                color: black;
            }
        }
    }

    .drag-body, .disable-body {
        margin-top: 20px;
        min-width: 800px;
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        .row {
            height: 160px;
        }

        /*.small .content {*/
        /*    width: 96%;*/
        /*}*/

        /*.half .content {*/
        /*    width: 97%;*/
        /*}*/

        /*.long .content {*/
        /*    width: 99%;*/
        /*}*/

        .drag-block{
            /*width: 470px;*/
            height: 140px;
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            transition: all .3s;
            padding: 0 10px;
            .content {
                background-color: white;
                text-align: left;
                padding: 20px;
                display: inline-block;
                border: 1px solid #aaaaaa;
                border-radius: 4px;
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
                &:not(.moving){
                    /*transition: all .3s;*/
                }
            }

            .title {
                font-size: 20px;

                b {
                    color: #AAAAAA;
                    font-weight: 400;
                }
            }

            .button {
                overflow: hidden;
                text-align: right;
                position: absolute;
                bottom: 20px;
                right: 20px;

                a {
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

                .conf {

                }

                .hide {
                    background-color: #555555;
                    color: white;
                }
            }
        }
    }

    .modsetup{
        .title{
            color: $black;
            font-size: 14px;
            b{
                font-weight: 400;
                color: #0000006d;
                margin-left: 20px;
            }
        }
        .body{
            .msg{
                font-size: 14px;
                color: $black;
                span{
                    margin-left: 10px;
                    color: #0000006d;
                    font-size: 12px;
                }
            }
        }

    }
}
</style>
<style lang="scss">
.pc-config{
    .disable-block{
        height: 140px;
        display: inline-block;
        padding: 0 10px;
        width: 1/3*100%;
        margin-bottom: 20px;
        &.long{
            width: 100%;
        }
        .content {
            text-align: left;
            padding: 20px;
            display: inline-block;
            border: 1px solid #aaaaaa;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            position: relative;
            background-color: #F2F2F2;
        }

        .title {
            font-size: 20px;
            b {
                color: #AAAAAA;
                font-weight: 400;
            }
        }

        .button {
            overflow: hidden;
            text-align: right;
            position: absolute;
            bottom: 20px;
            right: 20px;

            a {
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

            .conf {

            }

            .hide {
                background-color: #555555;
                color: white;
            }
        }
    }
}

</style>