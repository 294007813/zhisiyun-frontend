<template>
<div class="home-config">
    <div class="head">
        <h2>{{$t("index.employee_page_config")}}</h2>
        <div class="button">
            <el-button size="small" @click="back">{{$t("index.return")}}</el-button>
            <el-button size="small" type="success" @click="update">{{$t("index.update")}}</el-button>
            <el-button type="primary" size="small" @click="save">{{$t("index.save")}}</el-button>
        </div>
    </div>
    <el-tabs v-model="tabsVal" class="tbs zsy" >
        <el-tab-pane :label="$t('index.pc_terminal_config')" name="pc" :lazy="true"> 
            <div class="main">
                <config-pc :conf="confpc" ref="pchome" :admin="true"></config-pc>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('index.mobile_terminal_config')" name="mobile">
            <div class="main">
            <el-tabs  class="sub-tabs" v-model="subTabsVal">
                <el-tab-pane v-for="(mod, name) in confmobile" :key="name" v-if="mod.show"
                        :label="$t(`mobile.${name}`)" :name="name" :lazy="true">
                    <config-mobile
                        v-bind="{
                        conf: confm[name] ||[],
                        tabname: name,
                        ref: name }"
                    ></config-mobile>
                </el-tab-pane>
            </el-tabs>
            </div>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
import ConfigMobile from './ConfigMobile.vue'
// import confpc from "pa/home-config/config/config-pc";
// import confpc from "@/test/new_pc";
import confmobile from "./config/config-mobile"
import {accessPc, accessMobile} from "./fun"
export default {
    name:  "home-config-admin-staff",
    components: {ConfigPc, ConfigMobile},
    data(){
        return{
            tabsVal: 'pc',
            subTabsVal: 'home',
            // confpc: confpc.home,
            confpc: {
                show: [],
                hide: [[]],
                disable: [[]],
            },
            // confm: confmobile,
            confm: {},
            access: {}
        }
    },
    computed:{
        confmobile(){
            let conf= {
                home: {},
                wtpage: {
                    code: "TM"
                },
                xcpage: {
                    code: "PY"
                },
                minepage: {},
            }
            for(let key in conf){
                let code= conf[key].code
                if(!code || (code && this.access[code])){
                    conf[key].show= true
                }
            }
            return conf
        }
    },
    watch:{
        subTabsVal(name){
            if(!this.confm[name]) this.getMobile(name)
        }
    },
    mounted() {
        this.getPc()

        this.getMobile()
    },
    methods:{
        modaccess(name){
            console.log(name)

        },
        getPc(){
            // this.conf= conf.home
            // this.confpc= accessPc({conf: confpc})
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=PC").then(data=>{
                // this.confpc= accessPc({
                //     conf: confpc,
                //     modules:  data.modules
                // })
                this.confpc= accessPc(data)
            })
        },
        getMobile(type= "home"){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client",{params:{
                    flag: "Mobile", type
                }}).then(data=>{
                    // console.log(type, this.confm[type], data.conf)
                this.$set(this.confm,  type, this.getmd(accessMobile(data)))
                this.access= Object.assign({}, data.modules.contract_modules)
                    // this.confm[type]= data.conf
            })
        },
        getmd(arr){
            arr.forEach((mod)=>{
                _.mapObject(mod.pages,(pa, pak)=>{
                    let obj={}
                    pa.fields.forEach((it)=>{
                        Object.assign(obj, it)
                    })
                    pa.fields= obj
                })
            })
            return arr
        },
        setmd(update){
            let res={}
            for(let key in confmobile){
                // console.log("key", "["+key+"]")
                // console.log("this.$refs[key]", this.$refs[key])
                let ref= this.$refs[key]
                if(!ref){
                    continue
                }
                let arr= this.$f.deepClone(ref.list.show).concat(this.$f.deepClone(ref.list.hide))
                arr.forEach((mod)=>{
                    if(update && mod.disable){
                        mod.isuse= true
                    }
                    _.mapObject(mod.pages,(pa, pak)=>{
                        let arr=[]
                        _.mapObject(pa.fields, (fi, fik)=>{
                            // console.log("fi, fik", fi, fik)
                            arr.push({[fik]:fi})
                        })
                        pa.fields= arr
                        // console.log("arr", arr, pa.fields)
                    })
                })
                res[key]= arr
            }
            return res
        },
        save(){
            // this.$msgbox.confirm( "",{
            //     title: "确定保存？",
            //     callback:(action)=>{
            //         if(action=="confirm"){
            this.topost()

        },
        update(){
            this.$msgbox.confirm( "",{
                title: this.$t("index.title_force_update"),
                message: this.$t("index.msg_force_update"),
                callback:(action)=>{
                    if(action=="confirm"){
                        this.topost(true)
                    }
                }
            })
        },
        topost(update){
            let tasks= []
            let mdata= this.setmd(update)
            tasks.push((callback)=> {
                this.toreq({
                    "flag":"PC",
                    datas: {home: this.$refs.pchome.list}
                },(res)=>{
                    callback(null, res);
                }, update)
            })
            for(let key in mdata){
                tasks.push((callback)=> {
                    this.toreq({
                        "flag":"Mobile",
                        type: key,
                        datas: mdata[key]
                    },(res)=>{
                        callback(null, res);
                    }, update)
                })
            }
            async.parallel( tasks, (err, results)=> {
                this.$msg({message: results[0], type: "success"});
            });
        },
        toreq(data, cb, update){
            let url=update?
                "/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client":
                "/api/feishu_index_page/homePageConfControl/save";
            this.$axios.post(url, data,{dataKey: "msg"}).then(data=>{
                // console.log(data)
                if(cb) cb(data)
            })
        },
        back(){
            window.history.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./home-config.scss";

.home-config{
    .tbs{
        min-height: 500px;
        background-color: white;
        border-top: 1px solid $color-border;
        /deep/ .el-tabs__header.is-top{
            margin: 0;
            padding: 0 30px;
        }
    }
    .sub-tabs{
        margin-top: 30px;
        /deep/ .el-tabs__nav-scroll{
            text-align: center;
            .el-tabs__nav.is-top{
                float: none;
                .el-tabs__active-bar.is-top{
                    display: none;
                }
                .el-tabs__item.is-top{
                    line-height: 28px;
                    height: 30px;
                    padding: 0 20px;
                    border-radius: 15px;
                    margin: 0 10px;
                    &.is-active{
                        border: 1px solid $color-primary;
                    }
                }
            }
        }
    }
}
</style>