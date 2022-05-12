/**
 * 扩展一个Table模块
 * 	用于多表格，需要点击查询按钮再执行查询，以及由复选框控制查询的表格
 * 	默认列表是listTable1
 * 	其他的按照listTable2,listTable3...顺序递增
 */
var GLOBAL_TABLE;
layui.define(['element', 'table', 'layer', 'form', 'jquery', 'laytpl','dropdown'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer',

    var form = layui.form,
        table = layui.table,
        layer = layui.layer,
        $ = layui.$,
        dropdown = layui.dropdown,
        laytpl = layui.laytpl;
    var tableSort = [];
    var defaultSortWhere = null;//默认排序条件
    var flagMerge = true;
    var flagHideNull = true;

    /**
     * 默认配置，目前需要结合 _container_list_multiTable.html一块使用
     */
    var alertHeight=0,tabTitle = 0;
    $(".alert-warning").hasClass("hide") ? alertHeight=0 : alertHeight=$(".alert-warning").outerHeight(true);
    $(".list-tab .layui-tab-title").length>0 ? tabTitle = $(".list-tab .layui-tab-title").outerHeight(true)+12 : tabTitle = 0;
    $("#contractFilter").length>0 ? contractFilterHeight = $("#contractFilter").outerHeight(true)+5 : contractFilterHeight = 0;
    if(isChandao(window)){
    	var basicHeight = $(window).outerHeight(true) - $(".project-advanced-search").outerHeight(true) - alertHeight - tabTitle - contractFilterHeight;
    }else{
    	var basicHeight = $(window).outerHeight(true) - $(".project-advanced-search").outerHeight(true) - alertHeight + 20 - tabTitle - contractFilterHeight;
    }
    if( $('.line-after-span').text() == '数据维护' && document.body.clientWidth <= 1456){
    	basicHeight = basicHeight - 30;
    }
    var DEFAULT_TABLE_CONFIG = {
        elem: '#listTable1',
        url: `${SYS_CFG.ctxPath}/${Entity.tag}/page`,
        id: "listTable1",
        cellMinWidth: 95,
        toolbar: "#listToolbar",
        defaultToolbar: ['refresh','filter', 'print'],
        page: true,
        //autoSort: false, //禁用前台排序
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
       /*  	setTimeout(function(){
         		res.data.length<=3 && !elem.next('.layui-table-view').find(".layui-table-fixed-r.layui-hide") ? elem.next('.layui-table-view').find(".layui-table-main").addClass("main-visible") : "";
         	},300)*/
          /*  initTD(elem);
    		//表格样式紧凑和正常模式切换
		    form.on('switch(switchLayout)', function(data){
              if(this.checked){
            	 elem.addClass("compact-table");
              }else{
            	 elem.removeClass("compact-table");
			  }
              resize();
              initTD(elem);
		    });*/
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
				$($(this).find(".layui-table-header thead tr")[index]).height($(val).height());
			});
		});
    }
    
    var multiTable = {
        /**
         * layui table 对象
         */
        tableIns: null,
        
        /**
         * 	多表格的时候所有表格的url
         */
        tableUrls: null,
        
        /**
         * 最近一次查询备份
         */
        backWhere: {},
        /**
         * 查询、重置、清除按钮查询条件
         */
        initWhere: {},

        /**
         * 列表渲染 添加默认配置支持
         */
        render(options, tableUrls) {
            multiTable.tableIns = table.render(Object.assign({}, DEFAULT_TABLE_CONFIG, options));
            multiTable.tableUrls = tableUrls;
            if(!GLOBAL_TABLE)GLOBAL_TABLE=multiTable.tableIns;
            return multiTable;
        },

        /**
         * 获取选中行
         */
        getSelectAll() {
            return table.checkStatus('listTable1');
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
            multiTable.backWhere = Object.assign({}, options);
            multiTable.tableIns.reload({
                url: multiTable.tableUrls["listTable1"].url,
                where: multiTable.backWhere
                , page: {
                    curr: 1 // 重新从第 1 页开始
                }
                ,done: function (res, curr, count) {
                 	//解决表格小于两条数据且有右侧冻结列时操作提示遮挡问题
                 	res.data.length<=3 && this.elem.next('.layui-table-view').find(".layui-table-fixed-r").not(".layui-hide") ? this.elem.next('.layui-table-view').find(".layui-table-main").addClass("main-visible") : "";
                 	var elem = this.elem;
                 	res.data.forEach(function (item, index) {//排序后渲染效果
                 		if (item.overTime) {
                 			 //延期数据行背景改为红色
                 			var tr = elem.next('.layui-table-view').find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#fff7f7").css("color", "black").addClass('timeout');
                 			elem.next('.layui-table-view').find(".layui-table-box tbody tr[data-index='" + index + "'] .laytable-cell-checkbox").prepend('<div class="delay-tip" title="'+item.overTimeDetails+'"><i class="iconfont icon-gantanhao"></i></div>');
                 		 }
                 	});
                 	
                 	//无数据时显示无数据相关提示
                 	if(res.data.length===0){
                     	//解决当没有数据的时候表头显示不全的问题
                 		this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow-x', 'auto');
                 		elem.siblings(".notData-mt").show();
                 	}else{
                 		this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow-x', 'hidden');
                 		elem.siblings(".notData-mt").hide();
                 	}
                 	//显示总行数
        	        $("ul.layui-tab-title li.listTable1 span.title-num").html("("+(!!res.count?res.count:"0")+")");
        	        
        	        /*
        	         * 判断是否显示头部纵向滚动条
        	         * */
        	       let dom = $('.demandTrack').next('.layui-table-view')
        	       if(dom.find(".layui-table-main").height() < dom.find(".layui-table-main .layui-table").height()){
        	    	   dom.find(".layui-table-box > .layui-table-header").css({
        	    		   'overflow-y':'auto'
        	    	   })
        	       }else{
        	    	   dom.find(".layui-table-box > .layui-table-header").css({
        	    		   "overflow":"hidden"
        	    	   })
        	       }
                }
            });
        },

        /**
         * 列表刷新
         */
        refresh(where) {
            multiTable.query(multiTable.backWhere);
            tableHeight();
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
                    	
                        multiTable.tableIns.reload({
                            where: multiTable.backWhere
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

                                //显示总行数
                                $("ul.layui-tab-title li.listTable1 span.title-num").html("("+(!!res.count?res.count:"0")+")");
                            }
                        });
                        $("input[type=checkbox][name=1]").each(function(){
                        	var $this = $(this);
                        	if(!!$this.prop("checked")){
                        		if($this.attr("tablename") != "listTable1"){
                        			var tableName = $this.attr("tablename");
                        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, multiTable.backWhere);
                        	        table.reload(tableName,{
                        	            url: multiTable.tableUrls[tableName].url,
                        	            where: where, 
                        	            page: {
                        	                curr: 1 // 重新从第 1 页开始
                        	            }
                        	        });
                        		}
                        	}
                        });
                        layer.close(index);
                        tableHeight();
                    });
                });
        },

        /**
         * 打开侧滑弹窗
         */
        openDrawer: function (obj) {

            var topLayer = topWin(window).layui.layer;
            topLayer.open({
                type: 2
                , title: obj.title
                , area: ['60%', '100%']
                , shade: 0.45
                , shadeClose: true
                , anim: -1
                , maxmin: false
                , offset: 'rt',
                skin: "layui-anim layui-anim-rl layui-layer-adminRight",
                content: obj.url // 这里content是一个普通的String
                , resizing: function (layero) {
                    console.log(layero);
                }
            });
        }
    };
	multiTable.getSort(`${Entity.tag}`);
	/**
	 * 自定义排序事件
	 */
	 $(document).on('click', '.sort-btn', function () {
		 $(this).toggleClass("active").siblings(".sort-btn").removeClass("active");//修改排序按钮选中状态
		 var isSort = $(this).hasClass("active");//判断排序按钮是否选中
		 if(isSort){
			 var index = $(this).attr("index");
			 multiTable.backWhere.sort=tableSort[index];
			 multiTable.backWhere.order=" ";
		     multiTable.refresh(multiTable.backWhere);
		 }else{
			 if(defaultSortWhere!=null){
				 multiTable.backWhere.sort=defaultSortWhere;
			 }else{
				 multiTable.backWhere.sort="";
			 }
			 multiTable.backWhere.order=" ";
			 multiTable.refresh(multiTable.backWhere);
		 }
		 
		
	   
	 });
    /**
     * 初始化列表默认刷新事件
     */
    $(document).on('click', '.my-table-refresh', function () {
         var queryParams =multiTable.backWhere;
        $("input[type=checkbox][name=1]").each(function(){
        	var $this = $(this);
        	if(!!$this.prop("checked")/*&&$(this).parent().parent().hasClass('layui-this')*/){
        		if($this.attr("tablename") == "listTable1"){
        			multiTable.refresh(queryParams);
        		}else{
        			var tableName = $this.attr("tablename");
        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
        	        table.reload(tableName,{
        	            url: multiTable.tableUrls[tableName].url,
        	            where: where, 
        	            page: {
        	                curr: 1 // 重新从第 1 页开始
        	            }
        	        });
        		}
        	}
        });
        
    });
    /**
     * 日期选择
     */
    $(document).on('change', '#fastday', function () {
    	var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');
        var queryParams = {};
        queryParams[name] = value;
        multiTable.query(queryParams);
    });

    /**
     * 初始化快速查询
     */
    $(document).on('click', '.fastsearchBtn', function () {
        var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');

        var queryParams = {};
        queryParams[name] = value;

        //multiTable.query(queryParams);
        $("input[type=checkbox][name=1]").each(function(){
        	var $this = $(this);
        	if(!!$this.prop("checked")){
        		if($this.attr("tablename") == "listTable1"){
        			multiTable.query(queryParams);
        		}else{
        			var tableName = $this.attr("tablename");
        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
        	        table.reload(tableName,{
        	            url: multiTable.tableUrls[tableName].url,
        	            where: where, 
        	            page: {
        	                curr: 1 // 重新从第 1 页开始
        	            }
        	        });
        		}
        	}
        });
    });

    /**
     * 快速搜索添加回车监听
     */
    $(document).on('keypress', ".fastsearchInput", function (event) {
        if (event.keyCode == 13) {
            var value = $('.fastsearchInput').val();
            var name = $('.fastsearchInput').attr('name');
            var queryParams = {};
            queryParams[name] = value;

            //multiTable.query(queryParams);
            $("input[type=checkbox][name=1]").each(function(){
            	var $this = $(this);
            	if(!!$this.prop("checked")){
            		if($this.attr("tablename") == "listTable1"){
            			multiTable.query(queryParams);
            		}else{
            			var tableName = $this.attr("tablename");
            	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
            	        table.reload(tableName,{
            	            url: multiTable.tableUrls[tableName].url,
            	            where: where, 
            	            page: {
            	                curr: 1 // 重新从第 1 页开始
            	            }
            	        });
            		}
            	}
            });
            // resize(); //重新渲染表格
            tableHeight();
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
            alertHeight = 0,
            contractFilterHeight;
        $(".project-advanced-search .pas-content").hasClass("suspension") ? testHeigt = searchHeight : testHeigt = searchHeight;
        $(".alert-warning").hasClass("hide") ? alertHeight=0 : alertHeight=$(".alert-warning").outerHeight(true);
        $(".list-tab .layui-tab-title").length>0 ? tabTitle = $(".list-tab .layui-tab-title").outerHeight(true)+12 : tabTitle = 0;
        $("#contractFilter").length>0 ? contractFilterHeight = $("#contractFilter").outerHeight(true)+5 : contractFilterHeight = 0;
        var tableHeight = windowHeight - testHeigt - alertHeight - tabTitle - contractFilterHeight;
        $(".table-list").outerHeight(tableHeight);
        
        if(isChandao(window)){
            $("input[type=checkbox][name=1]").each(function(){
            	var $this = $(this);
            	if(!!$this.prop("checked")){
            		var tableName =$this.attr("tablename");
            		table.reload(tableName, {
                        height: tableHeight
                    });
            	}
            });
        }else{
            $("input[type=checkbox][name=1]").each(function(){
            	var $this = $(this);
            	if(!!$this.prop("checked")){
            		var tableName =$this.attr("tablename");
            		var height = tableHeight +20
            		if($this.attr("tabletitle")==='tableCount'){
            			height = tableHeight + 50
            		}
            		table.reload(tableName, {
                      height: height
                    });
            	}
            });
        }
    }
    
    /**
     * 重置表格高度不渲染表格
     */
    var searchFlag = true,searchHeight=0,viewHeight,mianHeight,fixBodyHeight;
    function tableHeight(){
        
    	var $tableView = $("table+.layui-table-view");
        if(!!searchFlag){
        	/*得到第一次渲染的表格相关标签高度值*/
        	viewHeight = parseInt($tableView.css("height").replace("px",''));
            mianHeight = parseInt($tableView.find(".layui-table-main").css("height").replace("px",''));
            fixBodyHeight = parseInt($tableView.find(".layui-table-fixed .layui-table-body").css("height").replace("px",''));
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
//    setTimeout(function () {
//        resize();
//    }, 100);
    /*$(window).resize(function () {
        resize();
    });*/

    /**
     * 高级搜索区域收起按钮点击事件
     */
//    $('#advancedSearchHide').click(function () {
////        $("#advancedSearch").click();
//    });

    /**
     * 高级查询按钮
     */
    form.on("submit(advancedSearchSubmit)", function (data) {
    
        var queryParams = multiTable.advSearch(data);
        queryParams.merge = $('#mergeHide').is(':checked');
        queryParams.hideNull = $('#hideNullHide').is(':checked');
        queryParams.modelflag = $('#modelHide').is(':checked');
        var value = $('.fastsearchInput').val();
        var name = $('.fastsearchInput').attr('name');
        queryParams[name] = value;
        multiTable.initWhere = Object.assign({}, queryParams);
        
        $("input[type=checkbox][name=1]").each(function(){
        	var $this = $(this);
        	if(!!$this.prop("checked")){
        		if($this.attr("tablename") == "listTable1"){
        			multiTable.query(queryParams);
        		}else{
        			var tableName = $this.attr("tablename");
        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
        	        table.reload(tableName,{
        	            url: multiTable.tableUrls[tableName].url,
        	            where: where, 
        	            page: {
        	                curr: 1 // 重新从第 1 页开始
        	            },
        	            
        	        });
        	        
        		}
        	}
        });
        // resize(); //重置表格高度
        tableHeight();
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
    	$.each(multiTable.advSearch(data),function(key,values){
    		queryParams[key]=null;
    	});
    	 multiTable.initWhere = Object.assign({}, queryParams);
    	$("input[type=checkbox][name=1]").each(function(){
        	var $this = $(this);
        	if(!!$this.prop("checked")){
        		if($this.attr("tablename") == "listTable1"){
        			multiTable.query(queryParams);
        		}else{
        			var tableName = $this.attr("tablename");
        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
        	        table.reload(tableName,{
        	            url: multiTable.tableUrls[tableName].url,
        	            where: where, 
        	            page: {
        	                curr: 1 // 重新从第 1 页开始
        	            }
        	        });
        		}
        	}
        });
        // resize(); //重置表格高度
        tableHeight();
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
    	$.each(multiTable.advSearch(data),function(key,values){
    		queryParams[key]=null;
    	});
    	 multiTable.initWhere = Object.assign({}, queryParams);
    	$("input[type=checkbox][name=1]").each(function(){
        	var $this = $(this);
        	if(!!$this.prop("checked")){
        		if($this.attr("tablename") == "listTable1"){
        			multiTable.query(queryParams);
        		}else{
        			var tableName = $this.attr("tablename");
        	        var where = Object.assign({"groupBy":multiTable.tableUrls[tableName].groupBy}, queryParams);
        	        table.reload(tableName,{
        	            url: multiTable.tableUrls[tableName].url,
        	            where: where, 
        	            page: {
        	                curr: 1 // 重新从第 1 页开始
        	            }
        	        });
        		}
        	}
        });
    	// resize();
        tableHeight();
    	return false;
    });

//    /**
//     * 高级搜索表单重置
//     */
//    $('#advancedSearchReset').click(function () {
//        $('form.advancedSearchForm')[0].reset();
//        $("form:hidden").val("");//清空隐藏域的值
////        $('form.advancedSearchForm')[0].submit();
//        form.render();
//    });


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
                multiTable.refresh();
            },
            success: function (layero, index) {
            	if (!!layero.find("iframe")[0].contentWindow.initConfig) 
            		layero.find("iframe")[0].contentWindow.initConfig(multiTable);
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
                multiTable.refresh();
            },
            success: function (layero, index) {
            	if (!!layero.find("iframe")[0].contentWindow.initConfig) 
            		layero.find("iframe")[0].contentWindow.initConfig(multiTable);
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

    multiTable.on('sort(list)', function (obj) {
        let options = {sort: obj.field, order: obj.type}
        multiTable.query(options);
        // resize();
        tableHeight();
		setTimeout(function () {
		   initTD($("#list"));
		}, 500);
    })


    // 输出test接口
    exports('multiTable', multiTable);
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
function table2done(res,curr,count){
	var elem = this.elem;
	//无数据时显示无数据相关提示
	if (res.data.length === 0) {
		this.elem.next('.layui-table-view').find('.layui-table-header').css('overflow', 'auto');
		elem.siblings(".notData-mt").show();
	} else {
		elem.siblings(".notData-mt").hide();
		merge(res, curr, count);
	}
}
function merge(res,curr,count) {
    //初始化分割点
    var indexPoint = [0];
    var data = res.data;
    var mergeIndex = 0;//定位需要添加合并属性的行数
    var mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
    var trArr = $('#listTable2').next().find(".layui-table-body>.layui-table").find("tr");//合同管理所有行
    for (var i = 1; i < res.data.length; i++) { //这里循环表格当前的数据
        var tdCurArr = trArr.eq(i).find("td").eq(0);//获取当前行的当前列
        var tdPreArr = trArr.eq(mergeIndex).find("td").eq(0);//获取相同列的第一列
        var table = $('#listTable2').next().find(".layui-table-body>.layui-table");
        var tr = table.find("tr[data-index='" + i + "']");
        if (data[i].statusname === '小计') { 
        	tr.attr({"style": "background:#E2EFD9;font-weight:bold;"});
        }
        if (data[i].statusname === '合计') { 
        	tr.attr({"style": "background:#E2EFD9;font-weight:bold;"});
        	$(tr.find('td')[8]).css("display", "none");
        	$(tr.find('td')[9]).css("display", "none");
        	$(tr.find('td')[10]).attr("colspan", 3);
        	$(tr.find('td')[10]).attr("align", 'center');
        }
        if (data[i].contractid === data[i - 1].contractid) { //后一行的值与前一行的值做比较，相同就需要合并
            mark += 1;
            //相同列的第一列增加rowspan属性
            tdPreArr.each(function () {
                $(this).attr("rowspan", mark);
            });
            //当前行隐藏
            tdCurArr.each(function () {
                $(this).css("display", "none");
            });
        }else {
            //保存分割点
            indexPoint.push(i)
            mergeIndex = i;
            mark = 1;//一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
        }
    }
    //补全最后一个分割点
    indexPoint.push(res.data.length)
    //依据拿到的分割点，对其他6列进行合并处理
    for(var i = 0;i<indexPoint.length;i++){
        var startIndex=0;
        if(i!=0){
            startIndex = indexPoint[i-1];
        }
        for(var j=startIndex;j<indexPoint[i];j++){
            mergeSomeRows(1,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(2,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(3,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(4,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(5,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(6,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(7,startIndex,indexPoint[i],trArr,data,'contractid');
            mergeSomeRows(8,startIndex,indexPoint[i],trArr,data,'submodel');
            mergeSomeRows(9,startIndex,indexPoint[i],trArr,data,'submodel');
        }
    }
}
/**
 * 
 * @param colIndex:table中列索引
 * @param startIndex：合并单元格起始索引
 * @param endIndex：合并单元格结束索引
 * @param trArr：单列单元格元素集合
 * @param data：后端返回数据集合
 * @param colName：当前列字段名
 */
function mergeSomeRows(colIndex,startIndex,endIndex,trArr,data,colName){
    var mark = 1;
    for(var j=startIndex+1;j<endIndex;j++){
        ++mark;
        var tdCurArr = trArr.eq(j).find("td").eq(colIndex);//获取当前行的当前列
        var tdPreArr = trArr.eq(startIndex).find("td").eq(colIndex);//获取相同列的第一列
        if (data[j][colName] === data[j - 1][colName]) { //后一行的值与前一行的值做比较，相同就需要合并
            //相同列的第一列增加rowspan属性
            tdPreArr.each(function () {
                $(this).attr("rowspan", mark);
            });
            //当前行隐藏
            tdCurArr.each(function () {
                $(this).css("display", "none");
            });
        }else {
            mark=1;
            startIndex=j;
        }
    }
};