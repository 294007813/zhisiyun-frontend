/**自定义公共方法 **/
import axios from 'gl/axios'
import moment from "moment";
import conf from '~/proj-config'
// let {linkUrl} = conf

const util= {
    conf,

    /**
    函数只被调用一次
    用法：
    var callOnce = once(function() {
        console.log('javascript');
    });
    callOnce(); // javascript
    callOnce(); // null
    **/
    once(callback){
        let result;
        return function() {
            if(callback) {
                result = callback.apply(this, arguments);
                callback = null;
            }
            return result;
        }
    },

    /**上传附件**/
    upfile (callback, param) {
        let {accept, url}= param || {}
        let input = document.createElement("input");
        input.setAttribute("type", 'file');
        input.setAttribute("accept", accept|| "*");
        input.onchange= ()=>{
            let formdata = new FormData();
            formdata.append('qqfile' , input.files[0], input.files[0].name);
            // formdata.append('access_token' , $store.state.user.token);
            axios.post(url|| '/gridfs/put_external', formdata,
                {headers: {'Content-Type': 'multipart/form-data'}, dataLevel:"api"}
            ).then((res) => {
                callback(res)
            })
        }
        input.click()
    },

    /**获取相对时间**/
    getRelativeDate(date, en){
        let tid= moment(date).toNow(true),
        res= tid.replace("seconds","秒")
            .replace("minute","分钟")
            .replace("hour","小时")
            .replace("day","天")
            .replace("month","月")
            .replace("year","年")
            .replace("few","")
            .replace("s","")
            .replace(" ","")
            .replace("a","1")
        // console.log("tid", tid)
        return en? tid: res
    },
    getPic(id){
        return `${conf.linkUrl}/gridfs/get/${id}`
    },
    href(url, open){
        let path= conf.linkUrl+ url
        if(open){
            window.open(path, "_blank");
        }else{
            window.top.location.href = path
        }
    },
    deepClone(data){
        return JSON.parse(JSON.stringify(data))
    },
    /**
     * 金额格式化
     * @return 12344.5 -> 12,344.5;
     */
    currencyFilter(s, isHavePoint) {
        s = (+s) + "";
        let h = "";
        if (s.charAt(0) == "-") {
        h = "-";
        s = s.slice(1);
        }
        if (/[^0-9\.]/.test(s)) {
        return "invalid value";
        }
        if ((!s.includes(".")) && isHavePoint) return h + (+s || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)) {
        s = s.replace(re, "$1,$2");
        }
        s = s.replace(/,(\d\d)$/, ".$1");
        return (h + s.replace(/^\./, "0."));
    },
    /**
     * 字符串转dom
     */
    parseDom(str) {
        let objE = document.createElement("div"), res=null;
        objE.innerHTML = str;
        res= objE.childNodes
        return res.length==1? res[0]: res;
    }
}


export default Object.freeze(util)

