package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chitietsanpham")
public class ProductDetail {
	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "MaSP")
	private String maSP;
	
	@Column(name = "MaKC")
	private String maKC;
	
	@Column(name = "MaMau")
	private String maMau;
	
	@Column(name = "SoLuong")
	private Integer soLuong;
	
	@Column(name = "Gia")
	private Integer gia;
	
	@Column(name = "HinhAnh")
	private String hinhAnh;
	
	@Column(name = "TrangThai")
	private Boolean Trangthai;
	
	public ProductDetail() {
	}

	


	public Boolean getTrangthai() {
		return Trangthai;
	}




	public void setTrangthai(Boolean trangthai) {
		Trangthai = trangthai;
	}




	public ProductDetail(String id, String maSP, String maKC, String maMau, Integer soLuong, Integer gia,
			String hinhAnh, Boolean trangthai) {
		super();
		this.id = id;
		this.maSP = maSP;
		this.maKC = maKC;
		this.maMau = maMau;
		this.soLuong = soLuong;
		this.gia = gia;
		this.hinhAnh = hinhAnh;
		Trangthai = trangthai;
	}

	public Integer getGia() {
		return gia;
	}

	public void setGia(Integer gia) {
		this.gia = gia;
	}

	public String getHinhAnh() {
		return hinhAnh;
	}



	public void setHinhAnh(String hinhAnh) {
		this.hinhAnh = hinhAnh;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMaSP() {
		return maSP;
	}

	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}

	public String getMaKC() {
		return maKC;
	}

	public void setMaKC(String maKC) {
		this.maKC = maKC;
	}

	public String getMaMau() {
		return maMau;
	}

	public void setMaMau(String maMau) {
		this.maMau = maMau;
	}


	public Integer getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}

	@Override
	public String toString() {
		return "ProductDetail [id=" + id + ", maSP=" + maSP + ", maKC=" + maKC + ", maMau=" + maMau + ", soLuong="
				+ soLuong + ", gia=" + gia + ", hinhAnh=" + hinhAnh + ", Trangthai=" + Trangthai + "]";
	}


	
}
