/**
*	数字校验方法
*/
function isNumber(obj){
	var reg = /^[0-9]*$/;
	if(!reg.test(obj)){
		return false;
	}
	return true;
}
/**
*	非负数校验方法(0,正浮点数)
*/
function isNonNegativeNumber(obj){
	var reg = /^\d+(\.\d+)?$/;
	if(!reg.test(obj)){
		return false;
	}
	return true;
}
/**
*	正浮点数校验方法
*/
function isPositiveNumber(obj){
	var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	if(!reg.test(obj)){
		return false;
	}
	return true;
}
/**
*	正整数校验方法
*/
function isPositiveInteger(obj){
	var reg = /^\+?[1-9][0-9]*$/;
	if(!reg.test(obj)){
		return false;
	}
	return true;
}
/**
*	给数字加千位分隔符
*/
function numFormat(num){
	var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
		return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
			return $1+",";
	    });
	});
	return res;
}