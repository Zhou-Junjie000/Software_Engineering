package com.xlf.modules.card.controller;

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
import com.xlf.modules.card.entity.Card;
import com.xlf.modules.card.service.CardService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.service.UserManagerService;

@Controller
@RequestMapping("/card")
public class CardController implements IEntityController<Card, Integer>{

	@Autowired
	private CardService service;
	
	@Autowired
	private UserManagerService userManagerService;
	
	@Override
	public IEntityService<Card, Integer> getEntityService() {
		return service;
	}
	
	@GetMapping("/list")
	public ModelAndView viewList() {
		String url = Views.Base.CARD_LIST;
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
		String url = Views.Base.CARD_ADD;
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
	public ResultVo save(Card t) {
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