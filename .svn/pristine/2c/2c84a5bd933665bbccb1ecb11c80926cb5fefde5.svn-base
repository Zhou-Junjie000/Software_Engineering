package com.xlf.modules.material.service.impl;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.material.entity.Material;
import com.xlf.modules.material.mapper.MaterialMapper;
import com.xlf.modules.material.service.MaterialService;
import com.xlf.modules.sys.entity.User;

import cn.hutool.core.util.StrUtil;

@Service
public class MaterialServiceImpl implements MaterialService{
	@Autowired
	private MaterialMapper mapper;
	
	@Override
	public BaseMapper<Material> getBaseMapper() {
		return mapper;
	}
	
	@Override
	public PageVo page(PageVo pageVo, Material entity) {
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = defaultOrderBy;
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
			orderBy = pageVo.getSort() + " " + pageVo.getOrder();
		}
		
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Material> list = mapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Material> pageInfo = new PageInfo<Material>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
}
