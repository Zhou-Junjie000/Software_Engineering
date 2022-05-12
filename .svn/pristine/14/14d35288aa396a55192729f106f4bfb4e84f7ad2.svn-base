/**
 * 
 */
package com.xlf.common.util;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**
 * @Description:
 * @author: songpeng 
 * @date: date{time} （日期） 
*/
public class DesUtils {
	 /** 默认密钥 */
    public static String strDefaultKey = "DES";

    /** 加密工具 */
    private Cipher encryptCipher;

    /** 解密工具 */
    private Cipher decryptCipher;

    /**
     * 加密字符串
     * @param strIn 需加密的字符串
     * @return 加密后的字符串
     * @throws Exception
     */
    public String encrypt(String strIn) throws Exception {
        return byteArr2HexStr(encryptCipher.doFinal(strIn.getBytes()));
    }

    /**
     * 解密字符串
     * @param strIn 需解密的字符串
     * @return 解密后的字符串
     * @throws Exception
     */
    public String decrypt(String strIn) throws Exception {
        return new String(decryptCipher.doFinal(hexStr2ByteArr(strIn)));
    }

    /**
     * 将 byte 数组转换为表示 16 进制值的字符串， 如： byte[]{8,18} 转换为： 0813 ， 和 public static
     * byte[] hexStr2ByteArr(String strIn) 互为可逆的转换过程
     * @param arrB 需要转换的 byte 数组
     * @return 转换后的字符串
     * @throws Exception 本方法不处理任何异常，所有异常全部抛出
     */
    public static String byteArr2HexStr(byte[] arrB) throws Exception {
        int iLen = arrB.length;
        // 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍
        StringBuffer sb = new StringBuffer(iLen * 2);
        for(int i = 0; i < iLen; i++) {
            int intTmp = arrB[i];
            // 把负数转换为正数
            while(intTmp < 0) {
                intTmp = intTmp + 256;
            }
            // 小于0F的数需要在前面补0
            if(intTmp < 16) {
                sb.append("0");
            }
            sb.append(Integer.toString(intTmp, 16));
        }
        return sb.toString();
    }

    /**
     * 将 表 示 16 进 制 值 的 字 符 串 转 换 为 byte 数 组 ， 和 public static String
     * byteArr2HexStr(byte[] arrB) 互为可逆的转换过程
     * @param strIn 需要转换的字符串
     * @return 转换后的 byte 数组
     * @throws Exception 本方法不处理任何异常，所有异常全部抛出
     * @author <a href="mailto:leo841001@163.com">LiGuoQing</a>
     */
    public static byte[] hexStr2ByteArr(String strIn) throws Exception {
        byte[] arrB = strIn.getBytes();
        int iLen = arrB.length;
        // 两个字符表示一个字节，所以字节数组长度是字符串长度除以2
        byte[] arrOut = new byte[iLen / 2];
        for(int i = 0; i < iLen; i = i + 2) {
            String strTmp = new String(arrB, i, 2);
            arrOut[i / 2] = (byte)Integer.parseInt(strTmp, 16);
        }
        return arrOut;
    }

    /**
     * 从指定字符串生成密钥，密钥所需的字节数组长度为 8 位 不足 8 位时后面补 0 ， 超出 8 位只取前 8 位
     * @param arrBTmp 构成该字符串的字节数组
     * @return 生成的密钥
     * @throws java.lang.Exception
     */
    private static Key getKey(byte[] arrBTmp) throws Exception {
        // 创建一个空的8位字节数组（默认值为0）
        byte[] arrB = new byte[8];
        // 将原始字节数组转换为8位
        for(int i = 0; i < arrBTmp.length && i < arrB.length; i++) {
            arrB[i] = arrBTmp[i];
        }
        // 生成密钥
        Key key = new SecretKeySpec(arrB, "DES");
        return key;
    }

    public static String encrypt(String strIn, String secretkey) throws Exception {
        Key key = getKey(secretkey.getBytes("utf-8"));
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return byteArr2HexStr(cipher.doFinal(strIn.getBytes("utf-8")));
    }

    public static String decrypt(String strIn, String secretkey) throws Exception {
        Key key = getKey(secretkey.getBytes("utf-8"));
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] param = cipher.doFinal(hexStr2ByteArr(strIn));
        return new String(param, "utf-8");
    }
    
    public static void main(String[] args) throws Exception {
		System.out.println(encrypt("admin","DES_2020-03-04"));
	}
}
