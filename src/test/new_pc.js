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
                show: false,
                able: false,
                "fields":{},
                disableFields:{
                  checkin: false, //出勤
                  late: false, //迟到
                  leave: false, //请假
                  early: false, //早退
    
                  rest: false, //休息
                  miss: false, //缺卡
                  outside: false, //外勤
                  absent: false, //旷工
    
                  short: false, //缺勤
                  trip: false, //出差
                  overtime: false, //加班
                  official: false, //公干
    
                }
              },
              "balance":{
                "name":"holiday_balance",
                show: false,
                able: false,
                "fields":{
                  year: false,
                  restbalance: false,
                },
                disableFields:{}
              },
              "flow":{
                "name":"attendance_process",
                show: false,
                able: false,
                "fields":{
                  leave: false, //请假
                  overtime: false, //加班
                  trip: false, //出差
                  official: false, //公干
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
                show: false,
                able: false,
                "fields":{},
                disableFields:{}
              },
              "trend":{
                "name":"trend",
                show: false,
                able: false,
                "fields":{},
                disableFields:{}
              },
              "sta":{
                "name":"statistics",
                show: false,
                able: false,
                "fields":{
                  p_all_income: false,
                  sum_tax: false,
                  c_sb_total: false,
                  p_sb_total: false,
                  c_gjj_total: false,
                  p_gjj_total: false,
                  dikou_total: false,
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
                show: false,
                able: false,
                "fields":{
                  "enter": false
                },
                disableFields:{}
              },
              "trend":{
                "name":"trend",
                show: false,
                able: false,
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
                show: false,
                able: false,
                "fields":{},
                disableFields:{}
              },
              "mon":{
                "name":"this_month",
                show: false,
                able: false,
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
                  query: false
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
                  query: false,
                  like: false,
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
                show: false,
                able: false,
                "fields":{
                  participate: false,
                  doing: false,
                  more: false,
                },
                disableFields:{}
              },
              "bo":{
                "name":"process",
                show: false,
                able: false,
                "fields":{
                  start: false,
                  handle: false,
                  doing2: false,
                  more: false,
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
                show: false,
                able: false,
                "fields":{},
                disableFields:{}
              },
              "bo":{
                "name":"agreement",
                show: false,
                able: false,
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
