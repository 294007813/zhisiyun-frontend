export default {
    "code": 200, "data": {
        "conf": {
            "home": {
                "show": [[
                    {
                    "title": "基本信息模块(固定模块)",
                    "fixed": true,
                    "code": "base",
                    "name": "baseinfo",
                    "source": false,
                    "pages": {
                        "default": {
                            "name": "默认",
                            "fixed": true,
                            "fields": {"status": true, "level": true, "look": true, "sub": true, "medal": true},
                            "disableFields": {}
                        }
                    },
                    "size": "small",
                    "top": 0,
                    "left": 0,
                    "width": 528
                },
                    {
                    "title": "考勤信息模块",
                    "code": "TM",
                    "name": "attendance",
                    "source": true,
                    "pages": {
                        "flow": {
                            "name": "考勤流程",
                            "show": true,
                            "able": true,
                            "fields": {
                                "leave": true,
                                "overtime": true,
                                "trip": true,
                                "official": true,
                                "abnormal": false,
                                "adjust": false
                            },
                            "disableFields": {}
                        },
                        "balance": {
                            "name": "假期余额",
                            "show": true,
                            "able": true,
                            "fields": {"year": true, "rest": true},
                            "disableFields": {}
                        },
                        "checkin": {
                            "name": "本月考勤统计",
                            "show": true,
                            "able": true,
                            "fields": {
                                "checkin": true,
                                "late": true,
                                "leave": true,
                                "early": true,
                                "rest": false,
                                "miss": false,
                                "outside": false,
                                "absent": false,
                                "short": false,
                                "trip": false,
                                "overtime": false
                            },
                            "disableFields": {}
                        }
                    },
                    "size": "small",
                    "top": 0,
                    "left": 528,
                    "width": 528
                },
                    {
                    "title": "薪资信息模块",
                    "code": "PY",
                    "name": "my_salary",
                    "source": true,
                    "pages": {
                        "mon": {"name": "月度", "show": true, "able": true, "fields": {}, "disableFields": {}},
                        "trend": {"name": "趋势", "show": true, "able": true, "fields": {}, "disableFields": {}},
                        "sta": {
                            "name": "统计",
                            "show": true,
                            "able": true,
                            "fields": {
                                "p_all_income": true,
                                "sum_tax": true,
                                "c_sb_total": true,
                                "p_sb_total": true,
                                "c_gjj_total": true,
                                "p_gjj_total": true,
                                "dikou_total": true
                            },
                            "disableFields": {}
                        }
                    },
                    "size": "small",
                    "top": 0,
                    "left": 1056,
                    "width": 528
                }], [
                    {
                    "title": "待办事宜模块",
                    "code": "gtasks",
                    "name": "todo",
                    "source": false,
                    "pages": {
                        "gt": {"name": "待办", "show": true, "able": true, "fields": {}, "disableFields": {}},
                        "at": {"name": "已办", "show": true, "able": true, "fields": {}, "disableFields": {}}
                    },
                    "size": "small",
                    "top": 80,
                    "left": 0,
                    "width": 528
                },
                    {
                    "title": "绩效信息模块",
                    "code": "PM",
                    "name": "performance_info",
                    "source": true,
                    "pages": {
                        "now": {
                            "name": "当前",
                            "show": true,
                            "able": true,
                            "fields": {"enter": true},
                            "disableFields": {}
                        }, "trend": {"name": "趋势", "show": true, "able": true, "fields": {}, "disableFields": {}}
                    },
                    "size": "small",
                    "top": 80,
                    "left": 528,
                    "width": 528
                },
                    {
                    "title": "消息动态模块",
                    "code": "msg",
                    "source": false,
                    "name": "msg",
                    "pages": {
                        "gt": {
                            "name": "未读",
                            "show": true,
                            "able": true,
                            "fields": {"read": true},
                            "disableFields": {}
                        }, "at": {"name": "已读", "show": true, "able": true, "fields": {}, "disableFields": {}}
                    },
                    "size": "small",
                    "top": 80,
                    "left": 1056,
                    "width": 528
                }], [
                    {
                    "title": "生日祝福模块",
                    "code": "birthday",
                    "name": "birthday_blessing_wall",
                    "source": false,
                    "pages": {
                        "day": {"name": "今日", "show": true, "able": true, "fields": {}, "disableFields": {}},
                        "mon": {"name": "本月", "show": true, "able": true, "fields": {}, "disableFields": {}}
                    },
                    "size": "half",
                    "top": 160,
                    "left": 0,
                    "width": 792
                },
                    {
                    "title": "公司之星模块",
                    "code": "comstar",
                    "name": "star_company",
                    "source": false,
                    "pages": {"default": {"name": "", "fixed": true, "fields": {"query": true}, "disableFields": {}}},
                    "size": "half",
                    "top": 160,
                    "left": 792,
                    "width": 792
                }], [
                    {
                    "title": "技能之星模块",
                    "code": "TA",
                    "name": "skill_star",
                    "source": true,
                    "pages": {
                        "default": {
                            "name": "",
                            "fixed": true,
                            "fields": {"query": true, "like": true},
                            "disableFields": {}
                        }
                    },
                    "size": "half",
                    "top": 240,
                    "left": 0,
                    "width": 792
                }, {
                    "title": "培训流程模块",
                    "code": "TR",
                    "name": "training_process",
                    "source": true,
                    "pages": {
                        "to": {
                            "name": "培训",
                            "show": true,
                            "able": true,
                            "fields": {"participate": true, "doing": true, "more": true},
                            "disableFields": {}
                        },
                        "bo": {
                            "name": "流程",
                            "show": true,
                            "able": true,
                            "fields": {"start": true, "handle": true, "doing": true, "more": true},
                            "disableFields": {}
                        }
                    },
                    "size": "half",
                    "top": 240,
                    "left": 792,
                    "width": 792
                }], [{
                    "title": "合同协议模块",
                    "code": "PA",
                    "name": "contract",
                    "source": true,
                    "pages": {
                        "to": {"name": "合同", "show": true, "able": true, "fields": {}, "disableFields": {}},
                        "bo": {"name": "协议", "show": true, "able": true, "fields": {}, "disableFields": {}}
                    },
                    "size": "half",
                    "top": 320,
                    "left": 0,
                    "width": 792
                }, {
                    "title": "意见箱模块",
                    "code": "ADM",
                    "name": "suggestion_box",
                    "source": true,
                    "size": "half",
                    "top": 320,
                    "left": 792,
                    "width": 792
                }], [{
                    "title": "常用应用模块",
                    "long": true,
                    "code": "often",
                    "name": "often",
                    "size": "long",
                    "top": 400,
                    "left": 0,
                    "width": 1584
                }], [{
                    "title": "我的日历模块",
                    "long": true,
                    "code": "calendar",
                    "name": "me_calendar",
                    "source": false,
                    "size": "long",
                    "top": 480,
                    "left": 0,
                    "width": 1584
                }]], "hide": [[]], "disable": [[]]
            }
        },
        "modules": {
            "_id": "5236784ad082966640000b2a",
            "contract_modules": {
                "BTM": false,
                "COMM": false,
                "OUPM": true,
                "SOI": true,
                "IRPT": true,
                "EL": true,
                "FR": true,
                "TR": true,
                "ADM": true,
                "CD": false,
                "CPT": true,
                "RPT": true,
                "EX": true,
                "RC": true,
                "KM": true,
                "TA": true,
                "QA": true,
                "STM": true,
                "PM": true,
                "AP": false,
                "MB": false,
                "PY": true,
                "TM": true,
                "PA": true,
                "OM": true
            }
        }
    }
}