/**自定义公共方法 **/
import axios from 'gl/axios'
import moment from "moment";
import conf from '~/proj-config'
let {linkUrl} = conf

const util= {

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
            formdata.append('file' , input.files[0], input.files[0].name);
            // formdata.append('access_token' , $store.state.user.token);
            axios.post(url|| '/gridfs/put_external', formdata,
                {headers: {'Content-Type': 'multipart/form-data'}}
            ).then((res) => {
                callback(res)
            })
        }
        input.click()
    },

    /**获取相对时间**/
    getRelativeDate(date){
        let tid= moment(date).toNow(true),
        res= tid.replace("seconds","秒")
            .replace("minute","分钟")
            .replace("hour","小时")
            .replace("day","天")
            .replace("month","月")
            .replace("year","年")
            .replace("s","")
            .replace(" ","")
            .replace("a","1")
        // console.log("tid", tid)
        return res
    },
    href(url, open){
        let path= linkUrl+ url
        if(open){
            window.open(path, "_blank");
        }else{
            window.location.href= path
        }
    }
}


export default Object.freeze(util)

