layui.use(['form','layer','laydate','rate'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        laydate = layui.laydate,
        rate = layui.rate,
        $ = layui.jquery;

	var defaultValue = {};
	//如果是编辑的话，先加载数据
    if(!!user.id&&user.id!=0){
    	//编辑隐藏密码按钮
    	document.getElementById("password_div").style.display="none";
    	$("input[name='account']").attr("readonly",true);
    	var queryParams = {
				id:user.id
		};
    	$.get(`${SYS_CFG.ctxPath}/`+Entity.tag+`/get`, queryParams, function(res){
			form.val('form',res.data);
			form.render();
		});
    }

    form.on("submit(addUser)",function(data){
        //弹出loading
        var index = topWin(window).layer.msg("保存",{icon: 16,time:false,shade:0.8});
        var postUrl = `${SYS_CFG.ctxPath}/`+Entity.tag+`/add`;
        if(data.field.id){
        	postUrl = `${SYS_CFG.ctxPath}/`+Entity.tag+`/mod`;
        }
        
        // 实际使用时的提交信息
         $.post(postUrl, data.field, function(res){
        	 topWin(window).layer.close(index);
        	//刷新父级表格数据 by lh
	         parentMyTable.refresh();
        	 if(res.code === 1){
        		 if(data.field.id){
        			 topWin(window).layer.msg('修改用户成功！');
    	         }else{
    	        	 topWin(window).layer.msg('新增用户成功！');
    	         }
        		 layer.closeAll("iframe");
        	 }else{
        		 topWin(window).layer.msg(res.message);
        	 }
         });
        return false;
    });
    
    /*
     * 取消按钮点击事件（关闭弹窗）
     */
    $("#close").click(function(){
    	//当你在iframe页面关闭自身时
	   	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	   	parent.layer.close(index); //再执行关闭
    });
})