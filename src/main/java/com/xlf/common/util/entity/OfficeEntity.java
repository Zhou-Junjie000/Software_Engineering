package com.xlf.common.util.entity;


import java.util.List;

import lombok.Data;

/**
 * 软件产品升级放行申请-模板的实体类
 * @author Administrator
 *
 */
@Data
public class OfficeEntity {
	
	String projct_code ;//项目软件系统编码
	String product_code ;//项目软件系统名称
	String product_name;//产品软件系统编码
	String projct_name;//产品软件系统名称
	
	String apply_name;//申请人
	String apply_time;//申请日期
	String plan_time;//计划放行日期
	String release;//升级放行类型  取值：已完成测试，正常升级放行 或者 未完成测试，紧急升级放行
	//子系统（公共组件）集合
	List<SubsystemEntity> list;
	
	//若紧急放行，则注意事项
	String be_careful;
	//产品开发组经理确认
	String confirm01;
	String confirm_time01;//日期
	//放行软件验证人确认
	String confirm02;
	String confirm_time02;//日期
	//版本管控人员确认
	String confirm03;
	String confirm_time03;//日期
	//测试人员确认
	String confirm04;
	String confirm_time04;//日期
	//配置管理员确认
	String confirm05;
	String confirm_time05;//日期
	//项目部/工程开发支撑部经理批准
	String confirm06;
	String confirm_time06;//日期
	//用户认可签字
	String confirm07;
	String confirm_time07;//日期
	
	//正常放行是否勾选
	String normal;
	//紧急放行是否勾选
	String urgent;
}
