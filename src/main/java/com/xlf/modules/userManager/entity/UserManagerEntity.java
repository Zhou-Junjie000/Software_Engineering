package com.xlf.modules.userManager.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Entity(name = "userManager")
@Table(name = "t_user")
public class UserManagerEntity {
	/**
	 * id
	 */
	@Id
	private Integer id; 
	
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
<<<<<<< HEAD
=======
	private String safepassword;
>>>>>>> e1a8a41 (sprint4)
	//用户名称
	private String name;
	private String dept;
	private String sex;
	private String role;
	private String dataSupport;
	@Transient
	private String newPassword;
<<<<<<< HEAD
=======
	private String roleid;

>>>>>>> e1a8a41 (sprint4)
}
