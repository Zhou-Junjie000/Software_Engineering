package com.xlf.modules.coach.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.coach.entity.Coach;

@Mapper
public interface CoachMapper extends BaseMapper<Coach>{

	@Select({"<script>",
		" select id,name,sex,age,info,(select value from t_dict_data where dict_type = 'area' and fldkey = area) area  from t_coach a where 1=1",
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.name like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by name" +
		"</script>"})
	List<Coach> pageList(@Param("search") String search,@Param("entity") Coach entity,
			@Param("condition") String condition);
}
