package com.pbl03.pbl03cnpm.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pbl03.pbl03cnpm.model.Color;
import com.pbl03.pbl03cnpm.model.ProductDetail;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.model.Size;
import com.pbl03.pbl03cnpm.repositories.KichcoRepo;
import com.pbl03.pbl03cnpm.repositories.MauRepo;
import com.pbl03.pbl03cnpm.repositories.ProductDetailRepo;
import com.pbl03.pbl03cnpm.repositories.ProductRepo;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/productdetail")
public class ProductDetailController {
	@Autowired
	private ProductDetailRepo productDetailRepo;
	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private MauRepo mauRepo; 
	@Autowired
	private KichcoRepo kichcoRepo;
	@GetMapping("")
	List<ProductDetail> getAll(){
		return productDetailRepo.findAll();
	}
	@GetMapping("/{id}")
	List<ProductDetail> getAlls(@PathVariable String id){
		return productDetailRepo.findByMaSP(id);
	}
	
	@GetMapping("get/{masp}&{makc}&{mamau}")
	ResponseEntity<ResponseObject> getAlls(@PathVariable String masp, @PathVariable String makc, @PathVariable String mamau) {
		Optional<ProductDetail> temp =productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau);
		if(temp.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau).get())); 
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot Find", ""));
	}
	
	@GetMapping("getamount/{masp}&{makc}&{mamau}")
	ResponseEntity<ResponseObject> getAmount(@PathVariable String masp, @PathVariable String makc, @PathVariable String mamau) {
		Optional<ProductDetail> temp = productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau);
		if(temp.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau).get().getSoLuong())); 
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot Find", ""));
	}
	@GetMapping("/getAllKC/{id}")
	List<Size> getAllKC(@PathVariable String id){
		List<Size> kc = new ArrayList<>();
		List<ProductDetail> productDetails = productDetailRepo.findByMaSP(id);
		for(ProductDetail i : productDetails) {
			kc.add(kichcoRepo.findById(i.getMaKC()).get());
		}
		return kc.stream().distinct().toList();
	}
	@GetMapping("/getKC/{id1}&{makc}")
	Size getKC(@PathVariable String id1, @PathVariable String makc){
		List<Size> kc = new ArrayList<>();
		List<ProductDetail> productDetails = productDetailRepo.findByMaSP(id1);
		for(ProductDetail i : productDetails) {
			kc.add(kichcoRepo.findById(i.getMaKC()).get());
		}
		return kc.stream().distinct().filter(t -> t.getMaKC().compareTo(makc) == 0).toList().get(0);
	}
	@GetMapping("/getAllMau/{id}")
	List<Color> getAllMau(@PathVariable String id){
		List<Color> mau = new ArrayList<>();
		List<ProductDetail> productDetails = productDetailRepo.findByMaSP(id);
		for(ProductDetail i : productDetails) {
			mau.add(mauRepo.findById(i.getMaMau()).get());
		}
		return mau.stream().distinct().toList();
	}
	@GetMapping("/getMau/{id1}&{makc}")
	Color getMau(@PathVariable String id1, @PathVariable String mamau){
		List<Color> mau = new ArrayList<>();
		List<ProductDetail> productDetails = productDetailRepo.findByMaSP(id1);
		for(ProductDetail i : productDetails) {
			mau.add(mauRepo.findById(i.getMaMau()).get());
		}
		return mau.stream().distinct().filter(t -> t.getMaMau().compareTo(mamau) == 0).toList().get(0);
	}
	@PostMapping("/add")
	ResponseEntity<ResponseObject> addProductDetail(@RequestBody ProductDetail productdetail){
		boolean check = productRepo.existsById(productdetail.getMaSP());
		if(!check) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "ID product has not existed", ""));
		}
		Optional<ProductDetail> productDetails = productDetailRepo.findByMaSPAndMaKCAndMaMau(productdetail.getMaSP(), productdetail.getMaKC(), productdetail.getMaMau());
		if(productDetails.isPresent()) {
			ProductDetail temp = productDetails.get();
			int amount = temp.getSoLuong();
			temp.setSoLuong(amount + productdetail.getSoLuong());
			temp.setTrangthai(true);
			productDetailRepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Increase successfully", ""));
		}
		productDetailRepo.save(productdetail);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", ""));
	}
	
	@PutMapping("/update/{masp}&{makc}&{mamau}")
	ResponseEntity<ResponseObject> updateProductDetail(@RequestBody ProductDetail newProduct, @PathVariable String masp, @PathVariable String makc, @PathVariable String mamau){
		
		ProductDetail updatedProduct = productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau)
				.map(product -> {
					product.setSoLuong(newProduct.getSoLuong());
					product.setHinhAnh(newProduct.getHinhAnh());
					product.setGia(newProduct.getGia());
					product.setTrangthai(true);
					return productDetailRepo.save(product);
				}).orElseGet(() -> {
					newProduct.setMaSP(masp);
					newProduct.setMaMau(mamau);
					newProduct.setMaKC(makc);
					return productDetailRepo.save(newProduct);
				});
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", updatedProduct));
	}
}
