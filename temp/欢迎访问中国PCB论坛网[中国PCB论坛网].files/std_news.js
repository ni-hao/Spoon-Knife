/*
������ƣ�	��̳������ô�ֱ���� for Dv7.1
��������:		2005-03-26
������ߣ�	stardy(˹����) http://www.stardy.com
���÷�����	<script language=javascript src="std_news.js"></script>
*/
//****************************��������******************************
var scrollperTime=20;		//��������(ԽС����Խ��)
var scrollstayTime=2000;	//ͣ��ʱ��(ms����)
var lineNum=10;					//��ʾ��������0��ʾ����
var scrollNum=1;				//����������������
var scrollHeight=22;			//ÿ�и߶�(����px)
var delayTime=500;				//��ʱ?ms��ʾ(���ݿռ����ȡ500-3000֮�����ֵ)
var thefontColor=""	//����������ɫ���ɿգ�
//****************************************************************
//���뿪ʼ
thefontColor=document.location.href.toLowerCase().indexOf("boardid=")<0?thefontColor:"";
var scrollrealHeight=scrollHeight*scrollNum;
var thedivName="bbsnewsDiv";
document.write("<div id="+thedivName+" align=center></div>");
var marqueeTable = eval("document.all."+thedivName);
with(marqueeTable){style.height=scrollrealHeight;}
var theboardID=getParameter("boardid")						//ȡ�ð���ID
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
	if(xml_news.parseError.errorCode!=0){delete(xml_news);marqueeTable.innerHTML="�Բ���XML������س�������std_news.asp�ļ���ʧ����Ч��";return;}
	maxNum = xml_news.getElementsByTagName("news").length; //�����ļ�¼��
	var htmlbegin='<table cellpadding=0 cellspacing=0 align=center>'
	var htmlend='</table>'
	var BodyText="";
	for (var n=0;n<maxNum;n++){
		BodyText=BodyText+"<TR>";
		var tt=xml_news.getElementsByTagName("newstitle").item(n).text;
		var uu=xml_news.getElementsByTagName("url").item(n).text;
		var ee=xml_news.getElementsByTagName("writter").item(n).text;
		var tim=xml_news.getElementsByTagName("time").item(n).text;
		BodyText=BodyText+"<TD"+(thefontColor==""?" style='font-weight:800;'":" style='font-weight:800;color:"+thefontColor+"'")+" align=center height="+scrollrealHeight+"><span style='font-family:Webdings;font-size:15px'>X</span> "+(uu==""?tt:"<a"+(thefontColor==""?"":" style='color:"+thefontColor+"'")+" href=javascript:openScript('"+uu+"',500,400)"+(ee==""?"":" title='�����ˣ�"+ee+"'")+">"+tt+"</a> ")+(tim==""?"":"("+tim+")")+"</TD>";
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

