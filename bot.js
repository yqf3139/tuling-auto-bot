'use strict';
console.log('bot js starts');

var BotApi = function (key, query, callback){
  var xhr = new XMLHttpRequest();
  var url = 'http://www.tuling123.com/openapi/api?key='+key+'&info=';
  xhr.open('GET', url+query, true);
  xhr.onload = function () {
      console.log(this.responseText);
      callback(this.responseText);
  };
  xhr.send();
}
