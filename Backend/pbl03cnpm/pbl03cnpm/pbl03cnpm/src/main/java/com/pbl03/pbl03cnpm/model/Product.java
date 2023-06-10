package com.pbl03.pbl03cnpm.model;


import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "sanpham")
public class Product {
	@Id
	@Column(name = "MaSP")
	private String maSP;
	
	@Column(name = "TenSP")
	private String tenSP;
	
	@ManyToOne
	@JoinColumn(name = "MaNH", referencedColumnName = "MaNH")
	private NhanHieu nh;
	
	@ManyToOne
	@JoinColumn(name = "MaMH", referencedColumnName = "MaMH")
	private MatHang mh;
	
	@ManyToOne
	@JoinColumn(name = "MaKM", referencedColumnName = "MaKM")
	private Khuyenmai km;
	
	@Column(name = "GiaBan")
	private Integer giaban;
	
	@Column(name = "HinhAnh")
	private String hinhanh;
	
	@Column(name = "MoTa")
	private String mota;

	@OneToMany
	@JoinColumn(name = "MaSP", referencedColumnName = "MaSP")
	private List<ProductDetail> productDetails;
	public Product() {
		// TODO Auto-generated constructor stub
	}
	public Product(String maSP, String tenSP, NhanHieu nh, MatHang mh, Khuyenmai km, Integer giaban,
			String hinhanh, String mota, List<ProductDetail> productDetails) {
		super();
		this.maSP = maSP;
		this.tenSP = tenSP;
		this.nh = nh;
		this.mh = mh;
		this.km = km;
		this.giaban = giaban;
		this.hinhanh = hinhanh;
		this.mota = mota;
		this.productDetails = productDetails;
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
	public NhanHieu getNh() {
		return nh;
	}
	public void setNh(NhanHieu nh) {
		this.nh = nh;
	}
	public MatHang getMh() {
		return mh;
	}
	public void setMh(MatHang mh) {
		this.mh = mh;
	}
	public Khuyenmai getKm() {
		return km;
	}
	public void setKm(Khuyenmai km) {
		this.km = km;
	}
	public Integer getGiaban() {
		return giaban;
	}
	public void setGiaban(Integer giaban) {
		this.giaban = giaban;
	}
	public String getHinhanh() {
		return hinhanh;
	}
	public void setHinhanh(String hinhanh) {
		this.hinhanh = hinhanh;
	}
	public String getMota() {
		return mota;
	}
	public void setMota(String mota) {
		this.mota = mota;
	}
	public List<ProductDetail> getProductDetails() {
		return productDetails;
	}
	public void setProductDetails(List<ProductDetail> productDetails) {
		this.productDetails = productDetails;
	}
	@Override
	public String toString() {
		return "Product [maSP=" + maSP + ", tenSP=" + tenSP + ", nh=" + nh + ", mh=" + mh + ", km=" + km 
				+ ", giaban=" + giaban + ", hinhanh=" + hinhanh + ", mota=" + mota  + ", productDetails=" + productDetails + "]";
	}
	

}

