<template>
<div class="often">
    <h5>常用应用</h5>
    <ul>
        <li v-for="(item, key) in list" :key="key">
            <img :src="`/img/staff-home/${item.name}.png`"/><p>{{item.name}}</p></li>
        <li class="add"></li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Often",
    data(){
        return{
            list:[
                {name: '出差申请', link: ''},
                {name: '工作报告', link: ''},
                {name: '绩效管理', link: ''},
                {name: '加班申请', link: ''},
                {name: '加班申请', link: ''},
                {name: '考勤管理', link: ''},
                {name: '考勤日志', link: ''},
                {name: '考勤统计', link: ''},
                {name: '流程管理', link: ''},
                {name: '批量审批', link: ''},
                {name: '培训管理', link: ''},
                {name: '企业通讯录', link: ''},
                {name: '签到报表', link: ''},
                {name: '请假申请', link: ''},
                {name: '人事管理', link: ''},
                {name: '实时激励', link: ''},
                {name: '协作任务', link: ''},
                {name: '协作项目', link: ''},
                {name: '行政管理', link: ''},
                {name: '员工点赞', link: ''},
                {name: '招聘管理', link: ''},
                {name: '知识管理', link: ''},
                {name: 'AI助手', link: ''},
            ]
        }
    },
    methods:{

    }
}
</script>

<style scoped lang="scss">
@import "common";
.often{
    @include block;
    height: auto;
    ul{
        min-height: 172px;
        padding-top: 60px;
        overflow: hidden;
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
        li{
            display: inline-block;
            margin: 0 20px 20px;
            text-align: center;
            vertical-align: top;
            img{
                width: 64px;
                height: 64px;
                object-fit: contain;
                margin-bottom: 10px;
            }
            p{
                font-size: 12px;
            }
            &.add{
                width: 64px;
                height: 64px;
                position: relative;
                border-radius: 100%;
                box-shadow:0px 4px 12px 0px rgba(0,0,0,0.12);
                cursor: pointer;
                &:before, &:after{
                    content: "";
                    width: 2px;
                    height: 30px;
                    background-color: $color-line-light;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                &:after{
                    width: 30px;
                    height: 2px;
                }
            }
        }
    }
}
</style>