package com.xlf.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.util.EntityUtil;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.sys.entity.DictData;
import com.xlf.modules.sys.mapper.DictDataMapper;
import com.xlf.modules.sys.service.DictDataService;

import cn.hutool.core.util.StrUtil;
import cn.hutool.db.sql.Condition.LikeType;
import cn.hutool.db.sql.SqlUtil;
import lombok.extern.slf4j.Slf4j;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Slf4j
@Service
public class DictDataServiceImpl implements DictDataService {
	
	@Autowired
	private DictDataMapper dictDataMapper;
	
	@Override
	public BaseMapper<DictData> getBaseMapper() {
		return dictDataMapper;
	}

	@Override
	public Object getData(DictData dictData) {

		Example example = new Example(DictData.class);
		Criteria criteria = example.createCriteria();
		
		//
		if(dictData.getDictId() != null && dictData.getDictId() > 0){
			criteria.andEqualTo("dictId", dictData.getDictId());
		}
		//
		if(StrUtil.isNotBlank(dictData.getValue())){
			criteria.andLike("value", SqlUtil.buildLikeValue(dictData.getValue(), LikeType.Contains, false));
		}
		
		return dictDataMapper.selectByExample(example);
	}

	@Override
	public List<DictData> listByType(String type) {
		
		return dictDataMapper.listByType(type);
	}

	@Override
	public List<DictData> listByEntity(String tag) {
		
		Class<?> entityClass = EntityUtil.scanPackageByTag("com.xlf.modules", tag);
		
		Table table = entityClass.getAnnotation(Table.class);
		
		return dictDataMapper.listByEntity(table.name());
	}

	/* (��拷Javadoc)
	 * <p>Title: listBySql</p>
	 * <p>Description: </p>
	 * @param sql
	 * @return
	 * @see oa.modules.base.service.DictDataService#listBySql(java.lang.String)
	 */
	
	@Override
	public List<DictData> listBySql(String sql) {

		return dictDataMapper.listBySql(sql);
	}
	
	@Override
	public List<DictData> listBySql(String sql,Map<String,Object> conditions) {
		StringBuffer sb = new StringBuffer();
//		if(conditions!=null && conditions.keySet().size()>0){
//			for(String key:conditions.keySet()){
//				if(sql.toLowerCase().indexOf("where")>-1)
//				sb.append(key).append("='").append(conditions.get(sb)).append("'");
//			}
//		}
		return dictDataMapper.listBySql(sql+sb.toString());
	}
	
	@Override
	public List<DictData> listByEntityCode(String tag) {
		
		Class<?> entityClass = EntityUtil.scanPackageByTag("oa.modules", tag);
		
		Table table = entityClass.getAnnotation(Table.class);
		
		return dictDataMapper.listByEntityCode(table.name());
	}

	@Override
	public String getEntityFieldById(String tag, Long id, String field) {
		
		Class<?> entityClass = EntityUtil.scanPackageByTag("oa.modules", tag);
		
		Table table = entityClass.getAnnotation(Table.class);
		
		return dictDataMapper.getEntityFieldById(table.name(), id, field);
	}

	@Override
	public DictData get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(DictData t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(DictData t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public PageVo page(PageVo pageVo, DictData t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void pageCondition(PageVo page, DictData e, Example.Criteria criteria) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String pageOrderBy() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void batchDelete(Long[] ids) {
		// TODO Auto-generated method stub
		
	}
	
}
