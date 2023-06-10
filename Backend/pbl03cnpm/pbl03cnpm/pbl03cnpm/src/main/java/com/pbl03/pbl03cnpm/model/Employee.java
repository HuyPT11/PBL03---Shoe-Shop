package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nhanvien")
public class Employee {
	@Id
	@Column(name = "MaNV")
	private String maNV;
	@Column(name = "TenNV")
	private String tenNV;
	@Column(name = "GioiTinh")
	private String gt;
	@Column(name = "NgaySinh")
	private String ns;
	@Column(name = "DiaChi")
	private String diachi;
	@Column(name = "Sdt")
	private String sdt;
	@Column(name = "Email")
	private String email;
	@Column(name = "Luong")
	private Integer luong;
	public Employee() {
		
	}
	public String getMaNV() {
		return maNV;
	}
	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}
	public String getTenNV() {
		return tenNV;
	}
	public void setTenNV(String tenNV) {
		this.tenNV = tenNV;
	}
	public String getGt() {
		return gt;
	}
	public void setGt(String gt) {
		this.gt = gt;
	}
	public String getNs() {
		return ns;
	}
	public void setNs(String ns) {
		this.ns = ns;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getLuong() {
		return luong;
	}
	public void setLuong(Integer luong) {
		this.luong = luong;
	}
	public Employee(String maNV, String tenNV, String gt, String ns, String diachi, String sdt, String email,
			Integer luong) {
		super();
		this.maNV = maNV;
		this.tenNV = tenNV;
		this.gt = gt;
		this.ns = ns;
		this.diachi = diachi;
		this.sdt = sdt;
		this.email = email;
		this.luong = luong;
	}
	@Override
	public String toString() {
		return "Employee [maNV=" + maNV + ", tenNV=" + tenNV + ", gt=" + gt + ", ns=" + ns + ", diachi=" + diachi
				+ ", sdt=" + sdt + ", email=" + email + ", luong=" + luong + "]";
	}
}
