package com.xlf.common.util;

import com.xlf.common.vo.ResultVo;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ResultUtil {

	public static ResultVo success() {
		return ResultUtil.success(null, "success");
	}

	public static ResultVo success(Object data) {
		return ResultUtil.success(data, "success");
	}

	public static ResultVo success(Object data, String message) {

		return ResultVo.builder().code(1).message(message).data(data).build();
	}
	
	public static ResultVo fail(int code, String message) {
		
		return ResultVo.builder().code(code).message(message).build();
	}
	
	public static ResultVo fail(int code, Object data) {
		return ResultVo.builder().code(code).data(data).build();
	}
}
