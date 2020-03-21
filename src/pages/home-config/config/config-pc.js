module.exports = {
    home:{
        "show": [
          [
            {
              "title": "基本信息模块(固定模块)",
              "fixed": true,
              "code": "base",
              name: "basic_information_module",
              "source":false,//是否对应老系统模块 true代表对应上
              pages:{
                "default":{
                  "name":"baseinfo",
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
              "title": "待办事宜模块",
              "code": "gtasks",
              name: "to_do_module",
              "source":false,//是否对应老系统模块 true代表对应上
              pages:{
                "gt":{
                  "name":"to_do_task",
                  show: true,
                  able: true,
                  "fields":{},
                  disableFields:{}
                },
                "at":{
                  "name":"done_task",
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
              "name": "message_dynamic_module",
              pages:{
                "gt":{
                  "name":"unread",
                  show: true,
                  able: true,
                  "fields":{
                
                  },
                  disableFields:{}
                },
                "at":{
                  "name":"readed",
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
                "title": "我的日历模块",
                "long": true,
                "code": "calendar",
                name: "me_calendar_module",
                "source":false,//是否对应老系统模块 true代表对应上
              }
            ],
            [
          {
            "title": "常用应用模块",
            "long":true,
            "code": "often",
            "name": "common_application_module",
          },
            ]
        ],
        "hide": [[]],
        "disable": [[
          {
            "title": "考勤信息模块",
            "code": "TM",
            name: "attendance_information_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "checkin":{
                "name":"attendance_statistics_month",
                show: true,
                able: true,
                "fields":{
                  checkin: true,//出勤
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
                "name":"holiday_balance",
                show: true,
                able: true,
                "fields":{
                  year: true,
                  restbalance: true,
                },
                disableFields:{}
              },
              "flow":{
                "name":"attendance_process",
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
            name: "salary_information_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "mon":{
                "name":"monthly",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
              "trend":{
                "name":"trend",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
              "sta":{
                "name":"statistics",
                show: true,
                able: true,
                "fields":{
                },
                disableFields:{}
              },
    
    
    
            }
          },
          {
            "title": "绩效信息模块",
            "code": "PM",
            name: "performance_information_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "now":{
                "name":"current",
                show: true,
                able: true,
                "fields":{
                  "enter": true
                },
                disableFields:{}
              },
              "trend":{
                "name":"trend",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
            }
          },
          {
            "title": "生日祝福模块",
            "code": "PA",
            name: "birthday_blessing_module",
            "source":true,//是否对应老系统模块 false代表对应上
            pages:{
              "day":{
                "name":"today",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
              "mon":{
                "name":"this_month",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
            }
          },
          {
            "title": "公司之星模块",
            "code": "ADM",
            name: "company_star_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "default":{
                "name":"default",
                fixed: true,
                "fields":{
                  query: true
                },
                disableFields:{}
              },
            }
          },
          {
            "title": "技能之星模块",
            "code": "TA",
            name: "skill_star_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "default":{
                "name":"default",
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
            "code": "FR",
            name: "training_process_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "to":{
                "name":"train",
                show: true,
                able: true,
                "fields":{
                  participate: true,
                  doing: true,
                },
                disableFields:{}
              },
              "bo":{
                "name":"process",
                show: true,
                able: true,
                "fields":{
                  start: true,
                  handle: true,
                  doing2: true,
                },
                disableFields:{}
              },
            }
          },
          {
            "title": "合同协议模块",
            "code": "PA",
            name: "contract_agreement_module",
            "source":true,//是否对应老系统模块 true代表对应上
            pages:{
              "to":{
                "name":"contract",
                show: true,
                able: true,
                "fields":{},
                disableFields:{}
              },
              "bo":{
                "name":"agreement",
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
            name: "suggestion_box_module",
            "source":true,//是否对应老系统模块 true代表对应上
          }
        ]],
      }
}
