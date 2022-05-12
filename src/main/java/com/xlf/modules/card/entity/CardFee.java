package com.xlf.modules.card.entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "t_card_fee")
public class CardFee {
	@Id
	private Integer id;
	private String cardid;
	private String fee;
	private String feedate;
}
