package com.xlf.common.vo;


import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

/**
 * 
 * 前后端交互数据标准
 */
@Data
@Builder
public class ResultVo implements Serializable{

    private static final long serialVersionUID = 1L;
    
    /**
     * 返回代码
     */
    private Integer code;
    
    /**
     * 失败消息
     */
    private String message;

    /**
     * 时间戳
     */
    private long timestamp = System.currentTimeMillis();

    /**
     * 结果对象
     */
    private Object data;
}
