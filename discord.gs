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
    "content" : name+"\n"+gazou.url
    /*"embeds": [{
      "image": {
        "url": gazou.url
      }
    }]*/
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
  let angry=["本日分のpush上限になりました。\nちょっとは遠慮してください。",
             "いい加減にしなさい。もうプッシュ上限ですよ。",
             "何回言えばいいんだ！！プッシュ上限やぞ！！",
             "月1000だから警告します！プッシュ上限行きました！！！！！",
             "プッシュ上限DAAAAAAAAAAAAAAAAAAAAA!!",
             "HikakinTVでプッシュ上限とか言ったことあんまないけど",
             "初めてですよ、ここまで私をコケにしたおバカさんたちは、、、、",
             "初めてですよ、ここまでメッセージプッシュをしたおバカさんたちは、、、、",
             "ふざけたことを、シグマ！！！！！",
             "LINEAPIがゴミすぎる！！！！！！もうプッシュ上限行っちまった！！！！",
             "https://i.gyazo.com/f33c91b679db9d43e487a361af71c24b.jpg",
             "https://i.gyazo.com/823876944f308a302385d5c3796e8807.jpg",
             "https://cdn.discordapp.com/attachments/838941939935084544/909080685875195904/27459C4A-CE79-420A-A00B-E75736145E43.jpg",
             "https://cdn.discordapp.com/attachments/838941939935084544/905718258034941952/E5CE1C31-63A0-4203-9BDE-6623A42D008F.jpg",
             "https://i.gyazo.com/cc676d2a5c59250f3d4f3fba83e20553.png",
             "https://i.gyazo.com/af5e076ed50ae2dae0b2b772a7fa7cfe.png",
             //"https://discord.com/channels/838937935822585928/838937936283828224/838941419141464064",
             "もうキレキレkinですよもう。"];
  var angmes=angry[Math.floor(Math.random()*angry.length)]
  var options = {
    "content" : "@everyone "+angmes
  };
  outputLog("angry!! Fuck you!!!");
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
