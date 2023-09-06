!function(G, D) {
    var PROTOCOL = "https:" === D.location.protocol ? "https:" : "http:"
      , DEBUG = getQueryString("_debug") || G._debug
      , CHARSET = D.charset || D.characterSet
      , LANGUAGE = navigator.language || navigator.userLanguage
      , RESOLUTION = G.screen.width + "x" + G.screen.height
      , COLORDEPTH = G.screen.colorDepth
      , OPTIONS = {
        auto_track: !1,
        heatmap_url: "//analytics.hypers.com.cn/static/hwt-heatmap.js",
        force_ssl: !1,
        storage_id: "_hid",
        version: "1.18.1-20220118",
        with_ref: !0,
        api_url: "//t.hypers.com.cn/cgi-bin",
        api_type: "hwt",
        params: {},
        env: {
            inst: "saas"
        },
        encode: !1,
        scroll_event: !0,
        scroll_gap: 2e3,
        error_event: !1,
        visibility_event: !0,
        web_track: !0,
        app_track: !0,
        wechat_applet_track: !0,
        bytedance_applet_track: !0,
        url_change_track: !1,
        cookie_disabled: !1,
        cookie_expires: 63072e3
    }
      , MMA_PARAMS = [["h0", "os"], ["h1", "imei"], ["h2", "androidid"], ["h3", "androidid1"], ["h4", "aaid"], ["h5", "mac"], ["h6", "mac1"], ["h7", "idfa"], ["h8", "openudid"], ["h9", "duid"], ["h10", "oaid"]];
    function JSONParse(str) {
        return str ? window.JSON ? JSON.parse(str) : eval("(" + str + ")") : null
    }
    var _stringify = (escMap = {
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
    },
    escFunc = function(t) {
        return escMap[t] || "\\u" + (t.charCodeAt(0) + 65536).toString(16).substr(1)
    }
    ,
    escRE = /[\\"\u0000-\u001F\u2028\u2029]/g,
    function t(e) {
        if (null == e)
            return "null";
        if ("number" == typeof e)
            return isFinite(e) ? e.toString() : "null";
        if ("boolean" == typeof e)
            return e.toString();
        if ("object" == typeof e) {
            if ("function" == typeof e.toJSON)
                return t(e.toJSON());
            if (isArray(e)) {
                for (var n = "[", r = 0; r < e.length; r++)
                    n += (r ? ", " : "") + t(e[r]);
                return n + "]"
            }
            if (isObject(e)) {
                var i = [];
                for (var o in e)
                    e.hasOwnProperty(o) && i.push(t(o) + ": " + t(e[o]));
                return "{" + i.join(", ") + "}"
            }
        }
        return '"' + e.toString().replace(escRE, escFunc) + '"'
    }
    ), escMap, escFunc, escRE;
    function JSONStringify(t) {
        return window.JSON ? JSON.stringify(t) : _stringify(t)
    }
    function arrayIndexOf(t, e) {
        if (null != Array.prototype.indexOf)
            return t.indexOf(e);
        for (var n = 0; n < t.length; n++)
            if (t[n] === e)
                return n;
        return -1
    }
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        encode: function(t) {
            var e, n, r, i, o, a, s, c = "", l = 0;
            for (t = Base64._utf8_encode(t); l < t.length; )
                i = (e = t.charCodeAt(l++)) >> 2,
                o = (3 & e) << 4 | (n = t.charCodeAt(l++)) >> 4,
                a = (15 & n) << 2 | (r = t.charCodeAt(l++)) >> 6,
                s = 63 & r,
                isNaN(n) ? a = s = 64 : isNaN(r) && (s = 64),
                c = c + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s);
            return c
        },
        _utf8_encode: function(t) {
            t = t.replace(/\r\n/g, "n");
            for (var e = "", n = 0; n < t.length; n++) {
                var r = t.charCodeAt(n);
                r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192),
                e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224),
                e += String.fromCharCode(r >> 6 & 63 | 128),
                e += String.fromCharCode(63 & r | 128))
            }
            return e
        },
        decode: function(t) {
            var e, n, r, i, o, a, s = "", c = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < t.length; )
                e = this._keyStr.indexOf(t.charAt(c++)) << 2 | (i = this._keyStr.indexOf(t.charAt(c++))) >> 4,
                n = (15 & i) << 4 | (o = this._keyStr.indexOf(t.charAt(c++))) >> 2,
                r = (3 & o) << 6 | (a = this._keyStr.indexOf(t.charAt(c++))),
                s += String.fromCharCode(e),
                64 != o && (s += String.fromCharCode(n)),
                64 != a && (s += String.fromCharCode(r));
            return s = Base64._utf8_decode(s)
        },
        _utf8_decode: function(t) {
            for (var e = "", n = 0, r = c1 = c2 = 0; n < t.length; )
                (r = t.charCodeAt(n)) < 128 ? (e += String.fromCharCode(r),
                n++) : r > 191 && r < 224 ? (c2 = t.charCodeAt(n + 1),
                e += String.fromCharCode((31 & r) << 6 | 63 & c2),
                n += 2) : (c2 = t.charCodeAt(n + 1),
                c3 = t.charCodeAt(n + 2),
                e += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3),
                n += 3);
            return e
        },
        isEncode: function(t) {
            try {
                return this.decode(t),
                !0
            } catch (t) {
                return !1
            }
        }
    };
    function bind(t, e) {
        var n, r, i = Function.prototype.bind, o = Array.prototype.slice;
        if (i && t.bind === i)
            return i.apply(t, o.call(arguments, 1));
        if (!isFunction(t))
            throw new TypeError;
        return n = o.call(arguments, 2),
        r = function() {
            if (!(this instanceof r))
                return t.apply(e, n.concat(o.call(arguments)));
            var i = {};
            i.prototype = t.prototype;
            var a = new i;
            i.prototype = null;
            var s = t.apply(a, n.concat(o.call(arguments)));
            return Object(s) === s ? s : a
        }
    }
    function decode(t) {
        return decodeURIComponent(t)
    }
    function encode(t) {
        return encodeURIComponent(t)
    }
    function extend(t, e, n) {
        var r, i = {};
        if (n) {
            for (r in t)
                i[r] = t[r];
            for (r in e)
                i[r] = e[r];
            return i
        }
        for (r in e)
            t[r] = e[r];
        return t
    }
    function formatParams(t) {
        var e = {}
          , n = {}
          , r = {}
          , i = !1;
        for (e in t) {
            var o = t[e]
              , a = !1;
            (isObject(o) || isArray(o)) && (a = !0),
            a && (r["p_" + e] = "json",
            o = Base64.encode(JSONStringify(o)),
            i = !0),
            n["p_" + e] = o
        }
        return i && (n._typed = Base64.encode(JSONStringify(r))),
        n
    }
    function getJSON(t, e, n) {
        if (n && navigator.sendBeacon)
            navigator.sendBeacon(t + "&jsonp=_j") && e.apply(G);
        else {
            var r, i = guid();
            G[i] = function() {
                e.apply(G, arguments),
                r.parentNode.removeChild(r),
                G[i] = null
            }
            ,
            r = getScript(t += "&jsonp=" + i)
        }
    }
    function getLoadTime() {
        if (window.performance && window.performance.timing) {
            var t = window.performance.timing.navigationStart
              , e = window.performance.timing.loadEventStart;
            if (e > 0 && t > 0)
                return e - t;
            if (t > 0)
                return (new Date).getTime() - t
        }
        return null
    }
    function getOffset(t) {
        var e = document && document.documentElement
          , n = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        };
        return void 0 !== t.getBoundingClientRect && (n = t.getBoundingClientRect()),
        e && (n = {
            top: n.top + (window.pageYOffset || e.scrollTop) - (e.clientTop || 0),
            left: n.left + (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0),
            width: n.width || t.offsetWidth || 0,
            height: n.height || t.offsetHeight || 0
        }),
        n
    }
    function getPageTitle() {
        if (document.title)
            return document.title;
        var t = document.getElementsByTagName("title")[0];
        return t ? t.innerText : null
    }
    function getQueryString(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
          , n = window.location.search.substr(1).match(e);
        return null !== n ? unescape(n[2]) : null
    }
    function getReferrer() {
        var t;
        try {
            t = G.top.document.referrer
        } catch (e) {
            log(e);
            try {
                t = G.parent.document.referrer
            } catch (e) {
                log(e),
                t = document.referrer
            }
        }
        return t
    }
    function getScript(t, e) {
        var n = D.createElement("script")
          , r = D.getElementsByTagName("head")[0];
        return n.type = "text/javascript",
        n.charset = "utf-8",
        n.src = t,
        n.onload = function() {
            e && e()
        }
        ,
        r.insertBefore(n, r.firstChild),
        n
    }
    function guid() {
        return "_" + (1e18 * Math.random()).toString(36).slice(0, 5).toUpperCase()
    }
    function isArray(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function isFunction(t) {
        return "function" == typeof t
    }
    function isJSON(t) {
        if ("string" == typeof t)
            try {
                return JSONParse(t),
                !0
            } catch (t) {
                return !1
            }
        return !1
    }
    function isNumber(t) {
        return /^[0-9]+$/.test(t)
    }
    function isObject(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    function log(t, e) {
        if (G.console && (DEBUG || G._tracker_debug))
            throw G._tracker_logs || (G._tracker_logs = []),
            G._tracker_logs.push(e + ":" + t),
            new Error(t);
        if ("throw" === e)
            throw t + " >> http://developers.hypers.com.cn/website/debug.html"
    }
    function noop() {}
    function offEvent(t, e, n) {
        return G.addEventListener ? (t.removeEventListener(e, n),
        t) : (t.detachEvent(e, n),
        t)
    }
    function onEvent(t, e, n, r) {
        return document.addEventListener ? (t.addEventListener(e, n, r),
        t) : (t.attachEvent("on" + e, (function() {
            return n.call(t, window.event)
        }
        )),
        t)
    }
    function paramsToString(t) {
        var e, n, r = [];
        for (e in t)
            void 0 !== (n = t[e]) && "" !== n && null !== n && r.push(e + "=" + encode(n));
        return r.join("&")
    }
    function toLowerCaseKeyByObject(t) {
        var e, n = {};
        for (e in t)
            n[e.toLowerCase()] = t[e];
        return n
    }
    function trim(t) {
        return t ? t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : t
    }
    function getEventTarget(t) {
        return void 0 === t.target ? t.srcElement : t.target
    }
    function getSafePercentage(t) {
        return t > 100 ? 100 : t < 0 ? 0 : t
    }
    function isElementNode(t) {
        return t && 1 === t.nodeType
    }
    function isTag(t, e) {
        return t && t.tagName && e && t.tagName.toLowerCase() === e.toLowerCase()
    }
    function shouldTrackDomEvent(t, e) {
        if (!t || isTag(t, "html") || !isElementNode(t) || !t.tagName)
            return !1;
        switch (t.tagName.toLowerCase()) {
        case "html":
            return !1;
        default:
            return "click" === e.type
        }
    }
    function shouldTrackElement(t) {
        return !(arrayIndexOf(getClassName(t), "hwt-no-track") > -1)
    }
    function getClassName(t) {
        switch (typeof t.className) {
        case "string":
            return t.className;
        case "object":
            return t.className.baseVal || t.getAttribute("class") || "";
        default:
            return ""
        }
    }
    function isTextNode(t) {
        return t && 3 === t.nodeType
    }
    function getSafeText(t) {
        var e = trim(t.innerText);
        return e || (e = t.getAttribute("title")),
        e && (e = e.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)),
        trim(e)
    }
    function getElementKey(t) {
        var e = t.tagName ? t.tagName.toLowerCase() : ""
          , n = e
          , r = t.getAttribute("id");
        r && (n += "#" + r);
        var i = t.parentNode.childNodes;
        if (i.length > 1)
            for (var o = 0, a = 0; a < i.length; a++) {
                var s = i[a];
                s.tagName && s.tagName.toLowerCase() === e && (s === t && (n += o ? "[" + o + "]" : ""),
                o++)
            }
        return n
    }
    function getSafeOffset(t, e) {
        var n = getOffset(t)
          , r = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
          , i = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          , o = e.clientX + r
          , a = e.clientY + i;
        return 0 === n.width || 0 === n.height ? null : (o = getSafePercentage((o - n.left) / n.width * 100),
        a = getSafePercentage((a - n.top) / n.height * 100),
        {
            x: o.toFixed(2),
            y: a.toFixed(2)
        })
    }
    function AutoTrack(t) {
        this.tracker = t,
        this._trackEvent = function(t) {
            var e, n, r, i = getEventTarget(t);
            if (isTextNode(i) && (i = i.parentNode),
            shouldTrackDomEvent(i, t) && shouldTrackElement(i)) {
                for (var o = [i], a = i; a.parentNode && !isTag(a, "body"); )
                    o.push(a.parentNode),
                    a = a.parentNode;
                n = i,
                r = null;
                for (var s = 0; s < o.length; s++) {
                    var c = o[s]
                      , l = c.tagName ? c.tagName.toLowerCase() : "";
                    n !== c || r || (r = []),
                    r && r.push(getElementKey(c)),
                    "a" === l && (e = c.getAttribute("href"))
                }
            }
            if (n && r) {
                var u = getSafeOffset(i, t)
                  , h = r.reverse().join(">")
                  , d = n.tagName ? n.tagName.toLowerCase() : ""
                  , f = "form" !== d ? getSafeText(n) : "";
                if (u && d) {
                    var p = {
                        e_auto: 1,
                        e_type: t.type,
                        e_x: u.x || null,
                        e_y: u.y || null,
                        el_tag: d,
                        el_href: e,
                        el_text: f,
                        el_path: Base64.encode(h)
                    };
                    this.tracker.trackEvent(p)
                }
            }
        }
        ,
        this._addDOMEventHandlers = function() {
            var t = bind(this._trackEvent, this);
            onEvent(document, "click", t, !0)
        }
        ,
        this._loadAddons = function() {
            var t = this.tracker.options.heatmap_url;
            if ("heatmap" === getQueryString("_hwt_addon"))
                getScript(t);
            else {
                onEvent(window, "message", (function e(n) {
                    n.data && "_HWT_ADDON" === n.data.type && "HEATMAP" === n.data.payload && (getScript(t),
                    offEvent(window, "message", e))
                }
                ))
            }
        }
        ,
        this.init = function() {
            this._addDOMEventHandlers(),
            this._loadAddons()
        }
    }
    var BytedanceAppTracker = function() {
        var t = !1
          , e = window.tt
          , n = [];
        function r(r, i, o) {
            var a = {
                data: {
                    type: "invokeHtt",
                    method: r,
                    url: o,
                    args: i,
                    timestamp: (new Date).getTime()
                }
            };
            if (t)
                try {
                    e.miniProgram.postMessage(a)
                } catch (t) {
                    return !1
                }
            else
                n.push(a)
        }
        return e && e.miniProgram ? (t = !0,
        function() {
            for (var t = 0; t < n.length; t++)
                e.miniProgram.postMessage(n[t]);
            n = []
        }()) : (log("请引入最新版本的字节跳动 JSSDK"),
        t = !1),
        {
            getEnv: function() {
                return window.navigator.userAgent.match(/toutiaomicroapp/i) ? "bytedance" : null
            },
            sendAction: function(t, e) {
                var n = document.URL
                  , i = {}
                  , o = getPageTitle();
                return o && (i.title = o),
                r("sendAction", [t, i = extend(i, e || {})], n)
            },
            sendPageview: function(t) {
                var e = t.url || document.URL;
                return delete t.url,
                r("webviewPageview", [t], e)
            }
        }
    }();
    function ComboStorage(t, e) {
        this.localStorage = new LocalStorage(t),
        this.cookie = new CookieStorage(t,e.disabled),
        this.set = function(t, n) {
            this.localStorage.available && this.localStorage.set(t, n),
            this.cookie.set(t, n, {
                expires: 1e3 * e.expires
            })
        }
        ,
        this.get = function(t) {
            var e = null;
            return this.localStorage.available && (e = this.localStorage.get(t)),
            e || this.cookie.get(t)
        }
    }
    function transformMMAParams(t) {
        if (!t)
            return null;
        for (var e = null, n = 0; n < MMA_PARAMS.length; n++) {
            var r = MMA_PARAMS[n];
            if (r) {
                var i = r[0]
                  , o = r[1]
                  , a = void 0 === t[i] ? t[o] : t[i];
                a && (e || (e = {}),
                e[o] = a)
            }
        }
        return e
    }
    function Controller() {
        function t() {
            for (var t = null, e = 0; e < MMA_PARAMS.length; e++) {
                var n = MMA_PARAMS[e];
                if (n) {
                    var r = n[0]
                      , i = getQueryString(r);
                    i && (t || (t = {}),
                    t[r] = i)
                }
            }
            return t
        }
        var e = {};
        this.pushTracker = function(t, n) {
            e[t] = n
        }
        ,
        this.getTracker = function(t) {
            return e[t]
        }
        ,
        this.create = function(arguments, e, n) {
            var r = arguments[0]
              , i = arguments[1]
              , o = arguments[2];
            r || log("14001", "throw"),
            G[e] = G[e] || {};
            const a = extend(OPTIONS, toLowerCaseKeyByObject(i), !0);
            var s = new ComboStorage(e.toLocaleUpperCase(),{
                disabled: "boolean" == typeof a.cookie_disabled ? a.cookie_disabled : OPTIONS.cookie_disabled,
                expires: "number" == typeof a.cookie_expires ? a.cookie_expires : OPTIONS.cookie_expires
            })
              , c = new WebTracker(e,r,n,s);
            if (c.options = compatibleOption(extend(c.options, a)),
            c.options.id && (c.options.storage_id = c.options.id),
            i && i.auto_track) {
                var l = new AutoTrack(c);
                l.init()
            }
            if (c.options.scroll_event) {
                var u = new ScrollAction(c);
                u.init()
            }
            if (c.options.error_event) {
                var h = new ErrorAction(c);
                h.init()
            }
            if (c.options.visibility_event) {
                var d = new VisibilityAction(c);
                d.init()
            }
            c.options.url_change_track && UrlChangeTracker.init(c);
            var f = c.options.storage_id
              , p = t();
            return p && c.setMMAParams(transformMMAParams(p)),
            c[f] = s.get("hid"),
            this.pushTracker(n, c),
            isFunction(o) && o(),
            this
        }
        ,
        this.enable = function(arguments, t, e) {
            if (arguments.length)
                return this;
            this.getTracker(e).available = !0
        }
        ,
        this.send = function(arguments, t, e) {
            var n = arguments.splice(0, 1)[0];
            return "pageview" !== n && "action" !== n && "form" !== n || this.getTracker(e)[n](arguments),
            this
        }
        ,
        this.set = function(arguments, t, e) {
            function n(t, arguments) {
                if (isObject(arguments[0]))
                    return extend(t.options, arguments[0]),
                    void (isFunction(arguments[1]) && arguments[1](t));
                if (arguments.length >= 2) {
                    var e = arguments[0]
                      , n = arguments[1]
                      , r = arguments[2]
                      , i = t.options[e];
                    return t.options[e] = i ? extend(i, n, !0) : n,
                    void (isFunction(r) && r(t))
                }
            }
            if (this.getTracker(e))
                return n(this.getTracker(e), arguments),
                this;
            console.error("`WebTracker` is not defined. ===> http://dev.hypers.com.cn/tracker/website/api-create.html")
        }
        ,
        this.identify = function(arguments, t, e) {
            var n = arguments[0]
              , r = this.getTracker(e).getIdentifyParams() || {};
            if (null == n)
                throw "identify params is undifined";
            if (isObject(n)) {
                var i = {}
                  , o = ["muid", "uid", "unionid", "wx_id", "alipay_id", "cust_id"];
                for (var a in n)
                    arrayIndexOf(o, a) > -1 && (i[a] = n[a]);
                r = extend(r, i)
            } else
                "string" != typeof n && "number" != typeof n || (r.muid = n);
            this.getTracker(e).setIdentifyParams(r)
        }
        ,
        this.track = function(arguments, t, e) {
            e = "_v1_2_v1_3",
            isObject(arguments[0]) ? arguments.splice(0, 0, arguments[0].UA) : arguments.splice(0, 1, arguments[1].UA),
            this.create(arguments, t, e),
            this.send(["pageview"], t, e)
        }
    }
    try {
        "string" == typeof document.cookie && (supportCookie = !0)
    } catch (t) {
        supportCookie = !1
    }
    function CookieStorage(t, e) {
        this.id = t,
        this.set = function(t, n, r) {
            if (supportCookie) {
                if (!e) {
                    "number" == typeof (r = extend({
                        path: "/"
                    }, r)).expires && (r.expires = new Date(1 * new Date + r.expires)),
                    r.expires = r.expires ? r.expires.toUTCString() : "";
                    var i = "";
                    for (var o in r)
                        r[o] && (i += "; " + o,
                        !0 !== r[o] && (i += "=" + r[o].split(";")[0]));
                    return document.cookie = this.id + "_" + t + "=" + n + i
                }
                this.remove(t)
            }
        }
        ,
        this.get = function(t) {
            if (!supportCookie || e)
                return {};
            var n = {}
              , r = document.cookie ? document.cookie.split("; ") : []
              , i = 0;
            for (t = this.id + "_" + t; i < r.length; i++) {
                var o = r[i].split("=")
                  , a = o[0]
                  , s = o.slice(1).join("=");
                if ('"' === s.charAt(0) && (s = s.slice(1, -1)),
                n[a] = s,
                t === a)
                    break
            }
            return t ? n[t] : n
        }
        ,
        this.remove = function(t) {
            supportCookie && (document.cookie = this.id + "_" + t + "=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/")
        }
    }
    function ErrorAction(t) {
        this.tracker = t,
        this.init = function() {
            this.bindErrorEvent()
        }
        ,
        this.handleError = function(t) {
            t && "string" == typeof t.message && this.tracker.action(["_error", {
                _err_msg: t.message.substring(0, 255)
            }])
        }
        ,
        this.bindErrorEvent = function() {
            var t = bind(this.handleError, this);
            onEvent(window, "error", t, !0)
        }
    }
    function HyperAnalytics(t, e) {
        if (G[e].controller = G[e].controller || new Controller,
        this.push = function(arguments) {
            var t, n, r = "default";
            (arguments = [].slice.apply(arguments)).length && (n = (t = arguments.splice(0, 1)[0]).split("."),
            "create" === t && arguments[1] && arguments[1].name && (r = arguments[1].name),
            n.length > 1 && (r = n[0],
            t = n[1]),
            G._ha_disable ? log("_ha is disabled") : G["_ha_disable_" + r] ? log("_ha [" + r + "]  is disabled") : G[e].controller[t] ? G[e].controller[t](arguments, e, r) : log(t + "  is not defined"))
        }
        ,
        t && t.length)
            for (var n = 0; n < t.length; n++)
                this.push(t[n])
    }
    function LocalStorage(t) {
        if (!t)
            throw Error("id is not defined");
        try {
            if (!G.localStorage)
                return {
                    available: !1
                }
        } catch (t) {
            return log(t),
            {
                available: !1
            }
        }
        this.id = t,
        this.available = !0,
        this.set = function(t, e) {
            localStorage.setItem(this.id + "_" + t, e)
        }
        ,
        this.get = function(t) {
            return localStorage.getItem(this.id + "_" + t)
        }
    }
    var MobileAppTracker = function() {
        function t(t) {
            return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[t] ? {
                env: "iOS"
            } : window.hmt && window.hmt[t] ? {
                env: "Android"
            } : null
        }
        function e(e, n, r) {
            var i = t(e);
            i && (i && "iOS" === i.env ? window.webkit.messageHandlers[e].postMessage(JSON.stringify(n)) : i && "Android" === i.env ? window.hmt[e](JSON.stringify(n)) : log("HMA Error:" + handle + " 方法不存在，请检查是否安装了 SDK"))
        }
        return {
            getEnv: function() {
                var e = t("hmtAction");
                return e && "iOS" === e.env ? "ios" : e && "Android" === e.env ? "android" : null
            },
            sendAction: function(t, n) {
                var r = {
                    act_name: t,
                    url: document.URL
                }
                  , i = getPageTitle();
                i && (r.title = i),
                e("hmtAction", r = extend(r, n || {}))
            },
            sendPageview: function(t) {
                t.url = t.url ? t.url : document.URL,
                e("hmtActivityStart", t || {})
            }
        }
    }();
    function getScrollTop() {
        var t = 0
          , e = 0;
        return document.body && (t = document.body.scrollTop),
        document.documentElement && (e = document.documentElement.scrollTop),
        t - e > 0 ? t : e
    }
    function getScrollHeight() {
        var t = 0
          , e = 0;
        return document.body && (t = document.body.scrollHeight),
        document.documentElement && (e = document.documentElement.scrollHeight),
        t - e > 0 ? t : e
    }
    function getClientHeight() {
        return "CSS1Compat" == document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
    }
    function ScrollAction(t) {
        this.tracker = t,
        this.scrolltraced = {},
        this.scrollHeight = 0,
        this.clientHeight = 0,
        this.scrollTop = 0,
        this.scrollEnd = !1,
        this.init = function() {
            this.bindScrollEvent();
            var t = this.tracker.options.scroll_gap;
            this.scrollTop = (Math.ceil(getClientHeight() / t) - 1) * t
        }
        ,
        this.track = function(t) {
            this.scrolltraced[t] || this.scrollEnd || (this.scrollTop = t,
            this.scrolltraced[t] = 1,
            this.tracker.action(["_scroll", {
                _scroll_len: this.scrollHeight,
                _scroll_i: t
            }]))
        }
        ,
        this.handleScroll = function() {
            this.scrollHeight = getScrollHeight(),
            this.clientHeight = getClientHeight();
            var t = getScrollTop()
              , e = this.tracker.options.scroll_gap
              , n = this.scrollTop + e;
            t + this.clientHeight >= n && this.track(n),
            this.clientHeight + t > this.scrollHeight - 10 && (this.track(this.scrollHeight),
            this.scrollEnd = !0)
        }
        ,
        this.bindScrollEvent = function() {
            var t = bind(this.handleScroll, this);
            onEvent(window, "scroll", t)
        }
    }
    var UrlChangeTracker = function() {
        var t = location.href
          , e = null;
        if (!history.pushState || !window.addEventListener)
            return {};
        function n(t, e, n) {
            var r = t[e];
            t[e] = function() {
                r.apply(t, arguments),
                isFunction(n) && n(Array.prototype.slice.call(arguments))
            }
        }
        function r() {
            setTimeout((function() {
                var n = t
                  , r = location.href;
                n !== r && (t = r,
                e.pageview({
                    url: r,
                    title: document.title
                }))
            }
            ), 0)
        }
        return {
            init: function(t) {
                !function(t) {
                    e = t,
                    "pushState"in window.history ? (n(history, "replaceState", r),
                    n(history, "pushState", r),
                    onEvent(window, "popstate", r)) : onEvent(window, "hashchange", r)
                }(t)
            }
        }
    }();
    function VisibilityAction(t) {
        this.tracker = t,
        this.init = function() {
            this.bindVisibilityChangeEvent()
        }
        ,
        this.handleVisibilityChange = function(t) {
            this.tracker.action(["_" + document.visibilityState])
        }
        ,
        this.bindVisibilityChangeEvent = function() {
            if (document.visibilityState) {
                var t = bind(this.handleVisibilityChange, this);
                onEvent(window, "visibilitychange", t, !0)
            }
        }
    }
    function WebTracker(t, e, n, r) {
        this.options = {
            params: {}
        },
        this.available = !0,
        this.ua = e,
        this.alias = n,
        this.logs = [],
        this.storage = r;
        var i = null
          , o = null;
        function a(t, e) {
            if ("object" == typeof e && r && r.localStorage.available)
                try {
                    r.localStorage.set(t, Base64.encode(JSONStringify(e)))
                } catch (t) {
                    log(t)
                }
        }
        function s(t) {
            if (r && r.localStorage.available)
                try {
                    var e = r.localStorage.get(t);
                    if (e)
                        return isJSON(e) ? JSONParse(e) : JSONParse(Base64.decode(e))
                } catch (t) {
                    log(t)
                }
            return null
        }
        this.setMMAParams = function(t) {
            a("MMA", t),
            o = t
        }
        ,
        this.getMMAParams = function() {
            return o || transformMMAParams(s("MMA"))
        }
        ,
        this.setIdentifyParams = function(t) {
            a("i", t),
            i = t
        }
        ,
        this.getIdentifyParams = function(t) {
            return i || s("i")
        }
        ,
        this.pageview = function(arguments) {
            var t = {}
              , e = arguments[0] || {}
              , n = arguments[1]
              , r = e.url;
            "_v1_1" !== this.alias && (r && !r.substr(0, 8).match(/https?:\/\//) && (r = [G.location.protocol, "//", G.location.hostname, "/" == r.substr(0, 1) ? "" : "/", r].join("")),
            t.url = r);
            var i = e.title || getPageTitle();
            return i && (t.title = i),
            t.lt = getLoadTime(),
            this.options.app_track && MobileAppTracker.sendPageview(extend(t, e.params, !0)),
            this.options.wechat_applet_track && WechatAppTracker.sendPageview(extend(t, e.params, !0)),
            this.options.bytedance_applet_track && BytedanceAppTracker.sendPageview(extend(t, e.params, !0)),
            extend(t, formatParams(e.params)),
            request.call(this, "pv", t, n),
            this
        }
        ,
        this.action = function(arguments) {
            var t = arguments[0]
              , e = arguments[1]
              , n = arguments[2]
              , r = formatParams(arguments[1]);
            return r.act_name = t,
            request.call(this, "act", r, n),
            this.options.app_track && MobileAppTracker.sendAction(t, e),
            this.options.wechat_applet_track && WechatAppTracker.sendAction(t, e),
            this.options.bytedance_applet_track && BytedanceAppTracker.sendAction(t, e),
            this
        }
        ,
        this.form = function(arguments) {
            var t = arguments[0]
              , e = arguments[1];
            return request.call(this, "form", t, e),
            this
        }
        ,
        this.trackEvent = function(t, e) {
            request.call(this, "evt", t, e)
        }
    }
    function request(t, e, n) {
        if (this.available) {
            if (this.options.web_track) {
                var r, i, o = this.options.storage_id || "_hid", a = extend(formatParams(this.options.params), e, !0), s = {};
                a.type = t;
                var c = this.getMMAParams();
                c && (extend(a, c),
                s._z = "_",
                a.cross = 1);
                var l = "string" == typeof this[o] && "null" !== this[o];
                l && (s._z = "_",
                s[o] = this[o]),
                this.options.with_ref && (r = getReferrer()) && /.*[\u4e00-\u9fa5]+.*$/.test(r) && (r = encodeURI(r)),
                a.ref = r;
                var u = this.options.env;
                for (var o in u)
                    s["_" + o] = u[o];
                this.options.muid && (a.muid = this.options.muid),
                this.options.uid && (a.uid = this.options.uid);
                var h = this.getIdentifyParams();
                if (h)
                    for (var o in h)
                        a[encode(o)] = encode(h[o]);
                a.uid && (s._z = "_"),
                a.char = CHARSET,
                a.lang = LANGUAGE,
                a.sr = RESOLUTION,
                a.sd = COLORDEPTH,
                a.v = this.options.version,
                s._ua = this.ua,
                void 0 === a.url && (a.url = document.URL);
                var d = MobileAppTracker.getEnv();
                d || (d = WechatAppTracker.getEnv()),
                d || (d = BytedanceAppTracker.getEnv()),
                d && (a.source = d);
                var f = "form" === a.type ? "form" : this.options.api_type
                  , p = "";
                this.options.encode ? (s._d = Base64.encode(JSONStringify(a)),
                p = paramsToString(s)) : p = paramsToString(extend(a, s)),
                i = this.options.api_url + "/" + f + "?" + p;
                var g = this;
                getJSON(i, (function(t) {
                    t = t || g[g.options.storage_id],
                    g[g.options.storage_id] = t,
                    g.storage && g.storage.set("hid", t),
                    handleStorageCompletion(t),
                    isFunction(n) && n(g, i),
                    DEBUG && g.logs.push(i)
                }
                ), l)
            }
        } else
            log("This is a disabled Tracker")
    }
    var WechatAppTracker = function() {
        var t = !1
          , e = window.wx
          , n = [];
        function r(r) {
            if (t = r.miniprogram) {
                for (var i = 0; i < n.length; i++)
                    e.miniProgram.postMessage(n[i]);
                n = []
            } else
                log("当前环境不在微信小程序 <web-view> 中")
        }
        function i(r, i, o) {
            var a = {
                data: {
                    type: "invokeHxt",
                    method: r,
                    url: o,
                    args: i,
                    timestamp: (new Date).getTime()
                }
            };
            t ? e.miniProgram.postMessage(a) : n.push(a)
        }
        return e && e.miniProgram ? e.miniProgram.getEnv(r) : (log("请引入最新版本的微信 JSSDK"),
        t = !1),
        {
            getEnv: function() {
                return t || window.navigator.userAgent.match(/miniprogram/i) || "miniprogram" === window.__wxjs_environment ? "wechat" : null
            },
            sendAction: function(t, e) {
                var n = document.URL
                  , r = {}
                  , o = getPageTitle();
                return o && (r.title = o),
                i("sendAction", [t, r = extend(r, e || {})], n)
            },
            sendPageview: function(t) {
                var e = t.url || document.URL;
                return delete t.url,
                i("webviewPageview", [t], e)
            }
        }
    }();
    function handleStorageCompletion(t) {
        var e = G.HWT_ID_READY_CALL_ONCE;
        e && (isFunction(e) ? e(t) : isFunction(G[e]) ? G[e](t) : getScript(e),
        handleStorageCompletion = noop)
    }
    function compatibleOption(t) {
        var e, n;
        return t.api_url && (t.api_url = (e = t.api_url,
        n = t.force_ssl,
        "/" === (e = e.replace(/\/(hwt|hmt)\?[^\s]*/, "").replace(/https?:/, ""))[e.length - 1] && (e = e.substr(0, e.length - 1)),
        (n ? "https:" : PROTOCOL) + e)),
        t
    }
    function compatibleVersion() {
        if (G._hwtTQ) {
            var t = "_ha";
            G._ha || (G._ha = function() {
                return (G._ha.q = G._ha.q || []).push(arguments)
            }
            ),
            G._ha.controller = G._ha.controller || new Controller;
            for (var e, n = G._hwtTQ; e = n.shift(); )
                e.splice(0, 0, e[0].UA),
                G._ha.controller.create(e, t, "_v1_1"),
                G._ha.controller.send(["pageview"], t, "_v1_1");
            G._hwt = {
                track: function(e, n) {
                    G._ha.controller.send(["pageview"], t, "_v1_1")
                }
            }
        }
    }
    compatibleVersion(),
    function() {
        var t = void 0 === G.HyperAnalyticsObject ? "_hwt" : G.HyperAnalyticsObject;
        if (isArray(t))
            for (var e = 0; e < t.length; e++)
                isObject(G[t[e]].q) || (G[t[e]].q = new HyperAnalytics(G[t[e]].q,t[e]));
        else
            G[t] || (G[t] = function() {
                return (G[t].q = G[t].q || []).push(arguments)
            }
            ),
            G[t].q = new HyperAnalytics(G[t].q,t)
    }(),
    G.CHECK_OPTIONS_CALLBACK && G.CHECK_OPTIONS_CALLBACK(OPTIONS)
}(this, document);
