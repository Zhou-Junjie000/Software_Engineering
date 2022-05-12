package com.xlf.modules.coach.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_coach_course")
public class CoachCourse {
	@Id
	private Integer id;
	private String coachid;
	private String fee;
	private Integer num;
	private String money;
	private String remark;
	private String createtime;
}
