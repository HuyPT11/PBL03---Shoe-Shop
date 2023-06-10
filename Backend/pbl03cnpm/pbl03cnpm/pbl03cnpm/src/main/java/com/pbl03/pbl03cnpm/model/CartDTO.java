package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "giohang")
public class CartDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "MaKH")
	private String maKH;
	
	@Column(name = "MaSP")
	private String maSP;
	
	@Column(name = "TenSP")
	private String tenSP;
	
	@Column(name = "MaMau")
	private String maMau;
	
	@Column(name = "MaKC")
	private String maKC;
	
	@Column(name = "Soluong")
	private Integer soLuong;
	
	@Column(name = "Gia")
	private Integer gia;
	public CartDTO() {
		// TODO Auto-generated constructor stub
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMaKH() {
		return maKH;
	}
	public void setMaKH(String maKH) {
		this.maKH = maKH;
	}
	public String getMaSP() {
		return maSP;
	}
	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}
	public String getTenSP() {
		return tenSP;
	}
	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}
	public String getMaMau() {
		return maMau;
	}
	public void setMaMau(String maMau) {
		this.maMau = maMau;
	}
	public String getMaKC() {
		return maKC;
	}
	public void setMaKC(String maKC) {
		this.maKC = maKC;
	}
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public Integer getGia() {
		return gia;
	}
	public void setGia(Integer gia) {
		this.gia = gia;
	}
	public CartDTO(Integer id, String maKH, String maSP, String tenSP, String maMau, String maKC, Integer soLuong,
			Integer gia) {
		super();
		this.id = id;
		this.maKH = maKH;
		this.maSP = maSP;
		this.tenSP = tenSP;
		this.maMau = maMau;
		this.maKC = maKC;
		this.soLuong = soLuong;
		this.gia = gia;
	}
	@Override
	public String toString() {
		return "CartDTO [id=" + id + ", maKH=" + maKH + ", maSP=" + maSP + ", tenSP=" + tenSP + ", maMau=" + maMau
				+ ", maKC=" + maKC + ", soLuong=" + soLuong + ", gia=" + gia + "]";
	}
	
	
}
