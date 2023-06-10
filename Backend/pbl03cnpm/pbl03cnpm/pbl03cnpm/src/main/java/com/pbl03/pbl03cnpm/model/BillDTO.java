package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "hoadon")
public class BillDTO {
	@Id
	@Column(name = "MaHD")
	private String maHD;

	@Column(name = "MaKH")
	private String maKH;
	
	@Column(name = "MaNV")
	private String maNV;
	
	@Column(name = "MaDVVC")
	private String maDVVC;
	
	@Column(name = "NgayBan")
	private String date;
	
	@Column(name = "MaTinh")
	private String maTinh;
	
	@Column(name = "DiaChi")
	private String address;
	
	@Column(name = "TongTien")
	private Integer sumPrice;
	
	@Column(name = "TrangThai")
	private Boolean status;
	
	@Column(name = "Mota")
	private String mota;
	public BillDTO() {
		// TODO Auto-generated constructor stub
	}
	public BillDTO(String maHD, String maKH, String maNV, String maDVVC, String date, String maTinh, String address,
			Integer sumPrice, Boolean status, String mota) {
		super();
		this.maHD = maHD;
		this.maKH = maKH;
		this.maNV = maNV;
		this.maDVVC = maDVVC;
		this.date = date;
		this.address = address;
		this.sumPrice = sumPrice;
		this.status = status;
		this.mota = mota;
		this.maTinh = maTinh;
	}
	

	public String getMaHD() {
		return maHD;
	}
	public void setMaHD(String maHD) {
		this.maHD = maHD;
	}
	public String getMaKH() {
		return maKH;
	}
	public void setMaKH(String maKH) {
		this.maKH = maKH;
	}
	public String getMaNV() {
		return maNV;
	}
	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}
	public String getMaDVVC() {
		return maDVVC;
	}
	public void setMaDVVC(String maDVVC) {
		this.maDVVC = maDVVC;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getMaTinh() {
		return maTinh;
	}
	public void setMaTinh(String maTinh) {
		this.maTinh = maTinh;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(Integer sumPrice) {
		this.sumPrice = sumPrice;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public String getMota() {
		return mota;
	}
	public void setMota(String mota) {
		this.mota = mota;
	}
	@Override
	public String toString() {
		return "BillDTO [id=" + maHD + ", maKH=" + maKH + ", maNV=" + maNV + ", maDVVC=" + maDVVC + ", date=" + date
				+ ", province=" + maTinh + ", address=" + address + ", sumPrice=" + sumPrice + ", status=" + status
				+ ", mota=" + mota + "]";
	}
	
	
}
