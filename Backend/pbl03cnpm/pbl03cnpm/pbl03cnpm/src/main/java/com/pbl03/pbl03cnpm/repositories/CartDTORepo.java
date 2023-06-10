package com.pbl03.pbl03cnpm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.Cart;
import com.pbl03.pbl03cnpm.model.CartDTO;

public interface CartDTORepo extends JpaRepository<CartDTO, Integer>{
	Optional<CartDTO> findByMaKHAndMaSPAndMaMauAndMaKC(String makh, String masp, String mamau, String makc);
	List<CartDTO> findByMaKH(String id);
	Boolean existsByMaKH(String makh);
}
