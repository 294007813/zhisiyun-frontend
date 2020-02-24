<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页配置</h2>
        <div class="button">
            <el-button size="small" @click="update">更新</el-button>
            <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
    </div>
    <el-tabs v-model="tabsVal" @tab-click="handleTbs" class="tbs zsy" >
        <el-tab-pane label="PC端" name="pc" :lazy="true">
            <div class="main">
                <config-pc :conf="conf" ref="pchome" :admin="true"></config-pc>
            </div>
        </el-tab-pane>
        <el-tab-pane label="移动端" name="mobile">
            <div class="main">
            <el-tabs  class="sub-tabs" v-model="subTabsVal" >
                <el-tab-pane label="员工首页" name="home" :lazy="true">
                    <config-mobile :conf="confm"></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="考勤首页" name="checkin" :lazy="true">
                    <config-mobile></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="角色管理" name="salary" :lazy="true">
                    <config-mobile></config-mobile>
                </el-tab-pane>
                <el-tab-pane label="我的页面" name="minepage" :lazy="true">
                    <config-mobile></config-mobile>
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
import conf from "pa/home-config/config";
import minepage from "./minepage"
export default {
    name:  "home-config-admin-staff",
    components: {ConfigPc, ConfigMobile},
    data(){
        return{
            tabsVal: 'pc',
            subTabsVal: 'staff',
            conf: conf.home,
            confm: minepage.minepage
        }
    },
    mounted() {
        this.getPc()
        this.getMobile()
    },
    methods:{
        handleTbs(){},
        getPc(){
            // this.conf= conf.home
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=PC").then(data=>{
                // this.conf= data.conf.pc_conf.home
            })
        },
        getMobile(){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=Mobile").then(data=>{

            })
        },
        save(){
            this.$msgbox.confirm( "",{
                title: "确定保存？",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.$axios.post("/api/feishu_index_page/homePageConfControl/save",{
                            "flag":"PC",
                            datas: this.$refs.pchome.list
                        },{dataKey: "msg"}).then(data=>{
                            console.log(data)
                            this.$msg({message: data, type: "success"});
                        })
                    }
                }
            })
        },
        update(){
            this.$msgbox.confirm( "",{
                title: "确定更新？",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",{
                            "flag":"PC",
                            datas: this.$refs.pchome.list
                        },{dataKey: "msg"}).then(data=>{
                            this.$msg({message: data, type: "success"});
                        })
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