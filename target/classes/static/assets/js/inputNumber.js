layui.define(['form', 'jquery'], function (exports) {
	//提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var jQuery = layui.jquery,
		$ = jQuery,
		form = layui.form,
		_MOD = 'inputNumber',
		InputNumber = function () {
			this.v = '1.0.0';
	};
	
	/*
	 * 基于jquery 封装适合与layui 的inputnumber
	 * 
	 * // 自定义类型：参数为数组，可多条数据
		alignmentFns.createType([{"test": {"step" : 10, "min" : 10, "max" : 999, "digit" : 0}}]);
		
		// 初始化
		alignmentFns.initialize();
		
		// 销毁
		alignmentFns.destroy();
		
		// js动态改变数据
		$("#4").attr("data-max", "12")
		// 初始化
		alignmentFns.initialize();
	 */
	InputNumber.prototype.render = function (options) {
		  
		var alignmentFns = {
				inputs: [],
				init: function(input, step, max, min, digit) {
					var _this = this;
					input.attr("readonly", "readonly");
					input.wrap("<div id = '" + input.attr('id') + "div'></div>");
					input.before("<div id = '" + input.attr('id') + "l'  onselectstart = 'return false;' class='num-reduce'>-</div>");
					input.after("<div id = '" + input.attr('id') + "r'  onselectstart = 'return false;'  class='num-increase'> + </div>");
					$("#" + input.attr('id') + "l").click(function() {
						_this.execute(input, step, max, min, digit, true);
					});
					$("#" + input.attr('id') + "r").click(function() {
						_this.execute(input, step, max, min, digit, false);
					});
					input.attr("onkeyup","this.value=this.value.replace(/[^\\d\\.]/g,\'\')");//onkeyup="this.value=this.value.replace(/[^\\d\\.]/g,\'\')"
				},
				execute: function(input, step, max, min, digit, _do) {
					var val = parseFloat(this.format(input.val(), digit));
					var ori = val;
					if (_do) val -= step;
					if (!_do) val += step;
					if (val < min) {
						val = min;
					} else if (val > max) {
						val = max;
					}
					input.val(this.format(val, digit)).change();
				},
				format: function(val, digit) {
					if (isNaN(val)) {
						val = 0;
					}
					return parseFloat(val).toFixed(digit);
				},
				data: {
					default_data: {
						"step": 0.1,
						"min": 0,
						"max": 99,
						"digit": 1
					}
				},
				initialize: function() {
					var inputs = $("input[user_data], input[data-digit], input[data-step], input[data-min], input[data-max], input.alignment");
					inputs.each(function() {
						alignmentFns.inputs.push(this.outerHTML);
						var data = alignmentFns.data;
						var user_data = eval("data." + $(this).attr("user_data"));
						if (user_data == null) {
							user_data = JSON.parse(JSON.stringify(data.default_data));
						}
						var digit = $(this).data("digit");
						if (digit != null && !isNaN(parseFloat(digit))) {
							digit = parseFloat(digit).toFixed(0);
							user_data.digit = parseFloat(digit);
						}
						var step = $(this).data("step");
						if (step != null && !isNaN(parseFloat(step))) {
							user_data.step = parseFloat(step);
						}
						var min = $(this).data("min");
						if (min != null && !isNaN(parseFloat(min))) {
							user_data.min = parseFloat(min);
						}
						var max = $(this).data("max");
						if (max != null && !isNaN(parseFloat(max))) {
							user_data.max = parseFloat(max);
						}
						alignmentFns.init($(this), user_data.step, user_data.max, user_data.min, user_data.digit);
						var data_edit = $(this).data("edit");
						if (data_edit) {
							$(this).attr("readonly", null);
						}
					});
				},
				destroy: function() {
					var inputs = this.inputs;
					$.each(inputs,
							function(index, obj) {
						var input = $(obj)[0];
						var id = input.id;
						$("#" + id + "div").replaceWith(input);
					});
				},
				createType: function(types) {
					$.each(types,
							function(index, obj) {
						alignmentFns.data[obj.type] = obj.data;
					});
				}
		};
		alignmentFns.initialize();
	};
	//输出接口
	var mod = new InputNumber();
	exports(_MOD, mod);
});    