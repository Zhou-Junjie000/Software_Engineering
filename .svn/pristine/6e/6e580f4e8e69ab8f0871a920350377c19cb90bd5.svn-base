package com.xlf.modules.book.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.book.entity.Book;
@Mapper
public interface BookMapper extends BaseMapper<Book>{

	@Select({"<script>",
		" select id,type, coachid,(select name from t_coach where id = coachid) coachname,(select sex from t_coach where id=coachid) coachsex,courseid,(select name from t_course where id = courseid) coursename,materialid,(select name from t_material where id = materialid) materialname,date_format(booktime,'%Y-%m-%d %H:%i:%s') booktime,userid,(select name from t_user where id = userid) username,date_format(createtime,'%Y-%m-%d %H:%i:%s')createtime from t_book a where 1=1",
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.name like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by booktime" +
		"</script>"})
	List<Book> pageList(@Param("search") String search,@Param("entity") Book entity,
			@Param("condition") String condition);
	
	
	@Select({"<script>",
		" select id,date_format(booktime,'%Y-%m-%d %H:%i:%s') booktime from t_book a where 1=1",
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.name like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by booktime desc" +
		"</script>"})
	List<Book> pageList3(@Param("search") String search,@Param("entity") Book entity,
			@Param("condition") String condition);
	
	@Select({"<script>",
		"select count(*) from t_card a,t_fee b where a.id = b.cardid and (now() between a.startdate and a.enddate)" ,
	 	"<if test='entity.userid!=null and entity.userid!=\"\"'>" +
	 	"	and b.userid = #{entity.userid} " +
	 	"</if>" +
	 	"<if test='entity.condition!=null and entity.condition!=\"\"'>" +
	 	"	${entity.condition} " +
	 	"</if>" +
	 	"</script>"})
	int getNumByUser(@Param("entity") Book entity);

	@Select("select count(*) from t_book where  area = #{entity.area} and booktime  = #{entity.booktime}")
	int getNumByArea(@Param("entity") Book entity);
	
}
