/**
 * 扩展一个弹窗模块
 */
layui.define(['element','layer','jquery', 'laytpl'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer',

    var form = layui.form,
    	layer = layui.layer,
        $ = layui.$,
        laytpl = layui.laytpl;

    var DEFAULT_CONFIG = {
    	index:-1	
        ,type: 2
        , title: "信息"
        , area: "auto"
        , shade: 0.45
        , shadeClose: false
        , anim: -1
        , maxmin: false
        , offset: 'auto'
        ,skin: "layui-anim layui-anim-rl layui-layer-adminRight"
        ,content: "" // 这里content是一个普通的String
        ,btn: ['确定', '取消']
        ,resizing: function (layero) {
            
        }
    	,okHandle: undefined
    	,successHandle: undefined
    };

    var openModal = {
        /**
         * layui layer 对象
         */
        instance: null,

        /**
         * 弹出窗体渲染
         */
        render(options) {
        	openModal.instance = layer.open(Object.assign({}, DEFAULT_CONFIG, options));
            return openModal;
        },
        /**
         * 右侧打开窗体
         */
        openDrawer(options){
        	
        	var drawerOption = {
    			type: 2
                , title: "信息"
                , area: ['60%', '100%']
                , shade: 0.45
                , shadeClose: true
                , anim: -1
                , maxmin: false
                , offset: 'rt'
                ,skin: "layui-anim layui-anim-rl layui-layer-adminRight"
            	,btn: ['确定', '取消']
        		,cancel: function(index, layero){ 
            	   layer.close(index);
            	   return false; 
            	}
        		 	
        	};
        	var dOption =  Object.assign({}, DEFAULT_CONFIG, drawerOption,options);
        	if(options.url){
        		dOption.content  = options.url;
        	}
        	//layer 中 success 事件
        	var successFunc = options.successHandle;
        	if(!successFunc){
        		if(!!options.inJson){
					successFunc=function(layero, index) {
						var $iframe = layero.find("iframe");
						if($iframe.length==0) return false;
						var childWindow = $iframe[0].contentWindow;
						var jsFunc = childWindow[options._setData];
						if(!!jsFunc)jsFunc(options.inJson);
					}
				}else{
					successFunc=function(layero, index) {
						var $iframe = layero.find("iframe");
						if($iframe.length==0) return false;
						var childWindow =$iframe[0].contentWindow;
						var jsFunc=childWindow['setData'];
						var inJson = {
							ok : function(data) {
								if(!!options.okHandle){
									options.okHandle(data);
								}
								layer.close(index);
							},
							close : function(data){
								if(!!options.okHandle){
									options.okHandle(data);
								}
								layer.close(index);
							}
						};
						if(!!jsFunc)jsFunc(inJson);
					}
				}
        	}
        	dOption["success"] = successFunc;
        	//layer 中 yes 事件
        	var okFunc;
        	if(!!options.okHandle){
        		var _okFunc = options.okHandle;
        		okFunc = function(index, layero){
                	var iframeBody = layer.getChildFrame('body', index);
                	var childWindow = layero.find("iframe")[0].contentWindow;
                	var jsGetDataFunc = childWindow['getData'];
                	if(!!jsGetDataFunc){
                		//回调函数传入获取数据参数
                		var backData = jsGetDataFunc();
                		var closeFlag = _okFunc(backData);
                		if(closeFlag){
                			layer.close(index);
                		}else{
                			return false;
                		}
                	}
                	layer.close(index);
                }
        	}else{
        		okFunc = function(index, layero){
                	layer.close(index);
                }
        	}
        	
        	dOption["yes"] = okFunc;
        	//实例化
        	layer.open(dOption);
        },
        /**
         * 确认事件
         *    index 表示iframe id
         *    layero 窗体对象
         */
        openConfirm: function (index, layero) {
        	var body = layer.getChildFrame('body', index);
        	var iframeWin = window[layero.find('iframe')[0]['name']];
        },
        /**
         * 取消事件
         *    index 表示iframe id
         *    layero 窗体对象
         */
        openCancel: function (index, layero) {
        	layer.close(index);
        }
    };

    // 输出openModal接口
    exports('openModal', openModal);
});