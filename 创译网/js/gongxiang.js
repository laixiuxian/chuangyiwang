//文本框事件
$(function() {
$(".input_moren,.input_text").click(function() {
$(this).css("color","#333");
})
$(".input_moren,.input_text").focus(function() {
$(this).css("color","#333");
})
});
//登录弹出框
function guanbi_div(div_cs1,div_cs2)
{
$("#"+div_cs2).stop().fadeOut(100);
$("#"+div_cs1).stop().fadeOut(100);
}
function tanchu_login(div_cs1,div_cs2)
{
$("#"+div_cs1).css({ 'height': $(document).height() });
$("#"+div_cs1).stop().fadeIn(100);
$("#"+div_cs2).tanchu_ctyle();
$("#"+div_cs2).stop().fadeIn(100);
}
jQuery.fn.tanchu_ctyle=function(loaded) {
var tanchu_obj01 = this;
body_width01 = parseInt($(window).width());
body_height01 = parseInt($(window).height());
block_width01 = parseInt(tanchu_obj01.width());
block_height02 = parseInt(tanchu_obj01.height());
left_position01 = parseInt((body_width01/2) - (block_width01/2)  + $(window).scrollLeft());
if (body_width01<block_width01) { left_position01 = 0 + $(window).scrollLeft(); };
top_position = parseInt((body_height01/2) - (block_height02/2) + $(window).scrollTop());
if (body_height01<block_height02) { top_position = 0 + $(window).scrollTop(); };
if(!loaded) {
tanchu_obj01.css({'position': 'absolute'});
tanchu_obj01.css({ 'top': top_position, 'left': left_position01 });
$(window).bind('resize', function() { 
tanchu_obj01.tanchu_ctyle(!loaded);
});
$(window).bind('scroll', function() { 
tanchu_obj01.tanchu_ctyle(!loaded);
});
} else {
tanchu_obj01.stop();
tanchu_obj01.css({'position':'absolute'});
tanchu_obj01.animate({ 'top':top_position },0,'linear');
}
}
//登录注册用到的切换方式
function reg_loginfs(divId,divName,zDivCount) 
{
for(i=0;i<zDivCount;i++) 
{
document.getElementById(divName+i).style.display="none"; 
//将所有的层都隐藏 
}
document.getElementById(divName+divId).style.display="block"; 
//显示当前层 
}
//最上面小导航菜单
$(function() {
	$(".sm_nav>ul>li").hover(function() {
$(this).addClass("this_01");
	$(".sm_nav ul ul").slideUp("fast");
if (!$(this).find("ul").is(":animated")) $(this).find("ul").slideDown("fast")
},
function() {
	$(this).removeClass("this_01");
if (!$(this).find("ul").is(":animated")) $(this).find("ul").slideUp("fast");
	$(".sm_nav ul ul").slideUp("fast")
})
});
//公用滑出隐藏和显示
function gong_show(id){
$("#"+id).show();
};
function gong_hide(id){
$("#"+id).hide();
};
/*切换菜单*/
function tab_hanshu(bqxx,nrxx,ssxx_id,idgsxx)
{
	for (zs_id=0;zs_id<idgsxx;zs_id++)
{
	document.getElementById(bqxx+zs_id).className = "moren";
	document.getElementById(nrxx+zs_id).style.display = "none";
}
	document.getElementById(bqxx+ssxx_id).className = "this";
	document.getElementById(nrxx+ssxx_id).style.display = "";
}
//返回顶部
$(document).ready(function(){
	$("#fanhui_top_02").hide();
	$(window).scroll(function(){
	if ($(window).scrollTop()>100){
	$("#totop").fadeIn();
	$("#fanhui_top_02").show();
}
else
{
	$("#totop").fadeOut();
}
});
$("#totop").click(function(){
	$('body,html').animate({scrollTop:0},500);
	$("#fanhui_top_02").show();
	return false;
});
	$("#fanhui_top").mouseleave(function(){
});
});
//单选多选样式JS
$.fn.duoxuan=function(options){
	$(':checkbox+label',this).each(function(){
	$(this).addClass('checkbox');
	if($(this).prev().is(':disabled')==false){
	if($(this).prev().is(':checked'))
	$(this).addClass("checked");
}
else
{
	$(this).addClass('disabled');
}
}).click(function(event){
	var parent = $(this).parent().parent();
	var label = parent.find("label");
	var input = parent.find("input");
	if(!$(this).prev().is(':checked')){
	$(this).addClass("checked");
	$(this).prev()[0].checked = true;
	//多选
	if ($(this).attr("data") == "all") {
		label.attr("class", "checkbox checked");
		input.attr("checked", true);
	}
}
else
{
	$(this).removeClass('checked');			
	$(this).prev()[0].checked = false;
	//多选
	if ($(this).attr("data") == "all") {
		label.attr("class", "checkbox");
		input.attr("checked", false);
	}
}
event.stopPropagation();
}
).prev().hide();
}
//单选
$.fn.danxuan = function(options){
var self = this;
	return $(':radio+label',this).each(function(){
$(this).addClass('danxuan');
	if($(this).prev().is("checked"))
$(this).addClass('danxuan_Checked');
}).click(function(event){
$(this).siblings().removeClass("danxuan_Checked");
	if(!$(this).prev().is(':checked')){
	$(this).addClass("danxuan_Checked");
	$(this).prev()[0].checked = true;
}
event.stopPropagation();
})
	.prev().hide();
}
//首页幻灯片
$(function(){
var numpic_jtd = $('#index_hdp01 li').size()-1;
var nownow_jtd = 0;
var inout_jtd = 0;
var TT_jtd = 0;
var speed_jdt = 5000;
$('#index_hdp01 li').eq(0).siblings('li').css({'display':'none'});
var ulstart_jtd = '<div id="index_hdp02"><ul>',
ulcontent = '',
ulend = '</ul></div>';
ADDLI_jtd();
var index_hdp02 = $('#index_hdp02 li');
var index_hdp02width = $('#index_hdp02').width();
index_hdp02.eq(0).addClass('current')
function ADDLI_jtd(){
for(var i = 0; i <= numpic_jtd; i++){
ulcontent += '<li>' + '<span class="index_hdp03">' + (i+1) + '</span>' + '</li>';
}
$('#index_hdp01').after(ulstart_jtd + ulcontent + ulend);	
}
index_hdp02.on('click',DOTCHANGE_jtd)
function DOTCHANGE_jtd(){
var changenow_jtd = $(this).index();
$('#index_hdp01 li').eq(nownow_jtd).css('z-index','900');
$('#index_hdp01 li').eq(changenow_jtd).css({'z-index':'800'}).show();
index_hdp02.eq(changenow_jtd).addClass('current').siblings('li').removeClass('current');
$('#index_hdp01 li').eq(nownow_jtd).fadeOut(400,function(){$('#index_hdp01 li').eq(changenow_jtd).fadeIn(500);});
nownow_jtd = changenow_jtd;
}
index_hdp02.mouseenter(function(){
inout_jtd = 1;
})
index_hdp02.mouseleave(function(){
inout_jtd = 0;
})
function GOGO_jtd(){
var NN_jtd = nownow_jtd+1;
if( inout_jtd == 1 ){
} else {
if(nownow_jtd < numpic_jtd){
$('#index_hdp01 li').eq(nownow_jtd).css('z-index','900');
$('#index_hdp01 li').eq(NN_jtd).css({'z-index':'800'}).show();
index_hdp02.eq(NN_jtd).addClass('current').siblings('li').removeClass('current');
$('#index_hdp01 li').eq(nownow_jtd).fadeOut(400,function(){$('#index_hdp01 li').eq(NN_jtd).fadeIn(500);});
nownow_jtd += 1;
}
else{
NN_jtd = 0;
$('#index_hdp01 li').eq(nownow_jtd).css('z-index','900');
$('#index_hdp01 li').eq(NN_jtd).stop(true,true).css({'z-index':'800'}).show();
$('#index_hdp01 li').eq(nownow_jtd).fadeOut(400,function(){$('#index_hdp01 li').eq(0).fadeIn(500);});
index_hdp02.eq(NN_jtd).addClass('current').siblings('li').removeClass('current');
nownow_jtd=0;
}
}
TT_jtd = setTimeout(GOGO_jtd, speed_jdt);
}
TT_jtd = setTimeout(GOGO_jtd, speed_jdt);
})
//页面用到左右切换效果
function gong_hdp01(hdp_id01,hdp_id02,hdp_id03,hdp_id04,hdp_id05,hdp_id06,hdp_id07){
var sWidth_hdp01 = $("#"+hdp_id01).width();
var len_hdp01 = $("#"+hdp_id02).length;
$("#"+hdp_id07).html(len_hdp01);
var index = 0;
var picTimer_hdp01;
//左边按钮
$("#"+hdp_id03).click(function() {
index -= 1;
if(index == -1) {index = len_hdp01 - 1;}
zy_gdhs(index);
$("#"+hdp_id06).html(index+1);
});
//右边按钮
$("#"+hdp_id04).click(function() {
index += 1;
if(index == len_hdp01) {index = 0;}
zy_gdhs(index);
$("#"+hdp_id06).html(index+1);
});
$("#"+hdp_id05).css("width",sWidth_hdp01 * (len_hdp01));
function zy_gdhs(index) {
var nowLeft = -index*sWidth_hdp01;
$("#"+hdp_id05).stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
}
}
//新闻等页面用到幻灯片
 function huandengpian(hdp_cs1,hdp_cs2,hdp_left,hdp_right,hdp_divxx,ycul_li,zongshu)
 {
	 //参数说明依次是：当前选择总DIV背景和当前按钮默认样式，总DIV下面每个图片，左边按钮，右边按钮，总DIVID
	 var zh_1=zongshu-1;
	(function(){
		var curr = 0;
		$("#"+hdp_cs1).each(function(i){
			$(this).click(function(){
				curr = i;
				$("#"+hdp_cs2).eq(i).fadeIn("slow").siblings(ycul_li).hide();
				$(this).siblings(".hdp_moren").removeClass("hdp_this").end().addClass("hdp_this");
				return false;
			});
		});
		var pg = function(flag){
			if (flag) {
				if (curr == 0) {
					todo = zh_1;
				} else {
					todo = (curr - 1) % zongshu;
				}
			} else {
				todo = (curr + 1) % zongshu;
			}
			$("#"+hdp_cs1).eq(todo).click();
		};
		$("#"+hdp_left).click(function(){
			pg(true);
			return false;
		});
		$("#"+hdp_right).click(function(){
			pg(false);
			return false;
		});
		var timer = setInterval(function(){
			todo = (curr + 1) % zongshu;
			$("#"+hdp_cs1).eq(todo).click();
		},5000);
		$("#"+hdp_divxx+",#"+hdp_left+",#"+hdp_right).hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % zongshu;
					$("#"+hdp_cs1).eq(todo).click();
				},5000);			
			}
		);
	})();
}
//删除，程序新增加程序
function Confirmation(url, str){
		if(window.confirm("确定删除该条信息?")){
			window.location.href=url+str;
		}
	}
//在获取省市区的时候首先加载jQuery.js 然后是select.js以及样式
function getCity(prov){
	$.get("/city",{prov:prov},function(data){
		$("#dizhi_2").html(data);
		$("#dizhi_2").selectCss_01(); 
	});
}
function getDistrict(city){
	$.get("/district",{city:city},function(data){
		$("#dizhi_3").html(data);
		$("#dizhi_3").selectCss_01(); 
	});
}