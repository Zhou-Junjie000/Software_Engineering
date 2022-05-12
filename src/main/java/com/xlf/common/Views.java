package com.xlf.common;

public interface Views {

	/**
	 * login
	 */
	String LOGIN = "login";

	/**
	 * index
	 */
	String INDEX = "index";

	/**
	 * HOME
	 */
	String HOME = "home";

	
	interface Base {
		String USER_LIST = "modules/user/list";
		String USER_ADD = "modules/user/add";
		
		String USER_MANAGER_LIST = "modules/userManager/list";
		String USER_MANAGER_ADD = "modules/userManager/add";
		String USER_MANAGER_PASSWORD = "modules/userManager/password";
		
		String CARD_LIST = "modules/card/list";
		String CARD_ADD = "modules/card/add";
		
		String COACH_LIST = "modules/coach/list";
		String COACH_ADD = "modules/coach/add";
		
		String COURSE_LIST = "modules/course/list";
		String COURSE_ADD = "modules/course/add";
		
		String MATERIAL_LIST = "modules/material/list";
		String MATERIAL_ADD = "modules/material/add";
		
		String BOOK_LIST = "modules/book/list";
		String BOOK_ADD = "modules/book/add";
		
		String FEE_LIST = "modules/fee/list";
		String FEE_LIST2 = "modules/fee/list2";
		
	}
}
