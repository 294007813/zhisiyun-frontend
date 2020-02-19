export default {
  home:{
    "show": [
      [
        {
          "title": "基本信息模块",
          "subtitle": "(固定模块)",
          "fixed": true,
          "code": "base",
          "source":false,//是否对应老系统模块 true代表对应上
          pages:{
            "default":{
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
          "code": "TM",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "checkin":{
              "name":"本月考勤统计",
              show: true,
              able: true,
              "fields":{
                checkin: true,
                leave: true,
                late: true,
                miss: true,
              },
              disableFields:{}
            },
            "balance":{
              "name":"假期余额",
              show: true,
              able: true,
              "fields":{
                year: true,
                rest: true,
              },
              disableFields:{}
            },
            "flow":{
              "name":"考勤流程",
              show: true,
              able: true,
              "fields":{
                leave: true,
                overtime: true,
                trip: true,
                official: true,
              },
              disableFields:{}
            },
          }
        },
        {
          "title": "薪资信息模块",
          "code": "PY",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "mon":{
              "name":"月度",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
            "trend":{
              "name":"趋势",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
            "sta":{
              "name":"统计",
              show: true,
              able: true,
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
          "source":false,//是否对应老系统模块 true代表对应上
          pages:{
            "gt":{
              "name":"待办",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
            "at":{
              "name":"已办",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
          }
        },
        {
          "title": "绩效信息模块",
          "code": "PM",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "now":{
              "name":"当前",
              show: true,
              able: true,
              "fields":{
                "enter": true
              },
              disableFields:{}
            },
            "trend":{
              "name":"趋势",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
          }
        },
        {
          "title": "消息动态模块",
          "code": "msg",
          "source":false,//是否对应老系统模块 true代表对应上
          pages:{
            "gt":{
              "name":"未读",
              show: true,
              able: true,
              "fields":{
                "read": true
              },
              disableFields:{}
            },
            "at":{
              "name":"已读",
              show: true,
              able: true,
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
          "source":false,//是否对应老系统模块 true代表对应上
          pages:{
            "day":{
              "name":"今日",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
            "mon":{
              "name":"本月",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
          }
        },
        {
          "title": "公司之星模块",
          "code": "comstar",
          "source":false,//是否对应老系统模块 true代表对应上
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
          "code": "TA",
          "source":true,//是否对应老系统模块 true代表对应上
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
          "code": "TR",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "to":{
              "name":"培训",
              show: true,
              able: true,
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
              able: true,
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
          "code": "PA",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "to":{
              "name":"合同",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
            "bo":{
              "name":"协议",
              show: true,
              able: true,
              "fields":{},
              disableFields:{}
            },
          }
        },
        {
          "title": "意见箱模块",
          "code": "ADM",
          "source":true,//是否对应老系统模块 true代表对应上
        }
      ],
      [{
        "title": "常用应用模块",
        "long":true,
        "code": "often"
      }],
      [
        {
          "title": "我的日历模块",
          "long": true,
          "code": "calendar",
          "source":false,//是否对应老系统模块 true代表对应上
        }
      ],
    ],
    "hide": []
  }
}