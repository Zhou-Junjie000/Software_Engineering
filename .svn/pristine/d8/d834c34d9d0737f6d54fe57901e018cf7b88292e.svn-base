package com.xlf.common.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * 自定义异常类
 */
public class MyException extends RuntimeException {

	private static final long serialVersionUID = -6639810947752563333L;
	
	@Getter @Setter private int code;
	
	public MyException(int code){
		this.code = code;
	}
	
	public MyException(String message){
		super(message);
	}
	
	public MyException(int code, String message){
		super(message);
		this.code = code;
	}

}