<template>
  <div class="gtasks">
    <h5 class="todo-num" @click="$f.href('/admin/wf/todo_list')">
      {{$t("index.todo")}}
      <el-badge :value="task_count" class="item" type="primary"></el-badge>
    </h5>
    <el-tabs v-model="activeTabs" @tab-click="tabClick" class="block-tabs">
      <el-tab-pane :label="$t('index.to_do_task')" name="gt" v-if="figt">
        <ul class="ul" v-nodata="{have: gt.list&& gt.list.length}">
          <li v-for="(item, i) in gt.list" :key="i" @click="goFun(item.operation)">
            <p>
              {{item.title}}
              <em v-if="item.sort>0">{{$t("index.time_out")}}</em>
            </p>
            <span>{{item.createDate | relativedate}}前创建&nbsp;|&nbsp;限时{{item.due_date}}</span>
            <!--                    <b>人事事件</b>-->
          </li>
          <p class="view-all" @click="$f.href('/admin/wf/todo_list')">点击查看更多待办</p>
        </ul>
      </el-tab-pane>
      <el-tab-pane :label="$t('index.done_task')" name="at" v-if="fiat">
        <ul class="ul at" v-if="fiat" v-nodata="{have: at.list&& at.list.length}">
          <li v-for="(item, i) in at.list" :key="i" @click="goFun(item.operation)">
            <p>
              <em>{{item.title}}</em>
            </p>
            <span>{{item.task_end}}完成</span>
            <!--                    <b>人事事件</b>-->
          </li>
          <p class="view-all" @click="$f.href('/admin/wf/finished_list')"
             v-show="at.list&& at.list.length">点击查看更多已办</p>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import transfer from "li/workflow-url-transfer";
export default {
  name: "GTasks",
  props: ["conf"],
  data() {
    return {
      activeTabs: "gt",
      gt: {},
      at: {}
    };
  },
  computed: {
    figt() {
      let data = this.conf.pages.gt;
      return data && data.able && data.show && data.fields;
    },
    fiat() {
      let data = this.conf.pages.at;
      return data && data.able && data.show && data.fields;
    },
    task_count() {
      return this.$store.state.user.taskMessageCount.task_count || 0;
    }
  },
  mounted() {
    this.activeTabs = (this.figt && "gt") || (this.fiat && "at");
    this.getGt();
    this.getAt();
  },
  methods: {
    tabClick() {},
    getGt() {
      this.$axios
        .get("/api/feishu/news/todolist?from=new_pc_index")
        .then(data => {
          this.gt = data;
        });
    },
    getAt() {
      this.$axios
        .get("/api/feishu/news/donelist?from=new_pc_index")
        .then(data => {
          for (let v of data.list) {
            v.task_end = moment(v.task_end || v.createDate).fromNow();
          }
          this.at = data;
        });
    },
    goFun(str) {
      let funs = transfer;
      eval("funs." + str);
    }
  }
};
</script>

<style scoped lang="scss">
@import "common";
.gtasks {
  @include block;
  .todo-num {
    cursor: pointer;
  }
  .ul {
    padding: 0 20px;
    height: 100%;
    overflow: auto;
    li {
      padding: 10px 0;
      border-bottom: 1px solid $color-border;
      position: relative;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      p {
        margin-bottom: 10px;
        em {
          color: $color-red;
        }
      }
      span {
        font-size: 12px;
        color: $color-gray;
      }
      b {
        position: absolute;
        top: 10px;
        right: 0;
      }
    }
    .view-all {
      padding: 16px;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      color: #999;
    }
    &.at * {
      color: $color-gray;
    }
  }
  /deep/ .el-badge {
    vertical-align: text-bottom;
    line-height: normal;
    sup {
      vertical-align: top;
    }
  }
}
</style>