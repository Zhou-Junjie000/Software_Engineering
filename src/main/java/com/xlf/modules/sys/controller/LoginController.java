package com.xlf.modules.sys.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.xlf.common.Views;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.entity.UserToken;
import com.xlf.modules.sys.service.UserService;
import com.xlf.modules.sys.util.AuthToken;
import com.xlf.modules.sys.util.TokenGenerator;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
public class LoginController{
	@Autowired
	private UserService userService;
	
	@GetMapping("/login")
	public String login(){
		
		return Views.LOGIN;
	}
	
	
	@PostMapping("/login")
	@ResponseBody
	public ResultVo login(@RequestParam String account, 
						@RequestParam(required = false) String password, 
						@RequestParam(name="rememberMe", required=false, defaultValue="false") Boolean rememberMe,
						@RequestParam(name="loginType", required=false, defaultValue="web") String loginType){
		Subject subject = SecurityUtils.getSubject();
		System.out.println("+++++++++++++++++++"+account+"=========="+password);
		try {
			subject.login(new UsernamePasswordToken(account, DigestUtil.md5Hex(password), rememberMe));
            
        } catch (UnknownAccountException e) {
            return ResultUtil.fail(403, "用户不存在");
        } catch (IncorrectCredentialsException e) {
            return ResultUtil.fail(403, "用户名或密码错误");
        } catch (Exception e) {
            return ResultUtil.fail(403, "系统异常请联系管理员");
        }
		
		return ResultUtil.success();
	}
	
	@PostMapping("/loginApp")
	@ResponseBody
	public ResultVo loginApp(@RequestBody User user){
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(new UsernamePasswordToken(user.getAccount(), DigestUtil.md5Hex(user.getPassword()), true));
            
        } catch (UnknownAccountException e) {
            return ResultUtil.fail(403, "用户不存在");
        } catch (IncorrectCredentialsException e) {
            return ResultUtil.fail(403, "用户名或密码错误");
        } catch (Exception e) {
            return ResultUtil.fail(403, "系统异常请联系管理员");
        }
		User loginUser = (User)SecurityUtils.getSubject().getPrincipal();
		String token = TokenGenerator.generateValue();
        Date now = new Date();
        Date expireTime = new Date(now.getTime() + 43200000L);
        UserToken tokenEntity = (UserToken)userService.getTokenById(Integer.parseInt(loginUser.getId()));
        if (tokenEntity == null) {
            tokenEntity = new UserToken();
            tokenEntity.setUserid(Integer.parseInt(loginUser.getId()));
            tokenEntity.setToken(token);
            tokenEntity.setUpdateTime(now);
            tokenEntity.setExpireTime(expireTime);
            userService.saveToken(tokenEntity);
        } else {
            token = tokenEntity.getToken();
            tokenEntity.setUpdateTime(now);
            tokenEntity.setExpireTime(expireTime);
            userService.updateTokenById(tokenEntity);
        }

        AuthToken authToken = AuthToken.builder().token(token).expire(43200).build();
        authToken.setUserInfo(loginUser);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("XSessionId", SecurityUtils.getSubject().getSession().getId());
		map.put("userId", loginUser.getId());
		map.put("authToken", authToken);
		return ResultUtil.success(map);
	}
	
}
