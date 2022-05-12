package com.xlf.common.base;

import java.io.Serializable;

import com.xlf.common.vo.PageVo;
/**
 * 通用实体增删改查业务接口
 **/
public interface IEntityService<T, ID extends Serializable> {

    /**
     * 根据id查询单个实体
     * @param id
     * @return T
     */
    T get(ID id);

    /**
     * 保存实体
     * @param t Entity Object
     */
    void save(T t);

    /**
     * 更新实体
     * @param t Entity Object
     */
    void update(T t);

    /**
     * 分页查询
     * @param pagevo PageVo Object
     * @param t Entity Object
     * @return PageVo
     */
    PageVo page(PageVo pagevo, T t);

    /**
     * 根据Id删除实体
     * @param id
     */
    void delete(ID id);

    /**
     * 根据ids批量删除实体信息
     * @param ids id Array
     */
    void batchDelete(ID[] ids);
}
