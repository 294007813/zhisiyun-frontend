<template>
<div class="skill-star">
    <h5>{{$t("index.skill_star")}}</h5>
    <el-input class="query" size="mini" :placeholder="$t('index.keyword_search')"  
              @keydown.enter.native="enter"
              v-if="field.query" v-model="query">
              <el-button slot="append" icon="el-icon-search"  @click="toquery(query)"></el-button></el-input>
    <div class="db" v-nodata="{have: list.length}">
        <swiper :options="op" class="swiper" ref="swiper" v-if="list.length">
            <swiper-slide v-for="(item, i) in list" :key="i">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <img :src="`${$conf.baseApi}/gridfs/get/${item.avatar}`"
                             @click="$f.href('/admin/pm/pp_skill/'+ item._id)"/>
<!--                        <avatar :src="`${$conf.baseApi}/gridfs/get/${item.avatar}`" :sex="item.gender"></avatar>-->
                        <p>{{item.people_name}}</p>
                        <span>{{`${item.ou_name}/${item.position_name}`}}</span>
                    </div>
                    <ul class="info">
                        <p><b>{{getStar(item)}}</b>{{$t("index.praise")}}
                            <i v-if="field.like" class="fa fa-thumbs-up"
                                @click="$f.href('/admin/pm/pp_skill/'+ item._id)"></i></p>
                        <div class="skill">
                            <li v-for="(sk, j) in item.my_skills" :key="j" @click="like(item._id, sk.skill._id, sk.skill.skill_name)">
                                {{sk.skill.skill_name}}<b>{{sk.praise_peoples_number}}{{$t("index.praise")}}</b>
                            </li>
                        </div>
                    </ul>
                </div>
            </swiper-slide>
            <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('swiper', true)"></i>
            <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('swiper')"></i>
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
        conf:{},
    },
    data(){
        return{
            query: '',
            op:{},
            list: [],
            decoy: [],
        }
    },
    computed:{
        field(){
            return this.conf.pages.default.fields
        }
    },
    watch: {
        query() {
            this.list = this.decoy;
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("/api/feishu/user/skilldata_index").then(data=>{
                this.list= data;
                this.decoy = data;

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
            if(this.field.like){
                this.$axios.put('/admin/pm/skill/people_bb/' + people, {
                    skill_id: skill_id,
                    skill_name: skill_name
                }).then(res => {
                    this.getData()
                })
            }
        },
        enter(e){
            if (e.keyCode == 13) {
                this.toquery(this.query)
            }
        },
        toquery(val){
            this.list = this.list.filter(v => {
                let flag= false, skills= v.my_skills.map(it=> it.skill.skill_name.toLowerCase()).join("-")
                if(
                    v.people_name.includes(val) ||
                    skills.includes(val.toLowerCase()) ||
                    v.position_name.includes(val) ||
                    v.ou_name.includes(val)
                ){
                    flag= true
                }
                return flag
            });
        },
        next(ref, back){
            if(back){
                this.$refs[ref].swiper.slidePrev()
            }else{
                this.$refs[ref].swiper.slideNext()
            }
        },
    }
}
</script>

<style scoped lang="scss">
@import "comstar&skillstar";
.skill-star{
    @include style;
    /deep/ .el-input-group__append {
        background: #fff;
        padding-left: 10px;
        padding-right: 10px;
    }
    .db .swiper .ssb{
        background-color: $color-bg-light;
        .left{
            img{
                margin-top: 40px;
                cursor: pointer;
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
            .skill{
                max-height: 120px;
                overflow: hidden;
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
            .fa-thumbs-up{
                cursor: pointer;
            }
        }
    }
}
.skill-box{
    .content{
        padding: 40px 20px 20px;
        overflow: auto;
        height: 300px;
        position: relative;
        .query{
            position: absolute;
            width: 80%;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>
