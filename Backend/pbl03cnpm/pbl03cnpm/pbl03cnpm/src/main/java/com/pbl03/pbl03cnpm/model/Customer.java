package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "khachhang")
public class Customer {
	@Id
	@Column(name = "MaKH")
	private String maKH;
	@Column(name = "TenKH")
	private String tenKH;
	@Column(name = "GioiTinh")
	private String gt;
	@Column(name = "Email")
	private String email;
	@Column(name = "DiaChi")
	private String diachi;
	@Column(name = "Sdt")
	private String sdt;
	public Customer() {
		// TODO Auto-generated constructor stub
	}
	public Customer(String maKH, String tenKH, String gt, String email, String diachi, String sdt) {
		super();
		this.maKH = maKH;
		this.tenKH = tenKH;
		this.gt = gt;
		this.email = email;
		this.diachi = diachi;
		this.sdt = sdt;
	}
	public String getMaKH() {
		return maKH;
	}
	public void setMaKH(String maKH) {
		this.maKH = maKH;
	}
	public String getTenKH() {
		return tenKH;
	}
	public void setTenKH(String tenKH) {
		this.tenKH = tenKH;
	}
	public String getGt() {
		return gt;
	}
	public void setGt(String gt) {
		this.gt = gt;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDiachi() {
		return diachi;
	}
	public void setDiachi(String diachi) {
		this.diachi = diachi;
	}
	public String getSdt() {
		return sdt;
	}
	public void setSdt(String sdt) {
		this.sdt = sdt;
	}
	@Override
	public String toString() {
		return "Customer [maKH=" + maKH + ", tenKH=" + tenKH + ", gt=" + gt + ", email=" + email + ", diachi=" + diachi
				+ ", sdt=" + sdt + "]";
	}
	
}
