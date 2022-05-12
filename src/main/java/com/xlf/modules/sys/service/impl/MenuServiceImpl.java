package com.xlf.modules.sys.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.Menu;
import com.xlf.modules.sys.mapper.MenuMapper;
import com.xlf.modules.sys.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService{
	
	@Autowired
	private MenuMapper menuMapper;
	
	@Override
	public BaseMapper<Menu> getBaseMapper() {
		return menuMapper;
	}

	@Override
	public List<Menu> listMy(String userId,int type) {
		return menuMapper.listMy(userId,type);
	}

	@Override
	public Set<String> listMyPerms(Integer userId) {
		return menuMapper.listMyPerms(userId);
	}
}
