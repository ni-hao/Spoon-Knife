/**
* @author:aliued-wd junbiao.zhujb
*/
var historyDrop = null;//默认历史激活层为空.
var SCROLLTOP = 0;
var FLOWTIME;
var newPostionY = 0;
var FOLLOW;
/**
* FireFox并没有 window.event . 如果要得到 event 对象,就必须要声明事件处理函数的第一个参数为event
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
* 拖动到实例类。
* @param {Object} dragObjId 拖动层的ID。
* @param {Object} dragCtrlId 控制这个层拖动到层的ID。
* @param {Object} dragContId 拖动层的内容区域ID。
*/
var XXDragDrop = function(dragObjId,dragCtrlId,dragContId,dragX,dragY,notFloat){
if(!dragObjId) return;
var oDrag = document.getElementById(dragObjId);
if(!oDrag) return;
this.oDrag = oDrag;
this.cont = null;
var oDragCtrl = document.getElementById(dragCtrlId);
if(!oDragCtrl){//如果拖动控制层不存在，这定义整个拖动层为拖动控制层
this.oDragCtrl = this.oDrag;
}else{
this.oDragCtrl = oDragCtrl;
}
this.oDragCtrl.style.cursor = "move";
this._init(oDrag,oDragCtrl,dragContId,dragX,dragY,notFloat);//初始化拖动层
};
XXDragDrop.prototype = {
/**
* 初始化拖动层
* @param {Object} oDrag 拖动层对象
* @param {Object} oDragCtrl 控制拖动层对象
* @param {Object} dragContId 拖动内容层对象
*/
_init: function(oDrag,oDragCtrl,dragContId,dragX,dragY,notFloat){
if(dragX&&dragY){
this.oDrag.style.left = dragX + "px";
this.oDrag.style.top = dragY+ "px";
}
if(dragContId){//如果拖动层的内容区域ID存在，在初始化拖动层的内容区域
this.cont = document.getElementById(dragContId);
}
/**
* 绑定onscroll事件
* @param {Object} e
*/
onscroll = function(e){
if(notFloat){}else{
FOLLOW = oDrag;
SCROLLTOP = document.documentElement.scrollTop;//获取当前可视窗口和页面顶端的高度
XDragDropCtrl.followFloat(9);
}
}
this.oDragCtrl.onmousedown = function(e){
/*以下为解决多个浮动层优先级问题*/
if(historyDrop&&historyDrop!=oDrag){//如果存在历史激活层and历史激活层不等于当前激活层
historyDrop.style.zIndex = 998;//设置历史激活层ZINDEX为998
}
oDrag.style.zIndex = 999;//设置当前激活层ZINDEX为999（最高）
historyDrop = oDrag;//把当前激活层设置为历史激活层
if(oDragCtrl.setCapture){
oDragCtrl.setCapture();//IE下捕获鼠标事件
}else{
window.captureEvents(Event.MOUSEMOVE);//FF下捕获鼠标事件
}
getEvent(e).cancelBubble = true;//取消时间冒泡，防止事件冲突
var bMouseX = getEvent(e).clientX;
var bMouseY = getEvent(e).clientY;
var x = parseInt(oDrag.offsetLeft);
var y = parseInt(oDrag.offsetTop);
if(!oDrag.offsetLeft){
x = parseInt(oDrag.currentStyle.left);
y = parseInt(oDrag.currentStyle.top);
}
oDragCtrl.onmousemove = function(e){
//鼠标移动后位置
var eMouseX = getEvent(e).clientX;
var eMouseY = getEvent(e).clientY;
this.parentNode.style.left = x+ eMouseX - bMouseX + "px";
this.parentNode.style.top = y + eMouseY - bMouseY + "px";
}
oDragCtrl.onmouseup = function(){
if(oDragCtrl.releaseCapture){
oDragCtrl.releaseCapture();//IE下释放鼠标事件
}else{
window.releaseEvents(Event.MOUSEMOVE);//FF下释放鼠标事件
}
oDragCtrl.onmousemove=null;//置空onmousemove事件，防止内存泄漏
oDragCtrl.onmouseup=null;//置空onmouseup事件，防止内存泄漏
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
* 打开或者关闭浮动层
* @param {Object} xDragDrop 当前层对象
* @param {Object} ctrlBtn 控制对象
* @param {String} minClassName 最小按钮的css类名
* @param {String} maxClassName 最大按钮的css类名
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
xxCtrlBtn.title = "最大化"+titleName;
if(notToBottom) return;
this.toMin(bottomRightXY,xxDragDrop);
}else{
xxDragDrop.cont.style.display = "block";
xxCtrlBtn.className = minClassName;
xxCtrlBtn.title = "最小化"+titleName;
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
* 获得当前窗口的右下角位置。
*/
getBottomRight:function(){
var c_w = document.documentElement.clientWidth;
var c_h = document.documentElement.clientHeight + SCROLLTOP;
return {x:c_w,y:c_h};
},
/**
* 获得当前层的坐标.
* @param {Object} nowFloatObj
*/
getNowPostion:function(nowFloatObj){
return {x:parseInt(nowFloatObj.style.top.left),y:parseInt(nowFloatObj.style.top)}
},
/**
* 根据贸易通状态排序，排序规则为：主帐号顶置，其次是在线的，再次是手机在线，最后是不在线.
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
* 根据速率浮动层
* @param {Object} speed
*/
followFloat:function(speed){
SPEED = speed;
newPostionY = this.getNewPostionY(this.getBottomRight());
if(FLOWTIME) clearInterval(FLOWTIME);
FLOWTIME = setInterval(this.followingY,1);
},
/**
* 浮动层Y轴方向.
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
* 清楚当前打开的所有错误提示,为了确保打开的错误提示只有一个.
*/
clearAllError:function(){
for(var i=0;i<ValidateList.length;i++){
ValidateList[i].oValidate.style.border = "1px solid #80AFDD";
ValidateList[i].errorShow.style.display = "none";
}
},
/**
* 清空输入框中的内容.
* @param {Object} oText
*/
clearValue:function(oText){
oText.value = "";
},
/**
* 验证.
* @param {Object} o
*/
check:function(o){
var nowValidate = this.getValidate(o);
var vType = nowValidate.validateType.vType;
if(vType == "length"){//如果验证类别为长度.
var returnStat = checkLength(nowValidate.oValidate.value,nowValidate.validateType.vLength);//返回长度验证结果.
this.showOrHiddenError(returnStat,nowValidate);
}
},
/**
* 检查输入的完整性.
* @param {Object} o
*/
checkComplete:function(o,oValidate){
var nowValidate = oValidate;
if(!nowValidate){
var nowValidate = this.getValidate(o);
}
if(nowValidate.validateType.vType == "length"){
var returnStat = checkLength(nowValidate.oValidate.value,nowValidate.validateType.vLength);//返回长度验证结果.
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
* 根据验证返回的状态来显示错误信息或者隐藏错误信息.
* @param {boolean} returnStat 验证返回的状态
* @param {Object} oValidate 需要验证的信息框.
* @param {Object} oErrorShow 错误信息显示对象.
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
* 根据被验证对象从验证对象列表中得到当前的验证对象.
* @param {Object} o 被验证对象
*/
getValidate:function(o){
for(var i=0;i<ValidateList.length;i++){
if(ValidateList[i].oValidate == o){
return ValidateList[i];
}
}
},
/**
* 默认初始化时候有默认值的时候的验证.
* @param {Object} oValidate 被验证对象
*/
inintValidate:function(oValidate){
this.checkComplete("",oValidate)
},
/**
* 获得表单能否提交的状态.
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
* 检查字符串是否超过指定长度.
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
* 验证输入的字符串是否符合电子邮件的规则.
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
* 验证输入的字符串是否符合手机号码的规则.
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
code = str.charCodeAt(i);//获取当前字符的unicode编码
if (code >= 65281 && code <= 65373){
result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
}else if (code == 12288){
result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
}else{
result += str.charAt(i);
}
}
return result;
}
/**
* 验证对象。
* @param {Object} validateId 验证对象的ID
* @param {Object} errorShowId 显示该验证对象错误的时候的错误提示对象ID
* @param {Object} events 该验证对象所包含的事件集合
* @param {Object} validateType 验证类别对象
* @param {Object} defStat 默认验证状态是否是通过的
* @param {boolean} isDefValue 是否有默认值
*/
var Validate = function(validateId,errorShowId,events,validateType,defStat,isDefValue){
this.isPass = false;//标示该对象是否通过验证
if(defStat){this.isPass = defStat;}
this.oValidate = document.getElementById(validateId);//需要验证的对象
this.errorShow = document.getElementById(errorShowId);//显示验证错误信息的对象
if(isDefValue){this.defValue = this.oValidate.value}else{this.defValue = "";}
if(validateType) this.validateType =  validateType;//初始化验证类别对象
this._init(events);//初始化该验证对象
}
Validate.prototype = {
/**
* 根据验证对象拥有的事件集合初始化验证对象
* @param {Object} events 验证对象拥有的事件集合
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
//检查敏感词
function checkDenyWords(content) {
if (content == null || content.trim() == "") return "";
var wordsArrays = new Array();
content=content.toLowerCase();
wordsArrays = new Array("诚信商务网","诚信商务","五三二二","5322","注册","网址","网站","www.EC21.com","内衣通","0791 6690161","0791 6690253","0791 6690310","0791 6690356","0791 8885159","0791-6690310","0791-6690356","100data.com","2288.35007.net","28897737","3536.net","51sobu.com","5322.com","5322.net","5332.com","5822.com","5877.com","5iok.com","6640620","6640630","680.com.cn","71008.com","8848","8gem.com","9595.cn","Ecplaza.com","Ecplaza.net","E站通","Post2Ali","TraCQ在线商务交流","alloy.com.cn","aweb.com.cn","booye.com","btob.com","btob.net","buffet.com.cn","bxcn.com","cappma.com","cartelcn.com","cashfiesta","cg160.com","cgy.cn","changpian.com","chinabamboonet.com","chinabidding.com.cn","chinaesteel.com.cn","chinamj.com.cn","chinaour","chinapharm.com.cn","chinascrap.com","clean-info.com","cn5000.com","cn61.net","cnbt.com.cn","cnfee.com","cnflw.com","cnfurnace.net","cnli.net","cntra.com","cpbbs.net","da001.com","dj800","e-marketing.net.cn","ec51.com","eck.com.cn","elibaba.net","fa lun","feitianlight.com","foodqs.com","gbele.com","gkw.com.cn","gs114.cn","gz001.com","hardwareol.net","hblbet.com","hc360.com","hcgroup.com","hotexport.com","huiduo.net.cn","imageengine.com.cn","jctis.com","jdztaoci.com","jxbx.com","minghui","mymai.com","nc365.com","nc365.net","nic2000","nyto.cn","okws.com","packbuy.com","pcsohu.com","pointsmoney","qm365.com","qyfw.com","ra36.com","res168.net","script","sie.cn","tearen.com","tongzhuang.net","tpage.com","tpage.net.cn","tradenet.cn","uuxx.net","video.com.cn","wltools.net","www.123trading.com","www.3536","www.51wj","www.5322","www.5322.com","www.Ecplaza","www.Globalsources.com","www.TradeEasy.com","www.btob","www.bx727.com","www.cartelcn","www.ce.net.cn","www.chinaccm.com","www.cn818","www.easyeb.com","www.hardwaretoday","www.made-in-china.com","www.mmmn.net","www.mysc.cn","www.nc365","www.sinobnet.com","www.sparkice.com.cn","www.tracq.net","www.wto1.net","xichi.net","yicou.com","yjtx.com","yujie.cn","zapbao.com","zhibei.com","zhun.net","zj555.com","zzlm.com","５３２２.com","５３２２．ｃｏｍ","５８２２.com","５８２２．com","５８７７.com","阿德采购网","罢工","百姓数据网","包装采购网","宝石网","本溪727","博亿网","采购网站","成信商网","诚商网","诚信商网","诚信商务网","诚信网","达赖","大法","大法弟子","代开","代开发票","电炉商情网","东突","独立","发抡","发轮","发轮功","发伦","发仑","发沦","发囵","法抡","法轮","法轮大法","法轮功","法伦","法仑","法纶","法囵","反革命","分裂","分裂中国","工控网","共匪","硅产品交易网","国际净化设备信息网","国际童装网","合金材料网","洪志","宏志","华南商贸资源","环球机电网","环球汽摩资源","环球资源","慧聪商务网","慧聪网","混蛋","机械设备网","家电商网","建网通","建站","建站通","江八点","江八条","江独裁","疆独","景德镇陶瓷论坛","静坐","李洪志","李宏志","流氓","六合彩","六四","吕秀莲","轮功","买麦网","买卖网","免费查看采购信息","南昌市 沿江中路","内衣网","内衣资讯网","农博网","骗","迫害","全球采购网站","全球制造网","三陪","色情","商贸网","商网客户部李小琴","商网客户部章丽","商务网","商务网站","商业网站","上当","食品产业网","实华开","示威","死","搜捕网","搜狐商贸机会","搜索引擎","台湾独立","唐山二手网","突厥斯坦","万商(中国)供求网","万商供求网","王八蛋","网络交易","网络推广","网站一夜成名","温岭工具网","温州塑料网","五金网站","五金在线","西部创业网","西藏独立","西单墙","新闻封锁","信息平台","行业网站","旋转接头网","压迫","一边一国","一中一台","易贸通","淫秽","游行","造反","浙江日用品网","真善忍","镇压","正法","政变","政治风波","政治运动","支那猪","中关村电脑报价网","中硅网","中国采购与招标网","中国出口企业网","中国出口商品网","中国打火机信息网","中国电池网","中国儿童用品网","中国福利网","中国工艺品交易网","中国工艺网","中国国际加工网","中国国际加工网","中国金属废料网","中国旅游网","中国民用品网","中国名茶网","中国品牌交易网","中国企商","中国全自动麻将机网","中国蔬菜网","中国药网","中国渔网","中国针织网","中国制造网","中国竹网","中华创业网","中华商务网","中企网","自焚","自由运动","嫖娼");
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
