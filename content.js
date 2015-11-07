'use strict';

console.log('content_scripts runs');

var Bot = {
  onSnit:function () {
    // body...
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

var d = document
var body = $(document.body)

var botImage = $('<img />', {
  src: 'https://octodex.github.com/images/daftpunktocat-thomas.gif'
})
.addClass('bot')
.appendTo(body)
// .attr('src', )
console.log('append', botImage)
// body.append(botImage)


// schedules
// every minite invoke

// BotApi('今天天气如何',function (msg) {
//   console.log(msg);
// });
