<template>
  <div class="position-container">
    <p style="display:inline;" @click="visible = !visible">{{ emotion }} <img :src="emotionsMap[emotion]" alt=""></p>
    <!-- <vue-sina-emotion 
        :source="emotions"
        :map="map"
        @change="emotion=arguments[0].phrase">    
    </vue-sina-emotion> -->
    <div id="sinaEmotion" v-if="visible">
      <div class="categories-right">
        <!-- &lt; > -->
        <!-- &gt; > -->
        <a href="#" class="prev" @click="handleCategory('prev')">&lt;&lt;</a>
        <a href="#" class="next" @click="handleCategory('next')">&gt;&gt;</a>
      </div>
      <div class="categories-container">
        <ul class="categories">
          <li v-for="cat in currentCategories" :key="cat" @click="handleCat(cat)">
            <span>
              {{cat}}
            </span>
          </li>
        </ul>
      </div>
      <ul class="faces">
        <li v-for="(face, ind) in currentFacesInPage" :key="ind" @click="handleFace(face)">
          <span>
            <img :src="face.url" alt="">
          </span>
        </li>
      </ul>
      <!--  翻页 -->
      <ul class="pages">
        <li v-for="(page,index) in currentPageNum" :key="index" :class="{'active': activePage == index}" @click="handlePage(index)">
          <span>
            {{index + 1}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import VueSinaEmotion from 'vue-sina-emotion';
import emotions from "./emotions";
import axios from "axios";
const url = 'https://api.weibo.com/2/emotions.json?callback?'; // get key

const NUM = 72;
/**
 * 
 * {
    "phrase": "[微笑]",
    "type": "face",
    "url": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e3/2018new_weixioa02_org.png",
    "hot": false,
    "common": true,
    "category": "",
    "icon": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e3/2018new_weixioa02_org.png",
    "value": "[微笑]",
    "picid": ""
    },
 */
export default {
  data: function(){
    return {
        emotions: [],
        emotion: '[表情]',
        emotionsMap: {},
        categories: [],
        // 默认
        currentCategory: "",
        currentFaces: [],
        NUM,
        currentPageNum: 0,
        activeCategorys: 0,
        activePage: 0,
        add: 0

    }
  },
  props: {
    visible: Boolean
  },
  computed: {
    currentFacesInPage () {
      const index = this.activePage * NUM;
      return this.currentFaces.slice(index, index + NUM);
    },
    currentCategories () {
      const num = 4;
      const index = this.activeCategorys * num;
      return this.categories.slice(index, index + num);
    }
  },
  methods: {
    handleFace (face) {
      console.log(face);
      this.$emit("send-face", face);
    },
    handlePage (index) {
      if (this.activePage == index) return;
      this.activePage = index;
    },
    handleCategory (type) {
      const num = 4;
      const index = this.activeCategorys * num;
      const len = this.categories.length;
      if (type == 'next') {
        if (Math.ceil(len/num) == this.activeCategorys + 1) {
          return;
        }
        this.activeCategorys++;
      } else {
        if (this.activeCategorys == 0) {
          return;
        }
        this.activeCategorys--;
      }
    },
    handleCat (item) {
      console.log(item);
      this.currentCategory = item;
      const currentFaces = this.emotionsMap[this.currentCategory];
      this.currentFaces = currentFaces;
      this.currentPageNum = Math.ceil(currentFaces.length / NUM);
    },
    categoryPages () {
      const num = 5;
      let res = []
      const cats = this.categories;
      const actully = this.add % cats.length;
      res = cats.slice(actully, actully + 5);
      this.add += num;
      return res;
    },
    map: function(data){
        this.emotionsMap = data;
    },
    formatData (list) {
      let def = "默认";
      const emotions = {};
      const emotionsMap = {};
      const categories = [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const category = item['category'] || def;
        if (!emotions[category]) {
          categories.push(category);
          emotions[category] = [];
        }
        emotions[category].push({
          title: item['phrase'],
          url: item['icon']
        });
      }
      this.categories = categories;
      this.emotionsMap = emotions;
    },
    initData () {
      this.currentCategory = this.categories[0];
      const currentFaces = this.emotionsMap[this.currentCategory];
      this.currentFaces = currentFaces;
      this.currentPageNum = Math.ceil(currentFaces.length / NUM);
    }
  },
  mounted () {
    this.formatData(emotions);
    this.initData();
  },
  components: {
    // VueSinaEmotion
  }
}
</script>

<style scoped>
.position-container {
  position: relative;
}

#sinaEmotion {
  width: 373px;
  padding: 10px;
  font-size: 12px;
  background: #fff;
  overflow: hidden;
  position: absolute;
  border: 1px solid #E8E8E8;
  top: 50px;
  left: 50px;
  z-index: 999;
  box-sizing: content-box;
}
.categories-right {
  float: right;
}
li {
  display: inline;
}
#sinaEmotion .categories, #sinaEmotion .faces, #sinaEmotion .pages {
  margin: 0;

  padding: 0;

  overflow: hidden;
}
#sinaEmotion .categories li, #sinaEmotion .faces li, #sinaEmotion .pages li{
  cursor: pointer;
}
#sinaEmotion .categories-container {
  overflow-x: scroll;
  width: 319px;
  white-space: nowrap;
}
#sinaEmotion .categories {
  white-space: nowrap;
}
#sinaEmotion .categories li span {
  color: #0a8cd2;
  cursor: pointer;
  padding: 0 8px;
  line-height: 22px;
  border-radius: 4px;
  white-space: nowrap;
}

#sinaEmotion .categories li span.active {
  color: #333;
  cursor: default;
  background: #e6e6e6;
  text-decoration: none;
}

#sinaEmotion .faces {
  width: 372px;
  padding: 11px 0 0 1px;
}
#sinaEmotion .faces li {

  margin-bottom: 0;
  overflow: initial;
  float: left;
}

#sinaEmotion .faces li span {
  box-sizing: inherit;
  z-index: 1;

  float: left;

  width: 26px;

  height: 22px;

  cursor: pointer;

  overflow: hidden;

  padding: 4px 2px;

  position: relative;

  text-align: center;

  margin: -1px 0 0 -1px;

  border: 1px solid #e8e8e8;
  box-sizing: content-box;

}

#sinaEmotion .faces li span img {
  height: 22px;
  border: 0;
  vertical-align: text-bottom;
}

#sinaEmotion .pages {
  float: right;
  margin-top: 8px;
}
#sinaEmotion .pages li span {
  background: #fff;
  color: #333;  
}

#sinaEmotion .pages li span {

  float: left;

  height: 22px;

  padding: 0 8px;

  margin-left: 5px;

  line-height: 22px;

  border-radius: 1px;
}
#sinaEmotion .pages li.active span {
  color: #0a8cd2;
  background: #f2f2f2;
}

</style>