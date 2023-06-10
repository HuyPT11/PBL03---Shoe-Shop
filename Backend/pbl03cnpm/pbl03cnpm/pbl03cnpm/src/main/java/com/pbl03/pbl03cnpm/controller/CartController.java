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

import com.pbl03.pbl03cnpm.model.CartDTO;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.repositories.CartDTORepo;
import com.pbl03.pbl03cnpm.repositories.CartRepo;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired 
	private CartRepo cartRepo;
	@Autowired 
	private CartDTORepo cartDTORepo;
	
	@GetMapping("/{id}")
	List<CartDTO> getByMaKH(@PathVariable String id){
		return cartDTORepo.findByMaKH(id);
	}
	
	@PostMapping("/create")
	ResponseEntity<ResponseObject> createProduct(@RequestBody CartDTO newCart){
		Optional<CartDTO> createProduct = cartDTORepo.findByMaKHAndMaSPAndMaMauAndMaKC(newCart.getMaKH(), newCart.getMaSP(), 
																					   newCart.getMaMau(), newCart.getMaKC());
		if(createProduct.isPresent()) {
			int amount = createProduct.get().getSoLuong();
			int price = createProduct.get().getGia();
			CartDTO temp = createProduct.get();
			temp.setSoLuong(newCart.getSoLuong() + amount);
			temp.setGia(newCart.getGia() + price);
			cartDTORepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Update amount successfully", temp));
		}
		cartDTORepo.save(newCart);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", newCart));
	}
	@DeleteMapping("/delete/{id}")
	ResponseEntity<ResponseObject> deleteProducts(@PathVariable String id){
		List<CartDTO> cartDTOs = cartDTORepo.findByMaKH(id);
		if(cartDTOs.size() > 0) {
			for(CartDTO i : cartDTOs) {
				cartDTORepo.delete(i);
			}
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find product to delete", ""));
	}
	@DeleteMapping("/del/{makh}&{masp}&{makc}&{mamau}")
	ResponseEntity<ResponseObject> deleteProduct(@PathVariable String makh, @PathVariable String masp, @PathVariable String makc, @PathVariable String mamau){
		Optional<CartDTO> cartDTOs = cartDTORepo.findByMaKHAndMaSPAndMaMauAndMaKC(makh, masp, mamau, makc);
		if(cartDTOs.isPresent()) {
			cartDTORepo.delete(cartDTOs.get());
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find product to delete", ""));
	}
	@GetMapping("/get/{makh}&{masp}&{makc}&{mamau}")
	ResponseEntity<ResponseObject> getProduct(@PathVariable String makh, @PathVariable String masp, @PathVariable String makc, @PathVariable String mamau){
		Optional<CartDTO> cartDTOs = cartDTORepo.findByMaKHAndMaSPAndMaMauAndMaKC(makh, masp, mamau, makc);
		if(cartDTOs.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", cartDTOs.get()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find product to delete", ""));
	}
	@PutMapping("/update/{makh}&{masp}&{makc}&{mamau}&{soluong}")
	ResponseEntity<ResponseObject> updateProduct(@PathVariable String makh, @PathVariable String masp, @PathVariable String makc, @PathVariable String mamau, @PathVariable Integer soluong){
		Optional<CartDTO> cartDTOs = cartDTORepo.findByMaKHAndMaSPAndMaMauAndMaKC(makh, masp, mamau, makc);
		CartDTO temp = cartDTOs.get();
		temp.setSoLuong(soluong);
		cartDTORepo.save(temp);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", temp));
	}
}
