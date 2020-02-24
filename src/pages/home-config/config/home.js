module.exports = {
  home: [
    {
      code: "jbxx",
      name:"基本信息",
      isuse: true,
      disable: true,
      source: false,
      fix: true,
      pages: {
        default:{
           name:"基本信息",
           disable: true,
           show: true,
           fields: [
            {
              salary_model: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TM",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        tj: {
          name: "考勤统计",
          disable: true,
          show: false,
          fields: [
            // 出勤
            {
              attendance_days: false
            },
            // 缺卡
            {
              absence: false
            },
            // 迟到早退
            {
              late_leave: false
            },
            // 请假
            {
              leaves: false
            }
          ],
          disableFields: {}
        },
        tool: {
          name: "考勤工具",
          disable: true,
          show: false,
          fields: [
            {
              // 请假
              leaves: true
            },
            {
              // 外勤签到
              outwork_check_in: true
            },
            {
              // 加班
              overtime: true
            },
            {
              // 打卡
              check_in: true
            },
            {
              // 出差
              on_business_trip: true
            },
            {
              // 公干
              in_business: true
            },
            {
              // 请假
              on_leave: true
            },
            {
              // 加班
              overtime: true
            },
            {
              // 假期调整
              holiday_change: true
            },
            {
              // 考勤异常
              check_in_exceptions: true
            }
          ],
          disableFields: {}
        },
        jq: {
          name: "假期余额",
          disable: true,
          show: false,
          fields: [
            {
              // 年假余额
              annual_holidays: true
            },
            {
              // 调休
              leave_off_time: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "PY",
      name: "我的工资",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "生日祝福墙",
          disable: true,
          show: false,
          fields: [
            {
              salary_model: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "db",
      name: "考勤",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        undo: {
          name: "代办",
          disable: true,
          show: false,
          fields: [
            {
              todo_list: false
            }
          ],
          disableFields: {}
        },
        done: {
          name: "已办",
          disable: true,
          show: false,
          fields: [
            {
              done_list: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "wdxs",
      name: "我的下属",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "生日祝福墙",
          disable: true,
          show: false,
          fields: [
            {
              my_subordinate: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "PM",
      name: "绩效信息",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        month: {
          name: "X月绩效",
          disable: true,
          show: false,
          fields: [
            {
              // 月份绩效
              month_performance: true
            }
          ],
          disableFields: {}
        },
        near: {
          name: "近期",
          disable: true,
          show: false,
          fields: [
            {
              // 近期绩效
              recent_performace: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "wdrl",
      name: "我的日历",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "生日祝福墙",
          disable: true,
          show: false,
          fields: [
            {
              my_date_model: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "sr",
      name: "生日祝福墙",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "生日祝福墙",
          disable: true,
          show: false,
          fields: [
            {
              birthday_wall: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "cpstar",
      name: "公司之星",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "技能之星",
          disable: true,
          show: false,
          fields: [
            {
              company_star: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TA",
      name: "技能之星",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "技能之星",
          disable: true,
          show: false,
          fields: [
            {
              skill_star: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TR",
      name: "培训统计",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "培训统计",
          disable: true,
          show: false,
          fields: [
            {
              train_model: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "FR",
      name: "流程统计",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "流程统计",
          disable: true,
          show: false,
          fields: [
            {
              process_model: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "PA",
      name: "我的合同协议",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        ht: {
          name: "合同",
          disable: true,
          show: false,
          fields: [
            {
              // 我发起的
              start_by_myself: true
            },
            {
              // 我处理的的
              process_myself: true
            },
            {
              // 进行中的
            },
            {
              in_process: true
            }
          ],
          disableFields: {}
        },
        xy: {
          name: "协议",
          disable: true,
          show: false,
          fields: [
            {
              agreement: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "ADM",
      name: "意见箱",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "合同",
          disable: true,
          show: false,
          fields: [
            {
              suggestion_model: true
            }
          ],
          disableFields: {}
        }
      }
    }
  ]
};

