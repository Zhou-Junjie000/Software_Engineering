package com.xlf.common.vo;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

public class GobalCache {

	private final static String USER_HTTPCLIENT_CACHE = "user_httpclient_cache";

	private static Cache userHttpclientCache = CacheManager.getInstance().getCache(USER_HTTPCLIENT_CACHE);

	// 放入cache
	public synchronized static void putHttpClient(String ticket, Object httpClient) {
		Element element = new Element(ticket, httpClient);
		userHttpclientCache.put(element);
	}

	// 获取缓存内容
	@SuppressWarnings("unchecked")
	public synchronized static Object getHttpClient(String ticket) {
		Element element = null;
		try {
			element = userHttpclientCache.get(ticket);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (element == null) {
			return null;
		} else {
			return (Object) element.getObjectValue();
		}
	}

	public synchronized static void removeAll() {
		userHttpclientCache.removeAll();
		userHttpclientCache.clearStatistics();
		userHttpclientCache.flush();
	}

	public synchronized static void removeCache(String ticket) {
		userHttpclientCache.remove(ticket);
	}
}
