/*
 * LINEBotへメッセージを送信処理
 */
function sendLineMessage(e) {
  // メッセージの内容(送信先と内容)
  console.log(e);
  //送られてきたメッセージに画像がない場合
  if(!e.image){
    if(e.message==null) return ;
    //テキストメッセージ
    var message = {
      "messages" : [
        {
          "type" : "text",
          "text" : e.channelname + "にて\n" + e.name + "「"+e.message+"」"
        }
      ]
    };
  }else{
    //画像データ(url)
    var message = {
      "messages" : [
        {
          "type": "image",
          "originalContentUrl": e.image,
          'previewImageUrl': e.image
        }
      ]
    };
  }
  // LINEにpostするメッセージデータ
  var replyData = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(message)
  };
  // LINEにデータを投げる
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", replyData);
  // LINEにステータスコード200を返す
  return response.getResponseCode();
}
