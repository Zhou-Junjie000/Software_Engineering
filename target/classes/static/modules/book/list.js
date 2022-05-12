layui.use(['form','layer','laydate','myTable','laytpl','formSelects','upload'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        myTable = layui.myTable,
        upload = layui.upload;
    
    var tableColumns = [];
    if(PAGE_CONSTANT.type=='coach'){
    	tableColumns = [
			{type: "checkbox", fixed:"left", width:50},
			{field: 'id', title: '主键',hide:true},
			{field: 'coachname', title: '私教姓名', align:"center",sort:true},
			{field: 'booktime', title: '预约时间', align:"center", sort:true},
			{field: 'username', title: '用户', align:"center", sort:true},
			{field: 'createtime', title: '生成时间', align:"center", sort:true}
		];
    }else if(PAGE_CONSTANT.type=='course'){
    	tableColumns = [
			{type: "checkbox", fixed:"left", width:50},
			{field: 'id', title: '主键',hide:true},
			{field: 'coursename', title: '课程名称', align:"center",sort:true},
			{field: 'booktime', title: '预约时间', align:"center", sort:true},
			{field: 'username', title: '用户', align:"center", sort:true},
			{field: 'createtime', title: '生成时间', align:"center", sort:true}
		];
    }else if(PAGE_CONSTANT.type=='material'){
    	tableColumns = [
			{type: "checkbox", fixed:"left", width:50},
			{field: 'id', title: '主键',hide:true},
			{field: 'materialname', title: '器材名称', align:"center",sort:true},
			{field: 'booktime', title: '预约时间', align:"center", sort:true},
			{field: 'username', title: '用户', align:"center", sort:true},
			{field: 'createtime', title: '生成时间', align:"center", sort:true}
		];
    }
    
    var defaultWhere = {
    		type:PAGE_CONSTANT.type,
    		coachid:PAGE_CONSTANT.coachid,
    		courseid:PAGE_CONSTANT.courseid,
    		materialid:PAGE_CONSTANT.materialid
        } ;
    var tableIns = myTable.render({
    		url: `${SYS_CFG.ctxPath}/${Entity.tag}/page`,
    		cols: [tableColumns], 
    		where: defaultWhere,
    		sort:true
    	});
    
    lay('.date-input').each(function(){
        laydate.render({
        	type:'date',
            elem: this,
            range: '~',
            trigger: 'click'
        });
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
        } else if(layEvent === 'del'){ //删除
        	var delIds = [obj.data.id];
            myTable.delByIds(delIds);
        }
     })
})