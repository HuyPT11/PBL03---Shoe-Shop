package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "taikhoan")
public class Taikhoan {
	@Id
	@Column(name = "MaTk")
	private String maTk;
	@OneToOne
	@JoinColumn(name = "TenDangNhap", referencedColumnName = "MaKH" ,insertable=false, updatable=false)
	private Customer customer;
	
	@OneToOne
	@JoinColumn(name = "TenDangNhap", referencedColumnName = "MaNV", insertable=false, updatable=false)
	private Employee employee;
	
	@Column(name = "MatKhau")
	private String matkhau;

	@ManyToOne
	@JoinColumn(name = "MaQuyen", referencedColumnName = "MaQuyen")
	private PhanQuyen phanQuyen;
	
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	@Column(name = "Email")
	private String email;
	@Column(name = "Sdt")
	private String sdt;
	public Taikhoan() {
		// TODO Auto-generated constructor stub
	}

	public Taikhoan(String maTk, Customer customer, Employee employee, String matkhau, PhanQuyen phanQuyen,
			String email, String sdt) {
		super();
		this.maTk = maTk;
		this.customer = customer;
		this.employee = employee;
		this.matkhau = matkhau;
		this.phanQuyen = phanQuyen;
		this.email = email;
		this.sdt = sdt;
	}
	public String getMaTk() {
		return maTk;
	}
	public void setMaTk(String maTk) {
		this.maTk = maTk;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public String getMatkhau() {
		return matkhau;
	}
	public void setMatkhau(String matkhau) {
		this.matkhau = matkhau;
	}
	public PhanQuyen getPhanQuyen() {
		return phanQuyen;
	}
	public void setPhanQuyen(PhanQuyen phanQuyen) {
		this.phanQuyen = phanQuyen;
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
		return "Taikhoan [maTk=" + maTk + ", customer=" + customer + ", matkhau=" + matkhau + ", phanQuyen=" + phanQuyen
				+ ", email=" + email + ", sdt=" + sdt + "]";
	}
	
	
}
