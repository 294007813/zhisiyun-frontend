module.exports = {
  workpage: [
    {
      code: "undo",
      name: "to_do_task",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        willdo: {
          show: true,
          disable: true,
          name: "to_do_task",
          fields: [],
          disableFields: {}
        },
        done: {
          show: true,
          disable: true,
          name: "done_task",
          fields: [],
          disableFields: {}
        }
      }
    },
    {
      code: "news",
      name: "message_dynamics",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        unread: {
          show: true,
          disable: true,
          name: "unread",
          fields: [],
          disableFields: {}
        },
        done: {
          show: true,
          disable: true,
          read: "readed",
          fields: [],
          disableFields: {}
        }
      }
    }
  ]
};
