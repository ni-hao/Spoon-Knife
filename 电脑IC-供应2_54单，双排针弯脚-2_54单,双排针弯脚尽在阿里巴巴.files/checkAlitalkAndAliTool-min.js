function checkAlitalkAndAliTool(){var A=YAHOO.util.Dom.get("top_t4");if(!checkAlitalk()){A.innerHTML="\u963f\u91cc\u65fa\u65fa";A.href="http://alitalk.alibaba.com.cn/?tracelog=alitalk_index_nav"}else{if(!checkAlitool()){A.innerHTML="\u963f\u91cc\u5de5\u5177\u6761";A.href="http://page.china.alibaba.com/shtml/static/buytool/alitoolbar.shtml?tracelog=Alitoobar_download_homepage"}else{A.innerHTML="\u963f\u91cc\u65fa\u65fa";A.href="http://alitalk.alibaba.com.cn/?tracelog=alitalk_index_nav"}}}function checkAlitalk(){if(document.all&&!document.opera){var B,A;try{B=new ActiveXObject("Ali_Check.InfoCheck")}catch(C){B=null}if(B!=null){return true}try{A=new ActiveXObject("aliimx.wangwangx")}catch(C){A=null}if(A!=null){return true}return false}else{return true}}function checkAlitool(){if(document.all&&!document.opera){var B;try{B=new ActiveXObject("YAliALive.Live")}catch(A){}if(null!=B){return true}else{return false}}else{return true}};
