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

import com.pbl03.pbl03cnpm.model.Area;
import com.pbl03.pbl03cnpm.model.ResponseObject;
import com.pbl03.pbl03cnpm.repositories.Arearepo;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/area")
public class AreaController {
	@Autowired
	private Arearepo arearepo;
	@GetMapping("")
	List<Area> getAll(){
		return arearepo.findAll();
	}
	@GetMapping("get/{id}")
	Area getUnique(@PathVariable String id){
		return arearepo.findAll().stream().filter(t -> t.getMakv().equals(id)).toList().get(0);
	}
	@PutMapping("update/{id}&{status}")
	ResponseEntity<ResponseObject> updateArea(@PathVariable String id, @PathVariable String status){
		Optional<Area> areaa = arearepo.findById(id);
		if(areaa.isPresent()) {
			Area temp = areaa.get();
			temp.setTinhtrang(status);
			arearepo.save(temp);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Update successfully", temp));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Cannot Update", ""));
	}
	@DeleteMapping("/delete/id={id}")
	ResponseEntity<ResponseObject> deleteArea(@PathVariable String id){
		Optional<Area> areaa = arearepo.findById(id);
		if(areaa.isPresent()) {
			arearepo.delete(areaa.get());
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Delete successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Cannot delete", ""));
	}
	@PostMapping("/create")
	ResponseEntity<ResponseObject> create(@RequestBody Area area){
		Optional<Area> areaa = arearepo.findById(area.getMakv());
		if(areaa.isEmpty()) {
			arearepo.save(area);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("ok", "Create successfully", area));
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("failed", "Area has existed!", ""));
	}
}
