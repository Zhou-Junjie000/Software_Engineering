package com.xlf.modules.userManager.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xlf.common.Views;
import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.fee.Fee;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.entity.UserManagerEntity;
import com.xlf.modules.userManager.service.UserManagerService;

@Controller
@RequestMapping("/userManager")
public class UserManagerController implements IEntityController<UserManagerEntity, String>{
	@Autowired
	private UserManagerService service;
	
	/**
	 * 用户列表界面
	 */
	@GetMapping("/list")
	public String viewList() {
		return Views.Base.USER_MANAGER_LIST;
	}
	
	@Override
	public IEntityService<UserManagerEntity, String> getEntityService() {
		return service;
	}
	/**
	 * 新增用户界面
	 */
    @GetMapping("/viewAdd")
    public ModelAndView viewAdd(@RequestParam(name="id", required=false) String id) {

        ModelAndView mav = new ModelAndView(Views.Base.USER_MANAGER_ADD);
        Map<String,Object> map = new HashMap<String, Object>();
        if(id!=null){
        	map.put("userId",id);
        }else{
        	map.put("userId",0);
        }
        mav.addAllObjects(map);
        return mav;
    }
    @Override
    public ResultVo save(UserManagerEntity t) {
    	//判断登录名是否存在 存在则提示已存在 不存在则新增用户
    	if(service.isExistAccount(t.getAccount())){
    		return IEntityController.super.save(t);
    	}else{
    		return ResultUtil.fail(0, "该用户已存在");
    	}
    	
    }
    
    /**
	 * 修改密码界面
	 */
	@GetMapping("/password")
	public ModelAndView password(@RequestParam(name="id", required=false) String id) {
		ModelAndView mav = new ModelAndView(Views.Base.USER_MANAGER_PASSWORD);
		Map<String, Object> map = new HashMap<String, Object>();
		if (id != null) {
			map.put("userId", id);
		} else {
			map.put("userId", 0);
		}
		mav.addAllObjects(map);
		return mav;
	}
	/**
	 * 修改密码
	 */
	@PostMapping("/updatePwd")
    @ResponseBody
	public ResultVo updatePassword(@RequestParam(name="id", required=false) String id,
			@RequestParam(name="password", required=false) String password,
			@RequestParam(name="newPassword", required=false) String newPassword) {
		ResultVo vo = service.updatePassword(id,password,newPassword);
		return vo;
	}
<<<<<<< HEAD
=======

>>>>>>> e1a8a41 (sprint4)
	/**
	 * 批量重置密码
	 */
	@PostMapping("/remakePwd")
    @ResponseBody
	public ResultVo remakePwd(@RequestParam(name="ids", required=false) String ids) {
		ResultVo vo = service.remakePassword(ids);
		return vo;
	}
	@Transactional(rollbackFor = Exception.class)
    @Override
    public ResultVo delete(String[] ids) {
    	ResultVo result = IEntityController.super.delete(ids);
    	if(result.getCode()==1){
    		result.setMessage("删除成功");
    		return result;
    	}
    	result.setMessage("删除失败，请联系管理员！");
    	return result;
    }
	@PostMapping("/modApp")
    @ResponseBody
    public ResultVo modApp(@RequestBody UserManagerEntity entity){
		service.update(entity);
        return ResultUtil.success();
    }
	
	@PostMapping("/addApp")
    @ResponseBody
    public ResultVo addApp(@RequestBody UserManagerEntity entity){
        service.save(entity);
        return ResultUtil.success(entity);
    }
	@PostMapping("/updatePwdApp")
    @ResponseBody
	public ResultVo updatePwdApp(@RequestBody UserManagerEntity entity) {
		ResultVo vo = service.updatePassword(String.valueOf(entity.getId()),"",entity.getNewPassword());
		return vo;
	}
<<<<<<< HEAD
=======
	@PostMapping("/updatePwdApp2")
	@ResponseBody
	public ResultVo updatePwdApp2(@RequestBody UserManagerEntity entity) {
		ResultVo vo = service.updatePassword2(String.valueOf(entity.getId()),"",entity.getNewPassword());
		return vo;
	}
>>>>>>> e1a8a41 (sprint4)
}
