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
	            {field: 'account', title: '名称', align:"center", sort:true},
	            {field: 'password', title: '密码', align:"center",hide:true, sort:true},
	            {title: '操作', width:160, templet:'#listBar',fixed:"right",align:"center"}
	        ];
    
    /** 默认列表查询条件 */
    var defaultWhere ;
    //供应商列表
    debugger;
    var tableIns = myTable.render({
//    		url: `${SYS_CFG.ctxPath}/sys/user/page`,
    		cols: [tableColumns], 
    		where: defaultWhere
    	});

    $(".addUser_btn").click(function(){
    	myTable.openAdd();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = myTable.getSelectAll(),
            data = checkStatus.data,
            delIds = [];
        if(data.length > 0) {
            for (var i in data) {
            	delIds.push(data[i].id);
            }
            myTable.delByIds(delIds);
        }else{
            layer.msg("请选择需要删除的对象");
        }
    })

    //列表操作
    myTable.on('tool(list)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
        	myTable.openMod(data.id);
        } else if(layEvent === 'del'){ //删除
        	var delIds = [obj.data.id];
            myTable.delByIds(delIds);
        } 
    });
})