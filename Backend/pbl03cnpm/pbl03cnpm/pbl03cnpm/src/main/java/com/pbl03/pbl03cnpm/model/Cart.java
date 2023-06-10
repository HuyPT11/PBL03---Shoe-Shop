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
@Table(name = "giohang")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "MaKH",insertable=false, updatable=false)
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
	
	@ManyToOne
	@JoinColumn(name = "MaKH", referencedColumnName = "MaKH")
	private Customer customer;
	
	public Cart() {
	}

	

	public Cart(Integer id, String maKH, String maSP, String tenSP, String maMau, String maKC, Integer soLuong,
			Integer gia, Customer customer) {
		super();
		this.id = id;
		this.maKH = maKH;
		this.maSP = maSP;
		this.tenSP = tenSP;
		this.maMau = maMau;
		this.maKC = maKC;
		this.soLuong = soLuong;
		this.gia = gia;
		this.customer = customer;
	}



	public String getTenSP() {
		return tenSP;
	}



	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", maKH=" + maKH + ", maSP=" + maSP + ", maMau=" + maMau + ", maKC=" + maKC
				+ ", soLuong=" + soLuong + ", gia=" + gia + ", customer=" + customer + "]";
	}
}
