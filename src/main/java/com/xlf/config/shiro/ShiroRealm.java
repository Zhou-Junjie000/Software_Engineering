package com.xlf.config.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.service.UserService;

public class ShiroRealm extends AuthorizingRealm {
	
	@Autowired
	private UserService userService;
	
    /**
     * @Author czx
     * @Description 授权
     * @Date 10:12 2019-06-27
     * @Param
     **/
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    	
    	User user = (User) SecurityUtils.getSubject().getPrincipal();
//        Long userId = user.getId();

        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
//
//        // 获取用户角色集
//        List<Role> roleList = this.roleService.listMy(userId);
//        Set<String> roleSet = roleList.stream().map(Role::getName).collect(Collectors.toSet());
//        simpleAuthorizationInfo.setRoles(roleSet);
//
//        // 获取用户权限集
//        Set<String> permissionSet = this.menuService.listMyPerms(userId);
//        simpleAuthorizationInfo.setStringPermissions(permissionSet);
        return simpleAuthorizationInfo;
    }
    
    
    /**
     * @Author czx
     * @Description 登录认证
     * @Date 10:12 2019-06-27
     * @Param
     **/
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        
        User user = userService.getByAccount(token.getUsername());
        
        if (user == null) {
			throw new UnknownAccountException("用户不存在");
		}
        
        AuthenticationInfo authenticationInfo = null;
        
        try {
            authenticationInfo = new SimpleAuthenticationInfo(user, user.getPassword(), getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return authenticationInfo;
    }

}
