package com.xlf.modules.fee.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.util.StringUtil;
import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.PageVo;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.fee.Fee;
import com.xlf.modules.fee.mapper.FeeMapper;
import com.xlf.modules.fee.service.FeeService;
import com.xlf.modules.sys.entity.User;

import cn.hutool.core.util.StrUtil;

@Service
public class FeeServiceImpl implements FeeService{
	@Autowired
	private FeeMapper feeMapper;
	
	@Override
	public BaseMapper<Fee> getBaseMapper() {
		return feeMapper;
	}
	
	@Override
	public PageVo page(PageVo pageVo, Fee entity) {
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = defaultOrderBy;
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		if(!StringUtil.isEmpty(entity.getCardid())){
			condition.append("  and cardid = '"+entity.getCardid()+"'");
		}
//		if(!StringUtil.isEmpty(entity.getCoachid())){
//			condition.append(" and type = 'course' and courseid = '"+entity.getCourseid()+"'");
//		}
//		if(!StringUtil.isEmpty(entity.getCoachid())){
//			condition.append(" and type = 'card' and cardid = '"+entity.getCardid()+"'");
//		}
		if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
			orderBy = pageVo.getSort() + " " + pageVo.getOrder();
		}
		
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Fee> list = feeMapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Fee> pageInfo = new PageInfo<Fee>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	
	@Override
	public PageVo page2(PageVo pageVo, Fee entity) {
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
		
		List<Fee> list = feeMapper.countList(entity.getFeetime());
		PageInfo<Fee> pageInfo = new PageInfo<Fee>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	
	
	public ResultVo countList(PageVo pageVo, Fee entity){
		List<Fee> list = feeMapper.countList(entity.getFeetime());
		List<String> feetimeList = new ArrayList<String>();
		List<String> feeList = new ArrayList<String>();
		List<Integer> bookList = new ArrayList<Integer>();
		for(Fee fee:list){
			feetimeList.add(fee.getFeetime());
			feeList.add(fee.getFee());
			bookList.add(fee.getNum());
			
		};
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("feetimeList", feetimeList);
		data.put("feeList", feeList);
		data.put("bookList", bookList);
		return ResultUtil.success(data);
	}
	
	public int queryFee(Fee fee){
		return feeMapper.queryFee(fee);
	}
	
	@Override
	public PageVo page3(PageVo pageVo, Fee entity) {
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = defaultOrderBy;
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		condition.append(" and userid = '"+user.getId()+"'");

		if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
			orderBy = pageVo.getSort() + " " + pageVo.getOrder();
		}
		
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Fee> list = feeMapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Fee> pageInfo = new PageInfo<Fee>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
}
