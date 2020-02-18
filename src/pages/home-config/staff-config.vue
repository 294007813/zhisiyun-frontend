<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页PC端布局及设置</h2>
        <div class="button">
<!--            <span class="confirm-btn btn">保存</span>-->
            <el-button type="primary" size="small">保存</el-button>
        </div>
    </div>
    <div class="main">
        <config-pc></config-pc>
    </div>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
export default {
    name: 'home-config-staff',
    components: {ConfigPc},
    mounted() {
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{

            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
</style>