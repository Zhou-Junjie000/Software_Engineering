package com.xlf.modules.sys.mapper;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.Menu;

@Mapper
public interface MenuMapper extends BaseMapper<Menu>{
	
	@Select({"<script>",
		"SELECT ",
		"	sm.id, sm.NAME, sm.pid, sm.icon, sm.url ",
		"FROM ",
		"	t_menu sm ",
		"WHERE ",
//		"	sm. STATUS = '1' ",
//		"AND sm.type = '1' ",
		" sm.id IN ( ",
		"	SELECT ",
		"		srm.menu_id ",
		"	FROM ",
		"		t_role_menu srm ",
		"	LEFT JOIN t_role sr ON srm.role_id = sr.id ",
		"	LEFT JOIN t_user_role sur ON sr.id = sur.role_id ",
		"	WHERE ",
		"		sur.user_id = #{userId} ",
		") ",
		"<when test='type==1'>",
		" AND sm.id NOT IN ('12','14') ",//隐藏放行确认和放行申请
		"</when>",
		"ORDER BY ",
		"	pid, ",
		"	ordernum ",
		"</script>"})
	List<Menu> listMy(@Param("userId")String userId,@Param("type")int type);
	
	@Select({
		"SELECT ",
		"	DISTINCT sm.perms ",
		"FROM ",
		"	t_menu sm ",
		"WHERE ",
		"	sm. STATUS = '1' ",
		"AND sm.perms is not null ",
		"AND sm.type = '2' ",
		"AND sm.id IN ( ",
		"	SELECT ",
		"		srm.menu_id ",
		"	FROM ",
		"		t_role_menu srm ",
		"	LEFT JOIN t_role sr ON srm.role_id = sr.id ",
		"	LEFT JOIN t_user_role sur ON sr.id = sur.role_id ",
		"	WHERE ",
		"		sur.user_id = #{userId} ",
		") ",
		"ORDER BY ",
		"	pid, ",
		"	ordernum "})
	Set<String> listMyPerms(@Param("userId")Integer userId);
}
