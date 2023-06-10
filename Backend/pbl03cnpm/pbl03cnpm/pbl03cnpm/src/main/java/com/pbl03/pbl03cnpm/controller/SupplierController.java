package com.pbl03.pbl03cnpm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.model.Supplier;
import com.pbl03.pbl03cnpm.repositories.SupplierRepo;


@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/supplier")
public class SupplierController {
	@Autowired
	private SupplierRepo supplierRepo;
	
	@GetMapping("")
	List<Supplier> getAll(){
		return supplierRepo.findAll();
	}
	@DeleteMapping("/delete/{id}")
	ResponseEntity<ResponseObject> deleteArea(@PathVariable String id){
		Optional<Supplier> supplier = supplierRepo.findById(id);
		if(supplier.isPresent()) {
			supplierRepo.delete(supplier.get());
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", supplier.get()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Cannot delete", ""));
	}
	@PostMapping("/create")
	ResponseEntity<ResponseObject> create(@RequestBody Supplier supplier){
		Optional<Supplier> supplierr = supplierRepo.findById(supplier.getMaNCC());
		if(supplierr.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "ID has existed!", ""));
		}
		supplierRepo.save(supplier);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", ""));
	}
	@PutMapping("/update/{id}")
	ResponseEntity<ResponseObject> updateSupplier(@PathVariable String id, @RequestBody Supplier supplier){
		Optional<Supplier> supplierr = supplierRepo.findById(id);
		if(supplierr.isPresent()) {
			supplierRepo.save(supplier);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Update successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "ID is not exist!", ""));
		
	}
	@GetMapping("/getlist/name={text}")
	ResponseEntity<ResponseObject> getList(@PathVariable String text){
		if(text != null)
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully", supplierRepo.findAll().stream()
							.filter(t -> t.getTenNCC().contains(text))
							.toList()));
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully", supplierRepo.findAll()));	 
	}
}
