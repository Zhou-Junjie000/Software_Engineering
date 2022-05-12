package com.xlf.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "xx.site")
public class WebSiteProperties {
	
	private String domain;
	
	private String name;
}
