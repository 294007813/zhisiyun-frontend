<template>
<div class="skill-star">
    <h5>{{$t("index.skill_star")}}</h5>
    <el-input class="query" size="mini" placeholder="输入关键词查询" suffix-icon="fa fa-search"
              v-if="field.query" v-model="query"></el-input>
    <div class="db" v-nodata="{have: list.length}">
        <swiper :options="op" class="swiper" ref="day">
            <swiper-slide v-for="(item, i) in list" :key="i">
                <div :class="{ssb: true, size}">
                    <div class="left">
<!--                        <img :src="`${$conf.baseApi}/gridfs/get/${item.avatar}`"/>-->
                        <avatar :src="`${$conf.baseApi}/gridfs/get/${item.avatar}`" :sex="item.gender"></avatar>

                        <p>{{item.people_name}}</p>
                        <span>{{`${item.ou_name}/${item.position_name}`}}</span>
                    </div>
                    <ul class="info">
                        <p><b>{{getStar(item)}}</b>{{$t("index.praise")}} <i v-if="field.like" class="fa fa-thumbs-up"></i></p>
                        <li v-for="(sk, j) in item.my_skills" :key="j" @click="like(item._id, sk.skill._id, sk.skill.skill_name)">{{sk.skill.skill_name}}<b>{{sk.praise_peoples_number}}{{$t("index.praise")}}</b></li>
                    </ul>
                </div>
            </swiper-slide>
            <!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
            <!--            <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
    </div>
</div>
</template>

<script>
export default {
    name: "SkillStar",
    props: {
        size:{
            default: 'half'
        },
        conf:{}
    },
    data(){
        return{
            query: '',
            op:{

            },
            list:[]
        }
    },
    computed:{
        field(){
            return this.conf.pages.default.fields
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/user/skilldata").then(data=>{
                this.list= data

            })
        },
        getStar(item){
            let star=0
            // item.position.competencies_client.map(it1=>{
            //     star+= it1.praise_peoples_number
            // })
            item.my_skills.map(it1=>{
                // star+= it1.score
                star += it1.praise_peoples_number
            })
            return star
        },
        like(people, skill_id, skill_name) {
            this.$axios.put('/admin/pm/skill/people_bb/' + people, {
                skill_id: skill_id,
                skill_name: skill_name
            }).then(res => {
                this.getData()
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "comstar&skillstar";
.skill-star{
    @include style;
    .db .swiper .ssb{
        background-color: $color-bg-light;
        .left{
            img{
                margin-top: 40px;
            }
            span{
                display: inline-block;
                margin-top: 4px;
                font-size: 12px;
                color: $color-gray;
            }
        }
        .info{
            display: inline-flex;
            flex-wrap: wrap;
            align-content: center;
            p{
                width: 100%;
                height: 30px;
                b{
                    font-size: 18px;
                    font-weight: 600;
                }
                i{
                    margin-left: 4px;
                    font-size: 24px;
                    background:linear-gradient(233deg,rgba(255,108,108,1) 0%,rgba(255,208,111,1) 100%);
                    -webkit-text-fill-color: transparent;
                    -webkit-background-clip: text;
                }
            }
            li{
                display: inline-block;
                white-space: nowrap;
                word-break: keep-all;
                line-height: 20px;
                padding: 0 14px;
                background: white;
                border-radius:10px;
                border:1px solid $color-line-light;
                margin: 0 6px 10px 0;
                font-size: 12px;
                cursor: pointer;
                b{
                    font-size: 12px;
                    font-weight: 600;
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>