package com.pbl03.pbl03cnpm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.Product;

public interface ProductRepo extends JpaRepository<Product, String>{
	List<Product> findBytenSP(String tenSP);
}
