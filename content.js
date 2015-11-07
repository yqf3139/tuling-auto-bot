'use strict';

console.log('content_scripts runs');

var botImage

var Bot = {
  image: null,
  onInit: function () {
    // body...
  },
  setEvent: function() {
    // ...
  },
  onShow:function () {
    // body...
  },
  onHide:function () {
    // body...
  },
  onPopSingleMsg:function () {
    // body...
  },
  onWave:function () {
    // body...
  },
  onChatWindowShow:function () {
    // body...
  },
  onChatWindowHide:function () {
    // body...
  },
}

  
$.get(chrome.extension.getURL('/views/bot.html'), function(data) {
  $(data).appendTo('body');
});
// schedules
// every minite invoke

// BotApi('今天天气如何',function (msg) {
//   console.log(msg);
// });
