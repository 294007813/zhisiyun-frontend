<template>
<div class="birthday">
    <h5>{{$t("index.birthday_blessing_wall")}}</h5>
    <el-tabs v-model="activeTabs" class="block-tabs">
        <el-tab-pane :label="`${$t('index.this_month')}(${mon.length||0}${$t('index.num')})`" name="mon" v-if="fimon">
            <p class="mon-title">{{curMonth}}</p>
            <swiper :options="monOptions" v-if="mon.peoples && mon.peoples.length"
                    class="mon-swiper" ref="mon" @someSwiperEvent="callback">
                <swiper-slide class="mon-slide" v-for="(bd, i) in mon.peoples" :key="i">
                    <ul class="mon">
                        <p class="title">{{moment(bd.end_date).format("D")}}<b>{{moment(bd.end_date).format("dd")}}</b></p>
                        <li  v-for="(item, j) in bd.items" :key="i+'-'+j" @click="select(item)">
                            <img class="head"  :src="$f.getPic(item.people.avatar)"/>
                            <!--<avatar class="head"  :src="$f.getPic(item.people.avatar)" :sex="item.people.gender"></avatar>-->
                            <span>{{item.people.people_name}}</span>
                            <div class="interaction">
                                <div class="label-item" @click.stop="handleLike(item._id, item.likes)">
                                    <i class="fa fa-heart" :class="{'active': item.likes.includes(userId)}"></i>
                                    <span>{{item.likes.length}}</span>
                                </div>
                                <div class="label-item">
                                    <i class="fa fa-comment" @click.stop="handleComment(item)"></i>
                                    <span>{{item.comments.length}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </swiper-slide>
                <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('mon', true)"></i>
                <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('mon')"></i>
            </swiper>
            <div v-else v-nodata="{have: mon.peoples&& mon.peoples.length}"></div>
        </el-tab-pane>
        <el-tab-pane :label="`${$t('index.today')}(${day.length||0}${$t('index.num')})`" name="day" v-if="fiday" >
            <swiper :options="dayOptions" v-if="day.peoples && day.peoples.length"
                    class="day-swiper" ref="day" @someSwiperEvent="callback">
                <swiper-slide v-for="(item, i) in day.peoples[0].items" :key="i">
                    <div :class="{day: true, size}" @click="select(item)">
                        <div class="left">
                            <img class="hb" src="~as/img/staff-home/happy-birthday.svg"/>
                            <img class="cake" src="~as/img/staff-home/cake.svg"/>
                            <p>今天是TA的生日</p>
                        </div>
                        <div class="photo">
                            <avatar class="head"  :src="$f.getPic(item.people.avatar)" :sex="item.people.gender"></avatar>
                            <img class="crown" src="~as/img/staff-home/crown.svg"/>
                            <p>{{item.people.people_name}}</p>
                            <span>{{`${item.people.ou_name}/${item.people.position_name}`}}</span>
                            <div class="interaction">
                                <div class="label-item" @click.stop="handleLike(item._id, item.likes)">
                                    <i class="fa fa-heart" :class="{'active': item.likes.includes(userId)}"></i>
                                    <span>{{item.likes.length}}</span>
                                </div>
                                <div class="label-item" @click.stop="handleComment(item)">
                                    <i class="fa fa-comment"></i>
                                    <span>{{item.comments.length}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <i class="fa fa-angle-left swiper-button" slot="button-prev" @click="next('day', true)"></i>
                <i class="fa fa-angle-right swiper-button" slot="button-next" @click="next('day')"></i>
            </swiper>
            <div v-else v-nodata="{have: day.peoples&& day.peoples.length}"></div>
        </el-tab-pane>
        
    </el-tabs>

    <el-dialog
            :title="(p.people &&p.people.people_name)+'的生日'"
            :visible.sync="pshow"
            custom-class="birthday-detail"
            :append-to-body="true"
            width="700px">
        <div :class="{day: true, size}" v-if="p.people">
            <div class="left">
                <img class="hb" src="~as/img/staff-home/happy-birthday.svg"/>
                <img class="cake" src="~as/img/staff-home/cake.svg"/>
                <p>{{moment(p.people.birthday).format("M月D日")}}是TA的生日</p>
            </div>
            <div class="photo" >
                <img class="head" :src="$f.getPic(p.people.avatar)"/>
<!--                <avatar class="head" :src="$f.getPic(p.people.avatar)" :sex="p.people.gender"></avatar>-->
                <img class="crown" src="~as/img/staff-home/crown.svg"/>
                <p>{{p.people.people_name}} <span>{{p.people.people_no}}</span></p>
                <span>{{`${p.people.ou_name}/${p.people.position_name}`}}</span>
                <span>{{moment(p.people.start_service_date).format("YY年M月D日")}}入职</span>
                <span>{{p.people.zodiac}}</span>
            </div>
        </div>
        <p slot="footer" class="footer">
            <el-button type="primary" size="small" @click="pshow=false">{{$t("index.know")}}</el-button>
        </p>
    </el-dialog>
    <el-dialog
        :title='$t("index.birthday_blessing_wall")'
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
                    <div class="label-item" style="background:transparent; box-shadow:none;" @click.stop="handleLike(selectUser._id, selectUser.likes)">
                        <i class="fa fa-heart" :class="{'active': selectUser.likes.includes(userId)}"></i>
                        <span>{{selectUser.likes.length}}</span>
                    </div>
                    <div class="label-item" style="background:transparent; box-shadow:none;">
                        <i class="fa fa-comment" @click="showCommentsModal=true"></i>
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
                            <span class="btn-emotion"><i class="icon-smile"></i>表情</span>
                            <button class="btn_save btn-blue pull-right" style="cursor:pointer;" @click="toComment">评论</button>
                        </div>
                    </div>
                    <ul style="height: 320px;overflow-y: auto;" class="comments_list" type="star">
                        <li v-for="item in comments" :key="item._id">
                            <div class="img">
                                <img :src="$f.getPic(item.people.avatar)" />
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
                                    <div class="comment_content">
                                        {{item.desc}}
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

export default {
    name: "Birthday",
    props: {
        size:{
            default: 'half'
        },
        "conf":{}
    },
    data(){
        return{
            activeTabs: 'mon',
            dayOptions:{
                watchOverflow: true,
                // prevButton: '.swiper-button-prev',
                // nextButton: '.swiper-button-next',
            },
            monOptions:{
                slidesPerView : "auto",
                spaceBetween : 20,
                slidesOffsetBefore : 20,
                slidesOffsetAfter : 20,
                // prevButton:'.swiper-button-prev',
                // nextButton:'.swiper-button-next',
            },
            pshow: false,
            p:{},
            day: {},
            mon: {},
            // 点赞和评论
            userId: "",
            showCommentsModal: false,
            selectUser: null,
            currentComments: "",
            comments: []
        }
    },
    computed:{
        fiday(){
            let data= this.conf.pages.day
            return data&& data.able && data.show && data.fields
        },
        fimon(){
            let data= this.conf.pages.mon
            return data&& data.able && data.show && data.fields
        },
        curMonth (){
            return new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月"
        }
    },
    mounted(){
        this.activeTabs=  this.fimon && 'mon' || this.fiday && 'day'
        this.getData();
        this.getData("month");
        this.getLikesStatus();
    },
    methods:{
        switchGetData () {
            if (this.activeTabs == 'day') {
                this.getData();
            } else {
                this.getData("month");
            }
        },
        toComment() {
            if (!this.currentComments) return;
            this.$axios({
                url: API_COMMENT,
                method: "post",
                data: {
                    desc: this.currentComments,
                    tid: this.selectUser._id,
                    type: "wishwell"
                }
            }).then(res => {
                this.currentComments = "";
                this.getComments();
            }).then(() => {
                this.switchGetData();
            })
        },
        getComments () {
            this.$axios.get(API_COMMENT, {params: {tid: this.selectUser._id, type: 'wishwell'}, dataLevel: 'all'}).then(res => {
                console.log("res:::", res);
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
        handleLike (id, likes) {
            let state;
            if (likes.includes(this.userId)) {
                state = true;
            } else {
                state = false;
            }
            this.$axios({
                method: "post",
                url: API_LIKE + id,
                data: {
                    self_like: "" + state,
                    type: "wishwell"
                }
            }).then((res) => {
                console.log(res);
                this.switchGetData();
            })
        },
        handleComment (data) {
            this.selectUser = data;
            this.showCommentsModal = true;
            this.getComments();
        },
        callback(){},
        getData(month){
            this.$axios.get("/api/feishu/user/birthdaydata_index",{params:{index: month||''}}).then(data=>{
                month? this.mon=data: this.day= data
            })
        },
        select(it){
            this.p= it
            this.pshow= true
        },
        next(ref, back){
            if(back){
                this.$refs[ref].swiper.slidePrev()
            }else{
                this.$refs[ref].swiper.slideNext()
            }
        },
        moment: window.moment
    }
}
</script>

<style scoped lang="scss">
@import "common";
@mixin birthday(){
width: 100%;
height: 100%;
position: relative;
.left{
    position: absolute;
    top: 46%;
    transform: translateY(-50%);
    left: 8%;
    .cake{
        width: 300px;
        position: relative;
        margin-bottom: 20px;
    }
    .hb{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .05;
    }
    p{
        font-size: 24px;
        text-align: center;
    }
}

.photo{
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    right: 8%;
    overflow: visible;
    white-space: nowrap;
    padding-left: 110px;
    .head{
        border-radius: 100%;
        overflow: hidden;
        width: 100px;
        height: 100px;
        border: 1px solid $color-border;
        box-shadow:0 4px 8px 0 rgba(0,0,0,0.08);
        position: absolute;
        left: 0;
        top: 0;
    }
    .crown{
        width: 54px;
        position: absolute;
        top: -20px;
        left: 60px;
    }
    p{
        font-size: 16px;
        font-weight: 500;
        margin: 30px 0 4px;
    }
    span{
        font-size: 12px;
        max-width: 100px;
        display: inline-block;
        white-space: normal;
    }
}
}
.birthday{
    @include block;
    .day-swiper{
        height: 100%;
        .day{
            @include birthday;
        }
        .mon{

        }
    }
    .mon-title{
        font-size: 16px;
        font-weight: 500;
        line-height: 60px;
        margin-left: 20px;
    }
    .mon-swiper{
        height: $bl - 100 +px;
        .mon{
            width: auto;
            height: 180px;
            border-radius:10px;
            background-color: $color-gray-light;
            padding: 70px 20px 20px;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            position: relative;
            >p{
                position: absolute;
                top: 20px;
                left: 20px;
                font-size: 16px;
                font-weight: 500;
                b{
                    font-size: 12px;
                    font-weight: 400;
                    color: $color-gray;
                    margin-left: 10px;
                }
            }
            li{
                display: inline-block;
                width: 60px;
                text-align: center;
                margin: 0 14px;
                cursor: pointer;
                img{
                    width: 100%;
                    margin-bottom: 10px;
                    border-radius: 100%;
                }
                span{
                    display: block;
                }
            }
        }
        .mon-slide{
            width: auto;
        }
    }
    .interaction {
        margin-left: -14px;
        .label-item {
            display: inline-block;
            margin: 0 2px;
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
            span {
                display: inline !important;
                font-size: 12px;
            }
        }
    }
}
.birthday-detail{
    .day{
        @include birthday;
        height: 300px;
        .photo{
            padding-left: 130px;
            right: auto;
            left: 50px;
            >p, >span{
                white-space: nowrap;
                display: block;
                margin-bottom: 4px;
            }
            p{margin-top: 0}

        }
        .left{
            left: auto;
            right: 60px;
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
                    }
                }
                .comment_content {
                    color: #666;
                    line-height: 14px;
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
</style>