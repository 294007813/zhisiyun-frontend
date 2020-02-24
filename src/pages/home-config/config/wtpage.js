module.exports = {
  wtpage: [
    {
      code: "baseinfo",
      name: "基本信息",
      isuse: true,
      disable: true,
      source: false,
      fix: true,
      pages: {
        default: {
          show: true,
          disable: true,
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
      name: "日历统计",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        cdStatistics: {
          show: true,
          disable: true,
          name: "统计",
          fields: [
            {
              calendar: false
            },
            // 出勤天数
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
            },
            // 外勤
            {
              outwork_time: false
            },
            // 公干
            {
              in_business: false
            },
            // 出差
            {
              on_business_trip: false
            },
            // 请假
            {
              on_leave: false
            },
            // 加班
            {
              overtime: false
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
      name: "考勤发起",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "考勤发起",
          fields: [
            {
              // 请假
              leaves: true
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
      name: "签到打卡",
      isuse: true,
      disable: true,
      fix: false,
      pages: {
        default: {
          // 只有一个页签
          name: "签到打卡",
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
      name: "假期余额",
      isuse: true,
      disable: true,
      source: true,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "假期余额",
          fields: [
            {
              annual_holidays: true
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
