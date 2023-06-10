package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Statistics {
	@Id
	@Column(name = "MaSP")
	private String masp;
	
	@Column(name = "Soluong")
	private Integer soluong;
	
	public Statistics() {
		// TODO Auto-generated constructor stub
	}

	public Statistics(String masp, Integer soluong) {
		super();
		this.masp = masp;
		this.soluong = soluong;
	}

	public String getMasp() {
		return masp;
	}

	public void setMasp(String masp) {
		this.masp = masp;
	}

	public Integer getSoluong() {
		return soluong;
	}

	public void setSoluong(Integer soluong) {
		this.soluong = soluong;
	}

	@Override
	public String toString() {
		return "Statistics [masp=" + masp + ", soluong=" + soluong + "]";
	}
	
}
