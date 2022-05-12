package com.xlf.modules.card.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.card.entity.Card;

@Mapper
public interface CardMapper extends BaseMapper<Card>{

	@Select({"<script>",
<<<<<<< HEAD
		" select id,type,startdate,enddate,fee,remark,createtime from t_card a where 1=1",
=======
			" select id,type,startdate,enddate,(select SAFEPASSWORD from t_user where id = userid) userid,fee,remark,createtime from t_card a where 1=1",
>>>>>>> e1a8a41 (sprint4)
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.type like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by createtime" +
		"</script>"})
	List<Card> pageList(@Param("search") String search,@Param("entity") Card entity,
			@Param("condition") String condition);
}
