/**自定义公共方法 **/
import axios from 'gl/axios'

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
    }
}


export default Object.freeze(util)

