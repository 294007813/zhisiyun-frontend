<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页配置</h2>
        <div class="button">
            <el-button size="small" @click="update">更新</el-button>
            <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
    </div>
    <el-tabs v-model="tabsVal" class="tbs zsy" >
        <el-tab-pane label="PC端" name="pc" :lazy="true">
            <div class="main">
                <config-pc :conf="confpc" ref="pchome" :admin="true"></config-pc>
            </div>
        </el-tab-pane>
        <el-tab-pane label="移动端" name="mobile">
            <div class="main">
            <el-tabs  class="sub-tabs" v-model="subTabsVal">
                <el-tab-pane label="员工首页" name="home" :lazy="true">
                    <config-mobile :conf="confm.home" modname="home" ref="home"></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="考勤首页" name="wtpage" :lazy="true">
                    <config-mobile :conf="confm.wtpage" modname="wtpage" ref="wtpage"></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="工作首页" name="workpage" :lazy="true">
                    <config-mobile :conf="confm.workpage" modname="workpage" ref="workpage"></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="薪酬首页" name="xcpage" :lazy="true">
                    <config-mobile :conf="confm.xcpage" modname="xcpage" ref="xcpage"></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="我的页面" name="minepage" :lazy="true">
                    <config-mobile :conf="confm.minepage" modname="minepage" ref="minepage"></config-mobile>
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
import confpc from "pa/home-config/config/config-pc";
import confmobile from "./config/config-mobile"
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
        // for(let key in confmobile){
        //     this.toupdate({
        //         "flag":"Mobile",
        //         type: key,
        //         datas: confmobile[key]
        //     })
        // }
        // this.$set(this.confm,  "home", this.getmd(confmobile.home))
    },
    methods:{
        getPc(){
            // this.conf= conf.home
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=PC").then(data=>{
                this.confpc= data.conf.home
            })
        },
        getMobile(type= "home"){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client",{params:{
                    flag: "Mobile", type
                }}).then(data=>{
                    // console.log(type, this.confm[type], data.conf)
                this.$set(this.confm,  type, this.getmd(data.conf))
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
        tosave(data, cb){
            this.$axios.post("/api/feishu_index_page/homePageConfControl/save",data,{dataKey: "msg"}).then(data=>{
                // console.log(data)
                this.$msg({message: data, type: "success"});
                if(cb) cb()
            })
        },
        toupdate(data, cb){
            this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",data,{dataKey: "msg"}).then(data=>{
                // console.log(data)
                this.$msg({message: data, type: "success"});
                if(cb) cb()
            })
        },
        setmd(){
            let res={}
            for(let key in confmobile){
                // console.log("key", "["+key+"]")
                // console.log("this.$refs[key]", this.$refs[key])
                let ref= this.$refs[key]
                if(!ref){
                    continue
                }
                let arr= JSON.parse(JSON.stringify(ref.list.show)).concat(JSON.parse(JSON.stringify(ref.list.hide)))
                arr.forEach((mod)=>{
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
                        this.tosave({
                            "flag":"PC",
                            datas: {home: this.$refs.pchome.list}
                        })
                        let mdata= this.setmd()
            // console.log("mdata", mdata)
                        for(let key in mdata){
                            this.tosave({
                                "flag":"Mobile",
                                type: key,
                                datas: mdata[key]
                            })
                        }

            //         }
            //     }
            // })
        },
        update(){
            this.$msgbox.confirm( "",{
                title: "确定要强制更新所有员工的配置和布局？",
                message: "强制更新后不可撤回，请谨慎操作。",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.toupdate({
                            "flag":"PC",
                            datas: {home: this.$refs.pchome.list},
                            // datas: confpc,
                        })
                        let mdata= this.setmd()
                        for(let key in mdata){
                            this.toupdate({
                                "flag":"Mobile",
                                type: key,
                                datas: mdata[key]
                            })
                        }
                    }
                }
            })
        }

    }
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