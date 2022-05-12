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
	        {field: 'createman', title: '录入人', align:"center",sort:true},
	        {field: 'createdate', title: '录入日期', align:"center", sort:true,templet:function(d){
				if(!d.createdate)
					return '-';
				return layui.util.toDateString(d.createdate, 'yyyy-MM-dd');
			}},
	        {field: 'name', title: '客户姓名', align:"center", sort:true},
	        {field: 'card', title: '身份证号码', align:"center", sort:true},
	        {field: 'phone', title: '手机号码', align:"center", sort:true},
	        {field: 'province', title: '省', align:"center",sort:true},
	        {field: 'city', title: '市', align:"center",sort:true},
	        {field: 'county', title: '区', align:"center",sort:true},
	        {field: 'home', title: '详细地址', align:"center",width:200,sort:true},
	        {field: 'level', title: '意向度', align:"center", sort:true},
	        {field: 'source', title: '来源', align:"center", sort:true},
			{field: 'remark', title: '其他', align:"center", sort:true},
			{field: 'team', title: '所属团队', align:"center", sort:true},
	        {title: '操作', templet:function(d) {
	        	var html = '<div class="operate-btns">';
	        	html += '<a class="layui-btn layui-btn-xs layui-btn-edit" lay-event="edit" title="编辑"><i class="iconfont icon-xiugai"></i><div class="tip-title"><span>编辑</span></div></a>';
				html += '<a class="layui-btn layui-btn-xs layui-btn-del" lay-event="del" title="删除"><i class="iconfont icon-delete"></i><div class="tip-title"><span>删除</span></div></a>';
				html += ' </div>';
				return html;
			},fixed:"right",width:100,align:"center"}
	    ];

	            
    
    var defaultWhere = {
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