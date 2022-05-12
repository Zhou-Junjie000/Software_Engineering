package com.xlf.modules.coach.service.impl;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.coach.entity.Coach;
import com.xlf.modules.coach.mapper.CoachMapper;
import com.xlf.modules.coach.service.CoachService;
import com.xlf.modules.sys.entity.User;

import cn.hutool.core.util.StrUtil;

@Service
public class CoachServiceImpl implements CoachService{

	@Autowired
	private CoachMapper mapper;
	
	@Override
	public BaseMapper<Coach> getBaseMapper() {
		return mapper;
	}
	
	@Override
	public PageVo page(PageVo pageVo, Coach entity) {
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
		
		List<Coach> list = mapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Coach> pageInfo = new PageInfo<Coach>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
}
