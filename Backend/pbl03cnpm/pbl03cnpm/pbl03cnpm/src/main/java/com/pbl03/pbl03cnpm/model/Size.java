package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "kichco")
public class Size {
	@Id
	@Column(name = "MaKC")
	private String maKC;
	@Column(name = "SoKC")
	private Integer soKC;
	public Size() {
		// TODO Auto-generated constructor stub
	}
	public Size(String maKC, Integer soKC) {
		super();
		this.maKC = maKC;
		this.soKC = soKC;
	}
	public String getMaKC() {
		return maKC;
	}
	public void setMaKC(String maKC) {
		this.maKC = maKC;
	}
	public Integer getSoKC() {
		return soKC;
	}
	public void setSoKC(Integer soKC) {
		this.soKC = soKC;
	}
	@Override
	public String toString() {
		return "Size [maKC=" + maKC + ", soKC=" + soKC + "]";
	}
	
}
