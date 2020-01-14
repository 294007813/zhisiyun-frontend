<template>
<div class="pc-config">
    <div class="head">已添加模块 <span>* 长按<b>“拖拽”</b>模块进行排序布局</span></div>
    <div class="drag-body" ref="dragbody">
        <div class="row" v-for="ind in showlinenum" :key="ind"></div>
<!--        <div class="drag-block">-->
<!--            <p class="title">基本信息模块<b>(固定模块)</b></p>-->
<!--            <div class="button">-->
<!--                <a class="conf">配置</a>-->
<!--                <a class="hide">隐藏</a>-->
<!--            </div>-->
<!--        </div>-->

        <div v-for="(item, key) in blockList"  :key="key" :class="['drag-block',[item.size]]"
             v-if="(item.show || item.need) && bemounted "
             :style="{top: item.top +'px', left: item.left + 'px', width: item.width+ 'px'}">
            <div class="content" v-drag="{movedone, item}">
                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>
                <div class="button">
                    <a class="conf" @click="toconf">配置</a>
                    <a class="hide" v-if="!item.need" @click="tohide">隐藏</a>
                </div>
            </div>
        </div>

    </div>
    <div class="head">未添加模块</div>
    <div class="disable-body">
        <div class="row" v-for="ind in hidelinenum" :key="ind"></div>

<!--        <div v-for="(item, key) in list" :key="key"-->
<!--             v-if="!item.show && !item.need && bemounted" :class="['drag-block',[item.size]]"-->
<!--             :style="{top: item.row* 160 +'px', left: blockWidth*blockstyle[item.size].full* item.col + 'px',-->
<!--            width: blockWidth* blockstyle[item.size].full+ 'px'}">-->
<!--            <div class="content">-->
<!--                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>-->
<!--                <div class="button">-->
<!--&lt;!&ndash;                    <a class="conf">配置</a>&ndash;&gt;-->
<!--                    <a class="hide">显示</a>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</div>
</template>

<script>
export default {
    name: "HomeConfigPc",
    data(){
        return{
            bemounted: false,
            dragbodywidth: 0,
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
                    row: 0, col: 0, size: "small", show: false
                },
                common2:{
                    title: "常用应用模块",
                    row: 0, col: 1, size: "small", show: false
                },
                common3:{
                    title: "常用应用模块",
                    row: 1, col: 0, size: "half", show: false
                },
                common4:{
                    title: "常用应用模块",
                    row: 2, col: 0, size: "long", show: false
                },
            },
        }
    },
    computed:{
        showlinenum(){
            return this.calcline(this.list, true)
            // let num=0
            // for(let key in this.list){
            //     var item= this.list[key]
            //     if(item.show && item.row> num){
            //         num= item.row
            //     }
            // }
            // return num+1
        },
        hidelinenum(){
            // let num=0
            // for(let key in this.list){
            //     var item= this.list[key]
            //     if(!item.show && item.row> num){
            //         num= item.row
            //     }
            // }
            // return num+1

            return this.calcline(this.list, false)
        },
        lineHeight(){
            return 160
        },
        bodyInfo(){
            return this.bemounted &&{
                width: this.$refs.dragbody.offsetWidth,
                left: this.$refs.dragbody.offsetLeft,
                top: this.$refs.dragbody.offsetTop,
            }
        },
        blockList(){
            let list= this.list
            let blockstyle= {
                small:{
                    full: 1/3,
                    width: '33%',
                },
                half: {
                    full: 1/2,
                    width: '50%',
                },
                long: {
                    full: 1,
                    width: '100%',
                },
            }
            for(let key in list){
                let item= list[key]
                item.top= item.row* this.lineHeight
                item.left= this.bodyInfo.width*blockstyle[item.size].full* item.col
                item.width= this.bodyInfo.width* blockstyle[item.size].full
            }
            return list
        },
        calcstruct(){
            let sl={}, hl={}, list= this.list
            for(let key in list){
                let item= list[key]
                let newi= {...item, code: key}
                if(item.show){
                    if(!sl[item.row]){
                        sl[item.row]= [newi]
                    }else{
                        sl[item.row].push(newi)
                    }
                }else{
                    if(!hl[item.row]){
                        hl[item.row]= [newi]
                    }else{
                        hl[item.row].push(newi)
                    }
                }
            }
            for(let i in sl){
                sl[i].sort(function (a,b) {
                    return a.col< b.col
                })
            }
            for(let i in hl){
                hl[i].sort(function (a,b) {
                    return a.col< b.col
                })
            }
            // console.log(sl)
            // console.log(hl)
            return {show: sl, hide: hl}
        }
    },
    mounted(){
        this.bemounted= true
        console.log(this.bodyInfo)
        // console.log(JSON.stringify(this.calcstruct))
        // console.log(JSON.stringify(this.blockList))
    },
    methods:{
        calcline(list, isshow){
            let num=0
            for(let key in list){
                var item= list[key]
                if(isshow ? item.show: !item.show && item.row> num){
                    num= item.row
                }
            }
            return num+1
        },
        toconf(){

        },
        tohide(){

        },
        movedone({x, y, item}){
            console.log(x, y, item)
            let left= x- this.bodyInfo.left, top= y- this.bodyInfo.top
            let row= Math.floor(top/this.lineHeight), col= 0
            let show= this.calcstruct.show, width= 0
            for(let i in show[row]){
                width= width || show[row][i].width
                if(left<= width){
                    col= i
                    break
                }
                width+= show[row][i].left+ show[row][i].width
            }
            //1 如果是long，直接插入，行递增

            //2 不是long
            //情况1 插入行为1个half
            //情况2 插入行为2个half
            //情况3 插入行为3个small
            //情况4 插入行为1个long

        },
        // movedone({e}){
        //     console.log(e)
        // }
    },
    directives:{
        drag:{
            inserted(el, binding, vnode) {
                // console.log("vnode", vnode)
                // console.log("order", el.attributes.order.value)
                // console.log("el", el)
                // console.log("el.offset", el.offsetTop, el.offsetLeft)
                let top= el.pageX + 'px'
                let left= el.pageY+ 'px'
                // el.style.top= top
                // el.style.left= left

                // el.parentNode.style.width= el.parentNode.offsetWidth+ 'px'
                // el.parentNode.style.height= el.parentNode.offsetHeight+ 'px'
                // console.log("el.parentNode", el.parentNode)
                let movedone= binding.value.movedone
                let item= binding.value.item
                let disx= null
                let disy= null
                let timer= null
                function mousedown(e){
                    disx = e.pageX - el.offsetLeft;
                    disy = e.pageY - el.offsetTop;
                    el.classList.add("moving")
                }
                function mounemove(e){
                    clearTimeout(timer)
                    timer= setTimeout(()=>{
                        movedone({x: e.pageX, y: e.pageY, item})
                        // movedone({e})
                    },800)
                    el.style.left = e.pageX - disx + 'px';
                    el.style.top = e.pageY - disy + 'px';
                }
                function mouseup(e){
                    el.style.top = 0
                    el.style.left = 0
                    el.classList.remove("moving")
                    document.onmouseup = document.onmousemove = null
                }
                el.onmousedown = function(e) {
                    if(e.target.tagName=='A'){
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

<style scoped lang="less">
.pc-config{
    min-height: 500px;
    background-color: white;
    padding: 30px;
    .head{
        font-size: 20px;
        line-height: 30px;
        margin-left: 10px;
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
    .drag-body, .disable-body{
        margin-top: 20px;
        min-width: 800px;
        width: 100%;
        position: relative;
        .row{
            height: 160px;
        }
        .small .content{
            width: 96%;
        }
        .half .content{
            width: 97%;
        }
        .long .content{
            width: 99%;
        }
        .drag-block{
            /*width: 470px;*/
            height: 140px;
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            .content{
                background-color: white;
                text-align: left;
                padding: 20px;
                display: inline-block;
                border: 1px solid #aaaaaa;
                border-radius: 4px;
                height: 100%;
                position: relative;
                cursor: grab;
                &.moving{
                    cursor: grabbing;
                    background-color: #f2f2f2;
                    border-style: dashed;
                    box-shadow:0 4px 9px 3px #adadad;
                    z-index: 1;
                }
            }
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