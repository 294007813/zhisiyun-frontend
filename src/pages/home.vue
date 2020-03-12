<template>
<div class="home">
    <router-link to="/usersetting" tag="div">点击进入员工配置</router-link>
    <router-link to="/adminsetting" tag="div">点击进入管理员配置</router-link>
    <router-link to="/home" tag="div">点击进入首页</router-link>
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