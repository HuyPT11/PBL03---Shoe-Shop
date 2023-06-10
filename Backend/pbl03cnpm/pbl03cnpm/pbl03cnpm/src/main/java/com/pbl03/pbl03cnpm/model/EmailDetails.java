package com.pbl03.pbl03cnpm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor
 
// Class
public class EmailDetails {
 
    // Class data members
    private String recipient;
    private Object msgBody;
    private String subject;
    public EmailDetails() {
		// TODO Auto-generated constructor stub
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public Object getMsgBody() {
		return msgBody;
	}
	public void setMsgBody(Object msgBody) {
		this.msgBody = msgBody;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
    
}