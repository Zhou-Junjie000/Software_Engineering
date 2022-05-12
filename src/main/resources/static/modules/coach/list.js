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
	        {field: 'name', title: '私教姓名', align:"center",width:100,sort:true},
	        {field: 'sex', title: '性别', align:"center", sort:true,width:100,templet:function(d){
				if(!d.sex)
					return '-';
				if(d.sex == '0'){
					return '男';
				}
				if(d.sex == '1'){
					return '女';
				}
			}},
	        {field: 'age', title: '年龄', align:"center",width:100, sort:true},
	        {field: 'area', title: '场地', align:"center",width:100, sort:true},
	        {field: 'info', title: '简介', align:"center", sort:true},
	        {field: '', title: '预约记录', align:"center", sort:true,width:100,templet:function(d){
				return '<a href="javascript:void(0)" onclick="showBook('+d.id+')">预约记录</a>';
			}},
//			{field: '', title: '购买记录', align:"center", sort:true,width:150,templet:function(d){
//				return '<a href="javascript:void(0)" onclick="showFee('+d.id+')">购买记录</a>';
//			}},
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
 function showBook(id){
	topWin(window).tabAdd({
		title:'预约记录',
		url:`${SYS_CFG.ctxPath}/book/list?type=coach&coachid=`+id,
		icon:'iconfont icon-biaodan'
	});
}
function showFee(id){
	topWin(window).tabAdd({
		title:'购买记录',
		url:`${SYS_CFG.ctxPath}/fee/list?type=coach&coachid=`+id,
		icon:'iconfont icon-biaodan'
	});
}