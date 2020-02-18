export default {
      home:{
  "show": [
    [
      {
        "title": "基本信息模块",
        "subtitle": "(固定模块)",
        "fixed": true,
        "code": "base",
        pages:{
          "defalut":{
            "name":"默认",
            "fixed": true,
            "fields":{
              status: true,
              rank: true,
              level: true,
              look: true,
              sub: true,
              medal: true,
            },
            disableFields:{}
          }
        }
      },
      {
        "title": "考勤信息模块",
        "code": "checkin",
        pages:{
          "checkin":{
            "name":"本月考勤统计",
            show: true,
            disable: false,
            "fields":{
              register: true,
              leave: true,
              late: true,
              miss: true,
            },
            disableFields:{}
          },
          "balance":{
            "name":"假期余额",
            show: true,
            disable: false,
            "fields":{
              year: true,
              rest: true,
            },
            disableFields:{}
          },
          "button":{
            "name":"考勤流程",
            show: true,
            disable: false,
            "fields":{
              leave: true,
              overtime: true,
              evection: true,
              official: true,
            },
            disableFields:{}
          },
        }
      },
      {
        "title": "薪资信息模块",
        "code": "salary",
        pages:{
          "mon":{
            "name":"月度",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
          "trend":{
            "name":"趋势",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
          "sta":{
            "name":"统计",
            show: true,
            disable: false,
            "fields":{
              p_all_income: true,
              sum_tax: true,
              c_sb_total: true,
              p_sb_total: true,
              c_gjj_total: true,
              p_gjj_total: true,
              dikou_total: true,
            },
            disableFields:{}
          },

        }
      }
    ],
    [
      {
        "title": "待办事宜模块",
        "code": "gtasks",
        pages:{
          "gt":{
            "name":"待办",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
          "at":{
            "name":"已办",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
        }
      },
      {
        "title": "绩效信息模块",
        "code": "perf",
        pages:{
          "now":{
            "name":"当前",
            show: true,
            disable: false,
            "fields":{
              "enter": true
            },
            disableFields:{}
          },
          "trend":{
            "name":"趋势",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
        }
      },
      {
        "title": "消息动态模块",
        "code": "msg",
        pages:{
          "gt":{
            "name":"未读",
            show: true,
            disable: false,
            "fields":{
              "read": true
            },
            disableFields:{}
          },
          "at":{
            "name":"已读",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
        }
      }
    ],
    [
      {
        "title": "生日祝福模块",
        "code": "birthday",
        pages:{
          "day":{
            "name":"今日",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
          "mon":{
            "name":"本月",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
        }
      },
      {
        "title": "公司之星模块",
        "code": "comstar",
        pages:{
          "default":{
            "name":"",
            fixed: true,
            "fields":{
              query: true
            },
            disableFields:{}
          },
        }
      }
    ],
    [
      {
        "title": "技能之星模块",
        "code": "skillstar",
        pages:{
          "default":{
            "name":"",
            fixed: true,
            "fields":{
              query: true,
              like: true,
            },
            disableFields:{}
          },
        }
      },
      {
        "title": "培训流程模块",
        "code": "train",
        pages:{
          "to":{
            "name":"培训",
            show: true,
            disable: false,
            "fields":{
              participate: true,
              doing: true,
              more: true,
            },
            disableFields:{}
          },
          "bo":{
            "name":"流程",
            show: true,
            disable: false,
            "fields":{
              start: true,
              handle: true,
              doing: true,
              more: true,
            },
            disableFields:{}
          },
        }
      }
    ],
    [
      {
        "title": "合同协议模块",
        "code": "contract",
        pages:{
          "to":{
            "name":"合同",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
          "bo":{
            "name":"协议",
            show: true,
            disable: false,
            "fields":{},
            disableFields:{}
          },
        }
      },
      {
        "title": "意见箱模块",
        "code": "idea"
      }
    ],
    [
      {
        "title": "我的日历模块",
        "long": true,
        "code": "calendar"
      }
    ],
  ],
  "hide": []
}
}