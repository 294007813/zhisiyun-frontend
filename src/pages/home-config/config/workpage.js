module.exports = {
  workpage: [
    {
      code: "undo",
      name: "待办",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        willdo: {
          show: true,
          disable: true,
          name: "待办",
          fields: [],
          disableFields: {}
        },
        done: {
          show: true,
          disable: true,
          name: "已办",
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "news",
      name: "消息动态",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        unread: {
          show: true,
          disable: true,
          name: "未读",
          fields: [],
          disableFields: {}
        },
        done: {
          show: true,
          disable: true,
          read: "已读",
          fields: [],
          disableFields: {}
        }
      }
    }
  ]
};
