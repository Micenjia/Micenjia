$(function () {
  new Swiper("#s1", {
    direction: "vertical",
    mousewheel: {
      releaseOnEdges: true
    },
    slidesPerView: "auto",
    touchReleaseOnEdges: true
  });

  var yearSwiper = null;
  initS4();
  function initS4() {
    if (window.innerWidth > 767) {
      yearSwiper = new Swiper(".swiper-container.year", {
        direction: "vertical",
        slidesPerView: "auto",
        nested: true
        //allowTouchMove: false,
      });
      new Swiper("#s2", {
        direction: "vertical",
        nested: true,
        slidesPerView: "auto"
      });
      new Swiper('.swiper-container.history-content', {
        direction: 'vertical',
       slidesPerView: 'auto',
       mousewheel: true,
       nested: true,
       watchOverflow: true,
       setWrapperSize :true,
       observer:true,
       observeParents:true,
       observeSlideChildren:true,
       freeMode: true,
     });
     new Swiper('.swiper-container.about-us', {
          direction: 'vertical',
        slidesPerView: 'auto',
        nested: true,
        mousewheel: true,
        nested: true,
        freeMode: true,
      });
      new Swiper('.swiper-container.about-banner', {
        direction: 'vertical',
        slidesPerView: 'auto',
        nested: true,
        mousewheel: true,
        nested: true,
        watchOverflow: true,
        setWrapperSize :true,
        observer:true,
        observeParents:true,
        observeSlideChildren:true,
        freeMode: true,
      });
    } else {
      yearSwiper = new Swiper(".swiper-container.year", {
        slidesPerView: "auto"
        //allowTouchMove: false,
      });
      new Swiper("#s2", {
        direction: "vertical",
        nested: true,
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true,
        scrollbar: {
          el: "#s2 .swiper-scrollbar",
          hide: true
        }
      });
      new Swiper('.swiper-container.history-content', {
        direction: 'vertical',
       slidesPerView: 'auto',
       mousewheel: true,
       nested: true,
       watchOverflow: true,
       setWrapperSize :true,
       observer:true,
       observeParents:true,
       observeSlideChildren:true,
       freeMode: true,
     });
     new Swiper('.swiper-container.about-us', {
          direction: 'vertical',
        slidesPerView: 'auto',
        nested: true,
        mousewheel: true,
        nested: true,
        freeMode: true,
      });
      new Swiper('.swiper-container.about-banner', {
        direction: 'vertical',
        slidesPerView: 'auto',
        nested: true,
        mousewheel: true,
        nested: true,
        watchOverflow: true,
        setWrapperSize :true,
        observer:true,
        observeParents:true,
        observeSlideChildren:true,
        freeMode: true,
      });
    }
  }
  $(".year .swiper-slide").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    yearSwiper.slideTo($(this).index() - 1);
    // if ($(this).hasClass()) return;
    // $(this).addClass('active').siblings().removeClass('active');
    $(".year-tag").text($(this).text());
    $("#history-content")
      .find(".history-content")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $(".history span.arrow").on("click", function () {
    if ($(this).hasClass("arrow-left")) {
      $(".year .swiper-slide.active").prev().trigger("click");
    }
    if ($(this).hasClass("arrow-right")) {
      $(".year .swiper-slide.active").next().trigger("click");
    }
  });

  // var rowIndex = 0;

  // $('.page-box a').on('click', function () {
  //   switch ($(this).index()) {
  //     case 0:
  //       rowIndex = rowIndex > 0 ? rowIndex - 1 : 0;
  //       break;
  //     case 4:
  //       rowIndex = rowIndex >= 2 ? 2 : rowIndex + 1;
  //       break;
  //     default:
  //       rowIndex = $(this).index() - 1;
  //       break;
  //   }
  //   console.log('$(this).index() :>> ', $(this).index(), rowIndex);
  //   $('#row-box .row').eq(rowIndex).addClass('show').siblings().removeClass('show');
  // });
});
