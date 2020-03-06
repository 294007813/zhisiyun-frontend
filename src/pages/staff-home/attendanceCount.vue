<template>
  <div>
    <template
        v-for="(item, ind) in viewList"
      >
      <li
        :key="ind"
        class="item"
        v-if="dict[item.key]"
        @click="$f.href(item.url)"
      >
        <p class="text">
          {{ attendanceStatistics[item.key] }}
          <b class="nuit">{{ item.nuit }}</b>
        </p>
        <span class="label">{{ translate(item.key) }}</span>
      </li>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    viewList: Array,
    attendanceStatistics: [Array, Object],
    dict: Object,
    translate: Function
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
  background: #fff;
  header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }
  > div {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
  }
}

.content .item {
  margin-right: 0.1rem;
}
.content .item:nth-child(2n + 1) {
  background: rgba(246, 246, 246, 1);
  border-radius: 2px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.content .item:nth-child(-n + 4) {
  margin-bottom: 0.1rem;
}

.content .item:nth-child(2n) {
  background: rgba(84, 199, 252, 0.08);
  border-radius: 2px;
  border: 1px solid rgba(84, 199, 252, 0.12);
}

.content .item:nth-child(4n) {
  margin-right: 0;
}

.content .item {
  width: calc(25% - 10px);
  height: 0.6rem;
  text-align: center;
  // margin-right: 0.1rem;
  box-sizing: border-box;
  padding-top: 0.1rem;
}

.item .text > div {
  text-align: center;
  display: inline-block;
}

.item .text .num {
  font-size: 0.2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
}

.item .text .nuit {
  font-size: 0.1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #999999;
  margin-left: 0.05rem;
}

.item .label {
  font-size: 0.1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #666666;
  line-height: 0.16rem;
}
</style>
