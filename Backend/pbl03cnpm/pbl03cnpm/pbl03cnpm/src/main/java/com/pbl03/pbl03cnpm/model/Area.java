package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "khuvuc")
public class Area {
	@Id
	@Column(name = "MaKV")
	private String makv;
	
	@Column(name = "TenKV")
	private String tenkv;
	
	@Column(name = "TinhTrang")
	private String tinhtrang;
	
	@OneToOne
	@JoinColumn(name = "MaNH", referencedColumnName = "MaNH")
	private NhanHieu nhanhieu;
	
	public Area() {
		// TODO Auto-generated constructor stub
	}

	public Area(String makv, String tenkv, String tinhtrang, NhanHieu nhanhieu) {
		super();
		this.makv = makv;
		this.tenkv = tenkv;
		this.tinhtrang = tinhtrang;
		this.nhanhieu = nhanhieu;
	}

	public String getMakv() {
		return makv;
	}

	public void setMakv(String makv) {
		this.makv = makv;
	}

	public String getTenkv() {
		return tenkv;
	}

	public void setTenkv(String tenkv) {
		this.tenkv = tenkv;
	}

	public String getTinhtrang() {
		return tinhtrang;
	}

	public void setTinhtrang(String tinhtrang) {
		this.tinhtrang = tinhtrang;
	}

	public NhanHieu getNhanhieu() {
		return nhanhieu;
	}

	public void setNhanhieu(NhanHieu nhanhieu) {
		this.nhanhieu = nhanhieu;
	}

	@Override
	public String toString() {
		return "Area [makv=" + makv + ", tenkv=" + tenkv + ", tinhtrang=" + tinhtrang + ", nhanhieu=" + nhanhieu + "]";
	}
	
}
