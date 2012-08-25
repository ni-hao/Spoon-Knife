document.onkeydown = function(e) {
for (var i = 0; i < document.forms.length; i++) {
for (var j = 0; j < document.forms[i].length; j++) {
if (document.forms[i][j] == document.activeElement) {
return;
}
}
}
if (event.keyCode == 37) {
e = window.event || e;
var srcElement = e.srcElement || e.target;
if (srcElement.tagName.toLowerCase() == "input") return false;
doPrevious();
}
if (event.keyCode == 39) {
e = window.event || e;
var srcElement = e.srcElement || e.target;
doNextAll();
}
};
(function() {
function GetCT(className, parentElement, tagName) {
var elems = (parentElement || document.body).getElementsByTagName(tagName);
var result = [];
for (i = 0; j = elems[i]; i++) {
if ((' ' + j.className + ' ').indexOf(' ' + className + ' ') != -1) {
result.push(j);
}
}
return result;
}
var inBg = GetCT('inBg', document.body, 'div');
if (inBg && inBg[0] && inBg[0].offsetWidth < 800) {
var detailCtn = document.getElementById('detailCtn');
if (detailCtn) detailCtn.style.width = '280px';
var title = GetCT('wangpuBodyContTitle', document.body, 'div');
if (title.length) {
var target = title[0].nextSibling;
while (target.nodeType != 1) target = target.nextSibling;
target.style.width = '592px';
}
}
})();
