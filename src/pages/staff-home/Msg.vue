<template>
<div class="msg">
    <h5>消息动态 <el-badge :value="17" class="item" type="primary"></el-badge></h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick">
        <el-tab-pane label="未读" name="gt">
            <ul class="ul">
                <li v-for="i in 10">
                    <p>xx小时前</p>
                    <div>
                        <img class="head" src="~as/img/staff-home/head.png"/>
                        <span>管理员 ACD 将“xxxxxxxxxx内容1”调整为“xxxxxxxcccccx内容”</span>
                    </div>
                </li>

            </ul>
        </el-tab-pane>
        <el-tab-pane label="已读" name="at">
            <ul class="ul at">
                <li v-for="i in 10">
                    <p>xx小时前</p>
                    <div>
                        <img class="head" src="~as/img/staff-home/head.png"/>
                        <span>管理员 ACD 将“xxxxxxxxxx内容1”调整为“xxxxxxxcccccx内容”</span>
                    </div>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: "Msg",
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
.msg{
    @include block;
    .ul{
        padding: 0 20px;
        height: 100%;
        overflow: auto;
        li{
            padding-top: 10px;
            border-bottom: 1px solid $color-border;
            position: relative;
            min-height: 90px;
            &:last-child{ border: 0}
            p{
                margin-bottom: 10px;
                font-size: 12px;
                color: $color-gray;
            }
            div{
                display: table-cell;
                position: relative;
                padding-left: 50px;
                img{
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    border-radius: 100%;
                }
                span{
                    vertical-align: middle;
                    display: inline-block;
                    margin: 10px 0;
                }
            }

        }
        &.at *{
            color: $color-gray;
        }
    }
}
</style>