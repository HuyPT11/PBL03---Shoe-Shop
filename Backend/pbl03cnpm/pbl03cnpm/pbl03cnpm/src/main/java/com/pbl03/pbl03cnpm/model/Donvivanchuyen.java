package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "donvivanchuyen")
public class Donvivanchuyen {
	@Id
	@Column(name = "MADVVC")
	private String id;
	@Column(name = "TenDVVC")
	private String name;
	@Column(name ="DiaChi")
	private String address;
	@Column(name = "Sdt")
	private String sdt;
	@Column(name = "Email")
	private String email;
	public Donvivanchuyen() {
	}
	public Donvivanchuyen(String id, String name, String address, String sdt, String email) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.sdt = sdt;
		this.email = email;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
		return "Donvivanchuyen [id=" + id + ", name=" + name + ", address=" + address + ", sdt=" + sdt + ", email="
				+ email + "]";
	}
}
