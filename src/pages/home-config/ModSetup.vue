<template>
<el-dialog
        custom-class="modsetup" width="600px"
        :visible="visible" :before-close="close">
    <p slot="title" class="title">模块项目配置
        <span v-if="admin">已添加的可选项员工可自行配置</span>
        <span v-else>选中的项目在首页进行展示</span>
    </p>
    <div class="body">
        <p class="msg" v-if="admin">已添加可选项 <span><b>*</b>点击选中的项目可在更新后的员工页面中默认显示</span></p>
        <div class="show-list" v-for="(tag, tk) in page" :key="tk" v-if="tag[an] || tag.fixed">
            <div class="item long" v-if="tagName(tk)">
                <i class="fa fa-times-circle" v-if="admin" @click="deltitle(tag)"></i>
                <el-checkbox v-model="tag.show" class="check-tag" @change="cltitle($event,tag)">{{tagName(tk)}}</el-checkbox>
            </div>
            <template v-if="tag.fields">
                <div class="item"  v-for="(val, key) in tag.fields" :key="key" >
                    <i class="fa fa-times-circle" v-if="admin" @click="delitem(tag, key)"></i>
                    <el-checkbox v-model="tag.fields[key]" class="check-tag" @change="clitem($event,tag, key)">{{tagName(tk,key)}}</el-checkbox>
                </div>
            </template>
        </div>
        <div v-if="admin">
        <p class="msg">未添加可选项</p>
        <ul class="hide-list"  v-for="(tag, tk) in page" :key="tk" v-if="!tag[an] || Object.keys(tag.disableFields).length">
            <div class="item long" v-if="!tag.fixed && tagName(tk)">
                <i class="fa fa-plus-circle"
                   v-if="!tag[an]" @click="deltitle(tag, true)"></i>
                <p class="check-tag">{{tagName(tk)}}</p>
            </div>
            <template v-if="tag.fields">
                <div class="item"  v-for="(val, key) in notlist(tag)" :key="key">
                    <i class="fa fa-plus-circle" @click="delitem(tag, key, true)"></i>
                    <p class="check-tag">{{tagName(tk,key)}}</p>
                </div>
            </template>
        </ul>
        </div>
    </div>
    <p slot="footer" class="footer">
<!--        <el-button plain size="small" @click="close">取消</el-button>-->
        <el-button type="primary" size="small"  @click="close">确定</el-button>
    </p>
</el-dialog>
</template>

<script>
import Tp from "./config/config-i18n-pc";
import Tm from "./config/config-i18n-mobile";
let i18n={Tp, Tm}
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
        modname:{
            required: true,
        },

    },
    data(){
        return{
            mod: {}
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
            return this.isp? "Tp": "Tm"
        },
        t(){
            let mod= this.mod.code, t= i18n[this.tb][this.modname][mod]
            console.log("t", t)
            return t
        },
        page(){
            return this.mod.pages || {}
        },
        an(){
            return this.isp? "able": "disable"
        }

    },
    methods:{
        tagName(tk, key){
            let name= key? (i18n[this.tb][key]|| this.t[tk].fields[key]) : this.t[tk].name;
            console.log("name", name)
            return name
        },
        set(val){
            console.log("this.mod", JSON.stringify(val))
            this.mod= val
        },
        cltitle(val, tag){
            // console.log(tag.show)
            if(!val){
                for(let k in tag.fields){
                    tag.fields[k]= false
                }
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
                this.$set(tag[f1], k, tag[f2][k])
                this.$delete(tag[f2], k);
            }
            tag[this.an]= !!add
        },
        delitem(tag, key, add){
            let f1= (!!add)? "fields" : "disableFields"
            let f2= (!add)? "fields" : "disableFields"
            if(add){
                tag[this.an]= true
            }
            if(tag[f2].hasOwnProperty(key)){
                this.$set(tag[f1], key, tag[f2][key])
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
        close(){
            this.$emit("close")
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