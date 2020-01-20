<template>
    <div class="home">
        <router-link to="/staff-config" tag="div">点击进入员工首页配置</router-link>
        <router-link to="/admin-staff-config" tag="div">点击进入管理员员工首页配置</router-link>
        <router-link to="/staff-home" tag="div">点击进入员工首页</router-link>
    </div>
</template>

<script>

export default {
    name: 'home',

    }
</script>

<style lang="scss" scoped>
    .home{
        div{
            height: 30px;
            margin-bottom: 20px;
            cursor: pointer;
        }
    }
</style>