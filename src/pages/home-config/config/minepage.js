module.exports = {
  minepage: [
    {
      code: "baseinfo",
      name: "baseinfo",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "baseinfo",
          fields: [
            {
              MC_BC_PROFILE: true
            },
            {
              MC_BC_SALARY: true
            },
            {
              MC_BC_Q: true
            },
            {
              MC_BC_AWARD: true
            },
            {
              MC_BC_CONTACT: true
            },
            {
              MC_BC_TRAIN: true
            },
            {
              MC_BC_KM_ALL: true
            },
            {
              MC_BC_ABILITY: true
            },
            {
              MC_BC_NOTICE: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "action",
      name: "action",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "action",
          fields: [
            {
              MC_BH_CARD_RECORD: true
            },
            {
              MC_BH_CHEKIN_LIST: true
            },
            {
              MC_BH_PLAN: true
            },
            {
              MC_BC_ATT_LIST: true
            },
            {
              MC_BH_FL_W: true
            },
            {
              MC_BH_CALENDAR: true
            },
            {
              MC_BH_TASK_LIST: true
            },
            {
              MC_BH_PROJECT_LIST: true
            },
            {
              MC_BH_REPORT: true
            },
            {
              MC_BH_QT_LIST: true
            },
            {
              MC_BH_FLOW: true
            },
            {
              MC_BH_ACTI: true
            },
            {
              MC_BH_TRAIN_APP: true
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "talent",
      name: "talent",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          name: "talent",
          show: true,
          disable: true,
          fields: [
            {
              MC_TL_AI: false
            },
            {
              MC_TL_NINE: false
            },
            {
              MC_TL_360: false
            },
            {
              MC_TL_TR_RECORD: false
            },
            {
              MC_TL_LAMBDA: false
            },
            {
              MC_TL_RC_MY: false
            }
          ],
          disableFields: {}
        }
      }
    },
    {
      code: "setting",
      name: "setting",
      isuse: true,
      disable: true,
      source: false,
      fix: false,
      pages: {
        default: {
          show: true,
          disable: true,
          name: "setting",
          fields: [
            {
              change_password: true
            },
            {
              lang_setting: true
            },
            {
              page_setting: true
            }
          ],
          disableFields: {}
        }
      }
    }
  ]
};
