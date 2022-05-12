package com.xlf.common.util.entity;

import lombok.Data;

/**
 * 子系统（公共组件）
 * @author Administrator
 *
 */
@Data
public class SubsystemEntity {
	
	String num;//系统编号
	String subsystem_name;//子系统（公共组件）名称
	String version;//版本号	
	int type;//版本号	
	String pt_num;//PT号
}
