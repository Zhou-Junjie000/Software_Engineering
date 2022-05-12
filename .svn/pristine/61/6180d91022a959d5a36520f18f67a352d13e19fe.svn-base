package com.xlf.common.base.mybatis;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.persistence.Id;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.xlf.common.base.IEntityService;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.sys.entity.User;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.CaseFormat;

import cn.hutool.core.util.StrUtil;
import tk.mybatis.mapper.entity.Example;

@FunctionalInterface
public interface MybatisEntityService <T, ID extends Serializable> extends IEntityService<T, ID> {

    final Logger log = LoggerFactory.getLogger(MybatisEntityService.class);

    /**
     * 获取mapper
     * @return
     */
    BaseMapper<T> getBaseMapper();

    @Override
    default T get(ID id){
        return getBaseMapper().selectByPrimaryKey(id);
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    default void save(T t){

        int key = getBaseMapper().insertSelective(t);

        log.info("key==>{}", key);
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    default void update(T t){
        getBaseMapper().updateByPrimaryKeySelective(t);
    }

    @Transactional(rollbackFor = RuntimeException.class)
    default void saveOrUpdate(T t){
    	Object pkValue = getEntityPrimaryKeyValue(t);
		if(pkValue == null){
			this.save(t);
		} else {
			this.update(t);
		}
    }
    
    @Override
    default PageVo page(PageVo pageVo, T t){

        if (log.isDebugEnabled()) {
            log.debug("==>	page Parameters:{}, {}", pageVo, t);
        }

        Example example = new Example(t.getClass());
        Example.Criteria criteria = example.createCriteria();

        pageCondition(pageVo, t, criteria);

        String defaultOrderBy = pageOrderBy();

        // default orderBy
        if(StrUtil.isNotBlank(defaultOrderBy)){
            example.setOrderByClause(defaultOrderBy);
        }

        // orderBy
        if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
            example.setOrderByClause(
                    CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, pageVo.getSort()) + " " + pageVo.getOrder());
        }

        com.github.pagehelper.Page<T> mapperPage = PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize())
                .doSelectPage(() -> getBaseMapper().selectByExample(example));
        User user = (User)SecurityUtils.getSubject().getPrincipal();
    	List<T> list = null;
		list = getBaseMapper().pageList(user.getId(),pageVo.getSearch(),"");
		
		PageInfo<T> pageInfo = new PageInfo<T>(list);
        pageVo.setRows(pageInfo.getList());
        pageVo.setTotal(pageInfo.getTotal());

        if (log.isDebugEnabled()) {
            log.debug("<==	page Result:{}", pageVo);
        }

        return pageVo;
    }

    /**
     * 分页查询条件设置
     * @param page
     * @param e
     * @param criteria
     */
    default void pageCondition(PageVo page, T e, Example.Criteria criteria){

    }

    /**
     * 分页查询排序设置
     */
    default String pageOrderBy() {
        return null;
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    default void delete(ID id){
        getBaseMapper().deleteByPrimaryKey(id);
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    default void batchDelete(ID[] ids){
        for (ID id: ids) {
            getBaseMapper().deleteByPrimaryKey(id);
        }
    }
    
    /**
     * @Description: 获取实体主键值
     */
    default Object getEntityPrimaryKeyValue(T t) {
		Class clazz= t.getClass();
		Object primayKeyValue = null;
		boolean findPk = false;
		for(Field field:clazz.getDeclaredFields()){
			Id id = field.getAnnotation(Id.class);
			if(id!=null){
				findPk = true;
				try {
					primayKeyValue = field.get(t);
				} catch (IllegalArgumentException e1) {
					e1.printStackTrace();
				} catch (IllegalAccessException e1) {
					e1.printStackTrace();
				}
			}
		}
		
		if(!findPk){
			System.out.println(clazz.getName()+" 没有设置主键策略");
		}
		return primayKeyValue;
	}
}
