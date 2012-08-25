/**
* @fileoverview 阿里旺旺(贸易通版)WEB前端应用.
* 2007.6.13
* @author:aliued-wd zhujunbiao
* @version 0.1
*/
$ = function(el){
return document.getElementById(el);
}
/**
* 扩展数组方法add
* @param {Object} obj
*/
Array.prototype.add = function(obj){
var add_flag = true;
for(var i=0;i<this.length;i++){
if(this[i]==obj){
add_flag = false;
break;
}
}
if(add_flag==true){
this[this.length] = obj;
}
}
if (typeof AliEvent == "undefined") {
var AliEvent = {};
}
(function(){
AliEvent = {
/**
* 事件监听方法.
* @param {Object} el 被监听的对象.
* @param {Object} eventType 事件监听类型.
* @param {Object} fn 事件触发函数.
*/
addListener: function(el,eventType,fn){
if(el.addEventListener){
el.addEventListener(eventType,fn,false);
}else if(el.attachEvent){
el.attachEvent("on" + eventType,fn);
}else{
el["on"+eventType] = fn;
}
}
};
})();
/**
* 参数封装对象.
* @param online 在线类型.
* @param size 图片尺寸.
* @param uid 用户id.
* @param imgObj 图片对象.
* @param eventObj 事件对象.
* @param docObj 文案对象.
* @param onlineDoc 在线文案.
* @param offlineDoc 不在线文案.
* @param telonlineDoc 手机在线文案.
* @param onlineAlt 在线提示文案.
* @param offlineAlt 在线提示文案.
* @param telonlineAlt 手机在线提示文案.
* @param siteid 网站前缀.
* @param isencrypt 是否加密.
*/
function Alitalkparam(){
this.online = 0;
this.size = 16;
this.uid = null;
this.imgObj = null;
this.eventObjs = new Array();
this.docObj = null;
this.onlineDoc = "我正在网上,马上和我洽谈!";
this.offlineDoc = "我现在不在网上,给我留个消息吧!";
this.telonlineDoc = "我手机在线,马上和我洽谈!";
this.notInstalledDoc = "未安装贸易通";
this.onlineAlt = "我正在网上,马上和我洽谈!";
this.offlineAlt = "我现在不在网上,给我留个消息吧!";
this.telonlineAlt = "我手机在线,马上和我洽谈!";
this.notInstalledAlt = "未安装贸易通";
this.moreProperties = "";
this.siteid = "cnalichn";
this.isencrypt = false;
this.verify = 0;//加为好友的时候是否需要验证
this.gid = 0;//好友分组ID
this.fromUid = '';//本身旺旺ID
}
var OnLine = 0;
var online = new Array();
var alitalkVersion = 5;
if (typeof Alitalk == "undefined") {
var Alitalk = {};
}
/**
* 阿里旺旺(贸易通版)WEB前端应用控制静态类.
*/
(function(){
Alitalk = {
/**
* 数组对象转化成字符串，用;隔开，用于判断多个用户的贸易通状态.
* @param {Object} arr
*/
arrToString:function(arr){
var tempStr="";
var encryptFlag = false;
for(var i=0;i<arr.length;i++){
if(arr[i].isencrypt==true){
encryptFlag = true;
}
tempStr = tempStr+arr[i].uid+";"
}
if(tempStr.length>0){
tempStr = tempStr.substring(0,tempStr.length-1);
}
if(encryptFlag==true){
tempStr = tempStr +"&encrypt=1";
}
return tempStr;
},
/**
* 初始化单个贸易通状态.
* @param {Object} param 参数封装对象.
*/
initSingleStat:function(param){
if(param.uid!=null){
if(param.isencrypt){
document.write("<script src='http://amos.im.alisoft.com/userstatus3.aw?uid="+param.uid+"&encrypt=1&site=cnalichn'><"+"/"+"script>");
}else{
document.write("<script src='http://amos.im.alisoft.com/userstatus3.aw?uid="+param.uid+"&site=cnalichn'><"+"/"+"script>");
}
}
},
/**
* 初始化多个贸易通状态.
* @param {Object} arr
*/
initMultStat:function(arr){
document.write("<script src='http://amos.im.alisoft.com/muliuserstatus.aw?uids="+this.arrToString(arr)+"&site=cnalichn'><"+"/"+"script>");
},
/**
* 获得表示Alitalk在线状态的图片URL
* @param {Object} parm 参数封装对象.
*/
getAlitalkImgSrc:function(parm){
if(parm.online==0||parm.online==2||parm.online==6){
if(parm.size==16){
return "http://img.china.alibaba.com/others/images/myt_offline.gif";
}else if(parm.size==24){
return "http://img.china.alibaba.com/images/cn/market/trade/list/070423/list_ww_off.gif";
}else if(parm.size==32){
return "http://img.china.alibaba.com/images/buyer/list/list_mytlogo_offline.gif";
}else{
return "http://img.china.alibaba.com/others/images/myt_offline.gif";
}
}else if(parm.online==1){
if(parm.size==16){
return "http://img.china.alibaba.com/others/images/myt_online.gif";
}else if(parm.size==24){
return "http://img.china.alibaba.com/images/cn/market/trade/list/070423/list_ww_on.gif";
}else if(parm.size==32){
return "http://img.china.alibaba.com/images/buyer/list/list_mytlogo_online.gif";
}else{
return "http://img.china.alibaba.com/others/images/myt_online.gif";
}
}else if(parm.online==4||parm.online==5){
if(parm.size==16){
return "http://img.china.alibaba.com/others/images/myt_online_mobile.gif";
}else if(parm.size==26){
return "http://img.china.alibaba.com/images/buyer/list/myt_26_sms.gif";
}else if(parm.size==24){
return "http://img.china.alibaba.com/images/cn/market/trade/list/070423/list_ww_phone.gif";
}else if(parm.size==32){
return "http://img.china.alibaba.com/images/buyer/list/myt_32_sms.gif";
}else{
return "http://img.china.alibaba.com/others/images/myt_online_mobile.gif";
}
}else{
return "http://img.china.alibaba.com/others/images/myt_offline.gif";
}
},
/**
* 获得当前状态下的提示文案.
* @param {Object} parm 参数封装对象.
*/
getAlt:function(parm){
if(parm.online==0||parm.online==2||parm.online==6){
return parm.offlineAlt;
}else if(parm.online==1){
return parm.onlineAlt;
}else if(parm.online==4||parm.online==5){
return parm.telonlineAlt;
}else{
return "";
}
},
/**
* 获得当前状态下的显示文案.
* @param {Object} parm 参数封装对象.
*/
getDoc:function(parm){
if(parm.online==0||parm.online==2||parm.online==6){
return parm.offlineDoc;
}else if(parm.online==1){
return parm.onlineDoc;
}else if(parm.online==4||parm.online==5){
return parm.telonlineDoc;
}else{
return "";
}
},
/**
* 设置贸易通显示图片对象.
* @param {Object} parm 参数封装对象.
*/
setImgSrc:function(parm){
if(parm.imgObj!=null){
parm.imgObj.src=this.getAlitalkImgSrc(parm);
parm.imgObj.alt=this.getAlt(parm);
}
},
/**
* 设置贸易通显示文案.
* @param {Object} parm 参数封装对象.
*/
setDoc:function(parm){
if(parm.docObj!=null){
parm.docObj.innerHTML=this.getDoc(parm);
}
},
/**
* 设置事件对象.
* @param {Object} parm 参数封装对象.
*/
setEvent:function(parm){
for(var i=0;i<parm.eventObjs.length;i++){
if(!parm.isencrypt){
AliEvent.addListener(parm.eventObjs[i],'click',function(){Alitalk.openAliwangwang(parm)});
}
}
},
setImg:function(parm){
this.setImgSrc(parm);
},
/**
* 设置贸易通相关参数.
* @param {Object} parm 参数封装对象.
*/
setAlitalk:function(parm){
this.setDoc(parm);
this.setEvent(parm);
this.setImg(parm);
},
/**
* 监控单个贸易通状态对象.
* @param {Object} parm 参数封装对象.
*/
addListener:function(parm){
parm.online = OnLine;
this.setAlitalk(parm);
},
/**
* 监控多个贸易通状态对象.
* @param {Object} parmArr 参数封装对象.
*/
addListenerMult:function(parmArr){
for(var i=0;i<online.length;i++){
if(parmArr[i]){
parmArr[i].online = online[i];
this.setAlitalk(parmArr[i]);
}
}
},
/**
* 打阿里旺旺聊天窗口.
* @param {Object} parm 参数封装对象.
*/
openAliwangwang:function(parm){
if(parm.siteid=="cnalichn"){
this.openAlitalk(parm);
}else{
this.openWangwang(parm);
}
},
/**
* 判断是否已经安装贸易通.
*/
isInstallAltalk:function(){
var obj5,obj6;
try{
obj5 = new ActiveXObject("Ali_Check.InfoCheck");
}catch(e){
obj5 = null;
}
if(obj5!=null){
alitalkVersion = 5;
return true;
}
try{
obj6 = new ActiveXObject("aliimx.wangwangx");
}catch(e){
obj6 = null;
}
if (obj6 != null) {
alitalkVersion = 6;
return true;
}
if(null!=obj5||null!=obj6){
return true;
}else{
return false;
}
},
/**
* 判断是否已经安装淘宝旺旺.
*/
isInstallWangwang:function(){
var obj5,obj6;
try{
obj5 = new ActiveXObject("angWangX.WangWangObj");
}catch(e){
obj5 = null;
}
if (obj5 != null) {
alitalkVersion = 5;
return true;
}
try{
obj6 = new ActiveXObject("aliimx.wangwangx");
}catch(e){
obj6 = null;
}
if (obj6 != null) {
alitalkVersion = 6;
return true;
}
return false;
},
/**
* 打贸易通聊天窗口.
* @param {Object} parm
*/
openAlitalk:function(parm){
if(this.isInstallAltalk()){
if(parm.online==4){
if(alitalkVersion==5){
window.location = "Alitalk:SendSms?"+parm.uid+"&siteid=cnalichn&status="+parm.online+parm.moreProperties;
}else{
window.location = "aliim:smssendmsg?touid=cnalichn"+parm.uid+parm.moreProperties;
}
}else{
if(alitalkVersion==5){
window.location = "Alitalk:SendIM?"+parm.uid+"&siteid=cnalichn&status="+parm.online+parm.moreProperties;
}else{
window.location = "aliim:sendmsg?touid=cnalichn"+parm.uid+"&siteid=cnalichn&status="+parm.online+parm.moreProperties;
}
}
}else{
this.downloadAlitalk();
}
},
/**
* 加为好友
* @param {Object} parm
*/
addContact:function(parm){
if(this.isInstallAltalk()){
if(alitalkVersion==5){
window.location = "Alitalk:AddContact?uid="+parm.uid+"&siteid=cnalichn";
}else{
window.location = "aliim:addcontact?uid=&touid=cnalichn"+parm.uid+"&gid="+parm.gid+"&verify="+parm.verify+parm.moreProperties;
}
}else{
this.downloadAlitalk();
}
},
getFocus:function(){
document.body.focus();
},
/**
* 自动登录
*/
autoLogin:function(){
if(this.isInstallAltalk()){
if(alitalkVersion==5){
document.write ("<iframe id='alitalkIframe' onload='Alitalk.getFocus()' src='alitalk:MyAlibaba?-hideframe' frameborder=no width=0 height=0 border=0 marginwidth=0 marginheight=0></iframe>");
}else{
document.write ("<iframe id='alitalkIframe' onload='Alitalk.getFocus()' src='aliim:' frameborder=no width=0 height=0 border=0 marginwidth=0 marginheight=0></iframe>");
}
}
},
autoLogin2:function(){
if(this.isInstallAltalk()){
if(alitalkVersion==5){
window.location.href="alitalk:";
}else{
window.location.href="aliim:";
}
}
},
/**
* 打淘宝旺旺聊天窗口.
* @param {Object} parm
*/
openWangwang:function(parm){
if(this.isInstallWangwang()){
window.location = "wangwang:SendIM?"+parm.uid+"&siteid=cnalichn&status="+parm.online+parm.moreProperties;
}else{
this.downloadWangwang();
}
},
/**
* 弹出贸易通下载页面.
*/
downloadAlitalk:function(){
window.target="_blank";
window.open("http://china.alibaba.com/misc/promotion_down.htm?tracelog=cpd_ecs_alitalk1");
},
/**
* 弹出淘宝旺旺下载页面.
*/
downloadWangwang:function(){
window.target="_blank";
window.open("http://www.taobao.com/wangwang/index.php");
},
run:function(from){
if(this.isInstallAltalk()){
window.location = "Alitalk:" + from
}
}
}
})();
function addFriend(uid){
var alitalkparam = new Alitalkparam();
alitalkparam.uid = uid;
Alitalk.addContact(alitalkparam);
}
function openSendWindow(uid,status,moreProperties){
var alitalkparam = new Alitalkparam();
alitalkparam.uid = uid;
if(status) alitalkparam.online = status;
if(moreProperties) alitalkparam.moreProperties = moreProperties;
Alitalk.openAlitalk(alitalkparam);
}
/**
* 社区调用
* @param {Object} uid
*/
function checkId(uid){
openSendWindow(uid);
}
/**
*
* @param {Object} alitalkparam param对象
* @param {String} url1param 贸易通打点的第一个URL参数值
* @param {String} url2param 贸易通打点的第二个URL参数值
* @param {String} gid offerId,用于贸易通聊天窗口右边OFFER显示
*/
function addMoreProperties(alitalkparam,url1param,url2param,gid){
var url1Str="&url1=http://amis1.sh1.china.alibaba.com/potentialContact.dll?";
var url2Str="&url2=http://stat.china.alibaba.com/feedbackfromalitalk.html?";
var gidStr="&gid=";
var brefer="#refer="
var moreProp="";
if(gid && gid.length > 0) moreProp=gidStr+gid;
if (url1param && url1param.length > 0) moreProp=moreProp+url1Str+url1param;
if (url2param && url2param.length > 0)
{
var cosite = "";
try{
cosite = document.cookie.match(/track_cookie[^;]*cosite=(\w+)/)[1];
}
catch(e){}
if(cosite.length > 0){
url2param=url2param+"#fromsite=" + cosite;
}
var r=encodeURI(document.URL);
r= r.replace(/&/g,"$");//需要全部替换
url2param = url2param+brefer+r;
var d = new Date();
url2param=url2param+"#time="+d.getTime();
moreProp=moreProp+url2Str+url2param;
}
alitalkparam.moreProperties = moreProp;
}
