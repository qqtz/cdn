
Array.prototype.inArray=function(str){
	for(var i=0,len=this.length;i<len;i++){
		if(this[i]==str) return true;
	}
	return false;
};

function Dialog(opt){
	//默认值
	this.options={
		title:'对话框',
		content:'',
		width:400,
		height:'auto',
		callback:null,
		buttons:['close','cancel','ok'],
		close_time:0,
		drag_able:false,
		border_radius:0,
		modal:true,
		left:null,
		top:null,
		padding:2,
		animation:false
	};
	
	if(opt){
		for(var key in opt){
			this.options[key]=opt[key];
		}
	}
	//console.log(this.options);
	var self=this;
	
	this.dialog_modal=document.createElement('div');
	this.dialog_modal.className='tm__mask';
	
	var screen_height=window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight;
	var screen_width=window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;
	var doc_height=document.body.scrollHeight;
	var doc_width=document.body.scrollWidth;
	
	this.dialog_modal.style.width=doc_width>screen_width?doc_width:screen_width;
	this.dialog_modal.style.height=doc_height>screen_height?doc_height:screen_height;
	
	this.dialog_title=document.createElement('div');
	this.dialog_title.className='tm__title';
	this.dialog_title.innerHTML=this.options.title;
	
	this.dialog_close_btn=document.createElement('button');
	this.dialog_close_btn.className='tm__close_btn';
	this.dialog_close_btn.innerHTML='&#10005;';
	
	this.dialog_content=document.createElement('div');
	this.dialog_content.className='tm__content';
	this.dialog_content.innerHTML=this.options.content;
	this.dialog_content.style.padding=this.options.padding+'px';
	
	this.dialog_button_div=document.createElement('div');
	this.dialog_button_div.className='tm__foot_div';
	
	this.dialog_cancel_button=document.createElement('button');
	this.dialog_cancel_button.className='tm__btn __cancel_btn';
	this.dialog_cancel_button.innerHTML='取消';
	
	this.dialog_ok_button=document.createElement('button');
	this.dialog_ok_button.className='tm__btn __submit_btn';
	this.dialog_ok_button.innerHTML='确定';
				
	this.dialog_element=document.createElement('div');
	this.dialog_element.className='tm__box';
	this.dialog_element.style.width=this.options.width+'px';
	if(this.options.border_radius>0)
		this.dialog_element.style.borderRadius=this.options.border_radius+'px';
	
	this.dialog_element.appendChild(this.dialog_title);
		
	this.dialog_element.appendChild(this.dialog_close_btn);
	this.addEvent(this.dialog_close_btn,'click',function(){			
		if(self.options.callback){
			self.options.callback('close');
		}
		self.close();
	});

	this.dialog_element.appendChild(this.dialog_content);
	this.dialog_button_div.appendChild(this.dialog_cancel_button);
	this.dialog_button_div.appendChild(this.dialog_ok_button);
	this.dialog_element.appendChild(this.dialog_button_div);
			
	this.addEvent(this.dialog_cancel_button,'click',function(){			
		if(self.options.callback){
			self.options.callback('cancel');
		}
		self.close();
	});


	this.addEvent(this.dialog_ok_button,'click',function(){			
		if(self.options.callback){
			self.options.callback('ok');
		}
		self.close();
	});

	this.setButton();
	
	var body=document.getElementsByTagName('body')[0];
	body.appendChild(this.dialog_modal);
	body.appendChild(this.dialog_element);	
	
	
}

Dialog.prototype.setButton=function(){
	if(this.options.buttons.inArray('close')){
		this.dialog_close_btn.style.display='inline-block';
	}else{
		this.dialog_close_btn.style.display='none';
	}
	
	if(this.options.buttons.inArray('cancel')){
		this.dialog_cancel_button.style.display='inline-block';
	}else{
		this.dialog_cancel_button.style.display='none';
	}
	
	if(this.options.buttons.inArray('ok')){
		this.dialog_ok_button.style.display='inline-block';
	}else{
		this.dialog_ok_button.style.display='none';
	}
	
	if(this.options.buttons.inArray('cancel') || this.options.buttons.inArray('ok')){
		this.dialog_button_div.style.display='block';
	}else{
		this.dialog_button_div.style.display='none';
	}
}

Dialog.prototype.showFrame=function(title,url,width,height){//显示frame网页
	var frame='<iframe src="'+url+'" id="__dialog_frame" width="'+width+'" height="'+height+'" frameborder="no" border="0" marginwidth="0" marginheight="0" ></iframe>';	
	this.options.width=width+this.options.padding*2;	
	if(this.options.height!='auto'){
		this.options.height=height+27+this.options.padding*2;
	}else this.options.height=height;	
	this.show(title,frame);
	var ifm= document.getElementById("__dialog_frame");	
	ifm.src=url;
}

//取得浏览器窗口大小
Dialog.prototype.get_window_size=function(){
		var de=document.documentElement;
		var h=window.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
		var w=window.innerWidth || (de && de.clientWidtht) || document.body.clientWidth;
		return {width:w,height:h};
		
}
	
//取得文档高度>=window.height
Dialog.prototype.get_document_size=function(){
	var width=document.body.scrollWidth;
	var height=document.body.scrollHeight;
	var wsize=this.get_window_size();
	width=wsize.width>width?wsize.width:width;
	height=wsize.height>height?wsize.height:height;
	return {width:width,height:height};
}

//取当前滚动位置
Dialog.prototype.get_scroll_info=function(){
	var de=document.documentElement;
	var x=window.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
	var y=window.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
	return {x:x,y:y};
}
	
Dialog.prototype.show=function(title,content){
	var self=this;
	this.setButton();
	this.dialog_content.style.padding=this.options.padding+'px';
	if(title){
		this.options.title=title;
		this.dialog_title.innerHTML=title;
	}
	if(content){
		this.options.content=content;
		this.dialog_content.innerHTML=content;
	}
	if(content.indexOf('</iframe>')!=-1 && this.options.height=='auto'){
			var ifm= document.getElementById("__dialog_frame");			
			this.addEvent(ifm,'load',function(){//只有在onload时才能正确取得iframe的高度
				ifm.height=ifm.contentDocument.body.offsetHeight+4;
				self.setCenter(self);
			});	
	}
	var doc_size=self.get_document_size();
	this.dialog_element.style.width=this.options.width+'px';	
	if(this.options.modal){
		self.dialog_modal.style.height=doc_size.height+'px';
		self.dialog_modal.style.display='block';
	}
	this.dialog_element.style.display='block';
	//调整对话框位置
	if(this.options.left && this.options.top){
		this.dialog_element.style.left=this.options.left+'px';
		this.dialog_element.style.top=this.options.top+'px';
	}else{//居中		
		this.setCenter();
	}
	if(this.options.animation){
		if(this.supportCss3('transition')){
			this.dialog_element.style.transition='none';
			this.dialog_element.style.transform='scale(0.01,0.01)';		
			setTimeout(function(){
				self.dialog_element.style.transition='transform 0.4s';
				self.dialog_element.style.transform='scale(1,1)';
			},0);
		}
	}
	if(this.options.close_time>0){
		setTimeout(function(){self.close(self)},this.options.close_time);
	}

}

/** 
* 判断浏览器是否支持某一个CSS3属性 
* @param {String} 属性名称 
* @return {Boolean} true/false 
*/
 
Dialog.prototype.supportCss3=function(style) { 
var prefix = ['webkit', 'Moz', 'ms', 'o'], 
i, 
humpString = [], 
htmlStyle = document.documentElement.style, 
_toHumb = function (string) { 
return string.replace(/-(\w)/g, function ($0, $1) { 
return $1.toUpperCase(); 
}); 
}; 
 
for (i in prefix) 
humpString.push(_toHumb(prefix[i] + '-' + style)); 
 
humpString.push(_toHumb(style)); 
 
for (i in humpString) 
if (humpString[i] in htmlStyle) return true; 
 
return false; 
}

//设置居中
Dialog.prototype.setCenter=function(self){
	if(self==undefined){
		self=this;
	}
	var win_size=self.get_window_size();
	var scroll_info=self.get_scroll_info();
	if(self.options.height=='auto'){
		//取得高度
		var size=self.getSize(self.dialog_element);
		var left=scroll_info.x+(win_size.width-size.width)/2;
		var top=scroll_info.y+(win_size.height-size.height)/2;
		self.dialog_element.style.left=left+'px';
		self.dialog_element.style.top=top+'px';		
	}else{
		var left=scroll_info.x+(win_size.width-self.options.width)/2;
		var top=scroll_info.y+(win_size.height-self.options.height)/2;
		self.dialog_element.style.left=left+'px';
		self.dialog_element.style.top=top+'px';			
	}
}

Dialog.prototype.close=function(self){
	if(!self) {
		self=this;
	}
	if(this.options.animation && this.supportCss3('transition')){
			this.dialog_element.style.transform='scale(0.01,0.01)';	
			setTimeout(function(){
				self.dialog_element.style.display='none';
				self.dialog_modal.style.display='none';
			},400);
	}else{
		self.dialog_element.style.display='none';
		self.dialog_modal.style.display='none';
	}

	
}

Dialog.prototype.addEvent = function( obj, eventname, callback ){
        //其他浏览器
        if(window.addEventListener){
            obj.addEventListener( eventname, callback, false );
        }
        //ie
        else{
            obj.attachEvent( 'on'+eventname, callback ); 
        }
        return;
}

/*取得元素宽度和高度的函数
返回 {width:宽度,height:高度}
当内容里面含有图片时，无法取得正确的高度，因为当时图片还未加载完成。
*/
Dialog.prototype.getSize=function(obj){
	if(obj.style.display!='none'){//元素可见
		return {width:obj.offsetWidth,height:obj.offsetHeight};
	}else{
		//保存原有CSS设置
		var display=obj.style.display;
		var visibility=obj.style.visibility;
		var position=obj.style.position;
		obj.style.position='absolute';		
		obj.style.visibility='hidden';
		obj.style.display='block';
		var size={width:obj.offsetWidth,height:offsetHeight};
		obj.style.display=display;
		obj.style.position=position;		
		obj.style.visibility=visibility;		
		return size;
	}
}