<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页PC端布局及设置</h2>
        <div class="button">
<!--            <span class="confirm-btn btn">保存</span>-->
            <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
    </div>
    <div class="main">
        <config-pc :conf="conf" ref="conf"></config-pc>
    </div>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
import moment from "moment";
export default {
    name: 'home-config-staff',
    components: {ConfigPc},
    data(){
        return{
            conf:{}
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData(){
            // console.log("moment", moment)
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{
                this.conf= data.conf[0].pc_conf[0].home
            })
        },
        save(){
            this.$msg.confirm( "",{
                title: "确定保存？",
                callback(action){
                    if(action=="confirm"){
                        this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",{
                            "flag":"PC",
                            datas: this.$refs.conf.list
                        })
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
</style>