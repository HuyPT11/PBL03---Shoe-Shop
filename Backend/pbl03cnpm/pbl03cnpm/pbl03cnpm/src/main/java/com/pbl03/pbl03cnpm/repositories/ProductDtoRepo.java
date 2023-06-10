package com.pbl03.pbl03cnpm.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pbl03.pbl03cnpm.model.ProductDto;

public interface ProductDtoRepo extends JpaRepository<ProductDto, String>{
}
