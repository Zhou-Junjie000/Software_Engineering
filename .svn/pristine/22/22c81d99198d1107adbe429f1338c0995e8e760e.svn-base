package com.xlf.modules.userManager.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.userManager.entity.UserManagerEntity;
@Mapper
public interface UserManagerMapper  extends BaseMapper<UserManagerEntity>{
	@Select({"<script>",
		"select id ,account , name,mail, " + 
		"(select name from t_dept de where de.id = dept) dept , " + 
		"(CASE sex " + 
		"	WHEN '0' THEN " + 
		"		'男' " + 
		"	WHEN '1' THEN " + 
		"		'女' " + 
		"	END) as sex " + 
		"from t_user where 1=1 " +
		"<if test='search!=null and search!=\"\"'>"  + 
		"	 	and  account like  '%${search}%' "  + 
		"</if>" +
		"</script>"})
	List<UserManagerEntity> pageList(@Param("search") String search);
	
	@Select({"<script>",
		"SELECT id, account, NAME, mail, dept, sex,( SELECT role_id FROM t_user_role ms WHERE ms.user_id = id ) AS role "+ 
		"FROM " + 
		"	t_user " + 
		"WHERE " + 
		"	id = '${id}'"+
		"</script>"})
	UserManagerEntity get(@Param("id")String id);
	
	
	@Insert({"<script>",
		"insert into t_user(account,password,name,mail,dept,sex) "
		+ "values('${entity.account}','${entity.password}','${entity.name}',"
		+ "'${entity.mail}','${entity.dept}','${entity.sex}')" +
		"</script>"})
	@Options(useGeneratedKeys = true, keyProperty = "entity.id", keyColumn = "id")
	int insertUserInfo(@Param("entity")UserManagerEntity entity);
	@Insert({"<script>",
		"insert into t_user_role(user_id,role_id) "
		+ "values('${entity.id}','${entity.role}')" +
		"</script>"})
	void insertUserRole(@Param("entity")UserManagerEntity entity);
	
	
	@Update({"<script>",
		"update t_user set name = '${entity.name}', "
		+ "mail = '${entity.mail}',dept = '${entity.dept}',sex ='${entity.sex}' "
		+ "where id = '${entity.id}'" +
		"</script>"})
	void updateUserInfo(@Param("entity")UserManagerEntity entity);
	
	@Update({"<script>",
		"update t_user_role set role_id = '${entity.role}' where user_id = '${entity.id}'" +
		"</script>"})
	void updateUserRole(@Param("entity")UserManagerEntity entity);
	
	@Select({"<script>",
		"select password from t_user where id = '${id}'"+
		"</script>"})
	String getPasswordById(@Param("id")String id);
	
	@Update({"<script>",
		"update t_user set password = '${newPassword}' where id = '${id}'" +
		"</script>"})
	void updatePassword(@Param("id")String id, @Param("newPassword")String newPassword);
	
	@Update({"<script>",
		"update t_user set password = '${password}' where id in "+ 
		"<foreach collection=\"ids.split(',')\" item='value' open='(' separator=',' close=')'>"+
		"		#{value}  " +
		"</foreach>"+
		"</script>"})
	void remakePassword(@Param("ids")String ids,@Param("password")String password);
	
	@Delete({
		"<script>",
		"delete from t_user where 1=2 "+
		"<foreach item='item' index='index' collection='ids' open='or id in (' close=')'  separator=',' >"+
        "'${item}'"+
        "</foreach>" +
		"</script>"
	})
	void deleteUserById(@Param("ids")String[] ids);
	
	@Select({"<script>",
		"select count(*) from t_user where account = '${account}'"+
		"</script>"})
	Integer isExistAccount(@Param("account")String account);
	
	@Select({"<script>",
		"SELECT role_id FROM t_user_role ms WHERE ms.user_id = #{id} limit 1"+ 
		"</script>"})
	String getRoleByUserid(@Param("id")String id);

}
