(function($){
$.fn.jqueryzoom = function(options){
var settings = {
xzoom: 200,
yzoom: 210,
offset: 10,
position: "right",
lens:1,
preload: 1
};
if(options) {
$.extend(settings, options);
}
var noalt='';
$(this).hover(function(){
var imageLeft = this.offsetLeft;
var imageRight = this.offsetRight;
var imageTop =  $(this).get(0).offsetTop;
var imageWidth = $(this).children('img').get(0).offsetWidth;
var imageHeight = $(this).children('img').get(0).offsetHeight;
noalt= $(this).children("img").attr("alt");
var bigimage = $(this).children("img").attr("jqimg");
$(this).children("img").attr("alt",'');
if($("div.jtd_xiangxi05").get().length == 0){
$(this).after("<div class='jtd_xiangxi05'><img class='bigimg' src='"+bigimage+"'/></div>");
$(this).append("<div class='jtd_xiangxi04'>&nbsp;</div>");
}
if(settings.position == "right"){
if(imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width){
leftpos = imageLeft  - settings.offset - settings.xzoom;
}else{
leftpos = imageLeft + imageWidth + settings.offset;
}
}else{
leftpos = imageLeft - settings.xzoom - settings.offset;
if(leftpos < 0){
leftpos = imageLeft + imageWidth  + settings.offset;
}
}
$("div.jtd_xiangxi05").css({ top: imageTop,left: leftpos });
//$("div.jtd_xiangxi05").width(settings.xzoom);
//$("div.jtd_xiangxi05").height(settings.yzoom);
$("div.jtd_xiangxi05").show();
if(!settings.lens){
$(this).css('cursor','crosshair');
}
$(document.body).mousemove(function(e){
mouse = new MouseEvent(e);
var bigwidth = $(".bigimg").get(0).offsetWidth;
var bigheight = $(".bigimg").get(0).offsetHeight;
var scaley ='x';
var scalex= 'y';
if(isNaN(scalex)|isNaN(scaley)){
var scalex = (bigwidth/imageWidth);
var scaley = (bigheight/imageHeight);
//$("div.jtd_xiangxi04").width((settings.xzoom)/scalex );
//$("div.jtd_xiangxi04").height((settings.yzoom)/scaley);
if(settings.lens){
$("div.jtd_xiangxi04").css('visibility','visible');
}
}
xpos = mouse.x - $("div.jtd_xiangxi04").width()/2 - imageLeft;
ypos = mouse.y - $("div.jtd_xiangxi04").height()/2 - imageTop ;
if(settings.lens){
xpos = (mouse.x - $("div.jtd_xiangxi04").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.jtd_xiangxi04").width()/2 > imageWidth + imageLeft ) ?  (imageWidth -$("div.jtd_xiangxi04").width() -2)  : xpos;
ypos = (mouse.y - $("div.jtd_xiangxi04").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.jtd_xiangxi04").height()/2  > imageHeight + imageTop ) ?  (imageHeight - $("div.jtd_xiangxi04").height() -2 ) : ypos;
}
if(settings.lens){
$("div.jtd_xiangxi04").css({ top: ypos,left: xpos });
}
scrolly = ypos;
$("div.jtd_xiangxi05").get(0).scrollTop = scrolly * scaley;
scrollx = xpos;
$("div.jtd_xiangxi05").get(0).scrollLeft = (scrollx) * scalex ;
});
},function(){
$(this).children("img").attr("alt",noalt);
$(document.body).unbind("mousemove");
if(settings.lens){
$("div.jtd_xiangxi04").remove();
}
$("div.jtd_xiangxi05").remove();
});
count = 0;
if(settings.preload){
$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");
$(this).each(function(){
var imagetopreload= $(this).children("img").attr("jqimg");
var content = jQuery('div.jqPreload'+count+'').html();
jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');
});
}
}
})(jQuery);
function MouseEvent(e) {
this.x = e.pageX
this.y = e.pageY
}
//鼠标经过预览图片函数
function preview_jtd(img){
$("#preview_jtd .jtd_xiangxi03 img").attr("src",$(img).attr("src"));
$("#preview_jtd .jtd_xiangxi03 img").attr("jqimg",$(img).attr("bimg"));
}
//图片放大镜效果
$(function(){
$(".jtd_xiangxi03").jqueryzoom({xzoom:380,yzoom:410});
});
//图片预览小图移动效果,页面加载时触发
$(function(){
var tempLength = 0; //临时变量,当前移动的长度
var viewNum = 4; //设置每次显示图片的个数量
var moveNum = 1; //每次移动的数量
var moveTime = 300; //移动速度,毫秒
var scrollDiv = $(".jtd_xiangxi06 .items ul"); //进行移动动画的容器
var scrollItems = $(".jtd_xiangxi06 .items ul li"); //移动容器里的集合
var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

//下一张
$(".jtd_xiangxi06 .next").bind("click",function(){
if(tempLength < countLength){
if((countLength - tempLength) > moveLength){
scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
tempLength += moveLength;
}else{
scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
tempLength += (countLength - tempLength);
}
}
});
//上一张
$(".jtd_xiangxi06 .prev").bind("click",function(){
if(tempLength > 0){
if(tempLength > moveLength){
scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
tempLength -= moveLength;
}else{
scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
tempLength = 0;
}
}
});
});
