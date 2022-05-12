package com.xlf.config.shiro;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "web.shiro")
public class ShiroProperties {
	private String loginUrl;
	private String successUrl;
	private String unauthorizedUrl;
	private long sessionTimeout;
	private List<String> ignoredUrls;
}
