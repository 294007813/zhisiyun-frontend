module.exports = {
  home: [
    {
      code: "jbxx",
      name: "baseinfo",
      isuse: true,
      disable: true,
      source: false,
      fix: true,
      pages: {
        default: {
          name: "baseinfo",
          disable: true,
          show: true,
          fields: [
            {
              ai_robot: true
            },
            {
              employee_status: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TM",
      name: "attendance",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        tj: {
          name: "cdStatistics",
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
          name: "attendance_tools",
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
          name: "holiday_balance",
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
      name: "my_salary",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "my_salary",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "db",
      name: "todo",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        undo: {
          name: "to_do_task",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        },
        done: {
          name: "done_task",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "wdxs",
      name: "my_subordinates",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "my_subordinates",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "PM",
      name: "performance_info",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        month: {
          name: "monthly_pfm",
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
          name: "recent_performace",
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
      name: "me_calendar",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "me_calendar",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "sr",
      name: "birthday_blessing_wall",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        today: {
          name: "today",
          disable: true,
          show: true,
          fields: [],
          disableFields: {}
        },
        current_month: {
          name: "current_month",
          disable: true,
          show: true,
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "cpstar",
      name: "star_company",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "star_company",
          disable: true,
          show: false,
          fields: [
            {
              search_btn: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TA",
      name: "skill_star",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "skill_star",
          disable: true,
          show: false,
          fields: [
            {
              search_btn: true
            },
            {
              thumb_btn: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TR",
      name: "training_num",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "training_num",
          disable: true,
          show: false,
          fields: [
            {
              join_travels: true
            },
            {
              in_process: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "FR",
      name: "process_num",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "process_num",
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
            // 进行中的
            {
              in_process: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "PA",
      name: "contract",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        ht: {
          name: "contract",
          disable: true,
          show: false,
          fields: [
            {
              signed_contract: true
            },
            {
              vaildTime_contract: true
            }
          ],
          disableFields: {}
        },
        xy: {
          name: "agreement",
          disable: true,
          show: false,
          fields: [
            {
              signed_protocol: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "ADM",
      name: "suggestion_box",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          name: "suggestion_box",
          disable: true,
          show: false,
          fields: [],
          disableFields: {}
        }
      }
    }
  ]
};
