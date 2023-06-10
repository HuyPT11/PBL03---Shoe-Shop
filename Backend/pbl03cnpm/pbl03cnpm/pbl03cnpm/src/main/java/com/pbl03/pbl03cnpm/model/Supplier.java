package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nhacungcap")
public class Supplier {
	@Id
	private String maNCC;
	
	@Column(name = "TenNCC")
	private String tenNCC;
	
	@Column(name = "NguoiDaiDien")
	private String nguoiDaiDien;
	
	@Column(name = "LinhVucKinhDoanh")
	private String linhVucKinhDoanh;
	
	@Column(name = "DiaChi")
	private String diaChi;
	
	@Column(name = "Sdt")
	private String sdt;
	
	@Column(name = "Email")
	private String email;
	
	public Supplier() {
		// TODO Auto-generated constructor stub
	}

	public Supplier(String maNCC, String tenNCC, String nguoiDaiDien, String linhVucKinhDoanh, String diaChi,
			String sdt, String email) {
		super();
		this.maNCC = maNCC;
		this.tenNCC = tenNCC;
		this.nguoiDaiDien = nguoiDaiDien;
		this.linhVucKinhDoanh = linhVucKinhDoanh;
		this.diaChi = diaChi;
		this.sdt = sdt;
		this.email = email;
	}

	public String getMaNCC() {
		return maNCC;
	}

	public void setMaNCC(String maNCC) {
		this.maNCC = maNCC;
	}

	public String getTenNCC() {
		return tenNCC;
	}

	public void setTenNCC(String tenNCC) {
		this.tenNCC = tenNCC;
	}

	public String getNguoiDaiDien() {
		return nguoiDaiDien;
	}

	public void setNguoiDaiDien(String nguoiDaiDien) {
		this.nguoiDaiDien = nguoiDaiDien;
	}

	public String getLinhVucKinhDoanh() {
		return linhVucKinhDoanh;
	}

	public void setLinhVucKinhDoanh(String linhVucKinhDoanh) {
		this.linhVucKinhDoanh = linhVucKinhDoanh;
	}

	public String getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
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

	@Override
	public String toString() {
		return "Supplier [maNCC=" + maNCC + ", tenNCC=" + tenNCC + ", nguoiDaiDien=" + nguoiDaiDien
				+ ", linhVucKinhDoanh=" + linhVucKinhDoanh + ", diaChi=" + diaChi + ", sdt=" + sdt + ", email=" + email
				+ "]";
	}
	
}
