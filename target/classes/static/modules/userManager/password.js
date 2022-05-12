layui.use(['form','layer','laydate','rate'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        laydate = layui.laydate,
        rate = layui.rate,
        $ = layui.jquery;

    var id = user.id;
    $("#id").val(id);
    	
    form.on("submit(addUser)",function(data){
        //弹出loading
        var index = topWin(window).layer.msg("修改密码",{icon: 16,time:false,shade:0.8});
        var postUrl = `${SYS_CFG.ctxPath}/`+Entity.tag+`/updatePwd`;
        
        
        // 实际使用时的提交信息
         $.post(postUrl, data.field, function(res){
        	 if(res.code === 1){
        		 topWin(window).layer.close(index);
        		 topWin(window).layer.msg('密码修改成功！');
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