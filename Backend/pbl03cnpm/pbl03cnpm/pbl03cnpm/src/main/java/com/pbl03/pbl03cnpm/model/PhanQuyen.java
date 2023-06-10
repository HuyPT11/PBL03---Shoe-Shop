package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "phanquyen")
public class PhanQuyen {
	@Id
	@Column(name = "MaQuyen")
	private String maQuyen;
	@Column(name = "TenQuyen")
	private String tenQuyen;
	public PhanQuyen() {
		// TODO Auto-generated constructor stub
	}
	public PhanQuyen(String maQuyen, String tenQuyen) {
		super();
		this.maQuyen = maQuyen;
		this.tenQuyen = tenQuyen;
	}
	public String getMaQuyen() {
		return maQuyen;
	}
	public void setMaQuyen(String maQuyen) {
		this.maQuyen = maQuyen;
	}
	public String getTenQuyen() {
		return tenQuyen;
	}
	public void setTenQuyen(String tenQuyen) {
		this.tenQuyen = tenQuyen;
	}
	@Override
	public String toString() {
		return "PhanQuyen [maQuyen=" + maQuyen + ", tenQuyen=" + tenQuyen + "]";
	}
	
}
