package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sanpham")
public class ProductDto {
	@Id
	@Column(name = "MaSP")
	private String maSP;
	@Column(name = "TenSP")
	private String tenSP;
	@Column(name = "MaNH")
	private String maNH;
	@Column(name = "MaMH")
	private String maMH;
	@Column(name = "MaKM")
	private String maKM;
	@Column(name = "GiaBan")
	private Integer giaBan;
	@Column(name = "HinhAnh")
	private String hinhAnh;
	@Column(name = "MoTa")
	private String moTa;
	public ProductDto() {
	}
	public String getTenSP() {
		return tenSP;
	}
	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}
	public String getMaNH() {
		return maNH;
	}
	public void setMaNH(String maNH) {
		this.maNH = maNH;
	}
	public String getMaMH() {
		return maMH;
	}
	public void setMaMH(String maMH) {
		this.maMH = maMH;
	}
	public String getMaKM() {
		return maKM;
	}
	public void setMaKM(String maKM) {
		this.maKM = maKM;
	}
	public Integer getGiaBan() {
		return giaBan;
	}
	public String getMaSP() {
		return maSP;
	}
	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}
	public void setGiaBan(Integer giaBan) {
		this.giaBan = giaBan;
	}
	public String getHinhAnh() {
		return hinhAnh;
	}
	public void setHinhAnh(String hinhAnh) {
		this.hinhAnh = hinhAnh;
	}
	public String getMoTa() {
		return moTa;
	}
	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}
	public ProductDto(String maSP, String tenSP, String maNH, String maMH, String maKM, Integer giaBan,
			String hinhAnh, String moTa) {
		super();
		this.maSP = maSP;
		this.tenSP = tenSP;
		this.maNH = maNH;
		this.maMH = maMH;
		this.maKM = maKM;
		this.giaBan = giaBan;
		this.hinhAnh = hinhAnh;
		this.moTa = moTa;
	}

	
	
}
