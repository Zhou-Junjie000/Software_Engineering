/**
 * @Title: FieldConfigCache.java
 * @Package com.xlf.common.component
 * @Description: TODO(用一句话描述该文件做什么)
 * @author mingshenyue
 * @date 2020年4月28日 下午5:55:52
 * @version V1.0
 */
package com.xlf.common.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @ClassName: FieldConfigCache
 * @Description: 考核日志新增所需实体配置
 * @author mingshenyue
 * @date 2020年4月28日 下午5:55:52
 *
 */

public class FieldConfigCache {
	
	private FieldConfigCache(){
	}
	
	private static Map<String,Map<String, Object>> caches = new ConcurrentHashMap<String,Map<String, Object>>();
	
	public static void put(String key, Map<String, Object> obj) {
		caches.put(key, obj);
	}
	
	public static Map<String, Object> get(String key) {
		return caches.get(key);
	}
	
	public static void remove(String key) {
		caches.remove(key);
	}
}
