<template>
    <el-image class="avatar"
        :src="src"
        :fit="fit"
        @error="error">
        <img v-show="sex=='M'" slot="error" src="/img/staff-home/head-M.png"/>
        <img v-show="sex=='F'" slot="error" src="/img/staff-home/head-F.png"/>
    </el-image>
</template>

<script>
export default {
    name: "avatar",
    props:{
        fit: {default: "cover"},
        src: {default: ""},
        sex: {default: "M"}
    },
    data(){
        return{
            url:""
        }
    },
    methods:{
        error(){
            this.$emit("error")
        }
    }
}
</script>

<style scoped lang="scss">
.avatar{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>