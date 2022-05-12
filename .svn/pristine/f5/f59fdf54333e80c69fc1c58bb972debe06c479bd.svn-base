/**
 * @Title: StringToDateConverter.java
 * @Package cn.cruty.xboot.config.security
 * @Description: TODO(用一句话描述该文件做什么)
 * @author mingshenyue
 * @date 2019年2月22日 上午9:47:58
 * @version V1.0
 */
package com.xlf.config;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

import cn.hutool.core.util.StrUtil;

/**
 * @ClassName: StringToDateConverter
 * @Description: SpringBoot提交日期参数失败的解决方法
 * @author mingshenyue
 * @date 2019年2月22日 上午9:47:58
 *
 */
public class StringToDateConverter implements Converter<String, Date> {

	private static final String dateFormat = "yyyy-MM-dd HH:mm:ss";
	private static final String shortDateFormat = "yyyy-MM-dd";
	private static final String dateTimeFormat = "HH:mm:ss";

	/* (非 Javadoc)
	 * <p>Title: convert</p>
	 * <p>Description: </p>
	 * @param source
	 * @return
	 * @see org.springframework.core.convert.converter.Converter#convert(java.lang.Object)
	 */
	
	@Override
	public Date convert(String source) {
		if (StrUtil.isBlank(source) || StrUtil.equalsIgnoreCase("undefined", source) || StrUtil.equalsIgnoreCase("null", source)) {
			return null;
		}
		source = source.trim();
		try {
			SimpleDateFormat formatter;
			if (source.contains("-")) {
				if (source.contains(":")) {
					formatter = new SimpleDateFormat(dateFormat);
				} else {
					formatter = new SimpleDateFormat(shortDateFormat);
				}
				Date dtDate = formatter.parse(source);
				return dtDate;
			} else if(source.contains(":")){
				formatter = new SimpleDateFormat(dateTimeFormat);
				Date dtDate = formatter.parse(source);
				return dtDate;
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("parser %s to Date fail", source));
		}
 
		throw new RuntimeException(String.format("parser %s to Date fail", source));
	}

}
