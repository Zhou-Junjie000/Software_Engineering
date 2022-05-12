package com.xlf.modules.sys.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.modules.sys.entity.DictData;

@Mapper
public interface DictDataMapper extends BaseMapper<DictData> {

	@Select(" SELECT " +
			" 	sdd.* " +
			" FROM " +
			" 	t_dict_data sdd, " +
			" 	t_dict sd " +
			" WHERE " +
			" 	sdd.dict_id = sd.id " +
			" AND sd.type = #{type} " +
			" AND sd. STATUS = '1' " +
			" ORDER BY " +
			" 	sdd.ordernum ")
	List<DictData> listByType(@Param("type") String type);
	
	@Select("select account as fldkey, name as value from ${table} where id in (select user_id from mt_user_role where role_id = '2020011302')")
	List<DictData> listByEntity(@Param("table") String table);
	
	@Select("select code as fldkey, name as value from ${table}")
	List<DictData> listByEntityCode(@Param("table") String table);
	
	@Select("${sql}")
	List<DictData> listBySql(@Param("sql") String sql);
	
	
	@Select("select ${field} from ${table} where id=#{id}")
	String getEntityFieldById(@Param("table") String table, @Param("id") Long id, @Param("field")String field);

	@Select("select t.fldkey from t_dict_data t where dict_type=#{type} and t.value=#{value}")
	String getKeyByValue(@Param("type") String type,@Param("value") String value);
	
	@Select("select * from t_dict where type=#{type}")
	Map getDict(@Param("type") String type);
	
	@Update("update t_dict_data d set d.value=#{value} where d.dict_type=#{type} and d.fldkey=#{fldkey}")
	void updateDict(@Param("type") String type,@Param("fldkey") String fldkey,@Param("value") String value);
	
	@Select("select t.value from t_dict_data t where dict_type=#{type} and t.fldkey=#{fldkey}")
	String getValueByKey(@Param("type") String type,@Param("fldkey") String fldkey);
}
