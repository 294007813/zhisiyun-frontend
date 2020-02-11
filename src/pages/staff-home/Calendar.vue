<template>
<div class="calendar">
    <h5>我的日历</h5>
    <vue-cal></vue-cal>
</div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
    name: "Calendar",
    components: {VueCal},
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/calendar/list").then(data=>{

            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "common";
.calendar{
    @include block;
    height: auto;
}
</style>