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
            confpc: confpc.home,
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
    },
    methods:{
        getPc(){
            // this.conf= conf.home
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=PC").then(data=>{
                // this.conf= data.conf.pc_conf.home
            })
        },
        getMobile(type= "home"){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client",{params:{
                    flag: "Mobile", type
                }}).then(data=>{
                    this.confm[type]= data.conf
            })
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
        getmd(){
            let res={}
            for(let key in confmobile){
                let arr= this.$refs[key].list.show.concat(this.$refs[key].list.hide)
                arr.forEach((mod)=>{
                    _.mapObject(mod.pages,(pa, pak)=>{
                        let arr=[]
                        _.mapObject(pa.fields, (fi, fik)=>{
                            arr.push(fi)
                        })
                        pa.fields= arr
                    })
                })
                res[key]= arr
            }
            return res
        },
        save(){
            this.$msgbox.confirm( "",{
                title: "确定保存？",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.tosave({
                            "flag":"PC",
                            datas: this.$refs.pchome.list
                        })
                        let mdata= this.getmd()
                        for(let key in mdata){
                            this.tosave({
                                "flag":"Mobile",
                                type: key,
                                datas: mdata[key]
                            })
                        }

                    }
                }
            })
        },
        update(){
            this.$msgbox.confirm( "",{
                title: "确定更新？",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.toupdate({
                            "flag":"PC",
                            datas: this.$refs.pchome.list
                        })
                        let mdata= this.getmd()
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