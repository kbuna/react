

//今日ではreactでは、クラスではなく関数を用いてコンポーネントを宣言することが推奨される。
//レガシーコードでは、クラスを用いたコードもあるので、学ぶ必要がある。

//JSでは、すべてのオブジェクトは、プロトタイプと呼ばれるプロパティを持ち、このプロパティを用いてオブジェクト指向でいうところの継承が実現される。プロトタイプ継承と呼ぶ。まずはES2015を使用せずにカスタムクラスを定義する。


function Vacation (destination,length){
  this.destination = destination;
  this.length = length;
}

Vacation.prototype.print= function(){
  console.log(this.destination + " | " + this.length + " days");
};

var maui = new Vacation ("Maui",7);

maui.print(); // Maui | 7 days

//Vacationクラスはdestinationとlenthの２つのプロパティを持ち、これぞれコンストラクタ関数内で初期化されている。
//Vacationはnew演算子でインスタンス化される。その際にプロパティの初期値を引数として受け取る。
//さらにVacationはprintというメソッドを持つ。Vacationのインスタンスであるmauiはprototypeオブジェクト上にあるprintを継承しているため、mauiに対してprintメソッドを呼び出せる。
//上記のコードは、他のオブジェクト指向言語のプログラマーの目には非常に奇異に映る。

//ES2015版

class Vacation{
  constructor(destination,length){
    this.destination = destination;
    this.lenth = length;
  }

  print(){
    console.log("${this.destination} will take ${this.length} days/.");
  }
}

//一般的なオブジェクト指向言語に近くなじみ深いもの。
//しかしこのclassキーワードは単なるシンタックスシュガー構文糖衣でしかなく、
//内部的には、依然として、クラスの実体はコンストラクタ関数であり、prototypeにより継承が実現されている。

//クラス名は通常は大文字ではじまる。classキーワードでクラスを宣言し、newキーワードでクラスをインスタンス化して、.演算子によりインスタンス上のプロパティやメソッドにアクセス。


const trip = new Vacation("Santiago, Chile",7);

trip.print();//Chile will take 7 days



// オブジェクトとプロトタイプの関係:
// プロトタイプチェーン:
// JavaScriptでは、あるオブジェクトが持つプロパティやメソッドが見つからない場合、そのオブジェクトのprototypeにアクセスし、そこからプロパティやメソッドを探しにいく仕組みがあります。これを「プロトタイプチェーン」と呼びます。

// プロトタイプオブジェクト:
// オブジェクトのprototypeは、新しいオブジェクトが作成されたときにそのオブジェクトに対して共有されるプロパティやメソッドを定義します。これは、クラスベースの継承における親クラスのようなものです。


//extendsキーワードを使えばクラスを継承することも可能。
//クラスを継承することで、そのクラスのプロパティやメソッドはサブクラスに引き継がれる。

class Expedition extends Vacation{
  constructor(destination,length,gear){
    super(destination,length);
    this.gear = gear;
  }

  print(){
    super.print();
    console.log('Bring your ${this.gear.join(" and your")}');
  }
}

//Vacationクラスを継承したExpeditionクラス。
//superを使って、Vacationのコンストラクタを呼び出すことによって、親クラスのプロパティ、destination,lengthを初期化している。
//さらに、独自に追加したプロパティgearを追加している。

const trip2 = new Expedition("Mt.Whitnew",3,[
  "sunglasses",
  "prayer flags",
  "camera"
]);

trip2.print();




//2.7 ECMAScriptモジュール

//JSにおいて、モジュールというのは再利用可能なコードで、他のJSファイルからインポートすることで利用できる。
//個々のモジュールは別々のファイルで格納されており、名前空間が独立しているため、モジュール間で変数名が重複していても、衝突が起こらない。
//ひとつのモジュールから複数のオブジェクトをエクスポートすることも可能だし、
//単一のオブジェクトのみをエクスポートするモジュールも官房。

//text-helpers.js

export const print = message => log(message,date());

export const log = (message,timestamp)=>
  console.log('${timestamp,toString()}:${message}');

const date = () => new Date();


//変数や関数の宣言にexportを付加することで、他のモジュールからインポートして使用することが可能になる。
//上記の例ではprint関数とlog関数がエクスポートされている。
//date関数はエクスポートされていないため、そのモジュール内のみ参照可能で、他のモジュールからは参照できない。

//一方、単一のオブジェクトをエクスポートする場合は、export defaultと記述する。

export default new Expedition("Mt.Freel",2,["water","snack"]);

//Expeditionクラスのインスタンスを生成して、defaultキーワードをつけてエクスポート。
//他のモジュールからこのインスタンスをインポートして使用することができる。

//インポートして使用する例

import { print, log} from "./text-helpers";
//デクスチャリングを使用して複数の値を受け取っている
import freel from "./mt-freel";
//単一の変数を扱っている

print("printing a message");
log("logging a message");

freel.print();


import {print as p, log as l}from "./text-helpers";

//print関数とlog関数を、pとlという変数で受け取っている。

import * as fns from "./text-helpers";
//エクスポートされたすべての値を、単一のオブジェクトで受け取っている。


//import exportはECMAScriptモジュール ESMと呼ばれる仕様。
//プラットフォームによりサポートにばらつきがある。場合によってbabelによりい差分を吸収してもらう。




//2.7.1 CommonJSモジュール

//ECMAScriptモジュール登場以前から、Node.jsではCommonJSというモジュールが採用されていた。
//BabelやwabpackではこのCommonJSモジュールがサポートされているので、それらのツールを使うのならば、CommonJSモジュールをインポート/エクスポートできる。


//CommonJSでは、module.exportsという特別なオブジェクト経由でモジュールをエクスポートする。

const print2 = message => log(message,new Date());

const log2 = (mesasage,timestamp)=>
  console.log("${timestamp.toString()}: ${message}");

module.exports = {print2, log2};

//これらをインポートするときは、import文ではなく、require冠すを使う。

const { log2 , print2 } =require("./text-helpers");



















































