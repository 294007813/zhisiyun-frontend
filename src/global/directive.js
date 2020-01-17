import Vue from 'vue'

//拖拽指令。 参数对象： {
// cb: 拽结束后的回调，没有则不拖拽，
// className： 拖拽时自动添加的class，结束后自动移除，如果不传则默认使用：'moving'
// only：传入'x'则只能左右拖动，传入'y'则只能上下拖动，不传则自由拖动
// }
Vue.directive('drag', {
    bind(el, binding, vnode) {
        // let top = el.pageX + 'px'
        // let left = el.pageY + 'px'
        let params= binding.value
        let {cb, only, className}= params
        let mx= only== 'x'||!only,  my= only== 'y'|| !only;
        let disx = null
        let disy = null
        // let timer = null

        function mousedown(e) {
            disx = e.pageX - el.offsetLeft;
            disy = e.pageY - el.offsetTop;
            el.classList.add(className|| "moving")
        }
        function mounemove(e) {
            // clearTimeout(timer)
            // timer = setTimeout(() => {
            // moving({x: e.pageX, y: e.pageY, item, rowind, colind })
            // mouseup(e)
            // movedone({e})
            // }, 400)
            el.style.left = mx&& (e.pageX - disx + 'px');
            el.style.top = my&& (e.pageY - disy + 'px');
        }
        function mouseup(e) {
            el.classList.remove(className|| "moving")
            document.onmouseup = document.onmousemove = null
            if(cb){
                cb({x: e.pageX, y: e.pageY, ...params })
            }
            el.style.top = 0
            el.style.left = 0
        }

        el.onmousedown = function (e) {
            if (e.target.tagName == 'A' || !cb) {
                return
            }
            mousedown(e)
            document.onmousemove = function (e) {
                mounemove(e)
            }
            document.onmouseup = function (e) {
                mouseup(e)
            }
            e.preventDefault();
            // e.stopPropagation();
        }
    }
})