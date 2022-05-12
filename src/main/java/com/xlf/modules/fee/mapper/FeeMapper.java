package com.xlf.modules.fee.mapper;

import java.util.List;

<<<<<<< HEAD
=======
import com.xlf.modules.userManager.entity.UserManagerEntity;
>>>>>>> e1a8a41 (sprint4)
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.fee.Fee;
<<<<<<< HEAD
=======
import org.apache.ibatis.annotations.Update;

>>>>>>> e1a8a41 (sprint4)
@Mapper
public interface FeeMapper extends BaseMapper<Fee>{

	@Select({"<script>",
<<<<<<< HEAD
		" select id,type,(select name from t_course where id = courseid) courseid,(select name from t_coach where id = coachid) coachid,cardid,userid,(select name from t_user where id = userid) username,num,fee,date_format(feetime,'%Y-%m-%d %H:%i:%s') feetime from t_fee a where 1=1",
=======
		" select id,type,(select name from t_course where id = courseid) courseid,(select name from t_coach where id = coachid) coachname,coachid,cardid,userid,(select name from t_user where id = userid) username,num,fee,date_format(feetime,'%Y-%m-%d %H:%i:%s') feetime from t_fee a where 1=1",
>>>>>>> e1a8a41 (sprint4)
		"<if test='search!=null and search!=\"\"'>" +
	 	"	and a.name like  '%${search}%' " +
	 	"</if>" +
	 	"<if test='condition!=null and condition!=\"\"'>" +
	 	"	${condition} " +
	 	"</if>" +
	 	"order by feetime desc" +
		"</script>"})
	List<Fee> pageList(@Param("search") String search,@Param("entity") Fee entity,
			@Param("condition") String condition);
	
	@Select("select feetime,sum(fee) fee,(select count(*) from t_book where date_format(booktime,'%Y-%m-%d') = feetime) num from (select date_format(feetime,'%Y-%m-%d') feetime,fee from t_fee) a "
			+ "group by feetime order by feetime ")
	List<Fee> countList(@Param("feetime") String feetime);
	
	@Select("select count(*) from t_fee where type = #{entity.type} and userid=#{entity.userid} and enddate>now()")
	int queryFee(@Param("entity") Fee entity);
<<<<<<< HEAD
=======
	@Update({"<script>",
			"update t_user_role set role_id = '0' where user_id = '${id}'" +
					"</script>"})
	void update1(@Param("id")String id);
	@Update({"<script>",
			"update t_user set roleid = '0' where id = '${id}'" +
					"</script>"})
	void update2(@Param("id")String id);
	@Update({"<script>",
			"update t_book set pay = '2' where id = '${id}'" +
					"</script>"})
	void update3(@Param("id")String id);

>>>>>>> e1a8a41 (sprint4)
}
