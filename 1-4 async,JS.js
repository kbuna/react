

//JavaScriptと非同期処理


//同期処理のDOＭ操作

const header = document.getElementById("heading");
header.innerHTML = "Hey!";

// 上記コードはブラウザに対する命令を記述したもの。
// 「idの値が"heading"である要素を選択してください。それが終わったら、要素のデータを”Hey!”に書き変えてください。」ということ。

//webの世界では非同期処理なくして成立しない。データベースアクセス、映像や音声再生、API呼び出し等、街が発生する処理は非同期で実行される。


//2.5.1 Promiseとfetch
//fetchはHTTPのリクエストを送信してレスポンスを受信するためのJSAPI。
//以前はサーバーが公開するREST REST APIを呼び出すのに20行以上のネストしたコードを記述する必要があったが、fetchの登場により、そのようなRESTAPIの呼び出しが楽になった。

console.log(fetch("https://api.randomuser.me/?nat=US&results=1"));

//fetchの戻り値をログ出力しているが、APIのレスポンスではなく、保留中(Pending)のPromiseオブジェクトが出力される。
//Promiseは、非同期処理の状態を表すオブジェクトで３つの状態、
//保留中（Pending）、成功（Resolved）、失敗（Rejected）を表す。

//イメージとしては、ブラウザがfetch呼び出しに対する値を即座に返さずに、予約受付のみを行うのに似ている。
//「データ取得に成功する場合もあれば、失敗する場合もあるが、いずれの場合も結果はお伝えします」と約束するようなもの

//では、fetchの戻り値のPromiseオブジェクトをどう使えばいいのか。
//保留中のPromiseオブジェクトは、データ取得が完了していない状態を表す。

//Primiseオブジェクトのthenメソッドを使うことで、Promiseの連鎖（Primiseチェーン）を記述できます。thenメソッドはコールバック関数を引数として取ります。
//直前の非同期処理が成功した場合に、このコールバック関数が呼ばれる。
//イメージとしては、受付にデータ取得を依頼する際に、完了した場合に実行してほしい処理を指定するようなもの。

fetch("https://api.randomuser.me/?nat=US&results=1").then(res =>
  console.log(res.json())
  );

//thenメソッドに渡したコールバック関数は、非同期処理が成功した際に呼ばれるが、
//このコールバック関数でさらに戻り値を返した場合は、Promiseチェーンの次のthenのコールバック関数に引き継がれます・

//コールバック関数、ある特定のイベントが発生したときに実行される関数のこと。
//ちなみに、イベントハンドラは、特定のイベントが発生したときに実行されるコード。
//そしてこのコードは通常コールバック関数として提供される。

//一般的に「コールバック関数」という用語は、特定のイベントが発生したときに実行される、開発者が定義した関数を指します。

fetch("https://api.randomuser.me/?nat=US&results=1")
  .then(res =>res.json())
  .then(json =>json.results)
  .then(console.log)
  .catch(console.error);

//まずfecthを使って、randomuser.meに対してHTTPGETリクエストを送信している。
//次にfetchの呼び出しが成功すれば、レスポンスのボディ文字列をJSONオブジェクトに変換する。
//それが成功すればJSONオブジェクトのresultsプロパティを取り出す。
//最後に取り出した値をコンソール出力する。
//上記の処理のどこかで例外が発生した場合は、 catchに設定したコールバック関数が呼ばれ、console.errorによりエラーオブジェクトがコンソールに出力される。



//2.5.2 async/await
//Promiseを扱う別の方法として、async関数がある。
//async関数を使うと、非同期関数を同期関数のように呼び出せる。

const getFakePerson = async() =>{
  try{
  const res = await fetch("https://api.randomuser.me/?nat=US&results=1");
  const { results } = (await res).json();
  console.log(results);
}catch(error){
  console.error(error);
}

};

getFakePerson();

//getFakePerson関数はasyncキーワードを使って宣言されている。
//これにより、この関数内で非同期関数を呼び出す際にawaitキーワードを使用できる。
//awaitキーワードを使って、fetchを呼び出しているため、それ以降のコードは、
//Promiseが成功するまで、実行されない。
//このコードは、先ほどのfetchの戻り値に対し、thenメソッドを呼び出してresを受け取るコードと同等。
//catchによる例外処理はtry/catchになる。


//2.5.4 Promiseの生成

//非同期処理が失敗する理由は多岐にわたる。
//データを取得するために複数のAPIを呼び出す必要がある場合、どこまで成功して、どこで失敗したかによって、複数のエラーの状態が存在する。またサーバーがエラーを返却した場合、複数のエラーの種類が存在する。Promiseはこのような複雑な状態を単純な成功/失敗に抽象化する手段を開発者に与える。


//以下のgetFakeMembersは、AJAXの呼び出しをPromiseオブジェクトにラップして戻り値として返す関数。

const getFakeMembers = count =>
  new Promise((resolves,rejects) => {
    const api = "https://api.randomuser.me/?nat=US&results=${count}";
    const request = new XMLHttpRequest();
    request.open("GET",api);
    request.onload = () =>
      request.status ===200
        ? resolves(JSON.parse(request.response).results)
        : reject(Error(request.statusText));
    request.onerror = err => rejects(err);
    request.send();
});

//指定された数countだけ、ランダムなユーザー情報を取得する非同期関数。
//new Promiseコンストラクタ内で非同期処理が行われている。

//XMLHTTPRequestを使った非同期処理
//const api - ランダムユーザー情報を取得するAPIのエンドポイントを構築 count=xx
//const request 新しいXMLHTTPREWUESTオブジェクトを作成する。
//.open("GET",api)指定されたAPIURLに、GETリクエストを送る。
//.onload リクエストが成功した場合の処理
//HTTPステータスコードが200(成功)であることを確認する
//成功した場合、resolve(parse(request.response).results)が呼ばれてAPIから取得した、ランダムユーザーの結果が出る。
//失敗の場合、regect(error(request.statusText))が呼ばれてHTTPステータスのエラーメッセージがエラーオブジェクトとしてPromiseに渡されます。
//

// ⓵getFakeMembersというオブジェクトがあり、これはcountを引数にして、関数が実行される。
// ②実行されると、新たにPromiseオブジェクトが作られて、非同期処理が実行される。
// ③Promiseは、まず、APIのURLを持ったプロパティと、XMLHttpRequestオブジェクトを作る。
// ④XMLHttpRequestオブジェクトを、Getリクエストで、APIURLを初期化する。
// ⑤.onlordイベントが発生したら、HTTPステータスを確認して、通信が成功したかを確認する。通信がうまく行っていたら、レスポンスする値を、JSONに変換してもらい、Promiseのresolvesの値に格納して、返してもらう。
// ③.onerrorイベントが発生したら、エラーの値を、Promiseのrejectの値に、格納して返してもらう。
// ④そのリクエストを実際に送信する。



//上記の関数ではPromiseオブジェクトがコールバック関数と共に生成されています。
//コールバック関数の引数のresolves,rejevtはそれぞれAJAXの呼び出しの成功/失敗した場合に、呼び出される関数です。
//呼び出しが成功した場合は、取得したデータをresolves()に渡しています。
//呼び出しが失敗した場合は、その原因を表すエラーオブジェクトをrejects()に渡しています。
//この関数を使用するには、戻り値のPromiseオブジェクトに対してthen/catchメソッドを呼び出すか、async/awaitおよびtry/catchを使って同期関数のように呼び出します。

//then/catchメソッドによるエラー処理
getFakeMemvers(5)
 .then(members => console.log(members))
 .catch(error => console.error('getFakeMembers failed : ${error.message}'));

//try/catchによるエラー処理
async function testGetFaleMembers(){
  try{
    const members = await getFakeMembers(5);
    console.log(members);
  }catch (error){
    console.error('getFakeMembers failed:${error.message}');
  }
}


//async/awaitはPromiseをより直感的に使うための、構文糖衣。

//さらに、XMLHTTPRequestは、レガシー。
//いまではFetch APIやAxiosなどPromiseベースの非同期の方が使われる。
//今回は、XMLHttpRequestをPromiseを使ってラップしている。

//さらにさらに、XMLよりもJSONで構造を表すことが多い。
//XMLはテキストや、XML構造を使うときなどに使う？
//ちなみにDOMはプログラムベースでXMLを表したもの。

//JSは非同期処理がメインの言語なため、Promiseを使いこなすことは必須のスキルです。
