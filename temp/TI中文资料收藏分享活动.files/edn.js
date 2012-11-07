function trim(psText) {
    if (psText != null) {
        psText = psText.replace(/^[\s]+/g, "");
        psText = psText.replace(/[\s]+$/g, "");
    }
    return psText;
}

//搜索
function qsp(r) {
    r = trim(r);

    if (r.length > 1) {
        r = window.escape(r);
        url = "?q=" + r;
        if (wwwdomain != null && wwwdomain != "") {
            url += "&site=" + wwwdomain
        }
        window.location = SearchUrl + url;

        return true;
    } else {
        alert("错误的输入条件");
        return false;
    }
}

function qs() {
    var r = document.getElementById("q").value;

    qsp(r)
}

function a_qs() {
    var r = document.getElementById("a_q").value;

    qsp(r);
}

function qs2(q, ue) {
    var r = document.getElementById(q).value;

    r = trim(r);

    if (r.length > 1) {
        r = window.escape(r);
        window.location = SearchUrl + ue + "?site=" + wwwdomain + "&q=" + r
        return true;
    } else {
        alert("错误的输入条件");
        return false;
    }
}
//eekoo搜索
function eekoo(e) {
    oC = e.parentNode.parentNode.childNodes;
    for (var i = 0; i < oC.length; i++) {
        if (oC[i].className == 'search_button_active') {
            oC[i].className = 'search_button_normal';
        }
    }
    e.parentNode.className = 'search_button_active';
    return false;
}


function clearSearchCondition(e) {
    e.value = "";
}

function eekooCheck() {
    var r = document.getElementById("q").value;
    eekooSearch(r);
}

function eekooSimpleSearch(t,u)//t是点击进来的入口,在这里是image
{
    var spanparent = t.parentNode;
    var pparent = spanparent.parentNode;
    //得到最外面的关键字元素
    var inputid = $("#" + $("#" + pparent.id).eq(0).attr("id") + ">input");
    var k = $(inputid).attr("value");
    
    var url = "";
    var searchtype = "ednchina.com";
    if (k.length < 2) {
        alert("错误的输入条件");return;
    }  
   
    //得到单选
    var radioobject = $("#" + $("#" + pparent.id).eq(0).attr("id") + "> span > input:radio:checked");
    if ($(radioobject).attr("value") != "") {
        if (u == "article") {
            searchtype = "article.ednchina.com";
        }
        if (u == "blog") {
            searchtype = "blog.ednchina.com";
        }

    }
    else {
        searchtype = "";
    }
    
    k = encodeURIComponent(k);
    url = "http://www.google.cn/custom?q=" + k + "&domains=" + searchtype + "&sitesearch=" + searchtype + "&forid=1&ie=utf-8&oe=utf-8&safe=active&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3A663399%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3A336699%3BALC%3A0000FF%3BLC%3A0000FF%3BT%3A000000%3BGFNT%3A0000FF%3BGIMP%3A0000FF%3BLH%3A50%3BLW%3A88%3BL%3Ahttp%3A%2F%2Fwww.ednchina.com%2Fimages%2Fsearch_logotiny2.jpg%3BS%3Ahttp%3A%2F%2Fwww.ednchina.com%3BFORID%3A1&hl=zh-CN&sa=Google+%E6%90%9C%E7%B4%A2";
    window.open(url);    

}

function eekooSearch(r) {
    var r = trim(r);
    var oB = document.getElementById("search_button");
    if (r.length > 1) {
        r = encodeURIComponent(r);
        url = "http://search.ednchina.com/searchlist/default.aspx?c=";

        if (oB != null) {
            var oC = oB.childNodes;
            for (var i = 0; i < oC.length; i++) {
                if (oC[i].className == 'search_button_active') {
                    var sUserAgent = navigator.userAgent;
                    if (sUserAgent.indexOf("compatible") > -1 && sUserAgent.indexOf("MSIE") > -1) {
                        if (oC[i].childNodes[0].id == 11 && r.length < 3) {
                            alert("请输入多于两个字符的器件名！");
                            return false;
                        }
                        url = url + oC[i].childNodes[0].id;
                    } else {
                        if (oC[i].childNodes[1].id == 11 && r.length < 3) {
                            alert("请输入多于两个字符的器件名！");
                            return false;
                        }
                        url = url + oC[i].childNodes[1].id;
                    }
                }
            }
        }
        else {
            url = url + "0";
        }
        url = url + "&q=" + r;
        var obj = document.getElementById("eekoo_right").childNodes;
        for (i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                //if (obj[i].value == "") {//Google
                    //url = url + "&t=0";
                    url = "http://www.google.cn/custom?q=" + r + "&domains=www.ednchina.com&sitesearch=&forid=1&ie=utf-8&oe=utf-8&safe=active&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3A663399%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3A336699%3BALC%3A0000FF%3BLC%3A0000FF%3BT%3A000000%3BGFNT%3A0000FF%3BGIMP%3A0000FF%3BLH%3A50%3BLW%3A88%3BL%3Ahttp%3A%2F%2Fwww.ednchina.com%2Fimages%2Fsearch_logotiny2.jpg%3BS%3Ahttp%3A%2F%2Fwww.ednchina.com%3BFORID%3A1&hl=zh-CN&sa=Google+%E6%90%9C%E7%B4%A2";
                /*}
                else {//ednchina
                    //url = url + "&t=1";
                    url = "http://search.ednchina.com/searchlist/default.aspx?q=" + r;
                }*/
            }
        }
        //url = url + "&s=ednchina.com&from=" + wwwdomain;
        window.open(url);
        return true;
    } else {
        alert("错误的输入条件");
        return false;
    }
}

function eekooSearchByForm(t, u) {
    var jparent = t.parentNode;
    var url = "";
    var b = true;
    var jspan;
    var r = t.value;
    for (var i = 0; i < jparent.childNodes.length; i++) {
        
        if (jparent.childNodes[i].nodeName == "SPAN") {
            jspan = jparent.childNodes[i];
            break;
        }
    }
    var searchvalue = "";
    for (var i = 0; i < jspan.childNodes.length; i++) {

        if (jspan.childNodes[i].name != undefined && jspan.childNodes[i].name != "") {
            if (jspan.childNodes[i].type == "radio");
            {
                 if (jspan.childNodes[i].checked == true) {
                     searchvalue = jspan.childNodes[i].value;
                 }  
                 
            }                
        }

    }
    var searchtype = "ednchina.com";
    if (searchvalue != "") {
        if (u == "article") {
            searchtype = "article.ednchina.com";
        }
        if (u == "blog") {
            searchtype = "blog.ednchina.com";
        }

    }
    else {
        searchtype = "";
    }
    if (r.length > 1) {
        r = encodeURIComponent(r);
        url = "http://www.google.cn/custom?q=" + r + "&domains=" + searchtype + "&sitesearch=" + searchtype + "&forid=1&ie=utf-8&oe=utf-8&safe=active&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3A663399%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3A336699%3BALC%3A0000FF%3BLC%3A0000FF%3BT%3A000000%3BGFNT%3A0000FF%3BGIMP%3A0000FF%3BLH%3A50%3BLW%3A88%3BL%3Ahttp%3A%2F%2Fwww.ednchina.com%2Fimages%2Fsearch_logotiny2.jpg%3BS%3Ahttp%3A%2F%2Fwww.ednchina.com%3BFORID%3A1&hl=zh-CN&sa=Google+%E6%90%9C%E7%B4%A2";
    }
    else {
        b = false;
    }

    if (b == true) {
        window.open(url);
        return true;
    }
    else {
        alert("错误的输入条件");
        return false;
    }
    
}



function eekooSearchKeydown(e,u) {
    var oEvent = window.event ? window.event : arguments[0];

    //alert(oEvent.keyCode);    

    if (oEvent.keyCode == 13) {
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            var o = document.getElementById('q');
            return eekooSearchByForm(o,u);
        }
        return eekooSearchByForm(e,u);
    }
    else if (oEvent.which == 13) {
        return eekooSearchByForm(e,u);
    }
    else {
        return true;
    }
}

//submitForm
function submitForm(e, domainurl) {
    var r = document.getElementById(e).value;

    r = trim(r);
    if (r == '输入您的电子邮件地址' || r == '') {
        alert('输入您的电子邮件地址');
        document.getElementById(e).focus();
        document.getElementById(e).value = '';
        return;
    }
    if (r.length > 0) {
        r = encodeURIComponent(r);

        var ue = "/member/eLetter.aspx?email=" + r;
        //var ue="/member/eLetter.aspx?email="+r; //原内容
        if (domainurl != '' && domainurl != undefined) {
            window.location = escape(domainurl) + ue;
            return;
        }
        //window.location = ue;//原内容
        window.parent.location = ue;
    }
}

//Remove Unit
function RemoveUnit() {
    var b = new BrowserInfo();
    var l = (parseInt(b.version) >= 4 && b.name == "Microsoft Internet Explorer") ? 0 : 1
    for (var i = 0; i < document.getElementsByTagName("UL").length; i++) {
        if (document.getElementsByTagName("UL")[i].childNodes.length == 0) {
            document.getElementsByTagName("UL")[i].parentNode.parentNode.style.display = "none";
        }
    }
}

/*
全局变量
*/

/* 广告统计脚本变量 */
var ad_list = "";

/* 顶部广告 */
var varTopAdvertisement = null;

/* 是否进入常规统计 */
var IsStat = true;

/* Domain */
var SearchUrl = "/Search/Default.aspx";
var wwwdomain = "";
/*
*   Goodspeed
*
*/

//用于集中浏览器信息的 JavaScript 类。
// Example:
// var b = new BrowserInfo();
// alert(b.version); 
function BrowserInfo() {
    this.name = navigator.appName;
    this.codename = navigator.appCodeName;
    this.version = navigator.appVersion.substring(0, 4);
    this.platform = navigator.platform;
    this.javaEnabled = navigator.javaEnabled();
    this.screenWidth = screen.width;
    this.screenHeight = screen.height;
}

//产生随机数
function getRandom() { return getRandomDomain(0, 1000); }
function getRandomDomain(min, max) { var now = new Date(); var number = now.getSeconds(); number = parseInt(Math.random(number) * (max - min + 1)) + min; return number; }


//抓取网页
function InitAjax() {
    var ajax = false;
    try { ajax = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) { try { ajax = new ActiveXObject("Microsoft.XMLHTTP"); } catch (E) { ajax = false; } }
    if (!ajax && typeof XMLHttpRequest != 'undefined') { ajax = new XMLHttpRequest(); }
    return ajax;
}

function PostData(url, post) {
    var xmlhttp = InitAjax();
    //var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xmlhttp.send(post);
    return xmlhttp.responseText;
}


/* 获取绝对位置 */
function getObjTop(obj) {
    var t = obj.offsetTop;
    while (obj = obj.offsetParent) {
        t += obj.offsetTop;
    }
    return t;
}

function getObjLeft(obj) {
    var t = obj.offsetLeft;
    while (obj = obj.offsetParent) {
        t += obj.offsetLeft;
    }
    return t;
}
/* 寻找最近的控件 */
function FindClosestControl(e, tagName) {
    while (e.tagName != tagName) {
        if (e.parentElement == null) {
            return null;
        }
        e = e.parentElement;
    }
    return e
}

Array.prototype.remove = function(dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1;
}

//删除确认
function DelConfirm() {
    var o = window.event.srcElement;
    if (o.innerText == "删除") {
        return DeleteConfirm();
    }

    return true;
}

function DeleteConfirm() {
    return window.confirm("确认删除吗？");
}

function GetSkinName() {
    var url = document.referrer;
    var url_array = url.split('/');
    if (url_array.length >= 4) {
        if (url_array[3].toLowerCase() == '') {
            return "Article";
        }
        if (url_array[3].toLowerCase() != 'news'
	    && url_array[3].toLowerCase() != 'solution'
	    && url_array[3].toLowerCase() != 'techchannel'
	    && url_array[3].toLowerCase() != 'designmanager'
	    && url_array[3].toLowerCase() != 'download'
	    && url_array[3].toLowerCase() != 'member'
	    && url_array[3].toLowerCase() != 'event'
	    && url_array[3].toLowerCase() != 'blog'
	    && url_array[3].toLowerCase() != 'techclass') {
            return "Article";
        }
        return url_array[3];
    }

    return "Article";
}

function GetColumnName() {
    switch (GetSkinName().toLowerCase()) {
        case "article":
            return "首页";
        case "news":
            return "资讯";
        case "solution":
            return "方案";
        case "techchannel":
            return "技术";
        case "designmanager":
            return "设计经理人";
        case "download":
            return "下载";
        case "member":
            return "黄页";
        case "event":
            return "活动";
        case "blog":
            return "博客";
        case "techclass":
            return "技术分类";
        default:
            return "首页";
    }
}

//index.js--切换层的效果
function ChangeLayer(obj) {
    objTopParent = obj.parentNode.parentNode;
    objParent = obj.parentNode;
    var titleArray = new Array();
    var flag = 0;
    for (var i = 0; i < objParent.childNodes.length; i++) {
        if (objParent.childNodes[i].id != null && objParent.childNodes[i].id != "") {
            titleArray[flag] = objParent.childNodes[i];
            flag++;
        }
    }
    var contentArray = new Array();
    flag = 0;
    for (var i = 0; i < objTopParent.childNodes.length; i++) {
        if (objTopParent.childNodes[i].id != null && objTopParent.childNodes[i].id != "") {
            contentArray[flag] = objTopParent.childNodes[i];
            flag++;
        }
    }

    var oTitle = document.getElementById(titleArray[0].id);
    var oTitle2 = document.getElementById(titleArray[1].id);
    var oContent = document.getElementById(contentArray[0].id);
    var oContent2 = document.getElementById(contentArray[1].id);

    obj.childNodes[0].className = 'link_white';
    obj.className = 'right_title_content';

    if (titleArray[0].id == obj.id) {
        oContent2.style.display = "none";
        oContent.style.display = "block";
        oTitle2.className = "right_title_content2";
        oTitle2.childNodes[0].className = "";
    }
    if (titleArray[1].id == obj.id) {
        oContent2.style.display = "block";
        oContent.style.display = "none";
        oTitle.className = "right_title_content2";
        oTitle.childNodes[0].className = "";
    }
}


//多层切换 - aysun
function ChangeManyLayer(obj) {
    //obj 当前li或div

    var objParentDiv = obj.parentNode;

    var IsDiv = false;
    //判断obj上父级是不是div
    if (objParentDiv.nodeName == 'DIV') {
        IsDiv = true;
    }

    //循环设置obj平级的样式为空
    for (var i = 0; i < objParentDiv.childNodes.length; i++) {
        objParentDiv.childNodes[i].className = "";
    }
    //如果obj的父级不是div,那再向上找一层
    if (IsDiv == false) {
        objParentDiv = objParentDiv.parentNode;
        //再判断obj父级的父级是不是div
        if (objParentDiv.nodeName == 'DIV') {
            IsDiv = true;
        }
    }


    //如果父级是div
    if (IsDiv == true) {
        //再次获取父级的上层父级对象
        var rootNode = objParentDiv.parentNode;

        var LayerRootNode;
        //得到obj的相对的内容的大div对象
        for (var i = 0; i < rootNode.childNodes.length; i++) {
            if (rootNode.childNodes[i].nodeName == 'DIV') {
                if (rootNode.childNodes[i].id != objParentDiv.id) {
                    LayerRootNode = rootNode.childNodes[i];
                }

            }
        }

        //循环找到obj对应的内容对象显示出现,其它内容则隐藏        
        for (var i = 0; i < LayerRootNode.childNodes.length; i++) {
            if (LayerRootNode.childNodes[i].nodeName == 'DIV' || LayerRootNode.childNodes[i].nodeName == 'UL') {
                if (LayerRootNode.childNodes[i].id == obj.id + 'layer') {
                    LayerRootNode.childNodes[i].style.display = 'block';
                }
                else {
                    LayerRootNode.childNodes[i].style.display = 'none';
                }
            }
        }

        //最后对obj的样式进行标识一下
        obj.className = 'active';

    }


}

//多层切换(需要加载原样式)  By Frank
function SimpleChangeManyLayer(obj) {
    var objParentDiv = obj.parentNode;
    var IsDiv = false;
    if (objParentDiv.nodeName == 'DIV') {
        IsDiv = true;
    }
    for (var i = 0; i < objParentDiv.childNodes.length; i++) {
        objParentDiv.childNodes[i].className = "tab center";
    }
    if (IsDiv == false) {
        objParentDiv = objParentDiv.parentNode;
    }

    if (objParentDiv.nodeName == 'DIV') {
        IsDiv = true;
    }
    if (IsDiv == true) {
        //获取最大的DIV
        var rootNode = objParentDiv.parentNode;

        var LayerRootNode;
        for (var i = 0; i < rootNode.childNodes.length; i++) {
            if (rootNode.childNodes[i].nodeName == 'DIV') {
                if (rootNode.childNodes[i].id != objParentDiv.id) {
                    LayerRootNode = rootNode.childNodes[i];

                }

            }
        }

        for (var i = 0; i < LayerRootNode.childNodes.length; i++) {
            if (LayerRootNode.childNodes[i].nodeName == 'DIV') {
                if (LayerRootNode.childNodes[i].id == obj.id + 'layer') {
                    LayerRootNode.childNodes[i].style.display = 'block';
                }
                else {
                    LayerRootNode.childNodes[i].style.display = 'none';
                }
            }
        }

        obj.className = 'active center';

    }


}

//index
function FloatAd_Close(e) {
    var obj = e.parentElement;

    if (obj != null && obj.tagName == "DIV") {
        obj.style.display = "none";
    }
}


//静态页面广告装载
function loadAdvertistment() {
    for (var i = 0; i < document.getElementsByTagName("iframe").length; i++) {
        var obj = document.getElementsByTagName("iframe")[i];
        if (obj.url) {
            var url = "/App_UserControl/AdvertisemantBar.aspx?pageid=@pageid&AdAreaID=@AdAreaID&dbid=@dbid&postback=@postback"; //广告模版
            url = url.replace("@pageid", obj.url);
            url = url.replace("@AdAreaID", obj.area);
            url = url.replace("@dbid", dbid);
            url = url.replace("@postback", obj.postback);

            obj.src = obj.domain + url;
        }
    }
}

//登录文本脚本
function LoginOnFocus(e, text) {
    if (e.value == text) {
        e.value = "";
    }
    e.select();
    e.style.color = "black";
}