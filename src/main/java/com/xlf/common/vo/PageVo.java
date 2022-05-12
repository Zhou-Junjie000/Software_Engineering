package com.xlf.common.vo;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

/**
 * 
 */
@Data
public class PageVo implements Serializable{

    private static final long serialVersionUID = 1L;

    private int pageNum;

    private int pageSize;

    private String sort;

    private String order;

    private String search;
    
    private long total;
    
    private List<?> rows; 
    
}
