/*author:aliue-wd ym*/
var searchActivedItem=1;
var searchFormObj = null;
var tracelogInput = null;
var searchinputbox = null;
function getElementsByClassName(className, parentElement) {
var children = (document.getElementById(parentElement) || document.body).getElementsByTagName('*');
var elements = [], child;
for (var i = 0, length = children.length; i < length; i++) {
child = children[i];
if (hasClassName(child, className))
elements.push(child);
}
return elements;
}
function hasClassName(element, className) {
var elementClassName = element.className;
if (elementClassName.length == 0) return false;
if (elementClassName == className ||
elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
return true;
return false;
}
/*
* 函数说明：取cookie值
* 参数：	cookie字段名
* 返回值：	cookie值
* 时间：2005-5-12
*/
function getCookie(sName) {
var aCookie = document.cookie.split("; ");
for (var i=0; i < aCookie.length; i++)
{
var aCrumb = aCookie[i].split("=");
if (sName == aCrumb[0])
return unescape(aCrumb[1]);
}
return null;
}
var keys_str = getCookie('h_keys');
function searchInit(num,sdiv,historyky){
var srcbox = document.getElementById(sdiv);
try{
var srcObj = srcbox.getElementsByTagName("li")[num-1];
}catch(e){}
var searchID = num;
var tabList = srcObj.parentNode.getElementsByTagName("li");
if(srcObj.className.indexOf("activedtab")!=-1)return;
for(var i=0;i<tabList.length;i++){
if(tabList[i].className.indexOf("activedtab")!=-1){
tabList[i].className="ntab"+(tabList[i].className).replace("activedtab","");
}
}
srcObj.className = "activedtab"+(srcObj.className).replace("otab","").replace("ntab","");//TAB切换
}
function checkform(frmObj){
var v = trim(frmObj.keywords.value);
if(v.length > 100){
alert("您输入的关键字过长！");
return false;
}
if(v == ""  || v.substring(0,3) =="请输入") {
alert("请输入关键字！");
return false;
}
}
function trim(inputString) {
return inputString.replace(/^ +/,"").replace(/ +$/,"");
}
function overtab(srcObj){
if(srcObj.className.indexOf("activedtab")!=-1)return;
else
srcObj.className = "otab"+(srcObj.className).replace("ntab","");
}
function outtab(srcObj){
if(srcObj.className.indexOf("activedtab")!=-1)return;
else
srcObj.className = "ntab"+(srcObj.className).replace("otab","");
}
function focusit(inputobj){
if(inputobj.value.indexOf('请输入')!=-1)inputobj.value='';
inputobj.style.color="#666666";
}
function blurit(inputobj){
if(trim(inputobj.value)=="")inputobj.value=inputobj.title;
inputobj.style.color="#666666";
}
function goSearch(sAction,sTracelog,obj){
try{
var searchformobj = obj.parentNode.parentNode.parentNode.getElementsByTagName("form")[0];
var v = searchformobj.keywords.value;
if(trim(v) == "" || v.substring(0,3) =="请输入"){
return true;//默认连接
}else{
searchformobj.action=sAction;//action
searchformobj.tracelog.value=sTracelog;//tracelog
searchformobj.submit();
return false;
}
}catch(e){
}
}
