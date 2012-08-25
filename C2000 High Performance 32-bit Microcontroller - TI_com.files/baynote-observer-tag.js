//Baynote prefix and suffix for custom window.name
var bn_window_param_start = "unb~ti~[";
var bn_window_param_end = "]~";
var bn_location_href = window.location.href;
var window_name = window.name;

//Grab information for the title and description from the meta tags, if available
function baynote_getMeta(name) {
	var metas=document.getElementsByTagName("meta");
	
	if (!metas) return;
        
	var summary="";
	
	for (var i=0; i < metas.length; i++) {
		if (!metas[i]) return;
		if (metas[i].name == name) {
        	return metas[i].content;    	
    	}
	}
}


/*
 * If the META tag already has baynote_title, return it, otherwise
 * grab the HTML title, get rid of unwanted strings, such as ":Texas Instruments", "- Texas Instruments", and " | Texas Instruments"
 */ 
function baynote_getBaynoteTitle()
{
	var baynote_title = baynote_getMeta("baynote_title");
	if (baynote_title != "" && baynote_title != null) {
		return baynote_title;
	}
	
	//var regexMatch = "[\-\|\:] Texas Instruments";
	var regexMatch = "(-[^-]*)$";		 
	var docTitle = document.title;
	var index = docTitle.search(regexMatch);
	if(index > 0)
	{
		docTitle = docTitle.substring(0,index);
	}
    return docTitle;
}

//Get URL GET parameter such as familyId, documentCategoryId, etc. 
function getParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

//Check if a variable is null or is an empty string
function bn_isNotEmpty(name) {
	return (name != null) && (name != "");
}

//Get the value of cookie c_name
function bn_getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

//Set value for cookie c_name
function bn_setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+ ";path=/" +
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//Set window.name
function bn_setWU(bn_iter) {
	var bn_iter_limit = 5;
	if(typeof(bn_iter) != 'undefined' && bn_iter > bn_iter_limit) { return; }
	var bn_u_val = bn_getCookie('bn_u');
	if(bn_isNotEmpty(bn_u_val)) {
		window.name = bn_window_param_start + bn_u_val + bn_window_param_end;
	} else {
		if(typeof(bn_iter) != 'undefined' && bn_iter > 0)
			setTimeout("bn_setWU("+(bn_iter+1)+");",500);
		else
			setTimeout("bn_setWU("+1+");",500);
	}
}

//Get the window name and set bn_u cookie
function bn_getWU() {

	
	var bn_u_cookieval = bn_getCookie('bn_u');
	var start_idx = bn_window_param_start.length;
	var end_idx = window_name.indexOf(bn_window_param_end);
	
	if(end_idx > start_idx && end_idx < window_name.length) {
		var bn_u_val = window_name.substring(start_idx, end_idx);
		if(bn_isNotEmpty(bn_u_val)) {
			bn_setCookie('bn_u',bn_u_val,365*3);
		} else {
			bn_setCookie('bn_u',4,365*3);
		}
	}
}


function bn_showObserver() {
	//Determine appropriate tag server
	
	if (bn_location_href.indexOf("https://") == 0) {
		baynote_tag.server = "https://ti-www.baynote.net";
	} else {
		baynote_tag.server = "http://ti-www.baynote.net";
	}

	baynote_tag.customerId					= "ti";
	baynote_tag.code						= "www";
	baynote_tag.type						= "baynoteObserver";
	//baynote_globals.cookieDomain			= "ti.com";
	baynote_tag.summary						= baynote_getMeta("description");
	baynote_tag.title 						= baynote_getBaynoteTitle();
	baynote_tag.docAttrs.familyId			= getParam("familyId");
	baynote_tag.docAttrs.documentCategoryId = getParam("documentCategoryId");
	/* 
	 * The following are examples of other optional parameters that can be used. For more details please refer to the Baynote implementation guide (bn_imp_guide.pdf).
	 *
	 * baynote_tag.url				= "Custom URL"; 	By default Baynote simple captures the URL of the page from the address line. This parameter enables you to override it.
	 * baynote_tag.docAttrs.[param], e.g.:				You can send any number of attributes through the "docAttrs" object.
	 * baynote_tag.docAttrs.id		= "1";
	 * baynote_tag.docAttrs.name	= "Page name";
	 *
	 */
	
	baynote_tag.show(); 
}

/*
Do not process the window.name if we are on http://www.ti.com or if the (window.name is NOT empty AND NOT of Baynote's pattern), 
just show the observer. 

If window.name has been initialized with the baynote pattern, then call getWU to set the bn_u cookie. 
Otherwise, call bn_showObserver(), then bn_setWU()
*/

if (bn_location_href == "http://www.ti.com/" || bn_location_href == "http://www.ti.com/?DCMP=TIHeaderTracking&HQS=Other+OT+hdr_home" || (bn_isNotEmpty(window_name) && window_name.indexOf(bn_window_param_start) != 0)) {
	//Don't do anything to the window.name
	bn_showObserver();
}
else {
	if (bn_isNotEmpty(window_name) && window_name.indexOf(bn_window_param_start) == 0) {
		bn_getWU();
		bn_showObserver();
	} 
	else {
		bn_showObserver();
		bn_setWU();
	}
}

	

