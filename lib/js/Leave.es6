/**
 * @file:  Leave.js V0.0.1
 * @author: lulizhou
 */
'use strict'
{
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
  const DEFAULT = {
    autoplay: true,
    shownavbar: true,
    autotime:3000
  }
  class Leave {

    constructor(config) {
      //读取默认配置
      this.config = Object.assign(config,DEFAULT);
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
    start() {
      this.touchArea = document.querySelector(".leave-slider");
      this.moveArea = document.querySelector(".leave-slider ul");
      this.navbarArea = document.querySelectorAll('.leave-status span');
      this.autoPlay();
      this.handlerTouch();
    }
    // 渲染HTML函数
    render() {
      const ROOT = document.querySelector(config['id']);
      let images = config['images'];
      let links = config['links'] || ['javascript:;'];
      this.SIZE = images.length;
      let items = "";
      let navbar = "";
      let body = "";
      images.forEach((element, index) => {
        items += `
        <li style="background-image:url(${element});width:${this.DEVICE_WIDTH}px">
        `
        items += index < links.length ?
          `<a href="${links[index]}"></a></li>` :
          `<a href="javascript:;"></a></li>`;
        if (index === 0) {
          navbar += `<span class="active"></span>`
        } else {
          navbar += `<span></span>`
        }
      })

      body = !!this.config['height'] === false ?
      `<div class="leave-slider">` :
      (`<div class="leave-slider" style=height:${ this.config['height']}>`);
      let outHTML = `${body}
      <ul class="leave-images" style="width:${this.DEVICE_WIDTH * this.SIZE}px">
      ${items}
      </ul>
      <div class="leave-status">
      ${navbar}
      </div>
      </div>`
      ROOT.innerHTML = outHTML;
    }
    autoPlay(){
      if(this.config['autoplay']){
        let time = this.config['autotime'];
        this.timer = setInterval(() => {
          if (this.active_id < this.SIZE - 1) {
            this.active_id++
          } else {
            this.active_id = 0;
          }
          this.doMove();
        }, time);
      }
    }
    //处理手势事件
    handlerTouch(){
      //几个像素触发滚动
      let distance = this.DEVICE_WIDTH / 3,
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
      touchstart = event => {
        clearInterval(this.timer);
        event.preventDefault();
        start_touch_x = event.changedTouches[0].pageX;
        orginal_x = -this.DEVICE_WIDTH * this.active_id;
      },
      //touchMove Event
      touchmove = event => {
        event.preventDefault();
        let x = event.changedTouches[0].pageX - start_touch_x + orginal_x;
        this.setCSS(this.moveArea, x);
      },
      //touchEnd Event
      touchend = event => {
        event.preventDefault();
        end_touch_x = event.changedTouches[0].pageX;
        touch_distance = start_touch_x - end_touch_x;
        //滚动手势判断
        //1.滚动超过阈值，就翻到下一页。
        if (touch_distance > distance) {
          this.nextPage();
        } else if (touch_distance < -distance) {
          this.prevPage();
        } else {
          this.hold();
        }
        this.autoPlay();
      }

      //bind Event
      touchArea.addEventListener('touchstart',touchstart)
      touchArea.addEventListener('touchmove',touchmove)
      touchArea.addEventListener('touchend',touchend)
    }
  //设定CSS
  setCSS(obj, x){
    obj.style['-webkit-transform'] = `translateX(${x}px)`;
    obj.style['transform'] = `translateX(${x}px)`;

  }
  //移动函数
  doMove(){
    this.navbarControl();
    let x = - this.DEVICE_WIDTH * this.active_id;
    this.setCSS(this.moveArea, x);
  }
  hold(){
    this.doMove();
  }
  nextPage(){
    (this.active_id < this.SIZE - 1) && this.active_id++;
    this.doMove();
  }
  prevPage(){
    this.active_id > 0 && this.active_id--;
    this.doMove();
  }
  navbarControl(){
    var id = this.active_id;
    var navbarArea = this.navbarArea;
    navbarArea[id - 1] && (navbarArea[id - 1].className = "");
    navbarArea[id + 1] && (navbarArea[id + 1].className = "");
    id == 0 && (navbarArea[this.SIZE - 1].className = "");
    navbarArea[id].className = " active";
  }
}
  window.Leave = Leave;
}
