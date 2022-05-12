package com.xlf.modules.sys.util;

import java.security.MessageDigest;

import cn.hutool.core.lang.UUID;

public class TokenGenerator {

	 private static final char[] HEX_CODE = "0123456789abcdef".toCharArray();

	    public TokenGenerator() {
	    }

	    public static String generateValue() {
	        return generateValue(UUID.randomUUID().toString());
	    }

	    public static String toHexString(byte[] data) {
	        if (data == null) {
	            return null;
	        } else {
	            StringBuilder r = new StringBuilder(data.length * 2);
	            byte[] var2 = data;
	            int var3 = data.length;

	            for(int var4 = 0; var4 < var3; ++var4) {
	                byte b = var2[var4];
	                r.append(HEX_CODE[b >> 4 & 15]);
	                r.append(HEX_CODE[b & 15]);
	            }

	            return r.toString();
	        }
	    }

	    public static String generateValue(String param) {
	        try {
	            MessageDigest algorithm = MessageDigest.getInstance("MD5");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	            algorithm.reset();
	            algorithm.update(param.getBytes());
	            byte[] messageDigest = algorithm.digest();
	            return toHexString(messageDigest);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return "";
	    }
}
