/**
 * 扩展一个Table模块
 */
var GLOBAL_TABLE;
layui.define(['element', 'table', 'layer', 'form', 'jquery', 'laytpl'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer',

    var form = layui.form,
        table = layui.table,
        layer = layui.layer,
        $ = layui.$,
        laytpl = layui.laytpl;
    var tableSort = [];
    var defaultSortWhere = null;//默认排序条件
    var dataLength;

    /**
     * 默认配置，目前需要结合 _container_list.html一块使用
     */
    var alertHeight=0,tabTitle = 0;
    $(".alert-warning").hasClass("hide") ? alertHeight=0 : alertHeight=$(".alert-warning").outerHeight(true);
    $(".list-tab .layui-tab-title").length>0 ? tabTitle = $(".list-tab .layui-tab-title").outerHeight(true)+12 : tabTitle = 0;
    if(isChandao(window)){
    	var basicHeight = $(window).outerHeight(true) - $(".project-advanced-search").outerHeight(true) - alertHeight - tabTitle;
    }else{
    	var basicHeight = $(window).outerHeight(true) - $(".project-advanced-search").outerHeight(true) - alertHeight + 20 - tabTitle;
    }
    var DEFAULT_TABLE_CONFIG = {
        elem: '#list',
        id: "listTable",
        cellMinWidth: 95,
        toolbar: "#listToolbar",
        defaultToolbar: ['refresh','filter', 'print'],
        page: true,
        autoSort: false, //禁用前台排序
        height : ''+basicHeight+'',
        limit: 50,
        limits: [10, 15, 20, 25, 50, 100],
        request: {
            pageName: 'pageNum' // 页码的参数名称，默认：page
            , limitName: 'pageSize' // 每页数据量的参数名，默认：limit
        },
        response: {
            statusCode: 1 // 规定成功的状态码，默认：0
        },
        parseData: function (res) { // res 即为原始返回的数据
            return {
                "code": res.code, // 解析接口状态
                "message": res.message, // 解析提示文本
                "count": res.data.total, // 解析数据长度
                "data": res.data.rows // 解析数据列表
            };
        },
        done: function (res, curr, count) {
            //解决当没有数据的时候表头显示不全的问题
            res.data.length || this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow', 'auto');
         	//解决表格小于两条数据且有右侧冻结列时操作提示遮挡问题
            var elem = this.elem;
        }
    };
    
	//固定列行高和table行高一致
    function initTD(elem){
      	//固定列行高和table行高一致
        elem.next('.layui-table-view').find(".layui-table-main tr").each(function (index ,val) {
        	elem.next('.layui-table-view').find(".layui-table-fixed").each(function () {
				$($(this).find(".layui-table-body tbody tr")[index]).height($(val).height());
			});
		});
        elem.next('.layui-table-view').find(".layui-table-header tr").each(function (index ,val) {
        	elem.next('.layui-table-view').find(".layui-table-fixed").each(function () {
				if (index !== 0){
                    $($(this).find(".layui-table-header thead tr")[index]).height($(val).height());
                }
			});
		});
    }
    
    var myTable = {
        /**
         * layui table 对象
         */
        tableIns: null,
        
        tableUrls: '',

        /**
         * 最近一次查询备份
         */
        backWhere: {},

        /**
         * 列表渲染 添加默认配置支持
         */
        render(options,tableUrls) {
            myTable.tableIns = table.render(Object.assign({}, DEFAULT_TABLE_CONFIG, options));
            myTable.tableUrls = tableUrls;
            if(!GLOBAL_TABLE)GLOBAL_TABLE=myTable.tableIns;
            return myTable;
        },

        /**
         * 获取选中行
         */
        getSelectAll() {
            return table.checkStatus('listTable');
        },
        getSortCondition(index){
        	 return tableSort[index];
        },
        /**
         * 获取排序
         */
        getSort(tag){
        	postUrl=`${SYS_CFG.ctxPath}/sort/getBy?tag=`+tag
        	 $.get(postUrl, function(res){
            	 if(res.code === 1){
            		 if(res.data.length>0){
            			 tableSort = [];
            			 defaultSortWhere =null;
            			 $("#sort").css("visibility","visible");
            			 var $div = $("#sort");
            			 $div.append('<label class="sort-label">排序:</label>');
            			 for(var i=0;i<res.data.length;i++){
            				 var item =  res.data[i];
            				if(item.tip==null&&item.showName=="默认(不显示)"){
            					$div.append('<a  style="display: none" class="layui-btn basic-btn search_btn sort-btn"><span>'+item.showName+'</span><i class="iconfont icon-guanjiaowangtubiao34"></i></a>');
            					defaultSortWhere = item.sortSql
            				}else{
            					$div.append('<a class="layui-btn basic-btn search_btn sort-btn" index = "'+i+'"  title="'+item.tip+'"><span>'+item.showName+'</span><i class="iconfont icon-guanjiaowangtubiao34"></i></a>');
            					tableSort.push(item.sortSql);
            				}
            			 }
            		 }
            	 }
             });
        },

        /**
         * 列表查询
         */
        query(options) {
            myTable.backWhere = Object.assign({}, options);
            myTable.tableIns.reload({
            	url: myTable.tableUrls,
                where: myTable.backWhere
                , page: {
                    curr: 1 // 重新从第 1 页开始
                }
                ,done: function (res, curr, count) {
                 	//解决表格小于两条数据且有右侧冻结列时操作提示遮挡问题
                    dataLength  = res.data.length
                 	res.data.length<=3 && this.elem.next('.layui-table-view').find(".layui-table-fixed-r").not(".layui-hide") ? this.elem.next('.layui-table-view').find(".layui-table-main").addClass("main-visible") : "";
                 	var elem = this.elem;
                 	res.data.forEach(function (item, index) {//排序后渲染效果
                 		if (item.overTime) {
                 			 //延期数据行背景改为红色
                 			var tr = elem.next('.layui-table-view').find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#fff7f7").css("color", "black").addClass('timeout');
                 			elem.next('.layui-table-view').find(".layui-table-box tbody tr[data-index='" + index + "'] .laytable-cell-checkbox").prepend('<div class="delay-tip" title="'+item.overTimeDetails+'"><i class="iconfont icon-gantanhao"></i></div>');
                 		 }
                 	});
                    var $tableView = $("table+.layui-table-view");
                    var viewHeight;
                 	//无数据时显示无数据相关提示
                 	if(res.data.length===0){
                 		 var tr = this.elem.next('.layui-table-view').children('.layui-table-box').children('.layui-table-header').find('tr:first');
        	        	/* var th0=tr.children().eq(0);
        	        	 var th1=tr.children().eq(1);
        	        	 th0.find('div').hide();
        	        	 th0.css('border-right-width','0px');
        	        	 th1.css('border-left-width','0px');
        	        	 th1.find('div').css('text-align','left');*/
                 		
                 		
                        viewHeight = parseInt($tableView.css("height").replace("px",''));
                        headerHeignt = viewHeight - parseInt($tableView.find(".layui-table").css("height").replace("px",''));
                        $tableView.find(".layui-table-header").css("height",headerHeignt)
                     	//解决当没有数据的时候表头显示不全的问题
                 		this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow', 'auto');
                 		elem.siblings(".notData-mt").show();
                 		elem.siblings('.layui-border-box').find('.layui-table-box').find('.layui-table-body').find('div').hide();
                 	}else{
                 		this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow', 'hidden');
                 		elem.siblings(".notData-mt").hide();
                 	}
                }
            });
        },
        /**
         * 列表刷新
         */
        refresh(where) {
            myTable.query(myTable.backWhere);
        },

        /**
         * 传递layui table on事件注册
         */
        on(selector, callback) {
            table.on(selector, callback);
        },

        /**
         * 高级查询扩展
         */
        advSearch: function (defaultQuery) {
            return defaultQuery.field;
        },

        /**
         * 打开新增
         *    objId表示新增对象所属对象（客户，供应商）
         */
        openAdd: function (objId) {
            var url = `${SYS_CFG.ctxPath}/${Entity.tag}/add`;
            if (!!objId) {
                url += `?objId=${objId}`;
            }
            var title = '新增' + Entity.name;

            openWin(title, url);
        },
        /**
         * 打开新增页面
         *    objId表示新增对象所属对象（客户，供应商）
         */
        openViewAdd: function (objId) {
            var url = `${SYS_CFG.ctxPath}/${Entity.tag}/viewAdd`;
            if (!!objId) {
                url += `?objId=${objId}`;
            }
            var title = '新增' + Entity.name;

            openWin(title, url);
        },

        /**
         * 打开编辑
         *    objId表示编辑对象所属对象（客户，供应商）
         */
        openMod: function (id, objId) {
            var url = `${SYS_CFG.ctxPath}/${Entity.tag}/viewAdd?id=${id}`;
            if (!!objId) {
                url += `&objId=${objId}`;
            }
            var title = '编辑' + Entity.name;

            openWin(title, url/*, function(layero, index){
	    		layer.close(index);
	    	}*/);
        },
        
        /**
         * 打开自定义窗口
         *  @param isSmall 是否打开小弹窗
         */
        openCustomer: function (option,isSmall) {
        	if(!isSmall){
        		openWin(option.title,option.url,option.success,option.area);
        	}else{
        		openSmallWindow(option.title,option.url,option.success);
        	}
            
        },
        /**
         * 根据Id删除数据
         */
        delByIds: function (ids,confirmMess) {
        	debugger;
        	if(!confirmMess){
        		confirmMess = '确认要删除当前' + Entity.name + '对象吗？';
        	}
            layer.confirm(
        		confirmMess,
                {icon: 3, title: '提示'},
                function (index) {
                	var indexMsg = topWin(window).layer.msg('数据提交中，请稍后',{icon: 16,time:false,shade:0.8});
                	
                    $.post(`${SYS_CFG.ctxPath}/${Entity.tag}/del`, {
                        ids: ids.join(',')  // 将需要删除的newsId作为参数传入
                    }, function (data) {
                    	topWin(window).layer.msg(data.message);
                    	topWin(window).layer.close(indexMsg);
                    	
                        myTable.tableIns.reload({
                            where: myTable.backWhere
                            , page: {
                                curr: 1 // 重新从第 1 页开始
                            }
                            ,done: function (res, curr, count) {
                            	var that = this.elem.next();
                                res.data.forEach(function (item, index) {
                                	 if (item.overTime) {
                                		 //延期数据行背景改为红色
                                		 var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#fff7f7").css("color", "black").addClass('timeout');
                                		 that.find(".layui-table-box tbody tr[data-index='" + index + "'] .laytable-cell-checkbox").prepend('<div class="delay-tip" title="'+item.overTimeDetails+'"><i class="iconfont icon-gantanhao"></i></div>');
                                	 } 
                                });
                             	//解决表格小于两条数据且有右侧冻结列时操作提示遮挡问题
                             	res.data.length<=3 && this.elem.next('.layui-table-view').find(".layui-table-fixed-r").not(".layui-hide") ? this.elem.next('.layui-table-view').find(".layui-table-main").addClass("main-visible") : "";
                             	
                            }
                        });
                        layer.close(index);
                    });
                });
        }

    };
	myTable.getSort(`${Entity.tag}`);
	/**
	 * 自定义排序事件
	 */
	 $(document).on('click', '.sort-btn', function () {
		 $(this).toggleClass("active").siblings(".sort-btn").removeClass("active");//修改排序按钮选中状态
		 var isSort = $(this).hasClass("active");//判断排序按钮是否选中
		 if(isSort){
			 var index = $(this).attr("index");
			 myTable.backWhere.sort=tableSort[index];
			 myTable.backWhere.order=" ";
		     myTable.refresh(myTable.backWhere);
		 }else{
			 if(defaultSortWhere!=null){
				 myTable.backWhere.sort=defaultSortWhere;
			 }else{
				 myTable.backWhere.sort="";
			 }
			 myTable.backWhere.order=" ";
			 myTable.refresh(myTable.backWhere);
		 }
		 
		
	   
	 });
    /**
     * 初始化列表默认刷新事件
     */
    $(document).on('click', '.my-table-refresh', function () {
        myTable.refresh(myTable.backWhere);
    });
    /**
     * 日期选择
     */
    $(document).on('change', '#fastday', function () {
    	var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');
        var queryParams = {};
        queryParams[name] = value;
        myTable.query(queryParams);
    });

    /**
     * 初始化快速查询
     */
    $(document).on('click', '.fastsearchBtn', function () {
        var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');

        var queryParams = {};
        queryParams[name] = value;

        myTable.query(queryParams);
    });

    /**
     * 快速搜索添加回城监听
     */
    $(document).on('keypress', ".fastsearchInput", function (event) {
        if (event.keyCode == 13) {
            var value = $('.fastsearchInput').val();
            var name = $('.fastsearchInput').attr('name');
            var queryParams = {};
            queryParams[name] = value;

            myTable.query(queryParams);
            resize(); //重新渲染表格
            event.stopPropagation();
            return false;
        }
    });

    /**
     * 高级查询
     */
    $("#advancedSearch").on("click", function () {
        $(this).toggleClass("active");
        $(".advanced-search-card").toggleClass("layui-hide suspension");
        tableHeight();
    });
    
    /**
     * 高级搜索是否悬浮
     */
    form.on('switch(advancedSearchSwitchPosition)', function (data) {
        if (data.elem.checked) {
            $(".advanced-search-card").addClass("suspension suspension-active");
        } else {
            $(".advanced-search-card").removeClass("suspension suspension-active");
        }
        resize();
    });
    
    /*高级查询区域默认显示两行，展开显示全部    */
    function initSearch(){
	  $(".advancedSearchForm .layui-card-body").append('<div class="search-item show-items"></div><div class="search-item hide-items" style="display:none"></div>');
	    var colTotal = 0;
	    $("[class*=layui-col]").each(function(){
	    	var colNum = parseInt($(this).attr("class").match(/[0-9]+/));
	    	colTotal = colTotal + colNum;
	    	if(colTotal>24){
	    		$(".advancedSearchForm .hide-items").append($(this));
	    	}else{
	    		$(".advancedSearchForm .show-items").append($(this));
	    	}
	    })
	    
	    /*如果行数不到三行，则展开显示全部按钮隐藏  */
	    if($(".advancedSearchForm .hide-items").children().length==0){
	    	$(".unfold-btn").hide();
	    }
	   
	    $(".unfold-btn").on("click",function(){
	    	$(this).toggleClass("active");
	        $(".hide-items").toggle();
	        $(this).hasClass("active") ? $(this).children("span").html("收起") : $(this).children("span").html("更多");
	        tableHeight();
	    })
    }
    initSearch();

    /**
     * 重置表格高度且渲染表格
     */
    function resize() {
        var windowHeight = $(window).outerHeight(true),
            searchHeight = $(".project-advanced-search").outerHeight(true),
            testHeigt = 0,
            tabTitle = 0,
            alertHeight = 0;
        $(".project-advanced-search .pas-content").hasClass("suspension") ? testHeigt = searchHeight : testHeigt = searchHeight;
        $(".alert-warning").hasClass("hide") ? alertHeight=0 : alertHeight=$(".alert-warning").outerHeight(true);
        $(".list-tab .layui-tab-title").length>0 ? tabTitle = $(".list-tab .layui-tab-title").outerHeight(true)+12 : tabTitle = 0;
        var tableHeight = windowHeight - testHeigt - alertHeight - tabTitle;
        $(".table-list").outerHeight(tableHeight);
        if(isChandao(window)){
        	table.reload('listTable', {
                height: tableHeight
            });
        }else{
        	table.reload('listTable', {
                height: tableHeight + 20
            });
        }
    }
    
    /**
     * 重置表格高度不渲染表格
     */
    var searchFlag = true,searchHeight=0,viewHeight,mianHeight,fixBodyHeight,headerHeignt,cardHeignt;
    function tableHeight(){
        
    	var $tableView = $("table+.layui-table-view");
        if(!!searchFlag){
        	/*得到第一次渲染的表格相关标签高度值*/
        	viewHeight = parseInt($tableView.css("height").replace("px",''));
            mianHeight = parseInt($tableView.find(".layui-table-main").css("height").replace("px",''));
            fixBodyHeight = parseInt($tableView.find(".layui-table-fixed .layui-table-body").css("height").replace("px",''));
            headerHeignt = mianHeight - parseInt($tableView.find(".layui-table").css("height").replace("px",''));
            cardHeignt = parseInt($(".clearfix").css("height"));
            $tableView.find(".layui-table-header").css("height",headerHeignt)
        }
        
        $(".advanced-search-card").hasClass("layui-hide") ? searchHeight = 0 : searchHeight = parseInt($(".advanced-search-card").outerHeight(true));
    	searchFlag = false;
    	
    	 // 再次搜索表格没有出现滚动条的情况
    	 fixBodyHeight2 = parseInt($tableView.find(".layui-table-fixed .layui-table-body .layui-table").css("height").replace("px",''));
    	
        // 判断未点击展开前表格是否出现滚动条 	 
    	if($tableView.find(".layui-table-main .layui-table").outerHeight(true)>mianHeight){
    		initHeight(viewHeight-searchHeight,mianHeight-searchHeight,fixBodyHeight-searchHeight);
    	}else{
             // 点击展开后在进行判断是否出现滚动条    		
            if(fixBodyHeight2>mianHeight-searchHeight){
            	initHeight(viewHeight-searchHeight,mianHeight-searchHeight,mianHeight-searchHeight-10);
            	$(".layui-table-fixed-r").css("right","9px");
                $(".layui-table-box>.layui-table-header tr").append('<th class="layui-table-patch"><div class="layui-table-cell" style="width: 10px;"></div></th>');
    		}else{
    			initHeight(viewHeight-searchHeight,mianHeight-searchHeight,fixBodyHeight2);
    			$(".layui-table-fixed-r").css("right","-1px");
    			$(".layui-table-box>.layui-table-header tr .layui-table-patch").remove();
    		}
    	}
        
        /*重新计算表格高度*/
        function initHeight(viewHeight,mianHeight,fixBodyHeight){
        	$tableView.css("height",viewHeight);
        	$tableView.find(".layui-table-main").css("height",mianHeight);
        	$tableView.find(".layui-table-fixed .layui-table-body").css("height",fixBodyHeight);
            if (dataLength == undefined || dataLength == 0){
                headerHeignt = viewHeight - parseInt($tableView.find(".layui-table").css("height").replace("px",''));
                $tableView.find(".layui-table-header").css("height",headerHeignt)
            }
        }
    }
    
    
   /*左侧导航二级及以上菜单点击其他地方消失效果*/
    $('body').click(function(e) {
		var target = $(e.target);
		if (isChandao(window)) {
			if(!$(window.document).find(".layui-nav-parent").length==0){
				$(window.document).find(".layui-nav-parent .nav-child-close").click();
			}
		}else{
			if(!$(window.parent.document).find(".layui-nav-parent").length==0){
				$(window.parent.document).find(".layui-nav-parent .nav-child-close").click();
			}
		}
		
	});
    
    /*警告消息弹窗关闭*/
    $(".alert-warning .alert-close").on("click",function(){
    	$(this).closest(".alert-warning").addClass("hide");
    	resize();
    })

    /**
     * 高级查询按钮
     */
    form.on("submit(advancedSearchSubmit)", function (data) {
        var queryParams = myTable.advSearch(data);
        var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');
        queryParams[name] = value;
        myTable.query(queryParams);
        
        resize(); //重置表格高度
        return false;
    });
    /**
     * 清空按钮
     */
    form.on("submit(advancedSearchReset)", function (data) {
    	var queryParams={};
    	$('form.advancedSearchForm')[0].reset();
        $("form:hidden").val("");//清空隐藏域的值
        $('.fastsearchInput').val(null);
        var name = $('.fastsearchInput').attr('name');
        queryParams[name] = null;
    	$.each(myTable.advSearch(data),function(key,values){
    		queryParams[key]=null;
    	});
    	myTable.query(queryParams);
    	resize();
    	return false;
    });
    /**
     * 重置按钮
     */
    form.on("submit(advancedSearchHide)", function (data) {
    	var queryParams={};
    	$('form.advancedSearchForm')[0].reset();
    	$("form:hidden").val("");//清空隐藏域的值
        $('.fastsearchInput').val(null);
        var name = $('.fastsearchInput').attr('name');
        queryParams[name] = null;
    	$.each(myTable.advSearch(data),function(key,values){
    		queryParams[key]=null;
    	});
    	myTable.query(queryParams);
    	resize();
    	return false;
    });


    /**
     * openWin
     */
    function openWin(title, url, success, area) {

        var topLayer = topWin(window).layui.layer;
        
        return topLayer.open({
            title: title,
            type: 2,
            area: typeof(area)==="undefined" ? ['80%', '80%'] : area, 
            content: url,
            yes: function (layero, index) {
                myTable.refresh();
            },
            success: function (layero, index) {
            	if (!!layero.find("iframe")[0].contentWindow.initConfig) 
            		layero.find("iframe")[0].contentWindow.initConfig(myTable);
                if (success) {
                    success(layero, index);
                }
            }
        });
    }
    
    /**
     * 打开小的页面弹窗
     * @param title 标题
     * @param url 页面地址
     * @param success 成功毁掉方法
     * @returns
     */
    function openSmallWindow(title, url, success) {
        var topLayer = topWin(window).layui.layer;
        return topLayer.open({
            title: title,
            type: 2,
            area: ['50%', '40%'],
            content: url,
            yes: function (layero, index) {
                myTable.refresh();
            },
            success: function (layero, index) {
            	if (!!layero.find("iframe")[0].contentWindow.initConfig) 
            		layero.find("iframe")[0].contentWindow.initConfig(myTable);
                if (success) {
                    success(layero, index);
                }
            }
        });
    }
    /**
     * 渲染自定义toolbar
     */

    var toolbar = document.getElementById('toolbar');
    if (toolbar) {
        var toolbarHtml = toolbar.innerHTML,
            toolbarView = document.getElementById('toolbarView');

        laytpl(toolbarHtml).render({}, function (html) {
            toolbarView.innerHTML = html;
        });
    }

    /**
     * 监听排序事件
     */

    myTable.on('sort(list)', function (obj) {
        let options = {sort: obj.field, order: obj.type}
        myTable.query(options);
        resize();
		setTimeout(function () {
		   initTD($("#list"));
		}, 500);
    })


    // 输出test接口
    exports('noInitTable', myTable);
});
//是否是禅道嵌套
function isChandao(win){
try{
		var host = win.top.document.location.host;
	}catch(err){
		console.log(err);
		return true;
	}
    return false;
}
function topWin(win, i = 1) {
	try{
		
		var host = win.document.location.host;
		var parentHost = win.parent.document.location.host;
		if(host != parentHost){
			return win;
		}
		if (i<=5){
			i++;
			return topWin(win.parent, i);
		}
		
	}catch(err){
		console.log(err);
		return win;
	}
    return win;
};