package com.xlf.modules.coach.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.xlf.common.Views;
import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.coach.entity.Coach;
import com.xlf.modules.coach.service.CoachService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.service.UserManagerService;

@Controller
@RequestMapping("/coach")
public class CoachController implements IEntityController<Coach, Integer>{

	@Autowired
	private CoachService service;
	
	@Autowired
	private UserManagerService userManagerService;
	
	@Override
	public IEntityService<Coach, Integer> getEntityService() {
		return service;
	}
	
	@GetMapping("/list")
	public ModelAndView viewList() {
		String url = Views.Base.COACH_LIST;
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		String roleId = userManagerService.getRoleByUserid(user);
		map.put("roleId", roleId);
		ModelAndView mav = new ModelAndView(url);
		mav.addAllObjects(map);
        return mav;
	}
	
	@GetMapping("/viewAdd")
	public ModelAndView viewAdd(@RequestParam(name="id", required=false) String id) {
		String url = Views.Base.COACH_ADD;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		String roleId = userManagerService.getRoleByUserid(user);
		map.put("roleId", roleId);
		ModelAndView mav = new ModelAndView(url);
		mav.addAllObjects(map);
        return mav;
	}
	
	@Override
	public ResultVo save(Coach t) {
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		ResultVo result = IEntityController.super.save(t);
		if ("success".equals(result.getMessage())) {
			result.setMessage("新增成功");
		}else if(result.getCode()==0){
			return result;
		} else {
			return ResultUtil.fail(0, "新增失败，请联系管理员！");
		}
		return result;
	}
}
