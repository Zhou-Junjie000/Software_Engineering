/**
 * 扩展一个upload模块
 */
layui.define(['element','layer', 'jquery', 'upload'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer',

    var layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        $ = layui.$,
        upload = layui.upload;

    //执行实例
    var DEFAULT_SETTING = {
		 elem: '' //绑定元素
		 ,path:''//上传成功后相对路径存放表单域
		 ,field:'file' //设定文件域的字段名,建议不要覆盖，若要覆盖请同时覆盖url
		 ,url: `${SYS_CFG.ctxPath}/sys/upload/file` //上传接口
		 ,data:undefined
		 ,drag:true //是否接受拖拽的文件上传，设置 false 可禁用。
		 ,size:10240// 设置文件最大可允许上传的大小，单位 KB。不支持ie8/9    0（即不限制）
		 ,multiple:false//是否允许多文件上传。设置 true即可开启。不支持ie8/9
		 ,number:0// 设置同时可上传的文件数量，一般配合 multiple 参数出现。 0（即不限制）
		 ,accept:'file' //images（图片）、file（所有文件）、video（视频）、audio（音频）
//		 ,acceptMime:'images' //acceptMime: 'image/*'（只显示图片文件） acceptMime: 'image/jpg, image/png'（只显示 jpg 和 png 文件）
//    	 ,exts:'jpg|png|gif|bmp|jpeg' //zip|rar|7z' 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式
		 ,auto: true //是否选完文件后自动上传。如果设定 false，那么需要设置 bindAction 参数来指向一个其它按钮提交上传
		 ,bindAction: '' //指向一个按钮触发上传，一般配合 auto: false 来使用。值为选择器或DOM对象，如：bindAction: '#btn'
		 ,before: function(obj){
			 console.log("before");
			 //文件提交上传前的回调
		 }
	 	 ,choose: function(obj){
	 		console.log("choose");
	 		 //选择文件后的回调函数
		 }
		 ,done: function(res,index,upload){
			 console.log("done");
			 //执行上传请求后的回调
		 }
      	 ,error: function(index, upload){
	 		 console.log("error");
      		//请求异常回调
      	}
    };
    
    var uploadFile = {
            /**
             * layui table 对象
             */
            options: null,

            /**
             * 插件渲染 添加默认配置支持
             */
            render(options) {
            	uploadFile.options = Object.assign({}, DEFAULT_SETTING,options);
            	 var uploadInst = upload.render({
            		 elem: uploadFile.options.elem //绑定元素
        			 ,field:uploadFile.options.field //设定文件域的字段名
        			 ,url: uploadFile.options.url //'/upload/' //上传接口
        			 ,data:uploadFile.options.data
        			 ,drag:uploadFile.options.drag //是否接受拖拽的文件上传，设置 false 可禁用。
        			 ,size:uploadFile.options.size// 设置文件最大可允许上传的大小，单位 KB。不支持ie8/9    0（即不限制）
        			 ,multiple:uploadFile.options.multiple//是否允许多文件上传。设置 true即可开启。不支持ie8/9
        			 ,number:uploadFile.options.number// 设置同时可上传的文件数量，一般配合 multiple 参数出现。 0（即不限制）
        			 ,accept:uploadFile.options.accept //images（图片）、file（所有文件）、video（视频）、audio（音频）
        			 ,acceptMime:uploadFile.options.acceptMime //acceptMime: 'image/*'（只显示图片文件） acceptMime: 'image/jpg, image/png'（只显示 jpg 和 png 文件）
        			 ,exts:uploadFile.options.exts //zip|rar|7z' 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式
    				 ,auto: uploadFile.options.auto //是否选完文件后自动上传。如果设定 false，那么需要设置 bindAction 参数来指向一个其它按钮提交上传
    				 ,bindAction: uploadFile.options.bindAction //指向一个按钮触发上传，一般配合 auto: false 来使用。值为选择器或DOM对象，如：bindAction: '#btn'
    				 ,before: uploadFile.options.before?uploadFile.options.before:uploadFile._before
            	 	 ,choose: uploadFile.options.choose?uploadFile.options.choose:uploadFile._choose
    				 ,done: uploadFile.options.done?uploadFile.options.done:uploadFile._done
    				 ,allDone: uploadFile.options.allDone?uploadFile.options.allDone:uploadFile._allDone
        	      	 ,error:uploadFile.options.error?uploadFile.options.error:uploadFile._error
        	    });
            },
            _before: function(obj){
				 //上传前回调
			},
			_choose: function(obj){
				 //选择文件回调
			},
			_done: function(res,index,upload){
				console.log(res);
				 //上传完毕回调
			},
			_error: function(index,upload){
				 console.log(index);
				 //上传完毕回调
			},
    };

    // 输出uploadFile接口
    exports('uploadFile', uploadFile);
});