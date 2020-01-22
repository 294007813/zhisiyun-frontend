<template>
<div class="train">
    <ul class="to">
        <h6>培训统计<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>4</b>次</p>
            <span>参与培训</span>
        </li>
        <li>
            <p><b>8</b>场</p>
            <span>进行中的活动</span>
        </li>
    </ul>
    <ul class="bo">
        <h6>流程统计<i class="iconfont iconyoujiantou"></i></h6>
        <li>
            <p><b>23</b>条</p>
            <span>我发起的</span>
        </li>
        <li>
            <p><b>23</b>条</p>
            <span>我处理的</span>
        </li>
        <li>
            <p><b>23</b>条</p>
            <span>进行中的</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Train",

}
</script>

<style scoped lang="scss">
@import "train&contract";
.train{
   @include style;
}
</style>