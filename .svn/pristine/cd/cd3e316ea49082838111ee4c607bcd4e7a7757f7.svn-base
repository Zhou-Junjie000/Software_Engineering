layui.define(['layer','jquery'], function(exports) { 
	var DEFAULT_PARAM = {
			el:'', // 选取元素
			isClick:false, // 是否点击筛选
			data:[], // 点击筛选下拉选项
			defaultValue:'', // 筛选下拉选项默认值
			isSearch:false, // 是否搜索筛选
			url:'',  // 搜索筛选url
			method:'get', // 搜索筛选请求类型
			searchName:'name', // 搜索筛选查询的字段名称
			isSelectOne:false,//搜索筛选只有一个值是否默认选中
			callback:''
	}
	
	var inputValue = {
		init:function(options){
			var param = Object.assign({}, DEFAULT_PARAM, options);
			param.uuid = this.uuid()
			param.elShow = param.el.next();
			
			if(param.defaultValue !=''){
				param.el.val(param.defaultValue["key"]);
				param.elShow.val(param.defaultValue["value"])
			}

			if(param.isClick){
				this.clickAction(param);
			}else if(param.isSearch){
				this.searchAction(param);
			}
			
	        // 点击其他地方下拉内容消失
            $('body').on("click",function (e) {
                var target = $(e.target);
                if (!target.hasClass("custom-selected") && !target.parent().hasClass("custom-select-ul")) {
                	$(".custom-selected").removeClass("custom-selected");
                    $(".custom-select-ul").removeClass("layui-show");
                }
            });	
            
            
            // 下拉菜单选择
            $("body").on("click", "."+param.uuid+" li", function () {            	
            	var $selectTitle = param.elShow.parent().find(".custom-selected");
            	
                $(this).addClass("layui-this").siblings("li").removeClass("layui-this");
                $(this).closest(".custom-select-ul").removeClass("layui-show");
                
                $selectTitle.val($(this).html())
                $selectTitle.prev().val($(this).attr("value"));
                
                $selectTitle.removeClass("custom-selected");
                $selectTitle.parent().removeClass("custom-selected"); //控制箭头方向
                                
                if(param.callback!=''){
                	param.callback($selectTitle);
                }
            })
		},
		
		// 点击触发事件
		clickAction:function(param){
			var el = param.elShow;
			el.click(function () {
				var $selectHtml = '<ul class="layui-anim layui-anim-upbit custom-select-ul '+ param.uuid +'" style="overflow-y:scroll;">';

				if(param.data.length!=0){
					var i;
					for(i in param.data){						
						$selectHtml += '<li value='+param.data[i]["key"]+'>' + param.data[i]["value"] + '</li>';
					}
					$selectHtml+='</ul>';
				}
				
                // 先将所有状态置成初始化状态
                $(".custom-select-ul").remove();
                $(this).closest("tr").siblings().find(el).removeClass("custom-selected");
                
                var newPos = $(this).offset(),
                    $selectUl,
                    inputVal = $(this).val();

                $(this).parent().toggleClass("custom-selected"); // 控制箭头方向

                $(this).toggleClass("custom-selected");
                if ($(this).hasClass("custom-selected")) {
                    $(this).closest("body").append($selectHtml);
                    $selectUl = $(".custom-select-ul");
                    $selectUl.toggleClass("layui-show");
                }else{
                	return;
                }

                // 筛选出当前选中菜单
                $selectUl.children("li").each(function () {
                    $(this).html() == inputVal ? $(this).addClass("layui-this") : "";
                })

                $selectUl.width($(this).outerWidth(true));
                newPos.top = newPos.top + $(this).height() * 2 - 8
                $selectUl.offset(newPos);
            });
		},
		
		// 搜索触发事件
		searchAction:function(param){
			var el = param.elShow;
			el.on('input',function(e){
                var $this=$(this);
				var m = $this.val();
				// 延时搜索
				setTimeout(function () {
					var n = $this.val();
					if(n == "" || m != n){
						$(".custom-select-ul").remove();
						$this.closest("tr").siblings().find(el).removeClass("custom-selected");
						
						return;
					}
					
		    		$.ajax({
						url: param.url,
						type: param.method,
						data:{
							searchName: param.searchName,
							searchValue : $this.val()
						},
						success : function(result){
							var code = result.code;
							if(code != 1){
								return;
							}
							var data = result.data;
							if(data.length != 0){	
								// 只查到一条记录，配置了默认选择
								if(data.length == 1 && param.isSelectOne == true){
					                $this.val(data[0]["value"]);
					                $this.prev().val(data[0]["key"]);
					                if(param.callback!=''){
					                	param.callback($this);
					                }
									return;
								}
								
								// 查到多条记录显示下拉框
								var $selectHtml = '<ul class="layui-anim layui-anim-upbit custom-select-ul '+ param.uuid +'" style="overflow-y:scroll;">';
								var i;
								for(i in data){	
									$selectHtml += '<li value='+data[i]["key"]+'>' + data[i]["value"] + '</li>';
								}
								$selectHtml+='</ul>';
								
								// 先将所有状态置成初始化状态
								$(".custom-select-ul").remove();
								$this.closest("tr").siblings().find(el).removeClass("custom-selected");
								
								var newPos = $this.offset(),
									    $selectUl,
									    inputVal = $this.children("input").val();
									
								$this.toggleClass("custom-selected");
		                        $this.closest("body").append($selectHtml);
		                        $selectUl = $(".custom-select-ul");
		                        $selectUl.toggleClass("layui-show");
	                            $selectUl.width($this.outerWidth(true));
	                            newPos.top = newPos.top + $this.height() * 2 - 8
	                            $selectUl.offset(newPos);
							}    
						}
		    		});	
				}, 1000);
			});     
		},
		
		uuid:function () {
		    var s = [];
		    var hexDigits = "0123456789abcdef";
		    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
		    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		    s[8] = s[13] = s[18] = s[23] = "-";
		 
		    var uuid = s.join("");
		    return uuid;
		}
	}
	exports('inputValue', inputValue);
});