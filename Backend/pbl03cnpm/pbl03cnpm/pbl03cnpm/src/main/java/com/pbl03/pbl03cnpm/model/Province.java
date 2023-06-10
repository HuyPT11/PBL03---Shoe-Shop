package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tinh")
public class Province {
	@Id
	@Column(name = "MaTinh")
	private String id;
	@Column(name = "TenTinh")
	private String name;
	@Column(name = "ChiPhiShip")
	private Integer fee;
	@Column(name = "ThoiGian")
	private String time;
	public Province() {
		// TODO Auto-generated constructor stub
	}
	
	public Province(String id, String name, Integer fee, String time) {
		super();
		this.id = id;
		this.name = name;
		this.fee = fee;
		this.time = time;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getFee() {
		return fee;
	}
	public void setFee(Integer fee) {
		this.fee = fee;
	}
	
	
}
