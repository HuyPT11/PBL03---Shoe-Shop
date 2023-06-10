package com.pbl03.pbl03cnpm.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.Customer;
import com.pbl03.pbl03cnpm.model.Employee;
import com.pbl03.pbl03cnpm.model.Taikhoan;

public interface TaikhoanRepo extends JpaRepository<Taikhoan, String>{
	Optional<Taikhoan> findBycustomer(Customer x);
	Optional<Taikhoan> findByemployee(Employee x);
}
