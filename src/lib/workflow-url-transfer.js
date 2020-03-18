import axios from 'gl/axios'
import util from "gl/util"

const transfer = {
    go_grade(qt_id) {
        return util.href('/admin/pm/questionnair_template/grade_bbform?qt_id=' + qt_id)
    },

    go_common_grade(qt_id, category) {
        return util.href('/admin/pm/questionnair_template/grade_common_bbform?qt_id=' + qt_id + "&category=" + category)
    },

    go_mbti(id) {
        return util.href('/admin/pm/mbti/notice_bbform?qb_id=' + id)
    },

    go_grade_ou(qt_id) {
        return util.href('/admin/pm/questionnair_template/grade_ou_bbform?qt_id=' + qt_id)
    },

    go_fa(id) {
        return util.href('/admin/free_wf/approve/bbform/' + id)
    },

    go_busi(id) {
        return util.href('/admin/busi_wf/flow/bbform/' + id)
    },

    go_nf(id) {
        return util.href('/admin/im/form?im_id=' + id)
    },

    go_wr(id) {
        return util.href('/admin/pm/work_report/form?wr_id=' + id)
    },

    go_weekreport(id) {
        return util.href('/admin/pm/work_report/form_new?wr_id=' + id)
    },

    go_work_plan_approve(id) {
        return util.href('/admin/tm_reborn/work_plan_approve/form?approve_id=' + id)
    },

    go_ep(id) {
        return util.href('/admin/em_proof/view/emproofs/edit/' + id)
    },

    go_enneagram(id) {
        return util.href('/admin/pm/enneagram/notice_bbform?qb_id=' + id)
    },

    go_requires(id) {
        return util.href('/admin/recruitment/require_collect/list_tree/' + id)
    },

    go_self_entry(id) {
        return util.href('admin/self_entry/creat_self_entry_view')
    },

    go_approval_qt(id) {
        return util.href('admin/pm/questionnair_template/approval_questionnaire?q_id=' + id)
    },

    go_candidate(id) {
        return util.href('/admin/recruitment/candidate/list')
    },

    go_interview(id) {
        return util.href('/admin/recruitment/interview/iv_form?it_id=' + id)
    },

    go_approve_interview(id) {
        return util.href('/admin/recruitment/interview/approve_form?it_id=' + id)
    },

    go_prepare_planning(id) {
        return util.href('/admin/prepare_report/prepare_plan_view/' + id + '?mode_type=add')
    },

    go_people_history(id) {
        return util.href('/admin/people_self_modify/edit_form/' + id)
    },

    go_probation_assess_plan(id) {
        return util.href('/admin/probation_assess/plan/' + id + '?source=home')
    },

    go_contract(url, point) {
        if (url && url.indexOf("https://www.zhisiyun.com") == 0) //以 https://www.zhisiyun.com 开头的url，把它替换掉
            url = url.replace(/^(https:\/\/www.zhisiyun.com)/g, '')

        return util.href(url + '&point=' + point)
    },

    go_contract_agreement(url, point) {
        if (url && url.indexOf("https://www.zhisiyun.com") == 0) //以 https://www.zhisiyun.com 开头的url，把它替换掉
            url = url.replace(/^(https:\/\/www.zhisiyun.com)/g, '')

        return util.href(url + '&point=' + point)
    },

    go_ai_summary(id) {
        return util.href('/admin/pm/assessment_instance/edit/' + id + '?mode=view')
    },

    go_salary_list(_id, validFrom, validTo, pl_id, cpy_id) {
        return util.href("/admin/compensation/report/my_salary_list?start_date=" + validFrom + "&end_date=" + validTo + "&pl_id=" + pl_id + "&cpy_id=" + cpy_id + "&is_approval=false")
    },

    stockBuyBack(_id, type) {
        return util.href("/admin/stock/buyback/details/page?v_id=" + _id + "&type=" + type + "")
    },

    view_pi(piid) {
        return util.href('/admin/wf/process_instance/detail/' + piid)
    },

    view_other_pi(piid, type) {
        if (type == 'free') {
            return util.href('/admin/free_wf/approve/bbview/' + piid)
        } else if (type == 'busi') {
            return util.href('/admin/busi_wf/flow/bbview/' + piid)
        }
    },

    userprocess_ti(tiId) {
        axios.get('/admin/wf/process_ti/' + tiId).then(data => {
            return util.href(data);
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