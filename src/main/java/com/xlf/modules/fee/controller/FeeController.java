package com.xlf.modules.fee.controller;

import java.util.HashMap;
import java.util.Map;

<<<<<<< HEAD
=======
import com.xlf.modules.coach.entity.Coach;
import com.xlf.modules.coach.service.CoachService;
import com.xlf.modules.course.service.CourseService;
>>>>>>> e1a8a41 (sprint4)
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.druid.util.StringUtils;
import com.xlf.common.Views;
import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.PageVo;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.book.entity.Book;
import com.xlf.modules.card.entity.Card;
import com.xlf.modules.card.service.CardService;
import com.xlf.modules.fee.Fee;
import com.xlf.modules.fee.service.FeeService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.service.UserManagerService;
@Controller
@RequestMapping("/fee")
public class FeeController implements IEntityController<Fee, Integer>{

	@Autowired
	private FeeService service;
<<<<<<< HEAD
	
=======
	@Autowired
	private CoachService coachService;
	@Autowired
	private CourseService courseService;
>>>>>>> e1a8a41 (sprint4)
	@Autowired
	private UserManagerService userManagerService;
	@Autowired
	private CardService cardService;
	
	@Override
	public IEntityService<Fee, Integer> getEntityService() {
		return service;
	}
	
	@GetMapping("/list")
	public ModelAndView viewList(String type,String coachid,String courseid,String cardid) {
		String url = Views.Base.FEE_LIST;
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		String roleId = userManagerService.getRoleByUserid(user);
		map.put("roleId", roleId);
		map.put("type", type);
		map.put("coachid", coachid);
		map.put("courseid", courseid);
		map.put("cardid", cardid);
		ModelAndView mav = new ModelAndView(url);
		mav.addAllObjects(map);
        return mav;
	}
	
	@GetMapping("/list2")
	public ModelAndView viewList2(String type,String coachid,String courseid,String cardid) {
		String url = Views.Base.FEE_LIST2;
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		String roleId = userManagerService.getRoleByUserid(user);
		map.put("roleId", roleId);
		map.put("type", type);
		map.put("coachid", coachid);
		map.put("courseid", courseid);
		map.put("cardid", cardid);
		ModelAndView mav = new ModelAndView(url);
		mav.addAllObjects(map);
        return mav;
	}
	
	@Override
	public ResultVo save(Fee t) {
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		int num = service.queryFee(t);
		if(num>0){
			String info = "";
			if(StringUtils.equals(t.getType(), "coach")){
				info = "您购买的私教课未到期，暂不允许购买！";
			}
			if(StringUtils.equals(t.getType(), "course")){
				info = "您购买的团体课未到期，暂不允许购买！";
			}
			if(StringUtils.equals(t.getType(), "card")){
				info = "您购买的会员卡未到期，暂不允许购买！";
			}
			return ResultUtil.fail(0, info);
		}
		if(StringUtils.equals(t.getType(), "card")){//会员卡交费
			Card card = cardService.get(Integer.parseInt(t.getCardid()));
			t.setStartdate(card.getStartdate());
			t.setEnddate(card.getEnddate());
		}
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
	@RequestMapping("/page2")
    @ResponseBody
	public ResultVo page2(PageVo pageVo, Fee t){
        PageVo vo = service.page2(pageVo, t);
        return ResultUtil.success(vo);
    }
	
	@PostMapping("/addApp")
    @ResponseBody
    public ResultVo addApp(@RequestBody Fee entity){
		int num = service.queryFee(entity);
		if(num>0){
			return ResultUtil.fail(0, "您购买的卡未到期，暂不允许购买！");
		}
//		if(StringUtils.equals(entity.getType(), "card")){//会员卡交费
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		entity.setUserid(user.getId());
		Card card = cardService.get(Integer.parseInt(entity.getCardid()));
		entity.setStartdate(card.getStartdate());
		entity.setEnddate(card.getEnddate());
//		}
<<<<<<< HEAD
		
        service.save(entity);
        return ResultUtil.success(entity);
    }
=======
service.update1(entity.getUserid());
        service.save(entity);
        return ResultUtil.success(entity);
    }
	@PostMapping("/addApp2")
	@ResponseBody
	public ResultVo addApp2(@RequestBody Fee entity){
		int num = service.queryFee(entity);
		if(num==1){
			return ResultUtil.fail(0, "您已支付该订单");
		}
//		if(StringUtils.equals(entity.getType(), "card")){//会员卡交费
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		entity.setUserid(user.getId());



//		}


		service.save(entity);
		service.update2(entity.getBookid());
		return ResultUtil.success(entity);
	}
	@PostMapping("/addApp3")
	@ResponseBody
	public ResultVo addApp3(@RequestBody Fee entity){
		int num = service.queryFee(entity);
		if(num==1){
			return ResultUtil.fail(0, "您已支付该订单");
		}
//		if(StringUtils.equals(entity.getType(), "card")){//会员卡交费
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		entity.setUserid(user.getId());



//		}


		service.save(entity);
		service.update2(entity.getBookid());
		return ResultUtil.success(entity);
	}
	@PostMapping("/addApp4")
	@ResponseBody
	public ResultVo addApp4(@RequestBody Fee entity){
		int num = service.queryFee(entity);
		if(num==1){
			return ResultUtil.fail(0, "您已支付该订单");
		}
//		if(StringUtils.equals(entity.getType(), "card")){//会员卡交费
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		entity.setUserid(user.getId());



//		}


		service.save(entity);
		service.update2(entity.getBookid());
		return ResultUtil.success(entity);
	}
>>>>>>> e1a8a41 (sprint4)
	@RequestMapping("/countList")
    @ResponseBody
    public ResultVo countList(PageVo pageVo, Fee entity){
        return service.countList(pageVo, entity);
    }
<<<<<<< HEAD
	
=======

>>>>>>> e1a8a41 (sprint4)
	/**
	 * 我的付费记录
	 * @param pageVo
	 * @param entity
	 * @return
	 */
	@RequestMapping("/page3App")
    @ResponseBody
    public ResultVo page3App(PageVo pageVo,Fee entity){
        PageVo vo = service.page3(pageVo, entity);
        return ResultUtil.success(vo);
    }
}
