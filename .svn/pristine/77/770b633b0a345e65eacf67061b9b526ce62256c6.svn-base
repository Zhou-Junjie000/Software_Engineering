package com.xlf.common.base.mybatis;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * mybatis 通用基础类
 * @author: zhaoxiaodan
 * @create: 2019/12/19
 **/
public interface BaseMapper<E> extends Mapper<E>, MySqlMapper<E> {

	/**
	 * @Title: get
	 * @Description: 该接口为虚拟接口并未实现，实现类需要自己去实现
	 * @param  id
	 * @return E    返回类型
	 */
	List<E> pageList(String userId,String searchText,String filesource);
}
