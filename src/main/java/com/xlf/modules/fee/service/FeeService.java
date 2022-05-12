package com.xlf.modules.fee.service;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.common.vo.PageVo;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.fee.Fee;
<<<<<<< HEAD

public interface FeeService extends MybatisEntityService<Fee, Integer>{

	PageVo page2(PageVo pageVo, Fee entity);
	PageVo page3(PageVo pageVo, Fee entity);
	ResultVo countList(PageVo pageVo, Fee entity);
	int queryFee(Fee fee);
=======
import com.xlf.modules.userManager.entity.UserManagerEntity;

public interface FeeService extends MybatisEntityService<Fee, Integer>{


	PageVo page2(PageVo pageVo, Fee entity);
	PageVo page3(PageVo pageVo, Fee entity);

	void update1(String id);

	void update2(String id);

	ResultVo countList(PageVo pageVo, Fee entity);
	int queryFee(Fee fee);

>>>>>>> e1a8a41 (sprint4)
}
