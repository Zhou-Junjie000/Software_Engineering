/**
 * 
 */
package com.xlf.common.util;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.InvalidResultSetAccessException;

import com.alibaba.druid.util.StringUtils;

 
 
/**
 * 
 * @Description:导出Excel工具类
 * @author: songpeng 
 * @date: date{time} （日期）
 */
public class ExportExcelUtil<T>{
	
	// 2007 版本以上 最大支持1048576行
	public  final static String  EXCEl_FILE_2007 = "2007";
	// 2003 版本 最大支持65536 行
	public  final static String  EXCEL_FILE_2003 = "2003";
	private final static Logger logger = LoggerFactory.getLogger(ExportExcelUtil.class);
	
	/**
	 * 	导出列表工具类
	 * @param fileName 文件名
	 * @param sql 查询sql
	 * @param fields 字段
	 * @param fieldNames 字段名称
	 * @param out 输出流
	 */
	public static void excelListExcel(String fileName, List<?> list, String[] fields, String[] fieldNames, HttpServletResponse response){

		logger.info("excelListExcel filename [{}] size {}",fileName, list.size());
		try {
			//生成一个工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 生成一个表格
			HSSFSheet sheet = workbook.createSheet(fileName);
			sheet.setZoom(85, 100); //设置缩放比例 85%

			// 设置表格默认列宽度为15个字节
			sheet.setDefaultColumnWidth(15);
			// 生成一个样式
			HSSFCellStyle style = workbook.createCellStyle();
			// 设置这些样式
			style.setFillForegroundColor(IndexedColors.GREEN.getIndex());
			style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			style.setAlignment(HorizontalAlignment.CENTER);
			style.setVerticalAlignment(VerticalAlignment.CENTER);//垂直居中
			// 生成一个字体
			HSSFFont font = workbook.createFont();
			font.setBold(true);
			font.setFontName("宋体"); 
			font.setColor(IndexedColors.WHITE.getIndex());
			font.setFontHeightInPoints((short) 15);
			font.setBold(false);
			// 把字体应用到当前的样式
			style.setFont(font);
			// 生成并设置另一个样式
			HSSFCellStyle style2 = workbook.createCellStyle();
			style2.setFillForegroundColor(IndexedColors.WHITE.getIndex());
			style2.setFillPattern(FillPatternType.SOLID_FOREGROUND);
			style2.setBorderBottom(BorderStyle.THIN);
			style2.setBorderLeft(BorderStyle.THIN);
			style2.setBorderRight(BorderStyle.THIN);
			style2.setBorderTop(BorderStyle.THIN);
			style2.setAlignment(HorizontalAlignment.LEFT);
			style2.setVerticalAlignment(VerticalAlignment.CENTER);
			// 生成另一个字体
			HSSFFont font2 = workbook.createFont();
			font2.setBold(false);
			// 把字体应用到当前的样式
			style2.setFont(font2);
 
			// 产生表格标题行
			HSSFRow row = sheet.createRow(0);
			row.setHeight((short) 628);//目的是想把行高设置成25px
			HSSFCell cellHeader;
			for (int i = 0; i < fieldNames.length; i++) {
				cellHeader = row.createCell(i);
				cellHeader.setCellStyle(style);
				cellHeader.setCellValue(new HSSFRichTextString(fieldNames[i]));
			}
			
			int index = 0;
			HSSFCell cell;
			//处理数据
			String value = "";
			if(list != null && !list.isEmpty()){
				//检查List元素类型
				Map<String, Object> map = null;
				for (Object obj: list) {
					if(obj instanceof Map){
						map = (Map<String, Object>)obj;
					}else{
						map = entityToMap(obj);
					}
					index++;
					row = sheet.createRow(index);
					for(int h=0; h<fields.length; h++){
						cell = row.createCell(h);
						cell.setCellStyle(style2);
						value = String.valueOf(map.get(fields[h]));
						if(StringUtils.isEmpty(value) || StringUtils.equals("null", value)) value = "";
						
						cell.setCellValue(value);
					}
				}
			}
			logger.info("userExport[{}]","开始下载");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			response.setContentType("application/vnd.ms-excel;charset=UTF-8");   
	        response.setHeader("Content-disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO-8859-1") + "("+sdf.format(new Date())+").xls");
	        OutputStream ouputStream = response.getOutputStream();
	        workbook.write(ouputStream);   
	        ouputStream.flush();   
	        ouputStream.close();
	        logger.info("userExport[{}]","下载 完成");
		} catch (InvalidResultSetAccessException e) {
			logger.error("excelListExcel exception",e);
			e.printStackTrace();
		} catch (IOException e) {
			logger.error("excelListExcel exception",e);
			e.printStackTrace();
		} catch (Exception e) {
			logger.error("excelListExcel exception",e);
			e.printStackTrace();
		}
	}
	
	/**
	 * 实体类转Map
	 * @param object
	 * @return
	 */
	public static Map<String, Object> entityToMap(Object object) {
		Map<String, Object> map = new HashMap();
	    for (Field field : object.getClass().getDeclaredFields()){
	        try {
	        	boolean flag = field.isAccessible();
	            field.setAccessible(true);
	            Object o = field.get(object);
	            map.put(field.getName(), o);
	            field.setAccessible(flag);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	    return map;
	}
}

