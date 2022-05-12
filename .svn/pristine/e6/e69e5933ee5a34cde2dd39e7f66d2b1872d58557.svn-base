package com.xlf.modules.book.controller;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
import com.xlf.modules.book.service.BookService;
import com.xlf.modules.coach.entity.Coach;
import com.xlf.modules.coach.service.CoachService;
import com.xlf.modules.course.entity.Course;
import com.xlf.modules.course.service.CourseService;
import com.xlf.modules.material.entity.Material;
import com.xlf.modules.material.service.MaterialService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.service.UserManagerService;
@Controller
@RequestMapping("/book")
public class BookController implements IEntityController<Book, Integer>{

	@Autowired
	private BookService service;
	@Autowired
	private CoachService coachService;
	@Autowired
	private CourseService courseService;
	@Autowired
	private MaterialService materialService;
	
	@Autowired
	private UserManagerService userManagerService;
	
	@Override
	public IEntityService<Book, Integer> getEntityService() {
		return service;
	}
	
	@GetMapping("/list")
	public ModelAndView viewList(String type,String coachid,String courseid,String materialid) {
		String url = Views.Base.BOOK_LIST;
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		String roleId = userManagerService.getRoleByUserid(user);
		map.put("roleId", roleId);
		map.put("type", type);
		map.put("coachid", coachid);
		map.put("courseid", courseid);
		map.put("materialid", materialid);
		ModelAndView mav = new ModelAndView(url);
		mav.addAllObjects(map);
        return mav;
	}
	
	@GetMapping("/viewAdd")
	public ModelAndView viewAdd(@RequestParam(name="id", required=false) String id) {
		String url = Views.Base.BOOK_ADD;
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
	public ResultVo save(Book t) {
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
	
	@PostMapping("/addApp")
    @ResponseBody
    public ResultVo addApp(@RequestBody Book entity){
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		entity.setUserid(user.getId());
		//判断有没有买对应的卡
		StringBuffer condition = new StringBuffer();
		if(StringUtils.equals(entity.getType(), "coach")){
			condition.append(" and a.type = '私教卡'");
		}else if(StringUtils.equals(entity.getType(), "course")){
			condition.append(" and a.type = '团体课卡'");
		}else if(StringUtils.equals(entity.getType(), "material")){
			condition.append(" and a.type in('年卡','月卡')");
		}
		entity.setCondition(condition.toString());
		int num = service.getNumByUser(entity);
		if(num == 0){
			return ResultUtil.fail(0, "不允许预约，请先购买对应的会员卡");
		}
		String area = "";//场地
		if(StringUtils.equals(entity.getType(), "coach")){//预约私教
			Coach coach = coachService.get(Integer.parseInt(entity.getCoachid()));
			area = coach.getArea();
		}else if(StringUtils.equals(entity.getType(), "course")){//预约团体课
			Course course = courseService.get(Integer.parseInt(entity.getCourseid()));
			area = course.getArea();
		}else if(StringUtils.equals(entity.getType(), "material")){//预约器材
			area = "102";
		}
		entity.setArea(area);
		num = service.getNumByArea(entity);
		if(StringUtils.equals(area, "101")&&num>32){//游泳池 32个人，判断教练和团体课
			return ResultUtil.fail(0, "预约人数已超上限，请选择其他时间段");
		}else if(StringUtils.equals(area, "102")&&num>25){//健身室 25个人 判断器材
			return ResultUtil.fail(0, "预约人数已超上限，请选择其他时间段");
		}else if(StringUtils.equals(area, "103")&&num>16){//网球场 16个人 判断教练和团体课
			return ResultUtil.fail(0, "预约人数已超上限，请选择其他时间段");
		}else if(StringUtils.equals(area, "104")&&num>20){//运动大厅 20个人
			return ResultUtil.fail(0, "预约人数已超上限，请选择其他时间段");
		}
		entity.setUserid(user.getId());
        service.save(entity);
        return ResultUtil.success("预约成功");
    }
	
	//当前用户快开始的预约
	@RequestMapping("/page2App")
    @ResponseBody
    public ResultVo page2App(PageVo pageVo,Book entity){
        PageVo vo = service.page2(pageVo, entity);
        return ResultUtil.success(vo);
    }
	
	@PostMapping("/delApp")
    @ResponseBody
    public ResultVo delApp(@RequestBody Map<String,Object> map)throws Exception{
		String ids = map.get("ids").toString();
		SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowString = dfs.format(new Date());
		Date now = dfs.parse(nowString);
		String[] idStrArr = ids.split(",");
		Integer[] idArr = new Integer[idStrArr.length];
		for(int i=0;i<idStrArr.length;i++){
			Integer id = Integer.parseInt(idStrArr[i]);
			Book book = service.get(id);
			Date booktime = dfs.parse(book.getBooktime());
			if(now.after(booktime)){
				return ResultUtil.fail(0, "预约时间已过，不允许取消");
			}
			idArr[i] = id;
		}
		service.batchDelete(idArr);
        return ResultUtil.success();
    }
	
	//当前用户快开始的预约
	@RequestMapping("/page3App")
    @ResponseBody
    public ResultVo page3App(PageVo pageVo,Book entity){
        PageVo vo = service.page3(pageVo, entity);
        return ResultUtil.success(vo);
    }
}
