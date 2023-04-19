//map兼容
(function () {
  if (!Array.prototype.map) {
    Array.prototype.map = function (callback, args) {
      var arg, arr, index;

      if (this == null) {
        throw new TypeError("this is null or not defined");
      }

      var obj = new Object(this);
      var len = obj >>> 0; //获取obj的长度

      if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + "is not a function");
      }

      if (args) {
        arg = args;
      }
      // 创建新数组,长度为原数组O长度len
      arr = new Array(len);
      index = 0;

      while (index < len) {
        var kValue, mappedValue;
        if (index in obj) {
          //kValue为索引k对应的值.
          kValue = obj[index];
          // 执行callback,this指向arr,参数有三个.分别是kValue:值,index:索引,obj:原数组.
          mappedValue = callback.call(arg, kValue, index, obj);
          // 返回值添加到新数组arr中.
          arr[index] = mappedValue;
        }
        index++;
      }
      return arr;
    };
  }
})();
//tab
function TAB_SWIPER($el, bindSwiper) {
  var self = this;
  this.$el = $el;
  this.bindSwiper = bindSwiper;
  this.swiper = null;
  this.arrow = $el.find("span.arrow");
  this.$slides = $el.find(".swiper-slide");

  this.init();

  //
  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      self.init();
    }, 200);
  });

  //
  if (this.bindSwiper) {
    this.bindSwiper.on("slideChange", function () {
      if (self.swiper) self.swiper.slideTo(this.activeIndex);
      self.$el
        .find(".swiper-slide")
        .eq(this.activeIndex)
        .find("a")
        .addClass("active")
        .parent(".swiper-slide")
        .siblings(".swiper-slide")
        .find("a")
        .removeClass("active");
        sessionStorage.setItem(location.pathname + '$el_bindSwiper_index',this.activeIndex);
    });  
  }
  return this.swiper;
}
TAB_SWIPER.prototype = {
  init: function () {
    var self = this;
    if (this.getWidth()) {
      var swiper = new Swiper(self.$el.find(".swiper-container"), {
        slidesPerView: "auto"
      });
      self.$el
        .find(".arrow-left")
        .unbind()
        .on("click", function () {
          swiper.slidePrev();
        });
      self.$el
        .find(".arrow-right")
        .unbind()
        .on("click", function () {
          swiper.slideNext();
        });

      this.arrow.addClass("show");
      this.swiper = swiper;
    } else {
      if (this.swiper) {
        this.swiper.destroy(false);
        this.swiper = null;
        this.arrow.removeClass("show");
      }
    }
    self.$el
      .find(".swiper-slide a")
      .unbind()
      .on("click", function () {
        if ($(this).hasClass("active")) return;
        if (self.swiper)
          self.swiper.slideTo($(this).parent(".swiper-slide").index());
        $(this)
          .addClass("active")
          .parent(".swiper-slide")
          .siblings(".swiper-slide")
          .find("a")
          .removeClass("active");
        if (self.bindSwiper){
          self.bindSwiper.slideTo($(this).parent(".swiper-slide").index());
        }
      });
      var actIndex = sessionStorage.getItem(location.pathname + '$el_bindSwiper_index');
      if(actIndex && self.$el.length > 0){
        actIndex = JSON.parse(actIndex);
        self.$el.find(".swiper-slide:nth-of-type(" + (actIndex + 1) + ")")
        .find('a')
        .addClass("active")
        .parent(".swiper-slide")
        .siblings(".swiper-slide")
        .find("a")
        .removeClass("active");
        if (self.bindSwiper){
          self.bindSwiper.slideTo(actIndex);
        }
      }
  },
  getWidth() {
    var slidesW = 0;
    this.$slides.each(function () {
      slidesW += parseInt($(this).width());
    });

    return slidesW > this.$el.find(".swiper-container").width();
  }
};

//横向循环焦点
function swiperStyle1(str) {
  var bl = $(str).find(".swiper-style1").hasClass("small") ? 0.6 : 0.8;
  var slideWidth = ($(str).width() * bl) / 2;
  $(window).resize(function () {
    slideWidth = $(str + " .swiper-slide-active").width() / 2;
  });

  var swiper = null;
  function init() {
    //if ($(str).find(".swiper-slide").length <= 1) return;
    if (swiper) {
      swiper.destroy(false, true);
      swiper = null;
    }
    setTimeout(() => {
      if (window.innerWidth > 991) {
        var len = $(str + " .swiper-container .swiper-slide").length;
        swiper = new Swiper(str + " .swiper-container", {
          //autoplay: true,
          watchSlidesProgress: true,
          slidesPerView: "auto",
          centeredSlides: true,
          loop: len > 1 ? true : false,
          //loopedSlides: 3,
          //initialSlide: 1,
          //autoplay: true,
          navigation: {
            nextEl: str + " .swiper-button-next",
            prevEl: str + " .swiper-button-prev"
          },
          on: {
            init() {
              slideWidth = $(str + " .swiper-slide-active").width() / 2;
            },
            progress: function (progress) {
              for (i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                modify = 1;
                if (Math.abs(slideProgress) > 1) {
                  modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                translate = slideProgress * modify * slideWidth + "px";
                scale = 1 - Math.abs(slideProgress) / 5;
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform(
                  "translateX(" + translate + ") scale(" + scale + ")"
                );
                slide.css("zIndex", zIndex);
                slide.css("opacity", 1);
                if (Math.abs(slideProgress) > 3) {
                  slide.css("opacity", 0);
                }
              }
            },
            setTransition: function (transition) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                slide.transition(transition);
              }
            }
          }
        });
      } else {
        swiper = new Swiper(str + " .swiper-container", {
          autoplay: true,
          navigation: {
            nextEl: str + " .swiper-button-next",
            prevEl: str + " .swiper-button-prev"
          }
        });
      }
    }, 200);
  }
  init();
  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      swiper = init();
    }, 200);
  });
}

//横向多图
function swiperStyle2(str, num) {
  var swiper = null;
  var size;
  var len = $(str).find(".swiper-slide").length;
  function initSwiper() {
    if (window.innerWidth > 992) {
      size = num;
    } else {
      size = 3;
    }
    if (len <= size) {
      $(str).find(".swiper-container").addClass("no-more");
    } else {
      $(str).find(".swiper-container").removeClass("no-more");
    }
    swiper = new Swiper(str + " .swiper-container", {
      slidesPerView: size,
      spaceBetween: 12,
      navigation: {
        nextEl: str + " .swiper-button-next",
        prevEl: str + " .swiper-button-prev"
      }
    });
  }
  initSwiper();
  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      if (swiper) {
        swiper.destroy(false);
        swiper = null;
      }
      setTimeout(() => {
        swiper = initSwiper();
      }, 10);
    }, 200);
  });
}

//产品特点
function swiperStyle3(str, num) {
  var swiper = null;

  function init() {
    $(str).find(".swiper-wrapper").removeClass("flex-direction align-center");
    if (window.innerWidth > 767 && $(str).find(".swiper-slide").length > num) {
      $(str).find(".swiper-button-next").show();
      $(str).find(".swiper-button-prev").show();
      swiper = new Swiper(str, {
        slidesPerView: num,
        autoplay: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: $(str).find(".swiper-button-next"),
          prevEl: $(str).find(".swiper-button-prev")
        }
      });
    } else {
      if (swiper) {
        swiper.destroy(false, true);
        swiper = null;
      }
      $(str).find(".swiper-button-next").hide();
      $(str).find(".swiper-button-prev").hide();
      if (window.innerWidth <= 768) {
        $(str).find(".swiper-wrapper").addClass("flex-direction align-center");
      } else {
        $(str).find(".swiper-slide").css("flex", 1);
      }
    }
  }
  init();
  $(str).addClass("show");
  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      init();
    }, 200);
  });
}

//table-style-1
function tableStyle1($el) {
  //table
  var tabIndex = 0;

  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      setVal();
    }, 200);
  });
  setVal();
  function setVal() {
    if (window.innerWidth <= 768) {
      $($el)
        .find("#menu")
        .unbind()
        .on("click", function () {
          $(this).toggleClass("show");
        });
      $($el)
        .find("#menu .col-md-4")
        .unbind()
        .on("click", function () {
          tabIndex = $(this).index() - 1;
          $($el).find(".selected .text").html($(this).find("span").html());
          setVal();
        });
      $($el)
        .addClass("mobile-table")
        .find("td .row")
        .each(function () {
          $(this).find(".col-md-4").eq([tabIndex]).show().siblings().hide();
        });
    } else {
      $($el).removeClass("mobile-table").find("td .row .col-md-4").show();
      tabIndex = 0;
    }
  }
}

//nicescroll 文字新闻列表
function NewsTextList($el, $box) {
  this.$el = $el;
  this.$box = $box;
  this.$nicescrol = $el.find(".do-nicescrol");
  this.init();
  //
  var timer = null;
  var self = this;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      self.resize();
    }, 200);
  });
}
NewsTextList.prototype = {
  init: function () {
    if (window.innerWidth > 767) {
      this.$nicescrol.niceScroll({
        cursorcolor: "#999999",
        cursorwidth: "5px",
        cursorborderradius: "5px", // 滚动条圆角（像素）
        autohidemode: false,
        nativeparentscrolling: true, // 检测内容底部便于让父级滚动
        railoffset: false, // 可以使用top/left来修正位置
        railpadding: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        } //滚动条的位置
      });
      this.resize();
    }
  },
  resize: function () {
    var self = this;
    if (window.innerWidth > 767) {
      var img = new Image();
      img.src = this.$box.find("img.pic").attr("src");
      img.onload = function () {
        self.$el.height(0);
        var height = self.$box.height();
        setTimeout(function () {
          self.$el.height(height);
          self.$nicescrol.getNiceScroll().onResize();
        }, 200);
      };
    } else {
      self.$el.removeAttr("style");
      self.$nicescrol.getNiceScroll().onResize();
    }
  }
};

//header suv_nav point
// var topHeight = window.innerWidth > 991 ? 30 : 0;
// var hasSub = $('.sub-nav').length > 0;
// var hasPoint = $('#point-box').length > 0;
// var $header = $('.header .content');
// var $subNav = $('.sub-nav .sub-nav-content');
// var subNavTop = $('.sub-nav').offset().top;
// var direction = ''; //滚动方向
// initHeaderMenu($(window).scrollTop());
// function initHeaderMenu(top, direction) {
//   //主导航
//   if (!hasPoint && !hasSub && top > topHeight && !$header.hasClass('scroll')) {
//     $header.addClass('scroll');
//   }
//   if (!hasPoint && !hasSub && top <= topHeight && $header.hasClass('scroll')) {
//     $header.removeClass('scroll');
//   }
//   // if ((hasSub || hasPoint) && top > topHeight + $header.height()) {
//   //   $header.addClass('thide');
//   // }
//   // if ((hasSub || hasPoint) && top <= topHeight + $header.height()) {
//   //   $header.removeClass('thide scroll');
//   // }
//   //二级导航
//   if (hasSub && !hasPoint && top > subNavTop && !$subNav.hasClass('scroll')) {
//     $subNav.addClass('scroll');
//   }
//   if (hasSub && !hasPoint && top <= subNavTop && $subNav.hasClass('scroll')) {
//     $subNav.removeClass('scroll');
//   }
//   if (direction === 'up' && $subNav.hasClass('scroll') && !$subNav.hasClass('hidedown')) {
//     //二级当好向上
//     $header.addClass('scroll');
//     $subNav.addClass('hidedown');
//   }
//   if (direction === 'down' && $subNav.hasClass('scroll') && $subNav.hasClass('hidedown')) {
//     //二级当好向上
//     $header.removeClass('scroll');
//     $subNav.removeClass('hidedown');
//   }
// }
// $(window).resize(function () {
//   topHeight = window.innerWidth > 991 ? 30 : 0;
// });
// var sign = 0; //定义默认的向上滚与向下滚的边界
// var step;

// $(window).scroll(function () {
//   var top = $(window).scrollTop();
//   if (top > sign) {
//     sign = top;
//     direction = 'down';
//   }
//   if (top < sign) {
//     sign = top;
//     direction = 'up';
//   }
//   initHeaderMenu(top, direction);
// });
