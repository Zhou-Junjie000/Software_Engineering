package com.xlf.modules.sys.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_dict_data")
public class DictData {
	
	@Id
	private String id;
	
	/**
	 * 字典项
	 */
	@Column(name = "`fldkey`")
	private String fldkey;
	
	/**
	 * 字典项显示值
	 */
	@Column(name = "`value`")
	private String value;
	
	/**
	 * 类型
	 */
	private String dictType;
	/**
	 * 排序字段
	 */
	private double ordernum;
	/**
	 * 所属大项ID
	 */
	private Long dictId;
	
	/**
	 * 字典项状态
	 */
	private String status;
	
	/**
	 * 备注
	 */
	private String remark;
}
