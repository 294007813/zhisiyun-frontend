<template>
    <img :src="url" ref="img"/>
</template>

<script>
export default {
    name: "avatar",
    props:{
        src: {default: ""},
        sex: {default: "M"}
    },
    data(){
        return{
            path: ""
        }
    },
    computed:{
        url(){
            return this.path || this.sex=='F'? "./img/staff-home/head-F.png": "./img/staff-home/head-M.png"
        }
    },
    watch:{
        src(){
            this.getImg()
        }
    },
    mounted(){
        this.getImg()
    },
    methods:{
        getImg(){
            let img = new Image();
            img.onload= ()=>{
                this.path= this.src
                // console.log("img.src", img.src)
            }
            img.src= this.src

        },
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