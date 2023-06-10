package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "khuyenmai")
public class Khuyenmai {
	@Id
	@Column(name = "MaKM")
	private String maKM;
	@Column(name = "MucKM")
	private Double mucKM;
	public Khuyenmai() {
	}
	public Khuyenmai(String maKM, Double mucKM) {
		super();
		this.maKM = maKM;
		this.mucKM = mucKM;
	}
	public String getMaKM() {
		return maKM;
	}
	public void setMaKM(String maKM) {
		this.maKM = maKM;
	}
	public Double getMucKM() {
		return mucKM;
	}
	public void setMucKM(Double mucKM) {
		this.mucKM = mucKM;
	}
	@Override
	public String toString() {
		return "Khuyenmai [maKM=" + maKM + ", mucKM=" + mucKM + "]";
	}
	
}
