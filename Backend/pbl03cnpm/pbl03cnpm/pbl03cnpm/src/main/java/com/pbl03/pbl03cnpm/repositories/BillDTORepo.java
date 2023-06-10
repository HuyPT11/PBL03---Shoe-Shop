package com.pbl03.pbl03cnpm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.BillDTO;

public interface BillDTORepo extends JpaRepository<BillDTO, String>{
	List<BillDTO> findByMaKH(String makh);

	//Optional<BillDTO> findByMaHDAndMaSPAndMaKCAndMaMau(String mahd,String masp, String makc, String mamau);
	
}
