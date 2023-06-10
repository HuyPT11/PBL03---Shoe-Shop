package com.pbl03.pbl03cnpm.service;

import com.pbl03.pbl03cnpm.model.EmailDetails;

//Interface
public interface EmailService {

	// Method
	// To send a simple email
	String sendSimpleMail(EmailDetails details);
}