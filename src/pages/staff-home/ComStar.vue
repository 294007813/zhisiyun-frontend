<template>
<div class="com-star">
    <h5>{{$t("index.star_company")}}</h5>
    <el-input class="query" size="mini" :placeholder="$t('index.keyword_search')"
              @keydown.enter.native="enter"
              v-model="query" v-if="field.query">
              <el-button slot="append" icon="el-icon-search"  @click="toquery(query)"></el-button></el-input>
    <div class="db" v-nodata="{have: list.length}">
        <swiper :options="op" class="swiper" ref="swiper" v-if="list.length">
            <swiper-slide v-for="(it, i) in list" :key="i">
                <div :class="{ssb: true, size}">
                    <div class="left">
                        <!-- <i>NO.1</i> -->
                        <p class="medal" @click="openmedal(it.people.reward_punishs)"><i class="iconfont iconxunzhangtubiao"></i>{{it.people.reward_punishs.length}}{{$t("index.number")}}</p>
                        <img :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`"/>
<!--                        <avatar :src="`${$conf.baseApi}/gridfs/get/${it.people.avatar}`" :sex="it.people.gender"></avatar>-->
                        <p class="name">{{it.people.people_name}}</p>
                        <div class="interaction">
                            <div class="label-item" @click.stop="handleLike(it._id, it.likes)">
                                <i class="fa fa-heart" :class="{'active': it.likes.includes(userId)}"></i>
                                <span>{{it.likes.length}}</span>
                            </div>
                            <div class="label-item" @click="handleComment(it)">
                                <i class="fa fa-comment"></i>
                                <span>{{it.comments.length}}</span>
                            </div>
                        </div>
                    </div>
                    <ul class="info">
                        <li><label>{{$t("index.work_number")}}：</label><span>{{it.people.people_no}}</span></li>
                        <li><label>{{$t("index.department")}}：</label><span>{{it.people.ou_name}}</span></li>
                        <li><label>{{$t("index.position")}}：</label><span>{{it.people.position_name}}</span></li>
<!--                        <li><label>部门/职位：</label>信息技术部/开发总监</li>-->
                        <li><label>{{$t("index.entry_data")}}：</label><span>{{moment(it.people.start_service_date).format("YYYY-MM-DD")}}</span></li>
                        <li><label>{{$t("index.birthday")}}：</label><span>{{moment(it.people.birthday).format("MM月DD日")}}</span></li>
                        <li><label>{{$t("index.constellation")}}：</label><span>{{it.people.zodiac}}</span></li>
                    </ul>
                </div>
            </swiper-slide>
            <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('swiper', true)"></i>
            <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('swiper')"></i>
        </swiper>
    </div>
    <el-dialog
        title="勋章墙"
        :visible.sync="medalshow"
        custom-class="medalwall"
        :append-to-body="true"
        width="400px">
        <ul style="min-height: 200px" v-nodata="{have: medal.length, msg:'暂无勋章'}">
            <li v-for="(it, ind) in medal">
                <i class="tag"><span>奖</span></i>
                <img :src="$conf.linkUrl+it.reward_punish.rap_medal"/>
                <p>{{it.reward_punish.rap_name}}</p>
                <span>{{getdate(it.current_time)}}获得</span>
            </li>
        </ul>
        <p slot="footer" class="footer">
            <el-button type="primary" size="small" @click="medalshow=false">确认</el-button>
        </p>
    </el-dialog>
    <el-dialog
        :title='$t("index.star_company")'
        :visible.sync="showCommentsModal"
        :append-to-body="true"
        width="640px">
        <div v-if="selectUser" class="comment-container">
            <div class="user-info left">
                <div class="img">
                    <img :src="$f.getPic(selectUser.people.avatar)"/>
                </div>
                <p class="name">{{selectUser.people.people_name}}</p>
                <div class="interaction">
                    <div class="label-item" style="background:transparent;"  @click.stop="handleLike(selectUser._id, selectUser.likes, 'modal')">
                        <i class="fa fa-heart" :class="{'active': selectUser.likes.includes(userId)}"></i>
                        <span>{{selectUser.likes.length}}</span>
                    </div>
                    <div class="label-item" style="background:transparent;" @click="showCommentsModal=true">
                        <i class="fa fa-comment"></i>
                        <span>{{this.comments.length}}</span>
                    </div>
                </div>
                <ul class="info">
                    <li :title="selectUser.people.people_no"><label>{{$t("index.work_number")}}：</label>{{selectUser.people.people_no}}</li>
                    <li :title="selectUser.people.position_name"><label>{{$t("index.position")}}：</label>{{selectUser.people.position_name}}</li>
                    <li :title="selectUser.people.ou_name"><label>{{$t("index.department")}}：</label>{{selectUser.people.ou_name}}</li>
                    <li :title="moment(selectUser.people.start_service_date).format('YYYY-MM')"><label>{{$t("index.entry_data")}}：</label>{{moment(selectUser.people.start_service_date).format("YYYY-MM")}}</li>
                    <li :title="moment(selectUser.people.birthday).format('MM月DD日')"><label>{{$t("index.birthday")}}：</label>{{moment(selectUser.people.birthday).format("MM月DD日")}}</li>
                    <li :title="selectUser.people.zodiac"><label>{{$t("index.constellation")}}：</label>{{selectUser.people.zodiac}}</li>
                </ul>
            </div>
            <div class="comment right">
                    <div class="comments_wrap">
                        <textarea placeholder="说点什么" class="desc" v-model="currentComments"></textarea>
                        <div>
                            <button class="btn_save btn-blue pull-right" style="cursor:pointer; float:right; z-index:9;" @click="toComment">评论</button>
                            <span class="btn-emotion">
                                <i class="icon-smile"></i>
                                <emotion :visible.sync="visible" @send-face="reciveFace" />
                            </span>
                        </div>
                    </div>
                    <ul style="height: 320px;overflow-y: auto;" class="comments_list" type="star">
                        <li v-for="item in comments" :key="item._id">
                            <div class="img">
                                <img :src="$f.getPic(selectUser.people.avatar)"/>
                            </div>
                            <div class="meida-body">
                                <div class="media-body">
                                    <div class="title">
                                        <span class="people_name">
                                            {{item.people.people_name}}
                                        </span>
                                        <span class="date">
                                            {{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}}
                                        </span>
                                    </div>
                                    <div class="comment_content"  v-html="parseEmotion(item.desc)">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
            </div>
        </div>
    </el-dialog>

</div>
</template>

<script>
const API_LIKE = '/admin/culture/likes/bb/';
const API_COMMENT = '/admin/culture/comment/bb';

import emotion from "@/components/emotion";
import emotionData from "@/components/emotions.js";

const emotionsMap = {};
emotionData.forEach(element => {
    emotionsMap[element.phrase] = element.url;
});


export default {
    name: "ComStar",
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
                preventClicks: false,
                allowTouchMove: false
            },
            list: [],
            decoy: [],
            // 勋章墙
            medalshow: false,
            medal:[],
            // 点赞和评论
            userId: "",
            showCommentsModal: false,
            selectUser: null,
            currentComments: "",
            comments: [],
            visible: false
        }
    },
    watch: {
        query() {
            this.list = this.decoy;
        }
    },
    computed:{
        field(){
            return this.conf.pages.default.fields
        }
    },
    mounted(){
        this.getData()
        this.getLikesStatus();
    },
    methods:{
        parseEmotion (text) {
            var html = text.replace(/<.*?>/g, function ($1) {
                $1 = $1.replace('[', '&#91;');
                $1 = $1.replace(']', '&#93;');
                return $1;
            }).replace(/\[[^\[\]]*?]/g, function ($1) {
                var url = emotionsMap[$1];
                if (url) {
                    return '<img class="sina-emotion" src="' + url + '" alt="' + $1 + '" />';
                }
                return $1;
            });
            return html;
        },
        reciveFace (face) {
            this.currentComments += face.title;
        },
        toComment() {
            if (!this.currentComments) return;
            this.$axios({
                url: API_COMMENT,
                method: "post",
                data: {
                    desc: this.currentComments,
                    tid: this.selectUser._id,
                    type: "star"
                }
            }).then(res => {
                this.currentComments = "";
                this.getComments();
            }).then(() => {
                this.getData();
            })
        },
        getComments () {
            this.$axios.get(API_COMMENT, {params: {tid: this.selectUser._id, type: 'star'}, dataLevel: 'all'}).then(res => {
                this.comments = res.data;
            })
        },
        // 获取点赞状态
        getLikesStatus () {
            // 假设可以获取到 userinfo，如果获取不到就要去重新请求接口
            const userId = this.$store.state.user.userinfo._id;
            if (!userId) {
                console.error("userinfo is not defined")
            }
            this.userId = userId;
        },
        // 点赞或许取消点赞
        handleLike (id, likes, type) {
            let state;
            if (likes.includes(this.userId)) {
                state = true;
                var ind = likes.findIndex(item => item == this.userId);
                likes.splice(ind, 1);
            } else {
                state = false;
                likes.push(this.userId);
            }
            this.$axios({
                method: "post",
                url: API_LIKE + id,
                data: {
                    self_like: "" + state,
                    type: "star"
                },
                dataLevel: 'all'
            }).then((res) => {
                // this.getData();
            })
        },
        handleComment (data) {
            this.selectUser = data;
            this.showCommentsModal = true;
            this.getComments();
        },
        // 打开勋章墙
        openmedal(reward_punishs){
            this.medal= reward_punishs
            this.$nextTick(()=>{
                this.medalshow= true
            })
        },
        getData(){
            this.$axios.get("/api/feishu/user/stardata_index").then(data=>{
                this.decoy = data;
                this.list= data
            })
        },
        enter(e){
            if (e.keyCode == 13) {
                this.toquery(this.query)
            }
        },
        toquery(val){
             this.list = this.list.filter(v => {
                let flag= false
                 if(
                     v.people.people_no.includes(val) ||
                     v.people.people_name.includes(val) ||
                     v.people.position_name.includes(val) ||
                     v.people.ou_name.includes(val) ||
                     v.people.zodiac.includes(val)

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
        getdate(date){
            return moment(date).format('YYYY-MM-DD');
        },
        moment: window.moment
    },
    components: {
        emotion
    }
}
</script>

<style scoped lang="scss">
@import "comstar&skillstar";
.com-star{
    @include style;
    .db .swiper .ssb{
        -moz-user-select: none;
        .left{
            background-color: #EDF8FF;
            padding-top: 30px;
            .medal{
                display: inline-block;
                padding: 0 5px;
                font-size: 12px;
                width: auto;
                height: 20px;
                line-height: 20px;
                vertical-align: middle;
                border-radius: 10px;
                background:linear-gradient(270deg,rgba(251,197,50,1) 0%,rgba(252,119,32,1) 100%);
                box-shadow:0px 1px 2px 0px rgba(0,0,0,0.1);
                color: white;
                cursor: pointer;
                i{
                    font-size: 10px;
                    margin-right: 4px;
                }
            }
            .name {
                font-size: 14px;
                margin-top: 5px;
            }
        }
        .info{
            display: inline-flex;
            flex-wrap: wrap;
            align-content: space-around;
            padding: 10px 20px;
            li{
                height: 20px;
                line-height: 20px;
                width: 50%;
                font-size: 12px;
                label{
                    color: $color-gray;
                }
            }
        }
    }
    .interaction {
        .label-item {
            display: inline-block;
            margin: 0 5px;
            width: 40px;
            line-height: 16px;
            height: 16px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            color: #666;
            font-size: 12px;
            text-align: center;
            box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            i {
                color: #aaaaaa;
                margin-right: 4px;
                &.active {
                    color: #f66;
                }
            }
        }
    }
}
/deep/.comment-container{
    -moz-user-select: none;
    display: flex;
    .left{
        background-color: #fff;
        padding: 40px;
        text-align: center;
        width: 340px;
        height: 400px;
        .name {
            font-size: 14px;
            margin-top: 5px;
        }
        .img {
            display: inline-block;
            box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
            width: 80px;
            height: 80px;
        }
        border-right: 1px solid #ddd;
    }
    .right {
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
        .comments_wrap {
            padding: 10px;
            background: #fff;
        }
        .comments_wrap .desc {
            width: 100%;
            box-sizing: border-box;
            border-radius: 0;
            height: 30px;
            border-color: #ddd;
            margin-bottom: 10px;
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 4px 6px;
        }
        .comments_wrap .btn-emotion {
            color: #666;
            font-size: 12px;
            cursor: pointer;
            display: inline-block;
            width: 120px;
        }
        .comments_wrap .btn_save {
            font-size: 12px;
            width: 48px;
            height: 24px;
        }
        .btn-blue {
            width: 90px;
            height: 30px;
            border-radius: 2px;
            background-color: #54c7fc;
            outline: none;
            font-size: 14px;
            color: #ffffff;
            border: none;
        }
        .comments_list {
            overflow-y: auto;
            font-size: 12px;
            flex: 1;
            li {
                margin: 0 10px;
                padding: 10px 0;
                font-size: 12px;
                border-bottom: 1px solid #eee;
            }
            .img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 8px;
                float: left;
            }
            .media-body {
                overflow: hidden;
                .title {
                    font-size: 12px;
                    .date {
                        color: #999;
                        font-size: inherit;
                    }
                    > span {
                        font-size: inherit;
                        font-weight: bold;
                    }
                }
                .comment_content {
                    color: #666;
                    line-height: 14px;
                    .sina-emotion {
                        height: 22px;
                        border: 0;
                        vertical-align: text-bottom;
                    }
                }
            }

        }
    }
    .info{
        display: inline-flex;
        flex-wrap: wrap;
        align-content: space-around;
        padding: 10px 20px;
        margin-top: 20px;
        li{
            height: 20px;
            line-height: 20px;
            width: 50%;
            font-size: 12px;
            text-align: left;
            margin-top: 20px;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            label{
                color: $color-gray;
            }
            span {
                white-space:nowrap;
            }
        }
    }
    .interaction {
        .label-item {
            display: inline-block;
            margin: 0 5px;
            width: 40px;
            line-height: 16px;
            height: 16px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            color: #666;
            font-size: 12px;
            text-align: center;
            box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            i {
                color: #aaaaaa;
                &.active {
                    color: #f66;
                }
                margin-right: 4px;
            }
        }
    }
}
.medalwall ul{
    /*padding: 10px;*/
    li{
        display: inline-block;
        width: 160px;
        height: 140px;
        margin: 15px 20px;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        border-radius: 4px;
        background-color: #fafafa;
        .tag{
            display: block;
            width: 0;
            height: 0;
            border-top: 42px solid #ffb142;
            border-right: 42px solid transparent;
            position: relative;
            color: #fff;
            span{
                position: absolute;
                margin-top: -38px;
                margin-left: 6px;
            }
        }
        img{
            margin-top: -30px;
            height: 80px;
        }
        >p{
            font-size: 14px;
            line-height: 20px;
            color: #666;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        >span{
            font-size: 12px;
            color: #999;
        }
    }
}

</style>

<style>
.com-star .el-input-group__append {
    background: #fff;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
