/*AsyncScript����ο�ʼ*/
var userAgent = navigator.userAgent.toLowerCase();
/**
* �ж������
*/
Browser_feed = {
version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
isSafari: /webkit/.test(userAgent),
isOpera: /opera/.test(userAgent),
isMsie: /msie/.test(userAgent) && !/opera/.test(userAgent),
isMozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
}
/**
* �첽����������ķ�װʵ��
*/
AsyncScript = function(){
var nidx = 0;//script���������ID
/**
* ���ݽӵ����ͺͽڵ�ӵ�е����Լ�������������һ���ڵ�
* @param {String} nodeType �ӵ�����
* @param {Object} attributes �ڵ�ӵ�е�����
* @param {Object} win ������
* @return ����һ��DOM�ڵ�
*/
var _node = function(nodeType, attributes, win){
var w = win || window, d = w.document, n = d.createElement(nodeType);
for (var i in attributes) {
if (attributes[i]) {
n.setAttribute(i, attributes[i]);
}
}
return n;
};
/**
* ����URL��������ͱ���������һ��javascript�ڵ�
* @param {String} url URL
* @param {Object} win ������
* @param {String} charset ����
* @return ����һ��javascript�ڵ�
*/
var _scriptNode = function(url, win, charset){
var c = charset || "gbk";
return _node("script", {
"id": "alicn" + (nidx++),
"type": "text/javascript",
"charset": c,
"src": url
}, win);
};
return {
/**
* �����첽��������ķ���
* @param {Object} url �첽�������������
* @param {Object} fn ����ɹ��󴥷��ķ���
* @param {Object} scope ������
*/
script: function(url, fn, scope){
var w = scope || window, d = w.document, h = d.getElementsByTagName("head")[0], n;
n = _scriptNode(url, w, "gbk");
h.appendChild(n);
if (Browser_feed.isMsie) {
n.onreadystatechange = function(){
var rs = this.readyState;
if ("loaded" === rs || "complete" === rs) {
fn();
}
}
}
else {
n.onload = function(){
fn();
}
}
}
}
}
();
/**
* ���÷���
*/
Lang = {
/**
* �ж��Ƿ��Ƿ���
* @param {Object} o
*/
isFunction: function(o){
return typeof o === 'function';
},
/**
* ������IE��֧��ʲô�ģ����������
* @param {Object} r
* @param {Object} s
*/
_IEEnumFix: function(r, s){
if (Browser_feed.isMsie) {
var add = ["toString", "valueOf"], i;
for (i = 0; i < add.length; i = i + 1) {
var fname = add[i], f = s[fname];
if (Lang.isFunction(f) && f != Object.prototype[fname]) {
r[fname] = f;
}
}
}
},
/**
* �ϲ�����ķ������������ռ���һ����������
* @param {Object} r �ϲ���Ķ���
* @param {Object} s ��Ҫ�ϲ���R�еĶ���
*/
augmentObject: function(r, s){
if (!s || !r) {
throw new Error("Absorb failed, verify dependencies.");
}
var a = arguments, i, p, override = a[2];
if (override && override !== true) { // only absorb the specified properties
for (i = 2; i < a.length; i = i + 1) {
r[a[i]] = s[a[i]];
}
}
else { // take everything, overwriting only if the third parameter is true
for (p in s) {
if (override || !r[p]) {
r[p] = s[p];
}
}
Lang._IEEnumFix(r, s);
}
},
/**
* �ϲ�����
*/
merge: function(){
var o = {}, a = arguments;
for (var i = 0, l = a.length; i < l; i = i + 1) {
Lang.augmentObject(o, a[i], true);
}
return o;
}
}
/*AsyncScript����ν���*/
var base64_total_test = "cD0yJnU9ey9wYWdlLmNoaW5hLmFsaWJhYmEuY29tL3NodG1sL3N0YXRpYy9mb3JmZWVkYmFja2xvZy5odG1sP3RvaWQ9ZG9uZ2Fud3VqaW4mZnJvbWlkPXZvc2ppYW5nbGVpJnNvdXJjZXR5cGU9c2VsbG9mZmVybGlzdF9jb250YWN0JmRvbWFpblR5cGU9fSZtPXtHRVR9JnM9ezIwMH0mcj17aHR0cDovL2Rvbmdhbnd1amluLmNuLmFsaWJhYmEuY29tL2F0aGVuYS9jb250YWN0L2Rvbmdhbnd1amluLmh0bWw/Y29udGFjdEZyb209c2VsbG9mZmVybGlzdF9jb250YWN0JmtleXdvcmRzPX0mYT17Y19tdD0xfGNfbWlkPXZvc2ppYW5nbGVpfGNfbGlkPXZvc2ppYW5nbGVpfGNfbXM9MX0mYj17LX0mYz17LX0=";//encode64("testurl");
//china.alibaba.com  feedback trace of contact
//param:toid=���ջ�ԱId&fromid=�鿴��ԱId&sourcetype=sourceType&categoryId=��ҵ��Ŀ
function feedback_contacttrace(obj, param){
var feedbackUrl = "http://page.china.alibaba.com/shtml/static/forfeedbacklog.html";
if (param.indexOf("?") > -1) {
feedbackUrl = feedbackUrl + param;
}
else {
feedbackUrl = feedbackUrl + "?" + param;
}
//
var cosite = "";
try {
cosite = document.cookie.match(/track_cookie[^;]*cosite=(\w+)/)[1];
}
catch (e) {
}
if (cosite.length > 0) {
feedbackUrl = feedbackUrl + "&fromsite=" + cosite;
}
beacon_click(obj, feedbackUrl, '-');
if (document.images) {
var d = new Date();
var img_feedback = new Image();
//(new Image()).src=feedbackUrl + "&time=" + d.getTime();
img_feedback.src = feedbackUrl + "&time=" + d.getTime();
var img_test = new Image();
img_test.src = "http://page.china.alibaba.com/html/log_test1.html?v=401&time" + d.getTime();
AsyncScript.script("http://page.china.alibaba.com/html/log_test1.html?v=201&time" + d.getTime(), function(){
});
//document.write("<img alt=\"\" width=\"1\" height=\"1\" style=\"display:none\" ");
//document.write("src=\"http://page.china.alibaba.com/html/log_test1.html?v=202&url="+base64_total_test+"&time"+d.getTime()+"\">");
}
return true;
}
function beacon_click(u, param, refer){
try {
var brefer = refer;
if (brefer == "-") {
brefer = encodeURI(document.URL);
}
d = new Date();
var profile_site = 2;
var url;
if (param.indexOf("http://") >= 0) {
url = param.substr(6);
}
var method = "GET";
var cookie = allCookie();
var total = "p=" + profile_site + "&u={" + url + "}&m={" + method + "}&s={200}&r={" + brefer + "}&a={" + cookie + "}&b={-}&c={-}";
var base64_total = encode64(total);
if (document.images) {
var img_feedback2 = new Image();
img_feedback2.src = "http://dmtracking.alibaba.com/c.jpg?" + base64_total + "&time=" + d.getTime();
var img_test2 = new Image();
img_test2.src = "http://dmtracking.alibaba.com/feedbacktest.jpg?v=402&" + base64_total + "&time=" + d.getTime();
AsyncScript.script("http://dmtracking.alibaba.com/feedbacktest.jpg?v=203&" + base64_total + "&time=" + d.getTime(), function(){
});
//document.write("<img alt=\"\" width=\"1\" height=\"1\" style=\"display:none\" ");
//document.write("src=\"ttp://dmtracking.alibaba.com/feedbacktest.jpg?v=204&url="+base64_total_test+"&time"+d.getTime()+"\">");
}
}
catch (e) {
}
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function encode64(str){
var out, i, len;
var c1, c2, c3;
len = str.length;
i = 0;
out = "";
while (i < len) {
c1 = str.charCodeAt(i++) & 0xff;
if (i == len) {
out += base64EncodeChars.charAt(c1 >> 2);
out += base64EncodeChars.charAt((c1 & 0x3) << 4);
out += "==";
break;
}
c2 = str.charCodeAt(i++);
if (i == len) {
out += base64EncodeChars.charAt(c1 >> 2);
out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
out += base64EncodeChars.charAt((c2 & 0xF) << 2);
out += "=";
break;
}
c3 = str.charCodeAt(i++);
out += base64EncodeChars.charAt(c1 >> 2);
out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
out += base64EncodeChars.charAt(c3 & 0x3F);
}
return out;
}
function allCookie(){
var apache_a = "-";
var cookie = document.cookie;
if (cookie.length == 0) {
cookie = "-";
return apache_a;
}
try {
var arr = cookie.split(";");
for (var i = 0; i < arr.length; i++) {
if (arr[i].indexOf("ali_apache_track=") >= 0) {
if (arr[i].length < 20) {
return apache_a;
}
else {
apache_a = arr[i].substring(18);
}
break;
}
}
}
catch (e) {
return "-";
}
return apache_a;
}
