package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mau")
public class Color {
	@Id
	@Column(name = "MaMau")
	private String maMau;
	@Column(name = "TenMau")
	private String tenMau;
	public Color() {
		// TODO Auto-generated constructor stub
	}

	public Color(String maMau, String tenMau) {
		super();
		this.maMau = maMau;
		this.tenMau = tenMau;

	}

	public String getMaMau() {
		return maMau;
	}
	public void setMaMau(String maMau) {
		this.maMau = maMau;
	}
	public String getTenMau() {
		return tenMau;
	}
	public void setTenMau(String tenMau) {
		this.tenMau = tenMau;
	}
	@Override
	public String toString() {
		return "Color [maMau=" + maMau + ", tenMau=" + tenMau + "]";
	}
	
}
