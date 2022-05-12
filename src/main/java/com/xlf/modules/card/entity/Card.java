package com.xlf.modules.card.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_card")
public class Card {
	@Id
	private Integer id;
	private String type;
	private String startdate;
	private String enddate;
	private String fee;
<<<<<<< HEAD
=======
	private String userid;
>>>>>>> e1a8a41 (sprint4)
	private String remark;
	private String createtime;
}
