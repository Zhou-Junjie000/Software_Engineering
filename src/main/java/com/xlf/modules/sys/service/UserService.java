package com.xlf.modules.sys.service;

import java.util.List;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.entity.UserToken;

public interface UserService extends MybatisEntityService<User, Integer>{
	
	/**
	 * 
	 * @param username
	 * @return
	 */
	User getByAccount(String username);
	
	
	List<String> getRole(String userid);
	
	String getGender(String userName);
	
	UserToken getTokenById(Integer userid);
	
	int saveToken(UserToken userToken);
	
	int updateTokenById(UserToken userToken);
	
	User getUserByToken(String token);

}