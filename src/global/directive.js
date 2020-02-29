import Vue from 'vue'

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
        let {donecb, movcb, only, className, exclude}= params
        let mx= only== 'x'||!only,  my= only== 'y'|| !only;
        let disx = null
        let disy = null
        let interval= params.hasOwnProperty("interval")? params.interval: 300
        let timer = null

        function mousedown(e) {
            disx = e.pageX - el.offsetLeft;
            disy = e.pageY - el.offsetTop;
            el.classList.add(className|| "moving")
        }
        function mounemove(e) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                movcb({x: e.pageX, y: e.pageY, ...params})
            }, interval)
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
        console.log("vnode", vnode)
        console.log("el.style", el.style)
    },
    update(el, binding, vnode) {
        // let top = el.pageX + 'px'
        // let left = el.pageY + 'px'
        let params= binding.value
        let { have}= params
        console.log("have", have)
    }
})