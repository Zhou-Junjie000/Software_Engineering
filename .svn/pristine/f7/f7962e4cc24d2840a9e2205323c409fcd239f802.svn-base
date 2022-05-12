package com.xlf.modules.sys.controller;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.sys.entity.Menu;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.service.MenuService;

@Controller
@RequestMapping("/menu")
public class MenuController implements IEntityController<Menu, Integer>{
	
	@Autowired
	private MenuService menuService;
	
	@Override
	public IEntityService<Menu, Integer> getEntityService() {
		return menuService;
	}
	
	@RequestMapping("/listMy")
	@ResponseBody
	public ResultVo listMy(@RequestParam(required = false) String type){
		
		User user = (User) SecurityUtils.getSubject().getPrincipal();
		
		return ResultUtil.success(menuService.listMy(user.getId(),type==null?0:Integer.valueOf(type)));
	}

}
