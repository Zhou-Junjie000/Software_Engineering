package com.xlf.modules.course.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_course")
public class Course {

	@Id
	private Integer id;
	private String name;
	private String info;
	private String day;
	private String time;
	private String coach;
	private String area;
	private String createdate;
<<<<<<< HEAD
=======
	private String cost;
>>>>>>> e1a8a41 (sprint4)
}
