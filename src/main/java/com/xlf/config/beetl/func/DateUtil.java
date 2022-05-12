/**
 * @Title: JsonUtil.java
 * @Package com.dream.entity.config.beetl.funcpkg
 * @Description: TODO(用一句话描述该文件做什么)
 * @author mingshenyue
 * @date 2019年8月27日 上午10:07:15
 * @version V1.0
 */
package com.xlf.config.beetl.func;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Component;

import cn.hutool.core.date.BetweenFormater;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUnit;
/**
 * 对象转为json
 */
@Component
public class DateUtil {

	public Object parseBetween(String start,String end){
		return null;
	}
	
	public Object parseBetween(Date start,Date end){
		long time = cn.hutool.core.date.DateUtil.between(start, end, DateUnit.MS);
		return cn.hutool.core.date.DateUtil.formatBetween(time,BetweenFormater.Level.MINUTE);
	}
	
	public Date addDays(Date start,int day){
		Calendar calendar = cn.hutool.core.date.DateUtil.calendar(start);
		calendar.add(Calendar.DATE, day);
		return calendar.getTime();
//		return cn.hutool.core.date.DateUtil.format(calendar.getTime(), DatePattern.NORM_DATE_PATTERN);
	}
}
