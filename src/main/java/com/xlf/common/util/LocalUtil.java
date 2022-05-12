package com.xlf.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;

/**
 * 
 */
@Component
public class LocalUtil {

	/**
	 * 生成上传凭证，然后准备上传
	 */
	@Value("${web.file-upload.local.path}")
	private String webUploadPath;
	
	/**
	 * 生成上传凭证，然后准备上传
	 */
	@Value("${web.file-upload.local.prefix}")
	private String webUploadPrefix;

	/**
	 * 文件流上传
	 * 
	 * @param file
	 * @param key
	 *            文件名
	 * @return
	 */
	public String upload(FileInputStream fileInputStream, String key) {

		String filename = File.separator + webUploadPrefix + DateUtil.format(new Date(), "/yyyy/MMdd/") + key;
		String filePath = webUploadPath + filename;
		File file = new File(filePath);
		checkDirAndCreate(file);
		FileUtil.writeFromStream(fileInputStream, file);
		return filename;
	}

	protected void checkDirAndCreate(File file) {
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
	}
	
	public void delete(String path){
		File file = new File(webUploadPath+path);
		if(file.exists()){
			file.delete();
		}
	}
	
	public String copyFile(String filePath,String fileName){
		String newFileName = "";
		if( StrUtil.isNotBlank(filePath) ){
			File file = new File(webUploadPath+filePath);
			if( file.exists() ){
				String extName = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
				fileName = UUID.randomUUID().toString().replace("-", "") + extName;
				newFileName = File.separator + webUploadPrefix + DateUtil.format(new Date(), "/yyyy/MMdd/") + fileName;
				File newFile = new File( webUploadPath + newFileName );
				
				FileUtil.copy(file, newFile, false);
			}
		}
		return newFileName;
	}
}