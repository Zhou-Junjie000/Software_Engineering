package com.xlf.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.Role;

@Mapper
public interface RoleMapper extends BaseMapper<Role>{
	
	@Select("select sr.* from t_role sr ,t_user_role sur where sr.id=sur.role_id and sur.user_id=#{userId}")
	List<Role> listMy(@Param("userId") String userId);

}
