package com.xlf.modules.material.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_material")
public class Material {
	@Id
	private Integer id;
	private String name;
	private Integer num;
	private String info;
	private String status;
	private String createdate;
<<<<<<< HEAD
=======
	private String area;
	private String cost;
>>>>>>> e1a8a41 (sprint4)
}