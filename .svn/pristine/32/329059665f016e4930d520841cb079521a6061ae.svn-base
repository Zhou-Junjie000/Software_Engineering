package com.xlf.common.base;

import com.xlf.common.util.ResultUtil;
import com.xlf.common.vo.PageVo;
import com.xlf.common.vo.ResultVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.Serializable;
/**
 * 通用实体增删改查控制层
 **/
@FunctionalInterface
public interface IEntityController<T, ID extends Serializable> {

    final Logger log = LoggerFactory.getLogger(IEntityController.class);

    /**
     * 通用实体接口
     * @return IEntityService<T, ID>
     */
    IEntityService<T, ID> getEntityService();

    /**
     * 根据Id查询单个实体
     * @param id
     * @return ResultVo
     */
    @GetMapping("/get")
    @ResponseBody
    default public ResultVo get(ID id){

        T t = getEntityService().get(id);

        return ResultUtil.success(t);
    }

    /**
     * 实体列表分页查询
     * @param pageVo pageVo Object
     * @param t Entity Object
     * @return ResultVo
     */
    // @GetMapping("/page")
    @RequestMapping("/page")
    @ResponseBody
    default public ResultVo page(PageVo pageVo, T t){

        PageVo vo = getEntityService().page(pageVo, t);

        return ResultUtil.success(vo);
    }

    /**
     *  保存实体
     * @param t
     * @return ResultVo
     */
    @PostMapping("/add")
    @ResponseBody
    default public ResultVo save(T t){

        getEntityService().save(t);

        return ResultUtil.success(t);
    }

    /**
     * 更新实体
     * @param t Entity Object
     * @return ResultVo
     */
    @PostMapping("/mod")
    @ResponseBody
    default public ResultVo update(T t){

        getEntityService().update(t);

        return ResultUtil.success();
    }

    /**
     * 根据实体Id删除实体
     * @param ids id Array
     * @return ResultVo
     */
    @PostMapping("/del")
    @ResponseBody
    default public ResultVo delete(ID[] ids){

        getEntityService().batchDelete(ids);

        return ResultUtil.success();
    }
}
