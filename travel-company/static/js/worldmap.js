//Tweenlite.js (used for zooming)
(function (m) {
    var F = function (a) {
        var a = a.split("."), c = m, b;
        for (b = 0; b < a.length; b++)c[a[b]] = c = c[a[b]] || {};
        return c
    }, n = F("com.greensock"), o, k, d, z, G, v = {}, C = function (a, c, b, j) {
        this.sc = v[a] ? v[a].sc : [];
        v[a] = this;
        this.gsClass = null;
        this.def = b;
        var e = c || [], d = [];
        this.check = function (c) {
            for (var f = e.length, g = 0, l; -1 < --f;)(l = v[e[f]] || new C(e[f])).gsClass ? d[f] = l.gsClass : (g++, c && l.sc.push(this));
            if (0 === g && b) {
                var c = ("com.greensock." + a).split("."), f = c.pop(), k = F(c.join("."))[f] = this.gsClass = b.apply(b, d);
                j && ((m.GreenSockGlobals || m)[f] = k, "function" === typeof define && define.amd ? define((m.GreenSockAMDPath ? m.GreenSockAMDPath + "/" : "") + a.split(".").join("/"), [], function () {
                    return k
                }) : "undefined" !== typeof module && module.exports && (module.exports = k));
                for (f = 0; f < this.sc.length; f++)this.sc[f].check(!1)
            }
        };
        this.check(!0)
    }, q = n._class = function (a, c, b) {
        new C(a, [], function () {
            return c
        }, b);
        return c
    };
    m._gsDefine = function (a, c, b, j) {
        return new C(a, c, b, j)
    };
    var H = [0, 0, 1, 1], D = [], s = q("easing.Ease", function (a, c, b, j) {
        this._func = a;
        this._type = b || 0;
        this._power = j || 0;
        this._params = c ? H.concat(c) : H
    }, !0);
    d = s.prototype;
    d._calcEnd = !1;
    d.getRatio = function (a) {
        if (this._func)return this._params[0] = a, this._func.apply(null, this._params);
        var c = this._type, b = this._power, j = 1 === c ? 1 - a : 2 === c ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
        1 === b ? j *= j : 2 === b ? j *= j * j : 3 === b ? j *= j * j * j : 4 === b && (j *= j * j * j * j);
        return 1 === c ? 1 - j : 2 === c ? j : 0.5 > a ? j / 2 : 1 - j / 2
    };
    o = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
    for (k = o.length; -1 < --k;)d = q("easing." + o[k], function () {
    }, !0), z = q("easing.Power" + k, function () {
    }, !0), d.easeOut = z.easeOut = new s(null, null, 1, k), d.easeIn = z.easeIn = new s(null, null, 2, k), d.easeInOut = z.easeInOut = new s(null, null, 3, k);
    q("easing.Strong", n.easing.Power4, !0);
    n.easing.Linear.easeNone = n.easing.Linear.easeIn;
    d = q("events.EventDispatcher", function (a) {
        this._listeners = {};
        this._eventTarget = a || this
    }).prototype;
    d.addEventListener = function (a, c, b, j, e) {
        var e = e || 0, d = this._listeners[a], h = 0, f;
        null == d && (this._listeners[a] = d = []);
        for (f = d.length; -1 < --f;)a = d[f], a.c === c ? d.splice(f, 1) : 0 === h && a.pr < e && (h = f + 1);
        d.splice(h, 0, {c: c, s: b, up: j, pr: e})
    };
    d.removeEventListener = function (a, c) {
        var b = this._listeners[a];
        if (b)for (var j = b.length; -1 < --j;)if (b[j].c === c) {
            b.splice(j, 1);
            break
        }
    };
    d.dispatchEvent = function (a) {
        var c = this._listeners[a];
        if (c)for (var b = c.length, j, d = this._eventTarget; -1 < --b;)j = c[b], j.up ? j.c.call(j.s || d, {type: a, target: d}) : j.c.call(j.s || d)
    };
    var A = m.requestAnimationFrame, B = m.cancelAnimationFrame, I = Date.now || function () {
        return(new Date).getTime()
    };
    o = ["ms", "moz", "webkit", "o"];
    for (k = o.length; -1 < --k && !A;)A = m[o[k] + "RequestAnimationFrame"], B = m[o[k] + "CancelAnimationFrame"] || m[o[k] + "CancelRequestAnimationFrame"];
    B || (B = function (a) {
        m.clearTimeout(a)
    });
    q("Ticker", function (a, c) {
        this.frame = this.time = 0;
        var b = this, j = I(), d = !1 !== c, i, h, f, g, l;
        this.tick = function () {
            b.time = (I() - j) / 1E3;
            if (!i || b.time >= l)b.frame++, l = b.time + g - (b.time - l) - 5E-4, l <= b.time && (l = b.time + 0.001), b.dispatchEvent("tick");
            f = h(b.tick)
        };
        this.fps = function (a) {
            if (!arguments.length)return i;
            i = a;
            g = 1 / (i || 60);
            l = this.time + g;
            h = 0 === i ? function () {
            } : !d || !A ? function (a) {
                return m.setTimeout(a, 1E3 * (l - b.time) + 1 >> 0 || 1)
            } : A;
            B(f);
            f = h(b.tick)
        };
        this.useRAF = function (a) {
            if (!arguments.length)return d;
            d = a;
            this.fps(i)
        };
        this.fps(a)
    });
    d = n.Ticker.prototype = new n.events.EventDispatcher;
    d.constructor = n.Ticker;
    var p = q("core.Animation", function (a, c) {
        this.vars = c || {};
        this._duration = this._totalDuration = a || 0;
        this._delay = Number(this.vars.delay) || 0;
        this._timeScale = 1;
        this._active = !0 == this.vars.immediateRender;
        this.data = this.vars.data;
        this._reversed = !0 == this.vars.reversed;
        if (t) {
            G || (r.tick(), G = !0);
            var b = this.vars.useFrames ? w : t;
            b.insert(this, b._time);
            this.vars.paused && this.paused(!0)
        }
    }), r = p.ticker = new n.Ticker;
    d = p.prototype;
    d._dirty = d._gc = d._initted = d._paused = !1;
    d._totalTime = d._time = 0;
    d._rawPrevTime = -1;
    d._next = d._last = d._onUpdate = d._timeline = d.timeline = null;
    d._paused = !1;
    d.play = function (a, c) {
        arguments.length && this.seek(a, c);
        this.reversed(!1);
        return this.paused(!1)
    };
    d.pause = function (a, c) {
        arguments.length && this.seek(a, c);
        return this.paused(!0)
    };
    d.resume = function (a, c) {
        arguments.length && this.seek(a, c);
        return this.paused(!1)
    };
    d.seek = function (a, c) {
        return this.totalTime(Number(a), !1 != c)
    };
    d.restart = function (a, c) {
        this.reversed(!1);
        this.paused(!1);
        return this.totalTime(a ? -this._delay : 0, !1 != c)
    };
    d.reverse = function (a, c) {
        arguments.length && this.seek(a || this.totalDuration(), c);
        this.reversed(!0);
        return this.paused(!1)
    };
    d.render = function () {
    };
    d.invalidate = function () {
        return this
    };
    d._enabled = function (a, c) {
        this._gc = !a;
        this._active = a && !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration;
        !0 != c && (a && null == this.timeline ? this._timeline.insert(this, this._startTime - this._delay) : !a && null != this.timeline && this._timeline._remove(this, !0));
        return!1
    };
    d._kill = function () {
        return this._enabled(!1, !1)
    };
    d.kill = function (a, c) {
        this._kill(a, c);
        return this
    };
    d._uncache = function (a) {
        for (a = a ? this : this.timeline; a;)a._dirty = !0, a = a.timeline;
        return this
    };
    d.eventCallback = function (a, c, b, j) {
        if (null == a)return null;
        if ("on" === a.substr(0, 2)) {
            if (1 === arguments.length)return this.vars[a];
            if (null == c)delete this.vars[a]; else if (this.vars[a] = c, this.vars[a + "Params"] = b, this.vars[a + "Scope"] = j, b)for (var d = b.length; -1 < --d;)"{self}" === b[d] && (b = this.vars[a + "Params"] = b.concat(), b[d] = this);
            "onUpdate" === a && (this._onUpdate = c)
        }
        return this
    };
    d.delay = function (a) {
        if (!arguments.length)return this._delay;
        this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay);
        this._delay = a;
        return this
    };
    d.duration = function (a) {
        if (!arguments.length)return this._dirty = !1, this._duration;
        this._duration = this._totalDuration = a;
        this._uncache(!0);
        this._timeline.smoothChildTiming && this._active && 0 != a && this.totalTime(this._totalTime * (a / this._duration), !0);
        return this
    };
    d.totalDuration = function (a) {
        this._dirty = !1;
        return!arguments.length ? this._totalDuration : this.duration(a)
    };
    d.time = function (a, c) {
        if (!arguments.length)return this._time;
        this._dirty && this.totalDuration();
        a > this._duration && (a = this._duration);
        return this.totalTime(a, c)
    };
    d.totalTime = function (a, c) {
        if (!arguments.length)return this._totalTime;
        if (this._timeline) {
            0 > a && (a += this.totalDuration());
            if (this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), a > this._totalDuration && (a = this._totalDuration), this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (!this._reversed ? a : this._totalDuration - a) / this._timeScale, this._timeline._dirty || this._uncache(!1), !this._timeline._active))for (var b = this._timeline; b._timeline;)b.totalTime(b._totalTime, !0), b = b._timeline;
            this._gc && this._enabled(!0, !1);
            this._totalTime != a && this.render(a, c, !1)
        }
        return this
    };
    d.startTime = function (a) {
        if (!arguments.length)return this._startTime;
        a != this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.insert(this, a - this._delay));
        return this
    };
    d.timeScale = function (a) {
        if (!arguments.length)return this._timeScale;
        a = a || 1E-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var c = this._pauseTime || 0 == this._pauseTime ? this._pauseTime : this._timeline._totalTime;
            this._startTime = c - (c - this._startTime) * this._timeScale / a
        }
        this._timeScale = a;
        return this._uncache(!1)
    };
    d.reversed = function (a) {
        if (!arguments.length)return this._reversed;
        a != this._reversed && (this._reversed = a, this.totalTime(this._totalTime, !0));
        return this
    };
    d.paused = function (a) {
        if (!arguments.length)return this._paused;
        a != this._paused && this._timeline && (!a && this._timeline.smoothChildTiming && (this._startTime += this._timeline.rawTime() - this._pauseTime, this._uncache(!1)), this._pauseTime = a ? this._timeline.rawTime() : null, this._paused = a, this._active = !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration);
        this._gc && (a || this._enabled(!0, !1));
        return this
    };
    n = q("core.SimpleTimeline", function (a) {
        p.call(this, 0, a);
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    d = n.prototype = new p;
    d.constructor = n;
    d.kill()._gc = !1;
    d._first = d._last = null;
    d._sortChildren = !1;
    d.insert = function (a, c) {
        a._startTime = Number(c || 0) + a._delay;
        a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale);
        a.timeline && a.timeline._remove(a, !0);
        a.timeline = a._timeline = this;
        a._gc && a._enabled(!0, !0);
        var b = this._last;
        if (this._sortChildren)for (var d = a._startTime; b && b._startTime > d;)b = b._prev;
        b ? (a._next = b._next, b._next = a) : (a._next = this._first, this._first = a);
        a._next ? a._next._prev = a : this._last = a;
        a._prev = b;
        this._timeline && this._uncache(!0);
        return this
    };
    d._remove = function (a, c) {
        a.timeline === this && (c || a._enabled(!1, !0), a.timeline = null, a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), this._timeline && this._uncache(!0));
        return this
    };
    d.render = function (a, c) {
        var b = this._first, d;
        for (this._totalTime = this._time = this._rawPrevTime = a; b;) {
            d = b._next;
            if (b._active || a >= b._startTime && !b._paused)b._reversed ? b.render((!b._dirty ? b._totalDuration : b.totalDuration()) - (a - b._startTime) * b._timeScale, c, !1) : b.render((a - b._startTime) * b._timeScale, c, !1);
            b = d
        }
    };
    d.rawTime = function () {
        return this._totalTime
    };
    var g = q("TweenLite", function (a, c, b) {
        p.call(this, c, b);
        if (null == a)throw"Cannot tween an undefined reference.";
        this.target = a;
        this._overwrite = null == this.vars.overwrite ? J[g.defaultOverwrite] : "number" === typeof this.vars.overwrite ? this.vars.overwrite >> 0 : J[this.vars.overwrite];
        if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
            this._targets = a.slice(0);
            this._propLookup = [];
            this._siblings = [];
            for (a = 0; a < this._targets.length; a++)b = this._targets[a], b.jquery ? (this._targets.splice(a--, 1), this._targets = this._targets.concat(b.constructor.makeArray(b))) : (this._siblings[a] = x(b, this, !1), 1 === this._overwrite && 1 < this._siblings[a].length && E(b, this, null, 1, this._siblings[a]))
        } else this._propLookup = {}, this._siblings = x(a, this, !1), 1 === this._overwrite && 1 < this._siblings.length && E(a, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === c && 0 === this._delay && !1 != this.vars.immediateRender) && this.render(-this._delay, !1, !0)
    }, !0);
    d = g.prototype = new p;
    d.constructor = g;
    d.kill()._gc = !1;
    d.ratio = 0;
    d._firstPT = d._targets = d._overwrittenProps = null;
    d._notifyPluginsOfEnabled = !1;
    g.version = 12;
    g.defaultEase = d._ease = new s(null, null, 1, 1);
    g.defaultOverwrite = "auto";
    g.ticker = r;
    var K = g._plugins = {}, u = g._tweenLookup = {}, M = 0, N = {ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, orientToBezier: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1}, J = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0}, w = p._rootFramesTimeline = new n, t = p._rootTimeline = new n;
    t._startTime = r.time;
    w._startTime = r.frame;
    t._active = w._active = !0;
    p._updateRoot = function () {
        t.render((r.time - t._startTime) * t._timeScale, !1, !1);
        w.render((r.frame - w._startTime) * w._timeScale, !1, !1);
        if (!(r.frame % 120)) {
            var a, c, b;
            for (b in u) {
                c = u[b].tweens;
                for (a = c.length; -1 < --a;)c[a]._gc && c.splice(a, 1);
                0 === c.length && delete u[b]
            }
        }
    };
    r.addEventListener("tick", p._updateRoot);
    var x = function (a, c, b) {
        var d = a._gsTweenID, e;
        if (!u[d || (a._gsTweenID = d = "t" + M++)])u[d] = {target: a, tweens: []};
        if (c && (a = u[d].tweens, a[e = a.length] = c, b))for (; -1 < --e;)a[e] === c && a.splice(e, 1);
        return u[d].tweens
    }, E = function (a, c, b, d, e) {
        var i, h, f;
        if (1 === d || 4 <= d) {
            a = e.length;
            for (i = 0; i < a; i++)if ((f = e[i]) !== c)f._gc || f._enabled(!1, !1) && (h = !0); else if (5 === d)break;
            return h
        }
        var g = c._startTime + 1E-10, l = [], k = 0, m;
        for (i = e.length; -1 < --i;)if (!((f = e[i]) === c || f._gc || f._paused))f._timeline !== c._timeline ? (m = m || L(c, 0), 0 === L(f, m) && (l[k++] = f)) : f._startTime <= g && f._startTime + f.totalDuration() / f._timeScale + 1E-10 > g && ((0 === c._duration || !f._initted) && 2E-10 >= g - f._startTime || (l[k++] = f));
        for (i = k; -1 < --i;)if (f = l[i], 2 === d && f._kill(b, a) && (h = !0), 2 !== d || !f._firstPT && f._initted)f._enabled(!1, !1) && (h = !0);
        return h
    }, L = function (a, c) {
        for (var b = a._timeline, d = b._timeScale, e = a._startTime; b._timeline;) {
            e += b._startTime;
            d *= b._timeScale;
            if (b._paused)return-100;
            b = b._timeline
        }
        e /= d;
        return e > c ? e - c : !a._initted && 2E-10 > e - c ? 1E-10 : (e += a.totalDuration() / a._timeScale / d) > c ? 0 : e - c - 1E-10
    };
    d._init = function () {
        this.vars.startAt && (this.vars.startAt.overwrite = 0, this.vars.startAt.immediateRender = !0, g.to(this.target, 0, this.vars.startAt));
        var a, c;
        this._ease = this.vars.ease instanceof s ? this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease : "function" === typeof this.vars.ease ? new s(this.vars.ease, this.vars.easeParams) : g.defaultEase;
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets)for (a = this._targets.length; -1 < --a;) {
            if (this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], this._overwrittenProps ? this._overwrittenProps[a] : null))c = !0
        } else c = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
        c && g._onPluginEvent("_onInitAllProps", this);
        this._overwrittenProps && null == this._firstPT && "function" !== typeof this.target && this._enabled(!1, !1);
        if (this.vars.runBackwards)for (a = this._firstPT; a;)a.s += a.c, a.c = -a.c, a = a._next;
        this._onUpdate = this.vars.onUpdate;
        this._initted = !0
    };
    d._initProps = function (a, c, b, d) {
        var e, i, h, f, g, l;
        if (null == a)return!1;
        for (e in this.vars) {
            if (N[e]) {
                if ("onStartParams" === e || "onUpdateParams" === e || "onCompleteParams" === e || "onReverseCompleteParams" === e || "onRepeatParams" === e)if (g = this.vars[e])for (i = g.length; -1 < --i;)"{self}" === g[i] && (g = this.vars[e] = g.concat(), g[i] = this)
            } else if (K[e] && (f = new K[e])._onInitTween(a, this.vars[e], this)) {
                this._firstPT = l = {_next: this._firstPT, t: f, p: "setRatio", s: 0, c: 1, f: !0, n: e, pg: !0, pr: f._priority};
                for (i = f._overwriteProps.length; -1 < --i;)c[f._overwriteProps[i]] = this._firstPT;
                if (f._priority || f._onInitAllProps)h = !0;
                if (f._onDisable || f._onEnable)this._notifyPluginsOfEnabled = !0
            } else this._firstPT = c[e] = l = {_next: this._firstPT, t: a, p: e, f: "function" === typeof a[e], n: e, pg: !1, pr: 0}, l.s = !l.f ? parseFloat(a[e]) : a[e.indexOf("set") || "function" !== typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)](), i = this.vars[e], l.c = "number" === typeof i ? i - l.s : "string" === typeof i && "=" === i.charAt(1) ? parseInt(i.charAt(0) + "1") * Number(i.substr(2)) : Number(i) || 0;
            l && l._next && (l._next._prev = l)
        }
        return d && this._kill(d, a) ? this._initProps(a, c, b, d) : 1 < this._overwrite && this._firstPT && 1 < b.length && E(a, this, c, this._overwrite, b) ? (this._kill(c, a), this._initProps(a, c, b, d)) : h
    };
    d.render = function (a, c, b) {
        var d = this._time, e, i;
        if (a >= this._duration) {
            if (this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (e = !0, i = "onComplete"), 0 === this._duration) {
                if (0 === a || 0 > this._rawPrevTime)this._rawPrevTime !== a && (b = !0);
                this._rawPrevTime = a
            }
        } else if (0 >= a) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (0 !== d || 0 === this._duration && 0 < this._rawPrevTime)i = "onReverseComplete", e = this._reversed;
            0 > a ? (this._active = !1, 0 === this._duration && (0 <= this._rawPrevTime && (b = !0), this._rawPrevTime = a)) : this._initted || (b = !0)
        } else if (this._totalTime = this._time = a, this._easeType) {
            var h = a / this._duration, f = this._easeType, g = this._easePower;
            if (1 === f || 3 === f && 0.5 <= h)h = 1 - h;
            3 === f && (h *= 2);
            1 === g ? h *= h : 2 === g ? h *= h * h : 3 === g ? h *= h * h * h : 4 === g && (h *= h * h * h * h);
            this.ratio = 1 === f ? 1 - h : 2 === f ? h : 0.5 > a / this._duration ? h / 2 : 1 - h / 2
        } else this.ratio = this._ease.getRatio(a / this._duration);
        if (this._time !== d || b) {
            this._initted || (this._init(), !e && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration)));
            !this._active && !this._paused && (this._active = !0);
            if (0 === d && this.vars.onStart && (0 !== this._time || 0 === this._duration))c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || D);
            for (a = this._firstPT; a;) {
                if (a.f)a.t[a.p](a.c * this.ratio + a.s); else a.t[a.p] = a.c * this.ratio + a.s;
                a = a._next
            }
            this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || D));
            i && !this._gc && (e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), c || this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || D))
        }
    };
    d._kill = function (a, c) {
        "all" === a && (a = null);
        if (null == a && (null == c || c == this.target))return this._enabled(!1, !1);
        var c = c || this._targets || this.target, b, d, e, i, g, f, k;
        if ((c instanceof Array || c.jquery) && "object" === typeof c[0])for (b = c.length; -1 < --b;)this._kill(a, c[b]) && (g = !0); else {
            if (this._targets)for (b = this._targets.length; -1 < --b;) {
                if (c === this._targets[b]) {
                    i = this._propLookup[b] || {};
                    this._overwrittenProps = this._overwrittenProps || [];
                    d = this._overwrittenProps[b] = a ? this._overwrittenProps[b] || {} : "all";
                    break
                }
            } else {
                if (c !== this.target)return!1;
                i = this._propLookup;
                d = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
            }
            if (i)for (e in f = a || i, k = a != d && "all" != d && a != i && (null == a || !0 != a._tempKill), f) {
                if (b = i[e]) {
                    b.pg && b.t._kill(f) && (g = !0);
                    if (!b.pg || 0 === b.t._overwriteProps.length)b._prev ? b._prev._next = b._next : b === this._firstPT && (this._firstPT = b._next), b._next && (b._next._prev = b._prev), b._next = b._prev = null;
                    delete i[e]
                }
                k && (d[e] = 1)
            }
        }
        return g
    };
    d.invalidate = function () {
        this._notifyPluginsOfEnabled && g._onPluginEvent("_onDisable", this);
        this._onUpdate = this._overwrittenProps = this._firstPT = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = !1;
        this._propLookup = this._targets ? {} : [];
        return this
    };
    d._enabled = function (a, c) {
        if (a && this._gc)if (this._targets)for (var b = this._targets.length; -1 < --b;)this._siblings[b] = x(this._targets[b], this, !0); else this._siblings = x(this.target, this, !0);
        p.prototype._enabled.call(this, a, c);
        return this._notifyPluginsOfEnabled && this._firstPT ? g._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
    };
    g.to = function (a, c, b) {
        return new g(a, c, b)
    };
    g.from = function (a, c, b) {
        b.runBackwards = !0;
        !1 != b.immediateRender && (b.immediateRender = !0);
        return new g(a, c, b)
    };
    g.fromTo = function (a, c, b, d) {
        d.startAt = b;
        b.immediateRender && (d.immediateRender = !0);
        return new g(a, c, d)
    };
    g.delayedCall = function (a, c, b, d, e) {
        return new g(c, 0, {delay: a, onComplete: c, onCompleteParams: b, onCompleteScope: d, onReverseComplete: c, onReverseCompleteParams: b, onReverseCompleteScope: d, immediateRender: !1, useFrames: e, overwrite: 0})
    };
    g.set = function (a, c) {
        return new g(a, 0, c)
    };
    g.killTweensOf = g.killDelayedCallsTo = function (a, c) {
        for (var b = g.getTweensOf(a), d = b.length; -1 < --d;)b[d]._kill(c, a)
    };
    g.getTweensOf = function (a) {
        if (null != a) {
            var c, b, d;
            if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
                c = a.length;
                for (b = []; -1 < --c;)b = b.concat(g.getTweensOf(a[c]));
                for (c = b.length; -1 < --c;) {
                    d = b[c];
                    for (a = c; -1 < --a;)d === b[a] && b.splice(c, 1)
                }
            } else {
                b = x(a).concat();
                for (c = b.length; -1 < --c;)b[c]._gc && b.splice(c, 1)
            }
            return b
        }
    };
    var y = q("plugins.TweenPlugin", function (a, c) {
        this._overwriteProps = (a || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = c || 0
    }, !0);
    d = y.prototype;
    y.version = 12;
    y.API = 2;
    d._firstPT = null;
    d._addTween = function (a, c, b, d, e, g) {
        var h;
        if (null != d && (h = "number" === typeof d || "=" !== d.charAt(1) ? Number(d) - b : parseInt(d.charAt(0) + "1") * Number(d.substr(2))))this._firstPT = a = {_next: this._firstPT, t: a, p: c, s: b, c: h, f: "function" === typeof a[c], n: e || c, r: g}, a._next && (a._next._prev = a)
    };
    d.setRatio = function (a) {
        for (var c = this._firstPT, b; c;) {
            b = c.c * a + c.s;
            c.r && (b = b + (0 < b ? 0.5 : -0.5) >> 0);
            if (c.f)c.t[c.p](b); else c.t[c.p] = b;
            c = c._next
        }
    };
    d._kill = function (a) {
        if (null != a[this._propName])this._overwriteProps = []; else for (var c = this._overwriteProps.length; -1 < --c;)null != a[this._overwriteProps[c]] && this._overwriteProps.splice(c, 1);
        for (c = this._firstPT; c;)null != a[c.n] && ((c._next && (c._next._prev = c._prev), c._prev) ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next)), c = c._next;
        return!1
    };
    d._roundProps = function (a, c) {
        for (var b = this._firstPT; b;) {
            if (a[this._propName] || null != b.n && a[b.n.split(this._propName + "_").join("")])b.r = c;
            b = b._next
        }
    };
    g._onPluginEvent = function (a, c) {
        var b = c._firstPT, d;
        if ("_onInitAllProps" === a) {
            for (var e, g, h, f; b;) {
                f = b._next;
                for (e = g; e && e.pr > b.pr;)e = e._next;
                (b._prev = e ? e._prev : h) ? b._prev._next = b : g = b;
                (b._next = e) ? e._prev = b : h = b;
                b = f
            }
            b = c._firstPT = g
        }
        for (; b;)b.pg && "function" === typeof b.t[a] && b.t[a]() && (d = !0), b = b._next;
        return d
    };
    y.activate = function (a) {
        for (var c = a.length; -1 < --c;)a[c].API === y.API && (g._plugins[(new a[c])._propName] = a[c]);
        return!0
    };
    if (o = m._gsQueue) {
        for (k = 0; k < o.length; k++)o[k]();
        for (d in v)v[d].def || console.log("Warning: TweenLite encountered missing dependency: com.greensock." + d)
    }
})(window);
/* @license Copyright (c) 2008-2014, GreenSock. All rights reserved. * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for* Club GreenSock members, the software agreement that was issued with your membership.*/

//Raphael.js (svg/vml library)
!function (a) {
    var b, c, d = "0.4.2", e = "hasOwnProperty", f = /[\.\/]/, g = "*", h = function () {
    }, i = function (a, b) {
        return a - b
    }, j = {n: {}}, k = function (a, d) {
        a = String(a);
        var e, f = c, g = Array.prototype.slice.call(arguments, 2), h = k.listeners(a), j = 0, l = [], m = {}, n = [], o = b;
        b = a, c = 0;
        for (var p = 0, q = h.length; q > p; p++)"zIndex"in h[p] && (l.push(h[p].zIndex), h[p].zIndex < 0 && (m[h[p].zIndex] = h[p]));
        for (l.sort(i); l[j] < 0;)if (e = m[l[j++]], n.push(e.apply(d, g)), c)return c = f, n;
        for (p = 0; q > p; p++)if (e = h[p], "zIndex"in e)if (e.zIndex == l[j]) {
            if (n.push(e.apply(d, g)), c)break;
            do if (j++, e = m[l[j]], e && n.push(e.apply(d, g)), c)break; while (e)
        } else m[e.zIndex] = e; else if (n.push(e.apply(d, g)), c)break;
        return c = f, b = o, n.length ? n : null
    };
    k._events = j, k.listeners = function (a) {
        var b, c, d, e, h, i, k, l, m = a.split(f), n = j, o = [n], p = [];
        for (e = 0, h = m.length; h > e; e++) {
            for (l = [], i = 0, k = o.length; k > i; i++)for (n = o[i].n, c = [n[m[e]], n[g]], d = 2; d--;)b = c[d], b && (l.push(b), p = p.concat(b.f || []));
            o = l
        }
        return p
    }, k.on = function (a, b) {
        if (a = String(a), "function" != typeof b)return function () {
        };
        for (var c = a.split(f), d = j, e = 0, g = c.length; g > e; e++)d = d.n, d = d.hasOwnProperty(c[e]) && d[c[e]] || (d[c[e]] = {n: {}});
        for (d.f = d.f || [], e = 0, g = d.f.length; g > e; e++)if (d.f[e] == b)return h;
        return d.f.push(b), function (a) {
            +a == +a && (b.zIndex = +a)
        }
    }, k.f = function (a) {
        var b = [].slice.call(arguments, 1);
        return function () {
            k.apply(null, [a, null].concat(b).concat([].slice.call(arguments, 0)))
        }
    }, k.stop = function () {
        c = 1
    }, k.nt = function (a) {
        return a ? new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)").test(b) : b
    }, k.nts = function () {
        return b.split(f)
    }, k.off = k.unbind = function (a, b) {
        if (!a)return k._events = j = {n: {}}, void 0;
        var c, d, h, i, l, m, n, o = a.split(f), p = [j];
        for (i = 0, l = o.length; l > i; i++)for (m = 0; m < p.length; m += h.length - 2) {
            if (h = [m, 1], c = p[m].n, o[i] != g)c[o[i]] && h.push(c[o[i]]); else for (d in c)c[e](d) && h.push(c[d]);
            p.splice.apply(p, h)
        }
        for (i = 0, l = p.length; l > i; i++)for (c = p[i]; c.n;) {
            if (b) {
                if (c.f) {
                    for (m = 0, n = c.f.length; n > m; m++)if (c.f[m] == b) {
                        c.f.splice(m, 1);
                        break
                    }
                    !c.f.length && delete c.f
                }
                for (d in c.n)if (c.n[e](d) && c.n[d].f) {
                    var q = c.n[d].f;
                    for (m = 0, n = q.length; n > m; m++)if (q[m] == b) {
                        q.splice(m, 1);
                        break
                    }
                    !q.length && delete c.n[d].f
                }
            } else {
                delete c.f;
                for (d in c.n)c.n[e](d) && c.n[d].f && delete c.n[d].f
            }
            c = c.n
        }
    }, k.once = function (a, b) {
        var c = function () {
            return k.unbind(a, c), b.apply(this, arguments)
        };
        return k.on(a, c)
    }, k.version = d, k.toString = function () {
        return"You are running Eve " + d
    }, "undefined" != typeof module && module.exports ? module.exports = k : "undefined" != typeof define ? define("eve", [], function () {
        return k
    }) : a.eve = k
}(this), function (a, b) {
    "function" == typeof define && define.amd ? define(["eve"], function (c) {
        return b(a, c)
    }) : b(a, a.eve)
}(this, function (a, b) {
    function c(a) {
        if (c.is(a, "function"))return u ? a() : b.on("raphael.DOMload", a);
        if (c.is(a, V))return c._engine.create[D](c, a.splice(0, 3 + c.is(a[0], T))).add(a);
        var d = Array.prototype.slice.call(arguments, 0);
        if (c.is(d[d.length - 1], "function")) {
            var e = d.pop();
            return u ? e.call(c._engine.create[D](c, d)) : b.on("raphael.DOMload", function () {
                e.call(c._engine.create[D](c, d))
            })
        }
        return c._engine.create[D](c, arguments)
    }

    function d(a) {
        if ("function" == typeof a || Object(a) !== a)return a;
        var b = new a.constructor;
        for (var c in a)a[z](c) && (b[c] = d(a[c]));
        return b
    }

    function e(a, b) {
        for (var c = 0, d = a.length; d > c; c++)if (a[c] === b)return a.push(a.splice(c, 1)[0])
    }

    function f(a, b, c) {
        function d() {
            var f = Array.prototype.slice.call(arguments, 0), g = f.join("?"), h = d.cache = d.cache || {}, i = d.count = d.count || [];
            return h[z](g) ? (e(i, g), c ? c(h[g]) : h[g]) : (i.length >= 1e3 && delete h[i.shift()], i.push(g), h[g] = a[D](b, f), c ? c(h[g]) : h[g])
        }

        return d
    }

    function g() {
        return this.hex
    }

    function h(a, b) {
        for (var c = [], d = 0, e = a.length; e - 2 * !b > d; d += 2) {
            var f = [
                {x: +a[d - 2], y: +a[d - 1]},
                {x: +a[d], y: +a[d + 1]},
                {x: +a[d + 2], y: +a[d + 3]},
                {x: +a[d + 4], y: +a[d + 5]}
            ];
            b ? d ? e - 4 == d ? f[3] = {x: +a[0], y: +a[1]} : e - 2 == d && (f[2] = {x: +a[0], y: +a[1]}, f[3] = {x: +a[2], y: +a[3]}) : f[0] = {x: +a[e - 2], y: +a[e - 1]} : e - 4 == d ? f[3] = f[2] : d || (f[0] = {x: +a[d], y: +a[d + 1]}), c.push(["C", (-f[0].x + 6 * f[1].x + f[2].x) / 6, (-f[0].y + 6 * f[1].y + f[2].y) / 6, (f[1].x + 6 * f[2].x - f[3].x) / 6, (f[1].y + 6 * f[2].y - f[3].y) / 6, f[2].x, f[2].y])
        }
        return c
    }

    function i(a, b, c, d, e) {
        var f = -3 * b + 9 * c - 9 * d + 3 * e, g = a * f + 6 * b - 12 * c + 6 * d;
        return a * g - 3 * b + 3 * c
    }

    function j(a, b, c, d, e, f, g, h, j) {
        null == j && (j = 1), j = j > 1 ? 1 : 0 > j ? 0 : j;
        for (var k = j / 2, l = 12, m = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], n = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], o = 0, p = 0; l > p; p++) {
            var q = k * m[p] + k, r = i(q, a, c, e, g), s = i(q, b, d, f, h), t = r * r + s * s;
            o += n[p] * N.sqrt(t)
        }
        return k * o
    }

    function k(a, b, c, d, e, f, g, h, i) {
        if (!(0 > i || j(a, b, c, d, e, f, g, h) < i)) {
            var k, l = 1, m = l / 2, n = l - m, o = .01;
            for (k = j(a, b, c, d, e, f, g, h, n); Q(k - i) > o;)m /= 2, n += (i > k ? 1 : -1) * m, k = j(a, b, c, d, e, f, g, h, n);
            return n
        }
    }

    function l(a, b, c, d, e, f, g, h) {
        if (!(O(a, c) < P(e, g) || P(a, c) > O(e, g) || O(b, d) < P(f, h) || P(b, d) > O(f, h))) {
            var i = (a * d - b * c) * (e - g) - (a - c) * (e * h - f * g), j = (a * d - b * c) * (f - h) - (b - d) * (e * h - f * g), k = (a - c) * (f - h) - (b - d) * (e - g);
            if (k) {
                var l = i / k, m = j / k, n = +l.toFixed(2), o = +m.toFixed(2);
                if (!(n < +P(a, c).toFixed(2) || n > +O(a, c).toFixed(2) || n < +P(e, g).toFixed(2) || n > +O(e, g).toFixed(2) || o < +P(b, d).toFixed(2) || o > +O(b, d).toFixed(2) || o < +P(f, h).toFixed(2) || o > +O(f, h).toFixed(2)))return{x: l, y: m}
            }
        }
    }

    function m(a, b, d) {
        var e = c.bezierBBox(a), f = c.bezierBBox(b);
        if (!c.isBBoxIntersect(e, f))return d ? 0 : [];
        for (var g = j.apply(0, a), h = j.apply(0, b), i = O(~~(g / 5), 1), k = O(~~(h / 5), 1), m = [], n = [], o = {}, p = d ? 0 : [], q = 0; i + 1 > q; q++) {
            var r = c.findDotsAtSegment.apply(c, a.concat(q / i));
            m.push({x: r.x, y: r.y, t: q / i})
        }
        for (q = 0; k + 1 > q; q++)r = c.findDotsAtSegment.apply(c, b.concat(q / k)), n.push({x: r.x, y: r.y, t: q / k});
        for (q = 0; i > q; q++)for (var s = 0; k > s; s++) {
            var t = m[q], u = m[q + 1], v = n[s], w = n[s + 1], x = Q(u.x - t.x) < .001 ? "y" : "x", y = Q(w.x - v.x) < .001 ? "y" : "x", z = l(t.x, t.y, u.x, u.y, v.x, v.y, w.x, w.y);
            if (z) {
                if (o[z.x.toFixed(4)] == z.y.toFixed(4))continue;
                o[z.x.toFixed(4)] = z.y.toFixed(4);
                var A = t.t + Q((z[x] - t[x]) / (u[x] - t[x])) * (u.t - t.t), B = v.t + Q((z[y] - v[y]) / (w[y] - v[y])) * (w.t - v.t);
                A >= 0 && 1.001 >= A && B >= 0 && 1.001 >= B && (d ? p++ : p.push({x: z.x, y: z.y, t1: P(A, 1), t2: P(B, 1)}))
            }
        }
        return p
    }

    function n(a, b, d) {
        a = c._path2curve(a), b = c._path2curve(b);
        for (var e, f, g, h, i, j, k, l, n, o, p = d ? 0 : [], q = 0, r = a.length; r > q; q++) {
            var s = a[q];
            if ("M" == s[0])e = i = s[1], f = j = s[2]; else {
                "C" == s[0] ? (n = [e, f].concat(s.slice(1)), e = n[6], f = n[7]) : (n = [e, f, e, f, i, j, i, j], e = i, f = j);
                for (var t = 0, u = b.length; u > t; t++) {
                    var v = b[t];
                    if ("M" == v[0])g = k = v[1], h = l = v[2]; else {
                        "C" == v[0] ? (o = [g, h].concat(v.slice(1)), g = o[6], h = o[7]) : (o = [g, h, g, h, k, l, k, l], g = k, h = l);
                        var w = m(n, o, d);
                        if (d)p += w; else {
                            for (var x = 0, y = w.length; y > x; x++)w[x].segment1 = q, w[x].segment2 = t, w[x].bez1 = n, w[x].bez2 = o;
                            p = p.concat(w)
                        }
                    }
                }
            }
        }
        return p
    }

    function o(a, b, c, d, e, f) {
        null != a ? (this.a = +a, this.b = +b, this.c = +c, this.d = +d, this.e = +e, this.f = +f) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function p() {
        return this.x + H + this.y + H + this.width + " × " + this.height
    }

    function q(a, b, c, d, e, f) {
        function g(a) {
            return((l * a + k) * a + j) * a
        }

        function h(a, b) {
            var c = i(a, b);
            return((o * c + n) * c + m) * c
        }

        function i(a, b) {
            var c, d, e, f, h, i;
            for (e = a, i = 0; 8 > i; i++) {
                if (f = g(e) - a, Q(f) < b)return e;
                if (h = (3 * l * e + 2 * k) * e + j, Q(h) < 1e-6)break;
                e -= f / h
            }
            if (c = 0, d = 1, e = a, c > e)return c;
            if (e > d)return d;
            for (; d > c;) {
                if (f = g(e), Q(f - a) < b)return e;
                a > f ? c = e : d = e, e = (d - c) / 2 + c
            }
            return e
        }

        var j = 3 * b, k = 3 * (d - b) - j, l = 1 - j - k, m = 3 * c, n = 3 * (e - c) - m, o = 1 - m - n;
        return h(a, 1 / (200 * f))
    }

    function r(a, b) {
        var c = [], d = {};
        if (this.ms = b, this.times = 1, a) {
            for (var e in a)a[z](e) && (d[_(e)] = a[e], c.push(_(e)));
            c.sort(lb)
        }
        this.anim = d, this.top = c[c.length - 1], this.percents = c
    }

    function s(a, d, e, f, g, h) {
        e = _(e);
        var i, j, k, l, m, n, p = a.ms, r = {}, s = {}, t = {};
        if (f)for (v = 0, x = ic.length; x > v; v++) {
            var u = ic[v];
            if (u.el.id == d.id && u.anim == a) {
                u.percent != e ? (ic.splice(v, 1), k = 1) : j = u, d.attr(u.totalOrigin);
                break
            }
        } else f = +s;
        for (var v = 0, x = a.percents.length; x > v; v++) {
            if (a.percents[v] == e || a.percents[v] > f * a.top) {
                e = a.percents[v], m = a.percents[v - 1] || 0, p = p / a.top * (e - m), l = a.percents[v + 1], i = a.anim[e];
                break
            }
            f && d.attr(a.anim[a.percents[v]])
        }
        if (i) {
            if (j)j.initstatus = f, j.start = new Date - j.ms * f; else {
                for (var y in i)if (i[z](y) && (db[z](y) || d.paper.customAttributes[z](y)))switch (r[y] = d.attr(y), null == r[y] && (r[y] = cb[y]), s[y] = i[y], db[y]) {
                    case T:
                        t[y] = (s[y] - r[y]) / p;
                        break;
                    case"colour":
                        r[y] = c.getRGB(r[y]);
                        var A = c.getRGB(s[y]);
                        t[y] = {r: (A.r - r[y].r) / p, g: (A.g - r[y].g) / p, b: (A.b - r[y].b) / p};
                        break;
                    case"path":
                        var B = Kb(r[y], s[y]), C = B[1];
                        for (r[y] = B[0], t[y] = [], v = 0, x = r[y].length; x > v; v++) {
                            t[y][v] = [0];
                            for (var D = 1, F = r[y][v].length; F > D; D++)t[y][v][D] = (C[v][D] - r[y][v][D]) / p
                        }
                        break;
                    case"transform":
                        var G = d._, H = Pb(G[y], s[y]);
                        if (H)for (r[y] = H.from, s[y] = H.to, t[y] = [], t[y].real = !0, v = 0, x = r[y].length; x > v; v++)for (t[y][v] = [r[y][v][0]], D = 1, F = r[y][v].length; F > D; D++)t[y][v][D] = (s[y][v][D] - r[y][v][D]) / p; else {
                            var K = d.matrix || new o, L = {_: {transform: G.transform}, getBBox: function () {
                                return d.getBBox(1)
                            }};
                            r[y] = [K.a, K.b, K.c, K.d, K.e, K.f], Nb(L, s[y]), s[y] = L._.transform, t[y] = [(L.matrix.a - K.a) / p, (L.matrix.b - K.b) / p, (L.matrix.c - K.c) / p, (L.matrix.d - K.d) / p, (L.matrix.e - K.e) / p, (L.matrix.f - K.f) / p]
                        }
                        break;
                    case"csv":
                        var M = I(i[y])[J](w), N = I(r[y])[J](w);
                        if ("clip-rect" == y)for (r[y] = N, t[y] = [], v = N.length; v--;)t[y][v] = (M[v] - r[y][v]) / p;
                        s[y] = M;
                        break;
                    default:
                        for (M = [][E](i[y]), N = [][E](r[y]), t[y] = [], v = d.paper.customAttributes[y].length; v--;)t[y][v] = ((M[v] || 0) - (N[v] || 0)) / p
                }
                var O = i.easing, P = c.easing_formulas[O];
                if (!P)if (P = I(O).match(Z), P && 5 == P.length) {
                    var Q = P;
                    P = function (a) {
                        return q(a, +Q[1], +Q[2], +Q[3], +Q[4], p)
                    }
                } else P = nb;
                if (n = i.start || a.start || +new Date, u = {anim: a, percent: e, timestamp: n, start: n + (a.del || 0), status: 0, initstatus: f || 0, stop: !1, ms: p, easing: P, from: r, diff: t, to: s, el: d, callback: i.callback, prev: m, next: l, repeat: h || a.times, origin: d.attr(), totalOrigin: g}, ic.push(u), f && !j && !k && (u.stop = !0, u.start = new Date - p * f, 1 == ic.length))return kc();
                k && (u.start = new Date - u.ms * f), 1 == ic.length && jc(kc)
            }
            b("raphael.anim.start." + d.id, d, a)
        }
    }

    function t(a) {
        for (var b = 0; b < ic.length; b++)ic[b].el.paper == a && ic.splice(b--, 1)
    }

    c.version = "2.1.2", c.eve = b;
    var u, v, w = /[, ]+/, x = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1}, y = /\{(\d+)\}/g, z = "hasOwnProperty", A = {doc: document, win: a}, B = {was: Object.prototype[z].call(A.win, "Raphael"), is: A.win.Raphael}, C = function () {
        this.ca = this.customAttributes = {}
    }, D = "apply", E = "concat", F = "ontouchstart"in A.win || A.win.DocumentTouch && A.doc instanceof DocumentTouch, G = "", H = " ", I = String, J = "split", K = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[J](H), L = {mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend"}, M = I.prototype.toLowerCase, N = Math, O = N.max, P = N.min, Q = N.abs, R = N.pow, S = N.PI, T = "number", U = "string", V = "array", W = Object.prototype.toString, X = (c._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), Y = {NaN: 1, Infinity: 1, "-Infinity": 1}, Z = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, $ = N.round, _ = parseFloat, ab = parseInt, bb = I.prototype.toUpperCase, cb = c._availableAttrs = {"arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0}, db = c._availableAnimAttrs = {blur: T, "clip-rect": "csv", cx: T, cy: T, fill: "colour", "fill-opacity": T, "font-size": T, height: T, opacity: T, path: "path", r: T, rx: T, ry: T, stroke: "colour", "stroke-opacity": T, "stroke-width": T, transform: "transform", width: T, x: T, y: T}, eb = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, fb = {hs: 1, rg: 1}, gb = /,?([achlmqrstvxz]),?/gi, hb = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, ib = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, jb = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, kb = (c._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), lb = function (a, b) {
        return _(a) - _(b)
    }, mb = function () {
    }, nb = function (a) {
        return a
    }, ob = c._rectPath = function (a, b, c, d, e) {
        return e ? [
            ["M", a + e, b],
            ["l", c - 2 * e, 0],
            ["a", e, e, 0, 0, 1, e, e],
            ["l", 0, d - 2 * e],
            ["a", e, e, 0, 0, 1, -e, e],
            ["l", 2 * e - c, 0],
            ["a", e, e, 0, 0, 1, -e, -e],
            ["l", 0, 2 * e - d],
            ["a", e, e, 0, 0, 1, e, -e],
            ["z"]
        ] : [
            ["M", a, b],
            ["l", c, 0],
            ["l", 0, d],
            ["l", -c, 0],
            ["z"]
        ]
    }, pb = function (a, b, c, d) {
        return null == d && (d = c), [
            ["M", a, b],
            ["m", 0, -d],
            ["a", c, d, 0, 1, 1, 0, 2 * d],
            ["a", c, d, 0, 1, 1, 0, -2 * d],
            ["z"]
        ]
    }, qb = c._getPath = {path: function (a) {
        return a.attr("path")
    }, circle: function (a) {
        var b = a.attrs;
        return pb(b.cx, b.cy, b.r)
    }, ellipse: function (a) {
        var b = a.attrs;
        return pb(b.cx, b.cy, b.rx, b.ry)
    }, rect: function (a) {
        var b = a.attrs;
        return ob(b.x, b.y, b.width, b.height, b.r)
    }, image: function (a) {
        var b = a.attrs;
        return ob(b.x, b.y, b.width, b.height)
    }, text: function (a) {
        var b = a._getBBox();
        return ob(b.x, b.y, b.width, b.height)
    }, set: function (a) {
        var b = a._getBBox();
        return ob(b.x, b.y, b.width, b.height)
    }}, rb = c.mapPath = function (a, b) {
        if (!b)return a;
        var c, d, e, f, g, h, i;
        for (a = Kb(a), e = 0, g = a.length; g > e; e++)for (i = a[e], f = 1, h = i.length; h > f; f += 2)c = b.x(i[f], i[f + 1]), d = b.y(i[f], i[f + 1]), i[f] = c, i[f + 1] = d;
        return a
    };
    if (c._g = A, c.type = A.win.SVGAngle || A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == c.type) {
        var sb, tb = A.doc.createElement("div");
        if (tb.innerHTML = '<v:shape adj="1"/>', sb = tb.firstChild, sb.style.behavior = "url(#default#VML)", !sb || "object" != typeof sb.adj)return c.type = G;
        tb = null
    }
    c.svg = !(c.vml = "VML" == c.type), c._Paper = C, c.fn = v = C.prototype = c.prototype, c._id = 0, c._oid = 0, c.is = function (a, b) {
        return b = M.call(b), "finite" == b ? !Y[z](+a) : "array" == b ? a instanceof Array : "null" == b && null === a || b == typeof a && null !== a || "object" == b && a === Object(a) || "array" == b && Array.isArray && Array.isArray(a) || W.call(a).slice(8, -1).toLowerCase() == b
    }, c.angle = function (a, b, d, e, f, g) {
        if (null == f) {
            var h = a - d, i = b - e;
            return h || i ? (180 + 180 * N.atan2(-i, -h) / S + 360) % 360 : 0
        }
        return c.angle(a, b, f, g) - c.angle(d, e, f, g)
    }, c.rad = function (a) {
        return a % 360 * S / 180
    }, c.deg = function (a) {
        return 180 * a / S % 360
    }, c.snapTo = function (a, b, d) {
        if (d = c.is(d, "finite") ? d : 10, c.is(a, V)) {
            for (var e = a.length; e--;)if (Q(a[e] - b) <= d)return a[e]
        } else {
            a = +a;
            var f = b % a;
            if (d > f)return b - f;
            if (f > a - d)return b - f + a
        }
        return b
    }, c.createUUID = function (a, b) {
        return function () {
            return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a, b).toUpperCase()
        }
    }(/[xy]/g, function (a) {
        var b = 0 | 16 * N.random(), c = "x" == a ? b : 8 | 3 & b;
        return c.toString(16)
    }), c.setWindow = function (a) {
        b("raphael.setWindow", c, A.win, a), A.win = a, A.doc = A.win.document, c._engine.initWin && c._engine.initWin(A.win)
    };
    var ub = function (a) {
        if (c.vml) {
            var b, d = /^\s+|\s+$/g;
            try {
                var e = new ActiveXObject("htmlfile");
                e.write("<body>"), e.close(), b = e.body
            } catch (g) {
                b = createPopup().document.body
            }
            var h = b.createTextRange();
            ub = f(function (a) {
                try {
                    b.style.color = I(a).replace(d, G);
                    var c = h.queryCommandValue("ForeColor");
                    return c = (255 & c) << 16 | 65280 & c | (16711680 & c) >>> 16, "#" + ("000000" + c.toString(16)).slice(-6)
                } catch (e) {
                    return"none"
                }
            })
        } else {
            var i = A.doc.createElement("i");
            i.title = "Raphaël Colour Picker", i.style.display = "none", A.doc.body.appendChild(i), ub = f(function (a) {
                return i.style.color = a, A.doc.defaultView.getComputedStyle(i, G).getPropertyValue("color")
            })
        }
        return ub(a)
    }, vb = function () {
        return"hsb(" + [this.h, this.s, this.b] + ")"
    }, wb = function () {
        return"hsl(" + [this.h, this.s, this.l] + ")"
    }, xb = function () {
        return this.hex
    }, yb = function (a, b, d) {
        if (null == b && c.is(a, "object") && "r"in a && "g"in a && "b"in a && (d = a.b, b = a.g, a = a.r), null == b && c.is(a, U)) {
            var e = c.getRGB(a);
            a = e.r, b = e.g, d = e.b
        }
        return(a > 1 || b > 1 || d > 1) && (a /= 255, b /= 255, d /= 255), [a, b, d]
    }, zb = function (a, b, d, e) {
        a *= 255, b *= 255, d *= 255;
        var f = {r: a, g: b, b: d, hex: c.rgb(a, b, d), toString: xb};
        return c.is(e, "finite") && (f.opacity = e), f
    };
    c.color = function (a) {
        var b;
        return c.is(a, "object") && "h"in a && "s"in a && "b"in a ? (b = c.hsb2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : c.is(a, "object") && "h"in a && "s"in a && "l"in a ? (b = c.hsl2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : (c.is(a, "string") && (a = c.getRGB(a)), c.is(a, "object") && "r"in a && "g"in a && "b"in a ? (b = c.rgb2hsl(a), a.h = b.h, a.s = b.s, a.l = b.l, b = c.rgb2hsb(a), a.v = b.b) : (a = {hex: "none"}, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1)), a.toString = xb, a
    }, c.hsb2rgb = function (a, b, c, d) {
        this.is(a, "object") && "h"in a && "s"in a && "b"in a && (c = a.b, b = a.s, a = a.h, d = a.o), a *= 360;
        var e, f, g, h, i;
        return a = a % 360 / 60, i = c * b, h = i * (1 - Q(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], zb(e, f, g, d)
    }, c.hsl2rgb = function (a, b, c, d) {
        this.is(a, "object") && "h"in a && "s"in a && "l"in a && (c = a.l, b = a.s, a = a.h), (a > 1 || b > 1 || c > 1) && (a /= 360, b /= 100, c /= 100), a *= 360;
        var e, f, g, h, i;
        return a = a % 360 / 60, i = 2 * b * (.5 > c ? c : 1 - c), h = i * (1 - Q(a % 2 - 1)), e = f = g = c - i / 2, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], zb(e, f, g, d)
    }, c.rgb2hsb = function (a, b, c) {
        c = yb(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g;
        return f = O(a, b, c), g = f - P(a, b, c), d = 0 == g ? null : f == a ? (b - c) / g : f == b ? (c - a) / g + 2 : (a - b) / g + 4, d = 60 * ((d + 360) % 6) / 360, e = 0 == g ? 0 : g / f, {h: d, s: e, b: f, toString: vb}
    }, c.rgb2hsl = function (a, b, c) {
        c = yb(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g, h, i;
        return g = O(a, b, c), h = P(a, b, c), i = g - h, d = 0 == i ? null : g == a ? (b - c) / i : g == b ? (c - a) / i + 2 : (a - b) / i + 4, d = 60 * ((d + 360) % 6) / 360, f = (g + h) / 2, e = 0 == i ? 0 : .5 > f ? i / (2 * f) : i / (2 - 2 * f), {h: d, s: e, l: f, toString: wb}
    }, c._path2string = function () {
        return this.join(",").replace(gb, "$1")
    }, c._preload = function (a, b) {
        var c = A.doc.createElement("img");
        c.style.cssText = "position:absolute;left:-9999em;top:-9999em", c.onload = function () {
            b.call(this), this.onload = null, A.doc.body.removeChild(this)
        }, c.onerror = function () {
            A.doc.body.removeChild(this)
        }, A.doc.body.appendChild(c), c.src = a
    }, c.getRGB = f(function (a) {
        if (!a || (a = I(a)).indexOf("-") + 1)return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: g};
        if ("none" == a)return{r: -1, g: -1, b: -1, hex: "none", toString: g};
        !(fb[z](a.toLowerCase().substring(0, 2)) || "#" == a.charAt()) && (a = ub(a));
        var b, d, e, f, h, i, j = a.match(X);
        return j ? (j[2] && (e = ab(j[2].substring(5), 16), d = ab(j[2].substring(3, 5), 16), b = ab(j[2].substring(1, 3), 16)), j[3] && (e = ab((h = j[3].charAt(3)) + h, 16), d = ab((h = j[3].charAt(2)) + h, 16), b = ab((h = j[3].charAt(1)) + h, 16)), j[4] && (i = j[4][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), "rgba" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100)), j[5] ? (i = j[5][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), ("deg" == i[0].slice(-3) || "°" == i[0].slice(-1)) && (b /= 360), "hsba" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100), c.hsb2rgb(b, d, e, f)) : j[6] ? (i = j[6][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), ("deg" == i[0].slice(-3) || "°" == i[0].slice(-1)) && (b /= 360), "hsla" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100), c.hsl2rgb(b, d, e, f)) : (j = {r: b, g: d, b: e, toString: g}, j.hex = "#" + (16777216 | e | d << 8 | b << 16).toString(16).slice(1), c.is(f, "finite") && (j.opacity = f), j)) : {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: g}
    }, c), c.hsb = f(function (a, b, d) {
        return c.hsb2rgb(a, b, d).hex
    }), c.hsl = f(function (a, b, d) {
        return c.hsl2rgb(a, b, d).hex
    }), c.rgb = f(function (a, b, c) {
        return"#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1)
    }), c.getColor = function (a) {
        var b = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: a || .75}, c = this.hsb2rgb(b.h, b.s, b.b);
        return b.h += .075, b.h > 1 && (b.h = 0, b.s -= .2, b.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: b.b})), c.hex
    }, c.getColor.reset = function () {
        delete this.start
    }, c.parsePathString = function (a) {
        if (!a)return null;
        var b = Ab(a);
        if (b.arr)return Cb(b.arr);
        var d = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, e = [];
        return c.is(a, V) && c.is(a[0], V) && (e = Cb(a)), e.length || I(a).replace(hb, function (a, b, c) {
            var f = [], g = b.toLowerCase();
            if (c.replace(jb, function (a, b) {
                b && f.push(+b)
            }), "m" == g && f.length > 2 && (e.push([b][E](f.splice(0, 2))), g = "l", b = "m" == b ? "l" : "L"), "r" == g)e.push([b][E](f)); else for (; f.length >= d[g] && (e.push([b][E](f.splice(0, d[g]))), d[g]););
        }), e.toString = c._path2string, b.arr = Cb(e), e
    }, c.parseTransformString = f(function (a) {
        if (!a)return null;
        var b = [];
        return c.is(a, V) && c.is(a[0], V) && (b = Cb(a)), b.length || I(a).replace(ib, function (a, c, d) {
            var e = [];
            M.call(c), d.replace(jb, function (a, b) {
                b && e.push(+b)
            }), b.push([c][E](e))
        }), b.toString = c._path2string, b
    });
    var Ab = function (a) {
        var b = Ab.ps = Ab.ps || {};
        return b[a] ? b[a].sleep = 100 : b[a] = {sleep: 100}, setTimeout(function () {
            for (var c in b)b[z](c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c])
        }), b[a]
    };
    c.findDotsAtSegment = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i, k = R(j, 3), l = R(j, 2), m = i * i, n = m * i, o = k * a + 3 * l * i * c + 3 * j * i * i * e + n * g, p = k * b + 3 * l * i * d + 3 * j * i * i * f + n * h, q = a + 2 * i * (c - a) + m * (e - 2 * c + a), r = b + 2 * i * (d - b) + m * (f - 2 * d + b), s = c + 2 * i * (e - c) + m * (g - 2 * e + c), t = d + 2 * i * (f - d) + m * (h - 2 * f + d), u = j * a + i * c, v = j * b + i * d, w = j * e + i * g, x = j * f + i * h, y = 90 - 180 * N.atan2(q - s, r - t) / S;
        return(q > s || t > r) && (y += 180), {x: o, y: p, m: {x: q, y: r}, n: {x: s, y: t}, start: {x: u, y: v}, end: {x: w, y: x}, alpha: y}
    }, c.bezierBBox = function (a, b, d, e, f, g, h, i) {
        c.is(a, "array") || (a = [a, b, d, e, f, g, h, i]);
        var j = Jb.apply(null, a);
        return{x: j.min.x, y: j.min.y, x2: j.max.x, y2: j.max.y, width: j.max.x - j.min.x, height: j.max.y - j.min.y}
    }, c.isPointInsideBBox = function (a, b, c) {
        return b >= a.x && b <= a.x2 && c >= a.y && c <= a.y2
    }, c.isBBoxIntersect = function (a, b) {
        var d = c.isPointInsideBBox;
        return d(b, a.x, a.y) || d(b, a.x2, a.y) || d(b, a.x, a.y2) || d(b, a.x2, a.y2) || d(a, b.x, b.y) || d(a, b.x2, b.y) || d(a, b.x, b.y2) || d(a, b.x2, b.y2) || (a.x < b.x2 && a.x > b.x || b.x < a.x2 && b.x > a.x) && (a.y < b.y2 && a.y > b.y || b.y < a.y2 && b.y > a.y)
    }, c.pathIntersection = function (a, b) {
        return n(a, b)
    }, c.pathIntersectionNumber = function (a, b) {
        return n(a, b, 1)
    }, c.isPointInsidePath = function (a, b, d) {
        var e = c.pathBBox(a);
        return c.isPointInsideBBox(e, b, d) && 1 == n(a, [
            ["M", b, d],
            ["H", e.x2 + 10]
        ], 1) % 2
    }, c._removedFactory = function (a) {
        return function () {
            b("raphael.log", null, "Raphaël: you are calling to method “" + a + "” of removed object", a)
        }
    };
    var Bb = c.pathBBox = function (a) {
        var b = Ab(a);
        if (b.bbox)return d(b.bbox);
        if (!a)return{x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        a = Kb(a);
        for (var c, e = 0, f = 0, g = [], h = [], i = 0, j = a.length; j > i; i++)if (c = a[i], "M" == c[0])e = c[1], f = c[2], g.push(e), h.push(f); else {
            var k = Jb(e, f, c[1], c[2], c[3], c[4], c[5], c[6]);
            g = g[E](k.min.x, k.max.x), h = h[E](k.min.y, k.max.y), e = c[5], f = c[6]
        }
        var l = P[D](0, g), m = P[D](0, h), n = O[D](0, g), o = O[D](0, h), p = n - l, q = o - m, r = {x: l, y: m, x2: n, y2: o, width: p, height: q, cx: l + p / 2, cy: m + q / 2};
        return b.bbox = d(r), r
    }, Cb = function (a) {
        var b = d(a);
        return b.toString = c._path2string, b
    }, Db = c._pathToRelative = function (a) {
        var b = Ab(a);
        if (b.rel)return Cb(b.rel);
        c.is(a, V) && c.is(a && a[0], V) || (a = c.parsePathString(a));
        var d = [], e = 0, f = 0, g = 0, h = 0, i = 0;
        "M" == a[0][0] && (e = a[0][1], f = a[0][2], g = e, h = f, i++, d.push(["M", e, f]));
        for (var j = i, k = a.length; k > j; j++) {
            var l = d[j] = [], m = a[j];
            if (m[0] != M.call(m[0]))switch (l[0] = M.call(m[0]), l[0]) {
                case"a":
                    l[1] = m[1], l[2] = m[2], l[3] = m[3], l[4] = m[4], l[5] = m[5], l[6] = +(m[6] - e).toFixed(3), l[7] = +(m[7] - f).toFixed(3);
                    break;
                case"v":
                    l[1] = +(m[1] - f).toFixed(3);
                    break;
                case"m":
                    g = m[1], h = m[2];
                default:
                    for (var n = 1, o = m.length; o > n; n++)l[n] = +(m[n] - (n % 2 ? e : f)).toFixed(3)
            } else {
                l = d[j] = [], "m" == m[0] && (g = m[1] + e, h = m[2] + f);
                for (var p = 0, q = m.length; q > p; p++)d[j][p] = m[p]
            }
            var r = d[j].length;
            switch (d[j][0]) {
                case"z":
                    e = g, f = h;
                    break;
                case"h":
                    e += +d[j][r - 1];
                    break;
                case"v":
                    f += +d[j][r - 1];
                    break;
                default:
                    e += +d[j][r - 2], f += +d[j][r - 1]
            }
        }
        return d.toString = c._path2string, b.rel = Cb(d), d
    }, Eb = c._pathToAbsolute = function (a) {
        var b = Ab(a);
        if (b.abs)return Cb(b.abs);
        if (c.is(a, V) && c.is(a && a[0], V) || (a = c.parsePathString(a)), !a || !a.length)return[
            ["M", 0, 0]
        ];
        var d = [], e = 0, f = 0, g = 0, i = 0, j = 0;
        "M" == a[0][0] && (e = +a[0][1], f = +a[0][2], g = e, i = f, j++, d[0] = ["M", e, f]);
        for (var k, l, m = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), n = j, o = a.length; o > n; n++) {
            if (d.push(k = []), l = a[n], l[0] != bb.call(l[0]))switch (k[0] = bb.call(l[0]), k[0]) {
                case"A":
                    k[1] = l[1], k[2] = l[2], k[3] = l[3], k[4] = l[4], k[5] = l[5], k[6] = +(l[6] + e), k[7] = +(l[7] + f);
                    break;
                case"V":
                    k[1] = +l[1] + f;
                    break;
                case"H":
                    k[1] = +l[1] + e;
                    break;
                case"R":
                    for (var p = [e, f][E](l.slice(1)), q = 2, r = p.length; r > q; q++)p[q] = +p[q] + e, p[++q] = +p[q] + f;
                    d.pop(), d = d[E](h(p, m));
                    break;
                case"M":
                    g = +l[1] + e, i = +l[2] + f;
                default:
                    for (q = 1, r = l.length; r > q; q++)k[q] = +l[q] + (q % 2 ? e : f)
            } else if ("R" == l[0])p = [e, f][E](l.slice(1)), d.pop(), d = d[E](h(p, m)), k = ["R"][E](l.slice(-2)); else for (var s = 0, t = l.length; t > s; s++)k[s] = l[s];
            switch (k[0]) {
                case"Z":
                    e = g, f = i;
                    break;
                case"H":
                    e = k[1];
                    break;
                case"V":
                    f = k[1];
                    break;
                case"M":
                    g = k[k.length - 2], i = k[k.length - 1];
                default:
                    e = k[k.length - 2], f = k[k.length - 1]
            }
        }
        return d.toString = c._path2string, b.abs = Cb(d), d
    }, Fb = function (a, b, c, d) {
        return[a, b, c, d, c, d]
    }, Gb = function (a, b, c, d, e, f) {
        var g = 1 / 3, h = 2 / 3;
        return[g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
    }, Hb = function (a, b, c, d, e, g, h, i, j, k) {
        var l, m = 120 * S / 180, n = S / 180 * (+e || 0), o = [], p = f(function (a, b, c) {
            var d = a * N.cos(c) - b * N.sin(c), e = a * N.sin(c) + b * N.cos(c);
            return{x: d, y: e}
        });
        if (k)y = k[0], z = k[1], w = k[2], x = k[3]; else {
            l = p(a, b, -n), a = l.x, b = l.y, l = p(i, j, -n), i = l.x, j = l.y;
            var q = (N.cos(S / 180 * e), N.sin(S / 180 * e), (a - i) / 2), r = (b - j) / 2, s = q * q / (c * c) + r * r / (d * d);
            s > 1 && (s = N.sqrt(s), c = s * c, d = s * d);
            var t = c * c, u = d * d, v = (g == h ? -1 : 1) * N.sqrt(Q((t * u - t * r * r - u * q * q) / (t * r * r + u * q * q))), w = v * c * r / d + (a + i) / 2, x = v * -d * q / c + (b + j) / 2, y = N.asin(((b - x) / d).toFixed(9)), z = N.asin(((j - x) / d).toFixed(9));
            y = w > a ? S - y : y, z = w > i ? S - z : z, 0 > y && (y = 2 * S + y), 0 > z && (z = 2 * S + z), h && y > z && (y -= 2 * S), !h && z > y && (z -= 2 * S)
        }
        var A = z - y;
        if (Q(A) > m) {
            var B = z, C = i, D = j;
            z = y + m * (h && z > y ? 1 : -1), i = w + c * N.cos(z), j = x + d * N.sin(z), o = Hb(i, j, c, d, e, 0, h, C, D, [z, B, w, x])
        }
        A = z - y;
        var F = N.cos(y), G = N.sin(y), H = N.cos(z), I = N.sin(z), K = N.tan(A / 4), L = 4 / 3 * c * K, M = 4 / 3 * d * K, O = [a, b], P = [a + L * G, b - M * F], R = [i + L * I, j - M * H], T = [i, j];
        if (P[0] = 2 * O[0] - P[0], P[1] = 2 * O[1] - P[1], k)return[P, R, T][E](o);
        o = [P, R, T][E](o).join()[J](",");
        for (var U = [], V = 0, W = o.length; W > V; V++)U[V] = V % 2 ? p(o[V - 1], o[V], n).y : p(o[V], o[V + 1], n).x;
        return U
    }, Ib = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i;
        return{x: R(j, 3) * a + 3 * R(j, 2) * i * c + 3 * j * i * i * e + R(i, 3) * g, y: R(j, 3) * b + 3 * R(j, 2) * i * d + 3 * j * i * i * f + R(i, 3) * h}
    }, Jb = f(function (a, b, c, d, e, f, g, h) {
        var i, j = e - 2 * c + a - (g - 2 * e + c), k = 2 * (c - a) - 2 * (e - c), l = a - c, m = (-k + N.sqrt(k * k - 4 * j * l)) / 2 / j, n = (-k - N.sqrt(k * k - 4 * j * l)) / 2 / j, o = [b, h], p = [a, g];
        return Q(m) > "1e12" && (m = .5), Q(n) > "1e12" && (n = .5), m > 0 && 1 > m && (i = Ib(a, b, c, d, e, f, g, h, m), p.push(i.x), o.push(i.y)), n > 0 && 1 > n && (i = Ib(a, b, c, d, e, f, g, h, n), p.push(i.x), o.push(i.y)), j = f - 2 * d + b - (h - 2 * f + d), k = 2 * (d - b) - 2 * (f - d), l = b - d, m = (-k + N.sqrt(k * k - 4 * j * l)) / 2 / j, n = (-k - N.sqrt(k * k - 4 * j * l)) / 2 / j, Q(m) > "1e12" && (m = .5), Q(n) > "1e12" && (n = .5), m > 0 && 1 > m && (i = Ib(a, b, c, d, e, f, g, h, m), p.push(i.x), o.push(i.y)), n > 0 && 1 > n && (i = Ib(a, b, c, d, e, f, g, h, n), p.push(i.x), o.push(i.y)), {min: {x: P[D](0, p), y: P[D](0, o)}, max: {x: O[D](0, p), y: O[D](0, o)}}
    }), Kb = c._path2curve = f(function (a, b) {
        var c = !b && Ab(a);
        if (!b && c.curve)return Cb(c.curve);
        for (var d = Eb(a), e = b && Eb(b), f = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, g = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, h = (function (a, b, c) {
            var d, e;
            if (!a)return["C", b.x, b.y, b.x, b.y, b.x, b.y];
            switch (!(a[0]in{T: 1, Q: 1}) && (b.qx = b.qy = null), a[0]) {
                case"M":
                    b.X = a[1], b.Y = a[2];
                    break;
                case"A":
                    a = ["C"][E](Hb[D](0, [b.x, b.y][E](a.slice(1))));
                    break;
                case"S":
                    "C" == c || "S" == c ? (d = 2 * b.x - b.bx, e = 2 * b.y - b.by) : (d = b.x, e = b.y), a = ["C", d, e][E](a.slice(1));
                    break;
                case"T":
                    "Q" == c || "T" == c ? (b.qx = 2 * b.x - b.qx, b.qy = 2 * b.y - b.qy) : (b.qx = b.x, b.qy = b.y), a = ["C"][E](Gb(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                    break;
                case"Q":
                    b.qx = a[1], b.qy = a[2], a = ["C"][E](Gb(b.x, b.y, a[1], a[2], a[3], a[4]));
                    break;
                case"L":
                    a = ["C"][E](Fb(b.x, b.y, a[1], a[2]));
                    break;
                case"H":
                    a = ["C"][E](Fb(b.x, b.y, a[1], b.y));
                    break;
                case"V":
                    a = ["C"][E](Fb(b.x, b.y, b.x, a[1]));
                    break;
                case"Z":
                    a = ["C"][E](Fb(b.x, b.y, b.X, b.Y))
            }
            return a
        }), i = function (a, b) {
            if (a[b].length > 7) {
                a[b].shift();
                for (var c = a[b]; c.length;)a.splice(b++, 0, ["C"][E](c.splice(0, 6)));
                a.splice(b, 1), l = O(d.length, e && e.length || 0)
            }
        }, j = function (a, b, c, f, g) {
            a && b && "M" == a[g][0] && "M" != b[g][0] && (b.splice(g, 0, ["M", f.x, f.y]), c.bx = 0, c.by = 0, c.x = a[g][1], c.y = a[g][2], l = O(d.length, e && e.length || 0))
        }, k = 0, l = O(d.length, e && e.length || 0); l > k; k++) {
            d[k] = h(d[k], f), i(d, k), e && (e[k] = h(e[k], g)), e && i(e, k), j(d, e, f, g, k), j(e, d, g, f, k);
            var m = d[k], n = e && e[k], o = m.length, p = e && n.length;
            f.x = m[o - 2], f.y = m[o - 1], f.bx = _(m[o - 4]) || f.x, f.by = _(m[o - 3]) || f.y, g.bx = e && (_(n[p - 4]) || g.x), g.by = e && (_(n[p - 3]) || g.y), g.x = e && n[p - 2], g.y = e && n[p - 1]
        }
        return e || (c.curve = Cb(d)), e ? [d, e] : d
    }, null, Cb), Lb = (c._parseDots = f(function (a) {
        for (var b = [], d = 0, e = a.length; e > d; d++) {
            var f = {}, g = a[d].match(/^([^:]*):?([\d\.]*)/);
            if (f.color = c.getRGB(g[1]), f.color.error)return null;
            f.color = f.color.hex, g[2] && (f.offset = g[2] + "%"), b.push(f)
        }
        for (d = 1, e = b.length - 1; e > d; d++)if (!b[d].offset) {
            for (var h = _(b[d - 1].offset || 0), i = 0, j = d + 1; e > j; j++)if (b[j].offset) {
                i = b[j].offset;
                break
            }
            i || (i = 100, j = e), i = _(i);
            for (var k = (i - h) / (j - d + 1); j > d; d++)h += k, b[d].offset = h + "%"
        }
        return b
    }), c._tear = function (a, b) {
        a == b.top && (b.top = a.prev), a == b.bottom && (b.bottom = a.next), a.next && (a.next.prev = a.prev), a.prev && (a.prev.next = a.next)
    }), Mb = (c._tofront = function (a, b) {
        b.top !== a && (Lb(a, b), a.next = null, a.prev = b.top, b.top.next = a, b.top = a)
    }, c._toback = function (a, b) {
        b.bottom !== a && (Lb(a, b), a.next = b.bottom, a.prev = null, b.bottom.prev = a, b.bottom = a)
    }, c._insertafter = function (a, b, c) {
        Lb(a, c), b == c.top && (c.top = a), b.next && (b.next.prev = a), a.next = b.next, a.prev = b, b.next = a
    }, c._insertbefore = function (a, b, c) {
        Lb(a, c), b == c.bottom && (c.bottom = a), b.prev && (b.prev.next = a), a.prev = b.prev, b.prev = a, a.next = b
    }, c.toMatrix = function (a, b) {
        var c = Bb(a), d = {_: {transform: G}, getBBox: function () {
            return c
        }};
        return Nb(d, b), d.matrix
    }), Nb = (c.transformPath = function (a, b) {
        return rb(a, Mb(a, b))
    }, c._extractTransform = function (a, b) {
        if (null == b)return a._.transform;
        b = I(b).replace(/\.{3}|\u2026/g, a._.transform || G);
        var d = c.parseTransformString(b), e = 0, f = 0, g = 0, h = 1, i = 1, j = a._, k = new o;
        if (j.transform = d || [], d)for (var l = 0, m = d.length; m > l; l++) {
            var n, p, q, r, s, t = d[l], u = t.length, v = I(t[0]).toLowerCase(), w = t[0] != v, x = w ? k.invert() : 0;
            "t" == v && 3 == u ? w ? (n = x.x(0, 0), p = x.y(0, 0), q = x.x(t[1], t[2]), r = x.y(t[1], t[2]), k.translate(q - n, r - p)) : k.translate(t[1], t[2]) : "r" == v ? 2 == u ? (s = s || a.getBBox(1), k.rotate(t[1], s.x + s.width / 2, s.y + s.height / 2), e += t[1]) : 4 == u && (w ? (q = x.x(t[2], t[3]), r = x.y(t[2], t[3]), k.rotate(t[1], q, r)) : k.rotate(t[1], t[2], t[3]), e += t[1]) : "s" == v ? 2 == u || 3 == u ? (s = s || a.getBBox(1), k.scale(t[1], t[u - 1], s.x + s.width / 2, s.y + s.height / 2), h *= t[1], i *= t[u - 1]) : 5 == u && (w ? (q = x.x(t[3], t[4]), r = x.y(t[3], t[4]), k.scale(t[1], t[2], q, r)) : k.scale(t[1], t[2], t[3], t[4]), h *= t[1], i *= t[2]) : "m" == v && 7 == u && k.add(t[1], t[2], t[3], t[4], t[5], t[6]), j.dirtyT = 1, a.matrix = k
        }
        a.matrix = k, j.sx = h, j.sy = i, j.deg = e, j.dx = f = k.e, j.dy = g = k.f, 1 == h && 1 == i && !e && j.bbox ? (j.bbox.x += +f, j.bbox.y += +g) : j.dirtyT = 1
    }), Ob = function (a) {
        var b = a[0];
        switch (b.toLowerCase()) {
            case"t":
                return[b, 0, 0];
            case"m":
                return[b, 1, 0, 0, 1, 0, 0];
            case"r":
                return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
            case"s":
                return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
        }
    }, Pb = c._equaliseTransform = function (a, b) {
        b = I(b).replace(/\.{3}|\u2026/g, a), a = c.parseTransformString(a) || [], b = c.parseTransformString(b) || [];
        for (var d, e, f, g, h = O(a.length, b.length), i = [], j = [], k = 0; h > k; k++) {
            if (f = a[k] || Ob(b[k]), g = b[k] || Ob(f), f[0] != g[0] || "r" == f[0].toLowerCase() && (f[2] != g[2] || f[3] != g[3]) || "s" == f[0].toLowerCase() && (f[3] != g[3] || f[4] != g[4]))return;
            for (i[k] = [], j[k] = [], d = 0, e = O(f.length, g.length); e > d; d++)d in f && (i[k][d] = f[d]), d in g && (j[k][d] = g[d])
        }
        return{from: i, to: j}
    };
    c._getContainer = function (a, b, d, e) {
        var f;
        return f = null != e || c.is(a, "object") ? a : A.doc.getElementById(a), null != f ? f.tagName ? null == b ? {container: f, width: f.style.pixelWidth || f.offsetWidth, height: f.style.pixelHeight || f.offsetHeight} : {container: f, width: b, height: d} : {container: 1, x: a, y: b, width: d, height: e} : void 0
    }, c.pathToRelative = Db, c._engine = {}, c.path2curve = Kb, c.matrix = function (a, b, c, d, e, f) {
        return new o(a, b, c, d, e, f)
    }, function (a) {
        function b(a) {
            return a[0] * a[0] + a[1] * a[1]
        }

        function d(a) {
            var c = N.sqrt(b(a));
            a[0] && (a[0] /= c), a[1] && (a[1] /= c)
        }

        a.add = function (a, b, c, d, e, f) {
            var g, h, i, j, k = [
                [],
                [],
                []
            ], l = [
                [this.a, this.c, this.e],
                [this.b, this.d, this.f],
                [0, 0, 1]
            ], m = [
                [a, c, e],
                [b, d, f],
                [0, 0, 1]
            ];
            for (a && a instanceof o && (m = [
                [a.a, a.c, a.e],
                [a.b, a.d, a.f],
                [0, 0, 1]
            ]), g = 0; 3 > g; g++)for (h = 0; 3 > h; h++) {
                for (j = 0, i = 0; 3 > i; i++)j += l[g][i] * m[i][h];
                k[g][h] = j
            }
            this.a = k[0][0], this.b = k[1][0], this.c = k[0][1], this.d = k[1][1], this.e = k[0][2], this.f = k[1][2]
        }, a.invert = function () {
            var a = this, b = a.a * a.d - a.b * a.c;
            return new o(a.d / b, -a.b / b, -a.c / b, a.a / b, (a.c * a.f - a.d * a.e) / b, (a.b * a.e - a.a * a.f) / b)
        }, a.clone = function () {
            return new o(this.a, this.b, this.c, this.d, this.e, this.f)
        }, a.translate = function (a, b) {
            this.add(1, 0, 0, 1, a, b)
        }, a.scale = function (a, b, c, d) {
            null == b && (b = a), (c || d) && this.add(1, 0, 0, 1, c, d), this.add(a, 0, 0, b, 0, 0), (c || d) && this.add(1, 0, 0, 1, -c, -d)
        }, a.rotate = function (a, b, d) {
            a = c.rad(a), b = b || 0, d = d || 0;
            var e = +N.cos(a).toFixed(9), f = +N.sin(a).toFixed(9);
            this.add(e, f, -f, e, b, d), this.add(1, 0, 0, 1, -b, -d)
        }, a.x = function (a, b) {
            return a * this.a + b * this.c + this.e
        }, a.y = function (a, b) {
            return a * this.b + b * this.d + this.f
        }, a.get = function (a) {
            return+this[I.fromCharCode(97 + a)].toFixed(4)
        }, a.toString = function () {
            return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        }, a.toFilter = function () {
            return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        }, a.offset = function () {
            return[this.e.toFixed(4), this.f.toFixed(4)]
        }, a.split = function () {
            var a = {};
            a.dx = this.e, a.dy = this.f;
            var e = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            a.scalex = N.sqrt(b(e[0])), d(e[0]), a.shear = e[0][0] * e[1][0] + e[0][1] * e[1][1], e[1] = [e[1][0] - e[0][0] * a.shear, e[1][1] - e[0][1] * a.shear], a.scaley = N.sqrt(b(e[1])), d(e[1]), a.shear /= a.scaley;
            var f = -e[0][1], g = e[1][1];
            return 0 > g ? (a.rotate = c.deg(N.acos(g)), 0 > f && (a.rotate = 360 - a.rotate)) : a.rotate = c.deg(N.asin(f)), a.isSimple = !(+a.shear.toFixed(9) || a.scalex.toFixed(9) != a.scaley.toFixed(9) && a.rotate), a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate, a.noRotation = !+a.shear.toFixed(9) && !a.rotate, a
        }, a.toTransformString = function (a) {
            var b = a || this[J]();
            return b.isSimple ? (b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4), (b.dx || b.dy ? "t" + [b.dx, b.dy] : G) + (1 != b.scalex || 1 != b.scaley ? "s" + [b.scalex, b.scaley, 0, 0] : G) + (b.rotate ? "r" + [b.rotate, 0, 0] : G)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    }(o.prototype);
    var Qb = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    v.safari = "Apple Computer, Inc." == navigator.vendor && (Qb && Qb[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Qb && Qb[1] < 8 ? function () {
        var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
        setTimeout(function () {
            a.remove()
        })
    } : mb;
    for (var Rb = function () {
        this.returnValue = !1
    }, Sb = function () {
        return this.originalEvent.preventDefault()
    }, Tb = function () {
        this.cancelBubble = !0
    }, Ub = function () {
        return this.originalEvent.stopPropagation()
    }, Vb = function (a) {
        var b = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, c = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
        return{x: a.clientX + c, y: a.clientY + b}
    }, Wb = function () {
        return A.doc.addEventListener ? function (a, b, c, d) {
            var e = function (a) {
                var b = Vb(a);
                return c.call(d, a, b.x, b.y)
            };
            if (a.addEventListener(b, e, !1), F && L[b]) {
                var f = function (b) {
                    for (var e = Vb(b), f = b, g = 0, h = b.targetTouches && b.targetTouches.length; h > g; g++)if (b.targetTouches[g].target == a) {
                        b = b.targetTouches[g], b.originalEvent = f, b.preventDefault = Sb, b.stopPropagation = Ub;
                        break
                    }
                    return c.call(d, b, e.x, e.y)
                };
                a.addEventListener(L[b], f, !1)
            }
            return function () {
                return a.removeEventListener(b, e, !1), F && L[b] && a.removeEventListener(L[b], e, !1), !0
            }
        } : A.doc.attachEvent ? function (a, b, c, d) {
            var e = function (a) {
                a = a || A.win.event;
                var b = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, e = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft, f = a.clientX + e, g = a.clientY + b;
                return a.preventDefault = a.preventDefault || Rb, a.stopPropagation = a.stopPropagation || Tb, c.call(d, a, f, g)
            };
            a.attachEvent("on" + b, e);
            var f = function () {
                return a.detachEvent("on" + b, e), !0
            };
            return f
        } : void 0
    }(), Xb = [], Yb = function (a) {
        for (var c, d = a.clientX, e = a.clientY, f = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, g = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft, h = Xb.length; h--;) {
            if (c = Xb[h], F && a.touches) {
                for (var i, j = a.touches.length; j--;)if (i = a.touches[j], i.identifier == c.el._drag.id) {
                    d = i.clientX, e = i.clientY, (a.originalEvent ? a.originalEvent : a).preventDefault();
                    break
                }
            } else a.preventDefault();
            var k, l = c.el.node, m = l.nextSibling, n = l.parentNode, o = l.style.display;
            A.win.opera && n.removeChild(l), l.style.display = "none", k = c.el.paper.getElementByPoint(d, e), l.style.display = o, A.win.opera && (m ? n.insertBefore(l, m) : n.appendChild(l)), k && b("raphael.drag.over." + c.el.id, c.el, k), d += g, e += f, b("raphael.drag.move." + c.el.id, c.move_scope || c.el, d - c.el._drag.x, e - c.el._drag.y, d, e, a)
        }
    }, Zb = function (a) {
        c.unmousemove(Yb).unmouseup(Zb);
        for (var d, e = Xb.length; e--;)d = Xb[e], d.el._drag = {}, b("raphael.drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, a);
        Xb = []
    }, $b = c.el = {}, _b = K.length; _b--;)!function (a) {
        c[a] = $b[a] = function (b, d) {
            return c.is(b, "function") && (this.events = this.events || [], this.events.push({name: a, f: b, unbind: Wb(this.shape || this.node || A.doc, a, b, d || this)})), this
        }, c["un" + a] = $b["un" + a] = function (b) {
            for (var d = this.events || [], e = d.length; e--;)d[e].name != a || !c.is(b, "undefined") && d[e].f != b || (d[e].unbind(), d.splice(e, 1), !d.length && delete this.events);
            return this
        }
    }(K[_b]);
    $b.data = function (a, d) {
        var e = kb[this.id] = kb[this.id] || {};
        if (0 == arguments.length)return e;
        if (1 == arguments.length) {
            if (c.is(a, "object")) {
                for (var f in a)a[z](f) && this.data(f, a[f]);
                return this
            }
            return b("raphael.data.get." + this.id, this, e[a], a), e[a]
        }
        return e[a] = d, b("raphael.data.set." + this.id, this, d, a), this
    }, $b.removeData = function (a) {
        return null == a ? kb[this.id] = {} : kb[this.id] && delete kb[this.id][a], this
    }, $b.getData = function () {
        return d(kb[this.id] || {})
    }, $b.hover = function (a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c)
    }, $b.unhover = function (a, b) {
        return this.unmouseover(a).unmouseout(b)
    };
    var ac = [];
    $b.drag = function (a, d, e, f, g, h) {
        function i(i) {
            (i.originalEvent || i).preventDefault();
            var j = i.clientX, k = i.clientY, l = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, m = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
            if (this._drag.id = i.identifier, F && i.touches)for (var n, o = i.touches.length; o--;)if (n = i.touches[o], this._drag.id = n.identifier, n.identifier == this._drag.id) {
                j = n.clientX, k = n.clientY;
                break
            }
            this._drag.x = j + m, this._drag.y = k + l, !Xb.length && c.mousemove(Yb).mouseup(Zb), Xb.push({el: this, move_scope: f, start_scope: g, end_scope: h}), d && b.on("raphael.drag.start." + this.id, d), a && b.on("raphael.drag.move." + this.id, a), e && b.on("raphael.drag.end." + this.id, e), b("raphael.drag.start." + this.id, g || f || this, i.clientX + m, i.clientY + l, i)
        }

        return this._drag = {}, ac.push({el: this, start: i}), this.mousedown(i), this
    }, $b.onDragOver = function (a) {
        a ? b.on("raphael.drag.over." + this.id, a) : b.unbind("raphael.drag.over." + this.id)
    }, $b.undrag = function () {
        for (var a = ac.length; a--;)ac[a].el == this && (this.unmousedown(ac[a].start), ac.splice(a, 1), b.unbind("raphael.drag.*." + this.id));
        !ac.length && c.unmousemove(Yb).unmouseup(Zb), Xb = []
    }, v.circle = function (a, b, d) {
        var e = c._engine.circle(this, a || 0, b || 0, d || 0);
        return this.__set__ && this.__set__.push(e), e
    }, v.rect = function (a, b, d, e, f) {
        var g = c._engine.rect(this, a || 0, b || 0, d || 0, e || 0, f || 0);
        return this.__set__ && this.__set__.push(g), g
    }, v.ellipse = function (a, b, d, e) {
        var f = c._engine.ellipse(this, a || 0, b || 0, d || 0, e || 0);
        return this.__set__ && this.__set__.push(f), f
    }, v.path = function (a) {
        a && !c.is(a, U) && !c.is(a[0], V) && (a += G);
        var b = c._engine.path(c.format[D](c, arguments), this);
        return this.__set__ && this.__set__.push(b), b
    }, v.image = function (a, b, d, e, f) {
        var g = c._engine.image(this, a || "about:blank", b || 0, d || 0, e || 0, f || 0);
        return this.__set__ && this.__set__.push(g), g
    }, v.text = function (a, b, d) {
        var e = c._engine.text(this, a || 0, b || 0, I(d));
        return this.__set__ && this.__set__.push(e), e
    }, v.set = function (a) {
        !c.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
        var b = new mc(a);
        return this.__set__ && this.__set__.push(b), b.paper = this, b.type = "set", b
    }, v.setStart = function (a) {
        this.__set__ = a || this.set()
    }, v.setFinish = function () {
        var a = this.__set__;
        return delete this.__set__, a
    }, v.setSize = function (a, b) {
        return c._engine.setSize.call(this, a, b)
    }, v.setViewBox = function (a, b, d, e, f) {
        return c._engine.setViewBox.call(this, a, b, d, e, f)
    }, v.top = v.bottom = null, v.raphael = c;
    var bc = function (a) {
        var b = a.getBoundingClientRect(), c = a.ownerDocument, d = c.body, e = c.documentElement, f = e.clientTop || d.clientTop || 0, g = e.clientLeft || d.clientLeft || 0, h = b.top + (A.win.pageYOffset || e.scrollTop || d.scrollTop) - f, i = b.left + (A.win.pageXOffset || e.scrollLeft || d.scrollLeft) - g;
        return{y: h, x: i}
    };
    v.getElementByPoint = function (a, b) {
        var c = this, d = c.canvas, e = A.doc.elementFromPoint(a, b);
        if (A.win.opera && "svg" == e.tagName) {
            var f = bc(d), g = d.createSVGRect();
            g.x = a - f.x, g.y = b - f.y, g.width = g.height = 1;
            var h = d.getIntersectionList(g, null);
            h.length && (e = h[h.length - 1])
        }
        if (!e)return null;
        for (; e.parentNode && e != d.parentNode && !e.raphael;)e = e.parentNode;
        return e == c.canvas.parentNode && (e = d), e = e && e.raphael ? c.getById(e.raphaelid) : null
    }, v.getElementsByBBox = function (a) {
        var b = this.set();
        return this.forEach(function (d) {
            c.isBBoxIntersect(d.getBBox(), a) && b.push(d)
        }), b
    }, v.getById = function (a) {
        for (var b = this.bottom; b;) {
            if (b.id == a)return b;
            b = b.next
        }
        return null
    }, v.forEach = function (a, b) {
        for (var c = this.bottom; c;) {
            if (a.call(b, c) === !1)return this;
            c = c.next
        }
        return this
    }, v.getElementsByPoint = function (a, b) {
        var c = this.set();
        return this.forEach(function (d) {
            d.isPointInside(a, b) && c.push(d)
        }), c
    }, $b.isPointInside = function (a, b) {
        var d = this.realPath = qb[this.type](this);
        return this.attr("transform") && this.attr("transform").length && (d = c.transformPath(d, this.attr("transform"))), c.isPointInsidePath(d, a, b)
    }, $b.getBBox = function (a) {
        if (this.removed)return{};
        var b = this._;
        return a ? ((b.dirty || !b.bboxwt) && (this.realPath = qb[this.type](this), b.bboxwt = Bb(this.realPath), b.bboxwt.toString = p, b.dirty = 0), b.bboxwt) : ((b.dirty || b.dirtyT || !b.bbox) && ((b.dirty || !this.realPath) && (b.bboxwt = 0, this.realPath = qb[this.type](this)), b.bbox = Bb(rb(this.realPath, this.matrix)), b.bbox.toString = p, b.dirty = b.dirtyT = 0), b.bbox)
    }, $b.clone = function () {
        if (this.removed)return null;
        var a = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(a), a
    }, $b.glow = function (a) {
        if ("text" == this.type)return null;
        a = a || {};
        var b = {width: (a.width || 10) + (+this.attr("stroke-width") || 1), fill: a.fill || !1, opacity: a.opacity || .5, offsetx: a.offsetx || 0, offsety: a.offsety || 0, color: a.color || "#000"}, c = b.width / 2, d = this.paper, e = d.set(), f = this.realPath || qb[this.type](this);
        f = this.matrix ? rb(f, this.matrix) : f;
        for (var g = 1; c + 1 > g; g++)e.push(d.path(f).attr({stroke: b.color, fill: b.fill ? b.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(b.width / c * g).toFixed(3), opacity: +(b.opacity / c).toFixed(3)}));
        return e.insertBefore(this).translate(b.offsetx, b.offsety)
    };
    var cc = function (a, b, d, e, f, g, h, i, l) {
        return null == l ? j(a, b, d, e, f, g, h, i) : c.findDotsAtSegment(a, b, d, e, f, g, h, i, k(a, b, d, e, f, g, h, i, l))
    }, dc = function (a, b) {
        return function (d, e, f) {
            d = Kb(d);
            for (var g, h, i, j, k, l = "", m = {}, n = 0, o = 0, p = d.length; p > o; o++) {
                if (i = d[o], "M" == i[0])g = +i[1], h = +i[2]; else {
                    if (j = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6]), n + j > e) {
                        if (b && !m.start) {
                            if (k = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n), l += ["C" + k.start.x, k.start.y, k.m.x, k.m.y, k.x, k.y], f)return l;
                            m.start = l, l = ["M" + k.x, k.y + "C" + k.n.x, k.n.y, k.end.x, k.end.y, i[5], i[6]].join(), n += j, g = +i[5], h = +i[6];
                            continue
                        }
                        if (!a && !b)return k = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n), {x: k.x, y: k.y, alpha: k.alpha}
                    }
                    n += j, g = +i[5], h = +i[6]
                }
                l += i.shift() + i
            }
            return m.end = l, k = a ? n : b ? m : c.findDotsAtSegment(g, h, i[0], i[1], i[2], i[3], i[4], i[5], 1), k.alpha && (k = {x: k.x, y: k.y, alpha: k.alpha}), k
        }
    }, ec = dc(1), fc = dc(), gc = dc(0, 1);
    c.getTotalLength = ec, c.getPointAtLength = fc, c.getSubpath = function (a, b, c) {
        if (this.getTotalLength(a) - c < 1e-6)return gc(a, b).end;
        var d = gc(a, c, 1);
        return b ? gc(d, b).end : d
    }, $b.getTotalLength = function () {
        var a = this.getPath();
        if (a)return this.node.getTotalLength ? this.node.getTotalLength() : ec(a)
    }, $b.getPointAtLength = function (a) {
        var b = this.getPath();
        if (b)return fc(b, a)
    }, $b.getPath = function () {
        var a, b = c._getPath[this.type];
        if ("text" != this.type && "set" != this.type)return b && (a = b(this)), a
    }, $b.getSubpath = function (a, b) {
        var d = this.getPath();
        if (d)return c.getSubpath(d, a, b)
    };
    var hc = c.easing_formulas = {linear: function (a) {
        return a
    }, "<": function (a) {
        return R(a, 1.7)
    }, ">": function (a) {
        return R(a, .48)
    }, "<>": function (a) {
        var b = .48 - a / 1.04, c = N.sqrt(.1734 + b * b), d = c - b, e = R(Q(d), 1 / 3) * (0 > d ? -1 : 1), f = -c - b, g = R(Q(f), 1 / 3) * (0 > f ? -1 : 1), h = e + g + .5;
        return 3 * (1 - h) * h * h + h * h * h
    }, backIn: function (a) {
        var b = 1.70158;
        return a * a * ((b + 1) * a - b)
    }, backOut: function (a) {
        a -= 1;
        var b = 1.70158;
        return a * a * ((b + 1) * a + b) + 1
    }, elastic: function (a) {
        return a == !!a ? a : R(2, -10 * a) * N.sin((a - .075) * 2 * S / .3) + 1
    }, bounce: function (a) {
        var b, c = 7.5625, d = 2.75;
        return 1 / d > a ? b = c * a * a : 2 / d > a ? (a -= 1.5 / d, b = c * a * a + .75) : 2.5 / d > a ? (a -= 2.25 / d, b = c * a * a + .9375) : (a -= 2.625 / d, b = c * a * a + .984375), b
    }};
    hc.easeIn = hc["ease-in"] = hc["<"], hc.easeOut = hc["ease-out"] = hc[">"], hc.easeInOut = hc["ease-in-out"] = hc["<>"], hc["back-in"] = hc.backIn, hc["back-out"] = hc.backOut;
    var ic = [], jc = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function (a) {
        setTimeout(a, 16)
    }, kc = function () {
        for (var a = +new Date, d = 0; d < ic.length; d++) {
            var e = ic[d];
            if (!e.el.removed && !e.paused) {
                var f, g, h = a - e.start, i = e.ms, j = e.easing, k = e.from, l = e.diff, m = e.to, n = (e.t, e.el), o = {}, p = {};
                if (e.initstatus ? (h = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * i, e.status = e.initstatus, delete e.initstatus, e.stop && ic.splice(d--, 1)) : e.status = (e.prev + (e.percent - e.prev) * (h / i)) / e.anim.top, !(0 > h))if (i > h) {
                    var q = j(h / i);
                    for (var r in k)if (k[z](r)) {
                        switch (db[r]) {
                            case T:
                                f = +k[r] + q * i * l[r];
                                break;
                            case"colour":
                                f = "rgb(" + [lc($(k[r].r + q * i * l[r].r)), lc($(k[r].g + q * i * l[r].g)), lc($(k[r].b + q * i * l[r].b))].join(",") + ")";
                                break;
                            case"path":
                                f = [];
                                for (var t = 0, u = k[r].length; u > t; t++) {
                                    f[t] = [k[r][t][0]];
                                    for (var v = 1, w = k[r][t].length; w > v; v++)f[t][v] = +k[r][t][v] + q * i * l[r][t][v];
                                    f[t] = f[t].join(H)
                                }
                                f = f.join(H);
                                break;
                            case"transform":
                                if (l[r].real)for (f = [], t = 0, u = k[r].length; u > t; t++)for (f[t] = [k[r][t][0]], v = 1, w = k[r][t].length; w > v; v++)f[t][v] = k[r][t][v] + q * i * l[r][t][v]; else {
                                    var x = function (a) {
                                        return+k[r][a] + q * i * l[r][a]
                                    };
                                    f = [
                                        ["m", x(0), x(1), x(2), x(3), x(4), x(5)]
                                    ]
                                }
                                break;
                            case"csv":
                                if ("clip-rect" == r)for (f = [], t = 4; t--;)f[t] = +k[r][t] + q * i * l[r][t];
                                break;
                            default:
                                var y = [][E](k[r]);
                                for (f = [], t = n.paper.customAttributes[r].length; t--;)f[t] = +y[t] + q * i * l[r][t]
                        }
                        o[r] = f
                    }
                    n.attr(o), function (a, c, d) {
                        setTimeout(function () {
                            b("raphael.anim.frame." + a, c, d)
                        })
                    }(n.id, n, e.anim)
                } else {
                    if (function (a, d, e) {
                        setTimeout(function () {
                            b("raphael.anim.frame." + d.id, d, e), b("raphael.anim.finish." + d.id, d, e), c.is(a, "function") && a.call(d)
                        })
                    }(e.callback, n, e.anim), n.attr(m), ic.splice(d--, 1), e.repeat > 1 && !e.next) {
                        for (g in m)m[z](g) && (p[g] = e.totalOrigin[g]);
                        e.el.attr(p), s(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
                    }
                    e.next && !e.stop && s(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
                }
            }
        }
        c.svg && n && n.paper && n.paper.safari(), ic.length && jc(kc)
    }, lc = function (a) {
        return a > 255 ? 255 : 0 > a ? 0 : a
    };
    $b.animateWith = function (a, b, d, e, f, g) {
        var h = this;
        if (h.removed)return g && g.call(h), h;
        var i = d instanceof r ? d : c.animation(d, e, f, g);
        s(i, h, i.percents[0], null, h.attr());
        for (var j = 0, k = ic.length; k > j; j++)if (ic[j].anim == b && ic[j].el == a) {
            ic[k - 1].start = ic[j].start;
            break
        }
        return h
    }, $b.onAnimation = function (a) {
        return a ? b.on("raphael.anim.frame." + this.id, a) : b.unbind("raphael.anim.frame." + this.id), this
    }, r.prototype.delay = function (a) {
        var b = new r(this.anim, this.ms);
        return b.times = this.times, b.del = +a || 0, b
    }, r.prototype.repeat = function (a) {
        var b = new r(this.anim, this.ms);
        return b.del = this.del, b.times = N.floor(O(a, 0)) || 1, b
    }, c.animation = function (a, b, d, e) {
        if (a instanceof r)return a;
        (c.is(d, "function") || !d) && (e = e || d || null, d = null), a = Object(a), b = +b || 0;
        var f, g, h = {};
        for (g in a)a[z](g) && _(g) != g && _(g) + "%" != g && (f = !0, h[g] = a[g]);
        return f ? (d && (h.easing = d), e && (h.callback = e), new r({100: h}, b)) : new r(a, b)
    }, $b.animate = function (a, b, d, e) {
        var f = this;
        if (f.removed)return e && e.call(f), f;
        var g = a instanceof r ? a : c.animation(a, b, d, e);
        return s(g, f, g.percents[0], null, f.attr()), f
    }, $b.setTime = function (a, b) {
        return a && null != b && this.status(a, P(b, a.ms) / a.ms), this
    }, $b.status = function (a, b) {
        var c, d, e = [], f = 0;
        if (null != b)return s(a, this, -1, P(b, 1)), this;
        for (c = ic.length; c > f; f++)if (d = ic[f], d.el.id == this.id && (!a || d.anim == a)) {
            if (a)return d.status;
            e.push({anim: d.anim, status: d.status})
        }
        return a ? 0 : e
    }, $b.pause = function (a) {
        for (var c = 0; c < ic.length; c++)ic[c].el.id != this.id || a && ic[c].anim != a || b("raphael.anim.pause." + this.id, this, ic[c].anim) !== !1 && (ic[c].paused = !0);
        return this
    }, $b.resume = function (a) {
        for (var c = 0; c < ic.length; c++)if (ic[c].el.id == this.id && (!a || ic[c].anim == a)) {
            var d = ic[c];
            b("raphael.anim.resume." + this.id, this, d.anim) !== !1 && (delete d.paused, this.status(d.anim, d.status))
        }
        return this
    }, $b.stop = function (a) {
        for (var c = 0; c < ic.length; c++)ic[c].el.id != this.id || a && ic[c].anim != a || b("raphael.anim.stop." + this.id, this, ic[c].anim) !== !1 && ic.splice(c--, 1);
        return this
    }, b.on("raphael.remove", t), b.on("raphael.clear", t), $b.toString = function () {
        return"Raphaël’s object"
    };
    var mc = function (a) {
        if (this.items = [], this.length = 0, this.type = "set", a)for (var b = 0, c = a.length; c > b; b++)!a[b] || a[b].constructor != $b.constructor && a[b].constructor != mc || (this[this.items.length] = this.items[this.items.length] = a[b], this.length++)
    }, nc = mc.prototype;
    nc.push = function () {
        for (var a, b, c = 0, d = arguments.length; d > c; c++)a = arguments[c], !a || a.constructor != $b.constructor && a.constructor != mc || (b = this.items.length, this[b] = this.items[b] = a, this.length++);
        return this
    }, nc.pop = function () {
        return this.length && delete this[this.length--], this.items.pop()
    }, nc.forEach = function (a, b) {
        for (var c = 0, d = this.items.length; d > c; c++)if (a.call(b, this.items[c], c) === !1)return this;
        return this
    };
    for (var oc in $b)$b[z](oc) && (nc[oc] = function (a) {
        return function () {
            var b = arguments;
            return this.forEach(function (c) {
                c[a][D](c, b)
            })
        }
    }(oc));
    return nc.attr = function (a, b) {
        if (a && c.is(a, V) && c.is(a[0], "object"))for (var d = 0, e = a.length; e > d; d++)this.items[d].attr(a[d]); else for (var f = 0, g = this.items.length; g > f; f++)this.items[f].attr(a, b);
        return this
    }, nc.clear = function () {
        for (; this.length;)this.pop()
    }, nc.splice = function (a, b) {
        a = 0 > a ? O(this.length + a, 0) : a, b = O(0, P(this.length - a, b));
        var c, d = [], e = [], f = [];
        for (c = 2; c < arguments.length; c++)f.push(arguments[c]);
        for (c = 0; b > c; c++)e.push(this[a + c]);
        for (; c < this.length - a; c++)d.push(this[a + c]);
        var g = f.length;
        for (c = 0; c < g + d.length; c++)this.items[a + c] = this[a + c] = g > c ? f[c] : d[c - g];
        for (c = this.items.length = this.length -= b - g; this[c];)delete this[c++];
        return new mc(e)
    }, nc.exclude = function (a) {
        for (var b = 0, c = this.length; c > b; b++)if (this[b] == a)return this.splice(b, 1), !0
    }, nc.animate = function (a, b, d, e) {
        (c.is(d, "function") || !d) && (e = d || null);
        var f, g, h = this.items.length, i = h, j = this;
        if (!h)return this;
        e && (g = function () {
            !--h && e.call(j)
        }), d = c.is(d, U) ? d : g;
        var k = c.animation(a, b, d, g);
        for (f = this.items[--i].animate(k); i--;)this.items[i] && !this.items[i].removed && this.items[i].animateWith(f, k, k), this.items[i] && !this.items[i].removed || h--;
        return this
    }, nc.insertAfter = function (a) {
        for (var b = this.items.length; b--;)this.items[b].insertAfter(a);
        return this
    }, nc.getBBox = function () {
        for (var a = [], b = [], c = [], d = [], e = this.items.length; e--;)if (!this.items[e].removed) {
            var f = this.items[e].getBBox();
            a.push(f.x), b.push(f.y), c.push(f.x + f.width), d.push(f.y + f.height)
        }
        return a = P[D](0, a), b = P[D](0, b), c = O[D](0, c), d = O[D](0, d), {x: a, y: b, x2: c, y2: d, width: c - a, height: d - b}
    }, nc.clone = function (a) {
        a = this.paper.set();
        for (var b = 0, c = this.items.length; c > b; b++)a.push(this.items[b].clone());
        return a
    }, nc.toString = function () {
        return"Raphaël‘s set"
    }, nc.glow = function (a) {
        var b = this.paper.set();
        return this.forEach(function (c) {
            var d = c.glow(a);
            null != d && d.forEach(function (a) {
                b.push(a)
            })
        }), b
    }, nc.isPointInside = function (a, b) {
        var c = !1;
        return this.forEach(function (d) {
            return d.isPointInside(a, b) ? (console.log("runned"), c = !0, !1) : void 0
        }), c
    }, c.registerFont = function (a) {
        if (!a.face)return a;
        this.fonts = this.fonts || {};
        var b = {w: a.w, face: {}, glyphs: {}}, c = a.face["font-family"];
        for (var d in a.face)a.face[z](d) && (b.face[d] = a.face[d]);
        if (this.fonts[c] ? this.fonts[c].push(b) : this.fonts[c] = [b], !a.svg) {
            b.face["units-per-em"] = ab(a.face["units-per-em"], 10);
            for (var e in a.glyphs)if (a.glyphs[z](e)) {
                var f = a.glyphs[e];
                if (b.glyphs[e] = {w: f.w, k: {}, d: f.d && "M" + f.d.replace(/[mlcxtrv]/g, function (a) {
                    return{l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[a] || "M"
                }) + "z"}, f.k)for (var g in f.k)f[z](g) && (b.glyphs[e].k[g] = f.k[g])
            }
        }
        return a
    }, v.getFont = function (a, b, d, e) {
        if (e = e || "normal", d = d || "normal", b = +b || {normal: 400, bold: 700, lighter: 300, bolder: 800}[b] || 400, c.fonts) {
            var f = c.fonts[a];
            if (!f) {
                var g = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, G) + "(\\s|$)", "i");
                for (var h in c.fonts)if (c.fonts[z](h) && g.test(h)) {
                    f = c.fonts[h];
                    break
                }
            }
            var i;
            if (f)for (var j = 0, k = f.length; k > j && (i = f[j], i.face["font-weight"] != b || i.face["font-style"] != d && i.face["font-style"] || i.face["font-stretch"] != e); j++);
            return i
        }
    }, v.print = function (a, b, d, e, f, g, h, i) {
        g = g || "middle", h = O(P(h || 0, 1), -1), i = O(P(i || 1, 3), 1);
        var j, k = I(d)[J](G), l = 0, m = 0, n = G;
        if (c.is(e, "string") && (e = this.getFont(e)), e) {
            j = (f || 16) / e.face["units-per-em"];
            for (var o = e.face.bbox[J](w), p = +o[0], q = o[3] - o[1], r = 0, s = +o[1] + ("baseline" == g ? q + +e.face.descent : q / 2), t = 0, u = k.length; u > t; t++) {
                if ("\n" == k[t])l = 0, x = 0, m = 0, r += q * i; else {
                    var v = m && e.glyphs[k[t - 1]] || {}, x = e.glyphs[k[t]];
                    l += m ? (v.w || e.w) + (v.k && v.k[k[t]] || 0) + e.w * h : 0, m = 1
                }
                x && x.d && (n += c.transformPath(x.d, ["t", l * j, r * j, "s", j, j, p, s, "t", (a - p) / j, (b - s) / j]))
            }
        }
        return this.path(n).attr({fill: "#000", stroke: "none"})
    }, v.add = function (a) {
        if (c.is(a, "array"))for (var b, d = this.set(), e = 0, f = a.length; f > e; e++)b = a[e] || {}, x[z](b.type) && d.push(this[b.type]().attr(b));
        return d
    }, c.format = function (a, b) {
        var d = c.is(b, V) ? [0][E](b) : arguments;
        return a && c.is(a, U) && d.length - 1 && (a = a.replace(y, function (a, b) {
            return null == d[++b] ? G : d[b]
        })), a || G
    }, c.fullfill = function () {
        var a = /\{([^\}]+)\}/g, b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, c = function (a, c, d) {
            var e = d;
            return c.replace(b, function (a, b, c, d, f) {
                b = b || d, e && (b in e && (e = e[b]), "function" == typeof e && f && (e = e()))
            }), e = (null == e || e == d ? a : e) + ""
        };
        return function (b, d) {
            return String(b).replace(a, function (a, b) {
                return c(a, b, d)
            })
        }
    }(), c.ninja = function () {
        return B.was ? A.win.Raphael = B.is : delete Raphael, c
    }, c.st = nc, function (a, b, d) {
        function e() {
            /in/.test(a.readyState) ? setTimeout(e, 9) : c.eve("raphael.DOMload")
        }

        null == a.readyState && a.addEventListener && (a.addEventListener(b, d = function () {
            a.removeEventListener(b, d, !1), a.readyState = "complete"
        }, !1), a.readyState = "loading"), e()
    }(document, "DOMContentLoaded"), b.on("raphael.DOMload", function () {
        u = !0
    }), function () {
        if (c.svg) {
            var a = "hasOwnProperty", b = String, d = parseFloat, e = parseInt, f = Math, g = f.max, h = f.abs, i = f.pow, j = /[, ]+/, k = c.eve, l = "", m = " ", n = "http://www.w3.org/1999/xlink", o = {block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, p = {};
            c.toString = function () {
                return"Your browser supports SVG.\nYou are running Raphaël " + this.version
            };
            var q = function (d, e) {
                if (e) {
                    "string" == typeof d && (d = q(d));
                    for (var f in e)e[a](f) && ("xlink:" == f.substring(0, 6) ? d.setAttributeNS(n, f.substring(6), b(e[f])) : d.setAttribute(f, b(e[f])))
                } else d = c._g.doc.createElementNS("http://www.w3.org/2000/svg", d), d.style && (d.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                return d
            }, r = function (a, e) {
                var j = "linear", k = a.id + e, m = .5, n = .5, o = a.node, p = a.paper, r = o.style, s = c._g.doc.getElementById(k);
                if (!s) {
                    if (e = b(e).replace(c._radial_gradient, function (a, b, c) {
                        if (j = "radial", b && c) {
                            m = d(b), n = d(c);
                            var e = 2 * (n > .5) - 1;
                            i(m - .5, 2) + i(n - .5, 2) > .25 && (n = f.sqrt(.25 - i(m - .5, 2)) * e + .5) && .5 != n && (n = n.toFixed(5) - 1e-5 * e)
                        }
                        return l
                    }), e = e.split(/\s*\-\s*/), "linear" == j) {
                        var t = e.shift();
                        if (t = -d(t), isNaN(t))return null;
                        var u = [0, 0, f.cos(c.rad(t)), f.sin(c.rad(t))], v = 1 / (g(h(u[2]), h(u[3])) || 1);
                        u[2] *= v, u[3] *= v, u[2] < 0 && (u[0] = -u[2], u[2] = 0), u[3] < 0 && (u[1] = -u[3], u[3] = 0)
                    }
                    var w = c._parseDots(e);
                    if (!w)return null;
                    if (k = k.replace(/[\(\)\s,\xb0#]/g, "_"), a.gradient && k != a.gradient.id && (p.defs.removeChild(a.gradient), delete a.gradient), !a.gradient) {
                        s = q(j + "Gradient", {id: k}), a.gradient = s, q(s, "radial" == j ? {fx: m, fy: n} : {x1: u[0], y1: u[1], x2: u[2], y2: u[3], gradientTransform: a.matrix.invert()}), p.defs.appendChild(s);
                        for (var x = 0, y = w.length; y > x; x++)s.appendChild(q("stop", {offset: w[x].offset ? w[x].offset : x ? "100%" : "0%", "stop-color": w[x].color || "#fff"}))
                    }
                }
                return q(o, {fill: "url(#" + k + ")", opacity: 1, "fill-opacity": 1}), r.fill = l, r.opacity = 1, r.fillOpacity = 1, 1
            }, s = function (a) {
                var b = a.getBBox(1);
                q(a.pattern, {patternTransform: a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"})
            }, t = function (d, e, f) {
                if ("path" == d.type) {
                    for (var g, h, i, j, k, m = b(e).toLowerCase().split("-"), n = d.paper, r = f ? "end" : "start", s = d.node, t = d.attrs, u = t["stroke-width"], v = m.length, w = "classic", x = 3, y = 3, z = 5; v--;)switch (m[v]) {
                        case"block":
                        case"classic":
                        case"oval":
                        case"diamond":
                        case"open":
                        case"none":
                            w = m[v];
                            break;
                        case"wide":
                            y = 5;
                            break;
                        case"narrow":
                            y = 2;
                            break;
                        case"long":
                            x = 5;
                            break;
                        case"short":
                            x = 2
                    }
                    if ("open" == w ? (x += 2, y += 2, z += 2, i = 1, j = f ? 4 : 1, k = {fill: "none", stroke: t.stroke}) : (j = i = x / 2, k = {fill: t.stroke, stroke: "none"}), d._.arrows ? f ? (d._.arrows.endPath && p[d._.arrows.endPath]--, d._.arrows.endMarker && p[d._.arrows.endMarker]--) : (d._.arrows.startPath && p[d._.arrows.startPath]--, d._.arrows.startMarker && p[d._.arrows.startMarker]--) : d._.arrows = {}, "none" != w) {
                        var A = "raphael-marker-" + w, B = "raphael-marker-" + r + w + x + y;
                        c._g.doc.getElementById(A) ? p[A]++ : (n.defs.appendChild(q(q("path"), {"stroke-linecap": "round", d: o[w], id: A})), p[A] = 1);
                        var C, D = c._g.doc.getElementById(B);
                        D ? (p[B]++, C = D.getElementsByTagName("use")[0]) : (D = q(q("marker"), {id: B, markerHeight: y, markerWidth: x, orient: "auto", refX: j, refY: y / 2}), C = q(q("use"), {"xlink:href": "#" + A, transform: (f ? "rotate(180 " + x / 2 + " " + y / 2 + ") " : l) + "scale(" + x / z + "," + y / z + ")", "stroke-width": (1 / ((x / z + y / z) / 2)).toFixed(4)}), D.appendChild(C), n.defs.appendChild(D), p[B] = 1), q(C, k);
                        var E = i * ("diamond" != w && "oval" != w);
                        f ? (g = d._.arrows.startdx * u || 0, h = c.getTotalLength(t.path) - E * u) : (g = E * u, h = c.getTotalLength(t.path) - (d._.arrows.enddx * u || 0)), k = {}, k["marker-" + r] = "url(#" + B + ")", (h || g) && (k.d = c.getSubpath(t.path, g, h)), q(s, k), d._.arrows[r + "Path"] = A, d._.arrows[r + "Marker"] = B, d._.arrows[r + "dx"] = E, d._.arrows[r + "Type"] = w, d._.arrows[r + "String"] = e
                    } else f ? (g = d._.arrows.startdx * u || 0, h = c.getTotalLength(t.path) - g) : (g = 0, h = c.getTotalLength(t.path) - (d._.arrows.enddx * u || 0)), d._.arrows[r + "Path"] && q(s, {d: c.getSubpath(t.path, g, h)}), delete d._.arrows[r + "Path"], delete d._.arrows[r + "Marker"], delete d._.arrows[r + "dx"], delete d._.arrows[r + "Type"], delete d._.arrows[r + "String"];
                    for (k in p)if (p[a](k) && !p[k]) {
                        var F = c._g.doc.getElementById(k);
                        F && F.parentNode.removeChild(F)
                    }
                }
            }, u = {"": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]}, v = function (a, c, d) {
                if (c = u[b(c).toLowerCase()]) {
                    for (var e = a.attrs["stroke-width"] || "1", f = {round: e, square: e, butt: 0}[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0, g = [], h = c.length; h--;)g[h] = c[h] * e + (h % 2 ? 1 : -1) * f;
                    q(a.node, {"stroke-dasharray": g.join(",")})
                }
            }, w = function (d, f) {
                var i = d.node, k = d.attrs, m = i.style.visibility;
                i.style.visibility = "hidden";
                for (var o in f)if (f[a](o)) {
                    if (!c._availableAttrs[a](o))continue;
                    var p = f[o];
                    switch (k[o] = p, o) {
                        case"blur":
                            d.blur(p);
                            break;
                        case"href":
                        case"title":
                            var u = q("title"), w = c._g.doc.createTextNode(p);
                            u.appendChild(w), i.appendChild(u);
                            break;
                        case"target":
                            var x = i.parentNode;
                            if ("a" != x.tagName.toLowerCase()) {
                                var u = q("a");
                                x.insertBefore(u, i), u.appendChild(i), x = u
                            }
                            "target" == o ? x.setAttributeNS(n, "show", "blank" == p ? "new" : p) : x.setAttributeNS(n, o, p);
                            break;
                        case"cursor":
                            i.style.cursor = p;
                            break;
                        case"transform":
                            d.transform(p);
                            break;
                        case"arrow-start":
                            t(d, p);
                            break;
                        case"arrow-end":
                            t(d, p, 1);
                            break;
                        case"clip-rect":
                            var z = b(p).split(j);
                            if (4 == z.length) {
                                d.clip && d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);
                                var A = q("clipPath"), B = q("rect");
                                A.id = c.createUUID(), q(B, {x: z[0], y: z[1], width: z[2], height: z[3]}), A.appendChild(B), d.paper.defs.appendChild(A), q(i, {"clip-path": "url(#" + A.id + ")"}), d.clip = B
                            }
                            if (!p) {
                                var C = i.getAttribute("clip-path");
                                if (C) {
                                    var D = c._g.doc.getElementById(C.replace(/(^url\(#|\)$)/g, l));
                                    D && D.parentNode.removeChild(D), q(i, {"clip-path": l}), delete d.clip
                                }
                            }
                            break;
                        case"path":
                            "path" == d.type && (q(i, {d: p ? k.path = c._pathToAbsolute(p) : "M0,0"}), d._.dirty = 1, d._.arrows && ("startString"in d._.arrows && t(d, d._.arrows.startString), "endString"in d._.arrows && t(d, d._.arrows.endString, 1)));
                            break;
                        case"width":
                            if (i.setAttribute(o, p), d._.dirty = 1, !k.fx)break;
                            o = "x", p = k.x;
                        case"x":
                            k.fx && (p = -k.x - (k.width || 0));
                        case"rx":
                            if ("rx" == o && "rect" == d.type)break;
                        case"cx":
                            i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                            break;
                        case"height":
                            if (i.setAttribute(o, p), d._.dirty = 1, !k.fy)break;
                            o = "y", p = k.y;
                        case"y":
                            k.fy && (p = -k.y - (k.height || 0));
                        case"ry":
                            if ("ry" == o && "rect" == d.type)break;
                        case"cy":
                            i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                            break;
                        case"r":
                            "rect" == d.type ? q(i, {rx: p, ry: p}) : i.setAttribute(o, p), d._.dirty = 1;
                            break;
                        case"src":
                            "image" == d.type && i.setAttributeNS(n, "href", p);
                            break;
                        case"stroke-width":
                            (1 != d._.sx || 1 != d._.sy) && (p /= g(h(d._.sx), h(d._.sy)) || 1), d.paper._vbSize && (p *= d.paper._vbSize), i.setAttribute(o, p), k["stroke-dasharray"] && v(d, k["stroke-dasharray"], f), d._.arrows && ("startString"in d._.arrows && t(d, d._.arrows.startString), "endString"in d._.arrows && t(d, d._.arrows.endString, 1));
                            break;
                        case"stroke-dasharray":
                            v(d, p, f);
                            break;
                        case"fill":
                            var E = b(p).match(c._ISURL);
                            if (E) {
                                A = q("pattern");
                                var F = q("image");
                                A.id = c.createUUID(), q(A, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1}), q(F, {x: 0, y: 0, "xlink:href": E[1]}), A.appendChild(F), function (a) {
                                    c._preload(E[1], function () {
                                        var b = this.offsetWidth, c = this.offsetHeight;
                                        q(a, {width: b, height: c}), q(F, {width: b, height: c}), d.paper.safari()
                                    })
                                }(A), d.paper.defs.appendChild(A), q(i, {fill: "url(#" + A.id + ")"}), d.pattern = A, d.pattern && s(d);
                                break
                            }
                            var G = c.getRGB(p);
                            if (G.error) {
                                if (("circle" == d.type || "ellipse" == d.type || "r" != b(p).charAt()) && r(d, p)) {
                                    if ("opacity"in k || "fill-opacity"in k) {
                                        var H = c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l));
                                        if (H) {
                                            var I = H.getElementsByTagName("stop");
                                            q(I[I.length - 1], {"stop-opacity": ("opacity"in k ? k.opacity : 1) * ("fill-opacity"in k ? k["fill-opacity"] : 1)})
                                        }
                                    }
                                    k.gradient = p, k.fill = "none";
                                    break
                                }
                            } else delete f.gradient, delete k.gradient, !c.is(k.opacity, "undefined") && c.is(f.opacity, "undefined") && q(i, {opacity: k.opacity}), !c.is(k["fill-opacity"], "undefined") && c.is(f["fill-opacity"], "undefined") && q(i, {"fill-opacity": k["fill-opacity"]});
                            G[a]("opacity") && q(i, {"fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity});
                        case"stroke":
                            G = c.getRGB(p), i.setAttribute(o, G.hex), "stroke" == o && G[a]("opacity") && q(i, {"stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity}), "stroke" == o && d._.arrows && ("startString"in d._.arrows && t(d, d._.arrows.startString), "endString"in d._.arrows && t(d, d._.arrows.endString, 1));
                            break;
                        case"gradient":
                            ("circle" == d.type || "ellipse" == d.type || "r" != b(p).charAt()) && r(d, p);
                            break;
                        case"opacity":
                            k.gradient && !k[a]("stroke-opacity") && q(i, {"stroke-opacity": p > 1 ? p / 100 : p});
                        case"fill-opacity":
                            if (k.gradient) {
                                H = c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l)), H && (I = H.getElementsByTagName("stop"), q(I[I.length - 1], {"stop-opacity": p}));
                                break
                            }
                        default:
                            "font-size" == o && (p = e(p, 10) + "px");
                            var J = o.replace(/(\-.)/g, function (a) {
                                return a.substring(1).toUpperCase()
                            });
                            i.style[J] = p, d._.dirty = 1, i.setAttribute(o, p)
                    }
                }
                y(d, f), i.style.visibility = m
            }, x = 1.2, y = function (d, f) {
                if ("text" == d.type && (f[a]("text") || f[a]("font") || f[a]("font-size") || f[a]("x") || f[a]("y"))) {
                    var g = d.attrs, h = d.node, i = h.firstChild ? e(c._g.doc.defaultView.getComputedStyle(h.firstChild, l).getPropertyValue("font-size"), 10) : 10;
                    if (f[a]("text")) {
                        for (g.text = f.text; h.firstChild;)h.removeChild(h.firstChild);
                        for (var j, k = b(f.text).split("\n"), m = [], n = 0, o = k.length; o > n; n++)j = q("tspan"), n && q(j, {dy: i * x, x: g.x}), j.appendChild(c._g.doc.createTextNode(k[n])), h.appendChild(j), m[n] = j
                    } else for (m = h.getElementsByTagName("tspan"), n = 0, o = m.length; o > n; n++)n ? q(m[n], {dy: i * x, x: g.x}) : q(m[0], {dy: 0});
                    q(h, {x: g.x, y: g.y}), d._.dirty = 1;
                    var p = d._getBBox(), r = g.y - (p.y + p.height / 2);
                    r && c.is(r, "finite") && q(m[0], {dy: r})
                }
            }, z = function (a, b) {
                this[0] = this.node = a, a.raphael = !0, this.id = c._oid++, a.raphaelid = this.id, this.matrix = c.matrix(), this.realPath = null, this.paper = b, this.attrs = this.attrs || {}, this._ = {transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1}, !b.bottom && (b.bottom = this), this.prev = b.top, b.top && (b.top.next = this), b.top = this, this.next = null
            }, A = c.el;
            z.prototype = A, A.constructor = z, c._engine.path = function (a, b) {
                var c = q("path");
                b.canvas && b.canvas.appendChild(c);
                var d = new z(c, b);
                return d.type = "path", w(d, {fill: "none", stroke: "#000", path: a}), d
            }, A.rotate = function (a, c, e) {
                if (this.removed)return this;
                if (a = b(a).split(j), a.length - 1 && (c = d(a[1]), e = d(a[2])), a = d(a[0]), null == e && (c = e), null == c || null == e) {
                    var f = this.getBBox(1);
                    c = f.x + f.width / 2, e = f.y + f.height / 2
                }
                return this.transform(this._.transform.concat([
                    ["r", a, c, e]
                ])), this
            }, A.scale = function (a, c, e, f) {
                if (this.removed)return this;
                if (a = b(a).split(j), a.length - 1 && (c = d(a[1]), e = d(a[2]), f = d(a[3])), a = d(a[0]), null == c && (c = a), null == f && (e = f), null == e || null == f)var g = this.getBBox(1);
                return e = null == e ? g.x + g.width / 2 : e, f = null == f ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([
                    ["s", a, c, e, f]
                ])), this
            }, A.translate = function (a, c) {
                return this.removed ? this : (a = b(a).split(j), a.length - 1 && (c = d(a[1])), a = d(a[0]) || 0, c = +c || 0, this.transform(this._.transform.concat([
                    ["t", a, c]
                ])), this)
            }, A.transform = function (b) {
                var d = this._;
                if (null == b)return d.transform;
                if (c._extractTransform(this, b), this.clip && q(this.clip, {transform: this.matrix.invert()}), this.pattern && s(this), this.node && q(this.node, {transform: this.matrix}), 1 != d.sx || 1 != d.sy) {
                    var e = this.attrs[a]("stroke-width") ? this.attrs["stroke-width"] : 1;
                    this.attr({"stroke-width": e})
                }
                return this
            }, A.hide = function () {
                return!this.removed && this.paper.safari(this.node.style.display = "none"), this
            }, A.show = function () {
                return!this.removed && this.paper.safari(this.node.style.display = ""), this
            }, A.remove = function () {
                if (!this.removed && this.node.parentNode) {
                    var a = this.paper;
                    a.__set__ && a.__set__.exclude(this), k.unbind("raphael.*.*." + this.id), this.gradient && a.defs.removeChild(this.gradient), c._tear(this, a), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                    for (var b in this)this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                    this.removed = !0
                }
            }, A._getBBox = function () {
                if ("none" == this.node.style.display) {
                    this.show();
                    var a = !0
                }
                var b = {};
                try {
                    b = this.node.getBBox()
                } catch (c) {
                } finally {
                    b = b || {}
                }
                return a && this.hide(), b
            }, A.attr = function (b, d) {
                if (this.removed)return this;
                if (null == b) {
                    var e = {};
                    for (var f in this.attrs)this.attrs[a](f) && (e[f] = this.attrs[f]);
                    return e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform, e
                }
                if (null == d && c.is(b, "string")) {
                    if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                    if ("transform" == b)return this._.transform;
                    for (var g = b.split(j), h = {}, i = 0, l = g.length; l > i; i++)b = g[i], h[b] = b in this.attrs ? this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? this.paper.customAttributes[b].def : c._availableAttrs[b];
                    return l - 1 ? h : h[g[0]]
                }
                if (null == d && c.is(b, "array")) {
                    for (h = {}, i = 0, l = b.length; l > i; i++)h[b[i]] = this.attr(b[i]);
                    return h
                }
                if (null != d) {
                    var m = {};
                    m[b] = d
                } else null != b && c.is(b, "object") && (m = b);
                for (var n in m)k("raphael.attr." + n + "." + this.id, this, m[n]);
                for (n in this.paper.customAttributes)if (this.paper.customAttributes[a](n) && m[a](n) && c.is(this.paper.customAttributes[n], "function")) {
                    var o = this.paper.customAttributes[n].apply(this, [].concat(m[n]));
                    this.attrs[n] = m[n];
                    for (var p in o)o[a](p) && (m[p] = o[p])
                }
                return w(this, m), this
            }, A.toFront = function () {
                if (this.removed)return this;
                "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                var a = this.paper;
                return a.top != this && c._tofront(this, a), this
            }, A.toBack = function () {
                if (this.removed)return this;
                var a = this.node.parentNode;
                return"a" == a.tagName.toLowerCase() ? a.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : a.firstChild != this.node && a.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper), this.paper, this
            }, A.insertAfter = function (a) {
                if (this.removed)return this;
                var b = a.node || a[a.length - 1].node;
                return b.nextSibling ? b.parentNode.insertBefore(this.node, b.nextSibling) : b.parentNode.appendChild(this.node), c._insertafter(this, a, this.paper), this
            }, A.insertBefore = function (a) {
                if (this.removed)return this;
                var b = a.node || a[0].node;
                return b.parentNode.insertBefore(this.node, b), c._insertbefore(this, a, this.paper), this
            }, A.blur = function (a) {
                var b = this;
                if (0 !== +a) {
                    var d = q("filter"), e = q("feGaussianBlur");
                    b.attrs.blur = a, d.id = c.createUUID(), q(e, {stdDeviation: +a || 1.5}), d.appendChild(e), b.paper.defs.appendChild(d), b._blur = d, q(b.node, {filter: "url(#" + d.id + ")"})
                } else b._blur && (b._blur.parentNode.removeChild(b._blur), delete b._blur, delete b.attrs.blur), b.node.removeAttribute("filter");
                return b
            }, c._engine.circle = function (a, b, c, d) {
                var e = q("circle");
                a.canvas && a.canvas.appendChild(e);
                var f = new z(e, a);
                return f.attrs = {cx: b, cy: c, r: d, fill: "none", stroke: "#000"}, f.type = "circle", q(e, f.attrs), f
            }, c._engine.rect = function (a, b, c, d, e, f) {
                var g = q("rect");
                a.canvas && a.canvas.appendChild(g);
                var h = new z(g, a);
                return h.attrs = {x: b, y: c, width: d, height: e, r: f || 0, rx: f || 0, ry: f || 0, fill: "none", stroke: "#000"}, h.type = "rect", q(g, h.attrs), h
            }, c._engine.ellipse = function (a, b, c, d, e) {
                var f = q("ellipse");
                a.canvas && a.canvas.appendChild(f);
                var g = new z(f, a);
                return g.attrs = {cx: b, cy: c, rx: d, ry: e, fill: "none", stroke: "#000"}, g.type = "ellipse", q(f, g.attrs), g
            }, c._engine.image = function (a, b, c, d, e, f) {
                var g = q("image");
                q(g, {x: c, y: d, width: e, height: f, preserveAspectRatio: "none"}), g.setAttributeNS(n, "href", b), a.canvas && a.canvas.appendChild(g);
                var h = new z(g, a);
                return h.attrs = {x: c, y: d, width: e, height: f, src: b}, h.type = "image", h
            }, c._engine.text = function (a, b, d, e) {
                var f = q("text");
                a.canvas && a.canvas.appendChild(f);
                var g = new z(f, a);
                return g.attrs = {x: b, y: d, "text-anchor": "middle", text: e, font: c._availableAttrs.font, stroke: "none", fill: "#000"}, g.type = "text", w(g, g.attrs), g
            }, c._engine.setSize = function (a, b) {
                return this.width = a || this.width, this.height = b || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
            }, c._engine.create = function () {
                var a = c._getContainer.apply(0, arguments), b = a && a.container, d = a.x, e = a.y, f = a.width, g = a.height;
                if (!b)throw new Error("SVG container not found.");
                var h, i = q("svg"), j = "overflow:hidden;";
                return d = d || 0, e = e || 0, f = f || 512, g = g || 342, q(i, {height: g, version: 1.1, width: f, xmlns: "http://www.w3.org/2000/svg"}), 1 == b ? (i.style.cssText = j + "position:absolute;left:" + d + "px;top:" + e + "px", c._g.doc.body.appendChild(i), h = 1) : (i.style.cssText = j + "position:relative", b.firstChild ? b.insertBefore(i, b.firstChild) : b.appendChild(i)), b = new c._Paper, b.width = f, b.height = g, b.canvas = i, b.clear(), b._left = b._top = 0, h && (b.renderfix = function () {
                }), b.renderfix(), b
            }, c._engine.setViewBox = function (a, b, c, d, e) {
                k("raphael.setViewBox", this, this._viewBox, [a, b, c, d, e]);
                var f, h, i = g(c / this.width, d / this.height), j = this.top, l = e ? "meet" : "xMinYMin";
                for (null == a ? (this._vbSize && (i = 1), delete this._vbSize, f = "0 0 " + this.width + m + this.height) : (this._vbSize = i, f = a + m + b + m + c + m + d), q(this.canvas, {viewBox: f, preserveAspectRatio: l}); i && j;)h = "stroke-width"in j.attrs ? j.attrs["stroke-width"] : 1, j.attr({"stroke-width": h}), j._.dirty = 1, j._.dirtyT = 1, j = j.prev;
                return this._viewBox = [a, b, c, d, !!e], this
            }, c.prototype.renderfix = function () {
                var a, b = this.canvas, c = b.style;
                try {
                    a = b.getScreenCTM() || b.createSVGMatrix()
                } catch (d) {
                    a = b.createSVGMatrix()
                }
                var e = -a.e % 1, f = -a.f % 1;
                (e || f) && (e && (this._left = (this._left + e) % 1, c.left = this._left + "px"), f && (this._top = (this._top + f) % 1, c.top = this._top + "px"))
            }, c.prototype.clear = function () {
                c.eve("raphael.clear", this);
                for (var a = this.canvas; a.firstChild;)a.removeChild(a.firstChild);
                this.bottom = this.top = null, (this.desc = q("desc")).appendChild(c._g.doc.createTextNode("Created with Raphaël " + c.version)), a.appendChild(this.desc), a.appendChild(this.defs = q("defs"))
            }, c.prototype.remove = function () {
                k("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var a in this)this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null
            };
            var B = c.st;
            for (var C in A)A[a](C) && !B[a](C) && (B[C] = function (a) {
                return function () {
                    var b = arguments;
                    return this.forEach(function (c) {
                        c[a].apply(c, b)
                    })
                }
            }(C))
        }
    }(), function () {
        if (c.vml) {
            var a = "hasOwnProperty", b = String, d = parseFloat, e = Math, f = e.round, g = e.max, h = e.min, i = e.abs, j = "fill", k = /[, ]+/, l = c.eve, m = " progid:DXImageTransform.Microsoft", n = " ", o = "", p = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"}, q = /([clmz]),?([^clmz]*)/gi, r = / progid:\S+Blur\([^\)]+\)/g, s = /-?[^,\s-]+/g, t = "position:absolute;left:0;top:0;width:1px;height:1px", u = 21600, v = {path: 1, rect: 1, image: 1}, w = {circle: 1, ellipse: 1}, x = function (a) {
                var d = /[ahqstv]/gi, e = c._pathToAbsolute;
                if (b(a).match(d) && (e = c._path2curve), d = /[clmz]/g, e == c._pathToAbsolute && !b(a).match(d)) {
                    var g = b(a).replace(q, function (a, b, c) {
                        var d = [], e = "m" == b.toLowerCase(), g = p[b];
                        return c.replace(s, function (a) {
                            e && 2 == d.length && (g += d + p["m" == b ? "l" : "L"], d = []), d.push(f(a * u))
                        }), g + d
                    });
                    return g
                }
                var h, i, j = e(a);
                g = [];
                for (var k = 0, l = j.length; l > k; k++) {
                    h = j[k], i = j[k][0].toLowerCase(), "z" == i && (i = "x");
                    for (var m = 1, r = h.length; r > m; m++)i += f(h[m] * u) + (m != r - 1 ? "," : o);
                    g.push(i)
                }
                return g.join(n)
            }, y = function (a, b, d) {
                var e = c.matrix();
                return e.rotate(-a, .5, .5), {dx: e.x(b, d), dy: e.y(b, d)}
            }, z = function (a, b, c, d, e, f) {
                var g = a._, h = a.matrix, k = g.fillpos, l = a.node, m = l.style, o = 1, p = "", q = u / b, r = u / c;
                if (m.visibility = "hidden", b && c) {
                    if (l.coordsize = i(q) + n + i(r), m.rotation = f * (0 > b * c ? -1 : 1), f) {
                        var s = y(f, d, e);
                        d = s.dx, e = s.dy
                    }
                    if (0 > b && (p += "x"), 0 > c && (p += " y") && (o = -1), m.flip = p, l.coordorigin = d * -q + n + e * -r, k || g.fillsize) {
                        var t = l.getElementsByTagName(j);
                        t = t && t[0], l.removeChild(t), k && (s = y(f, h.x(k[0], k[1]), h.y(k[0], k[1])), t.position = s.dx * o + n + s.dy * o), g.fillsize && (t.size = g.fillsize[0] * i(b) + n + g.fillsize[1] * i(c)), l.appendChild(t)
                    }
                    m.visibility = "visible"
                }
            };
            c.toString = function () {
                return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
            };
            var A = function (a, c, d) {
                for (var e = b(c).toLowerCase().split("-"), f = d ? "end" : "start", g = e.length, h = "classic", i = "medium", j = "medium"; g--;)switch (e[g]) {
                    case"block":
                    case"classic":
                    case"oval":
                    case"diamond":
                    case"open":
                    case"none":
                        h = e[g];
                        break;
                    case"wide":
                    case"narrow":
                        j = e[g];
                        break;
                    case"long":
                    case"short":
                        i = e[g]
                }
                var k = a.node.getElementsByTagName("stroke")[0];
                k[f + "arrow"] = h, k[f + "arrowlength"] = i, k[f + "arrowwidth"] = j
            }, B = function (e, i) {
                e.attrs = e.attrs || {};
                var l = e.node, m = e.attrs, p = l.style, q = v[e.type] && (i.x != m.x || i.y != m.y || i.width != m.width || i.height != m.height || i.cx != m.cx || i.cy != m.cy || i.rx != m.rx || i.ry != m.ry || i.r != m.r), r = w[e.type] && (m.cx != i.cx || m.cy != i.cy || m.r != i.r || m.rx != i.rx || m.ry != i.ry), s = e;
                for (var t in i)i[a](t) && (m[t] = i[t]);
                if (q && (m.path = c._getPath[e.type](e), e._.dirty = 1), i.href && (l.href = i.href), i.title && (l.title = i.title), i.target && (l.target = i.target), i.cursor && (p.cursor = i.cursor), "blur"in i && e.blur(i.blur), (i.path && "path" == e.type || q) && (l.path = x(~b(m.path).toLowerCase().indexOf("r") ? c._pathToAbsolute(m.path) : m.path), "image" == e.type && (e._.fillpos = [m.x, m.y], e._.fillsize = [m.width, m.height], z(e, 1, 1, 0, 0, 0))), "transform"in i && e.transform(i.transform), r) {
                    var y = +m.cx, B = +m.cy, D = +m.rx || +m.r || 0, E = +m.ry || +m.r || 0;
                    l.path = c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f((y - D) * u), f((B - E) * u), f((y + D) * u), f((B + E) * u), f(y * u)), e._.dirty = 1
                }
                if ("clip-rect"in i) {
                    var G = b(i["clip-rect"]).split(k);
                    if (4 == G.length) {
                        G[2] = +G[2] + +G[0], G[3] = +G[3] + +G[1];
                        var H = l.clipRect || c._g.doc.createElement("div"), I = H.style;
                        I.clip = c.format("rect({1}px {2}px {3}px {0}px)", G), l.clipRect || (I.position = "absolute", I.top = 0, I.left = 0, I.width = e.paper.width + "px", I.height = e.paper.height + "px", l.parentNode.insertBefore(H, l), H.appendChild(l), l.clipRect = H)
                    }
                    i["clip-rect"] || l.clipRect && (l.clipRect.style.clip = "auto")
                }
                if (e.textpath) {
                    var J = e.textpath.style;
                    i.font && (J.font = i.font), i["font-family"] && (J.fontFamily = '"' + i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, o) + '"'), i["font-size"] && (J.fontSize = i["font-size"]), i["font-weight"] && (J.fontWeight = i["font-weight"]), i["font-style"] && (J.fontStyle = i["font-style"])
                }
                if ("arrow-start"in i && A(s, i["arrow-start"]), "arrow-end"in i && A(s, i["arrow-end"], 1), null != i.opacity || null != i["stroke-width"] || null != i.fill || null != i.src || null != i.stroke || null != i["stroke-width"] || null != i["stroke-opacity"] || null != i["fill-opacity"] || null != i["stroke-dasharray"] || null != i["stroke-miterlimit"] || null != i["stroke-linejoin"] || null != i["stroke-linecap"]) {
                    var K = l.getElementsByTagName(j), L = !1;
                    if (K = K && K[0], !K && (L = K = F(j)), "image" == e.type && i.src && (K.src = i.src), i.fill && (K.on = !0), (null == K.on || "none" == i.fill || null === i.fill) && (K.on = !1), K.on && i.fill) {
                        var M = b(i.fill).match(c._ISURL);
                        if (M) {
                            K.parentNode == l && l.removeChild(K), K.rotate = !0, K.src = M[1], K.type = "tile";
                            var N = e.getBBox(1);
                            K.position = N.x + n + N.y, e._.fillpos = [N.x, N.y], c._preload(M[1], function () {
                                e._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else K.color = c.getRGB(i.fill).hex, K.src = o, K.type = "solid", c.getRGB(i.fill).error && (s.type in{circle: 1, ellipse: 1} || "r" != b(i.fill).charAt()) && C(s, i.fill, K) && (m.fill = "none", m.gradient = i.fill, K.rotate = !1)
                    }
                    if ("fill-opacity"in i || "opacity"in i) {
                        var O = ((+m["fill-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+c.getRGB(i.fill).o + 1 || 2) - 1);
                        O = h(g(O, 0), 1), K.opacity = O, K.src && (K.color = "none")
                    }
                    l.appendChild(K);
                    var P = l.getElementsByTagName("stroke") && l.getElementsByTagName("stroke")[0], Q = !1;
                    !P && (Q = P = F("stroke")), (i.stroke && "none" != i.stroke || i["stroke-width"] || null != i["stroke-opacity"] || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) && (P.on = !0), ("none" == i.stroke || null === i.stroke || null == P.on || 0 == i.stroke || 0 == i["stroke-width"]) && (P.on = !1);
                    var R = c.getRGB(i.stroke);
                    P.on && i.stroke && (P.color = R.hex), O = ((+m["stroke-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+R.o + 1 || 2) - 1);
                    var S = .75 * (d(i["stroke-width"]) || 1);
                    if (O = h(g(O, 0), 1), null == i["stroke-width"] && (S = m["stroke-width"]), i["stroke-width"] && (P.weight = S), S && 1 > S && (O *= S) && (P.weight = 1), P.opacity = O, i["stroke-linejoin"] && (P.joinstyle = i["stroke-linejoin"] || "miter"), P.miterlimit = i["stroke-miterlimit"] || 8, i["stroke-linecap"] && (P.endcap = "butt" == i["stroke-linecap"] ? "flat" : "square" == i["stroke-linecap"] ? "square" : "round"), i["stroke-dasharray"]) {
                        var T = {"-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot"};
                        P.dashstyle = T[a](i["stroke-dasharray"]) ? T[i["stroke-dasharray"]] : o
                    }
                    Q && l.appendChild(P)
                }
                if ("text" == s.type) {
                    s.paper.canvas.style.display = o;
                    var U = s.paper.span, V = 100, W = m.font && m.font.match(/\d+(?:\.\d*)?(?=px)/);
                    p = U.style, m.font && (p.font = m.font), m["font-family"] && (p.fontFamily = m["font-family"]), m["font-weight"] && (p.fontWeight = m["font-weight"]), m["font-style"] && (p.fontStyle = m["font-style"]), W = d(m["font-size"] || W && W[0]) || 10, p.fontSize = W * V + "px", s.textpath.string && (U.innerHTML = b(s.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var X = U.getBoundingClientRect();
                    s.W = m.w = (X.right - X.left) / V, s.H = m.h = (X.bottom - X.top) / V, s.X = m.x, s.Y = m.y + s.H / 2, ("x"in i || "y"in i) && (s.path.v = c.format("m{0},{1}l{2},{1}", f(m.x * u), f(m.y * u), f(m.x * u) + 1));
                    for (var Y = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Z = 0, $ = Y.length; $ > Z; Z++)if (Y[Z]in i) {
                        s._.dirty = 1;
                        break
                    }
                    switch (m["text-anchor"]) {
                        case"start":
                            s.textpath.style["v-text-align"] = "left", s.bbx = s.W / 2;
                            break;
                        case"end":
                            s.textpath.style["v-text-align"] = "right", s.bbx = -s.W / 2;
                            break;
                        default:
                            s.textpath.style["v-text-align"] = "center", s.bbx = 0
                    }
                    s.textpath.style["v-text-kern"] = !0
                }
            }, C = function (a, f, g) {
                a.attrs = a.attrs || {};
                var h = (a.attrs, Math.pow), i = "linear", j = ".5 .5";
                if (a.attrs.gradient = f, f = b(f).replace(c._radial_gradient, function (a, b, c) {
                    return i = "radial", b && c && (b = d(b), c = d(c), h(b - .5, 2) + h(c - .5, 2) > .25 && (c = e.sqrt(.25 - h(b - .5, 2)) * (2 * (c > .5) - 1) + .5), j = b + n + c), o
                }), f = f.split(/\s*\-\s*/), "linear" == i) {
                    var k = f.shift();
                    if (k = -d(k), isNaN(k))return null
                }
                var l = c._parseDots(f);
                if (!l)return null;
                if (a = a.shape || a.node, l.length) {
                    a.removeChild(g), g.on = !0, g.method = "none", g.color = l[0].color, g.color2 = l[l.length - 1].color;
                    for (var m = [], p = 0, q = l.length; q > p; p++)l[p].offset && m.push(l[p].offset + n + l[p].color);
                    g.colors = m.length ? m.join() : "0% " + g.color, "radial" == i ? (g.type = "gradientTitle", g.focus = "100%", g.focussize = "0 0", g.focusposition = j, g.angle = 0) : (g.type = "gradient", g.angle = (270 - k) % 360), a.appendChild(g)
                }
                return 1
            }, D = function (a, b) {
                this[0] = this.node = a, a.raphael = !0, this.id = c._oid++, a.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = b, this.matrix = c.matrix(), this._ = {transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1}, !b.bottom && (b.bottom = this), this.prev = b.top, b.top && (b.top.next = this), b.top = this, this.next = null
            }, E = c.el;
            D.prototype = E, E.constructor = D, E.transform = function (a) {
                if (null == a)return this._.transform;
                var d, e = this.paper._viewBoxShift, f = e ? "s" + [e.scale, e.scale] + "-1-1t" + [e.dx, e.dy] : o;
                e && (d = a = b(a).replace(/\.{3}|\u2026/g, this._.transform || o)), c._extractTransform(this, f + a);
                var g, h = this.matrix.clone(), i = this.skew, j = this.node, k = ~b(this.attrs.fill).indexOf("-"), l = !b(this.attrs.fill).indexOf("url(");
                if (h.translate(1, 1), l || k || "image" == this.type)if (i.matrix = "1 0 0 1", i.offset = "0 0", g = h.split(), k && g.noRotation || !g.isSimple) {
                    j.style.filter = h.toFilter();
                    var m = this.getBBox(), p = this.getBBox(1), q = m.x - p.x, r = m.y - p.y;
                    j.coordorigin = q * -u + n + r * -u, z(this, 1, 1, q, r, 0)
                } else j.style.filter = o, z(this, g.scalex, g.scaley, g.dx, g.dy, g.rotate); else j.style.filter = o, i.matrix = b(h), i.offset = h.offset();
                return d && (this._.transform = d), this
            }, E.rotate = function (a, c, e) {
                if (this.removed)return this;
                if (null != a) {
                    if (a = b(a).split(k), a.length - 1 && (c = d(a[1]), e = d(a[2])), a = d(a[0]), null == e && (c = e), null == c || null == e) {
                        var f = this.getBBox(1);
                        c = f.x + f.width / 2, e = f.y + f.height / 2
                    }
                    return this._.dirtyT = 1, this.transform(this._.transform.concat([
                        ["r", a, c, e]
                    ])), this
                }
            }, E.translate = function (a, c) {
                return this.removed ? this : (a = b(a).split(k), a.length - 1 && (c = d(a[1])), a = d(a[0]) || 0, c = +c || 0, this._.bbox && (this._.bbox.x += a, this._.bbox.y += c), this.transform(this._.transform.concat([
                    ["t", a, c]
                ])), this)
            }, E.scale = function (a, c, e, f) {
                if (this.removed)return this;
                if (a = b(a).split(k), a.length - 1 && (c = d(a[1]), e = d(a[2]), f = d(a[3]), isNaN(e) && (e = null), isNaN(f) && (f = null)), a = d(a[0]), null == c && (c = a), null == f && (e = f), null == e || null == f)var g = this.getBBox(1);
                return e = null == e ? g.x + g.width / 2 : e, f = null == f ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([
                    ["s", a, c, e, f]
                ])), this._.dirtyT = 1, this
            }, E.hide = function () {
                return!this.removed && (this.node.style.display = "none"), this
            }, E.show = function () {
                return!this.removed && (this.node.style.display = o), this
            }, E._getBBox = function () {
                return this.removed ? {} : {x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H}
            }, E.remove = function () {
                if (!this.removed && this.node.parentNode) {
                    this.paper.__set__ && this.paper.__set__.exclude(this), c.eve.unbind("raphael.*.*." + this.id), c._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var a in this)this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                    this.removed = !0
                }
            }, E.attr = function (b, d) {
                if (this.removed)return this;
                if (null == b) {
                    var e = {};
                    for (var f in this.attrs)this.attrs[a](f) && (e[f] = this.attrs[f]);
                    return e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform, e
                }
                if (null == d && c.is(b, "string")) {
                    if (b == j && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                    for (var g = b.split(k), h = {}, i = 0, m = g.length; m > i; i++)b = g[i], h[b] = b in this.attrs ? this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? this.paper.customAttributes[b].def : c._availableAttrs[b];
                    return m - 1 ? h : h[g[0]]
                }
                if (this.attrs && null == d && c.is(b, "array")) {
                    for (h = {}, i = 0, m = b.length; m > i; i++)h[b[i]] = this.attr(b[i]);
                    return h
                }
                var n;
                null != d && (n = {}, n[b] = d), null == d && c.is(b, "object") && (n = b);
                for (var o in n)l("raphael.attr." + o + "." + this.id, this, n[o]);
                if (n) {
                    for (o in this.paper.customAttributes)if (this.paper.customAttributes[a](o) && n[a](o) && c.is(this.paper.customAttributes[o], "function")) {
                        var p = this.paper.customAttributes[o].apply(this, [].concat(n[o]));
                        this.attrs[o] = n[o];
                        for (var q in p)p[a](q) && (n[q] = p[q])
                    }
                    n.text && "text" == this.type && (this.textpath.string = n.text), B(this, n)
                }
                return this
            }, E.toFront = function () {
                return!this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && c._tofront(this, this.paper), this
            }, E.toBack = function () {
                return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper)), this)
            }, E.insertAfter = function (a) {
                return this.removed ? this : (a.constructor == c.st.constructor && (a = a[a.length - 1]), a.node.nextSibling ? a.node.parentNode.insertBefore(this.node, a.node.nextSibling) : a.node.parentNode.appendChild(this.node), c._insertafter(this, a, this.paper), this)
            }, E.insertBefore = function (a) {
                return this.removed ? this : (a.constructor == c.st.constructor && (a = a[0]), a.node.parentNode.insertBefore(this.node, a.node), c._insertbefore(this, a, this.paper), this)
            }, E.blur = function (a) {
                var b = this.node.runtimeStyle, d = b.filter;
                return d = d.replace(r, o), 0 !== +a ? (this.attrs.blur = a, b.filter = d + n + m + ".Blur(pixelradius=" + (+a || 1.5) + ")", b.margin = c.format("-{0}px 0 0 -{0}px", f(+a || 1.5))) : (b.filter = d, b.margin = 0, delete this.attrs.blur), this
            }, c._engine.path = function (a, b) {
                var c = F("shape");
                c.style.cssText = t, c.coordsize = u + n + u, c.coordorigin = b.coordorigin;
                var d = new D(c, b), e = {fill: "none", stroke: "#000"};
                a && (e.path = a), d.type = "path", d.path = [], d.Path = o, B(d, e), b.canvas.appendChild(c);
                var f = F("skew");
                return f.on = !0, c.appendChild(f), d.skew = f, d.transform(o), d
            }, c._engine.rect = function (a, b, d, e, f, g) {
                var h = c._rectPath(b, d, e, f, g), i = a.path(h), j = i.attrs;
                return i.X = j.x = b, i.Y = j.y = d, i.W = j.width = e, i.H = j.height = f, j.r = g, j.path = h, i.type = "rect", i
            }, c._engine.ellipse = function (a, b, c, d, e) {
                var f = a.path();
                return f.attrs, f.X = b - d, f.Y = c - e, f.W = 2 * d, f.H = 2 * e, f.type = "ellipse", B(f, {cx: b, cy: c, rx: d, ry: e}), f
            }, c._engine.circle = function (a, b, c, d) {
                var e = a.path();
                return e.attrs, e.X = b - d, e.Y = c - d, e.W = e.H = 2 * d, e.type = "circle", B(e, {cx: b, cy: c, r: d}), e
            }, c._engine.image = function (a, b, d, e, f, g) {
                var h = c._rectPath(d, e, f, g), i = a.path(h).attr({stroke: "none"}), k = i.attrs, l = i.node, m = l.getElementsByTagName(j)[0];
                return k.src = b, i.X = k.x = d, i.Y = k.y = e, i.W = k.width = f, i.H = k.height = g, k.path = h, i.type = "image", m.parentNode == l && l.removeChild(m), m.rotate = !0, m.src = b, m.type = "tile", i._.fillpos = [d, e], i._.fillsize = [f, g], l.appendChild(m), z(i, 1, 1, 0, 0, 0), i
            }, c._engine.text = function (a, d, e, g) {
                var h = F("shape"), i = F("path"), j = F("textpath");
                d = d || 0, e = e || 0, g = g || "", i.v = c.format("m{0},{1}l{2},{1}", f(d * u), f(e * u), f(d * u) + 1), i.textpathok = !0, j.string = b(g), j.on = !0, h.style.cssText = t, h.coordsize = u + n + u, h.coordorigin = "0 0";
                var k = new D(h, a), l = {fill: "#000", stroke: "none", font: c._availableAttrs.font, text: g};
                k.shape = h, k.path = i, k.textpath = j, k.type = "text", k.attrs.text = b(g), k.attrs.x = d, k.attrs.y = e, k.attrs.w = 1, k.attrs.h = 1, B(k, l), h.appendChild(j), h.appendChild(i), a.canvas.appendChild(h);
                var m = F("skew");
                return m.on = !0, h.appendChild(m), k.skew = m, k.transform(o), k
            }, c._engine.setSize = function (a, b) {
                var d = this.canvas.style;
                return this.width = a, this.height = b, a == +a && (a += "px"), b == +b && (b += "px"), d.width = a, d.height = b, d.clip = "rect(0 " + a + " " + b + " 0)", this._viewBox && c._engine.setViewBox.apply(this, this._viewBox), this
            }, c._engine.setViewBox = function (a, b, d, e, f) {
                c.eve("raphael.setViewBox", this, this._viewBox, [a, b, d, e, f]);
                var h, i, j = this.width, k = this.height, l = 1 / g(d / j, e / k);
                return f && (h = k / e, i = j / d, j > d * h && (a -= (j - d * h) / 2 / h), k > e * i && (b -= (k - e * i) / 2 / i)), this._viewBox = [a, b, d, e, !!f], this._viewBoxShift = {dx: -a, dy: -b, scale: l}, this.forEach(function (a) {
                    a.transform("...")
                }), this
            };
            var F;
            c._engine.initWin = function (a) {
                var b = a.document;
                b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), F = function (a) {
                        return b.createElement("<rvml:" + a + ' class="rvml">')
                    }
                } catch (c) {
                    F = function (a) {
                        return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                    }
                }
            }, c._engine.initWin(c._g.win), c._engine.create = function () {
                var a = c._getContainer.apply(0, arguments), b = a.container, d = a.height, e = a.width, f = a.x, g = a.y;
                if (!b)throw new Error("VML container not found.");
                var h = new c._Paper, i = h.canvas = c._g.doc.createElement("div"), j = i.style;
                return f = f || 0, g = g || 0, e = e || 512, d = d || 342, h.width = e, h.height = d, e == +e && (e += "px"), d == +d && (d += "px"), h.coordsize = 1e3 * u + n + 1e3 * u, h.coordorigin = "0 0", h.span = c._g.doc.createElement("span"), h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", i.appendChild(h.span), j.cssText = c.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", e, d), 1 == b ? (c._g.doc.body.appendChild(i), j.left = f + "px", j.top = g + "px", j.position = "absolute") : b.firstChild ? b.insertBefore(i, b.firstChild) : b.appendChild(i), h.renderfix = function () {
                }, h
            }, c.prototype.clear = function () {
                c.eve("raphael.clear", this), this.canvas.innerHTML = o, this.span = c._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
            }, c.prototype.remove = function () {
                c.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                for (var a in this)this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                return!0
            };
            var G = c.st;
            for (var H in E)E[a](H) && !G[a](H) && (G[H] = function (a) {
                return function () {
                    var b = arguments;
                    return this.forEach(function (c) {
                        c[a].apply(c, b)
                    })
                }
            }(H))
        }
    }(), B.was ? A.win.Raphael = c : Raphael = c, c
});

//Open Sans Font (used for scalable location labels) /*! * Copyright: * Copyleft 2002, 2003, 2005, 2008, 2009, 2010 Free Software Foundation.* * Manufacturer: * GNU * * Vendor URL:* https://savannah.gnu.org/projects/freefont/ * * License information: * http://www.gnu.org/copyleft/gpl.html*/
Raphael.registerFont({"w": 200, "face": {"font-family": "FreeSans", "font-weight": 400, "font-stretch": "normal", "units-per-em": "360", "panose-1": "2 11 5 4 2 2 2 2 2 4", "ascent": "288", "descent": "-72", "x-height": "8", "bbox": "-8 -277 342.017 78.0413", "underline-thickness": "18", "underline-position": "-54.36", "stemh": "30", "stemv": "33", "unicode-range": "U+0020-U+007E"}, "glyphs": {" ": {"w": 100}, "!": {"d": "75,-262r0,121r-8,81r-14,0v-8,-62,-9,-131,-8,-202r30,0xm75,-37r0,37r-30,0r0,-37r30,0", "w": 100}, "\"": {"d": "19,-255r33,0v2,35,-4,62,-10,88r-14,0v-6,-27,-11,-54,-9,-88xm76,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88", "w": 127}, "#": {"d": "175,-251r-13,71r33,0r0,24r-38,0r-11,63r38,0r0,24r-43,0r-14,76r-27,0r14,-76r-45,0r-14,76r-27,0r13,-76r-36,0r0,-24r41,0r11,-63r-39,0r0,-24r44,0r13,-71r27,0r-13,71r45,0r13,-71r28,0xm130,-156r-45,0r-12,63r45,0"}, "$": {"d": "87,-114v-48,-13,-70,-26,-70,-72v0,-41,24,-66,70,-72r0,-19r22,0r0,19v44,3,70,30,70,71r-29,0v0,-26,-17,-45,-41,-46r0,90v22,6,77,15,77,73v0,46,-26,74,-77,78r0,37r-22,0r0,-37v-51,-4,-77,-32,-75,-83r28,0v2,24,3,52,47,58r0,-97xm87,-146r0,-86v-27,4,-41,19,-41,43v0,22,13,35,41,43xm109,-17v33,-4,48,-24,48,-49v0,-24,-11,-34,-48,-45r0,94"}, "%": {"d": "72,-247v35,0,61,28,61,63v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-34,29,-62,62,-62xm72,-221v-20,0,-37,16,-37,36v0,20,17,36,37,36v20,0,36,-16,36,-36v0,-21,-15,-36,-36,-36xm219,-255r24,0r-142,262r-24,0xm248,-116v35,0,61,27,61,62v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-33,29,-61,62,-61xm248,-91v-20,0,-37,16,-37,36v0,20,17,37,37,37v20,0,36,-17,36,-36v0,-21,-15,-37,-36,-37", "w": 320}, "&": {"d": "168,-28v-12,11,-34,36,-75,36v-44,0,-74,-28,-74,-71v0,-33,13,-51,58,-77v-22,-28,-29,-42,-29,-59v0,-32,27,-56,61,-56v34,0,59,23,59,56v0,26,-13,42,-50,63r48,59v7,-13,11,-29,11,-43r29,0v0,22,-8,45,-21,66r44,54r-39,0xm103,-155v28,-18,37,-28,37,-44v0,-18,-14,-31,-32,-31v-19,0,-31,12,-31,31v0,13,4,19,26,44xm150,-49r-57,-72v-33,21,-44,35,-44,55v0,52,70,62,101,17", "w": 240}, "'": {"d": "17,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88", "w": 68}, "(": {"d": "85,-262r20,0v-66,104,-66,235,0,338r-20,0v-77,-98,-77,-240,0,-338", "w": 119}, ")": {"d": "33,76r-19,0v65,-104,65,-235,0,-338r19,0v77,98,77,240,0,338", "w": 119}, "*": {"d": "58,-262r22,0r-2,40r39,-14r6,21r-38,11r25,32r-19,13r-22,-33r-23,33r-18,-13r25,-32r-39,-11r7,-21r38,14", "w": 140}, "+": {"d": "192,-96r0,25r-74,0r0,75r-25,0r0,-75r-75,0r0,-25r75,0r0,-75r25,0r0,75r74,0", "w": 210}, ",": {"d": "31,-37r38,0v1,42,3,94,-38,90r0,-14v19,1,23,-13,22,-39r-22,0r0,-37", "w": 100}, "-": {"d": "102,-112r0,26r-85,0r0,-26r85,0", "w": 119, "k": {"A": 18, "V": 18, "W": 18, "Y": 18, "C": 7, "G": 7, "O": 7, "Q": 7, "a": 14, "g": 14, "v": 22, "w": 22, "y": 22, "T": 18, "J": 7, "j": 11, "x": 18, "m": 14, "n": 14, "p": 14, "r": 14, "u": 14, "z": 14, "s": 18, "f": 14, "t": 14, "X": 18, "Z": 18, "S": 4}}, ".": {"d": "69,-37r0,37r-38,0r0,-37r38,0", "w": 100}, "\/": {"d": "82,-262r20,0r-85,269r-20,0", "w": 100}, "0": {"d": "15,-123v0,-112,48,-132,84,-132v63,0,84,60,84,134v0,84,-30,129,-84,129v-55,0,-84,-45,-84,-131xm99,-227v-34,0,-51,34,-51,104v0,70,17,105,50,105v35,0,52,-34,52,-106v0,-68,-17,-103,-51,-103"}, "1": {"d": "93,-182r-56,0r0,-22v49,-6,56,-12,67,-51r21,0r0,255r-32,0r0,-182"}, "2": {"d": "18,-167v2,-77,49,-88,84,-88v48,0,82,31,82,75v0,45,-51,77,-90,96v-33,16,-43,32,-46,53r134,0r0,31r-170,0v-4,-69,48,-103,105,-129v51,-24,43,-98,-16,-99v-44,0,-50,37,-51,61r-32,0"}, "3": {"d": "97,-228v-40,0,-47,27,-48,55r-32,0v1,-54,29,-82,80,-82v79,0,107,98,42,123v31,10,43,29,43,61v0,48,-33,79,-86,79v-53,0,-80,-27,-84,-82r31,0v2,37,19,54,54,54v33,0,53,-19,53,-51v0,-37,-28,-49,-70,-46r0,-27v42,-1,62,-7,62,-40v0,-27,-17,-44,-45,-44"}, "4": {"d": "118,-61r-108,0r0,-34r116,-160r23,0r0,165r38,0r0,29r-38,0r0,61r-31,0r0,-61xm118,-90r0,-111r-80,111r80,0"}, "5": {"d": "171,-255r0,31r-106,0r-10,71v55,-39,130,2,130,70v0,54,-37,91,-88,91v-72,0,-81,-54,-84,-71r31,0v8,29,24,43,52,43v35,0,56,-22,56,-59v0,-61,-71,-82,-102,-37r-29,0r19,-139r131,0"}, "6": {"d": "15,-116v0,-118,55,-139,92,-139v39,0,66,24,72,66r-31,0v-5,-24,-21,-38,-43,-38v-36,0,-57,35,-57,97v39,-56,137,-25,137,52v0,50,-35,86,-84,86v-64,0,-86,-52,-86,-124xm103,-131v-31,0,-53,22,-53,54v0,33,22,57,52,57v29,0,50,-23,50,-55v0,-34,-18,-56,-49,-56"}, "7": {"d": "187,-255r0,26v-58,77,-89,147,-103,229r-34,0v19,-84,43,-137,104,-224r-137,0r0,-31r170,0"}, "8": {"d": "141,-134v78,31,43,142,-42,142v-85,0,-120,-111,-42,-142v-67,-32,-31,-121,42,-121v73,0,109,89,42,121xm99,-227v-27,0,-44,16,-44,40v0,24,17,40,44,40v27,0,44,-15,44,-39v0,-25,-17,-41,-44,-41xm99,-120v-32,0,-53,20,-53,50v0,30,21,50,52,50v32,0,54,-20,54,-50v0,-30,-21,-50,-53,-50"}, "9": {"d": "183,-131v0,118,-55,139,-92,139v-39,0,-66,-24,-72,-66r32,0v5,24,21,38,43,38v36,0,56,-35,56,-97v-42,57,-136,24,-136,-52v0,-50,34,-86,83,-86v63,0,86,51,86,124xm97,-228v-29,0,-51,24,-51,56v0,34,19,56,50,56v31,0,53,-23,53,-54v0,-33,-22,-58,-52,-58"}, ":": {"d": "77,-37r0,37r-37,0r0,-37r37,0xm77,-189r0,38r-37,0r0,-38r37,0", "w": 100}, ";": {"d": "77,-189r0,38r-37,0r0,-38r37,0xm40,-37r37,0v1,42,4,94,-37,90r0,-14v19,1,22,-14,21,-39r-21,0r0,-37", "w": 100}, "<": {"d": "16,-71r0,-25r176,-75r0,29r-142,58r142,59r0,28", "w": 210}, "=": {"d": "192,-127r0,25r-174,0r0,-25r174,0xm192,-65r0,25r-174,0r0,-25r174,0", "w": 210}, ">": {"d": "194,-96r0,25r-176,74r0,-28r142,-58r-142,-59r0,-29", "w": 210}, "?": {"d": "183,-198v-1,67,-74,62,-64,126r-33,0v-11,-67,63,-75,65,-126v0,-24,-18,-41,-46,-41v-37,0,-47,24,-47,56r-30,0v0,-55,27,-84,79,-84v47,0,76,27,76,69xm119,-37r0,37r-33,0r0,-37r33,0"}, "@": {"d": "342,-133v1,52,-42,112,-98,112v-23,0,-36,-9,-39,-27v-37,49,-110,23,-110,-40v0,-69,99,-143,136,-69r8,-23r30,0r-36,118v0,9,8,16,18,16v31,0,60,-41,60,-83v0,-60,-58,-110,-127,-110v-76,0,-141,65,-141,141v1,93,102,146,204,110r10,24v-112,47,-245,-21,-245,-129v0,-92,83,-174,177,-174v84,0,153,61,153,134xm163,-45v34,0,56,-56,56,-87v0,-18,-15,-33,-34,-33v-50,0,-88,120,-22,120", "w": 365}, "A": {"d": "171,-79r-102,0r-27,79r-36,0r94,-262r43,0r92,262r-37,0xm161,-107r-40,-119r-43,119r83,0", "w": 240, "k": {"V": 22, "W": 22, "Y": 22, "C": 14, "G": 14, "O": 14, "Q": 14, "e": 7, "a": 7, "g": 7, "v": 11, "w": 11, "y": 11, "T": 14, "m": 11, "n": 11, "z": 11, "s": 7, "f": 11, "t": 11, "X": 4, "Z": 4, "S": 11, "r": 11, "p": 7, "u": 9, "c": 4, "o": 5, "d": 2, "q": 2, "I": 14, ",": 7, ".": 7, "-": 18}}, "B": {"d": "224,-75v0,45,-31,75,-77,75r-119,0r0,-262r107,0v96,2,98,94,41,123v33,13,48,32,48,64xm179,-191v-2,-58,-65,-39,-117,-42r0,84v51,-2,118,13,117,-42xm144,-30v70,-2,59,-90,0,-90r-82,0r0,90r82,0", "w": 240, "k": {"A": 11, "V": 18, "W": 18, "Y": 18, "C": 11, "G": 11, "O": 11, "Q": 11, "a": 4, "g": 4, "v": 11, "w": 11, "y": 11, "T": 18, "j": 7, "x": 11, "m": 11, "n": 11, "z": 11, "s": 4, "f": 4, "t": 4, "X": 18, "Z": 18, "S": 7, "r": 7, "p": 4, "u": 7, "o": 2, "I": 11, ",": 18, ".": 18, "-": 7}}, "C": {"d": "17,-128v0,-55,24,-139,120,-139v58,0,91,28,101,86r-34,0v-8,-37,-29,-56,-71,-56v-51,0,-82,41,-82,108v0,66,33,108,85,108v44,0,65,-25,73,-75r35,0v-8,69,-44,104,-108,104v-95,0,-119,-82,-119,-136", "w": 259, "k": {"A": 14, "V": 18, "W": 18, "Y": 18, "C": 7, "G": 7, "O": 7, "Q": 7, "a": 7, "g": 7, "v": 4, "w": 4, "y": 4, "T": 14, "j": 11, "x": 11, "m": 11, "n": 11, "z": 11, "s": 7, "f": 7, "t": 7, "X": 14, "Z": 14, "S": 4, "r": 7, "p": 7, "u": 9, "o": 2, "I": 14, ",": 11, ".": 11}}, "D": {"d": "32,0r0,-262r101,0v67,0,107,50,107,131v0,82,-41,131,-107,131r-101,0xm66,-30v88,7,141,-7,141,-101v0,-94,-52,-109,-141,-102r0,203", "w": 259, "k": {"A": 18, "V": 18, "W": 18, "Y": 18, "C": 7, "G": 7, "O": 7, "Q": 7, "e": 4, "a": 9, "g": 9, "v": 4, "w": 4, "y": 4, "T": 18, "J": 4, "j": 4, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 4, "t": 4, "X": 20, "Z": 20, "S": 11, "r": 14, "p": 9, "u": 13, "c": 4, "o": 4, "d": 2, "q": 2, "I": 20, ",": 11, ".": 11}}, "E": {"d": "66,-120r0,90r155,0r0,30r-189,0r0,-262r182,0r0,29r-148,0r0,84r143,0r0,29r-143,0", "w": 240, "k": {"A": 11, "V": 18, "W": 18, "Y": 18, "C": 14, "G": 14, "O": 14, "Q": 14, "e": 11, "a": 11, "g": 11, "v": 14, "w": 14, "y": 14, "T": 7, "J": 7, "j": 11, "x": 11, "m": 14, "n": 14, "z": 14, "s": 7, "f": 11, "t": 11, "X": 11, "Z": 11, "S": 18, "r": 11, "p": 7, "u": 16, "c": 11, "o": 13, "d": 9, "q": 9, "I": 14}}, "F": {"d": "66,-120r0,120r-34,0r0,-262r176,0r0,29r-142,0r0,84r125,0r0,29r-125,0", "w": 219, "k": {"A": 14, "V": 7, "W": 7, "Y": 7, "C": 11, "G": 11, "O": 11, "Q": 11, "e": 14, "a": 11, "g": 11, "v": 4, "w": 4, "y": 4, "J": 11, "j": 7, "x": 14, "m": 18, "n": 18, "z": 18, "s": 14, "f": 7, "t": 7, "X": 11, "Z": 11, "S": 14, "r": 14, "p": 11, "u": 18, "c": 11, "o": 13, "d": 9, "q": 9, "I": 14, ",": 22, ".": 22, "-": 11}}, "G": {"d": "49,-130v0,42,19,109,94,109v50,-1,86,-35,83,-88r-80,0r0,-30r109,0r0,140r-21,0r-8,-34v-74,85,-210,29,-210,-96v0,-53,25,-138,126,-138v60,0,101,31,110,84r-35,0v-7,-34,-36,-54,-76,-54v-55,0,-92,43,-92,107", "w": 280, "k": {"A": 14, "V": 18, "W": 18, "Y": 18, "C": 7, "G": 7, "O": 7, "Q": 7, "a": 7, "g": 7, "v": 4, "w": 4, "y": 4, "T": 14, "j": 11, "x": 11, "m": 11, "n": 11, "z": 11, "s": 7, "f": 7, "t": 7, "X": 14, "Z": 14, "S": 4, "r": 7, "p": 7, "u": 9, "o": 2, "I": 14, ",": 11, ".": 11}}, "H": {"d": "198,-120r-135,0r0,120r-33,0r0,-262r33,0r0,113r135,0r0,-113r34,0r0,262r-34,0r0,-120", "w": 259}, "I": {"d": "70,-262r0,262r-34,0r0,-262r34,0", "w": 100, "k": {"A": 14, "V": 14, "W": 14, "Y": 14, "C": 9, "G": 9, "O": 9, "Q": 9, "e": 11, "a": 11, "g": 11, "v": 7, "w": 7, "y": 7, "T": 4, "x": 11, "m": 11, "n": 11, "z": 11, "s": 11, "f": 4, "t": 4, "X": 14, "Z": 14, "S": 13, "r": 11, "p": 11, "u": 14, "c": 7, "o": 7, "d": 7, "q": 7, "I": 14}}, "J": {"d": "80,-20v33,0,40,-25,40,-58r0,-184r33,0r0,196v0,45,-28,74,-74,74v-54,-1,-79,-35,-73,-92r34,0v-3,37,9,64,40,64", "w": 180, "k": {"A": 11, "V": 18, "W": 18, "Y": 18, "C": 11, "G": 11, "O": 11, "Q": 11, "e": 7, "a": 9, "g": 9, "v": 11, "w": 11, "y": 11, "j": 7, "x": 18, "m": 14, "n": 14, "z": 14, "s": 7, "X": 18, "Z": 18, "S": 11, "r": 11, "p": 7, "u": 14, "c": 7, "o": 9, "d": 5, "q": 5, "I": 14}}, "K": {"d": "62,-92r0,92r-34,0r0,-262r34,0r0,132r131,-132r43,0r-107,106r108,156r-40,0r-92,-135", "w": 240, "k": {"C": 18, "G": 18, "O": 18, "Q": 18, "e": 14, "a": 11, "g": 11, "v": 11, "w": 11, "y": 11, "j": 4, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 11, "t": 11, "S": 18, "r": 14, "p": 11, "u": 14, "c": 14, "o": 16, "d": 13, "q": 13, "I": 14, ",": 14, ".": 14, "-": 18}}, "L": {"d": "62,-262r0,232r130,0r0,30r-163,0r0,-262r33,0", "k": {"V": 22, "W": 22, "Y": 22, "C": 14, "G": 14, "O": 14, "Q": 14, "e": 11, "a": 7, "g": 7, "v": 14, "w": 14, "y": 14, "T": 14, "j": 4, "m": 14, "n": 14, "z": 14, "s": 7, "f": 11, "t": 11, "S": 14, "r": 11, "u": 14, "c": 11, "o": 13, "d": 9, "q": 9, "I": 11, ",": 7, ".": 7, "-": 22}}, "M": {"d": "168,0r-35,0r-74,-220r0,220r-32,0r0,-262r46,0r78,228r77,-228r46,0r0,262r-32,0r0,-220", "w": 299}, "N": {"d": "233,-262r0,262r-38,0r-136,-213r0,213r-32,0r0,-262r37,0r137,214r0,-214r32,0", "w": 259}, "O": {"d": "267,-127v0,76,-49,135,-127,135v-76,0,-126,-55,-126,-137v0,-82,51,-138,126,-138v77,0,127,55,127,140xm140,-237v-55,0,-93,43,-93,108v0,65,37,108,93,108v55,0,94,-44,94,-107v0,-66,-37,-109,-94,-109", "w": 280, "k": {"A": 11, "V": 14, "W": 14, "Y": 14, "a": 7, "g": 7, "T": 14, "m": 7, "n": 7, "z": 7, "X": 18, "Z": 18, "S": 7, "r": 7, "p": 4, "u": 5, "I": 11, ",": 11, ".": 11}}, "P": {"d": "222,-185v0,45,-30,74,-73,74r-83,0r0,111r-33,0r0,-262r108,0v52,0,81,28,81,77xm66,-141v54,0,121,10,121,-46v0,-55,-67,-46,-121,-46r0,92", "w": 240, "k": {"A": 22, "V": 14, "W": 14, "Y": 14, "C": 7, "G": 7, "O": 7, "Q": 7, "e": 14, "a": 18, "g": 18, "T": 11, "J": 14, "x": 14, "m": 14, "n": 14, "z": 14, "s": 11, "X": 22, "Z": 22, "S": 11, "r": 11, "p": 7, "u": 14, "c": 14, "o": 16, "d": 13, "q": 13, "I": 14, ",": 36, ".": 36, "-": 25}}, "Q": {"d": "264,0r-17,21r-38,-31v-90,51,-195,-9,-195,-119v0,-82,50,-138,126,-138v120,0,165,162,90,240xm173,-74r32,26v57,-58,26,-189,-65,-189v-56,0,-93,43,-93,108v0,82,65,130,136,98r-26,-23", "w": 280, "k": {"A": 11, "V": 14, "W": 14, "Y": 14, "a": 7, "g": 7, "T": 14, "m": 7, "n": 7, "z": 7, "X": 18, "Z": 18, "S": 7, "r": 7, "p": 4, "u": 5, "I": 11, ",": 11, ".": 11}}, "R": {"d": "193,-130v61,21,15,85,51,122r0,8r-40,0v-16,-38,10,-113,-51,-113r-86,0r0,113r-34,0r0,-262v86,2,201,-20,201,70v0,30,-11,48,-41,62xm199,-188v-3,-67,-75,-39,-132,-45r0,90v55,-3,135,16,132,-45", "w": 259, "k": {"A": 4, "V": 18, "W": 18, "Y": 18, "C": 4, "G": 4, "O": 4, "Q": 4, "e": 4, "a": 4, "g": 4, "v": 4, "w": 4, "y": 4, "T": 7, "j": 4, "m": 4, "n": 4, "z": 4, "s": 4, "X": 7, "Z": 7, "S": 7, "r": 7, "p": 4, "u": 14, "c": 11, "o": 13, "d": 9, "q": 9, "I": 14}}, "S": {"d": "123,-21v57,0,67,-29,67,-48v0,-69,-165,-32,-165,-121v0,-48,35,-77,93,-77v60,0,97,31,97,82r-32,0v0,-34,-24,-54,-66,-54v-35,0,-58,18,-58,45v0,40,74,45,109,56v35,12,56,34,56,66v0,32,-21,80,-103,80v-45,0,-103,-17,-104,-92v10,2,26,-3,32,2v0,27,15,61,74,61", "w": 240, "k": {"A": 11, "V": 18, "W": 18, "Y": 18, "C": 7, "G": 7, "O": 7, "Q": 7, "v": 7, "w": 7, "y": 7, "T": 14, "j": 4, "x": 14, "m": 7, "n": 7, "z": 7, "f": 4, "t": 4, "X": 18, "Z": 18, "S": 4, "r": 7, "p": 4, "u": 9, "o": 2, "I": 14, ",": 22, ".": 22, "-": 11}}, "T": {"d": "127,-233r0,233r-33,0r0,-233r-86,0r0,-29r205,0r0,29r-86,0", "w": 219, "k": {"A": 18, "V": 4, "W": 4, "Y": 4, "C": 14, "G": 14, "O": 14, "Q": 14, "e": 14, "a": 14, "g": 14, "v": 7, "w": 7, "y": 7, "J": 14, "x": 11, "m": 14, "n": 14, "z": 14, "s": 14, "f": 7, "t": 7, "X": 14, "Z": 14, "S": 14, "r": 14, "p": 11, "u": 14, "c": 14, "o": 16, "d": 13, "q": 13, "I": 11, ",": 22, ".": 22, "-": 18}}, "U": {"d": "199,-262r33,0r0,184v0,53,-39,86,-101,86v-62,0,-100,-33,-100,-86r0,-184r33,0r0,184v0,40,28,57,67,57v42,0,68,-22,68,-57r0,-184", "w": 259}, "V": {"d": "141,0r-36,0r-94,-262r36,0r77,222r73,-222r35,0", "w": 240, "k": {"A": 22, "C": 18, "G": 18, "O": 18, "Q": 18, "e": 18, "a": 18, "g": 18, "v": 7, "w": 7, "y": 7, "J": 11, "x": 11, "m": 22, "n": 22, "z": 22, "s": 14, "f": 7, "t": 7, "X": 11, "Z": 11, "S": 18, "r": 22, "p": 14, "u": 18, "c": 16, "o": 18, "d": 14, "q": 14, "I": 14, ",": 22, ".": 22, "-": 18}}, "W": {"d": "268,0r-37,0r-60,-216r-59,216r-37,0r-67,-262r37,0r50,213r58,-213r36,0r60,213r48,-213r37,0", "w": 339, "k": {"A": 22, "C": 18, "G": 18, "O": 18, "Q": 18, "e": 18, "a": 18, "g": 18, "v": 7, "w": 7, "y": 7, "J": 11, "x": 11, "m": 22, "n": 22, "z": 22, "s": 14, "f": 7, "t": 7, "X": 11, "Z": 11, "S": 18, "r": 22, "p": 14, "u": 18, "c": 16, "o": 18, "d": 14, "q": 14, "I": 14, ",": 22, ".": 22, "-": 18}}, "X": {"d": "141,-135r93,135r-42,0r-71,-109r-72,109r-41,0r93,-135r-87,-127r40,0r68,103r67,-103r40,0", "w": 240, "k": {"C": 18, "G": 18, "O": 18, "Q": 18, "e": 14, "a": 11, "g": 11, "v": 11, "w": 11, "y": 11, "j": 4, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 11, "t": 11, "S": 18, "r": 14, "p": 11, "u": 14, "c": 14, "o": 16, "d": 13, "q": 13, "I": 14, ",": 14, ".": 14, "-": 18}}, "Y": {"d": "139,-103r0,103r-33,0r0,-103r-101,-159r41,0r77,127r75,-127r40,0", "w": 240, "k": {"A": 22, "C": 18, "G": 18, "O": 18, "Q": 18, "e": 18, "a": 18, "g": 18, "v": 7, "w": 7, "y": 7, "J": 11, "x": 11, "m": 22, "n": 22, "z": 22, "s": 14, "f": 7, "t": 7, "X": 11, "Z": 11, "S": 18, "r": 22, "p": 14, "u": 18, "c": 16, "o": 18, "d": 14, "q": 14, "I": 14, ",": 22, ".": 22, "-": 18}}, "Z": {"d": "209,-262r0,30r-157,202r158,0r0,30r-200,0r0,-30r158,-203r-148,0r0,-29r189,0", "w": 219, "k": {"C": 18, "G": 18, "O": 18, "Q": 18, "e": 14, "a": 11, "g": 11, "v": 11, "w": 11, "y": 11, "j": 4, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 11, "t": 11, "S": 18, "r": 14, "p": 11, "u": 14, "c": 14, "o": 16, "d": 13, "q": 13, "I": 14, ",": 14, ".": 14, "-": 18}}, "[": {"d": "90,-262r0,25r-37,0r0,287r37,0r0,26r-67,0r0,-338r67,0", "w": 100}, "\\": {"d": "17,-262r85,269r-20,0r-85,-269r20,0", "w": 100}, "]": {"d": "8,76r0,-26r37,0r0,-287r-37,0r0,-25r67,0r0,338r-67,0", "w": 99}, "^": {"d": "71,-255r26,0r56,137r-25,0r-44,-108r-43,108r-25,0", "w": 168}, "_": {"d": "208,45r0,18r-216,0r0,-18r216,0"}, "`": {"d": "49,-266r34,53r-21,0r-54,-53r41,0", "w": 119}, "a": {"d": "23,-133v2,-51,42,-61,76,-61v46,0,71,18,71,51r0,111v0,11,11,18,23,14r0,23v-27,8,-50,3,-52,-24v-38,43,-127,34,-126,-29v0,-50,39,-54,94,-61v28,-4,32,-8,31,-29v0,-18,-15,-28,-42,-28v-28,0,-41,10,-44,33r-31,0xm84,-18v52,0,60,-28,56,-75v-31,14,-94,4,-94,45v0,19,15,30,38,30", "k": {"a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "x": 4, "m": 4, "n": 4, "z": 4, "s": 4, "f": 4, "t": 4, "r": 4, "u": 4, "c": 5, "o": 7, "d": 4, "q": 4, ",": 7, ".": 7, "-": 14}}, "b": {"d": "19,-262r30,0r0,99v45,-63,139,-24,139,68v0,95,-95,137,-142,71r0,24r-27,0r0,-262xm102,-166v-32,0,-53,29,-53,73v0,44,21,73,53,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74", "k": {"v": 4, "w": 4, "y": 4, "j": 4, "x": 4, "m": 4, "n": 4, "z": 4, "r": 4, "u": 4, ",": 11, ".": 11}}, "c": {"d": "170,-125r-31,0v-4,-26,-19,-41,-44,-41v-33,0,-53,28,-53,75v0,80,89,100,99,26r31,0v-4,46,-32,73,-77,73v-51,0,-84,-38,-84,-99v0,-63,33,-103,84,-103v43,0,71,24,75,69", "w": 180, "k": {"x": 4, "m": 4, "n": 4, "z": 4, "r": 4, "u": 2, ",": 7, ".": 7}}, "d": {"d": "178,-262r0,262r-26,0r0,-25v-47,67,-143,26,-143,-70v0,-90,93,-131,139,-70r0,-97r30,0xm95,-166v-33,0,-54,29,-54,73v0,44,22,73,55,73v32,0,52,-28,52,-72v0,-45,-21,-74,-53,-74", "k": {"e": 4, "a": 4, "g": 4, "m": 4, "n": 4, "z": 4, "s": 4, "r": 4, "p": 2, "u": 5}}, "e": {"d": "46,-84v-7,69,87,90,104,27r31,0v-8,41,-38,65,-81,65v-53,0,-86,-38,-86,-100v0,-107,130,-137,163,-52v5,14,8,31,8,60r-139,0xm46,-109v34,-2,77,4,107,-2v0,-31,-23,-55,-53,-55v-30,0,-51,22,-54,57", "k": {"a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "j": 7, "x": 7, "m": 7, "n": 7, "z": 7, "s": 4, "f": 4, "t": 4, "r": 4, "p": 4, "u": 7, ",": 14, ".": 14, "-": 4}}, "f": {"d": "93,-189r0,25r-31,0r0,164r-30,0r0,-164r-26,0r0,-25r26,0v-6,-49,11,-85,61,-73r0,25v-32,-6,-33,18,-31,48r31,0", "w": 100, "k": {"e": 9, "a": 7, "g": 7, "x": 7, "m": 4, "n": 4, "z": 4, "s": 7, "r": 4, "u": 2, "c": 4, "o": 5, "d": 2, "q": 2, ",": 22, ".": 22, "-": 22}}, "g": {"d": "145,-26v-45,69,-135,28,-135,-65v0,-91,92,-139,138,-70r0,-28r28,0v-11,109,42,270,-84,267v-44,0,-72,-20,-75,-56r30,0v5,31,37,31,46,31v46,1,53,-32,52,-79xm94,-166v-32,0,-52,28,-52,73v0,46,19,74,52,74v32,0,51,-28,51,-73v0,-47,-19,-74,-51,-74", "k": {"e": 4, "c": 4, "o": 4, "d": 2, "q": 2, ",": 14, ".": 14, "-": 22}}, "h": {"d": "145,-131v0,-30,-24,-37,-39,-37v-66,-2,-49,101,-51,168r-30,0r0,-262r30,0r0,99v27,-48,120,-40,120,20r0,143r-30,0r0,-131", "k": {"e": 5, "v": 7, "w": 7, "y": 7, "j": 7, "x": 7, "m": 9, "n": 9, "z": 9, "s": 7, "r": 7, "p": 4, "u": 7, "c": 7, "o": 9, "d": 5, "q": 5, ",": 11, ".": 11, "-": 22}}, "i": {"d": "54,-189r0,189r-30,0r0,-189r30,0xm54,-262r0,37r-30,0r0,-37r30,0", "w": 79}, "j": {"d": "25,-189r30,0r0,228v2,29,-26,43,-61,38r0,-25v20,3,31,-3,31,-25r0,-216xm55,-262r0,37r-30,0r0,-37r30,0", "w": 79}, "k": {"d": "51,-262r0,153r80,-80r38,0r-65,66r77,123r-37,0r-64,-102r-29,29r0,73r-30,0r0,-262r30,0", "w": 180, "k": {"e": 7, "a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "m": 7, "n": 7, "z": 7, "s": 4, "r": 7, "p": 4, "u": 7, "c": 7, "o": 9, "d": 5, "q": 5, ",": 14, ".": 14, "-": 22}}, "l": {"d": "55,-262r0,262r-31,0r0,-262r31,0", "w": 79}, "m": {"d": "25,-189r28,0r0,27v24,-41,87,-44,109,-3v29,-45,112,-39,112,24r0,141r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-40,104,-44,168r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-41,103,-45,168r-30,0r0,-189", "w": 299, "k": {"e": 5, "v": 7, "w": 7, "y": 7, "j": 7, "x": 7, "m": 9, "n": 9, "z": 9, "s": 7, "r": 7, "p": 4, "u": 7, "c": 7, "o": 9, "d": 5, "q": 5, ",": 11, ".": 11, "-": 22}}, "n": {"d": "25,-189r28,0r0,32v23,-54,122,-48,122,14r0,143r-30,0r0,-131v0,-23,-14,-37,-38,-37v-67,-2,-51,100,-52,168r-30,0r0,-189", "k": {"e": 5, "v": 7, "w": 7, "y": 7, "j": 7, "x": 7, "m": 9, "n": 9, "z": 9, "s": 7, "r": 7, "p": 4, "u": 7, "c": 7, "o": 9, "d": 5, "q": 5, ",": 11, ".": 11, "-": 22}}, "o": {"d": "98,-194v54,0,86,38,86,103v0,62,-33,99,-86,99v-54,0,-85,-38,-85,-101v0,-63,32,-101,85,-101xm98,-166v-33,0,-54,28,-54,73v0,46,21,74,54,74v33,0,54,-29,54,-73v0,-47,-20,-74,-54,-74", "k": {"a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "j": 7, "x": 7, "m": 7, "n": 7, "z": 7, "s": 4, "f": 4, "t": 4, "r": 4, "p": 4, "u": 7, ",": 14, ".": 14, "-": 4}}, "p": {"d": "19,78r0,-267r28,0r0,29v44,-68,141,-27,141,69v0,89,-88,131,-138,71r0,98r-31,0xm102,-166v-32,0,-52,29,-52,73v0,44,20,73,52,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74", "k": {"v": 4, "w": 4, "y": 4, "j": 4, "x": 4, "m": 4, "n": 4, "z": 4, "r": 4, "u": 4, ",": 11, ".": 11}}, "q": {"d": "178,78r-30,0r0,-100v-45,63,-139,22,-139,-69v0,-95,94,-136,143,-72r0,-26r26,0r0,267xm96,-166v-33,0,-55,29,-55,73v0,44,22,73,55,73v32,0,52,-29,52,-72v0,-45,-20,-74,-52,-74"}, "r": {"d": "116,-162v-36,1,-61,11,-61,64r0,98r-30,0r0,-189r28,0r0,35v21,-32,32,-43,63,-39r0,31", "w": 119, "k": {"e": 7, "a": 7, "g": 7, "x": 4, "m": 4, "n": 4, "z": 4, "s": 4, "u": 2, "c": 4, "o": 5, "d": 2, "q": 2, ",": 22, ".": 22, "-": 18}}, "s": {"d": "44,-56v3,18,9,37,46,37v46,0,63,-47,15,-56v-41,-8,-96,-23,-88,-61v0,-35,28,-58,72,-58v44,0,69,21,69,58r-32,0v-1,-20,-14,-30,-38,-30v-24,0,-40,11,-40,28v0,21,41,29,64,34v37,9,53,25,53,53v0,36,-30,59,-78,59v-49,0,-74,-20,-75,-64r32,0", "w": 180, "k": {"a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "j": 7, "x": 14, "m": 4, "n": 4, "z": 4, "s": 4, "f": 7, "t": 7, "r": 7, "p": 4, "u": 5, "c": 2, "o": 4, ",": 14, ".": 14, "-": 14}}, "t": {"d": "91,-189r0,25r-31,0r0,129v-3,19,16,18,31,16r0,25v-30,6,-60,0,-60,-28r0,-142r-26,0r0,-25r26,0r0,-51r29,0r0,51r31,0", "w": 100, "k": {"e": 2, "a": 4, "g": 4, "x": 7, "m": 4, "n": 4, "z": 4, "s": 4, "f": 5, "t": 5, "r": 4, "c": 4, "o": 5, "d": 2, "q": 2}}, "u": {"d": "174,0r-27,0r0,-26v-26,52,-125,43,-124,-17r0,-146r30,0r0,134v0,23,15,37,39,37v68,1,50,-102,52,-171r30,0r0,189", "k": {"e": 4, "c": 4, "o": 4, "d": 2, "q": 2, ",": 14, ".": 14, "-": 22}}, "v": {"d": "103,0r-33,0r-66,-189r33,0r51,153r53,-153r34,0", "w": 180, "k": {"e": 7, "a": 7, "g": 7, "j": 7, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 4, "t": 4, "r": 9, "p": 11, "u": 11, "c": 7, "o": 9, "d": 5, "q": 5, ",": 22, ".": 22, "-": 7}}, "w": {"d": "199,0r-34,0r-38,-148r-36,148r-34,0r-55,-189r33,0r39,147r36,-147r37,0r37,147r37,-147r34,0", "w": 259, "k": {"e": 7, "a": 7, "g": 7, "j": 7, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 4, "t": 4, "r": 9, "p": 11, "u": 11, "c": 7, "o": 9, "d": 5, "q": 5, ",": 22, ".": 22, "-": 7}}, "x": {"d": "105,-98r65,98r-35,0r-47,-72r-48,72r-34,0r67,-96r-63,-93r34,0r45,69r46,-69r33,0", "w": 180, "k": {"e": 7, "a": 4, "g": 4, "v": 7, "w": 7, "y": 7, "m": 7, "n": 7, "z": 7, "s": 4, "r": 7, "p": 4, "u": 7, "c": 7, "o": 9, "d": 5, "q": 5, ",": 14, ".": 14, "-": 22}}, "y": {"d": "140,-189r32,0r-84,229v-13,35,-37,44,-69,34r0,-27v37,13,42,-23,52,-46r-64,-190r32,0r48,147", "w": 180, "k": {"e": 7, "a": 7, "g": 7, "j": 7, "x": 7, "m": 14, "n": 14, "z": 14, "s": 7, "f": 4, "t": 4, "r": 9, "p": 11, "u": 11, "c": 7, "o": 9, "d": 5, "q": 5, ",": 22, ".": 22, "-": 7}}, "z": {"d": "159,-189r0,27r-111,136r117,0r0,26r-154,0r0,-27r113,-135r-105,0r0,-27r140,0", "w": 180, "k": {"e": 7, "a": 7, "g": 7, "v": 7, "w": 7, "y": 7, "j": 4, "x": 7, "m": 11, "n": 11, "z": 11, "s": 7, "f": 4, "t": 4, "r": 11, "p": 7, "u": 13, "c": 7, "o": 9, "d": 5, "q": 5, ",": 14, ".": 14, "-": 25}}, "{": {"d": "99,-262r0,23v-66,-7,8,129,-57,146v37,12,29,73,29,122v0,21,8,25,28,24r0,23v-61,11,-55,-50,-55,-107v0,-33,-8,-46,-29,-50r0,-24v68,-4,-21,-173,84,-157", "w": 120}, "|": {"d": "36,-262r22,0r0,338r-22,0r0,-338", "w": 93}, "}": {"d": "10,76r0,-23v46,8,29,-53,29,-89v0,-30,10,-48,30,-57v-38,-12,-30,-72,-30,-122v0,-22,-8,-25,-29,-24r0,-23v62,-11,57,49,57,107v0,33,6,46,27,50r0,24v-65,6,23,174,-84,157", "w": 120}, "~": {"d": "81,-129v-18,-15,-37,6,-35,24r-19,0v2,-42,26,-64,58,-47v19,10,37,31,60,31v16,0,19,-10,19,-27r19,0v1,82,-71,45,-102,19", "w": 210}, "\u00a0": {"w": 100}}});

//Projection Code - do not edit
eval((function (x) {
    var d = "";
    var p = 0;
    while (p < x.length) {
        if (x.charAt(p) != "`")d += x.charAt(p++); else {
            var l = x.charCodeAt(p + 3) - 28;
            if (l > 4)d += d.substr(d.length - x.charCodeAt(p + 1) * 96 - x.charCodeAt(p + 2) + 3104 - l, l); else d += "`";
            p += 4
        }
    }
    return d
})("function simplemaps_worldmap_getxy(lat, lng) {initial = {lat:` 2$:lng};` b%distance(xy0, xy1) {x0 = xy0.x;y` #$y;x1` &!1.x;y` #$y;dx = x1 - x0;dy = y1 - y0;return Math.sqrt(dy * dy + dx * dx);}`!?%interse` (!(x0, y0, r0, x1, y1, r1) {var a, dx, dy, d, h, rx, ry;var x2, y2`!:7d =`!4:a = (r0 * r0 - r1 * r1 + d * d) / (2` %!;x2 = x0` U$a / d;y2 = y` 0!y` ,%h`!()` s&a * a);rx = -` K\"(h / d);ry =` r\"` *$`\":!i = x2 + rx` *#_prime` 1\"-` /$yi = y` C!`\"r\"y` >&y` C!y`$7${opt1:{x:xi, y:yi}, opt2` -\"` P\"` 3\"` &\"}}`$J'robinson(lat`&O\"var earthRadius = 1`!<!radian = 0.017453293` 4!pi`\"u$PI` D\"oundToNearest = `!%%(` 4#, value) {`&7(floor(` 5! /` ^$) *` #$;}` z!getSign` k)` `+` ^\"< 0 ? -1 : 1` U#lng` U#` _#`\"Q#.lng`$;\"la` v$` 2,at` ;#ng`\"I$abs` M0` +0` U%ow =`\"t+(5,` R!- 1e-10);` ?\"` e!=`\" !0 : low` ]!high =` d!+ 5` m$Index` 0#/` 0#high` 0$` Q!` 1$ratio = (`!0\"low)` 3%AA = [0.8487, 0.84751182` &\"479598` &\"0213` %!3359314` '!257851` &!1475` Q\"0006949, 0.7821619` 3!7606049` T!7365867` l!7086645, 0.67777`!7#6447573` b!609875` 2\"5713448` b!5272973`!<!485626`!R\"45167814]`\"?!BB`\"?!, 0.0838426, 0.16768`!l\"251527`\"C!335370` _\"19`\"L#503055` Q!58689`!Z#718226`\"*\"533663`\"z#51804` j!915371`#U\"99339958, 1.06872269, 1.14066505, 1.2084152` ?!27035062, 1.31998003` '!523`\"3\"adj`$[!(AA[`%5%] - AA[`%]$]`(n!`%=!+` +)` Z$`\"y!(BB` T*BB` L2` ,(`,*%x:`!D\"*`(I!*`+5$` *!`(z!*`+X(, y:`!2\"*`)7%` 4)};}var calibrate = {0:{xy:{x:350.12317, y:364.65078}`(n!lng:`37!32.534217`3<\"-117.124295}}, 1` d$988.9011, y:248.17444` \\+51.089395` e\"2.545657}}, 2` `$1768.7414, y:588.56842` Z+-2.604346` c\"141.001014}}};`,s%find_point(initial, pt1, pt2, pt3`/-#lam`+T!`/I#` E#`+o\"pt1_` 1+pt1.`/m#` <#2` 1.2` 4+3` 1.3` 6)lam_r_pt1 = distance(lam`!n!_lam` 9*2` 4/`!B!` A\"dist`!+#` =%` a#` 60act` ;+.xy` D!.xy` B\"scale` >#` u!/` R%`-S\"`!u#`!~&/` N\"` 5%2` 3'2` 1)opts = interse`$X!`!=#.x`\"[!.xy.y,` ~\"`!O$` 5\"` %!` 4#2`\"''third`\"q/`$#!)`!N*emnan`!x!`13%` N%opts.o`!0#3.xy) -` w'`!,\"` [#2` E9`&M\"` O/if (`!;%<` d%`4*&{x:`!>%.x, y` $'y};} else` :02` @*2` I!}` A#`(*0`*~%[1]` \"(2]` \"(0]);}"))

//Map path and default settings - you can edit this
var simplemaps_worldmap_mapinfo = {map_name: "world", calibrate: {width: 1800, ratio: 1.76923, x_adjust: -175, y_adjust: 0}, location_scale: 1.2, state_bbox_array: {AF: {x: 1299, y: 327, x2: 1371, y2: 386}, AO: {x: 1041, y: 600, x2: 1111, y2: 686}, AL: {x: 1076, y: 300, x2: 1085, y2: 320}, AE: {x: 1259, y: 406, x2: 1285, y2: 429}, AR: {x: 598, y: 711, x2: 685, y2: 921}, AM: {x: 1201, y: 309, x2: 1219, y2: 325}, AU: {x: 1588, y: 640, x2: 1812, y2: 850}, AT: {x: 1024, y: 261, x2: 1061, y2: 277}, AZ: {x: 1208, y: 306, x2: 1237, y2: 328}, BI: {x: 1140, y: 587, x2: 1149, y2: 601}, BE: {x: 989, y: 246, x2: 1007, y2: 258}, BJ: {x: 981, y: 494, x2: 998, y2: 533}, BF: {x: 946, y: 476, x2: 989, y2: 511}, BD: {x: 1458, y: 404, x2: 1487, y2: 441}, BG: {x: 1090, y: 291, x2: 1122, y2: 310}, BA: {x: 1056, y: 285, x2: 1076, y2: 301}, BY: {x: 1088, y: 218, x2: 1132, y2: 247}, BZ: {x: 481, y: 455, x2: 489, y2: 471}, BO: {x: 588, y: 634, x2: 658, y2: 718}, BR: {x: 562, y: 539, x2: 782, y2: 787}, BN: {x: 1618, y: 537, x2: 1624, y2: 547}, BT: {x: 1460, y: 392, x2: 1478, y2: 402}, BW: {x: 1086, y: 685, x2: 1139, y2: 743}, CF: {x: 1058, y: 501, x2: 1130, y2: 558}, CA: {x: 344, y: 77, x2: 770, y2: 305}, CH: {x: 1007, y: 269, x2: 1029, y2: 282}, CL: {x: 587, y: 684, x2: 662, y2: 923}, CN: {x: 1359, y: 234, x2: 1646, y2: 456}, CI: {x: 929, y: 505, x2: 962, y2: 545}, CM: {x: 1024, y: 490, x2: 1067, y2: 561}, CD: {x: 1045, y: 539, x2: 1152, y2: 656}, CG: {x: 1039, y: 548, x2: 1080, y2: 604}, CO: {x: 533, y: 493, x2: 601, y2: 599}, CR: {x: 496, y: 501, x2: 515, y2: 520}, CU: {x: 509, y: 425, x2: 567, y2: 446}, CZ: {x: 1036, y: 248, x2: 1069, y2: 264}, DE: {x: 1005, y: 225, x2: 1049, y2: 272}, DJ: {x: 1209, y: 491, x2: 1218, y2: 503}, DK: {x: 1014, y: 209, x2: 1036, y2: 226}, DO: {x: 579, y: 446, x2: 599, y2: 460}, DZ: {x: 929, y: 336, x2: 1042, y2: 451}, EC: {x: 522, y: 563, x2: 554, y2: 604}, EG: {x: 1110, y: 371, x2: 1180, y2: 432}, ER: {x: 1179, y: 458, x2: 1217, y2: 493}, EE: {x: 1082, y: 197, x2: 1104, y2: 210}, ET: {x: 1161, y: 477, x2: 1245, y2: 550}, FI: {x: 1061, y: 139, x2: 1114, y2: 196}, FJ: {x: 1959, y: 674, x2: 1977, y2: 689}, GA: {x: 1026, y: 557, x2: 1058, y2: 598}, GB: {x: 941, y: 203, x2: 985, y2: 256}, GE: {x: 1180, y: 295, x2: 1217, y2: 311}, GH: {x: 958, y: 502, x2: 983, y2: 542}, GN: {x: 892, y: 492, x2: 933, y2: 526}, GM: {x: 883, y: 484, x2: 899, y2: 489}, GW: {x: 884, y: 492, x2: 900, y2: 502}, GQ: {x: 1029, y: 558, x2: 1040, y2: 566}, GR: {x: 1081, y: 306, x2: 1116, y2: 350}, GL: {x: 712, y: 76, x2: 935, y2: 195}, GT: {x: 463, y: 459, x2: 486, y2: 485}, GY: {x: 632, y: 519, x2: 659, y2: 564}, HN: {x: 479, y: 470, x2: 514, y2: 490}, HR: {x: 1045, y: 277, x2: 1074, y2: 302}, HT: {x: 565, y: 446, x2: 581, y2: 457}, HU: {x: 1057, y: 264, x2: 1089, y2: 282}, ID: {x: 1511, y: 537, x2: 1769, y2: 638}, IN: {x: 1350, y: 346, x2: 1505, y2: 522}, IE: {x: 929, y: 224, x2: 948, y2: 245}, IR: {x: 1206, y: 319, x2: 1322, y2: 413}, IQ: {x: 1184, y: 334, x2: 1239, y2: 387}, IS: {x: 874, y: 158, x2: 919, y2: 175}, IL: {x: 1161, y: 361, x2: 1168, y2: 385}, IT: {x: 1011, y: 273, x2: 1072, y2: 339}, JM: {x: 543, y: 454, x2: 555, y2: 459}, JO: {x: 1165, y: 360, x2: 1187, y2: 386}, JP: {x: 1667, y: 283, x2: 1720, y2: 375}, KZ: {x: 1206, y: 223, x2: 1405, y2: 313}, KE: {x: 1167, y: 537, x2: 1212, y2: 602}, KG: {x: 1337, y: 297, x2: 1387, y2: 322}, KH: {x: 1547, y: 480, x2: 1577, y2: 505}, KR: {x: 1637, y: 326, x2: 1661, y2: 353}, XK: {x: 1079, y: 297, x2: 1088, y2: 306}, KW: {x: 1229, y: 381, x2: 1239, y2: 391}, LA: {x: 1529, y: 429, x2: 1575, y2: 484}, LB: {x: 1164, y: 352, x2: 1171, y2: 362}, LR: {x: 913, y: 518, x2: 934, y2: 545}, LY: {x: 1028, y: 361, x2: 1115, y2: 448}, LK: {x: 1423, y: 510, x2: 1435, y2: 534}, LS: {x: 1122, y: 754, x2: 1135, y2: 767}, LT: {x: 1075, y: 217, x2: 1101, y2: 231}, LU: {x: 1005, y: 255, x2: 1007, y2: 259}, LV: {x: 1074, y: 207, x2: 1108, y2: 221}, MA: {x: 883, y: 345, x2: 971, y2: 436}, MD: {x: 1108, y: 265, x2: 1127, y2: 283}, MG: {x: 1215, y: 649, x2: 1257, y2: 735}, MX: {x: 350, y: 364, x2: 499, y2: 480}, MK: {x: 1082, y: 303, x2: 1095, y2: 312}, ML: {x: 909, y: 413, x2: 1000, y2: 508}, MM: {x: 1485, y: 392, x2: 1534, y2: 509}, ME: {x: 1071, y: 295, x2: 1080, y2: 305}, MN: {x: 1407, y: 243, x2: 1573, y2: 307}, MZ: {x: 1145, y: 638, x2: 1204, y2: 742}, MR: {x: 883, y: 398, x2: 950, y2: 479}, MW: {x: 1159, y: 631, x2: 1176, y2: 679}, MY: {x: 1538, y: 528, x2: 1645, y2: 567}, NA: {x: 1042, y: 680, x2: 1116, y2: 757}, NE: {x: 978, y: 423, x2: 1064, y2: 498}, NG: {x: 992, y: 484, x2: 1058, y2: 545}, NI: {x: 488, y: 477, x2: 514, y2: 504}, NL: {x: 993, y: 234, x2: 1011, y2: 250}, NO: {x: 999, y: 87, x2: 1103, y2: 207}, NP: {x: 1410, y: 379, x2: 1457, y2: 404}, NZ: {x: 1810, y: 791, x2: 1912, y2: 868}, OM: {x: 1264, y: 404, x2: 1305, y2: 466}, PK: {x: 1305, y: 336, x2: 1388, y2: 421}, PA: {x: 512, y: 511, x2: 544, y2: 526}, PE: {x: 520, y: 573, x2: 594, y2: 689}, PH: {x: 1633, y: 454, x2: 1686, y2: 537}, PG: {x: 1766, y: 588, x2: 1852, y2: 640}, PL: {x: 1044, y: 226, x2: 1093, y2: 261}, KP: {x: 1621, y: 299, x2: 1646, y2: 332}, PT: {x: 927, y: 303, x2: 944, y2: 338}, PY: {x: 632, y: 695, x2: 680, y2: 748}, PS: {x: 1164, y: 365, x2: 1167, y2: 373}, QA: {x: 1254, y: 406, x2: 1259, y2: 416}, RO: {x: 1078, y: 266, x2: 1126, y2: 294}, RU: {x: 1069, y: 85, x2: 1763, y2: 310}, RW: {x: 1140, y: 579, x2: 1150, y2: 591}, EH: {x: 883, y: 396, x2: 930, y2: 439}, SA: {x: 1165, y: 368, x2: 1283, y2: 468}, SD: {x: 1099, y: 432, x2: 1189, y2: 517}, SS: {x: 1111, y: 494, x2: 1175, y2: 550}, SN: {x: 879, y: 467, x2: 913, y2: 494}, SL: {x: 903, y: 508, x2: 919, y2: 529}, SV: {x: 475, y: 480, x2: 488, y2: 489}, RS: {x: 1071, y: 279, x2: 1094, y2: 303}, SR: {x: 651, y: 534, x2: 674, y2: 561}, SK: {x: 1060, y: 258, x2: 1087, y2: 269}, SI: {x: 1045, y: 275, x2: 1059, y2: 284}, SE: {x: 1027, y: 144, x2: 1078, y2: 223}, SZ: {x: 1144, y: 735, x2: 1151, y2: 746}, SY: {x: 1167, y: 335, x2: 1199, y2: 367}, TD: {x: 1052, y: 423, x2: 1110, y2: 525}, TG: {x: 976, y: 502, x2: 987, y2: 534}, TH: {x: 1516, y: 442, x2: 1564, y2: 536}, TJ: {x: 1328, y: 311, x2: 1370, y2: 338}, TM: {x: 1246, y: 300, x2: 1326, y2: 348}, TL: {x: 1676, y: 625, x2: 1690, y2: 632}, TN: {x: 1017, y: 334, x2: 1038, y2: 379}, TR: {x: 1111, y: 304, x2: 1212, y2: 344}, TW: {x: 1635, y: 411, x2: 1644, y2: 432}, TZ: {x: 1143, y: 579, x2: 1202, y2: 647}, UG: {x: 1143, y: 545, x2: 1174, y2: 581}, UA: {x: 1086, y: 241, x2: 1174, y2: 290}, UY: {x: 665, y: 764, x2: 693, y2: 795}, US: {x: 98, y: 132, x2: 639, y2: 452}, UZ: {x: 1258, y: 283, x2: 1353, y2: 336}, VE: {x: 566, y: 495, x2: 642, y2: 568}, VN: {x: 1538, y: 424, x2: 1587, y2: 517}, VU: {x: 1903, y: 665, x2: 1909, y2: 678}, YE: {x: 1214, y: 451, x2: 1272, y2: 492}, ZA: {x: 1065, y: 713, x2: 1155, y2: 794}, ZM: {x: 1098, y: 625, x2: 1164, y2: 686}, ZW: {x: 1117, y: 671, x2: 1159, y2: 714}, SO: {x: 1207, y: 496, x2: 1262, y2: 583}, GF: {x: 670, y: 536, x2: 687, y2: 559}, FR: {x: 954, y: 248, x2: 1026, y2: 309}, ES: {x: 929, y: 294, x2: 999, y2: 343}, AW: {x: 586, y: 492, x2: 587, y2: 493}, AI: {x: 627, y: 456, x2: 628, y2: 457}, AD: {x: 984, y: 301, x2: 986, y2: 302}, AG: {x: 633, y: 460, x2: 635, y2: 464}, BS: {x: 546, y: 401, x2: 577, y2: 439}, BM: {x: 629, y: 366, x2: 631, y2: 367}, BB: {x: 644, y: 487, x2: 645, y2: 489}, KM: {x: 1218, y: 645, x2: 1225, y2: 651}, CV: {x: 836, y: 463, x2: 851, y2: 478}, KY: {x: 527, y: 446, x2: 536, y2: 450}, DM: {x: 635, y: 473, x2: 636, y2: 475}, FK: {x: 682, y: 897, x2: 698, y2: 903}, FO: {x: 944, y: 182, x2: 949, y2: 187}, GD: {x: 632, y: 494, x2: 633, y2: 496}, HK: {x: 1603, y: 429, x2: 1605, y2: 431}, KN: {x: 628, y: 461, x2: 630, y2: 463}, LC: {x: 636, y: 483, x2: 638, y2: 485}, LI: {x: 1024, y: 272, x2: 1025, y2: 274}, MF: {x: 627, y: 457, x2: 628, y2: 457}, MV: {x: 1389, y: 545, x2: 1389, y2: 552}, MT: {x: 1051, y: 343, x2: 1054, y2: 344}, MS: {x: 631, y: 465, x2: 632, y2: 466}, MU: {x: 1293, y: 699, x2: 1296, y2: 703}, NC: {x: 1861, y: 694, x2: 1902, y2: 716}, NR: {x: 1915, y: 575, x2: 1915, y2: 576}, PN: {x: 274, y: 727, x2: 274, y2: 728}, PR: {x: 601, y: 454, x2: 615, y2: 458}, PF: {x: 136, y: 628, x2: 223, y2: 705}, SG: {x: 1559, y: 563, x2: 1561, y2: 564}, SB: {x: 1849, y: 614, x2: 1909, y2: 647}, ST: {x: 1013, y: 561, x2: 1019, y2: 572}, SX: {x: 627, y: 457, x2: 628, y2: 458}, SC: {x: 1288, y: 601, x2: 1289, y2: 603}, TC: {x: 579, y: 433, x2: 583, y2: 434}, TO: {x: 11, y: 690, x2: 14, y2: 709}, TT: {x: 630, y: 500, x2: 639, y2: 508}, VC: {x: 634, y: 487, x2: 636, y2: 491}, VG: {x: 619, y: 453, x2: 621, y2: 455}, VI: {x: 617, y: 455, x2: 619, y2: 459}, CY: {x: 1148, y: 345, x2: 1159, y2: 352}, RE: {x: 1281, y: 705, x2: 1284, y2: 708}, YT: {x: 1228, y: 653, x2: 1229, y2: 655}, MQ: {x: 636, y: 477, x2: 638, y2: 480}, GP: {x: 633, y: 467, x2: 637, y2: 471}, CW: {x: 595, y: 494, x2: 596, y2: 496}, IC: {x: 878, y: 386, x2: 904, y2: 396}}, paths: {AF: "m 1369.9,333.8 -5.4,0 -3.8,-0.5 -2.5,2.9 -2.1,0.7 -1.5,1.3 -2.6,-2.1 -1,-5.4 -1.6,-0.3 0,-2 -3.2,-1.5 -1.7,2.3 0.2,2.6 -0.6,0.9 -3.2,-0.1 -0.9,3 -2.1,-1.3 -3.3,2.1 -1.8,-0.8 -4.3,-1.4 -2.9,0 -1.6,-0.2 -2.9,-1.7 -0.3,2.3 -4.1,1.2 0.1,5.2 -2.5,2 -4,0.9 -0.4,3 -3.9,0.8 -5.9,-2.4 -0.5,8 -0.5,4.7 2.5,0.9 -1.6,3.5 2.7,5.1 1.1,4 4.3,1.1 1.1,4 -3.9,5.8 9.6,3.2 5.3,-0.9 3.3,0.8 0.9,-1.4 3.8,0.5 6.6,-2.6 -0.8,-5.4 2.3,-3.6 4,0 0.2,-1.7 4,-0.9 2.1,0.6 1.7,-1.8 -1.1,-3.8 1.5,-3.8 3,-1.6 -3,-4.2 5.1,0.2 0.9,-2.3 -0.8,-2.5 2,-2.7 -1.4,-3.2 -1.9,-2.8 2.4,-2.8 5.3,-1.3 5.8,-0.8 2.4,-1.2 2.8,-0.7 -1.4,-1.9 z", AO: "m 1068.3,609.6 -16.6,-0.1 -1.9,0.7 -1.7,-0.1 -2.3,0.9 -0.5,1.2 2.8,4 1.1,4.3 1.6,6.1 -1.7,2.6 -0.3,1.3 1.3,3.8 1.5,3.9 1.6,2.2 0.3,3.6 -0.7,4.8 -1.8,2.8 -3.3,4.2 -1.3,2.6 -1.9,5.7 -0.3,2.7 -2,5.9 -0.9,5.5 0.5,4 2.7,-1.2 3.3,-1 3.6,0.1 3.2,2.9 0.9,-0.4 22.5,-0.3 3.7,3 13.4,0.9 10.3,-2.5 -3.5,-4 -3.6,-5.2 0.8,-20.3 11.6,0.1 -0.5,-2.2 0.9,-2.4 -0.9,-3 0.7,-3 -0.5,-2 -2.6,-0.4 -3.5,1 -2.4,-0.2 -1.4,0.6 0.5,-7.6 -1.9,-2.3 -0.3,-4 0.9,-3.8 -1.2,-2.4 0,-4 -6.8,0 0.5,-2.3 -2.9,0 -0.3,1.1 -3.4,0.3 -1.5,3.7 -0.9,1.6 -3,-0.9 -1.9,0.9 -3.7,0.5 -2.1,-3.3 -1.3,-2.1 -1.6,-3.8 -1.3,-4.7 z m -21.8,-1.3 0.2,-2.7 0.9,-1.7 2,-1.3 -2,-2.2 -1.8,1.1 -2.2,2.7 1.4,4.8 1.5,-0.7 z", AL: "m 1077.5,300.5 -2,3.1 0.5,1.9 0,0 1,1 -0.5,1.9 -0.1,4.3 0.7,3 3,2.1 0.2,1.4 1,0.4 2.1,-3 0.1,-2.1 1.6,-0.9 0,-1.6 -2.3,-1.6 -0.9,-2.6 0.4,-2.1 0,0 -0.5,-2.3 -1.3,-0.6 -1.3,-1.6 -1.3,0.5 -0.4,-1.2 z", AE: "m 1283.9,408.6 -1.3,-2.2 -3,3.9 -3.7,4.1 -3.3,4.3 -3.3,-0.2 -4.6,-0.2 -4.2,1 -0.3,-1.7 -1,0.3 0.4,1.5 2.6,6.4 16.8,3.2 1,-1.3 -0.1,-2.6 1.4,-2.6 -0.3,-2.6 2.4,-1.3 -1.1,-0.8 0.1,-4.2 2.8,0 -1.3,-5 z", AR: "m 669.8,920.7 0.9,-3 -7.3,-1.5 -7.7,-3.6 -4.3,-4.6 -3,-2.8 5.9,13.5 5,0 2.9,0.2 3.3,2.1 4.3,-0.3 z m -50.4,-208.1 -7.4,-1.5 -4,5.7 0.9,1.6 -1.1,6.6 -5.6,3.2 1.6,10.6 -0.9,2 2,2.5 -3.2,4 -2.6,5.9 -0.9,5.8 1.7,6.2 -2.1,6.5 4.9,10.9 1.6,1.2 1.3,5.9 -1.6,6.2 1.4,5.4 -2.9,4.3 1.5,5.9 3.3,6.3 -2.5,2.4 0.3,5.7 0.7,6.4 3.3,7.6 -1.6,1.2 3.6,7.1 3.1,2.3 -0.8,2.6 2.8,1.3 1.3,2.3 -1.8,1.1 1.8,3.7 1.1,8.2 -0.7,5.3 1.8,3.2 -0.1,3.9 -2.7,2.7 3.1,6.6 2.6,2.2 3.1,-0.4 1.8,4.6 3.5,3.6 12,0.8 4.8,0.9 2.2,0.4 -4.7,-3.6 -4.1,-6.3 0.9,-2.9 3.5,-2.5 0.5,-7.2 4.7,-3.5 -0.2,-5.6 -5.2,-1.3 -6.4,-4.5 -0.1,-4.7 2.9,-3.1 4.7,-0.1 0.2,-3.3 -1.2,-6.1 2.9,-3.9 4.1,-1.9 -2.5,-3.2 -2.2,2 -4,-1.9 -2.5,-6.2 1.5,-1.6 5.6,2.3 5,-0.9 2.5,-2.2 -1.8,-3.1 -0.1,-4.8 -2,-3.8 5.8,0.6 10.2,-1.3 6.9,-3.4 3.3,-8.3 -0.3,-3.2 -3.9,-2.8 -0.1,-4.5 -7.8,-5.5 -0.3,-3.3 -0.4,-4.2 0.9,-1.4 -1.1,-6.3 0.3,-6.5 0.5,-5.1 5.9,-8.6 5.3,-6.2 3.3,-2.6 4.2,-3.5 -0.5,-5.1 -3.1,-3.7 -2.6,1.2 -0.3,5.7 -4.3,4.8 -4.2,1.1 -6.2,-1 -5.7,-1.8 4.2,-9.6 -1.1,-2.8 -5.9,-2.5 -7.2,-4.7 -4.6,-1 -11.2,-10.4 -1,-1.3 -6.3,-0.3 -1.6,5.1 -3.7,-4.6 z", AM: "m 1219,325.1 -0.9,-4.4 -2.5,-1.1 -2.5,-1.7 1,-2 -3.1,-2.2 0.7,-1.5 -2.2,-1.1 -1.4,-1.7 -6.9,1 1.3,2.2 0,3.1 4.2,1.5 2.4,1.9 1,-0.2 1.8,1.7 2.3,0 0.2,1 2.8,3.7 1.8,-0.2 z", AU: "m 1726.7,832 -3,-0.5 -1.9,2.9 -0.6,5.4 -2.1,4 -0.5,5.3 3,0.2 0.8,0.3 6.6,-4.3 0.6,1.7 4,-4.9 3.2,-2.2 4.5,-7.3 -2.8,-0.5 -4.8,1.2 -3.4,0.9 -3.6,-2.2 z m 50.1,-172.3 0.5,-2.3 0.1,-3.6 -1.6,-3.2 0.1,-2.7 -1.3,-0.8 0.1,-3.9 -1.2,-3.2 -2.3,2.4 -0.4,1.8 -1.5,3.5 -1.8,3.4 0.6,2.1 -1.2,1.3 -1.5,4.8 0.1,3.7 -0.7,1.8 0.3,3.1 -2.6,5 -1.3,3.5 -1.7,2.9 -1.7,3.4 -4.1,2.1 -4.9,-2.1 -0.5,-2 -2.5,-1.6 -1.6,0 -3.3,-3.8 -2.5,-2.2 -3.9,-2 -3.9,-3.5 -0.1,-1.8 2.5,-3.1 2.1,-3.2 -0.3,-2.6 1.9,-0.2 2.5,-2.5 2,-3.4 -2.2,-3.2 -1.5,1.2 -2,-0.5 -3.5,1.8 -3.2,-2 -1.7,0.7 -4.5,-1.6 -2.7,-2.7 -3.5,-1.5 -3.1,0.9 3.9,2.1 -0.3,3.2 -4.8,1.2 -2.8,-0.7 -3.6,2.2 -2.9,3.7 0.6,1.5 -2.7,1.7 -3.4,5.1 0.6,3.5 -3.4,-0.6 -3.5,0 -2.5,-3.8 -3.7,-2.9 -2.8,0.8 -2.6,0.9 -0.3,1.6 -2.4,-0.7 -0.3,1.8 -3,1.1 -1.7,2.5 -3.5,3.1 -1.4,4.8 -2.3,-1.3 -2.2,3.1 1.5,3 -2.6,1.2 -1.4,-5.5 -4.8,5.4 -0.8,3.5 -0.7,2.5 -3.8,3.3 -2,3.4 -3.5,2.8 -6.1,1.9 -3.1,-0.2 -1.5,0.6 -1.1,1.4 -3.5,0.7 -4.7,2.4 -1.4,-0.8 -2.6,0.5 -4.6,2.3 -3.2,2.7 -4.8,2.1 -3.1,4.4 0.4,-4.8 -3.1,4.6 -0.1,3.7 -1.3,3.2 -1.5,1.5 -1.3,3.7 0.9,1.9 0.1,2 1.6,5 -0.7,3.3 -1,-2.5 -2.3,-1.8 0.4,5.9 -1.7,-2.8 0.1,2.8 1.8,5 -0.6,5 1.7,2.5 -0.4,1.9 0.9,4.1 -1.3,3.6 -0.3,3.6 0.7,6.5 -0.7,3.7 -2.2,4.4 -0.6,2.3 -1.5,1.5 -2.9,0.8 -1.5,3.7 2.4,1.2 4,4.1 3.6,0 3.8,0.3 3.3,-2.1 3.4,-1.8 1.4,0.3 4.5,-3.4 3.8,-0.3 4.1,-0.7 4.2,1.2 3.6,-0.6 4.6,-0.2 3,-2.6 2.3,-3.3 5.2,-1.5 6.9,-3.2 5,0.4 6.9,-2.1 7.8,-2.3 9.8,-0.6 4,3.1 3.7,0.2 5.3,3.8 -1.6,1.5 1.8,2.4 1.3,4.6 -1.6,3.4 2.9,2.6 4.3,-5.1 4.3,-2.1 6.7,-5.5 -1.6,4.7 -3.4,3.2 -2.5,3.7 -4.4,3.5 5.2,-1.2 4.7,-4.4 -0.9,4.8 -3.2,3.1 4.7,0.8 1.3,2.6 -0.4,3.3 -1.5,4.9 1.4,4 4,1.9 2.8,0.4 2.4,1 3.5,1.8 7.2,-4.7 3.5,-1.2 -2.7,3.4 2.6,1.1 2.7,2.8 4.7,-2.7 3.8,-2.5 6.3,-2.7 6,-0.2 4.2,-2.3 0.9,-2 3,-4.5 3.9,-4.8 3.6,-3.2 4.4,-5.6 3.3,-3.1 4.4,-5 5.4,-3.1 5,-5.8 3.1,-4.5 1.4,-3.6 3.8,-5.7 2.1,-2.9 2.5,-5.7 -0.7,-5.4 1.7,-3.9 1.1,-3.7 0,-5.1 -2.8,-5.1 -1.9,-2.5 -2.9,-3.9 0.7,-6.7 -1.5,1 -1.6,-2.8 -2.5,1.4 -0.6,-6.9 -2.2,-4 1,-1.5 -3.1,-2.8 -3.2,-3 -5.3,-3.3 -0.9,-4.3 1.3,-3.3 -0.4,-5.5 -1.3,-0.7 -0.2,-3.2 -0.2,-5.5 1.1,-2.8 -2.3,-2.5 -1.4,-2.7 -3.9,2.4 -1.2,-5 z", AT: "m 1060.2,264 -2.3,-1.2 -2.3,0.3 -4,-1.9 -1.7,0.5 -2.6,2.5 -3.8,-2 -1.5,2.9 -1.7,0.8 1,4 -0.4,1.1 -1.7,-1.3 -2.4,-0.2 -3.4,1.2 -4.4,-0.3 -0.6,1.6 -2.6,-1.7 -1.5,0.3 0.2,1.1 -0.7,1.6 2.3,1.1 2.6,0.2 3.1,0.9 0.5,-1.2 4.8,-1.1 1.3,2.2 7.2,1.6 4.2,0.4 2.4,-1.4 4.3,-0.1 0.9,-1.1 1.3,-4 -1.1,-1.3 2.8,0 0.2,-2.6 -0.7,-2.1 0.3,-0.8 z", AZ: "m 1210.1,318.9 -1,0.2 1.2,2.4 3.2,2.9 3.7,0.9 -2.8,-3.7 -0.2,-1 -2.3,0 -1.8,-1.7 z m 10.4,-9.3 -4.3,-3.8 -1.5,-0.2 -1.1,0.9 3.2,3.4 -0.6,0.7 -2.8,-0.4 -4.2,-1.8 -1.1,1 1.4,1.7 2.2,1.1 -0.7,1.5 3.1,2.2 -1,2 2.5,1.7 2.5,1.1 0.9,4.4 5.3,-4.7 1.9,-0.5 1.9,1.9 -1.2,3.1 3.8,3.4 1.3,-0.3 -0.8,-3.2 1.7,-1.5 0.4,-2.2 -0.1,-5 4.2,-0.5 -2,-1.7 -2.5,-0.2 -3.5,-4.5 -3.4,-3.2 0,0 -2.6,2.5 -0.5,1.5 -2.4,-0.4 z", BI: "m 1148.2,590 -0.3,-2.5 0,0 -3,-0.4 -1.7,3.6 -3.5,-0.5 1.4,2.9 0.1,1.1 2,6.1 -0.1,0.3 0.6,-0.1 2.1,-2.3 2.2,-3.3 1.4,-1.4 0,-2 -1.2,-1.5 z", BE: "m 1000.7,246.2 -4.4,1.3 -3.6,-0.5 0,0 -3.8,1.2 0.7,2.2 2.2,0.1 2.4,2.4 3.4,2.9 2.5,-0.4 4.4,2.8 0.4,-3.5 1.3,-0.2 0.4,-4.2 -2.8,-1.4 -3.1,-2.7 z", BJ: "m 996.9,498 -4.3,-3.7 -2,0 -1.9,1.9 -1.2,1.9 -2.7,0.6 -1.2,2.8 -1.9,0.7 -0.7,3.3 1.7,1.9 2,2.3 0.2,3.1 1.1,1.3 -0.2,14.6 1.4,4.4 4.6,-0.8 0.3,-10.2 -0.1,-4.1 1,-4 1.7,-1.9 2.7,-4 -0.6,-1.7 1.1,-2.5 -1.2,-3.8 0.2,-2.1 z", BF: "m 978.8,477.2 -3.6,0 -1.4,-1.2 -3,0.9 -5.2,2.6 -1.1,2 -4.3,2.9 -0.8,1.6 -2.3,1.3 -2.7,-0.9 -1.6,1.6 -0.8,4.4 -4.5,5.2 0.2,2.2 -1.6,2.7 0.4,3.7 2.5,1.4 1,2.1 2.5,1.3 1.9,-1.6 2.7,-0.2 3.8,1.6 -0.8,-4.8 0.2,-3.6 9.7,-0.3 2.4,0.5 1.8,-1 2.6,0.5 4.9,0.1 1.9,-0.7 1.2,-2.8 2.7,-0.6 1.2,-1.9 0.1,-4.4 -6.4,-1.4 -0.2,-3.1 -3.1,-4.1 -0.8,-2.9 0.5,-3.1 z", BD: "m 1486.5,431.9 -4.5,-10.1 -1.5,0.1 -0.2,4 -3.5,-3.3 1.1,-3.6 2.4,-0.4 1.6,-5.3 -3.4,-1.1 -5,0.1 -5.4,-0.9 -1.2,-4.4 -2.7,-0.4 -4.8,-2.7 -1.2,4.3 4.6,3.4 -3.1,2.4 -0.8,2.3 3.7,1.7 -0.4,3.8 2.6,4.8 1.6,5.2 2.2,0.6 1.7,0.7 0.6,-1.2 2.5,1.3 1.3,-3.5 -0.9,-2.6 5.1,0.2 2.8,3.7 1.5,3.1 0.8,3.2 2,3.3 -1.1,-5.1 2.1,1 -0.5,-4.6 z", BG: "m 1121.6,294.3 -3,-0.7 -4,-2.2 -5.8,1.4 -2.3,1.6 -7.5,-0.3 -4,-1 -1.9,0.5 -1.8,-2.6 -1.1,1.4 0.7,2.3 2.8,2.6 -1.7,1.9 -0.7,2 0.6,0.7 -0.7,0.9 2.8,2 0.8,4.1 3.8,0.2 3.9,-1.7 3.9,2.1 4.6,-0.6 -0.3,-3 5,-2 4.5,0.8 -2.1,-3.5 1.3,-4.4 2.2,-2.5 z", BA: "m 1062.2,284.9 -2.3,0.1 -1,1.3 -1.9,-1.4 -0.9,2.5 2.7,2.9 1.3,1.9 2.5,2.3 2,1.4 2.2,2.5 4.7,2.4 0.4,-3.4 1.5,-1.4 0.9,-0.6 1.2,-0.3 0.5,-2.9 -2.7,-2.3 1,-2.7 -1.8,0 0,0 -2.4,-1.4 -3.5,0.1 -4.4,-1 z", BY: "m 1112.8,219.4 -5.2,-1.5 -4.6,2.3 -2.6,1 0.9,2.6 -3.5,2 -0.5,3.4 -4.8,2.2 -4.6,0 0.6,2.7 1.7,2.3 0.3,2.4 -2.7,1.2 1.9,2.9 0.5,2.7 2.2,-0.3 2.4,-1.6 3.7,-0.2 5,0.5 5.6,1.5 3.8,0.1 2,0.9 1.6,-1.1 1.5,1.5 4.3,-0.3 2,0.6 -0.2,-3.1 1.2,-1.4 4.1,-0.3 0,0 -2,-3.9 -1.5,-2 0.8,-0.6 3.9,0.2 1.6,-1.3 -1.7,-1.6 -3.4,-1.1 0.1,-1.1 -2.2,-1.1 -3.7,-3.9 0.6,-1.6 -1,-2.9 -4.8,-1.4 -2.3,0.7 -1,-1.4 z", BZ: "m 482.5,471.1 1.4,-2.2 1,-0.2 1.3,-1.7 1,-3.2 -0.3,-0.6 0.9,-2.3 -0.4,-1 1.3,-2.7 0.3,-1.8 -1.1,0 0.1,-0.9 -1,0 -2.5,3.9 -0.9,-0.8 -0.7,0.3 -0.1,1 -0.7,5 -1.2,7.2 1.6,0 z", BO: "m 655.7,700.5 1.6,-1.3 -0.8,-3.6 1.3,-2.8 0.5,-5 -1.6,-4 -3.2,-1.7 -0.8,-2.6 0.6,-3.6 -10.7,-0.3 -2.7,-7.4 1.6,-0.1 -0.3,-2.8 -1.2,-1.8 -0.5,-3.7 -3.3,-1.9 -3.5,0.1 -2.5,-1.9 -3.8,-1.2 -2.4,-2.4 -6.3,-1 -6.4,-5.7 0.3,-4.3 -0.9,-2.5 0.4,-4.7 -7.3,1.1 -2.8,2.3 -4.8,2.6 -1.1,1.9 -2.9,0.2 -4.2,-0.6 5.5,10.3 -1.1,2.1 0.1,4.5 0.3,5.4 -1.9,3.2 1.2,2.4 -1.1,2.1 2.8,5.3 -2.8,6.9 3.1,4.3 1.2,4.6 3.2,2.7 -1.1,6.2 3.7,7.1 3.1,8.8 3.8,-0.9 4,-5.7 7.4,1.5 3.7,4.6 1.6,-5.1 6.3,0.3 1,1.3 1.5,-7.6 -0.2,-3.4 2.1,-5.6 9.5,-1.9 5.1,0.1 5.4,3.3 0.3,1.9 z", BR: "m 659,560.1 -1.4,0.2 -3.1,-0.5 -1.8,1.7 -2.6,1.1 -1.7,0.2 -0.7,1.3 -2.7,-0.3 -3.5,-3 -0.3,-2.9 -1.4,-3.3 1,-5.4 1.6,-2.2 -1.2,-3 -1.9,-0.9 0.8,-2.8 -1.3,-1.5 -2.9,0.3 0.7,1.8 -2.1,2.4 -6.4,2.4 -4,1 -1.7,1.5 -4.4,-1.6 -4.2,-0.8 -1,0.6 2.4,1.6 -0.3,4.3 0.7,4 4.8,0.5 0.3,1.4 -4.1,1.8 -0.7,2.7 -2.3,1 -4.2,1.5 -1.1,1.9 -4.4,0.5 -3,-3.4 -1.1,0.8 -1,-3.8 -1.6,-2 -1.9,2.2 -10.9,-0.1 0,3.9 3.3,0.7 -0.2,2.4 -1.1,-0.6 -3.2,1 0,4.6 2.5,2.4 0.9,3.6 -0.1,2.8 -2.2,17.4 -5.1,-0.3 -0.7,1 -4.6,1.2 -6.2,4.3 -0.4,3 -1.3,2.2 0.7,3.4 -3.3,1.9 0.1,2.7 -1.5,1.1 2.6,5.8 3.3,3.8 -1,2.8 3.7,0.3 2.3,3.4 4.9,0.2 4.4,-3.8 0.2,9.7 2.6,0.7 3,-1.1 4.2,0.6 2.9,-0.2 1.1,-1.9 4.8,-2.6 2.8,-2.3 7.3,-1.1 -0.4,4.7 0.9,2.5 -0.3,4.3 6.4,5.7 6.3,1 2.4,2.4 3.8,1.2 2.5,1.9 3.5,-0.1 3.3,1.9 0.5,3.7 1.2,1.8 0.3,2.8 -1.6,0.1 2.7,7.4 10.7,0.3 -0.6,3.6 0.8,2.6 3.2,1.7 1.6,4 -0.5,5 -1.3,2.8 0.8,3.6 -1.6,1.3 1.9,3.6 0.4,8.6 6,1.2 2.1,-1.2 3.9,1.7 1.2,1.9 1,5.8 0.9,2.5 2,0.3 2,-1.1 2.1,1.2 0.3,3.5 -0.3,3.8 -0.7,3.6 2.6,-1.2 3.1,3.7 0.5,5.1 -4.2,3.5 -3.3,2.6 -5.3,6.2 -5.9,8.6 3.4,-0.7 6.2,4.9 1.9,-0.2 6.2,4.1 4.8,3.5 3.8,4.3 -1.9,3 2.1,3.7 2.9,-3.7 1.5,-6 3.2,-3 3.9,-5 4.5,-11.2 3.4,-3.5 0.8,-3.1 0.3,-6.4 -1.3,-3.5 0.3,-4.8 4.1,-6.3 6,-5.1 6,-1.8 3.6,-2.9 8.5,-2.4 5.9,0 1.1,-3.8 4.2,-2.8 0.6,-6.5 5.1,-8.3 0.5,-8.5 1.6,-2.6 0.3,-4.1 1.1,-9.9 -1,-11.9 1.4,-4.7 1.4,-0.1 3.9,-5.5 3.3,-7.2 7.7,-8.8 2.7,-4.2 2,-10.5 -1,-3.9 -2,-8.1 -2.1,-2 -4.8,-0.2 -4.3,-1.9 -7.3,-7.1 -8.4,-5.3 -8.4,0.3 -10.9,-3.4 -6.5,2 0.8,-3.5 -2.7,-3.8 -9.4,-3.8 -7.1,-2.3 -4.2,4.1 -0.3,-6.3 -9.9,-1 -1.7,-2 4.2,-5.2 -0.1,-4.4 -3,-1 -3,-11.2 -1.3,-3.5 -1.9,0.3 -3.5,5.8 -1.8,4.7 -2.1,2.4 -2.7,0.5 -0.8,-1.8 -1.2,-0.3 -1.8,1.8 -2.4,-1.3 -3.2,-1.4 -2.7,0.7 -2.3,-0.6 -0.5,1.8 0.9,1.3 -0.5,1.3 -3.1,-0.5 z", BN: "m 1617.8,543.4 2.7,3.3 1.1,-2.2 2.7,0.2 0.1,-4.1 0.1,-3.1 -4.6,3.5 -2.1,2.4 z", BT: "m 1474.7,395.5 -2.7,-1.8 -2.9,-0.1 -4.2,-1.5 -2.6,1.6 -2.6,4.8 0.3,1.2 5.5,2.5 3.2,-1 4.7,0.4 4.4,-0.2 -0.4,-3.9 -2.7,-2 z", BW: "m 1116.7,685 -1,-0.5 -3.2,1.5 -1.6,0 -3.7,2.5 -2,-2.6 -8.6,2.2 -4.1,0.2 -0.9,22.7 -5.4,0.2 -0.6,18.5 1.4,1 3,6.1 -0.7,3.8 1.1,2.3 4,-0.7 2.8,-2.8 2.7,-1.9 1.5,-3.1 2.7,-1.5 2.3,0.8 2.5,1.8 4.4,0.3 3.6,-1.5 0.6,-2 1.2,-3 3,-0.5 1.7,-2.4 2,-4.3 5.2,-4.7 8,-4.7 -3.4,-2.9 -4.2,-0.9 -1.5,-4.1 0.1,-2.2 -2.3,-0.7 -6,-7 -1.6,-3.7 -1.1,-1.1 -1.9,-5.1 z", CF: "m 1110.5,517.3 -0.5,-0.3 -2,-1.8 -0.3,-2 0.8,-2.6 0,-2.6 -3.3,-4 -0.7,-2.7 -3.5,1.1 -2.8,2.5 -4,7 -5.2,2.9 -5.4,-0.4 -1.6,0.6 0.6,2.3 -2.9,2.2 -2.3,2.5 -7.1,2.4 -1.4,-1.4 -0.9,-0.2 -1,1.7 -4.7,0.4 -2.7,6.5 -1.4,1.1 -0.4,5 0.6,2.7 -0.4,1.9 2.6,3.3 0.5,2.3 2.1,3.2 2.6,2.1 0.3,2.9 0.6,1.8 2.9,-5.9 3.3,-3.4 3.8,1.1 3.6,0.4 0.5,-4.5 2.2,-3.2 3,-2 4.6,2.1 3.6,2.4 4.1,0.6 4.2,1.2 1.6,-3.8 0.8,-0.5 2.6,0.6 6.2,-3.1 2.2,1.3 1.8,-0.2 0.9,-1.5 2,-0.6 4.3,0.7 3.6,0.1 1.8,-0.6 -0.9,-2.1 -4.2,-2.5 -1.5,-3.8 -2.4,-2.7 -3.8,-3.4 -0.1,-2 -3.1,-2.6 -3.8,-2.5 z", CA: "m 659,276.7 -0.7,-3 -2.5,1.9 0.5,2.1 5.6,2.6 1.9,-0.4 3.3,-2.5 -4.7,0.1 -3.4,-0.8 z m 14.4,-15.9 0.2,-1.1 -4.1,-2.6 -5.9,-1.6 -1.9,0.6 3.5,2.9 5.7,1.9 2.5,-0.1 z m -305.3,3.7 0.2,-3.4 -3.2,-2.6 -0.4,-2.9 -0.1,-2.1 -4.1,-0.7 -2.4,-0.9 -4.1,-1.4 -1.4,1.5 -0.6,3.3 4.3,1.1 -0.4,1.8 2.9,2.2 0,2.2 6.3,2.8 3,-0.9 z m 336.1,-13.5 3.9,-3.8 1.4,-1.7 -2.1,-0.3 -4.9,2.2 -4.2,3.5 -8.1,9.8 -5.3,3.7 1.6,1.7 -3.8,2.2 0.2,1.9 9.6,0.1 5.4,-0.3 4.4,1.5 -4.4,2.9 2.9,0.2 7.3,-5.4 1.2,0.8 -2.5,5.1 3,1.2 2.3,-0.2 3.5,-5.5 -0.5,-3.9 0.3,-3.3 -3.7,1.1 2.8,-4.6 -4.3,-1.9 -2.7,1.5 -3.9,-1.7 2.4,-2.1 -2.9,-1.3 -3.8,2 4.9,-5.4 z m -356.8,-21.2 -1.9,2 -1.4,2.6 0.9,1.9 -0.6,2.8 0.7,2.8 1.9,0 -0.2,-4.9 7.1,-6.9 -4.9,0.5 -1.6,-0.8 z m 280.9,-47 -0.4,-1.2 -1.7,-0.1 -2.8,1.7 -0.4,0.4 0.1,1.7 1.7,0.5 3.5,-3 z m -9.6,-3.2 0.8,-1.1 -6,-0.1 -4.9,2.7 0,1.5 3,0.2 7.1,-3.2 z m -3.1,-16.6 -2.7,-0.5 -5,5.2 -3.6,4.4 -5.7,2.8 6.3,-0.6 -0.8,3.4 8.2,-3 6.2,-3 0.8,2.6 5.9,1.3 4.9,-1.8 -1.9,-1.8 -3.4,0.4 1.3,-2.7 -3.7,-1.7 -3.4,-1.9 -1.5,-1.5 -2.8,0.9 0.9,-2.5 z m 44.6,-8.2 3.7,-1.7 1,-0.7 1.4,-2.3 -2.3,-1.5 -4.2,0.7 -3.8,3.1 -0.7,2.6 4.9,-0.2 z m -73.8,-10.7 -0.8,-2 -0.3,-1 -1.6,-1 -3,-1.5 -4.9,2.3 -5,1.7 3.5,2.4 3.8,-0.6 4.1,1.6 4.2,-1.9 z m 22.4,-2.1 -6.6,-1 5.7,-2.6 -0.4,-6 -1.9,-2.3 -4.5,-0.8 -8.1,3.8 -5.5,5.8 2.9,2.1 1.6,3.3 -6.3,5.5 -3.2,-0.2 -6.2,4.4 4.2,-5.2 -4.8,-1.8 -4.5,0.9 -2.4,3.4 -5.9,-0.1 -7.2,0.8 -5.1,-2.4 -5,0.4 -1.5,-2.9 -2.1,-1.3 -3.8,0.5 -5.2,0.3 -4.4,1.8 2,2.3 -7,2.8 -1.4,-3.3 -4.4,1 -11.8,0.6 -6.4,-1.2 8.5,-2.6 -2.8,-2.8 -4.4,0.4 -4.7,-1 -7.5,-1.9 -3.8,-2.3 -4.5,-0.3 -3.3,1.6 -5.9,0.9 3.9,-4.1 -9.4,3.6 -1.4,-4.7 -2.1,-0.6 -3.8,2.5 -4.5,1.2 -0.2,-2.2 -8.2,1.4 -8.8,2.3 -5.2,-0.6 -7,1.6 -6.2,2.3 -3.7,-0.5 -3.3,-2.6 -5.9,-1.3 0,0 -24.3,20.2 -35.4,32.4 4.2,0.1 2.7,1.6 0.6,2.6 0.2,3.9 7.6,-3.3 6.4,-1.9 -0.5,3 0.7,2.4 1.7,2.7 -1.1,4.2 -1.5,6.8 4.6,3.8 -3.1,3.7 -5.1,2.9 0,0 -2.5,3.1 2.1,4.4 -3.1,4.9 4.1,2.6 -3.6,3.7 -1.3,5.5 6.9,2.5 1.6,2.7 5.4,6.1 0.7,0 13.9,0 14.6,0 4.8,0 15,0 14.5,0 14.7,0 14.8,0 16.7,0 16.8,0 10.1,0 1.3,-2.4 1.6,0 -0.8,3.4 1,1 3.2,0.4 4.6,1 3.8,1.9 4.4,-0.8 5.3,1.6 0,0 3.2,-2.4 3.2,-1 1.8,-1.5 1.5,-0.8 4,1.2 3.3,0.2 0.8,0.8 0.1,3.5 5.2,1 -1.7,1.7 1.2,1.9 -1.9,2.3 1.8,0.8 -1.9,2.1 0,0 1.2,0.2 1.3,-0.9 0.5,1.4 3.4,0.7 3.8,0.1 3.8,0.6 4,1.2 0.8,2 1.4,4.7 -2.4,2 -3.8,-0.8 -1,-3.8 -0.9,3.9 -3.8,3.4 -0.8,2.9 -1.1,1.7 -4.1,2 0,0 -3.7,3.4 -2,2.2 2.7,0.4 4.5,-2 2.9,-1.7 1.6,-0.3 2.6,0.6 1.7,-0.9 2.8,-0.8 4.7,-0.8 0,0 0,0 0.3,-1.8 -0.3,0.1 -1.7,0.3 -1.8,-0.6 2.3,-2.1 1.9,-0.7 3.9,-0.9 4.6,-0.9 1.8,1.2 1.9,-1.4 1.9,-0.8 0.9,0.4 0.1,0.1 6.7,-4.2 2.7,-1.2 7.7,0 9.3,0 1,-1.6 1.7,-0.3 2.5,-0.9 2.7,-2.8 3.2,-4.9 5.5,-4.7 1.1,1.7 3.7,-1.1 1.5,1.8 -2.8,8.5 2.1,3.5 5.9,-0.8 8.1,-0.2 -10.4,5.1 -1.5,5.2 3.7,0.5 7.1,-4.5 5.8,-2.4 12.2,-3.7 7.5,-4.1 -2.6,-2.2 1,-4.5 -7.1,7 -8.6,0.8 -5.5,-3.1 -0.1,-4.6 0.6,-6.8 6.1,-4.1 -3.3,-3.1 -7.6,0.6 -12.1,5.2 -10.9,8.2 -4.6,1 7.8,-5.7 10.1,-8.3 7.2,-2.7 5.7,-4.4 5.2,-0.5 7.3,0.1 10,1.3 8.6,-1 7.8,-5.1 8.7,-2.2 4.2,-2.1 4.2,-2.3 2,-6.8 -1.1,-2.3 -3.4,-0.8 0,-5.1 -2.3,-1.9 -6.9,-1.6 -2.8,-3.4 -4.8,-3.4 3.4,-3.7 -2,-7.1 -2.6,-7.5 -1,-5.2 -4.3,2.7 -7.4,6.5 -8.1,3.2 -1.6,-3.4 -3.7,-1 2.2,-7.3 2.6,-4.9 -7.7,-0.5 -0.1,-2.2 -3.6,-3.3 -3,-2 -4.5,1.5 -4.2,-0.5 -6.6,-1.6 -3.9,1.3 -3.8,9 -1,5.3 -8.8,6.1 3.1,4.5 0.5,5 -1.7,4 -4.7,4.1 -7.5,4.2 -9,2.8 1.7,3.2 -2.2,9.6 -5.6,6.3 -4.6,1.9 -4.4,-5.8 -0.1,-6.8 1.7,-6 3.6,-5.2 -4.8,-0.6 -7.5,-0.4 -3.6,-2.5 -4.8,-1.6 -1.7,-2.9 -3.3,-2.2 -7,-2.6 -7.1,1.2 0.7,-4.5 1.5,-5.5 -6,-1 4.9,-6.8 4.9,-4.6 9.4,-6.5 8.6,-4.6 5.6,-0.7 2.9,-3.7 5.1,-2.4 6.4,-0.4 7.7,-3.8 2.9,-2.4 7.4,-4.7 3.2,-2.8 3.2,1.7 6.5,-0.9 10.8,-3.8 2.3,-2.7 -0.8,-2.9 5,-2.9 1.7,-2.7 -3.5,-2.6 -5.4,-0.8 -5.5,-0.4 -4.6,5.9 -6.5,4.6 -7.2,4 -1.3,-3.7 4.2,-4 -2.2,-3.5 -8.7,4.2 4.3,-5.5 z m -75.5,-18.9 -2.8,-1 -14.1,3.2 -5.1,2 -7.8,3.9 5.4,1.4 6.2,-0.1 -11.5,2.1 0,1.9 5.6,0.1 9,-0.4 6.5,1.2 -6.2,1 -5.5,-0.3 -7.1,0.9 -3.3,0.6 0.6,4.2 4.2,-0.6 4.1,1.5 -0.3,2.5 7.8,-0.5 11.2,-0.8 9.4,-1.8 5,-0.4 5.7,1.5 6.7,0.8 3.1,-1.9 -0.7,-2.1 7,-0.4 2.6,-2.4 -5,-2.5 -4.2,-2.6 2.4,-3.6 2.7,-5.1 -2.2,-2 -3,-0.9 -4.2,0.8 -2.8,5.3 -4.3,2.1 2.2,-5.1 -1.7,-1.7 -7.3,2.7 -2.6,-2.6 -10.4,1.5 4.7,-2.4 z m 39.1,-1.5 -1.7,-1.1 -5.4,0.2 -2.1,0.7 2.2,3.6 7,-3.4 z m 107.7,1.6 -4.4,-2.8 -8.4,-0.5 -2.1,0.3 -1.7,1.8 2,2.8 0.9,0.3 4.8,-0.7 4.1,0.1 4.1,0.1 0.7,-1.4 z m -39.4,-0.3 5.7,-3.2 -11.2,1.3 -5.8,2.1 -7.1,4.6 -3.3,5.2 5.6,0.1 -6.1,2.3 1.8,1.9 5.9,0.8 7.3,1.5 13.8,1.2 7.9,-0.6 3.2,-1.6 2,1.8 3.3,0.3 2,3.3 -3.5,1.4 7.1,1.8 4.6,2.6 0.5,1.9 -0.4,2.4 -8.6,5.4 -3.2,2.7 0.2,2 -9.2,0.7 -8,0.1 -5.4,4.2 2.4,1.9 13,-0.9 0.9,-1.6 4.7,2.7 4.7,2.9 -2.4,1.6 3.8,2.8 7.6,3.3 10.7,2.3 0.3,-2 -2.8,-3.5 -3.5,-4.9 8.5,4.6 4.7,1.5 3.6,-4.1 0,-5.6 -1,-1.5 -4.4,-2.5 -2.7,-3.3 2.3,-3.2 5.8,-0.7 3.8,5.4 4,2.4 10.7,-6.5 3.3,-3.9 -6.4,-0.3 -3.2,-5.1 -5.9,-1.2 -7.7,-3.5 9,-2.5 -0.8,-5 -2.2,-2.1 -8.3,-2.1 -1.9,-3.3 -8.2,1.2 1.1,-2.3 -3.6,-2.5 -6.8,-2.6 -5.2,2.1 -9,1.5 3.3,-3.4 -2.3,-5.3 -11.6,2.1 -7.1,4.1 -0.3,-3.2 z m -50,-3.4 -7.1,2.4 0.9,3.4 -7.4,-0.7 -1.7,1.7 5.8,3.9 0.9,2 3.4,0.5 8.4,-2 5.1,-4.7 -3.8,-2.2 6,-2.4 0.5,-1.5 -7.5,0.6 -3.5,-1 z m 22.3,5.4 5.6,-1 10,-4.5 -6.1,-1.2 -7.8,-0.2 -5.2,1.4 -4.2,2.1 -2.5,2.6 -1.8,4.5 4.3,0.2 7.7,-3.9 z m -114.7,7.2 2.6,-2.3 9.1,-3.6 13.8,-3.6 6.4,-1.3 -1.6,-2.1 -1.9,-1.5 -9.4,-0.2 -4.1,-1.1 -14,0.8 -0.3,3.1 -7.6,3.3 -7.4,3.8 -4.3,2.2 5.9,2.7 -0.6,2.3 13.4,-2.5 z m 124.1,-18.3 0.3,-1.6 -1.4,-1.7 -6.9,1.3 -4.4,2.2 3.2,1.3 5.1,0.4 4.1,-1.9 z m -8.7,-8.6 -1.1,0.7 -4.8,-0.3 -7.6,1.6 -3.8,-0.1 -4.3,3.8 6.6,-0.4 -3.4,2.9 3.2,0.8 6.8,-0.5 5.8,-3.7 2.8,-2.5 -0.2,-2.3 z m -39.1,2.5 1.8,-2.3 -3.1,-0.5 -5.7,1.7 -0.7,4.7 -6.1,-0.4 -2.8,-2.9 -8.2,-1.6 -5.4,1.4 -11.6,4.8 4.1,0.8 17.8,-0.5 -10.6,2.2 -1.5,1.6 5.9,-0.1 12.2,-2.2 13.8,-0.8 5.1,-2.3 2.3,-2.4 -3.7,-0.2 -4.3,0.8 0.7,-1.8 z m 55.2,-4.3 -7.1,-0.3 -3.8,2 2.6,1.5 7,0.6 1.4,2.1 -2.2,2.4 -1.5,2.8 8.5,1.6 5.5,0.6 8,-0.1 11.6,-0.8 4.3,0.6 6.7,-1 3.5,-1.4 1,-2 -2.3,-1.9 -5.8,-0.3 -8,0.4 -7,1.1 -5.1,-0.4 -4.8,-0.3 -1.2,-1.1 -3.1,-1.1 2.8,-1.9 -1.4,-1.6 -7.3,0.1 -2.3,-1.6 z m -75,-2.6 -6,0.7 -5.5,-0.1 -12.1,3.1 -11.6,3.7 0,0 3.6,1 7,-0.7 9.8,-2.1 3.8,-0.3 5.2,-1.6 5.8,-3.7 z m 80.5,0.6 1,-0.5 -1.5,-0.9 -7.2,-0.1 -0.6,1.3 6.4,0.3 1.9,-0.1 z m -58.4,-0.8 3.2,-1.4 -4.1,-0.8 -5.9,0.5 -5.1,1.5 3.3,1.5 8.6,-1.3 z m 7.8,-4.2 -3.3,-0.9 -1.6,-0.2 -5.7,1.3 -1,0.7 6,0 5.6,-0.9 z m 46.4,2.5 3,-1.7 -2.3,-1.6 -1.7,-0.3 -4.4,-0.1 -2.1,1.8 -0.7,1.8 1.6,1.1 6.6,-1 z m -13.7,-1.2 0.1,-2.2 -7.4,-1.7 -6.1,-0.6 -2.1,1.7 2.8,1.1 -5.3,1.4 7.7,0.2 4,1.5 5.2,0.5 1.1,-1.9 z m 53.7,-6.1 0.6,-2.8 -4.7,-0.8 -4.7,-0.9 -1.6,-2.2 -8.2,0.2 0.3,0.9 -3.9,0.3 -4.1,1.3 -4.9,1.9 -0.3,1.9 2,1.5 6.5,0 -4.3,1.2 -2.1,1.6 1.6,1.9 6.7,0.6 6.8,-0.4 10.5,-3.4 6.4,-1.3 -2.6,-1.5 z m 78.5,-13.8 -7,-0.2 -6.9,-0.3 -10.2,0.6 -1.4,-0.4 -10.3,0.2 -6.4,0.4 -5.1,0.6 -5,2 -2.3,-1 -3.9,-0.2 -6.7,1.4 -7.4,0.6 -4.1,0.1 -6,0.8 -1.1,1.3 2.5,1.2 0.8,1.6 4.4,1.5 12.4,-0.3 7.2,0.5 -7.2,1.5 -2.2,-0.4 -9.3,-0.2 -1.1,2.2 3,1.7 -2.8,1.6 -7.5,1.1 -4.9,1.7 4.8,0.9 1.7,3 -7.5,-2 -2.5,0.3 -2,3.4 -8,1.1 -2,2.3 6.7,0.3 4.9,0.6 11.7,-0.8 8.4,1.4 12.6,-3 1,-1.1 -6.4,0.2 0.5,-1.1 6.5,-1.4 3.6,-1.9 6.8,-1.3 5,-1.6 -0.8,-2.2 3.3,-0.8 -4.3,-0.6 11.1,-0.4 3.2,-0.9 7.9,-0.8 9.3,-3.5 6.8,-1.1 10.3,-2.5 -7.4,0 3.9,-0.9 9,-0.8 9.7,-1.6 1.1,-1.1 -5.2,-1 -6.7,-0.4 -8.5,-0.3 z", CH: "m 1024.3,270.6 -5.4,-1.9 -1,1.4 -4.2,0 -1.3,1 -2.3,-0.6 0.2,1.6 -3.5,3.5 0,2.8 2.4,-0.9 1.8,2.7 2.2,1.3 2.4,-0.3 2.7,-2.1 0.9,1 2.4,-0.2 0.9,-2.5 3.8,0.8 2.1,-1.1 0.3,-2.5 -2.6,-0.2 -2.3,-1.1 0.7,-1.6 -0.2,-1.1 z", CL: "m 648.4,905.2 -3.7,-0.7 -3.3,2.5 0.2,4.1 -1.2,2.8 -7.2,-2.2 -8.6,-4 -4.5,-1.3 9.7,6.8 6.3,3.2 7.5,3.4 5.3,0.9 4.3,1.8 3,0.5 2.3,0.1 3.2,-1.8 0.5,-2.4 -2.9,-0.2 -5,0 -5.9,-13.5 z m -47.3,-196.3 -3.7,-7.1 1.1,-6.2 -3.2,-2.7 -1.2,-4.6 -3.1,-4.3 -1.2,3.3 -2.7,1.6 2.1,9 1.5,10.4 -0.1,14.2 0,13.2 0.9,12.3 -1.9,7.8 2.1,7.8 -0.5,5.3 3.2,9.5 -0.1,9.5 -1.2,10.2 -0.6,10.5 -2.1,0.2 2.4,7.3 3.3,6.3 -1.1,4.3 1.9,11.6 1.5,8.8 3.5,0.9 -1.1,-7.7 4,1.6 1.8,12.7 -6.4,-2.1 2,10.2 -2.7,5.5 8.2,1.8 -3.4,4.8 0.2,6 5,10.6 4.2,4.1 0.2,3.6 3.3,3.8 7.5,3.5 0,0 7.4,4.2 6.2,2 2,-0.1 -1.8,-5.7 3.4,-2.2 1.7,-1.5 4.2,0 -4.8,-0.9 -12,-0.8 -3.5,-3.6 -1.8,-4.6 -3.1,0.4 -2.6,-2.2 -3.1,-6.6 2.7,-2.7 0.1,-3.9 -1.8,-3.2 0.7,-5.3 -1.1,-8.2 -1.8,-3.7 1.8,-1.1 -1.3,-2.3 -2.8,-1.3 0.8,-2.6 -3.1,-2.3 -3.6,-7.1 1.6,-1.2 -3.3,-7.6 -0.7,-6.4 -0.3,-5.7 2.5,-2.4 -3.3,-6.3 -1.5,-5.9 2.9,-4.3 -1.4,-5.4 1.6,-6.2 -1.3,-5.9 -1.6,-1.2 -4.9,-10.9 2.1,-6.5 -1.7,-6.2 0.9,-5.8 2.6,-5.9 3.2,-4 -2,-2.5 0.9,-2 -1.6,-10.6 5.6,-3.2 1.1,-6.6 -0.9,-1.6 -3.8,0.9 -3.1,-8.8 z", CN: "m 1587.2,453.3 0.6,-3.6 2,-2.8 -1.6,-2.5 -3.2,-0.1 -5.8,1.8 -2.2,2.8 1,5.5 4.9,2 4.3,-3.1 z m 13.2,-196.5 -6.1,-6.1 -4.4,-3.7 -3.8,-2.7 -7.7,-6.1 -5.9,-2.3 -8.5,-1.8 -6.2,0.2 -5.1,1.1 -1.7,3 3.7,1.5 2.5,3.3 -1.2,2 0.1,6.5 1.9,2.7 -4.4,3.9 -7.3,-2.3 0.6,4.6 0.3,6.2 2.7,2.6 2.4,-0.8 5.4,1 2.5,-2.3 5.1,2 7.2,4.3 0.7,2.2 -4.3,-0.7 -6.8,0.8 -2.4,1.8 -1.4,4.1 -6.3,2.4 -3.1,3.3 -5.9,-1.3 -3.2,-0.5 -0.4,4 2.9,2.3 1.9,2.1 -2.5,2 -1.9,3.3 -4.9,2.2 -7.5,0.2 -7.2,2.2 -4.4,3.3 -3.2,-2 -6.2,0.1 -9.3,-3.8 -5.5,-0.9 -6.4,0.8 -11.2,-1.3 -5.5,0.1 -4.7,-3.6 -4.9,-5.7 -3.4,-0.7 -7.9,-3.8 -7.2,-0.9 -6.4,-1 -3,-2.7 -1.3,-7.3 -5.8,-5 -8.1,-2.3 -5.7,-3.3 -3.3,-4.4 -1.7,0.5 -1.8,4.2 -3.8,0.6 2.5,6.2 -1.6,2.8 -10.7,-2 1,11.1 -2,1.4 -9,2.4 8.7,10.7 -2.9,1.6 1.7,3.5 -0.2,1.4 -6.8,3.4 -1,2.4 -6.4,0.8 -0.6,4 -5.7,-0.9 -3.2,1.2 -4,3 1.1,1.5 -1,1.5 3,5.9 1.6,-0.6 3.5,1.4 0.6,2.5 1.8,3.7 1.4,1.9 4.7,3 2.9,5 9.4,2.6 7.6,7.5 0.8,5.2 3,3.3 0.6,3.3 -4.1,-0.9 3.2,7 6.2,4 8.5,4.4 1.9,-1.5 4.7,2 6.4,4.1 3.2,0.9 2.5,3.1 4.5,1.2 5,2.8 6.4,1.5 6.5,0.6 3,-1.4 1.5,5.1 2.6,-4.8 2.6,-1.6 4.2,1.5 2.9,0.1 2.7,1.8 4.2,-0.8 3.9,-4.8 5.3,-4 4.9,1.5 3.2,-2.6 3.5,3.9 -1.2,2.7 6.1,0.9 3,-0.4 2.7,3.7 2.7,1.5 1.3,4.9 0.8,5.3 -4.1,5.3 0.7,7.5 5.6,-1 2.3,5.8 3.7,1.3 -0.8,5.2 4.5,2.4 2.5,1.2 3.8,-1.8 0.6,2.6 0.7,1.5 2.9,0.1 -1.9,-7.2 2.7,-1 2.7,-1.5 4.3,0 5.3,-0.7 4.1,-3.4 3,2.4 5.2,1.1 -0.2,3.7 3,2.6 5.9,1.6 2.4,-1 7.7,2 -0.9,2.5 2.2,4.6 3,-0.4 0.8,-6.7 5.6,-0.9 7.2,-3.2 2.5,-3.2 2.3,2.1 2.8,-2.9 6.1,-0.7 6.6,-5.3 6.3,-5.9 3.3,-7.6 2.3,-8.4 2.1,-6.9 2.8,-0.5 -0.1,-5.1 -0.8,-5.1 -3.8,-2 -2.5,-3.4 2.8,-1.7 -1.6,-4.7 -5.4,-4.9 -5.4,-5.8 -4.6,-6.3 -7.1,-3.5 0.9,-4.6 3.8,-3.2 1,-3.5 6.7,-1.8 -2.4,-3.4 -3.4,-0.2 -5.8,-2.5 -3.9,4.6 -4.9,-1.9 -1.5,-2.9 -4.7,-1 -4.7,-4.4 1.2,-3 5,-0.3 1.2,-4.1 3.6,-4.4 3.4,-2.2 4.4,3.3 -1.9,4.2 2.3,2.5 -1.4,3 4.8,-1.8 2.4,-2.9 6.3,-1.9 2.1,-4 3.8,-3.4 1,-4.4 3.6,2 4.6,0.2 -2.7,-3.3 6.3,-2.6 -0.1,-3.5 5.5,3.6 0,0 -1.9,-3.1 2.5,-0.1 -3.8,-7.3 -4.7,-5.3 2.9,-2.2 6.8,1.1 -0.6,-6 -2.8,-6.8 0.4,-2.3 -1.3,-5.6 -6.9,1.8 -2.6,2.5 -7.5,0 -6,-5.8 -8.9,-4.5 -9.9,-1.9 z", CI: "m 946.5,506.2 -2.3,0.9 -1.3,0.8 -0.9,-2.7 -1.6,0.7 -1,-0.1 -1,1.9 -4.3,-0.1 -1.6,-1 -0.7,0.6 -1.1,0.5 -0.5,2.2 1.3,2.6 1.3,5.1 -2,0.8 -0.6,0.9 0.4,1.2 -0.3,2.8 -0.9,0 -0.3,1.8 0.6,3.1 -1.2,2.8 1.6,1.8 1.8,0.4 2.3,2.7 0.2,2.5 -0.5,0.8 -0.5,5.2 1.1,0.2 5.6,-2.4 3.9,-1.8 6.6,-1.1 3.6,-0.1 3.9,1.3 2.6,-0.1 0.2,-2.5 -2.4,-5.5 1.5,-7.2 2.3,-5.3 -1.4,-9.1 -3.8,-1.6 -2.7,0.2 -1.9,1.6 -2.5,-1.3 -1,-2.1 -2.5,-1.4 z", CM: "m 1060.1,502.9 0.2,-4.3 -0.5,-4.2 -2.2,-4.1 -1.6,0.4 -0.2,2 2.3,2.6 -0.6,1.1 -0.3,2.1 -4.6,5 -1.5,4 -0.7,3.3 -1.2,1.4 -1.1,4.5 -3,2.6 -0.8,3.2 -1.2,2.6 -0.5,2.6 -3.9,2.2 -3.2,-2.6 -2.1,0.1 -3.3,3.7 -1.6,0.1 -2.7,6.1 -1.4,4.5 0,1.8 1.4,0.9 1.1,2.8 2.6,1.1 2.2,4.2 -0.8,5 9.2,0.2 2.6,-0.4 3.4,0.8 3.4,-0.8 0.7,0.3 7.1,0.3 4.5,1.7 4.5,1.5 0.4,-3.5 -0.6,-1.8 -0.3,-2.9 -2.6,-2.1 -2.1,-3.2 -0.5,-2.3 -2.6,-3.3 0.4,-1.9 -0.6,-2.7 0.4,-5 1.4,-1.1 2.7,-6.5 0.9,-1.7 -1.8,-4.4 -0.8,-2.6 -2.5,-1.1 -3.3,-3.7 1.2,-3 2.5,0.6 1.6,-0.4 3.1,0.1 -3.1,-5.8 z", CD: "m 1124.9,539.4 -4.3,-0.7 -2,0.6 -0.9,1.5 -1.8,0.2 -2.2,-1.3 -6.2,3.1 -2.6,-0.6 -0.8,0.5 -1.6,3.8 -4.2,-1.2 -4.1,-0.6 -3.6,-2.4 -4.6,-2.1 -3,2 -2.2,3.2 -0.5,4.5 -0.3,3.8 -1.6,3.4 -1.1,4 -0.7,5.6 0.3,3.6 -0.9,2.2 -0.2,2.4 -0.6,2 -3.7,3.1 -2.6,3.2 -2.5,6.2 0.2,5.3 -1.4,2 -3.3,3.1 -3.4,4 -2,-1.1 -0.4,-1.8 -3.1,-0.1 -1.9,2.4 -1.5,-0.6 -2,1.3 -0.9,1.7 -0.2,2.7 -1.5,0.7 0.8,2 2.3,-0.9 1.7,0.1 1.9,-0.7 16.6,0.1 1.3,4.7 1.6,3.8 1.3,2.1 2.1,3.3 3.7,-0.5 1.9,-0.9 3,0.9 0.9,-1.6 1.5,-3.7 3.4,-0.3 0.3,-1.1 2.9,0 -0.5,2.3 6.8,0 0,4 1.2,2.4 -0.9,3.8 0.3,4 1.9,2.3 -0.5,7.6 1.4,-0.6 2.4,0.2 3.5,-1 2.6,0.4 1.9,0.1 0.3,2 2.6,-0.1 3.5,0.6 1.8,2.8 4.5,0.9 3.4,-2 1.2,3.4 4.3,0.8 2,2.8 2.1,3.5 4.3,0 -0.3,-6.9 -1.5,1.2 -3.9,-2.5 -1.4,-1.1 0.8,-6.4 1.2,-7.5 -1.2,-2.8 1.6,-4.1 1.6,-0.7 7.5,-1.1 1,0.3 0.2,-1.1 -1.5,-1.7 -0.7,-3.5 -3.4,-3.5 -1.8,-4.5 1,-2.7 -1.5,-3.6 1.1,-10.2 0.1,0.1 -0.1,-1.1 -1.4,-2.9 0.6,-3.5 0.8,-0.4 0.2,-3.8 1.6,-1.8 0.1,-4.8 1.3,-2.4 0.3,-5.1 1.2,-3 2.1,-3.3 2.2,-1.7 1.8,-2.3 -2.3,-0.8 0.3,-7.5 0,0 -5,-4.2 -1.4,-2.7 -3.1,1.3 -2.6,-0.4 -1.5,1.1 -2.5,-0.8 -3.5,-5.2 -1.8,0.6 -3.6,-0.1 z", CG: "m 1080.3,549.9 -3.6,-0.4 -3.8,-1.1 -3.3,3.4 -2.9,5.9 -0.4,3.5 -4.5,-1.5 -4.5,-1.7 -7.1,-0.3 -0.4,2.8 1.5,3.3 4.2,-0.5 1.4,1.2 -2.4,7.4 2.7,3.8 0.6,4.9 -0.8,4.3 -1.7,3 -4.9,-0.3 -3,-3 -0.5,2.8 -3.8,0.8 -1.9,1.6 2.1,4.2 -4.3,3.5 4.6,6.7 2.2,-2.7 1.8,-1.1 2,2.2 1.5,0.6 1.9,-2.4 3.1,0.1 0.4,1.8 2,1.1 3.4,-4 3.3,-3.1 1.4,-2 -0.2,-5.3 2.5,-6.2 2.6,-3.2 3.7,-3.1 0.6,-2 0.2,-2.4 0.9,-2.2 -0.3,-3.6 0.7,-5.6 1.1,-4 1.6,-3.4 0.3,-3.8 z", CO: "m 578.3,497.2 1.2,-2.1 -1.3,-1.7 -2,-0.4 -2.9,3.1 -2.3,1.4 -4.6,3.2 -4.3,-0.5 -0.5,1.3 -3.6,0.1 -3.3,3 -1.4,5.4 -0.1,2.1 -2.4,0.7 -4.4,4.4 -2.9,-0.2 -0.7,0.9 1.1,3.8 -1.1,1.9 -1.8,-0.5 -0.9,3.1 2.2,3.4 0.6,5.4 -1.2,1.6 1.1,5.9 -1.2,3.7 2,1.5 -2.2,3.3 -2.5,4 -2.8,0.4 -1.4,2.3 0.2,3.2 -2.1,0.5 0.8,2 5.6,3.6 1,-0.1 1.4,2.7 4.7,0.9 1.6,-1 2.8,2.1 2.4,1.5 1.5,-0.6 3.7,3 1.8,3 2.7,1.7 3.4,6.7 4.2,0.8 3,-1.7 2.1,1.1 3.3,-0.6 4.4,3 -3.5,6.5 1.7,0.1 2.9,3.4 2.2,-17.4 0.1,-2.8 -0.9,-3.6 -2.5,-2.4 0,-4.6 3.2,-1 1.1,0.6 0.2,-2.4 -3.3,-0.7 0,-3.9 10.9,0.1 1.9,-2.2 1.6,2 1,3.8 1.1,-0.8 -1.7,-6.4 -1.4,-2.2 -2,-1.4 2.9,-3.1 -0.2,-1.5 -1.5,-1.9 -1,-4.2 0.5,-4.6 1.3,-2.1 1.2,-3.4 -2,-1.1 -3.2,0.7 -4,-0.3 -2.3,0.7 -3.8,-5.5 -3.2,-0.8 -7.2,0.6 -1.3,-2.2 -1.3,-0.6 -0.2,-1.3 0.8,-2.4 -0.4,-2.5 -1.1,-1.4 -0.6,-2.9 -2.9,-0.5 1.8,-3.7 0.9,-4.5 1.8,-2.4 2.2,-1.8 1.6,-3.2 3.7,-1.1 z", CR: "m 509.1,502.6 -1.4,1.3 -1.7,-0.4 -0.8,-1.3 -1.7,-0.5 -1.4,0.8 -3.5,-1.7 -0.9,0.8 -1.4,1.2 1.5,0.9 -0.9,2 -0.1,2 0.7,1.3 1.7,0.6 1.2,1.8 1.2,-1.6 -0.3,-1.8 1.4,1.1 0.3,1.9 1.9,0.8 2.1,1.3 1.5,1.5 0.1,1.4 -0.7,1.1 1.1,1.3 2.9,1.4 0.4,-1.2 0.5,-1.3 -0.1,-1.2 0.8,-0.7 -1.1,-1 0.1,-2.5 2.2,-0.6 -2.4,-2.7 -2,-2.6 -1.2,-3.4 z", CU: "m 539,427.3 -4.9,-2.1 -4.3,-0.1 -4.7,-0.5 -1.4,0.7 -4.2,0.6 -3,1.3 -2.7,1.4 -1.5,2.3 -3.1,2 2.2,0.6 2.9,-0.7 0.9,-1.6 2.3,-0.1 4.4,-3.3 5.4,0.3 -2.3,1.6 1.8,1.3 7,1 1.5,1.3 4.9,1.7 3.2,-0.2 0.8,3.6 1.7,1.8 3.5,0.4 2.1,1.7 -4.1,3.5 7.9,-0.6 3.8,0.5 3.7,-0.3 3.8,-0.8 0.8,-1.5 -3.9,-2.6 -4,-0.3 0.6,-1.7 -3.1,-1.3 -1.9,0 -3,-2.8 -4.2,-4 -1.8,-1.5 -5.2,0.8 -1.9,-2.4 z", CZ: "m 1049.4,248.5 -2.1,0.6 -1.4,-0.7 -1.1,1.2 -3.4,1.2 -1.7,1.5 -3.4,1.3 1,1.9 0.7,2.6 2.6,1.5 2.9,2.6 3.8,2 2.6,-2.5 1.7,-0.5 4,1.9 2.3,-0.3 2.3,1.2 0.6,-1.4 2.2,0.1 1.6,-0.6 0.1,-0.6 0.9,-0.3 0.2,-1.4 1.1,-0.3 0.6,-1.1 1.5,0 -2.6,-3.1 -3.6,-0.3 -0.7,-2 -3.4,-0.6 -0.6,1.5 -2.7,-1.2 0.1,-1.7 -3.7,-0.6 -2.4,-1.9 z", DE: "m 1043.6,232.3 -2.4,-1.9 -5.5,-2.4 -2.5,1.7 -4.7,1.1 -0.1,-2.1 -4.9,-1.4 -0.2,-2.3 -3,0.9 -3.6,-0.8 0.4,3.4 1.2,2.2 -3,3 -1,-1.3 -3.9,0.3 -0.9,1.3 1,2 -1,5.6 -1.1,2.3 -2.9,0 1.1,6.4 -0.4,4.2 1,1.4 -0.2,2.7 2.4,1.6 7.1,1.2 -2.3,4.2 -0.5,4.5 4.2,0 1,-1.4 5.4,1.9 1.5,-0.3 2.6,1.7 0.6,-1.6 4.4,0.3 3.4,-1.2 2.4,0.2 1.7,1.3 0.4,-1.1 -1,-4 1.7,-0.8 1.5,-2.9 -2.9,-2.6 -2.6,-1.5 -0.7,-2.6 -1,-1.9 3.4,-1.3 1.7,-1.5 3.4,-1.2 1.1,-1.2 1.4,0.7 2.1,-0.6 -2.3,-3.9 0.1,-2.1 -1.4,-3.3 -2,-2.2 1.2,-1.6 -1.4,-3.1 z", DJ: "m 1217.8,499.2 -2.5,-1.7 3.1,-1.5 0.1,-2.7 -1.4,-1.9 -1.6,1.5 -2.4,-0.5 -1.9,2.8 -1.8,3 0.5,1.7 0.2,2 3.1,0.1 1.3,-0.5 1.3,1.1 2,-3.4 z", DK: "m 1035.9,221.2 -1.7,-3 -6.7,2 0.9,2.5 5.1,3.4 2.4,-4.9 z m -8.6,-5.1 -2.6,-0.9 -0.7,-1.6 1.3,-2 -0.1,-3 -3.6,1.6 -1.5,1.7 -4,0.4 -1.2,1.7 -0.7,1.6 0.4,6.1 2.1,3.4 3.6,0.8 3,-0.9 -1.5,-3 3.1,-4.3 1.4,0.7 1,-2.3 z", DO: "m 579.6,457.4 0,1.8 1.4,1 2.6,-4.4 2,-0.9 0.6,1.6 2.2,-0.4 1.1,-1.2 1.8,0.3 2.6,-0.2 2.5,1.3 2.3,-2.6 -2.5,-2.3 -2.4,-0.2 0.3,-1.9 -3,0.1 -0.8,-2.2 -1.4,0.1 -3.1,-1.6 -4.4,-0.1 -0.8,1.1 0.2,3.5 -0.7,2.4 -1.5,1.1 1.2,1.9 -0.2,1.8 z", DZ: "m 1021,336.9 -3.6,0.4 -2.2,-1.5 -5.6,0 -4.9,2.6 -2.7,-1 -8.7,0.5 -8.9,1.2 -5,2 -3.4,2.6 -5.7,1.2 -5.1,3.5 2,4.1 0.3,3.9 1.8,6.7 1.4,1.4 -1,2.5 -7,1 -2.5,2.4 -3.1,0.5 -0.3,4.7 -6.3,2.5 -2.1,3.2 -4.4,1.7 -5.4,1 -8.9,4.7 -0.1,7.5 0,0.4 -0.1,1.2 20.3,15.5 18.4,13.9 18.6,13.8 1.3,3 3.4,1.8 2.6,1.1 0.1,4 6.1,-0.6 7.8,-2.8 15.8,-12.5 18.6,-12.2 -2.5,-4 -4.3,-2.9 -2.6,1.2 -2,-3.6 -0.2,-2.7 -3.4,-4.7 2.1,-2.6 -0.5,-4 0.6,-3.5 -0.5,-2.9 0.9,-5.2 -0.4,-3 -1.9,-5.6 -2.6,-11.3 -3.4,-2.6 0,-1.5 -4.5,-3.8 -0.6,-4.8 3.2,-3.6 1.1,-5.3 -1,-6.2 1,-3.3 z", EC: "m 553.1,573.1 -2.4,-1.5 -2.8,-2.1 -1.6,1 -4.7,-0.9 -1.4,-2.7 -1,0.1 -5.6,-3.6 -3.9,2.5 -3.1,1.4 0.4,2.6 -2.2,4.1 -1,3.9 -1.9,1 1,5.8 -1.1,1.8 3.4,2.7 2.1,-2.9 1.3,2.8 -2.9,4.7 0.7,2.7 -1.5,1.5 0.2,2.3 2.3,-0.5 2.3,0.7 2.5,3.2 3.1,-2.6 0.9,-4.3 3.3,-5.5 6.7,-2.5 6,-6.7 1.7,-4.1 -0.8,-4.9 z", EG: "m 1129.7,374.8 -5.5,-1.9 -5.3,-1.7 -7.1,0.2 -1.8,3 1.1,2.7 -1.2,3.9 2,5.1 1.3,22.7 1,23.4 22.1,0 21.4,0 21.8,0 -1,-1.3 -6.8,-5.7 -0.4,-4.2 1,-1.1 -5.3,-7 -2,-3.6 -2.3,-3.5 -4.8,-9.9 -3.9,-6.4 -2.8,-6.7 0.5,-0.6 4.6,9.1 2.7,2.9 2,2 1.2,-1.1 1.2,-3.3 0.7,-4.8 1.3,-2.5 -0.7,-1.7 -3.9,-9.2 0,0 -2.5,1.6 -4.2,-0.4 -4.4,-1.5 -1.1,2.1 -1.7,-3.2 -3.9,-0.8 -4.7,0.6 -2.1,1.8 -3.9,2 -2.6,-1 z", ER: "m 1198.1,474 -3.2,-3.1 -1.8,-5.9 -3.7,-7.3 -2.6,3.6 -4,1 -1.6,2 -0.4,4.2 -1.9,9.4 0.7,2.5 6.5,1.3 1.5,-4.7 3.5,2.9 3.2,-1.5 1.4,1.3 3.9,0.1 4.9,2.5 1.6,2.2 2.5,2.1 2.5,3.7 2,2.1 2.4,0.5 1.6,-1.5 -2.8,-1.9 -1.9,-2.2 -3.2,-3.7 -3.2,-3.6 -7.9,-6 z", EE: "m 1093.2,197.5 -5.5,0.9 -5.4,1.6 0.9,3.4 3.3,2.1 1.5,-0.8 0.1,3.5 3.7,-1 2.1,0.7 4.4,2.2 3.8,0 1.6,-1.9 -2.5,-5.5 2.6,-3.4 -0.9,-1 0,0 -4.6,0.2 -5.1,-1 z", ET: "m 1187.6,477 -1.5,4.7 -6.5,-1.3 -0.7,5.5 -2.1,6.2 -3.2,3.2 -2.3,4.8 -0.5,2.6 -2.6,1.8 -1.4,6.7 0,0.7 0.2,5 -0.8,2 -3,0.1 -1.8,3.6 3.4,0.5 2.9,3.1 1,2.5 2.6,1.5 3.5,6.9 2.9,1.1 0,3.6 2,2.1 3.9,0 7.2,5.4 1.8,0 1.3,-0.1 1.2,0.7 3.8,0.5 1.6,-2.7 5.1,-2.6 2.3,2.1 3.8,0 1.5,-2 3.6,-0.1 4.9,-4.5 7.4,-0.3 15.4,-19.1 -4.8,0.1 -18.5,-7.6 -2.2,-2.2 -2.1,-3.1 -2.2,-3.5 1.1,-2.3 -1.3,-1.1 -1.3,0.5 -3.1,-0.1 -0.2,-2 -0.5,-1.7 1.8,-3 1.9,-2.8 -2,-2.1 -2.5,-3.7 -2.5,-2.1 -1.6,-2.2 -4.9,-2.5 -3.9,-0.1 -1.4,-1.3 -3.2,1.5 -3.5,-2.9 z", FI: "m 1093.4,144.4 0.8,-3.8 -5.7,-2.1 -5.8,1.8 -1.1,3.9 -3.4,2.4 -4.7,-1.3 -5.3,0.3 -5.1,-2.9 -2.1,1.4 5.9,2.7 7.2,3.7 1.7,8.4 1.9,2.2 6.4,2.6 0.9,2.3 -2.6,1.2 -8.7,6.1 -3.3,3.6 -1.5,3.3 2.9,5.2 -0.1,5.7 4.7,1.9 3.1,3.1 7.1,-1.2 7.5,-2.1 8,-0.5 0,0 7.9,-7.4 3.3,-3.3 0.9,-2.9 -7.3,-3.9 0.9,-3.7 -4.9,-4.1 1.7,-4.8 -6.4,-6.3 2.8,-4.1 -7.2,-3.7 -0.4,-3.7 z", FJ: "m 1976.7,674.4 -3.7,2 -1.9,0.3 -3.1,1.3 0.2,2.4 3.9,-1.3 3.9,-1.6 0.7,-3.1 z m -11,8.1 -1.6,1 -2.3,-0.8 -2.7,2.2 -0.2,2.8 2.9,0.8 3.6,-0.9 1.8,-3.3 -1.5,-1.8 z", GA: "m 1050.2,557.7 -0.7,-0.3 -3.4,0.8 -3.4,-0.8 -2.6,0.4 0,7.6 -8.2,0 -1.9,0.3 -1.1,4.8 -1.3,4.6 -1.3,2 -0.2,2.1 3.4,6.6 3.7,5.3 5.8,6.4 4.3,-3.5 -2.1,-4.2 1.9,-1.6 3.8,-0.8 0.5,-2.8 3,3 4.9,0.3 1.7,-3 0.8,-4.3 -0.6,-4.9 -2.7,-3.8 2.4,-7.4 -1.4,-1.2 -4.2,0.5 -1.5,-3.3 0.4,-2.8 z", GB: "m 950,227.5 -4.9,-3.7 -3.9,0.3 0.8,3.2 -1.1,3.2 2.9,-0.1 3.5,1.3 2.7,-4.2 z m 13,-24.3 -5.5,0.5 -3.6,-0.4 -3.7,4.8 -1.9,6.1 2.2,3 0.1,5.8 2.6,-2.8 1.4,1.6 -1.7,2.7 1,1.6 5.7,1.1 0.1,0 3.1,3.8 -0.8,3.5 0,0 -7.1,-0.6 -1,4 2.6,3.3 -5.1,1.9 1.3,2.4 7.5,1 0,0 -4.3,1.3 -7.3,6.5 2.5,1.2 3.5,-2.3 4.5,0.7 3.3,-2.9 2.2,1.2 8.3,-1.7 6.5,0.1 4.3,-3.3 -1.9,-3.1 2.4,-1.8 0.5,-3.9 -5.8,-1.2 -1.3,-2.3 -2.9,-6.9 -3.2,-1 -4.1,-7.1 -0.4,-0.6 -4.8,-0.4 4.2,-5.3 1.3,-4.9 -5,0 -4.7,0.8 5,-6.4 z", GE: "m 1200,300.2 -7.5,-2.9 -7.7,-1 -4.5,-1.1 -0.5,0.7 2.2,1.9 3,0.7 3.4,2.3 2.1,4.2 -0.3,2.7 5.4,-0.3 5.6,3 6.9,-1 1.1,-1 4.2,1.8 2.8,0.4 0.6,-0.7 -3.2,-3.4 1.1,-0.9 -3.5,-1.4 -2.1,-2.5 -5.1,-1.3 -2.9,1 -1.1,-1.2 z", GH: "m 976.8,502.1 -2.6,-0.5 -1.8,1 -2.4,-0.5 -9.7,0.3 -0.2,3.6 0.8,4.8 1.4,9.1 -2.3,5.3 -1.5,7.2 2.4,5.5 -0.2,2.5 5,1.8 5,-1.9 3.2,-2.1 8.7,-3.8 -1.2,-2.2 -1.5,-4 -0.4,-3.2 1.2,-5.7 -1.4,-2.3 -0.6,-5.1 0.1,-4.6 -2.4,-3.3 0.4,-1.9 z", GN: "m 912.4,493 -0.8,0.4 -3,-0.5 -0.4,0.7 -1.3,0.1 -4,-1.5 -2.7,-0.1 -0.1,2.1 -0.6,0.7 0.4,2.1 -0.8,0.9 -1.3,0 -1.4,1 -1.7,-0.1 -2.6,3.1 1.6,1.1 0.8,1.4 0.7,2.8 1.3,1.2 1.5,0.9 2.1,2.5 2.4,3.7 3,-2.8 0.7,-1.7 1,-1.4 1.5,-0.2 1.3,-1.2 4.5,0 1.5,2.3 1.2,2.7 -0.2,1.8 0.9,1.7 0,2.3 1.5,-0.3 1.2,-0.2 1.5,-0.7 2.3,3.9 -0.4,2.6 1.1,1.3 1.6,0.1 1.1,-2.6 1.6,0.2 0.9,0 0.3,-2.8 -0.4,-1.2 0.6,-0.9 2,-0.8 -1.3,-5.1 -1.3,-2.6 0.5,-2.2 1.1,-0.5 -1.7,-1.8 0.3,-1.9 -0.7,-0.7 -1.2,0.6 0.2,-2.1 1.2,-1.6 -2.3,-2.7 -0.6,-1.7 -1.3,-1.4 -1.1,-0.2 -1.3,0.9 -1.8,0.8 -1.6,1.4 -2.4,-0.5 -1.5,-1.6 -0.9,-0.2 -1.5,0.8 -0.9,0 -0.3,-2.3 z", GM: "m 882.8,488.5 5,0.1 1.4,-0.9 1,0 2.1,-1.5 2.4,1.4 2.4,0.1 2.4,-1.5 -1.1,-1.8 -1.8,1.1 -1.8,-0.1 -2.1,-1.5 -1.8,0.1 -1.3,1.5 -6.1,0.2 -0.7,2.8 z", GW: "m 900.2,492.1 -10.3,-0.3 -1.5,0.7 -1.8,-0.2 -3,1.1 0.3,1.3 1.7,1.4 0,0.9 1.2,1.8 2.4,0.5 2.9,2.6 2.6,-3.1 1.7,0.1 1.4,-1 1.3,0 0.8,-0.9 -0.4,-2.1 0.6,-0.7 0.1,-2.1 z", GQ: "m 1040.1,557.8 -9.2,-0.2 -1.9,7.2 1,0.9 1.9,-0.3 8.2,0 0,-7.6 z", GR: "m 1101.9,344.9 -0.8,2.8 6.6,1.2 0,1.1 7.6,-0.6 0.5,-1.9 -2.8,0.8 0,-1.1 -3.9,-0.5 -4.1,0.4 -3.1,-2.2 z m 11.5,-37.4 -2.7,-1.6 0.3,3 -4.6,0.6 -3.9,-2.1 -3.9,1.7 -3.8,-0.2 -1,0.2 -0.7,1.1 -2.8,-0.1 -1.9,1.3 -3.3,0.6 0,1.6 -1.6,0.9 -0.1,2.1 -2.1,3 0.5,1.9 2.9,3.6 2.3,3 1.3,4.3 2.3,5.1 4.6,2.9 3.4,-0.1 -2.4,-5.7 3.3,-0.7 -1.9,-3.3 5,1.7 -0.4,-3.7 -2.7,-1.8 -3.2,-3 1.8,-1.4 -2.8,-3 -1.6,-3.8 0.9,-1.3 3,3.2 2.9,0 2.5,-1 -3.9,-3.6 6.1,-1.6 2.7,0.6 3.2,0.2 1.1,-0.7 1.2,-3.9 z", GL: "m 887.4,76.3 -26,-0.4 -11.8,0.3 -5,1.3 -11.5,-0.1 -12.7,2.1 -1.6,1.7 6.7,2.1 -6.2,-1.3 -4.5,-0.3 -7,-1.4 -10.6,2.1 -2.7,-1.2 -10.4,0 -10.9,0.6 -8.9,1 -0.2,1.8 -5.3,0.5 -14.6,2.9 -4.6,1.7 8.1,1.5 -2.8,1.6 -14.9,2.2 -15.5,2.2 -2.2,1.7 6.4,2 14.5,1.2 -7.5,0.2 -10.9,1.5 3.8,3.1 3,1.5 9.4,-0.3 10.1,-0.2 7.6,0.3 8,2.9 -1.4,2.1 3.6,1.9 1.4,5.3 1,3.6 1.4,1.9 -7,4.8 2.6,1.3 4.4,-0.8 2.6,1.8 5.3,3.4 -7.5,-1.4 -3.8,0 -3,2.8 -1.5,3.6 4.2,1.8 4,-0.8 2.6,-0.8 5.5,-1.9 -2.8,4.2 -2.6,2.3 -7.1,2 -7,6.3 2,2 -3.4,4 3.7,5.2 -1.5,5 0.7,3.7 4.8,7.1 0.8,5.6 3.1,3.2 8.9,0 5,4.7 6.5,-0.3 4.1,-5.7 3.5,-4.8 -0.3,-4.4 8.6,-4.6 3.3,-3.7 1.4,-3.9 4.7,-3.5 6.5,-1.3 6.1,-1.4 3,-0.2 10.2,-3.9 7.4,-5.7 4.8,-2.1 4.6,-0.1 12.5,-1.8 12.1,-4.3 11.9,-4.6 -5.5,-0.3 -10.6,-0.2 5.3,-2.8 -0.5,-3.6 4.2,3 2.7,2.1 7.3,-1 -0.6,-4.3 -4.5,-3.1 -5,-1.3 2.4,-1.4 7.2,2.1 0.5,-2.3 -4.1,-3.4 5.4,0 5.6,-0.8 1.7,-1.8 -4,-2.1 8.6,-0.3 -4,-4.3 4.1,-0.5 0.1,-4.2 -6.2,-2.5 6.4,-1.6 5.8,-0.1 -3.6,-3.2 1.1,-5.1 3.6,-2.9 4.9,-3.2 -8,-0.2 11.3,-0.7 2.2,-1 14.6,-2.9 -1.6,-1.7 -10,-0.8 -16.9,1.5 -9.2,1.5 4.5,-2.3 -2.3,-1.4 -7,1.2 -9.7,-1.4 -12.1,0.5 -1.4,-0.7 18.3,-0.4 12.9,-0.2 6.6,-1.4 -19.7,-2.9 z", GT: "m 482.8,458.9 -5.1,-0.1 -5.2,0 -0.4,3.6 -2.6,0 1.8,2.1 1.9,1.5 0.5,1.4 0.8,0.4 -0.4,2.1 -7.1,0 -3.3,5.2 0.7,1.2 -0.8,1.5 -0.4,1.9 2.7,2.6 2.5,1.3 3.4,0.1 2.8,1.1 0.2,-1 2.1,-1.6 1.1,-0.7 -0.2,-0.7 1.4,-0.4 1.3,-1.6 -0.3,-1.3 0.5,-1.2 2.8,-1.8 2.8,-2.4 -1.5,-0.8 -0.6,0.9 -1.7,-1.1 -1.6,0 1.2,-7.2 0.7,-5 z", GY: "m 656.1,534.2 -2.1,-2.3 -2.9,-3.1 -2.1,-0.1 -0.1,-3.3 -3.3,-4.1 -3.6,-2.4 -4.6,3.8 -0.6,2.3 1.9,2.3 -1.5,1.2 -3.4,1.1 0,2.9 -1.6,1.8 3.7,4.8 2.9,-0.3 1.3,1.5 -0.8,2.8 1.9,0.9 1.2,3 -1.6,2.2 -1,5.4 1.4,3.3 0.3,2.9 3.5,3 2.7,0.3 0.7,-1.3 1.7,-0.2 2.6,-1.1 1.8,-1.7 3.1,0.5 1.4,-0.2 -3.3,-5.6 -0.7,-3.5 -1.8,-0.1 -2.4,-4.6 1.1,-3.3 -0.3,-1.5 3.5,-1.6 1,-5.7 z", HN: "m 514.1,476.8 -1.3,-1.8 -1.9,-1 -1.5,-1.4 -1.6,-1.2 -0.8,-0.1 -2.5,-0.9 -1.1,0.5 -1.5,0.2 -1.3,-0.4 -1.7,-0.4 -0.8,0.7 -1.8,0.7 -2.6,0.2 -2.5,-0.6 -0.9,0.4 -0.5,-0.6 -1.6,0.1 -1.3,1.1 -0.6,-0.2 -2.8,2.4 -2.8,1.8 -0.5,1.2 0.3,1.3 -1.3,1.6 1.5,0.5 1.1,1.3 1.6,1 0.1,0.9 2.5,-0.8 1.1,0.5 0.7,0.7 -0.6,2.5 1.7,0.6 0.7,2 1.8,-0.3 0.8,-1.5 0.8,0 0.2,-3.1 1.3,-0.2 1.2,0 1.4,-1.7 1.5,1.3 0.6,-0.8 1.1,-0.7 2.1,-1.8 0.3,-1.3 0.5,0.1 0.8,-1.5 0.6,-0.2 0.9,0.9 1.1,0.3 1.3,-0.8 1.4,0 2,-0.8 0.9,-0.9 1.9,0.2 z", HR: "m 1065,280.4 -4,-2.6 -1.6,-0.8 -3.9,1.7 -0.3,2.5 -1.7,0.6 0.2,1.7 -2,-0.1 -1.8,-1 -0.8,1 -3.5,-0.2 -0.2,0.1 0,2.2 1.7,2 1.3,-2.6 3.3,1 0.3,2 2.5,2.6 -1,0.5 4.6,4.5 4.8,1.8 3.1,2.2 5,2.3 0,0 0.5,-1 -4.7,-2.4 -2.2,-2.5 -2,-1.4 -2.5,-2.3 -1.3,-1.9 -2.7,-2.9 0.9,-2.5 1.9,1.4 1,-1.3 2.3,-0.1 4.4,1 3.5,-0.1 2.4,1.4 0,0 1.7,-2.3 -1.7,-1.8 -1.5,-2.4 0,0 -1.8,0.9 -4.2,-1.2 z", HT: "m 580.6,446.7 -4.6,-1 -3.4,-0.2 -1.4,1.7 3.4,1 -0.3,2.4 2.2,2.8 -2.1,1.4 -4.2,-0.5 -5,-0.9 -0.7,2.1 2.8,1.9 2.7,-1.1 3.3,0.4 2.7,-0.4 3.6,1.1 0.2,-1.8 -1.2,-1.9 1.5,-1.1 0.7,-2.4 -0.2,-3.5 z", HU: "m 1079.1,263.8 -1.6,0.4 -1,1.5 -2.2,0.7 -0.6,-0.4 -2.3,1 -1.9,0.2 -0.3,1.2 -4.1,0.8 -1.9,-0.7 -2.6,-1.6 -0.2,2.6 -2.8,0 1.1,1.3 -1.3,4 0.8,0.1 1.2,2.1 1.6,0.8 4,2.6 4.2,1.2 1.8,-0.9 0,0 3.7,-1.6 3.2,0.2 3.8,-1.1 2.6,-4.3 1.9,-4.2 2.9,-1.3 -0.6,-1.6 -2.9,-1.7 -1,0.6 -5.5,-1.9 z", ID: "m 1651.9,637.3 0.5,-1.7 -1.8,-1.9 -2.8,-2 -5.3,1.3 7,4.4 2.4,-0.1 z m 20.9,-0.6 4,-4.8 0.1,-1.9 -0.5,-1.3 -5.7,2.6 -2.8,3.9 -0.7,2.1 0.6,0.8 5,-1.4 z m -35.6,-13 -1.6,2.2 -3.1,0.1 -2.2,3.6 3,0.1 3.9,-0.9 6.6,-1.2 -1.2,-2.8 -3.5,0.6 -1.9,-1.7 z m 28.1,0 -5.2,2.3 -3.8,0.5 -3.4,-1.9 -4.5,1.3 -0.2,2.3 7.4,0.8 8.6,-1.8 1.1,-3.5 z m -79.5,-8.4 -0.7,-2.3 -2.3,-0.5 -4.4,-2.4 -6.8,-0.4 -4.1,6.1 5.1,0.4 0.8,2.8 10,2.6 2.4,-0.8 4.1,0.6 6.3,2.4 5.2,1.2 5.8,0.5 5.1,-0.2 5.9,2.5 6.6,-2.4 -6.6,-3.8 -8.3,-1.1 -1.8,-4.1 -10.3,-3.1 -1.3,2.6 -10.7,-0.6 z m 146.6,-3.6 0.2,-3 -1.2,-1.9 -1.3,2.2 -1.2,2.2 0.3,4.8 3.2,-4.3 z m -41,-17.5 -1.4,-2.1 -5.7,0.3 1,2.7 3.9,1.2 2.2,-2.1 z m 18.1,-2.4 -6.1,-1.8 -6.9,0.3 -1.5,3.5 3.9,0.2 3.2,-0.4 4.6,0.5 4.7,2.6 -1.9,-4.9 z m 21,-12.3 -0.8,-2.4 -9,-2.6 -2.9,2.1 -7.6,1.5 2.3,3.2 5,1.2 2.1,3.7 8.3,0.1 0.4,1.6 -4,-0.1 -6.2,2.3 4.2,3.1 -0.1,2.8 1.2,2.3 2.1,-0.5 1.8,-3.1 8.2,5.9 4.6,0.5 10.6,5.4 2.3,5.3 1,6.9 -3.7,1.8 -2.8,5.2 7.1,-0.2 1.6,-1.8 5.5,1.3 4.6,5.2 1.5,-20.8 1,-20.7 -6,-1.2 -4.1,-2.3 -4.7,-2.2 -5,0 -6.6,3.8 -4.9,6.8 -5.7,-3.8 -1.3,-10.3 z m -50,-16.4 -1,-1.4 -5.5,4.6 -6.5,0.3 -7.1,-0.9 -4.4,-1.9 -4.7,4.8 -1.2,2.6 -2.9,9.6 -0.9,5 -2.4,4.2 1.6,4.3 2.3,0.1 0.6,6.1 -1.9,5.9 2.3,1.9 3.6,-1 0.3,-9.1 -0.2,-7.4 3.8,-1.9 -0.7,6.2 3.9,3.7 -0.8,2.5 1.3,1.7 5.6,-2.4 -3,5.2 2.1,2.2 3.1,-1.9 0.3,-4.1 -4.7,-7.4 1.1,-2.2 -5.1,-8.1 5,-2.5 2.6,-3.7 2.4,0.9 0.5,-2.9 -10.5,2.1 -3.1,2.9 -5,-5.6 0.9,-4.8 4.9,-1 9.3,-0.3 5.4,1.3 4.3,-1.3 4.4,-6.3 z m 19.4,1.9 -0.6,-2.6 -3.3,-0.6 -0.5,-3.5 -1.8,2.3 -1,5.1 1.7,8.2 2.2,4 1.6,-0.8 -2.3,-3.3 0.9,-3.9 2.9,0.6 0.2,-5.5 z m -60.9,-4.5 0.9,-2.9 -4.3,-6 3,-5.8 -5,-1 -6.4,0 -1.7,7.2 -2,2.2 -2.7,8.9 -4.5,1.3 -5.4,-1.8 -2.7,0.6 -3.2,3.2 -3.6,-0.4 -3.6,1.2 -3.9,-3.5 -1,-4.3 -3.3,4.2 -0.6,5.9 0.8,5.6 2.6,5.4 2.8,1.8 0.7,8.5 4.6,0.8 3.6,-0.4 2,3.1 6.7,-2.3 2.8,2 4,0.4 2,3.9 6.5,-2.9 0.8,2.3 2.5,-9.7 0.3,-6.4 5.5,-4.3 -0.2,-5.8 1.8,-4.3 6.7,-0.8 -6.5,-5.9 z m -68.7,48.9 0.7,-9.8 1.7,-8 -2.6,-4 -4.1,-0.5 -1.9,-3.6 -0.9,-4.4 -2,-0.2 -3.2,-2.2 2.3,-5.2 -4.3,-2.9 -3.3,-5.3 -4.8,-4.4 -5.7,-0.1 -5.5,-6.8 -3.2,-2.7 -4.5,-4.3 -5.2,-6.2 -8.8,-1.2 -3.6,-0.3 0.6,3.2 6.1,7 4.4,3.6 3.1,5.5 5.1,4 2.2,4.9 1.7,5.5 4.9,5.3 4.1,8.9 2.7,4.8 4.1,5.2 2.2,3.8 7,5.2 4.5,5.3 6.2,-0.1 z", IN: "m 1414.1,380.1 -8.5,-4.4 -6.2,-4 -3.2,-7 4.1,0.9 -0.6,-3.3 -3,-3.3 -0.8,-5.2 -7.6,-7.5 -3.7,5.4 -5.7,1 -8.5,-1.6 -1.9,2.8 3.2,5.6 2.9,4.3 5,3.1 -3.7,3.7 1,4.5 -3.9,6.3 -2.1,6.5 -4.5,6.7 -6.4,-0.5 -4.9,6.6 4,2.9 1.3,4.9 3.5,3.2 1.8,5.5 -12,0 -3.2,4.2 7.1,5.4 1.9,2.5 -2.4,2.3 8,7.7 4,0.8 7.6,-3.8 1.7,5.9 0.8,7.8 2.5,8.1 3.6,12.3 5.8,8.8 1.3,3.9 2,8 3.4,6.1 2.2,3 2.5,6.4 3.1,8.9 5.5,6 2.2,-1.8 1.7,-4.4 5,-1.8 -1.8,-2.1 2.2,-4.8 2.9,-0.3 -0.7,-10.8 1.9,-6.1 -0.7,-5.3 -1.9,-8.2 1.2,-4.9 2.5,-0.3 4.8,-2.3 2.6,-1.6 -0.3,-2.9 5,-4.2 3.7,-4 5.3,-7.5 7.4,-4.2 2.4,-3.8 -0.9,-4.8 6.6,-1.3 3.7,0.1 0.5,-2.4 -1.6,-5.2 -2.6,-4.8 0.4,-3.8 -3.7,-1.7 0.8,-2.3 3.1,-2.4 -4.6,-3.4 1.2,-4.3 4.8,2.7 2.7,0.4 1.2,4.4 5.4,0.9 5,-0.1 3.4,1.1 -1.6,5.3 -2.4,0.4 -1.1,3.6 3.5,3.3 0.2,-4 1.5,-0.1 4.5,10.1 2.4,-1.5 -0.9,-2.7 0.9,-2.1 -0.9,-6.6 4.6,1.4 1.5,-5.2 -0.3,-3.1 2.1,-5.4 -0.9,-3.6 6.1,-4.4 4.1,1.1 -1.3,-3.9 1.6,-1.2 -0.9,-2.4 -6.1,-0.9 1.2,-2.7 -3.5,-3.9 -3.2,2.6 -4.9,-1.5 -5.3,4 -3.9,4.8 -4.2,0.8 2.7,2 0.4,3.9 -4.4,0.2 -4.7,-0.4 -3.2,1 -5.5,-2.5 -0.3,-1.2 -1.5,-5.1 -3,1.4 0.1,2.7 1.5,4.1 -0.1,2.5 -4.6,0.1 -6.8,-1.5 -4.3,-0.6 -3.8,-3.2 -7.6,-0.9 -7.7,-3.5 -5.8,-3.1 -5.7,-2.5 0.9,-5.9 2.8,-2.9 z", IE: "m 947.3,231.7 -3.5,-1.3 -2.9,0.1 1.1,-3.2 -0.8,-3.2 -3.7,2.8 -6.7,4.7 2.1,6.1 -4.2,6.4 6.7,0.9 8.7,-3.6 3.9,-5.4 -0.7,-4.3 z", IR: "m 1213.5,324.4 -3.2,-2.9 -1.2,-2.4 -3.3,1.8 2.9,7.3 -0.7,2 3.7,5.2 0,0 4.7,7.8 3.7,1.9 1,3.8 -2.3,2.2 -0.5,5 4.6,6.1 7,3.4 3.5,4.9 -0.2,4.6 1.7,0 0.5,3.3 3.4,3.4 1.7,-2.5 3.7,2.1 2.8,-1 5.1,8.4 4.3,6.1 5.5,1.8 6.1,4.9 6.9,2.1 5.1,-3.1 4,-1.1 2.8,1.1 3.2,7.8 6.3,0.8 6.1,1.5 10.5,1.9 1.2,-7.4 7.4,-3.3 -0.9,-2.9 -2.7,-1 -1,-5.7 -5.6,-2.7 -2.8,-3.9 -3.2,-3.3 3.9,-5.8 -1.1,-4 -4.3,-1.1 -1.1,-4 -2.7,-5.1 1.6,-3.5 -2.5,-0.9 0.5,-4.7 0.5,-8 -1.6,-5.5 -3.9,-0.2 -7.3,-5.7 -4.3,-0.7 -6.5,-3.3 -3.8,-0.6 -2.1,1.2 -3.5,-0.2 -3,3.7 -4.4,1.2 -0.2,1.6 -7.9,1.7 -7.6,-1.1 -4.3,-3.3 -5.2,-1.3 -2.5,-4.8 -1.3,0.3 -3.8,-3.4 1.2,-3.1 -1.9,-1.9 -1.9,0.5 -5.3,4.7 -1.8,0.2 -3.7,-0.9 z", IQ: "m 1207.3,334.9 -6.2,-0.9 -2.1,1 -2.1,4.1 -2.7,1.6 1.2,4.7 -0.9,7.8 -11,6.7 3.1,7.7 6.7,1.7 8.5,4.5 16.7,12.7 10.2,0.5 3.2,-6.1 3.7,0.5 3.2,0.4 -3.4,-3.4 -0.5,-3.3 -1.7,0 0.2,-4.6 -3.5,-4.9 -7,-3.4 -4.6,-6.1 0.5,-5 2.3,-2.2 -1,-3.8 -3.7,-1.9 -4.7,-7.8 0,0 -2.3,1.1 -2.1,-1.6 z", IS: "m 915.7,158.6 -6.9,-0.4 -7.3,2.9 -5.1,-1.5 -6.9,3 -5.9,-3.8 -6.5,0.8 -3.6,3.7 8.7,1.3 -0.1,1.6 -7.8,1.1 8.8,2.7 -4.6,2.5 11.7,1.8 5.6,0.8 3.9,-1 12.9,-3.9 6.1,-4.2 -4.4,-3.8 1.4,-3.6 z", IL: "m 1167.8,360.5 -1.4,0.1 -0.4,1.1 -1.8,0 -0.1,0.1 -0.6,1.6 -0.6,4.8 -1.1,2.9 0.4,0.4 -1.4,2.1 0,0 3.9,9.2 0.7,1.7 1.7,-10.2 -0.4,-2.4 -2.4,0.8 0.1,-1.7 1.2,-0.8 -1.4,-0.7 0.7,-4.3 2,0.9 0.7,-2 -0.1,0 0.6,-1 -0.3,-2.6 z", IT: "m 1057.8,328.6 -4,0.5 -5.2,0.7 -6.2,-0.6 -0.6,3.4 7.5,3.3 2.7,0.7 4.2,2.4 0.9,-3.3 -0.9,-2 1.6,-5.1 z m -33.7,-18.9 -2.5,1.9 -2.8,-0.3 1.3,3.6 0.4,7.6 2.1,1.7 2,-2.1 2.4,0.4 0.4,-8.4 -3.3,-4.4 z m 14.3,-34.3 -1.3,-2.2 -4.8,1.1 -0.5,1.2 -3.1,-0.9 -0.3,2.5 -2.1,1.1 -3.8,-0.8 -0.9,2.5 -2.4,0.2 -0.9,-1 -2.7,2.1 -2.4,0.3 -2.2,-1.3 -0.2,1.7 1.6,2.4 -1.7,1.8 1.5,4.8 2.7,0.8 -0.5,2.7 2.1,-0.5 2.8,-2.8 2.3,-0.9 4.2,2.1 2.6,0.7 1.9,6 3.6,3.6 4.9,4 4.2,2.8 3.9,0.4 2.3,2.5 3.4,1.2 1.7,2.7 2.2,0.8 1.8,3.2 2.3,3.7 -1.1,1.3 -0.8,3.5 0.1,2 2.1,-0.5 2.5,-5.6 2.1,-0.4 0.4,-3.3 -3.9,-2.3 1.9,-4.1 4.5,1 3.1,3 0.8,-2.3 -0.6,-1.2 -4.7,-3.2 -3.9,-1.9 -4.8,-2.3 1.4,-1.2 -1.4,-1.4 -4,0.1 -6,-5 -2.9,-5.1 -4.9,-3.1 -1.9,-3.1 0.5,-1.8 -0.4,-3 3.9,-2.2 4.1,0.9 -1.4,-2.7 0.3,-3 -7.2,-1.6 z", JM: "m 550.7,458.5 3.9,-0.1 -0.8,-1.8 -2.7,-1.5 -3.7,-0.6 -1.2,-0.2 -2.4,0.4 -0.8,1.5 2.9,2.3 3,1 1.8,-1 z", JO: "m 1186.6,367.6 -3.1,-7.7 -9.6,6.7 -6.3,-2.5 -0.7,2 0.4,3.9 -0.6,1.9 0.4,2.4 -1.7,10.2 0.3,0.9 6.1,1 2.1,-2 1.1,-2.3 4,-0.8 0.7,-2.2 1.7,-1 -6.1,-6.4 10.4,-3.1 0.9,-1 z", JP: "m 1692.5,354.9 -4.5,-1.3 -1.1,2.7 -3.3,-0.8 -1.3,3.8 1.2,3 4.2,1.8 -0.1,-3.7 2.1,-1.5 3.1,2.1 1.3,-3.9 -1.6,-2.2 z m 24.4,-19.3 -3.6,-6.7 1.3,-6.4 -2.8,-5.2 -8.1,-8.7 -4.8,1.2 0.2,3.9 5.1,7.1 1,7.9 -1.7,2.5 -4.5,6.5 -5,-3.1 0,11.5 -6.3,-1.3 -9.6,1.9 -1.9,4.4 -3.9,3.3 -1.1,4 -4.3,2 4,4.3 4.1,1.9 0.9,5.7 3.5,2.5 2.5,-2.7 -0.8,-10.8 -7.3,-4.7 6.1,-0.1 5,-3 8.6,-1.4 2.4,4.8 4.6,2.4 4.4,-7.3 9.1,-0.4 5.4,-3 0.6,-4.6 -2.5,-3.2 -0.6,-5.2 z m -11.8,-44.2 -5.3,-2.1 -10.4,-6.4 1.9,4.8 4.3,8.5 -5.2,0.4 0.6,4.7 4.6,6.1 5.7,0 -1.6,-6.8 10.8,4.2 0.4,-6.1 6.4,-1.7 -6,-6.9 -1.7,2.6 -4.5,-1.3 z", KZ: "m 1308.8,223.8 -9,-1.3 -3.1,2.5 -10.8,2.2 -1.7,1.5 -16.8,2.1 -1.4,2.1 5,4.1 -3.9,1.6 1.5,1.7 -3.6,2.9 9.4,4.2 -0.2,3 -6.9,-0.3 -0.8,1.8 -7.3,-3.2 -7.6,0.2 -4.3,2.5 -6.6,-2.4 -11.9,-4.3 -7.5,0.2 -8.1,6.6 0.7,4.6 -6,-3.6 -2.1,6.8 1.7,1.2 -1.7,4.7 5.3,4.3 3.6,-0.2 4.2,4.1 0.2,3.2 2.8,1 4.4,-1.3 5,-2.7 4.7,1.5 4.9,-0.3 1.9,3.9 0.6,6 -4.6,-0.9 -4,1 0.9,4.5 -5,-0.6 0.6,2 3.2,1.6 3.7,5.5 6.4,2.1 1.5,2.1 -0.7,2.6 0.7,1.5 1.8,-2 5.5,-1.3 3.8,1.7 4.9,4.9 2.5,-0.3 -6.2,-22.8 11.9,-3.6 1.1,0.5 9.1,4.5 4.8,2.3 6.5,5.5 5.7,-0.9 8.6,-0.5 7.5,4.5 1.5,6.2 2.5,0.1 2.6,5 6.6,0.2 2.3,3 1.9,0 0.9,-4.5 5.4,-4.3 2.5,-1.2 0.3,-2.7 3.1,-0.8 9.1,2.1 -0.5,-3.6 2.5,-1.3 8.1,2.6 1.6,-0.7 8.6,0.2 7.8,0.6 3.3,2.2 3.5,0.9 -1.7,-3.5 2.9,-1.6 -8.7,-10.7 9,-2.4 2,-1.4 -1,-11.1 10.7,2 1.6,-2.8 -2.5,-6.2 3.8,-0.6 1.8,-4.2 -4.3,-3.8 -6,0.9 -3.3,-2.6 -3.9,-1.2 -4.1,-3.6 -3.2,-1.1 -6.2,1.6 -8.3,-3.6 -1.1,3.3 -18.1,-15.5 -8.3,-4.7 0.8,-1.9 -9.1,5.7 -4.4,0.4 -1.2,-3.3 -7,-2.1 -4.3,1.5 -4.3,-6.3 z", KE: "m 1211.7,547.2 -3.8,0 -2.3,-2.1 -5.1,2.6 -1.6,2.7 -3.8,-0.5 -1.2,-0.7 -1.3,0.1 -1.8,0 -7.2,-5.4 -3.9,0 -2,-2.1 0,-3.6 -2.9,-1.1 -3.8,4.2 -3.4,3.8 2.7,4.4 0.7,3.2 2.6,7.3 -2.1,4.7 -2.7,4.2 -1.6,2.6 0,0.3 1.4,2.4 -0.4,4.7 20.2,13 0.4,3.7 8,6.3 2.2,-2.1 1.2,-4.2 1.8,-2.6 0.9,-4.5 2.1,-0.4 1.4,-2.7 4,-2.5 -3.3,-5.3 -0.2,-23.2 4.8,-7.2 z", KG: "m 1387.2,302.6 -3.5,-0.9 -3.3,-2.2 -7.8,-0.6 -8.6,-0.2 -1.6,0.7 -8.1,-2.6 -2.5,1.3 0.5,3.6 -9.1,-2.1 -3.1,0.8 -0.3,2.7 1.8,0.6 -3.1,4.1 4.6,2.3 3.2,-1.6 7.1,3.3 -5.2,4.5 -4.1,-0.6 -1.4,2 -5.9,-1.1 0.6,3.7 5.4,-0.5 7.1,2 9.5,-0.9 1,-1.5 -1.1,-1.5 4,-3 3.2,-1.2 5.7,0.9 0.6,-4 6.4,-0.8 1,-2.4 6.8,-3.4 0.2,-1.4 z", KH: "m 1574.8,481.8 -5.2,-2.3 -2,4.3 -4.9,-2.4 -5.3,-1 -7.1,1.3 -3,5.2 2.1,7.7 3.4,6.6 2.6,3.3 4.7,0.9 4.7,-2.5 5.8,-0.5 -2.8,-3.8 8.9,-4.9 -0.1,-7.7 -1.8,-4.2 z", KR: "m 1637.3,331.7 6.2,5.5 -3.4,1.1 5.2,6.8 1.1,4.8 2.1,3.5 4.5,-0.5 3.2,-2.7 4.2,-1.2 0.5,-3.6 -3.4,-7.5 -3.3,-4.2 -8.2,-7.6 0.1,1.6 -2.1,0.4 -3.5,0.3 -0.7,2.9 -2.4,-0.2 -0.1,0.6 z", XK: "m 1086,299.5 -0.8,-0.3 -0.8,-1 -1,-0.4 -0.8,-0.9 -0.9,0.4 -0.5,2 -1.2,0.5 -0.8,1.4 1.3,1.6 1.3,0.6 0.5,2.3 0,0 0.7,0 0.1,-1.2 2.9,-1 1.1,-0.2 -0.2,-0.5 0.5,-0.7 0.5,-1.5 -0.8,0 -1.1,-1.1 z", KW: "m 1235.6,381.4 -3.7,-0.5 -3.2,6.1 4.9,0.6 1.7,3.1 3.8,-0.2 -2.4,-4.8 0.3,-1.5 -1.4,-2.8 z", LA: "m 1574.8,481.8 0.2,-6.4 -2,-4.5 -4.8,-4.4 -4.3,-5.6 -5.7,-7.5 -7.3,-3.8 1.3,-2.3 3.3,-1.7 -3,-5.5 -6.8,-0.1 -3.4,-5.7 -4,-5.1 -2.7,1 1.9,7.2 -2.9,-0.1 -0.7,-1.5 -4.1,4.1 -0.8,2.4 2.6,1.9 0.9,3.8 3.8,0.3 -0.4,6.7 1,5.7 5.3,-3.8 1.8,1.2 3.2,-0.2 0.8,-2.2 4.3,0.4 4.9,5.2 1.3,6.3 5.2,5.5 0.5,5.4 -1.5,2.9 4.9,2.4 2,-4.3 5.2,2.3 z", LB: "m 1167.8,360.5 0.9,-3.5 2.6,-2.4 -1.2,-2.5 -2.4,-0.3 -0.1,0.2 -2.1,4.5 -1.3,5.2 1.8,0 0.4,-1.1 1.4,-0.1 z", LR: "m 929.4,523.3 -1.6,-0.2 -1.1,2.6 -1.6,-0.1 -1.1,-1.3 0.4,-2.6 -2.3,-3.9 -1.5,0.7 -1.2,0.2 -2.6,3 -2.6,3.4 -0.3,1.9 -1.3,2 3.7,4.1 4.8,3.5 5.1,4.8 5.7,3.1 1.5,-0.1 0.5,-5.2 0.5,-0.8 -0.2,-2.5 -2.3,-2.7 -1.8,-0.4 -1.6,-1.8 1.2,-2.8 -0.6,-3.1 0.3,-1.8 z", LY: "m 1111.8,371.4 -1.5,-2.1 -5.4,-0.8 -1.8,-1.1 -2,0 -2,-2.8 -7.3,-1.3 -3.6,0.8 -3.7,3 -1.5,3.1 1.5,4.8 -2.4,3 -2.5,1.6 -5.9,-3.1 -7.7,-2.7 -4.9,-1.2 -2.8,-5.7 -7.2,-2.8 -4.5,-1.1 -2.2,0.6 -6.4,-2.2 -0.1,4.9 -2.6,1.8 -1.5,2 -3.7,2.5 0.7,2.6 -0.4,2.7 -2.6,1.4 1.9,5.6 0.4,3 -0.9,5.2 0.5,2.9 -0.6,3.5 0.5,4 -2.1,2.6 3.4,4.7 0.2,2.7 2,3.6 2.6,-1.2 4.3,2.9 2.5,4 8.8,2.8 3.1,3.5 3.9,-2.4 5.4,-3.5 22.3,12.2 22.4,12.2 0,-2.7 6.3,0 -0.5,-12.7 -1,-23.4 -1.3,-22.7 -2,-5.1 1.2,-3.9 -1.1,-2.7 1.8,-3 z", LK: "m 1432.2,532.7 2.3,-1.8 0.6,-6.6 -3,-6.6 -2.9,-4.5 -4.1,-3.5 -1.9,10.3 1.4,9.1 2.8,5.1 4.8,-1.5 z", LS: "m 1128.1,766.5 1.1,-2 3.1,-1 1.1,-2.1 1.9,-3.1 -1.7,-1.9 -2.3,-2 -2.6,1.3 -3.1,2.5 -3.2,4 3.7,4.9 2,-0.6 z", LT: "m 1100.4,221.2 -5,-2.9 -2.5,-0.4 -0.9,-1.3 -4.4,0.6 -7.9,-0.4 -5,1.9 1.7,5 5,1.1 2.2,0.9 -0.2,1.7 0.6,1.5 2.5,0.6 1.4,1.9 4.6,0 4.8,-2.2 0.5,-3.4 3.5,-2 -0.9,-2.6 z", LU: "m 1007,258.6 0.2,-2.7 -1,-1.4 -1.3,0.2 -0.4,3.5 1.1,0.5 1.4,-0.1 z", LV: "m 1102.1,210.1 -3.8,0 -4.4,-2.2 -2.1,-0.7 -3.7,1 -0.2,4.6 -3.6,0.1 -4.4,-4.5 -4,2.1 -1.7,3.7 0.5,4.5 5,-1.9 7.9,0.4 4.4,-0.6 0.9,1.3 2.5,0.4 5,2.9 2.6,-1 4.6,-2.3 -2.1,-3.6 -1,-2.8 -2.4,-1.4 z", MA: "m 965.2,348.4 -2.3,-0.1 -5.5,-1.4 -5,0.4 -3.1,-2.7 -3.9,0 -1.8,3.9 -3.7,6.7 -4,2.6 -5.4,2.9 -3.5,4.3 -0.9,3.4 -2.1,5.4 1.1,7.9 -4.7,5.3 -2.7,1.7 -4.4,4.4 -5.1,0.7 -2.8,2.4 -0.1,0.1 -3.6,6.5 -3.7,2.3 -2.1,4 -0.2,3.3 -1.6,3.8 -1.9,1 -3.1,4 -2,4.5 0.3,2.2 -1.9,3.3 -2.2,1.7 -0.3,3 0.1,0 12.4,-0.5 0.7,-2.3 2.3,-2.9 2,-8.8 7.8,-6.8 2.8,-8.1 1.7,-0.4 1.9,-5 4.6,-0.7 1.9,0.9 2.5,0 1.8,-1.5 3.4,-0.2 -0.1,-3.4 0,0 0.8,0 0.1,-7.5 8.9,-4.7 5.4,-1 4.4,-1.7 2.1,-3.2 6.3,-2.5 0.3,-4.7 3.1,-0.5 2.5,-2.4 7,-1 1,-2.5 -1.4,-1.4 -1.8,-6.7 -0.3,-3.9 -2,-4.1 z", MD: "m 1118.5,283.3 1.2,-0.7 0.5,-2.1 1.1,-2 -0.5,-1.1 1,-0.5 0.6,0.9 3,0.2 1.2,-0.5 -1,-0.6 0.2,-1 -2,-1.5 -1.1,-2.6 -1.9,-1.1 0,-2.1 -2.5,-1.6 -2,-0.3 -3.9,-1.9 -3.2,0.6 -1.1,0.9 1.6,0.6 1.8,1.9 1.9,2.6 3.4,3.7 0.6,2.7 -0.2,2.7 1.3,2.8 z", MG: "m 1255.7,658.4 -1.1,-4.2 -1.4,-2.7 -1.8,-2.7 -2,2.8 -0.3,3.8 -3.3,4.5 -2.3,-0.8 0.6,2.7 -1.8,3.2 -4.8,3.9 -3.4,3.7 -2.4,0 -2.2,1.2 -3.1,1.3 -2.8,0.2 -1,4.1 -2.2,3.5 0.1,5.9 0.8,4 1.1,3 -0.8,4.1 -2.9,4.8 -0.2,2.1 -2.6,1.1 -1.3,4.6 0.2,4.6 1.6,5 -0.1,5.7 1.2,3.3 4.2,2.3 3,1.7 5,-2.7 4.6,-1.5 3.1,-7.4 2.8,-8.9 4.3,-12 3.3,-8.8 2.7,-7.4 0.8,-5.4 1.6,-1.5 0.7,-2.7 -0.8,-4.7 1.2,-1.9 1.6,3.8 1.1,-1.9 0.8,-3.1 -1.3,-2.9 -0.5,-7.7 z", MX: "m 444.4,407.8 -3.6,-1.4 -3.9,-2 -0.8,-3 -0.2,-4.5 -2.4,-3.6 -1,-3.7 -1.6,-4.4 -3.1,-2.5 -4.4,0.1 -4.8,5 -4,-1.9 -2.2,-1.9 -0.4,-3.5 -0.8,-3.3 -2.4,-2.8 -2.1,-2 -1.3,-2.2 -9.3,0 -0.8,2.6 -4.3,0 -10.7,0 -10.7,-4.4 -7.1,-3.1 1,-1.3 -7,0.7 -6.3,0.5 0.2,5.7 0.7,5.1 0.7,4.1 0.8,4 2.6,1.8 2.9,4.5 -1,2.9 -2.7,2.3 -2.1,-0.3 -0.6,0.5 2.3,3.7 2.9,1.5 1,1.7 0.9,-0.9 3.1,2.9 2.1,2 0.1,3.4 -1.2,4.7 2.5,1.6 3.3,3.1 2.9,3.6 0.7,3.9 1,0 2.7,-2.3 0.4,-1.2 -1.5,-2.8 -1.6,-2.9 -2.6,-0.2 0.4,-3.4 -0.9,-3 -1,-2.8 -0.5,-5.9 -2.6,-3.2 -0.6,-2.3 -1.2,-1.6 0,-4.1 -1,0.1 -0.1,-2.2 -0.7,-0.5 -0.4,-1.4 -2.7,-4.4 -1.1,-2.6 1,-4.8 0.1,-3 1.8,-2.6 2.4,1.7 1.9,-0.2 3.1,2.5 -0.9,2.4 0.4,4.9 1.5,4.7 -0.4,2 1.7,3.1 2.3,3.4 2.7,0.5 0.3,4.4 2.4,3.1 2.5,1.5 -1.8,4 0.7,1.5 4.1,2.6 1.9,4 4.5,4.9 3.8,6.4 1.3,3.2 0,2.5 1.4,2.9 -0.3,2.2 -1.6,1.6 0.3,1.8 -1.9,0.7 0.8,3.1 2.2,4 5.3,3.6 1.9,2.9 5.4,2 3,0.4 1.2,1.7 4.2,3 5.9,3 4,0.9 4.8,2.9 4,1.2 3.7,1.7 2.9,-0.7 4.8,-2.4 3.1,-0.4 4.4,1.6 2.6,2.1 5.5,6.9 0.4,-1.9 0.8,-1.5 -0.7,-1.2 3.3,-5.2 7.1,0 0.4,-2.1 -0.8,-0.4 -0.5,-1.4 -1.9,-1.5 -1.8,-2.1 2.6,0 0.4,-3.6 5.2,0 5.1,0.1 0.1,-1 0.7,-0.3 0.9,0.8 2.5,-3.9 1,0 1.2,-0.1 1.2,1.6 2,-5 1.2,-2.7 -0.9,-1.1 1.8,-3.9 3.5,-3.8 0.6,-3.1 -1.2,-1.3 -3.4,0.5 -4.8,-0.2 -6,1.5 -4,1.7 -1.2,1.8 -1.2,5.4 -1.8,3.7 -3.9,2.6 -3.6,1.1 -4.3,1.1 -4.3,0.6 -5.1,1.8 -1.9,-2.6 -5.6,-1.7 -1.8,-3.2 -0.7,-3.6 -3,-4.7 -0.4,-5 -1.2,-3.1 -0.5,-3.4 1.1,-3.1 1.8,-8.6 1.8,-4.5 3.1,-5.6 -2.1,0.2 z", MK: "m 1094,304.8 -2.8,-2 -2.4,0.1 -1.7,0.4 -1.1,0.2 -2.9,1 -0.1,1.2 -0.7,0 0,0 -0.4,2.1 0.9,2.6 2.3,1.6 3.3,-0.6 1.9,-1.3 2.8,0.1 0.7,-1.1 1,-0.2 -0.8,-4.1 z", ML: "m 1000.3,450.3 -6.1,0.6 -0.1,-4 -2.6,-1.1 -3.4,-1.8 -1.3,-3 -18.6,-13.8 -18.4,-13.9 -8.4,0.1 2.4,27.4 2.4,27.5 1,0.8 -1.3,4.4 -22.3,0.1 -0.9,1.4 -2.1,-0.4 -3.2,1.3 -3.8,-1.8 -1.8,0.2 -1,3.7 -1.9,1.2 0.2,3.9 1.1,3.7 2.1,1.8 0.4,2.4 -0.3,2 0.3,2.3 0.9,0 1.5,-0.8 0.9,0.2 1.5,1.6 2.4,0.5 1.6,-1.4 1.8,-0.8 1.3,-0.9 1.1,0.2 1.3,1.4 0.6,1.7 2.3,2.7 -1.2,1.6 -0.2,2.1 1.2,-0.6 0.7,0.7 -0.3,1.9 1.7,1.8 0.7,-0.6 1.6,1 4.3,0.1 1,-1.9 1,0.1 1.6,-0.7 0.9,2.7 1.3,-0.8 2.3,-0.9 -0.4,-3.7 1.6,-2.7 -0.2,-2.2 4.5,-5.2 0.8,-4.4 1.6,-1.6 2.7,0.9 2.3,-1.3 0.8,-1.6 4.3,-2.9 1.1,-2 5.2,-2.6 3,-0.9 1.4,1.2 3.6,0 3.6,-0.3 2,-2.2 7.6,-0.6 4.9,-1 0.5,-3.9 3,-4.3 -0.1,-14.6 z", MM: "m 1533.9,435.8 -0.6,-2.6 -3.8,1.8 -2.5,-1.2 -4.5,-2.4 0.8,-5.2 -3.7,-1.3 -2.3,-5.8 -5.6,1 -0.7,-7.5 4.1,-5.3 -0.8,-5.3 -1.3,-4.9 -2.7,-1.5 -2.7,-3.7 -3,0.4 0.9,2.4 -1.6,1.2 1.3,3.9 -4.1,-1.1 -6.1,4.4 0.9,3.6 -2.1,5.4 0.3,3.1 -1.5,5.2 -4.6,-1.4 0.9,6.6 -0.9,2.1 0.9,2.7 -2.4,1.5 0.5,4.6 -2.1,-1 1.1,5.1 4.6,5.2 3.4,0.9 -0.4,2.2 5.4,7.4 1.9,5.9 -0.9,7.9 3.6,1.5 3.2,0.6 5.8,-4.6 3.2,-3.1 3.1,5.2 2,8.1 2.6,7.6 2.6,3.3 0.2,6.9 2.2,3.8 -1.3,4.8 0.9,4.8 2.2,-6.6 2.6,-5.9 -2.8,-5.8 -0.2,-3 -1,-3.5 -4.2,-5.1 -1.7,-3.2 1.7,-1.1 1.4,-5.6 -2.9,-4.2 -4.1,-4.6 -3.5,-5.6 2.2,-1.1 1.5,-6.9 3.9,-0.3 2.8,-2.8 3,-1.4 0.8,-2.4 4.1,-4.1 z", ME: "m 1080,299.8 0.4,-0.6 -2,-1.2 -1.8,-0.7 -0.8,-0.8 -1.5,-1.1 -0.9,0.6 -1.5,1.4 -0.4,3.4 -0.5,1 0,0 2.3,1.2 1.6,2.1 1.1,0.4 0,0 -0.5,-1.9 2,-3.1 0.4,1.2 1.3,-0.5 0.8,-1.4 z", MN: "m 1473.7,252.1 -3.7,-4.6 -6.6,-1.5 -4.8,-0.8 -6.9,-2.5 -1.3,6.4 4,3.6 -2.4,4.3 -7.9,-1.6 -5,-0.2 -4.7,-2.9 -5.1,-0.1 -5.3,-1.9 -5.9,2.9 -6.6,5.4 -4.7,1 3.3,4.4 5.7,3.3 8.1,2.3 5.8,5 1.3,7.3 3,2.7 6.4,1 7.2,0.9 7.9,3.8 3.4,0.7 4.9,5.7 4.7,3.6 5.5,-0.1 11.2,1.3 6.4,-0.8 5.5,0.9 9.3,3.8 6.2,-0.1 3.2,2 4.4,-3.3 7.2,-2.2 7.5,-0.2 4.9,-2.2 1.9,-3.3 2.5,-2 -1.9,-2.1 -2.9,-2.3 0.4,-4 3.2,0.5 5.9,1.3 3.1,-3.3 6.3,-2.4 1.4,-4.1 2.4,-1.8 6.8,-0.8 4.3,0.7 -0.7,-2.2 -7.2,-4.3 -5.1,-2 -2.5,2.3 -5.4,-1 -2.4,0.8 -2.7,-2.6 -0.3,-6.2 -0.6,-4.6 -5.5,0.5 -3.9,-2.1 -3.3,-0.7 -4.5,4.4 -5.8,1 -3.6,1.6 -6.7,-1 -4.5,0 -4.9,-3.1 -6.5,-3 -5.4,-0.8 -5.7,0.8 -3.9,1.1 -8.4,-2.6 z", MZ: "m 1203,640.7 -0.8,-2.9 0,0 0,0 -4.6,3.7 -6.2,2.5 -3.3,-0.1 -2.1,1.9 -3.9,0.1 -1.4,0.8 -6.7,-1.8 -2.1,0.3 -1.6,6 0.7,7.3 0.3,0 1.9,2 2.2,4.6 0.1,8.2 -2.5,1.3 -1.9,4.5 -3.4,-4 -0.2,-4.5 1.3,-2.9 -0.3,-2.6 -2.1,-1.6 -1.6,0.6 -3,-3 -17.1,5.2 0.3,4.5 0.3,2.4 4.6,-0.1 2.6,1.3 1.1,1.6 2.6,0.5 2.8,2 -0.3,8.1 -1.3,4.4 -0.5,4.7 0.8,1.9 -0.8,3.7 -0.9,0.6 -1.6,4.6 -6.2,7.2 2.2,9 1.1,4.5 -1.4,7.1 0.4,2.3 0.6,2.9 0.3,2.8 4.1,0 0.7,-3.3 -1.4,-0.5 -0.3,-2.6 2.6,-2.4 6.8,-3.4 4.6,-2.2 2.5,-2.3 0.9,-2.6 -1.2,-1.1 1.1,-3 0.5,-6.2 -1,0.3 0,-1.9 -0.8,-3.7 -2.4,-4.8 0.7,-4.6 2.3,-1.4 4.1,-4.6 2.2,-1.1 6.7,-6.8 6.4,-3.1 5.2,-2.5 3.7,-3.9 2.4,-4.4 1.9,-4.6 -0.9,-3.1 0.2,-9.9 -0.4,-5.6 0.4,-6.3 z", MR: "m 949.8,413.3 -20.3,-15.5 -0.2,9.7 -17.9,-0.3 -0.2,16.3 -5.2,0.5 -1.4,3.3 0.9,9.2 -21.6,-0.1 -1.2,2.2 2.8,2.7 1.4,3 -0.7,3.2 0.6,3.2 0.5,6.3 -0.8,5.9 -1.7,3.2 0.4,3.4 2,-2 2.7,0.5 2.8,-1.4 3.1,0 2.6,1.8 3.7,1.7 3.2,4.7 3.6,4.4 1.9,-1.2 1,-3.7 1.8,-0.2 3.8,1.8 3.2,-1.3 2.1,0.4 0.9,-1.4 22.3,-0.1 1.3,-4.4 -1,-0.8 -2.4,-27.5 -2.4,-27.4 8.4,-0.1 z", MW: "m 1169.2,661.5 0.1,-2.3 -1.2,-1.9 0.1,-2.8 -1.5,-4.7 1.7,-3.5 -0.1,-7.7 -1.9,-4.1 0.2,-0.7 0,0 -1.1,-1.7 -5.4,-1.2 2.6,2.8 1.2,5.4 -1,1.8 -1.2,5.1 0.9,5.3 -1.8,2.2 -1.9,5.9 2.9,1.7 3,3 1.6,-0.6 2.1,1.6 0.3,2.6 -1.3,2.9 0.2,4.5 3.4,4 1.9,-4.5 2.5,-1.3 -0.1,-8.2 -2.2,-4.6 -1.9,-2 -0.3,0 0,0.8 1.1,0.3 1,3.4 -0.2,0.8 -1.9,-2.5 -1,1.6 -0.8,-1.4 z", MY: "m 1543.6,532.7 -4.7,-2.8 -0.9,1.1 1.4,2.7 -0.4,4.7 2.1,3.4 1,5.3 3.4,4.3 0.8,3.2 6.7,5 5.4,4.8 4,-0.5 0.1,-2.1 -2.3,-5.6 -2.1,-1.8 -0.5,-3.8 -0.6,-2.1 0.5,-2.9 -0.5,-4.3 -2.6,-4.3 -3.5,-3.8 -1.3,-0.6 -1.7,2.6 -3.7,0.8 -0.6,-3.3 z m 99,11 -1.2,-3.1 3.8,-0.4 0.3,-2.4 -4.8,-2 -3.8,-1.7 -0.4,-2.8 -3.1,-3.2 -2.3,0 -2.5,5 -4.1,4.4 -0.1,3.1 -0.1,4.1 -2.7,-0.2 -1.1,2.2 -2.7,-3.3 -2.6,4 -3.8,5 -6.7,1.4 -2.4,1.2 -0.9,5.4 -4.4,1.2 -4.1,-2.2 1,4.3 3.9,3.5 3.6,-1.2 3.6,0.4 3.2,-3.2 2.7,-0.6 5.4,1.8 4.5,-1.3 2.7,-8.9 2,-2.2 1.7,-7.2 6.4,0 5,1 4,-2.1 z", NA: "m 1105.4,683.7 -10.3,2.5 -13.4,-0.9 -3.7,-3 -22.5,0.3 -0.9,0.4 -3.2,-2.9 -3.6,-0.1 -3.3,1 -2.7,1.2 0.2,4.9 4.4,6.2 1.1,4 2.8,7.7 2.7,5.2 2.1,2.6 0.6,3.5 0,7.6 1.6,9.8 1.2,4.6 1,6.2 1.9,4.7 3.9,4.8 2.7,-3.2 2.1,1.8 0.8,2.7 2.4,0.5 3.3,1.2 2.9,-0.5 5,-3.2 1.1,-23.6 0.6,-18.5 5.4,-0.2 0.9,-22.7 4.1,-0.2 8.6,-2.2 2,2.6 3.7,-2.5 1.6,0 3.2,-1.5 0,-0.5 -2.1,-1.4 -3.6,-0.4 -4.6,1.5 z", NE: "m 1051.3,425.6 -8.8,-2.8 -18.6,12.2 -15.8,12.5 -7.8,2.8 0.1,14.6 -3,4.3 -0.5,3.9 -4.9,1 -7.6,0.6 -2,2.2 -3.6,0.3 -0.5,3.1 0.8,2.9 3.1,4.1 0.2,3.1 6.4,1.4 -0.1,4.4 1.9,-1.9 2,0 4.3,3.7 0.3,-5.7 1.6,-2.6 0.8,-3.6 1.4,-1.4 6,-0.8 5.6,2.4 2.1,2.4 2.9,0.1 2.6,-1.5 6.8,3.3 2.8,-0.2 3.3,-2.7 3.3,0.2 1.6,-0.9 3,0.4 4.3,1.8 4.3,-3.5 1.3,0.2 3.9,7 1,-0.2 0.2,-2 1.6,-0.4 0.5,-2.9 -3.6,-0.2 0,-4.1 -2.4,-2.3 2.3,-8.4 6.9,-6 0.2,-8.3 1.8,-12.9 1.1,-2.7 -2.3,-2.2 -0.2,-2.1 -2,-1.6 -1.6,-9.9 -3.9,2.4 -3.1,-3.5 z", NG: "m 1055.8,492.7 -1,0.2 -3.9,-7 -1.3,-0.2 -4.3,3.5 -4.3,-1.8 -3,-0.4 -1.6,0.9 -3.3,-0.2 -3.3,2.7 -2.8,0.2 -6.8,-3.3 -2.6,1.5 -2.9,-0.1 -2.1,-2.4 -5.6,-2.4 -6,0.8 -1.4,1.4 -0.8,3.6 -1.6,2.6 -0.3,5.7 -0.2,2.1 1.2,3.8 -1.1,2.5 0.6,1.7 -2.7,4 -1.7,1.9 -1,4 0.1,4.1 -0.3,10.2 4.9,0 4.3,0 3.9,4.2 1.9,4.6 3,3.9 4.5,0.2 2.2,-1.4 2.1,0.3 5.8,-2.3 1.4,-4.5 2.7,-6.1 1.6,-0.1 3.3,-3.7 2.1,-0.1 3.2,2.6 3.9,-2.2 0.5,-2.6 1.2,-2.6 0.8,-3.2 3,-2.6 1.1,-4.5 1.2,-1.4 0.7,-3.3 1.5,-4 4.6,-5 0.3,-2.1 0.6,-1.1 -2.3,-2.6 z", NI: "m 514.1,476.8 -1.9,-0.2 -0.9,0.9 -2,0.8 -1.4,0 -1.3,0.8 -1.1,-0.3 -0.9,-0.9 -0.6,0.2 -0.8,1.5 -0.5,-0.1 -0.3,1.3 -2.1,1.8 -1.1,0.7 -0.6,0.8 -1.5,-1.3 -1.4,1.7 -1.2,0 -1.3,0.2 -0.2,3.1 -0.8,0 -0.8,1.5 -1.8,0.3 -0.4,0.4 -0.9,-1 -0.7,1 2.6,2.9 2.2,2 1,2.1 2.5,2.6 1.8,2 0.9,-0.8 3.5,1.7 1.4,-0.8 1.7,0.5 0.8,1.3 1.7,0.4 1.4,-1.3 -0.8,-1.1 -0.1,-1.7 1.2,-1.6 -0.2,-1.7 0.7,-2.7 0.9,-0.7 0.1,-2.8 -0.2,-1.7 0.4,-2.8 0.9,-2.5 1.4,-2.2 -0.3,-2.3 0.4,-1.4 0.6,-0.6 z", NL: "m 1005.5,243.9 2.9,0 1.1,-2.3 1,-5.6 -1,-2 -3.9,-0.2 -6.5,2.6 -3.9,8.9 -2.5,1.7 0,0 3.6,0.5 4.4,-1.3 3.1,2.7 2.8,1.4 -1.1,-6.4 z", NO: "m 1088.8,133.1 -6.9,1.1 -7.3,-0.3 -5.1,4.4 -6.7,-0.3 -8.5,2.3 -10.1,6.8 -6.4,4 -8.8,10.7 -7.1,7.8 -8.1,5.8 -11.2,4.8 -3.9,3.6 1.9,13.4 1.9,6.3 6.4,3 6,-1.4 8.5,-6.8 3.3,3.6 1.7,-3.3 3.4,-4 0.9,-6.9 -3.1,-2.9 -1,-7.6 2.3,-5.3 4.3,0.1 1.3,-2.2 -1.8,-1.9 5.7,-7.9 3.4,-6.1 2.2,-3.9 4,0.1 0.6,-3.1 7.9,0.9 0,-3.5 2.5,-0.3 2.1,-1.4 5.1,2.9 5.3,-0.3 4.7,1.3 3.4,-2.4 1.1,-3.9 5.8,-1.8 5.7,2.1 -0.8,3.8 3.2,-0.5 6.4,-2.2 0,0 -5.4,-3.3 4.8,-1.4 -13.6,-3.9 z m -22.6,-33.3 -5.6,-1 -1.9,-1.7 -7.2,0.9 2.6,1.5 -2.2,1.2 6.7,1.1 7.6,-2 z m -25.4,-8.3 -4.8,-1.6 -5.1,0.2 -1,1.5 -5,0 -2.2,-1.5 -9.3,1.6 3.2,3.5 7.6,3.8 5.7,1.4 -3,1.7 8.4,2.9 4.4,-0.2 0.9,-3.9 3,-0.9 1.2,-3.4 8.5,-1.8 -12.5,-3.3 z m 24.2,-3.1 -9.1,-1 -3.2,1.2 -5.3,-1 -10.4,1.2 4.3,2 5.1,0 0.9,1.3 10.6,0.7 10.1,-0.5 4.3,-2.4 -7.3,-1.5 z", NP: "m 1455.2,394.8 -6.5,-0.6 -6.4,-1.5 -5,-2.8 -4.5,-1.2 -2.5,-3.1 -3.2,-0.9 -6.4,-4.1 -4.7,-2 -1.9,1.5 -2.8,2.9 -0.9,5.9 5.7,2.5 5.8,3.1 7.7,3.5 7.6,0.9 3.8,3.2 4.3,0.6 6.8,1.5 4.6,-0.1 0.1,-2.5 -1.5,-4.1 -0.1,-2.7 z", NZ: "m 1868.6,832.8 0.9,-2.6 -5.8,2.9 -3.4,3.4 -3.2,1.6 -5.9,4.6 -5.6,3.2 -7,3.2 -5.5,2.4 -4.3,1.1 -11.3,6.1 -6.4,4.6 -1.1,2.3 5.1,0.4 1.5,2.1 4.5,0.1 4,-1.8 6.3,-2.8 8.1,-6.2 4.7,-4.1 6.2,-2.3 4,-0.1 0.6,-2.9 4.6,-2.5 7,-4.5 4.2,-2.9 2.1,-2.6 0.5,-2.6 -5.6,2.5 0.8,-2.6 z m 28.8,-30.5 1.9,-5.7 -3.1,-1.7 -0.8,-3.6 -2.3,0.5 -0.4,4.6 0.8,5.7 0.9,2.7 -0.9,1.1 -0.6,4.4 -2.4,4.1 -4.2,5 -5.3,2.2 -1.7,2.4 3.7,2.5 -0.8,3.5 -6.9,5.1 1.4,0.9 -0.4,1.6 5.9,-2.5 5.9,-4.2 4.5,-3.4 1.6,-1.2 1.5,-2.7 2.8,-2 3.8,0.2 4.2,-3.8 5.1,-5.7 -2.1,-0.8 -4.6,2.5 -3.2,-0.5 -2.9,-2.1 2.3,-4.9 -1.2,-1.8 -2.9,4.4 0.4,-6.8 z", OM: "m 1301,437.8 2.1,-2 0.8,-1.8 1.6,-3.8 -0.1,-1.4 -2.1,-0.8 -1.6,-2.1 -2.9,-3.7 -3.3,-1.1 -4.1,-0.9 -3.3,-2.3 -2.9,-4.3 -2.8,0 -0.1,4.2 1.1,0.8 -2.4,1.3 0.3,2.6 -1.4,2.6 0.1,2.6 2.9,4.5 -2.6,12.7 -16.1,6.4 5.2,10.5 2.1,4.4 2.5,-0.3 3.6,-2.2 3.1,0.6 2.5,-1.8 -0.2,-2.5 2.1,-1.6 3.4,0 1.2,-1.3 0.2,-3.1 3.3,-2.4 2.6,0 0.4,-0.8 -1,-4.2 0.6,-3.2 1,-1.5 2.5,0.3 1.7,-4.4 z m -16.6,-30.4 0.2,-2.6 -0.7,-0.6 -1.3,2.2 1.3,2.2 0.5,-1.2 z", PK: "m 1388.3,346.3 -9.4,-2.6 -2.9,-5 -4.7,-3 -2.8,0.7 -2.4,1.2 -5.8,0.8 -5.3,1.3 -2.4,2.8 1.9,2.8 1.4,3.2 -2,2.7 0.8,2.5 -0.9,2.3 -5.1,-0.2 3,4.2 -3,1.6 -1.5,3.8 1.1,3.8 -1.7,1.8 -2.1,-0.6 -4,0.9 -0.2,1.7 -4,0 -2.3,3.6 0.8,5.4 -6.6,2.6 -3.8,-0.5 -0.9,1.4 -3.3,-0.8 -5.3,0.9 -9.6,-3.2 3.2,3.3 2.8,3.9 5.6,2.7 1,5.7 2.7,1 0.9,2.9 -7.4,3.3 -1.2,7.4 7.6,-0.9 8.9,-0.1 9.9,-1.2 4.9,4.8 2.1,4.6 4.2,1.6 3.2,-4.2 12,0 -1.8,-5.5 -3.5,-3.2 -1.3,-4.9 -4,-2.9 4.9,-6.6 6.4,0.5 4.5,-6.7 2.1,-6.5 3.9,-6.3 -1,-4.5 3.7,-3.7 -5,-3.1 -2.9,-4.3 -3.2,-5.6 1.9,-2.8 8.5,1.6 5.7,-1 3.7,-5.4 z", PA: "m 543.5,517 -2,-1.8 -1.7,-1.9 -2.5,-1.1 -3.1,-0.2 0.3,-0.6 -3.1,-0.4 -2,1.9 -3.5,1.3 -2.5,1.6 -2.7,0.5 -1.5,-1.6 -0.5,0.5 -2.3,-0.3 0.2,-1.3 -1.9,-2.3 -2.2,0.6 -0.1,2.5 1.1,1 -0.8,0.7 0.1,1.2 -0.5,1.3 -0.4,1.2 0.6,1 0.3,-1.4 2.4,0 1.4,0.7 2.3,0.5 1,2.5 1.8,0.4 0.8,-1.1 0.8,3.8 2.6,-0.3 0.9,-0.9 1.5,-0.9 -2.5,-3.4 0.6,-1.3 1.3,-0.3 2.3,-1.6 1.2,-2.2 2.5,-0.4 2.7,1.8 1,2.1 1.4,0.4 -1.5,1.7 1,3.5 1.8,1.8 0.9,-3.1 1.8,0.5 1.1,-1.9 -1.1,-3.8 0.7,-0.9 z", PE: "m 584.3,599.5 -2.9,-3.4 -1.7,-0.1 3.5,-6.5 -4.4,-3 -3.3,0.6 -2.1,-1.1 -3,1.7 -4.2,-0.8 -3.4,-6.7 -2.7,-1.7 -1.8,-3 -3.7,-3 -1.5,0.6 0.8,4.9 -1.7,4.1 -6,6.7 -6.7,2.5 -3.3,5.5 -0.9,4.3 -3.1,2.6 -2.5,-3.2 -2.3,-0.7 -2.3,0.5 -0.2,-2.3 1.5,-1.5 -0.7,-2.7 -4.4,4 -1.6,4.5 3,6.1 -1.7,2.8 4.1,2.6 4.5,4.1 2,4.7 2.4,2.9 6,12.7 6.2,11.7 5.4,8.4 -0.8,1.8 2.8,5.3 4.6,3.9 10.7,6.9 11.6,6.4 0.7,2.6 5.9,3.7 2.7,-1.6 1.2,-3.3 2.8,-6.9 -2.8,-5.3 1.1,-2.1 -1.2,-2.4 1.9,-3.2 -0.3,-5.4 -0.1,-4.5 1.1,-2.1 -5.5,-10.3 -3,1.1 -2.6,-0.7 -0.2,-9.7 -4.4,3.8 -4.9,-0.2 -2.3,-3.4 -3.7,-0.3 1,-2.8 -3.3,-3.8 -2.6,-5.8 1.5,-1.1 -0.1,-2.7 3.3,-1.9 -0.7,-3.4 1.3,-2.2 0.4,-3 6.2,-4.3 4.6,-1.2 0.7,-1 5.1,0.3 z", PH: "m 1684.6,518.6 -0.6,-2.3 -0.8,-3.2 -4.8,-3 0.8,4.9 -3.9,0.2 -0.7,2.8 -4.2,1.7 -2.2,-2.8 -2.8,2.4 -3.4,1.7 -1.9,5.4 1.1,1.9 3.9,-3.6 2.7,0.3 1.5,-2.7 3.8,3 -1.5,3.1 1.9,4.6 6.8,3.7 1.4,-3 -2.1,-4.7 2.4,-3.2 2.5,6.4 1.5,-5.8 -0.6,-3.5 -0.8,-4.3 z m -14.5,-11.8 0,-6.1 -3.6,6.1 0.5,-4.2 -3,0.3 -0.3,4 -1.2,1.8 -1,1.7 3.8,4.4 1.6,-1.9 1.4,-4 1.8,-2.1 z m -30.1,6.1 2.6,-4.4 3.4,-3.5 -1.5,-5.2 -2.4,6.3 -2.9,4.4 -3.8,4 -2.4,4.4 7,-6 z m 17.4,-16.4 1.2,3 -0.1,3.3 0.5,2.9 3.3,-1.9 2.4,-2.7 -0.2,-2.6 -3.6,0 -3.5,-2 z m 20,-1.7 -1.8,-2.4 -5.4,-0.1 4,4.8 0.3,2.4 -3.3,-0.5 1.2,3.9 1.7,0.3 0.7,4.5 2.5,-1.4 -1.7,-4 -0.4,-2.1 4.5,1.7 -2.3,-7.1 z m -22.9,-5.8 -2.2,-2.3 -4.8,-0.2 3.4,4.8 2.8,3.2 0.8,-5.5 z m -6.4,-34.6 -3.3,0 -0.9,5.8 1.1,9.9 -2.6,-2 1.2,6 1.2,2.8 3.3,3.7 0.4,-2.3 1.8,1.4 -1.5,1.7 0.1,2.6 2.9,1.4 5,-0.9 4,3.8 1.1,-2.4 2.5,3.4 4.8,3.1 0.2,-2.9 -2,-1.6 0.1,-3.4 -7.5,-3.6 -2.3,0.8 -3.1,-0.7 -2,-5.1 0.1,-5.1 3,-2.1 0.6,-5.3 -2.7,-4.6 0.4,-2.6 -0.7,-1.6 -1.5,1.6 -3.7,-1.8 z", PG: "m 1850.7,615.6 0.9,-1.8 -2.4,-2.2 -2.5,-4 -1.6,-1.5 -0.5,-1.9 -0.8,0.7 0.9,4.8 2.2,4 2.2,2.5 1.6,-0.6 z m -21.2,-8.6 2.1,-3.9 0.4,-3.5 -1.1,-1 -3.4,0.1 0.4,3.7 -3.3,2.3 -1.7,2.2 -3.2,0.5 -0.4,-3.4 -0.8,0.1 -1,3.1 -3.1,0.5 -5,-0.9 -0.6,1.9 3.1,1.8 4.5,1.9 2.9,0 3,-1.5 3.2,-1.6 1,-1.8 3,-0.5 z m -27.8,12.2 -0.9,-4.3 5.2,-0.7 -1.1,-3.3 -9.1,-4 -0.6,-3.7 -2.9,-3.2 -3.7,-3.3 -10.2,-3.6 -9.6,-4.4 -1,20.7 -1.5,20.8 5.7,0.2 3.1,1.1 4.6,-2.2 -0.3,-4.7 3.6,-2.1 4.9,-1.8 7,2.8 2.4,5.6 2.9,3.5 3.9,4 5.5,1 4.8,0.7 1.1,1.6 3.8,-0.4 0.8,-1.8 -5.6,-2.7 1.8,-1.2 -4.2,-1.1 0.5,-2.8 -3.2,0.2 -3,-6.8 -4.7,-4.1 z m 34.7,-18.4 -0.5,-3.3 -2,-2.1 -2.1,-2.6 -2.3,-1.5 -1.9,-1.4 -2.9,-1.8 -1.6,1.5 3.9,1.9 3.1,2.7 2.4,2.1 1.2,2.4 0.8,3.8 1.9,-1.7 z", PL: "m 1069.4,228.3 -4.6,-0.1 -0.5,-1.4 -4.8,-1.1 -5.7,2.1 -7.1,2.8 -3.1,1.7 1.4,3.1 -1.2,1.6 2,2.2 1.4,3.3 -0.1,2.1 2.3,3.9 2.4,1.9 3.7,0.6 -0.1,1.7 2.7,1.2 0.6,-1.5 3.4,0.6 0.7,2 3.6,0.3 2.6,3.1 0.3,0.4 1.9,-0.9 2.7,2.2 2.8,-1.3 2.4,0.6 3.4,-0.8 4.9,2.3 1.1,0.4 -1.6,-2.8 3.8,-5.1 2.3,-0.7 0.3,-1.8 -3.1,-5.3 -0.5,-2.7 -1.9,-2.9 2.7,-1.2 -0.3,-2.4 -1.7,-2.3 -0.6,-2.7 -1.4,-1.9 -2.5,-0.6 -8.7,0.1 -5.9,-0.7 z", KP: "m 1644.7,302.3 0,0 -5.5,-3.6 0.1,3.5 -6.3,2.6 2.7,3.3 -4.6,-0.2 -3.6,-2 -1,4.4 -3.8,3.4 -2.1,4 3.3,1.7 3.4,0.7 0.8,1 0.4,3.5 1.1,1.2 -0.9,0.7 -0.1,2.9 1.9,1 1.6,0.6 0.8,1.2 1.3,-0.5 0,-1.3 3.1,1.3 0.1,-0.6 2.4,0.2 0.7,-2.9 3.5,-0.3 2.1,-0.4 -0.1,-1.6 -4.3,-2.8 -2.6,-1 0.2,-0.7 -1.2,-2.8 1.3,-1.7 2.9,-1 1,-1.9 0.3,-1.1 1.9,-1.4 -2.8,-4.5 0.3,-2.1 0.9,-2 2.2,0.3 0,0 0,0 0,0 -1.4,-1.1 z", PT: "m 937.6,335.9 -0.4,-2.1 2,-2.5 0.8,-1.7 -1.8,-1.9 1.6,-4.3 -2,-3.8 2.2,-0.5 0.3,-3 0.9,-0.9 0.2,-4.9 2.4,-1.7 -1.3,-3.1 -3,-0.2 -0.9,0.8 -3,0 -1.2,-3.1 -2.1,0.9 -1.9,1.6 0.1,2.1 0.9,2.2 0.1,2.7 -1.3,3.8 -0.4,2.5 -2.2,2.3 -0.6,4.2 1.2,2.4 2.3,0.6 0.4,4 -1,5.1 2.8,-0.7 2.7,0.9 2.2,-1.7 z", PY: "m 655.7,700.5 -0.3,-1.9 -5.4,-3.3 -5.1,-0.1 -9.5,1.9 -2.1,5.6 0.2,3.4 -1.5,7.6 11.2,10.4 4.6,1 7.2,4.7 5.9,2.5 1.1,2.8 -4.2,9.6 5.7,1.8 6.2,1 4.2,-1.1 4.3,-4.8 0.3,-5.7 0.7,-3.6 0.3,-3.8 -0.3,-3.5 -2.1,-1.2 -2,1.1 -2,-0.3 -0.9,-2.5 -1,-5.8 -1.2,-1.9 -3.9,-1.7 -2.1,1.2 -6,-1.2 -0.4,-8.6 -1.9,-3.6 z", PS: "m 1166.9,366.1 -2,-0.9 -0.7,4.3 1.4,0.7 -1.2,0.8 -0.1,1.7 2.4,-0.8 0.6,-1.9 -0.4,-3.9 z", QA: "m 1258,415.5 0.8,-3.8 -0.5,-3.7 -1.9,-2 -1.4,0.7 -1.1,3.3 0.8,4.7 1.8,1.2 1.5,-0.4 z", RO: "m 1108.1,266.3 -2.1,0 -1,1.5 -3.6,0.6 -1.6,0.9 -2.4,-1.5 -3.2,0 -3.2,-0.7 -1.9,1.3 -2.9,1.3 -1.9,4.2 -2.6,4.3 -3.8,1.1 2.9,2.5 0.8,1.9 3.2,1.5 0.7,2.5 3.1,1.8 1.4,-1.3 1.4,0.7 -1.1,1.1 1,1 1.8,2.6 1.9,-0.5 4,1 7.5,0.3 2.3,-1.6 5.8,-1.4 4,2.2 3,0.7 0.4,-7.4 1.6,0.5 2.3,-1.3 -0.4,-1.6 -2.4,-1.1 -2.2,1 -2.4,-1.1 -1.3,-2.8 0.2,-2.7 -0.6,-2.7 -3.4,-3.7 -1.9,-2.6 -1.8,-1.9 -1.6,-0.6 z", RU: "m 1332.3,95.1 -4.5,-4 -13.6,-4.1 -9.4,-2.1 -6.2,0.9 -5.3,2.9 5.8,0.8 6.6,3.2 8,1.7 11.5,1.3 7.1,-0.6 z m -178.7,-7.3 0.9,-0.6 -5.7,-0.9 -2.8,0.7 -1.3,1 -1.5,-1.2 -5.2,0.1 -6.2,0.8 7.7,0.1 -1.1,1.3 4.4,1 3.6,-0.7 0.1,-0.7 2.9,-0.3 4.2,-0.6 z m 200.5,9.9 -1.5,-1.8 -12.5,-2.6 -3,-0.3 -2.2,0.5 1.2,6 18,-1.8 z m 15.2,6.3 -9.2,-0.7 3.4,-1.2 -8.2,-1.5 -6.1,1.9 -1,2 1.5,2.1 -6.9,-0.1 -5.3,2.6 -4.3,-1.1 -9.3,0.5 0.3,1.3 -9.2,0.7 -4.9,2.4 -4.2,0.2 -1.2,3.3 5.5,2.6 -7.7,0.7 -9.5,-0.3 -5.8,1.1 4.8,5.4 6.9,4.3 -9.6,-3 -7.9,0.3 -5.1,2 4.5,3.8 -4.9,-1 -2.1,-5 -4.2,-2.8 -1.8,0.1 3.6,3.7 -4.6,3.5 8.1,4.2 0.4,5.4 2.9,2.9 4.7,0.5 0.4,3.5 4.4,3.1 -1.9,2.6 0.5,2.7 -3.7,1.4 -0.5,2 -5.3,-0.8 3.5,-7.8 -0.5,-3.6 -6.7,-3.3 -3.8,-7.3 -3.7,-3.7 -3.6,-1.6 0.8,-4.2 -2.9,-2.9 -11.3,-1.4 -2.1,1 0.5,4.7 -4.3,4.7 1.2,1.7 4.7,4.1 0.1,2.6 5.3,0.5 0.8,1.1 5.8,2.9 -1,2.8 -18.5,-6.1 -6.6,-1.7 -12.8,-1.6 -1.2,1.7 5.9,3.1 -2.7,3.6 -6.4,-3.2 -5,2.2 -7.6,0.1 -2.1,1.9 -5.3,-0.6 2.5,-3.3 -3.2,-0.2 -12.3,4.6 -7.6,2.6 0.4,3.5 -6,1.2 -4,-1.9 -1.2,-3 5,-0.7 -3.6,-3 -12.2,-1.8 4.3,3.4 -0.8,3.2 4.7,3.3 -1.1,3.8 -4.6,-1.9 -4,-0.3 -8,5.4 4.2,4.1 -3.2,1.4 -11.4,-3.5 -2.1,2.1 3.3,2.4 0.2,2.7 -3.8,-1.4 -6,-1.7 -1.9,-5.8 -1,-2.6 -8,-4 2.9,-0.7 20.1,4.2 6.4,-1.5 3.7,-2.9 -1.6,-3.6 -4,-2.6 -17.6,-6.1 -11.6,-1.3 -7.6,-3.2 -3.6,1.8 0,0 -6.4,2.2 -3.2,0.5 0.4,3.7 7.2,3.7 -2.8,4.1 6.4,6.3 -1.7,4.8 4.9,4.1 -0.9,3.7 7.3,3.9 -0.9,2.9 -3.3,3.3 -7.9,7.4 0,0 5.3,2.8 -4.5,3.2 0,0 0.9,1 -2.6,3.4 2.5,5.5 -1.6,1.9 2.4,1.4 1,2.8 2.1,3.6 5.2,1.5 1,1.4 2.3,-0.7 4.8,1.4 1,2.9 -0.6,1.6 3.7,3.9 2.2,1.1 -0.1,1.1 3.4,1.1 1.7,1.6 -1.6,1.3 -3.9,-0.2 -0.8,0.6 1.5,2 2,3.9 0,0 1.8,0.2 1,-1.4 1.5,0.3 4.8,-0.5 3.8,3.4 -0.9,1.3 0.7,1.9 4,0.2 2.2,2.7 0.2,1.2 6.6,2.2 3.5,-1 3.6,2.9 2.9,-0.1 7.6,2 0.4,1.9 -1.3,3.2 1.8,3.4 -0.3,2.1 -4.7,0.5 -2.2,1.7 0.4,2.8 4.2,-1 0.4,1.3 -6.8,2.6 3.2,2.4 -3.2,5.2 -3.4,1 5,3.6 6.2,2.4 7.4,5.1 0.5,-0.7 4.5,1.1 7.7,1 7.5,2.9 1.1,1.2 2.9,-1 5.1,1.3 2.1,2.5 3.5,1.4 1.5,0.2 4.3,3.8 2.4,0.4 0.5,-1.5 2.6,-2.5 0,0 -7.3,-7.3 -0.4,-4.1 -5.9,-5.9 3.5,-6.3 4.6,-1.1 1.4,-3.7 -2.8,-1 -0.2,-3.2 -4.2,-4.1 -3.6,0.2 -5.3,-4.3 1.7,-4.7 -1.7,-1.2 2.1,-6.8 6,3.6 -0.7,-4.6 8.1,-6.6 7.5,-0.2 11.9,4.3 6.6,2.4 4.3,-2.5 7.6,-0.2 7.3,3.2 0.8,-1.8 6.9,0.3 0.2,-3 -9.4,-4.2 3.6,-2.9 -1.5,-1.7 3.9,-1.6 -5,-4.1 1.4,-2.1 16.8,-2.1 1.7,-1.5 10.8,-2.2 3.1,-2.5 9,1.3 4.3,6.3 4.3,-1.5 7,2.1 1.2,3.3 4.4,-0.4 9.1,-5.7 -0.8,1.9 8.3,4.7 18.1,15.5 1.1,-3.3 8.3,3.6 6.2,-1.6 3.2,1.1 4.1,3.6 3.9,1.2 3.3,2.6 6,-0.9 4.3,3.8 1.7,-0.5 4.7,-1 6.6,-5.4 5.9,-2.9 5.3,1.9 5.1,0.1 4.7,2.9 5,0.2 7.9,1.6 2.4,-4.3 -4,-3.6 1.3,-6.4 6.9,2.5 4.8,0.8 6.6,1.5 3.7,4.6 8.4,2.6 3.9,-1.1 5.7,-0.8 5.4,0.8 6.5,3 4.9,3.1 4.5,0 6.7,1 3.6,-1.6 5.8,-1 4.5,-4.4 3.3,0.7 3.9,2.1 5.5,-0.5 7.3,2.3 4.4,-3.9 -1.9,-2.7 -0.1,-6.5 1.2,-2 -2.5,-3.3 -3.7,-1.5 1.7,-3 5.1,-1.1 6.2,-0.2 8.5,1.8 5.9,2.3 7.7,6.1 3.8,2.7 4.4,3.7 6.1,6.1 9.9,1.9 8.9,4.5 6,5.8 7.5,0 2.6,-2.5 6.9,-1.8 1.3,5.6 -0.4,2.3 2.8,6.8 0.6,6 -6.8,-1.1 -2.9,2.2 4.7,5.3 3.8,7.3 -2.5,0.1 1.9,3.1 0,0 1.4,1.1 0,0 0,0 0,0 -0.4,-2 4,-4.5 5.1,3 3.2,-0.1 4.4,-3.6 1,-3.7 2.1,-7.1 1.9,-7.2 -1.3,-4.3 1,-9 -5.2,-9.9 -5.5,-7.3 -1.3,-6.2 -4.7,-5.1 -12.7,-6.7 -5.6,-0.4 -0.3,3 -5.8,-1.3 -5.7,-3.8 -8,-0.7 4.9,-14.1 3.5,-11.5 13.1,-1.8 14.9,1 2.5,-2.8 7.9,0.8 4.3,4.3 6.4,-0.6 8.4,-1.6 -7.7,-3.5 0,-9.8 9.1,-1.9 12.1,7.1 3.6,-6.4 -3.2,-4.7 4.7,-0.5 6.5,8.1 -2.4,4.6 -0.8,6 0.3,7.5 -5.7,1.3 2.8,2.7 -0.1,3.6 6.4,8.3 16,13.4 10.5,8.8 5.7,4.3 1.6,-5.7 -4.5,-6.2 5.7,-1.5 -5.4,-6.9 5,-3.1 -4.7,-2.6 -3.4,-5 4.1,-0.2 -9,-8.6 -6.7,-1.4 -2.9,-2.4 -1.1,-5.6 -3.1,-3.9 7,0.8 1.3,-2.5 4.7,2.2 6.1,-4.6 11.4,4 -1.7,-2.6 2,-3.6 1.5,-4 3.1,-0.7 6.5,-4.3 9.8,1.2 -0.9,-1.5 -3.8,-2.3 -4.1,-1.6 -9.1,-4.6 -8.1,-3 6.1,0.4 2,-2.5 0,0 -32.9,-21.9 -9.4,-2.3 -15.7,-2.6 -7.9,0.3 -15.2,-1.4 1.8,2.3 8.5,3.4 -2.5,1.8 -14.2,-4.8 -6.8,0.6 -9.2,-1.1 -7,0.2 -3.9,1.1 -7.2,-1.6 -5.1,-3.8 -6.5,-2.2 -9.2,-0.9 -14.7,1 -16.1,-4 -7.8,-3 -40.1,-3.4 -2.1,2.2 9.3,4.8 -7.5,-0.7 -1,1.5 -9.7,-1.6 -5,1.4 -9.3,-2.4 3,5.5 -8.9,-2.1 -10,-4.1 -0.4,-2.2 -6,-3.3 -9.8,-2.6 -6.1,0 -9.3,-0.9 4.7,3.9 -17.2,-0.8 -3.9,-2.3 -13.3,-0.9 -5.3,0.8 -0.1,1.3 -5.8,-3.2 -2.3,0.9 -7.2,-1.2 -5.6,-0.7 1.1,-1.5 6.6,-2.8 2.3,-1.5 -2.4,-2.5 -5.5,-1.9 -11.5,-2.3 -10.8,-0.1 -1.9,1.2 -4.1,-2.4 z m -162.2,31.6 -9.9,-4.3 -3.1,-4.3 3.3,-4.9 2.8,-5 8.6,-4.7 9.8,-2.4 11.3,-2.4 1.3,-1.5 -4.2,-1.9 -6.6,0.6 -4.9,1.8 -11.7,0.9 -10.1,3.1 -6.8,2.7 2.5,2.2 -6.6,4.4 3.9,0.7 -5.4,4.3 1.6,2.8 -3.4,1.1 1.9,2.8 7.9,1.4 2.2,2.3 13.4,0.7 2.2,-0.4 z m 314,-24.7 -17.9,-2.6 -10.2,-0.2 -3.4,0.9 3.4,3.4 12.4,3.2 4.5,-1.2 14.2,0.2 -3,-3.7 z m 25.2,2.3 -11.7,-1.3 -8.2,-0.7 1.7,1.6 10.3,2 6.8,0.4 1.1,-2 z m -12.5,9.5 -2.5,-1.4 -8.3,-1.9 -4.1,0.5 -0.8,2 1.1,0.2 8.8,0.6 5.8,0 z m 162.6,12.3 -6,-3.6 -1.4,2.2 3.5,1.6 3.9,-0.2 z m -612.4,93.9 -0.6,-1.5 0.2,-1.7 -2.2,-0.9 -5,-1.1 -6.3,2 -0.7,2.6 5.9,0.7 8.7,-0.1 z m 589.7,21.8 -7.2,-6.2 -5.1,-6 -6.8,-5.8 -4.9,-4 -1.3,0.8 4.4,2.8 -1.9,2.8 6.8,8.3 7.8,6 6.4,8.3 2.4,4.6 5.5,6.8 3.8,6 4.6,5.2 -0.1,-4.8 6.5,3.8 -3,-4.4 -9.5,-6.3 -3.7,-9 8.9,2 -13.6,-10.9 z", RW: "m 1147.6,579.4 -3.3,1.9 -1.4,-0.6 -1.6,1.8 -0.2,3.8 -0.8,0.4 -0.6,3.5 3.5,0.5 1.7,-3.6 3,0.4 0,0 1.6,-0.8 0.4,-3.7 -2.3,-3.6 z", EH: "m 929.6,396.2 -0.8,0 0,0 0.1,3.4 -3.4,0.2 -1.8,1.5 -2.5,0 -1.9,-0.9 -4.6,0.7 -1.9,5 -1.7,0.4 -2.8,8.1 -7.8,6.8 -2,8.8 -2.3,2.9 -0.7,2.3 -12.4,0.5 -0.1,0 -0.3,2.7 1.2,-2.2 21.6,0.1 -0.9,-9.2 1.4,-3.3 5.2,-0.5 0.2,-16.3 17.9,0.3 0.2,-9.7 0.1,-1.2 0,-0.4 z", SA: "m 1228.7,387 -10.2,-0.5 -16.7,-12.7 -8.5,-4.5 -6.7,-1.7 -0.9,1 -10.4,3.1 6.1,6.4 -1.7,1 -0.7,2.2 -4,0.8 -1.1,2.3 -2.1,2 -6.1,-1 -0.5,2.5 0,2.2 -0.6,3.5 2.7,0 3.2,4.4 3.7,5.1 2.5,4.7 1.7,1.5 1.7,3.3 -0.2,1.4 2.1,3.7 3,1.3 2.8,2.5 3.6,7 0,3.8 0.9,4.4 4,6.1 2.5,1 4.1,4.4 1.9,5.2 3.2,5.3 3,2.3 0.6,2.5 1.8,1.9 0.9,2.8 2.3,-2.1 -0.7,-2.7 1.2,-3.1 2.4,1.7 1.5,-0.6 6.4,-0.2 1,0.7 5.4,0.6 2.1,-0.3 1.6,2.1 2.5,-1 3.5,-6.7 5,-2.9 15.7,-2.4 16.1,-6.4 2.6,-12.7 -2.9,-4.5 -1,1.3 -16.8,-3.2 -2.6,-6.4 -0.4,-1.5 -1.2,-2.4 -1.5,0.4 -1.8,-1.2 -1,-1.6 -0.9,-2.1 -1.7,-1.8 -1,-2.1 0.4,-2.1 -0.6,-2.7 -4,-2.6 -1.2,-2.3 -2.9,-1.4 -2.7,-5.5 -3.8,0.2 -1.7,-3.1 -4.9,-0.6 z", SD: "m 1180.8,468.5 0.4,-4.2 1.6,-2 4,-1 2.6,-3.6 -3.1,-2.4 -2.2,-1.6 -2.5,-7.6 -1.1,-6.5 1.1,-1.2 -2.1,-6.2 -21.8,0 -21.4,0 -22.1,0 0.5,12.7 -6.3,0 0,2.7 1.1,25.2 -4.8,-0.4 -2.4,4.7 -1.4,3.9 1.2,1.5 -1.8,1.9 0.7,2.7 -1.4,2.6 -0.5,2.4 2,-0.4 1.2,2.5 0.1,3.7 2.1,1.8 0,1.6 0.7,2.7 3.3,4 0,2.6 -0.8,2.6 0.3,2 2,1.8 0.5,0.3 1.7,-0.7 1.9,-1.2 1.3,-5.7 1.5,-2.9 4,-0.9 1,1.8 3,3.7 1.5,0.5 2,-1.1 4.1,0.3 0.8,1.3 5.5,0 0.2,-1.3 2.9,-1.2 0.5,-1.9 2.1,-1.3 4.8,3.7 2.8,-0.7 2.7,-4.5 3,-3.5 -0.6,-3.9 -1.4,-1.8 3.4,-0.3 0.3,-1.5 2.6,0.5 -0.5,4.7 0.8,4.6 2.9,2.5 0.7,2.2 0,3.1 0.8,0.1 0,-0.7 1.4,-6.7 2.6,-1.8 0.5,-2.6 2.3,-4.8 3.2,-3.2 2.1,-6.2 0.7,-5.5 -0.7,-2.5 1.9,-9.4 z", SS: "m 1166,508.7 -0.7,-2.2 -2.9,-2.5 -0.8,-4.6 0.5,-4.7 -2.6,-0.5 -0.3,1.5 -3.4,0.3 1.4,1.8 0.6,3.9 -3,3.5 -2.7,4.5 -2.8,0.7 -4.8,-3.7 -2.1,1.3 -0.5,1.9 -2.9,1.2 -0.2,1.3 -5.5,0 -0.8,-1.3 -4.1,-0.3 -2,1.1 -1.5,-0.5 -3,-3.7 -1,-1.8 -4,0.9 -1.5,2.9 -1.3,5.7 -1.9,1.2 -1.7,0.7 3.8,2.5 3.1,2.6 0.1,2 3.8,3.4 2.4,2.7 1.5,3.8 4.2,2.5 0.9,2.1 3.5,5.2 2.5,0.8 1.5,-1.1 2.6,0.4 3.1,-1.3 1.4,2.7 5,4.2 0,0 2.3,-1.7 3.5,1.4 4.5,-1.5 4,0.1 3.4,-3 3.4,-3.8 3.8,-4.2 -3.5,-6.9 -2.6,-1.5 -1,-2.5 -2.9,-3.1 -3.4,-0.5 1.8,-3.6 3,-0.1 0.8,-2 -0.2,-5 -0.8,-0.1 0,-3.1 z", SN: "m 908.9,479.2 -3.6,-4.4 -3.2,-4.7 -3.7,-1.7 -2.6,-1.8 -3.1,0 -2.8,1.4 -2.7,-0.5 -2,2 -1.3,3.3 -2.8,4.4 -2.5,1.2 2.7,2.3 2.2,5 6.1,-0.2 1.3,-1.5 1.8,-0.1 2.1,1.5 1.8,0.1 1.8,-1.1 1.1,1.8 -2.4,1.5 -2.4,-0.1 -2.4,-1.4 -2.1,1.5 -1,0 -1.4,0.9 -5,-0.1 0.8,4.9 3,-1.1 1.8,0.2 1.5,-0.7 10.3,0.3 2.7,0.1 4,1.5 1.3,-0.1 0.4,-0.7 3,0.5 0.8,-0.4 0.3,-2 -0.4,-2.4 -2.1,-1.8 -1.1,-3.7 -0.2,-3.9 z", SL: "m 919.4,518.7 -1.5,0.3 0,-2.3 -0.9,-1.7 0.2,-1.8 -1.2,-2.7 -1.5,-2.3 -4.5,0 -1.3,1.2 -1.5,0.2 -1,1.4 -0.7,1.7 -3,2.8 0.7,4.7 0.9,2.3 2.9,3.5 4.1,2.5 1.5,0.5 1.3,-2 0.3,-1.9 2.6,-3.4 2.6,-3 z", SV: "m 487.2,487 0.6,-2.5 -0.7,-0.7 -1.1,-0.5 -2.5,0.8 -0.1,-0.9 -1.6,-1 -1.1,-1.3 -1.5,-0.5 -1.4,0.4 0.2,0.7 -1.1,0.7 -2.1,1.6 -0.2,1 1.4,1.3 3.1,0.4 2.2,1.3 1.9,0.6 3.3,0.1 0.7,-1.5 z", RS: "m 1084.8,285.2 -3.2,-1.5 -0.8,-1.9 -2.9,-2.5 -3.2,-0.2 -3.7,1.6 0,0 1.5,2.4 1.7,1.8 -1.7,2.3 0,0 1.8,0 -1,2.7 2.7,2.3 -0.5,2.9 -1.2,0.3 1.5,1.1 0.8,0.8 1.8,0.7 2,1.2 -0.4,0.6 1.2,-0.5 0.5,-2 0.9,-0.4 0.8,0.9 1,0.4 0.8,1 0.8,0.3 1.1,1.1 0.8,0 -0.5,1.5 -0.5,0.7 0.2,0.5 1.7,-0.4 2.4,-0.1 0.7,-0.9 -0.6,-0.7 0.7,-2 1.7,-1.9 -2.8,-2.6 -0.7,-2.3 1.1,-1.4 -1,-1 1.1,-1.1 -1.4,-0.7 -1.4,1.3 -3.1,-1.8 -0.7,-2.5 z", SR: "m 668,533.8 -4.6,0.5 -0.6,1.1 -6.7,-1.2 -1,5.7 -3.5,1.6 0.3,1.5 -1.1,3.3 2.4,4.6 1.8,0.1 0.7,3.5 3.3,5.6 3.1,0.5 0.5,-1.3 -0.9,-1.3 0.5,-1.8 2.3,0.6 2.7,-0.7 3.2,1.4 1.4,-2.7 0.6,-2.9 1,-2.8 -2.1,-3.7 -0.4,-4.4 3.1,-5.5 -6,-1.7 z", SK: "m 1087.4,260.9 -4.9,-2.3 -3.4,0.8 -2.4,-0.6 -2.8,1.3 -2.7,-2.2 -1.9,0.9 -0.3,-0.4 -1.5,0 -0.6,1.1 -1.1,0.3 -0.2,1.4 -0.9,0.3 -0.1,0.6 -1.6,0.6 -2.2,-0.1 -0.6,1.4 -0.3,0.8 0.7,2.1 2.6,1.6 1.9,0.7 4.1,-0.8 0.3,-1.2 1.9,-0.2 2.3,-1 0.6,0.4 2.2,-0.7 1,-1.5 1.6,-0.4 5.5,1.9 1,-0.6 0.7,-2.5 1.1,-1.7 z", SI: "m 1059.4,277 -1.2,-2.1 -0.8,-0.1 -0.9,1.1 -4.3,0.1 -2.4,1.4 -4.2,-0.4 -0.3,3 1.4,2.7 -1.1,0.5 3.5,0.2 0.8,-1 1.8,1 2,0.1 -0.2,-1.7 1.7,-0.6 0.3,-2.5 3.9,-1.7 z", SE: "m 1077.7,161.1 -1.9,-2.2 -1.7,-8.4 -7.2,-3.7 -5.9,-2.7 -2.5,0.3 0,3.5 -7.9,-0.9 -0.6,3.1 -4,-0.1 -2.2,3.9 -3.4,6.1 -5.7,7.9 1.8,1.9 -1.3,2.2 -4.3,-0.1 -2.3,5.3 1,7.6 3.1,2.9 -0.9,6.9 -3.4,4 -1.7,3.3 4.2,8.4 4.4,6.7 2,5.7 5.3,-0.3 2.2,-4.7 5.7,0.5 2,-5.5 0.6,-10 4.6,-1.3 3.3,-6.6 -4.8,-3.3 -3.6,-4 2.1,-8.1 7.7,-4.9 6.1,-4.5 -1.2,-3.5 3.4,-3.9 7,-1.5 z", SZ: "m 1150.5,736.6 -2.7,-1.2 -1.6,0.5 -0.7,1.8 -1.6,2.4 -0.1,2.2 3,3.5 3.3,-0.7 1.3,-2.8 -0.3,-2.8 -0.6,-2.9 z", SY: "m 1183.5,359.9 11,-6.7 0.9,-7.8 -1.2,-4.7 2.7,-1.6 2.1,-4.1 -5.9,1.1 -2.8,-0.2 -5.7,2.5 -4.3,0 -3,-1.2 -5.5,1.8 -1.9,-1.3 0.1,3.6 -1.2,1.5 -1.2,1.4 -1,2.6 1.1,5 2.4,0.3 1.2,2.5 -2.6,2.4 -0.9,3.5 0.3,2.6 -0.6,1 0.1,0 6.3,2.5 9.6,-6.7 z", TD: "m 1108.4,447.6 -22.4,-12.2 -22.3,-12.2 -5.4,3.5 1.6,9.9 2,1.6 0.2,2.1 2.3,2.2 -1.1,2.7 -1.8,12.9 -0.2,8.3 -6.9,6 -2.3,8.4 2.4,2.3 0,4.1 3.6,0.2 -0.5,2.9 2.2,4.1 0.5,4.2 -0.2,4.3 3.1,5.8 -3.1,-0.1 -1.6,0.4 -2.5,-0.6 -1.2,3 3.3,3.7 2.5,1.1 0.8,2.6 1.8,4.4 -0.9,1.7 4.7,-0.4 1,-1.7 0.9,0.2 1.4,1.4 7.1,-2.4 2.3,-2.5 2.9,-2.2 -0.6,-2.3 1.6,-0.6 5.4,0.4 5.2,-2.9 4,-7 2.8,-2.5 3.5,-1.1 0,-1.6 -2.1,-1.8 -0.1,-3.7 -1.2,-2.5 -2,0.4 0.5,-2.4 1.4,-2.6 -0.7,-2.7 1.8,-1.9 -1.2,-1.5 1.4,-3.9 2.4,-4.7 4.8,0.4 -1.1,-25.2 z", TG: "m 981.7,502.2 -4.9,-0.1 -0.4,1.9 2.4,3.3 -0.1,4.6 0.6,5.1 1.4,2.3 -1.2,5.7 0.4,3.2 1.5,4 1.2,2.2 4.6,-1.3 -1.4,-4.4 0.2,-14.6 -1.1,-1.3 -0.2,-3.1 -2,-2.3 -1.7,-1.9 0.7,-3.3 z", TH: "m 1562.7,481.4 1.5,-2.9 -0.5,-5.4 -5.2,-5.5 -1.3,-6.3 -4.9,-5.2 -4.3,-0.4 -0.8,2.2 -3.2,0.2 -1.8,-1.2 -5.3,3.8 -1,-5.7 0.4,-6.7 -3.8,-0.3 -0.9,-3.8 -2.6,-1.9 -3,1.4 -2.8,2.8 -3.9,0.3 -1.5,6.9 -2.2,1.1 3.5,5.6 4.1,4.6 2.9,4.2 -1.4,5.6 -1.7,1.1 1.7,3.2 4.2,5.1 1,3.5 0.2,3 2.8,5.8 -2.6,5.9 -2.2,6.6 -1.3,6.1 -0.3,3.9 1.2,3.6 0.7,-3.8 2.9,3.1 3.2,3.5 1.1,3.2 2.4,2.4 0.9,-1.1 4.7,2.8 0.6,3.3 3.7,-0.8 1.7,-2.6 -3.1,-3.3 -3.4,-0.8 -3.3,-3.6 -1.4,-5.5 -2.6,-5.8 -3.7,-0.2 -0.7,-4.6 1.4,-5.6 2.2,-9.3 -0.2,-7 4.9,-0.1 -0.3,5 4.7,-0.1 5.3,2.9 -2.1,-7.7 3,-5.2 7.1,-1.3 5.3,1 z", TJ: "m 1344.1,315.7 -2.1,0.2 -1.3,-1.8 0.2,-2.9 -6.4,1.5 -0.5,4 -1.5,3.5 -4.4,-0.3 -0.6,2.8 4.2,1.6 2.4,4.7 -1.3,6.6 1.8,0.8 3.3,-2.1 2.1,1.3 0.9,-3 3.2,0.1 0.6,-0.9 -0.2,-2.6 1.7,-2.3 3.2,1.5 0,2 1.6,0.3 1,5.4 2.6,2.1 1.5,-1.3 2.1,-0.7 2.5,-2.9 3.8,0.5 5.4,0 -1.8,-3.7 -0.6,-2.5 -3.5,-1.4 -1.6,0.6 -3,-5.9 -9.5,0.9 -7.1,-2 -5.4,0.5 -0.6,-3.7 5.9,1.1 1.4,-2 z", TM: "m 1325.6,334.2 -0.8,-4 -7.7,-2.7 -6.2,-3.2 -4.2,-3 -7,-4.4 -4.3,-6.4 -2,-1.2 -5.5,0.3 -2.3,-1.3 -1.9,-4.9 -7.8,-3.3 -3.3,3.6 -3.8,2.2 1.6,3.1 -5.8,0.1 -2.5,0.3 -4.9,-4.9 -3.8,-1.7 -5.5,1.3 -1.8,2 2.5,4 -0.5,-4.5 3.7,-1.6 2.4,3.6 4.6,3.7 -4,2 -5.3,-1.5 0.1,5.2 3.5,0.4 -0.4,4.4 4.5,2.1 0.7,6.8 1.8,4.5 4.4,-1.2 3,-3.7 3.5,0.2 2.1,-1.2 3.8,0.6 6.5,3.3 4.3,0.7 7.3,5.7 3.9,0.2 1.6,5.5 5.9,2.4 3.9,-0.8 0.4,-3 4,-0.9 2.5,-2 -0.1,-5.2 4.1,-1.2 0.3,-2.3 2.9,1.7 1.6,0.2 z", TL: "m 1676.8,631.9 4.9,-1.8 6,-2.8 2.2,-1.7 -2,-0.8 -1.8,0.8 -4,0.2 -4.9,1.4 -0.8,1.5 0.5,1.3 -0.1,1.9 z", TN: "m 1038,361.4 -2,-1 -1.5,-3 -2.8,-0.1 -1.1,-3.5 3.4,-3.2 0.5,-5.6 -1.9,-1.6 -0.1,-3 2.5,-3.2 -0.4,-1.3 -4.4,2.4 0.1,-3.3 -3.7,-0.7 -5.6,2.6 -1,3.3 1,6.2 -1.1,5.3 -3.2,3.6 0.6,4.8 4.5,3.8 0,1.5 3.4,2.6 2.6,11.3 2.6,-1.4 0.4,-2.7 -0.7,-2.6 3.7,-2.5 1.5,-2 2.6,-1.8 0.1,-4.9 z", TR: "m 1166.6,308.9 -9.7,-4.4 -8.5,0.2 -5.7,1.7 -5.6,4 -9.9,-0.8 -1.6,4.8 -7.9,0.2 -5.1,6.1 3.6,3 -2,5 4.2,3.6 3.7,6.4 5.8,-0.1 5.4,3.5 3.6,-0.8 0.9,-2.7 5.7,0.2 4.6,3.5 8,-0.7 3.1,-3.7 4.6,1.5 3.2,-0.6 -1.7,2.4 2.3,3 1.2,-1.4 1.2,-1.5 -0.1,-3.6 1.9,1.3 5.5,-1.8 3,1.2 4.3,0 5.7,-2.5 2.8,0.2 5.9,-1.1 2.1,-1 6.2,0.9 2.1,1.6 2.3,-1.1 0,0 -3.7,-5.2 0.7,-2 -2.9,-7.3 3.3,-1.8 -2.4,-1.9 -4.2,-1.5 0,-3.1 -1.3,-2.2 -5.6,-3 -5.4,0.3 -5.5,3.2 -4.5,-0.6 -5.8,1 -7.8,-2.4 z m -49.6,4 2,-1.9 6.1,-0.4 0.7,-1.5 -4.7,-2 -0.9,-2.4 -4.5,-0.8 -5,2 2.7,1.6 -1.2,3.9 -1.1,0.7 0.1,1.3 1.9,2.9 3.9,-3.4 z", TW: "m 1642.3,427.2 1.2,-10.2 0.1,-3.9 -2.9,-1.9 -3.3,4.8 -1.9,6.3 1.5,4.7 4,5.4 1.3,-5.2 z", TZ: "m 1149.6,578.6 -2,0.8 2.3,3.6 -0.4,3.7 -1.6,0.8 0,0 0.3,2.5 1.2,1.5 0,2 -1.4,1.4 -2.2,3.3 -2.1,2.3 -0.6,0.1 -0.3,2.7 1.1,0.9 -0.2,2.7 1,2.6 -1.3,2.4 4.5,4.3 0.3,3.9 2.7,6.5 0,0 0.3,0.2 2.2,1.1 3.5,1.1 3.2,1.9 5.4,1.2 1.1,1.7 0,0 0.4,-1.2 2.8,3.4 0.3,6.7 1.8,2.4 0,0.1 2.1,-0.3 6.7,1.8 1.4,-0.8 3.9,-0.1 2.1,-1.9 3.3,0.1 6.2,-2.5 4.6,-3.7 0,0 -2,-1.4 -2.2,-6.3 -1.8,-3.9 0.4,-3.1 -0.3,-1.9 1.7,-3.9 -0.2,-1.6 -3.5,-2.3 -0.3,-3.6 2.8,-7.9 -8,-6.3 -0.4,-3.7 -20.2,-13 0,0 -2.8,2.8 -1.9,2.9 2.2,2.2 -3.2,1.6 -0.7,-0.8 -3.2,0.4 -2.5,1.4 -1.6,-2.4 1.1,-4.5 0.2,-3.8 0,0 0,0 -6.2,-0.1 z", UG: "m 1167.6,545.1 -3.4,3 -4,-0.1 -4.5,1.5 -3.5,-1.4 -2.3,1.7 0,0 -0.3,7.5 2.3,0.8 -1.8,2.3 -2.2,1.7 -2.1,3.3 -1.2,3 -0.3,5.1 -1.3,2.4 -0.1,4.8 1.4,0.6 3.3,-1.9 2,-0.8 6.2,0.1 0,0 -0.3,-2.5 2.6,-3.7 3.5,-0.9 2.4,-1.5 2.9,1.2 0.3,0.5 0,-0.3 1.6,-2.6 2.7,-4.2 2.1,-4.7 -2.6,-7.3 -0.7,-3.2 -2.7,-4.4 z", UA: "m 1138.5,241 -4.8,0.5 -1.5,-0.3 -1,1.4 -1.8,-0.2 0,0 -4.1,0.3 -1.2,1.4 0.2,3.1 -2,-0.6 -4.3,0.3 -1.5,-1.5 -1.6,1.1 -2,-0.9 -3.8,-0.1 -5.6,-1.5 -5,-0.5 -3.7,0.2 -2.4,1.6 -2.2,0.3 3.1,5.3 -0.3,1.8 -2.3,0.7 -3.8,5.1 1.6,2.8 -1.1,-0.4 -1.1,1.7 -0.7,2.5 2.9,1.7 0.6,1.6 1.9,-1.3 3.2,0.7 3.2,0 2.4,1.5 1.6,-0.9 3.6,-0.6 1,-1.5 2.1,0 1.1,-0.9 3.2,-0.6 3.9,1.9 2,0.3 2.5,1.6 0,2.1 1.9,1.1 1.1,2.6 2,1.5 -0.2,1 1,0.6 -1.2,0.5 -3,-0.2 -0.6,-0.9 -1,0.5 0.5,1.1 -1.1,2 -0.5,2.1 -1.2,0.7 2.4,1.1 2.2,-1 2.4,1.1 3.3,-4.6 1.3,-3.4 4.5,-0.8 0.7,2.4 8,1.5 1.7,1.4 -4.5,2.1 -0.7,1.2 5.8,1.8 -0.6,2.9 3,1.3 6.3,-3.6 5.3,-1.1 0.6,-2.2 -5.1,0.4 -2.7,-1.5 -1,-3.9 3.9,-2.3 4.6,-0.3 3,-2 3.9,-0.5 -0.4,-2.8 2.2,-1.7 4.7,-0.5 0.3,-2.1 -1.8,-3.4 1.3,-3.2 -0.4,-1.9 -7.6,-2 -2.9,0.1 -3.6,-2.9 -3.5,1 -6.6,-2.2 -0.2,-1.2 -2.2,-2.7 -4,-0.2 -0.7,-1.9 0.9,-1.3 -3.8,-3.4 z", UY: "m 692.5,787 -2.1,-3.7 1.9,-3 -3.8,-4.3 -4.8,-3.5 -6.2,-4.1 -1.9,0.2 -6.2,-4.9 -3.4,0.7 -0.5,5.1 -0.3,6.5 1.1,6.3 -0.9,1.4 0.4,4.2 3.9,3.5 3.6,-0.2 5.4,2.7 2.7,-0.6 4.2,1.2 5.3,-3.5 1.6,-4 z", US: "m 116.7,450.7 2,-0.9 2.5,-1.4 0.2,-0.4 -0.9,-2.2 -0.7,-0.8 -0.8,-0.6 -1.9,-1.1 -0.4,-0.1 -0.4,0.6 0,1.3 -1.2,1 -0.4,0.7 0.4,2.3 -0.6,1.8 1.2,0.9 1,-1.1 z m -0.6,-9.9 0.6,-0.7 -1.2,-1 -1.8,-0.6 -0.7,0.5 0,0.4 0.5,0.5 0.6,1.4 2,-0.5 z m -3,-3.4 -2.6,-0.2 -0.6,0.7 2.9,0.2 0.3,-0.7 z m -4.7,-0.9 -1.1,-2.1 -0.3,-0.4 -1.7,0.9 0.1,0.2 0.4,1.5 1.8,0.2 0.4,0.1 0.4,-0.4 z m -8.3,-4.2 0.3,-1.5 -1.3,-0.1 -1,0.6 -0.4,0.5 1.6,1.1 0.8,-0.6 z m 412.1,-173.2 -1.6,0 -1.3,2.4 -10.1,0 -16.8,0 -16.7,0 -14.8,0 -14.7,0 -14.5,0 -15,0 -4.8,0 -14.6,0 -13.9,0 -1.6,5.1 -2.4,5.1 -2.3,1.6 1.1,-5.9 -5.8,-2.1 -1.4,1.2 -0.4,2.9 -1.8,5.4 -4.2,8.3 -4,5.6 -4,5.6 -5.4,5.8 -1.1,4.7 -2.8,5.3 -3.9,5.2 1,3.4 -1.9,5.2 1.5,5.4 1.3,2.2 -0.8,1.5 0.4,9 2.5,6.5 -0.8,3.5 1,1 4.6,0.7 1.3,1.7 2.8,0.3 -0.1,1.9 2.2,0.7 2.1,3.7 -0.3,3.2 6.3,-0.5 7,-0.7 -1,1.3 7.1,3.1 10.7,4.4 10.7,0 4.3,0 0.8,-2.6 9.3,0 1.3,2.2 2.1,2 2.4,2.8 0.8,3.3 0.4,3.5 2.2,1.9 4,1.9 4.8,-5 4.4,-0.1 3.1,2.5 1.6,4.4 1,3.7 2.4,3.6 0.2,4.5 0.8,3 3.9,2 3.6,1.4 2.1,-0.2 -0.6,-2.2 0.4,-3.1 1,-4.4 1.9,-2.8 3.7,-3.1 6,-2.7 6.1,-4.7 4.9,-1.5 3.5,-0.4 3.5,1.4 4.9,-0.8 3.3,3.4 3.8,0.2 2.4,-1.2 1.7,0.9 1.3,-0.8 -0.9,-1.3 0.7,-2.5 -0.5,-1.7 2.4,-1 4.2,-0.4 4.7,0.7 6.2,-0.8 3,1.5 2,3 0.9,0.3 6.1,-2.9 1.9,1 3,5.3 0.8,3.5 -2,4.2 0.4,2.5 1.6,4.9 2,5.5 1.8,1.4 0.4,2.8 2.6,0.8 1.7,-0.8 2,-3.9 0.7,-2.5 0.9,-4.3 -1.2,-7.4 0.5,-2.7 -1.5,-4.5 -0.7,-5.4 0.1,-4.4 1.8,-4.5 3.5,-3.8 3.7,-3 6.9,-4.1 1.3,-2.2 3.3,-2.3 2.8,-0.4 4.4,-3.8 6,-1.9 4.6,-4.8 0.9,-6.5 0.1,-2.2 -1.4,-0.4 1.5,-6.2 -3,-2.1 3.2,1 0,-4.1 1.9,-2.7 -1,5.3 2,2.5 -2.9,4.4 0.4,0.2 4.4,-5.1 2.4,-2.5 0.6,-2.5 -0.9,-1.1 -0.1,-3.5 1.2,1.6 1.1,0.4 -0.1,1.6 5.2,-4.9 2.5,-4.5 -1.4,-0.3 2.1,-1.8 -0.4,0.8 3.3,0 7.8,-1.9 -1.1,-1.2 -7.9,1.2 4.8,-1.8 3.1,-0.3 2.4,-0.3 4.1,-1.1 2.4,0.1 3.8,-1 1,-1.7 -1.1,-1.4 -0.2,2.2 -2.1,-0.1 -0.6,-3.3 1.1,-3.3 1.4,-1.3 3.9,-3.7 5.9,-1.8 6,-2.1 6.3,-3 -0.2,-2 -2.1,-3.5 2.8,-8.5 -1.5,-1.8 -3.7,1.1 -1.1,-1.7 -5.5,4.7 -3.2,4.9 -2.7,2.8 -2.5,0.9 -1.7,0.3 -1,1.6 -9.3,0 -7.7,0 -2.7,1.2 -6.7,4.2 0.2,0.9 -0.6,2.4 -4.6,2 -3.9,-0.5 -4,-0.2 -2.6,0.7 -0.3,1.8 0,0 -0.1,0.6 -5.8,3.7 -4.5,1.8 -2.9,0.8 -3.7,1.7 -4,0.9 -2.5,-0.3 -2.7,-1.3 2.7,-2.4 0,0 2,-2.2 3.7,-3.4 0,0 0,0 0.7,-2.5 0.5,-3.5 -1.6,-0.7 -4.3,2.8 -0.9,-0.1 0.3,-1.5 3.8,-2.5 1.6,-2.8 0.7,-2.8 -2.7,-2.4 -3.7,-1.3 -1.7,2.4 -1.4,0.6 -2.2,3.1 0.4,-2.1 -2.6,1.5 -2.1,2 -2.6,3.1 -1.3,2.6 0.1,3.8 -1.8,4 -3.3,3 -1.4,0.9 -1.6,0.7 -1.8,0 -0.3,-0.4 -0.1,-3.3 0.7,-1.6 0.7,-1.5 0.6,-3 2.5,-3.5 2.9,-4.3 4.6,-4.7 -0.7,0 -5.4,4 -0.4,-0.7 2.9,-2.3 4.7,-4 3.7,-0.5 4.4,-1.3 3.7,0.7 0.1,0 4.7,-0.5 -1.5,-2.5 0,0 -1.2,-0.2 0,0 0,0 -1.4,-0.3 -0.4,-1.7 -5.1,0.5 -5,1.4 -2.5,-2.3 -2.5,-0.8 3.1,-3.3 -5.3,2 -4.9,2.1 -4.6,1.5 -2.1,-2.1 -5.5,1.3 0.4,-0.9 4.6,-2.6 4.7,-2.5 5.9,-2.1 0,0 0,0 -5.3,-1.6 -4.4,0.8 -3.8,-1.9 -4.6,-1 -3.2,-0.4 -1,-1 0.8,-3.4 z m -240.6,-46.9 6.9,-2.8 0,-1.8 -2.6,-0.4 -3.4,0.9 -6.4,2.1 -2.2,2.7 0.7,1.6 7,-2.3 z m -38.7,-16.4 2.3,-2.3 -2.9,-0.5 -5.7,1 0.8,1.6 1.6,1.1 3.9,-0.9 z m 1.2,-22.3 -3.1,2.2 0.4,0.5 4.2,-0.4 0.3,1.1 1.7,1.2 4.9,-1.2 1.2,-0.6 -3.3,-0.8 -1.6,-1.5 -3.4,0.6 -1.3,-1.1 z m 124.9,-40.2 -4.4,-1.1 -10.2,2.8 -3.2,-0.3 -11,2.3 -4.8,0.6 -7.8,2.5 -4.8,2.6 -8.6,2.5 -7.6,0.1 -6.3,2.9 3.2,1.7 0.7,2.3 -0.8,2.7 2.3,2.1 -1.2,3.5 -9.2,0.2 4.3,-2.8 -3.4,0 -13.1,2.7 -9.1,2.3 1,3.3 -1.2,2.2 4.5,1.4 6.9,-0.7 1.8,1.3 2.9,-1.3 6.1,-1.2 2.7,0 -5.9,2.1 1.1,1 -2.5,2.6 -5.5,1.8 -2.5,-0.5 -7,2.7 -1.8,-0.9 -4.1,0.4 -5.3,3 -7.6,3.1 -5.8,3.4 0.3,2.4 -4,3.3 1.4,1.4 0.5,2.7 7.2,-1.1 0.4,2.1 -3.3,2.1 -3.6,3.5 2.8,0 7.2,-2.3 -1.6,2.9 3.6,-2.1 -0.4,3 4.8,-2.2 0.4,1.1 7.2,-1.8 -6.2,3.4 -5.7,4.5 -5.7,2.1 -2.3,1.2 -10.3,3.6 -4.9,2.4 -6.5,0.7 -8.5,3.3 -6.6,1.8 -8.1,2.8 -0.4,1 10,-1.7 6,-2 6.9,-2 6.1,-1.7 2.8,0.5 8.1,-2.6 4.5,-2.8 10.5,-3.1 3.9,-2.6 6.6,-1.8 7.6,-2.5 8.9,-4.2 -0.2,-2.9 11.1,-4.1 7.4,-3.9 9.2,-3.2 -0.4,1.4 -6.7,1.8 -8.3,5.7 -3.2,3.5 6.4,-1.3 6.1,-1.9 6.5,-1.3 2.9,-0.3 3.5,-4.1 6.3,-1.2 2.6,2.5 6,2.7 6.7,-0.5 5.7,2 3.2,1.1 3.3,6.1 3.7,1.7 7.1,0.2 4.1,0.4 -2.7,5.5 1.6,4.9 -3.3,5.2 2.5,1.9 0.6,2.2 0,0 5.1,-2.9 3.1,-3.7 -4.6,-3.8 1.5,-6.8 1.1,-4.2 -1.7,-2.7 -0.7,-2.4 0.5,-3 -6.4,1.9 -7.6,3.3 -0.2,-3.9 -0.6,-2.6 -2.7,-1.6 -4.2,-0.1 35.4,-32.4 24.3,-20.2 0,0 0,0 -3.5,-0.7 -4.1,-1.6 -6.5,0.8 -2.2,-0.7 -7.1,-0.5 -6.2,-1.6 -4.8,0.5 -4.9,-0.9 2,-1.2 -6.3,-0.3 -3.3,1 0.5,-2.4 z", UZ: "m 1339.8,303.1 -2.5,1.2 -5.4,4.3 -0.9,4.5 -1.9,0 -2.3,-3 -6.6,-0.2 -2.6,-5 -2.5,-0.1 -1.5,-6.2 -7.5,-4.5 -8.6,0.5 -5.7,0.9 -6.5,-5.5 -4.8,-2.3 -9.1,-4.5 -1.1,-0.5 -11.9,3.6 6.2,22.8 5.8,-0.1 -1.6,-3.1 3.8,-2.2 3.3,-3.6 7.8,3.3 1.9,4.9 2.3,1.3 5.5,-0.3 2,1.2 4.3,6.4 7,4.4 4.2,3 6.2,3.2 7.7,2.7 0.8,4 2.9,0 4.3,1.4 1.3,-6.6 -2.4,-4.7 -4.2,-1.6 0.6,-2.8 4.4,0.3 1.5,-3.5 0.5,-4 6.4,-1.5 -0.2,2.9 1.3,1.8 2.1,-0.2 4.1,0.6 5.2,-4.5 -7.1,-3.3 -3.2,1.6 -4.6,-2.3 3.1,-4.1 -1.8,-0.6 z", VE: "m 642,518.9 -2.2,-1.5 -2.9,0.2 -0.7,-5.1 -4.1,-3.2 -4.4,-0.4 -1.8,-3 4.8,-1.9 -6.7,0.1 -6.9,0.4 -0.2,1.6 -3.2,1.9 -4.2,-0.7 -3.1,-2.9 -6,0.7 -5,-0.1 -0.1,-2.1 -3.5,-3.5 -3.9,-0.1 -1.7,-4.5 -2.1,2 0.6,3 -7.1,2.6 0,4.8 1.6,2.2 -1.5,4.6 -2.4,0.4 -1.9,-5 2.7,-3.7 0.3,-3.3 -1.7,-2.9 3.3,-0.8 0.3,-1.5 -3.7,1.1 -1.6,3.2 -2.2,1.8 -1.8,2.4 -0.9,4.5 -1.8,3.7 2.9,0.5 0.6,2.9 1.1,1.4 0.4,2.5 -0.8,2.4 0.2,1.3 1.3,0.6 1.3,2.2 7.2,-0.6 3.2,0.8 3.8,5.5 2.3,-0.7 4,0.3 3.2,-0.7 2,1.1 -1.2,3.4 -1.3,2.1 -0.5,4.6 1,4.2 1.5,1.9 0.2,1.5 -2.9,3.1 2,1.4 1.4,2.2 1.7,6.4 3,3.4 4.4,-0.5 1.1,-1.9 4.2,-1.5 2.3,-1 0.7,-2.7 4.1,-1.8 -0.3,-1.4 -4.8,-0.5 -0.7,-4 0.3,-4.3 -2.4,-1.6 1,-0.6 4.2,0.8 4.4,1.6 1.7,-1.5 4,-1 6.4,-2.4 2.1,-2.4 -0.7,-1.8 -3.7,-4.8 1.6,-1.8 0,-2.9 3.4,-1.1 1.5,-1.2 -1.9,-2.3 0.6,-2.3 4.6,-3.8 z", VN: "m 1571.6,435 -5.9,-1.6 -3,-2.6 0.2,-3.7 -5.2,-1.1 -3,-2.4 -4.1,3.4 -5.3,0.7 -4.3,0 -2.7,1.5 4,5.1 3.4,5.7 6.8,0.1 3,5.5 -3.3,1.7 -1.3,2.3 7.3,3.8 5.7,7.5 4.3,5.6 4.8,4.4 2,4.5 -0.2,6.4 1.8,4.2 0.1,7.7 -8.9,4.9 2.8,3.8 -5.8,0.5 -4.7,2.5 4.5,3.7 -1.3,4.3 2.3,4 6.6,-5.9 4.1,-5.3 6.1,-4.1 4.3,-4.2 -0.4,-11.2 -4,-11.7 -4.1,-5.1 -5.6,-4 -6.4,-8.3 -5.3,-6.7 0.5,-4.4 3.7,-6 6.5,-5.5 z", VU: "m 1908.6,676.9 -2.7,-3.6 -0.6,1.7 1.3,2.8 2,-0.9 z m -2,-9.7 -2.3,-2 -0.9,4.9 0.5,1.8 1.2,-0.4 1.3,0.8 0.2,-5.1 z", YE: "m 1271.5,466.2 -2.1,-4.4 -5.2,-10.5 -15.7,2.4 -5,2.9 -3.5,6.7 -2.5,1 -1.6,-2.1 -2.1,0.3 -5.4,-0.6 -1,-0.7 -6.4,0.2 -1.5,0.6 -2.4,-1.7 -1.2,3.1 0.7,2.7 -2.3,2.1 0.4,2.7 -0.6,1.3 0.7,2.9 -1.1,0.3 1.7,2.6 1.3,4.7 1,1.9 0,3.4 1.6,3.8 3.9,0.3 1.8,-0.9 2.7,0.2 0.8,-1.7 1.5,-0.4 1.1,-1.7 1.4,-0.4 4.7,-0.3 3.5,-1.2 3.1,-2.7 1.7,0.4 2.4,-0.3 4.7,-4.5 8.8,-3 5.3,-2.7 0,-2.1 0.9,-2.9 3.9,-1.7 z", ZA: "m 1148.2,713.7 -2.9,-0.6 -1.9,0.8 -2.6,-1.1 -2.2,-0.1 -8,4.7 -5.2,4.7 -2,4.3 -1.7,2.4 -3,0.5 -1.2,3 -0.6,2 -3.6,1.5 -4.4,-0.3 -2.5,-1.8 -2.3,-0.8 -2.7,1.5 -1.5,3.1 -2.7,1.9 -2.8,2.8 -4,0.7 -1.1,-2.3 0.7,-3.8 -3,-6.1 -1.4,-1 -1.1,23.6 -5,3.2 -2.9,0.5 -3.3,-1.2 -2.4,-0.5 -0.8,-2.7 -2.1,-1.8 -2.7,3.2 3.5,8.2 0,0.1 2.5,5.3 3.2,6 -0.2,4.8 -1.7,1.2 1.4,4.2 -0.2,3.8 0.6,1.7 0.3,-0.9 2.1,2.9 1.8,0.1 2.1,2.3 2.4,-0.2 3.5,-2.4 4.6,-1 5.6,-2.5 2.2,0.3 3.3,-0.8 5.7,1.2 2.7,-1.2 3.2,1 0.8,-1.8 2.7,-0.3 5.8,-2.5 4.3,-2.9 4.1,-3.8 6.7,-6.5 3.4,-4.6 1.8,-3.2 2.5,-3.3 1.2,-0.9 3.9,-3.2 1.6,-2.9 1.1,-5.2 1.7,-4.7 -4.1,0 -1.3,2.8 -3.3,0.7 -3,-3.5 0.1,-2.2 1.6,-2.4 0.7,-1.8 1.6,-0.5 2.7,1.2 -0.4,-2.3 1.4,-7.1 -1.1,-4.5 -2.2,-9 z m -20.1,52.8 -2,0.6 -3.7,-4.9 3.2,-4 3.1,-2.5 2.6,-1.3 2.3,2 1.7,1.9 -1.9,3.1 -1.1,2.1 -3.1,1 -1.1,2 z", ZM: "m 1149.2,626.7 -1.9,-0.5 0.4,-1.3 -1,-0.3 -7.5,1.1 -1.6,0.7 -1.6,4.1 1.2,2.8 -1.2,7.5 -0.8,6.4 1.4,1.1 3.9,2.5 1.5,-1.2 0.3,6.9 -4.3,0 -2.1,-3.5 -2,-2.8 -4.3,-0.8 -1.2,-3.4 -3.4,2 -4.5,-0.9 -1.8,-2.8 -3.5,-0.6 -2.6,0.1 -0.3,-2 -1.9,-0.1 0.5,2 -0.7,3 0.9,3 -0.9,2.4 0.5,2.2 -11.6,-0.1 -0.8,20.3 3.6,5.2 3.5,4 4.6,-1.5 3.6,0.4 2.1,1.4 0,0.5 1,0.5 6.2,0.7 1.7,0.7 1.9,-0.1 3.2,-4.1 5.1,-5.3 2,-0.5 0.7,-2.2 3.3,-2.5 4.2,-0.9 -0.3,-4.5 17.1,-5.2 -2.9,-1.7 1.9,-5.9 1.8,-2.2 -0.9,-5.3 1.2,-5.1 1,-1.8 -1.2,-5.4 -2.6,-2.8 -3.2,-1.9 -3.5,-1.1 -2.2,-1.1 -0.3,-0.2 0,0 0.5,1.1 -1,0.4 -1.2,-1.4 z", ZW: "m 1148.2,713.7 6.2,-7.2 1.6,-4.6 0.9,-0.6 0.8,-3.7 -0.8,-1.9 0.5,-4.7 1.3,-4.4 0.3,-8.1 -2.8,-2 -2.6,-0.5 -1.1,-1.6 -2.6,-1.3 -4.6,0.1 -0.3,-2.4 -4.2,0.9 -3.3,2.5 -0.7,2.2 -2,0.5 -5.1,5.3 -3.2,4.1 -1.9,0.1 -1.7,-0.7 -6.2,-0.7 1.9,5.1 1.1,1.1 1.6,3.7 6,7 2.3,0.7 -0.1,2.2 1.5,4.1 4.2,0.9 3.4,2.9 2.2,0.1 2.6,1.1 1.9,-0.8 2.9,0.6 z", SO: "m 1223.4,505.7 -2.6,-2.7 -1.2,-2.6 -1.8,-1.2 -2,3.4 -1.1,2.3 2.2,3.5 2.1,3.1 2.2,2.2 18.5,7.6 4.8,-0.1 -15.4,19.1 -7.4,0.3 -4.9,4.5 -3.6,0.1 -1.5,2 -4.8,7.2 0.2,23.2 3.3,5.3 1.3,-1.5 1.3,-3.4 6.1,-7.7 5.3,-4.8 8.3,-6.4 5.6,-5.1 6.4,-8.7 4.7,-7.1 4.6,-9.3 3.2,-8.2 2.5,-7.1 1.3,-6.8 1.1,-2.3 -0.2,-3.4 0.4,-3.7 -0.2,-1.7 -2.1,0 -2.6,2.2 -2.9,0.6 -2.5,0.9 -1.8,0.2 0,0 -3.2,0.2 -1.9,1.1 -2.8,0.5 -4.8,1.9 -6.1,0.8 -5.2,1.6 -2.8,0 z", GF: "m 681.4,556.2 1.8,-4.7 3.5,-5.8 -0.9,-2.6 -5.8,-5.4 -4.1,-1.5 -1.9,-0.7 -3.1,5.5 0.4,4.4 2.1,3.7 -1,2.7 -0.6,2.9 -1.4,2.8 2.4,1.3 1.8,-1.8 1.2,0.3 0.8,1.8 2.7,-0.5 2.1,-2.4 z", FR: "m 1025.7,303.8 -1.1,-5.2 -3.2,2.3 -1,2.3 1.4,4.2 2.4,1.2 1.5,-4.8 z m -31.5,-50.9 -2.4,-2.4 -2.2,-0.1 -0.7,-2.2 -4.3,1.2 -1.4,5.1 -11.3,4.8 -4.6,-2.6 1.4,7 -8.2,-1.6 -6.4,1.3 0.4,4.6 7.5,2.4 3.6,3.1 5.1,6.5 -1,12.3 -2.7,3.7 2,2.4 9.4,2.8 1.9,-1.3 5.7,2.8 6,-0.8 0.5,-3.7 7.4,-2 10,1.6 4.5,-3.4 0.5,-2.7 -2.7,-0.8 -1.5,-4.8 1.7,-1.8 -1.6,-2.4 0.2,-1.7 -1.8,-2.7 -2.4,0.9 0,-2.8 3.5,-3.5 -0.2,-1.6 2.3,0.6 1.3,-1 0.5,-4.5 2.3,-4.2 -7.1,-1.2 -2.4,-1.6 -1.4,0.1 -1.1,-0.5 -4.4,-2.8 -2.5,0.4 -3.4,-2.9 z", ES: "m 985,325.7 0,-0.2 -0.5,0 -0.3,-0.4 -0.1,0.2 -0.1,0.2 0,0.2 0.5,0 0.4,0.1 0.1,-0.1 z m -0.8,-1.6 0.3,0 0.6,-0.7 0,-0.3 -0.3,-0.2 -1.1,0.2 -0.2,0.3 0,0.3 -0.3,0.1 -0.1,0.4 0.1,0.2 0.8,0.1 0.2,-0.4 z M 967,296 l -8.2,-0.2 -4.2,0.3 -5.4,-1 -6.8,0 -6.2,-1.1 -7.4,4.5 2,2.6 -0.4,4.4 1.9,-1.6 2.1,-0.9 1.2,3.1 3,0 0.9,-0.8 3,0.2 1.3,3.1 -2.4,1.7 -0.2,4.9 -0.9,0.9 -0.3,3 -2.2,0.5 2,3.8 -1.6,4.3 1.8,1.9 -0.8,1.7 -2,2.5 0.4,2.1 4.8,1 1.4,3.7 2,2.2 2.5,0.6 2.1,-2.5 3.3,-2.3 5,0.1 6.7,0 3.8,-5 3.9,-1.3 1.2,-4.2 3,-2.9 -2,-3.7 2,-5.1 3.1,-3.5 0.5,-2.1 6.6,-1.3 4.8,-4.2 -0.3,-3.5 -6,0.8 -5.7,-2.8 -1.9,1.3 -9.4,-2.8 -2,-2.4 z m 26,22.6 0.1,-0.3 0.1,-0.2 0.1,-0.1 -0.2,-0.2 0,-0.1 0.2,-0.2 -0.2,-0.1 -1.3,0.4 -0.7,0.4 -2.1,1.5 0,0.3 0.1,0.2 0.4,0 0.2,0.4 0.4,-0.4 0.3,-0.1 0.3,0.1 0.3,0.2 0.1,0.6 0.1,0.2 0.6,0.1 0.9,0.4 0.4,-0.2 0.5,-0.3 0.2,-0.6 0.3,-0.5 0.3,-0.5 0.3,-0.4 -0.1,-0.4 -0.3,-0.1 -0.3,-0.1 -0.5,0.2 -0.5,-0.2 z m 6,-0.3 0.1,-0.4 0,-0.1 -0.5,-0.7 -0.9,-0.3 -1,0.1 -0.1,0.1 0,0.4 0.1,0.1 0.6,0.1 1.6,0.7 0.1,0 z", AW: "m 586.6,492.9 -0.1,-0.1 -0.3,-0.6 -0.3,-0.3 -0.1,0.1 -0.1,0.3 0.3,0.3 0.3,0.4 0.3,0.1 0,-0.2 z", AI: "m 627.9,456.2 0.1,-0.2 -0.2,-0.1 -0.8,0.5 0,0.1 0.9,-0.3 z", AD: "m 985.4,301.7 0.1,-0.2 0.1,-0.2 0,-0.1 -0.2,-0.1 -0.7,-0.2 -0.3,-0.1 -0.2,0.1 -0.2,0.2 -0.1,0.3 0.1,0.1 0,0.2 0,0.2 0.1,0.2 0.2,0 0.2,0 0.3,-0.1 0.5,-0.3 0.1,0 z", AG: "m 634.3,463.8 0.2,-0.1 0,-0.1 0,-0.2 -0.1,-0.1 -0.1,-0.2 -0.4,-0.2 -0.5,0.5 0,0.2 0.1,0.3 0.6,0.1 0.2,-0.2 z m 0.2,-3.5 0,-0.5 -0.1,-0.2 -0.3,0 -0.1,-0.1 -0.1,0 -0.1,0.1 0.1,0.6 0.5,0.3 0.1,-0.2 z", BS: "m 574.4,437.3 0.2,-0.6 -0.3,-0.1 -0.5,0.7 -0.6,0.3 -0.3,0 -0.7,-0.3 -0.5,0 -0.4,0.5 -0.6,0.1 0.1,0.1 0,0.2 -0.2,0.3 0,0.2 0.1,0.3 1.5,-0.1 1.3,-0.2 0.7,-0.9 0.2,-0.5 z m 0.8,-2 -0.4,-0.3 -0.4,0.3 0.1,0.3 0.7,-0.3 z m 0,-5.8 -0.4,-0.2 -0.3,0.5 0.3,0.1 0.7,-0.1 0.5,0.1 0.5,0.4 0.3,-0.2 -0.1,-0.1 -0.4,-0.3 -0.6,-0.1 -0.2,0 -0.3,-0.1 z m -6.6,1.3 0.7,-0.6 0.7,-0.3 0.9,-1.1 -0.1,-0.9 0.2,-0.4 -0.6,0.1 -0.1,0.3 -0.1,0.3 0.3,0.4 0,0.2 -0.2,0.4 -0.3,0.1 -0.1,0.2 -0.3,0.1 -0.4,0.5 -0.8,0.6 -0.2,0.3 0.4,-0.2 z m 1.2,-3.2 -0.6,-0.2 -0.2,-0.4 -0.4,-0.1 -0.1,0.2 0,0.2 0.1,0.4 0.2,-0.1 0.8,0.4 0.4,-0.3 -0.2,-0.1 z m -4.1,-1.1 0,-0.7 -0.4,-0.5 -0.6,-0.4 -0.1,-1.2 -0.3,-0.7 -0.2,-0.6 -0.4,-0.8 0,0.5 0.1,0.1 0.1,0.6 0.4,0.9 0.1,0.4 -0.1,0.4 -0.4,0.1 -0.1,0.2 0.5,0.3 0.8,0.3 0.5,1.3 0.1,-0.2 z m -4.1,-3.5 -0.5,-0.3 -0.2,-0.3 -0.7,-0.7 -0.3,-0.1 -0.2,0.4 0.4,0.1 0.9,0.7 0.4,0.2 0.2,0 z m 7.3,-4 -0.1,-0.3 -0.1,0 -0.3,0.1 -0.3,0.9 0.3,0 0.5,-0.7 z m -17.6,-1.1 -0.2,-0.3 -0.3,0.2 -0.5,0 -0.2,0.1 -0.4,0 -0.3,0.2 0.4,0.8 0.3,0.3 0.1,1 0.2,0.1 -0.1,0.7 1.1,0.1 0.4,-0.8 0,-0.3 0,-0.1 0,-0.2 0,-0.2 0,-0.9 -0.3,-0.5 -0.4,0.6 -0.4,-0.3 0.6,-0.4 0,-0.1 z m 12.9,0.3 -1,-1.4 0,-0.2 -0.5,-1.5 -0.3,-0.1 -0.1,0.1 -0.1,0.2 0.4,0.4 0,0.4 0.3,0.2 0.4,1.1 0.4,0.4 -0.1,0.3 -0.4,0.3 -0.1,0.2 0.1,0 0.6,-0.1 0.4,0 0,-0.3 z m -10.5,-5.2 0.5,-0.2 0,0 -0.3,-0.2 -0.7,0 -0.4,0.1 -0.2,0.2 0.1,0.1 0.4,0.1 0.6,-0.1 z m -2.4,2 -0.5,-0.6 -0.3,-0.9 -0.2,-0.4 0.1,-0.5 -0.3,-0.4 -0.6,-0.4 -0.3,0.1 0.1,1.1 -0.2,0.6 -0.8,1.1 0.1,0.4 0,0 0.1,0.2 -0.5,0.4 0,-0.3 -0.6,0.1 0.3,0.5 0.6,0.4 0.3,0.1 0.3,-0.2 0,0.5 0.3,0.4 0.1,0.4 0.3,-0.3 0.6,-0.2 0.2,-0.2 0.7,-0.4 0,-0.2 0.1,-0.6 0.1,-0.7 z m 6.7,-5 -0.3,-0.5 -0.1,0.1 -0.1,0.4 -0.3,0.4 0.5,-0.1 0.4,0.1 0.6,0.5 0.7,0.2 0.3,0.6 0.6,0.6 0,0.6 -0.4,0.6 -0.1,0.7 -0.6,0.1 0.1,0.1 0.3,0.3 0.1,0.4 0.2,0.2 0,-0.7 0.3,-0.8 0.4,-1.3 -0.1,-0.3 -0.3,-0.3 -0.7,-0.9 -0.7,-0.3 -0.8,-0.7 z m -8.8,-7.9 -0.5,-0.4 -0.2,0.4 0,0.1 -0.1,0.3 -0.5,0.4 -0.5,0.1 -0.7,-0.6 -0.2,-0.1 0.8,1.1 0.3,0.1 0.4,0 0.9,-0.3 1.6,-0.5 1.7,-0.2 0.1,-0.2 -0.1,-0.3 -0.8,0.2 -1,-0.1 -0.2,0.2 -0.4,0 -0.6,-0.2 z m 6.1,5.2 0.2,-0.3 0.4,-1.8 0.8,-0.6 0.1,-1.2 -0.5,-0.5 -0.4,-0.2 -0.1,-0.2 0.1,-0.2 -0.2,-0.1 -0.3,-0.2 -0.4,-0.6 -0.4,-0.4 -0.7,-0.1 -0.6,-0.1 -0.4,-0.1 -0.5,0.3 0.8,0 1.5,0.3 0.7,1.5 0.5,0.4 0.1,0.4 -0.2,0.4 0,0.4 -0.3,0.5 -0.1,0.8 -0.3,0.4 -0.7,0.5 0.4,0.2 0.3,0.6 0.2,-0.1 z", BM: "m 630.2,366.8 0.4,-0.6 -0.1,0 -0.5,0.5 -0.6,0.2 0.1,0.1 0.1,0 0.6,-0.2 z", BB: "m 644.9,488.9 0.4,-0.4 -0.3,-0.3 -0.6,-0.8 -0.3,0.1 0,1 0.1,0.3 0.5,0.3 0.2,-0.2 z", KM: "m 1221.1,650.5 -0.4,-0.4 -0.4,0 0,0.2 0.1,0.4 1.1,0.2 -0.4,-0.4 z m 3.9,-1.5 -0.1,0 -0.2,0.1 -0.1,0.2 -0.1,0.3 -0.3,0 -0.2,0 -0.4,0 0.8,0.5 0.5,0.5 0.2,0.2 0.1,-0.2 0.1,-0.7 -0.3,-0.9 z m -5.6,-1.1 0.2,-0.3 -0.2,-0.7 -0.4,-0.8 0.1,-1.4 -0.2,-0.2 -0.3,0 -0.1,0.1 -0.1,0.3 -0.3,2 0.4,0.6 0.3,0.1 0.5,0.4 0.1,-0.1 z", CV: "m 841.4,477.6 0.1,-0.4 -0.2,-0.6 -0.3,-0.1 -0.6,0.4 -0.1,0.3 0.1,0.3 0.3,0.3 0.3,0.1 0.4,-0.3 z m 6.3,-1.7 0.4,-0.2 0,-0.7 -0.1,-0.3 -0.4,0 -0.2,0.4 0,0.1 0,0.4 0.2,0.3 0.1,0 z m -1.4,0.8 -0.5,-0.9 -0.3,-0.1 -0.6,-0.7 0,-0.3 -0.3,-0.1 0,0.2 0,0.4 -0.2,0.5 0,0.5 0.4,0.8 0.4,0.2 0.7,0.1 0.4,-0.6 z m 3.1,-7.8 0,0.5 -0.3,0.7 0.5,0.3 0.3,0.1 0.6,-0.4 0.2,-0.5 -0.1,-0.3 -0.3,-0.3 -0.3,-0.1 -0.1,0.1 -0.5,-0.1 z m -6.4,-2.5 -1,-0.1 -0.6,-0.2 -0.1,0 0,0.3 0.4,0.8 0.2,-0.5 0.2,-0.1 0.8,0.2 0.4,-0.1 -0.1,-0.1 -0.2,-0.2 z m 6.7,-0.2 -0.1,-0.5 0,-0.7 -0.2,0 -0.3,0.2 0.1,0.7 0.1,0.1 0.2,0.5 0.2,-0.3 z m -11.1,-1 0,-0.2 -0.3,-0.5 -0.3,0.1 -0.4,0.2 -0.1,0.3 0.4,0.2 0.2,0 0.5,-0.1 z m -1.5,-0.9 0.8,-0.6 0.2,-0.3 -0.2,-0.5 -0.5,-0.1 -1.2,0.6 -0.1,0.2 0.1,0.3 0.1,0.5 0.2,0.1 0.6,-0.2 z", KY: "m 527,449.1 -0.1,-0.3 -0.1,0.1 0,0.6 0.5,0 0.2,0 0.3,-0.2 0.6,0 -0.1,-0.2 -0.8,-0.1 -0.1,0.1 -0.2,0.1 -0.2,-0.1 z m 8,-2.3 0,0 -0.1,-0.1 -0.1,0 -0.3,0.1 -0.1,0 -0.1,0 -0.1,0.1 -0.1,0.1 0.2,0 0.4,-0.2 0.2,0 0.1,0 z m 0.8,-0.1 0.5,-0.2 0,0 -0.1,-0.1 -0.1,0 -0.1,0.1 -0.1,0 -0.5,0.3 0.2,0 0.2,-0.1 z", DM: "m 635.8,475.1 0.3,-0.7 -0.1,-1 -0.2,-0.4 -0.8,-0.3 0,0.2 -0.1,0.5 0.3,0.8 0.1,1.1 0.5,-0.2 z", FK: "m 690.3,902.7 -0.1,-0.3 -0.4,-0.2 -0.2,-0.1 0.1,0.2 0.1,0.3 0.1,0.2 0.2,0.1 0.2,-0.2 z m 5.5,-1.3 -0.1,-0.1 -0.2,0 -0.1,0.2 0.2,0.3 0.4,0.1 -0.2,-0.5 z m -12.9,-1.4 -0.1,0.2 -0.4,0.1 0.2,0.3 0.6,0.4 0.4,0 0.1,-0.3 -0.1,-0.6 -0.3,0 -0.4,-0.1 z m 2.8,-2 -0.9,-0.3 -0.4,-0.3 -0.3,0 0.4,0.4 0.1,0.2 0.1,0.2 0.6,0.3 0.6,0.3 0.4,0.3 -0.1,0.1 -0.8,0.3 -0.3,0 -0.2,0.1 0.4,0.2 0.6,-0.1 0.2,-0.1 0.2,0 0.3,0.1 0,0.2 -0.1,0.2 -0.2,0.2 -0.4,0.3 -0.6,0.4 -0.8,0 -0.7,0.7 0.9,0.5 0.7,0.3 0.9,0 0,-0.1 0.2,-0.1 0.3,0 0.1,-0.1 0.2,-0.4 0,-0.6 0.2,0 0.3,0.1 0.7,-0.1 0.3,-0.1 0.6,-0.9 0.4,-0.8 0.2,-0.4 0.3,-0.2 0.1,-0.2 0.1,-0.3 0.3,-0.2 0,-0.3 -0.4,-0.2 -0.3,-0.2 -0.3,0.3 -0.2,-0.1 -0.9,0.3 -0.4,0 -0.3,-0.2 -0.4,-0.1 -0.4,0.1 -0.5,0.5 -0.8,-0.2 z m 0.7,-0.4 0.1,-0.3 -0.1,-0.2 -0.5,-0.2 -0.5,0 0.2,0.5 0.2,0.2 0.6,0 z m 5.9,-0.7 -0.4,0 0.4,0.5 -0.8,0.8 0.2,0.6 0.3,0.4 0.1,0.2 -0.1,0.1 -0.4,0.1 -0.3,0.1 -0.2,0.3 -0.9,0.9 0.2,0.2 -0.3,0.7 0.2,0.3 0.8,0.7 0.8,0.4 0,-0.7 0.4,-0.1 0.4,0.2 0.4,-0.2 -0.9,-1 0.3,0 2.5,0.5 -0.1,-0.4 -0.1,-0.2 -0.3,-0.4 1.5,-0.4 0.5,-0.3 0.2,-0.3 0.6,-0.1 0.8,-0.3 -0.1,-0.1 0.1,-0.3 -0.4,-0.2 -0.5,-0.1 0.1,-0.3 0.5,-0.1 -0.8,-0.7 -0.3,-0.1 -1,0.1 -0.3,0.1 0,0.2 0.1,0.3 0.3,0.3 0.1,0.2 -0.2,-0.1 -1.1,-0.4 -0.2,-0.1 -0.2,-0.4 0.2,-0.1 0.3,0.1 0.1,-0.3 -0.4,-0.3 -0.4,-0.1 -0.9,0.1 -0.8,-0.3 z", FO: "m 947,186.9 0,-0.3 -0.1,-0.3 0,-0.2 -0.1,0 -0.5,-0.1 -0.1,-0.2 -0.1,0 0,0.2 0.1,0.4 0.5,0.4 0.3,0.2 0.1,0 -0.1,-0.1 z m 0.5,-2.1 0,-0.1 -0.2,-0.2 -0.5,-0.2 -0.2,-0.1 -0.2,0.1 0,0.2 0.1,0.1 0.4,0.1 0.4,0.3 0.1,0 0.1,-0.2 z m -2.4,-1.9 -0.2,-0.1 -0.5,0.1 -0.3,0 0.1,0.3 0.6,0.2 0.3,0 0.3,0 0.2,-0.1 -0.1,-0.2 -0.4,-0.2 z m 2.5,-0.5 -0.8,-0.2 -0.6,-0.3 -1,0.1 0.7,1.1 0.8,0.7 0.4,0.2 0,-0.1 0,-0.2 -0.4,-0.5 -0.1,-0.1 0,-0.1 0.1,-0.1 0.2,0 0.3,0.2 0.2,0 0.2,-0.7 z m 1,-0.2 -0.3,-0.2 -0.4,-0.4 0,0.5 0,0.3 0,0.1 0.1,0 0.3,0.1 0.3,-0.4 z", GD: "m 632.1,495.7 0.5,-0.2 0.2,-1.1 -0.3,-0.1 -0.3,0.3 -0.3,0.5 0,0.4 -0.2,0.3 0.4,-0.1 z", HK: "m 1604.9,430.9 0,-0.2 0,-0.2 -0.4,-0.2 -0.3,0 0.1,0.2 0.4,0.5 0.2,-0.1 z m -1.3,0 -0.1,-0.5 0.2,-0.3 -0.9,0.3 -0.1,0.3 0,0.1 0.2,0.1 0.7,0 z m 1.6,-1.2 -0.1,-0.3 -0.2,-0.1 -0.1,-0.3 -0.1,-0.2 0,0 -0.3,-0.1 -0.2,-0.1 -0.4,0 -0.1,0.1 -0.2,0 -0.2,0.2 0,0 0,0.2 -0.5,0.4 0,0.2 0.3,0.2 0.5,-0.1 0.6,0.2 0.8,0.3 0,-0.2 0,-0.3 0.2,-0.1 z", KN: "m 629.9,463.2 0,-0.3 -0.2,-0.2 -0.3,0 0,0.5 0.2,0.2 0.3,-0.2 z m -0.5,-0.7 -0.1,-0.2 -0.1,-0.1 -0.2,-0.4 -0.4,-0.4 -0.2,0.1 -0.1,0.2 0,0.1 0,0 0.3,0.3 0.4,0.1 0.2,0.4 0.2,-0.1 z", LC: "m 637.4,484.2 0.1,-1.2 -0.1,-0.5 -0.2,0.1 -0.3,0.4 -0.4,0.6 -0.1,0.3 0,0.6 0.6,0.4 0.4,-0.7 z", LI: "m 1024.4,273.6 0,-0.2 0.1,-0.2 -0.1,-0.1 -0.1,-0.2 -0.1,-0.1 0,-0.2 -0.1,-0.1 0,-0.2 -0.1,-0.1 -0.2,0.6 0,0.5 0.1,0.2 0.1,0 0.4,0.1 z", MF: "m 627.7,457.2 0.1,-0.2 -0.1,-0.1 -0.2,0 -0.3,0.2 -0.1,0.1 0.6,0 z", MV: "m 1389.1,551.6 0.1,-0.1 0,-0.2 -0.1,-0.1 -0.1,0 -0.1,0.2 0,0.1 0,0.1 0.2,0 z m 0.3,-5.9 0.1,-0.2 0,-0.1 0,-0.1 0,-0.1 0,-0.1 -0.1,0.1 -0.1,0.2 0,0.1 -0.1,0.1 0,0.1 0.1,0 0.1,0 z", MT: "m 1053.6,344 -0.2,-0.2 -0.5,-0.5 -0.5,-0.1 0.1,0.6 0.4,0.4 0.5,0 0.2,-0.2 z m -1.4,-1.2 0,0 0,-0.2 -0.3,-0.1 -0.4,0.1 0.1,0.1 0.3,0.2 0.3,-0.1 z", MS: "m 631.8,465.7 -0.1,-0.5 -0.1,0 -0.2,0.4 0,0.3 0.3,0.1 0.1,-0.3 z", MU: "m 1294.7,702.5 0.3,-0.3 0.2,-0.4 0.3,-0.3 0.1,-0.7 -0.2,-0.8 -0.4,-0.7 -0.5,0.1 -0.3,0.4 -0.2,0.5 -0.5,0.3 -0.1,0.3 -0.2,0.7 -0.1,0.4 -0.2,0.1 0,0.2 0.3,0.3 0.8,0.1 0.7,-0.2 z", NC: "m 1897.3,716.1 0,-0.3 -0.4,-0.2 -0.2,0.5 0,0.1 0.2,0.1 0.2,0 0.2,-0.2 z m 4.6,-7.6 -0.1,-0.1 0,-0.3 0.1,-0.2 -0.4,0.2 -0.6,0.2 0.1,0.8 -0.1,0.4 0.3,0.1 0.1,0.3 0.2,0 0.7,-0.2 0.3,-1.1 -0.4,0 -0.2,-0.1 z m -3,-1.7 0.3,-0.5 0.1,-0.2 -0.2,-0.7 -0.3,-0.3 0.3,-1 -0.1,-0.2 -0.4,-0.2 -0.9,0.3 -0.1,0.2 0.5,0.1 0.2,0.2 -0.5,0.7 -0.5,0.1 0.1,0.5 0.2,0.4 0.7,0.2 0.3,0.4 0.3,0 z m -3.9,-2.9 0.3,-0.3 0.3,-0.4 -0.1,-0.1 0,-0.3 0.2,-0.4 0.3,-0.1 -0.2,-0.2 -0.2,-0.1 0,0.3 -0.3,0.7 -0.1,0.3 -0.5,0.6 0.3,0 z m -12.3,-2.9 -0.6,-0.7 -0.1,0.2 -0.1,0.4 0,0.3 0.3,0.2 0.1,0.2 -0.1,0.5 0,0.4 0.6,0.9 0.1,0.7 0.3,0.6 0.5,0.5 0.4,0.5 0.8,1.4 0.2,0.5 0.4,0.3 1,1.2 0.4,0.4 0.4,0.2 0.9,0.7 0.6,0.3 0.3,0.5 0.6,0.3 0.8,0.4 0.1,0.2 0,0.3 0.1,0.3 0.5,0.4 0.6,0.3 0.1,0.2 0.1,0.2 0.3,-0.1 0.3,0.1 0.9,0.7 0.4,-0.1 0.3,0 0.5,-0.2 0.3,-0.4 -0.1,-1.1 -0.5,-0.5 -0.7,-0.4 -0.4,-0.5 -0.4,-0.5 -0.8,-1 -1.1,-1 -0.5,-0.2 -0.3,-0.4 -0.3,-0.1 -0.2,-0.3 -0.5,-0.3 -0.3,-0.6 -0.6,-0.6 -0.1,-0.3 0.1,-0.3 -0.1,-0.3 -0.4,-0.3 -0.2,-0.5 -0.2,-0.3 -0.4,-0.2 -0.7,-0.4 -1.6,-1.9 -0.7,-0.6 -0.7,0.2 -0.6,-0.4 z m -22,-6 0.2,-0.4 0.1,-0.8 -0.2,0.4 -0.2,1 0.1,-0.2 z", NR: "m 1915,575.5 0,-0.2 -0.1,0 -0.1,0 -0.1,0.2 0.1,0.1 0.1,0.1 0.1,-0.2 z", PN: "m 274.2,727.4 0,-0.2 -0.1,-0.2 -0.2,-0.1 -0.1,0.1 0.1,0.2 0.2,0.2 0.1,0.1 0,-0.1 z", PR: "m 600.8,457.3 0,-0.1 0,0 0.1,0 0,-0.1 0.1,-0.1 0,0 0,-0.1 -0.1,0 0,0 -0.3,0 -0.1,0 0,0.1 0,0.1 0.2,0.1 0,0 0,0.1 0.1,0 0,0 z m 13.6,-0.3 0.7,-0.2 0,-0.1 -0.4,-0.1 -0.6,0 -0.5,0.2 0.1,0.2 0.2,0 0.5,0 z m -3.7,-2.2 -0.1,-0.2 -0.2,0 -3.5,-0.1 -1.3,-0.2 -0.3,0.1 -0.3,0.1 -0.1,0.4 -0.2,0.2 -0.3,0.2 0.1,0.3 0.1,0.2 0.2,0.4 -0.1,0.5 -0.2,1 0.3,0.2 0.7,-0.1 0.3,0.1 0.3,0.1 0.4,-0.1 0.4,-0.2 0.9,0.1 0.5,-0.1 0.6,0.3 0.4,-0.1 0.2,0.1 0.3,0 0.6,0 0.9,-0.2 0.8,-0.5 0.3,-0.5 0.4,-0.3 0.6,-0.4 0,-0.9 -0.7,-0.1 -0.6,-0.3 -1.1,-0.1 -0.1,0 0.1,0.2 -0.1,0 -0.2,-0.1 z", PF: "m 213.2,704.9 -0.1,-0.3 -0.2,-0.3 -0.1,0.1 0.1,0.1 0.2,0.3 0,0.2 0.1,-0.1 z m 9.3,-14.7 -0.2,-0.2 -0.4,-0.2 -0.2,-0.1 -0.2,-0.1 -0.1,0.1 0.1,0.1 0.1,0 0.3,0.2 0.3,0.1 0.2,0.1 0,0.1 0.1,-0.1 z m -24.5,-1.1 -0.6,-0.3 0.1,0.2 0.4,0.2 0.2,0.1 -0.1,-0.2 z m 20.5,-0.2 -0.4,-0.5 -0.3,0 0.7,0.6 0,-0.1 z m -21.6,-1 -0.4,-0.4 -0.2,-0.3 -0.3,-0.1 0.1,0.1 0.4,0.4 0.3,0.4 0.2,0.1 -0.1,-0.2 z m -0.3,-2.1 -0.1,-0.1 0,0 0,-0.3 0.2,-0.3 0.6,-0.4 0,-0.1 0,0 -0.2,0.1 -0.4,0.2 -0.2,0.2 -0.1,0.2 -0.1,0.3 0.1,0.2 0.1,0.1 0.2,0 -0.1,-0.1 z m -47.4,-1.1 -0.2,-0.6 -0.3,-0.5 -0.8,-0.1 -0.5,0.2 -0.1,0.2 0.1,0.4 0.5,0.7 0.5,0.1 0.8,-0.1 0.4,0.6 0.2,0.1 0.4,0.1 0.1,-0.3 -0.2,-0.5 -0.9,-0.3 z m -2.9,-0.9 0.1,-0.4 -0.2,-0.1 -0.5,0 0,0.2 0.1,0.2 0.1,0.1 0.3,0.2 0.1,-0.2 z m -9.7,-4.3 0.2,0 -0.4,-0.6 -0.3,-0.2 0,0.1 0,0.7 0.3,0.1 0.2,-0.1 z m 43.9,-1.6 -0.2,0 -0.3,0 -0.1,0 0.5,0.1 0.4,0.2 -0.3,-0.3 z m -0.7,0.1 -0.3,-0.1 -0.3,-0.2 -0.3,0 0.7,0.3 0.2,0 z m -43.8,0.1 0.1,-0.2 -0.1,-0.1 -0.4,-0.2 0.1,0.3 0,0.2 0.2,0.1 0.1,-0.1 z m 32.8,-2 -0.3,-0.4 -0.2,-0.3 -0.2,-0.4 -0.4,-0.5 0.1,0.3 0.1,0.2 0.2,0.2 0.2,0.4 0.1,0.2 0.3,0.4 0.1,0 0,-0.1 z m 16.2,-1.5 0.1,-0.5 -0.2,0 0,0.5 0.1,0 z m -14.4,-1.6 -0.6,-0.6 -0.1,0 0.1,0.2 0.5,0.5 0.1,0.2 0,-0.3 z m 30.8,-33.9 0.1,-0.2 0,-0.2 -0.1,-0.1 -0.3,-0.1 0.1,0.7 0.2,-0.1 z m -2.7,-3.7 -0.1,-0.2 -0.2,0 -0.1,0.1 0,0.5 0.4,-0.4 z m 0.1,-1.6 -0.8,0.5 0.2,0.4 0.4,0.1 0.2,-0.2 0.8,-0.1 0.3,-0.4 -0.3,0.1 -0.8,-0.4 z m -6.1,-1.7 0.2,-0.5 -0.2,-0.1 -0.4,0.2 0,0.2 0.3,0.4 0.1,-0.2 z m 2.6,-3.1 0.3,-0.1 0,-0.1 -0.2,-0.2 -0.3,-0.1 -0.1,0.1 -0.1,0.2 0.1,0.3 0.3,-0.1 z m -2.9,-0.1 0.1,-0.3 0,-0.2 -0.1,-0.2 -0.9,-0.2 -0.1,0.1 0,0.4 0.2,0.5 0.3,0 0.5,-0.1 z", SG: "m 1561,563.7 0.1,-0.2 -0.2,-0.2 -0.3,-0.1 -0.5,-0.2 -0.6,0.1 -0.3,0.6 0.9,0.4 0.9,-0.4 z", SB: "m 1909.1,646.4 -0.2,-0.2 -0.1,-0.4 -0.3,0 -0.3,0.1 0.2,0.6 0.2,0 0.5,-0.1 z m -35.6,0.8 -0.1,-0.2 -0.5,-0.4 -1.9,-1.3 -0.4,-0.1 -0.1,0.1 -0.1,0.3 0.1,0.2 0.5,0.1 0,0.1 0.3,0.2 0.7,0.2 0.4,0.3 0.1,0.5 0.3,0.1 0.3,0.1 0.4,-0.2 z m 32,-6.6 0,-0.1 0.2,-0.3 -0.2,-0.1 -0.5,-0.1 -0.7,0.1 -0.3,0.2 -0.2,0.3 -0.2,0 0,0.2 0.1,0.4 0.2,-0.1 0.2,0.1 0.5,-0.5 0.3,0 0.1,0 0.5,-0.1 z m -24.4,-2.3 -0.1,-0.2 -0.2,-0.1 -0.9,-0.7 -0.5,-0.2 -0.5,0 -0.1,0.5 0,0.3 0.6,0 0.4,0.2 0,0.6 0.2,0.2 0,0.5 1.2,0.9 0.7,0.4 0.7,0.1 0.4,0.2 0.5,-0.1 0.5,0.2 0.4,-0.1 -0.4,-0.3 0,-0.4 -0.5,-1.3 -0.3,-0.3 -0.5,0.1 -0.5,-0.2 -0.4,0 -0.7,-0.3 z m -0.4,-4.9 -0.6,-1.6 -0.2,-0.1 0.1,0.6 0.1,0.4 -0.1,0.5 -0.1,0.6 0.2,0.2 0.2,-0.2 0.4,0.5 0,-0.2 0,-0.7 z m -9.8,-2.2 -0.3,-0.1 -0.4,0.3 -0.1,0.3 -0.1,0.7 0,0.4 0.3,0.7 0.3,0.5 0.3,0.3 0.2,0.2 0.9,0.1 1.7,0.1 0.9,0.4 0.9,0.2 0.4,-0.1 0.5,-0.2 0.1,-0.1 -0.1,-0.6 -0.2,-0.3 -0.4,-0.2 -0.2,-0.6 -0.5,-0.4 -0.9,-0.7 -1.6,0 -0.6,0.1 -1.1,-1 z m 2.6,-1.8 -0.5,0.2 0,0.3 0.4,0.1 0.4,0.2 0.1,0.3 0,0 0.2,-0.1 0.4,0.2 0.2,-0.3 -0.4,-0.5 -0.4,-0.3 -0.1,0 -0.3,-0.1 z m -5.6,0.8 0.3,-0.2 0,-0.4 -0.3,0 -0.1,-0.2 -0.2,0 -0.3,0.2 -0.2,0.3 0.1,0.2 0.4,0 0.2,0.1 0.1,0 z m -8.4,-2.3 -0.1,-0.2 -0.3,-0.2 -0.2,0 -0.5,0.1 0.1,0.1 0.6,0.3 0.3,0.1 0.1,-0.2 z m 3.1,0.4 0.3,-0.2 -0.1,-0.2 -0.1,-0.5 -0.4,0.7 0.1,0.2 0.2,0 z m -0.5,-0.9 0,-0.2 0,-0.2 -0.2,-0.1 0.4,-0.3 -0.1,-0.1 -0.6,-0.2 -0.2,0.2 -0.2,0.1 -0.1,0.1 -0.1,0.1 -0.1,0.5 0.2,0.4 0.4,0.2 0.6,-0.5 z m -4,0.2 -0.3,-0.4 0.1,-0.5 0.2,-0.1 0.2,-0.5 -0.1,-0.4 -0.2,0.1 -0.7,0.6 -0.1,0.3 0.6,0.8 0.3,0.2 0,-0.1 z m 13,-1.3 -0.2,-0.4 0,-0.2 -0.3,-0.2 -0.2,0.1 -0.1,0.3 0.1,0.2 0.4,0.3 0.3,-0.1 z m 6,-1.2 -0.2,0 -0.1,0.1 -0.2,0 -0.3,0 -0.1,0.2 0.6,1.1 -0.3,0.5 0.4,2.2 0.4,1.2 0.8,0.8 0,0.2 0.8,0.5 0.6,1.3 0.2,0.1 0.1,-0.2 0,-0.6 -0.5,-1.1 0.1,-0.8 -0.2,-0.3 0,-0.3 -0.2,-0.8 -0.6,-0.7 -0.3,-0.1 -0.2,-0.3 0.2,-0.6 0.2,-0.2 0.1,-0.3 -1.3,-1.9 z m -16.6,-0.5 -0.6,-0.2 -0.2,-0.3 0,-1 -0.6,-0.3 -0.3,0.2 -0.6,0.7 -0.2,0.4 -0.5,0.3 -0.1,0.3 0,0.4 0.4,0.1 0.3,-0.4 0.9,-0.1 0.3,0.1 0,0.4 0.1,0.7 0.3,0.3 0.5,0.2 0.4,0.6 0.1,-0.3 0.2,0 0.2,-0.4 -0.3,-1.2 -0.3,-0.5 z m -6.5,-0.4 0.1,-0.5 -0.1,-0.9 -0.2,0.1 0,0.2 -0.1,0.4 0.2,0.8 0.1,-0.1 z m 3.2,-0.4 0.2,-0.2 0,-0.4 0,-0.5 -0.2,-0.4 -0.2,-0.2 -0.5,0.1 -0.4,0.5 0,0.5 0.4,0.6 0.6,0 0.1,0 z m -2.6,-1.2 0.2,-0.3 0.5,-0.7 0.1,-0.3 -0.5,-0.2 -0.4,-0.5 -0.4,-0.2 -0.3,0.4 0,0.4 0.5,0.6 -0.1,0.4 0.2,0.1 0.1,0.4 0.1,-0.1 z m 17.5,3.9 -0.1,-0.5 -0.3,-0.4 0.4,-0.5 -2.2,-1.9 -0.3,-0.2 -0.4,-0.1 -0.5,-0.4 -0.5,-0.1 -0.5,-0.4 -0.2,-0.3 -0.6,-0.4 -0.6,-0.8 -1.5,-0.3 0.1,0.2 0.4,0.4 0.1,0.7 0.5,0.4 0.5,0.6 0.2,0.1 0.2,0.2 0.4,0.5 0.8,0.4 0.8,0.6 0.3,0.1 0.3,0.3 1.5,0.7 0.5,0.7 0.7,0.5 0,-0.1 z m -21.8,-9.2 0.2,-0.3 -0.7,-0.5 -0.2,0.3 -0.2,0.5 0.4,0.2 0.5,-0.2 z m 9.1,1.5 -0.1,-0.1 -0.3,0 -0.4,-0.2 -0.7,-0.8 -0.2,-0.3 -0.2,-1 -0.4,-0.4 -1.4,-0.8 -0.8,-0.8 -0.7,-0.2 -0.2,0.2 0,0.5 0.2,0.3 1,0.9 1.1,1.7 1,1 0.8,0.1 0.4,0 0,0.1 0.1,0.2 0.5,0.2 0.5,-0.4 -0.2,-0.2 z", ST: "m 1014.1,571.4 0.5,-0.8 0,-0.5 -0.3,-0.5 -0.4,0 -0.5,0.4 -0.3,0.4 0,0.3 0.1,0.7 0.1,0.3 0.3,0.2 0.5,-0.5 z m 4.3,-9.2 0.2,-0.4 0,-0.2 -0.1,-0.1 -0.1,-0.1 -0.2,0.1 -0.3,0.5 0.1,0.2 0.2,0.2 0.2,-0.2 z", SX: "m 627.1,457.2 0,0 0.2,0.2 0.3,0.1 0.1,-0.1 0,-0.2 -0.6,0 z", SC: "m 1288.5,602 -0.5,-0.8 -0.4,0.3 0.2,0.3 0.3,0.2 0.1,0.4 0.3,0.2 0,-0.6 z", TC: "m 578.7,433.1 -0.1,0.4 0,0.2 0.2,0.1 0.6,-0.1 0.1,-0.1 0.2,-0.1 0,-0.1 -0.4,0.1 -0.6,-0.4 z m 3.6,0.6 0.2,-0.2 -0.2,-0.2 -0.7,-0.2 -0.2,0.1 0,0.3 0.6,0 0.3,0.3 0,-0.1 z m -1.1,-0.5 -0.1,-0.1 -0.1,-0.6 -0.5,0 0,0.2 0.1,0.2 0.1,0 0.1,0.2 0.3,0.2 0.1,-0.1 z", TO: "m 13.3,707.7 0,0 -0.2,0.3 0,0.2 0.4,0.4 -0.2,-0.9 z m -1.6,-0.9 -0.2,0 0.2,-0.1 -0.4,-0.2 -0.4,0 -0.2,-0.1 0,-0.2 -0.2,0.3 0.2,0.3 0.9,0.4 0.3,0.2 0.2,-0.6 0,-0.2 -0.3,0.1 0,0.1 -0.1,0 z m 2.5,-16 0.1,-0.2 0,-0.2 -0.3,-0.1 -0.1,0 -0.3,0.5 0.1,0.1 0.3,0.2 0.1,0 0.1,-0.3 z", TT: "m 635.4,507.7 0.1,-0.2 0,-0.6 0.2,-0.4 -0.2,-0.4 -0.1,-0.6 0.1,-0.5 0,-0.7 0.2,-0.3 0.5,-0.8 -0.9,0 -0.6,0.2 -1.1,0.1 -0.5,0.2 -0.7,0.1 -0.4,0.2 0.1,0.1 0.5,0.2 0.2,0.2 0.1,0.2 0.1,0.4 -0.3,1.7 -0.1,0.1 -0.6,0.1 -0.2,0.3 -1.4,0.8 0.8,-0.1 0.9,0.1 2.4,-0.1 0.9,-0.3 z m 1.8,-6.7 1.2,-0.5 0.1,-0.4 -0.2,0 -0.8,0.3 -0.6,0.5 0,0.2 0.3,-0.1 z", VC: "m 634.5,491.4 0,0 0,-0.1 0.1,0 0,-0.1 0,0 0,-0.1 -0.1,0 0,0.1 0,0 0,0.1 -0.1,0 0,0.1 0,0 0,0 0.1,0 z m 0.7,-1.9 0.1,-0.2 0.1,-0.1 0,0 0,0 -0.1,-0.1 0,0 0,0.1 -0.2,0.1 0,0 0,0.1 0,0 0,0.1 -0.1,0 -0.1,0 0,0 0.1,0 0,0 0.1,0.1 0,0 0,0 0,0 0.1,-0.1 z m 0.3,-1.1 0.3,-0.2 0.1,-0.6 -0.1,-0.4 -0.2,0 -0.3,0.1 -0.2,0.3 -0.1,0.5 0.4,0.4 0.1,-0.1 z", VG: "m 619.2,455.1 0.3,-0.2 -0.2,-0.1 -0.4,0 -0.3,0.2 0.1,0.1 0.5,0 z m 1.1,-0.4 0.4,-0.4 -0.5,0.1 -0.2,0.2 0.1,0.1 0.1,0 0.1,0 z m 0.8,-1.8 -0.2,0 -0.5,0 0,0 0.1,0.1 0.3,0 0.3,0.1 0,0 0,-0.2 z", VI: "m 617.9,458.9 -0.7,0.2 -0.1,0.4 1.1,0 0.7,-0.3 -0.6,0 -0.4,-0.3 z m 0.9,-3.5 -0.5,-0.1 -0.2,0.2 0,0 0.3,0.1 0.4,-0.2 z m -1.1,0.1 -0.2,-0.2 -0.3,-0.1 -0.4,0.1 0.5,0.3 0.4,-0.1 z", CY: "m 1149.9,348.4 -0.3,-0.1 -0.5,0.2 -0.4,0.4 -0.4,0.3 -0.5,-0.3 0.2,0.9 0.6,1.1 0.2,0.3 0.3,0.2 1.1,0.3 0.3,0 0.6,0 0.2,0.1 0.2,0.4 0.4,0 0,-0.1 0,-0.3 0.2,-0.2 0.3,-0.2 0.3,0 0.6,-0.1 0.6,-0.2 0.5,-0.4 0.9,-1 0.3,0 0.3,0 0.6,0 0.6,-0.1 -0.2,-0.4 -0.1,-0.1 -0.4,-0.5 -0.2,-0.4 0.1,-0.6 2.5,-1.9 0.5,-0.5 -0.8,0.2 -0.6,0.4 -0.4,0.2 -0.7,0.4 -2.3,0.8 -0.8,0.1 -0.8,0 -1,-0.1 -0.9,-0.2 0,0.7 -0.2,0.6 -0.6,0.2 -0.3,-0.1 z", RE: "m 1284,707.9 0.2,-0.4 0.1,-0.8 -0.4,-0.8 -0.4,-0.7 -0.4,-0.2 -0.8,-0.1 -0.7,0.3 -0.4,0.6 -0.2,0.3 0.4,1.1 0.2,0.3 1.1,0.6 0.5,0 0.8,-0.2 z", YT: "m 1228.7,654.7 0,-0.3 0.2,-0.5 0,-0.1 0.1,-0.5 -0.3,-0.3 -0.2,0 -0.2,-0.3 -0.3,0.3 0.3,0.5 -0.1,0.3 -0.1,0.4 0.1,0.4 0.2,0.2 0.3,-0.1 z", MQ: "m 638,479.9 -0.2,-0.7 -0.1,-0.2 -0.2,-0.3 0.1,-0.3 0,-0.1 -0.2,0 -0.3,-0.5 -0.6,-0.3 -0.3,0 -0.2,0.2 0,0.3 0.3,0.9 0.2,0.2 0.5,0.2 -0.4,0.4 0,0.1 0.1,0.3 0.9,0 0.2,0.3 0.1,-0.1 0.1,-0.4 z", GP: "m 636.4,471.1 0.2,-0.2 0,-0.3 -0.2,-0.3 -0.2,0.1 -0.2,0.3 0,0.3 0.1,0.1 0.3,0 z m -1.9,-0.8 0.2,-0.2 0,-1.2 0.1,-0.3 -0.2,-0.1 -0.2,-0.2 -0.6,-0.2 -0.1,0.1 -0.2,0.3 0.1,1.5 0.2,0.5 0.2,0.1 0.5,-0.3 z m 1.6,-1.4 0.8,-0.2 -0.9,-0.6 -0.2,-0.4 0,-0.3 -0.4,-0.3 -0.2,0.2 -0.1,0.3 0.1,0.5 -0.3,0.4 0.1,0.4 0.4,0.1 0.7,-0.1 z", CW: "m 595.9,494.9 0,-0.6 -0.9,-0.4 0,0.3 0.1,0.2 0.3,0.1 0.1,0.2 -0.1,0.6 0.2,0.3 0.3,-0.7 z", IC: "m 879.6,395.2 -0.2,-0.2 -0.7,0.5 -0.6,0 0.1,0.2 0.1,0.2 0.7,0.4 0.6,-1.1 z m 13.5,-2.1 0,-0.1 -0.1,0 -0.1,0.1 -1.3,-0.1 -0.2,0.6 -0.5,0.4 0,0.7 0.5,0.7 0.3,0.1 0.5,0.1 0.7,-0.4 0.2,-0.4 0.1,-0.8 -0.1,-0.4 0,-0.5 z m -9.7,0.8 0.5,-0.4 0,-0.2 -0.1,-0.3 -0.5,-0.3 -0.2,0 -0.2,0.2 -0.2,0.4 0.3,0.5 0.2,0.1 0.2,0 z m 4.7,-2.3 1.2,-1 0,-0.3 -1,0.1 -1.1,1 -0.3,0.1 -1,0.1 -0.5,0 -0.4,0.2 0.2,0.3 0.4,1 0.7,0.9 0.6,-0.2 0.3,-0.2 0.4,-0.6 0.5,-1.4 z m 11.6,1.3 1.5,-0.5 0.3,-1 0.3,-1.1 0,-0.7 -0.2,-0.3 -0.1,0 -0.4,0 -0.3,0.2 -0.1,0.6 -0.7,1.3 -0.5,1.2 -0.7,0.6 -0.7,0.2 0.1,0.1 0.7,0.1 0.8,-0.7 z m -19.7,-2 0.5,-0.5 0.1,-0.3 -0.1,-0.5 0.2,-0.2 -0.1,-0.4 -0.3,-0.4 -0.7,0 -0.4,0.6 0.6,1.2 0.1,0.5 0.1,0 z m 22.4,-2.7 0.9,-0.3 0.5,-0.3 0.1,-0.9 0.2,-0.3 -0.2,-0.3 -0.2,0.2 -0.2,0.4 -0.6,0.2 -0.8,0.4 -0.2,0.3 -0.2,0.9 0.4,0.1 0.3,-0.4 z"}, names: {AF: "Afghanistan", AO: "Angola", AL: "Albania", AE: "United Arab Emirates", AR: "Argentina", AM: "Armenia", AU: "Australia", AT: "Austria", AZ: "Azerbaijan", BI: "Burundi", BE: "Belgium", BJ: "Benin", BF: "Burkina Faso", BD: "Bangladesh", BG: "Bulgaria", BA: "Bosnia and Herzegovina", BY: "Belarus", BZ: "Belize", BO: "Bolivia", BR: "Brazil", BN: "Brunei", BT: "Bhutan", BW: "Botswana", CF: "Central African Republic", CA: "Canada", CH: "Switzerland", CL: "Chile", CN: "China", CI: "C\xC3\xB4te d'Ivoire", CM: "Cameroon", CD: "Democratic Republic of the Congo", CG: "Republic of Congo", CO: "Colombia", CR: "Costa Rica", CU: "Cuba", CZ: "Czech Republic", DE: "Germany", DJ: "Djibouti", DK: "Denmark", DO: "Dominican Republic", DZ: "Algeria", EC: "Ecuador", EG: "Egypt", ER: "Eritrea", EE: "Estonia", ET: "Ethiopia", FI: "Finland", FJ: "Fiji", GA: "Gabon", GB: "United Kingdom", GE: "Georgia", GH: "Ghana", GN: "Guinea", GM: "The Gambia", GW: "Guinea-Bissau", GQ: "Equatorial Guinea", GR: "Greece", GL: "Greenland", GT: "Guatemala", GY: "Guyana", HN: "Honduras", HR: "Croatia", HT: "Haiti", HU: "Hungary", ID: "Indonesia", IN: "India", IE: "Ireland", IR: "Iran", IQ: "Iraq", IS: "Iceland", IL: "Israel", IT: "Italy", JM: "Jamaica", JO: "Jordan", JP: "Japan", KZ: "Kazakhstan", KE: "Kenya", KG: "Kyrgyzstan", KH: "Cambodia", KR: "South Korea", XK: "Kosovo", KW: "Kuwait", LA: "Laos", LB: "Lebanon", LR: "Liberia", LY: "Libya", LK: "Sri Lanka", LS: "Lesotho", LT: "Lithuania", LU: "Luxembourg", LV: "Latvia", MA: "Morocco", MD: "Moldova", MG: "Madagascar", MX: "Mexico", MK: "Macedonia", ML: "Mali", MM: "Myanmar", ME: "Montenegro", MN: "Mongolia", MZ: "Mozambique", MR: "Mauritania", MW: "Malawi", MY: "Malaysia", NA: "Namibia", NE: "Niger", NG: "Nigeria", NI: "Nicaragua", NL: "Netherlands", NO: "Norway", NP: "Nepal", NZ: "New Zealand", OM: "Oman", PK: "Pakistan", PA: "Panama", PE: "Peru", PH: "Philippines", PG: "Papua New Guinea", PL: "Poland", KP: "North Korea", PT: "Portugal", PY: "Paraguay", PS: "Palestine", QA: "Qatar", RO: "Romania", RU: "Russian Federation", RW: "Rwanda", EH: "Western Sahara", SA: "Saudi Arabia", SD: "Sudan", SS: "South Sudan", SN: "Senegal", SL: "Sierra Leone", SV: "El Salvador", RS: "Serbia", SR: "Suriname", SK: "Slovakia", SI: "Slovenia", SE: "Sweden", SZ: "Swaziland", SY: "Syria", TD: "Chad", TG: "Togo", TH: "Thailand", TJ: "Tajikistan", TM: "Turkmenistan", TL: "Timor-Leste", TN: "Tunisia", TR: "Turkey", TW: "Taiwan", TZ: "Tanzania", UG: "Uganda", UA: "Ukraine", UY: "Uruguay", US: "United States", UZ: "Uzbekistan", VE: "Venezuela", VN: "Vietnam", VU: "Vanuatu", YE: "Yemen", ZA: "South Africa", ZM: "Zambia", ZW: "Zimbabwe", SO: "Somalia", GF: "France", FR: "France", ES: "Spain", AW: "Aruba", AI: "Anguilla", AD: "Andorra", AG: "Antigua and Barbuda", BS: "Bahamas", BM: "Bermuda", BB: "Barbados", KM: "Comoros", CV: "Cape Verde", KY: "Cayman Islands", DM: "Dominica", FK: "Falkland Islands", FO: "Faeroe Islands", GD: "Grenada", HK: "Hong Kong", KN: "Saint Kitts and Nevis", LC: "Saint Lucia", LI: "Liechtenstein", MF: "Saint Martin (French)", MV: "Maldives", MT: "Malta", MS: "Montserrat", MU: "Mauritius", NC: "New Caledonia", NR: "Nauru", PN: "Pitcairn Islands", PR: "Puerto Rico", PF: "French Polynesia", SG: "Singapore", SB: "Solomon Islands", ST: "S\xC3\xA3o Tom\xC3\xA9 and Principe", SX: "Saint Martin (Dutch)", SC: "Seychelles", TC: "Turks and Caicos Islands", TO: "Tonga", TT: "Trinidad and Tobago", VC: "Saint Vincent and the Grenadines", VG: "British Virgin Islands", VI: "United States Virgin Islands", CY: "Cyprus", RE: "Reunion (France)", YT: "Mayotte (France)", MQ: "Martinique (France)", GP: "Guadeloupe (France)", CW: "Curaco (Netherlands)", IC: "Canary Islands (Spain)"}, default_regions: {0: {name: "North America", states: ["MX", "CA", "US", "GL", "BM"]}, 1: {name: "South America", states: ["EC", "AR", "VE", "BR", "CO", "BO", "PE", "BZ", "CL", "CR", "CU", "DO", "SV", "GT", "GY", "GF", "HN", "NI", "PA", "PY", "PR", "SR", "UY", "JM", "HT", "BS", "FK", "AI", "AG", "AW", "BB", "VG", "KY", "DM", "MQ", "LC", "VC", "GD", "GP", "MS", "TC", "SX", "MF", "KN", "CW"]}, 2: {name: "Europe", states: ["IT", "NL", "NO", "DK", "IE", "GB", "RO", "DE", "FR", "AL", "AM", "AT", "BY", "BE", "LU", "BG", "CZ", "EE", "GE", "GR", "HU", "IS", "LV", "LT", "MD", "PL", "PT", "RS", "SI", "HR", "BA", "ME", "MK", "SK", "ES", "FI", "SE", "CH", "TR", "CY", "UA", "XK", "MT", "FO", "AD", "LI"]}, 3: {name: "Africa and the Middle East", states: ["QA", "SA", "AE", "SY", "OM", "KW", "PK", "AZ", "AF", "IR", "IQ", "IL", "PS", "JO", "LB", "YE", "TJ", "TM", "UZ", "KG", "NE", "AO", "EG", "TN", "GA", "DZ", "LY", "CG", "GQ", "BJ", "BW", "BF", "BI", "CM", "CF", "TD", "CI", "CD", "DJ", "ET", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "MG", "MW", "ML", "MA", "MR", "MZ", "NA", "NG", "ER", "RW", "SN", "SL", "SO", "ZA", "SD", "SS", "SZ", "TZ", "TG", "UG", "EH", "ZM", "ZW", "RE", "KM", "SC", "MU", "CV", "IC", "ST", "YT"]}, 4: {name: "South Asia", states: ["TW", "IN", "AU", "MY", "NP", "NZ", "TH", "BN", "JP", "VN", "LK", "SB", "FJ", "BD", "BT", "KH", "LA", "MM", "KP", "PG", "PH", "KR", "ID", "CN", "MV", "SG", "NC", "VU", "NR", "HK"]}, 5: {name: "North Asia", states: ["MN", "RU", "KZ"]}}};

//Map logic - do not edit
eval((function (x) {
    var d = "";
    var p = 0;
    while (p < x.length) {
        if (x.charAt(p) != "`")d += x.charAt(p++); else {
            var l = x.charCodeAt(p + 3) - 28;
            if (l > 4)d += d.substr(d.length - x.charCodeAt(p + 1) * 96 - x.charCodeAt(p + 2) + 3104 - l, l); else d += "`";
            p += 4
        }
    }
    return d
})("var create_simplemaps_worldmap = function (no_clone) {var map_name = ` G/_mapinfo.` ?$;var demo = true;Raphael.fn.print_path`!$)x, y, string, font, siz`!9$` P\"text = this` b\"` >5, \"middle\")`!H!actual`!/$` d&.attrs.path.toS` c!(` M\"bb = `!q$pathBBox(` ^');` ]'remove` T#dx = x - bb.x ` \"!width / 2` ;\"y = y` 4\"y` ;\"height` 9%transforma`\"{!= \"t\" + dx + \",` &!y` D!result`!`'` Q%Path`!d(,` f+);return` \\#`\"T(};`$1%`%B!(srcInstance) {if (typeof ` .' != \"object\" ||` .)=== null) {`!.#` 3';}var new` E&` 3(.constructor();for (var i i` Z)) {` Y'[i] =`!l.[i]);}`!=#` D';}`\"I%isDescendant(parent, child`&f#node =` -\".` ;\"Node;while (` :!!`\"G%if` ,#== ` G\"`\"[&`(8!}` i#node` c(`!^$false;}`#j'consol`#P\"\"undefined`#p!` 4*.log` 6,) {` W% {};` >)`)G') {}`\"i)F` $#(` ,$ToCheck`\"o#getTyp` n#`!s$` <* &&` ?$`&E%.call` a.`!p![`&(\" `!2$]\"`!F'set_responsive_handler() {` :%resize(`#k!size_paper()`&K\"` .\"Timer`'e&detec` t!` S#clearTimeout(` H');` \"' = set` 8*, 300)`$R\"window.addEventListener) {` #3(\"` _\"\",`$$*`!P+;},`%Y\");` P5orient`*M!chang` IG} else`![&ttach` z!`!&V` X(` Xif (vml) {document.body.on` H\"`'<,` Z&;}`%:!curtop`%0&findPos(obj`'K#curleft =` E# = 0, scr = obj, fixed =`)[#`*X#(` ;\"scr`*\"') &&` U!!= `!c)) {` $-` O\"scrollLeft || 0;`!5#` 1)Top` 7\"if (getStyle(scr, \"position\") == \"`!_!\") {`!e$`+n\"`#;!` -\"&& !`$7#opera`\"W#scrDist`\"%\"ollDist();`!f$+` 3!Dist[0]`!]$` *'1];}do`\"4&+`#/!.offsetLeft` I'` /&Top;} `#C#obj`#d\"` 6#P`-x\"`+U$[` t#,`$8#]`*q(`!h'`\")\"html `#r'getElementsByTagName(\"html\")[0]`#U!html`#g'&&` U&` `$` ]#` <&`/S&[` T'L`!c!` b*]`(x$` x/||` NY +` ?<`!=0` 4>`!f,`)-*`!E0` .0`!6\"` E3]`2O%[0, 0`$i(`'`%`)8!stylePr`!)!if`%i!.curren` @\"`%1#y`%|#` /([` S%`\"!)`'~#getComputed` Y,` +3`!K\"null)` n)`\"\"#y`!y'distance(xy0, xy1` w#x0 = xy0.x;`!(!` '$y` *!x1` *!1` 6$` '$` 8\"dx = x1 - x0` +\"y = y1 - y0`(F$Math.sqrt(dy * dy + dx * dx)`!U'create_bbox_state(auto`!^#print_s`4S! = \"simplemaps_\" + map_name + \"map.mapinfo.` c!` m\"array={\"`!b!` (, = {};for (` 6% in ` `$paths`!C$ath_to_add =` 4*[` T!];` 5*Raphael._pathToAbsolute(` ;')`!Q!bt` C'pathBBox` 5.x =`#N\"round(bt.x` 3\"y` (-y` 2#2` (.2` f#` ).x2);`#c)+= \"'\" +`\"q#+` '#\":{x: \" + x + \",y:\" + y` '!x2` (!x2` 4\"` (\"y` )!},\";`#p,`#2# = bt;}`$~+` #(.sub` $\"(0,` ,*length - 1`!l/};\"`.3!!`&-#console.log(` A()`(R%`!S,;`1s!typeof Object.`'-\" !`2I!`'A#\") {` 1*= `'[%(o) {` %%F() {}F.prototype = o`(N$new F;}`!1\"!Array` ?&.forEach) {` #3`!))fn, scope) {`'\\%i = 0, len = this`#;#; i < len; ++i) {fn.call(` ]!,` F![i], i` &\");}}`)|'linePath(startX, ` #!Y, endX, endY`(b#` 4! = {x:` D$y` $\"Y}`&w!end` 9\"` U\"y:endY}`\"y$\"M`&l#rt.`&\\!`&f!` *\"`&`! L\" + end` 4'end.y;}`\"[!sMobile = {Android:`#)&`0_&navigator.userAgent.match(/` P#/i);}, BlackBerry` 8L` P&` d#iOS` 4LiPhone|iPad|iPo`!M$Opera` <L` P! Mini` _#W`19!s` 8LIE`#]\"` _#an`\"d2`$\"$.`#I#() ||` ,&`\"t&` *+iOS` #+`!t!` %+`!u#(`'#!`!6%is_touch`!30any()`%_\"hooks_o`*+! = {over`1X\":false, ` -!region` &)locat` )(ut` J+ut` H,ut` F-click` K*` -\"` M*` .\"` K.ose_popup` +$zoomable_` f/` -+` s+omple` C&refresh_` (,zooming` '-back` &\"`*7\"mapdata`$(&get_` .#() {if (no_clone) {` 3# = simplemaps_worldmap` P$;} else` W\"!api`$S#` S)` m!(` K7)` ^%` K&` b&.`!#%}}`!f)`4]\"ack_image, ` \"!s_directory, di` \"%mapinfo`-Z!te_specific, main_settings, getxy, normalizing_factor`#/&preload() {` _* =`#^$.` +*;`!7#`#46info;`!7!` -3` 7!;`!`)`!$'` +)`\"t!scripts = document.getElementsByTagName(\"` C\"\"`#I\"mysrc =` V$[` _#`1c# - 1].src;`#m&`!@!`!2'.` 0'!= \"no\" ?` )6: `&~!;`$L,` f-` 0-!= \"default` p.` =-`! $` u(` 4-?`%r- :`\"m\".substring(0,` ,#lastIndexOf(\"/`$A$.js\") + 1) + \"map`\"C\"s/\";`&\".`$\\\"info.calibrate.width / 750`32#gnore_pos, current_viewbox, responsive, div, initial_zoom, ` \"(_solo, tooltip_manual, last`+|\"ed` 4&up`*y-_info() {div`$/-` /!== undefined ?`\"Z!\" :` 8.;`!K(`$y.` 0)` e+-1` `-` D(` m)`\"L!` b9` ;#= \"yes\" ? tru`&k&`#R&` T-`$?\"== \"` ;&` O-`.s$on` O-`\"5#`(8$` K! :` Z!;`0\"\"`*8#`%X!`'a#`0;#s &&`/n%on`'x!` 22`(u%f (`+#$` 5#`4\"!` }'` 0(;}` E(labels) {` #\"` D'` +\";}`&$* =`!/#`&-(` ,%`&6&` *%`'V&` *%`'s!`$<!time, order_number`2M\"_percent`/t\"`$l#back, link_text`2s&on, fade` h#hide_eastern_`\" \", `\"(\",`)'$`#D$`\">#var adjacent_opacity` 0!op` \"&incr`.<!al` +!` W!_size` $'color` %'` U(new_tab` '!`!8%ocation` <)hook`!O\"b`\"v\"` |%popup` z'` *\"` P(` ,\"shadow` F)rner` o\"` ,\"nocs` $(font`*h*refreshable`*u%`!$#`0$1ground_transparent`)1(0 : 1;`#+&` R-` 0'`/b,` 0': 22` _#`\"b!` P3` 6\"` R2` 6\": \"white\";`$1#` Y-url_` 3%`+/3`$P4`!E.` 1,`!K-` 1,: 1;`%E!` [-js_` 2#`!?3`%l'`$8.` 1'`4K-` 1': 1.5;`&F'` Y-` 0(` Z,` 0(`#`&`'\")` Y3`\"h4` 0*: 0.9` i#`'g\"` X3` 6#> -1` \\3` ;#: 1`\"E%`(G!`\"75` 8\"`\":4` 8\": `#4$`)#!` U3` 5#`$O3`)N&` H3` 6!`!22` 6!: \"12px/1.5 Verdana, Arial, Helvetica, sans-serif\";`,z'`2\"1_out_` :'ly`214`. ,` ^-` 0-`!z,` 0-: 0.3`3t!`/f!`!K2` 5!` [,` 0&: 0.5;`0F%` S-` 0&` T,` 0&* 1000 : 200`,&\"`3&/`1k(` u-` 0)&&` \"8!`#V%` *7`%k$`2I/`!+-` /1`&L3`3e%`,^.` 1%`,X-` 1%: \"(Link)\";back_imag`+~/` 1&`\"44` 8'`!R$`,D\"numbe`,(.` 0)` ],` 0)` g$`%\\!percent`!Q0` 0,`&,1` 5'`,;!9;}`3H%is_onclick(`)]!s) {if ` &#`#|!on_` <!\") {return`(d\"} else ` ?+detect\" && touch` ?2` ,$`\"@\"}`!B*ff`!26ff`!03` b,var vml;var tough` %!ie` ,!ios` #!`\"3$` (!`/C#ff =` _#var reload` &)`\"3!` I&s;`!u%get_client_info() {vml = Raphael.type`\"$!VML`'E-ie = document.all` 0-os = isMobile.iOS()` 4,`!X!` A!_` &!` 0.`#G$`.o._up`0L1` 3!:`/=0s;`#;$`\"y%`#;(`$`*;`$0!map_outer`#=!map_inn` $&div`#F&create_dom_structure() {` B\"`#\"(getEl`/x!ById(div);`!!%` +: + \"` B\"\") ?` W8` =)`#G$`!y%` c?` C!` aA` B$`%2%f (`\"'%`\"Y%.removeChild` 4';` '3` p!)`'>\"t_to_del`![7\"tt_sm\")`!8!` H%) {` #%.parentNode`! )` C&;}}`#r1`$t\"`!'#(\"div\"`$K\"`#:-` 15` o!.id = `$.*` ^&` 0*`#N\"` 3'style.posi`&I!= \"relative` @\"` |\"` 4.absolut` 3/zIndex = \"1` 8!div.append`$,4` .,`$=#`(F!widt`+c\"height` &!scal`,4#atio` %!x_` ,&y_` \"&original_location` (*` v&` *%`!\"#`)1-imensions(`.n#responsive) {` d!`+M!`\"/!`%K'offsetW`!$!` 7#`#$\"` K$` \"\"+ \"px\"`/C%` f&`+f(` /#== undefined ? 800`,+-`\"3\"}` v** 1;`\"M*`!l\"info.calibrat`!R#` ?&`\"k\"` 51` 4#?` R/` 4#:` h4 /` '/`$j\"` ;!_to`!0&`!f+/`$=-` A%` 9$` U+;`%Y#`!q1x_adjust;`%r#` 01y` =$`&!- = {x:0, y:0, w:`!6!, h:`!5\", r:`\"3!}`+A!!resizing) {` 2! = 1;`!0$`\"/-`$&\"transform = \"s\" +`'~\" + \",\" ` \"(0,0,t\" +`()$` :%`(-$}`(s!pap`1*#all_visible_states` 2!`\"5$_label` .\"` ?(` ,'`!T%` )!background` K%pil` W'` z'all_region` &&`!1$` ''`! 'op` '$`)P,canva`)W!`\"7! = Raphael`+J&,`#Y\",`+E#);` E!.setViewBox(0, 0` 5-`\"(& =`#3\".rect(-1000 *`#w\", -1` \")5` 0)3` #'` f(.hide();`\"o&` {%set` 2#`$1*` ./`#=#` '/`#E%` (0`#D!` *+`%)+`!37` ,1`$7&` G/`%C!` )+}`$_%is_licensed`.:$demo`-)!false || !order_number) {return`0F\"fla`+&!` 7&.substr(0, 3)`05\"ear` .33, 2` ?\"mon`-U!` 205` =%day` -37` 9's` Q49, 1` ?\"leng` ~.` 0\"`+.!`\"4!= \"FLA\" && 10 <`\"$\"< 19 &&`!k#< 13 &&`!U!< 32` &\"sh` X!-` V!`!$$= 20) {`#[\"`#Y\"`12%console.log(\"Order `!N\" is not recognized.  Please contact support@simplemaps.com for help.\")`+{#trial_`+~&map_` /!`*)-` D\"text`%P$!demo`%3'if (`'1$.hostname.match(\"`!<*\")`\"G,` ]$`!8% = document.getElementById(div + \"` B\"\") ? ` \"D:`!'#if `,,!`!$\"&& isDescendant`,?(` <%)) {` /%.removeChild` ^&)`!g3`#;\"`!P#(\"div\");` A%.id = `![*` 3'style.posi`2>#\"absolute\"`.u\" = 0.1` '!h = 30` &!w = 200` X-lef`46&- w + \"px` .top =`.U# - h` 04zIndex = \"1` 7\"`\"z\"append`\"o-`&C'`0++` 5!, w - 5, h`)M\"text =`&x(.`&[!` >$ * 0.5, \"S`'Y*T`%(\";text.attr({'text-anchor':\"end\", 'font-size':18` ($w`\"P!':\"bold\", cursor:\"pointer` O%family':\"a`!w!sans-serif\", href:\"http://`'l+}`!R#click(`(~%() {window.`([&ref = ` R3;})`.M\"`\"v!_back`#2!back_arrow`)t-` 6!button() {` @&`0!+`%{$35`&/&5`(Q!` N!image) {var ` '!`29%`'F!rectory +`!E\"` =!` c!img = new I` /!img.onload = `\"\\* = img.`'$!;h` '#`&j\";make`!q\"();}` a!src` ?!`!@(`.\"%` B*` %` +( {`#;&`&l+outer, w`&r!`\"N1`#=&`#?*` i!.` E!(`!M*, 0, 0` m$` P,`'-#`&I,}` 7/reg_num = -1` 3'.push`!c\"` C')`\"i%`+5!` 4!pa`2P!\"m503.7,743.8c190.3-96.6 132.9-417.05-155.6-409.71v-128.7l-228.1,195.0 ` &\"205.8v-131.6c240.9-5.5 229.9,202.8 ` e!,269.3z`,b#`!J!color = main_settings.` 0(? ` \"6: \"#3B729F` c-_bo`3?!` `7` ;$` g7` ;$: \"#88A4BC` }(size`.j!0`(Q\"`#u'box`%H*rect(`%:'`%-#fill:\"black\", opacity:0`+t.}`)_\"`&=:path(`$~&` }$stroke:`\"&., '` 6\"-`)3!':2` (&`!E#':1, `!a!` T', 'fill` 7)`!_..scale`!I#size,`#-', -2, -6`':F_box`'PL` '7box);}if (!initial`#?!`-Y).hide();}` ('`/A\"` ,!` &!);}`.p!cattr, la` \"!r` (\"region_map, label_attributes, `*v$s`/.&set` 8'() {` <%`'F!pdata`0H%s;`!1! = [];`!5!` %\"`!9!` $#`!9%` >$`!8*` 0\"var default_` L\" = {};` &*.`)f$false` -,hover`*(%` .1`%i#`)D-`!^#` 7$`)A,` 0+: 1`!&2` `;` 7*` n3` 7*: 0.6` },url`\")4descrip`2s#` .1inactive` (4zoomable = tru` .-popup`\"*4` 8!s`\"#4` 7#: ` #\"`$l-ascade` d4` 8#_all == \"yes\" ?`!_! :`!q6_percentage = ` #+` A,x1`\"^4y1` \"4x2` ;5` 0&if (` 0\"s) {for (var`)X# in` ##` 0)i = 0; i <` 6$[` \"\"].states.length; i++)`3^\"` 4! =` :3[i`)D([` 0!]` E%;}}}`!3&d`!H*`*-![id] = Object.create(`\"G*)`\"?([id].url` T(`&4(`\"v\"`!+&prop`!,'[id]) {` b+[prop] != \"`!4#\"` t(` 8#`\"Y&` +%`.G\"` X.`&%$` Q1`'~!` >7no` B2`\"4#`#A-mapinfo`3%!s`$N#`#:$`$U$`--'` .!`-.%`(**` 7!`-*\"` A+`-<*` B0` 7'` M+image_sourc`*q.` =\"`+W*` k0` 7'` M+`,V\"` @0url`!;,`,@&` C*all` =\"s_` :&`*T;`\"s#i`+N/` d'hidden` BG_`2+!`\"r3`#`\"bord`#v5` 0/`-n,` 0/`!93` =(siz`\"8.` 0.` p9` =!` v2`-qF` F&`*O#`#d5` :&`#ZA`142`&'\"`123` 0)`1?%`.`&_id`+1%`-^!id] ?` 5$` )$`!G$`*l&_id && `*a\"` *%]`2+$`,]$` .-olor) {`*82` 92`,&#` ,,`*&'` `-`*a*` ?8` f3`*$'` l-`*_*` ?8` f3`0:\"`*r0` 70` N3`*_$` Y-`+9'` <5`#;4i`$U!`+,1` 81;}}c`2f=` b!`3 \"map_nam`'j\"us\" && (id` *!GU\" || ` '#PR` \"(VI` \"(MP\")) {`!1%`![$`(]!`\"5\"` u1`,Y!eastern`,`\"s)`!6(VT` z(NJ` \"(DE` 0(DC` =)H`!Q)A` \"(C` g)R`!z*D`!u/`.6%`\"'#`3E%prop in `*,\"specific[id]`)&#` '.`45#!= \"`$&#\"`!$(`4R%` B4`#F\"` _5`,M$` _1tru`&@#` C9no` I2`+j\"}}}var `&\"$`\"s${}`-P%` .!.font_family`-N-` =!_font`-L-` 0': \"arial,sans-serif\"` v+`1y2` ^\"`1r2` 0(: \"white` f,`,=*` L0` 6(` l2` 6(:`# *`-|#` &*`3##` W\"siz`0~&`!M#`(j\"`2y+`&t%s`1N=` a\"line`$b%` ).`\"89` 6'`\">2` 6': \"black`#K,parent_typ`*y!`&c!` -3`2a!`!U0display = \"all\",`#O+anch`!k5` 6#`!j2` 6#: \"middl`!G.ill`!=3pill_width`!(-` 0'`!',` 0'`$92x` x3y`!03`.9\" \"Not Named`!s,`\"};`#[5preset` 4%`*Q-s`\"R!pinfo.` +*;`-e%id in` H+) {`#u#ttributes`1\\9` H!);` @0`!Z&`-#!`.t-`!+*`.z'` '.`.o2`!!0`-T%` M4`.J\"` j5`/%'` b9`/1&` N9`/5\"` M9`/=%`$)+`$'%if (!` O0`#uS`2}.`#q-`#=Y`#\\2`#'_`#!]`(9)ocation`2|+` /#`1q4` 8#`.>4` 1*: \"#FF0067`*K'` y$`1w9` `$`1z9` 10`,E-`!'$borde` o7` 9#` l5` 9#: 1.5` f4`!n<` 9)` k;`#6)FFFF`#*5`!z<` 9)`#&;`\"=%2` |.size` l6siz`#c/descrip`&A#` D3` :'` P.url` @6url` @.inactiv`!Z.all` =%s_` =&`)A# ?`)&!`%i6typ`\"F7typ` A/image_sourc` A7` 9)`$*5` 9): \"`%>0id`\"8<` >!` t,` 0/:`+V!`4%'` |$opacity`0w(`!Z$` 4#`&r4` P&`&H9` ?$`&m;` ?$`$75overwrite`#3#`-''` ;3popup`!E6` :!s`!>6` 9#: ` #\"` n.x`!!6y`!<6x_adjust = 10` G/_` \"9font`)Y! = 14`)P/isplay = \"all`%[Uden`(Q5if `3z&`(`*= undefined) {`({4\"square\"`4P'id`4T!`!;$`2^!ttr[id] = Object.create`!+-);` ^%prop` \\)[id]) {if (` 7!== \"region`3a\"` }#`#+(` 8#`4=#` ](`3{#!= \"`!=#` X)`48%` B/` T6`#^$` U1true` =:no` D2`$E\"}` W!!`\">&`()`\"U)`*$,` 0&`*_$` V2`24!` W/`35$` .&` -!;}}}var currently_zooming`!k%var tooltip;func`*?!`%5\"_` 1#() {var find_pos =` &!Pos(map_inner)` d!x0_page` :#_pos[0]` 5!y` (.1` 4\"x0 = 0` >#` \"%h` ,%u` +!l` F\"_mid` E\"_` \"$id = \"tt\"`\"$#p = 5` N\"eft` $%maxw = 40` p\"speed`*P!` *#timer = 2` )\"endalpha`!>%al` \"(tt, t, c, b, h;return {`#2\":`#?%() {tt = documen`(m$Element(\"div\");tt.setAttribute(\"id\", id + \"_sm` ;#tyle.posi`.`#\"absolute\"` 5&`(n'none\";`$8%.appendChild(tt)` /'onmousemove = this.pos;tt` \"4}, show`\"='v, w`*Q$opup_off) {`\"r\";}ignore`%t$`,n%tt == null) {`&F#`+o$);}`\"\"0block`\"L!`!w!HTML = v;h = parseInt(tt.offsetHeight, 10);` x$updat`!G!();}, reset_pos`\"$'x, y`\"(#`!^\"`.<(`!V/` +#` b#(y0 + y, x0 + x`!!!`!,&`%O+` L+u, l` L!` <*e) {u = ie ? ev`&%!lientY +`&3&`&>$`&8#.scrollTop : e.pageY;u = u -`)I$;l` b0X` T>Left` n%X` b!l -`*Z$`$z!`%A% ||`+\\$_manual || `%J'` 5'up && on_click`%y'`\"q5`$M.` 6!`,N\"qua`*B!;`+6! =`$.\"0.5 * width;`+E! = `$P!` 3\"h`%r!`&/!`%|+`\"3!l >`,$\" && u >`,'\") {`!&#4;} else ` G\"<` 093` ?*` m)<` =,2` _7` <-1`0]\"` (\"= 1`,'!`(k#`-a\"u + 7 + \"px`+9'`-p#l +`-|\"` 9'`!3'` o$2` a25` ]6-`#K&Width -` D&` n/3` m0- h - 3`!Y?` ;%` t#` T44`!DI` E%}}, hid`/e+`+2#!`+*+`.m5}`3=:if (` :$) {`3P2`3L2}}};}`!S%set_tt_css() {` .%newStyle(str`(Q#pa`1j(ge`*V$sByTagName(\"head\")[0`4b\"el`2-7`\"S!\");el.type`4M!ext/css\";el.media = \"screen\"`\"N!el`#*\"Sheet) {` #).cssText = str`$u%el`2<)`!A+TextNod`\"C\");}pa` A)el)`4c$el`#,'getsupportedprop(proparray`#'#root`\"R(`-d+;for (var i = 0; i < ` [%.length; i++`3<$` 4$[i] in` {!`\"V\"`!*#answer =` \\&[i];` -%` #\".replace(\"borderRadius\", ` )#-r` +\")` ?6MozB` M+-moz-` 8EWebkit` S-w` 2!` =FboxShadow`!x\"x-s` (\"`![<` K'`!q#` 7@`!m$` R(`!i%` V'`%e#` Y\";}}}`%F\"und`\"3\"pr`+^!`%n-[`$ -`#U/`#'/])`)%!rcss =` x-?`!*-+ \": \" + `4$\"corners`,U\";\" : \"\"` l!`\"+\"`!R8`\"_'`#H,`\"},`!^#s`!_\"` p'?` |(`!R%3 *`!X#` 8\"`!X\"`!q!3 ` \"54` %2rgba(0,0,0,.5)`\";$`(m!` A(< 0.01) {`!^#\"\";`$V!m` (##tt_sm{\" +`#f\"+`\"(\"+ \"z-index: 1000000; backg`#t!-color`#c*lor + \"; padding: 7px; opacity:` A&` +#` G\"font` \\(font` 4\"` |#black;} #tt_name_sm{float:`2R!` \\\"-weight: bold` F\"custom` =-clear: both; margin: 0px`!l'0px;}`%h\"css1`#!!xmark` b'right` R+cursor: pointer` Y'2` O1`!K\"` V)` '\"-left: 5` ^3if (!vml`-Y#str =`!d\"+`$r!`08%` 4&`%)!+`!F!;}`2V)`/m*_zooming_dimensions(e`/S\"`!'#gotoX = ` /$.sm.bbox.x + x_scale) * ` $!`\"[!gotoY` >0y + y` :4W = ` A,width` 9-H` 7/h`%J!` >)actualWH` (!paperW` j!= original_` n.` C!H` g\"` >'` l/zp`!9*zp` 2!w =`\")\"` )!h` '#`!?\"x` '#X` )!y` '#Y;`\"W$w / zp` *!H = h` %&X = x - (` E\"- w) * 0.5` 9!Y = y` 6$H - h` 6$if` K$/`#4#>`\"_(/`\"D() {isWid`0Q!true;ratio`\"($` E$` U!;`#U$ =`#&)* ` O!`!O#-= (` @%-`!;\") / 2`'(%`!'&fals`!$*H`!Q*`!\"-`!}\"`!&(X` ~0W`!+#`2)#{x:` F!, y` $!Y, w` $!W, h` $!H, r:` p!}`(A'reset_state_attributes(destination) {for (var i = 0; i < ` 7'.sm.` ]!s.length; ++i`*-%ate =` \"\"_array[` G1[i]];` &!.attr(` %\"sm` )!`!Q\");highlight_labels` @\", \"`\"#!\",`#j\",`%#!);}`\"8,las`\"F#() {if (` -!`!E' && ` $,.sm.type == \"` Y!\"` /4`!a'` z\"!` 20ignore_hover) {` 2-`\"[!` `;;}`\"[-` B,, \"out\"`\"U/region`%%(` ,\"`!n#` $%` #\".stop();` '#`!Y!` 2$`!F*`%U0` @&`%7I` G,`%Z!`% ;);}`\":-all`\"</) {` /&s.forEach(` S%`\"\\0`$U!d != -1`\"w!`#-9;}}`1H(loc`$/!_corre` /!`(y(, initia`2d$`&I\"`(u,typ`.\"t`,f!ansform + \"s\" +`++#all_`!&$s.hide()`/T\"oom_r`#d\"` '!time * 1000` G+`\"^.lc`.$!f` %!.sm` t!) {lct` |$`-6#` 9'display`(S!all\" || ` (/`(i&`(w+` y#show` _=` V+!` U,`!@Aout`!:*`([!` |F` S!&&`$H,bbox`$r#in`+a)= Raphael.isPointInsideBBox`%S(` ]$,`#7$x,` \"$y)`2i!!` k*`\"G*` D#`!+-`1W\"`1m$` .4`3/!`\"V(}var new_side =`!B$size`1o%` ;$x` 6&x -` L&/ 2` ;%y` :&y` 4,` 1#bbox = {x:` p!, y` $!y, x2` -\" +` P%, y` /\"y` *'}`#\"!`!c$hape_`$}%circl`%e!`#F!vml && !touch` %!`)S&lct.animate({r`!!!`!g!* 0.5},`({&`$1\"`!($calable`,Q\"`&)$` (,` o&`*3%:t` f*}`$A(`.d!`!3.` ;'`!aJheight` f%, width` %'`#n,`!M+`!J-` ?N);}}`\"eO`!)!`#)(`.O,hide_reveal`0S$`(@*`.6;`2.'in ` ]!`1b\"` T#lbl =` ,([i]`'[!lbl_set` 4%`1N!` <!lbl`0l\"` C\"paren` C!` 2\"` *\"`%\"` ,\"`.J$` l\"`,]0` B\"`,($!`,&&` (.`.g%`!\"\"`\"A$`(*!`0 $`-F!!` 7&`+Q.`!61`0@\"`!,\"line`\"{$ine_path = get_` '%(lbl);` F'`$i#path:` =%});}`!($`, %`$r+and_show_before`3&Wlast`*y#` &\"` 50back_arrow`.@%`#3#_corre`!U!`!/2;`&R;`%3!`$(%region\") {reset_`24!_attribute` L+`([\"`!w&` N/` 9!` a!(` |+`3=&!`\"D+` ^\"` Z%` )\"`!9(`\"x,`&o)`!25` 0T`43#` :G`(>(`\"q)`\"N\"`\"Z?`!u# &&`%i,id !`%T2`\"v=` *$`*o\"` I5]`\"Q2`#uW` [Z`#y#highlight`'>$` Y,,` D#`/R#` [!!` V&all`#f\"s.stop();all_pill` $)` <#`*s\"'fill-opacity':adjacent_` +#}` X(` *D`\"N)`!2\"` '(` R11` H,m.`\"_\".forEach(`,6%(`1y$`&X\"be`/^\"il`20!` $(`!6$` '*`!'5}`!5+`4d%'stroke-`3n!':`!Y+hover_border_size * (` F! / original_` ,!) * normalizing_factor}, zoom_time * 1000`/w&`$2<1`$!>1});`'3\"all`'*/);}` z(`\"?3`!Pm`0y3after`.Y)`%$\"`/h#_` e!solo`+(/`-G/` O(back) {`1!'`2V$`#f#return`,r)` j4`+&#||`!$< ||`1c$`!&7}var end`*C(;`\"y%`#8\"o`3m4`.^%`$U#d`($!` %'`'&` *' = false;}` 2!click` +'`!>+ =`\"=(;tooltip`4E$` (#_up` W%currently`$M!ing = true`0\"!`# 0`,_'` 0+` Z#_dimensions = get` r$` .'`4P+var to`%n\"` Q)` a=`!x$_viewbox =` V/;` z\" = {x:` -..x, y` $0y, w` $0w, h` $0h}`!%!from`!y/`0|0`!~/` Z$`!h\"` X0`!j\"` %1`!m!` %1`!o!` %1h};ratio`#&1.r;`*J*before`'M2`( &updateZoom() {paper.setViewBox(from.x,`\"C!.y,` \"\"w` )#h,`&u\"`+p(whenDone(`3{!`+k9`!D'`#b,`(.+`'g0`(/\"on`)\"\"` (%`\"*\"`\"w\"level()`(<!hooks_object`$d%complete) {` #9`+L!if (!vml && !touch` %!`+,&TweenLite.to`#4!`.{',`'K\"`'9$`')$`&y$.h, onU`!w!:`$)&, onC`!=#:`#R$}`.5&`$>-` |\"` z\"` x\"` v\"`$@#`$3&;}`$I&create_content(element) {var ` /# = ` 1#.sm.descrip`$7!`.C!mbedded_img = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACodJREFUeNrsWVlonNcV/u79/39WjbbReEbSjBQHKjlpYmMTWyM7iWVb8UNfDH1KIBs4JS0UAikybelDaSlNDSnFD4W+lBTjeGkpJH3oU20rdixZdiRrHCNZ+zajdfb1X+69fZjFyngkW06aEtCFwz/Mcs/5zv3Oud+9Q4QQ+C4Piu/42AawDWAbwDaA/++Qy994/fXXK3yNgHMd6XQWQ4NDrQf8+18wDN1iUsy3CSGTQsDY0AMBuMSx2eeEcY9qGPslhhpZwpfCbBohjKiEk02Dv3Tp0sMANkWrSD889HLnh856ZyuhhMTj8Wgqmf6tLClnALAnySBn7CWFyH/yenbsVWSZpFKpdCyVOEOE9BsAuS2vAEAqr4AQP6ipqz7rP+C31dXVgxBA07S6/pv9f1yYDzbKknJqq8ELLl6xmSyXOjr8tc1NTeCcQ9N0+9CdoV9MT8/IBNKpLdeAYagVLKcYhv7Ovr37bA5HFaZnJjE1PQmD6eg63AWvt6nHMNTTW1ElnLHjNpP548MvHa5tbm7G7NwsJiYnkEwlsG/fPtTUVv+UMebbMgAB4yFjXGusctifra93YnFpEYZhgHOOUCiEWDyKrq4j8LX4ehjXTj9OY2CMHbebrBdefvlwQ32DE9PTU9A0DQICkUgYiiyjxlFj5mDPgwhsaJUB0IcMRMqqqhY1dB1WqxWEEEiSBEmSEA6HEU/ECyC8PYzpH2xOG/5Kldl28XBXV52zwYm5uVlwzkEpBSUUJpMZIASqpjJQsSwox0ZWuY1y+pARIa1qqt47OT0Fj6cRNpsNnHMQQkApRTi8hmQyia6uY/C2eHsMpp6uxCZmsOM2k/XjriNHal07XJifnwPnHJIk5YOhFC0trVhZWUEkEgkQRbrLJWAj29I+QCXpzL179/onxsfR4muF1WqDEKIEYi28hlQqgWNHj6HF19LDmP4VOjHGjtsttgtHjhxpcLkaMD8/ByEEKKWlZ2trK1LJFG7eHIgbeu5nZiE0E+PYyLYEgICEBMRbN28N3BofH0eLrwVWq7XkXJIoIpEwEskEjnZ3o6XF18OY/oGAgOC8u8piv3j06NG6YuYZY6A0754QihZfK1LJDK72Xk0mM6m3JEnq/cZ3YkromBDitYFbA4MPVsL6FTpFImFk0il0d3fD1+p7P5fLfm41Wc92Hz1W63G7sbAwDyFEgTbrMp9Oo7f3ajqRSr1BKf3kiXfiR3RuUEonOeev9g/cvAhK9ra1tSEYXICqqpBluUQnQgiOHeuWFKX34K72XXB73Jibny3RjnMOgMDn8yGZSODq1SuxRDr1tiRLn2wpqU8koCgdFxCv9vf33xobG4PP64PN9qAmJElCJBpBKpXA8VeOw7XDhfngXKnb5GlD4PX6kEwmcfnK1WQyk37s4AkhIIRUXgFZlgsbmvEoEGOc89f6b/Zfkijd19bejmAwCE3LQZLyK5GIJ5DNZME4L9Gs+PQ2+xCPx3H58uV0PJV8Q5blTx4VdLFbqaq6MYVCoRAkSUJjYyMopdA0DZzxigqjSKfPb9y4CEL2tre3IxQKQtO0fJYoAeOsFECeNoCv2Yd4PIHLVy7HEqnk2xsGLwRkRYGiKMhmcwiFliCEwPXrA9B1PT9v+a1EsRjb29sBAG1tbVAUBQICRMrXwUNbB+dtlNC/+Tv8/rb2NoRCQei6DiEASvOZI4RACIGGBhcyqQz+c+VyPJlJvUkp/bRicRIGs6JgcXEFweAicjkVU1OzZfhE5SLmnGNkZAQAsLKygpMnTyIWi2E1ugoqPVw2RJLGNFU9OzIy4m/0eJBJZ5DJZgHka0KmFFSSIMsyCAECXwYQjUZGzWbbp2QDpc04EFpdw7VrfVBV7cmLOJFIwG63w2wyY6M7JMbYiZrqmt/t2bMHqUwamWwGECLPOiFgcA5N15HJZrG4uIjdu3ejtaXlAGf6Hwp6BeuNgIBzIJNRNw3+sbsQ53zD4DnnJxx2+9mOA/7aKkcVwmureRpKEgilIJQWdE6emslkEplMBp2dh0hTc+Mpg1fWToR8C0dKxtiJKovto86OTofDUYWlpWWA5DUNIXn6mE1mSBIFCAEtdJJoNIpUOomD/kNoamrsMZh2+ls/EzPGTjis9nOdnf5ah6MKi0uLIESAUgkkv2vD1eCC2+1Bk6cZFrMl3wgIKcmOZDqJQwcPobGpscco007/UwCC8xMOq/2sv9Nvd1Q7EAqFACFAaX7dCaVwu90wDIZr169hbmEObo8HFovtgXaiMmKxCNKZJF489CKamjw9xiOk+DcCgDF2wmqxftTh9ztqqqsRWgzlM0sJgDzPPW4PVFXH7S9uJ9bCK+8HAnf7Zmdm4XF7YLFYwAUHoQKESIiEI8hkUujsPIjGRneeTls42m1JC3HGTzgc9nMdBw7Yqx1VWAgulHS8gAABgXuHG6qq4YvB26mZ2ekf64ZxnhviX4ahXwLB3p07d2JleRm5XBaEEghCsLq2htraWnT4O9Hfd6NneXlFQEg/Lx27vi4Ak8kEEBy0Wsx/3f/CfntVVRWCoQVwnqdDcYd1uVzIZrMYHBrMTExOvHv9s77zWr4NTux8+qnXJEk+ywy2/+mdO7G8ugxVVUuaJhKJgHGOjg4/Bm4NnFpaWg5SSs58bQrpuo4LF84jGl/70XPPfb++trYWS0uL4PyBquScw+lsQDaXwxeDg+ro/fvvXu/t+1hTNQWAGYB5emrmft+N/jcD9wLDUzPTcDpdUBQFjLGSCIxFo8ipWezZswc1NY5fgaDh6wIgABAMBr0E2O10NiAWjZYcFmnT4GxALpfD0NBgemRk5Ceff3bjnKZpdgAWAKaCOeZm50f7rt98IxAIBGZnZ1Bf74QsK6UVJIQgGo3CbDajqsrhZFzvXMcUWunOR94g6KLRgvqxGIxzxlihWEunNNTV1yGXy2E4EMjeu3fv1O1bg39njNeUJYcU9tn6+bn5KQDvcsb+whnb7fX5EImEoWna+kYBzjl0jZkB2Au/VwHwdWJMABDyI7JvAmDKpDPhleXV4ZXVlReeamkFYxyMGaiurkY2k0Xg7l3tzvDwL4eHAv9kBqsp3NIZFQBQANb5ufkJgxnvcSH+TAh5ptnrRTwRg6EbqKmuRjweQyQSXZ4Ym7hfAFCcSy2/AZQrHru+uhKSqqp8dHT0rLOh/iAEnnG5XDApCsKRCMbHxtPDd+78emhw+B9CwFxwxguOWNmyywAkANbF4OJo343+9wB8qGra8263G2bFjFgsjompSXV05P7vY/HYWuH7rCy+UneqKKfX1YepWIQAeLO36bldu3addO1wPivLsikcjixMjk+dn5qavlI4ABkAdABa4XV5G5QAKAUzAeAej+eptvbvvdPU3LjXbDY7wmvhhemZmXNjo+P/1nWdrZtPLTzFejm9GYD1DuWCQ8NisSgWq6URgKzr2lo6lUkUPivSxih3tAkIGQA3KSZis9uaQWAxdGM1lUqFC0krAigaLz8PPAoA1hWzVHAo1k1EC8bWGX+sW5r8fEXDOpoU5+TrksIrH9geD0B52yVlvBZl3WEr46GOVzbnpsmoCGD7L6ZtANsAtgFsA9jK+O8AbNeOIaU8PDcAAAAASUVORK5CYII=\";var external_image = directory + \"x.png` C\"` ;!_source = vml ?` N,: embedded_img` R!xmark = \"<img id=\\\"xpic_sm\" + \"_\" + div + \"\\\"src=\\\"\" +`! *` 7! width=\\\"15\\\" height` &$alt=\\\"Close\\\" border=\\\"0\\\" />`!y\"linkhere_end = new_tab ?` v!target=\\\"_blank\\\">\" +` N!_text + \"</a>\" : \"` $5` z) = \" <a href`\",#element.sm.url` \\#`!J%+ \"&nbsp;\";if (!` C'on_click) {`#E%\";` ~(\";}if (` s+== \"\") {` ;+var content_part =` '$` L\" ? (` 1+\"\") : \"<div`$]\"tt_custom_sm\\\"; /`\"o!` _$`\"m!div>\";return` L+title` U!>` +)nam` 0#`#!+name`#&'` w&` U&`\"u!` S&`##\"` >&`!I\"`!Z&`\"4\"`!^'`\"r!bbox_storage`$j!state_array` %'` B!` 0! = false;function create_` D!s(refresh) {`$p!` %&` ~( = {};`! '` +\"}` z/mapinfo.` +,`!W\"caled_`'y\"_size =`(&#` (\"* (`(`! / original_` ,!) * normalizing_factor;for (`*W!d in`!4%paths) {mak`\"B#(id);}`\"[%` +* {`#V!rand_new =`#J([id] ?`#?\" : tru`#n' =` L'? paper`!9!(`!>)[id]) :` g,`(b\"vml) {` 6!.node.setAttribute(\"class\", \"sm`!l\"`,,!`\"*!var attrs = cattr` p!` .$` [!s = {fill:` D!.color, 'fill-opacity':1, stroke:main_settings.`$4#` N#cursor:\"pointer\", '` P\"` \\)` ,$`$R!':`%!.` 9&linejoin':\"round\"}`\"m!`!d\"inactive) {`\"$&.`!>\" = \"default`(1#hover` ~$`!k! =`\"v\".` (/?`#1\"` '0: `\"I6`#V!` G)`'<#` [/` 5!` s1` 5!:`'k(`(0(` k0` \".`'xLvar ` `!`%@5` ~\"`%##`%F#`\"m.`$g4`!Q-`$d\"`(3%`'X%sm`+4#`$~'`3>'` ='.ignore` u\" =`)3\"`%?'fill = \"url(`4=\"rectory +`#o#`42,)`1>#`%#5||`$84`!L(emphasizable`!P$} else` +6`.]\"`-j\".sm`%>/`$s/`.K\".attr`!o!`\"S\")` 0#transform(t` \"$` 3$sm` P!`$%` #&` 7&`%<.` #+` A&descrip`-t!`'d$` )'`!*'djacent`&7+`+^+` =%` +#`0r#`\"r!id`(d'id`\"[$` 4#_label` 4)` -\"`&45.reg`!q\"`#r,`4L!` b$` (!`)e$` (!:`0c%name`/<!`!B&ur`!;&url` /&`,L$` 5%` )$`#m'n_click = is_on` (!`&l#popup`$Z'` +!_off` F#ff` 23`\"`!s = [`!['zp`!>%zoom_percentag`!C'zoom`&|#` @&abl` 8'type = \"` ,!\"`\"A'd = id`$.0`&L$`$6)` ?%content = create_` *#(` =!)`2o\"`2D\"bbox`3)\"`$l$` ('` W&` /!`4h\"true`2s#bbox`4b%` M&`3p%` :\"= undefined) {` M#Raphael`4X!BBox`4\\.` %!)`&%'` S#bbox`\"A&bbox.`/#\"` 5\".x2 -` ##` 8+height` @$y` ?%y`!h!`#Y)`'X%hide()`+u%`'v,all_visible`\"y\"s.push`#a$}`-I!`(F-`\"}&`#6$;all` K2` .'`!D$func`+&!style_background() {` $&`,q\"`1<\"`3c+` ;%`1+%`+3*` \"#`1^%\"none\"}`%0#`*L\"`!\"`2S!last_destina`,K!var ` $(`!i%`&(#` \\\"s(refresh)`#S\"!` %&` w(`2(#`4W'`/H*`3v\\default`!N#`.++`\"Z#`#1+`4C)cursor:\"pointer\"`4X&`#G%1` *&`!I!':`!x.` 9&linejoin':\"`$@!\"}`&|!`#.#) {for (var id in`$)#s) {var`*q\" = rattr`)F!`$I'object =` L$` 1+` 4!`#! ?`$z)`''!: paper.set(`+>#`$B,.sm`$I\"` &%.`'7\"`-t\"`!}&` m&) {console.log(\"Duplicate R`!^\"\");continue`%@\"x1`1%%` *!2` \")y` 0*y` 4&`#-& = 0; i <`\"j*`!e#.length; i++`#N#`)q\"`.l!` >0[i`#@\"` )!`-I%`\"=\"` S$`\"X\"`.Q\"`\"E+` u%+ \" does not exist`\"P)`,:)`!B\"` V0`3t%+ \" already assigned to a`!~#` p)` j+`15\"`!n!(vml &&`\"0\"`1T!gnore_hover && `3-#`(+! ||`1R$ov`(=$))`%X&`,r)`0V,`/$$`$s\"1_curr`2$\"`/K#`%+\"` '-2`%4#` ),`,:\"y` @-y2`\"5\"x1) {`&+!`!#&;`&,!` {&;`&-!` r&;`&.!` j&`04%` Y+ <= x1 ?` '(: x1` p, >= x2 ?` '(: x2`!(, <= y1 ?` '(: y1`!@, >= y2 ?` '(: y2;}`)E,`$!'_id)`&;\"`$W\"x1 &&`$b#y1` \"&x2` -'2`#5$` L$`!m\"` N$`\"C\"` P$`!a\"` R$;}`%7!`.?*`17+` F\"`1C%`.8,}`$w!`&@!` D?`&h\"` .#`.+\"`'+') {` Z&.fill`!c%` ;!`\"o(`'L( {`!1+` N*` @'` V(inactive`!(*`\":\" = \"`1K#\"` N\"`.10`(@!`.:,`(%\"`&_!` &,y`&%!` &,`3%\"`&Y!-` B/height`&7! -` L/`'A#` {-`&i\"`&C(`$3)` #&` O'`,K!`.-,name` 9'descript`,8\"`#E\"` )'` ?'ur`#z&url` /'labels =`1~)` 5&cont`+!\"create_` *#`1o#` ?(`&G.` #+` A'adjacent`&j;` >$`&}%` X&zoomable`\".%` )$`!F(n_click = is_on` (!`&L#popup`!s(` ,!_off` G#ff` 24zp`!()_percentag`!0(`'K$` B%` )$` 9'type = \"`16#` R(d`1$'`'e&all_` ?\"`,D#`#x*`3Z#id]`%q%;}}`(>2` E#-1]`(P\"`+6!ut`&I&` 7%;out.sm` A\"` &\"`!q%out\"` ,$zooming_dimension`$n!x:0, y:0, w:`(z!, h:`(c\", r:ratio};`.p#_view`*\"#` 3Blast_destina`(!#out`.%$ll_external_borders = false;func` M!`'R#` 9#() {`#,!simplemaps_worldmap_mapdata.` E#`#H!turn`2I%` {3`(p(}for (i in ` ]Bvar ` (\" =` /@[i]`$i!b`!0%path(` 8\"` '!);b.transform(t` \"$);b`,4!({stroke:` L#`/*!, fill:\"none\"`1*., '` O\"-dash`%w!':[` Z#dash]` 8&`$i!'` v$size` 2&linejoin':\"round` n'miterlimit':4});`#X0`(0\"b)`%:#`,x!`'D\"`\"n!` *\"set` -#`%4,`-G\"(`)##` (\".forEach(` D%(lbl) {lbl.remove();`!I#` L#splice(0,`&^!` .#length);`!J'`(n\"`!G+` /\"` T!oc`'P!s.toFront(` U%`-k(` #,.reverse();`&G!var id in` 9-`&7#`/#!`!%$`(8%`(!!` k-hasOwnProperty(id)) {continue;`#q!brand_new`!R&`,/%?` w\" : true`$'*`(:+`)}!tt`(\\!`!7,[id`'_\"par`1Y\"`!j&`//#` 4!_`,C\"= \"state\") {` I%` -!`!T#` G)id]`*)$` V6`/-#` e(`-l)` @N`#y$` g)` -$` ]5`$A!` 1\"x && ` %#y &&`\"v#`,j#` '\"`/3&`!#+` [$=` O#.sm.x;` e$` *(y;`%`,`$f!`1!#`!+%console.log(\"The following object does not exist: \" + id);`&$&`##&nam`!n\"Not Named\"`\"5)` :(`!a'id` _\"`&j%`\"f#`!u)`'#`&>\"path`-o&rint` .!`!@#x,`4g#y,` \"#name,` H#getFont(\"FreeSans\")` ?$size`'M\"`!\"!`.m*`!0&)`0a%` 9.text`!*9);}` J0`)4+;}` ,!.sm`+s'.sm.hide =` i#hid`(h\"`&c#&&`%v(hid`-f# ||`#d'hide)) {` d,`%[\"` -%`'U%` #\";` W&`-d#`/A!` '!)`!:'.sm.`(~\"`3t!`)\"'` 0,]` U3`,:!`-o){`1F+0`2A#`\"`\"`2S#'font-size'` 2#`1n#` 3!weight':\"bold`2e2` C!family` Z$font_` -\", 'text-anchor` 9$` (\"}`%o!`'*!`!j*`!['h` :!`!g!` H#ut` 46` A#`#I*inactive`(c#`/e#`\"$\" = \"default\"`$]$attr`&g!`0a#`%|&`!+)` #&` 7&`!z.` #+` @'`!x,` #*` ?&`,l\" \"` ,!\"` .&id = id`\"H!`*C,`\"S&scalabl`'J$`(K#`'$(re`1Y\"`.X#` *!` |&line`0?`0H&` Q%display = \"out\"`*T%` ./` n\"` )#`!U#`3M'`!m$`!5&`!Q!`-Z% &&`!v$`0|7if `(E\"`!/)= \"all\"`/D,L`({! with lines cannot be shown at \\\"all\\\" zoom levels\"`,{&`!#%bbox`!|$.getBBox(tru`-l$ine`.r$get_` '%`*1$` =$`.)+` ?$).transform(t` \"$` p'`(?*`*l\":\"#000000`)}2`+)*2};line`(2\"` d+)` 5\"`.G%` '\"`-4-` 0$`!?)` \\+` <%`'Y4pill`&b%` E$`'~$` ($`%}4`'A,line` /\"_set`.\"#in`1#!`+1*`&$%state`45!`&F#ill`3R)`$|)`%1$?`%2#` ($:`%41if (vml`(X$` f!.x`!}%x - 0.5 *` '.`$:!`!}#` ,!`\"L&y` J\"` B+h`/H!` F(x2`3;%`!+#+` d:` A+y` B*` z#`1E!p = 0.15`&d!calculated_` o!` X*` -\"* (1 + p * 3`'9\"` C$`\".\"` (\"?`\";#` (\":` i-` T!`#}%`\".$`#6$(` Q\"-`!--`!+\"y`\".,`#c/`\">\" * p` N!` (#` K)` :%`\"+\"` v\"r =` E$/ `\"p\"`'J#`*/\"rect(x, y,`\"R\",` G#, r);pill`*12` 5!`)U!`'(&`)S(` ;!`)W$` &#`)N-`./&`-L(`'i#||`(]*`-h(`!*&`'(%` \"->`#}+`(*#` '$:` A-;` S,2` d/2 <` j*2` j+2` g/2` k,y` h.y`!b+y` j*y` e.y` e-`!^/y`!a,y`!b+y`!^/y`!`-`(+$`\"].-`#'=`'\"%`!I.` L-y;`-A!`%C/region`%:9`40%.sm.` J\"`-a#` '\"`-a$` '#array[` B,]`!D$;` J'`&=!` \"*`%~=` B)` _*2` ^,`%qA` D*` e)y` b+`%j?` B)` _*`!O,`%^B` D*` e)`%v$`\"E+-`\"i7`%l%`!:+` F*y;}`47,pill;all_pills`3[\"`3-!`3f,`3B!`3z-abel);} else`2m$` --if ` &\".sm`&_%!= \"out`4D!` (1all`':!` 4%hide`3q%set` ,!(`!4&all_visible_` @!`\"(#` H%`!D#!`\"Z&reset) {top` 69` H&`'v%type`(h!locat`)'!&& ` r&lin`!i!` 7#` f5all` $4` \"%`)5#id]`1y%set`$\"'`01`\"G!vml`#,$.node.setA`11$(\"class\", \"sm`!@\"_\" + id);}`!N(`#b$function get_line_pat`%!$`+6\"`'^&`!d$`*y%` :!`\"h$` 2,`,l*` >*points = [];` &+`#/\"{x:0.5 * (` s).x +`!$*.x2), y:` '*y})` \"r2` ^7` Q+, y` v2y` {-y2)` NF2` HM`$\\&`#k)` ''`!\"&`.G)+ `! )`-u(+`-2*`!{!` Q< -` .^` J.`$V!`!k(`$R\"` q(- `$S!` (d`\"t!`#Q#winner = {};for (var k in`#e)) {` 4%j` 8!`$~*`)$#current`)_\"`*q%` =\"[k]`!,!` ;%` [# =` ],[j` D\"distance_between =` *%(` }),` d-`+f\"k == 0 && j` $\"||` c.<`\"\\#.` 2$) {` +#`!$`! );` 5$`!v&`!.,` ;$` j$`!n'`!/$;}}}return linePath(`!*(.x,`!P$` *\"y` &&` #` 7(` +$y);}`,<)`/#!;`-]%create`!`%s(refresh)`1g\"` /%.forEach(` Q%(lct) {lct.remov`.Y!)`4D!` L&splice(0, ` **length`*w'`!R!`&F+id`&-(s) {mak`!b&(`/!`!G%` +-`&\\\"attrs`&U!ttr[id]`%D!` 1!`2{\"!= \"image\"` G'`17!s = {'stroke-width':` S\"border * scale * normalizing_factor, ` S\"` E)_color, fill` 2#` +#opacity` .#` '#`'B!sor:\"`(#!er\"}`(#!over_`!D?h` D!`!\"g` k\"`!^1` 5\"`!^7} else`#O0`!|E` b/`$c&inactive) {` L&.` M\" = \"default\"`(*\"shape_`%<!`%Q'`%M!`0x\"`&q$`#/\"= simplemaps_worldmap_mapinfo`)%%` F#? ` \"G: 1`!,!size =`')\".` (!*`!6+`'.'x &&` D#y`'/#`\"o!`([\"` &!.x` e%x,` 8\".y` *%y`$\")` T$getxy` |#lat,` F#lng)`#d\"`#*(= \"square\" ||`#C)`(a,new_sid`#@\"`\"4!ratio`\"R!new_x =`!Z#x -` D&/ 2` :%y` :%y` 3,`!E0circl`!7%`.n'paper.` 9\"(`!-#`\"u%,`!R) * 0.5`2n\"bbox = {x:`!^&` E#`3i\"` M!, y` 9#y` )3x2` X%+` K2` 9$y` *3here:\"hi`(g&`\"L/`#q)` (!`3Q(`+\\#verwrite_` 2+?`%/#` (5: directory +` F#` =\"sourc`(R*`#k%` =!(` ]*,`%9\",`$}\"` (\"side` +\"side`#o,` I#y` $!y`#L!`%|\"+` R'y` /\"y` *'`+q*`!L-rect(` J~`!C%`46%sm`)m\"` &'.`-')` #&` :&attr`)a!` 3\"`3<&.transform(t` \"$` 3'sm.original_` 7% = ` #%` =*`.O-` #+` A)id = id` ')nam`,i&name` 1)url` 4%url` /)`.q#\"` ,$\"` 1)`//)` #&` 7)descrip`'f)` )'`!n*`0S#` @%` )$` 7+_destin`%s$tru` 4*on_click = is_on` (!`.(#popup`#~*` .!_off` I#ff` 26`-X'` +)`-M'` +)`&#bbo` B*labels = []`#E*`18\"siz`\"%*h`/1\"`!R\"hid`#V+ispla`0l&` )#`1d!` 31= \"region`0O!` +4stat`0p\"`!.&) {` F%hide()`(Y).conte`2 !create_` *#`!?%);all`+q%s.push` 2'`3b%array[id] =`!X%`\",!!vml`!:(node.setA`()$(\"class\", \"sm`!!%_\" + id);}}}func`%x!`\"=!_or_`\"h\"(` +!) {current`&:+` /#ly_zooming ? end` 9): las` L)`!p!` t!`(h&`(g() {retur`!G#`3A#` H$`!S\" &&`!6$` o(` d)out` a'` R\"`#?#` _+]`1g(` W<`%`$&&` V: !`\"x%`\"d)&&`\"2\"` A&` ro`'##` z.`!,/`!R3` ^~`!H4!` bh`%}+`'a&is_adjacent(element) {`*}!`'\"+`%'4` O#` +0`![&`.h!`\"o'` AX`#,&(!` 5'`#3#||` I(`$r&` ~0id)`!,S`!:&`!mn` ^:` --`\")0`!$2` ,$fals`%8)highlight_`1;\"`%B$, type, `%Z$, skip_check`%_#`#v(` W\"`!3%`!.%var `21%` ?-;}` \"\".forEach(`!N%(` 4!)` [\"par`0[\"`!9& ?` q\"`4I!` 9\":`/+-` 3+)`.S!`-T&ver\"`'h%` B$il`0f!` $(.stop(` X\"!` e\"`%}!gnore_hover` B-attr(` B&over_a`1G$s);}`\"T\"` s$` '\"` P!` _%` B.`%{&`&D'se`/`!` M1ut` T)`\"(>`!h+` M,`%E$` 7=` A#`\"D+`%M$`!e#nimate`!W4, fade_time`!d2`#bI`!%#`\"'0` |)`3f!`\"-6` U.`\"8.` b*}}});`)%&`'j\"_inactive`.I+`'p~`!\"#` M'`!C$`%v*{cursor:\"default\"}`&W%` 21pointer` B!`\"D)emphasiz`\";,`,p,!`,w%`\"H'`\"d,` e$able` <'` :$insertBefore(all_visible_` t!s);}`#7\"st_over =`-H#` -%`$y#d` -)`3^#click` D#bel` %'` 0&over` #\"ut` #!background` O-` C%` (#` G'` E#`#;%create_event_handlers(`$I$`\"#%`%!%`#\\#this`-3' {over.call` +,;}}`+}\"_out` EBut` K;`!!` GA` E!` U5`\"&4!` G!id && ` &\"`2~&`-M\"`%W$var`3(%=`04-thi`,w#`&>'`%($) {` #$ =`3J#popup_off`)2*` .%` g!currently_zooming || tooltip_up && ` y'`'d(`&v%`#Z(` +&;}`'4(this`1R\"`(t&` e$`+S4`\"<,`*V'`(h%`)d-`$\"!_hook` Z*!`!{'`\"8#.show` u(cont` L!` +%`3F&vml &&`#<(`$]%location\"` 2+shape_` >%imag`*x9`0*+` 2$`/D$`%*(`3d*, 1);}highlight_`#K\"` I$, \"over\"`-N&`&p\"`${%`!!'`!O~`!O~`\"E(}}`-S#set_appearance`)Z)` M%callba`%U)hide`\"i#is_`3<$`&1%`2[/`!jF`3t1, whenDone)`0E&` I0`4R9` Z(`\"j8ut\",`+(!`%N*`$<{ || `#('`$|a`#+>`\"I;);}`%J%` N$`/:$isF` 4#(`%[%) {` $$(`&C\"`1B,force`&))`.;1`\"O,`)K)`/I'false`.'*` -\"`0.r`.u/`.M>out`.4C`(SB`\"s6`\"g$`%#k`(YX`()~`-F|`\"[4`(9>`0c3 || `(\"! ==`\"W\" {`.\\,`.M/;`'`!`!Z#d =`\"V$`)\"!`('%`) %`(W?`'ND`'A:if (`)I%&& `)^)`'R$update_pos`'Y#`$ (`''popup_`(!#`*7-over.call`(\\+` a'zoomabl`!U(}}` ^'`!$/;`!/\"off` 2*` .%`\"U,` |$ &&` +)`&U%`#<\"\" || `$P!destin`'3! !` {% ||`'N1`%y!) {` $`!`\"`+4+`+$+`&3'`-6(`!9!` Z!ed) {out`#9\"` +);setTimeout(`%s)zoom_to`!+&}`'t*`'X#` 5.` 3#`,w,`!t0var lin`$,+url`!z\"ink != \"\"`'H#!new_tab) {window.`*i$.href =` h!;`%3$`![#` D#open` n!, \"_newtab\"`#9-`%l&`)s'`#$(`$V(&&`${\"`#Y&`)x-`#]*}`$P8show`&$(cont` 5(`$x\"true`-x9ver\"`(3\"`-=g`,_)`-e?ttr`!(over`06');}`4N\"`#L$`,d&var close_`!7! = docu` c!getE` @\"ById(\"xpic_sm\" + \"_\" + div`&,\"` $Y`-r!` W&`'4!` %%.on`.71`).>`)&3`,t-if (hooks_object.`!8\"`,)!) {` #4();}}`0'!back` j&`0!,` S)`0t!` e+back()`/R\"`!f\"`,T'`,8-`,p0`-71&& initial`1E!_solo)` *(`!E#`* 3\"javascript:\" +` I)`*@$if (incr`$}!a`'v!`!>9`2M!`!U!` 30`!s\"`#/#`' )`25,`$e1,`)d!,`#s*`-c$` v\"_array[`!#6]);}`.6.` 2G`,K5`!4k-1`!H?` ?\"`&z#ground`&m6`0L'`(l+`2%/`.5<`):0`)',}};}`!=%order() {all_`%b!s.toB`(4\"`!u&` *&if (all_external_b` ^!s` \\#` ',.toFront();}all`/>#` +'top` #.` E!`(1#` ,(` ,$` @.`\"(&set_up_`\"c#`,G' = create` 2&` H+events(refresh`4!$` %&`\"y'`0\"!(over, out`!m\"` 5#`#j!(`$o\"`#8(` 2\"`%D,` 6)` q\"`% \"`!_#, ` \")` I\"_arrow` g'` d$if (responsive) {set_` '&_handler`-!`#X*`!}1` 5&`\"()`$_'` Q\"` (!_` W\"` %#` Z%` B\"` Z\"` 6\"` _#}var resizing`&v%`$)%` 5!e_pap`&|\"if (mapdiv.offsetWidth < 1`(4!turn;}` d'true;`%+#dimensions();` m!.setSize(width, height`3O\"scaled`'<#_size = ` \"(* ` Q\" / original_` ,!) * normal`!A!_factor`(L%`%[\" && `#P)`&-*forEach(`+ &` 4!) {` #!.attr({'stroke-`!2!':`!a.});` J\"sm` N!ibutes[` J*] =`\";/` O&over_` @:` C$`%D!`#')`\"VL}`&D,`\"X.` 4$`1d%ttr[`39%sm.id]`2Q\"!= \"image\") {` 6(`!q9` [2`\"/\"`!_M` [(`#'>`!%2`#J(` gV`%^1`\"OB});}}`)e#adjusted_ratio = `!82`)-$trial_text();`*7-`.Q&reveal_map`.L+initial_zoom != -1) {`+/\"gion =` \"#`3p#` C(]`)/!!` +$ba`3\\!`-p'`3]#}`/T+`4b*,`+@!` ?#` s(_solo` j#`/4#show`2y#` t?for (var i = 0; i <`\"&#.sm.`*c#length; i++`\"R#id`\"L%` >&[i]`,Q\"tate`)K$`\"l$d`\"c#`)^&id`+B&`!n#}}` j&`/)#`))/abel) {` #!` Q%);`.S$}`\"[.all_visible`,v$` '/`!+#` j$`%M'`$1!`%T!`2##`&~&()`&?$` s\"(`$D\"` -#`\")\"` &+`+P%` (+`!:!();style`$O!`\" \"();hide_and_show_before(last_destin` k!,`'L\"` >,aft`2u!` 63`*.!();set_event`!O$`2J*;`(3'` :\"if (hooks_object.`# $comple`0E!` #9`%,!`*+!fter_page_loads = `%%&manual) {` *%first() {get_mapdata();preload();get_client_info` +#map` #(`!G#able` /$is_licensed`$m&dom_structure` ,'`4^(` -#canva` %'`+l)`'y!popup_nocss`&##tt_css();}set_up_tooltip` \\&`)q!button`$@#`&Q)`%[/`&c*`&\\-` p&`%7!s`!V#vml || !`#h%setTimeout(second, 1);} else {` -\"`$_!`$1%` ,$ {`'Z-`'U.re`\"'!ll`!R#`\")*`&o$` O#`&u!_handl`!l\"`'$'`&o));`#:#.` T\"`\"6#`&\\)`&i4`&l)`&?#;}`,o!get_xy`&l)`-D#everyth`0m\"`(H!.set();` /&.push(all`$,#, all`\"r&, `$T&` 4#`\"!` V)mousedown`-?'e, a, b`!B#l = ie ? `\"r!.`'{\"X + document.d` \"#Ele` +!scrollLeft : e.pageX`\"I!u` W0Y` I>Top` a%Y` e!find_po`*.!indPos(`)B\"ner)` =!x0` 5#_pos[0`0]\"y` ()1` /\"go = current_viewbox` 4!this_width = go.r * ` )\"/ scale` <&height` =&` )#` <(x = -1 * x_` 0! + go.x` <$ +`!$(* (l - x0) /`!.\"`!z\"` \\$y` X(y` T,`!7#* (u - y` `!` .\";x = x.toPrecision(8);y = y` %,var print_str`&a\"\"x: \" + x + \",\" + \"\\ny` .\"y` .\";prompt(\"Below are your x/y coordinates\",` o)`3\\&`(1$over_hook`(/)e`%Q\"`&s#type = ` .#.sm.type`)S!` 5\"= \"`(5!\" && `)F)` z!` 7!`)],` 0&`!&$.sm.id);}` l)`($` e3` 7$` j1` 5$` d:`,Y\"` i3` 7\"` i1` 5\"` k-`#Q#ut`\"[xut`#?3` 1$`\"|Uut`#:6` 1'`\"|Sut`#:4` 1%`#:3click`\"Xw` z\"`#@1` 0'`\"!R` [\"`\"C2` 0(`#}T` ^\"`$?4` 0*`#H3zoomable_`\"h|` z+`#\\1` 00`#DR` [+`#m2` 01`\"u/`\"e%load_map() {if (!`2j& {after_page_loads(true);} else {delete paper;` 44}`!\"%`!G\"_zoom(id`#x#` /\" =` 6$array[id];zoom_to(`\"B#;` _&`#@!` Y+` /! =` 5#` T.`$7\"` Z'reset_toolti`\"U%last_ov`\"X!out.call` *'`$D\"!` N#_manual) {`1B$`\"q#` 2* = false` W\"on`$5\"` K'` H#.hide();setTimeout(`'*&) {}, 100`!w(popup`%t!, `\"d!`'\"/`\"x#`%;#`\"n/`!n#`&O0` K-`$3-`\"J$` 9*`)X$` =(`#4!`)0&console.log`!1\"+ \" \" + id` &!does not exist\");`#'\"`#B$var box = `$8!destin`!/!.sm`( !ing_dimensions`*%&!`+r(`\":#bb`*S*bbox`+E!x = (bb.x + bb.x2) * 0.5` 8!y` 6#y` 7\"y` 4%` Q!x + x_scale) * ` $!;` N!y + y` *,`#=(x`!@*`!E\"y` '*y` PR`19!urrent_` Z#- box.x) / ratio`1\\\"` =#` d#` >\"y` :&if (` ^&> width * 1.1 ||` T'> height` 6\"`%*+\"Not in this`&5#`$y-`(E+` #!`)Q\"`&%$`#3%over` +,`):-true;`)*$`*^\"pos`\"#&,`!s&);ignore_pos` K+`*+,`!m#` >!`)Q+_`*1\"`*m%`*?$` b$up` ]%`\"=+`+s*` 1!ed`\"D'`,,0`!3&go_back() {back` Z\"()`%>\"api`0K# = {calibrate:create_bbox`1e\", get_xy:g` \"!, refresh:r` \"\"_map,`0`!:`0b$,`/](:`/j',`/.':`/:&, back:`!i#,`#0\":`#7!` &#`#>!` ,\"` &!, `/Q!level:\"out\",`3%\":`2`(, mapdata:m` \"\"`2K'upd`!7$` a\"() {`\"k&`+=!` 3\"`+L3type;}`%0#` O&;}`+a%of simplemaps_worldmap === \"undefined\"`/*'` ;2_`!v# !` H-` j1 `$\\#` */`4)%if (window.addEventListen`2S!` #3(\"load\", `1H)`1U4`\"5M`!UTif (` ,/.`#0#.main_settings.auto_load`0#!no`!#3.load();}}, 1);}`),%`#.(ttach`\"~!`#*'` +&(\"on`\"0~`\"0~`\"YU"))