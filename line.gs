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
    //var img=e.JSON.parse(image);
    outputLog("img")
    //画像データ(url)
    if(e.imagesize==1){
      var message = {
        "messages" : [
          {
            "type": "image",
            "originalContentUrl": e.image,
            'previewImageUrl': e.image
          },
          {
            "type" : "text",
            "text" : e.channelname + "にて\n" + e.name + "「"+e.message+"」"
          }
        ]
      };
    }else if(e.imagesize==2){
      var message = {
        "messages" : [
          {
            "type": "image",
            "originalContentUrl": e.image,
            'previewImageUrl': e.image
          },
          {
            "type": "image",
            "originalContentUrl": e.image1,
            'previewImageUrl': e.image1
          },
          {
            "type" : "text",
            "text" : e.channelname + "にて\n" + e.name + "「"+e.message+"」"
          }
        ]
      };
    }else if(e.imagesize==3){
      var message = {
        "messages" : [
          {
            "type": "image",
            "originalContentUrl": e.image,
            'previewImageUrl': e.image
          },
          {
            "type": "image",
            "originalContentUrl": e.image1,
            'previewImageUrl': e.image1
          },
          {
            "type": "image",
            "originalContentUrl": e.image2,
            'previewImageUrl': e.image2
          },
          {
            "type" : "text",
            "text" : e.channelname + "にて\n" + e.name + "「"+e.message+"」"
          }
        ]
      };
    }else if(e.imagesize==4){
      var message = {
        "messages" : [
          {
            "type": "image",
            "originalContentUrl": e.image,
            'previewImageUrl': e.image
          },
          {
            "type": "image",
            "originalContentUrl": e.image1,
            'previewImageUrl': e.image1
          },
          {
            "type": "image",
            "originalContentUrl": e.image2,
            'previewImageUrl': e.image2
          },
          {
            "type": "image",
            "originalContentUrl": e.image3,
            'previewImageUrl': e.image3
          },
          {
            "type" : "text",
            "text" : e.channelname + "にて\n" + e.name + "「"+e.message+"」"
          }
        ]
      };
    }
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
