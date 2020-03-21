import _ from "underscore"

const adapter = {
    // 替换规则列表
    url_adapter_rule: [{
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/beyond_work_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '加班流程审批结束',
            format: "/admin/tm/beyond_work/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/leave_form_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '请假流程审批',
            format: "/admin/todo/redirect?ts_toid={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/leave_form_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '请假流程审批结束',
            format: "/admin/tm/wf_leave_of_absence/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/beyond_work_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '加班流程审批',
            format: "/admin/todo/redirect?ts_toid={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/cancel_work_wechat\/(\w+)\/deal_with\/(\w+)/,
            name: '加班消减流程审批',
            format: "/admin/tm/wf_cancel_absence_of_three/edit/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/cancel_work_wechat\/(\w+)\/view\/(\w+)/,
            name: '加班消减流程结束',
            format: "/admin/tm/wf_cancel_absence_of_three/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/003\/getCollProjectView\/(\w+)\?cp_id=(\w+)/,
            name: '项目管理通知',
            format: "/admin/pm/coll_project/bbform?cp_id={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/007\/calendar\/detail\/(\w+)/,
            name: '任务通知',
            format: "/admin/recruitment/interview/iv_calendar?calendar_id={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/getNotificationView\/(\w+){0,1}\?nf_id=(\w+)/,
            name: '发送一条通知',
            format: "/admin/im/views/{2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/getNotificationView2\/(\w+){0,1}\?nf_id=(\w+)/,
            name: '收到一条通知',
            format: "/admin/im/views/{2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/014\/candidate_sure_view_info_list\/(\w+)/,
            name: '候选人需要确认',
            format: "/admin/recruitment/candidate/list"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/014\/reject_look_candidate_resume_view_info\/(\w+)/,
            name: '候选人签到',
            format: "/admin/recruitment/resume/view/{1}?type-M"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/002\/getCollTaskView\/(\w+)\?ct_id=(\w+)/,
            name: '协作任务修改',
            format: "/admin/pm/coll_task/bbform?ct_id={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/pm\/coll_task\/003\/coll_project_remind\/(\w+)\?project_id=(\w+)/,
            name: '协作项目到期提醒',
            format: "/admin/pm/coll_project/bbform?cp_id={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/pm\/coll_task\/002\/coll_task_remind\/(\w+)\?task_id=(\w+)/,
            name: '协作任务到期提醒',
            format: "/admin/pm/coll_task/bbform?ct_id={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/work_city_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '市区公干流程需要处理',
            format: "/admin/todo/redirect?ts_toid={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/work_city_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '市区公干流程审批结束',
            format: "/admin/tm/work_city/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getUniversal\/(\w+)\?pi_id=(\w+)/,
            name: '财务服务费用报销流程',
            format: "/admin/todo/redirect?ts_toid={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getAssessmentHistory\/(\w+)\/(\w{0,})/,
            name: '绩效合同处理完成',
            format: "/admin/pm/assessment_instance/wf04/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/1\/(\w+)\-(\w+)\-(\w+)\/1\/(\w{0,})/,
            name: '绩效合同需要处理',
            format: "/admin/todo/redirect?ts_toid={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/1\/(\w+)\-(\w+)\-(\w+)\/1\/(\w+)/,
            name: '工作报告需要审批',
            format: "/admin/todo/redirect?ts_toid={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/wf\/universal\/handle_form_view_wx\/(\w+)/,
            name: '定义流程审批结束',
            format: "/admin/wf/universal/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/go_do\/16\/(\w+)-(\w+)\/1/,
            name: '个人转正申请流程结束',
            format: "/admin/pa/wf/ending_probation/view/{2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/002\/detail\/(\w+)/,
            name: '协作任务更改',
            format: "/admin/pm/coll_task/bbform?ct_id={1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/self_entry\/send_my_message\/(\w+)/,
            name: '新员工申请入职',
            format: "/admin/self_entry/creat_self_entry_view"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/007\/getWorkReportDetail\/(\w+)\?wr_id=(\w+)/,
            name: '工作报告尚未提交',
            format: "/admin/pm/work_report/form_new?wr_id={2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/006\/getProfileUser\/(\w+)\?people_id=(\w+)/,
            name: '新员工入职，查看员工档案',
            format: "/admin/masterdata/people/edit/{2}?mode=view"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getUniversalView\/(\w+)\?pi_id=(\w+)/,
            name: '定义流程审批结束',
            format: "/admin/wf/universal/view/{2}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/getNotificationEditView\/(\w+)\?nf_id=(\w+)/,
            name: '通知公告审批',
            format: "/admin/im/form_new?im_id={2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/approval_quesetionnaire\/(\w+)\?vt_id=(\w+)/,
            name: '问卷评分',
            format: "/admin/pm/questionnair_template/approval_questionnaire?q_id={2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/017\/017_em_proof_edit\/(\w+)/,
            name: '证明单据办理',
            format: "/admin/em_proof/view/emproofs/edit/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/schedule_change\/edit\/(\w+)/,
            name: '调班流程',
            format: '/admin/schedule_change/edit/{1}',
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/schedule_change\/view\/(\w+)/,
            name: '调班流程结束',
            format: '/admin/schedule_change/view/{1}',
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/work_travel_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '出差流程审批',
            format: "/admin/todo/redirect?ts_toid={1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/work_travel_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '出差流程审批结束',
            format: "/admin/tm/work_travel/view/{1}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/012\/km_bb_fetch_detail\/(\w+)\/(\w+)\/(\w+)/,
            name: '知识管理',
            format: "/km/km_detail/{1}/{2}"
        }

        , { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/37\/(\w+)\-(\w+)\-(\w+)\/1\/(\w{0,})/,
            name: '招聘管理',
            format: "/admin/recruitment/candidate/cand_edit/{1}?validate=true"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/contract\/operation\/sign\/(\w+)\?no=(\w+)/,
            name: '合同签订',
            format: "/admin/contract/operation/sign/{1}?no={2}"
        }, {
            rule: /contract_finished/,
            name: '签订完成',
            format: "#"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/contract\/operation_agreement\/sign\/(\w+)\?no=(\w+)/,
            name: '协议签订',
            format: "/admin/contract/operation_agreement/sign/{1}?no={2}"
        }, {
            rule: /contract_agreement_finished/,
            name: '签订完成',
            format: "#"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/wf_busi_edit\/(\w+)\/(\w{0,})/,
            name: '业务流程编辑',
            format: "/admin/busi_wf/flow/bbform/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/wf_busi_view\/(\w+)\/(\w{0,})/,
            name: '业务流程查看',
            format: "/admin/busi_wf/flow/bbview/{1}"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/15\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '转正流程(HR)',
            format: "/admin/pa/wf/ending_probation_hr/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/42\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '批量转正流程',
            format: "/admin/pa/wf/batch_ending_probation/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/16\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '转正流程',
            format: "/admin/pa/wf/ending_probation/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/17\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '离职流程',
            format: "/admin/pa/wf/termination_employment/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/18\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '离职流程(HR)',
            format: "/admin/pa/wf/termination_employment_hr/edit/{1}?validate=true"
        }

        , { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/30\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '离职交接流程',
            format: "/admin/pa/wf/termination_transfer_pr/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/29\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '离职交接流程(HR)',
            format: "/admin/pa/wf/termination_transfer/edit/{1}?validate=true"
        }

        , { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/19\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '平调流程',
            format: "/admin/pa/wf/move/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/20\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '晋升流程',
            format: "/admin/pa/wf/promotion/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/21\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '降级流程',
            format: "/admin/pa/wf/demotion/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/pa_z8\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '复职流程(HR)',
            format: "/admin/rehire/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/22\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '停薪留职流程(HR)',
            format: "/admin/pa/wf/unpaid_leave_of_absence_hr/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/23\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '停薪留职流程',
            format: "/admin/pa/wf/end_unpaid_leave_of_absence/edit/{1}?validate=true"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/24\/(\w+)-(\w+)\/(\w+)\/(\w{0,})/,
            name: '停薪留职流程(HR)',
            format: "/admin/pa/wf/end_unpaid_leave_of_absence/edit/{1}?validate=true"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/014\/wechat_interview_host_info\/(\w+)\/(\w{0,})/,
            name: '面试',
            format: "/admin/recruitment/interview/iv_form?it_id={1}"
        },
        {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getAssessment\/(\w+)\/(\w{0,})/,
            name: '绩效',
            format: "/admin/pm/assessment_instance/wf01/edit/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getAssessmentWip\/(\w+)\/(\w+)\/(\w+)\/(\w{0,})/,
            name: '绩效过程',
            format: "/admin/pm/assessment_instance/edit/{1}?mode=view"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/007\/getCalendarDetail\/(\w+)\?wp_id=(\w+)/,
            name: '日历',
            format: "/admin/pm/work_plan/bbform"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendance_result_wf_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '考勤异常(查看)',
            format: '/admin/tm/tm_wf/view/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendance_result_wf_hr_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '批量考勤异常(查看)',
            format: '/admin/tm/tm_wf/hr_view/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendance_result_wf_hr_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '批量考勤异常(审批)',
            format: '/admin/tm/tm_wf/hr_edit/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/self_entry\/send_my_message_process2\/(\w+)\?current_task=(\w+)/,
            name: '自助入职审批',
            format: '/admin/self_entry/edit_fast_entry_process/{2}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/009\/goGrade\/(\w+)\?operation_id=(\w+)-(\w+)/,
            name: '问卷消息',
            format: "/admin/pm/questionnair_template/grade_bbform?qt_id={2}-{3}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/getGoDo\/3\/(\w+)-(\w+)-(\w+)\/1\/(\w{0,})/,
            name: '绩效计划',
            format: "/admin/pm/assessment_instance/wf01/edit/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/011\/getSummary\/(\w{0,})/,
            name: '绩效总结',
            format: "/admin/pm/assessment_instance/summary/list"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/wf_approve_detail\/(\w+)\/(\w{0,})/,
            name: '自由流程(查看)',
            format: "/admin/free_wf/approve/bbview/{1}"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/wf_approve_edit\/(\w+)/,
            name: '自由流程(办理)',
            format: "/admin/free_wf/approve/bbform/{1}"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/012\/kmqa_question_detail\/(\w+)/,
            name: '问答邀请消息',
            format: "/admin/km_qa/detail/{1}"
        }, { //
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/012\/km_answer\/(\w+)\?q_id=(\w+)/,
            name: '问答回答消息',
            format: "/admin/km_qa/detail/{2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/009\/getPublicTrainingShow\/(\w+)\?pa_id=(\w+)/,
            name: '培训活动',
            //format: "/admin/course/train_plan/form_manage/{2}"
            format: "/wxapp/009/public_training/show/{2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/km\/send_msg\/(\w+)\?km_id=(\w+)\&is_admin=(\w+)/,
            name: '知识库消息',
            format: "/km/km_detail/{2}/{3}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/012\/km_bb_fetch_detail\/(\w+)\/(\w+)\/(\w+)/,
            name: '知识库详情',
            format: "/km/km_detail/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/006\/profile_user\?people_id=(\w+)/,
            name: '证件到期，查看员工档案',
            format: "/admin/masterdata/people/edit/{1}?mode=view"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/pm\/birthday\/message_views_new\/(\w+)\?people_id=(\w+)/,
            name: '员工生日消息互动',
            format: "/admin/pm/birthday/message_views/{2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/010\/pa_report\/new_chart_skip\/(\w+)\/(\w+)\/(\w+)/,
            name: '订阅报表，查看报表',
            format: "/admin/pa/report_list?rp_id={1}&rp_type={2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendance_result_wf_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '考勤异常(办理)',
            format: '/admin/tm/tm_wf/edit/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/back_leave_form_wechat\/(\w+)\/deal_with\/(\w{0,})/,
            name: '请假调整(办理)',
            format: '/admin/tm/wf_back_after_leave_of_absence/edit/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/back_leave_form_wechat\/(\w+)\/view\/(\w{0,})/,
            name: '请假调整(办理)',
            format: '/admin/tm/wf_back_after_leave_of_absence/view/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/self_entry\/send_my_message_process1\/(\w+)\?piid=(\w+)/,
            name: '自助入职(查看)',
            format: '/admin/self_entry/view_fast_entry_process/{2}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/self_entry\/hr_process\/edit\/(\w+)/,
            name: '自助入职(编辑)',
            format: '/admin/self_entry/hr_process/edit/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/self_entry\/hr_process\/view\/(\w+)/,
            name: '自助入职(查看)',
            format: '/admin/self_entry/hr_process/view/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/011\/my_performance_index/,
            name: '指标共享',
            format: "/admin/pm/pm_index/form"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/get_ai_summary\/(\w+)\?ai_id=(\w+)/,
            name: '绩效总结消息',
            format: "/admin/pm/assessment_instance/edit/{2}?mode=view"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/leave_manage_list\/(Q|L)\/(\w+)/,
            name: '假期余额列表',
            format: "/admin/tm/absence/my_leave_list"
        }, {
            rule: /^\/wxapp\/010\/pa\/confirm_msg\/(\w+)\?start_date=(.+)\&end_date=(.+)\&pl_id=(\w+)\&cpy_id=(\w+)/,
            name: '薪酬确认',
            format: "/admin/compensation/report/my_salary_list?start_date={2}&end_date={3}&pl_id={4}&cpy_id={5}&is_approval=false"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/010\/my_salary_change_info\/(\w+)\/(\w+)\/(\w+)/,
            name: '薪酬调整',
            format: "/wxapp/compensation_adjust/{1}?type={2}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/010\/my_salary_change_info\/(\w+)\/(\w+)\-(\w+)\/(\w+)/,
            name: '薪酬调整',
            format: "/wxapp/compensation_adjust/{1}?type={2}-{3}"
        }

        , {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/015\/second_page\?module_code=RC&require_collect=(\w+)/,
            name: '招聘需求收集', //https://www.zhisiyun.com/wxapp/015/second_page?module_code=RC&require_collect='+cr._id
            format: "/admin/recruitment/require_collect/list_tree/{1}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/getRewardPunish\/(\w+)\/(\w+)/,
            name: '奖惩消息',
            format: "/admin/masterdata/people/edit/{2}?tabpage=reward_punishs"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/007\/send_zodiac_view\/(\w+)/,
            name: '今日运势消息查看',
            format: "/pc/my_stars"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)\?from_date=(\w+)-(\w+)-(\w+)\&to_date=(\w+)-(\w+)-(\w+)\&form_ax=true/,
            name: '考勤异常阿香',
            format: "/admin/tm_reborn/work_result_ax/hr_list_v2?from_date={2}-{3}-{4}&to_date={5}-{6}-{7}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)\?from_date=(\w+)-(\w+)-(\w+)\&form_ax=true/,
            name: '考勤异常阿香',
            format: "/admin/tm_reborn/work_result_ax/hr_list_v2?check_date={2}-{3}-{4}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)\?form_ax=true/,
            name: '考勤异常阿香',
            format: "/admin/tm_reborn/work_result_ax/hr_list_v2"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)\?from_date=(\w+)-(\w+)-(\w+)\&to_date=(\w+)-(\w+)-(\w+)/,
            name: '考勤异常',
            format: "/admin/tm/cardrecord/hr_list_v2?from_date={2}-{3}-{4}&to_date={5}-{6}-{7}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)\?from_date=(\w+)-(\w+)-(\w+)/,
            name: '考勤异常',
            format: "/admin/tm/cardrecord/hr_list_v2?check_date={2}-{3}-{4}"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/001\/attendanceResultChange\/(\w+)/,
            name: '考勤异常',
            format: "/admin/tm/cardrecord/hr_list_v2"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/010\/my_salary_change_info\/(\w+)\/U\/(\w{0,})/,
            name: '薪酬调整查看',
            format: "#"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/compensation\/process\/init\/send_my_message_process2\/(\w+)\?current_task=(\w+)/,
            name: '个人薪酬初始化(办理)',
            format: '/admin/compensation/process/init_edit/{2}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/compensation\/process\/init\/send_my_message_process1\/(\w+)\?piid=(\w+)/,
            name: '个人薪酬初始化(查看)',
            format: '/admin/compensation/process/init_view/{2}'
        }, {
            rule: /^http:\/\/qas.zhisiyun.com\/wxapp\/004\/busi_wf\/renewal_start\/(\w+)\?cid=(\w+)/,
            name: '合同续签征询',
            format: '/admin/contract/renewal/wf/start_form/{2}'
        }, {
            rule: /^http:\/\/qas.zhisiyun.com\/admin\/contract\/operation\/form\?action=stop&oid=(\w+)/,
            name: '合同续签征询',
            format: '/admin/contract/operation/form?action=stop&oid={1}'
        }, {
            rule: /^http:\/\/qas.zhisiyun.com\/admin\/contract\/operation\/form\?action=edit&oid=(\w+)/,
            name: '新合同编辑',
            format: '/admin/contract/operation/form?action=edit&oid={1}'
        }, {
            rule: /^http:\/\/qas.zhisiyun.com\/admin\/contract\/operation\/form\?action=terminate&oid=(\w+)/,
            name: '合同解除',
            format: '/admin/contract/operation/form?action=terminate&oid={1}'
        }, {
            rule: /^http:\/\/qas.zhisiyun.com\/admin\/contract\/operation\/form\?action=continue&oid=(\w+)\&status=111/,
            name: '合同续签',
            format: '/admin/contract/operation/form?action=continue&oid={1}&status=111'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/admin\/pm\/work_report\/form_new\/(\w+)\?wr_id=(\w+)/,
            name: '工作报告分配事项',
            format: '/admin/pm/work_report/form_new?wr_id={2}'
        }, {
            rule: /^\/wxapp\/people_self_modify\/edit_form\/(\w+)\?mark=H/,
            name: '员工字段修改',
            format: '/admin/people_self_modify/edit_form/{1}\?mark=H'
        }, {
            rule: /^\/wxapp\/people_self_modify\/edit_form\/(\w+)/,
            name: '员工字段修改消息驳回',
            format: '/admin/people_self_modify/edit_form/{1}'
        }, {
            rule: /^http:\/\/www.zhisiyun.com\/wxapp\/006\/ppSkillDetail\/(\w+)/,
            name: '技能素质点赞',
            format: '/admin/pm/pp_skill/{1}'
        }, {
            rule: /^http:\/\/www.zhisiyun.com\/wxapp\/007\/detail\/(\w+)/,
            name: '外勤签到',
            format: '/admin/checkin/detail/{1}'
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/004\/todo_list\/001/,
            name: '未完成计划、考核消息提醒',
            format: "/admin/wf/todo_list"
        }, {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/011\/getARCI\/(\w+)/,
            name: '绩效校准消息',
            format: "/admin/pm/assessment_instance/wf05/view/{1}"
        }, {
            rule: /^\/wxapp\/004\/go_do\/1\/(\w+)-(\w+)-AssessmentInstance01\/1/,
            name: '绩效计划转办流程待确认',
            format: "/admin/pm/assessment_instance/wf01/edit/{1}?zb_type=1"
        }, {
            rule: /^\/wxapp\/004\/go_do\/1\/(\w+)-(\w+)-AssessmentInstance04\/1/,
            name: '绩效考评',
            format: "/admin/pm/assessment_instance/wf04/edit/{1}?zb_type=1"
        }, {
            rule: /^\/wxapp\/004\/go_ai_read\/(\w+)/,
            name: '绩效转办已撤回',
            format: "/admin/pm/assessment_instance/edit/{1}?mode=view"
        }, {
            rule: /^\/wxapp\/004\/busi_wf\/renewal_edit\/(\w+)\/edit/,
            name: '合同续签征询',
            format: '/admin/contract/renewal_leader/wf/edit_form/{1}'
        },
        // /admin/pm/mobile_resource_calendar/list
        // https://www.zhisiyun.com/wxapp/007/getCalendarDetail/wx3bd6f3aa75c0c7e7?wp_id=5e74b4f73d5958535075b1e4&cal_date=2020-03-20
        // https://www.zhisiyun.com/wxapp/007/getCalendarDetail/?wp_id=5e74aea97398261c045bd4db&cal_date=2020-03-19
        {
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/007\/getCalendarDetail\/(\w+){0,1}\?wp_id=(\w+)/,
            name: '资源预定',
            format: '/admin/pm/mobile_resource_calendar/list'
        },
        { // https://www.zhisiyun.com/wxapp/005/getMrView/?mr_id=5e7495e7ab86ab703a62fb4f
            rule: /^https:\/\/www.zhisiyun.com\/wxapp\/005\/getMrView\/(\w+){0,1}\?mr_id=(\w+)/,
            name: '资源预定',
            format: '/admin/pm/mobile_resource_calendar/list'
        }
    ],
    wx_data_adapter(data) {
        for (let item of data) {
            item.target = '_blank'
            if (item.url) {
                if (item.url == "contract_finished" || item.url == 'retire' || item.url == 'parttime') {
                    item.pc_url = "#"
                    item.target = '_self'
                } else if (item.url.indexOf('download_mobile_pdf') >= 0) {
                    item.pc_url = item.url;
                } else if (item.url.indexOf('https://www.bestsign.cn') >= 0) {
                    item.pc_url = "#"
                    item.target = '_self'
                } else if (item.url.indexOf('getPublicActivityShow') > -1) {
                    item.pc_url = '#'
                } else if (item.url.indexOf('km_sendapply') > -1) {
                    item.pc_url = item.url + '&from_homepage=true'
                } else {
                    item.pc_url = this.get_pc_url(item.url);
                }
            } else {
                item.pc_url = ""
            }
            // 显示取消培训通知
            if (item.msg && item.msg.indexOf('培训') > -1 && item.msg.indexOf('取消') > -1 && (!item.url || item.url === '#')) {
                item.pc_url = "#cancelTraining"
                item.target = '_self'
            }
        }
        return _.filter(data, obj => {
            return obj.pc_url.length > 0;
        });
    },
    get_pc_url(url) {
        if (!url) {
            return ""
        }
        let pc_url = "";

        for (let match_obj of this.url_adapter_rule) {
            let match_array = url.match(match_obj.rule);
            if (match_array && match_array.length) {
                pc_url = this.url_format(match_obj.format, match_array);
                break;
            }
        }

        pc_url = pc_url || url;
        return pc_url;
    },
    url_format(format, array) {
        for (let i = 1; i < array.length; i++) {
            format = format.replace(new RegExp("\\{" + i + "\\}", "g"), array[i]);
        }
        return format;
    }
}

export default adapter