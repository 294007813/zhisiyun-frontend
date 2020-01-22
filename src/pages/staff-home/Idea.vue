<template>
<div class="idea">
    <h5>意见箱</h5>
    <div>
        <img src="~as/img/staff-home/idea.svg">
        <p>已有<b>3</b>条意见</p>
        <el-button size="small" type="primary" plain class="but">投递意见</el-button>
    </div>
</div>
</template>

<script>
export default {
    name: "Idea",

}
</script>

<style scoped lang="scss">
@import "common";
.idea{
    @include block;
    div{
        padding-top: 40px;
        overflow: hidden;
        text-align: center;
        &:before{
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: $color-border;
            left: 0;
            top: 40px;
        }
        img{
            margin-top: 20px;
            height: 160px;
            margin-bottom: 20px;
        }
        p{
            font-size: 12px;
            color: $color-gray;
            margin-bottom: 6px;
            b{color: $color-black;}
        }
    }
}
</style>