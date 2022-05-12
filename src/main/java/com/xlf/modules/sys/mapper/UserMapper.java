package com.xlf.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.entity.UserToken;

@Mapper
public interface UserMapper extends BaseMapper<User>{
	
	@Select("select * from t_user su where su.account=#{account}")
	User getByAccount(@Param("account") String account);
	
	@Select("select role_id from t_user_role su where user_id=#{id}")
	List<String> getRole(@Param("id") String id);

	@Select("select gender from zentao.zt_user where realname=#{name}")
	String getGender(@Param("name") String name);
	
	@Select("select name from t_user su where concat(su.`NAME`,'<',su.MAIL,'>') = #{mail}")
	String getByMail(@Param("mail") String mail);
	
	@Select("select * from t_user_token where userid = #{userid}")
	UserToken getTokenById(@Param("userid") Integer userid);
	
	@Insert("insert into t_user_token values(#{entity.userid},#{entity.token},#{entity.expireTime},#{entity.updateTime})")
	int saveToken(@Param("entity") UserToken entity);

	
	@Update("update t_user_token set expireTime = #{entity.expireTime},updateTime = #{entity.updateTime} where userid = #{entity.userid}")
	int updateTokenById(@Param("entity") UserToken entity);
	
	@Select("select * from t_user where id in(select userid from  t_user_token where token = #{token} ) limit 1")
	User getUserByToken(@Param("token") String token);
}
