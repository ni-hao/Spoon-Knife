function aliclick(u, param) {
d = new Date();
if(document.images) {
var img_aliclick = new Image();
img_aliclick.src="http://stat.china.alibaba.com/tracelog/click.html" + param + "&time=" + d.getTime();
}
return true;
}
function etcclick(u, param) {
d = new Date();
if(document.images) {
var img_etc_aliclick = new Image();
img_etc_aliclick.src="http://stat.china.alibaba.com/etclistquery.html" + param + "&time=" + d.getTime();
}
return true;
}
function aliclickType(u, param){
var urlTxt = window.location.href;
if(urlTxt){
var urlType = urlTxt.substring(urlTxt.lastIndexOf('/')+1,urlTxt.lastIndexOf('.'));
}
aliclick(u, param+'_'+urlType);
}
