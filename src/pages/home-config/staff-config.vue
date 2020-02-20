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
import conf from "pa/home-config/config";
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
            this.conf= conf.home
            // this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{
            //     let list= data.conf.pc_conf[0].home
            //     let rule= data.modules.contract_modules
            //     this.mapMod(list, rule)
            //     this.conf= list
            // })
            // this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",{
            //     "flag":"PC",
            //     datas: conf
            // })
        },
        mapMod(list, rule){
            let no1= access(list.show, rule)
            let no2= access(list.hide, rule)
            list.hide[0]= list.hide[0].concat(no1, no2)
            function  access(list, rule){
                let noaccess= [], ind=[];
                list.forEach((it)=>{
                    ind= []
                    it.forEach((mod, i)=>{
                        _.mapObject(rule,(ru, key)=>{
                            if(mod.code==key && !ru){
                                mod.access=false
                                noaccess.push(mod)
                                ind.shift(i)
                            }else{
                                mod.access=true
                            }
                        })
                    })
                    ind.forEach((i)=>{
                        it.splice(i, 1)
                    })
                })
                return noaccess
            }
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