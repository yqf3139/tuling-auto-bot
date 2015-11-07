'use strict';

console.log('content_scripts runs');

var BotHooks = [];
var parser = new DOMParser();

BotHooks.push(
  function () {

  }
);

document.onkeydown = function(e) {
	// 兼容FF和IE和Opera
	var theEvent = e || window.event;
	var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	var activeElement = document.activeElement;//当前处于焦点的元素的id
	if (code == 13 && activeElement == Bot.textarea) {
    console.log(code);
    var content = Bot.textarea.value;
    Bot.onAddPeopleDialog(content);
    BotApi(content ,function (msg) {
      Bot.onAddBotDialog(msg);
    });
    Bot.textarea.value = "";
		return false;
	}
	return true;
}

var trash;
var Bot = {
  historyTpl:null,
  botTpl:null,
  peopleTpl:null,
  boxTpl:null,
  diaList:null,
  onInit:function () {
    // create some html elements and then hide
    var dialogBoxUrl = chrome.extension.getURL('views/dialogbox.html');
    ChromeApi(dialogBoxUrl, function (raw) {
      var view = parser.parseFromString(raw, "text/html");
      Bot.boxTpl = view.children[0].children[1].children[0];
      document.body.appendChild(Bot.boxTpl);
      Bot.diaList = Bot.boxTpl.querySelector('#dialogbox');
      var button = Bot.boxTpl.querySelector('.bd-bear-dialog-send');
      Bot.textarea = Bot.boxTpl.querySelector('.bd-bear-dialog-input');
      button.addEventListener('click', function(){
        var content = Bot.textarea.value;
        Bot.onAddPeopleDialog(content);
        BotApi(content ,function (msg) {
          Bot.onAddBotDialog(msg);
        });
        Bot.textarea.value = "";
      });
    });
    var dialogBotUrl = chrome.extension.getURL('views/dialogbot.html');
    ChromeApi(dialogBotUrl, function (raw) {
      var view = parser.parseFromString(raw, "text/html");
      Bot.botTpl = view.children[0].children[1].children[0];
    });
    var dialogHistoryUrl = chrome.extension.getURL('views/dialoghistory.html');
    ChromeApi(dialogHistoryUrl, function (raw) {
      var view = parser.parseFromString(raw, "text/html");
      Bot.historyTpl = view.children[0].children[1].children[0];
    });
    var dialogPeopleUrl = chrome.extension.getURL('views/dialogpeople.html');
    ChromeApi(dialogPeopleUrl, function (raw) {
      var view = parser.parseFromString(raw, "text/html");
      Bot.peopleTpl = view.children[0].children[1].children[0];
    });
    // hook drag and hover

    // hook other website hookers
    for (var i = 0; i < BotHooks.length; i++) {
      BotHooks[i]();
    }
  },
  onWave:function () {
    // body...
  },
  onChatWindowShow:function () {
    if (Bot.boxTpl != null) {
      Bot.boxTpl.style.visibility = 'visible';
    }
  },
  onChatWindowHide:function () {
    Bot.boxTpl.style.visibility = 'hidden';
  },
  onAddPeopleDialog:function (msg) {
    var peopleDialog = Bot.peopleTpl.cloneNode(true);
    // debugger;
    var ctn = peopleDialog.querySelector('.bd-bear-dialog-item');
    ctn.textContent = msg;
    console.log('onAddPeopleDialog', msg);
    Bot.diaList.appendChild(peopleDialog);
    peopleDialog.scrollTop = peopleDialog.scrollHeight;
  },
  onAddBotDialog:function (msg) {
    var botDialog = Bot.botTpl.cloneNode(true);
    // debugger;
    var ctn = botDialog.querySelector('.bd-bear-dialog-content');
    ctn.textContent = msg;
    console.log(msg);
    Bot.diaList.appendChild(botDialog);
    botDialog.scrollTop = botDialog.scrollHeight;
  },
  onWindowSendMsg:function (query){
    // use onApiCallback to callback

  },
  onUserDragText:function (raw) {
    // body...
  },
  onUserHoverText:function (raw) {
    // body...
  },
  onApiCallback :function (msg) {
    // body...
  },
}

function extractKeywords() {
  var titles = document.title.split(' ');
  var maxIdx = 0;
  for (var i = 0; i < titles.length; i++) {
    if (titles[maxIdx].length < titles[i].length) {
      maxIdx = i;
    }
  }
  console.log('keyword ', titles[maxIdx]);
  return titles[maxIdx];
}

// schedules
// every minite invoke
function Schedule(name, interval, query, callback) {
  this.counter = 0;
  this.name = name;
  this.interval = interval;
  this.query = query;
  this.callback = callback;
}

var scheduler = {
  schedules: [
    new Schedule("lauch",5,"午餐菜谱",function (msg) {

    }),
    new Schedule("weather",3,"今日上海天气",function (msg) {

    }),
    new Schedule("news",10,"我要看新闻",function (msg) {

    }),
  ],
  que:[],
  start:function () {
    setInterval(scheduler.loop, 1000*60);
  },
  loop:function () {
    for (var i = 0; i < scheduler.schedules.length; i++) {
      var item = scheduler.schedules[i]
      item.counter++;
      if (item.counter == item.interval) {
        que.push(item);
      }
    }
    if(scheduler.schedules.length == 0)return;
    var s = scheduler.schedules.shift();
    scheduler.run(s);
  },
  run:function (s) {
    if(document.hidden)return;
    BotApi(s.query,function (msg) {
      console.log(s.name, msg);
      s.callback(msg);
    });
  }
}

$(document).ready(function() {
  scheduler.start();
  Bot.onInit();
  Bot.onChatWindowShow();
  console.log('onInit');
  setTimeout(function () {
    Bot.onChatWindowShow();
    var kw = extractKeywords();
    Bot.onAddPeopleDialog(kw);

    BotApi(kw ,function (msg) {
      Bot.onAddBotDialog(msg);
    });
  },2000);
});
