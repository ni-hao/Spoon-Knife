/*
插件名称：	论坛公告调用垂直滚动 for Dv7.1
更新日期:		2005-03-26
插件作者：	stardy(斯大里) http://www.stardy.com
调用方法：	<script language=javascript src="std_news.js"></script>
*/
//****************************参数设置******************************
var scrollperTime=20;		//滚动快慢(越小滚动越快)
var scrollstayTime=2000;	//停留时间(ms毫秒)
var lineNum=10;					//显示行数，填0显示所有
var scrollNum=1;				//滚动行数，填数字
var scrollHeight=22;			//每行高度(象素px)
var delayTime=500;				//延时?ms显示(根据空间快慢取500-3000之间的数值)
var thefontColor=""	//链接字体颜色（可空）
//****************************************************************
//代码开始
thefontColor=document.location.href.toLowerCase().indexOf("boardid=")<0?thefontColor:"";
var scrollrealHeight=scrollHeight*scrollNum;
var thedivName="bbsnewsDiv";
document.write("<div id="+thedivName+" align=center></div>");
var marqueeTable = eval("document.all."+thedivName);
with(marqueeTable){style.height=scrollrealHeight;}
var theboardID=getParameter("boardid")						//取得版面ID
var startmarqueeTop=0;
var offsetTop=scrollrealHeight;
var marqueestopTime=0;
var stopScroll1=false,xml_news;
function loadNews(){
	xml_news = new ActiveXObject("Microsoft.XMLDOM");
	xml_news.async=true;
	xml_news.onreadystatechange = newsGetReady;
	xml_news.load("std_news.asp?num="+lineNum+"&boardid="+theboardID);
}
function newsGetReady(){
	if(xml_news.readyState!=4)return;
	if(xml_news.parseError.errorCode!=0){delete(xml_news);marqueeTable.innerHTML="对不起，XML公告加载出错！可能std_news.asp文件丢失或无效！";return;}
	maxNum = xml_news.getElementsByTagName("news").length; //检索的记录数
	var htmlbegin='<table cellpadding=0 cellspacing=0 align=center>'
	var htmlend='</table>'
	var BodyText="";
	for (var n=0;n<maxNum;n++){
		BodyText=BodyText+"<TR>";
		var tt=xml_news.getElementsByTagName("newstitle").item(n).text;
		var uu=xml_news.getElementsByTagName("url").item(n).text;
		var ee=xml_news.getElementsByTagName("writter").item(n).text;
		var tim=xml_news.getElementsByTagName("time").item(n).text;
		BodyText=BodyText+"<TD"+(thefontColor==""?" style='font-weight:800;'":" style='font-weight:800;color:"+thefontColor+"'")+" align=center height="+scrollrealHeight+"><span style='font-family:Webdings;font-size:15px'>X</span> "+(uu==""?tt:"<a"+(thefontColor==""?"":" style='color:"+thefontColor+"'")+" href=javascript:openScript('"+uu+"',500,400)"+(ee==""?"":" title='发布人："+ee+"'")+">"+tt+"</a> ")+(tim==""?"":"("+tim+")")+"</TD>";
		BodyText=BodyText+"</TR>"
		if(maxNum>scrollNum&&n==maxNum-1){n=-1;maxNum=scrollNum}
	}
	marqueeTable.innerHTML=htmlbegin+BodyText+htmlend;
	with(marqueeTable){
		style.overflowY="hidden";
		onmouseover=new Function("stopScroll1=true");
		onmouseout=new Function("stopScroll1=false");
	}
	delete(xml_news);
	marqueeTable.scrollTop=0;
	setmarqueeTime();
}
function setmarqueeTime(){
	marqueeTable.scrollTop=0;
	setInterval("marqueeUp()",scrollperTime);
}
function marqueeUp(){
	if(stopScroll1==true)return;
	offsetTop+=1;
	if(offsetTop==scrollrealHeight+1){
		marqueestopTime+=1;
		offsetTop-=1;
		if(marqueestopTime*scrollperTime>=scrollstayTime){
			offsetTop=0; 
			marqueestopTime=0;
		}
	} 	  
	else{  
 		startmarqueeTop=marqueeTable.scrollTop;
		marqueeTable.scrollTop+=1;
		if(startmarqueeTop==marqueeTable.scrollTop){
		marqueeTable.scrollTop=0;
		marqueeTable.scrollTop+=1;
		}
 	} 
}
function getParameter(name){
	var paramStr=document.location.search;
	name=name.toLowerCase()
	if(paramStr.length==0)return "";
	if(paramStr.charAt(0)!='?')return "";
	paramStr=unescape(paramStr);
	paramStr=paramStr.substring(1);
	if(paramStr.length==0)return "";
	var params=paramStr.split('&');
	for(var i=0;i<params.length;i++){
		var parts=params[i].split('=',2);
		if(parts[0].toLowerCase()==name){
			if(parts.length<2||typeof(parts[1])=="undefined"||parts[1]=="undefined"||parts[1]=="null")return "";
			return parts[1];
		}
	}
	return "";
}
setTimeout("loadNews()",delayTime);

