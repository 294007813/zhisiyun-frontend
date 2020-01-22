<template>
<div class="gtasks">
    <h5>待办事宜 <el-badge :value="17" class="item" type="primary"></el-badge></h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick">
        <el-tab-pane label="待办" name="gt">
            <ul class="ul">
                <li v-for="i in 10">
                    <p>任务/流程名称<em>(延时提交)</em></p>
                    <span>刚刚创建&nbsp;|&nbsp;限时3日10时</span>
                    <b>人事事件</b>
                </li>

            </ul>
        </el-tab-pane>
        <el-tab-pane label="已办" name="at">
            <ul class="ul at">
                <li v-for="i in 10">
                    <p>任务/流程名称<em>(延时提交)</em></p>
                    <span>刚刚创建&nbsp;|&nbsp;限时3日10时</span>
                    <b>人事事件</b>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: "GTasks",
    data(){
        return{
            activeTabs: 'gt'
        }
    },
    methods:{
        tabClick(){}
    }
}
</script>

<style scoped lang="scss">
@import "common";
.gtasks{
    @include block;
    .ul{
        padding: 0 20px;
        height: 100%;
        overflow: auto;
        li{
            padding: 10px 0;
            border-bottom: 1px solid $color-border;
            position: relative;
            &:last-child{ border: 0}
            p{
                margin-bottom: 10px;
                em{
                    color: $color-red;
                }
            }
            span{
                font-size: 12px;
                color: $color-gray;
            }
            b{
                position: absolute;
                top: 10px;
                right: 0;
            }
        }
        &.at *{
            color: $color-gray;
        }
    }
}
</style>