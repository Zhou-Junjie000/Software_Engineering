package com.xlf.modules.sys.controller;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xlf.common.Views;
import com.xlf.modules.sys.entity.User;

@Controller
@RequestMapping
public class IndexController{
	
	@GetMapping("/index")
	public String index(ModelMap model){
		model.put("user", SecurityUtils.getSubject().getPrincipal());
		return Views.INDEX;
	}
	
}
