<template>
<el-dialog
        custom-class="modsetup" width="600px"
        :visible="visible" :before-close="close">
    <p slot="title" class="title">{{mod.title || title ||""}} 项目配置
        <span v-if="admin">已添加的可选项员工可自行配置</span>
        <span v-else>选中的项目在首页进行展示</span>
    </p>
    <div class="body">
        <p class="msg" v-if="admin">已添加可选项 <span><b>*</b>点击选中的项目可在更新后的员工页面中默认显示</span></p>
        <div class="show-list" v-for="(tag, tk) in page" :key="tk" v-if="tag[an] || tag.fixed">
            <div class="item long">
                <i class="fa fa-times-circle" v-if="admin && tk!='default'" @click="deltitle(tag)"></i>
                <el-checkbox :class="['check-tag', {disable: false, default: tk=='default'}]"
                             v-model="tag.show"
                             :disabled="specrule1 && specrule1[tk].disable || tk=='default'"
                             @click.native="dismsg(specrule1 && specrule1[tk].disable)"
                             @change="cltitle($event,tag)">
                    {{tagName(tk, false, tag.name)|| '基本信息'}}</el-checkbox>
            </div>
            <template v-if="tag.fields">
                <div class="item"  v-for="(val, key) in tag.fields" :key="key" >
                    <i class="fa fa-times-circle" v-if="admin" @click="delitem(tag, key)"></i>
                    <el-checkbox
                            :disabled="specrule1 && specrule1[tk].disfie[key]"
                            v-model="tag.fields[key]"
                            :class="['check-tag', {disable: false}]"
                            @click.native="dismsg(specrule1 && specrule1[tk].disfie[key])"
                            @change="clitem($event,tag, key)">
                        {{tagName(tk,key)||tk}}</el-checkbox>
                </div>
            </template>
        </div>
        <div v-if="admin">
        <p class="msg">未添加可选项</p>
        <ul class="hide-list"  v-for="(tag, tk) in page" :key="tk" v-if="!tag[an] || Object.keys(tag.disableFields).length">
            <div class="item long" v-if="!tag.fixed">
                <i class="fa fa-plus-circle"
                   v-if="!tag[an]" @click="deltitle(tag, true)"></i>
                <p class="check-tag">{{tagName(tk, false, tag.name)}}</p>
            </div>
            <template v-if="tag.fields">
                <div class="item"  v-for="(val, key) in notlist(tag)" :key="key">
                    <i class="fa fa-plus-circle" @click="delitem(tag, key, true)"></i>
                    <p class="check-tag">{{tagName(tk,key)||tk}}</p>
                </div>
            </template>
        </ul>
        </div>
    </div>
    <p slot="footer" class="footer">
<!--        <el-button plain size="small" @click="close">取消</el-button>-->
    <el-button type="primary" size="small"  @click="close">关闭</el-button>
    </p>
</el-dialog>
</template>

<script>
import Tp from "./config/config-i18n-pc";

let i18n={Tp}
import men from "./config/en"
import mzh from "./config/zh"
import pmk from "./config/pc-module-key"
import pik from "./config/pc-items-key"

export default {
    name: "ModSetup",
    props:{
        visible: {
            default: false
        },
        admin: {
            default: false
        },
        platform:{
            required: true,
        },
        tabname:{
            required: true,
        },
    },
    data(){
        return{
            mod: {},
        }
    },
    computed:{
        isp(){
            return this.platform.toLowerCase()== "pc"
        },
        ism(){
            return this.platform.toLowerCase()== "mobile"
        },
        tb(){
            return "Tp"
        },
        // t(){
        //     let mod= this.mod.code, t= i18n[this.tb][this.tabname][mod]
        //     // console.log("t", t)
        //     return t
        // },
        page(){
            return this.mod.pages || {}
        },
        an(){
            return this.isp? "able": "disable"
        },
        title(){
            return this.$t(`tab.${this.tabname}.modules.${this.mod.name}`)
        },
        transitem(){
            return pik[this.mod.name]
        },
        specrule1(){
            let rownum=0, res={}, dis={}, hasmore4= false, hasmore8= false
            _.mapObject(this.page,(pa, pak)=>{
                let  show=[], hide=[]
                _.mapObject(pa.fields,(fi, fik)=>{
                    if(fi){
                        show.push(fik)
                    }else{
                        hide.push(fik)
                    }
                })
                res[pak]={
                    show,
                    hide,
                    more4: show.length > 4,
                    more8: show.length > 8,
                }
                // hasmore4= hasmore4 || show.length> 4
                // hasmore8= hasmore8 || show.length> 8
                rownum+= pa.show? 1: 0
            })

            _.mapObject(res,(pa, pak)=>{
                // console.log("pak",pak)
                let more4= false, more8= false
                _.mapObject(res,(pao, pako)=>{
                    if(pak!= pako){
                        more4= more4 || pao.more4
                        more8= more8 || pao.more8
                    }
                })
                dis[pak]= {
                    disable: false,
                    disfie: {}
                }
                console.log("more4", more4)
                if(this.page[pak].show){
                    let ts= res[pak].show.length
                    if((more4|| rownum>2) && ts>3 || (rownum>1 && ts>7) || (rownum==1 && ts>11)){
                        _.mapObject(this.page[pak].fields,(fi, fik)=>{
                            dis[pak].disfie[fik]= !fi
                        })
                    }else{
                        _.mapObject(this.page[pak].fields,(fi, fik)=>{
                            dis[pak].disfie[fik]= false
                        })
                    }
                }else{
                    if((rownum>1 && more4) || (rownum==1 && more8)){
                        dis[pak].disable= true

                        _.mapObject(this.page[pak].fields,(fi, fik)=>{
                            dis[pak].disfie[fik]= true
                        })
                    }
                }

            })

            return (this.mod.name=="attendance_information_module" || this.mod.name=="attendance") && dis
        }
    },
    methods:{
        tagName(tk, key, paname){
            let str= ""
            // console.log(this.mod)
            if(this.ism){
                let tabhasname= this.mod.pages[tk].name
                if(key){
                    str= this.$t(`tab.${this.tabname}.${tabhasname}.${key}`)
                }else{
                    str= this.$t(`tab.${this.tabname}.bookmarks.${tabhasname}`)
                }
            }else{
                if(key){
                    str= this.$t(this.transitem[key])
                }else{
                    str= this.$t(this.transitem[paname])
                }
                // str=  key? (i18n[this.tb][key]|| this.t[tk].fields[key]) : this.t[tk].name;
            }
            return str
        },
        set(val){
            // console.log("this.mod", JSON.stringify(val))
            this.mod= val
        },
        cltitle(val, tag){
            // console.log(tag.show)
            if(!val){
                for(let k in tag.fields){
                    tag.fields[k]= false
                }
            }else{

            }
        },
        clitem(val, tag, key){
            // console.log(tag.fields[key])
            if(tag.fields[key]){
                tag.show= true
            }
        },
        deltitle(tag, add){
            let f1= (!!add)? "fields" : "disableFields"
            let f2= (!add)? "fields" : "disableFields"
            for(let k in tag[f2]){
                // this.$set(tag[f1], k, tag[f2][k])
                this.$set(tag[f1], k, false)
                this.$delete(tag[f2], k);
            }
            tag[this.an]= !!add
            tag.show= false
        },
        delitem(tag, key, add){
            let f1= (!!add)? "fields" : "disableFields"
            let f2= (!add)? "fields" : "disableFields"
            if(add){
                tag[this.an]= true
            }
            if(tag[f2].hasOwnProperty(key)){
                // this.$set(tag[f1], key, tag[f2][key])
                this.$set(tag[f1], key, false)
                this.$delete(tag[f2], key);
            }
        },
        notlist(tag){
            if(tag[this.an] || tag.fixed){
                return tag.disableFields
            }else{
                return {...tag.fields, ...tag.disableFields}
            }
        },
        dismsg(disable){
            console.log("dismsg", disable)
            if(disable){
                this.$msg({message: "选择项目达到上限", type: "error"});
            }
        },
        close(){
            this.$emit("close")
        }
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
        min-height: 200px;
        position: relative;
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
        /deep/ .show-list{
            margin-bottom: 10px;
            .item{
                @include checkbox;
                .check-tag{
                    cursor: default;
                    width: 100%;
                    padding: 0;
                    margin-bottom: 10px;
                    &:hover{
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.34902);
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

                    }
                    &.is-checked:not(.disable) .el-checkbox__label{
                        color: white;
                        background-color: $color-primary;
                        border-color: $color-primary;
                    }
                }
                .disable{
                    .el-checkbox__label{
                        cursor: default;
                    }
                }
                .default{
                    .el-checkbox__label{
                        cursor: default;
                        color: white;
                        background-color: $color-primary;
                        border-color: $color-primary;
                    }
                }
            }
        }
        .hide-list{
            margin-bottom: 10px;
            .item{
                @include checkbox;
                .check-tag{
                    width: 100%;
                    line-height: 32px;
                    border: 1px solid $color-line-light;
                    text-align: center;
                    color: $color-black;
                    cursor: default;
                    margin-bottom: 10px;
                    white-space: nowrap;
                }
                i{
                    display: block;
                    color: $color-primary;
                }
                &.long{
                    width: 100%;
                }
            }
        }
    }

}
</style>