(function leave(exports) {
    var output = document.getElementById('output');
    var touchArea = document.getElementById('touch');

    function hanldeTouchEvent(event) {
      event.preventDefault();
        switch (event.type) {
            case 'touchstart':
                output.innerHTML = "touch started (" + event.touches[0].pageX + "," + event.touches[0].pageY + ")";
                break;
            case 'touchend':
                output.innerHTML = "<br>touch ended (" + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY + ")";
                break;
            case 'touchmove':
                x = event.changedTouches[0].pageX-100;
                //  y = event.changedTouches[0].pageY-100;
                touchArea.style.transform = "translate3d(" + x + "px,0,0)";
                output.innerHTML = "<br>touch moved (" + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY + ")";
                break;
        }
    }
    document.addEventListener('touchstart', hanldeTouchEvent);
    document.addEventListener('touchend', hanldeTouchEvent);
    document.addEventListener('touchmove', hanldeTouchEvent);
})(window)
