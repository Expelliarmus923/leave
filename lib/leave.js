// (function leave(exports) {
    var output = document.getElementById('output');
    //触摸区域
    var touchArea = document.querySelector("#leave-slider");
    //移动区域
    var moveArea = document.querySelector('#leave-slider ul');
    var itemSize = document.querySelectorAll('#leave-slider ul li').length;
    var itemWidth = document.querySelectorAll('#leave-slider ul li')[0];
    //移动区域计算后的宽度
    var move_area_width = -parseFloat(getComputedStyle(itemWidth,false).width.slice(0,-2))*(itemSize-1);
    //触摸起始点
    var start_touch_x = 0;
    //样式x的原始值
    var orginal_x = 0;
    //匹配括号内容
    var findx = /((\-?\d+px)+)/g

    function hanldeTouchEvent(event) {
        event.preventDefault();
        switch (event.type) {
            case 'touchstart':
                start_touch_x = event.changedTouches[0].pageX;
            case 'touchend':
                var matches = moveArea.style.transform.match(findx)[0].slice(0,-2);
                orginal_x = parseFloat(matches);
                break;
            case 'touchmove':
                //当前的x值等于touch的值-触摸起始点+样式x的原始值
                x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
                //两个if判断合成一个了。
                (x>=0)&&(x=0)||(x<=move_area_width)&&(x=move_area_width);
                moveArea.style.transform = "translate3d(" + x + "px,0,0)";
                break;
        }
    }
    touchArea.addEventListener('touchstart', hanldeTouchEvent);
    touchArea.addEventListener('touchend', hanldeTouchEvent);
    touchArea.addEventListener('touchmove', hanldeTouchEvent);
// })(window)
