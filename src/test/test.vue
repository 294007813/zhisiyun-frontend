<template>
    
</template>

<script>
    require("moment-precise-range-plugin");
    export default {
        name: "test",
        mounted() {
            let t= moment(moment().format("YYYY-MM-DD")).diff("2020-03-20")
            // console.log("diff", moment().diff(date).toObject())
            let o= moment.preciseDiff(moment().format("YYYY-MM-DD"), "2020-03-20", true);
            console.log("o", o)
        }
    }
</script>

<style scoped>

</style>