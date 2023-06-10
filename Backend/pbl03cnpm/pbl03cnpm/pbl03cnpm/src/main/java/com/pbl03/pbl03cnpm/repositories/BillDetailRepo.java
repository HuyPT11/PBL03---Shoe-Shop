package com.pbl03.pbl03cnpm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.BillDTO;
import com.pbl03.pbl03cnpm.model.BillDetail;

public interface BillDetailRepo extends JpaRepository<BillDetail, Integer>{
	List<BillDetail> findByMaHD(String makh);
	Optional<BillDetail> findByMaHDAndMaMauAndMaKC(String mahd, String mamau, String makc);
	Optional<BillDetail> findByMaHDAndMaSPAndMaKCAndMaMau(String mahd, String masp, String makc, String mamau);
}
