/* ======================================================= 
 * Grid Responsive Gallery
 * By David Blanco
 *
 * Contact: http://codecanyon.net/user/davidbo90
 *
 * Created: June 26, 2013
 *
 * Copyright (c) 2013, David Blanco. All rights reserved.
 * Released under CodeCanyon License http://codecanyon.net/
 *
 * Note: Script based in jQuery Masonry v2.1.07 made by David DeSandro http://masonry.desandro.com/ (under MIT)
 *
 * ======================================================= */

(function(e, t, n) {
    "use strict";
    var r = t.event,
        i = t.event.handle ? "handle" : "dispatch",
        s;
    r.special.smartresize = {
        setup: function() {
            t(this).bind("resize", r.special.smartresize.handler)
        },
        teardown: function() {
            t(this).unbind("resize", r.special.smartresize.handler)
        },
        handler: function(e, t) {
            var n = this,
                o = arguments;
            e.type = "smartresize";
            if (s) {
                clearTimeout(s)
            }
            s = setTimeout(function() {
                r[i].apply(n, o)
            }, t === "execAsap" ? 0 : 100)
        }
    };
    t.fn.smartresize = function(e) {
        return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"])
    };
    t.Gri = function(e, n) {
        this.element = t(n);
        this._create(e);
        this._init()
    };
    t.Gri.settings = {
        isResizable: true,
        isAnimated: false,
        animationOptions: {
            queue: false,
            duration: 500
        },
        gutterWidth: 0,
        isRTL: false,
        isFitWidth: false,
        containerStyle: {
            position: "relative"
        }
    };
    t.Gri.prototype = {
        _filterFindBricks: function(e) {
            var t = this.options.itemSelector;
            return !t ? e : e.filter(t).add(e.find(t))
        },
        _getBricks: function(e) {
            var t = this._filterFindBricks(e).css({
                position: "absolute"
            }).addClass("grid-brick");
            return t
        },
        _create: function(n) {
            this.options = t.extend(true, {}, t.Gri.settings, n);
            this.styleQueue = [];
            var r = this.element[0].style;
            this.originalStyle = {
                height: r.height || ""
            };
            var i = this.options.containerStyle;
            for (var s in i) {
                this.originalStyle[s] = r[s] || ""
            }
            this.element.css(i);
            this.horizontalDirection = this.options.isRTL ? "right" : "left";
            var o = this.element.css("padding-" + this.horizontalDirection);
            var u = this.element.css("padding-top");
            this.offset = {
                x: o ? parseInt(o, 10) : 0,
                y: u ? parseInt(u, 10) : 0
            };
            this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === "function";
            var a = this;
            setTimeout(function() {
                a.element.addClass("grid")
            }, 0);
            if (this.options.isResizable) {
                t(e).bind("smartresize.grid", function() {
                    a.resize()
                })
            }
            this.reloadItems()
        },
        _init: function(e) {
            this._getColumns();
            this._reLayout(e)
        },
        option: function(e, n) {
            if (t.isPlainObject(e)) {
                this.options = t.extend(true, this.options, e)
            }
        },
        layout: function(e, t) {
            for (var n = 0, r = e.length; n < r; n++) {
                this._placeBrick(e[n])
            }
            var i = {};
            i.height = Math.max.apply(Math, this.colYs);
            if (this.options.isFitWidth) {
                var s = 0;
                n = this.cols;
                while (--n) {
                    if (this.colYs[n] !== 0) {
                        break
                    }
                    s++
                }
                i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth
            }
            this.styleQueue.push({
                $el: this.element,
                style: i
            });
            var o = !this.isLaidOut ? "css" : this.options.isAnimated ? "animate" : "css",
                u = this.options.animationOptions;
            var a;
            for (n = 0, r = this.styleQueue.length; n < r; n++) {
                a = this.styleQueue[n];
                a.$el[o](a.style, u)
            }
            this.styleQueue = [];
            if (t) {
                t.call(e)
            }
            this.isLaidOut = true
        },
        _getColumns: function() {
            var e = this.options.isFitWidth ? this.element.parent() : this.element,
                t = e.width();
            this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(true) || t;
            this.columnWidth += this.options.gutterWidth;
            this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth);
            this.cols = Math.max(this.cols, 1)
        },
        _placeBrick: function(e) {
            var n = t(e),
                r, i, s, o, u;
            r = Math.ceil(n.outerWidth(true) / this.columnWidth);
            r = Math.min(r, this.cols);
            if (r === 1) {
                s = this.colYs
            } else {
                i = this.cols + 1 - r;
                s = [];
                for (u = 0; u < i; u++) {
                    o = this.colYs.slice(u, u + r);
                    s[u] = Math.max.apply(Math, o)
                }
            }
            var a = Math.min.apply(Math, s),
                f = 0;
            for (var l = 0, c = s.length; l < c; l++) {
                if (s[l] === a) {
                    f = l;
                    break
                }
            }
            var h = {
                top: a + this.offset.y
            };
            h[this.horizontalDirection] = this.columnWidth * f + this.offset.x;
            this.styleQueue.push({
                $el: n,
                style: h
            });
            var p = a + n.outerHeight(true),
                d = this.cols + 1 - c;
            for (l = 0; l < d; l++) {
                this.colYs[f + l] = p
            }
        },
        resize: function() {
            var e = this.cols;
            this._getColumns();
            if (this.isFluid || this.cols !== e) {
                this._reLayout()
            }
        },
        _reLayout: function(e) {
            var t = this.cols;
            this.colYs = [];
            while (t--) {
                this.colYs.push(0)
            }
            this.layout(this.$bricks, e)
        },
        reloadItems: function() {
            this.$bricks = this._getBricks(this.element.children())
        },
        reload: function(e) {
            this.reloadItems();
            this._init(e)
        },
        appended: function(e, t, n) {
            var r = this.element.width();
            this.options.columnWidth(r);
            if (t) {
                this._filterFindBricks(e).css({
                    top: this.element.height()
                });
                var i = this;
                setTimeout(function() {
                    i._appended(e, n)
                }, 1)
            } else {
                this._appended(e, n)
            }
        },
        _appended: function(e, t) {
            var n = this._getBricks(e);
            this.$bricks = this.$bricks.add(n);
            this.layout(n, t)
        },
        remove: function(e) {
            this.$bricks = this.$bricks.not(e);
            e.remove()
        },
        destroy: function() {
            this.$bricks.removeClass("grid-brick").each(function() {
                this.style.position = "";
                this.style.top = "";
                this.style.left = ""
            });
            var n = this.element[0].style;
            for (var r in this.originalStyle) {
                n[r] = this.originalStyle[r]
            }
            this.element.unbind(".grid").removeClass("grid").removeData("grid");
            t(e).unbind(".grid")
        }
    };
    t.fn.imagesLoaded = function(e) {
        function u() {
            e.call(n, r)
        }

        function a(e) {
            var n = e.target;
            if (n.src !== s && t.inArray(n, o) === -1) {
                o.push(n);
                if (--i <= 0) {
                    setTimeout(u);
                    r.unbind(".imagesLoaded", a)
                }
            }
        }
        var n = this,
            r = n.children().children("img").add(n.filter("img")),
            i = r.length,
            s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            o = [];
        if (!i) {
            u()
        }
        r.bind("load.imagesLoaded error.imagesLoaded", a).each(function() {
            var e = this.src;
            this.src = s;
            this.src = e
        });
        return n
    };
    var o = function(t) {
        if (e.console) {
            e.console.error(t)
        }
    };
    t.fn.grid = function(r) {
        var i = function(i) {
            function l(e, t) {
                this.category = e;
                this.index = t
            }
            var s = t.extend({}, t.fn.grid.defaults, r);
            if (r == n) {
                r = {}
            }
            r.isFitWidth = s.isFitWidth;
            r.isAnimated = s.isAnimated;
            r.itemSelector = ".box";
            r.gutterWidth = s.horizontalSpaceBetweenThumbnails;
            var o = t(i).addClass("centered").addClass("grid-clearfix");
            var u = s.columnWidth;
            if (u == "auto") {
                r.columnWidth = function(e) {
                    var t = -999;
                    for (var n = s.columns; n >= 1; n--) {
                        if (t < s.columnMinWidth) {
                            t = (e - (n - 1) * r.gutterWidth) / n | 0
                        }
                    }
                    o.find("div.box").width(t);
                    return t
                }
            } else if (typeof u != "function") {
                r.columnWidth = function(e) {
                    var t = u;
                    o.find("div.box").width(t);
                    return t
                }
            }
            o.find("div.box").css("margin-bottom", s.verticalSpaceBetweenThumbnails);
            var a = o.find(".box");
            var f = Array();
            a.each(function(e) {
                i = t(this);
                var r = i.data("category");
                if (r == n) {
                    r = "all"
                }
                var s = new l(r, e);
                f.push(s)
            });
            var c = Array();
            for (var h in f) {
                var p = f[h];
                if (p.category == "all") {
                    continue
                }
                var d = false;
                for (var v = 0; v < c.length; v++) {
                    if (c[v] == p.category) {
                        d = true
                    }
                }
                if (d == false) {
                    c.push(p.category)
                }
            }
            var m = t('<ul class="category-navbar" />').hide().insertBefore(o);
            var g = t("<li />").data("category", "all").appendTo(m).addClass("select");
            var g = t("<a />").html("Websites").appendTo(g);
            for (var v = 0; v < c.length; v++) {
                var g = t("<li />").data("category", c[v]).appendTo(m);
                var g = t("<a />").html(c[v]).appendTo(g)
            }
            m.on("click", "a", function(e) {
                e.preventDefault();
                var t = jQuery(this);
                if (t.parent("li").hasClass("select")) {
                    return
                }
                t.parent("li").addClass("select").siblings("li").removeClass("select");
                var n = o;
                var r = t.parent("li").data("category");
                if (r == "all") {
                    n.children('div[data-show="yes"]').show().addClass("box grid-brick").css({
                        top: 200,
                        left: 200
                    })
                } else {
                    n.children('div[data-category="' + r + '"][data-show="yes"]').show().addClass("box grid-brick").css({
                        top: 200,
                        left: 200
                    });
                    n.children("div").not('.box[data-category="' + r + '"]').removeClass("box grid-brick").hide()
                }
                o.grid("reload");
                S(x(T()))
            });
            if (typeof c != "object" || c.length == 0 || s.showFilterBar == false) {} else {
                m.slideDown(400)
            }
            var y = t("<div />").insertAfter(o);
            var b = false;
            var w = function() {
                y.addClass("grid-loader").removeClass("grid-loadMore").html("")
            };
            var E = function() {
                y.removeClass("grid-loader")
            };
            var S = function(e) {
                if (e) {
                    y.addClass("grid-loadMore").html("LOAD MORE")
                } else {
                    y.removeClass("grid-loadMore").html("")
                }
            };
            var x = function(e) {
                var t = 0;
                for (var n in f) {
                    if (e == "all") {
                        t++
                    } else {
                        var r = f[n];
                        if (r.category == e) {
                            t++
                        }
                    }
                }
                if (t > 0) {
                    b = false;
                    return true
                } else {
                    return false
                }
            };
            var T = function() {
                var e = m.find("li[class=select]").data("category");
                return e
            };
            var N = function() {
                var e = T();
                if (e != "all") {
                    o.children("div").not('.box[data-category="' + e + '"]').removeClass("box grid-brick").hide()
                }
            };
            var C = function(e) {
                var r = T();
                w();
                var s = 0;
                var u = t.extend({}, f);
                for (var l in u) {
                    var c = u[l];
                    if (r == "all") {} else if (r != c.category) {
                        continue
                    }
                    s++;
                    if (s > e) {
                        break
                    }
                    i = a.eq(c.index);
                    i.addClass("box grid-brick").attr("data-show", "yes").hide().css({
                        top: 200,
                        left: 200
                    });
                    var h = i.find("div[data-thumbnail]").data("thumbnail");
                    var p = i.find("div[data-image]").data("image");
                    if (h == n) {
                        h = p
                    }
                    if (p == n) {
                        p = h
                    }
                    var d = t('<img src="' + h + '" data-lightbox="' + p + '" />');
                    i.prepend(d);
                    delete f[l]
                }
                o.imagesLoaded(function() {
                    a.filter(":hidden").css({
                        top: 200,
                        left: 200
                    }).show();
                    N();
                    b = false;
                    E();
                    S(x(T()));
                    o.grid("reload")
                })
            };
            a.removeClass("box grid-brick").hide();
            a.attr("data-show", "no");
            C(s.imagesToLoadStart);
            var k = function() {
                if (y.hasClass("grid-loadMore")) {
                    C(s.imagesToLoad)
                }
            };
            y.on("click", function() {
                k()
            });
            if (s.lazyLoad) {
                t(e).scroll(function() {
                    if (y.closest("html").length) {
                        if (t(e).scrollTop() == t(document).height() - t(e)[0].innerHeight && b == false) {
                            b = true;
                            k()
                        }
                    }
                })
            }
            o.on("mouseenter.hoverdir, mouseleave.hoverdir", "div.box", function(e) {
                if (!s.caption) return;
                var r = t(this),
                    i = e.type,
                    o = r.find("div.thumbnail-caption"),
                    u = L(r, {
                        x: e.pageX,
                        y: e.pageY
                    }),
                    a = A(u, r);
                var f = o.children("div.aligment");
                if (f[0] == n) {
                    var l = o.html();
                    o.html("<div class='aligment'><div class='aligment'>" + l + "</div></div>")
                }
                if (i === "mouseenter") {
                    if (s.captionType == "classic") {
                        o.css({
                            left: 0,
                            top: 0
                        });
                        o.fadeIn(300);
                        return
                    }
                    o.css({
                        left: a.from,
                        top: a.to
                    });
                    o.stop().show().fadeTo(0, 1, function() {
                        t(this).stop().animate({
                            top: 0,
                            left: 0
                        }, 200, "linear")
                    })
                } else {
                    if (s.captionType == "classic") {
                        o.css({
                            left: 0,
                            top: 0
                        });
                        o.fadeOut(300);
                        return
                    }
                    if (s.captionType == "grid-fade") {
                        o.fadeOut(700)
                    } else {
                        o.stop().animate({
                            left: a.from,
                            top: a.to
                        }, 200, "linear", function() {
                            o.hide()
                        })
                    }
                }
            });
            var L = function(e, t) {
                var n = e.width(),
                    r = e.height(),
                    i = (t.x - e.offset().left - n / 2) * (n > r ? r / n : 1),
                    s = (t.y - e.offset().top - r / 2) * (r > n ? n / r : 1),
                    o = Math.round((Math.atan2(s, i) * (180 / Math.PI) + 180) / 90 + 3) % 4;
                return o
            };
            var A = function(e, t) {
                var n, r;
                switch (e) {
                    case 0:
                        if (!s.reverse) {
                            n = 0, r = -t.height()
                        } else {
                            n = 0, r = -t.height()
                        }
                        break;
                    case 1:
                        if (!s.reverse) {
                            n = t.width(), r = 0
                        } else {
                            n = -t.width(), r = 0
                        }
                        break;
                    case 2:
                        if (!s.reverse) {
                            n = 0, r = t.height()
                        } else {
                            n = 0, r = -t.height()
                        }
                        break;
                    case 3:
                        if (!s.reverse) {
                            n = -t.width(), r = 0
                        } else {
                            n = t.width(), r = 0
                        }
                        break
                }
                return {
                    from: n,
                    to: r
                }
            };
            var O = t("body");
            var M = {
                interval: "none"
            };
            var _ = 0;
            var D = t('<div class="autoGrid-lightbox" />').appendTo(O);
            var P = t('<div class="autoGrid-nav"/>').appendTo(D);
            var H = t('<div class="autoGrid-close"/>').appendTo(P);
            var B = t('<i class="iconClose" />').appendTo(H);
            var j = t('<div class="autoGrid-play" />');

            if (s.lightboxPlayBtn) {
                j.appendTo(P)
            }
            var F = t('<i class="iconPlay" />').appendTo(j);
            var I = t('<div class="autoGrid-lbcaption" />').appendTo(P).html("Here will go the text for the lightbox");
            var q = t('<div class="autoGrid-next" />').appendTo(P);
            var R = t('<i class="iconNext" />').appendTo(q);
            var U = t('<div class="autoGrid-prev" />').appendTo(P);
            var z = t('<i class="iconPrev" />').appendTo(U);
            var W = t('<div class="lightbox-timer" />').appendTo(D);
            var X = H.width();
            var V = 3;
            if (s.lightboxPlayBtn) V = 4;
            var J = function() {
                var e = D.outerWidth(false);
                if (e < 650) {
                    I.hide();
                    q.css("width", e / V);
                    U.css("width", e / V);
                    j.css("width", e / V);
                    H.css("width", e - e / V * (V - 1))
                } else {
                    I.show();
                    q.css("width", X);
                    U.css("width", X);
                    j.css("width", X);
                    H.css("width", X)
                }
                var t = D.find("img");
                var n = D.outerHeight(false) - P.outerHeight(false) - 10;
                t.css("max-height", n)
            };
            jQuery(e).resize(function() {
                J()
            });
            var K = new Image;
            var Q = function() {
                K.onload = null;
                K = null;
                D.find("img").remove()
            };
            var G = function() {
                D.find(".lb-loader").remove()
            };
            var Y = function() {
                D.append('<div class="lb-loader"/>')
            };
            D.attr("unselectable", "on").css("user-select", "none").on("selectstart", false);
            var Z = function() {
                W.stop(true, true).width(0)
            };
            var et = function() {
                clearInterval(M.interval)
            };
            var tt = function() {
                if (s.lightBoxShowTimer == false) return;
                W.css({
                    position: "absolute",
                    bottom: 0
                }).animate({
                    width: "100%"
                }, s.lightBoxPlayInterval, "linear", function() {
                    Z()
                })
            };
            var nt = false;
            var rt = false;
            var it = function() {
                M.interval = setTimeout(function() {
                    lt()
                }, s.lightBoxPlayInterval);
                tt()
            };
            var st = function() {
                if (nt && rt == false) {
                    Z();
                    et();
                    it()
                }
            };
            var ot = t("<span />");
            var ut = function(e, r) {
                Q();
                G();
                Y();
                var i = 0;
                var o = 0;
                if (r != true) {
                    i = .9;
                    o = s.lightBoxSpeedFx
                }
                if (s.lightBoxZoomAnim == false) {
                    i = 1
                }
                var u = e;
                var a = u.data("lightbox");
                if (a == n) {
                    a = u.attr("src")
                }
                var f = u.siblings("div.lightbox-text").html();
                if (s.lightBoxText == false) {
                    // f is a piece of the light boxx
                    f = ""
                }
                // This can add text into the autogrid-nav area
                var l = "<div><div>" + f + "</div></div>";
                I.html(l);
                K = new Image;
                var c = t(K);
                var h = K;
                K.onload = function() {
                    if (h != K) return;
                    G();
                    D.append(c.hide().scale(i));
                    c.fadeIn(o).animate({
                        scale: "1"
                    }, {
                        duration: s.lightBoxSpeedFx,
                        complete: function() {
                            st()
                        }
                    });
                    J()
                };
                K.src = a;
                ot.stop(true);
                ot = t(K)
            };
            var at = false;
            o.on("click", "div.box", function() {
                at = true;
                var e = t(this);
                var r = e.data("url");
                if (r != n) {
                    location.href = r;
                    return
                }
                if (s.lightBox == false) {
                    return
                }
                rt = false;
                _ = o.find(".box").index(this);
                var i = e.children("img");
                P.animate({
                    "margin-top": 0
                }, s.lightBoxSpeedFx);
                D.fadeIn(s.lightBoxSpeedFx);
                ut(i, true)
            });
            D.on("click", "div", function(e) {
                e.stopPropagation()
            });
            D.on("click", "img", function(e) {
                e.stopPropagation()
            });
            D.on("click", function() {
                ft()
            });
            H.on("click", function() {
                ft()
            });
            var ft = function() {
                if (s.lightBoxStopPlayOnClose) {
                    j.removeClass("selected");
                    nt = false
                }
                at = false;
                rt = true;
                Z();
                et();
                D.find(".lb-loader").remove();
                var e = 0;
                if (s.lightBoxZoomAnim == false) {
                    e = 1
                }
                var t = D.find("img").stop().show();
                P.animate({
                    "margin-top": -P.outerHeight(false)
                }, s.lightBoxSpeedFx);
                if (t[0] != n) {
                    t.animate({
                        scale: e
                    }, s.lightBoxSpeedFx, function() {
                        D.fadeOut(100)
                    })
                } else {
                    D.fadeOut(100)
                }
            };
            var lt = function() {
                rt = false;
                var e = o.find(".box");
                _ += 1;
                if (_ >= e.length) {
                    _ = 0
                }
                if (!e.eq(_).is(":visible")) {
                    var t = _;
                    for (var n = 0; n < e.length; n++) {
                        t++;
                        if (t >= e.length) {
                            t = 0
                        }
                        if (e.eq(t).is(":visible")) {
                            _ = t;
                            break
                        }
                    }
                }
                var r = e.eq(_).children("img");
                ut(r)
            };
            var ct = function() {
                rt = false;
                var e = o.find(".box");
                _ -= 1;
                if (_ < 0) {
                    _ = e.length - 1
                }
                if (!e.eq(_).is(":visible")) {
                    var t = _;
                    for (var n = 0; n < e.length; n++) {
                        t--;
                        if (t < 0) {
                            t = e.length - 1
                        }
                        if (e.eq(t).is(":visible")) {
                            _ = t;
                            break
                        }
                    }
                }
                var r = e.eq(_).children("img");
                ut(r)
            };
            q.on("click", function() {
                Z();
                et();
                lt()
            });
            D.on("click", "img", function() {
                Z();
                et();
                lt()
            });
            U.on("click", function() {
                Z();
                et();
                ct()
            });
            t(document).keyup(function(e) {
                if (!s.lightboxKeyboardNav) return;
                if (e.keyCode == "37") {
                    if (at == false) return;
                    Z();
                    et();
                    ct()
                }
                if (e.keyCode == "39") {
                    if (at == false) return;
                    Z();
                    et();
                    lt()
                }
                if (e.keyCode == 27) {
                    ft()
                }
            });
            if (s.lightBoxAutoPlay) {
                j.addClass("selected");
                nt = true
            }
            j.on("click", function() {
                i = t(this);
                if (i.hasClass("selected")) {
                    i.removeClass("selected");
                    nt = false;
                    Z();
                    et()
                } else {
                    i.addClass("selected");
                    nt = true;
                    it()
                }
            })
        };
        if (typeof r === "string") {
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var e = t.data(this, "grid");
                if (!e) {
                    o("cannot call methods on grid prior to initialization; " + "attempted to call method '" + r + "'");
                    return
                }
                if (!t.isFunction(e[r]) || r.charAt(0) === "_") {
                    o("no such method '" + r + "' for grid instance");
                    return
                }
                e[r].apply(e, s)
            })
        } else {
            this.each(function() {
                var e = t.data(this, "grid");
                if (e) {
                    e.option(r || {});
                    e._init()
                } else {
                    i(this);
                    t.data(this, "grid", new t.Gri(r, this))
                }
            })
        }
        return this
    };
    t.fn.grid.defaults = {
        showFilterBar: true,
        imagesToLoad: 5,
        imagesToLoadStart: 15,
        lazyLoad: false,
        isFitWidth: true,
        horizontalSpaceBetweenThumbnails: 5,
        verticalSpaceBetweenThumbnails: 5,
        columnWidth: "auto",
        columns: 5,
        columnMinWidth: 220,
        isAnimated: true,
        caption: true,
        captionType: "grid",
        lightBox: true,
        lightboxKeyboardNav: true,
        lightBoxSpeedFx: 500,
        lightBoxZoomAnim: true,
        lightBoxText: true,
        lightboxPlayBtn: true,
        lightBoxAutoPlay: false,
        lightBoxPlayInterval: 4e3,
        lightBoxShowTimer: true,
        lightBoxStopPlayOnClose: false
    }
})(window, jQuery)