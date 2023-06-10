package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mathang")
public class MatHang {
	@Id
	@Column(name = "MaMH")
	private String maMH;
	@Column(name = "TenMH")
	private String tenMH;
	public MatHang() {
		// TODO Auto-generated constructor stub
	}
	public MatHang(String maMH, String tenMH) {
		super();
		this.maMH = maMH;
		this.tenMH = tenMH;
	}
	public String getMaMH() {
		return maMH;
	}
	public void setMaMH(String maMH) {
		this.maMH = maMH;
	}
	public String getTenMH() {
		return tenMH;
	}
	public void setTenMH(String tenMH) {
		this.tenMH = tenMH;
	}
	@Override
	public String toString() {
		return "MatHang [maMH=" + maMH + ", tenMH=" + tenMH + "]";
	}
	
}
