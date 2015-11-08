'use strict';
console.log('bot js starts');

var BotApiKey = 'ca94c42bbff13ed8710e26f100dfdf14';

var msgDialog = $('#react');
var loader = $('.loader');

var ChromeApi = function (url, callback){
  loader.show();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
      // console.log(this.responseText);
      callback(this.responseText);
  };
  xhr.send();
}

var BotApi = function (query, callback){
  loader.show();
  var xhr = new XMLHttpRequest();
  var url = 'http://www.tuling123.com/openapi/api?key='+BotApiKey;
  url += '&userid=asdf1234';
  url += '&loc=上海';
  xhr.open('GET', url+'&info='+query, true);
  xhr.onload = function () {
      // console.log(this.responseText);
      var Obj = JSON.parse(this.responseText);
      if(Obj == null)return;
      // if (Obj.code != 100000) {
      // }
      console.log(Obj);
      Dialog.setContent(Obj.text);
      Rule.filter(Obj);
      callback(Obj.text);
  };
  xhr.send();
}

var TagApi = function (data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://10.209.203.6:3000/word/tag', true);
  xhr.onload = function () {
      // console.log(this.responseText);
      callback(this.responseText);
  };
  console.log("text="+encodeURI(data.text));
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("text="+encodeURI(data.text));
}

var BotServerApi = {
  url: 'http://localhost:3000/',
  post: function(queries, done, fail) {
    $.post(BotServerApi.url, queries)
    .done(done)
    .fail(fail)
  },
  get: function(queries, done, fail) {
    $.get(BotServerApi.url, queries)
    .done(done)
    .fail(fail)
  },
}

var Rule = {
  filter: function(message) {
    if (message.text.indexOf('新闻') >= 0) {
      Rule.newsFilter(message.list);
    }
    else if (message.text.indexOf('菜谱') >= 0) {
      Rule.cookFilter(message.list)
    }
  },

  newsFilter: function(newsList) {
    if (newsList && newsList.length) {
      var len = Math.min(newsList.length, 4)
      for (var i = 0; i < len; i++) {
        Dialog.setContent(newsList[i], 'news')
      }
    }
  },
  cookFilter: function(cookList) {
    if (cookList && cookList.length) {
      var len = Math.min(cookList.length, 3)
      for (var i = 0; i < len; i++) {
        Dialog.setContent(cookList[i], 'cook')
      }
    }
  },

}
