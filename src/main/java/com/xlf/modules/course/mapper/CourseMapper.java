package com.xlf.modules.course.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.course.entity.Course;

@Mapper
public interface CourseMapper extends BaseMapper<Course>{
	
	@Select({"<script>",
<<<<<<< HEAD
		" select id,name,info,day,time,(select value from t_dict_data where dict_type = 'area' and fldkey = area) area,createdate from t_course a where 1=1",
=======
		" select id,cost,name,info,day,time,(select value from t_dict_data where dict_type = 'area' and fldkey = area) area,createdate from t_course a where 1=1",
>>>>>>> e1a8a41 (sprint4)
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.name like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by name" +
		"</script>"})
	List<Course> pageList(@Param("search") String search,@Param("entity") Course entity,
			@Param("condition") String condition);
}
