var jq_mail = {
      text_focus:function(text_focus,cur){
		var tip = $(text_focus).siblings("label");
		$(tip).click(function(){
			$(this).hide();
			$(this).siblings("input").focus();
		});
		$(text_focus).focus(function(){
			$(this).parent().addClass(cur);
			$(this).siblings("label").hide();
		});
		$(text_focus).blur(function(){
			$(this).parent().removeClass(cur);
			if(this.value==""){
				$(this).siblings("label").show();
			};
		});
	},
email_suffix:function(inputval,mail_houzhui){
		var i=-1;
		var suffix = ["163.com","126.com","sina.com","QQ.com","hotmail.com"]
		$(inputval).keyup(function(){
			var val = $(inputval).val();
			var prefix = (val.indexOf('@') != -1) ? val.split('@')[0] : val;
			$(mail_houzhui).empty();
			$(mail_houzhui).show();
			for(var i=0;i<suffix.length;i++){
				var semail = prefix + "@" + suffix[i];
				if (semail.indexOf(val) != -1) {
				   $(mail_houzhui).show().append("<li>" + semail + "</li>");
				}
			};
			$(mail_houzhui).find("li").hover(function(){
				$(mail_houzhui).find("li").removeClass("hover");
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			});
			$(mail_houzhui).find("li").click(function(){
				$(inputval).siblings("label").hide();
				var allval = $(this).text();
				$(inputval).val(allval);
				$(mail_houzhui).empty().hide();
			});
		});
		function keydownval(){
			var li=$(mail_houzhui).find("li");
			li.removeClass("hover");
				i++;
				li.eq(i).addClass("hover");
			if(i == li.length-1){
				i=-1;
			};
		};
		function keyupval(){
			var li=$(mail_houzhui).find("li");
			if(i == -1){
				i=li.length-1;
				li.eq(i).addClass("hover");
			}
			else{
				li.removeClass("hover");
				i--;
				li.eq(i).addClass("hover");
			}
		};
		$(inputval).keyup(function(event){
			event=event||window.event;
			switch(event.keyCode)
				{
					case 38:keyupval();break;
					case 40:keydownval();break;
					case 13:enterval();break;
					}
			});
		function enterval(){
			var allval = $(mail_houzhui).find("li").eq(i).text();
			$(inputval).val(allval);
			$(mail_houzhui).empty().hide();
		};
		$(document).click(function(){
			$(mail_houzhui).empty().hide();
		});
	}
};