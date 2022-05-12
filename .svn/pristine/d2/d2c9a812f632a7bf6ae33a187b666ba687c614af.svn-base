package com.xlf.modules.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xlf.common.base.mybatis.BaseMapper;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.entity.UserToken;
import com.xlf.modules.sys.mapper.UserMapper;
import com.xlf.modules.sys.service.UserService;

import cn.hutool.core.util.StrUtil;
import cn.hutool.db.sql.Condition.LikeType;
import cn.hutool.db.sql.SqlUtil;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public BaseMapper<User> getBaseMapper() {
		return userMapper;
	}

	@Override
	public User getByAccount(String account) {
		return userMapper.getByAccount(account);
	}
	
	
	/**
	 * 但实体不需要不需要指定sql情况
	 */
	@Override
	public void pageCondition(PageVo page, User user, Criteria criteria) {
			
		if (StrUtil.isNotBlank(user.getAccount())) {
			criteria.andLike("account", SqlUtil.buildLikeValue(user.getAccount(), LikeType.Contains, false));
		}
	}

	@Override
	public List<String> getRole(String userid) {
		return userMapper.getRole(userid);
	}
	
	@Override
	public String getGender(String userName) {
		return userMapper.getGender(userName);
	}

//	@Override
//	public PageVo page(PageVo pageVo, User user) {
//		String orderBy = "";
//		
//		String defaultOrderBy = pageOrderBy();
//		// default orderBy
//		if(StrUtil.isNotBlank(defaultOrderBy)){
//			orderBy = defaultOrderBy;
//		}
//		
//		// orderBy
//		if (StrUtil.isNotBlank(pageVo.getOrder()) && StrUtil.isNotBlank(pageVo.getSort())) {
//			if (pageVo.getSort().equals("name")) {
//				orderBy = "CONVERT ("+pageVo.getSort()+" using gbk)" + " " + pageVo.getOrder();
//			}else{
//				orderBy = pageVo.getSort() + " " + pageVo.getOrder();
//			}
//		}
//		
//		PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize(),orderBy);
//		
//		List<Map> list = userMapper.getList(user);
//		PageInfo<Map> pageInfo = new PageInfo<>(list);
//
//		pageVo.setRows(pageInfo.getList());
//		pageVo.setTotal(pageInfo.getTotal());
//		
//		return pageVo;
//	}
	
	public UserToken getTokenById(Integer userid){
		return userMapper.getTokenById(userid);
	}
	
	public int saveToken(UserToken userToken){
		return userMapper.saveToken(userToken);
	}
	
	public int updateTokenById(UserToken userToken){
		return userMapper.updateTokenById(userToken);
	}
	
	
	public User getUserByToken(String token){
		return userMapper.getUserByToken(token);
	}
	
	
}
