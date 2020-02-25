module.exports = {
  wtpage: [
    {
      code: "baseinfo",
      name: "baseinfo",
      isuse: true,
      disable: true,
      source: false,
      fix: true,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "baseinfo",
          fields: [
            {
              aiRobot: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TM",
      name: "cdStatistics",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        cdStatistics: {
          show: true,
          disable: true,
          name: "cdStatistics",
          fields: [
            {
              calendar: false
            },
            // 出勤天数
            {
              attendance_days: true
            },
            // 缺卡
            {
              miss_card: false
            },
            // 缺勤
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
            },
            // 外勤
            {
              outwork_time: false
            },
            // 旷工
            {
              sign_out_change: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "TM",
      name: "attendance_initiation",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "attendance_initiation",
          fields: [
            {
              // 请假
              leaves: false
            },
            {
              // 加班
              overtime: true
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
        }
      }
    },
    {
      // 签到打卡
      code: "clock_in_card",
      name: "clock_in",
      isuse: true,
      disable: true,
      fix: false,
      pages: {
        default: {
          // 只有一个页签
          name: "clock_in",
          show: true,
          disable: true,
          fields: [
            {
              // 打卡
              check_in: true
            },
            {
              // 外勤签到
              outwork_check_in: true
            }
          ]
        }
      }
    },
    {
      code: "TM",
      name: "holiday_balance",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "holiday_balance",
          fields: [
            {
              annual_holidays: false
            },
            {
              leave_off_time: true
            }
          ],
          disableFields: {}
        }
      }
    }
  ]
};
