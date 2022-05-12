package com.xlf.config.beetl.func;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xlf.modules.sys.entity.DictData;
import com.xlf.modules.sys.service.DictDataService;

@Component
public class DictUtil {

	@Autowired
	private DictDataService dictDataService;
	
	/**
	 * 查询字段所有键值对
	 */
	public List<DictData> listByType(String type){
		
		return dictDataService.listByType(type);
	}
	
	/**
	 * 查询实体字典库
	 */
	public List<DictData> listByEntity(String tag){

		return dictDataService.listByEntity(tag);
	}
	
	/**
	 * 查询实体字典库 name取code字段
	 */
	public List<DictData> listByEntityCode(String tag){

		return dictDataService.listByEntityCode(tag);
	}
	
	/**
	 * 根据sql查询
	 */
	public List<DictData> listBySql(String sql){
		
		return dictDataService.listBySql(sql);
	}

    /**
     * 获取指定字典
     */
    public DictData get(Long id) {
        return dictDataService.get(id);
    }
    
    public String getEntityFieldById(String tag, Long id, String filed){
    	return dictDataService.getEntityFieldById(tag, id, filed);
    }
}