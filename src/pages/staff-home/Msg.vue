<template>
<div class="msg">
    <h5 class="unread-num" @click="$f.href('/pc_message_list')">{{$t("index.message_dynamics")}} <el-badge :value="message_count" class="item" type="primary"></el-badge></h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick" class="block-tabs">
        <el-tab-pane :label="$t('index.unread')" name="gt" v-if="figt">
            <ul class="ul" v-nodata="{have: gt.list&& gt.list.length}">
               <div v-infinite-scroll="getData" :infinite-scroll-disabled="gt.disabled">
                    <li v-for="(item, i) in gt.list" :key="i" :ll="item.pc_url" @click="viewDetail(item._id, item.pc_url)">
                        <template>
                            <p>{{item.create_tm | relativedate}}前</p>
                            <div>
    <!--                            <img class="head" src="~as/img/staff-home/head-M.png"/>-->
                                <span>{{item.msg}}</span>
                            </div>
                        </template>
                    </li>

                    <p class="view-all" v-if="gt.disabled" @click="$f.href('/pc_message_list')">点击查看更多消息</p>
               </div>
            </ul>

        </el-tab-pane>
        <el-tab-pane :label="$t('index.readed')" name="at" v-if="fiat">
            <ul class="ul at" v-nodata="{have: at.list&& at.list.length}">
                <div v-infinite-scroll="getData" :infinite-scroll-disabled="at.disabled">
                    <li v-for="(item, i) in at.list" :key="i" @click="$f.href(item.pc_url)">
                        <template>
                            <p>{{item.create_tm | relativedate}}前</p>
                            <div>
    <!--                            <img class="head" src="~as/img/staff-home/head-M.png"/>-->
                                <span>{{item.msg}}</span>
                            </div>
                        </template>
                    </li>

                    <p class="view-all" v-if="at.disabled" @click="$f.href('/pc_message_list')">点击查看更多消息</p>
                </div>
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
            gt: {
                list: [],
                page: 0,
                disabled: false,
            },
            at: {
                list: [],
                page: 0,
                disabled: false,
            },
            limit: 5
        }
    },
    computed:{
        figt(){
            let data= this.conf.pages.gt
            return data&& data.able && data.show && data.fields
        },
        fiat(){
            let data= this.conf.pages.at
            return data&& data.able && data.show && data.fields
        },
        message_count() {
            return  this.$store.state.user.taskMessageCount.message_count || 0
        }
    },
    mounted(){
        this.activeTabs= this.figt && 'gt' || this.fiat && 'at'
        // this.getData()
        // this.getData(1)
    },
    methods:{
        tabClick(){
            if (!this[this.activeTabs].disabled && !this[this.activeTabs].page)
                this.getData()
        },
        getData(){
            let type = this.activeTabs       
            let page = this[type].page

            this.$axios.get("/api/feishu/news/newslist", {params: {status: type == 'gt' ? 0 : 1, from: "new_pc_index", page: page + 1, limit: this.limit}}).then(data=>{               
                if (Math.ceil(data.total / this.limit) <= this[type].page) {
                    this[type].disabled = true
                } else {
                    this[type].page++ 
                }

                data.list = adapter.wx_data_adapter(data.list)
                this[type].list = this[type].list.concat(data.list)
            })
        },
        viewDetail(newsId, pc_url){ //TODO 点击后，未读消息数量 -1，需要重新调用全局的消息数量接口
            if (this.activeTabs == "gt") //未读消息，点击设为已读
                this.$axios.get("/api/feishu/news/setread", {params: {sign: "single", newsId}}, {dataLevel:'api'}).then(data => {
                    if (data && data.num > 0) {
                        this.$f.href(pc_url)
                    }
                })
        }
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
            min-height: 70px;
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
                /*padding-left: 50px;*/
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
                    margin-bottom: 10px;
                }
            }

        }
        .view-all{
            padding: 16px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            color: #999;
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