//select样式美化
(function(meiyuan){ 
function hideOptions(speed){ 
if(speed.data){speed=speed.data} 
if(meiyuan(document).data("nowselectoptions")) 
{ 
meiyuan(meiyuan(document).data("nowselectoptions")).slideUp(speed); 
meiyuan(meiyuan(document).data("nowselectoptions")).prev("div").removeClass("select_cssopen"); 
meiyuan(document).data("nowselectoptions",null); 
meiyuan(document).unbind("click",hideOptions); 
meiyuan(document).unbind("keyup",hideOptionsOnEscKey); 
} 
} 
function hideOptionsOnEscKey(e){ 
var myEvent = e || window.event; 
var keyCode = myEvent.keyCode; 
if(keyCode==27)hideOptions(e.data); 
} 
function showOptions(speed){ 
meiyuan(document).bind("click",speed,hideOptions); 
meiyuan(document).bind("keyup",speed,hideOptionsOnEscKey); 
meiyuan(meiyuan(document).data("nowselectoptions")).slideDown(speed); 
meiyuan(meiyuan(document).data("nowselectoptions")).prev("div").addClass("select_cssopen"); 
} 

meiyuan.fn.selectCss_01=function(_speed){ 
meiyuan(this).each(function(){ 
var speed=_speed||"fast"; 
if(meiyuan(this).data("cssobj")){ 
meiyuan(meiyuan(this).data("cssobj")).remove(); 
} 
meiyuan(this).hide(); 
var divselect = meiyuan("<div></div>").insertAfter(this).addClass("tag_select"); 
meiyuan(this).data("cssobj",divselect); 
var divoptions = meiyuan("<ul></ul>").insertAfter(divselect).addClass("select_cssul").hide(); 
divselect.click(function(e){ 
if(meiyuan(meiyuan(document).data("nowselectoptions")).get(0) != meiyuan(this).next("ul").get(0)){ 
hideOptions(speed); 
} 
if(!meiyuan(this).next("ul").is(":visible")) 
{ 
e.stopPropagation(); 
meiyuan(document).data("nowselectoptions",meiyuan(this).next("ul")); 
showOptions(speed); 
} 
}); 
divselect.hover(function(){ 
meiyuan(this).addClass("select_csshover"); 
} 
, 
function(){ 
meiyuan(this).removeClass("select_csshover"); 
}); 
meiyuan(this).change(function(){ 
meiyuan(this).nextAll("ul").children("li:eq("+ meiyuan(this)[0].selectedIndex +")").addClass("select_liected").siblings().removeClass("select_liected"); 
meiyuan(this).next("div").html(meiyuan(this).children("option:eq("+ meiyuan(this)[0].selectedIndex +")").text()); 
}); 
meiyuan(this).children("option").each(function(i){ 
var lioption= meiyuan("<li></li>").html(meiyuan(this).text()).attr("title",meiyuan(this).attr("title")).appendTo(divoptions);
if(meiyuan(this).attr("selected")){ 
lioption.addClass("select_liected"); 
divselect.html(meiyuan(this).text()); 
} 
lioption.data("option",this); 
lioption.click(function(){ 
lioption.data("option").selected=true; 
meiyuan(lioption.data("option")).trigger("change",true) 
}); 
lioption.hover( 
function(){meiyuan(this).addClass("select_lihover");}, 
function(){ meiyuan(this).removeClass("select_lihover"); } 
); 
}); 
}); 
} 
})(jQuery);