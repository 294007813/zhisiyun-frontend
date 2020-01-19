<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页模块配置</h2>
        <p>操作提示：● 列表页的操作提示信息  ● 好多提示信息内容写到这里</p>
        <div class="button">
            <span class="confirm-btn btn update">更新</span>
            <span class="confirm-btn btn">保存</span>
        </div>

    </div>
    <div class="main">

        <el-tabs v-model="tabsVal" @tab-click="handleTbs" class="tbs zsy" >
            <el-tab-pane label="PC端" name="pc" :lazy="true">
                <config-pc></config-pc>
            </el-tab-pane>
            <el-tab-pane label="移动端" name="mobile">
                <el-tabs tab-position="left" class="sub-tabs" v-model="subTabsVal" >
                    <el-tab-pane label="员工首页" name="staff" :lazy="true">
                        <config-mobile></config-mobile>
                    </el-tab-pane>
                    <el-tab-pane label="考勤首页" name="checkin" :lazy="true"></el-tab-pane>
                    <el-tab-pane label="角色管理" name="salary" :lazy="true"></el-tab-pane>
                    <el-tab-pane label="我的页面" name="my" :lazy="true"></el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>

    </div>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
import ConfigMobile from './ConfigMobile.vue'
export default {
    name:  "home-config-admin-staff",
    components: {ConfigPc, ConfigMobile},
    data(){
        return{
            tabsVal: 'mobile',
            subTabsVal: 'staff'
        }
    },
    methods:{
        handleTbs(){

        }
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
.tbs{
    min-height: 500px;
    background-color: white;
}
</style>
<style lang="scss">
@import "~as/styles/zsy-base";
.home-config{
    .tbs.zsy.el-tabs.el-tabs--top{
        .el-tabs__header.is-top{
            margin: 0 40px;
            .el-tabs__active-bar.is-top{
                min-width: 80px;
                background-color: $color-black;
                top: 0;
                bottom: auto;
            }
            .el-tabs__item.is-top{
                min-width: 100px;
                padding: 0 10px;
                text-align: center;
                color: $bg-color;
                line-height: 50px;
                height: 50px;
                &.is-active{
                    color: $color-black;
                }
            }
        }
    }
    .sub-tabs.el-tabs.el-tabs--left{
        margin-left: 20px;
        .el-tabs__header.is-left{
            margin-top: 100px;
            .el-tabs__active-bar.is-left{
                display: none;
            }
            .el-tabs__item.is-left{
                min-height: 100px;
                height: auto;
                width: 60px;
                white-space: normal;
                line-height: 24px;
                font-size: 18px;
                color: $bg-color;
                margin-bottom: 30px;
                &.is-active{
                    color: $color-black;
                }
            }
        }
    }
}
</style>