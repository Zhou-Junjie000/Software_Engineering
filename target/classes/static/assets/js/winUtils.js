/**
 * add by speng 2020-03-06
 * 避免框架跨域问题
 */
function topWin(win, i = 1) {
	try{
		
		var host = win.document.location.host;
		var parentHost = win.parent.document.location.host;
		if(host != parentHost){
			return win;
		}
		if (i<=5){
			i++;
			return topWin(win.parent, i);
		}
		
	}catch(err){
		console.log(err);
		return win;
	}
    return win;
};
//是否是禅道嵌套
function isChandao(win){
try{
		var host = win.top.document.location.host;
	}catch(err){
		console.log(err);
		return true;
	}
    return false;
}
