'use strict';
console.log('bot js starts');

var BotApiKey = 'ca94c42bbff13ed8710e26f100dfdf14';

var ChromeApi = function (url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
      // console.log(this.responseText);
      callback(this.responseText);
  };
  xhr.send();
}

var BotApi = function (query, callback){
  var xhr = new XMLHttpRequest();
  var url = 'http://www.tuling123.com/openapi/api?key='+BotApiKey;
  url += '&userid=asdf1234';
  url += '&loc=上海';
  xhr.open('GET', url+'&info='+query, true);
  xhr.onload = function () {
      console.log(this.responseText);
      var Obj = JSON.parse(this.responseText);
      if(Obj == null)return;
      if (Obj.code != 100000) {
        console.error(Obj);
      }
      callback(Obj.text);
  };
  xhr.send();
}
