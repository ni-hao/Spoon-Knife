/**
* @fileoverview ��������(ó��ͨ��)WEBǰ��Ӧ��.
* 2007.6.13
* @author:aliued-wd zhujunbiao
* @version 0.1
*/
$ = function(el){
return document.getElementById(el);
}
/**
* ��չ���鷽��add
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
* �¼���������.
* @param {Object} el �������Ķ���.
* @param {Object} eventType �¼���������.
* @param {Object} fn �¼���������.
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
* ������װ����.
* @param online ��������.
* @param size ͼƬ�ߴ�.
* @param uid �û�id.
* @param imgObj ͼƬ����.
* @param eventObj �¼�����.
* @param docObj �İ�����.
* @param onlineDoc �����İ�.
* @param offlineDoc �������İ�.
* @param telonlineDoc �ֻ������İ�.
* @param onlineAlt ������ʾ�İ�.
* @param offlineAlt ������ʾ�İ�.
* @param telonlineAlt �ֻ�������ʾ�İ�.
* @param siteid ��վǰ׺.
* @param isencrypt �Ƿ����.
*/
function Alitalkparam(){
this.online = 0;
this.size = 16;
this.uid = null;
this.imgObj = null;
this.eventObjs = new Array();
this.docObj = null;
this.onlineDoc = "����������,���Ϻ���Ǣ̸!";
this.offlineDoc = "�����ڲ�������,����������Ϣ��!";
this.telonlineDoc = "���ֻ�����,���Ϻ���Ǣ̸!";
this.notInstalledDoc = "δ��װó��ͨ";
this.onlineAlt = "����������,���Ϻ���Ǣ̸!";
this.offlineAlt = "�����ڲ�������,����������Ϣ��!";
this.telonlineAlt = "���ֻ�����,���Ϻ���Ǣ̸!";
this.notInstalledAlt = "δ��װó��ͨ";
this.moreProperties = "";
this.siteid = "cnalichn";
this.isencrypt = false;
this.verify = 0;//��Ϊ���ѵ�ʱ���Ƿ���Ҫ��֤
this.gid = 0;//���ѷ���ID
this.fromUid = '';//��������ID
}
var OnLine = 0;
var online = new Array();
var alitalkVersion = 5;
if (typeof Alitalk == "undefined") {
var Alitalk = {};
}
/**
* ��������(ó��ͨ��)WEBǰ��Ӧ�ÿ��ƾ�̬��.
*/
(function(){
Alitalk = {
/**
* �������ת�����ַ�������;�����������ж϶���û���ó��ͨ״̬.
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
* ��ʼ������ó��ͨ״̬.
* @param {Object} param ������װ����.
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
* ��ʼ�����ó��ͨ״̬.
* @param {Object} arr
*/
initMultStat:function(arr){
document.write("<script src='http://amos.im.alisoft.com/muliuserstatus.aw?uids="+this.arrToString(arr)+"&site=cnalichn'><"+"/"+"script>");
},
/**
* ��ñ�ʾAlitalk����״̬��ͼƬURL
* @param {Object} parm ������װ����.
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
* ��õ�ǰ״̬�µ���ʾ�İ�.
* @param {Object} parm ������װ����.
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
* ��õ�ǰ״̬�µ���ʾ�İ�.
* @param {Object} parm ������װ����.
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
* ����ó��ͨ��ʾͼƬ����.
* @param {Object} parm ������װ����.
*/
setImgSrc:function(parm){
if(parm.imgObj!=null){
parm.imgObj.src=this.getAlitalkImgSrc(parm);
parm.imgObj.alt=this.getAlt(parm);
}
},
/**
* ����ó��ͨ��ʾ�İ�.
* @param {Object} parm ������װ����.
*/
setDoc:function(parm){
if(parm.docObj!=null){
parm.docObj.innerHTML=this.getDoc(parm);
}
},
/**
* �����¼�����.
* @param {Object} parm ������װ����.
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
* ����ó��ͨ��ز���.
* @param {Object} parm ������װ����.
*/
setAlitalk:function(parm){
this.setDoc(parm);
this.setEvent(parm);
this.setImg(parm);
},
/**
* ��ص���ó��ͨ״̬����.
* @param {Object} parm ������װ����.
*/
addListener:function(parm){
parm.online = OnLine;
this.setAlitalk(parm);
},
/**
* ��ض��ó��ͨ״̬����.
* @param {Object} parmArr ������װ����.
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
* �����������촰��.
* @param {Object} parm ������װ����.
*/
openAliwangwang:function(parm){
if(parm.siteid=="cnalichn"){
this.openAlitalk(parm);
}else{
this.openWangwang(parm);
}
},
/**
* �ж��Ƿ��Ѿ���װó��ͨ.
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
* �ж��Ƿ��Ѿ���װ�Ա�����.
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
* ��ó��ͨ���촰��.
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
* ��Ϊ����
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
* �Զ���¼
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
* ���Ա��������촰��.
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
* ����ó��ͨ����ҳ��.
*/
downloadAlitalk:function(){
window.target="_blank";
window.open("http://china.alibaba.com/misc/promotion_down.htm?tracelog=cpd_ecs_alitalk1");
},
/**
* �����Ա���������ҳ��.
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
* ��������
* @param {Object} uid
*/
function checkId(uid){
openSendWindow(uid);
}
/**
*
* @param {Object} alitalkparam param����
* @param {String} url1param ó��ͨ���ĵ�һ��URL����ֵ
* @param {String} url2param ó��ͨ���ĵڶ���URL����ֵ
* @param {String} gid offerId,����ó��ͨ���촰���ұ�OFFER��ʾ
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
r= r.replace(/&/g,"$");//��Ҫȫ���滻
url2param = url2param+brefer+r;
var d = new Date();
url2param=url2param+"#time="+d.getTime();
moreProp=moreProp+url2Str+url2param;
}
alitalkparam.moreProperties = moreProp;
}
