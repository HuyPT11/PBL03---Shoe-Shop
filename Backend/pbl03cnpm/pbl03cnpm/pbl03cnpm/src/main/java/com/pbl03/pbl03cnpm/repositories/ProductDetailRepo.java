package com.pbl03.pbl03cnpm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.ProductDetail;

public interface ProductDetailRepo extends JpaRepository<ProductDetail, Integer>{
	Optional<ProductDetail> findByMaSPAndMaKCAndMaMau(String maSP, String maKc, String maMau);
	List<ProductDetail> findByMaSP(String maSP);
	Optional<List<ProductDetail>> findByMaSPAndMaKC(String masp, String makc);
	Optional<List<ProductDetail>> findByMaSPAndMaMau(String masp, String mamau);
}
