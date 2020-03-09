<template>
<div class="often">
    <h5>{{$t("index.common_application")}}</h5>
    <ul>
        <li v-for="(item, key) in selectList" :key="key" v-show="!item || !!item.uf_status" @click="$f.href(`${item.url}`)">
            <img :src="`/img/staff-home/${item.icon}`"/><p>{{item.name}}</p></li>
        <li class="add" @click="add"></li>
    </ul>

    <el-dialog
            :visible.sync="dishow"
            custom-class="dialog"
            :append-to-body="true"
            width="630px">
        <p slot="title" class="title">{{$t("index.add_app")}}</p>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane label="可添加" name="yes">
                    <ul style="padding: 0">
                    <li v-for="(item, key) in list" :key="key" @click="change(item, key)">
                        <img :src="`/img/staff-home/${item.icon}`"/><p>{{item.name}}</p>
                        <i class="fa fa-check-circle" v-show="!!item.uf_status"></i>
                    </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="未购买" name="no">
                    <ul style="padding: 0">
                        <li v-for="(item, key) in dislist" :key="key" style="cursor: default">
                            <img :src="`/img/staff-home/${item.icon}`"/><p>{{item.name}}</p>
<!--                            <i class="fa fa-check-circle" v-show="!!item.uf_status"></i>-->
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>

        </div>
        <p slot="footer" class="footer">
            <el-button plain size="small" @click="dishow= false">{{$t("index.cancel")}}</el-button>
            <el-button type="primary" size="small" @click="save">{{$t("index.save")}}</el-button>
        </p>
    </el-dialog>

</div>
</template>

<script>
export default {
    name: "Often",
    data(){
        return{
            list:[],
            dishow: false
            ,selectList : [],
            activeName: "yes",
            dislist: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/index/myapp/list?from=pc&type=all").then(data=>{
               data.paid.map((v,i) => {
                 // 把AI放在第一位
                     if (v.menu_code == "AI_ASSESSITANT") {
                        data.paid.splice(i, 1);
                        data.paid.unshift(v);
                     }
                    if (v.uf_status) {
                        this.selectList.push(v)
                    }
               })
                this.list= data.paid
                this.dislist= data.unpaid
                // for (let i=0;i< data.paid.length;i++){
                //     let item = data.paid[i]
                //     if (item.uf_status) {
                //         this.selectList.push(item)
                //     }
                // }
            })
        },
        add(){
            this.dishow= true
        },
        change(item, key){
            item.uf_status= 1- item.uf_status
            let have = false
            let idx = 0

            for (let i = 0; i < this.selectList.length; i++) {                
                if (this.selectList[i].menu_code == item.menu_code) {
                    have = !have
                    idx = i
                }
            }

            if (!have) {
                this.selectList.push(item)
            } else {
                this.selectList.splice(idx, 1)
            }

            this.selectList.map((v,i) => {
                 // 把AI放在第一位
                if (v.menu_code == "AI_ASSESSITANT") {
                    this.selectList.splice(i, 1);
                    this.selectList.unshift(v);
                }
            })
        },
        save(){
            let arr = [];
            for (let i = 0; i< this.selectList.length; i++) {
                let item = this.selectList[i]
                if (item.uf_status) arr.push({
                    save_id: item.menu_code,
                    uf_status_pc: item.uf_status,
                    sequence_pc: item.sequence_pc
                })
            }
            this.$axios.post("/api/feishu/index/myapp/update", {data: arr}).then(data=>{
                // this.list= data
                this.dishow = false
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
@mixin icon(){
    ul{
        min-height: 172px;
        padding-top: 60px;
        overflow: hidden;
        &:before{
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: $color-border;
            left: 0;
            top: 40px;
        }
        li{
            display: inline-block;
            margin: 0 20px 20px;
            text-align: center;
            vertical-align: top;
            cursor: pointer;
            position: relative;
            img{
                width: 64px;
                height: 64px;
                object-fit: contain;
                margin-bottom: 10px;
            }
            p{
                font-size: 12px;
            }
            &.add{
                width: 64px;
                height: 64px;
                position: relative;
                border-radius: 100%;
                box-shadow:0px 4px 12px 0px rgba(0,0,0,0.12);
                &:before, &:after{
                    content: "";
                    width: 2px;
                    height: 30px;
                    background-color: $color-line-light;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                &:after{
                    width: 30px;
                    height: 2px;
                }
            }
            i{
                font-size: 24px;
                position: absolute;
                color: $color-green;
                right: 0;
                bottom: 20px;
            }
        }
    }
}
.often{
    @include block;
    height: auto;
    @include icon;
}
/deep/ .dialog{
    @include icon;
    ul:before{
        display: none;
    }
    .el-tabs{
        .el-tabs__header .el-tabs__nav-wrap{
            .el-tabs__nav{
                margin-left: 20px;
            }
        }

    }
}
</style>