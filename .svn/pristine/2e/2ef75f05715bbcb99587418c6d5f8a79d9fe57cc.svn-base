/**
 * 扩展一个Table模块
 */
layui.define(['element', 'tree', 'layer', 'form', 'upload','jquery'], function(exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer',
	
	var form = layui.form,
		tree = layui.tree,
        layer = parent.layer === undefined ? layui.layer : topWin(window).layer,
		$ = layui.$,

	
	/**
	 * 默认加载项
	 */
	var DEFAULT_TREE_CONFIG	= {
		treeId : "selectTree"
	};
	
	var mySelectTree = {
		
		/**
		 * 下拉树初始化渲染 添加默认配置支持
		 */
		render(options){
			
			options.data = RestructureData(options.data,options.checkID);

			var index = options.data.findIndex(item1 => item1.id == options.checkID);
			var defaultValue,defaultId;
			if(index != -1){
				defaultValue = options.data[index]['name'];
				defaultId = options.checkID;
			}
			
			if(!!options.treeId){
				DEFAULT_TREE_CONFIG.treeId = treeId;
			}
			
			$("#"+DEFAULT_TREE_CONFIG.treeId).find(".layui-select-title span").html(defaultValue).end().find("input:hidden[name='"+options.selectID+"']").val(defaultId);
			
			tree.render({
	            elem: "#"+options.elem,
	            data:options.data,
	            id:options.id,
	            click: function (node) {
	                var $select = $($(this)[0].elem).parents(".layui-form-select");
	                $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.data.name).end().find("input:hidden[name='"+options.selectID+"']").val(node.data.id);
	            }
	        });
			
			//点击出下拉树
			$("#"+DEFAULT_TREE_CONFIG.treeId).on("click", ".layui-select-title", function (e) {
		        $("#"+DEFAULT_TREE_CONFIG.treeId+" .layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
		        $(this).parents("#"+DEFAULT_TREE_CONFIG.treeId).toggleClass("layui-form-selected");
		        layui.stope(e);
		    }).on("click", "dl i", function (e) {
		        layui.stope(e);
		    });
		}
	};
	
	/**
	 * 重构数据
	 * @param data  [{id:'',name:'',pid:''}]
	 * @returns [{id:'',title:'',children:[{id:'',title:''}]}]
	 */
	function RestructureData(data,checkIDs){
		if(!checkIDs){checkIDs=[];}
		data.forEach(item => {
			item.title=item.name;
			
			if(checkIDs.indexOf(item.id+'')>=0){item.checked=true;}
			
			var index = data.findIndex(item1 => item1.id == item.pid);
			if (index !== -1) {
				data[index].children = data[index].children || [];
				data[index].children.push(item);
			}else{
				item.pid=null;
			}
		});
		
		return data.filter(item => item.pid === null);
	}

	// 输出test接口
	exports('mySelectTree', mySelectTree);
});