

//2.4 オブジェクトと配列

//ES2015より、オブジェクトと配列に新しい構文が導入された。
//デストラクチャリング、オブジェクトリテラルの改善、そしてスプレッド構文。
//Reactで非常によく使われる。


//2.4.1 デストラクチャリング

const sandwich = {
  bread: "dutch crunch",
  meat: "tuna",
  cheese:"swiss",
  toppings:["lettuce","tomato","mustard"]
};

//const { bread, meat } = sandwitch;

let  { bread, meat } = sandwich;

bread = "garlic";
meat = "turkey";

console.log(bread,meat);// garlic turkey

console.log(sandwich.bread,sandwich.meat);//futch crunch tuna

//オブジェクトを変数に代入したり、引数として受け取る際に、必要なプロパティのみを取捨選択できる。

//上記コードでは、sandwitchオブジェクトをバラシて(destructure:分解して)４つのプロパティのうち、breadとmeatのみをローカル変数に代入している。
//これらの変数はconstで読み取り専用の値として宣言されているが、letに入れることも可能。

//デストラクチャリングは、変数の代入だけでなく、関数の引数にも使える。


// const lorfify = regularPerson =>{
//   console.log("${regularPerson.firstname} of Canterbury");
//};
//~~~~~~~
//lordify{regularPerson}; 

//という記述が、すっきり記述できる。

const lorfify = ({firstname}) =>{
  console.log("${firstname} of Canterbury");
};

const regularPerson = {
  firstname:"Bill",
  lastname:"Wilson"
};

lordify(regularPerson); //Bill of Canterbury



//2.4.3 オブジェクトリテラルの改善
//({})を用いて、オブジェクトの型を定義する記法のこと。
// let obj: {
//   id: string
//   token: string
//   name: string
// } ;

/*
const name = "Tallac";
const elevation = 9738;

const funHike = { name, elevation};

console.log(funHike);// {name:"Tallac",elevation:9738}
*/

//以前は、変数funHikeの初期値は、{name:name,elevation:elevation}のようにしか書けなかった。
//より簡素な記述が可能になった。変数だけでなく、関数もプロパティとしてオブジェクトリテラル内に書くことができる。




const name = "Tallac";
const elevation = 9738;

const print = function(){
  console.log('Mt.$(this.name)is $(this.elevation)feat tail');
};

const funHike = { name, elevation,print};

funHike.print(funHike);// Mt.$ Tallac is 9738 feet tall

//関数printをオブジェクトリテラルのプロパティとして追加する
//さらに、オブジェクトリテラル内に関数を記述するときに、functionキーワードを省略できる。


//ES5

var skier = {
  name: name,
  sound: sound,
  powderYell: function(){
    var yell = this.sound.toUpperCase();
    console.log('${yell} ${yell} ${yell}!!!');
  },
  speed: function(mph){
    this.speed = mph;
    console.log("speed:",mph);
  }
};


//ES2015

const skier = {
  name,
  sound,
  powderYell(){
    let yell = this.sound.toUpperCase();
    console.log('${yell} ${yell} ${yell}!!!');
  },
  speed(mph){
    this.speed = mph;
    console.log("speed:",mph);
  }
};

//2.4.4 スプレッド構文
//let array1 = ["りんご","みかん","バナナ"];
//console.log(...array1);
//中身だけが渡される。


//３つのドットで記述されるスプレッド構文。いくつかの異なる用途がある。

const peaks = ["Tallac","Ralston","Rose"];
const canyons = ["Ward","Blackwood"];
const tahoe = [...peeks,...canyons];

console.log(tahoe.join(", "));//Tallac, Ralston, Rose, Ward, Blackwood

//上のコードでは、配列peaksと配列canyonsを連結して、新たなtahoe配列を作っている。


//イミュータブルな配列を実現するためのスプレッド構文。


const peaks2 = ["Tallac","Ralston","Rose"];
const [last] = peaks2.reverse();

console.log(last);//Rose
console.log(peaks2.join("," ));//Rose, Ralston,Tallac

//配列最後の要素をローカル変数に代入するために、reverseメソッドと、デストラクチャリングを使用している。

//reverseメソッドは配列の内容を書き変えてしまうため、呼び出し後にpeaksの要素は逆になっている。
//これを避けるためにスプレッド構文が使われる。リバースメソッドを呼び出す前に配列のコピーを作る。


const peaks3 = ["Tallac","Ralston","Rose"];
const [last2] = [...peaks3].reverse();

console.log(last2);//Rose
console.log(peaks2.join("," ));//Rose, Ralston,Tallac

//関数の引数を配列として受け取るのにスプレット構文が使われる。
//この手法が、残余引数と呼ばれる。可変長の引数を残余引数として受け取る関数の例。

function directions(...args){
  let[start,...remaining] = args;
  let[finish,...stops] = remaining.reverse();
  //引数 args の最初の要素を start に、残りの要素を remaining に分割代入。
  //remaining 配列を逆順にし、最初の要素を finish に、残りを stops に分割代入。
  console.log(`drive through ${args.length} towns`);
  console.log(`start in ${start}`);
  console.log(`the destination is ${finish}`);
  console.log(`stopping ${stops.length} times in between`);
}

directions("Truckee","Tahoe City","Sunnyside","Homewood","Tahoe");

//上の関数は、残余引数だけでなく、配列の先頭と末尾の要素を変数に代入する際にもスプレッド構文を使用しています。
//先頭と末尾以外の、途中の要素は、stops変数に格納されている。
//この関数の優れている点は、任意の数の引数を受け取るれる点。


//スプレッド構文は配列だけでなく、オブジェクトにも使用できる。


const morning ={
  breakfast:"oatmeal",
  lunch: "peanut butter and jelly"
};
const dinner = "mac and cheese";

const backpackkingMeals = {
  ...morning,
  dinner
};

console.log(backpackkingMeals);
// {
// breakfast:"oatmeal",
// lunch: "peanut butter and jelly"
// dinner = "mac and cheese";
// }

