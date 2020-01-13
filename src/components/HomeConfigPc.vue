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

        <div v-for="(item, key) in list"  :key="key" :class="['drag-block',[item.size]]"
             v-if="item.show && bemounted"
             :style="{top: item.row* 160 +'px', left: blockWidth*blockstyle[item.size].full* item.col + 'px',
            width: blockWidth* blockstyle[item.size].full+ 'px'}">
            <div class="content">
                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>
                <div class="button">
                    <a class="conf">配置</a>
                    <a class="hide" v-if="!item.need">隐藏</a>
                </div>
            </div>
        </div>

    </div>
    <div class="head">未添加模块</div>
    <div class="disable-body">
        <div class="row" v-for="(val, ind) in hidelinenum" :key="ind">

<!--        <template v-for="(item, key) in list">-->
<!--            <div v-if="!item.show && !item.need && bemounted" :class="['drag-block',[item.size]]" :key="key"-->
<!--                 :style="{top: item.row* 160 +'px', left: blockWidth*blockstyle[item.size]* item.col + 'px',-->
<!--                 width: blockstyle[item.size].width}">-->
<!--                <p class="title">{{item.title}}<b v-if="item.suntitle">{{item.suntitle}}</b></p>-->
<!--                <div class="button">-->
<!--&lt;!&ndash;                    <a class="conf">配置</a>&ndash;&gt;-->
<!--                    <a class="hide">显示</a>-->
<!--                </div>-->
<!--            </div>-->
<!--        </template>-->
        </div>
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
            },
            blockstyle: {
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
            },
            bemounted: false
        }
    },
    computed:{
        showlinenum(){
            let num=0
            for(let key in this.list){
                var item= this.list[key]
                if(item.show && item.row> num){
                    num= item.row
                }
            }
            return num+1
        },
        hidelinenum(){
            let num=0
            for(let key in this.list){
                var item= this.list[key]
                if(!item.show && item.row> num){
                    num= item.row
                }
            }
            return num+1
        },
        blockWidth(){
            return this.$refs.dragbody.offsetWidth

        }
    },
    mounted(){
        this.bemounted= true
        console.log(this.blockWidth)
    },
    directives:{
        drag:{
            inserted(el, binding) {
                // console.log("order", el.attributes.order.value)
                // console.log("el", el)
                // console.log("el.offset", el.offsetTop, el.offsetLeft)
                // let top= el.pageX + 'px'
                // let left= el.pageY+ 'px'
                // el.style.top= top
                // el.style.left= left
                el.parentNode.style.width= el.parentNode.offsetWidth+ 'px'
                el.parentNode.style.height= el.parentNode.offsetHeight+ 'px'
                // console.log("el.parentNode", el.parentNode)
                el.onmousedown = function(e) {
                    var disx = e.pageX - el.offsetLeft;
                    var disy = e.pageY - el.offsetTop;
                    el.parentNode.classList.add("move")

                    var list= binding.value.blocks
                    // console.log("binding", binding)

                    document.onmousemove = function (e) {
                        el.style.left = e.pageX - disx + 'px';
                        el.style.top = e.pageY - disy + 'px';
                        console.log("e", e)
                        var obj= el.getClientRects()[0];
                        var top= obj.top
                        var left= obj.left
                        for(let i in list){
                            if(top> list[i].top && top< list[i].top+list[i].height && left >list[i].left && left< list[i].left+ list[i].width+ 20){
                                var item= list[parseInt(el.attributes.order.value)]
                                list.splice(parseInt(el.attributes.order.value), 1)
                                list.splice(i+1,0, item )
                                break
                            }
                        }
                    }
                    document.onmouseup = function (e) {
                        el.style.top = 0
                        el.style.left = 0
                        document.onmouseup = document.onmousemove = null

                        el.parentNode.classList.remove("move")
                        console.log("list",list)
                    }
                    e.preventDefault();
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
                text-align: left;
                padding: 20px;
                display: inline-block;
                border: 1px solid #aaaaaa;
                border-radius: 4px;
                height: 100%;
                position: relative;
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