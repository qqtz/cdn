var app = new Framework7({
  root: '#app',
  name: '雪球',
  theme: 'ios', 
  id: 'com.Box.xueqiu',
  version:'3.0.1',
  panel: {
    swipe: 'left',
  },
  fastClicks: false,
  view: {
    stackPages: true
  },
  popup: {
    closeByBackdropClick: false,
  },
  data: function(){
  	
  },
 routes: [
    {
      path: '/actionSet/',
      componentUrl: 'view/actionSet.html',
    },
    {
      path: '/userrec/',
      url: 'view/userRec.html',
    },
    {
      path: '/feedback/',
      url: 'view/feedback.html',
    },
    {
      path: '/help/',
      url: 'view/help.html',
    },
    {
      path: '/user/',
      componentUrl: 'view/user.html',
    },
    {
      path: '/nameEdit/',
      url: 'view/nameEdit.html',
    },
    {
      path: '/invite/',
      componentUrl: 'view/invite.html',
    },
    {
      path: '/verUp/:msg',
      componentUrl: 'view/verUp.html',
    },
    {
      path: '/moneylog/',
      componentUrl: 'view/userMoney.html',
    },
	{
      path: '/ScoreLog/',
      componentUrl: 'view/userScoreLog.html',
    },
    {
      path: '/pk10/:mode',
      componentUrl: 'view/pk10.html',
    },
    {
      path: '/post/:postid',
      componentUrl: 'view/post.html',
    },
    {
      path: '/result/:type/:tip',
      componentUrl: 'view/result.html',
    },
  ],
  dialog: {
  	buttonOk: '确定',
  	buttonCancel: '取消'
  },
});

//

var $$ = Dom7;

var mainView = app.views.create('#view-home', {
  url: '/'
});

var mineView = app.views.create('#view-mine', {
  url: '/',
});

var dataView = app.views.create('#view-data', {
  url: '/',
});

var yuceView = app.views.create('#view-yc', {
  url: '/'
});

var szView = app.views.create('#view-sz', {
  url: '/'
});
//config
//
if(!window.plus){
	bg.getContent();
};
