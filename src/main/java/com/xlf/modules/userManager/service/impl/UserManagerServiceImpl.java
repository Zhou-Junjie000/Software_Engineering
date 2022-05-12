package com.xlf.modules.userManager.service.impl;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.PageVo;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.entity.UserManagerEntity;
import com.xlf.modules.userManager.mapper.UserManagerMapper;
import com.xlf.modules.userManager.service.UserManagerService;
import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.hutool.core.util.StrUtil;
@Service
public class UserManagerServiceImpl implements UserManagerService {
	@Autowired
	private UserManagerMapper mapper;
	@Override
	public BaseMapper<UserManagerEntity> getBaseMapper() {
		return mapper;
	}
	@Override
	public PageVo page(PageVo pageVo, UserManagerEntity entity) {
		try {
		String orderBy = "";
		String defaultOrderBy = pageOrderBy();
		
		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = defaultOrderBy;
		}
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		List<UserManagerEntity> list = mapper.pageList(pageVo.getSearch());
		PageInfo<UserManagerEntity> pageInfo = new PageInfo<UserManagerEntity>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	@Override
	public UserManagerEntity get(String id) {
		return mapper.get(id);
	}
	@Override
	public boolean isExistAccount(String account) {
		//效验登录名是否存在
		Integer num = mapper.isExistAccount(account);
		if(num<1) {
			return true;
		}
		return false;
	}
	@Override
	public void save(UserManagerEntity entity){
		String password = entity.getPassword();
		//密码加密
		byte[] digest = null;
        
        MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("md5");
			digest  = md5.digest(password.getBytes("utf-8"));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        //16是表示转换为16进制数
        String md5Password = new BigInteger(1, digest).toString(16);
        entity.setPassword(md5Password);
        //添加用户基本信息
		mapper.insertUserInfo(entity);
		//判断是否有角色
		if(entity.getRole()!=null && entity.getRole()!="") {
			mapper.insertUserRole(entity);
		}
		
	}
	@Override
	public void update(UserManagerEntity entity){
		//判断时候修改登录名
		/*String oldName = mapper.isChangeUserName(entity.getId());*/
		//更改用户表信息
		mapper.updateUserInfo(entity);
		mapper.updateUserRole(entity);
		
	}
<<<<<<< HEAD
=======

>>>>>>> e1a8a41 (sprint4)
	@Override
	public ResultVo updatePassword(String id, String password, String newPassword) {
		/*
		 * password 前台输入旧密码
		 * oldPassword 后台查出的旧密码
		 * newPassword 前台传的新密码
		 */
		//先通过用户id获取当前密码
		String oldPassword = mapper.getPasswordById(id);
		//给password加密md5 与当前密码比较
		//密码加密
		byte[] digest = null;

		MessageDigest md5 ;
		try {
			if(StringUtils.isEmpty(password)){
				md5 = MessageDigest.getInstance("md5");
				digest = md5.digest(newPassword.getBytes("utf-8"));
				newPassword = new BigInteger(1, digest).toString(16);

				mapper.updatePassword(id, newPassword);
			}else{
				md5 = MessageDigest.getInstance("md5");
				digest = md5.digest(password.getBytes("utf-8"));

				// 16是表示转换为16进制数
				password = new BigInteger(1, digest).toString(16);
				if(password.equals(oldPassword)) {// 验证旧密码是否正确
					// 修改密码
					// 对新密码进行加密
					md5 = MessageDigest.getInstance("md5");
					digest = md5.digest(newPassword.getBytes("utf-8"));
					newPassword = new BigInteger(1, digest).toString(16);

					mapper.updatePassword(id, newPassword);
				} else {
					return ResultUtil.fail(2,"旧密码输入错误!");
				}
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ResultUtil.success(id,"修改成功!");
		
	}
	@Override
<<<<<<< HEAD
=======
	public ResultVo updatePassword2(String id, String password, String newPassword) {
		/*
		 * password 前台输入旧密码
		 * oldPassword 后台查出的旧密码
		 * newPassword 前台传的新密码
		 */
		//先通过用户id获取当前密码
		String oldPassword = mapper.getPasswordById(id);
		//给password加密md5 与当前密码比较
		//密码加密
		byte[] digest = null;

		MessageDigest md5 ;
		try {
			if(StringUtils.isEmpty(password)){
				md5 = MessageDigest.getInstance("md5");


				mapper.updatePassword2(id, newPassword);
			}else{
				md5 = MessageDigest.getInstance("md5");
				digest = md5.digest(password.getBytes("utf-8"));

				// 16是表示转换为16进制数
				password = new BigInteger(1, digest).toString(16);
				if(password.equals(oldPassword)) {// 验证旧密码是否正确
					// 修改密码
					// 对新密码进行加密
					md5 = MessageDigest.getInstance("md5");
					digest = md5.digest(newPassword.getBytes("utf-8"));
					newPassword = new BigInteger(1, digest).toString(16);

					mapper.updatePassword2(id, newPassword);
				} else {
					return ResultUtil.fail(2,"旧密码输入错误!");
				}
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ResultUtil.success(id,"修改成功!");

	}
	@Override
>>>>>>> e1a8a41 (sprint4)
	public ResultVo remakePassword(String ids) {
		//将重置密码 Admin1234加密成md5
		MessageDigest md5 ;
		byte[] digest = null;
		try {
			md5 = MessageDigest.getInstance("md5");
			digest = md5.digest("Admin1234".getBytes("utf-8"));
			// 16是表示转换为16进制数
			String password = new BigInteger(1, digest).toString(16);
			mapper.remakePassword(ids,password);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ResultUtil.success(ids,"重置密码成功!");
	}
	public void batchDelete(String[] ids){
		mapper.deleteUserById(ids);
	}
	
	public String getRoleByUserid(User user){
		return mapper.getRoleByUserid(user.getId());
	}
	
}
