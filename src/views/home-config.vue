<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页模块配置</h2>
        <p>操作提示：● 列表页的操作提示信息  ● 好多提示信息内容写到这里</p>
    </div>
    <div class="main">
        <home-config-pc></home-config-pc>
    </div>

</div>
</template>

<script>
import HomeConfigPc from '@/components/HomeConfigPc.vue'
export default {
    name: 'home-config',
    components: {
        HomeConfigPc
    }
}
</script>

<style scoped lang="scss">
.home-config{
    background-color: #f2f2f2;
    .head{
        padding: 14px 0 0 20px;
        background-color: white;
        >*{line-height: 34px}
        h2{
            font-weight: 700;
            text-decoration: none;
            color: #272727;
            font-size: 16px;
        }
        p{
            color: #000000a5;
            font-size: 14px;
        }
    }
    .main{
        padding: 20px;
        /*background-color: white;*/
        /*min-height: 500px;*/
    }
}
</style>