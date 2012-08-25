/// <reference path="jQuery.intellisense.js"/>
$(function() {
    var videoList = $("div[video]");
    
    videoList.each(function() {
        $(this).append("<div id=\"edit\" style=\"text-align: right;height:10px;padding:10px;margin-top:10px;background-color:#ECF3F6\"><a title=\"视频编辑\"  href=\"http://pagesadmin.ednchina.com/video/Videomanager.aspx?pageid=" + $(this).attr("pageid") + "&areaid=" + $(this).attr("areaid") + "\" >视频编辑</a> </div>");
        $("#edit > a").fancybox({
            'zoomSpeedIn': 0,
            'zoomSpeedOut': 0,
            'overlayShow': true,
            'frameWidth': 650,
            'frameHeight': 520
        });        
    });
});
var isplay = false;
function OnClickPlay(vid) {
    if (isplay == false) {
        $.getJSON("http://www.ednchina.com/js/VideoPlay.ashx?id=" + vid + "&type=1&jsoncallback=?", function(data) {
        });
        isplay = true;
    }
//    $.get("http://www.ednchina.com/js/VideoPlay.ashx", { id: vid });     
}














