var showad = true;
var Toppx = 130;            //距上端位置
var AdDivW = 107;        //广告宽度
var AdDivH = 262;        //广告高度
var PageWidth = 800;    //页面多少宽度象素下正好不出现左右滚动条
var MinScreenW = 1024;    //显示广告的最小屏幕宽度象素

var ClosebuttonHtml1 = '<div align="right" style="position: absolute;top:0px;right:0px;margin:2px;padding:2px;z-index:2000;"><a href="javascript:;" onclick="hidead1()" style="color:white;text-decoration:none;font-size:12px;">关闭</a></div>'    //关闭按钮（可以根据情况设置）
var ClosebuttonHtml2 = '<div align="right" style="position: absolute;top:0px;right:72px;margin:2px;padding:2px;z-index:2000;"><a href="javascript:;" onclick="hidead2()" style="color:white;text-decoration:none;font-size:12px;">关闭</a></div>'    //关闭按钮（可以根据情况设置）
var AdContentHtml1 = '<div align="center" style="color:green;font-size:23pt;font-family:黑体;"><a href=/product/detail.asp?ID=271 target=_blank><img src=images/couplet/left.gif border=0></a></div>';            //广告写这里吧，呵呵，下面是广告外面的boder的设置等
var AdContentHtml2 = '<div align="center" style="color:blue;font-size:23pt;font-family:黑体;"><a href=/product/detail.asp?ID=271 target=_blank><img src=images/couplet/right.gif border=0></a></div>';            //广告写这里吧，呵呵，下面是广告外面的boder的设置等
document.write ('<div id="Javascript.LeftDiv" style="position: absolute;border: 0px solid #336699;background-color:#ffffff;z-index:1000;width:'+AdDivW+'px;height:'+AdDivH+'px;top:-1000px;word-break:break-all;display:none;">'+ClosebuttonHtml1+'<div>'+AdContentHtml1+'</div></div>');
document.write ('<div id="Javascript.RightDiv" style="position: absolute;border: 0px solid #336699;background-color:#ffffff;z-index:1000;width:'+AdDivW+'px;height:'+AdDivH+'px;top:-1000px;word-break:break-all;display:none;">'+ClosebuttonHtml2+'<div>'+AdContentHtml2+'</div></div>');
function scall(){
    if(!showad){return;}
    if (window.screen.width<MinScreenW){
        alert("临时提示：\n\n显示器分辨率宽度小于"+MinScreenW+",不显示广告");
        showad = false;
        document.getElementById("Javascript.LeftDiv").style.display="none";
        document.getElementById("Javascript.RightDiv").style.display="none";
        return;
    }
    var Borderpx = ((window.screen.width-PageWidth)/2-AdDivW)/2;

    document.getElementById("Javascript.LeftDiv").style.display="";
    document.getElementById("Javascript.LeftDiv").style.top=document.body.scrollTop+Toppx;
    document.getElementById("Javascript.LeftDiv").style.left=document.body.scrollLeft+Borderpx;
    document.getElementById("Javascript.RightDiv").style.display="";
    document.getElementById("Javascript.RightDiv").style.top=document.body.scrollTop+Toppx;
    document.getElementById("Javascript.RightDiv").style.left=document.body.scrollLeft+document.body.clientWidth-document.getElementById("Javascript.RightDiv").offsetWidth-Borderpx;
}

function hidead1()
{
    showad = false;
    document.getElementById("Javascript.LeftDiv").style.display="none";
}
function hidead2()
{
    showad = false;
    document.getElementById("Javascript.RightDiv").style.display="none";
}
window.onscroll=scall;
window.onresize=scall;
window.onload=scall;
