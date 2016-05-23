// (function leave(exports) {
    var output = document.getElementById('output');
    var touchArea = document.querySelectorAll('#leave-slider ul')[0];
    //触摸起始点
    var start_touch_x = 0;
    //样式x的原始值
    var orginal_x = 0;
    //匹配括号内容
    var findx = /\(([^\)]*)\)/g

    function hanldeTouchEvent(event) {
        event.preventDefault();
        switch (event.type) {
            case 'touchstart':
                start_touch_x = event.changedTouches[0].pageX;
                //output.innerHTML = "touch started (" + event.touches[0].pageX + "," + event.touches[0].pageY + ")";
                break;
            case 'touchend':
                var matches = touchArea.style.transform.match(findx)[0].slice(1,-1).trim().split(",")[0].slice(0,-2);
                orginal_x=parseFloat(matches);
                //output.innerHTML = "touch ended (" + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY + ")";
                break;
            case 'touchmove':
                //当前的x值等于touch的值-触摸起始点+样式x的原始值
                x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
                touchArea.style.transform = "translate3d(" + x + "px,0,0)";
                //output.innerHTML = "touch moved (" + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY + ")";
                break;
        }
    }
    touchArea.addEventListener('touchstart', hanldeTouchEvent);
    touchArea.addEventListener('touchend', hanldeTouchEvent);
    touchArea.addEventListener('touchmove', hanldeTouchEvent);
// })(window)
