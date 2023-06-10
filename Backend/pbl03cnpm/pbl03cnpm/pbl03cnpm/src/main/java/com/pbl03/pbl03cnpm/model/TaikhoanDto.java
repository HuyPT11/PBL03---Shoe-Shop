package com.pbl03.pbl03cnpm.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "taikhoan")
public class TaikhoanDto {
	@Id
	@Column(name = "MaTk")
	private String maTk;
	
	@Column(name = "TenDangNhap")
	private String tendangnhap;
	
	@Column(name = "MatKhau")
	private String matkhau;

	@Column(name = "MaQuyen")
	private String maQuyen;
	
	@Column(name = "Email")
	private String email;
	@Column(name = "Sdt")
	private String sdt;
	public TaikhoanDto() {
	}
	public TaikhoanDto(String maTk, String tendangnhap, String matkhau, String maQuyen, String email, String sdt) {
		super();
		this.maTk = maTk;
		this.tendangnhap = tendangnhap;
		this.matkhau = matkhau;
		this.maQuyen = maQuyen;
		this.email = email;
		this.sdt = sdt;
	}
	public String getMaTk() {
		return maTk;
	}
	public void setMaTk(String maTk) {
		this.maTk = maTk;
	}
	public String getTendangnhap() {
		return tendangnhap;
	}
	public void setTendangnhap(String tendangnhap) {
		this.tendangnhap = tendangnhap;
	}
	public String getMatkhau() {
		return matkhau;
	}
	public void setMatkhau(String matkhau) {
		this.matkhau = matkhau;
	}
	public String getMaQuyen() {
		return maQuyen;
	}
	public void setMaQuyen(String maQuyen) {
		this.maQuyen = maQuyen;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSdt() {
		return sdt;
	}
	public void setSdt(String sdt) {
		this.sdt = sdt;
	}
	@Override
	public String toString() {
		return "TaikhoanDto [maTk=" + maTk + ", tendangnhap=" + tendangnhap + ", matkhau=" + matkhau + ", maQuyen="
				+ maQuyen + ", email=" + email + ", sdt=" + sdt + "]";
	}
	
}
