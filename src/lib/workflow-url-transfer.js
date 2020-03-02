const transfer = {
    go_grade(qt_id) {
        window.location = '/admin/pm/questionnair_template/grade_bbform?qt_id=' + qt_id;
    },

    go_common_grade(qt_id, category) {
        window.location = '/admin/pm/questionnair_template/grade_common_bbform?qt_id=' + qt_id + "&category=" + category;
    },

    go_mbti(id) {
        window.location = '/admin/pm/mbti/notice_bbform?qb_id=' + id;
    },

    go_grade_ou(qt_id) {
        window.location = '/admin/pm/questionnair_template/grade_ou_bbform?qt_id=' + qt_id;
    },

    go_fa(id) {
        window.location.href = '/admin/free_wf/approve/bbform/' + id;
    },

    go_busi(id) {
        window.location.href = '/admin/busi_wf/flow/bbform/' + id;
    },

    go_nf(id) {
        window.location.href = '/admin/im/form?im_id=' + id;
    },

    go_wr(id) {
        window.location.href = '/admin/pm/work_report/form?wr_id=' + id;
    },

    go_weekreport(id) {
        window.location.href = '/admin/pm/work_report/form_new?wr_id=' + id;
    },

    go_work_plan_approve(id) {
        window.location.href = '/admin/tm_reborn/work_plan_approve/form?approve_id=' + id;
    },

    go_ep(id) {
        window.location.href = '/admin/em_proof/view/emproofs/edit/' + id;
    },

    go_enneagram(id) {
        window.location = '/admin/pm/enneagram/notice_bbform?qb_id=' + id;
    },

    go_requires(id) {
        window.location = '/admin/recruitment/require_collect/list_tree/' + id;
    },

    go_self_entry(id) {
        window.location = 'admin/self_entry/creat_self_entry_view';
    },

    go_approval_qt(id) {
        window.location = 'admin/pm/questionnair_template/approval_questionnaire?q_id=' + id;
    },

    go_candidate(id) {
        window.location = '/admin/recruitment/candidate/list';
    },

    go_interview(id) {
        window.location = '/admin/recruitment/interview/iv_form?it_id=' + id;
    },

    go_approve_interview(id) {
        window.location = '/admin/recruitment/interview/approve_form?it_id=' + id;
    },

    go_prepare_planning(id) {
        window.location = '/admin/prepare_report/prepare_plan_view/' + id + '?mode_type=add'
    },

    go_people_history(id) {
        window.location = '/admin/people_self_modify/edit_form/' + id;
    },

    go_probation_assess_plan(id) {
        window.location = '/admin/probation_assess/plan/' + id + '?source=home';
    },

    go_contract(url, point) {
        window.location = url + '&point=' + point
    },

    go_contract_agreement(url, point) {
        window.location = url + '&point=' + point
    },

    go_ai_summary(id) {
        window.location.href = '/admin/pm/assessment_instance/edit/' + id + '?mode=view';
    },

    go_salary_list(_id, validFrom, validTo, pl_id, cpy_id) {
        window.location.href = "/admin/compensation/report/my_salary_list?start_date=" + validFrom + "&end_date=" + validTo + "&pl_id=" + pl_id + "&cpy_id=" + cpy_id + "&is_approval=false"
    },

    stockBuyBack(_id, type) {
        window.location.href = "/admin/stock/buyback/details/page?v_id=" + _id + "&type=" + type + "";
    },

    view_pi(piid) {
        var purl = '/admin/wf/process_instance/detail/' + piid;
        window.location = purl;
    },

    view_other_pi(piid, type) {
        if (type == 'free') {
            window.location = '/admin/free_wf/approve/bbview/' + piid
        } else if (type == 'busi') {
            window.location = '/admin/busi_wf/flow/bbview/' + piid
        }
    },

    user_process_ti(tiId) {
        var purl = '/admin/wf/process_ti/' + tiId;
        $.get(purl, function (data) {
            show_ajax_loader_s();
            if (data.code == 'OK') {
                if (location.pathname != '/' && location.pathname != '/new') {
                    show_notify_msg(data.msg, data.code);
                }
                var url = data.data;
                window.location = url;
            };
        }).fail(function (err) {
            if (location.pathname != '/' && location.pathname != '/new') {
                show_notify_msg(err.status + ' ' + err.statusText, 'ERR');
            }
        }).always(function () {
            hide_ajax_loader_s();
        })
    },

    add_to_favorite_tcode(tcode_id) {
        if (tcode_id) {
            show_ajax_loader_s();
            var post_url = "/tcode_add_to_favorite";
            var post_data = {
                tcode_id: tcode_id
            };
            $.post(post_url, post_data, function (ret_data) {
                show_notify_msg(ret_data.msg, ret_data.code);
            }).fail(function (err) {
                show_notify_msg(err.status + ' ' + err.statusText, 'ERR');
            }).always(function () {
                hide_ajax_loader_s();
            })
        };
    },

    add_to_favorite_urls() {
        var url = window.location.pathname + window.location.search;
        var title = $('head title').text().replace('智思云 | ', '')
        show_ajax_loader_s();
        var post_url = "/admin/user/add_to_favorite_url";
        var post_data = {
            url: url,
            title: title,
        };
        $.post(post_url, post_data, function (ret_data) {
            show_notify_msg(ret_data.msg, ret_data.code);
        }).fail(function (err) {
            show_notify_msg(err.status + ' ' + err.statusText, 'ERR');
        }).always(function () {
            hide_ajax_loader_s();
        })
    }
}

export default transfer