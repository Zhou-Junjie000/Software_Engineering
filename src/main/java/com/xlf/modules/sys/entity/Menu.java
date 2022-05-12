package com.xlf.modules.sys.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;

import lombok.Data;

@Data
@Table(name = "sys_menu")
public class Menu {

	@Id
	private Integer id;
	
	@JSONField(name = "title")
	private String name;

	private String icon;

	private Integer pid;
	
	@JSONField(name = "href")
	private String url;
	
	private String perms;
	
	private Integer ordernum;
	
	private String status;
}
