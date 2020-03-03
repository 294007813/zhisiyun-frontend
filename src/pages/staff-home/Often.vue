<template>
<div class="often">
    <h5>{{$t("index.common_application")}}</h5>
    <ul>
        <li v-for="(item, key) in list" :key="key" v-show="!!item.uf_status" @click="$f.href(`${item.url}`)">
            <img :src="`/img/staff-home/${item.icon}`"/><p>{{item.name}}</p></li>
        <li class="add" @click="add"></li>
    </ul>

    <el-dialog
            :visible.sync="dishow"
            custom-class="dialog"
            width="630px">
        <p slot="title" class="title">{{$t("index.add_app")}}</p>
        <div class="content">
            <ul style="padding-top: 10px">
                <li v-for="(item, key) in list" :key="key" @click="change(item)">
                    <img :src="`/img/staff-home/${item.icon}`"/><p>{{item.name}}</p>
                    <i class="fa fa-check-circle" v-show="!!item.uf_status"></i>
                </li>
            </ul>
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
            list:[
                // {name: '出差申请', link: ''},
                // {name: '工作报告', link: ''},
                // {name: '绩效管理', link: ''},
                // {name: '加班申请', link: ''},
                // {name: '加班申请', link: ''},
                // {name: '考勤管理', link: ''},
                // {name: '考勤日志', link: ''},
                // {name: '考勤统计', link: ''},
                // {name: '流程管理', link: ''},
                // {name: '批量审批', link: ''},
                // {name: '培训管理', link: ''},
                // {name: '企业通讯录', link: ''},
                // {name: '签到报表', link: ''},
                // {name: '请假申请', link: ''},
                // {name: '人事管理', link: ''},
                // {name: '实时激励', link: ''},
                // {name: '协作任务', link: ''},
                // {name: '协作项目', link: ''},
                // {name: '行政管理', link: ''},
                // {name: '员工点赞', link: ''},
                // {name: '招聘管理', link: ''},
                // {name: '知识管理', link: ''},
                // {name: 'AI助手', link: ''},
            ],
            dishow: false
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/index/myapp/list?from=pc&type=all").then(data=>{
              console.log("datalist", data.paid);
               data.paid.map((v,i) => {
                 // 把AI放在第一位
                 if (v.code == "AI") {
                    data.paid.splice(i, 1);
                    data.paid[0] = v;
                 }
               })
                this.list= data.paid
            })
        },
        add(){
            this.dishow= true
        },
        change(item){
            item.uf_status= 1- item.uf_status
        },
        save(){
            let arr = [];
            for (let i of this.list) {
                if (i.uf_status) arr.push({
                    save_id: i.menu_code,
                    uf_status_pc: i.uf_status,
                    sequence_pc: i.sequence_pc
                })
            }
            // AI放置第一个
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
.often{
    @include block;
    height: auto;
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
</style>