/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * @file:  Leave.js V0.0.1
	 * @author: lulizhou
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	{
	  (function () {
	    /**
	     * Leave 配置项
	     *
	     * @param
	     * id : String 需要渲染进去的id
	     * images : Array 图片URL地址
	     * links : Array 图片的link地址
	     * autoplay : Boolean 是否自动播放
	     * shownavbar: Boolean 是否显示底部导航
	     * height : String 带单位的轮播图高度
	     * time : Int 轮播图时间间隔
	     * @returns
	     */
	    var DEFAULT = {
	      autoplay: true,
	      shownavbar: true,
	      autotime: 3000
	    };

	    var Leave = function () {
	      function Leave(config) {
	        _classCallCheck(this, Leave);

	        //读取默认配置
	        this.config = Object.assign(config, DEFAULT);
	        //渲染宽度
	        this.DEVICE_WIDTH = document.body.clientWidth;
	        //轮播图图片个数
	        this.SIZE = 0;
	        //激活的id
	        this.active_id = 0;
	        // 触摸区域
	        this.touchArea = null;
	        // 移动区域
	        this.moveArea = null;
	        //导航栏区域
	        this.navbarArea = null;
	        this.timer = null;
	        this.render();
	      }

	      _createClass(Leave, [{
	        key: "start",
	        value: function start() {
	          this.touchArea = document.querySelector(".leave-slider");
	          this.moveArea = document.querySelector(".leave-slider ul");
	          this.navbarArea = document.querySelectorAll('.leave-status span');
	          this.autoPlay();
	          this.handlerTouch();
	        }
	        // 渲染HTML函数

	      }, {
	        key: "render",
	        value: function render() {
	          var _this = this;

	          var ROOT = document.querySelector(config['id']);
	          var images = config['images'];
	          var links = config['links'] || ['javascript:;'];
	          this.SIZE = images.length;
	          var items = "";
	          var navbar = "";
	          var body = "";
	          images.forEach(function (element, index) {
	            items += "\n        <li style=\"background-image:url(" + element + ");width:" + _this.DEVICE_WIDTH + "px\">\n        ";
	            items += index < links.length ? "<a href=\"" + links[index] + "\"></a></li>" : "<a href=\"javascript:;\"></a></li>";
	            if (index === 0) {
	              navbar += "<span class=\"active\"></span>";
	            } else {
	              navbar += "<span></span>";
	            }
	          });

	          body = !!this.config['height'] === false ? "<div class=\"leave-slider\">" : "<div class=\"leave-slider\" style=height:" + this.config['height'] + ">";
	          var outHTML = body + "\n      <ul class=\"leave-images\" style=\"width:" + this.DEVICE_WIDTH * this.SIZE + "px\">\n      " + items + "\n      </ul>\n      <div class=\"leave-status\">\n      " + navbar + "\n      </div>\n      </div>";
	          ROOT.innerHTML = outHTML;
	        }
	      }, {
	        key: "autoPlay",
	        value: function autoPlay() {
	          var _this2 = this;

	          if (this.config['autoplay']) {
	            var time = this.config['autotime'];
	            this.timer = setInterval(function () {
	              if (_this2.active_id < _this2.SIZE - 1) {
	                _this2.active_id++;
	              } else {
	                _this2.active_id = 0;
	              }
	              _this2.doMove();
	            }, time);
	          }
	        }
	        //处理手势事件

	      }, {
	        key: "handlerTouch",
	        value: function handlerTouch() {
	          var _this3 = this;

	          //几个像素触发滚动
	          var distance = this.DEVICE_WIDTH / 3,

	          //触摸区域
	          touchArea = this.touchArea,

	          //移动区域
	          moveArea = this.moveArea,

	          //移动区域计算后的宽度
	          move_area_width = -this.DEVICE_WIDTH * (this.SIZE - 1),

	          //触摸起始点
	          start_touch_x = 0,

	          //触摸结束点
	          end_touch_x = 0,

	          //触摸距离
	          touch_distance = 0,

	          //样式x的原始值
	          orginal_x = 0,

	          //touchStart Event
	          touchstart = function touchstart(event) {
	            clearInterval(_this3.timer);
	            event.preventDefault();
	            start_touch_x = event.changedTouches[0].pageX;
	            orginal_x = -_this3.DEVICE_WIDTH * _this3.active_id;
	          },

	          //touchMove Event
	          touchmove = function touchmove(event) {
	            event.preventDefault();
	            var x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
	            _this3.setCSS(_this3.moveArea, x);
	          },

	          //touchEnd Event
	          touchend = function touchend(event) {
	            event.preventDefault();
	            end_touch_x = event.changedTouches[0].pageX;
	            touch_distance = start_touch_x - end_touch_x;
	            //滚动手势判断
	            //1.滚动超过阈值，就翻到下一页。
	            if (touch_distance > distance) {
	              _this3.nextPage();
	            } else if (touch_distance < -distance) {
	              _this3.prevPage();
	            } else {
	              _this3.hold();
	            }
	            _this3.autoPlay();
	          };

	          //bind Event
	          touchArea.addEventListener('touchstart', touchstart);
	          touchArea.addEventListener('touchmove', touchmove);
	          touchArea.addEventListener('touchend', touchend);
	        }
	        //设定CSS

	      }, {
	        key: "setCSS",
	        value: function setCSS(obj, x) {
	          obj.style['-webkit-transform'] = "translateX(" + x + "px)";
	          obj.style['transform'] = "translateX(" + x + "px)";
	        }
	        //移动函数

	      }, {
	        key: "doMove",
	        value: function doMove() {
	          this.navbarControl();
	          var x = -this.DEVICE_WIDTH * this.active_id;
	          this.setCSS(this.moveArea, x);
	        }
	      }, {
	        key: "hold",
	        value: function hold() {
	          this.doMove();
	        }
	      }, {
	        key: "nextPage",
	        value: function nextPage() {
	          this.active_id < this.SIZE - 1 && this.active_id++;
	          this.doMove();
	        }
	      }, {
	        key: "prevPage",
	        value: function prevPage() {
	          this.active_id > 0 && this.active_id--;
	          this.doMove();
	        }
	      }, {
	        key: "navbarControl",
	        value: function navbarControl() {
	          var id = this.active_id;
	          var navbarArea = this.navbarArea;
	          navbarArea[id - 1] && (navbarArea[id - 1].className = "");
	          navbarArea[id + 1] && (navbarArea[id + 1].className = "");
	          id == 0 && (navbarArea[this.SIZE - 1].className = "");
	          navbarArea[id].className = " active";
	        }
	      }]);

	      return Leave;
	    }();

	    window.Leave = Leave;
	  })();
	}

/***/ }
/******/ ]);