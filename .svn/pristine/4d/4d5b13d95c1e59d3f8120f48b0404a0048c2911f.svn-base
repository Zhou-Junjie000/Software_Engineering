/**
 * @Title: JsonUtil.java
 * @Package com.dream.entity.config.beetl.funcpkg
 * @Description: TODO(用一句话描述该文件做什么)
 * @author mingshenyue
 * @date 2019年8月27日 上午10:07:15
 * @version V1.0
 */
package com.xlf.config.beetl.func;

import java.util.List;

import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

/**
 * @ClassName: JsonUtil
 * @Description: 对象转为json
 * @author mingshenyue
 * @date 2019年8月27日 上午10:07:15
 *
 */
@Component
public class JsonUtil {

	public Object parseArray(List data){
		
		return JSON.toJSON(data);
	}
	
	public JSONArray parseArray(String data){
		JSONArray jSONArray =JSON.parseArray(data);
		return JSON.parseArray(data);
	}
	
	public Object parseObject(String data){
		
		return JSON.parseObject(data);
	}
}
