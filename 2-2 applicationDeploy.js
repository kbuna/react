
//アプリケーションの構築。
//デジタル時計の実装。

//機能要求としては、時分秒と午前/午後の表示。
//時分秒は、それぞれ２桁の数値で表現され、かつ毎秒更新されなければならない。
//まずは命令型のやり型で実装。



//現在時刻を毎秒ログ出力
setInterval(logClockTime,1000);

function logClockTime(){
  //フォーマットされた現在時刻を取得する
  let time = getClockTime();

  //コンソールをクリアしてからログを出力する
  console.clear();
  console.log(time);
}

function getClockTime(){
  //現在時刻のDateオブジェクトを習得する
  let date = new Date();
  //let time = "";

  //Dateオブジェクトを時刻を表すオブジェクトに返還する
  let time ={
    hours: date.getHours(),
    minutes:date.getMinutes(),
    seconds:date.getSeconds(),
    ampm: "AM"
  }

  //午前/午後を意識した時刻に変換する
  if(time.hours == 12){
    time.ampm = "PM";
  }else if (time.hours > 12){
    time.ampm = "PM";
    time.hours -= 12;
  }

  //時の前にゼロを付ける
  if(time.hours < 10){
    time.hours = "0" + time.hours;
  }

  //分の前にゼロを付ける
  if(time.minutes < 10){
    time.minutes = "0" + time.minutes;
  }

  //秒の前にゼロを付ける
  if(time.seconds < 10){
    time.seconds = "0" + time.seconds;
  }
 
  //時刻を"hh:mm:ss AM/PM"の形式にする
  return time.hours + ":" + time.minutes + ":" + time.seconds + " " + time.ampm;
}
