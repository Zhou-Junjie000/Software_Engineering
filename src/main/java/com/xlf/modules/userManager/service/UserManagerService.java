package com.xlf.modules.userManager.service;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.userManager.entity.UserManagerEntity;

public interface UserManagerService extends MybatisEntityService<UserManagerEntity, String>{

	ResultVo updatePassword(String id, String password, String newPassword);
<<<<<<< HEAD
=======
	ResultVo updatePassword2(String id, String password, String newPassword);
>>>>>>> e1a8a41 (sprint4)

	ResultVo remakePassword(String ids);

	boolean isExistAccount(String account);

	String getRoleByUserid(User user);
}
