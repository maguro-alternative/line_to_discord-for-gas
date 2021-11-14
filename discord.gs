// D-bot
function sendToDiscord(e) {
  // LINEからユーザ名を取得するためのリクエストヘッダー
  var requestHeader = {
    "headers" : {
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    }
  };
  //outputLog(e.source.userId);
  var userID = e.source.userId;
  //var groupid_tmp = e.source.groupId;
  // LINEにユーザープロフィールリクエストを送信(返り値はJSON形式)
  //outputLog(e.source.groupId);
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/profile/"+userID, requestHeader);
  
  var message = e.message.text;
  // レスポンスからユーザーのディスプレイネームを抽出
  var name = JSON.parse(response.getContentText()).displayName;
  if(e.message.type === 'image'){
    outputLog(e.message.id);
    var image = getImage('https://api-data.line.me/v2/bot/message/'+e.message.id+'/content');
    var gyazo = JSON.parse(gyazoup(image.getBlob()));
    outputLog(gyazo.url);
    sendDiscordImage(name, gyazo);
  }else{
    sendDiscordMessage(name, message);
  }
  // LINEにステータスコード200を返す(これがないと動かない)
  return response.getResponseCode();
}
//lineから送られてきたテキストメッセージをdiscordにWebhookで送信
function sendDiscordMessage(name, message) {
  var webhookURL = "";
  // Discord webhookに投げるメッセージの内容
  outputLog(name);
  var options = {
    "content" : name+" 「"+message+"」"
  };
  // データを作って投げる
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
  // こちらはステータスコードを返す必要はない
}
//lineから送られてきた画像をdiscordに埋め込み形式でWebhookに送信
function sendDiscordImage(name, gazou) {
  var webhookURL = "";
  var options = {
    "content" : name,
    "embeds": [{
      "image": {
        "url": gazou.url
      }
    }]
  };
  outputLog(gazou.url);
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
}
//1日のpush上限を超えそうな場合
function angryDiscord(){
  var webhookURL = "";
  var options = {
    "content" : "@everyone 本日分のpush上限になりました。\nちょっとは遠慮してください。"
  };
  // データを作って投げる
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
}
