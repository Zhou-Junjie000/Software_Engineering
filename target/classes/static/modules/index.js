var $,tab,layer,ischandao;
layui.config({
	base : `${SYS_CFG.ctxPath}/assets/js/`
}).extend({
	"bodyTab" : "bodyTab"
});


layui.use(['bodyTab','form','element','layer','jquery','openModal'],function(){
	var form = layui.form,
		element = layui.element,
		$ = layui.$;
	    layer = layui.layer,
		tab = layui.bodyTab({
			openTabNum : "50",  //最大可打开窗口数量x
		});
	    var url=window.location.href;
	    //如果是通过禅道进入放版
	    if(window.parent != window){
			ischandao=1;
			$('#navBar .bottom-con').hide();
			$('.showMenu').addClass('extend-layui-layout');
			
		}
	    var ur="";
	    if (url.lastIndexOf("?")>0) {
	    	ur =url.substring(url.lastIndexOf("?")+1,url.length);
	    	$('.layui-body').addClass("top-zero");
	    }
	   
	   
	    
	    
	//通过顶部菜单获取左侧二三级菜单   注：此处只做演示之用，实际开发中通过接口传参的方式获取导航数据
	function getData(json){
		
			    if(!!ur){
			    	$("#navBar").hide();
			    	$(".layui-side").hide();
			    	tabAdd({ target:'_blank',title:'申请详情',
			      		url:`${SYS_CFG.ctxPath}`+ur,
			      		icon:'iconfont icon-biaodan'});
				}else{
					$.getJSON(`${SYS_CFG.ctxPath}/menu/listMy`,{"type":ischandao},function(res){
						$("#navBar").show();
				    	$(".layui-side").show();
						if (res.code === 1) {
							var dataStr = list2Tree(res.data, -1);
							//重新渲染左侧菜单
							tab.render(dataStr);

					//自动加载第一个菜单 by xlifeng 20200308
					addTab($(".layui-side .layui-nav .layui-nav-item").first().find("a"));
//					 //左侧菜单默认第一个菜单处于选中状态
				    $(".layui-side .layui-nav-tree .layui-nav-item").first().addClass("layui-this");
						}
					})
				}
				}
		
	//页面加载时判断左侧菜单是否显示
	//通过顶部菜单获取左侧菜单
	$(".topLevelMenus li,.mobileTopLevelMenus dd").click(function(){
		if($(this).parents(".mobileTopLevelMenus").length != "0"){
			$(".topLevelMenus li").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}else{
			$(".mobileTopLevelMenus dd").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}
		$(".layui-layout-admin").removeClass("showMenu");
		$("body").addClass("site-mobile");
		getData($(this).data("menu"));
		//渲染顶部窗口
		tab.tabMove();
	})
	
	//修改密码
	$('.changePwd').click(function(){
		var topLayer = layui.layer;
		 
		return topLayer.open({
            title : `修改密码`,
            type : 2,
            area:['80%','80%'],
            content : `${SYS_CFG.ctxPath}/user/resetPwd`
        });
	});

	//隐藏左侧导航
	$(".hideMenu").click(function(){
		if($(".topLevelMenus li.layui-this a").data("url")){
			layer.msg("此栏目状态下左侧菜单不可展开");  //主要为了避免左侧显示的内容与顶部菜单不匹配
			return false;
		}
		$(".layui-layout-admin").toggleClass("showMenu");
		$(this).toggleClass("active");
		//渲染顶部窗口
		tab.tabMove();
	})
	
	//通过顶部菜单获取左侧二三级菜单   注：此处只做演示之用，实际开发中通过接口传参的方式获取导航数据
	getData("contentManagement");

	//手机设备的简单适配
    $('.site-tree-mobile').on('click', function(){
		$('body').addClass('site-mobile');
	});
    $('.site-mobile-shade').on('click', function(){
		$('body').removeClass('site-mobile');
	});

	// 添加新窗口
	$("body").on("click",".layui-side .layui-nav .layui-nav-item a",function(){
		//如果不存在子级
		if($(this).siblings().length == 0){
			addTab($(this));
			$('body').removeClass('site-mobile');  //移动端点击菜单关闭菜单层
		}else{
		   $(this).closest(".layui-nav-item").addClass("layui-nav-parent");
		}
	    $(this).closest(".layui-nav-item").siblings().removeClass("layui-nav-parent");
/*		$(this).parent("li").siblings().removeClass("layui-nav-itemed");*/
	})
	
   //点击子菜单 菜单呈现折叠状态	
   $("body").on("click",".layui-nav-child dd",function(){
		$(this).closest(".layui-nav-child").find(".nav-child-close").click();
	})
	
   $("body").on("click",".layui-nav-parent .nav-child-close",function(e){
		e.stopPropagation();
		$(this).closest(".layui-nav-item").removeClass("layui-nav-parent");
		if($(".layui-layout-admin").hasClass("suspensionMenu")){
			$(".layui-layout-admin").removeClass("suspensionMenu").addClass("showMenu");
		}else{
			$(".layui-layout-admin").removeClass("suspensionMenu showMenu");
		}
	})
	
   $('body').click(function(e) {
		var target = $(e.target);
		if(!target.is('.layui-side *')) {
			if(!$(".layui-side .layui-nav-parent").length==0){
				$(".layui-nav-parent .nav-child-close").click();
			}
		}
	});
	$(".layui-show").find("iframe").contents().find("body").on("click",'',function(e) {
		var target = $(e.target);
		if(!target.is('.layui-side *')) {
			if(!$(".layui-nav-parent").length==0){
				$(".layui-nav-parent .nav-child-close").click();
			}
		}
	});
	
	//搜索回车事件
	 $("#searchValue").keydown(function (event) {
	      if (event.keyCode == 13) {
		     tabAddFun();
	       }
	  });
	//清除缓存
	$(".clearCache").click(function(){
		window.sessionStorage.clear();
        window.localStorage.clear();
        var index = layer.msg('清除缓存中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            layer.msg("缓存清除成功！");
        },1000);
    })

	//刷新后还原打开的窗口
    if(cacheStr == "true") {
        if (window.sessionStorage.getItem("menu") != null) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
            curmenu = window.sessionStorage.getItem("curmenu");
            var openTitle = '';
            for (var i = 0; i < menu.length; i++) {
                openTitle = '';
                if (menu[i].icon) {
                    if (menu[i].icon.split("-")[0] == 'icon') {
                        openTitle += '<i class="seraph ' + menu[i].icon + '"></i>';
                    } else {
                        openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
                    }
                }
                openTitle += '<cite>' + menu[i].title + '</cite>';
                openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
                element.tabAdd("bodyTab", {
                    title: openTitle,
                    content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                    id: menu[i].layId
                })
                //定位到刷新前的窗口
                if (curmenu != "undefined") {
                    if (curmenu == '' || curmenu == "null") {  //定位到后台首页
                        element.tabChange("bodyTab", '');
                    } else if (JSON.parse(curmenu).title == menu[i].title) {  //定位到刷新前的页面
                        element.tabChange("bodyTab", menu[i].layId);
                    }
                } else {
                    element.tabChange("bodyTab", menu[menu.length - 1].layId);
                }
            }
            //渲染顶部窗口
            tab.tabMove();
        }
    }else{
		window.sessionStorage.removeItem("menu");
		window.sessionStorage.removeItem("curmenu");
	}
	
	
	function list2Tree(list, pid){
		
		var current_list = [];
		$.each(list, function(index, item){
			if (item.pid === pid) {
				item.children = list2Tree(list, item.id)
				item.spread = false;
				current_list.push(item);
			}
		})
		
		return current_list;
	}
	if(window.parent != window){
		var ur=url.substring(url.lastIndexOf("?")+1,url.length);
		ischandao=1;
		$('#navBar .bottom-con').hide();
		$('.showMenu').addClass('extend-layui-layout');
		var html = `<li target='_blank'></li>`;
		tabAdd({ target:'_blank',title:'申请详情',
	      		url:`${SYS_CFG.ctxPath}`+ur,
	      		html:html,
	      		icon:'iconfont icon-biaodan'});
	}
})

//打开新窗口
function addTab(_this){
	tab.tabAdd(_this);
}

//激活某个窗口
function changeTab(title){
	var id = tab.getLayId(title);
	layui.element.tabChange("bodyTab", id);
	refreshCurrTab();
}
/**
 * 添加一个标签
 * options
 * 	title: 标题
 * 	icon: 图标
 * 	url: url
 * 	content： 内容
 * @returns
 */
function tabAdd(options){

	var id = new Date().getTime();
	var title = `<i class="${options.icon}"></i><cite>${options.title}</cite>`+
				`<i class="layui-unselect layui-tab-close iconfont icon-quxiao" data-id="'+tabIdIndex+'"></i>`;
	var content = `<iframe src="${options.url}" data-id='"+tabIdIndex+"'></frame>`;
	
	layui.element.tabAdd("bodyTab",{title:title, content:content, id:id,clickFunc:function(id){debugger;
		selectIndex.push(id);
	}});
	layui.element.tabChange("bodyTab", id);
	selectIndex.push(id);
	
	return id;
}

/**
 * 删除一个Tab
 * id
 * @returns
 */
function tabDel(id){
	layui.element.tabDelete("bodyTab", id);
}

/**
 * 切换选中
 * @returns
 */
function tabChange(id){
	layui.element.tabChange("bodyTab", id);
}

/**
 * 获取选中tab id
 * @returns
 */
function getSelectedTabId(){
	return layui.$(".layui-tab-title .layui-this").attr("lay-id");
}
/**
 * 关闭当前选中tab,并提供回执行调方法的能力
 * @returns
 */
function colseCurrTab(callback){
	var tabId = getSelectedTabId();
	if(callback)callback();
	tabDel(tabId);
}

/**
 * 刷新当前选中的页签
 */
function refreshCurrTab(){
	layui.$(".clildFrame .layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload();
}

	
/**
 * 全局搜索
 */
function tabAddFun(){
	
	var searchValue=layui.$('#searchValue').val();
	if(!!searchValue){
		if(layui.$("select[name='city']").val()=="1"){
			layui.$.get(`${SYS_CFG.ctxPath}/project/search?val=`+searchValue, function (res) {
            	if(res.code==1){
            		tabAdd({
            			title:layui.i18n("et.project.detail"),
            			url:`${SYS_CFG.ctxPath}/project/detail?projectId=`+res.data.id,
            			icon:'iconfont icon-xiangmu'
            		});
            	}else {
            		layer.msg(res.message, {icon: 2}); 
				}
            });
		}else{
		tabAdd({url:'sv?k='+searchValue,title:"全局搜索"})
		};
	}
}

var selectIndex = [];
/**
 * 注销调用的方法
 */
function relogin() {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.confirm('确定要退出登录么？', { icon: 3, title: '退出', offset: '100px', anim: 1 }, function(index) {
        	window.top.location.href = `${SYS_CFG.ctxPath}`+"/login";
        	layer.close(index);
        });
    });

}