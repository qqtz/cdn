


//action
var mailCode;
var cTime;


// 暂未开放提示
$$('#_fankui').on('click', function () {
		
		bg.toast("暂未开放！");

});
// 暂未开放提示
$$('#_cz').on('click', function () {
		
		bg.toast("暂未开放！");

});

// 暂未开放提示
$$('#_inv').on('click', function () {
		
		bg.toast("暂未开放！");

});



//未登录提醒
$$('#mine-action').on('click', function () {

	if(bg.iuser['login']==false){
	  app.dialog.confirm('是否登录账号？', function () {
	    
	    var logname = bg.get("logname");
	    if(logname != null && logname != ""){
	    	$$("#_logname2").val(logname);
	    	$$("#_logpwd").val(bg.get("pwd"));
	    }
	    
	    app.loginScreen.open(".login-screen");
	    
	    //app.views.main.router.navigate("/login/",{reloadCurrent:true , reloadAll : true});
	    
	  });
	  app.tab.show("#view-home");
	}

});

//注册跳转
$$('#reguser').on('click', function () {
	
	$$('#view-reg').css('display','block');
	$$('#view-login').css('display','none');
	
});

//登录返回
$$('#_loginBack').on('click', function () {
	
	if($$('#view-login').css('display') == "block"){
		app.loginScreen.close(".login-screen");
	}else{
		$$('#view-login').css('display','block');
		$$('#view-reg').css('display','none');
	}
	
});

//账号登陆
$$('#_userLog').on('click', function () {
	
	var user = $$("#_logname2").val();
	var pwd = $$("#_logpwd").val();
	
	if(user == "" || pwd == "" || user.length<6 || pwd.length < 6){
		bg.toast("请填写完整数据");
	}else{
		bg.login(user,pwd);
	}
});

//发送验证码
$$('#sendMail').on('click', function () {
	
	var mail = $$('#_regemail').val();
	
	if(mail == "" || bg.isEmail(mail)==false){
		
		bg.toast("请输入正确的邮箱");
		
	}else{
		
		app.request.post(bg.config['url']+"index.php?Api/sendMail",{email:mail},
			function(data){
				if(data.indexOf("true") != -1){
					bg.toast("发送成功,请注意查收");
					mailCode = data.substring(data.length-32,data.length);
					
					cTime = 30;
					$$("#sendMail").css("pointer-events","none");
					$$("#sendMail").addClass("color-gray");
					_check();

				}else{
					bg.toast("验证码发送失败");
				}
			
			},
			function(){
				bg.toast("验证码发送失败");
			}
			,"text"
		);
		
	}
	
	
});

function _check(){
	
	cTime = cTime-1;
	if(cTime == 0){
		$$('#sendMail').html("发送验证码")
		$$("#sendMail").css("pointer-events","auto");
		$$("#sendMail").removeClass("color-gray");
	}else{
		$$('#sendMail').html(cTime+"秒")
	  myCountdown = setTimeout(function () {
			_check();
	  }, 1000);
	}

}

$$("#buycard").on('click',function(){
	window.location.href = "https://k.1ka123.com/item-VVRNzy.html";
	//plus.runtime.openURL("https://k.1ka123.com/item-VVRNzy.html");
});

//注册账号
$$('#_reguser').on('click', function () {
	
	var mail = $$('#_regemail').val();
	var username = $$('#_username2').val();
	var pwd = $$('#_password').val();
	var pwd2 = $$('#_password2').val();
	var qq = $$('#_qq').val();
	var referee = $$('#_referee').val();
	var code = $$('#_yzcode').val();
	
	if(mailCode == ""){
		bg.toast("请获取验证码");
		return ;
	}
	
	if(mail =="" || username == "" || pwd == "" || pwd2 == "" || qq == ""){
		bg.toast("请填写完整再注册");
		return ;
	}
	
	if(pwd != pwd2){
		bg.toast("两次密码输入不一致");
		return ;
	}
	
	if(code == ""){
		bg.toast("请填写验证码")
		return ;
	}else{
		if(hex_md5(code) != mailCode){
			bg.toast("请填写正确的验证码");
			return ;
		}
	}
	
	
	app.request.post(bg.config['url']+"/index.php?Api/reguser",{email:mail,name:username,pwd:pwd,qq:qq,referee:referee},
		function(data){
			if(data == "注册成功"){
				bg.toast("账号注册成功");
				$$('#view-login').css('display','block');
				$$('#view-reg').css('display','none');
			}else{
				bg.toast(data);
			}
		
		},
		function(){
			bg.toast("发生错误");
		},"text"
	);
	
	
});

//
$$('#_viewuser').on('click', function (e) {
  //console.log("\n1");
  //bg.viewUser();
});

$$('#sz-help').on('click', function (e) {
	app.dialog.alert('28免费提供一种模式杀组合预测，如要使用更多模式及模式统计请购买会员进行使用。<br/><br/>1314回本：杀小双遇到13回本 / 杀大单遇到14回本');
});

$$('#sz-help2').on('click', function (e) {
	app.dialog.alert('由于模式数据量过于庞大，我们只选择前100个数据。模式挑选法则：连中较少(因为这样连起来的几率高)');
});

//监控多个
$('div[id^="tab-0-"]').click(function(){
	bg.tabs($(this).data('id'));
});

//$(".am-flexbox-item").mousedown(function(e){
//	var n = $(this).parent();
//	$(n['context']).addClass("active-state");
//});
//
//$(".am-flexbox-item").mouseup(function(e){
//	var n = $(this).parent();
//	$(n['context']).removeClass("active-state");
//});

//下拉类
$$('#ptr-mine').on('ptr:refresh', function (e) {
	setTimeout(function(){
  		bg.login(bg.get("logname"),bg.get("pwd"),3,e);
  	},300)
});

$$('#ptr-yuce').on('ptr:refresh', function (e) {
  	bg.get28(bg.data28['type']);
});

$$('#ptr-data').on('ptr:refresh', function (e) {
  	bg.get28(bg.data28['type']);
});

$$('#ptr-sz').on('ptr:refresh', function (e) {
  	bg.modeSz(true);
});

//下拉类
$$('#ptr-main').on('ptr:refresh', function (e) {
	
	setTimeout(function(){
		bg.getNotice();
		bg.getPost();
		bg.toast("刷新成功",2000,"icon-zhengque");
		e.detail();
	},500)

});

