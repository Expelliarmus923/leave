/*
 * 期望是引用leave.js后传入HTML的id和图片路径数组就可以使用，无须构建HTML代码和引用css。 
 * var config ={id:"#id",images:[images],links:[links]}
 * var app = new Leave();
 * app.start(config);
 */
(function(exports) {
    var Leave = function(config) {
        this.config = config;
        //获取页面宽度
        this.$device_width = document.body.clientWidth;
        this.$size = null;
        this.render(config);
        this.touchArea = null;
        //图片位置数组
    }
    Leave.prototype = {
        start: function() {
            this.touchArea = document.querySelector(".leave-slider");
            this.handlerTouch();
        },
        render: function() {
            var root = document.getElementById(config['id']);
            //读取config的图片路径
            var images = config['images'];
            //读取links，设定默认值
            var links = config['links'] || ["javascript:;"];
            this.$size = images.length;
            var items = "";
            //直接在字符串里加样式，一次渲染HTML，避免不必要的DOM操作 
            for (var i = 0; i < this.$size; i++) {
                items += '<li style="background-image:url(' + images[i] + ');width:' + this.$device_width + 'px';
                items += i < links.length ? '"><a href="' + links[i] + '"></a></li>' : '"><a href="javascript:;"></a></li>';
            }
            var outHTML = '<div class="leave-slider"><ul class="leave-images" style="width:' + this.$device_width * this.$size + 'px">' + items + '</ul></div>'
            root.innerHTML = outHTML;
        },
        handlerTouch: function() {
            var _this = this;
            //几个像素触发滚动
            var distance = 20;
            //触摸区域
            var touchArea = this.touchArea;
            //移动区域
            var moveArea = document.querySelector('.leave-slider ul');
            var itemSize = document.querySelectorAll('.leave-slider ul li').length;
            var itemWidth = document.querySelectorAll('.leave-slider ul li')[0];
            //移动区域计算后的宽度
            var move_area_width = -this.$device_width*(this.$size-1);
            //触摸起始点
            var start_touch_x = 0;
            //触摸结束点
            var end_touch_x = 0;
            //触摸距离
            var touch_distance = 0;
            //样式x的原始值
            var orginal_x = 0;
            var findx = /((\-?\d+px)+)/g
                //触摸开始事件
            touchArea.addEventListener('touchstart', function(event) {
                event.preventDefault();
                start_touch_x = event.changedTouches[0].pageX;
            });
            //触摸结束事件
            touchArea.addEventListener('touchend', function(event) {
                event.preventDefault();
                var matches = moveArea.style.transform.match(findx)[0].slice(0, -2);
                orginal_x = parseFloat(matches);
                end_touch_x = event.changedTouches[0].pageX;
                touch_distance = start_touch_x - end_touch_x;
                if (touch_distance > distance) {
                    moveArea.style.transform = "translate3d(-375px,0,0)";
                }
            });
            //触摸中事件
            touchArea.addEventListener('touchmove', function(event) {
                //当前的x值等于touch的值-触摸起始点+样式x的原始值
                x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
                //两个if判断合成一个了。
                (x >= 0) && (x = 0) || (x <= move_area_width) && (x = move_area_width);
                moveArea.style.transform = "translate3d(" + x + "px,0,0)";
            });
        },
        setSize: function() {

        },
        doMove: function() {

        },
        nextPage: function() {

        },
        prevPage: function() {

        }

    }
    exports.Leave = Leave;
})(window)
