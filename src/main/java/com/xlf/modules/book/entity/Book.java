package com.xlf.modules.book.entity;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Table(name = "t_book")
public class Book {

	@Id
	private Integer id;
	private String type;
	private String coachid;
	@Transient
	private String coachname;
	@Transient
	private String coachsex;
	private String courseid;
	@Transient
	private String coursename;
	private String materialid;
	@Transient
	private String materialname;
	private String booktime;
	private String userid;
	@Transient
	private String username;
	private String createtime;
	private String area;//场地
	@Transient
	private String condition;
<<<<<<< HEAD
}
=======
	private String cost;
	private String cost1;
	private String cost2;
	private String pay;}
>>>>>>> e1a8a41 (sprint4)
