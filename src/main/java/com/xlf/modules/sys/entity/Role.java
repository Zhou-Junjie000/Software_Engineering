package com.xlf.modules.sys.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity(name = "role")
@Table(name = "sys_role")
public class Role {
	
	@Id
	private Long id;
	
	/**
	 * 角色名
	 */
	private String name;
	
	/**
	 * 备注
	 */
	private String remark;
}
