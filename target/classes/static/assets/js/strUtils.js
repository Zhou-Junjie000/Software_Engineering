String.prototype.endWith=function(endStr) {
	var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d);
};
