package com.pbl03.pbl03cnpm.model;

import jakarta.persistence.Entity;


public class TempAcc {
	private String user;
	private String pass;
	public TempAcc() {
		// TODO Auto-generated constructor stub
	}
	public TempAcc(String user, String pass) {
		super();
		this.user = user;
		this.pass = pass;
	}
	@Override
	public String toString() {
		return "TempAcc [user=" + user + ", pass=" + pass + "]";
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	
}
