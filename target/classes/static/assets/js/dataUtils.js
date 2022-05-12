Date.prototype.pattern=function(fmt) {           
    var o = {           
    "M+" : this.getMonth()+1, //月份           
    "d+" : this.getDate(), //日           
    "h+" : this.getHours(), //小时           
    "H+" : this.getHours(), //小时           
    "m+" : this.getMinutes(), //分           
    "s+" : this.getSeconds(), //秒           
    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
    "S" : this.getMilliseconds() //毫秒           
    };           
    var week = {           
    "0" : "/u65e5",           
    "1" : "/u4e00",           
    "2" : "/u4e8c",           
    "3" : "/u4e09",           
    "4" : "/u56db",           
    "5" : "/u4e94",           
    "6" : "/u516d"          
    };           
    if(/(y+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o){           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;           
} ;

//获取当前日期 YYYY-MM-DD
function getToday(){
	var date = new Date();
	return date.pattern("yyyy-MM-dd");
}
//获取昨天日期
function getYesterday(){
	var date = new Date(new Date().getTime() - 24*60*60*1000);
	return date.pattern("yyyy-MM-dd");
}

//获取前天日期
function getBeforeDay(){
	var date = new Date(new Date().getTime() - 24*60*60*1000*2);
	return date.pattern("yyyy-MM-dd");
}
//获取某天N天后日期
function addDays(curDate,day){
	var date = new Date(new Date(curDate).getTime() + 24*60*60*1000*day);
	return date.pattern("yyyy-MM-dd");
}
//计算2个日期之间的天数
function betweenDays(start,end){
	var second = (new Date(end).getTime()-new Date(start).getTime())/1000;
	var day = second/(24*60*60);
	return day;
}

//获取某天添加N小时
function addHours(curDate,hour){
	var date = new Date(new Date(curDate).getTime() + hour*60*60*1000);
	return date.pattern("yyyy-MM-dd HH:mm");
}
//获取2个日期之间的小时
function getHoursByDays(start,end){
	var second = (new Date(end).getTime()-new Date(start).getTime())/1000;
	var hours = second/(60*60);
	return hours;
}

//日期格式化    yyyy-mm-dd
function formatDate(date){
	//年
	var y = date.getFullYear();
	//月
	var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	//日
	var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	
	return y+'-'+m+'-'+d;
}

//获取两日期之间日期列表函数
function getdiffdate(stime,etime){
    //初始化日期列表，数组
    var diffdate = new Array();
    var i=0;
    //开始日期小于等于结束日期,并循环
    while(stime<=etime){
        diffdate[i] = stime;
        
        //获取开始日期时间戳
        var stime_ts = new Date(stime).getTime();
        
        //增加一天时间戳后的日期
        var next_date = stime_ts + (24*60*60*1000);
        
        //拼接年月日，这里的月份会返回（0-11），所以要+1
        var next_dates_y = new Date(next_date).getFullYear()+'-';
        var next_dates_m = (new Date(next_date).getMonth()+1 < 10)?'0'+(new Date(next_date).getMonth()+1)+'-':(new Date(next_date).getMonth()+1)+'-';
        var next_dates_d = (new Date(next_date).getDate() < 10)?'0'+new Date(next_date).getDate():new Date(next_date).getDate();
 
        stime = next_dates_y+next_dates_m+next_dates_d;
        
        //增加数组key
        i++;
    }
    return {
    	"diffdate": diffdate,
    	"dayLength": diffdate.length
    }
}