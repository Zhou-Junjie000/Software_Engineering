package com.xlf.common.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import com.github.pagehelper.util.StringUtil;

import freemarker.template.Configuration;
import freemarker.template.Template;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class OfficeTools<T> {
	/**
	 * @param office
	 *            word中需要展示的动态数据，用OfficeEntity来保存
	 * @param templateName
	 *            word模板名称，例如：teample.ftl
	 * @param filePath
	 *            文件生成的目标路径，例如：D:/
	 * @param fileName
	 *            生成的文件名称
	 */
	public void createWord(T office, String templateName,String filePath, String fileName) {
		try {
			Map<String, Object> dataMap = new HashMap<String, Object>();
			ergodic(office);
			 /** 组装数据 */
	        dataMap.put("office",office);
			// 创建配置实例
			@SuppressWarnings("deprecation")
			Configuration configuration = new Configuration();
 
			// 设置编码
			configuration.setDefaultEncoding("UTF-8");
 
			// ftl模板文件
			configuration.setClassForTemplateLoading(OfficeTools.class,
					"/templates/common/");
 
			// 获取模板
			Template template = configuration.getTemplate(templateName);
 
			// 输出文件
			File outFile = new File(filePath + File.separator + fileName);
 
			// 如果输出目标文件夹不存在，则创建
			if (!outFile.getParentFile().exists()) {
				outFile.getParentFile().mkdirs();
			}
 
			// 将模板和数据模型合并生成文件
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(outFile), "UTF-8"));
 
			// 生成文件
			template.process(dataMap, out);
 
			// 关闭流
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
 
	}
	
	
	/**
	 * 将图片转换为BASE64为字符串
	 * @param filename
	 * @return
	 * @throws IOException
	 */
	public static String getImageString(String filename) throws IOException {  
        InputStream in = null;  
        byte[] data = null;  
        try {  
            in = new FileInputStream(filename);  
            data = new byte[in.available()];  
            in.read(data);  
            in.close();  
        } catch (IOException e) {  
            throw e;  
        } finally {  
            if(in != null) in.close();  
        }  
        BASE64Encoder encoder = new BASE64Encoder();  
        return data != null ? encoder.encode(data) : "";  
   } 
	/**
	 * 遍历实体类的所有属性
	 * @param obj
	 * @throws NoSuchFieldException
	 * @throws SecurityException
	 */
	private static void ergodic(Object obj) throws NoSuchFieldException, SecurityException{
		 Field[] fields = obj.getClass().getDeclaredFields();
		 for(int i = 0 , len = fields.length; i < len; i++) {
			 // 对于每个属性，获取属性名
			 String varName = fields[i].getName();
			 try {
			 // 获取原来的访问控制权限
			 boolean accessFlag = fields[i].isAccessible();
			 // 修改访问控制权限
			 fields[i].setAccessible(true);
			 // 获取在对象f中属性fields[i]对应的对象中的变量
			 Object o;
			try {
				o = fields[i].get(obj);
				//判断实体类属性中有空值的用‘/’代替
				if(StringUtil.isEmpty(String.valueOf(o))||o == null){
					Field f = obj.getClass().getDeclaredField(varName);
					f.setAccessible(true);
			        f.set(obj, "/");
				}
	//			System.err.println("传入的对象中包含一个如下的变量：" + varName + " = " + o);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 // 恢复访问控制权限
			 fields[i].setAccessible(accessFlag);
			 } catch (IllegalArgumentException ex) {
			 ex.printStackTrace();
			 } 
		}
	}
	// 创建配置实例
		private final static Configuration configuration = new Configuration(Configuration.getVersion());
		/**
		 *
		 * @param wordText  文档内容
		 * @param templateName 模板名称
		 * @param filePath  生成的路径
		 * @param fileName 生成的文件名
		 */
		public static void create(Map wordText, String templateName, String filePath, String fileName){
			Writer out =null;
			try {
				// 设置编码
				configuration.setDefaultEncoding("UTF-8");
				// ftl模板文件
				configuration.setClassForTemplateLoading(OfficeTools.class, "/templates/common/");
				// 获取模板
				Template template = configuration.getTemplate(templateName);
				// 输出文件
				File outFile = new File(filePath + File.separator + fileName);
				// 如果输出目标文件夹不存在，则创建
				if (!outFile.getParentFile().exists()) {
					outFile.getParentFile().mkdirs();
				}
				// 将模板和数据模型合并生成文件
				out = new BufferedWriter(new OutputStreamWriter(
						new FileOutputStream(outFile), "UTF-8"));
				// 生成文件
				template.process(wordText, out);
			} catch (Exception e) {
				e.printStackTrace();
			}finally {
				// 关闭流
				try {
					if(out!=null)
						out.flush();
				} catch (IOException e) {
					e.printStackTrace();
				}
				try {
					if(out!=null)
						out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
}
