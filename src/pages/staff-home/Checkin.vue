<template>
    <div class="checkin">
        <ul class="sta">
            <h5>本月考勤统计<i class="iconfont iconyoujiantou"></i></h5>
            <li>
                <p>23<b>天</b></p>
                <span>出勤天数</span>
            </li>
            <li>
                <p>0<b>天</b></p>
                <span>请假</span>
            </li>
            <li>
                <p>1<b>次</b></p>
                <span>迟到早退</span>
            </li>
            <li>
                <p>23<b>次</b></p>
                <span>缺卡</span>
            </li>
        </ul>
        <ul class="balance">
            <h5>假期余额<i class="iconfont iconyoujiantou"></i></h5>
            <li>
                <p>16<b>时</b></p>
                <span>年假余额</span>
            </li>
            <li>
                <p>0<b>时</b></p>
                <span>调休假余额</span>
            </li>
        </ul>
        <ul class="flow">
            <h5>考勤流程<i class="iconfont iconyoujiantou"></i></h5>
            <li><el-button size="small" type="primary" plain>请假</el-button></li>
            <li><el-button size="small" type="primary" plain>加班</el-button></li>
            <li><el-button size="small" type="primary" plain>出差</el-button></li>
            <li><el-button size="small" type="primary" plain>公干</el-button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Checkin"
}
</script>

<style scoped lang="scss">
@import "common";
.checkin{
    padding: 6px 20px;
    ul{
        padding-top: 10px;
        height: 1/3*100%;
        &:not(:last-child){border-bottom: 1px solid $color-border;}
        h5{
            margin-bottom: 14px;
            position: relative;
            left: 0;
            top: 0;
            i{
                font-weight: 400;
                color: $color-gray;
                font-size: 12px;
                position: absolute;
                right: -10px;
                padding: 10px;
                cursor: pointer;
                top: 50%;
                transform: translateY(-50%);
                vertical-align: middle;
            }
        }
        li{
            width: 25%;
            text-align: center;
            display: inline-block;
        }
    }
    .sta,.balance{
        li{
            p{
                font-size: 16px;
                margin-bottom: 4px;
                b{ font-size: 12px; margin-left: 6px}
            }
            span{ font-size: 12px}
        }
    }
}
</style>