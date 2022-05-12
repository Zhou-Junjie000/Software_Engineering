package com.xlf.modules.sys.service;

import java.util.List;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.modules.sys.entity.Role;

public interface RoleService extends MybatisEntityService<Role, Long> {

	List<Role> listMy(String userId);
	
	String getRoleIds(String userId);
	
	Role getRole(String userId);

}
