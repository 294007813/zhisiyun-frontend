<template>
  <div class="trend-content">
    <div class="trend-title">
      <div class="titleInfo">
        {{lineObj[0] && lineObj[0].replace("-",$t(`index.year`))}}{{$t(`index.month`)}}
        <span>{{$t('xc.real_wage')}}：{{ eyes || $f.currencyFilter(lineObj[1])}}</span>
      </div>
      <div class="trend-graph" ref="trendGraph">
        <vuescroll :ops="ops">
          <div
            class="line"
            id="line"
            :style="{padding: dataList.length > 18 ? '10px 0px': '10px 5px 0'}"
          >
            <v-chart
              id="echars1"
              ref="echars1"
              autoresize
              :options="option"
              :style="{width: '100%','overflow': 'hidden'}"
            />
          </div>
        </vuescroll>
      </div>
        <div class="trend-section">
          <p>
            <span
              v-if="dateInterval.length > 1"
            >{{`${dateInterval[0].replace(/-/,$t(`index.year`))}${$t(`index.month`)}-${dateInterval[1].replace(/-/g,$t(`index.year`))}`}}{{$t(`index.month`)}}</span>
            <span
              v-else
            >{{`${dateInterval[0].replace(/-/,$t(`index.year`))}`}}{{$t(`index.month`)}}</span>
          </p>
        </div>
    </div>
  </div>
</template>
<script>
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

export default {
  name: "",
  props: {
    trendList: {
      type: Object,
      default: () => {}
    },
    dateInterval: {
      type: Array,
      default: () => []
    },
    eyes: String
  },
  data() {
    return {
      // CurrencyFilter,
      showScrollBar: false,
      lineObj: [],
      dataList: [],
      dataObj: [],
      clientWidth: 0,
      maxWidth: 0,
      option: null,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        bar: {
          showDelay: 500,
          keepShow: true,
          background: "#54C7FC",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "12px",
          disable: false
        },
        rail: {
          background: "#eee",
          opacity: 0,
          size: "10px",
          specifyBorderRadius: false,
          gutterOfEnds: "16px",
          gutterOfSide: "5px",
          keepShow: false,
          border: "1px #eee solid"
        },
        scrollPanel: {
          initialScrollX: "100%"
        }
      }
    };
  },
  components: {
    vuescroll
  },
  mounted() {
    for (const i in this.trendList) {
      this.dataObj.push([i, this.trendList[i]]);
    }
    this.dataList = Object.keys(this.trendList);
    // 折线图配置项
    this.option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        show: true,
        position: function(pt) {
          return [pt[0], 20];
        },
        showContent: true,
        alwaysShowContent: true,
        axisPointer: {
          show: true,
          type: "line",
          lineStyle: {
            width: 1,
            color: "#FF6666"
          },
          label: {
            show: true,
            backgroundColor: "#6a7985"
          }
        },
        triggerOn: 'mousemove|click',
        formatter: e => {
          this.lineObj = e[0].data;
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 23,
        top: 0,
        containLabel: false
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: true,
        data: this.dataList,
        axisLine: {
          lineStyle: {
            color: "#EEEEEE"
          }
        },
        axisLabel: {
          // 刻度
          interval: 16,
          // symbolSize: [50, 50],
          // rotate: 90,
          formatter: function() {
            return "";
          }
        },
        axisTick: {
          show: false,
          // 刻度线颜色
          lineStyle: {
            // color: 'red'
          }
        },
        axisPointer: {
          value: "", // 默认展示当前时间
          snap: true,
          type: "line", // 竖线显示是否有
          show: true,
          lineStyle: {
            color: "red",
            // opacity: 0.5,
            width: 1
          },
          label: {
            show: false,
            backgroundColor: "#004E52"
          },
          handle: {
            // 拖动手柄
            show: true
          }
        },
        min: 0,
        max: Object.values(this.trendList).length - 1
      },
      yAxis: {
        type: "value",
        show: false,
        minInterval: 1,
        boundaryGap: [0, 0.3],
        axisLine: {
          show: false,
          lineStyle: {
            width: 0
          }
        }
      },
      series: [
        {
          type: "line",
          // showSymbol: false,
          symbol: "circle",
          color: ["#54C7FC"],
          symbolSize: 4,
          data: this.dataObj,
          itemStyle: {
            emphasis:{ // 鼠标经过时拐点样式
                color: "#fff",
                borderColor: "#3aa7ff"
            },
          }, 
          lineStyle: {
            normal: {
              width: 1,
              color: "#B3E2F4"
            }
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "#F0FBFF" // 0% 处的颜色
                },
                {
                  offset: 0.7,
                  color: "#EBF7FF" // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: "#B1E0E9" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    };
    
    this.resizeTheChart();
    window.addEventListener("resize", this.resizeTheChart);
    this.delayAction()
  },
  methods: {
    getWidth() {
      this.clientWidth = this.$refs.trendGraph.clientWidth;
      this.maxWidth = (this.clientWidth / 18) * (this.dataList.length || 1);
      const lineId = document.getElementById("line");
      this.$nextTick(() => {
        lineId.scrollLeft = lineId.scrollWidth;
        this.showScrollBar = lineId.scrollWidth !== this.clientWidth;
      });
    },
    // 延时执行
    delayAction() {
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.$refs.echars1.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: this.dataObj.length - 1 // 显示第几个数据
        });
      }, 400);
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.echars1) {
        this.getWidth()
        this.$refs.echars1.resize()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTheChart);
  }
};
</script>

<style lang="scss" scoped>
$primary: #54c7fc;
$white: #fff;
$bl: 320;

.trend-content {
  border-radius: 2px;
  padding: 10px 20px;
  .titleInfo {
    font-size: 14px;
    color: #666;
    text-align: left;
  }
  .trend-graph {
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;
    ::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
    .line {
      width: 100%;
      overflow: hidden;
      ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
    #echars1{
      height: $bl - 120 +px;
      border-top: 1px #EEEEEE solid;
    }
  }
    .trend-section {
      color: #666666;
      text-align: center;
      p {
        width: 100%;
        span {
          display: block;
          text-align: center;
        }
      }
    }
}
</style>
