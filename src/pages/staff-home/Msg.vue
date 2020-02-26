<template>
<div class="msg">
    <h5>消息动态 <el-badge :value="gt.total" class="item" type="primary"></el-badge></h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick">
        <el-tab-pane label="未读" name="gt" v-if="figt">
            <ul class="ul">
                <li v-for="(item, i) in gt.list" :key="i">
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
        <el-tab-pane label="已读" name="at" v-if="fiat">
            <ul class="ul at">
                <li v-for="(item, i) in at.list" :key="i">
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
                    /*margin: 10px 0;*/
                }
            }

        }
        &.at *{
            color: $color-gray;
        }
    }
}
</style>