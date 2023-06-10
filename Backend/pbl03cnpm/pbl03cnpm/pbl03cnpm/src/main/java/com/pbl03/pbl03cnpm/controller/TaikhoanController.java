package com.pbl03.pbl03cnpm.controller;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Predicate;

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

import com.pbl03.pbl03cnpm.model.Customer;
import com.pbl03.pbl03cnpm.model.Employee;
import com.pbl03.pbl03cnpm.model.Product;
import com.pbl03.pbl03cnpm.model.ProductDto;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.model.Taikhoan;
import com.pbl03.pbl03cnpm.model.TaikhoanDto;
import com.pbl03.pbl03cnpm.model.TempAcc;
import com.pbl03.pbl03cnpm.repositories.CustomerRepo;
import com.pbl03.pbl03cnpm.repositories.EmployeeRepo;
import com.pbl03.pbl03cnpm.repositories.TaikhoanDtoRepo;
import com.pbl03.pbl03cnpm.repositories.TaikhoanRepo;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/taikhoan")
public class TaikhoanController {
	@Autowired
	EntityManager em;
	@Autowired
	TaikhoanRepo taikhoanRepo;
	@Autowired
	CustomerRepo customerRepo;
	@Autowired
	EmployeeRepo employeeRepo;
	@Autowired
	TaikhoanDtoRepo taikhoanDtoRepo;
	
	@GetMapping("")
	List<Taikhoan> find(){
		return taikhoanRepo.findAll();
	}
	@GetMapping("employee/get/{id}")
	Taikhoan getTaikhoaneById(@PathVariable String id) {
		Optional<Taikhoan> taikhoane = taikhoanRepo.findById(id);
		if(taikhoane.isPresent()) {
			return taikhoane.get();
		}
		else return null;
	}
	@GetMapping("customer/get/{id}")
	ResponseEntity<ResponseObject> getTaikhoancById(@PathVariable String id) {
		Optional<Taikhoan> taikhoanc = taikhoanRepo.findById(id);
		if(taikhoanc.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", taikhoanc.get()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find", ""));
	}
	@GetMapping("/admin")
	List<Taikhoan> getAllAdmin(){
		return taikhoanRepo.findAll().stream()
							.filter(t -> t.getPhanQuyen().getMaQuyen().equals("1"))
							.toList();
	}
	@GetMapping("/customer")
	List<Taikhoan> getAllCustomer(){
		return taikhoanRepo.findAll().stream()
							.filter(t -> t.getPhanQuyen().getMaQuyen().equals("3"))
							.toList();
	}
	@GetMapping("/employee")
	List<Taikhoan> getAllEmployee(){
		return taikhoanRepo.findAll().stream()
				.filter(t -> t.getPhanQuyen().getMaQuyen().equals("2"))
				.toList();
	}
	
	@GetMapping("/{id}")
	Employee getEmployee(@PathVariable String id){
		return employeeRepo.findById(id).get();
	}
	
	@DeleteMapping("/deletee/{id}")
	ResponseEntity<ResponseObject> deleteEmployee(@PathVariable String id){
		Optional<Employee> employee = employeeRepo.findById(id);
		if(employee.isPresent()) {
			Optional<Taikhoan> taikhoan = taikhoanRepo.findByemployee(employee.get());
			taikhoanRepo.delete(taikhoan.get());
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		else {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "Can not find product to delete", ""));
		}
	}
	@DeleteMapping("/deletec/{id}")
	ResponseEntity<ResponseObject> deleteCustomer(@PathVariable String id){
		Optional<Customer> customer = customerRepo.findById(id);
		if(customer.isPresent()) {
			Optional<Taikhoan> taikhoan = taikhoanRepo.findBycustomer(customer.get());
			taikhoanRepo.delete(taikhoan.get());
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		else {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "Can not find product to delete", ""));
		}
	}
	
	@PostMapping("/checklogin")
	ResponseEntity<ResponseObject> getnewAccount(@RequestBody TempAcc tempAcc)
	{
		Optional<Customer> foundAccount = customerRepo.findById(tempAcc.getUser());
		Optional<Employee> foundEmployee = employeeRepo.findById(tempAcc.getUser());
		if(foundAccount.isPresent()) {
			Optional<Taikhoan> temp = taikhoanRepo.findBycustomer(foundAccount.get());
			if(temp.get().getMatkhau().equals(tempAcc.getPass())) {
				return ResponseEntity.status(HttpStatus.OK).body(
						new ResponseObject("ok", "Login successfully", temp.get()));
			}
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject("false", "Wrong pass" , ""));
			}
			
		}
		else {
			if(foundEmployee.isPresent()) {
				Optional<Taikhoan> temp = taikhoanRepo.findByemployee(foundEmployee.get());
				if(temp.get().getMatkhau().equals(tempAcc.getPass())) {
					return ResponseEntity.status(HttpStatus.OK).body(
							new ResponseObject("ok", "Login successfully", temp.get()));
				}
				else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
							new ResponseObject("false", "Wrong pass" , ""));
				}
			}
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject("false", "Not found : " + tempAcc, ""));
			}
		}
	}
	
	@PostMapping("/register")
	@Transactional
	ResponseEntity<ResponseObject> register(@RequestBody Taikhoan newTaikhoan){
		if(newTaikhoan.getCustomer() == null) {
			Optional<Employee> employee = employeeRepo.findById(newTaikhoan.getEmployee().getMaNV());
			if(employee.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject("false", "Duplicated Username" , ""));		
			}
			else {
				employeeRepo.save(newTaikhoan.getEmployee());
				em.createNativeQuery("SET foreign_key_checks = 0;").executeUpdate();
				taikhoanDtoRepo.save(new TaikhoanDto(newTaikhoan.getMaTk(), 
						newTaikhoan.getEmployee().getMaNV(), 
						newTaikhoan.getMatkhau(), 
						newTaikhoan.getPhanQuyen().getMaQuyen(), 
						newTaikhoan.getEmail(), 
						newTaikhoan.getSdt()));
				em.createNativeQuery("SET foreign_key_checks = 1;").executeUpdate();
				return ResponseEntity.status(HttpStatus.OK).body(
						new ResponseObject("ok", "Login successfully", newTaikhoan));
			}
		}
		else {
			Optional<Customer> customer = customerRepo.findById(newTaikhoan.getCustomer().getMaKH());
			if(customer.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						new ResponseObject("false", "Duplicated Username" , ""));
			}
			else {
				customerRepo.save(newTaikhoan.getCustomer());
				em.createNativeQuery("SET foreign_key_checks = 0;").executeUpdate();
				taikhoanDtoRepo.save(new TaikhoanDto(newTaikhoan.getMaTk(), 
						newTaikhoan.getCustomer().getMaKH(), 
						newTaikhoan.getMatkhau(), 
						newTaikhoan.getPhanQuyen().getMaQuyen(), 
						newTaikhoan.getEmail(), 
						newTaikhoan.getSdt()));
				em.createNativeQuery("SET foreign_key_checks = 1;").executeUpdate();
				return ResponseEntity.status(HttpStatus.OK).body(
						new ResponseObject("ok", "Login successfully", newTaikhoan));
			}
		}
	}
	@PostMapping("/addemployee")
	@Transactional
	ResponseEntity<ResponseObject> createEmployee(@RequestBody Taikhoan taikhoan){
		boolean temp = taikhoanRepo.existsById(taikhoan.getMaTk());
		if(temp) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "existed ID!", ""));
		}
		else {
			employeeRepo.save(taikhoan.getEmployee());
			em.createNativeQuery("SET foreign_key_checks = 0;").executeUpdate();
			taikhoanDtoRepo.save(new TaikhoanDto(taikhoan.getMaTk(), 
					taikhoan.getEmployee().getMaNV(), 
					taikhoan.getMatkhau(), 
					taikhoan.getPhanQuyen().getMaQuyen(), 
					taikhoan.getEmail(), 
					taikhoan.getSdt()));
			em.createNativeQuery("SET foreign_key_checks = 1;").executeUpdate();
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "create successfully!", ""));
		}
	}
	@PostMapping("/addcustomer")
	@Transactional
	ResponseEntity<ResponseObject> createCustomer(@RequestBody Taikhoan taikhoan){
		boolean temp = taikhoanRepo.existsById(taikhoan.getMaTk());
		if(temp) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failed", "existed ID!", ""));
		}
		else {
			customerRepo.save(taikhoan.getCustomer());
			em.createNativeQuery("SET foreign_key_checks = 0;").executeUpdate();
			taikhoanDtoRepo.save(new TaikhoanDto(taikhoan.getMaTk(), 
					taikhoan.getCustomer().getMaKH(), 
					taikhoan.getMatkhau(), 
					taikhoan.getPhanQuyen().getMaQuyen(), 
					taikhoan.getEmail(), 
					taikhoan.getSdt()));
			em.createNativeQuery("SET foreign_key_checks = 1;").executeUpdate();
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "create successfully!", ""));
		}
	}
	@PutMapping("/employee/update/{id}")
	ResponseEntity<ResponseObject> updateEmployee(@RequestBody Taikhoan taikhoan, @PathVariable String id){
		
		Employee employee = employeeRepo.findById(id)
										.orElse(null);
		if(employee == null) return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot find employee with id = " + id , ""));
		employee.setTenNV(taikhoan.getEmployee().getTenNV());
		employee.setNs(taikhoan.getEmployee().getNs());
		employee.setSdt(taikhoan.getEmployee().getSdt());
		employee.setDiachi(taikhoan.getEmployee().getDiachi());
		employee.setLuong(taikhoan.getEmployee().getLuong());
		employee.setGt(taikhoan.getEmployee().getGt());
		employee.setEmail(taikhoan.getEmployee().getEmail());
		employeeRepo.save(employee);
		
		TaikhoanDto taikhoanDto = taikhoanDtoRepo.findById(taikhoan.getMaTk())
												 .orElse(null);
		if(taikhoanDto == null) return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot find account with id = " + id , ""));
		taikhoanDto.setTendangnhap(taikhoan.getEmployee().getMaNV());
		taikhoanDto.setSdt(taikhoan.getSdt());
		taikhoanDto.setEmail(taikhoan.getEmail());
		taikhoanDto.setMatkhau(taikhoan.getMatkhau());
		taikhoanDto.setMaQuyen(taikhoan.getPhanQuyen().getMaQuyen());
		taikhoanDtoRepo.save(taikhoanDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", taikhoanRepo.findById(id)));
	}
	@PutMapping("/customer/update/{id}")
	ResponseEntity<ResponseObject> updateCustomer(@RequestBody Taikhoan taikhoan, @PathVariable String id){
		
		Customer customer = customerRepo.findById(id)
										.orElse(null);
		if(customer == null) return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot find customer with id = " + id , ""));
		customer.setTenKH(taikhoan.getCustomer().getTenKH());
		customer.setSdt(taikhoan.getCustomer().getSdt());
		customer.setGt(taikhoan.getCustomer().getGt());
		customer.setEmail(taikhoan.getCustomer().getEmail());
		customer.setDiachi(taikhoan.getCustomer().getDiachi());
		customerRepo.save(customer);
		
		TaikhoanDto taikhoanDto = taikhoanDtoRepo.findById(taikhoan.getMaTk())
												 .orElse(null);
		if(taikhoanDto == null) return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot find account with id = " + id , ""));
		taikhoanDto.setTendangnhap(taikhoan.getCustomer().getMaKH());
		taikhoanDto.setSdt(taikhoan.getSdt());
		taikhoanDto.setEmail(taikhoan.getEmail());
		taikhoanDto.setMatkhau(taikhoan.getMatkhau());
		taikhoanDto.setMaQuyen(taikhoan.getPhanQuyen().getMaQuyen());
		taikhoanDtoRepo.save(taikhoanDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update successfully", taikhoanRepo.findById(id)));
	}
	
	@PutMapping("/changepass={id}&{pass}")
	ResponseEntity<ResponseObject> changePass(@PathVariable String id,@PathVariable String pass){
		Optional<TaikhoanDto> optional = taikhoanDtoRepo.findById(id);
		if(optional.isPresent()) {
			TaikhoanDto temp = optional.get();
			temp.setMatkhau(pass);
			taikhoanDtoRepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Change successfully!", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "ID is not exist!", ""));
	}
	@GetMapping("/forgot/{username}")
	ResponseEntity<ResponseObject> forgotPass(@PathVariable String username){
		Optional<TaikhoanDto> optional = taikhoanDtoRepo.findById(username);
		if(optional.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "ID has existed!", optional.get()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "ID is not exist!", ""));
	}
	@GetMapping("/customer/text={text}")
	ResponseEntity<ResponseObject> getAllCustomer(@PathVariable String text){
		if(text != null)
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully", taikhoanRepo.findAll().stream()
							.filter(t -> t.getPhanQuyen().getMaQuyen().equals("3"))
							.filter(t -> t.getCustomer().getTenKH().contains(text))
							.toList()));
			return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Get successfully", taikhoanRepo.findAll().stream()
						   .filter(t -> t.getPhanQuyen().getMaQuyen().equals("3"))
						   .toList()));
	}
	@GetMapping("/employee/text={text}")
	ResponseEntity<ResponseObject> getAllEmployee(@PathVariable String text){
		if(text != null)
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully",  taikhoanRepo.findAll().stream()
							.filter(t -> t.getPhanQuyen().getMaQuyen().equals("2"))
							.filter(t -> t.getEmployee().getTenNV().contains(text))
							.toList()));
			return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Get successfully", taikhoanRepo.findAll().stream()
						.filter(t -> t.getPhanQuyen().getMaQuyen().equals("2"))
						.toList()));
	}
}
