$(function () {
  if ($(window).innerWidth() <= 992) {
    var mySwiper = new Swiper(".page2 .swiper-container", {
      loop: true,
      pagination: {
        el: ".page2 .swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".page2 .swiper-button-next",
        prevEl: ".page2 .swiper-button-prev"
      }
    });
  }

  if ($(window).innerWidth() > 991) {
    var mySwiper = new Swiper(".page5 .swiper-container", {
      slidesPerView: 3,
      loop: true,
      loopAdditionalSlides: 3,
      pagination: {
        el: ".page5 .swiper-pagination",
        clickable: true
      }
    });
  } else {
    var mySwiper = new Swiper(".page5 .swiper-container", {
      loop: true,
      pagination: {
        el: ".page5 .swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".page5 .swiper-button-next",
        prevEl: ".page5 .swiper-button-prev"
      }
    });
  }

  var mouseKey = true;
  setInterval(function () {
    if (mouseKey) {
      var index = $(".page3 .icon-box .item.active").index();
      if (index == 5) {
        index = 0;
      } else {
        index++;
      }
      $(".page3 .bg").removeClass("active");
      $(".page3 .bg").eq(index).addClass("active");
      $(".page3 .text-box").hide().removeClass("active");
      $(".page3 .text-box").eq(index).show().addClass("active");
      $(".page3 .icon-box .item").removeClass("active");
      $(".page3 .icon-box .item").eq(index).addClass("active");
    }
  }, 2000);

  $(".page3 .content")
    .mouseover(function () {
      mouseKey = false;
    })
    .mouseout(function () {
      mouseKey = true;
    });

  if ($(window).innerWidth() > 991) {
    $(".page3 .icon-box .item")
      .mouseover(function () {
        var index = $(this).index();
        $(".page3 .bg").removeClass("active");
        $(".page3 .bg").eq(index).addClass("active");
        $(".page3 .text-box").hide().removeClass("active");
        $(".page3 .text-box").eq(index).show().addClass("active");
        $(".page3 .icon-box .item").removeClass("active");
        $(this).addClass("active");
      })
      .mouseout(function () {
        mouseKey = true;
      });
  } else {
    $(".page3 .icon-box .item").click(function () {
      var index = $(this).index();
      $(".page3 .bg").removeClass("active");
      $(".page3 .bg").eq(index).addClass("active");
      $(".page3 .text-box").hide().removeClass("active");
      $(".page3 .text-box").eq(index).show().addClass("active");
      $(".page3 .icon-box .item").removeClass("active");
      $(this).addClass("active");
    });
  }

  if ($(window).innerWidth() > 991) {
    var imgNode = document.getElementById("loadimg");
    if (!imgNode) return;
    imgNode.onload = function () {
      console.log("图片加载完成");
      var height = $(".news-box .list-box>.item").height();
      $("#wrapper .content").height(height - 50);

      $("#wrapper .content").niceScroll({
        cursorcolor: "#d3d3d3",
        cursorwidth: "6px",
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
    };
    var height = $(".news-box .list-box>.item").height();
    $("#wrapper .content").height(height - 50);
  } else {
    $("#wrapper .content").height(300);
  }

  $("#wrapper .content").niceScroll({
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
  $(window).resize(function () {
    setTimeout(function () {
      $("#wrapper .content").height(0);
      var height = $(".news-box .list-box>.item").height();
      $("#wrapper .content").height(height - 50);
      setTimeout(function () {
        $("#wrapper .content").getNiceScroll().onResize();
      }, 500);
    }, 1000);
  });

  var marginTop = "22%";
  var phoneWidth = "60%";
  var marginLeft = "-35px";
  var step = 1; //手机端比例
  var animateStep = 1.25;

  var oScrollTop = $(window).scrollTop();
  var wheight = $(window).innerHeight();
  var wWidth = $(window).innerWidth();
  for (var i = 0; i < $(".animate1").length; i++) {
    if (
      oScrollTop >
      $(".animate1").eq(i).offset().top - wheight * animateStep
    ) {
      $(".animate1").eq(i).addClass("action");
    }
  }
  for (var i = 0; i < $(".animate2").length; i++) {
    if (
      oScrollTop >
      $(".animate2").eq(i).offset().top - wheight * animateStep
    ) {
      $(".animate2").eq(i).addClass("action");
    }
  }
  $(window).scroll(function () {
    var oScrollTop = $(window).scrollTop();
    var wheight = $(window).innerHeight();
    var wWidth = $(window).innerWidth();
    for (var i = 0; i < $(".animate1").length; i++) {
      if (
        oScrollTop >
        $(".animate1").eq(i).offset().top - wheight * animateStep
      ) {
        $(".animate1").eq(i).addClass("action");
      }
    }
    for (var i = 0; i < $(".animate2").length; i++) {
      if (
        oScrollTop >
        $(".animate2").eq(i).offset().top - wheight * animateStep
      ) {
        $(".animate2").eq(i).addClass("action");
      }
    }
  });

  /*   $('.banner a').click(function () {
    $('.popup').fadeIn();
    $('.popup video').get(0).play();
  });

  $('.popup .close-popup').click(function () {
    $('.popup').fadeOut();
    $('.popup video').get(0).pause();
  }); */
});
