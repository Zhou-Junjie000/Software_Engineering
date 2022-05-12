layui.use(['form','layer','laydate','myTable','laytpl','formSelects','upload','echarts'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        myTable = layui.myTable,
        upload = layui.upload,
        echarts = layui.echarts;
    
    var tableColumns = [
			{field: 'id', title: '主键',hide:true},
			{field: 'feetime', title: '日期', align:"center",sort:true},
			{field: 'fee', title: '收入总金额', align:"center", sort:true},
			{field: 'num', title: '预约总次数', align:"center", sort:true}
		];
    
    
    var defaultWhere = {
    		type:PAGE_CONSTANT.type,
    		coachid:PAGE_CONSTANT.coachid,
    		courseid:PAGE_CONSTANT.courseid,
    		cardid:PAGE_CONSTANT.cardid
        } ;
    var tableIns = myTable.render({
    		url: `${SYS_CFG.ctxPath}/${Entity.tag}/page2`,
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
   
    // 列表操作
    myTable.on('tool(list)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ // 编辑
        	myTable.openMod(data.id);
        } else if(layEvent === 'del'){ // 删除
        	var delIds = [obj.data.id];
            myTable.delByIds(delIds);
        }
     })
     
     $('body').css('overflow-y','auto')
     $('body #list+.layui-form').height('404px')
     $('body #list+.layui-form .layui-table-body').height('300px')
     $('body #list+.layui-form').after('<div class="sheet-title e-sheet-title">'+
 											'<span>收入图表</span>'+
 									   '</div>'+
    		 						   '<div class="income-echarts" id="echartDemo"></div>')
     $('body #echartDemo').width($('body').width())
     $('body #echartDemo').height('500px')
     // 图表初始化
     echartInit()
     function echartInit(){
    	var chart = echarts.init(document.getElementById('echartDemo'));
    	$.ajax({
            url : `${SYS_CFG.ctxPath}/${Entity.tag}/countList`,
            type : "get",
            dataType : "json",
            success : function(result){
            	var option = {
            			tooltip: {
            				trigger: 'axis',
            				axisPointer: {
            					type: 'cross',
            					crossStyle: {
            						color: '#999'
            					}
            				}
            			},
            			legend: {
            				data: ['收入', '预约'],
            			},
            			xAxis: [{
            				type: 'category',
            				data: result.data.feetimeList, //X轴坐标
            				axisPointer: {
            					type: 'shadow'
            				}
            			}],
            			yAxis: [{
            					type: 'value',
            					name: '收入(元)',
            					interval: 300,
            				},
            				{
            					type: 'value',
            					name: '预约(次)',
            					interval: 5,
            				}
            			],
            			dataZoom: [{   //最下面滑动
            					type: 'inside',
            					start: 30,  //滑动里面开始位置
            					end: 70//滑动里面结束位置
            				},
            				{
            					start: 60,
            					end: 100
            				}
            			],
            			series: [{
            					name: '收入',
            					type: 'bar',
            					tooltip: {
            						valueFormatter: function(value) {
            							return value + ' 元';
            						}
            					},
            					itemStyle: {
            						color: '#1F65EB'
            					},
            					data: result.data.feeList  //y轴左侧
            				},
            				{
            					name: '预约',
            					type: 'line',
            					yAxisIndex: 1,
            					tooltip: {
            						valueFormatter: function(value) {
            							return value + ' 次';
            						}
            					},
            					itemStyle: {
            						color: '#fb0167'
            					},
            					data: result.data.bookList  //y轴右侧
            				}
            			]
            		};
                	chart.setOption(option);
            }
        })
    	
    }
     
})