package com.xlf.modules.book.service.impl;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.util.StringUtil;
import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.book.entity.Book;
import com.xlf.modules.book.mapper.BookMapper;
import com.xlf.modules.book.service.BookService;
import com.xlf.modules.card.entity.Card;
import com.xlf.modules.sys.entity.User;

import cn.hutool.core.util.StrUtil;

@Service
public class BookServiceImpl implements BookService{

	@Autowired
	private BookMapper bookMapper;
	
	@Override
	public BaseMapper<Book> getBaseMapper() {
		return bookMapper;
	}
	
	@Override
	public PageVo page(PageVo pageVo, Book entity) {
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = defaultOrderBy;
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		if(!StringUtil.isEmpty(entity.getCoachid())){
			condition.append(" and type = 'coach' and coachid = '"+entity.getCoachid()+"'");
		}
		if(!StringUtil.isEmpty(entity.getCourseid())){
			condition.append(" and type = 'course' and courseid = '"+entity.getCourseid()+"'");
		}
		if(!StringUtil.isEmpty(entity.getMaterialid())){
			condition.append(" and type = 'material' and materialid = '"+entity.getMaterialid()+"'");
		}
		if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
			orderBy = pageVo.getSort() + " " + pageVo.getOrder();
		}
		
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Book> list = bookMapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Book> pageInfo = new PageInfo<Book>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	
	/**
	 * 当前用户快开始的预约
	 */
	public PageVo page2(PageVo pageVo, Book entity){
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = " order by booktime ";
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		condition.append("  and booktime > now() and userid = '"+user.getId()+"'");
		if(!StringUtils.isEmpty(entity.getType())){
			condition.append("  and type = '"+entity.getType()+"'");
		}
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Book> list = bookMapper.pageList(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Book> pageInfo = new PageInfo<Book>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	
	public PageVo page3(PageVo pageVo, Book entity){
		String orderBy = "";
		try {
		String defaultOrderBy = pageOrderBy();

		if(StrUtil.isNotBlank(defaultOrderBy)){
			orderBy = " order by booktime ";
		}
		StringBuffer condition = new StringBuffer();
		User user = (User)SecurityUtils.getSubject().getPrincipal();

		condition.append("  and booktime > now() and userid = '"+user.getId()+"'");
		if(!StringUtils.isEmpty(entity.getCoachid())){
			condition.append("  and coachid = '"+entity.getCoachid()+"'");
		}else if(!StringUtils.isEmpty(entity.getCourseid())){
			condition.append("  and couserid = '"+entity.getCourseid()+"'");
		}else if(!StringUtils.isEmpty(entity.getMaterialid())){
			condition.append("  and materialid = '"+entity.getMaterialid()+"'");
		}
		
		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
		
		List<Book> list = bookMapper.pageList3(pageVo.getSearch(),entity,condition.toString());
		PageInfo<Book> pageInfo = new PageInfo<Book>(list);

		pageVo.setRows(pageInfo.getList());
		pageVo.setTotal(pageInfo.getTotal());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageVo;
	}
	
	public int getNumByUser(Book entity){
		return bookMapper.getNumByUser(entity);
	}
	//按照课程和教练查询预约总数
	public int getNumByArea(Book entity){
		return bookMapper.getNumByArea(entity);
	}
}
