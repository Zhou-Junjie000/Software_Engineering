/** layui-v2.5.4 MIT License By https://www.layui.com */
;layui.define([ "laytpl", "laypage", "layer", "form", "util" ], function(e) {
	"use strict";
	var t = layui.$,
		i = layui.laytpl,
		a = layui.laypage,
		l = layui.layer,
		n = layui.form,
		o = (layui.util, layui.hint()),
		r = layui.device(),
		d = {
			config : {
				checkName : "LAY_CHECKED",
				indexName : "LAY_TABLE_INDEX"
			},
			cache : {},
			index : layui.table ? layui.table.index + 1e4 : 0,
			set : function(e) {
				var i = this;
				return i.config = t.extend({}, i.config, e), i
			},
			on : function(e, t) {
				return layui.onevent.call(this, y, e, t)
			}
		},
		c = function() {
			var e = this,
				t = e.config,
				i = t.id || t.index;
			return i && (c.that[i] = e, c.config[i] = t), {
					config : t,
					reload : function(t) {
						e.reload.call(e, t)
					},
					setColsWidth : function() {
						e.setColsWidth.call(e)
					},
					resize : function() {
						e.resize.call(e)
					}
			}
		},
		s = function(e) {
			var t = c.config[e];
			return t || o.error("The ID option was not found in the table instance"), t || null
		},
		u = function(e, a, l, n) {
			var o = e.templet ? function() {
				return "function" == typeof e.templet ? e.templet(l) : i(t(e.templet).html() || String(a)).render(l)
			}() : a;
			return n ? t("<div>" + o + "</div>").text() : o
		},
		y = "table",
		h = ".layui-table",
		f = "layui-hide",
		p = "layui-none",
		v = "layui-table-view",
		m = ".layui-table-tool",
		g = ".layui-table-box",
		b = ".layui-table-init",
		x = ".layui-table-header",
		k = ".layui-table-body",
		C = ".layui-table-main",
		w = ".layui-table-fixed",
		T = ".layui-table-fixed-l",
		A = ".layui-table-fixed-r",
		L = ".layui-table-total",
		N = ".layui-table-page",
		S = ".layui-table-sort",
		W = "layui-table-edit",
		_ = "layui-table-hover",
		E = function(e) {
			var t = '{{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}}';
			return e = e || {}, [ '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<thead>", "{{# layui.each(d.data.cols, function(i1, item1){ }}", "<tr>", "{{# layui.each(item1, function(i2, item2){ }}", '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}', function() {
					return e.fixed && "right" !== e.fixed ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}' : "right" === e.fixed ? '{{# if(item2.fixed === "right"){ }}' : ""
				}(), "{{# var isSort = !(item2.colGroup) && item2.sort; }}", '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} ' + t + ' {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', '<div class="layui-table-cell laytable-cell-', "{{# if(item2.colGroup){ }}", "group", "{{# } else { }}", "{{d.index}}-{{i1}}-{{i2}}", '{{# if(item2.type !== "normal"){ }}', " laytable-cell-{{ item2.type }}", "{{# } }}", "{{# } }}", '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}', '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', "{{# } else { }}", '<span>{{item2.title||""}}</span>', "{{# if(isSort){ }}", '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="升序"></i><i class="layui-edge layui-table-sort-desc" title="降序"></i></span>', "{{# } }}", "{{# } }}", "</div>", "</th>", e.fixed ? "{{# }; }}" : "", "{{# }); }}", "</tr>", "{{# }); }}", "</thead>", "</table>" ].join("")
		},
		z = [ '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<tbody></tbody>", "</table>" ].join(""),
		H = [ '<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" lay-id="{{ d.data.id }}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">', "{{# if(d.data.toolbar){ }}", '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', "</div>", "{{# } }}", '<div class="layui-table-box">', "{{# if(d.data.loading){ }}", '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', "</div>", "{{# } }}", "{{# var left, right; }}", '<div class="layui-table-header">', E(), "</div>", '<div class="layui-table-body layui-table-main">', z, "</div>", "{{# if(left){ }}", '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', E({
			fixed : !0
		}), "</div>", '<div class="layui-table-body">', z, "</div>", "</div>", "{{# }; }}", "{{# if(right){ }}", '<div class="layui-table-fixed layui-table-fixed-r">', '<div class="layui-table-header">', E({
			fixed : "right"
		}), '<div class="layui-table-mend"></div>', "</div>", '<div class="layui-table-body">', z, "</div>", "</div>", "{{# }; }}", "</div>", "{{# if(d.data.totalRow){ }}", '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', "</table>", "</div>", "{{# } }}", "{{# if(d.data.page){ }}", '<div class="layui-table-page">', '<div id="layui-table-page{{d.index}}"></div>', "</div>", "{{# } }}", "<style>", "{{# layui.each(d.data.cols, function(i1, item1){", "layui.each(item1, function(i2, item2){ }}", ".laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ", "{{# if(item2.width){ }}", "width: {{item2.width}}px;", "{{# } }}", " }", "{{# });", "}); }}", "</style>", "</div>" ].join(""),
		R = t(window),
		F = t(document),
		I = function(e) {
			var i = this;
			i.index = ++d.index, i.config = t.extend({}, i.config, d.config, e), i.render()
		};
	I.prototype.config = {
		limit : 10,
		loading : !0,
		cellMinWidth : 60,
		defaultToolbar : [ "filter", "exports", "print" ],
		autoSort : !0,
		text : {
			none : "无数据"
		}
	}, I.prototype.render = function() {
		var e = this,
			a = e.config;
		if (a.elem = t(a.elem), a.where = a.where || {}, a.id = a.id || a.elem.attr("id") || e.index, a.request = t.extend({
				pageName : "page",
				limitName : "limit"
			}, a.request), a.response = t.extend({
				statusName : "code",
				statusCode : 0,
				msgName : "msg",
				dataName : "data",
				countName : "count"
			}, a.response), "object" == typeof a.page && (a.limit = a.page.limit || a.limit, a.limits = a.page.limits || a.limits, e.page = a.page.curr = a.page.curr || 1,
			delete a.page.elem
			,
			delete a.page.jump
			), !a.elem[0]) return e;
		a.height && /^full-\d+$/.test(a.height) && (e.fullHeightGap = a.height.split("-")[1], a.height = R.height() - e.fullHeightGap), e.setInit();
		var l = a.elem,
			n = l.next("." + v),
			o = e.elem = t(i(H).render({
				VIEW_CLASS : v,
				data : a,
				index : e.index
			}));
		if (a.index = e.index, e.key = a.id || a.index, n[0] && n.remove(), l.after(o), e.layTool = o.find(m), e.layBox = o.find(g), e.layHeader = o.find(x), e.layMain = o.find(C), e.layBody = o.find(k), e.layFixed = o.find(w), e.layFixLeft = o.find(T), e.layFixRight = o.find(A), e.layTotal = o.find(L), e.layPage = o.find(N), e.renderToolbar(), e.fullSize(), a.cols.length > 1) {
			var r = e.layFixed.find(x).find("th");
			r.height(e.layHeader.height() - 1 - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom")))
		}
		e.pullData(e.page), e.events()
	}, I.prototype.initOpts = function(e) {
		var t = this,
			i = (t.config, {
				checkbox : 48,
				radio : 48,
				space : 15,
				numbers : 40
			});
		e.checkbox && (e.type = "checkbox"), e.space && (e.type = "space"), e.type || (e.type = "normal"), "normal" !== e.type && (e.unresize = !0, e.width = e.width || i[e.type])
	}, I.prototype.setInit = function(e) {
		var t = this,
			i = t.config;
		return i.clientWidth = i.width || function() {
				var e = function(t) {
					var a,
						l;
					t = t || i.elem.parent(), a = t.width();try {
						l = "none" === t.css("display")
					} catch (n) {} return !t[0] || a && !l ? a : e(t.parent())
				};
				return e()
			}(), "width" === e ? i.clientWidth : void layui.each(i.cols, function(e, a) {
				layui.each(a, function(l, n) {
					if (!n) return void a.splice(l, 1);
					if (n.key = e + "-" + l, n.hide = n.hide || !1, n.colGroup || n.colspan > 1) {
						var o = 0;
						layui.each(i.cols[e + 1], function(t, i) {
							i.HAS_PARENT || o > 1 && o == n.colspan || (i.HAS_PARENT = !0, i.parentKey = e + "-" + l, o += parseInt(i.colspan > 1 ? i.colspan : 1))
						}), n.colGroup = !0
					}
					t.initOpts(n)
				})
			})
	}, I.prototype.renderToolbar = function() {
		var e = this,
			a = e.config,
			l = [ '<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>' ].join(""),
			n = e.layTool.find(".layui-table-tool-temp");
		if ("default" === a.toolbar) n.html(l);
		else if ("string" == typeof a.toolbar) {
			var o = t(a.toolbar).html() || "";
			o && n.html(i(o).render(a))
		}
		var r = {
				filter : {
					title : "筛选列",
					layEvent : "LAYTABLE_COLS",
					icon : "layui-icon-cols"
				},
				exports : {
					title : "导出",
					layEvent : "LAYTABLE_EXPORT",
					icon : "layui-icon-export"
				},
				print : {
					title : "打印",
					layEvent : "LAYTABLE_PRINT",
					icon : "layui-icon-print"
				}
			},
			d = [];
		"object" == typeof a.defaultToolbar && layui.each(a.defaultToolbar, function(e, t) {
			var i = r[t];
			i && d.push('<div class="layui-inline" title="' + i.title + '" lay-event="' + i.layEvent + '"><i class="layui-icon ' + i.icon + '"></i></div>')
		}), e.layTool.find(".layui-table-tool-self").html(d.join(""))
	}, I.prototype.setParentCol = function(e, t) {
		var i = this,
			a = i.config,
			l = i.layHeader.find('th[data-key="' + a.index + "-" + t + '"]'),
			n = parseInt(l.attr("colspan")) || 0;
		if (l[0]) {
			var o = t.split("-"),
				r = a.cols[o[0]][o[1]];
			e ? n-- : n++, l.attr("colspan", n), l[n < 1 ? "addClass" : "removeClass"](f), r.colspan = n, r.hide = n < 1;
			var d = l.data("parentkey");
			d && i.setParentCol(e, d)
		}
	}, I.prototype.setColsPatch = function() {
		var e = this,
			t = e.config;
		layui.each(t.cols, function(t, i) {
			layui.each(i, function(t, i) {
				i.hide && e.setParentCol(i.hide, i.parentKey)
			})
		})
	}, I.prototype.setColsWidth = function() {
		var e = this,
			t = e.config,
			i = 0,
			a = 0,
			l = 0,
			n = 0,
			o = e.setInit("width");
		e.eachCols(function(e, t) {
			t.hide || i++
		}), o = o - function() {
				return "line" === t.skin || "nob" === t.skin ? 2 : i + 1
			}() - e.getScrollWidth(e.layMain[0]) - 1;
		var r = function(e) {
			layui.each(t.cols, function(i, r) {
				layui.each(r, function(i, d) {
					var c = 0,
						s = d.minWidth || t.cellMinWidth;
					return d ? void (d.colGroup || d.hide || (e ? l && l < s && (a--, c = s) : (c = d.width || 0, /\d+%$/.test(c) ? (c = Math.floor(parseFloat(c) / 100 * o), c < s && (c = s)) : c || (d.width = c = 0, a++)), d.hide && (c = 0), n += c)) : void r.splice(i, 1)
				})
			}), o > n && a && (l = (o - n) / a)
		};
		r(), r(!0), e.autoColNums = a, e.eachCols(function(i, a) {
			var n = a.minWidth || t.cellMinWidth;
			a.colGroup || a.hide || (0 === a.width ? e.getCssRule(t.index + "-" + a.key, function(e) {
				e.style.width = Math.floor(l >= n ? l : n) + "px"
			}) : /\d+%$/.test(a.width) && e.getCssRule(t.index + "-" + a.key, function(e) {
				e.style.width = Math.floor(parseFloat(a.width) / 100 * o) + "px"
			}))
		});
		var d = e.layMain.width() - e.getScrollWidth(e.layMain[0]) - e.layMain.children("table").outerWidth();
		if (e.autoColNums && d >= -i && d <= i) {
			var c = function(t) {
					var i;
					return t = t || e.layHeader.eq(0).find("thead th:last-child"), i = t.data("field"), !i && t.prev()[0] ? c(t.prev()) : t
				},
				s = c(),
				u = s.data("key");
			e.getCssRule(u, function(t) {
				var i = t.style.width || s.outerWidth();
				t.style.width = parseFloat(i) + d + "px", e.layMain.height() - e.layMain.prop("clientHeight") > 0 && (t.style.width = parseFloat(t.style.width) - 1 + "px")
			})
		}
		e.loading(!0)
	}, I.prototype.resize = function() {
		var e = this;
		e.fullSize(), e.setColsWidth(), e.scrollPatch()
	}, I.prototype.reload = function(e) {
		var i = this;
		e = e || {},
		delete i.haveInit
		, e.data && e.data.constructor === Array &&
		delete i.config.data
		, i.config = t.extend(!0, {}, i.config, e), i.render()
	}, I.prototype.errorView = function(e) {
		var i = this,
			a = i.layMain.find("." + p),
			l = t('<div class="' + p + '">' + (e || "Error") + "</div>");
		a[0] && (i.layNone.remove(), a.remove()), i.layFixed.addClass(f), i.layMain.find("tbody").html(""), i.layMain.append(i.layNone = l), d.cache[i.key] = []
	}, I.prototype.page = 1, I.prototype.pullData = function(e) {
		var i = this,
			a = i.config,
			l = a.request,
			n = a.response,
			o = function() {
				"object" == typeof a.initSort && i.sort(a.initSort.field, a.initSort.type)
			};
		if (i.startTime = (new Date).getTime(), a.url) {
			var r = {};
			r[l.pageName] = e, r[l.limitName] = a.limit;
			var d = t.extend(r, a.where);
			a.contentType && 0 == a.contentType.indexOf("application/json") && (d = JSON.stringify(d)), i.loading(), t.ajax({
				type : a.method || "get",
				url : a.url,
				contentType : a.contentType,
				data : d,
				dataType : "json",
				headers : a.headers || {},
				success : function(t) {
					"function" == typeof a.parseData && (t = a.parseData(t) || t), t[n.statusName] != n.statusCode ? (i.renderForm(), i.errorView(t[n.msgName] || '返回的数据不符合规范，正确的成功状态码应为："' + n.statusName + '": ' + n.statusCode)) : (i.renderData(t, e, t[n.countName]), o(), a.time = (new Date).getTime() - i.startTime + " ms"), i.setColsWidth(), "function" == typeof a.done && a.done(t, e, t[n.countName])
				},
				error : function(e, t) {
					i.errorView("数据接口请求异常：" + t), i.renderForm(), i.setColsWidth()
				}
			})
		} else if (a.data && a.data.constructor === Array) {
			var c = {},
				s = e * a.limit - a.limit;
			c[n.dataName] = a.data.concat().splice(s, a.limit), c[n.countName] = a.data.length, i.renderData(c, e, c[n.countName]), o(), i.setColsWidth(), "function" == typeof a.done && a.done(c, e, c[n.countName])
		}
	}, I.prototype.eachCols = function(e) {
		var t = this;
		return d.eachCols(null, e, t.config.cols), t
	}, I.prototype.renderData = function(e, n, o, r) {
		var c = this,
			s = c.config,
			y = e[s.response.dataName] || [],
			h = [],
			v = [],
			m = [],
			g = function() {
				var e;
				return !r && c.sortKey ? c.sort(c.sortKey.field, c.sortKey.sort, !0) : (layui.each(y, function(a, l) {
					var o = [],
						y = [],
						p = [],
						g = a + s.limit * (n - 1) + 1;
					0 !== l.length && (r || (l[d.config.indexName] = a), c.eachCols(function(n, r) {
						var c = r.field || n,
							h = s.index + "-" + r.key,
							v = l[c];
						if (void 0 !== v && null !== v || (v = ""), !r.colGroup) {
							var m = [ '<td data-field="' + c + '" data-key="' + h + '" ' + function() {
								var e = [];
								return r.edit && e.push('data-edit="' + r.edit + '"'), r.align && e.push('align="' + r.align + '"'), r.templet && e.push('data-content="' + v + '"'), r.toolbar && e.push('data-off="true"'), r.event && e.push('lay-event="' + r.event + '"'), r.style && e.push('style="' + r.style + '"'), r.minWidth && e.push('data-minwidth="' + r.minWidth + '"'), e.join(" ")
							}() + ' class="' + function() {
								var e = [];
								return r.hide && e.push(f), r.field || e.push("layui-table-col-special"), e.join(" ")
							}() + '">', '<div class="layui-table-cell laytable-cell-' + function() {
								return "normal" === r.type ? h : h + " laytable-cell-" + r.type
							}() + '">' + function() {
								var n = t.extend(!0, {
										LAY_INDEX : g
									}, l),
									o = d.config.checkName;
								switch (r.type) {
								case "checkbox":
									return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' + function() {
											return r[o] ? (l[o] = r[o], r[o] ? "checked" : "") : n[o] ? "checked" : ""
										}() + ">";case "radio":
									return n[o] && (e = a), '<input type="radio" name="layTableRadio_' + s.index + '" ' + (n[o] ? "checked" : "") + ' lay-type="layTableRadio">';case "numbers":
									return g
								}
								return r.toolbar ? i(t(r.toolbar).html() || "").render(n) : u(r, v, n)
							}(), "</div></td>" ].join("");
							o.push(m), r.fixed && "right" !== r.fixed && y.push(m), "right" === r.fixed && p.push(m)
						}
					}), h.push('<tr data-index="' + a + '">' + o.join("") + "</tr>"), v.push('<tr data-index="' + a + '">' + y.join("") + "</tr>"), m.push('<tr data-index="' + a + '">' + p.join("") + "</tr>"))
				}), c.layBody.scrollTop(0), c.layMain.find("." + p).remove(), c.layMain.find("tbody").html(h.join("")), c.layFixLeft.find("tbody").html(v.join("")), c.layFixRight.find("tbody").html(m.join("")), c.renderForm(), "number" == typeof e && c.setThisRowChecked(e), c.syncCheckAll(), c.haveInit ? c.scrollPatch() : setTimeout(function() {
					c.scrollPatch()
				}, 50), c.haveInit = !0, l.close(c.tipsIndex), s.HAS_SET_COLS_PATCH || c.setColsPatch(), void (s.HAS_SET_COLS_PATCH = !0))
			};
		return d.cache[c.key] = y, c.layPage[0 == o || 0 === y.length && 1 == n ? "addClass" : "removeClass"](f), r ? g() : 0 === y.length ? (c.renderForm(), c.errorView(s.text.none)) : (c.layFixed.removeClass(f), g(), c.renderTotal(y), void (s.page && (s.page = t.extend({
				elem : "layui-table-page" + s.index,
				count : o,
				limit : s.limit,
				limits : s.limits || [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ],
				groups : 3,
				layout : [ "prev", "page", "next", "skip", "count", "limit" ],
				prev : '<i class="layui-icon">&#xe603;</i>',
				next : '<i class="layui-icon">&#xe602;</i>',
				jump : function(e, t) {
					t || (c.page = e.curr, s.limit = e.limit, c.pullData(e.curr))
				}
			}, s.page), s.page.count = o, a.render(s.page))))
	}, I.prototype.renderTotal = function(e) {
		var t = this,
			i = t.config,
			a = {};
		if (i.totalRow) {
			layui.each(e, function(e, i) {
				0 !== i.length && t.eachCols(function(e, t) {
					var l = t.field || e,
						n = i[l];
					t.totalRow && (a[l] = (a[l] || 0) + (parseFloat(n) || 0))
				})
			});
			var l = [];
			t.eachCols(function(e, t) {
				var n = t.field || e,
					o = [ '<td data-field="' + n + '" data-key="' + i.index + "-" + t.key + '" ' + function() {
						var e = [];
						return t.align && e.push('align="' + t.align + '"'), t.style && e.push('style="' + t.style + '"'), t.minWidth && e.push('data-minwidth="' + t.minWidth + '"'), e.join(" ")
					}() + ' class="' + function() {
						var e = [];
						return t.hide && e.push(f), t.field || e.push("layui-table-col-special"), e.join(" ")
					}() + '">', '<div class="layui-table-cell laytable-cell-' + function() {
						var e = i.index + "-" + t.key;
						return "normal" === t.type ? e : e + " laytable-cell-" + t.type
					}() + '">' + function() {
						var e = t.totalRowText || "";
						return t.totalRow ? parseFloat(a[n]).toFixed(2) || e : e
					}(), "</div></td>" ].join("");
				l.push(o)
			}), t.layTotal.find("tbody").html("<tr>" + l.join("") + "</tr>")
		}
	}, I.prototype.getColElem = function(e, t) {
		var i = this,
			a = i.config;
		return e.eq(0).find(".laytable-cell-" + (a.index + "-" + t) + ":eq(0)")
	}, I.prototype.renderForm = function(e) {
		n.render(e, "LAY-table-" + this.index)
	}, I.prototype.setThisRowChecked = function(e) {
		var t = this,
			i = (t.config, "layui-table-click"),
			a = t.layBody.find('tr[data-index="' + e + '"]');
		a.addClass(i).siblings("tr").removeClass(i)
	}, I.prototype.sort = function(e, i, a, l) {
		var n,
			r,
			c = this,
			s = {},
			u = c.config,
			h = u.elem.attr("lay-filter"),
			f = d.cache[c.key];
		"string" == typeof e && c.layHeader.find("th").each(function(i, a) {
			var l = t(this),
				o = l.data("field");
			if (o === e) return e = l, n = o, !1
		});try {
			var n = n || e.data("field"),
				p = e.data("key");
			if (c.sortKey && !a && n === c.sortKey.field && i === c.sortKey.sort) return;
			var v = c.layHeader.find("th .laytable-cell-" + p).find(S);
			c.layHeader.find("th").find(S).removeAttr("lay-sort"), v.attr("lay-sort", i || null), c.layFixed.find("th")
		} catch (m) {
			return o.error("Table modules: Did not match to field")
		} c.sortKey = {
			field : n,
			sort : i
		}, u.autoSort && ("asc" === i ? r = layui.sort(f, n) : "desc" === i ? r = layui.sort(f, n, !0) : (r = layui.sort(f, d.config.indexName),
		delete c.sortKey
		)), s[u.response.dataName] = r || f, c.renderData(s, c.page, c.count, !0), l && layui.event.call(e, y, "sort(" + h + ")", {
			field : n,
			type : i
		})
	}, I.prototype.loading = function(e) {
		var i = this,
			a = i.config;
		a.loading && (e ? (i.layInit && i.layInit.remove(),
		delete i.layInit
		, i.layBox.find(b).remove()) : (i.layInit = t([ '<div class="layui-table-init">', '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', "</div>" ].join("")), i.layBox.append(i.layInit)))
	}, I.prototype.setCheckData = function(e, t) {
		var i = this,
			a = i.config,
			l = d.cache[i.key];
		l[e] && l[e].constructor !== Array && (l[e][a.checkName] = t)
	}, I.prototype.syncCheckAll = function() {
		var e = this,
			t = e.config,
			i = e.layHeader.find('input[name="layTableCheckbox"]'),
			a = function(i) {
				return e.eachCols(function(e, a) {
						"checkbox" === a.type && (a[t.checkName] = i)
					}), i
			};
		i[0] && (d.checkStatus(e.key).isAll ? (i[0].checked || (i.prop("checked", !0), e.renderForm("checkbox")), a(!0)) : (i[0].checked && (i.prop("checked", !1), e.renderForm("checkbox")), a(!1)))
	}, I.prototype.getCssRule = function(e, t) {
		var i = this,
			a = i.elem.find("style")[0],
			l = a.sheet || a.styleSheet || {},
			n = l.cssRules || l.rules;
		layui.each(n, function(i, a) {
			if (a.selectorText === ".laytable-cell-" + e) return t(a), !0
		})
	}, I.prototype.fullSize = function() {
		var e,
			t = this,
			i = t.config,
			a = i.height;
		t.fullHeightGap && (a = R.height() - t.fullHeightGap, a < 135 && (a = 135), t.elem.css("height", a)), a && (e = parseFloat(a) - (t.layHeader.outerHeight() || 38), i.toolbar && (e -= t.layTool.outerHeight() || 50), i.totalRow && (e -= t.layTotal.outerHeight() || 40), i.page && (e -= t.layPage.outerHeight() || 41), t.layMain.css("height", e - 2))
	}, I.prototype.getScrollWidth = function(e) {
		var t = 0;
		return e ? t = e.offsetWidth - e.clientWidth : (e = document.createElement("div"), e.style.width = "100px", e.style.height = "100px", e.style.overflowY = "scroll", document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), t
	}, I.prototype.scrollPatch = function() {
		var e = this,
			i = e.layMain.children("table"),
			a = e.layMain.width() - e.layMain.prop("clientWidth"),
			l = e.layMain.height() - e.layMain.prop("clientHeight"),
			n = (e.getScrollWidth(e.layMain[0]), i.outerWidth() - e.layMain.width()),
			o = function(e) {
				if (a && l) {
					if (e = e.eq(0), !e.find(".layui-table-patch")[0]) {
						var i = t('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');
						i.find("div").css({
							width : a
						}), e.find("tr").append(i)
					}
				} else e.find(".layui-table-patch").remove()
			};
		o(e.layHeader), o(e.layTotal);
		var r = e.layMain.height(),
			d = r - l;
		e.layFixed.find(k).css("height", i.height() >= d ? d : "auto"), e.layFixRight[n > 0 ? "removeClass" : "addClass"](f), e.layFixRight.css("right", a - 1)
	}, I.prototype.events = function() {
		var e,
			a = this,
			o = a.config,
			c = t("body"),
			s = {},
			u = a.layHeader.find("th"),
			h = ".layui-table-cell",
			p = o.elem.attr("lay-filter");
		a.layTool.on("click", "*[lay-event]", function(e) {
			var i = t(this),
				c = i.attr("lay-event"),
				s = function(e) {
					var l = t(e.list),
						n = t('<ul class="layui-table-tool-panel"></ul>');
					n.html(l), o.height && n.css("max-height", o.height - (a.layTool.outerHeight() || 50)), i.find(".layui-table-tool-panel")[0] || i.append(n), a.renderForm(), n.on("click", function(e) {
						layui.stope(e)
					}), e.done && e.done(n, l)
				};
			switch (layui.stope(e), F.trigger("table.tool.panel.remove"), l.close(a.tipsIndex), c) {
			case "LAYTABLE_COLS":
				s({
					list : function() {
						var e = [];
						return a.eachCols(function(t, i) {
								i.field && "normal" == i.type && e.push('<li><input type="checkbox" name="' + i.field + '" data-key="' + i.key + '" data-parentkey="' + (i.parentKey || "") + '" lay-skin="primary" ' + (i.hide ? "" : "checked") + ' title="' + (i.title || i.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>')
							}), e.join("")
					}(),
					done : function() {
						n.on("checkbox(LAY_TABLE_TOOL_COLS)", function(e) {
							var i = t(e.elem),
								l = this.checked,
								n = i.data("key"),
								r = i.data("parentkey");
							layui.each(o.cols, function(e, t) {
								layui.each(t, function(t, i) {
									if (e + "-" + t === n) {
										var d = i.hide;
										i.hide = !l, a.elem.find('*[data-key="' + o.index + "-" + n + '"]')[l ? "removeClass" : "addClass"](f), d != i.hide && a.setParentCol(!l, r), a.resize()
									}
								})
							})
						})
					}
				});
				break;case "LAYTABLE_EXPORT":
				r.ie ? l.tips("导出功能不支持 IE，请用 Chrome 等高级浏览器导出", this, {
					tips : 3
				}) : s({
					list : function() {
						return [ '<li data-type="csv">导出到 Csv 文件</li>', '<li data-type="xls">导出到 Excel 文件</li>' ].join("")
					}(),
					done : function(e, i) {
						i.on("click", function() {
							var e = t(this).data("type");
							d.exportFile(o.id, null, e)
						})
					}
				});
				break;case "LAYTABLE_PRINT":
				var u = window.open("打印窗口", "_blank"),
					h = [ "<style>", "body{font-size: 12px; color: #666;}", "table{width: 100%; border-collapse: collapse; border-spacing: 0;}", "th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}", "a{color: #666; text-decoration:none;}", "*.layui-hide{display: none}", "</style>" ].join(""),
					v = t(a.layHeader.html());
				v.append(a.layMain.find("table").html()), v.append(a.layTotal.find("table").html()), v.find("th.layui-table-patch").remove(), v.find(".layui-table-col-special").remove(), u.document.write(h + v.prop("outerHTML")), u.document.close(), u.print(), u.close()
			}
			layui.event.call(this, y, "toolbar(" + p + ")", t.extend({
				event : c,
				config : o
			}, {}))
		}), u.on("mousemove", function(e) {
			var i = t(this),
				a = i.offset().left,
				l = e.clientX - a;
			i.data("unresize") || s.resizeStart || (s.allowResize = i.width() - l <= 10, c.css("cursor", s.allowResize ? "col-resize" : ""))
		}).on("mouseleave", function() {
			t(this);s.resizeStart || c.css("cursor", "")
		}).on("mousedown", function(e) {
			var i = t(this);
			if (s.allowResize) {
				var l = i.data("key");
				e.preventDefault(), s.resizeStart = !0, s.offset = [ e.clientX, e.clientY ], a.getCssRule(l, function(e) {
					var t = e.style.width || i.outerWidth();
					s.rule = e, s.ruleWidth = parseFloat(t), s.minWidth = i.data("minwidth") || o.cellMinWidth
				})
			}
		}), F.on("mousemove", function(t) {
			if (s.resizeStart) {
				if (t.preventDefault(), s.rule) {
					var i = s.ruleWidth + t.clientX - s.offset[0];
					i < s.minWidth && (i = s.minWidth), s.rule.style.width = i + "px", l.close(a.tipsIndex)
				}
				e = 1
			}
		}).on("mouseup", function(t) {
			s.resizeStart && (s = {}, c.css("cursor", ""), a.scrollPatch()), 2 === e && (e = null)
		}), u.on("click", function(i) {
			var l,
				n = t(this),
				o = n.find(S),
				r = o.attr("lay-sort");
			return o[0] && 1 !== e ? (l = "asc" === r ? "desc" : "desc" === r ? null : "asc", void a.sort(n, l, null, !0)) : e = 2
		}).find(S + " .layui-edge ").on("click", function(e) {
			var i = t(this),
				l = i.index(),
				n = i.parents("th").eq(0).data("field");
			layui.stope(e), 0 === l ? a.sort(n, "asc", null, !0) : a.sort(n, "desc", null, !0)
		});
		var v = function(e) {
			var l = t(this),
				n = l.parents("tr").eq(0).data("index"),
				o = a.layBody.find('tr[data-index="' + n + '"]'),
				r = d.cache[a.key] || [];
			return r = r[n] || {}, t.extend({
					tr : o,
					data : d.clearCacheKey(r),
					del : function() {
						d.cache[a.key][n] = [], o.remove(), a.scrollPatch()
					},
					update : function(e) {
						e = e || {}, layui.each(e, function(e, l) {
							if (e in r) {
								var n,
									d = o.children('td[data-field="' + e + '"]');
								r[e] = l, a.eachCols(function(t, i) {
									i.field == e && i.templet && (n = i.templet)
								}), d.children(h).html(function() {
									return n ? function() {
										return "function" == typeof n ? n(r) : i(t(n).html() || l).render(r)
									}() : l
								}()), d.data("content", l)
							}
						})
					}
				}, e)
		};
		a.elem.on("click", 'input[name="layTableCheckbox"]+', function() {
			var e = t(this).prev(),
				i = a.layBody.find('input[name="layTableCheckbox"]'),
				l = e.parents("tr").eq(0).data("index"),
				n = e[0].checked,
				o = "layTableAllChoose" === e.attr("lay-filter");
			o ? (i.each(function(e, t) {
				t.checked = n, a.setCheckData(e, n)
			}), a.syncCheckAll(), a.renderForm("checkbox")) : (a.setCheckData(l, n), a.syncCheckAll()), layui.event.call(e[0], y, "checkbox(" + p + ")", v.call(e[0], {
				checked : n,
				type : o ? "all" : "one"
			}))
		}), a.elem.on("click", 'input[lay-type="layTableRadio"]+', function() {
			var e = t(this).prev(),
				i = e[0].checked,
				l = d.cache[a.key],
				n = e.parents("tr").eq(0).data("index");
			layui.each(l, function(e, t) {
				n === e ? t.LAY_CHECKED = !0 :
					delete t.LAY_CHECKED
			}), a.setThisRowChecked(n), layui.event.call(this, y, "radio(" + p + ")", v.call(this, {
				checked : i
			}))
		}), a.layBody.on("mouseenter", "tr", function() {
			var e = t(this),
				i = e.index();
			e.data("off") || a.layBody.find("tr:eq(" + i + ")").addClass(_)
		}).on("mouseleave", "tr", function() {
			var e = t(this),
				i = e.index();
			e.data("off") || a.layBody.find("tr:eq(" + i + ")").removeClass(_)
		}).on("click", "tr", function() {
			m.call(this, "row")
		}).on("dblclick", "tr", function() {
			m.call(this, "rowDouble")
		});
		var m = function(e) {
			var i = t(this);
			i.data("off") || layui.event.call(this, y, e + "(" + p + ")", v.call(i.children("td")[0]))
		};
		a.layBody.on("change", "." + W, function() {
			var e = t(this),
				i = this.value,
				l = e.parent().data("field"),
				n = e.parents("tr").eq(0).data("index"),
				o = d.cache[a.key][n];
			o[l] = i, layui.event.call(this, y, "edit(" + p + ")", v.call(this, {
				value : i,
				field : l
			}))
		}).on("blur", "." + W, function() {
			var e,
				l = t(this),
				n = this,
				o = l.parent().data("field"),
				r = l.parents("tr").eq(0).data("index"),
				c = d.cache[a.key][r];
			a.eachCols(function(t, i) {
				i.field == o && i.templet && (e = i.templet)
			}), l.siblings(h).html(function(a) {
				return e ? function() {
					return "function" == typeof e ? e(c) : i(t(e).html() || n.value).render(c)
				}() : a
			}(n.value)), l.parent().data("content", n.value), l.remove()
		}), a.layBody.on("click", "td", function(e) {
			var i = t(this),
				a = (i.data("field"), i.data("edit")),
				l = i.children(h);
			if (!i.data("off") && a) {
				var n = t('<input class="layui-input ' + W + '">');
				return n[0].value = i.data("content") || l.text(), i.find("." + W)[0] || i.append(n), n.focus(), void layui.stope(e)
			}
		}).on("mouseenter", "td", function() {
			b.call(this)
		}).on("mouseleave", "td", function() {
			b.call(this, "hide")
		});
		var g = "layui-table-grid-down",
			b = function(e) {
				var i = t(this),
					a = i.children(h);
				if (!i.data("off"))
					if (e) i.find(".layui-table-grid-down").remove();
					else if (a.prop("scrollWidth") > a.outerWidth()) {
						if (a.find("." + g)[0]) return;
						i.append('<div class="' + g + '"><i class="layui-icon layui-icon-down"></i></div>')
				}
			};
		a.layBody.on("click", "." + g, function(e) {
			var i = t(this),
				n = i.parent(),
				d = n.children(h);
			a.tipsIndex = l.tips([ '<div class="layui-table-tips-main" style="margin-top: -' + (d.height() + 16) + "px;" + function() {
				return "sm" === o.size ? "padding: 4px 15px; font-size: 12px;" : "lg" === o.size ? "padding: 14px 15px;" : ""
			}() + '">', d.html(), "</div>", '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>' ].join(""), d[0], {
				tips : [ 3, "" ],
				time : -1,
				anim : -1,
				maxWidth : r.ios || r.android ? 300 : a.elem.width() / 2,
				isOutAnim : !1,
				skin : "layui-table-tips",
				success : function(e, t) {
					e.find(".layui-table-tips-c").on("click", function() {
						l.close(t)
					})
				}
			}), layui.stope(e)
		}), a.layBody.on("click", "*[lay-event]", function() {
			var e = t(this),
				i = e.parents("tr").eq(0).data("index");
			layui.event.call(this, y, "tool(" + p + ")", v.call(this, {
				event : e.attr("lay-event")
			})), a.setThisRowChecked(i)
		}), a.layMain.on("scroll", function() {
			var e = t(this),
				i = e.scrollLeft(),
				n = e.scrollTop();
			a.layHeader.scrollLeft(i), a.layTotal.scrollLeft(i), a.layFixed.find(k).scrollTop(n), l.close(a.tipsIndex)
		}), F.on("click", function() {
			F.trigger("table.remove.tool.panel")
		}), F.on("table.remove.tool.panel", function() {
			t(".layui-table-tool-panel").remove()
		}), R.on("resize", function() {
			a.resize()
		})
	}, d.init = function(e, i) {
		i = i || {};
		var a = this,
			l = t(e ? 'table[lay-filter="' + e + '"]' : h + "[lay-data]"),
			n = "Table element property lay-data configuration item has a syntax error: ";
		return l.each(function() {
				var a = t(this),
					l = a.attr("lay-data");
				try {
					l = new Function("return " + l)()
				} catch (r) {
					o.error(n + l)
				}
				var c = [],
					s = t.extend({
						elem : this,
						cols : [],
						data : [],
						skin : a.attr("lay-skin"),
						size : a.attr("lay-size"),
						even : "string" == typeof a.attr("lay-even")
					}, d.config, i, l);
				e && a.hide(), a.find("thead>tr").each(function(e) {
					s.cols[e] = [], t(this).children().each(function(i) {
						var a = t(this),
							l = a.attr("lay-data");
						try {
							l = new Function("return " + l)()
						} catch (r) {
							return o.error(n + l)
						}
						var d = t.extend({
							title : a.text(),
							colspan : a.attr("colspan") || 0,
							rowspan : a.attr("rowspan") || 0
						}, l);
						d.colspan < 2 && c.push(d), s.cols[e].push(d)
					})
				}), a.find("tbody>tr").each(function(e) {
					var i = t(this),
						a = {};
					i.children("td").each(function(e, i) {
						var l = t(this),
							n = l.data("field");
						if (n) return a[n] = l.html()
					}), layui.each(c, function(e, t) {
						var l = i.children("td").eq(e);
						a[t.field] = l.html()
					}), s.data[e] = a
				}), d.render(s)
			}), a
	}, c.that = {}, c.config = {}, d.eachCols = function(e, i, a) {
		var l = c.config[e] || {},
			n = [],
			o = 0;
		a = t.extend(!0, [], a || l.cols), layui.each(a, function(e, t) {
			layui.each(t, function(t, i) {
				if (i.colGroup) {
					var l = 0;
					var cn = !!i.allcolspan?i.allcolspan:i.colspan;
					o++, i.CHILD_COLS = [], layui.each(a[e + 1], function(e, t) {
						t.PARENT_COL_INDEX || l > 1 && l == cn || (t.PARENT_COL_INDEX = o, i.CHILD_COLS.push(t), l += parseInt(t.colspan > 1 ? t.colspan : 1))
					})
				}
				i.PARENT_COL_INDEX || n.push(i)
			})
		});
		var r = function(e) {
			layui.each(e || n, function(e, t) {
				return t.CHILD_COLS ? r(t.CHILD_COLS) : void ("function" == typeof i && i(e, t))
			})
		};
		r()
	}, d.checkStatus = function(e) {
		var t = 0,
			i = 0,
			a = [],
			l = d.cache[e] || [];
		return layui.each(l, function(e, l) {
				return l.constructor === Array ? void i++ : void (l[d.config.checkName] && (t++, a.push(d.clearCacheKey(l))))
			}), {
				data : a,
				isAll : !!l.length && t === l.length - i
		}
	}, d.exportFile = function(e, t, i) {
		t = t || d.clearCacheKey(d.cache[e]), i = i || "csv";
		var a = c.config[e] || {},
			l = {
				csv : "text/csv",
				xls : "application/vnd.ms-excel"
			}[i],
			n = document.createElement("a");
		return r.ie ? o.error("IE_NOT_SUPPORT_EXPORTS") : (n.href = "data:" + l + ";charset=utf-8,\ufeff" + encodeURIComponent(function() {
			var i = [],
				a = [];
			return layui.each(t, function(t, l) {
					var n = [];
					"object" == typeof e ? (layui.each(e, function(e, a) {
						0 == t && i.push(a || "")
					}), layui.each(d.clearCacheKey(l), function(e, t) {
						n.push('"' + (t || "") + '"')
					})) : d.eachCols(e, function(e, a) {
						a.field && "normal" == a.type && !a.hide && (0 == t && i.push(a.title || ""), n.push('"' + u(a, l[a.field], l, "text") + '"'))
					}), a.push(n.join(","))
				}), i.join(",") + "\r\n" + a.join("\r\n")
		}()), n.download = (a.title || "table_" + (a.index || "")) + "." + i, document.body.appendChild(n), n.click(), void document.body.removeChild(n))
	}, d.resize = function(e) {
		if (e) {
			var t = s(e);
			if (!t) return;
			c.that[e].resize()
		} else layui.each(c.that, function() {
				this.resize()
			})
	}, d.reload = function(e, t) {
		var i = s(e);
		if (i) {
			var a = c.that[e];
			return a.reload(t), c.call(a)
		}
	}, d.render = function(e) {
		var t = new I(e);
		return c.call(t)
	}, d.clearCacheKey = function(e) {
		return e = t.extend({}, e),
			delete e[d.config.checkName]
			,
			delete e[d.config.indexName]
			, e
	}, d.init(), e(y, d)
});