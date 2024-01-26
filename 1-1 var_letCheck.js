


var topic = "js";

if(topic){
  var topic = "rs";
  console.log("block",topic)
}
console.log("gloval",topic)

var topic ="js";

if(topic){
  let topic = "React";
  console.log("gloval",topic)}
  console.log("gloval",topic);




  //ID”コンテナ”の文字情報を取得して格納する。
  //for文により、5回繰り返す。
  //div型のタグを生成して、それぞれのタグを付与する。
  //div型をクリックしたとき、1-5のalertを鳴らす。
  //コンテナ文字列
  var div,container = document.getElementById("container");
  
  //・Jsにおいて複数の変数を同時に宣言する
  //var a , b=2 , c=3, d , e=5;
  //たとえば、こういう宣言になる。
  //ちなみにPythonの場合、変数の宣言が必要ないため
  //a, b, c, d, e = None, 2, 3, None, 5
  //print(a,b,c,d,e)
  //となる。

  //そもそも変数宣言とは、変数がどのような型のデータを保持するか、名前を通じて識別できるようにするもの。
  //変数名、その変数を識別するための名前。この名前でプログラムで変数にアクセスする。
  //データ型、変数が保持できるデータの種類。整数浮動小数点文字列など。
  //初期値、必ずしも必要ではないが、変数が最初に持つ値。
  
  //ちなみに、動的型付け言語では、変数の型は実行時に決まる。
  //静的型付け言語は、変数の方はコンパイル時に決まる。

  //動的型付け言語のｎJS、pythonにおいて、値型と参照型の違いは、
  //不変 数字や文字列 イミュータブルなオブジェクトと
  //可変 配列やオブジェクト はミュータブルなオブジェクトと定義される。


  //・Jsにおいて変数の初期化は必須ではない。
  //初期化されない場合はundefindとなる。
  //

  //document.getElementById("container");

  //document.とはJSの組み込みオブジェクト。
  //.getElementByIDメソッドは、指定されたID属性をもつHTML要素を取得。

  //ライブラリとAPIの違い。
  //APIとは、アプリケーションプログラミングインターフェース。
  //広義のAPIとしてライブラリをAPIと呼ぶことがある。
  //APIは既存のソフトやサービスを簡単に利用するためのもの。
  //ライブラリはそれ単体では意味をなさない、数学関数やファイル操作機能など。

  //標準ライブラリ、組み込み関数
  //内部APi、外部API
  //documentは標準ライブライとも内部APIとも言い切れない。
  //言語そのもののの一部ではなく、Webブラウザ環境で提供されるオブジェクトであるため。
  //ブラウザが提供するDOM（ドキュメントオブジェクトモデル）にアクセスするためのオブジェクトであり、
  //JSがブラウザ上で実行される環境で使用される。ブラウザの実装に依存し、JSの言語使用には直接組み込まれていない。
  //JSにおいて、ArrayやStringのようなものが兵十ライブラリ。

  //その他のJSオブジェクト
  //windowオブジェクト、consoleオブジェクト、navigatorオブジェクト、locationオブジェクト、XMLHttpRequestオブジェクト。

  //documentオブジェクトの関数や値
  //関数
  //getElementById:
  // getElementsByClassName:
  // getElementsByTagName:
  // querySelector:
  // querySelectorAll:
  // createElement:
  // appendChild:
  // removeChild:
  //変数
  // body
  // head
  // title
  // URL
  // forms
  // document オブジェクトは、WebページのDOM（Document Object Model）にアクセスするためのインターフェースを提供します。DOMは、HTML文書の構造や要素をツリー構造で表現し、JavaScriptがその構造にアクセスして変更できるようにするための仕組みです。
  //ちなみにJSではオブジェクトに紐づいている関数や値をメソッドとプロパティと呼ぶことがある。











  for (var i = 0; i < 5; i++){
    div = document.createElement("div");
    div.onclick = function(){
      alert("This is box #" + i);
    };
    container.appendChild(div)
  }
//document.createElement("div"); は、JavaScriptにおいて新しいHTML要素を作成するためのメソッド。指定されたタグ名に対応する新しいHTML要素を生成。
//この場合は、<div></div> という新しい div 要素を作成。

//var Div = document.createElement("div");
// ここで新しい要素に対するさまざまな操作を行うことができます
// 例：テキストコンテンツの設定
//Div.textContent = "Hello, this is a new div!";
// 例：新しい要素を文書に追加
//document.body.appendChild(newDiv);

//HTML要素
/* <div>: ブロックレベルの汎用のコンテナ要素。
<p>: 段落を表す要素。
<a>: ハイパーリンクを定義する要素。
<img>: 画像を埋め込むための要素。
<h1>, <h2>, ..., <h6>: 見出しを表す要素。
<ul>, <ol>, <li>: 順序なしリスト（ul）、順序ありリスト（ol）、リストアイテム（li）を表す要素。 */
// document: ブラウザが提供する特殊なグローバルオブジェクトで、現在のHTML文書全体を表します。
// body: HTML文書内の <body> 要素を指します。<body> 要素は通常、ページの実際のコンテンツを含みます。

// document.body は HTMLElement インターフェースを継承しており、その中に appendChild メソッドが存在します。このメソッドは、指定したノードを Node インターフェースに従い、呼び出し元の要素の子要素として追加します。


// つまり、HTMLのdivタグ自体を、JSから名指しして取得はできないから、
// まず、タグ名を使って、divタグが入っているであろうHTML要素をゲットエレメントして、JSの変数に格納する。
// そこで取得したものが入ってるJSの変数に、.applendChild()で新しいHTML要素を追加するということ

//bodyタグはHTML内で1つしか存在しないため、だから直にJSから名指しできる。

//ブラウザの仕組み

// HTMLの解釈と表示:
// ブラウザは最初にHTMLを解釈し、DOM（Document Object Model）を構築します。DOMはHTML文書の構造を表現したツリー構造です。
// ブラウザはこのDOMツリーを基に、ページの初期表示を行います。HTMLの構造に基づいてブラウザが表示内容を生成します。

// CSSの解釈とスタイルの適用:
// CSSも解釈され、適用されます。これにより、HTML要素にスタイルが適用され、ページの見た目が整形されます。

// JavaScriptの実行:

// HTMLとCSSの表示が完了した後、ブラウザはページ上で定義されたJavaScriptコードを実行します。
// JavaScriptはDOMを変更したり、新しい要素を追加したりすることができます。これにより、ページの動的な変更やインタラクティブな機能が実現されます。
// この基本的な流れにおいて、HTMLの解釈と表示、CSSの適用、JavaScriptの実行は順番に行われますが、一部の状況では非同期的に実行されることもあります。

// JavaScriptの実行は、通常はHTMLとCSSの読み込みが完了した後に行われますが、async や defer などの属性を使ってスクリプトの読み込みと実行のタイミングを制御することができます。async を使用すると、スクリプトは非同期的に読み込まれ、読み込みが完了したらすぐに実行されます。defer を使用すると、HTMLの解釈が終わった後に順番に実行されます。

// このような制御を利用して、適切なタイミングでスクリプトを実行し、DOMの変更やページの動的な構築を行います。






// JavaScript側がDOMの変更の終了を明示的に報告するわけではなく、通常はブラウザが定期的にDOMの変更を検知して再描画を行います。DOMの変更が発生すると、ブラウザは再描画が必要であると判断し、再描画処理をキューに追加します。これは、通常のブラウザの動作です。

// 具体的には、以下のようなプロセスが発生します：

// JavaScriptコードがDOMを変更する。
// ブラウザはその変更を検知し、変更を再描画する必要があると判断する。
// ブラウザは再描画のためのタスクをスケジュールし、キューに追加する。
// ブラウザが再描画処理を行い、変更が画面に反映される。
// このプロセスでは、JavaScriptコードがDOMを変更した瞬間に再描画が発生するわけではなく、ブラウザが適切なタイミングで再描画を行います。これにより、ブラウザは効率的に再描画処理を行い、ユーザーエクスペリエンスを向上させます。

// ただし、一部のJavaScript処理は非同期的に行われることがあります。例えば、setTimeoutやrequestAnimationFrameを使用して処理を非同期に実行する場合、再描画がそれに合わせて行われることがあります。



// div.onclick = function(){
//   alert("This is box #" + i);
// };

//.onclick DOMのイベントハンドラプロパティ。
//クリックイベントが発生したときに実行されるコードを指定する。

//クロージャ―、即時関数、→letで



