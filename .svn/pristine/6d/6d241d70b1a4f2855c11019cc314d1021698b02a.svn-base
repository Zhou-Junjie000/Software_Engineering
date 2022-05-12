package com.xlf.modules.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.Role;
import com.xlf.modules.sys.mapper.RoleMapper;
import com.xlf.modules.sys.service.RoleService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleMapper roleMapper;
	
	@Override
	public BaseMapper<Role> getBaseMapper() {
		return roleMapper;
	}

	@Override
	public List<Role> listMy(String userId) {
		return roleMapper.listMy(userId);
	}

	@Override
	public String getRoleIds(String userId) {
		List<Role> list = roleMapper.listMy(userId);
		if(!list.isEmpty()){
			String roleids = "";
			for(Role r:list){
				roleids+=","+r.getId();
			}
			return roleids.substring(1);
		}
		return  ",";
	}
	
	@Override
	public Role getRole(String userId) {
		List<Role> list = roleMapper.listMy(userId);
		if(!list.isEmpty()){
	 		return list.get(0);
		}
		return null;
	}

}
