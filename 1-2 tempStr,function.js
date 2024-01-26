

//テンプレート文字列、文字列連携


//従来の文字列連結
console.log(lastname + ", " + firstName + " " + middleName);

//テンプレート文字列
console.log("${lastname},${firstName} ${middleName)$");


const email = 
" Hello ${firstName},Thanks for ordering ${qty} tickets to ${event}.";

// Oder Details
// ${firstName} ${middleName} ${lastName}
//   ${qty} x $${price} = $${qty*price} to ${event}

//   You can pick your tickets up 30 minutes before the show.
  
//   Thanks,
//   ${ticketAgent}";

document.body.innnerHTML = `
<section>
  <header></header>
<article>
  <h2>${article.title}</h2>
  ${article.body}
</article>`


//関数宣言

function logCompliment(){
  console.log("You're doing great!");
}

logCompliment();

//関数式

const logCompliment = function(){
  console.log("You're doing great!");
}

logCompliment();

//関数宣言と関数式の問題点。関数宣言は、巻き上げが起こる。=使用する変数は後から宣言できる。

//しかし、関数式として変数に代入した場合は巻き上げが起こらない。つまり関数宣言より前に、関数を

//宣言よりも前に関数を呼び出せる
hey();
//関数宣言
function hey(){
  alert("hey!");
}

//宣言よりも前に関数を呼び出せない
//この場合エラーになる
hey();
//関数式
const hey = function(){
  alert("hey!");
}


//2.2.2.1 関数の引数

const logCompliment = function(firstName,message){
  console,log("You're doging great,${firstName}:${message}");
};

logCompliment("Molly");

//2.2.2.2 戻り値

const createCompliment = function(firstName,message){
  return "${firstName}:${message}";
};

createCompliment("molly","you're so cool");


//2.2.3 デフォルト引数
function logActivity(name="Shane McConkey",activity="skiing"){
  console.log("${name}loves ${activity}");
}

//引数無で呼び出した場合でも、デフォルト値で補われたメッセージが表示される。

//2.2.4 アロー関数

lordify = "";


const lordify = function(firstName){
  return "${firstName} of Canterbury";
};

//これをアロー関数に直す
const lordifya = firstName => "${firstName}of centrybury";

//アロー関数を使うと、まず、functionキーワードが不要。
//さらに戻り値が単一の式ならば、returnキーワードも不要
//さらに引数がひとつだけならば、引数を囲む()も省略できる。

const lordifyb = (firstName,land) = "${firstName}of ${land}";
//引数が複数の場合

const lordifyf =(firstName,land) =>{
  if(!firstName){
    throw new Error("A firstName is required to lordifiy");
  }

  if(!land){
    throw new Error("A land must have a land");
  }

  return "${firstName}of ${land}";
};
console.log(lordifyf("tanaka","japan"));// tanaka of japan
//アロー関数の内部に複数のステートメント。

//2.2.4.1 オブジェクトの返却

const person = (firstName,lastName)=>
{
  first; firstName,
  last; lastName
};
console.log(person("Brad","Jason"));

//上記はエラー。SyntaxError:Unexpected token
//エラーを解消するには、戻り値のオブジェクトを括弧で囲む必要がある

const personc = (firstName,lastName) => ({
  first: firstName,
  last: last
});

//JavaScriptで間違いやすい点。
//アロー関数をインラインで記述するときは、戻り値のオブジェクトを括弧で囲むようにしましょう。


//2.2.4.2 アロー関数とスコープ

const tahoe ={
  mountains:["Freel","rose","tallac","Rubicon","silver"],
  print:function(delay = 1000){
    setTimeout(function(){
      console.log(this.mountains.join(", "));      
    }, delay);
  }
};

//定数オブジェクトtahoeには、
//配列を宣言する
//printメソッドを持つ。 
//setTimeout のディレイ秒＝1000ミリ秒の遅延を待つ。
//遅延経過後にコンソールログに、this.mountains配列の要素を、カンマで結合して表示する

tahoe.print(); //TypyError :Cannot read property "join" of undefined

//しかしこのとき、this.はtahoeオブジェクトであることを期待しているが、エラーになっています。
//console.log(this);で中身を見ていると、window()とウィンドウオブジェクトが入っていることになっている。

const tahoe2 ={
  mountains:["Freel","rose","tallac","Rubicon","silver"],
  print:function(delay = 1000){
    setTimeout(()=> {
      console.log(this.mountains.join(", "));      
    }, delay);
  }
};

//上記のコードは意図通り動く。理由はアロー関数は通常の関数と違い、独自スコープを持たないため。
//通常の関数宣言では、呼び出されたところでthisが定まる。
//しかし、setTimeoutのコールバック関数は非同期で実行されるため、新たな実行コンテキストに変わってしまう。

const tahoe3 ={
  mountains:["Freel","rose","tallac","Rubicon","silver"],
  print:(delay = 1000)=> {
    setTimeout(()=> {
      console.log(this.mountains.join(", "));      
    }, delay);
  }
};

//printメソッドもアロー関数にした場合。エラーになる。
//print関数がアロー関数であるため、thisはtahoeオブジェクトを無視してしまう。
//thisは、通常の関数ならば、実行時点、オブジェクトの内部の位置に潜ってから位置を補足するが、
//アロー関数の場合は、作成時点、オブジェクト自体を作った位置、その内部に潜る前の位置を補足してしまう。


//通常の関数宣言　→関数が実行されたタイミングの実行コンテキストによってthisが定まる。
//動的なthis

//アロー関数 →関数が宣言されたタイミングで外側のスコープのthisを補足する。
//静的なthis




//そもそもthisとは。
//グローバルコンテキスト
//thisは、グローバルコンテキスト（関数やメソッドの外側）では、通常はwindowオブジェクトを指す。ブラウザ環境。

//関数内
//関数が通常の関数宣言の場合、thisはその関数が呼び出されたコンテキストによって変わる。
//strictモードではthisがunderfindになる。

//オブジェクトのメソッド
//オブジェクトのメソッド内でthisを使用すると、そのメソッドが属しているオブジェクトを指す。

//コンストラクタ関数
//コンストラクタ関数内でthisを使用すると、新しく作成されるインスタンスを指す。

//イベントハンドラやコールバック関数。
//この場合、呼び出し元や実行コンテキストによって異なる
//アロー関数を使えば、関数が宣言された時点のスコープを保持するためthis問題を回避できる。


//strictモードとは
//jsのコードのエラーを見つけやすくするため、不安定な、または過去のバージョンのJSの機能を禁止するモード。
//コードの先頭か、関数の先頭に”use strict”;と記述する

//以下のような変更がある。
//未宣言の変数を使用するとエラーが発生する。
//削除できない変数、関数、関数の引数を削除しようとするとエラーが発生する
//厳密な関数の引数のチェック。引数の数が足りない時にエラーが発生する。
//thisの厳密な処理。関数内でのthisの値がundefinedとなる。




//2.3 javascriptのコンパイル

//ESの新機能が、すべてのブラウザで実装されているとは限らない。
//しかしその機能を使いたいというとき。
//新しい構文で記述されたコードを、古い構文で記述されたコードに予め変換する。

//この前工程を、コンパイルもしくはトランスコンパイルという。
//もっとも有名なのはBabelというコンパイルツール。

//もともとJSはほかの言語と違い、コンパイルせずにブラウザでそのまま実行できるスクリプト言語。これが登場以降は、むしろコンパイルしてから実行するのが当たり前になった。

//そこでソースコード/実行コードという概念がJSに導入された。
//最新のJS/実際にブラウザで実行されるJS

//const add = (x = 5,y=10)=> console.log(x+y);

//というコードはbabelによってこう変換される。

"use strict";

var add = function add() {
  var x =
    arguments.length <= 0 || arguments[0] === undefined ? 5 : arguments[0];
  var y =
    arguments.length <= 1 || arguments[1] == undefined ? 10 : arguments[1];
  return console.log(x +y);
}

//babelはまず　use strict 指示子を挿入し、strictモードで実行することを宣言。
//アロー関数は通常の関数式に書き変えられる。
//関数内では参考演算子で、arguments配列をチェックすることで、デフォルト引数のロジックをt実現する。

//babel自体はwebpack やparcelというツールに統合されているため、開発者がbabelを直接意識する場面は少ない。通常のコンパイルの処理はツールにより自動化されている。

























