/**
 * 
 */
package com.xlf.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @Description:
 * @author: songpeng 
 * @date: date{time} （日期） 
*/
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {
	
    @Value("${web.file_upload.local.path}")
	private String path;
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//映射图片保存地址
		registry.addResourceHandler("/upload/**").addResourceLocations("file:"+path);
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry){
		//跨域访问
		registry.addMapping("*")
			.allowedOrigins("*")
			.allowedMethods("GET","POST")
			.allowedHeaders("*")
			.allowCredentials(true);
	}
}
