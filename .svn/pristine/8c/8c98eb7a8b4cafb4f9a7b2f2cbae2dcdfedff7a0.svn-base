package com.xlf.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.modules.sys.entity.DictData;

public interface DictDataService extends MybatisEntityService<DictData, Long> {

	public Object getData(DictData dictData);
	
	/**
	 * 通过字典类型查询字典项
	 * @param type
	 * @return List<DictData>
	 */
	public List<DictData> listByType(String type);
	
	/**
	 * 通过实体Tag值查询实体字典项
	 * @param tag
	 * @return List<DictData>
	 */
	public List<DictData> listByEntity(String tag);
	
	/**
	 * 通过实体Tag值查询实体字典项
	 * @param tag
	 * @return List<DictData>
	 */
	public List<DictData> listByEntityCode(String tag);
	
	/**
	 * @Title: listBySql
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param sql
	 * @return List<DictData>    返回类型
	 */
	public List<DictData> listBySql(String sql);
	
	/**
	 * @Title: listBySql
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param sql
	 * @param condition
	 * @return List<DictData>    返回类型
	 */
	public List<DictData> listBySql(String sql,Map<String,Object> condition);
	/**
	 * 查询指定实体指定id数据指定字段的取值
	 * @param tag
	 * @param id
	 * @param filed
	 * @return value 
	 */
	public String getEntityFieldById(String tag, Long id, String field);
}
