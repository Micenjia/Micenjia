/* 开发专用的全局js，不去动高保真给的js以免后续被覆盖
在这里写全局的逻辑
*/
$(function () {
    //面包屑的生成
    function setCrumb() {
        var crumb = $("div.crumb");
        if (crumb.length > 0) {
            for (var j = 0; j < crumb.length; j++) {
                var crumbX = crumb[j];
                var spanArr = $(">span", crumbX),
                    item;
                var arrow = '<span class="arrow">&nbsp;&gt;&nbsp;</span>';
                var crumbStr = "";
                for (var i = 0; i < spanArr.length; i++) {
                    item = spanArr[i];
                    var href = $(item).data("href");
                    var innerText = $(item).text();
                    if (href) {
                        if (i) {
                            crumbStr += [
                                '<span class="home crumb_cilck"><a href="',
                                href,
                                '">',
                                innerText,
                                "</a></span>"
                            ].join("");
                        } else {
                            crumbStr += [
                                '<span class="home crumb_cilck"><span class="home_icon"></span><a href="',
                                href,
                                '">',
                                innerText,
                                "</a></span>"
                            ].join("");
                        }
                    } else {
                        crumbStr += ['<span class="home">', innerText, "</span> "].join("");
                    }
                    if (i != spanArr.length - 1) {
                        crumbStr += arrow;
                    }
                }
                $(crumbX).html(crumbStr);
            }
        }
    }

    if ($(window).innerWidth() > 991) {
        setCrumb();
    }


    //官网搜索跳转代码
    $(
        ".header .search-slide-box .search-input,.header .search-box .search-input"
    ).on("keydown", function (e) {
        if (document.hasFocus(e.target) && e.keyCode == 13) {
            search_go($(e.target).val().trim());
        }
    });
    $(".header .search-slide-box .search-btn").on("click", function (e) {
        var searchKeywords = $(".header .search-slide-box .search-input")
            .val()
            .trim();
        if (searchKeywords) {
            search_go(searchKeywords);
        } else {
            search_go();
        }
    });
    $(".header .search-box .search-icon").on("click", function (e) {
        var searchKeywords = $(".header .search-box .search-input").val().trim();
        if (searchKeywords) {
            search_go(searchKeywords.trim());
        } else {
            search_go();
        }
    });

    function search_go(searchKeywords, str) {
        var language = getLanguageSite();
        if (!language) {
            // 语言为空默认'cn'
            language = "cn";
        }
        var url =  "./news_search.html";
        //使用绝对路径
        if (str) {
            url += "?" + str;
        }
        if (searchKeywords) {
            searchKeywords = "searchKeywords=" + searchKeywords;

            if (url.indexOf("?") > -1) {
                url += "&" + searchKeywords;
            } else {
                url += "?" + searchKeywords;
            }
        }
        // 内链
        location.href = url;
    }

    //解决了视频播放互斥、兼容问题，支持在iframe里面的视频也生效，
    //参数传true不处理互斥,但是会处理其它逻辑
    //第二个参数传true，不处理事件(持续处理)，第二个参数传true的时候第一个参数必须为true
    function video_play_or_pause(play_not, event_not) {
        var videoArr = [];

        function video(w) {
            var videos = w.document.querySelectorAll("video");
            if (videos.length > 0) {
                for (var i = 0; i < videos.length; i++) {
                    if (!play_not) {
                        videos[i].pause();
                    }
                    videoArr.push(videos[i]);
                }
            }
            if (w.frames.length > 0) {
                for (var j = 0; j < w.frames.length; j++) {
                    if (!event_not) {
                        $(w.frames[j]).on("load", function () {
                            video(this);
                            if (!play_not) {
                                addPauseListen();
                            }
                        });
                    } else {
                        video(w.frames[j]);
                    }
                }
            }
            //解决视频黑边问题
            // video_js_div.css("background-color", "transparent");
        }

        function addPauseListen() {
            for (var k = 0; k < videoArr.length; k++) {
                if (!$(videoArr[k]).data("playon")) {
                    $(videoArr[k]).data("playon", "true");
                    $(videoArr[k]).on("play", function (e) {
                        var vipa = videoArr.filter(function (item) {
                            return item != e.target;
                        });
                        for (var l = 0; l < vipa.length; l++) {
                            vipa[l].pause();
                        }
                    });
                }
            }
        }

        video(window);
        if (!play_not) {
            addPauseListen();
        }
    }

    //调用视频播放互斥逻辑，排除官网首页
    var urlExcludeArr = ["/en/index.html", "/cn/index.html"];
    if (
        urlExcludeArr.filter(function (item) {
            return location.href.indexOf(item) > -1;
        }).length == 0
    ) {
        video_play_or_pause();
    } else {
        video_play_or_pause(true);
    }

    $(window).on("resize", function () {
        video_play_or_pause(true, true);
    });

    //几大领域灰色菜单做成滚动
    var scroll_a_arr = $(".sub-nav .scroll-bar a");
    if (scroll_a_arr.length) {
        scroll_detail(scroll_a_arr);
    }

    function scroll_detail(scroll_a_arr) {
        var scroll_arr = [];
        for (var i = 0; i < scroll_a_arr.length; i++) {
            var item = scroll_a_arr[i];
            var href = item.href;
            var id = href.split("#")[1];
            var ar = document.getElementById(id);
            if (ar) {
                if (i === 0) {
                    $(item).addClass("active");
                }
                $(item)
                    .attr({href: "javascript:void(0);", mid: id})
                    .click(function (e) {
                        scroll_to($(e.target).attr("mid"));
                    });
                scroll_arr.push(ar);
            } else {
                $(item)
                    .attr({href: "javascript:void(0);", mid: id})
                    .click(function (e) {
                        var mid = $(e.target).attr("mid");
                        sessionStorage.setItem("scroll_bar_X", mid);
                        location.href = href.split("#")[0];
                    });
            }
        }

        var scroll_bar_X;
        if ((scroll_bar_X = sessionStorage.getItem("scroll_bar_X"))) {
            sessionStorage.removeItem("scroll_bar_X");
            scroll_to(scroll_bar_X);
        }

        if (scroll_arr.length > 0) {
            $(window).scroll(function () {
                var top = $(window).scrollTop();
                for (var i = 0; i < scroll_arr.length; i++) {
                    var offsetTop = $(scroll_arr[i]).offset().top;
                    if (top > offsetTop - 200) {
                        $(".sub-nav .scroll-bar>*").removeClass("active");
                        $(".sub-nav .scroll-bar>*").eq(i).addClass("active");
                    }
                }
                if (
                    top >=
                    document.documentElement.scrollHeight - window.innerHeight - 1
                ) {
                    $(".sub-nav .scroll-bar>*").removeClass("active");
                    $(".sub-nav .scroll-bar>*").last().addClass("active");
                }
            });
        }
    }

    //智能电动，针对上边的左右切换
    if (/\/intelligent_electric\/$/.test(location.pathname)) {
        $(window).on("resize", function () {
            var $ele = $(".banner .cut-drag");
            var boxWidth = $(".banner").width();
            var $cutImg = $(".banner .cut-img");
            var width = $cutImg[0].style.width;
            if (!width) {
                return;
            }
            var width_px = width.substring(0, width.length - 1);
            var tempX = Math.round(boxWidth / 2 - (width_px / 100) * boxWidth);
            $ele[0].style.transform = "translate3d(" + tempX + "px,0,0)";
        });
    }

    //处理有video的iframs，不让出现播放时临界值导致抖动
    function corrections_video_iframe() {
        var videoFrames = [],
            num = 0,
            num_i = 0;

        function getFrames(frames) {
            if (frames.length > 0) {
                num += frames.length;
                for (var j = 0; j < frames.length; j++) {
                    $(frames[j]).on(
                        "load",
                        (function (frame) {
                            return function () {
                                if (this.src.indexOf("video") > -1) {
                                    videoFrames.push(this);
                                }
                                num_i++;
                                if (num_i >= num && num != 0) {
                                    //不让出现播放时临界值导致抖动
                                    doFrames();
                                    //处理视频出现滚动条的问题，适应自适应
                                    doResizeFrames();
                                }
                            };
                        })(this)
                    );
                }
            }
        }

        function doFrames() {
            $(videoFrames).css({
                /*         height: function (a, b) {
                  //针对width不是100%的适配
                  if (this.style.width !== "100%") {
                    return Math.ceil(JSON.parse(b.replace(/[^0-9.]/g, "")) + 2);
                  }
                }, */
                "max-width": "100%"
            });

            setHeight();
        }

        function doResizeFrames() {
            $(window).on("resize", setHeight);
        }

        function setHeight() {
            //针对width是100%的适配
            $(videoFrames).css({
                height: function (a, b) {
                    var _this = $(this);
                    //针对width是100%的适配
                    /*           if (this.style.width === "100%") { */
                    /* 发现iframe视频里面统一都有一个： aspect-ratio: 1.78，所以写的代码只能去适应它的 */
                    var styleWidth = _this.width();
                    var dw = JSON.parse(_this.attr("width"));
                    var dh = JSON.parse(_this.attr("height"));
                    var reHeight = Math.ceil((styleWidth * dh) / dw + 2);
                    if (styleWidth / reHeight <= 1.78) {
                        _this.height(reHeight);
                    } else {
                        _this.height(Math.ceil(styleWidth / 1.78 + 6));
                    }
                    /*  }else{
                      //当宽高是固定数值时
                      if(_this.width() <= JSON.parse(this.style.width.replace(/[^0-9.]/g, ""))){

                      }
                    } */
                }
            });
        }

        getFrames($("iframe"));
    }

    corrections_video_iframe();

    $(".header .link-group-m .user").click(function (event) {
        event.stopPropagation();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".logout-box-m").hide();
        } else {
            $(this).addClass("active");
            $(".logout-box-m").show();
        }
        $(".header .link-group-m .search").removeClass("active");
        $(".search-slide-box-m").hide();
    });

    //纠正内外链
    /*   var linkss = $("a");
    for (var b = 0; b < linkss.length; b++) {
      var $a = $(linkss[b]),
        href = $a.attr("href");
      if (href && href.match(/(https:\/\/)|(http:\/\/)/)) {
        $a.attr("target", "_blank");
      }
    } */

    // 新闻列表类型滑动
    try {
        let totalNewsSlide = new TAB_SWIPER($(".news-list-slider .tab"));
        var swiper_news_all = $(
            ".news-list-slider .tab .swiper-wrapper .swiper-slide>a"
        );
        var item_news_order = $(
            ".news-list-slider .tab .swiper-wrapper .swiper-slide>a.active"
        )[0];
        var news_num = 0;
        for (let i = 0; i < swiper_news_all.length; i++) {
            if (swiper_news_all[i] == item_news_order) {
                news_num = i;
                break;
            }
        }
        totalNewsSlide.slideTo(news_num);
    } catch (e) {
    }
});

// 用户登录相关逻辑
(function ($) {
    var ATOKEN_COOKIE_NAME = "accessToken";
    var RTOKEN_COOKIE_NAME = "refreshToken";
    var EXPIRESIN_COOKIE_NAME = "expiresIn";
    var TOKEN_KEY = "DIGITAL_POWER_USER_TOKEN";
    var USER_KEY = "DIGITAL_POWER_USER_INFO";

    function isPro() {
        return location.href.indexOf("digitalpower") > -1;
    }

    function setCookie(name, value, ttl) {
        var s = name + "=" + escape(value);
        if (ttl) {
            date = new Date();
            date = new Date(date.getTime() + ttl * 1000 * 3600);
            s = s + "; expires=" + date.toGMTString();
        }
        s = s + "; Domain=" + (window.cookieDomain ? window.cookieDomain : location.hostname);
        s = s + "; path =" + (window.cookiePath ? window.cookiePath : '/');
        document.cookie = s;
    }

    function getCookie(name) {
        var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        if (match) return match[2];
        return "";
    }

    /**
     *
     * @returns 获取本地存储的token
     */
    function getLocalToken() {
        var token_date = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
        return token_date;
    }

    /**
     *
     * @returns 当前是否处于登录状态
     */
    function isLoginIn() {
        var token_date = getLocalToken();
        var aToken = token_date[ATOKEN_COOKIE_NAME];
        var eps = token_date[EXPIRESIN_COOKIE_NAME];
        return !!aToken && eps > Date.now();
    }

    /**
     * 刷新Token
     */
    function refreshToken() {
        // 1. 获取当前token
        var token_date = getLocalToken();
        var aToken = token_date[ATOKEN_COOKIE_NAME];
        var rToken = token_date[RTOKEN_COOKIE_NAME];
        if (aToken) {
            var url =
                "/rest/uniPortalUser/refreshToken?X-HW-ID=com.huawei.pd.websit&client_id=com.huawei.pd.websit&grant_type=refresh_token&refresh_token=" +
                rToken;
            $.ajax({
                url: url,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                success: function (data, textStatus) {
                    // 更新cookie
                    setCookie(ATOKEN_COOKIE_NAME, data.access_token);
                    setCookie(RTOKEN_COOKIE_NAME, data.refresh_token);
                    setCookie(EXPIRESIN_COOKIE_NAME, data.expires_in);
                    // 更新token
                    var token_date = {};
                    token_date[ATOKEN_COOKIE_NAME] = data.access_token;
                    token_date[RTOKEN_COOKIE_NAME] = data.refresh_token;
                    token_date[EXPIRESIN_COOKIE_NAME] = +data.expires_in;
                    localStorage.setItem(TOKEN_KEY, JSON.stringify(token_date));
                    // 过期前再刷新
                    // setTimeout(refreshToken, data.expires_in - Date.now() - 60 * 1000);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.info("refreshToken error!", textStatus, errorThrown);
                }
            });
            //
            return;
        } else {
            showLogin();
        }
    }

    /**
     * 根据token获取当前用户
     */
    function getUserByToken(cb) {
        var token_date = getLocalToken();
        var aToken = token_date[ATOKEN_COOKIE_NAME];
        url = window.appServerGateway + "/rest/uniPortalUser/getUserInfo";
        url += "?X-HW-ID=com.huawei.pd.websit";
        url += "&accessToken=";
        url += aToken;
        $.ajax({
            url: url,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data, textStatus) {
                // data 可能是 xmlDoc, jsonObj, html, text, 等等...
                if (data.httpCode == 200 && data.code == "success") {
                    localStorage.setItem(USER_KEY, JSON.stringify(data.result));
                    cb && cb(data.result);
                    showLoginOut(data.result);
                } else {
                    localStorage.removeItem(TOKEN_KEY);
                    showLogin();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 通常 textStatus 和 errorThrown 之中,只有一个会包含信息
                console.info("getUserByToken error!", textStatus, errorThrown);
                showLogin();
            }
        });
    }

    /**
     *
     * @param {function} cb 获取用户信息后回调
     */
    function getCurrentUser(cb) {
        var userInfo = JSON.parse(localStorage.getItem(USER_KEY) || "{}");
        if (userInfo.uuid) {
            cb && cb(userInfo);
        } else {
            getUserByToken(cb);
        }
    }

    function showLogin() {
        $(".header .login").show();
        $(".header .user").hide();
        $(".header .logout").hide();
    }

    function showLoginOut(userInfo) {
        $(".header .login").hide();
        var displayName = userInfo.displayName;
        $(".header .user .user-name").text(displayName);
        $(".header .user").show();
        $(".header .logout").show();
    }

    // 登入逻辑
    $(".header .login").click(function () {
        var lang = getLanguageSite();
        if (lang === 'cn') {
            lang = 'zh';
        } else {
            lang = 'en';
        }
        setCookie("lang", lang);
        location.href =
            window.appServerGateway +
            "/rest/uniPortalUser/login?X-HW-ID=com.huawei.pd.websit" +
            "&currentUrl=" + location.href;
    });

    // 登出
    $(".header .logout").click(logoutActions);

    function logoutActions() {
        // 1. 服务清除cookie(自己后台不保存状态)
        // 2. 并重定向到 http://login.huawei.com/login/logout.do?redirect=${location.href}
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setCookie(ATOKEN_COOKIE_NAME, "", -1);
        setCookie(RTOKEN_COOKIE_NAME, "", -1);
        /* var logoutHost = isPro()
              ? "//uniportal.huawei.com/uniportal/logout.do"
              : "//uniportal-beta.huawei.com/uniportal/logout.do"; */
        //登出写两遍、兼容外网的，（张强 wx1108511）  的建议。
        logoutHost = window.logoutURL;
        location.href =
            logoutHost + "?redirect=" + encodeURIComponent(location.href);
        /*     logoutHost = isPro()
              ? "//login.huawei.com/uniportal1/logout"
              : "//uniportal-beta.huawei.com/login1/logout";
            location.href = logoutHost + "?redirect=" + location.href; */
    }

    // 如果存在有效token，则调用获取用户信息的服务
    // 如果不存在有效token，则显示登入按钮
    function initLogStatus() {
        var aToken = getCookie(ATOKEN_COOKIE_NAME);
        if (aToken) {
            var rToken = getCookie(RTOKEN_COOKIE_NAME);
            var eps = getCookie(EXPIRESIN_COOKIE_NAME);
            if (+eps > Date.now()) {
                // 存放到loacalStorage里面
                var token_date = {};
                token_date[ATOKEN_COOKIE_NAME] = aToken;
                token_date[RTOKEN_COOKIE_NAME] = rToken;
                token_date[EXPIRESIN_COOKIE_NAME] = +eps;

                localStorage.setItem(TOKEN_KEY, JSON.stringify(token_date));
                // 过期前一分钟刷新
                // setTimeout(refreshToken, eps - Date.now() - 60 * 1000);
                getUserByToken();
            } else {
                showLogin();
            }
        } else {
            showLogin();
        }
    }

    initLogStatus();

    window.LOGIN_MODULE = {
        isLoginIn: isLoginIn,
        getCurrentUser: getCurrentUser
    };
    if (window.innerWidth <= 991) {
        $(".user-name").click(function (event) {
            event.stopPropagation();
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(".ucenter-box-m").hide();
            } else {
                $(this).addClass("active");
                $(".ucenter-box-m").show();
                $(".header .link-group-m .language").removeClass("active");
                $(".language-box-m").hide();
            }
        })
        $(".ucenter-box-m .ucenter-login").click(function () {
            //解决移动端没有登出的问题
            var logout = window.confirm($(".logout").text() + "?");
            if (logout) {
                logoutActions();
            }
        });
    }
})($);

// 事件委托处理轮播图最后一个视频无法播放（swiper动态实例化引起的问题）
$(document).click(function (e) {
    if (($(e.target).hasClass('btn-play'))) {
        var evts = $._data(e.target, 'events')
        if (evts && evts.click) return;
        var src = $(e.target).attr('video-src')
        if (!VideoBox.instances[src]) return
        e.preventDefault();
        var div = VideoBox.instances[src].content
        var video = VideoBox.instances[src].video
        $(div).addClass('show');
        video.play();
    }
})

// X5内核视频播放问题处理
videojs.hook("setup", function (player) {
    if (navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1) {
        player.on("play", function () {
            this.player_.requestFullscreen();
        });
        player.on("fullscreenchange", function () {
            if (this.isFullscreen()) {
                console.log("Non-Fullscreen");
            } else {
                console.log("Fullscreen");
                this.player_.pause();
            }
        });
    }
});

//捋一捋动态导航的标题高度(针对英文超长的情况，高度不一)
var setNavTitleHeight = (function setNavTitleHeight() {
    var t1 = "";
    return function (self) {
        clearTimeout(t1);
        t1 = setTimeout(function () {
            var rows = $(".row", self);
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var title = $(">div>div.title", row);
                title.height("auto");
                var itemH;
                var minH = title.height();
                for (var j = 0; j < title.length; j++) {
                    itemH = $(title[j]).height();
                    if (itemH > minH) {
                        minH = itemH;
                    }
                }
                if (minH > 0) {
                    title.height(minH);
                }
            }
        }, 100);
    };
})();

function getLanguageSite() {
    var language =
        location.pathname.match(/\/[a-z]{2}(_[A-Z]{2}){0,1}\//g) &&
        location.pathname
            .match(/\/[a-z]{2}(_[A-Z]{2}){0,1}\//g)[0]
            .replace(/\//g, "");
    return language;
}

function scroll_to(id) {
    var subtop = $("#" + id).offset().top;
    var subStep;
    if ($(window).innerWidth() > 991) {
        subStep = -100;
    } else {
        subStep = -30;
    }
    setTimeout(function () {
        $("html,body")
            .stop()
            .animate({scrollTop: subtop + subStep}, 200);
    }, 150);
}