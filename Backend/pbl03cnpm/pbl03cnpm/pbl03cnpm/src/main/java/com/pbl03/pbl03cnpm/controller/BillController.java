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

import com.pbl03.pbl03cnpm.model.Bill;
import com.pbl03.pbl03cnpm.model.BillDTO;
import com.pbl03.pbl03cnpm.model.BillDetail;
import com.pbl03.pbl03cnpm.model.Donvivanchuyen;
import com.pbl03.pbl03cnpm.model.ProductDetail;
import com.pbl03.pbl03cnpm.model.Province;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.model.Statistics;
import com.pbl03.pbl03cnpm.repositories.BillDTORepo;
import com.pbl03.pbl03cnpm.repositories.BillDetailRepo;
import com.pbl03.pbl03cnpm.repositories.BillRepo;
import com.pbl03.pbl03cnpm.repositories.CustomerRepo;
import com.pbl03.pbl03cnpm.repositories.DonvivanchuyenRepo;
import com.pbl03.pbl03cnpm.repositories.EmployeeRepo;
import com.pbl03.pbl03cnpm.repositories.ProductDetailRepo;
import com.pbl03.pbl03cnpm.repositories.ProvinceRepo;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/bill")
public class BillController {
	@Autowired
	EntityManager em;
	@Autowired
	private EmployeeRepo employeeRepo;
	@Autowired
	private CustomerRepo customerRepo;
	@Autowired
	private DonvivanchuyenRepo donvivanchuyenRepo;
	@Autowired
	private ProvinceRepo provinceRepo;
	@Autowired
	private BillRepo billRepo;
	@Autowired
	private BillDTORepo billDTORepo;
	@Autowired
	private BillDetailRepo billDetailRepo;
	@Autowired
	private ProductDetailRepo productDetailRepo;
	@GetMapping("")
	List<Bill> getAllBills(){
		return billRepo.findAll();
	}
	@GetMapping("/province")
	List<Province> getProvinces(){
		return provinceRepo.findAll();
	}
	@GetMapping("/dvvc")
	List<Donvivanchuyen> getDvvc(){
		return donvivanchuyenRepo.findAll();
	}
	@GetMapping("/province/get/{id}")
	ResponseEntity<ResponseObject> getProvinces(String id){
		 Optional<Province> optional = provinceRepo.findById(id);
		 if(optional.isPresent()) {
			 return ResponseEntity.status(HttpStatus.OK).body(
						new ResponseObject("ok", "Find successfully", optional.get()));
		 }
		 return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot Find", ""));
	}
	@GetMapping("/dvvc/get/{id}")
	ResponseEntity<ResponseObject> getDvvc(String id){
		Optional<Donvivanchuyen> optional = donvivanchuyenRepo.findById(id);
		if(optional.isPresent()) {
			 return ResponseEntity.status(HttpStatus.OK).body(
						new ResponseObject("ok", "Find successfully", optional.get()));
		 }
		 return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "Cannot Find", ""));
	}
	@GetMapping("get/id={id}&text={text}")
	ResponseEntity<ResponseObject> getBillByMaKH(@PathVariable String id, @PathVariable String text){
		List<Bill> bills =	billRepo.findByCustomerMaKH(id);
		if(bills.size() > 0) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", bills.stream().filter(t -> t.getMaHD().contains(text)).toList()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot Find", ""));
	}
	
	@GetMapping("/getdetail")
	List<BillDetail> getAllBillsd(){
		return billDetailRepo.findAll();
	}
	
	//get list sp
	@GetMapping("/detail/{id}")
	ResponseEntity<ResponseObject> getBillDetailByID(@PathVariable String id){
		List<BillDetail> bills = billDetailRepo.findByMaHD(id);
		if(bills.size() > 0)
		{
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Find successfully", bills));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failded", "Cannot Find", ""));
	}
	
	//add hoá đơn trước
	@PostMapping("/add")
	@Transactional
	ResponseEntity<ResponseObject> addBill(@RequestBody BillDTO bill){
		boolean exist = billDTORepo.existsById(bill.getMaHD());
		if(exist) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("failded", "ID Bill has existed!", ""));
		}
		em.createNativeQuery("SET foreign_key_checks = 0;").executeUpdate();
		billDTORepo.save(bill);
		em.createNativeQuery("SET foreign_key_checks = 1;").executeUpdate();
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", ""));
	}
	//add sp sau
	@PostMapping("/addbilldetail")
	ResponseEntity<ResponseObject> addBillDetail(@RequestBody BillDetail billdetail){
		Optional<BillDetail> product = billDetailRepo.findByMaHDAndMaMauAndMaKC(billdetail.getMaHD(), billdetail.getMaMau(), billdetail.getMaKC());
		if(product.isPresent()) {
			BillDetail temp = product.get();
			int amount = temp.getSoluong();
			temp.setSoluong(amount + billdetail.getSoluong());
			billDetailRepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Increased amount successfully", ""));
		}
		billDetailRepo.save(billdetail);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Create successfully", ""));
	}
	@DeleteMapping("deletedetail/{mahd}&{masp}&{mamau}&{makc}")
	ResponseEntity<ResponseObject> deleteProductInBill(@PathVariable String mahd ,@PathVariable String masp, @PathVariable String mamau, @PathVariable String makc){
		Optional<BillDetail> deleteBill = billDetailRepo.findByMaHDAndMaSPAndMaKCAndMaMau(mahd ,masp, makc, mamau);
		if(deleteBill.isPresent()) {
			BillDetail temp = deleteBill.get();
			billDetailRepo.delete(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find bill to delete", ""));
	}
	@DeleteMapping("delete/{mahd}")
	ResponseEntity<ResponseObject> deleteBill(@PathVariable String mahd){
		Optional<BillDTO> deleteBill = billDTORepo.findById(mahd);
		if(deleteBill.isPresent()) {
			List<BillDetail> list = billDetailRepo.findByMaHD(mahd);
			for(BillDetail i : list) {
				billDetailRepo.delete(i);
			}
			BillDTO temp = deleteBill.get();
			billDTORepo.delete(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find bill to delete", ""));
	}
	@PutMapping("verify/{mahd}")
	ResponseEntity<ResponseObject> verifyBill(@PathVariable String mahd){
		Optional<BillDTO> verifyBill = billDTORepo.findById(mahd);
		if(verifyBill.isPresent()) {
			BillDTO temp = verifyBill.get();
			temp.setStatus(true);
			billDTORepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Verify successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not find bill to verify", ""));
	}
	// sau khi đặt hàng gọi hàm này để trừ số lượng sp trong kho
	@PutMapping("updateamount/{mahd}")
	ResponseEntity<ResponseObject> updateAmount(@PathVariable String mahd){
		List<BillDetail> list = billDetailRepo.findByMaHD(mahd);
		for(BillDetail i : list) {
			Optional<ProductDetail> optional = productDetailRepo.findByMaSPAndMaKCAndMaMau(i.getMaSP(), i.getMaKC(), i.getMaMau());
			ProductDetail productd = optional.get();
			int amount = productd.getSoLuong();
			productd.setSoLuong(amount - i.getSoluong());
			productDetailRepo.save(productd);
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Update Successfully", ""));
	}
	
	// trả lại giá trị cho sp và xoá luôn hoá đơn
	@DeleteMapping("cancel/{mahd}")
	ResponseEntity<ResponseObject> cancelBill(@PathVariable String mahd){
		Optional<BillDTO> cancelBill = billDTORepo.findById(mahd);
		if(cancelBill.isPresent() && cancelBill.get().getStatus() == false) {
			List<BillDetail> list = billDetailRepo.findByMaHD(mahd);
			for(BillDetail i : list) {
				Optional<ProductDetail> optional = productDetailRepo.findByMaSPAndMaKCAndMaMau(i.getMaSP(), i.getMaKC(), i.getMaMau());
				ProductDetail productd = optional.get();
				int amount = productd.getSoLuong();
				productd.setSoLuong(amount + i.getSoluong());
				productDetailRepo.save(productd);
			}
			return deleteBill(mahd);
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Can not cancel because it was verified", ""));
	}
	@PutMapping("update/{mahd}")
	ResponseEntity<ResponseObject> updateBill(@RequestBody BillDTO bill){
		Optional<BillDTO> billdto = billDTORepo.findById(bill.getMaHD());
		if(billdto.isPresent()) {
			billDTORepo.save(bill);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Update successfully", bill));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Cannot Update", ""));
	}
	@GetMapping("/getlist/id={text}")
	ResponseEntity<ResponseObject> getList(@PathVariable String text){
		if(text == "")
			{
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully", billRepo.findAll()));	
			}
		else {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Get successfully", billRepo.findAll().stream()
							.filter(t -> t.getMaHD().contains(text.toUpperCase()))
							.sorted((o1, o2) -> Integer.parseInt(o1.getStatus().toString()) - Integer.parseInt(o2.getStatus().toString()))
							.toList()));
		}
	}
	@GetMapping("getstatistics/month={month}&year={year}")
	ResponseEntity<ResponseObject> statistics(@PathVariable Integer month, @PathVariable Integer year){
		@SuppressWarnings("unchecked")
		List<Statistics> x = em.createNativeQuery("select MaSP, sum(SoLuong) as Soluong "
			    + "from hoadon hd "
			    + "join chitiethoadon cthd "
			    + "on cthd.MaHD = hd.MaHD "
			    + "where MONTH(hd.NgayBan) = :m and YEAR(hd.NgayBan) = :y "
			    + "group by MaSP;", Statistics.class)
			    .setParameter("m", month)
			    .setParameter("y", year)
			    .getResultList();
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Get successfully", x));	 
	}
	
	@GetMapping("getstatistics/ratetype")
	ResponseEntity<ResponseObject> ratetype(){
		@SuppressWarnings("unchecked")
		List<Statistics> x = em.createNativeQuery("select sp.MaSP, sum(ctsp.SoLuong) as Soluong \r\n"
				+ "from sanpham sp\r\n"
				+ "left join chitietsanpham ctsp\r\n"
				+ "on sp.MaSP = ctsp.MaSP\r\n"
				+ "group by sp.MaSP;", Statistics.class)
			    .getResultList();
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("ok", "Get successfully", x));	 
	}
}
