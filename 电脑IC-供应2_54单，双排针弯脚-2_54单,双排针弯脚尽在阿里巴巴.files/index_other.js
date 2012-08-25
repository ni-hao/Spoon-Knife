//<![CDATA[
window.onerror=function(){return true;}
function validstr(str) // 验证用户名
{ var s,i,j; s=" +=|'#&<>%*`^/\\\";,."; str1=str.value.toString();
if (str.value.length <1){alert("昵称不能为空！");str.focus(); return false;}
for (i=0; i<str1.length; i++)
{	for(j=0;j<s.length;j++)
{if (str1.charAt(i) == s.charAt(j))
{	alert("名字中不能包含特殊字符: +=|'#&<>%*`^/\\\";,.空格.");
str.focus(); return false;
}}}return true;
}
function OnLogin(n) // 登录聊天室
{
if(!validstr(login.user))return ;
login.submit() ;
}
//右侧内容切换
function show_it(n){
var n;
if(n == 0){
//alert(n);
document.getElementById("right_1").style.display = "";
document.getElementById("right_2").style.display = "";
document.getElementById("right_3").style.display = "";
document.getElementById("right_4").style.display = "";
document.getElementById("right_1b").style.display = "none";
document.getElementById("right_2b").style.display = "none";
document.getElementById("right_3b").style.display = "none";
}else{
//alert(n);
document.getElementById("right_1").style.display = "none";
document.getElementById("right_2").style.display = "none";
document.getElementById("right_3").style.display = "none";
document.getElementById("right_4").style.display = "none";
document.getElementById("right_1b").style.display = "";
document.getElementById("right_2b").style.display = "";
document.getElementById("right_3b").style.display = "";
}
}
function olImg() { //v3.0
var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
var i,j=d.MM_p.length,a=olImg.arguments; for(i=0; i<a.length; i++)
if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function show_div(div_id,obj){
var  t_id = document.getElementById(div_id);
var  t_num = document.getElementById(obj);
if (t_id.style.display == ""){
t_id.style.display = "none";
t_num.style.background = "url('http://img.china.alibaba.com/images/cn/home/070215/left_menu_title_down.gif') no-repeat 5px 0px";
}else{
t_id.style.display = "";
t_num.style.background = "url('http://img.china.alibaba.com/images/cn/home/070215/left_menu_title_up.gif') no-repeat 5px 0px";
}
}
function MM_swapImgRestore() { //v3.0
var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { //v4.01
var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_showHideLayers() { //v6.0
var i,p,v,obj,args=MM_showHideLayers.arguments;
for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
obj.visibility=v; }
}
function MM_swapImage() { //v3.0
var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function slideLine(ul, delay, speed, lh) {
var slideBox = (typeof ul == 'string')?document.getElementById(ul):ul;
//add by alineo
var slideBox2 = (typeof ul == 'string')?document.getElementById(ul):ul;
for(var i=0;i<slideBox2.childNodes.length;i++){
if(slideBox2.childNodes[i].nodeType==1){
if(slideBox2.childNodes[i].tagName == "UL")
slideBox2 = slideBox2.childNodes[i];
break;
}
}
var delay = delay||1000, speed=speed||20, lh = lh||20;
var tid = null, pause = false;
var start = function() {
tid=setInterval(slide, speed);
}
var slide = function() {
if (pause) return;
slideBox.scrollTop += 2;
if (slideBox.scrollTop % lh == 0) {
clearInterval(tid);
slideBox2.appendChild(slideBox2.getElementsByTagName('li')[0]);
slideBox.scrollTop = 0;
setTimeout(start, delay);
}
}
slideBox.onmouseover=function(){pause=true;}
slideBox.onmouseout=function(){pause=false;}
setTimeout(start, delay);
}
function show_menu(obj_s,obj){
var  s_id = document.getElementById(obj_s);
var  sc_id = document.getElementById(obj);
s_id.style.display = "";
sc_id.className = "ahv";
}
function hide_menu(obj_h,obj){
var  h_id = document.getElementById(obj_h);
var  hc_id = document.getElementById(obj);
h_id.style.display = "none";
hc_id.className = "alk";
}
/*首页公告关闭*/
function closeNotice(){
try{
document.getElementById('alinotice').style.display='none';
if(moveBox){
if(document.getElementById('alitalk_chk_show').style.marginTop == "0px"||document.getElementById('alitoolbar_chk_show').style.marginTop == "0px"){
moveBox=null;
moveBox = new MoveBox(document.getElementById('menu_list'));
initMoveBox(moveBox,true)
}else if(document.getElementById('alitalk_chk_show').style.marginTop == "-45px"&&document.getElementById('alitoolbar_chk_show').style.marginTop == "-45px"){
moveBox=null;
moveBox = new MoveBox(document.getElementById('menu_list'));
initMoveBox(moveBox,true);
}
}else{
moveBox = new MoveBox(document.getElementById('menu_list'));
initMoveBox(moveBox,true)
}
}catch(e){
}
}
/*鲜活度,5分钟刷新*/
function clickTime()
{
var thistime = new Date();
var years = thistime.getYear();
var days = thistime.getDay();
var hours = thistime.getHours();
var minutes = thistime.getMinutes();
var seconds = thistime.getSeconds();
var lastDate = new Date(thistime.getYear(), thistime.getMonth(), thistime.getDate(),hours,5*parseInt(minutes/5));
if(hours>17||hours<9){
document.getElementById("mainbody").parentNode.className="row11";
if(hours>=18){
document.getElementById("mainbody").innerHTML = "下次更新时间是明日9:00";
}else{
document.getElementById("mainbody").innerHTML = "下次更新时间是今日9:00";
}
document.getElementById("lastTime").innerHTML="上次更新时间18:00";
}else{
document.getElementById("mainbody").parentNode.className="row1";
minutes = 4 - minutes % 5;
seconds = 59 - seconds;
var smin = lastDate.getMinutes();
if(smin<10)smin="0"+smin;
document.getElementById("lastTime").innerHTML="上次更新时间"+(lastDate.getHours())+":"+smin;
if(minutes == 0 && seconds == 0){
//window.location.reload();
document.getElementById('timeIframe').src='http://page.china.alibaba.com/paimai/searchhomepage.html?iframe_delete=true';
}else{
if(minutes<10)minutes="0"+minutes;
if(seconds<10)seconds="0"+seconds;
thistime = minutes + ":" + seconds;
document.getElementById("mainbody").innerHTML = thistime;
}
}
setTimeout("clickTime()",1000);
}
//]]>
/*表单验证*/
function checkforms(idName) {
var keywords = document.getElementById(idName).value;
if ((keywords == "") || (keywords == "输入关键字") || (keywords == "请输入产品名称！")) {
alert("请输入关键字！");
document.getElementById(idName).focus();
return false;
}
}
/*
* 函数说明：去除头尾空格
* 参数：	字符串
* 返回值：	无
* 时间：2005-5-12
*/
function trim(inputString) {
return inputString.replace(/^ +/,"").replace(/ +$/,"");
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
/*
* 函数说明：取历史记录
* 参数：	sKwId:显示的容器id,nNum:显示搜索记录的个数
* 时间：2007-11-20
*/
function getHistoryWords(sKwId,nNum){
var keys_str = getCookie('h_keys');
if (keys_str != null) {
var keys_array = keys_str.split("#");
if (keys_array.length >= 3) {
var strlen = 0;
var str = "<strong>最近搜索记录：</strong>";
for (var i = 0; i < keys_array.length && i < nNum; i++) {
var key = keys_array[i];
if(key.indexOf("[") != -1 && key.indexOf("]") != -1) {
// 兼容老的cookie格式
key = key.substring(0, key.length - 3);
}
strlen = strlen + key.length;
if (strlen < nNum*6) {
str += " <a target=_blank href=http://search.china.alibaba.com/selloffer/" + encodeURI(key) + ".html class=textwhite onMouseDown=\"return aliclick(this,'?tracelog=ui_homepage_searchbuy');\">" + key + "</a> ";
}
}
document.getElementById(sKwId).innerHTML=str;
}
}
}
/*
* 函数说明：限制页面内容中图片和表格的大小
* 参数：	nNum被限制的表格/图片的最大宽度
* 时间：2007-11-28 yaosl
*/
function ResizeContent(nNum){
var myContent,oldWidth;
var maxWidth=nNum;
var array=new Array(2);
array[0]= "img";
array[1]= "table";
for (n = 0; n < array.length; n++){
var detailImg = document.getElementsByTagName(array[n]);
for (i = 0; i < detailImg.length; i++) {
myContent = detailImg[i];
if (myContent.width > maxWidth) {
oldWidth = myContent.width;
myContent.width = maxWidth;
myContent.height = myContent.height * (maxWidth / oldWidth);
}
}
}
}
//图片滚动列表 mengjia 070927
var Speed_1 = 10; //速度(毫秒)
var Space_1 = 20; //每次移动(px)
var PageWidth_1 = 116 * 3; //翻页宽度
var interval_1 = 7000; //翻页间隔
var fill_1 = 0; //整体移位
var MoveLock_1 = false;
var MoveTimeObj_1;
var MoveWay_1="right";
var Comp_1 = 0;
var AutoPlayObj_1=null;
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function AutoPlay_1(){clearInterval(AutoPlayObj_1);AutoPlayObj_1=setInterval('ISL_GoDown_1();ISL_StopDown_1();',interval_1)}
function ISL_GoUp_1(){if(MoveLock_1)return;clearInterval(AutoPlayObj_1);MoveLock_1=true;MoveWay_1="left";MoveTimeObj_1=setInterval('ISL_ScrUp_1();',Speed_1);}
function ISL_StopUp_1(){if(MoveWay_1 == "right"){return};clearInterval(MoveTimeObj_1);if((GetObj('ISL_Cont_1').scrollLeft-fill_1)%PageWidth_1!=0){Comp_1=fill_1-(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1);CompScr_1()}else{MoveLock_1=false}
AutoPlay_1()}
function ISL_ScrUp_1(){if(GetObj('ISL_Cont_1').scrollLeft<=0){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft+GetObj('List1_1').offsetWidth}
GetObj('ISL_Cont_1').scrollLeft-=Space_1}
function ISL_GoDown_1(){clearInterval(MoveTimeObj_1);if(MoveLock_1)return;clearInterval(AutoPlayObj_1);MoveLock_1=true;MoveWay_1="right";ISL_ScrDown_1();MoveTimeObj_1=setInterval('ISL_ScrDown_1()',Speed_1)}
function ISL_StopDown_1(){if(MoveWay_1 == "left"){return};clearInterval(MoveTimeObj_1);if(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1-(fill_1>=0?fill_1:fill_1+1)!=0){Comp_1=PageWidth_1-GetObj('ISL_Cont_1').scrollLeft%PageWidth_1+fill_1;CompScr_1()}else{MoveLock_1=false}
AutoPlay_1()}
function ISL_ScrDown_1(){if(GetObj('ISL_Cont_1').scrollLeft>=GetObj('List1_1').scrollWidth){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft-GetObj('List1_1').scrollWidth}
GetObj('ISL_Cont_1').scrollLeft+=Space_1}
function CompScr_1(){if(Comp_1==0){MoveLock_1=false;return}
var num,TempSpeed=Speed_1,TempSpace=Space_1;if(Math.abs(Comp_1)<PageWidth_1/2){TempSpace=Math.round(Math.abs(Comp_1/Space_1));if(TempSpace<1){TempSpace=1}}
if(Comp_1<0){if(Comp_1<-TempSpace){Comp_1+=TempSpace;num=TempSpace}else{num=-Comp_1;Comp_1=0}
GetObj('ISL_Cont_1').scrollLeft-=num;setTimeout('CompScr_1()',TempSpeed)}else{if(Comp_1>TempSpace){Comp_1-=TempSpace;num=TempSpace}else{num=Comp_1;Comp_1=0}
GetObj('ISL_Cont_1').scrollLeft+=num;setTimeout('CompScr_1()',TempSpeed)}}
function picrun_ini(){
GetObj("List2_1").innerHTML=GetObj("List1_1").innerHTML;
GetObj('ISL_Cont_1').scrollLeft=fill_1>=0?fill_1:GetObj('List1_1').scrollWidth-Math.abs(fill_1);
GetObj("ISL_Cont_1").onmouseover=function(){clearInterval(AutoPlayObj_1)}
GetObj("ISL_Cont_1").onmouseout=function(){AutoPlay_1()}
AutoPlay_1();
}
//首页显示隐藏层
function ShowDivInfo(id){
var HidDiv = document.getElementById(id);
HidDiv.style.display="block";
}
function HidDivInfo(id){
var HidDiv = document.getElementById(id);
HidDiv.style.display="none";
}
function setHomepage()//设为首页全兼容方法
{
if (document.all)
{
document.body.style.behavior='url(#default#homepage)';
document.body.setHomePage(location.href);
}
else if (window.sidebar)
{
if(window.netscape)
{
try
{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
}
catch (e)
{
alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );
}
}
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
prefs.setCharPref('browser.startup.homepage',location.href);
}
}
//加入收藏
function addFav(){
try{
var title = document.title;
var url = window.location.href;
if (window.sidebar) {
window.sidebar.addPanel(title, url, '');
}else if( window.external ) {
window.external.AddFavorite(url, title);
}
}catch(e){}
try{
aliclick(this,'?tracelog=head_ft_click');
}catch(e){}
}
//用户挽留浮出部门开关
function closeCustomLeave(o){
while(o.parentNode.className != 'customleave'){
o = o.parentNode;
}
o.parentNode.style.display = 'none';
//alert(XDragDropCtrl.followFloat);
//SCROLLTOP += 1;
document.documentElement.scrollTop += 1;
XDragDropCtrl.followFloat(9);
}
