var showad = true;
var Toppx = 130;            //���϶�λ��
var AdDivW = 107;        //�����
var AdDivH = 262;        //���߶�
var PageWidth = 800;    //ҳ����ٿ�����������ò��������ҹ�����
var MinScreenW = 1024;    //��ʾ������С��Ļ�������

var ClosebuttonHtml1 = '<div align="right" style="position: absolute;top:0px;right:0px;margin:2px;padding:2px;z-index:2000;"><a href="javascript:;" onclick="hidead1()" style="color:white;text-decoration:none;font-size:12px;">�ر�</a></div>'    //�رհ�ť�����Ը���������ã�
var ClosebuttonHtml2 = '<div align="right" style="position: absolute;top:0px;right:72px;margin:2px;padding:2px;z-index:2000;"><a href="javascript:;" onclick="hidead2()" style="color:white;text-decoration:none;font-size:12px;">�ر�</a></div>'    //�رհ�ť�����Ը���������ã�
var AdContentHtml1 = '<div align="center" style="color:green;font-size:23pt;font-family:����;"><a href=/product/detail.asp?ID=271 target=_blank><img src=images/couplet/left.gif border=0></a></div>';            //���д����ɣ��Ǻǣ������ǹ�������boder�����õ�
var AdContentHtml2 = '<div align="center" style="color:blue;font-size:23pt;font-family:����;"><a href=/product/detail.asp?ID=271 target=_blank><img src=images/couplet/right.gif border=0></a></div>';            //���д����ɣ��Ǻǣ������ǹ�������boder�����õ�
document.write ('<div id="Javascript.LeftDiv" style="position: absolute;border: 0px solid #336699;background-color:#ffffff;z-index:1000;width:'+AdDivW+'px;height:'+AdDivH+'px;top:-1000px;word-break:break-all;display:none;">'+ClosebuttonHtml1+'<div>'+AdContentHtml1+'</div></div>');
document.write ('<div id="Javascript.RightDiv" style="position: absolute;border: 0px solid #336699;background-color:#ffffff;z-index:1000;width:'+AdDivW+'px;height:'+AdDivH+'px;top:-1000px;word-break:break-all;display:none;">'+ClosebuttonHtml2+'<div>'+AdContentHtml2+'</div></div>');
function scall(){
    if(!showad){return;}
    if (window.screen.width<MinScreenW){
        alert("��ʱ��ʾ��\n\n��ʾ���ֱ��ʿ��С��"+MinScreenW+",����ʾ���");
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
