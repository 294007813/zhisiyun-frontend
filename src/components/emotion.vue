<template>
  <div>
    <p>{{ emotion }} <img :src="emotionsMap[emotion]" alt=""></p>
    <!-- <vue-sina-emotion 
        :source="emotions"
        :map="map"
        @change="emotion=arguments[0].phrase">    
    </vue-sina-emotion> -->
  </div>
</template>

<script>
// import VueSinaEmotion from 'vue-sina-emotion';
export default {
  data: function(){
    return {
        emotions: [],
        emotion: '[表情]',
        emotionsMap: {}
    }
  },
  methods: {
    map: function(data){
        this.emotionsMap = data;
    }
  },
  components: {
    // VueSinaEmotion
  }
}
</script>

<style>
.sina-emotion-panel{}
.sina-emotion-panel__header{}
.sina-emotion-panel__content{}
.sina-emotion-panel__footer{}

.sina-emotion-panel .btn{ /** <,>,prev,next button style **/ }
.sina-emotion-panel .tabs{}
.sina-emotion-panel .tabs__item{}
.sina-emotion-panel .tabs__item--action{}
.sina-emotion-panel .tabsTools{}
.sina-emotion-panel .tabsToolsButton{}
</style>