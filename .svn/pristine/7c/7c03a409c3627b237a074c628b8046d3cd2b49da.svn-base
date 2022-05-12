var socket = {
	websocket : null,
	layer : null,
	init : function(name,func,layer){
		socket.layer = layer;
		var pathName=window.document.location.pathname;
		var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		 if ('WebSocket' in window) {
		        // 浏览器支持Websocket
			 socket.websocket = new WebSocket('ws://'+document.location.host+projectName+'/webSocket/'+name+'-'+(new Date().getTime()));
	     } else {
		        // 浏览器 Not support websocket
	     }

		    //WebSocket连接发生错误的回调方法
		 socket.websocket.onerror = function (e) {
//		        setMessageInnerHTML("WebSocket连接发生错误");
	     };

		    //WebSocket连接成功建立的回调方法
	     socket.websocket.onopen = function (e) {
//		        setMessageInnerHTML("WebSocket连接成功");
	     };

		    //接收到消息的回调方法
	     socket.websocket.onmessage = function (event) {
//	        alertTip(event.data);
//	    	 if(event.data == 'logout'){
//	    		 socket.layer.confirm(
//	        		'该用户在其他地点登录！',
//	                {icon: 3,bth:['确认'], title: '提示消息'},
//	                function (index) {
//	                	updateStatus(ids,1);
//	                    layer.close(index);
//	                });
//	    		 window.location.href='/logout';
//	    	 }else if(!!func){
	    		 func(event.data)
//	    	 }
	     };

	    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	     window.onbeforeunload = function () {
	    	 socket.closeSocket();
	     };

		    //连接关闭的回调方法
	     socket.websocket.onclose = function (e) {
//	        setMessageInnerHTML("WebSocket连接关闭");
	     };
	},
	
	closeSocket : function(){
		socket.websocket.close();
	}
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    