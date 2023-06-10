package com.pbl03.pbl03cnpm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Integer>{
	List<Cart> findByMaKH(String id);
	Boolean existsByMaKH(String makh);
}
