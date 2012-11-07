/**
* @author shengliang.yaosl
* ִ��ajax��ͨ�ú�����
*/
function ajax( options ) {
options = {
method:		options.method || "GET",			//HTTP�������ͣ�Ĭ��ΪGET��
url:		options.url || "",					//URL�����ַ��
timeout: 	options.timeout || 8000,			//����ʱʱ�䣬Ĭ����8�룻
data:		options.data || "",					//���������ص��������ͣ���xml��script��html����Ĭ��Ϊ�ռ�html��
params:		options.params || "",				//"POST"������������ʱ�����ݵĲ�����
onComplete: options.onComplete || function(){},	//�������ʱִ�еĺ�����
onError:	options.onError || function(){},	//����ʧ��ʱִ�еĺ�����
onSuccess:	options.onSuccess || function(){},	//����ɹ�ʱ���õĺ�����
onLoading:	options.onLoading || function(){}	//��������е��õĺ�����
};
//�����������xReq��
if(window.XMLHttpRequest){
var xReq = new XMLHttpRequest();	//���֧�ֱ�׼�Ĵ���xmlhttpRequest����Ļ�֮�䴴��(Firefox,Safari�ȴ���������)��
}else if(window.ActiveXObject){
var xReq = new ActiveXObject("Microsoft.XMLHTTP");	//IE�´�����Ӧ��xmlhttp����
};
//��¼�����Ƿ�ɹ���ɣ�
var requestDone = false;
//��ʼ��һ��N���ִ�еĻص����������ڵ�N���δ��ɵĻ�ȡ������
setTimeout(function(){
requestDone = true;
},options.timeout);
if(options.method = "GET"){
xReq.open(options.method,options.url+serialize(options.params),true);		//��ʼ������
xReq.onreadystatechange = readyStateChange;		//�����ص�������
xReq.send();									//��������
}else if (options.method=="POST"){
xReq.open(options.method,options.url,true);		//��ʼ������
xReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(xReq.overrideMimeType){	//��֤��������͵Ĵ��л����ݳ�����ȷ��
xReq.setRequestHeader("Connection","close");
};
xReq.onreadystatechange = readyStateChange;		//�����ص�������
xReq.send(serialize(options.params));			//��������������
};
//�����ص�����,�����ĵ��ı仯��
function readyStateChange(){
//��״̬�ı䲢������δ��ʱ������»ص���
if(xReq.readyState == 4 && !requestDone){	//�������ɹ���
if(httpReqSuccess(xReq)){
options.onSuccess(httpResData(xReq,options.method));
}else if(!requestDone){			//���������������У�
options.onLoading();
}else{	//��������˴�����ִ�д���������
options.onError();
};
//������ɵĻص�������
options.onComplete();
//����������
xReq = null;
};
};
//�ж�http��Ӧ�Ƿ�ɹ���
function httpReqSuccess(r){
try{
//����ò�������״̬ͬʱ�����Ϊ�����ļ�����Ϊ����ɹ���
return !r.status && location.protocol == "file:" ||
// ����200-300֮���״̬�붼��ʾ�ɹ���
( r.status >= 200 && r.status < 300 ) ||
// ����ĵ�û�б��޸�Ҳ��ʾ����ɹ���
r.status == 304 ||
// Safari���ĵ�δ�޸�ʱ���ؿ�״̬��
navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined";
}catch(e){}		//����������������½�����Ϊ����ʧ�ܣ�
//���״̬���ʧ�ܣ���ٶ�����ʱʧ�ܵģ�
return false;
};
//����Ӧ�н������ݣ�
function httpResData(r,method) {
// ��ȡcontent-typeͷ����Ϣ;
var ct = r.getResponseHeader("content-type");
// ���û���ṩĬ�ϵ����ͣ��жϷ������Ƿ񷵻�XML��ʽ��
var data = ct && ct.indexOf("xml") >= 0;
// �������򷵻�xml���󣬷��򷵻��ı����ݣ�
data =  (options.data == "xml" || data )? r.responseXML : r.responseText;
// ���ָ������������script,�򷵻�json��ʽ�����ݣ�
if ( options.data == "script" ){
if(window.execScript){
window.execScript(data);
}else{
eval.call( window, data );
}
};
// �������ݣ�
return data;
};
//���л����ݣ�
function serialize(a) {
if(!a){		//���û�����������ֱ�ӷ��أ�
return "";
}
// ���崮�л�����ļ��ϣ�
var s = [];
// �������Ĳ��������飬�ٶ������Ǳ�Ԫ�ص����飻
if ( a.constructor == Array ) {
// ���л���Ԫ�أ�
for ( var i = 0; i < a.length; i++ )
s.push( a[i].name + "=" + encodeURIComponent( a[i].value )
);
} else {
// ���л���/ֵ�Զ���
for (var j in a) {
s.push(j + "=" + encodeURIComponent(a[j]));
};
};
// ���ش��л��Ľ����
return "?"+s.join("&");
};
}
