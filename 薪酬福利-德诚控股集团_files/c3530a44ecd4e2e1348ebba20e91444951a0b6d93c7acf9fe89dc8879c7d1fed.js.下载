$(function () {
  // 课题遮罩
  shadeSubject();
  function shadeSubject () {
    if ($(".growth-development .section-1 .pic-text-box").height() < 25) {
      setTimeout(shadeSubject, 200);
      return;
    }
    var descHeiC = 110;
    var descHei =
      $(".growth-development .section-1 .pic-text-box").height() - 110;
    $(".pic-text-box .subject-desc").css("height", descHeiC);
    $(".growth-development .section-1 .pic-text-box").each(function () {
      descHei =
        $(".growth-development .section-1 .pic-text-box").height() -
        60 -
        $(".title", this).height();
      descHeiC = $(".title", this).height() + 30;

      $(".textarea", this).css("height", descHei - 50);
      $(".subject-desc", this).css({ height: descHeiC, top: descHei });
      $(this).hover(
        function () {
          $(".subject-desc", this).css({ height: "100%", top: 0 });
        },
        function () {
          descHei =
            $(".growth-development .section-1 .pic-text-box").height() -
            60 -
            $(".title", this).height();
          descHeiC = $(".title", this).height() + 30;
          $(".textarea", this).css("height", descHei - 50);
          $(".subject-desc", this).css({ height: descHeiC, top: descHei });
          return;
        }
      );
    });
  }
  if (window.innerWidth <= 921) {
    $(".subject-desc").hide();
  }

  showContent()
  function showContent () {
    if (window.innerWidth <= 991) {
      $('.section-1 .mobile .title1')
        .each(function (i) {
          $(this).on('click', function () {
            if ($(this).attr("class").indexOf("title3") == -1) {
              $(this).addClass("title3");
            } else {
              $(this).removeClass("title3");
            }
            if ($(this).next().toggle().is(":hidden")) {
              $(this).next().addClass("display-n");
            } else {
              $(this).next().removeClass("display-n");
            }
          })
        })

    }
  }
  // $(".section-1 .mobile .title-t1").on("click", function (e) {
  //   e.stopPropagation();
  //   if ($(this).attr("class").indexOf("title3") == -1) {
  //     $(this).addClass("title3");
  //   } else {
  //     $(this).removeClass("title3");
  //   }
  //   if ($(".section-1 .mobile .title2-1").toggle().is(":hidden")) {
  //     $("#title2-1").removeClass("display-n");
  //   } else {
  //     $("#title2-1").addClass("display-n");
  //   }
  // });

  // $(".section-1 .mobile .title-t2").on("click", function (e) {
  //   e.stopPropagation();
  //   if ($(this).attr("class").indexOf("title3") == -1) {
  //     $(this).addClass("title3");
  //   } else {
  //     $(this).removeClass("title3");
  //   }
  //   if ($(".section-1 .mobile .title2-2").toggle().is(":hidden")) {
  //     $("#title2-2").removeClass("display-n");
  //   } else {
  //     $("#title2-2").addClass("display-n");
  //   }
  // });

  // $(".section-1 .mobile .title-t3").on("click", function (e) {
  //   e.stopPropagation();
  //   if ($(this).attr("class").indexOf("title3") == -1) {
  //     $(this).addClass("title3");
  //   } else {
  //     $(this).removeClass("title3");
  //   }
  //   if ($(".section-1 .mobile .title2-3").toggle().is(":hidden")) {
  //     $("#title2-3").removeClass("display-n");
  //   } else {
  //     $("#title2-3").addClass("display-n");
  //   }
  // });

  //听学姐学长说
  if ($(".section-2 .pc .row .pic-text-box").length < 3) {
    $(".section-2 .pc .row").addClass("center-c");
  }
  new Swiper(".section-2 .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    pagination: {
      el: ".section-2 .tab-content.show .swiper-pagination",
      clickable: true
    }
  });

  var timer = null;
  $(window).resize(function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      defaultSubject();
    }, 200);
  });
});
