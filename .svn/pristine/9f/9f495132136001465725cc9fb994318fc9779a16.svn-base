package com.xlf.common.util;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public class FileUtil {
	static Logger log = LoggerFactory.getLogger(FileUtil.class);
	public static Boolean zipFiles(File[] srcfile, File zipfile) {
		try {
			ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipfile));
			compress(srcfile,zipfile,out,"");
			out.closeEntry();
			out.close();
			log.info("全部【"+srcfile.length+"】个文件压缩成功");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	private static void compress(File[] srcfile, File zipfile,
			ZipOutputStream out,String folderName) throws Exception{
		byte[] buf = new byte[1024];
		int flag = 0;
		String fileName = "";
		for (int i = 0; i < srcfile.length; i++) {
			flag =(i+1);
			String filePath = srcfile[i].getPath();
			if(srcfile[i].isFile()){//文件直接压缩
				fileName = folderName+"/"+srcfile[i].getName();
				log.info("第"+flag+"文件【"+filePath+"】开始压缩！");
				FileInputStream in = new FileInputStream(srcfile[i]);
				out.putNextEntry(new ZipEntry(fileName));
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				in.close();
				log.info("第"+flag+"文件【"+fileName+"】压缩成功！");
			}
			else{
				folderName = srcfile[i].getName();
				log.info("当前压缩的是文件夹"+folderName+"内的文件");
				File[] listFiles = srcfile[i].listFiles();
				if(listFiles!=null){
					compress(listFiles,zipfile,out,folderName);
				}
			}
		}
	}
	/**
	 * 功能:解压缩
	 *
	 * @param zipfile：需要解压缩的文件
	 * @param descDir：解压后的目标目录
	 */
	@SuppressWarnings({ "resource", "rawtypes" })
	public static void unZipFiles(File zipfile, String descDir) {
		try {
			ZipFile zf = new ZipFile(zipfile);
			for (Enumeration entries = zf.entries(); entries.hasMoreElements();) {
				ZipEntry entry = (ZipEntry) entries.nextElement();
				String zipEntryName = entry.getName();
				InputStream in = zf.getInputStream(entry);
				OutputStream out = new FileOutputStream(descDir + zipEntryName);
				byte[] buf1 = new byte[1024];
				int len;
				while ((len = in.read(buf1)) > 0) {
					out.write(buf1, 0, len);
				}
				in.close();
				out.close();
				System.out.println("解压缩完成.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static Boolean existFile(String path) {
		File file = new File(path);
		if (file.exists()) {
			return true;
		}
		return false;
	}
	
	public static Boolean downFile(HttpServletResponse response,String path,String filename) {
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null; 
		
		try {
			response.reset();
			response.setContentType("application/octet-stream");
			response.setHeader("content-Disposition", "attachement;filename="+new String(filename.getBytes("GBK"), "ISO8859_1"));
		
			 bis = new BufferedInputStream(new FileInputStream(path+"/"+filename));
			
			 bos = new BufferedOutputStream(response.getOutputStream());
			
			byte[] buff = new byte[2048];
			int bytesread = 0;
			while ((bytesread = bis.read(buff))!=-1) {
				bos.write(buff, 0, bytesread);
			}
			bos.flush();
			log.info("文件【"+path+"】下载成功！");
			return true;
		} catch (Exception e) {
			log.info("文件【"+path+"】文件下载失败！"+e.getMessage());
            e.printStackTrace();
		}finally{
			try {
				bis.close();
				bos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return false;
    }

	/**
	 *
	 * @Title: uploadFile
	 * @Description: 上传文件
	 * @param @param 文件
	 * @param @param 文件路径  rootpath\pt号
	 * @return void
	 * @throws
	 */
	public static Boolean uploadFile(MultipartFile mFile, String path) {
		String fileName = mFile.getOriginalFilename();
        try {
        	path = path+"\\"+fileName;
            InputStream in = mFile.getInputStream();
            byte[] buffer = new byte[1024];
            int len = 0;
            File file = new File(path);
            File fileParent = file.getParentFile();
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
            OutputStream out = new FileOutputStream(path);
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.close();
            in.close();
			log.info("文件【"+fileName+"】上传成功！");
            return true;
        } catch (Exception e) {
			log.info("文件【"+fileName+"】文件上传失败！"+e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
	/**
	 *
	 * @Title: uploadFileToZentao
	 * @Description: 文件上传禅道
	 * @param @param mFile
	 * @param @param path
	 * @param @return
	 * @return Boolean
	 * @throws
	 */
	public static Boolean uploadFileToZentao(MultipartFile mFile, String path,String fileName) {
		if (StringUtils.isEmpty(fileName)) {
			fileName = mFile.getOriginalFilename();
		}
        try {
        	path = path+"\\"+fileName;
            InputStream in = mFile.getInputStream();
            byte[] buffer = new byte[1024];
            int len = 0;
            File file = new File(path);
            File fileParent = file.getParentFile();
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
            OutputStream out = new FileOutputStream(path);
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.close();
            in.close();
			log.info("文件【"+fileName+"】上传成功！");
            return true;
        } catch (Exception e) {
			log.info("文件【"+fileName+"】文件上传失败！"+e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

	/**
	 *
	 * @Title: uploadFile
	 * @Description: 上传文件
	 * @param @param 文件
	 * @param @param 文件路径  rootpath\pt号
	 * @return void
	 * @throws
	 */
	public static Boolean uploadFile(File mFile, String path) {
		String fileName = mFile.getName();
        try {
        	path = path+"\\"+fileName;
            InputStream in = new FileInputStream(mFile) ;
            byte[] buffer = new byte[1024];
            int len = 0;
            File file = new File(path);
            File fileParent = file.getParentFile();
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
            OutputStream out = new FileOutputStream(path);
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.close();
            in.close();
			log.info("文件【"+fileName+"】上传成功！");
            return true;
        } catch (Exception e) {
			log.info("文件【"+fileName+"】文件上传失败！"+e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
	/**
	 * 判断文件大小
	 *
	 * @param len
	 *            文件长度
	 * @param size
	 *            限制大小
	 * @param unit
	 *            限制单位（B,K,M,G）
	 * @return
	 */
	public static boolean checkFileSize(Long len, int size, String unit) {
		double fileSize = 0;
		if ("B".equals(unit.toUpperCase())) {
			fileSize = (double) len;
		} else if ("K".equals(unit.toUpperCase())) {
			fileSize = (double) len / 1024;
		} else if ("M".equals(unit.toUpperCase())) {
			fileSize = (double) len / 1048576;
		} else if ("G".equals(unit.toUpperCase())) {
			fileSize = (double) len / 1073741824;
		}
		if (fileSize > size) {
			return false;
		}
		return true;
	}


	/**
	 * 删除文件
	 * @param path 文件路径
	 * @param name 文件名称
	 * @return
	 */
	public static boolean deleteFile(String path,String name ) {
		boolean s = false;
        File file = new File(path+"\\"+name);
        File dirFile = new File(path);
        if (file.exists()) {
        	 s = file.delete();
             File[] files = dirFile.listFiles();
             if(files.length==0){//文件夹没有文件后删除文件夹
            	 dirFile.delete();
             }
        }else{
        	s = true;
        }
        return s;
    }
	
	public static String getFileContent(String viewName,String params){
		StringBuffer tsmVW = new StringBuffer();
		try {
			tsmVW.append(IOUtils.toString(new ClassPathResource("/static/modules/planTrack/sql/"+viewName +".txt").getInputStream(),"utf-8"));
		} catch (Exception e) {
			return "";
		}
		return tsmVW.toString().replace("${params}",params);
	}
	
}
