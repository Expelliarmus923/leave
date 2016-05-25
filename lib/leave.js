/*
 * 期望是引用leave.js后传入HTML的id和图片路径数组就可以使用，无须构建HTML代码和引用css。 
 * var config ={
 *      id: "scroll",//页面渲染的ID
 *      images: [], //图片路径
 *      links: [], //图片链接地址
 *      navbar:true, //轮播图导航显示
 *  };
 * var app = new Leave(config);
 * app.start();
 */
(function(exports) {
    var Leave = function(config) {
        this.config = config;
        //获取页面宽度,$表示常量
        this.$device_width = document.body.clientWidth;
        this.$size = null;
        //被激活的页面id,初始值为0
        this.$active_id = 0;
        this.render(config);
        this.touchArea = null;
        this.moveArea = null;
        //图片位置数组
    }
    Leave.prototype = {
        start: function() {
            this.touchArea = document.querySelector(".leave-slider");
            this.moveArea = document.querySelector('.leave-slider ul');
            this.navbarArea = document.querySelectorAll('.leave-status span');
            this.autoPlay();
            this.handlerTouch();
        },
        render: function() {
            var root = document.getElementById(config['id']);
            //读取config的图片路径
            var images = config['images'];
            //读取links，设定默认值
            var links = config['links'] || ["javascript:;"];
            this.$size = images.length;
            //轮播图图片渲染
            var items = "";
            //轮播图导航栏
            var navbar = "";
            //直接在字符串里加样式，一次渲染HTML，避免不必要的DOM操作 
            for (var i = 0; i < this.$size; i++) {
                items += '<li style="background-image:url(' + images[i] + ');width:' + this.$device_width + 'px';
                items += i < links.length ? '"><a href="' + links[i] + '"></a></li>' : '"><a href="javascript:;"></a></li>';
                if (i === 0) {
                    navbar += '<span class="active"></span>'
                } else {
                    navbar += '<span></span>'
                }
            }
            var outHTML = '<div class="leave-slider"><ul class="leave-images" style="width:' + this.$device_width * this.$size + 'px">' + items + '</ul><div class="leave-status">' + navbar + '</div></div>'
            root.innerHTML = outHTML;
        },
        //自动播放
        autoPlay: function() {
            var _this = this;
            //时间间隔
            var $interval = 3000;
            this.timer = setInterval(function() {
                        if (_this.$active_id < _this.$size - 1) {
                            _this.$active_id++
                        } else {
                            _this.$active_id = 0;
                        }
                        _this.nextPage();
                    }, $interval);
        },
        handlerTouch: function() {
            var _this = this;
            //几个像素触发滚动
            var distance = this.$device_width / 3;
            //触摸区域
            var touchArea = this.touchArea;
            //移动区域
            var moveArea = this.moveArea
                //移动区域计算后的宽度
            var move_area_width = -this.$device_width * (this.$size - 1);
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
                clearInterval(_this.timer);
                start_touch_x = event.changedTouches[0].pageX;
                //计算初始值
                orginal_x = -_this.$device_width * _this.$active_id;
            });
            //触摸结束事件
            touchArea.addEventListener('touchend', function(event) {
                _this.autoPlay();
                event.preventDefault();
                end_touch_x = event.changedTouches[0].pageX;
                touch_distance = start_touch_x - end_touch_x;
                //滚动手势判断
                //1.滚动超过阈值，就翻到下一页。
                if (touch_distance > distance) {
                    _this.$active_id < _this.$size - 1 && _this.$active_id++;
                    _this.nextPage();
                } else if (touch_distance < -distance) {
                    _this.$active_id > 0 && _this.$active_id--;
                    _this.prevPage();
                } else {
                    _this.hold();
                }
            });
            //触摸中事件
            touchArea.addEventListener('touchmove', function(event) {
                event.preventDefault();
                //当前的x值等于touch的值-触摸起始点+样式x的原始值
                var x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
                //两个if判断合成一个了。
                // (x >= 0) && (x = 0) || (x <= move_area_width) && (x = move_area_width);
                _this.setCSS(_this.moveArea, x);
            });
        },
        setCSS: function(obj, x) {
            obj.style['-webkit-transform'] = "translateX(" + x + "px)";
            obj.style['transform'] = "translateX(" + x + "px)";
        },
        domove: function() {
            var x = -this.$device_width * this.$active_id;
            this.setCSS(this.moveArea, x);
        },
        hold: function() {
            this.domove();
        },
        nextPage: function() {
            this.navbarControl();
            this.domove();
        },
        prevPage: function() {
            this.navbarControl();
            this.domove();
        },
        navbarControl: function() {
            var id = this.$active_id;
            var navbarArea = this.navbarArea;
            navbarArea[id - 1] && (navbarArea[id - 1].className = "");
            navbarArea[id + 1] && (navbarArea[id + 1].className = "");
            id == 0 && (navbarArea[this.$size - 1].className = "");
            navbarArea[id].className += " active";
        }

    }
    exports.Leave = Leave;
})(window)
