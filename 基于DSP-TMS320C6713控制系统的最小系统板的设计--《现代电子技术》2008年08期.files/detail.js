function Favorite(url,name)
{
	window.external.AddFavorite(url,name);
	return false;			
}

function setCookie(name,value)
{
	var Days = 1*365; 
	var exp  = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	var v = name+ "="+ escape (value);
	v = v + "; expires=" + exp.toGMTString() + "; path=/ ";
    document.cookie = v ;
}
function getCookie(name)
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr !=null) return unescape(arr[2]); return null;
}
function getArr(value)
{
	return value.split("|");	
}
function comparet(value)
{
	var exp2  = new Date();
	if((Date.parse(exp2) - parseInt(value))>24*60*60*1000)
		return true;
	else
		return false;	
}
function first(name)
{
	var exp2  = new Date();
	t=String(Date.parse(exp2))+"|1";//+String(1);
	setCookie(name,t);	
}
function show(name,u,ou)
{
	var t = getCookie(name);
	if( t == null) 
	{
		first(name);
	}
	else
	{
		var tem=getArr(t);
		var tim=tem[0];
		if(comparet(tim))
			first(name);
		else
		{
		t=tem[1];
		t=parseInt(t)+1;
		t=String(tim)+"|"+String(t);
		setCookie(name,t);
		}
	}
	
	t = getCookie(name);	
	var need=false;
	if((t==null))// 
	{
		need = true;
	}
	else
	{
		t=getArr(t)
		if(parseInt(t[1])>10)//&&t%2 == 0)
		{
			need = true;
		}
	}
	
	if(ou&&ou=='ad')
	{
		var adun = document.getElementById("ADUserName");
		if(adun)
		{
			u = u + String(adun.value);			
		}
	}
	
	if(need)
	{
		window.open('../downValidate/InitCode.aspx?z'+u);	
//		window.location.href('../downValidate/InitCode.aspx?z'+u);
	}
	else
	{
		window.open('../downValidate/InitCode.aspx?q'+u);
//		window.location.href('../downValidate/InitCode.aspx?q'+u);
	}
}

function searchArc(txtword,sfield)
{
//	var obj = window.open("/SearchArticle.aspx?NaviID=1&value=" + escape(txtword) + "&sfield="+escape(sfield));
	var obj = window.open("http://search.cnki.net/search.aspx?q=" + sfield + "%3a" + txtword);
	
	obj.focus();
}

