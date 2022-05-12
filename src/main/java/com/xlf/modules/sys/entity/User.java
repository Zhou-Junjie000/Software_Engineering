package com.xlf.modules.sys.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Entity(name = "user")
@Table(name = "t_user")
public class User implements Serializable{
	
	/**
	 * id
	 */
	@Id
	private String id; 
	
	/**
	 * 用户名
	 */
	private String account;
	
	/**
	 * 密码
	 */
	private String password;
	/**
	 * 邮箱地址
	 */
	private String mail;
	//用户名称
	private String name;
	private String dept;
	private String sex;
}