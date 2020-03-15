<template>
<div class="msg">
    <h5 class="unread-num" @click="$f.href('/pc_message_list')">{{$t("index.message_dynamics")}} <el-badge :value="gt.total" class="item" type="primary"></el-badge></h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick" class="block-tabs">
        <el-tab-pane :label="$t('index.unread')" name="gt" v-if="figt">
            <ul class="ul" v-nodata="{have: gt.list&& gt.list.length}">
                <li v-for="(item, i) in gt.list" :key="i" @click="$f.href(item.pc_url)">
                    <template>
                        <p>{{item.create_tm | relativedate}}前</p>
                        <div>
                            <img class="head" src="~as/img/staff-home/head-M.png"/>
                            <span>{{item.msg}}</span>
                        </div>
                    </template>
                </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane :label="$t('index.readed')" name="at" v-if="fiat">
            <ul class="ul at" v-nodata="{have: at.list&& at.list.length}">
                <li v-for="(item, i) in at.list" :key="i" @click="$f.href(item.pc_url)">
                    <template>
                        <p>{{item.create_tm | relativedate}}前</p>
                        <div>
                            <img class="head" src="~as/img/staff-home/head-M.png"/>
                            <span>{{item.msg}}</span>
                        </div>
                    </template>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import adapter from 'li/message-url-transfer'
export default {
    name: "Msg",
    props: ["conf"],
    data(){
        return{
            activeTabs: 'gt',
            gt: {},
            at: {},
        }
    },
    computed:{
        figt(){
            let data= this.conf.pages.gt
            return data.able && data.show && data.fields
        },
        fiat(){
            let data= this.conf.pages.at
            return data.able && data.show && data.fields
        },
    },
    mounted(){
        this.activeTabs= this.figt && 'gt' || this.fiat && 'at'
        this.getData()
        this.getData(1)
    },
    methods:{
        tabClick(){},
        getData(status= 0){
            this.$axios.get("/api/feishu/news/newslist",{params:{status}}).then(data=>{
                data.list = adapter.wx_data_adapter(data.list)
                this[status? "at": "gt"]= data
            })
        },
    }
}
</script>

<style scoped lang="scss">
@import "common";
.msg{
    @include block;
    .unread-num{
        cursor: pointer;
    }
    .ul{
        padding: 0 20px;
        height: 100%;
        overflow: auto;
        li{
            padding-top: 10px;
            border-bottom: 1px solid $color-border;
            position: relative;
            min-height: 90px;
            cursor: pointer;
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
                    /*margin: 10px 0;*/
                }
            }

        }
        &.at *{
            color: $color-gray;
        }
    }
    /deep/ .el-badge{
        vertical-align: text-bottom;
        sup{
            vertical-align: top;
        }
    }
}
</style>