// Messaging APIのチャネルアクセストークン
var CHANNEL_ACCESS_TOKEN = "";
//Glitch側のURL
var GLITCH_URL = "";

// Glitchサーバーを起動させる
function wakeGlitch(){
 var json = {
   'type':'wake'
 };
 sendGlitch(GLITCH_URL, json);
}

function sendGlitch(uri, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(uri, params);
}
/*
 * ボットイベント処理
 */
//トリガーはここ
function doPost(e) {
  try{
    var events = JSON.parse(e.postData.contents).events;
    //当月分のpushメッセージ数
    var quota = pushTotal();
    var day = new Date();
    // 今日の日付を表示
    var today = day.getDate();
    //月末の日にちを取得
    var date = new Date(day.getFullYear(), day.getMonth()+1, 0);
    var endMonth = date.getDate();
    outputLog(endMonth);
    //botの友達数を取得
    var botFriend = friendCount(); 
    outputLog(botFriend);
    //1000/endMonth<botFriend+quota && 1000/endMonth>quota
    events.forEach(function(event) {
      //outputLog(event.type);
      //LINEからのメッセージの場合
      if(event.type == "message") {
        sendToDiscord(event); // D-bot
      //Discordからのメッセージの場合
      }else if(event.type == 'discord') {
        //1日に(1000/月末日)件以上送った場合送信しない
        outputLog(quota);
        outputLog(today);
        outputLog(botFriend);
        outputLog(1000/endMonth);
        outputLog((quota+botFriend)/today);
        if(quota/today>=1000/endMonth){
          return 0;
        }
        if((quota+botFriend)/today>1000/endMonth) angryDiscord();
        sendLineMessage(event);
      }
      //console.log("Devil May Cry");
    });
  }catch(TypeError){
    wakeGlitch();
  }
}

//スプレッドシートに書き出し
function outputLog(txt) {
  //スプレッドシートのid
  var id = "";  
  var spreadSheet = SpreadsheetApp.openById(id);
  //シート名
  var sheetName = "シート1";
  
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), txt]
  );
}
