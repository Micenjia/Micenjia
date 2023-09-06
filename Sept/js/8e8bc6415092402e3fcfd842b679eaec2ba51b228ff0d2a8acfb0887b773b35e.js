$(function () {
    var timer = null;
    $(window).resize(function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            bindEvent();
        }, 200);
    });
    bindEvent();

    function bindEvent() {
        if (window.innerWidth > 992) {
            $(".card-box .card-item")
                .unbind()
                .hover(
                    function () {
                        $(this).addClass("active").parent(".card-list").addClass("active");
                        if($(this).find('.createZero').length){
                            $(this).find('.createZero').hide();
                        }
                        if($(this).find('.future').length){
                            $(this).find('.future').hide();
                        }
                    },
                    function () {
                        $(this).removeClass("active").parent(".card-list").remove("active");
                        $(this).find('.createZero').show();
                        $(this).find('.future').show();
                    }
                );
        } else {
            $('.createZero').hide();
            $('.future').hide();
            $(".card-box .card-item")
                .unbind()
                .on("click", function () {
                    $(this).addClass("active").parent(".card-list").addClass("active");
                    $(this).siblings().hide();
                    $(".card-box .card-list .close").show();
                    $(".card-box .bj").css('opacity','0.6');
                });
            $(".card-box .card-list .close")
                .unbind()
                .on("click", function () {
                    $(this)
                        .parent(".card-list")
                        .removeClass("active")
                        .find(".active")
                        .removeClass("active");
                    $(this).siblings().show();
                    $(".card-box .bj").css('opacity','1');
                });
        }
    }
});