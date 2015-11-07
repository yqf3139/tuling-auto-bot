'use strict';

console.log('content_scripts runs');

var botImage

var Bot = {
  image: null,
  onInit: function () {
    // body...
    var self = this
    this.image = $('<img />', {
      src: 'https://octodex.github.com/images/daftpunktocat-thomas.gif'
    });
    this.setEvent();
    
    $(function() {
      var d = document;
      var body = $(document.body);

      self.image
      .addClass('bot')
      // .appendTo(body)

    });

  },
  setEvent: function() {
    // ...
  },
  onShow:function () {
    // body...
    this.image.fadeIn()
  },
  onHide:function () {
    // body...
    this.image.fadeOut()
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

var popupMenu = {
  menu: [],
  init: function() {
    this.menu = [
      'todo',
      'douban',
      'zhihu',
    ]
    this.menu.forEach(function(li) {
      
    })
  },
}

Bot.onInit()
  
$.get(chrome.extension.getURL('/views/bot.html'), function(data) {
  console.log(data);
  $(data).appendTo('body');
});
// schedules
// every minite invoke

// BotApi('今天天气如何',function (msg) {
//   console.log(msg);
// });
