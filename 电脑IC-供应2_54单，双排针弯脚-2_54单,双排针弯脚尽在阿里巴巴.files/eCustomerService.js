/**
* @author:aliued-wd junbiao.zhujb
*/
var historyDrop = null;//Ĭ����ʷ�����Ϊ��.
var SCROLLTOP = 0;
var FLOWTIME;
var newPostionY = 0;
var FOLLOW;
/**
* FireFox��û�� window.event . ���Ҫ�õ� event ����,�ͱ���Ҫ�����¼��������ĵ�һ������Ϊevent
* @param {Object} e
*/
function getEvent(e) {
var ev = e || window.event;
if (!ev) {
var c = this.getEvent.caller;
while (c) {
ev = c.arguments[0];
if (ev && Event == ev.constructor) {
break;
}
c = c.caller;
}
}
return ev;
}
/**
* �϶���ʵ���ࡣ
* @param {Object} dragObjId �϶����ID��
* @param {Object} dragCtrlId ����������϶������ID��
* @param {Object} dragContId �϶������������ID��
*/
var XXDragDrop = function(dragObjId,dragCtrlId,dragContId,dragX,dragY,notFloat){
if(!dragObjId) return;
var oDrag = document.getElementById(dragObjId);
if(!oDrag) return;
this.oDrag = oDrag;
this.cont = null;
var oDragCtrl = document.getElementById(dragCtrlId);
if(!oDragCtrl){//����϶����Ʋ㲻���ڣ��ⶨ�������϶���Ϊ�϶����Ʋ�
this.oDragCtrl = this.oDrag;
}else{
this.oDragCtrl = oDragCtrl;
}
this.oDragCtrl.style.cursor = "move";
this._init(oDrag,oDragCtrl,dragContId,dragX,dragY,notFloat);//��ʼ���϶���
};
XXDragDrop.prototype = {
/**
* ��ʼ���϶���
* @param {Object} oDrag �϶������
* @param {Object} oDragCtrl �����϶������
* @param {Object} dragContId �϶����ݲ����
*/
_init: function(oDrag,oDragCtrl,dragContId,dragX,dragY,notFloat){
if(dragX&&dragY){
this.oDrag.style.left = dragX + "px";
this.oDrag.style.top = dragY+ "px";
}
if(dragContId){//����϶������������ID���ڣ��ڳ�ʼ���϶������������
this.cont = document.getElementById(dragContId);
}
/**
* ��onscroll�¼�
* @param {Object} e
*/
onscroll = function(e){
if(notFloat){}else{
FOLLOW = oDrag;
SCROLLTOP = document.documentElement.scrollTop;//��ȡ��ǰ���Ӵ��ں�ҳ�涥�˵ĸ߶�
XDragDropCtrl.followFloat(9);
}
}
this.oDragCtrl.onmousedown = function(e){
/*����Ϊ���������������ȼ�����*/
if(historyDrop&&historyDrop!=oDrag){//���������ʷ�����and��ʷ����㲻���ڵ�ǰ�����
historyDrop.style.zIndex = 998;//������ʷ�����ZINDEXΪ998
}
oDrag.style.zIndex = 999;//���õ�ǰ�����ZINDEXΪ999����ߣ�
historyDrop = oDrag;//�ѵ�ǰ���������Ϊ��ʷ�����
if(oDragCtrl.setCapture){
oDragCtrl.setCapture();//IE�²�������¼�
}else{
window.captureEvents(Event.MOUSEMOVE);//FF�²�������¼�
}
getEvent(e).cancelBubble = true;//ȡ��ʱ��ð�ݣ���ֹ�¼���ͻ
var bMouseX = getEvent(e).clientX;
var bMouseY = getEvent(e).clientY;
var x = parseInt(oDrag.offsetLeft);
var y = parseInt(oDrag.offsetTop);
if(!oDrag.offsetLeft){
x = parseInt(oDrag.currentStyle.left);
y = parseInt(oDrag.currentStyle.top);
}
oDragCtrl.onmousemove = function(e){
//����ƶ���λ��
var eMouseX = getEvent(e).clientX;
var eMouseY = getEvent(e).clientY;
this.parentNode.style.left = x+ eMouseX - bMouseX + "px";
this.parentNode.style.top = y + eMouseY - bMouseY + "px";
}
oDragCtrl.onmouseup = function(){
if(oDragCtrl.releaseCapture){
oDragCtrl.releaseCapture();//IE���ͷ�����¼�
}else{
window.releaseEvents(Event.MOUSEMOVE);//FF���ͷ�����¼�
}
oDragCtrl.onmousemove=null;//�ÿ�onmousemove�¼�����ֹ�ڴ�й©
oDragCtrl.onmouseup=null;//�ÿ�onmouseup�¼�����ֹ�ڴ�й©
}
}
}
};
var seedId = "";
var seedOnline = 0;
(function(){
var xxDragDrop = null;
var xxCtrlBtn = null;
var SPEED = 0;
XDragDropCtrl = {
/**
* �򿪻��߹رո�����
* @param {Object} xDragDrop ��ǰ�����
* @param {Object} ctrlBtn ���ƶ���
* @param {String} minClassName ��С��ť��css����
* @param {String} maxClassName ���ť��css����
*/
toMinorMax:function(xDragDrop,ctrlBtn,minClassName,maxClassName,notToBottom){
xxDragDrop = xDragDrop;
xxCtrlBtn = ctrlBtn;
var bottomRightXY = this.getBottomRight();
var titleName = xxCtrlBtn.title.substring(3,xxCtrlBtn.title.length);
if(xDragDrop.cont){
if(xxCtrlBtn.className == minClassName){
xxDragDrop.cont.style.display = "none";
xxCtrlBtn.className = maxClassName;
xxCtrlBtn.title = "���"+titleName;
if(notToBottom) return;
this.toMin(bottomRightXY,xxDragDrop);
}else{
xxDragDrop.cont.style.display = "block";
xxCtrlBtn.className = minClassName;
xxCtrlBtn.title = "��С��"+titleName;
if(notToBottom) return;
this.toMax(bottomRightXY,xxDragDrop);
}
}
},
toMin:function(bottomRight,xxDragDrop){
var newCoordinate = {x:bottomRight.x-xxDragDrop.oDrag.scrollWidth,y:bottomRight.y-xxDragDrop.oDragCtrl.scrollHeight};
xxDragDrop.oDrag.style.left = newCoordinate.x + "px";
xxDragDrop.oDrag.style.top = newCoordinate.y + "px";
},
toMax:function(bottomRight,xxDragDrop){
var newCoordinate = {x:bottomRight.x-xxDragDrop.oDrag.scrollWidth,y:bottomRight.y-xxDragDrop.oDrag.scrollHeight};
xxDragDrop.oDrag.style.left = newCoordinate.x + "px";
xxDragDrop.oDrag.style.top = newCoordinate.y + "px";
},
/**
* ��õ�ǰ���ڵ����½�λ�á�
*/
getBottomRight:function(){
var c_w = document.documentElement.clientWidth;
var c_h = document.documentElement.clientHeight + SCROLLTOP;
return {x:c_w,y:c_h};
},
/**
* ��õ�ǰ�������.
* @param {Object} nowFloatObj
*/
getNowPostion:function(nowFloatObj){
return {x:parseInt(nowFloatObj.style.top.left),y:parseInt(nowFloatObj.style.top)}
},
/**
* ����ó��ͨ״̬�����������Ϊ�����ʺŶ��ã���������ߵģ��ٴ����ֻ����ߣ�����ǲ�����.
* @param {Object} oListId
* @param {Object} list
*/
sort:function(oListId,list){
var oList = document.getElementById(oListId);
var listLi = oList.getElementsByTagName("li");
var listLang = listLi.length;
for(var i=0;i<listLang;i++){
oList.removeChild(listLi[0]);
}
var first = new Array();
var arr_1 = new Array();
var arr_4= new Array();
var arr_0= new Array();
for(var i=0;i<list.length;i++){
var nowLiObj = list[i].eventObjs[0].parentNode;
if(i==0){
nowLiObj.getElementsByTagName("a")[0].className = "mainId";
first[first.length] = nowLiObj;
if(list[i].online==1){
seedId = nowLiObj.className;
seedOnline=1;
}
}else{
if(list[i].online==1){
//if(seedId==""){seedId = nowLiObj.className}
arr_1[arr_1.length] = nowLiObj;
}else if(list[i].online==4||list[i].online==5){
arr_4[arr_4.length] = nowLiObj;
}else if(list[i].online==0||list[i].online==2){
nowLiObj.getElementsByTagName("a")[0].className = "black";
arr_0[arr_0.length] = nowLiObj;
}
}
}
if(seedId == ""){
if(arr_1.length==0){
seedId = list[0].eventObjs[0].parentNode.className;
seedOnline = list[0].online;
}
else{
var rn = Math.floor(Math.random() * (arr_1.length));
seedId = arr_1[rn].className;
seedOnline = 1;
}
}
this.appendNewChild(oList,first);
this.appendNewChild(oList,arr_1);
this.appendNewChild(oList,arr_4);
this.appendNewChild(oList,arr_0);
},
appendNewChild:function(father,chlid){
for(var i=0;i<chlid.length;i++){
father.appendChild(chlid[i]);
}
},
getNewPostionY:function(nowBottomRight){
return nowBottomRight.y-FOLLOW.scrollHeight;
},
/**
* �������ʸ�����
* @param {Object} speed
*/
followFloat:function(speed){
SPEED = speed;
newPostionY = this.getNewPostionY(this.getBottomRight());
if(FLOWTIME) clearInterval(FLOWTIME);
FLOWTIME = setInterval(this.followingY,1);
},
/**
* ������Y�᷽��.
*/
followingY:function(){
var tempTop = parseInt(FOLLOW.style.top);
var offsetTempTop = newPostionY - tempTop;
if(offsetTempTop>0){
if(offsetTempTop>=SPEED){
FOLLOW.style.top = tempTop + SPEED + "px";
}else{
FOLLOW.style.top = tempTop + offsetTempTop + "px";
clearInterval(FLOWTIME);
}
}else{
if((-offsetTempTop)>=SPEED){
FOLLOW.style.top = tempTop - SPEED + "px";
}else{
FOLLOW.style.top = tempTop + offsetTempTop + "px";
clearInterval(FLOWTIME);
}
}
}
}
})();
function createECSList(){
var ECSList = document.getElementById("EList");
document.getElementById("welcomeWords").innerHTML = eService.welcomeWords;
for(var i=0;i<eService.contactList.length;i++){
var tempLi = document.createElement("li")
tempLi.title = eService.contactList[i].name+" "+eService.contactList[i].jobTitle;
tempLi.className = eService.contactList[i].memberId;
ECSList.appendChild(tempLi);
var tempA = document.createElement("a");
tempA.id = "mytA"+(i+1);
tempA.href="#";
var tempImg = document.createElement("img");
tempImg.id = "mytImg"+(i+1);
tempImg.src = "http://img.china.alibaba.com/others/images/myt_online.gif";
tempA.appendChild(tempImg);
var tempSpan = document.createElement("span");
if(i==0&&eService.isChampion=="y"){
tempSpan.className = "shenglie_king";
tempSpan.innerHTML = eService.contactList[i].name+" "+eService.contactList[i].jobTitle;
tempA.appendChild(tempSpan);
var tempImg2 = document.createElement("img");
tempImg2.src = "http://img.china.alibaba.com/images/cn/market/ecs/king.gif";
tempImg2.style.marginTop = "1px";
tempA.appendChild(tempImg2);
}else{
tempSpan.className = "shenglie";
tempSpan.innerHTML = eService.contactList[i].name+" "+eService.contactList[i].jobTitle;
tempA.appendChild(tempSpan);
}
tempLi.appendChild(tempA);
var mytImg_param = getContactParam("mytImg"+(i+1),"mytA"+(i+1),eService.contactList[i].memberId);
paramArr.add(mytImg_param);
}
}
function getContactParam(imgObj, imgEventObjs,loginId){
var param = new Alitalkparam();
param.uid = loginId;
param.imgObj = document.getElementById(imgObj);
param.eventObjs.add(document.getElementById(imgEventObjs));
param.docObj = null;
param.size = 16;
return param;
}
(function(){
var NOERROR = false;
ECSErrorCtrl = {
}
})();
var ValidateList = new Array();
(function(){
ErrorCtrl = {
/**
* �����ǰ�򿪵����д�����ʾ,Ϊ��ȷ���򿪵Ĵ�����ʾֻ��һ��.
*/
clearAllError:function(){
for(var i=0;i<ValidateList.length;i++){
ValidateList[i].oValidate.style.border = "1px solid #80AFDD";
ValidateList[i].errorShow.style.display = "none";
}
},
/**
* ���������е�����.
* @param {Object} oText
*/
clearValue:function(oText){
oText.value = "";
},
/**
* ��֤.
* @param {Object} o
*/
check:function(o){
var nowValidate = this.getValidate(o);
var vType = nowValidate.validateType.vType;
if(vType == "length"){//�����֤���Ϊ����.
var returnStat = checkLength(nowValidate.oValidate.value,nowValidate.validateType.vLength);//���س�����֤���.
this.showOrHiddenError(returnStat,nowValidate);
}
},
/**
* ��������������.
* @param {Object} o
*/
checkComplete:function(o,oValidate){
var nowValidate = oValidate;
if(!nowValidate){
var nowValidate = this.getValidate(o);
}
if(nowValidate.validateType.vType == "length"){
var returnStat = checkLength(nowValidate.oValidate.value,nowValidate.validateType.vLength);//���س�����֤���.
this.showOrHiddenError(returnStat,nowValidate);
}
if(nowValidate.validateType.vType == "email"){
var returnStat = checkEmail(nowValidate.oValidate.value);
this.showOrHiddenError(returnStat,nowValidate);
}
if(nowValidate.validateType.vType == "telPhone"){
var returnStat = checkTelPhone(nowValidate.oValidate.value);
this.showOrHiddenError(returnStat,nowValidate);
}
if(nowValidate.validateType.vType == "checkCode"){
var returnStat = checkCheckCode(nowValidate.oValidate.value);
this.showOrHiddenError(returnStat,nowValidate);
}
if(nowValidate.validateType.notNull){
if(nowValidate.oValidate.value==""||nowValidate.oValidate.value==null){
this.showOrHiddenError(false,nowValidate);
}
}
},
/**
* ������֤���ص�״̬����ʾ������Ϣ�������ش�����Ϣ.
* @param {boolean} returnStat ��֤���ص�״̬
* @param {Object} oValidate ��Ҫ��֤����Ϣ��.
* @param {Object} oErrorShow ������Ϣ��ʾ����.
*/
showOrHiddenError:function(returnStat,nowValidate){
if(!returnStat){
this.clearAllError();
nowValidate.errorShow.style.display = "block";
nowValidate.oValidate.style.border = "1px solid #FD6138";
nowValidate.isPass = false;
}else{
nowValidate.errorShow.style.display = "none";
nowValidate.oValidate.style.border = "1px solid #80AFDD";
nowValidate.isPass = true;
}
},
/**
* ���ݱ���֤�������֤�����б��еõ���ǰ����֤����.
* @param {Object} o ����֤����
*/
getValidate:function(o){
for(var i=0;i<ValidateList.length;i++){
if(ValidateList[i].oValidate == o){
return ValidateList[i];
}
}
},
/**
* Ĭ�ϳ�ʼ��ʱ����Ĭ��ֵ��ʱ�����֤.
* @param {Object} oValidate ����֤����
*/
inintValidate:function(oValidate){
this.checkComplete("",oValidate)
},
/**
* ��ñ��ܷ��ύ��״̬.
*/
getSubmitStat:function(){
for(var i=0;i<ValidateList.length;i++){
if(ValidateList[i].isPass==false) return false;
}
return true;
}
}
})();
/**
* ����ַ����Ƿ񳬹�ָ������.
* @param {Object} str
* @param {Object} len
*/
function checkLength(str,len){
if(str.trim().length<1){
return false;
}
if(checkDenyWords(str)!=""){
return false;
}
if(str.length>len){
return false;
}else{
return true;
}
}
/**
* ��֤������ַ����Ƿ���ϵ����ʼ��Ĺ���.
* @param {Object} str
*/
function checkEmail(str){
var patn = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
if(!patn.test(str)||str.length>50){
return false;
}else{
return true;
}
}
/**
* ��֤������ַ����Ƿ�����ֻ�����Ĺ���.
* @param {Object} str
*/
function checkTelPhone(str){
str = DBC2SBC(str);
var patn = /^[0-9-\/]+$/;
if((!patn.test(str)&&str!="")||str.length>16){
return false;
}else{
return true;
}
}
function checkCheckCode(str){
str = DBC2SBC(str);
var patn = /^[0-9-\/]+$/;
if((!patn.test(str)&&str!="")||str.length!=4){
return false;
}else{
return true;
}
}
function DBC2SBC(str){
var result = '';
for (i=0;i<str.length; i++){
code = str.charCodeAt(i);//��ȡ��ǰ�ַ���unicode����
if (code >= 65281 && code <= 65373){
result += String.fromCharCode(str.charCodeAt(i) - 65248);//��ȫ���ַ���unicode����ת��Ϊ��Ӧ����ַ���unicode��
}else if (code == 12288){
result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
}else{
result += str.charAt(i);
}
}
return result;
}
/**
* ��֤����
* @param {Object} validateId ��֤�����ID
* @param {Object} errorShowId ��ʾ����֤��������ʱ��Ĵ�����ʾ����ID
* @param {Object} events ����֤�������������¼�����
* @param {Object} validateType ��֤������
* @param {Object} defStat Ĭ����֤״̬�Ƿ���ͨ����
* @param {boolean} isDefValue �Ƿ���Ĭ��ֵ
*/
var Validate = function(validateId,errorShowId,events,validateType,defStat,isDefValue){
this.isPass = false;//��ʾ�ö����Ƿ�ͨ����֤
if(defStat){this.isPass = defStat;}
this.oValidate = document.getElementById(validateId);//��Ҫ��֤�Ķ���
this.errorShow = document.getElementById(errorShowId);//��ʾ��֤������Ϣ�Ķ���
if(isDefValue){this.defValue = this.oValidate.value}else{this.defValue = "";}
if(validateType) this.validateType =  validateType;//��ʼ����֤������
this._init(events);//��ʼ������֤����
}
Validate.prototype = {
/**
* ������֤����ӵ�е��¼����ϳ�ʼ����֤����
* @param {Object} events ��֤����ӵ�е��¼�����
*/
_init:function(events){
ValidateList[ValidateList.length] = this;
if(this.defValue==""&&this.oValidate.value!=""){
ErrorCtrl.inintValidate(this);
}
for(var i=0;i<events.length;i++){
if(events[i]=="onfocus"){
this.oValidate.onfocus = function(){
var nowValidate = ErrorCtrl.getValidate(this);
nowValidate.errorShow.style.display = "none";
nowValidate.oValidate.style.border = "1px solid #80AFDD";
if(nowValidate.defValue==this.value){
this.value = "";
}
this.style.color = "#000";
}
}else if(events[i]=="onblur"){
this.oValidate.onblur = function(){
ErrorCtrl.checkComplete(this);
}
}else if(events[i]=="onkeyup"){
this.oValidate.onkeyup = function(){
ErrorCtrl.check(this);
}
}
}
}
};
//������д�
function checkDenyWords(content) {
if (content == null || content.trim() == "") return "";
var wordsArrays = new Array();
content=content.toLowerCase();
wordsArrays = new Array("����������","��������","��������","5322","ע��","��ַ","��վ","www.EC21.com","����ͨ","0791 6690161","0791 6690253","0791 6690310","0791 6690356","0791 8885159","0791-6690310","0791-6690356","100data.com","2288.35007.net","28897737","3536.net","51sobu.com","5322.com","5322.net","5332.com","5822.com","5877.com","5iok.com","6640620","6640630","680.com.cn","71008.com","8848","8gem.com","9595.cn","Ecplaza.com","Ecplaza.net","Eվͨ","Post2Ali","TraCQ����������","alloy.com.cn","aweb.com.cn","booye.com","btob.com","btob.net","buffet.com.cn","bxcn.com","cappma.com","cartelcn.com","cashfiesta","cg160.com","cgy.cn","changpian.com","chinabamboonet.com","chinabidding.com.cn","chinaesteel.com.cn","chinamj.com.cn","chinaour","chinapharm.com.cn","chinascrap.com","clean-info.com","cn5000.com","cn61.net","cnbt.com.cn","cnfee.com","cnflw.com","cnfurnace.net","cnli.net","cntra.com","cpbbs.net","da001.com","dj800","e-marketing.net.cn","ec51.com","eck.com.cn","elibaba.net","fa lun","feitianlight.com","foodqs.com","gbele.com","gkw.com.cn","gs114.cn","gz001.com","hardwareol.net","hblbet.com","hc360.com","hcgroup.com","hotexport.com","huiduo.net.cn","imageengine.com.cn","jctis.com","jdztaoci.com","jxbx.com","minghui","mymai.com","nc365.com","nc365.net","nic2000","nyto.cn","okws.com","packbuy.com","pcsohu.com","pointsmoney","qm365.com","qyfw.com","ra36.com","res168.net","script","sie.cn","tearen.com","tongzhuang.net","tpage.com","tpage.net.cn","tradenet.cn","uuxx.net","video.com.cn","wltools.net","www.123trading.com","www.3536","www.51wj","www.5322","www.5322.com","www.Ecplaza","www.Globalsources.com","www.TradeEasy.com","www.btob","www.bx727.com","www.cartelcn","www.ce.net.cn","www.chinaccm.com","www.cn818","www.easyeb.com","www.hardwaretoday","www.made-in-china.com","www.mmmn.net","www.mysc.cn","www.nc365","www.sinobnet.com","www.sparkice.com.cn","www.tracq.net","www.wto1.net","xichi.net","yicou.com","yjtx.com","yujie.cn","zapbao.com","zhibei.com","zhun.net","zj555.com","zzlm.com","��������.com","��������������","��������.com","����������com","��������.com","���²ɹ���","�չ�","����������","��װ�ɹ���","��ʯ��","��Ϫ727","������","�ɹ���վ","��������","������","��������","����������","������","����","��","�󷨵���","����","������Ʊ","��¯������","��ͻ","����","����","����","���ֹ�","����","����","����","����","����","����","���ִ�","���ֹ�","����","����","����","����","������","����","�����й�","������","����","���Ʒ������","���ʾ����豸��Ϣ��","����ͯװ��","�Ͻ������","��־","��־","������ó��Դ","���������","������Ħ��Դ","������Դ","�۴�������","�۴���","�쵰","��е�豸��","�ҵ�����","����ͨ","��վ","��վͨ","���˵�","������","������","����","�������մ���̳","����","���־","���־","��å","���ϲ�","����","������","�ֹ�","������","������","��Ѳ鿴�ɹ���Ϣ","�ϲ��� �ؽ���·","������","������Ѷ��","ũ����","ƭ","�Ⱥ�","ȫ��ɹ���վ","ȫ��������","����","ɫ��","��ó��","�����ͻ�����С��","�����ͻ�������","������","������վ","��ҵ��վ","�ϵ�","ʳƷ��ҵ��","ʵ����","ʾ��","��","�Ѳ���","�Ѻ���ó����","��������","̨�����","��ɽ������","ͻ��˹̹","����(�й�)������","���̹�����","���˵�","���罻��","�����ƹ�","��վһҹ����","���빤����","����������","�����վ","�������","������ҵ��","���ض���","����ǽ","���ŷ���","��Ϣƽ̨","��ҵ��վ","��ת��ͷ��","ѹ��","һ��һ��","һ��һ̨","��óͨ","����","����","�췴","�㽭����Ʒ��","������","��ѹ","����","����","���η粨","�����˶�","֧����","�йش���Ա�����","�й���","�й��ɹ����б���","�й�������ҵ��","�й�������Ʒ��","�й�������Ϣ��","�й������","�й���ͯ��Ʒ��","�й�������","�й�����Ʒ������","�й�������","�й����ʼӹ���","�й����ʼӹ���","�й�����������","�й�������","�й�����Ʒ��","�й�������","�й�Ʒ�ƽ�����","�й�����","�й�ȫ�Զ��齫����","�й��߲���","�й�ҩ��","�й�����","�й���֯��","�й�������","�й�����","�л���ҵ��","�л�������","������","�Է�","�����˶�","���");
for(var k=0;k<wordsArrays.length;k++){
var wordLowerCase=wordsArrays[k].toLowerCase();
if (content.indexOf(wordLowerCase)!=-1){
return wordsArrays[k];
}
}
return "";
}
String.prototype.trim = function(){
return this.replace(/(^\s*)|(\s*$)/g, "");
}
