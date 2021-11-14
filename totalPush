//当月分のプッシュ数を取得し、1日分の上限を定める
function pushTotal() {
  //console.log(e);
  var date = new Date();
  // 今日の日付を表示
  var day = date.getDate();
  //利用状況をリクエスト(ついでにパース)
  var quota = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/message/quota/consumption", {
      "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  //outputLog(quota);
  //当月分のプッシュ数を代入
  var t = quota.totalUsage;
  outputLog(t);
  outputLog(day);
  outputLog(t/day);
  //outputLog(e);
  return t/day;
}
//友達数を取得する関数
function friendCount(){
  var date = new Date();
  var today = Utilities.formatDate( date, 'UTC+9', 'yyyyMMdd');
  var friend = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/insight/followers?date="+today, {
        "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  return friend.followers;
}
