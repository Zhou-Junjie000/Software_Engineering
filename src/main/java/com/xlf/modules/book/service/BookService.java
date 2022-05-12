package com.xlf.modules.book.service;

import com.xlf.common.base.mybatis.MybatisEntityService;
import com.xlf.common.vo.PageVo;
import com.xlf.modules.book.entity.Book;

public interface BookService extends MybatisEntityService<Book, Integer>{

	PageVo page2(PageVo pageVo, Book entity);
<<<<<<< HEAD
=======
	PageVo page5(PageVo pageVo, Book entity);
>>>>>>> e1a8a41 (sprint4)
	
	PageVo page3(PageVo pageVo, Book entity);
	
	int getNumByUser(Book entity);
	
	int getNumByArea(Book entity);
}
