package com.xlf.modules.sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xlf.common.base.IEntityController;
import com.xlf.common.base.IEntityService;
import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.ResultVo;
import com.xlf.modules.sys.entity.DictData;
import com.xlf.modules.sys.service.DictDataService;

@Controller
@RequestMapping("/dict")
public class DictController implements IEntityController<DictData, Long>{

	@Autowired
	private DictDataService dictDataService;

	@Override
	public IEntityService<DictData, Long> getEntityService() {
		return dictDataService;
	}
	
	
	@RequestMapping("/listByType")
    @ResponseBody
	public ResultVo listByType(String type) {
		
		return ResultUtil.success(dictDataService.listByType(type));
	}
	
	@RequestMapping("/listByEntity")
    @ResponseBody
	public ResultVo listByEntity(String tag) {
		
		return ResultUtil.success(dictDataService.listByEntity(tag));
	}
}
