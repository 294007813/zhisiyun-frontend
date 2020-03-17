import Vue from 'vue'
import i18n from "la";
import {Loading} from 'element-ui';
/**
 * 拖拽指令。 参数对象： {
 * donecb|Function|: 拽结束后的回调，没有则不拖拽，
 * className|String|： 拖拽时自动添加的class，结束后自动移除，如果不传则默认使用：'moving'
 * only|String:'x','y'|：传入'x'则只能左右拖动，传入'y'则只能上下拖动，不传则自由拖动
 * exclude|String|：子元素css选择器，如果传则点它不触发
 * }
**/
Vue.directive('drag', {
    bind(el, binding, vnode) {
        // let top = el.pageX + 'px'
        // let left = el.pageY + 'px'
        let params= binding.value
        let {donecb, movecb, only, className, exclude}= params
        let mx= only== 'x'||!only,  my= only== 'y'|| !only;
        let disx = null
        let disy = null
        let interval= params.hasOwnProperty("interval")? params.interval: 300
        let timer = null

        function mousedown(e) {
            disx = e.pageX - el.offsetLeft;
            disy = e.pageY - el.offsetTop;
            el.classList.add(className|| "moving")
            // console.log(params.item.long, JSON.stringify(params.item))
        }
        function mounemove(e) {
            if(movecb){
                clearTimeout(timer)
                timer = setTimeout(() => {
                    movecb({x: e.pageX, y: e.pageY, ...params})
                }, interval)
            }
            el.style.left = mx&& (e.pageX - disx + 'px');
            el.style.top = my&& (e.pageY - disy + 'px');
        }
        function mouseup(e) {
            el.classList.remove(className|| "moving")
            document.onmouseup = document.onmousemove = null
            if(donecb){
                donecb({x: e.pageX, y: e.pageY, ...params })
            }
            el.style.top = 0
            el.style.left = 0
        }

        function ex(e){
            let doms= null, same= false
            if(exclude){
                doms= el.querySelectorAll(exclude)
                doms.forEach(function (dom) {
                    let l= e.path
                    for(let i in l){
                        if(el=== l[i]){
                            break
                        }
                        if(dom=== l[i]){
                            // console.log("dom", dom)
                            // console.log("e(l[i])", l[i])
                            same= true
                            break
                        }
                    }
                })
            }
            return same
        }

        el.onmousedown = function (e) {
            if( ex(e)|| !donecb){
                return
            }
            mousedown(e)
            document.onmousemove = function (me) {
                mounemove(me)
            }
            document.onmouseup = function (ue) {
                mouseup(ue)
            }
            e.preventDefault();
            // e.stopPropagation();
        }
    }
})

Vue.directive('nodata', {
    bind(el, binding, vnode) {
        let params= binding.value
        let { msg, have}= params
        // console.log("vnode", vnode)
        // console.log("el.style", el.style)
        let div = document.createElement("div")
        let img = document.createElement("img")
        let p = document.createElement("p")
        div.setAttribute("style", "position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align: center;z-index: 1;display: block;");
        div.setAttribute("class", "nodata");
        p.innerText=  msg ||i18n.t('index.no_data')
        p.setAttribute("style", "font-size: 14px;color: #999999;")
        img.setAttribute("src", "./img/common/no-pic.png")
        img.setAttribute("style", "width: 100px;margin-bottom: 10px;")
        if(!have){
            div.style.display ="block";
        }else{
            div.style.display ="none";
        }
        div.appendChild(img)
        div.appendChild(p)
        el.appendChild(div)
        // el.dataset.loading= Loading.service({target: el})

    },
    update(el, binding, vnode) {
        // let top = el.pageX + 'px'
        // let left = el.pageY + 'px'
        let params= binding.value
        let dom= el.querySelector(".nodata")
        let { have}= params
        // console.log("have", have)
        if(!have){
            dom.style.display ="block";
        }else{
            dom.style.display ="none";
        }
    }
})