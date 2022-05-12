/**
 * @Title: MyAccessControlFilter.java
 * @Package com.xlf.bjlt.yy.config.shiro.filter
 * @Description: TODO(用一句话描述该文件做什么)
 * @author mingshenyue
 * @date 2019年8月13日 下午5:30:46
 * @version V1.0
 */
package com.xlf.config.shiro.filter;

import java.io.IOException;
import java.util.Formatter;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import com.xlf.common.util.ResultUtil;
import com.xlf.config.shiro.ShiroProperties;
import com.xlf.modules.sys.entity.User;
import com.xlf.modules.sys.service.UserService;
import com.xlf.modules.sys.util.Oauth2Token;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;

/**
 *
 */
@Slf4j
@Component
public class MyAccessControlFilter extends AccessControlFilter{
	
	private static final String JS = "<script type='text/javascript'>var wp=window.parent; if(wp!=null){while(wp.parent&&wp.parent!==wp){wp=wp.parent;}wp.location.href='%1$s';}else{window.location.href='%1$s';}</script>";
    
	@Resource
    private ShiroProperties shiroProperties;
	@Autowired
	private UserService userService;
	/**
    *
    * 表示是否允许访问；mappedValue就是[urls]配置中拦截器参数部分，如果允许访问返回true，否则false；
    * (感觉这里应该是对白名单（不需要登录的接口）放行的)
    * 如果isAccessAllowed返回true则onAccessDenied方法不会继续执行
    * 这里可以用来判断一些不被通过的链接（个人备注）
    * * 表示是否允许访问 ，如果允许访问返回true，否则false；
    * @param servletRequest
    * @param servletResponse
    * @param object 表示写在拦截器中括号里面的字符串 mappedValue 就是 [urls] 配置中拦截器参数部分
    * @return
    * @throws Exception
    * */
   @Override
   public boolean isAccessAllowed(ServletRequest servletRequest, ServletResponse servletResponse, Object object) throws Exception{
       Subject subject = getSubject(servletRequest,servletResponse);
       String url = getPathWithinApplication(servletRequest);
//       log.info("当前用户正在访问的 url => " + url);
       if(shiroProperties.getLoginUrl().equals(url)){
    	   return true;
       }
       if(isPermitted(url)){
    	   return true;
       }
       String source = String.valueOf(((HttpServletRequest)servletRequest).getHeader("source"));
       String token = this.getRequestToken((HttpServletRequest)servletRequest);
       if (StringUtils.equals(source, "uniapp")) {
    	   if(StringUtils.isEmpty(token)){
    		   HttpServletResponse httpResponse = (HttpServletResponse)servletResponse;
    		   httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
    		   httpResponse.setHeader("Access-Control-Allow-Origin", ((HttpServletRequest)servletRequest).getHeader("Origin"));
    		   String json = JSON.toJSONString(ResultUtil.fail((Integer)HttpStatus.UNAUTHORIZED.value(), "认证失败，请重新登录"));
    		   httpResponse.getWriter().print(json);
    	   }else{
    		   return this.executeLogin(servletRequest, servletResponse);
    	   }
       }
       User user = (User) subject.getPrincipal();
       if(user ==  null){
    	   return false;
       }
       return true;
   }

   /**
    * 表示当访问拒绝时是否已经处理了；如果返回true表示需要继续处理；如果返回false表示该拦截器实例已经处理了，将直接返回即可。
    * onAccessDenied是否执行取决于isAccessAllowed的值，如果返回true则onAccessDenied不会执行；如果返回false，执行onAccessDenied
    * 如果onAccessDenied也返回false，则直接返回，不会进入请求的方法（只有isAccessAllowed和onAccessDenied的情况下）
    * */
   @Override
   public boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception{
//       log.info("跳转至登录页面");
       redirectLogin(request, response);
       return false;
   }

   protected void redirectLogin(ServletRequest request, ServletResponse response) throws IOException {
       WebUtils.saveRequest(request);
       String path = WebUtils.getContextPath((HttpServletRequest) request);
       String url = "";
       if (StrUtil.isNotBlank(path) && path.length() > 1) {
       		url = path + shiroProperties.getLoginUrl();
       }else{
		    url =  shiroProperties.getLoginUrl();
	   }
       
       if (isAjaxRequest((HttpServletRequest) request)) {
       		response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print(JSON.toJSONString(ResultUtil.fail(500,"请登录")));
       } else {
       		response.getWriter().write(new Formatter().format(JS, url).toString());
       }
   }

	/**
	 * 判断是否为Ajax请求 <功能详细描述>
	 * 
	 * @param request
	 * @return 是true, 否false
	 * @see [类、类#方法、类#成员]
	 */
	public static boolean isAjaxRequest(HttpServletRequest request) {
		String header = request.getHeader("X-Requested-With");
		if (header != null && "XMLHttpRequest".equals(header))
			return true;
		else
			return false;
	}
	
	public boolean isPermitted(String accessUrl){
		boolean flag = false;

		if(shiroProperties.getUnauthorizedUrl().equals(accessUrl)){
			flag = true;
			return flag;
		}
		for(String url:shiroProperties.getIgnoredUrls()){
			if(url.indexOf("/**")>-1){
				String ignoredUrl = url.substring(0, url.indexOf("/**")+1);
				if(accessUrl.startsWith(ignoredUrl)){
					flag = true;
					break;
				}
			}else{
				if(accessUrl.startsWith(url)){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	 private String getRequestToken(HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("token");
        if (StringUtils.isEmpty(token)) {
            token = httpRequest.getParameter("token");
        }

        return token;
    }
	 protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        AuthenticationToken token = this.createToken(request, response);
        if (token == null) {
            String msg = "createToken method implementation returned null. A valid non-null AuthenticationToken must be created in order to execute a login attempt.";
            throw new IllegalStateException(msg);
        } else {
            try {
            	Oauth2Token oauth2Token = (Oauth2Token)token;
            	User user = userService.getUserByToken(oauth2Token.getToken());
                Subject subject = this.getSubject(request, response);
                subject.login(new UsernamePasswordToken(user.getAccount(), user.getPassword(), false));
                return this.onLoginSuccess(token, subject, request, response);
            } catch (AuthenticationException var5) {
            	var5.printStackTrace();
                return this.onLoginFailure(token, var5, request, response);
            }
        }
    }
	protected  AuthenticationToken createToken(ServletRequest request, ServletResponse var2) throws Exception{
		String token = this.getRequestToken((HttpServletRequest)request);
        return StringUtils.isEmpty(token) ? null : new Oauth2Token(token);
	}

    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        return true;
    }

    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
        return false;
    }
}
