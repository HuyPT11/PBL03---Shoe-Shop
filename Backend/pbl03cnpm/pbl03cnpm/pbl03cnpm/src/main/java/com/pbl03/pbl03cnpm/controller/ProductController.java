package com.pbl03.pbl03cnpm.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

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
import com.pbl03.pbl03cnpm.model.Khuyenmai;
import com.pbl03.pbl03cnpm.model.MatHang;
import com.pbl03.pbl03cnpm.model.NhanHieu;
import com.pbl03.pbl03cnpm.model.Product;
import com.pbl03.pbl03cnpm.model.ProductDetail;
import com.pbl03.pbl03cnpm.model.ProductDto;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.model.Size;
import com.pbl03.pbl03cnpm.repositories.KhuyenmaiRepo;
import com.pbl03.pbl03cnpm.repositories.KichcoRepo;
import com.pbl03.pbl03cnpm.repositories.MathangRepo;
import com.pbl03.pbl03cnpm.repositories.MauRepo;
import com.pbl03.pbl03cnpm.repositories.NhanhieuRepo;
import com.pbl03.pbl03cnpm.repositories.ProductDetailRepo;
import com.pbl03.pbl03cnpm.repositories.ProductDtoRepo;
import com.pbl03.pbl03cnpm.repositories.ProductRepo;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/sanpham")
public class ProductController {
	@Autowired
	private KichcoRepo kichcoRepo;
	@Autowired
	private MauRepo mauRepo;
	@Autowired
	private NhanhieuRepo nhanhieuRepo;
	@Autowired
	private MathangRepo mathangRepo;
	@Autowired
	private KhuyenmaiRepo khuyenmaiRepo;
	@Autowired 
	ProductDtoRepo productDtoRepo;
	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private ProductDetailRepo productDetailRepo;
	@GetMapping("/kc")
	List<Size> getKC(){
		return kichcoRepo.findAll();
	}
	
	@GetMapping("/mau")
	List<Color> getMau(){
		return mauRepo.findAll();
	}
	
	@GetMapping("/nh")
	List<NhanHieu> getNH(){
		return nhanhieuRepo.findAll();
	}
	
	@GetMapping("/mh")
	List<MatHang> getMH(){
		return mathangRepo.findAll();
	}
	
	@GetMapping("/km")
	List<Khuyenmai> getKM(){
		return khuyenmaiRepo.findAll();
	}
	
	@GetMapping("")
	List<Product> getAll(){
		List<Product> temp = productRepo.findAll()
						  .stream()
						  .toList();
		for(Product i : temp) {
			List<ProductDetail> productDetails = i.getProductDetails();
			List<ProductDetail> productDetails1 = new ArrayList<>();
			for(ProductDetail j : productDetails) {
				if(j.getTrangthai() == true) productDetails1.add(j);
			}
			i.setProductDetails(productDetails1);
		}
		return temp;
	}
	
	List<String> getKC(String id){
		List<ProductDetail> products = productDetailRepo.findByMaSP(id);
		List<String> size = new ArrayList<>();
		for(ProductDetail i : products) {
			size.add(i.getMaKC());
		}
		return size;
	}
	

	@GetMapping("/filter/type={mamh}&min={min}&max={max}&mau={mamau}&kc={makc}&nh={manh}&name={text}")
	ResponseEntity<ResponseObject> filter(@PathVariable String mamh,@PathVariable Integer min, @PathVariable Integer max, @PathVariable String mamau, @PathVariable String makc, @PathVariable String manh, @PathVariable String text){
		List<Product> products = getAll().stream()
								.filter(t -> t.getMh().getMaMH().equals(mamh))
								.filter(t -> t.getGiaban() >= min && t.getGiaban() <= max)
								.toList();
		
		if(!manh.equals("all")) {
			String[] nh = manh.split("\\&");
			products = products.stream().filter(new Predicate<Product>() {
				@Override
				public boolean test(Product t) {
					for(String j : nh) {
						if(t.getNh().getMaNH().equals(j))
						{
							return true;
						}
					}
					return false;
				}
			}).toList();
		}
		if(!makc.equals("all")) {
			String[] kc = makc.split("\\&");
			List<Product> temp = new ArrayList<>();
			for(Product i : products) {
				for(String j : kc) {
					if(productDetailRepo.findByMaSPAndMaKC(i.getMaSP(), j).get().size() > 0)
					{
						temp.add(i);
						break;
					}
				}
			}
			products = temp;
		}
		if(!mamau.equals("all")) {
			String[] mau = mamau.split("\\&");
			List<Product> temp1 = new ArrayList<>();
			for(Product i : products) {
				for(String j : mau) {
					if(productDetailRepo.findByMaSPAndMaMau(i.getMaSP(), j).get().size() > 0)
					{
						temp1.add(i);
					}
				}
			}
			products = temp1;
		}
		
		if(text != null)
		{
			List<Product> temp2 = products.stream().filter(t -> t.getTenSP().contains(text.toUpperCase())).toList();
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", temp2));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Find successfully", products));
	}
	@GetMapping("/dto")
	List<ProductDto> getProductDto(){
		return productDtoRepo.findAll();
	}
	@GetMapping("/dto/{id}")
	ProductDto getProductDtoById(@PathVariable String id){
		return productDtoRepo.findById(id).get();
	}
	@GetMapping("/getProduct/{masp}")
	ResponseEntity<ResponseObject> getProduct(@PathVariable String masp){
		Optional<Product> product = productRepo.findById(masp);
		if(product.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "Cannot find product ", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Find successfully", product.get()));
	}
	
	@PutMapping("delete/{masp}&{mamau}&{makc}")
	ResponseEntity<ResponseObject> deleteProduct(@PathVariable String masp, @PathVariable String mamau, @PathVariable String makc){
		Optional<ProductDetail> updatedProduct = productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau);
		if(updatedProduct.isPresent()) {
			ProductDetail temp = updatedProduct.get();
			temp.setTrangthai(false);
			productDetailRepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find product to delete", ""));
	}
	
	@PutMapping("/update/{masp}")
	ResponseEntity<ResponseObject> updateProduct(@RequestBody ProductDto newProduct, @PathVariable String masp){
		
		ProductDto updatedProduct = productDtoRepo.findById(masp)
				.map(product -> {
					product.setTenSP(newProduct.getTenSP());
					product.setMaNH(newProduct.getMaNH());
					product.setMaMH(newProduct.getMaMH());
					product.setMaKM(newProduct.getMaKM());
					product.setGiaBan(newProduct.getGiaBan());
					product.setHinhAnh(newProduct.getHinhAnh());
					product.setMoTa(newProduct.getMoTa());
					return productDtoRepo.save(product);
				}).orElseGet(() -> {
					newProduct.setMaSP(masp);
					return productDtoRepo.save(newProduct);
				});
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", updatedProduct));
	}
	
	@PutMapping("/increaseamount/{masp}&{mamau}&{makc}&{amount}")
	ResponseEntity<ResponseObject> updateAmountProduct(@PathVariable String masp, @PathVariable String mamau, @PathVariable String makc, @PathVariable Integer amount){
		Optional<ProductDetail> updatedProduct = productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau);
		if(updatedProduct.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot find product", ""));
		}
		ProductDetail temp = updatedProduct.get();
		int sl = temp.getSoLuong();
		temp.setSoLuong(sl + amount);
		productDetailRepo.save(temp);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", temp));
	}
	@PutMapping("/decreaseamount/{masp}&{mamau}&{makc}&{amount}")
	ResponseEntity<ResponseObject> decreaseAmountProduct(@PathVariable String masp, @PathVariable String mamau, @PathVariable String makc, @PathVariable Integer amount){
		Optional<ProductDetail> updatedProduct = productDetailRepo.findByMaSPAndMaKCAndMaMau(masp, makc, mamau);
		if(updatedProduct.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot find product", ""));
		}
		ProductDetail temp = updatedProduct.get();
		int sl = temp.getSoLuong();
		temp.setSoLuong(sl - amount);
		productDetailRepo.save(temp);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Decrease amount successfully", temp));
	}
	@PostMapping("/create")
	ResponseEntity<ResponseObject> createProduct(@RequestBody ProductDto newProduct){
		boolean createProduct = productDtoRepo.existsById(newProduct.getMaSP());
		if(createProduct) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Product was existed", ""));
		}
		productDtoRepo.save(newProduct);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", newProduct));
	}
	@GetMapping("/filterproduct/name={name}")
	ResponseEntity<ResponseObject> getProductsByName(@PathVariable String name){
		List<Product> temp = productRepo.findAll()
						  .stream()
						  .toList();
		for(Product i : temp) {
			List<ProductDetail> productDetails = i.getProductDetails();
			List<ProductDetail> productDetails1 = new ArrayList<>();
			for(ProductDetail j : productDetails) {
				if(j.getTrangthai() == true) productDetails1.add(j);
			}
			i.setProductDetails(productDetails1);
		}
		if(name != null)
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", temp.stream().filter(t -> t.getTenSP().contains(name.toUpperCase())).toList()));
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Find successfully", temp));	
	}
	

}
