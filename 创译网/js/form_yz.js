$.fn.extend({
	valid:function(settings){
		if( !$(this).is("form") ) return;
		var defaultSettings = {
			items		: [],
			isBindSubmit: true,
			alert_tishi		: false,
			rule 		: {
				"truename" : /^[A-Za-z \u0391-\uFFE5]{2,20}$/,//2~20中文，字母 空格
				"intege":/^-?[1-9]\\d*$/, //整数
				"intege1":/^[1-9]\\d*$/, //正整数
				"intege2":/^-[1-9]\\d*$/, //负整数
				"num":/^([+-]?)\\d*\\.?\\d+$/, //数字
				"num1":/^[1-9]\\d*|0$/, //正数（正整数 + 0）
				"num2":/^-[1-9]\\d*|0$/, //负数（负整数 + 0）
				"decmal":/^([+-]?)\\d*\\.\\d+$/, //浮点数
				"decmal1":/^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$/,　　 //正浮点数
				"decmal2":/^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$/,　 //负浮点数
				"decmal3":/^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$/,　 //浮点数
				"decmal4":/^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$/,　　 //非负浮点数（正浮点数 + 0）
				"decmal5":/^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$/,　　//非正浮点数（负浮点数 + 0）
				"email":/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/, //邮件
				"color":/^[a-fA-F0-9]{6}$/, //颜色
				"chinese":/^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$/, //仅中文
				"ascii":/^[\\x00-\\xFF]+$/, //仅ACSII字符
				"zipcode":/^\\d{6}$/, //邮编
				"mobile":/^(13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8})$/, //手机
				"ip4":/^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$/, //ip地址
				"notempty":/^\\S+$/, //非空
				"picture":/^\S+\.(jpg|jpeg|png|JPG|PNG)$/, //图片|bmp|gif|ico|pcx|tif|raw|tga
				"rar":/(.*)\\.(rar|zip|7zip|tgz)$/, //压缩文件
				"qqnum":/^[1-9]*[1-9][0-9]*$/, //QQ号码
				"tel":/^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/, //电话号码的函数(包括验证国内区号,国际区号,分机号)
				"uname":/^\\w+$/, //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
				"letter":/^[A-Za-z]+$/, //字母
				"letter_u":/^[A-Z]+$/, //大写字母
				"letter_l":/^[a-z]+$/, //小写字母
				"idcard":/^[1-9]([0-9]{14}|[0-9]{17})$/, //身份证 
				"mail" : /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
				"url" : /^http[s]?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
				"currency" : /^\d+(\.\d+)?$/,
				"number" : /^\d+$/,
				"int" : /^[0-9]{1,30}$/,
				"double" : /^[-\+]?\d+(\.\d+)?$/,
				"voucher" : /^[a-zA-Z0-9]{10,}$/,
				"username" : /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,20}$/,
				"password" : /^(\w){6,20}$/,
				"safe" : />|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i,
				"dbc" : /[ａ-ｚＡ-Ｚ０-９！＠＃￥％＾＆＊（）＿＋｛｝［］｜：＂＇；．，／？＜＞｀～　]/,
				"qq" : /[1-9][0-9]{4,}/,
				"date" : /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/, 
				//日期
				"telephone" : /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
				"fax" : /^(\d{3,4}-)?\d{7,8}$/,//传真
				"bodycard" : /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,//身份证
				"ip" : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,

				// 函数规则
				"eq": function(arg1,arg2){ return arg1==arg2 ? true:false;},
				"gt": function(arg1,arg2){ return arg1>arg2 ? true:false;},
				"gte": function(arg1,arg2){ return arg1>=arg2 ? true:false;},
				"lt": function(arg1,arg2){ return arg1<arg2 ? true:false;},
				"lte": function(arg1,arg2){ return arg1<=arg2 ? true:false;}
			}
		};
		settings = $.extend(defaultSettings,settings);
		var msg = "", formObj = $(this) , checkRet = true, isAll,
		tipname = function(namestr){ return "tip_" + namestr.replace(/([a-zA-Z0-9])/g,"-$1")},
		spechars = function(namestr){ return namestr.replace("[]","")};

		//规则类型匹配检测
		typeTest = function(){
			var result = true,args = arguments;
			if(settings.rule.hasOwnProperty(args[0])){
				var t = settings.rule[args[0]], v = args[1];
				result = args.length>2 ? t.apply(arguments,[].slice.call(args,1)):($.isFunction(t) ? t(v) :t.test(v));
			}
			return result;
		},

		//错误信息提示
		showError = function(fieldObj,filedName,warnInfo){
			checkRet = false;
			var tipObj = $("#"+tipname(spechars(filedName)));
			if(tipObj.length>0) tipObj.remove();
			if (fieldObj.is(":text") || fieldObj.is(":password"))
			{
				fieldObj.removeClass().addClass("input_tishi");
			}
			if(fieldObj.is(":checkbox") && !fieldObj.is(":checked")){
				var parentObj = fieldObj.parent().parent().parent();
			}else if(fieldObj.last().is(":checkbox") && fieldObj.last().is(":checked") && fieldObj.prev().is(":text") && fieldObj.prev().val().length <= 0){
				var parentObj = fieldObj.parent().parent().parent();
			}else{
				var parentObj = fieldObj.parent().parent();
			}
			parentObj.append("<li class='tishi' id='"+tipname(spechars(filedName))+"'><span class='cuo icon_png'></span>"+warnInfo+"</li>");
			if(settings.alert_tishi && isAll) msg += "\n" + warnInfo;
		},
		//正确信息提示
		showRight = function(fieldObj,filedName,SuccessInfo){
			var tipObj = $("#"+tipname(spechars(filedName)));
			if(tipObj.length>0) tipObj.remove();
			if (!SuccessInfo) SuccessInfo = '';
			if (fieldObj.is(":text") || fieldObj.is(":password"))
			{
				fieldObj.removeClass().addClass("input_moren");
			}
			if(fieldObj.is(":checkbox") && fieldObj.is(":checked")){
				var parentObj = fieldObj.parent().parent().parent();
			}else{
				var parentObj = fieldObj.parent().parent();
			}
			parentObj.append("<span class='duihao' id='"+tipname(spechars(filedName))+"'> "+ SuccessInfo +" </span>");
		},

		//focus时提示
		showExp = function(obj){
			var i = obj, fieldObj = $("[name='"+i.name+"']",formObj[0]);
			var tipObj = $("#"+tipname(spechars(i.name)));
			if(tipObj.length>0) tipObj.remove();
			if (i.focusMsg){
				if(fieldObj.is(":checkbox") && !fieldObj.is(":checked")){
					var parentObj = fieldObj.parent().parent().parent();
				}else{
					var parentObj = fieldObj.parent().parent();
				}
				parentObj.append("<span class='tanhao' id='"+tipname(spechars(i.name))+"'>"+ i.focusMsg +"</span>");
			}
		},

		//匹配对比值的提示名
		findTo = function(objName){
			var find;
			$.each(settings.items, function(){
				if(this.name == objName && this.simple){
					find = this.simple;	return false;
				}
			});
			if(!find) find = $("[name='"+objName+"']")[0].name;
			return find;
		},
		//ajax验证
		ajax = function (obj,fv,field){
			var i = obj, fieldObj = $("[name='"+i.name+"']",formObj[0]);
			var tipObj = $("#"+tipname(i.name));
			if(tipObj.length>0) tipObj.remove();
			var tipPosition = fieldObj.next().length>0 ? fieldObj.nextAll().eq(this.length-1):fieldObj.eq(this.length - 1);
			tipPosition.after("<span class='tanhao' id='"+tipname(i.name)+"'>检测中......</span>");
			fv = encodeURI(fv);
			$.get(obj.ajax.url + "/" + obj.name + "/" + fv,function(data){
				if (data == 1){
					showRight(field,obj.name,obj.ajax.success_msg);
				}
				else if(data == 0){
					showError(field ,obj.name, obj.ajax.failure_msg);
				}
			});
		},

		//单元素验证
		fieldCheck = function(item){
			var i = item, field = $("[name='"+i.name+"']",formObj[0]);

			if(!field[0]) return;

			var warnMsg,
				fv = field.val();//$.trim(field.val()),
				isRq = typeof i.require ==="boolean" ? i.require : true;

			if((field.is(":text") || field.is(":password")) && $.trim(fv) == "")
			{
				warnMsg =  i.notnull ? i.notnull+'不能为空' : '必填项';
				showError(field ,i.name, warnMsg);
			}
			else if(field.is(":file") && $.trim(fv) == "")
			{
				warnMsg =  i.notnull+'未上传';
				showError(field ,i.name, warnMsg);
			}
			else if( isRq && ((field.is(":radio")|| field.is(":checkbox")) && !field.is(":checked")))
			{
				if(field.last().is(":checkbox") && !field.last().is(":checked") && field.prev().is(':text'))
				{
					field.prev().val('');
					field.prev().hide();
				}
				warnMsg =  i.message|| " " + i.simple;
				showError(field ,i.name, warnMsg);
			}
			else if (isRq && fv == "" )
			{
				warnMsg =  i.message|| ( field.is("select") ? " " :" " ) + i.simple;
				showError(field ,i.name, warnMsg);
			}
			else if(fv != "")
			{
				if(i.min || i.max){
					var len = fv.length, min = i.min || 0, max = i.max;
					warnMsg =  i.message || (max? i.simple + "长度范围应在"+min+"~"+max+"之间":i.simple + "长度应大于"+min);

					if( (max && (len>max || len<min)) || (!max && len<min) ){
						showError(field ,i.name, warnMsg);	return;
					}
				}

				if(i.type){
					var matchVal = i.to ? $.trim($("[name='"+i.to+"']").val()) :i.value;
					var matchRet = matchVal ? typeTest(i.type,fv,matchVal) :typeTest(i.type,fv);

					warnMsg = i.message|| i.simple;
					//if(matchVal && i.simple) warnMsg += (i.to ? findTo(i.to) +"的值" :i.value);

					if(!matchRet) {
						showError(field ,i.name, warnMsg);return;
					}else {
						showRight(field,i.name);
					}

				}

				if (i.ajax)
				{
					$.ajaxSetup({
					  async: !isAll // false使用同步方式执行AJAX，true使用异步方式执行ajax
					});
					ajax(i,fv,field);
				}
				else
				{
					if(field.last().is(":checkbox") && field.last().is(":checked"))
					{
						field.prev().show();
						if(field.prev().is(':text') && field.prev().val().length <= 0){
							field.prev().bind("blur", function(){
							  fieldCheck(this);
							});
							showError(field ,i.name, "其他未填写");
						}else{
							showRight(field,i.name);
						}
					}else{
						showRight(field,i.name);
					}
				}
			}
		},
		//元素组验证
		validate = function(){
			checkRet = true;
			$.each(settings.items, function(){
				isAll=true; fieldCheck(this);
			});
			if(settings.alert_tishi && msg != ""){
				alert(msg);	msg = "";
			}
			return checkRet;
		};
		//单元素事件绑定
		$.each(settings.items, function(){
			var field = $("[name='"+this.name+"']",formObj[0]);
			var obj = this,
			toExp = function(){showExp(obj);},
			toCheck = function(){ isAll=false; fieldCheck(obj);};
			if(field.is(":file") || field.is("select")){
				field.change(toCheck).focus(toExp);
			}else if(field.is(":radio") || field.is(":checkbox")){
				field.next().click(toCheck).focus(toExp);
			}else{
				field.blur(toCheck).focus(toExp);
			}
		});
		//提交事件绑定
		if(settings.isBindSubmit) {
			$(this).submit(validate);
		}else{
			return validate();
		}
	}
});