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
	        {field: 'type', title: '类型', align:"center", sort:true},
	        {field: 'startdate', title: '开始日期', align:"center", sort:true,templet:function(d){
				if(!d.startdate)
					return '-';
				return layui.util.toDateString(d.startdate, 'yyyy-MM-dd');
			}},
	        {field: 'enddate', title: '结束日期', align:"center", sort:true,templet:function(d){
				if(!d.enddate)
					return '-';
				return layui.util.toDateString(d.enddate, 'yyyy-MM-dd');
			}},
			 {field: 'fee', title: '价格', align:"center", sort:true},
	        {field: 'remark', title: '备注', align:"center", sort:true},
	        {field: '', title: '缴费记录', align:"center", sort:true,width:150,templet:function(d){
				return '<a href="javascript:void(0)" onclick="showFee('+d.id+')">购买记录</a>';
			}},
	        {title: '操作', templet:function(d) {
	        	var html = '<div class="operate-btns">';
	        	html += '<a class="layui-btn layui-btn-xs layui-btn-edit" lay-event="edit" title="编辑"><i class="iconfont icon-xiugai"></i><div class="tip-title"><span>编辑</span></div></a>';
				html += '<a class="layui-btn layui-btn-xs layui-btn-del" lay-event="del" title="删除"><i class="iconfont icon-delete"></i><div class="tip-title"><span>删除</span></div></a>';
				html += ' </div>';
				return html;
			},fixed:"right",width:150,align:"center"}
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
function showFee(id){
	topWin(window).tabAdd({
		title:'购买记录',
		url:`${SYS_CFG.ctxPath}/fee/list?type=card&cardid=`+id,
		icon:'iconfont icon-biaodan'
	});
}