package com.xlf.modules.sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSON;
import com.xlf.common.Views;
import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController implements IEntityController<User, Integer>{
	
	@Autowired
	private UserService userService;
	
	@Override
	public IEntityService<User, Integer> getEntityService() {
		return userService;
	}
	
	@GetMapping("/list")
	public String viewList(){
		
		return Views.Base.USER_LIST;
	}
	
	@GetMapping("/add")
	public String viewAdd(@RequestParam(name="id", required=false) Integer id,ModelMap map){
		
		//如果是编辑的话，先查询出原有数据
		map.put("user", JSON.toJSONString(userService.get(id)));
		
		return Views.Base.USER_ADD;
	}
}
