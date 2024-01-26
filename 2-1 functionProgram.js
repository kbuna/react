


//reactでは関数型プログラミングの影響が色濃く表れている。

//配列のmapやreduceメソッドを使用した場合は、関数型プログラマーといえる。



//Jsにおいて関数は、第一級オブジェクト。平たく言えば、関数を変数と同様に扱えることを意味する。
//アロー関数やスプレッド構文などはこの流れを増幅する。

//JSにおいて、関数はほかのデータと同様に扱われる。
//文字列や数値と同様に、関数をvarやletやconstキーワードとともに宣言することが可能。


var log = function (message){
  console.log(message);
};

log("in js, functions are variavles");
//in hs, functions are variables

//上記をアロー関数で記述すると

const log = message =>{
  console.log(message);
}

//上記2つは、varとconstのどちらで宣言するか以外はすべて同じ内容。

//また、関数は変数と同等であるため、オブジェクトのプロパティとして記述できる。

const obj = {
  message:"They can be added to objects like variables",
  log(message){
    console.log(message);
  }
};

obj.log(obj.message);


//同様に配列に関数を格納することも可能。

const messages = [
  "They can be inserted into arrays",
  message => console.log(message),
  "Like variables",
  message => console.log(message)
];

messages[1](messages[0]);
messages[3](messages[2]);


//関数は別の関数に引数として渡すことが可能。

const insideFn = logger =>{
  logger("They can be sent to other functions as arguments");
};

insideFn(message => console.log(message));

// insideFn 関数は、1つの引数 logger を取ります。
// insideFn 関数内で、引数として渡された logger 関数が実行されます。このとき、引数として文字列 "They can be sent to other functions as arguments" が渡されます。

// insideFn 関数の呼び出し時に、引数としてアロー関数が渡されています。このアロー関数は、引数 message を取り、console.log(message) を実行します。
// insideFn 関数内で、引数として渡された logger 関数が呼び出され、その際に指定されたメッセージが console.log を通じてコンソールに表示されます。

// 要するに、このコードは「関数を引数として渡す」（higher-order function）という概念を示しています。insideFn 関数は、特定の処理を行う関数を引数として受け取り、それを実行する役割を果たしています。このパターンは、コールバック関数や異なる処理を抽象化するためによく使用されます。


//また関数の戻り値として関数を返却することも可能。


// createScream 関数内部で、
// 引数として受け取った logger 関数を返す無名関数が作成され、
// それが scream 変数に代入される。

// scream 変数が呼び出されると、createScream 関数内で作成された無名関数が実行され、
// 引数として指定された logger 関数が内部で呼び出される。

const createScream = function(logger){  
  return function(message){   
    logger(message.toUpperCase()+"!!!");
    //このとき、logger 関数は message を大文字に変換し、末尾に "!!!" を追加してコンソールに出力する。
  };
};

//createScream 関数が呼び出され、
//引数として message => console.log(message) という無名関数（logger）が渡される。
const scream = createScream(message => console.log(message));

scream("function can be returned from other functions");
scream("createScream returns a function");
scream("scream invokes that returned function");

//直近の2つの関数はいずれも高階関数。ある関数が別の関数を引数として受け取るか、
//もしくは関数を戻り値として返すか、ひとつでも該当すれば、高階関数を名乗れる。
//createScreamはアロー関数を使って以下のように書き直すこともできる。

const createScream2 = logger => message =>{
  logger(message.toUpperCase() +"!!!");
}




// つまりscreamを、最初に初期化したときの、クリエイトスクリームの実行では、
// 文字列を引数にとり、表示する関数が、ただ単に格納されるようになっていて。

// 次に、クリエイトスクリームが実行されるときは、その関数が実行されるようになっていて、かつ、その関数が引数に取っている文字列を大文字にして追記するよ！という関数が、追加で実行される。

// というようなことでしょうあ？



//3.2 命令型 vs 宣言型


//関数型プログラミングは、宣言型プログラミングという大きなプログラミングパラダイムの一部。

//宣言型プログラミングは、「なにをするのか」 what が重要で「どのようにするのか」howは重要ではない。ひたすらwhatを記述することで、アプリケーションを構築するプログラムのスタイルを宣言型と呼ぶ。

//一方で、従来のプログラミング言語は、結果を得るための手順howを記述する。
//これを命令型プログラミングと言う。

//以下は命令型のアプローチ。

var string = "Restaurants in Hanalei";
var urlFriendly ="";

for (var i =0; i < string.length; i++){
  if(string[i] === " "){
    urlFriendl += "-"; 
  }else {
    urlFriendly += string[i];
  }
}

console.log(urlFriendly);
//Restaurants-in-Hanalei;

//英文中すべての文字をひとつずつチェックして、空白があれば変換する。
//「どのようにして結果を得るか」（how）に注目して書かれている。
//特徴としてはforループとif文を使って値を代入している。
//他の特徴は、一見では、何をやりたいのかよくわかｒない点。
//命令型プログラミングでは、必然的に処理を説明するためのコメントを書くことになる。

//宣言型でのアプローチ。
const string = "Restaurants in Hanalei";
const urlFriendly2 = string.replace(/ /g, "-");

console.log(urlFriendly2);

// 正規表現 / /は正規表現の始まり、 は空白、/は正規表現の終わり、
// gはグローバル、正規表現が、文字列内ですべての一致ヵ所を検索する
// replaceの第二引数は置き換える文字

//上記のコードでは、ループの代わりにString.replaceメソッドを正規表現と共に使うことで、「何をしたいのか」を記述しています。
//「文字列内の空白をすべてハイフンに変換したい」と記述するのみで、どのように変換するかに関しては、replaceメソッドにより抽象化されている。
//このように詳細な手順を抽象化して隠ぺいすることで「何をしたいのか」のみで記述することが可能になる。

//宣言型プログラミングはwhatのみを記述するので、コードを見れば何をやりたいか明白。
//典型的な宣言型プログラミングのコード。

const loadAndMapMembers = compose(
  combineWith(sessionStorage,"members"),
  save(sessionStorage,"members"),
  scopeMembers(window),
  logMemberInfoToConsole,
  logFieldsToConsole("name.first"),
  countMembersBy("location.state"),
  prepStatesForMapping,
  save(sessionStorage,"map"),
  renderUSMap
);

getFaleMembers(100).then(loadAndMapMembers);


//もうひとつの例、JSでDOMを操作する際のアプローチの違い。

//命令型

const target = document.getElementById("target");
const wrapper = document.createElement("div");
const headline = document.createElement("h1");

wrapper.id = "welcome";
headline.innetText = "Hello World";

wrapper.appendChild(headline);
target.appendChild(wrapper);

//DOM要素を作成し、要素に値を設定し、ドキュメントに要素を追加しています。
//シンプルだが、アプリの規模が大きくなりコードの桁数が1万行に拡大したt気、
//機能を追加したり、変更を加えるのが困難になる。

//宣言型

const { render } = ReactDOM;

const welcome = () => {
  <dic id = "welcome">
    <h1>Hello World</h1>
  </dic>
};

render(<welcome />,document.getElementById("target"));

//reactは宣言型。welcomeはリアクトのコンポーネントで表示されるべきDOM要素が記述されている。
//render関数は、コンポーネントに記述されたとおり、DOMを構築して表示する。
//どのようにDOMを構築して表示するかに関しては、render関数により抽象化され隠ぺいされている。

//idの値が("target")である要素の配下にwelcome3コンポーネントを表示したいことが一目瞭然。



//3.3 関数型プログラミングの基本概念
//ここまでは、関数型言語の定義と、宣言型プログラミングについて学んだ。
//以降は、関数型プログラミングの基本概念についてみていく。
//すなわち、イミュータブルなデータ、純粋関数、データの変換、高階関数、そして再帰。


//3.3.1 イミュータブルなデータ
//イミュータブル immutableとは変異mutateしないこと。変更を加えることが不可な状態。
//関数型プログラミングではすべてのデータがイミュータブル。

//関数型プログラミングでは、データに変更を加えるとき、必ずコピーを作成してから変更する。

let color_lawn = {
  title:"lawn",
  color:"#00FF00",
  rating:0
};

//lawn緑色を表すオブジェクト
//これに変更を加える。ratingプロパティの値を書き変える関数。

function rateColor(color,rating){
  color.rating = rating;
  return color;
}

console.log(rateColor(color_lawnm,5).rating);//5
console.log(color_lawn.rating);//5

//JS で関数の引数としてオブジェクトを受け取った場合、コピーではなく、実際のオブジェクトへの参照。
//つまりオブジェクトのプロパティの値を変更することは、元のオブジェクトを変更mutateすることになる。
//上記コードでは、rateColor関数の呼び出し後に元オブジェクトのratingの値も変わってしまっている。
//原本の証明書をマジックで塗りつぶすのと同じ。
//そこでcolorオブジェクトをイミュータブルにするため、以下のように書き変える。

function rateColor(color,rating){
  return Object.assign({},color, { rating: rating});
};


// rateColor関数を利用してcolor_lawnを新しいratingで評価し、
// 新しいオブジェクトのratingプロパティを表示しています。
console.log(rateColor(color_lawnm,5).rating);//5
// 元のcolor_lawnオブジェクトのratingプロパティを表示しています。
console.log(color_lawn.rating);//0

//オブジェクトのコピーを作成してから変更を加えている。
//Object.assignの第一引数に空のオブジェクト{}を渡すことで、
//新規に作成されたオブジェクトのほうに対して変更を加えることができる。


//Object.assign() メソッドは、
//指定された複数のオブジェクトのプロパティをコピーして、新しいオブジェクトを生成します。引数は以下のようになります：

//{}: 空のオブジェクトを生成します。これは新しいオブジェクトのベースとなります。
//color: 元のcolorオブジェクトのプロパティをコピーします。
//{ rating: rating }: 新しいオブジェクトに rating プロパティを追加し、その値を引数で渡された rating に設定します。


//さらにアロー関数とスプレッド構文を使えば、より簡素に記述できる。

const rateColor = (color,rating) => ({
  ...color,
  rating
});


//const rateColor = : アロー関数 rateColor を定義します。
//(color, rating) => : アロー関数の引数を指定します。ここでは color と rating が引数です。
//{ ...color, rating } : オブジェクトの展開（スプレッド演算子）を使用して、新しいオブジェクトを生成します。
//...color は color オブジェクトのプロパティを展開し、
//rating はそのまま新しいオブジェクトに含まれます。

//オブジェクトリテラルの省略記法、プロパティ名と変数名が一致している場合、{rating:rating}のような書き方を省略できる。変数名


// 通常、アロー関数は式の評価結果を暗黙的に return します。しかし、オブジェクトリテラルを直接返す場合、中括弧 {} がブロックと解釈されてしまい、その中のコードブロックとして扱われてしまいます。
// const getObject = () => { key: 'value' };
// この場合、{ key: 'value' } がオブジェクトリテラルではなく、ブロックと解釈されます。このブロックには暗黙の return がないので、getObject 関数は undefined を返すことになります。

// この問題を回避するために、オブジェクトリテラルを返す場合は、括弧で囲んで明示的に式として評価されるようにします：
// const getObject = () => ({ key: 'value' });
// これにより、オブジェクトリテラルがブロックではなく、関数から返される式として解釈されます。この書き方は、アロー関数でオブジェクトを返す際によく使われます。




//イミュータブルな配列の例
let list = [{ title: "Red Red" }, {title: "lawn" }, {title: "Party Pink" }];

//上記のlistは色の情報を格納する配列。これに色を追加する。Array.pushを使う例。

const addColor = function(title,colors){
  colors.push({ title: title});
  return colors;
};

console.log(addColor("Glam Green",list).length);//4
console.log(list.length);//4

//Array.pushは破壊的なメソッドなので、addColorの元の配列を変更してしまう。
//元の配列をイミュータブルにするには、Arrray.concatを使う

const addColorb = (title,array) => array.concat({title});

console.log(addColorb("Glam Green",list).length);//4
console.log(list.length);//3

//スプレット構文を使って配列をコピー。

const addColorc = (title,list) => [...list,{title}];

//配列のコピーを作り、新しい要素を追加し、コピーのほうを戻り値として返す





//3.3.2 純粋関数
//引数の値のみを参照して、それをもとに計算し、値を返す関数を純粋関数と呼ぶ。
//少なくともひとつの引数を取り、値もしくはほかの関数を戻り値として返す。
//純粋関数に副作用はない、グローバル関数に値を書き込んだり、アプリケーションの状態を変更したりしない。純粋関数は、引数をイミュータブルなデータとして扱う。

//「純粋ではない」関数

const frederick = {
  name:"Frederic Douglass",
  canRead: false,
  canWrite: false
};

function selfEducate(){
  frederick.canRead = true;
  frederick.canWrite = true;
  return frederick;
}

selfEducate();
console.log(frederick);

//{name: "Frederic Douglass", canRead: true, canWrite:true}

//selfEdutcateは純粋関数ではありません、引数をひとつもとらず、戻り値も編kにゃ串内。
//関数外で宣言された変数frederickに変更を加えているので副作用が生じる。



const frederick2 = {
  name:"Frederic Douglass",
  canRead: false,
  canWrite: false
};

const selfEducate2 = person => {
  person.canRead = true;
  person.canWrite = true;
  return person;
}

console.log(selfEducate2(frederick));
console.log(frederick);

//{name: "Frederic Douglass", canRead: true, canWrite:true}
//{name: "Frederic Douglass", canRead: true, canWrite:true}

//上記の場合も、引数を取って、戻り値を返していますが、まだ純粋関数ではない。
//引数のオブジェクトが直接変更されてしまうので、副作用が生じる。
//純粋関数の名乗るには、引数をイミュータブルにする必要があります。



const frederick3 = {
  name:"Frederic Douglass",
  canRead: false,
  canWrite: false
};

const selfEducate3 = person => ({
  ...person,
  canRead : true,
  canWrite : true
});

console.log(selfEducate2(frederick));
console.log(frederick);

//{name: "Frederic Douglass", canRead: true, canWrite:true}
//{name: "Frederic Douglass", canRead: false, canWrite:false}

//引数の値を参照するが、コピーを作成してから、変更を加え、コピーのほうを返却しています。


//DOＭ操作の例

function Heder(text){
  let h1 = document.createElement(h1)
  h1.innerText = text;
  document.body.appendChild(h1);
}

Header("Header() caused side effect");

//上記のHeader関数は、<h1>要素を作成し、要素に値を設定し、要素をドキュメントに追加している。
//しかし純粋関数ではない。引数を取るが、戻り値を返却しない。関数内でDOMに変更を加えているので副作用がある。

//Reactでは、UIコンポーネントが純粋関数として表現されている。

const Header = props => <h1>{props.title}</h1>;


//純粋関数は、関数型プログラミングの中心的な概念です。
//純粋関数の持つ、「アプリケーションの状態を変更しない」という特徴は、数多くの副次的な利点をもたらす。
//JSで関数を書くときは以下のことに注意。

//1,関数は少なくともひとつの引数を受け取らなければいけない。
//さらに関数は、引数以外の値を参照してはいけない。グローバル変数の値によってふるまいが変わるなら純粋関数とは言えない。
//2,関数は値もしくはほかの関数を戻り値として返却しなければならない。
//同じ引数で呼び出されてあ場合、必ず同じ戻り値を返さなければならない。
//3,関数は引数や関数外で定義された変数に直接変更を加えてはならない



//3.3.3 データの変換
//関数型プログラミングでは、アプリケーションのデータはイミュータブルなので、それ自体変化しない。
//個々の関数はデータのコピーを作成して、コピーに変更を加えて、別の関数に渡す。

//そのようなデータ変換をJSで行うには、どうすればいいか。そのためのビルトイン関数がすでにJSには用意されている。
//有名なものは、Array.mapとArray.reduceです。


const schools = ["Yorktown","Washington & Liberty","Wakefield"];

//Array.Joinを使えば、上記の配列をカンマ区切りの文字列に変換できる。

console.log(schools.join(", "));

//"Yorktown,Washington & Liberty, Wakefield"

//Array.JoinはJSの配列が持つビルトイン関数。指定した区切り文字で、配列の全要素を結合して、ひとつづきの文字列に変換する。このメソッドは非破壊的。元の配列に変更を加えない。どのように文字列を組み立てるかの詳細は関数により抽象化され、隠ぺいされている。

//wで始まる高校のリストを取得するとき。

const wSchools = schools.filter(school => shool[0] ==="w");

console.log(wSchools);

//Array.filterはJS配列がもつビルトイン関数。ある配列のサブセットを新しい配列として返却する。
//この関数はpredicateを引数に取る。predicateは、配列の要素を引数にとり、真贋値を返すコールバック関数。
//配列のそれぞれの要素ごとにこのpredivateが呼び出される。
//predicateの戻り値は、その要素を最終的なサブセットに含めるかを決定するために使用される。
//この例の場合は、高校の名前がWではじまるかをチェックして、該当すれば、trueを返却している。

//配列から要素を削除する際は、Array.popやArray.spliceではなく、Array.filterを使う。
//Array.filterは非破壊的な関数なので、元の配列をイミュータブルに保てる。

const cutShool =(cut,list) => list.filter(school => school !== cut);


console.log(cutSchools("Washington & Liverty",schools).join(", "));

//"Yorktown, Wakefield"

console.log(schools.join("\n"));
//Yorktown
//Washington & Liberty
//Wakefield

//cutShool関数は配列からW＆L高校を削除するために利用されている。新たに得られた配列をArray.joinで文字列に変換している。

//Array.map
//コールバック関数を引数に取る。コールバック関数は、配列の要素の数だけ呼び出され、各要素が引数として渡される。コールバック関数の戻り値は新しい配列に追加され、結果的に元の配列と同じサイズの配列が作られる。

const highSchools = schools.map(shool => "${school} High School");

console.log(highSchools.join("\n"));

//Yorktown High School
//Washington & Liberty High School
//Wakefield High School


console.log(schools.join("\n"));
//Yorktown
//Washington & Liberty
//Wakefield



//Array.mapは文字列以外にも、オブジェクトの配列や、関数の配列等、任意のJSの値の配列を生成できる。



const highSchools2 = schools.map(shool => ({name: shool}));
console.log(highSchools2);


//[
// { name: "Yorktown"}
// { name: "Washington & Liberty"}
// { name: "Wakefield"}
//] 

//その後の章の内容。
//一つの要素だけ変更したい場合。特定の高校を、別の高校に変換したコピー配列を返す。
//それを三項￥演算子を使って、簡潔に書くやりかた。

const schoolsZ = [
  { name:"Y"},
  { name:"S"},
  { name:"W&L"},
  { name:"W"}
];

const updateSchools = editName("S","HB Woodlawn",schools);

console.log(updatedshools[1]);//{name:"HB Woodlawn"}
console.log(shools[1]);//{name:S}

const editName = (oldName,name,arr)=>
  arr.map(item =>{
    if(item.name === oldName) {
      return{
        ...item,
        name
      };
    }else{
      return item;
    }
  });

//省略
const editNameb = (oldName,name,arr)=>
  arr.map(item => (item.name === oldName ? { ...item,name}:item));


//ここまでは配列から配列を得る。
///次は、オブジェクトから配列を得る場合。
//Array.mapを、Object.keysと組み合わせてつかう。
//Object.keysはオブジェクトに含まれるすべてのキーを配列として返す。

//省略 50P


//ここまでは、配列から別の配列への変換、オブジェクトから配列への変換を見てきた。

//最後に、配列から単一の値への変換を見る。
//Array.reduceもしくは、Array.reduceRight(末尾から走査して値を週尺)を使う。
//単一の値とは、数値、文字列、真偽値といったプリミティブ値だけでなく、オブジェクトや関数といった参照値も含む。



//高階関数を作る

//再帰

//関数の合成

//アプリケーションの構築。











