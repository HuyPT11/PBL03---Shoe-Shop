package com.pbl03.pbl03cnpm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.Bill;

public interface BillRepo extends JpaRepository<Bill, String>{

	List<Bill> findByCustomerMaKH(String id);

}
