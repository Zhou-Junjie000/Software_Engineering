package com.xlf.common.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DataUtils {
	public static final String FORMAT_1 = "yyyy-MM-dd HH:mm:ss";
	public static final String FORMAT_2 = "yyyy-MM-dd";
	/**
	 * 
	* @Title: getCurrentTime
	* @Description: 获取系统时间
	* @param @param format 
	* @param @return
	* @return String 当前时间字符串
	* @throws
	 */
	public static String getCurrentTime(String format){
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(new Date());
	}
	/**
	 * 
	* @Title: DateToString
	* @Description: TODO
	* @param @param date
	* @param @return
	* @return String   
	* @throws
	 */
	public static String DateToString(Date date,String format){
		if(null==date){
			return null;
		}
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(date);
	}

	/**
	 *
	 * @param format
	 * @return
	 */
	public static String getYTD(String format){
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(new Date());
	}
	/**
	 * 
	* @Title: getCurrentYear
	* @Description: TODO
	* @param @return
	* @return int   
	* @throws
	 */
	public static int getCurrentYear(){
	    Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.YEAR);
	}
	/**
	 * 
	* @Title: getCurrentMonth
	* @Description: TODO
	* @param @return
	* @return int   
	* @throws
	 */
	public static int getCurrentMonth(){
	    Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.MONTH) + 1;
	}
	
	/**
	 * 
	* @Title: getSubductionByData
	* @Description: 历时返回时间
	* @param @param date
	* @param @return
	* @return String   
	* @throws
	 */
	public static String getSubductionByData(Date date){
		Date currDate = new Date();
		return Long.toString(currDate.getTime()-date.getTime());
	}
	
	public static String longTimeToDay(Long ms){
        Integer ss = 1000;  
        Integer mi = ss * 60;  
        Integer hh = mi * 60;  
        Integer dd = hh * 24;  
        Long day = ms / dd;  
        Long hour = (ms - day * dd) / hh;  
        Long minute = (ms - day * dd - hour * hh) / mi;  
        Long second = (ms - day * dd - hour * hh - minute * mi) / ss;  
//        Long milliSecond = ms - day * dd - hour * hh - minute * mi - second * ss;  

        StringBuffer sb = new StringBuffer();  
        if(day > 0) {  
            sb.append(day+"天");  
        }  
        if(hour > 0) {  
            sb.append(hour+"小时");  
        }  
        if(minute > 0) {  
            sb.append(minute+"分");  
        }  
        if(second > 0) {  
            sb.append(second+"秒");  
        }  
//        if(milliSecond > 0) {  
//            sb.append(milliSecond+"毫秒");  
//        }  
        return sb.toString();  
    }
}
