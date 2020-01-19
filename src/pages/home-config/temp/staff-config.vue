<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页模块配置</h2>
        <p>操作提示：● 列表页的操作提示信息  ● 好多提示信息内容写到这里</p>
        <div class="button">
            <span class="confirm-btn btn update">更新</span>
            <span class="confirm-btn btn">保存</span>
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
    components: {
        ConfigPc
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
</style>