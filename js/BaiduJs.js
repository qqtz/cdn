(function(){
	
	
	bg = function(){
		
	}
	
	bg.iuser = {
		login: false,
		money:[],
		ScoreLog:[],
		config:'',
		token:'',
		id:' 请登录 '
	};
	
	bg.data28 = {
		data:[],
		n50:[],
		spacing:"",
		yuce:"",
		result:"",
		type:"",
		countDown:0,
		nowissue:0,
		myCountdown:"",
		dayCount:0,
		
	};
	
	bg.pk10 = {
		data:[],
		countDown:0,
		mode:1,
		sf:1,
		yuce:[],
	}
	
	bg.yuce = {
		mode:1,
		sf:1,
		type:1,
		yuce:[],
		result:[],
		nissue:20,//需要期数
		t:0,//正确次数
		nsf:"1+7+11|3+5+9|5+7+9",
		ntab:"1",
		finit:false,
		fplan:0,
		fsort:1,
		fissue:0,
		nrec:false,
		nlz:0,
	}

	bg.fdata = [];
	
	bg.mode = {
		mode:'大单 大双 小单 小双 小双',
		money:'300 300 300 300 300',
		sort:1,
		modeData:[],
		tdata:false,
	};
	
	//初始化
	
	bg.init = function(){

		bg.checkCookie();
		
		//是否初始化
		if(bg.get("config") != "true"){
			
			var width = document.documentElement.clientWidth;
			if(width < 375){
				bg.set("showLottery","false");
			}else{
				bg.set("showLottery","true");
			}
			
			bg.set("autoRef","true");
			bg.set("waveColor","true");
			bg.set("showTime","true");
			bg.set("lotNotice","false");
			
			bg.set("config","true");
		}
		
		bg.config['showLottery'] = bg.get("showLottery");
		bg.config['autoRef'] = bg.get("autoRef");
		bg.config['showTime'] = bg.get("showTime");
		bg.config['lotNotice'] = bg.get("lotNotice");
		bg.config['waveColor'] = bg.get("waveColor");
		
		bg.regTp7();

		//自动登录
		if(bg.get("autoLog") == "true"){
			var logname = bg.get("logname");
			var logpwd = bg.get("pwd");
			
			bg.login(logname,logpwd,2);
		}
		
//		bg.getNotice();
//		bg.getPost();
		
		var nhour = new Date().getHours();
		
		/* if(nhour > 8){
			bg.data28['type'] = "pc28";
		}else{ */
			bg.data28['type'] = "jnd28";
			$$("#_jnd28").addClass("tab-link-active");
			$$("#_pc28").removeClass("tab-link-active");
			$("#lottery-img").attr('src',"img/jnd.png");
		// }
		
		$("#indexContent").html(bg.iuser['config']['indexContent']);
		$("#yuceContent").html(bg.iuser['config']['yuceContent']);
		bg.get28(bg.data28['type']);
	}
	
	bg.Switch = function(id){
		var isChecked = !$$('#'+id).is(":checked");
		bg.set(id,isChecked);
		bg.config[id] = bg.get(id);
	}
	
	bg.modSwitch = function(id){
		var is = bg.get(id);
		if(is == 'true'){
			bg.set(id,'false');
		}else{
			bg.set(id,'true');
		}
		
		bg.config[id] = bg.get(id);
		
		bg.get28(bg.data28['type']);
	}
	
	//
	bg.s = function(){
		app.preloader.show();
	}
	
	bg.h = function(){
	  setTimeout(function () {
	    app.preloader.hide();
	  }, 200);
	}
	
	bg.regTp7 = function(){
		
		//公告标签
		Template7.registerHelper('tags1', function (tag){
		  if(tag == ""){
		  	return "";
		  }
		  if(tag.indexOf(",") != -1){
			  var ret = tag.split(",");
			  var re = "";
			  
			  for(i=0;i<ret.length;i++){
			  	re +='<div class="badge-post '+bg.tagsType(ret[i])+'">'+ret[i]+'</div>';
			  }
			  return re;
		  }
		  
		  return '<div class="badge-post '+bg.tagsType(tag)+'">'+tag+'</div>';
		  
		});
		
		//公告链接
		Template7.registerHelper('link', function (link){
			
		  if(link == ""){
		  	return "";
		  }
		  
		  return "bg.open('"+link+"')";
		});
		
		//表格日期
		Template7.registerHelper('tableDate', function (date){
			
		  if(bg.config['showTime'] == "true"){
		  	return "<td class='lottery-font'>"+date.substr(6,5)+"</td>";
		  }
		  
		  return "";
		});
		
		//表格日期
		Template7.registerHelper('tdate', function (ndate){
		  return ndate.substr(0,10);
		});
		
		//开奖信息
		Template7.registerHelper('lottery', function (c1,c2,c3,c4){
			
		  if(bg.config['waveColor'] == "true"){
		  	c4 = "<span class='bose "+bg.BsStyle(c4)+"'>"+c4+"</span>";
		  }
			
		  if(bg.config['showLottery'] == "true"){
		  	return c1+" + "+c2+" + "+c3+" = "+c4;
		  }
		  
		  return c4;
		});
		
		//充值余额记录 //2022-3-25
		Template7.registerHelper('moneylog', function (data){
			
			bg.s();

			bg.getmoney();
			
			bg.h();
			
			data1 = bg.iuser['money'];
			data2 = data1.data.data;
			console.log(data2);
			if(data2.length == 0){
				return '<div class="empty-content"><i class="icon iconfont icon-wujieguo1"></i> <div class="text"><span>暂无记录</span></div></div>';
			}
			
			var str = "";
			
			for(i = 0;i < data2.length;i++){
				
				var dayStr = "";
				if(data2[i]['memo'] != null){
					title = data2[i]['memo'];
					afterClass = "c-r";
				}
				if(data2[i]['money'] > 0){
					money = "+";
				}else{
					money = "";
				}
				// else if(data2[i]['type'] == 3){
					// title = "推荐获得";
					// afterClass = "c-b";
				// }else if(data2[i]['type'] == 4){
					// title = "开通会员";
					// afterClass = "c-r";
					// dayStr = "天";
				// }
				time = bg.date(data2[i]['createtime']);
				
				str += "<li>";
		    	str += "<div class='item-content moneylog-list'>";
		        str += "<div class='item-inner'>";
		        str += "  <div class='item-title'>" + title;
		        str += "    <div class='item-footer'>"+time+"</div>";
		        str += "  </div>";
				
		        str += "  <div class='item-title "+afterClass+"'>"+money+data2[i]['money']+dayStr;
				str += " <div class='item-footer'>"+"余额："+data2[i]['after']+"</div>";//当前余额
				str += "  </div>";
				
		        str += "</div>";
		     	str += "</div>";
		    	str += "</li>";
		    	
			}

			return str;

		});
		
			//积分记录
		Template7.registerHelper('ScoreLog', function (data){
			
			bg.s();

			bg.ScoreLog();
			
			bg.h();
			
			data1 = bg.iuser['ScoreLog'];
			data2 = data1.data.data;
			console.log(data2);
			if(data2.length == 0){
				return '<div class="empty-content"><i class="icon iconfont icon-wujieguo1"></i> <div class="text"><span>暂无记录</span></div></div>';
			}
			
			var str = "";
			
			for(i = 0;i < data2.length;i++){
				
				var dayStr = "";
				if(data2[i]['memo'] != null){
					title = data2[i]['memo'];
					afterClass = "c-r";
				}
				if(data2[i]['score'] > 0){
					score = "+";
				}else{
					score = "";
				}
				// else if(data2[i]['type'] == 3){
					// title = "推荐获得";
					// afterClass = "c-b";
				// }else if(data2[i]['type'] == 4){
					// title = "开通会员";
					// afterClass = "c-r";
					// dayStr = "天";
				// }
				time = bg.date(data2[i]['createtime']);
				
				str += "<li>";
		    	str += "<div class='item-content ScoreLog-list'>";
		        str += "<div class='item-inner'>";
		        str += "  <div class='item-title'>" + title;
		        str += "    <div class='item-footer'>"+time+"</div>";
		        str += "  </div>";
				
		        str += "  <div class='item-title "+afterClass+"'>"+score+data2[i]['score']+dayStr;
				str += " <div class='item-footer'>"+"余额："+data2[i]['after']+"</div>";//当前余额
				str += "  </div>";
				
		        str += "</div>";
		     	str += "</div>";
		    	str += "</li>";
		    	
			}

			return str;

		});

		//结果页
		Template7.registerHelper('empty', function (data,tip){
			
			if(data == "feedback"){
				var str = '<div class="title"><span>提交成功</span></div>';
				str += '<div class="text"><span>如被采纳会奖励一定雪币</span></div>';
			}

			if(data == "rec"){
				var str = '<div class="title"><span>充值成功</span></div>';
				str += '<div class="text"><span>'+tip+'</span></div>';
			}
		    
		    return str;
		});
		
		//邀请ID
		Template7.registerHelper('invite', function (data){
		    return bg.iuser['id'];
		});
		
		
	}
	
	bg.tagsType = function(type){
		if(type == "公告"){
			return "";
		}
		if(type == "活动" || type == "福利" || type == "推荐" || type == "新" || type == "置顶"){
			return "badge-orange";
		}
		if(type.indexOf("打开") != -1 || type.indexOf("点击") != -1){
			return "badge-link";
		}
		
		return "";
	}
	
	//用户
	
	bg.userData = function(data,zhi){
		// console.log(zhi.data.userinfo);
		for(i=0;i<data.length;i++){
			bg.iuser[data[i]] = zhi.data.userinfo[data[i]];
		}
		// console.log(bg.iuser); //调试数据
	}
	
	bg.viewData = function(data, j = ""){
		
		for(i=0;i<data.length;i++){
			$$("#"+j+"_"+data[i]).html(bg.iuser[data[i]]);
			// var ceshi = $$("#"+j+"_"+data[i]).html(bg.iuser[data[i]]);
			// console.log(ceshi);
		}
		$$("#_avatar").attr("src",""+bg.iuser.avatar);
		// console.log(bg.iuser.avatar);
		// console.log(ceshi);
	}
		
	bg.setUser = function(data,zhi){
		bg.iuser[data] = zhi;
	}

	
	bg.config = {
		url:"http://api.jndapp.com/",
		login:"http://api.pcjnd.com/"
		
	}
	
	bg.setUrl = function(){
		
	}
	
	//检查
	bg.checkCookie = function(){
		if(window.plus){
			bg.iuser['cookie'] = false;
		}else{
			bg.iuser['cookie'] = true;
		}
	}
	//配置保存
	bg.set = function(c_name,value){
		
		if(bg.iuser['cookie'] == false){
			plus.storage.setItem(""+c_name,""+value);
			return ;
		}
		
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+30);
		document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString();
	}
	
	bg.get = function (c_name){
		
		if(bg.iuser['cookie'] == false){
			//console.log(plus.storage.getItem(c_name));
			return plus.storage.getItem(c_name);
		}
		
		
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1){ 
		    	c_start=c_start + c_name.length+1 ;
		    	c_end=document.cookie.indexOf(";",c_start);
		    	if (c_end==-1) c_end=document.cookie.length;
		    	return unescape(document.cookie.substring(c_start,c_end));
		    } 
		}
		return "";
	}
	
	
	
	bg.intEvl = function (math){
		if(math<10){return "0"+parseInt(math);}else{return math;}
	}
	
	//弹出提示
	bg.toast = function (msg,time = 2000,icon = ""){
		if(msg == ""){return ;}
		
		var toastCenter = app.toast.create({
		  icon: icon != '' ? "<i class='icon iconfont "+ icon +"'></i>" : '',
		  text: msg,
		  position: 'center',
		  closeTimeout: time,
		});
		toastCenter.open();
	}
	
	//消息通知
	bg.plusMsg = function(){
		
		var options = {cover:false,title:"暴雪28开奖通知"};
		var now = bg.data28['data'][0];
		var zuhe = bg.GetZh(now['c4']);
		var str = "第"+now['issue']+"期 已开奖："+now['c1']+"+"+now['c2']+"+"+now['c3']+"="+now['c4']+""+zuhe+"\n暴雪28提示";
		if(window.plus){
			plus.push.createMessage( str, "LocalMSG", options);
		}
		
	}
	
	//获取余额记录
	bg.getmoney = function(){
//		app.request.post(bg.config['url']+"index.php?Api/getRecord",{id:bg.user['id']},
//			function(data){
//				bg.user['record'] = data;
//			},
//			function(){
//				bg.toast("获取积分数据失败",2000,"icon-delete");
//			}
//		,"json"
//		);
		$.ajax({
			url:bg.config['login']+"user/moneylog",
			type: "post",
			data:{token:bg.iuser['token']},
			dataType: "json",
			async:false,
			success: function(data) {
				bg.iuser['money'] = data;
			},
			error: function(){
				bg.toast("获取余额记录失败",2000,"icon-delete");
			}
		});
	}
	
		//获取积分记录
	bg.ScoreLog = function(){
		
		$.ajax({
			url:bg.config['login']+"user/ScoreLog",
			type: "post",
			data:{token:bg.iuser['token']},
			dataType: "json",
			async:false,
			success: function(data) {
				bg.iuser['ScoreLog'] = data;
			},
			error: function(){
				bg.toast("获取积分记录失败",2000,"icon-delete");
			}
		});
	}
	
	
	bg.callback = function(data){
		console.log(data);
		return data;
	}
	
	//首次读取
	bg.getContent = function(){
			
		$.ajax({
		    
			url:bg.config['login']+"demo/api",
			type: "post",
			dataType: "jsonp",
			jsonp: "callback",
			async:false,
			
			success: function(data) {
				bg.iuser['config'] = data['config'];
				
				 if(app.version > data['config']['ver']){
					mainView.router.navigate("/verUp/"+data['config']['verMsg']);
					$$(".toolbar").css("display","none");
					return ;
				} 
				
				bg.init();
// 			console.log(data);
				//  bg.iuser['notice'] = data['notice'];
				// bg.tp7("#noticeTp",data['notice'],"#noticeList");
				
				// bg.iuser['post'] = data['post'];
				// bg.tp7("#postTp",data['post'],"#postList");
				
				// if(data['config']['indexMsg'] != ""){
				// 	app.dialog.alert(data['config']['indexMsg']);
				// } 
			},
			
			error: function(){
				bg.toast("初始化失败，请联系管理员解决");
				bg.setUrl();
			}
		});
		
	}

	
	//获取公告数据
	bg.getNotice = function(){
		
		/* $.ajax({
			url:bg.config['url']+"index.php?Api/getnotice",
			type: "post",
			dataType: "json",
			success: function(data) {
				bg.iuser['notice'] = data;
				
				bg.tp7("#noticeTp",data,"#noticeList")
			},
			error: function(){
				bg.toast("加载公告失败");
			}
		}); */
		
	}
	
	//获取文章数据
	bg.getPost = function(id = 0){
		
		/* $.ajax({
			url:bg.config['url']+"index.php?Api/getpost",
			type: "post",
			data: {id:id,type: id == 0 ? 0 : 1},
			dataType: "json",
			success: function(data) {
				bg.iuser['post'] = data;
				
				bg.tp7("#postTp",data,"#postList")
			},
			error: function(){
				bg.toast("加载文章失败");
			}
		}); */
		
	}
	
	bg.getPostContent = function(id){
		if(id == null || id <= 0){
			return 0;
		}
		var ndata = "";
		$.ajax({
			url:bg.config['url']+"index.php?Api/getpost",
			type: "post",
			data:{id:id,type:1},
			dataType: "json",
			async:false,
			success: function(data) {
				ndata = data;
			},
			error: function(){
				app.tab.show("#view-home");
				bg.toast("获取失败",2000,"icon-delete");
			}
		});
		return ndata;
	}
	
	//输出模板
	bg.tp7 = function(tp7,data,viewid){
		
		var template = $$(tp7).html();
		var compiledTemplate = Template7.compile(template);
		var context = {
		    data: data,
		};
		
		var html = compiledTemplate(context);
		
		$$(viewid).html(html);
	}
	
	// 获取 =========
	
	bg.dataArray = function(){
		var dataArray = [];
		var data = bg.data28['data'];
		
		bg.data28['spacing'] = data['math'];
		bg.data28['countDown'] = data['countDown'];
		
		if(bg.data28['nowissue'] != 0 && bg.data28['nowissue'] != data[0]['issue']){
			bg.data28['nowissue'] = data[0]['issue'];
			if(bg.config['lotNotice'] == "true"){
				bg.plusMsg();
				//开奖通知9
			}
			
			if(bg.mode['tdata'] == true){//
				$.ajax({
					url:bg.config['url']+"apix?token=FE06E1A0BAF35F7B&code="+bg.data28['type']+'mode'+"&rows=100&format=json",
					type: "get",
					success: function(idata) {
						bg.mode['modeData'] = idata;
						$("#mode-data").html(bg.modeCollation(bg.mode['modeData']));
						console.log("数据已更新")
					}
				});
			}
		}
		
		bg.data28['nowissue'] = data[0]['issue'];
		bg.data28['dayCount'] = data['daycount'];
		
		issue = parseInt(data[0]['issue'])+1;
		$$("#nowissue").html(issue);
		
		var chartStr = "";
		for(i=0;i<50;i++){
			bg.data28['n50'][i] = data[i];
			if(i < bg.yuce['nissue']){
				dataArray[i] = data[i];
				dataArray[i]['yc'] = bg.yuce['yuce'][i];
				dataArray[i]['result'] = bg.yuce['result'][i];
			}
			
			//chart
			chartStr += "<tr>";
			chartStr += "<td>"+data[i]['issue'].substr(-3,3)+"</td><td>"+data[i]['c4']+"</td>";
			
			if(bg.GetDx(data[i]['c4']) == "大"){
				chartStr += "<td><span class='badge bgcr'>大</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetDx(data[i]['c4']) == "小"){
				chartStr += "<td><span class='badge bgcb'>小</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetDs(data[i]['c4']) == "单"){
				chartStr += "<td><span class='badge bgcb'>单</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetDs(data[i]['c4']) == "双"){
				chartStr += "<td><span class='badge bgcr'>双</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetZh(data[i]['c4']) == "大单"){
				chartStr += "<td><span class='badge badges bgcb'>大单</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetZh(data[i]['c4']) == "大双"){
				chartStr += "<td><span class='badge badges bgcr'>大双</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetZh(data[i]['c4']) == "小单"){
				chartStr += "<td><span class='badge badges bgcb'>小单</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			if(bg.GetZh(data[i]['c4']) == "小双"){
				chartStr += "<td><span class='badge badges bgcr'>小双</span></td>";
			}else{
				chartStr += "<td></td>";
			}
			
			chartStr += "</tr>";
		}
		
		$$("#chartData").html(chartStr);
		var lack = data['math'];
		
		$$("#lackda").html(lack['da']);
		$$("#lackx").html(lack['xiao']);
		$$("#lackd").html(lack['dan']);
		$$("#lacks").html(lack['shuang']);
		$$("#lackdd").html(lack['dd']);
		$$("#lackds").html(lack['ds']);
		$$("#lackxd").html(lack['xd']);
		$$("#lackxs").html(lack['xs']);
		
		return dataArray;
	}
	
	//倒计时
	bg.countDown = function(){
		bg.data28['countDown']--;
		
		if(bg.data28['countDown'] < 0){
			
        	$("#ptime").css('display','none');
        	$("#ctime").css('display','block');
			
			if(bg.config['showTime'] == "true"){
				$$("#nowdate").html("...");
			}else{
				$$("#countdown").html("...");
			}
			
			if(bg.config['autoRef'] == "true"){
				if(Math.abs(bg.data28['countDown']) % 10 == 0){
					setTimeout(function () {
						bg.get28(bg.data28['type']);
					}, 1000);
				}
			}
		}else{
			if(bg.config['showTime'] == "true"){
				$$("#nowdate").html(bg.data28['countDown']+"s");
			}else{
				$$("#countdown").html(bg.data28['countDown']+"s");
			}
			
		    var theTime = parseInt(bg.data28['countDown']);
		    var theTime1 = 0;
		    var theTime2 = 0;
			//数据页
		    if(theTime > 60) {
		        theTime1 = parseInt(theTime/60);
		        theTime = parseInt(theTime%60);
	            if(theTime1 > 60) {
		            theTime2 = parseInt(theTime1/60);
		            theTime1 = parseInt(theTime1%60);
	            }
		        
		    }
		    
	        if(theTime2 > 0) {
	        	$$("#time_f").html("时");
	        	$$("#time_sc").html("分");
	        	$$("#time_m").html(parseInt(theTime2));
	        	$$("#time_s").html(parseInt(theTime1));
	        	
	        }else{
	        	$$("#time_m").html(parseInt(theTime1));
	        	$$("#time_s").html(parseInt(theTime));

	        }
	        
        	$("#ptime").css('display','block');
        	$("#ctime").css('display','none');
			

		}
		
	    bg.data28['myCountdown'] = setTimeout(function () {
	        bg.countDown();
	    }, 1000);
		

	}
	
	//开奖获取
	bg.get28 = function(type){
		
		bg.data28['type'] = type;
		
		app.request.get(bg.config['url']+"apix?token=FE06E1A0BAF35F7B&rows=100&format=json",{code:type},
			function(data){
				
				bg.data28['data'] = data;
				bg.yuceData();
				
				data = bg.dataArray();
				
				if(bg.config['showTime'] == "false"){
					$$("#ndate").hide();
					$$("#nowdate").hide();
				}else{
					$$("#countdown").html("?");
					$$("#ndate").show();
					$$("#nowdate").show();
				}
				
				//
				$("#nissue").html(data[0]['issue']);
				$("#c1").html(data[0]['c1']);
				$("#c2").html(data[0]['c2']);
				$("#c3").html(data[0]['c3']);
				$("#c4").html(data[0]['c4']);
				$("#c5").html(bg.GetDx(data[0]['c4']));
				$("#c6").html(bg.GetDs(data[0]['c4']));
				
				if(bg.GetDx(data[0]['c4']) == "大"){
					$("#c5").attr("class","bgcr bg-r");
				}else{
					$("#c5").attr("class","bgcb bg-r");
				}
				
				if(bg.GetDs(data[0]['c4']) == "单"){
					$("#c6").attr("class","bgcb");
				}else{
					$("#c6").attr("class","bgcr");
				}
				
				bg.tp7("#yuceTp",data,"#yuceData");
				bg.tp7("#lotteryTp",bg.data28['n50'],"#lotteryData");
				
				app.ptr.done("#ptr-yuce");
				app.ptr.done("#ptr-data");
				
				bg.lackData();
				
				bg.modeSz();
				
				bg.toast("刷新成功",300);
				
				clearInterval(bg.data28['myCountdown']);
				
				bg.countDown();
			},
			function(){
				bg.toast("连接服务器失败");
			}
		,"json"
		);
	}
	
	//间隔数据
	bg.lackData = function(){
		
		var data = bg.data28['data']['math'];
		
		var str = "";
		
		str += bg.lackStyle("单",data['dan'],0);
		str += bg.lackStyle("双",data['shuang'],1);
		str += bg.lackStyle("大",data['da'],0);
		str += bg.lackStyle("小",data['xiao'],1);
		str += bg.lackStyle("大单",data['dadan'],0);
		str += bg.lackStyle("大双",data['dashuang'],1);
		str += bg.lackStyle("小单",data['xiaodan'],0);
		str += bg.lackStyle("小双",data['xiaoshuang'],1);
		str += bg.lackStyle("极大",data['jida'],0);
		str += bg.lackStyle("极小",data['jixiao'],1);
		str += bg.lackStyle("豹子",data['baozi'],0);
		str += bg.lackStyle("对子",data['duizi'],1);
		
		for(i = 0;i<28;i++){
			str += bg.lackStyle(i,data["t"+i],i%2);
		}
		$$("#lackData").html(str);
	}
	
	bg.lackStyle = function(content,lack,n){
		var _q = "";
		var _h = "";
		var _j = "";
		var _color = "";
		
		if(content.length>1){
			_j = "badges";
		}
		
		if(n == 0){
			_c = "bgcb";
			_q = "<tr>";
		}else{
			_c = "bgcr";
			_h = "</tr>"
		}
		
		if(lack >= 30){
			_color = "color:#f24439";
		}
		
		return _q+"<td><span class='badge "+_c+" "+_j+"'>"+content+"</span></td><td>未开 <span style='"+_color+"'>"+lack+"</span> 期</td>"+_h;
	}
	
	
	//API
	bg.login = function (user,pwd,mode = 1,e = 0){
		
		// $.ajax({
		// 	url:bg.config['url']+"index.php?Api/login",
		// 	type: "post",
		// 	data:{user:user,pwd:pwd},
		// 	dataType: "json",
		// 	async:false,
		// 	success: function(data) {
				
		// 		if(data.indexOf("logintrue") != -1){
		// 			if(mode == 1){
		// 				bg.toast("登录成功");
		// 			}
					
		// 			data = JSON.parse(data);
					
		// 			bg.user['login'] = true;
					
		// 			if(parseInt(data['endtime']) > parseInt(bg.gettimeStamp())){
		// 				endDay = Math.round((parseInt(data['endtime']) - parseInt(bg.gettimeStamp()))/86400);
		// 				bg.setUser("endDay",endDay);
		// 				bg.setUser("isvip","true");
						
		// 				$$("#_vip").html("VIP会员");
		// 				$$("#_vip").attr("class","user-type color-red");
		// 			}else{
		// 				bg.setUser("endDay","0");
		// 				bg.setUser("isvip","false");
		// 				$$("#_vip").html("普通会员");
		// 				$$("#_vip").attr("class","user-type color-gray");
		// 			}
					
		// 			bg.userData(["id","logname","username","email","qq","lebi","integral","endtime","rectotal","exttotal"],data);
					
		// 			bg.viewData(["username","logname","lebi","endDay"]);
					
		// 			app.loginScreen.close(".login-screen");
					
		// 			//
		// 			//bg.getintRecord();
					
		// 			bg.set("logname",user);
		// 			bg.set("pwd",pwd);
					
		// 			if(mode == 1){
		// 				if($$("input[name='toggle']:checked").val() == "yes"){
		// 					bg.set("autoLog","true");
		// 				}else{
		// 					bg.set("autoLog","false");
		// 				}
		// 			}
					

		// 		}else{
					
		// 			bg.toast("错误"+data);
					
		// 		}
				
		// 		if(mode ==3){
		// 			bg.toast("刷新成功",2000,"icon-zhengque");
		// 			e.detail();
		// 		}
		// 	},
		// 	error: function(){
		// 		bg.toast("登录出现错误,请联系客服");
		// 		if(mode == 3){
		// 			e.detail();
		// 		}
		// 	}
		// });
		
		app.request.post(bg.config['login']+"user/login",{account:user,password:pwd},
			function(data){
				data = JSON.parse(data);
				if(data.data != null){
					if(mode == 1){
						bg.toast("登录成功");
					}
					bg.iuser['login'] = true;
					
					// data = JSON.parse(data);
					bg.iuser['token'] = data.data.userinfo.token;  //添加token
					vipinfo = data.data.vipInfo;

					if(vipinfo != null){
						
					var endtime = new Date((vipinfo.expiredate.replace(/-/g, "/"))); //格式化时间成ios兼容
                     var endtime = Math.floor((new Date(endtime)).valueOf() / 1000); //
                     
					if(parseInt(endtime) > parseInt(bg.gettimeStamp())){
						endDay = Math.round((parseInt(endtime) - parseInt(bg.gettimeStamp()))/86400);
						bg.setUser("endDay",endDay);
						bg.setUser("isvip","true");
						bg.setUser("endtime",endtime);
						$$("#_vip").html("VIP会员");
						$$("#_vip").attr("class","user-type color-red");
					 }	
					}
					else{
						bg.setUser("endDay","0");
						bg.setUser("isvip","false");
						bg.setUser("endtime",bg.gettimeStamp());
						$$("#_vip").html("普通会员");
						$$("#_vip").attr("class","user-type color-gray");
					}
					console.log(bg.iuser);
					// var ceshi = data.data.userinfo.avatar;
					// // console.log(ceshi);
					// avatar = Base64.decode(ceshi);
					
					// bg.setUser("avatar",avatar);
					// console.log(avatar);
					bg.userData(["avatar","id","nickname","username","email","qq","money","score","rectotal","exttotal"],data);
					
					
					bg.viewData(["username","nickname","money","endDay","avatar"]);
					
					app.loginScreen.close(".login-screen");
					
					//
					//bg.getintRecord();
					
					bg.set("logname",user);
					bg.set("pwd",pwd);
					
					if(mode == 1){
						if($$("input[name='toggle']:checked").val() == "yes"){
							bg.set("autoLog","true");
						}else{
							bg.set("autoLog","false");
						}
					}
					

				}else{
					// data = JSON.parse(data);
					bg.toast(data.msg);
				}
				
				if(mode ==3){
					bg.toast("刷新成功",2000,"icon-zhengque");
					e.detail();
				}
			
			},
			function(){
				bg.toast("登录出现错误,请联系客服");
				if(mode == 3){
					e.detail();
				}
			}
			,"text"
		);
		
	}
	

	bg.gettimeStamp = function(){
		
		var timeStamp = new Date().getTime().toString();
		return timeStamp.substr(0,10);
		
	}
	
	
    bg.date = function (nS) { 
		var newDate = new Date();
		newDate.setTime(nS * 1000);
		return newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    } 
	
	bg.outLogin = function(){
	  app.dialog.confirm('您确定要退出吗？','暴雪28提示', function () {
	  	app.tab.show("#view-data");
	  	bg.iuser['login'] = false;
	    bg.toast("已退出");
		bg.setUser("endDay","");
		bg.setUser("isvip","false");
	  });
	}
	
	
	//跳转购买
	
	bg.buy = function(){
		plus.runtime.openURL("http://xsj.one");
	}
	
	
	bg.rec = function(){
		var card = $$("#_reccard").val();
		if (bg.iLogin() == false) {
			return ;
		}
		if(card.length < 15){
			bg.toast("请输入正确的充值卡");
		}else{
			
			app.request.post(bg.config['url']+"index.php?Api/rec",{id:bg.iuser['id'],card:card},
				function(data){
					if(data.indexOf("成功") != -1){
						mineView.router.navigate("/result/rec/"+data);
						return ;
					}
					bg.toast(data);
				},
				function(){
					bg.toast("充值失败，请联系客服");
				}
			,"text"
			);
			
		}
		
	}
	
	bg.iLogin = function(){
		if(bg.iuser['id'] == " 请登录 "){
			bg.toast("请先登录",2000,"icon-delete");
			return false;
		}
	}
	
	bg.feedback = function(){
		if (bg.iLogin() == false) {
			return ;
		}
		var feedback = $$("#_feedback").val();
		
		if(feedback.length < 10 || feedback.length > 400){
			bg.toast("请输入10-400字的反馈");
		}else{
			app.request.post(bg.config['url']+"index.php?Api/feedback",{id:bg.iuser['id'],content:feedback},
				function(data){
					if(data == "提交成功"){
						app.router.navigate("/result/feedback/1");
						return ;
					}
					bg.toast(data);
				},
				function(){
					bg.toast("反馈失败");
				}
			,"text"
			);
			
		}
		
	}
	
	bg.open = function(url){
		plus.runtime.openURL(url);
	}
	
	// 预测类
	
	
	//修改
	bg.changeType = function(type){
		
		if(type == bg.yuce['type']){
			return ;
		}
		
		if(bg.yuce['mode'] == 1){
			var nid = "";
		}
		if(bg.yuce['mode'] == 2){
			var nid = "vip";
		}
		if(bg.yuce['mode'] == 3){
			var nid = "ff";
		}
		
		$("#"+nid+"yc_mode"+type).addClass("button-active");
		$("#"+nid+"yc_mode"+bg.yuce['type']).removeClass("button-active");
		
		bg.yuce['type'] = type;
		
		bg.yuceData();
		
		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
	}
	
	bg.changeSf = function(sf){
		if(sf == bg.yuce['sf']){
			return ;
		}
		
		if(bg.iuser['login'] == false){
			bg.toast("请先登录",2000,"icon-delete");
			app.loginScreen.open(".login-screen");
			return ;
		}
		
		$("#yc_sf"+sf).addClass("button-active");
		$("#yc_sf"+bg.yuce['sf']).removeClass("button-active");
		
		bg.yuce['sf'] = sf;
		
		bg.yuceData();
		
		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
	}
	
	//预测数据
	bg.yuceData = function(){
		
		var z = [];
		var zhi = 0;

		var dx = [];
		var ds = [];

		var kjdx = "";
		var kjds = "";
		var kjzh = "";
		
		var sf = bg.yuce['sf'];
		var type = bg.yuce['type'];
		
		for(i = 0;i < bg.yuce['nissue']+1; i++){
			
			z[1] = bg.data28['data'][i]["c1"];
			z[2] = bg.data28['data'][i]["c2"];
			z[3] = bg.data28['data'][i]["c3"];
			z[4] = bg.data28['data'][i+1]["c1"];
			z[5] = bg.data28['data'][i+1]["c2"];
			z[6] = bg.data28['data'][i+1]["c3"];
			z[7] = bg.data28['data'][i+2]["c1"];
			z[8] = bg.data28['data'][i+2]["c2"];
			z[9] = bg.data28['data'][i+2]["c3"];
			z[10] = bg.data28['data'][i+3]["c1"];
			z[11] = bg.data28['data'][i+3]["c2"];
			z[12] = bg.data28['data'][i+3]["c3"];
			
			//普通
			if(bg.yuce['mode'] == 1){
				if(sf == 1) {
					zhi = parseInt(bg.GetWs(z[1] + z[10] + z[5])) + parseInt(bg.GetWs(z[1] + z[10] + z[5])) + parseInt(bg.GetWs(z[1] + z[10] + z[5]));
				}
				if(sf == 2) {
					zhi = bg.GetWs(z[6] + z[6] + z[5]) + bg.GetWs(z[5] + z[10] + z[11]) + bg.GetWs(z[8] + z[1] + z[5]);
				}
				if(sf == 3) {
					zhi = bg.GetWs(z[12]+z[12]+z[11])+bg.GetWs(z[1]+z[4]+z[1])+bg.GetWs(z[6]+z[9]+z[6]);
				}
				if(sf == 4) {
					zhi = bg.GetWs(z[10]+z[6]+z[5])+bg.GetWs(z[11]+z[7]+z[3])+bg.GetWs(z[7]+z[2]+z[3]);
				}
				if(sf == 5) {
					zhi = bg.GetWs(z[5]+z[2]+z[12])+bg.GetWs(z[10]+z[1]+z[2])+bg.GetWs(z[2]+z[7]+z[6]);
				}
				if(sf == 6) {
					zhi = bg.GetWs(z[4]+z[5]+z[10])+bg.GetWs(z[6]+z[10]+z[2])+bg.GetWs(z[10]+z[11]+z[10]);
				}
				if(sf == 7) {
					zhi = bg.GetWs(z[4]+z[2]+z[3])+bg.GetWs(z[12]+z[2]+z[11])+bg.GetWs(z[11]+z[5]+z[7]);
				}
				if(sf == 8) {
					zhi = bg.GetWs(z[1]+z[8]+z[6])+bg.GetWs(z[12]+z[8]+z[3])+bg.GetWs(z[9]+z[10]+z[2]);
				}
				
				
			}
			//VIP
			if(bg.yuce['mode'] == 2){
				
				zhi = bg.calFormula(bg.yuce['nsf'],z);
				
				if(type == 5){
					dx[i] = bg.GetZh(zhi);
					ds[i] = bg.GetFzh(zhi);
				}
				
				if(type == 6){
					dx[i] = bg.GetLH(zhi,bg.data28['data'][i]["c4"]);
				}
				
				if(type == 7){
					dx[i] = bg.Get3y(zhi);
				}
				
				if(type == 8){
					dx[i] = bg.Get4y(zhi);
					ds[i] = bg.GetWs(zhi);
				}
			}
			//ff
			if(bg.yuce['mode'] == 3){
				
				zhi = bg.calFormula(bg.fdata[bg.yuce['fplan']]['sf'],z);
				
				if(type == 5){
					dx[i] = bg.GetZh(zhi);
					ds[i] = bg.GetFzh(zhi);
				}
				
				if(type == 6){
					dx[i] = bg.GetZb(zhi);
				}
				
				if(type == 7){
					dx[i] = bg.Get3y(zhi);
				}
				
				if(type == 8){
					dx[i] = bg.GetWs(zhi);
				}
			}
			
			//=通用
			if(type == 1) {
				dx[i] = bg.GetDx(zhi);
				ds[i] = bg.GetDs(zhi);
			}
			if(type == 2) {
				dx[i] = bg.GetDx(zhi);
			}
			if(type == 3) {
				dx[i] = bg.GetDs(zhi);
			}
			if(type == 4) {
				dx[i] = bg.GetZh(zhi);
			}
			
		}
		
		//
		
		if(type == 1) {
			$$("#nowyc").html(bg.ycStyle(1,dx[0]) + "" + bg.ycStyle(1,ds[0]));
		}
		if(type == 2 || type == 3) {
			$$("#nowyc").html(bg.ycStyle(1,dx[0]));
		}
		if(type == 4) {
			$$("#nowyc").html(bg.ycStyle(1,"杀"+dx[0]));
		}
		
		if(bg.yuce['mode'] == 2 || bg.yuce['mode'] == 3){
			
			if(type == 5){
				$$("#nowyc").html(bg.ycStyle(1,dx[0])+bg.ycStyle(1,ds[0]));
			}
			
			if(type == 6){
				$$("#nowyc").html(bg.ycStyle(1,dx[0]));
			}
			
			if(type == 7){
				$$("#nowyc").html(bg.ycStyle(1,"杀3N"+dx[0]));
			}
			
			if(bg.yuce['mode'] == 2){
				if(type == 8){
					$$("#nowyc").html(bg.ycStyle(1,"杀4N"+dx[0])+bg.ycStyle(1,"杀"+ds[0]+"尾"));
				}
			}else{
				if(type == 8){
					$$("#nowyc").html(bg.ycStyle(1,"杀"+dx[0]+"尾"));
				}
			}

		}
		
		//历史数据
		bg.yuce['t'] = 0;
		
		for(i = 0; i < bg.yuce['nissue'];i++){
			kjdx = bg.GetDx(bg.data28['data'][i]['c4']);
			kjds = bg.GetDs(bg.data28['data'][i]['c4']);
			kjzh = bg.GetZh(bg.data28['data'][i]['c4']);
			kj3y = bg.Get3y(bg.data28['data'][i]['c4']);
			kjlh = bg.GetLH(bg.data28['data'][i]['c1'],bg.data28['data'][i]['c3']);
			kj4y = bg.Get4y(bg.data28['data'][i]['c4']);
			kjws = bg.GetWs(bg.data28['data'][i]['c4']);
			kjzb = bg.GetZb(bg.data28['data'][i]['c4']);
			//组合
			if(type == 1) {

				if(kjdx == dx[i + 1] && kjds == ds[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]) + "" + bg.ycStyle(1,ds[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}
				//
				if(kjdx == dx[i + 1] && kjds != ds[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]) + "" + bg.ycStyle(2,ds[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}
				//
				if(kjdx != dx[i + 1] && kjds == ds[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]) + "" + bg.ycStyle(1,ds[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}
				//
				if(kjdx != dx[i + 1] && kjds != ds[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]) + "" + bg.ycStyle(2,ds[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(2,"错");
				}
			}
			//大小
			if(type == 2) {

				if(kjdx == dx[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}else{
					bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(2,"错");
				}
			}
			//单双
			if(type == 3) {

				if(kjds == dx[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}else{
					bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(2,"错");
				}
			}
			//杀组
			if(type == 4) {

				if(kjzh != dx[i + 1]) {
					bg.yuce['yuce'][i] = bg.ycStyle(1,"杀"+dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(1,"对");
				}else{
					bg.yuce['yuce'][i] = bg.ycStyle(2,"杀"+dx[i+1]);
					bg.yuce['result'][i] = bg.ycStyle(2,"错");
				}
			}
			
			if(bg.yuce['mode'] == 2 || bg.yuce['mode'] == 3){
				
				if(type == 5){
					
					if(kjzh == dx[i + 1]){
						bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]) + bg.ycStyle(2,ds[i+1]);
						bg.yuce['result'][i] = bg.ycStyle(1,"对");
					}else if(kjzh == ds[i + 1]){
						bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]) + bg.ycStyle(1,ds[i+1]);
						bg.yuce['result'][i] = bg.ycStyle(1,"对");
					}else{
						bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]) + bg.ycStyle(2,ds[i+1]);
						bg.yuce['result'][i] = bg.ycStyle(2,"错");
					}
					
				}
				
				if(type == 6){
					
					if(bg.yuce['mode'] == 2){
						if(kjlh == dx[i + 1]){
							bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]);
							bg.yuce['result'][i] = bg.ycStyle(1,"对");
						}else{
							bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]);
							bg.yuce['result'][i] = bg.ycStyle(2,"错");
						}
					}else{
						if(kjzb == dx[i + 1]){
							bg.yuce['yuce'][i] = bg.ycStyle(1,dx[i+1]);
							bg.yuce['result'][i] = bg.ycStyle(1,"对");
						}else{
							bg.yuce['yuce'][i] = bg.ycStyle(2,dx[i+1]);
							bg.yuce['result'][i] = bg.ycStyle(2,"错");
						}
					}
					

					
				}
				
				if(type == 7){
					
					if(kj3y != dx[i + 1]){
						bg.yuce['yuce'][i] = bg.ycStyle(1,"杀3N"+dx[i+1]);
						bg.yuce['result'][i] = bg.ycStyle(1,"对");
					}else{
						bg.yuce['yuce'][i] = bg.ycStyle(2,"杀3N"+dx[i+1]);
						bg.yuce['result'][i] = bg.ycStyle(2,"错");
					}
					
				}
				
				if(type == 8){
					if(bg.yuce['mode'] == 2){
						if(kj4y != dx[i + 1] && kjws != ds[i + 1]){
							bg.yuce['yuce'][i] = bg.ycStyle(1,"杀4N"+dx[i+1])+bg.ycStyle(1,"杀"+ds[i+1]+"尾");
							bg.yuce['result'][i] = bg.ycStyle(1,"对");
						}else{
							
							if(kj4y == dx[i + 1] && kjws != ds[i + 1]){
								bg.yuce['yuce'][i] = bg.ycStyle(2,"杀4N"+dx[i+1])+bg.ycStyle(1,"杀"+ds[i+1]+"尾");
							}
							if(kj4y == dx[i + 1] && kjws == ds[i + 1]){
								bg.yuce['yuce'][i] = bg.ycStyle(2,"杀4N"+dx[i+1])+bg.ycStyle(2,"杀"+ds[i+1]+"尾");
							}
							if(kj4y != dx[i + 1] && kjws == ds[i + 1]){
								bg.yuce['yuce'][i] = bg.ycStyle(1,"杀4N"+dx[i+1])+bg.ycStyle(2,"杀"+ds[i+1]+"尾");
							}
							
							bg.yuce['result'][i] = bg.ycStyle(2,"错");
						}
					}else{
						if(kjws != dx[i + 1]){
							bg.yuce['yuce'][i] = bg.ycStyle(1,"杀"+dx[i+1]+"尾");
							bg.yuce['result'][i] = bg.ycStyle(1,"对");
						}else{
							bg.yuce['yuce'][i] = bg.ycStyle(2,"杀"+dx[i+1]+"尾");
							bg.yuce['result'][i] = bg.ycStyle(2,"错");
						}
					}
				}
				
			}
			
			var result = bg.yuce['result'][i];
			
			if(result.indexOf("对") != -1){
				bg.yuce['t']++;
			}
		}
		
		//=推荐处理
		if(bg.yuce['mode'] == 1){
			for(n=1;n<9;n++){
				var lz = bg.recommendData(n);
				if(lz >= 6){
					$$("#yc_sf"+n).html("算法0"+n+" <span style='color:#ff0000'>荐</span>");
				}else{
					$$("#yc_sf"+n).html("算法0"+n);
				}
			}
		}
		
		if(bg.yuce['nrec'] == false){
			$$("#sta-data").html("统计:" + bg.yuce['nissue'] + "期 正确:" + bg.yuce['t'] + "次 正确率:" + parseInt(bg.yuce['t']/bg.yuce['nissue']*100)+"%");
		}else{
			
			if(type == 1 || type == 2 || type == 3 || type == 4 || type == 5){
				if(type == 4){
					var acc = 4;
				}else{
					var acc = 2;
				}
				var odds = parseInt(100 - (bg.yuce['t']*bg.yuce['nlz']/acc));
				
			}else{
				if(type == 6 || type == 7){
					var acc = 3.3;
				}
				if(type == 8){
					var acc = 4;
				}
				var odds = (bg.yuce['t']*bg.yuce['nlz']*5);
				
				odds = parseInt(odds/acc);
				if(odds>100){
					var n100 = parseInt(odds/100);
					odds = odds-n100*100;
				}
			}
			
			if(odds < 0){
				if(odds < -50){
					odds +=100;
				}else{
					odds =-odds;
				}
			}
			
			$$("#sta-data").html("正确:" + bg.yuce['t'] + "次 正确率:" + parseInt(bg.yuce['t']/bg.yuce['nissue']*100)+"% 下期准确率:"+odds+"%");
			bg.yuce['nrec'] == false;
		}
		
	}
	
	//推荐
	bg.recommendData = function(sf){
		
		var z = [];
		var zhi = 0;

		var dx = [];
		var ds = [];

		var kjdx = "";
		var kjds = "";
		var kjzh = "";
		
		var type = bg.yuce['type'];
		
		for(i=0;i<10; i++){
			
			z[1] = bg.data28['data'][i]["c1"];
			z[2] = bg.data28['data'][i]["c2"];
			z[3] = bg.data28['data'][i]["c3"];
			z[4] = bg.data28['data'][i+1]["c1"];
			z[5] = bg.data28['data'][i+1]["c2"];
			z[6] = bg.data28['data'][i+1]["c3"];
			z[7] = bg.data28['data'][i+2]["c1"];
			z[8] = bg.data28['data'][i+2]["c2"];
			z[9] = bg.data28['data'][i+2]["c3"];
			z[10] = bg.data28['data'][i+3]["c1"];
			z[11] = bg.data28['data'][i+3]["c2"];
			z[12] = bg.data28['data'][i+3]["c3"];
			
			if(sf == 1) {
				zhi = parseInt(bg.GetWs(z[1] + z[10] + z[5])) + parseInt(bg.GetWs(z[1] + z[10] + z[5])) + parseInt(bg.GetWs(z[1] + z[10] + z[5]));
			}
			if(sf == 2) {
				zhi = bg.GetWs(z[6] + z[6] + z[5]) + bg.GetWs(z[5] + z[10] + z[11]) + bg.GetWs(z[8] + z[1] + z[5]);
			}
			if(sf == 3) {
				zhi = bg.GetWs(z[12]+z[12]+z[11])+bg.GetWs(z[1]+z[4]+z[1])+bg.GetWs(z[6]+z[9]+z[6]);
			}
			if(sf == 4) {
				zhi = bg.GetWs(z[10]+z[6]+z[5])+bg.GetWs(z[11]+z[7]+z[3])+bg.GetWs(z[7]+z[2]+z[3]);
			}
			if(sf == 5) {
				zhi = bg.GetWs(z[5]+z[2]+z[12])+bg.GetWs(z[10]+z[1]+z[2])+bg.GetWs(z[2]+z[7]+z[6]);
			}
			if(sf == 6) {
				zhi = bg.GetWs(z[4]+z[5]+z[10])+bg.GetWs(z[6]+z[10]+z[2])+bg.GetWs(z[10]+z[11]+z[10]);
			}
			if(sf == 7) {
				zhi = bg.GetWs(z[4]+z[2]+z[3])+bg.GetWs(z[12]+z[2]+z[11])+bg.GetWs(z[11]+z[5]+z[7]);
			}
			if(sf == 8) {
				zhi = bg.GetWs(z[1]+z[8]+z[6])+bg.GetWs(z[12]+z[8]+z[3])+bg.GetWs(z[9]+z[10]+z[2]);
			}
			
			if(type == 1) {
				dx[i] = bg.GetDx(zhi);
				ds[i] = bg.GetDs(zhi);
			}
			if(type == 2) {
				dx[i] = bg.GetDx(zhi);
			}
			if(type == 3) {
				dx[i] = bg.GetDs(zhi);
			}
			if(type == 4) {
				dx[i] = bg.GetZh(zhi);
			}
		}
		
		
		//历史
		var lz = 0;
		
		for(i = 0; i <= 9;i++){
			kjdx = bg.GetDx(bg.data28['data'][9-i]['c4']);
			kjds = bg.GetDs(bg.data28['data'][9-i]['c4']);
			kjzh = bg.GetZh(bg.data28['data'][9-i]['c4']);
			
			//组合
			if(type == 1) {
				//
				if(kjdx != dx[10 - i] && kjds != ds[10 - i]) {
					lz = 0;
				}else{
					lz++;
				}
			}
			//大小
			if(type == 2) {
				if(kjdx == dx[10 - i]) {
					lz++;
				}else{
					lz = 0;
				}
			}
			//单双
			if(type == 3) {
				if(kjds == dx[10 - i]) {
					lz++;
				}else{
					lz = 0;
				}
			}
			//杀组
			if(type == 4) {
				if(kjzh != dx[10 - i]) {
					lz++;
				}else{
					lz = 0;
				}
			}
			
		}
		return lz;
	}
	
	//计划计算
	bg.planCal = function(str){
		
		var z = [];
		var zhi = 0;

		var dx = [];
		var ds = [];
		var tm = [];

		var kjdx = "";
		var kjds = "";
		var kjzh = "";
		
		var type = bg.yuce['type'];
		
		for(i=0;i<bg.yuce['nissue']; i++){
			
			z[1] = bg.data28['data'][i]["c1"];
			z[2] = bg.data28['data'][i]["c2"];
			z[3] = bg.data28['data'][i]["c3"];
			z[4] = bg.data28['data'][i+1]["c1"];
			z[5] = bg.data28['data'][i+1]["c2"];
			z[6] = bg.data28['data'][i+1]["c3"];
			z[7] = bg.data28['data'][i+2]["c1"];
			z[8] = bg.data28['data'][i+2]["c2"];
			z[9] = bg.data28['data'][i+2]["c3"];
			z[10] = bg.data28['data'][i+3]["c1"];
			z[11] = bg.data28['data'][i+3]["c2"];
			z[12] = bg.data28['data'][i+3]["c3"];
			
			
			zhi = bg.calFormula(str,z);
			
			tm[i] = zhi;
			
			if(type == 5){
				dx[i] = bg.GetZh(zhi);
				ds[i] = bg.GetFzh(zhi);
			}
			
			if(type == 6){
				dx[i] = bg.GetZb(zhi);
			}
			
			if(type == 7){
				dx[i] = bg.Get3y(zhi);
			}
			
			if(type == 8){
				dx[i] = bg.GetWs(zhi);
			}
			
			if(type == 1) {
				dx[i] = bg.GetDx(zhi);
				ds[i] = bg.GetDs(zhi);
			}
			if(type == 2) {
				dx[i] = bg.GetDx(zhi);
			}
			if(type == 3) {
				dx[i] = bg.GetDs(zhi);
			}
			if(type == 4) {
				dx[i] = bg.GetZh(zhi);
			}
		}
		
		
		//历史
		var lz = 0;
		var ls = 0;
		var zq = 0;
		
		for(i = 0; i <= bg.yuce['nissue']-1;i++){
			kjdx = bg.GetDx(bg.data28['data'][19-i]['c4']);
			kjds = bg.GetDs(bg.data28['data'][19-i]['c4']);
			kjzh = bg.GetZh(bg.data28['data'][19-i]['c4']);
			kjws = bg.GetWs(bg.data28['data'][19-i]['c4']);
			kj3y = bg.Get3y(bg.data28['data'][19-i]['c4']);
			kjzb = bg.GetZb(bg.data28['data'][19-i]['c4']);
			
			//组合
			if(type == 1) {
				//
				if(kjdx != dx[20 - i] && kjds != ds[20 - i]) {
					lz = 0;
					ls++;
				}else{
					ls = 0;
					zq++;
					lz++;
				}
			}
			//大小
			if(type == 2) {
				if(kjdx == dx[20 - i]) {
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
			}
			//单双
			if(type == 3) {
				if(kjds == dx[20 - i]) {
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
			}
			//杀组
			if(type == 4) {
				if(kjzh != dx[20 - i]) {
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
			}
			if(type == 5){
				
				if(kjzh == dx[20 - i]){
					ls = 0;
					zq++;
					lz++;
				}else if(kjzh == ds[20 - i]){
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
				
			}
			
			if(type == 6){
				
				if(kjzb == dx[20 - i]){
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
				
			}
			
			if(type == 7){
				
				if(kj3y != dx[20 - i]){
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
				
			}
			
			if(type == 8){
				if(kjws != dx[20 - i]){
					ls = 0;
					zq++;
					lz++;
				}else{
					lz = 0;
					ls++;
				}
			}
			
		}
		
		var _array = [lz,ls,zq,tm[0]];
		
		return _array;
	}
	
	//随机更换
	bg.randRep = function(){
		var formula1 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
		var formula2 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
		var formula3 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
		bg.yuce['nsf'] = formula1+"|"+formula2+"|"+formula3;
		bg.yuceData();
		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
		bg.toast("更换成功",300);
	}
	
	//搜索算法
	bg.searchFor = function(){
		
		if(bg.yuce['type'] == 2 || bg.yuce['type'] == 3 || bg.yuce['type'] == 5){
			t = 8;
		}else if(bg.yuce['type'] == 6){
			t = 8;
		}else{
			t = 15;
		}
		for(i=0;i<50;i++){//搜寻次数50
			var formula1 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
			var formula2 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
			var formula3 = Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12)+"+"+Math.ceil(Math.random()*12);
			bg.yuce['nsf'] = formula1+"|"+formula2+"|"+formula3;
			bg.yuceData();
			if(bg.yuce['t'] > t){
				if(bg.yuce['result'][0].indexOf("对")!=-1 && bg.yuce['result'][1].indexOf("对")!=-1 && bg.yuce['result'][2].indexOf("对")!=-1){
					
					var nlz=0;
					for(n=0;n<20;n++){
						if(bg.yuce['result'][n].indexOf("对")!=-1){
							nlz++;
						}else{
							break;
						}
					}

					bg.yuce['nlz'] = nlz;
					bg.yuce['nrec'] = true;
					
					bg.yuceData();
					data = bg.dataArray();
					bg.tp7("#yuceTp",data,"#yuceData");
					bg.toast("搜索成功",300);
					return ;
					break;
				}
			}
		}

		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
		bg.toast("搜索失败",500,"icon-delete");
	}
	
	//计算公式
	bg.calFormula = function(formula,z){
		
		var nFormula = formula.split("|");
		
		return bg.taoru(nFormula[0],z)+bg.taoru(nFormula[1],z)+bg.taoru(nFormula[2],z);
	}
	
	bg.taoru = function(formula,z){
		var nFormula = formula.split("+");
		return bg.GetWs(z[nFormula[0]]+z[nFormula[1]]+z[nFormula[2]]);
	}
	
	//计算公式
	bg.calFormula2 = function(formula,z){
		
		var nFormula = formula.split("|");
		var zhi = 0;

		for(i = 0;i < nFormula.length;i++){
			
			mFormula = nFormula[i].split("+");
			
			zhi2 = 0;
			
			for(n = 0;n < mFormula.length;n++){
				zhi2 += z[mFormula[n]];
			}
			
			zhi += bg.GetWs(zhi2);
		}
		
		return zhi;
	}
	
	//对错
	bg.ycStyle = function(n,c){
		var j = "";
		if(c.length>1){
			j = "badges";
		}
		if(c.length>2){
			j = "badgew";
		}
		if(n == 2){
			return '<span class="badge bg-blue '+j+'">'+c+'</span>';
		}
		if(n == 1){
			return '<span class="badge bg-red '+j+'">'+c+'</span>';
		}
	}
	
	//对错
	bg.pkStyle = function(n,c){
		var j = "";
		if(c.length>5){
			j = "badgepkw";
		}
		if(n == 2){
			return '<span class="badge bg-blue '+j+'">'+c+'</span>';
		}
		if(n == 1){
			return '<span class="badge bg-red '+j+'">'+c+'</span>';
		}
	}
	
	//切换开奖
	bg.changeLottery = function(lottery){
		
		if(bg.data28['type'] == lottery){
			return ;
		}
		
		bg.data28['type'] = lottery;
		
		if(lottery == "pc28"){
			$$("#_pc28").addClass("tab-link-active");
			$$("#_jnd28").removeClass("tab-link-active");
			$("#lottery-img").attr('src',"img/image_1.png");
		}
		if(lottery == "jnd28"){
			$$("#_jnd28").addClass("tab-link-active");
			$$("#_pc28").removeClass("tab-link-active");
			$("#lottery-img").attr('src',"img/jnd.png");
		}
		
		bg.get28(bg.data28['type']);
	}
	
	
	bg.changeMode = function(mode){

		if(bg.iuser['isvip'] != "true"){
			bg.toast("该功能为VIP功能",2000,"icon-delete");
			return ;
		}
		
		if(mode == bg.yuce['mode']){
			return ;
		}
		
		if(mode == 1){
			$$("#commonView").css("display","block");
			$$("#vipView").css("display","none");
			$$("#ffView").css("display","none");
			
			$$("#common-button").addClass("tab-link-active");
			$$("#vip-button").removeClass("tab-link-active");
			$$("#ff-button").removeClass("tab-link-active");
			
		}
		
		if(mode == 2){
			$$("#commonView").css("display","none");
			$$("#vipView").css("display","block");
			$$("#ffView").css("display","none");
			
			$$("#common-button").removeClass("tab-link-active");
			$$("#ff-button").removeClass("tab-link-active");
			$$("#vip-button").addClass("tab-link-active");
			
		}
		
		if(mode == 3){
			$$("#ffView").css("display","block");
			$$("#vipView").css("display","none");
			$$("#commonView").css("display","none");
			
			$$("#vip-button").removeClass("tab-link-active");
			$$("#common-button").removeClass("tab-link-active");
			$$("#ff-button").addClass("tab-link-active");
			
			if(bg.yuce['finit'] == false){
				bg.ffinit();
				bg.yuce['finit'] == true;
			}
			
		}
		
		bg.yuce['mode'] = mode;
		bg.yuceData();
		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
	}
	
	bg.openPlan = function(){
		bg.planData();
		app.popup.open(".my-popup");
	}
	
	bg.closePlan = function(plan){
		bg.yuce['fplan'] = plan;
		bg.yuceData();
		data = bg.dataArray();
		bg.tp7("#yuceTp",data,"#yuceData");
		bg.toast("更换成功",300);
		app.popup.close(".my-popup");
	}
	
	bg.changeSort = function(sort){
		
		if(sort == bg.yuce['fsort']){
			return ;
		}
		
		$("#ff-sort"+sort).addClass("button-active");
		$("#ff-sort"+bg.yuce['fsort']).removeClass("button-active");
		
		bg.yuce['fsort'] = sort;
		
		bg.planData();
		bg.toast("排序成功",350);

	}
	
	bg.autoSelect = function(n = false){
		
		if(n == true){
			bg.planData();
		}
		
		if(bg.yuce['type'] == 2 || bg.yuce['type'] == 3 || bg.yuce['type'] == 5 || bg.yuce['type'] == 6){
			var zql = 60;
		}else{
			var zql = 75;
		}
		
		for(i=0;i<bg.yuce['nissue'];i++){
			
			if(bg.fdata[i]['array']['zq'] >= zql && bg.fdata[i]['array']['lz']>=3 && bg.fdata[i]['array']['lz']<=7){
				bg.yuce['fplan'] = i;
				bg.yuceData();
				data = bg.dataArray();
				bg.tp7("#yuceTp",data,"#yuceData");
				bg.toast("推荐成功");
				app.popup.close(".my-popup");
				return ;
			}

		}
		
		bg.toast("推荐失败");
		
	}
	
	bg.planData = function(){
		
		var str = "";
		var zuhe = {
			"大双":0,
			"大单":0,
			"小双":0,
			"小单":0,
		};
		
		for(n=0;n<50;n++){
			
			var _data = bg.planCal(bg.fdata[n]['sf']);
			console.log(bg.fdata[n]);
			bg.fdata[n]["array"]["lz"]=_data[0];
			bg.fdata[n]["array"]["ls"]=_data[1];
			bg.fdata[n]["array"]["cw"]=20-_data[2];
			bg.fdata[n]["array"]["zq"]=_data[2]*5;
			
			zuhe[bg.GetZh(_data[3])]++;
			
			if(bg.yuce['fsort'] == 1){
				
			    str += "<li>";
			    str +='  <a href="#" class="item-link item-content" onclick="bg.closePlan('+n+')"><div class="item-inner">';
			    str +='      <div class="item-title lottery-font">'+bg.fdata[n]['name'];
			    str +=' <span class="ff-lz">正确率:'+_data[2]*5+'</span> - ';
			    if(_data[0]==0){
			    	str +='<span class="ff-lg">连挂:'+bg.GetTm(_data[1])+'</span>';
			    }else{
			    	str +='<span class="ff-lz">连中:'+bg.GetTm(_data[0])+'</span>';
			    }
			    str +='</div>';
			    str +='<div class="item-after"></div>';
			    str +='</div>';
			    str +='</a>';
			    str +='</li>';
			}

		}
		
		$("#ffcount").html("统计: 大双共"+zuhe['大双']+"个 大单共"+zuhe['大单']+"个 小双共"+zuhe['小双']+"个 小单共"+zuhe['小单']+"个");
		
		var fdata = bg.fdata;
		
		
		if(bg.yuce['fsort'] == 2 || bg.yuce['fsort'] == 6){
			fdata.sort(bg.compare("array","zq"));
		}
		
		if(bg.yuce['fsort'] == 3){
			fdata.sort(bg.compare("array","lz"));
		}
		
		if(bg.yuce['fsort'] == 4){
			fdata.sort(bg.compare("array","cw"));
		}
		
		if(bg.yuce['fsort'] == 5){
			fdata.sort(bg.compare("array","ls"));
		}
		
		bg.fdata = fdata;

		if(bg.yuce['fsort'] != 1){
			for(m=0;m<50;m++){
			    str += "<li>";
			    str +='  <a href="#" class="item-link item-content" onclick="bg.closePlan('+m+')"><div class="item-inner">';
			    str +='      <div class="item-title lottery-font">'+bg.fdata[m]['name'];
			    str +=' <span class="ff-lz">正确率:'+bg.fdata[m]["array"]["zq"]+'</span> - ';
			    if(bg.fdata[m]["array"]["lz"]==0){
			    	str +='<span class="ff-lg">连挂:'+bg.GetTm(bg.fdata[m]["array"]["ls"])+'</span>';
			    }else{
			    	str +='<span class="ff-lz">连中:'+bg.GetTm(bg.fdata[m]["array"]["lz"])+'</span>';
			    }
			    str +='</div>';
			    str +='<div class="item-after"></div>';
			    str +='</div>';
			    str +='</a>';
			    str +='</li>';
			}
		}
		
		$$("#ffplan").html(str);
		
	}
	
	//ff
	bg.ffinit = function(){
		
				var mysf = '{"mysf":[{"name":"小九计划01","sf":"1+12+7|6+5+1|11+9+4","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划02","sf":"6+8+12|3+10+3|11+10+11","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划03","sf":"7+12+4|10+12+1|3+2+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划04","sf":"2+8+6|3+7+5|5+5+5","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划05","sf":"7+1+8|4+8+2|8+8+7","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划06","sf":"1+6+7|6+3+11|12+8+9","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划07","sf":"2+8+6|3+11+8|9+4+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划08","sf":"12+4+12|11+9+10|3+5+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划09","sf":"8+6+12|3+2+5|1+3+1","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"小九计划10","sf":"4+12+8|7+11+7|5+12+4","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划01","sf":"12+4+8|12+10+2|5+10+7","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划02","sf":"8+8+4|4+1+9|8+8+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划03","sf":"4+12+4|8+4+12|8+5+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划04","sf":"12+4+12|1+3+7|7+3+5","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划05","sf":"8+8+11|5+6+2|11+4+8","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划06","sf":"4+12+7|9+5+4|10+2+11","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划07","sf":"12+4+7|2+8+11|10+12+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划08","sf":"8+8+7|6+7+6|1+9+5","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划09","sf":"4+12+3|10+10+9|1+7+8","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"龙泽计划10","sf":"12+4+3|3+1+4|12+5+11","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划01","sf":"8+8+11|7+12+11|11+2+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划02","sf":"4+12+11|11+3+2|3+12+6","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划03","sf":"12+4+7|4+3+8|2+2+9","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划04","sf":"8+8+7|8+6+3|2+11+12","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划05","sf":"4+9+6|12+9+6|5+9+3","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划06","sf":"12+1+2|4+8+1|5+6+6","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划07","sf":"8+5+2|9+11+8|4+4+9","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划08","sf":"4+9+10|1+10+11|8+2+12","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划09","sf":"12+1+10|5+1+5|7+11+3","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"青灯计划10","sf":"12+5+6|10+12+12|7+9+6","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划01","sf":"8+9+6|2+3+3|10+11+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划02","sf":"4+1+2|6+6+10|10+8+1","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划03","sf":"12+5+2|11+5+5|9+6+4","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划04","sf":"8+9+1|3+8+12|12+3+7","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划05","sf":"4+1+9|7+7+3|12+1+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划06","sf":"12+5+9|12+10+9|11+11+1","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划07","sf":"8+9+5|4+1+4|3+8+4","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划08","sf":"4+1+5|8+12+7|2+10+7","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划09","sf":"12+5+1|1+3+2|2+8+10","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"OP28计划10","sf":"8+9+1|5+2+9|1+5+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划01","sf":"4+1+8|9+8+12|6+3+5","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划02","sf":"12+5+9|2+4+6|4+12+8","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划03","sf":"8+9+9|6+8+1|4+10+11","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划04","sf":"4+1+4|10+11+4|7+8+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划05","sf":"12+5+4|2+10+11|6+5+5","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划06","sf":"8+9+12|7+1+6|6+7+8","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划07","sf":"4+1+12|11+12+9|9+5+11","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划08","sf":"12+5+12|3+3+4|9+2+2","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划09","sf":"1+1+1|8+6+10|8+12+6","array":{"zq":0,"cw":0,"lz":0,"ls":0}},{"name":"特殊计划10","sf":"4+1+8|12+5+1|12+9+9","array":{"zq":0,"cw":0,"lz":0,"ls":0}}]}';

			
		mysf = $.parseJSON(mysf);
		bg.fdata = mysf["mysf"];
	}
	
	bg.tabs = function(n){
		
		if(n == bg.yuce['ntab']){
			return ;
		}
		
		$$("#tab-0-"+bg.yuce['ntab']).removeClass("am-tabs-default-bar-tab-active");
		$$("#tab-0-"+n).addClass("am-tabs-default-bar-tab-active");
		
		$$("#tab-1-"+bg.yuce['ntab']).removeClass("am-tabs-pane-wrap-active").addClass("am-tabs-pane-wrap-inactive");
		$$("#tab-1-"+n).removeClass("am-tabs-pane-wrap-inactive").addClass("am-tabs-pane-wrap-active");
		
		$$("#tab-bottom").css("left",(n-1)*33+"%");
		$$("#tab-hd").css("transform","translate3d("+(1-n)*100+"%, 0px, 1px)");
		
		bg.yuce['ntab'] = n;
	}
	
	//mode

	bg.modeSz = function (t = false){
		
		if(bg.data28['dayCount'] < 5){
			$("#sz-data").html("数据从每天第一期开始，等待五期后出数据");
			$("#sz2-data").html("数据从每天第一期开始，等待五期后出数据");
			$("#sz3-data").html("数据从每天第一期开始，等待五期后出数据");
			$("#szData").html("");
			return ;
		}
		
		var money = bg.mode['money'].split(" ");
		var mode = bg.mode['mode'].split(" ");
		var yci = 0;
		
		var moneyCount = 0;
		var str = "";
		
		var lz = 0;
		var ls = 0;
		var lzArray = [];
		var lsArray = [];
		var mArray = [];
		var zq = 0;
		var cw = 0;
		
		
		for(n=bg.data28['dayCount'];n>0;n--){
			
			m = n - 1;
			
			ndata = bg.data28['data'][m];
			
			str2 = "<tr>";
			str2 += "<td>"+ndata['issue']+"</td>";
			
			if(bg.config['waveColor'] == "true"){
		  		c4 = "<span class='bose "+bg.BsStyle(ndata['c4'])+"'>"+ndata['c4']+"</span>";
		  	}else{
		  		c4 = ndata['c4'];
		  	}
		  	str2 += "<td>"+c4+"</td>";
		  	
		  	
			nowZh = bg.GetZh(ndata['c4']);
			nowYc = mode[yci];
			
			if(nowZh == nowYc){
				
				str2 += "<td>" + bg.ycStyle(2,"杀"+nowYc) + "</td>";
				nowZq = bg.ycStyle(2,"错");
				moneyCount -= money[yci];
				mColor = "#006633";
				
				lz = 0;
				ls++;
				lsArray[m] = ls;
				cw++;
				
			}else{
				
				str2 += "<td>" + bg.ycStyle(1,"杀"+nowYc) + "</td>";
				nowZq = bg.ycStyle(1,"对");
				
				if($$('#_1314').is(":checked")){
					if(ndata['c4'] == 13 && nowYc == "小双"){
						
					}else if(ndata['c4'] == 14 && nowYc == "大单"){
						
					}else{
						moneyCount += money[yci]/3;
					}
				}else{
					moneyCount += money[yci]/3;
				}
				
				mColor = "#FF0000";
				
				lz++;
				ls=0;
				lzArray[m] = lz;
				zq++;

			}
			
			mArray[m] = moneyCount;
			
			str2 += "<td>" + money[yci] + "</td>";
			str2 += "<td>" + nowZq + "</td>";
			str2 += "<td style='color:"+mColor+"'>" + moneyCount + "</td>";
			str2 += "</tr>";
			
			str = str2 + str;
			
			yci++;
			
			if(yci == 5){
				yci = 0;
			}
		}
		
		$("#szData").html(str);
		$("#nowissue2").html(parseInt(bg.data28['data'][0]['issue'])+1);
		$("#nowSz").html(bg.ycStyle(1,"杀"+mode[yci]));
		$("#nowMoney").html(money[yci]);
		
		if(lz == 0){
			dqStr = "当前连错:" + ls + "期";
		}else{
			dqStr = "当前连对:" + lz + "期";
		}
		
		lzArray = lzArray.sort(function(a,b){return b-a});
		lsArray = lsArray.sort(function(a,b){return b-a});
		mArray = mArray.sort(function(a,b){return b-a});
		
		$("#sz-data").html("正确:"+zq+"期 错误:"+cw+"期 "+dqStr);
		$("#sz2-data").html("最高连对:"+lzArray[0]+"期 最高连错:"+lsArray[0]+"期");
		$("#sz3-data").html("最高盈利:"+mArray[0]+" 最高亏损:"+mArray[bg.data28['dayCount']-1]+"");
		
		if(t == true){
			app.ptr.done("#ptr-sz");
			bg.toast("刷新成功",350);
		}
	}
	
	bg.cMode = function(mode){
		mode = mode.replace(/1/g,"大单");
		mode = mode.replace(/2/g,"大双");
		mode = mode.replace(/3/g,"小单");
		mode = mode.replace(/4/g,"小双");
		mode = mode.replace(/,/g," ");
		return mode;
	}
	
	//
	bg.changeSzSort = function(sort){
		
		if(sort == bg.mode['sort']){
			return ;
		}
		
		$("#sz-sort"+sort).addClass("button-active");
		$("#sz-sort"+bg.mode['sort']).removeClass("button-active");
		
		bg.mode['sort'] = sort;
		
		$("#mode-data").html(bg.modeCollation(bg.mode['modeData']));
		
		bg.toast("排序成功",350);

	}
	
	bg.szModeData = function(){
		/* if(bg.iuser['isvip'] != "true"){
			bg.toast("该功能为VIP功能",2000,"icon-delete");
			return ;
		} */
		
		if(bg.data28['dayCount'] < 5){
			bg.toast("等待5期数据加载",2000,"icon-delete");
			return ;
		}
		
		if(bg.mode['tdata'] == false){
			$.ajax({
				url:bg.config['url']+"api.php?t="+bg.data28['type']+'mode',
				type: "get",
				dataType:"json",
				success: function(data) {
					bg.mode['modeData'] = data;
					bg.mode['tdata'] = true;
					$("#mode-data").html(bg.modeCollation(data));
					app.popup.open(".my-mode");
					
				},
				error: function(){
					bg.toast("获取模式数据失败",2000,"icon-delete");
				}
			});
			
			// app.request.post(bg.config['url']+"api.php?t="+bg.data28['type']+'mode',{},
			// 	function(data){
			// 		bg.mode['modeData'] = data;
			// 		bg.mode['tdata'] = true;
			// 		$("#mode-data").html(bg.modeCollation(data));
			// 		app.popup.open(".my-mode");
			// 	},
			// 	function(){
			// 		bg.toast("获取模式数据失败",2000,"icon-delete");
			// 	}
			// ,"json"
			// );
		}else{
			
			app.popup.open(".my-mode");

		}
		
	}
	
	bg.modeCollation = function(modedata_){
		var data = new Array();
		data = modedata_;
		var str = "";
		if(data.length < 100){
			return ;
		}
		
		
		sort_ = bg.mode['sort'];
		
		if(sort_ == 2){
			data = data.sort(bg.compare2("zq"));
		}
		
		if(sort_ == 3){
			data = data.sort(bg.compare2("lz"));
		}
		
		if(sort_ == 4){
			data = data.sort(bg.compare2("cw"));
		}
		
		if(sort_ == 5){
			data = data.sort(bg.compare2("lc"));
		}
		
		if(sort_ == 6){
			data = data.sort(bg.compare2("mlz"));
		}
		
		if(sort_ == 7){
			data = data.sort(bg.compare2("mlc"));
		}
		
		for(n=0;n<100;n++){
			
		    str +='<li>';
		    str +='  <a href="#" class="item-link item-content" onclick="'+"bg.setSzMode('"+data[n]['m']+"')"+'">';
		    str +='    <div class="item-inner">';
		    str +='      <div class="item-title-row">';
		    str +='        <div class="item-title">'+bg.cMode(data[n]['m'])+'</div>';
		    if(data[n]['lz'] == 0){
		    	str +='        <div class="item-after c-green">连错:'+data[n]['lc']+'期</div>';
		    }else{
		    	str +='        <div class="item-after c-red">连中:'+data[n]['lz']+'期</div>';
		    }
		    str +='     </div>';
		    str +='      <div class="item-text">';
		    str +='      	<div class="badge-post">对'+data[n]['zq']+'期</div>';
		    str +='      	<div class="badge-post">错'+data[n]['cw']+'期</div>';
		    str +='     	<div class="badge-post">最高连中'+data[n]['mlz']+'期</div>';
		    str +='      	<div class="badge-post">最高连错'+data[n]['mlc']+'期</div>';
		    str +='      </div>';
		    str +='    </div>';
		    str +='  </a>';
		    str +='</li>';
			
		}
		
		console.log("已更新")
		return str;
		
	}
	
	//
	bg.setSzMode = function(mode){
		bg.mode['mode'] = bg.cMode(mode);
		$("#nMode").html(bg.cMode(mode));
		app.popup.close(".my-mode");
		bg.modeSz(true);
	}

	// 初始化配置
	
	bg.isEmail = function (email){
	　　var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
	　　if(myReg.test(email)){
	　　　　return true;
	　　}else{
	　　　　return false;
		}
	}
	
	bg.viewUser = function(){
		bg.viewData(["username","nickname","email","endtime"],"user");
	}
	
	//
	bg.GetWs = function(str){
		str +="";
		return parseInt(str.substr(str.length - 1, 1));
	}
	//
	bg.GetDx = function(zhi){
		if(zhi > 13) {
			return "大";
		} else {
			return "小";
		}
	}
	//
	bg.GetDs = function(zhi){
		if(zhi % 2 == 0) {
			return "双";
		} else {
			return "单";
		}
	}
	//
	bg.GetJdx = function(zhi){
		if(zhi<6){
			return "极小";
		}
		if(zhi>21){
			return "极大";
		}
		return "";
	}
	
	bg.GetZh = function(zhi){
		return bg.GetDx(zhi) + bg.GetDs(zhi);
	}
	
	bg.GetBs = function(z){
		 if(z==3 || z==6 || z==9 || z==12 || z==15 || z==18 || z==21 || z==24){
		  return "红";
		}
		 if(z==1 || z==4 || z==7 || z==10 || z==16 || z==19 || z==22 || z==25){
		  return "绿";
		}
		 if(z==2 || z==5 || z==8 || z==11 || z==17 || z==20 || z==23 || z==26){
		  return "蓝";
		}
		return "黑";
	}
	
	bg.GetTm = function(z){
		if(z < 10){
			return "0"+z;
		}
		return z;
	}
	
	bg.BsStyle = function(z){
		 if(z==3 || z==6 || z==9 || z==12 || z==15 || z==18 || z==21 || z==24){
		  return "bs-red";
		}
		 if(z==1 || z==4 || z==7 || z==10 || z==16 || z==19 || z==22 || z==25){
		  return "bs-green";
		}
		 if(z==2 || z==5 || z==8 || z==11 || z==17 || z==20 || z==23 || z==26){
		  return "bs-blue";
		}
		return "bs-black";
	}
	
	bg.GetFdx = function (zhi) {
		if(zhi > 13) {
			return "小";
		} else {
			return "大";
		}
	}
	
	bg.GetFds = function(zhi) {
		if(zhi % 2 == 0) {
			return "单";
		} else {
			return "双";
		}
	}
	
	bg.GetFzh = function (zhi) {
		return bg.GetFdx(zhi)+bg.GetFds(zhi);
	}
	
	bg.GetLH = function(z1,z2){
		z1=parseInt(z1);
		z2=parseInt(z2);
		if(z1>z2){
			return "龙";
		}
		if(z1<z2){
			return "虎";
		}
		if(z1==z2){
			return "和";
		}
		return "";
	}
	
	bg.Get3y = function(z) {
		 if(z==0 || z==3 || z==6 || z==9 || z==12 || z==15 || z==18 || z==21 || z==24 || z==27){
		  return "0";
		 }
		 if(z==1 || z==4 || z==7 || z==10 || z==13 || z==16 || z==19 || z==22 || z==25){
		  return "1";
		 }
		 if(z==2 || z==5 || z==8 || z==11 || z==14 || z==17 || z==20 || z==23 || z==26){
		  return "2";
		 }
		return z%3;
	}
	
	bg.Get4y = function (z) {
		 if(z==0 || z==4 || z==8 || z==12 || z==16 || z==20 || z==24){
		  return "0";
		}
		 if(z==1 || z==5 || z==9 || z==13 || z==17 || z==21 || z==25){
		  return "1";
		}
		 if(z==2 || z==6 || z==10 || z==14 || z==18 || z==22 || z==26){
		  return "2";
		}
		 if(z==3 || z==7 || z==11 || z==15 || z==19 || z==23 || z==27){
		  return "3";
		}
	
		return z%4;
	}
	
	bg.GetZb = function (z){
		if(z>9 && z<18){
			return "中";
		}else{
			return "边";
		}
	}
	
	bg.compare = function (property,sort2){
	    return function(a,b){
	        var value1 = a[property][sort2];
	        var value2 = b[property][sort2];
	        return value2 - value1;
	    }
	}
	
	bg.compare2 = function (sort2){
	    return function(a,b){
	        var value1 = a[sort2];
	        var value2 = b[sort2];
	        return value2 - value1;
	    }
	}

	window.bg = window._b = bg;
}());
