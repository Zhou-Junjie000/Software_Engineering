package com.xlf.modules.sys.service;

import java.util.List;
import java.util.Set;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.modules.sys.entity.Menu;

public interface MenuService extends MybatisEntityService<Menu, Integer>{
	
	/**
	 * 查询当前用户下所有菜单
	 * @param userId
	 * @return
	 */
	List<Menu> listMy(String userId,int type);
	
	/**
	 * 所有权限
	 * @param userId
	 * @return
	 */
	Set<String> listMyPerms(Integer userId);
}
