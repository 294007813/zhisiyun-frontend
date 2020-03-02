export default {
  home:{
    "show": [
      [
        {
          "title": "基本信息模块(固定模块)",
          "fixed": true,
          "code": "base",
          name: "baseinfo",
          "source":false,//是否对应老系统模块 true代表对应上
          pages:{
            "default":{
              "name":"default",
              "fixed": true,
              "fields":{
                status: true,
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
          name: "attendance",
          "source":true,//是否对应老系统模块 true代表对应上
          pages:{
            "checkin":{
              "name":"checkin",
              show: true,
              able: true,
              "fields":{
                checkin: true, //出勤
                late: true, //迟到
                leave: true, //请假
                early: true, //早退

                rest: false, //休息
                miss: false, //缺卡
                outside: false, //外勤
                absent: false, //旷工

                short: false, //缺勤
                trip: false, //出差
                overtime: false, //加班
                official: false, //公干

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
                leave: true, //请假
                overtime: true, //加班
                trip: true, //出差
                official: true, //公干
                abnormal: false, //考勤异常
                adjust: false, //假期调整
              },
              disableFields:{}
            },
          }
        },
        {
          "title": "薪资信息模块",
          "code": "PY",
          name: "my_salary",
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
          name: "todo",
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
          name: "performance_info",
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
          "name": "msg",
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
          name: "birthday_blessing_wall",
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
          name: "star_company",
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
          name: "skill_star",
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
          name: "training_process",
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
          name: "contract",
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
          name: "suggestion_box",
          "source":true,//是否对应老系统模块 true代表对应上
        }
      ],
      [{
        "title": "常用应用模块",
        "long":true,
        "code": "often",
        "name": "often",
      }],
      [
        {
          "title": "我的日历模块",
          "long": true,
          "code": "calendar",
          name: "me_calendar",
          "source":false,//是否对应老系统模块 true代表对应上
        }
      ],
    ],
    "hide": [[]],
    "disable": [[]],
  }
}