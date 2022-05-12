package com.xlf.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xlf.common.exception.MyException;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(value = Exception.class)
	@ResponseBody
	public ResultVo exceptionHandler(HttpServletRequest request, Exception e) {

		log.error("异常", e.getMessage());
		e.printStackTrace();
		
		return ResultUtil.fail(500, e.getMessage());
	}
	
	@ExceptionHandler(value = MyException.class)
	@ResponseBody
	public ResultVo mvp51ExceptionHandler(HttpServletRequest request, MyException e) {

		log.error("异常", e.getMessage());
		e.printStackTrace();

		return ResultUtil.fail(e.getCode(), e.getMessage());
	}

}
