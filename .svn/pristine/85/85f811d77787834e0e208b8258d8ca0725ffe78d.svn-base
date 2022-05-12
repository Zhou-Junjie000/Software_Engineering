layui.use(['form','layer','laydate','myTable','laytpl','formSelects','upload'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        myTable = layui.myTable,
        upload = layui.upload;
    
    var tableColumns = [
	            {type: "checkbox", fixed:"left", width:50},
	            {field: 'id', title: '主键',hide:true},
	            {field: 'account', title: '登录名', align:"center", sort:true},
	            {field: 'name', title: '姓名', align:"center", sort:true},
	            {field: 'mail', title: '邮箱', align:"center", sort:true},
	            {field: 'sex', title: '性别', align:"center", sort:true},
	            {title: '操作', templet:function(d) {
                	var html = '<div class="operate-btns">';
    				html += '<a class="layui-btn layui-btn-xs layui-btn-edit" lay-event="edit" title="编辑"><i class="iconfont icon-xiugai"></i><div class="tip-title"><span>编辑</span></div></a>';
    				html += '<a class="layui-btn layui-btn-xs layui-btn-del" lay-event="del" title="删除"><i class="iconfont icon-delete"></i><div class="tip-title"><span>删除</span></div></a>';
    				html += '<a class="layui-btn layui-btn-xs layui-btn-change" lay-event="alteration" title="修改密码"><i class="iconfont icon-biangeng"></i><div class="tip-title"><span>修改密码</span></div></a>';
    				html += ' </div>';
    				return html;
    			},fixed:"right",width:115,align:"center"}
	        ];
    
    var defaultWhere = {
        } ;
    var tableIns = myTable.render({
    		url: `${SYS_CFG.ctxPath}/userManager/page`,
    		cols: [tableColumns], 
    		where: defaultWhere,
    		sort:true
    	});

    $(".add_btn").click(function(){
    	myTable.openViewAdd();
    })
    
    //列表操作
    myTable.on('tool(list)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
        	myTable.openMod(data.id);
        } else if(layEvent === 'alteration'){//修改密码
        	var url = `${SYS_CFG.ctxPath}/${Entity.tag}/password?id=${data.id}`;
            var title = '修改密码';

            openWin(title, url);
        } else if(layEvent === 'del'){ //删除
        	var delIds = [obj.data.id];
            myTable.delByIds(delIds);
        }
    });
    
    //批量初始化密码
    $("#remake_btn").click(function(){
        var checkStatus = myTable.getSelectAll(),
            data = checkStatus.data,
            ids = [];
        if(data.length > 0) {
            for (var i in data) {
            	ids.push(data[i].id);
            }
            $.post(`${SYS_CFG.ctxPath}/${Entity.tag}/remakePwd`, {
                ids: ids.join(',')  // 将需要删除的newsId作为参数传入
            }, function (data) {
            	topWin(window).layer.msg(data.message);
            	topWin(window).layer.close(indexMsg);
                layer.close(index);
            });
        }else{
            layer.msg("请选择需要重置密码的用户");
        }
    })
    /**
     * openWin
     */
    function openWin(title, url, success, area) {

        var topLayer = topWin(window).layui.layer;
        
        return topLayer.open({
            title: title,
            type: 2,
            area: typeof(area)==="undefined" ? ['35%', '50%'] : area, 
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
})