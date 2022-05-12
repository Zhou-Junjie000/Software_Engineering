package com.xlf.config.beetl;

import java.util.HashMap;
import java.util.Map;

import org.beetl.core.Function;
import org.beetl.core.GroupTemplate;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;

import com.xlf.config.beetl.func.DateUtil;
import com.xlf.config.beetl.func.DictUtil;
import com.xlf.config.beetl.func.JsonUtil;
import com.xlf.config.properties.WebSiteProperties;

/**
 * beetl 模板引擎加载
 */
@Configuration
public class BeetlConf {

	// 获取上下文路径，注册为全局变量
	@Value("${server.servlet.context-path}")
	private String contentContext;
	
	@Autowired
	private WebSiteProperties webSite;
//	
	@Autowired
	private DictUtil dictUtil;
//	
	@Autowired
	private JsonUtil jsonUtil;
//	
	@Autowired
	private DateUtil dateUtil;
	
	public Map<String,Object> sharedVars(){
        Map<String,Object> sharedVars =  new HashMap<>();

        sharedVars.put("site", webSite);
        sharedVars.put("base", contentContext);
        
        return sharedVars;
    }
	
	@Bean(initMethod = "init", name = "beetlConfig")
	public BeetlGroupUtilConfiguration beetlConfig() {
		BeetlGroupUtilConfiguration beetlGroupUtilConfiguration = new BeetlGroupUtilConfiguration();
		
		// 获取Spring Boot 的ClassLoader
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		loader = loader != null? loader:BeetlConf.class.getClassLoader();
        ResourcePatternResolver patternResolver = ResourcePatternUtils.getResourcePatternResolver(new DefaultResourceLoader());
        
		beetlGroupUtilConfiguration.setResourceLoader(new ClasspathResourceLoader(loader, "templates/"));
        beetlGroupUtilConfiguration.setConfigFileResource(patternResolver.getResource("classpath:beetl.properties"));
		beetlGroupUtilConfiguration.setSharedVars(sharedVars());
		beetlGroupUtilConfiguration.setFunctionPackages(functionPackages());
        beetlGroupUtilConfiguration.setFunctions(function());
		return beetlGroupUtilConfiguration;
	}

	private Map<String, Function> function() {
		Map<String, Function> functions = new HashMap<>(); 
//		functions.put("perms", new PermsFunction());
		return functions;
	}

	private Map<String, Object> functionPackages() {
		
		Map<String, Object> functionPkgs = new HashMap<>(); 
		
		functionPkgs.put("dict", dictUtil);
		functionPkgs.put("jsonUtil", jsonUtil);
		functionPkgs.put("dateUtil", dateUtil);
		
		return functionPkgs;
	}

	@Bean(name = "beetlViewResolver")
	public BeetlSpringViewResolver beetlViewResolver(@Qualifier(value = "beetlConfig") BeetlGroupUtilConfiguration beetlConfig) {
		BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
		beetlSpringViewResolver.setSuffix(".html");
		beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
		beetlSpringViewResolver.setOrder(0);
		beetlSpringViewResolver.setConfig(beetlConfig);
		return beetlSpringViewResolver;
	}
	
	@Bean(name = "groupTemplate")
    public GroupTemplate getGroupTemplate(
            @Qualifier("beetlConfig") BeetlGroupUtilConfiguration beetlGroupUtilConfiguration) {
        return beetlGroupUtilConfiguration.getGroupTemplate();

    }

}
