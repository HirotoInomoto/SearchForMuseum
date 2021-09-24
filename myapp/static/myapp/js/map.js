let map;
let marker = [];
let infoWindow = [];
let markerData = []; //緯度経度を入れる
let geocoder;
const kyoto = { lat: 35.011630, lng: 135.768172 }; //京都の市役所の緯度経度を入れる googlemapから取得

//出力されたghost-dataが何個あるのか調べる。 以下のfor文での繰り返しの回数を取得
const elementsCount = document.querySelectorAll('.event-name').length;





//urlでのコールバックがうまく行かなかったので自分でcallback
window.onload = function () {
  initMap();

  if (document.getElementById("one") === null) {
    document.getElementsByClassName("ghost-data")[0].innerHTML = "<p class='no-event'>開催のイベントはありません</p>"
  };

}


// APIのjavascriptを読み込む際、callback=initMapとしているので、関数の名前は変えないでください
async function initMap() {
  await mapGenerate();
  markerGenerate();

  //     // 地図を作成
  //     map = new google.maps.Map(document.getElementById("map"), {
  //       center:kyoto, //京都市の市役所を中心で良い？ 作ってみて後で変える
  //       zoom: 11, //デフォルトのmapの表示範囲
  //     });

  //     // googlemapAPIのgeocoderを使って緯度経度を住所から特定 for文で回す。
  //     for (var i = 0; i < elementsCount; i++) {     //djangoで引き渡されたデータの数だけfor回す
  //       console.log(elementsCount)
  //         let addressSelector=`.ghost-data > :nth-child(${i+1}) > .address`; //djangoから渡されたeventsの中からi+1番目のeventの住所をとってくる際のセレクタ。 とってっきた値はgeocodeの引数として使う
  //         let eventnameSelector=`.ghost-data > :nth-child(${i+1}) > .event-name`;//すぐ下で使う djangoから渡されたeventsの中のi+1番目のeventの名前を取る際のセレクタ. とってきた値はmarkerDataの要素として入れる。
  //         let eventName=document.querySelector(eventnameSelector).textContent;
  //         let eventAddress=document.querySelector(addressSelector).textContent;

  //         console.log(eventAddress);

  //         //ここからeventの住所から緯度経度取得開始。
  //         geocoder = new google.maps.Geocoder(); //インスタンス生成
  //         geocoder.geocode({
  //         'address': eventAddress
  //         },
  //         function(results, status) { // 結果
  //           if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
  //             console.group('Success');
  //             console.log(results);
  //             console.log(status);
  //           } else { // 失敗した場合
  //             console.group('Error');
  //             console.log(results);
  //             console.log(status);
  //           }
  //           //ここからmarkerDataにデータを入れていく。nameとlatとlngを入れた連想配列として入れていく。
  //           let location=results[0].geometry.location;
  //           let locationLat=location.lat();
  //           let locationLng=location.lng();
  //           console.log("locationLat");

  //           console.log(locationLat);
  //           console.log(markerData);


  //           console.log(locationLng)
  //           markerData[i]={'name':eventName,'lat':locationLat,'lng':locationLng};//results[0]の中に入ってるデータを取り出して入れた。
  //           console.log(markerData[i]);
  //           console.log(markerData);

  //      });
  //     }
  //     // for文終わり

  //     console.log(markerData.length)
  //     // マーカーの設定 実際は,django側でレコード数とってきてその分だけマーカーを使う。レコードの数の長さの連想配列によって構成される配列を作る
  //     for (var s = 0; s < markerData.length; s++) {
  //       // let markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // マーカーの緯度経度のデータ入力
  //       console.log(markerData.length);

  //       let markerLatLng ={ lat: markerData[s]['lat'], lng:markerData[s]['lng'] };
  //       marker[s] = new google.maps.Marker({ // マーカーの追加
  //         draggable: false, 
  //         position: markerLatLng, // マーカーを立てる位置を指定
  //         map: map, // マーカーを立てる地図を指定
  //       });

  //       infoWindow[s] = new google.maps.InfoWindow({ // 吹き出しの追加
  //         content: '<div class="museum-event-name">' + markerData[s]['name'] + '</div>' 
  //         //この吹き出しにスタイルを加えるのであれば cssで適宜編集してください。
  //       });
  //       markerEventFunction(s); // マーカーにクリックイベントを追加
  //       marker[s].setMap(map);
  //  }
}

// mapのピンがクリックされた時に呼び出す関数 適宜内容を変えてください

function markerEventFunction(i) {
  marker[i].addListener('click', function () { // マーカーをクリックしたとき
    infoWindow[i].open(map, marker[i]); // 吹き出しの表示

    //   これはデフォで入れてみました、ピンがぴょんぴょん跳ねるヨ！！
    if (marker[i].getAnimation() !== null) {
      marker[i].setAnimation(null);
    } else {
      marker[i].setAnimation(google.maps.Animation.BOUNCE);
    }
  });
}



async function mapGenerate() {
  // 地図を作成
  map = new google.maps.Map(document.getElementById("map"), {
    center: kyoto, //京都市の市役所を中心で良い？ 作ってみて後で変える
    zoom: 11, //デフォルトのmapの表示範囲
  });

  // googlemapAPIのgeocoderを使って緯度経度を住所から特定 for文で回す。
  for (var i = 0; i < elementsCount; i++) {     //djangoで引き渡されたデータの数だけfor回す
    console.log(elementsCount)
    let addressSelector = `.ghost-data > :nth-child(${i + 1}) > .address`; //djangoから渡されたeventsの中からi+1番目のeventの住所をとってくる際のセレクタ。 とってっきた値はgeocodeの引数として使う
    let eventnameSelector = `.ghost-data > :nth-child(${i + 1}) > .event-name`;//すぐ下で使う djangoから渡されたeventsの中のi+1番目のeventの名前を取る際のセレクタ. とってきた値はmarkerDataの要素として入れる。
    let eventName = document.querySelector(eventnameSelector).textContent;
    let eventAddress = document.querySelector(addressSelector).textContent;

    console.log(eventAddress);

    //ここからeventの住所から緯度経度取得開始。
    geocoder = new google.maps.Geocoder(); //インスタンス生成
    await geocoder.geocode({
      'address': eventAddress
    },
      function (results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
          console.group('Success');
          console.log(results);
          console.log(status);
        } else { // 失敗した場合
          console.group('Error');
          console.log(results);
          console.log(status);
        }
        //ここからmarkerDataにデータを入れていく。nameとlatとlngを入れた連想配列として入れていく。
        let location = results[0].geometry.location;
        let locationLat = location.lat();
        let locationLng = location.lng();
        console.log("locationLat");

        console.log(locationLat);
        console.log(markerData);


        console.log(locationLng)
        markerData[i] = { 'name': eventName, 'lat': locationLat, 'lng': locationLng };//results[0]の中に入ってるデータを取り出して入れた。
        console.log(markerData[i]);
        console.log(markerData);

      });
  }
  //for文終わり
}


function markerGenerate() {
  // マーカーの設定 実際は,django側でレコード数とってきてその分だけマーカーを使う。レコードの数の長さの連想配列によって構成される配列を作る
  console.log(markerData.length);
  for (var s = 0; s < markerData.length; s++) {
    // let markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // マーカーの緯度経度のデータ入力

    let markerLatLng = { lat: markerData[s]['lat'], lng: markerData[s]['lng'] };
    marker[s] = new google.maps.Marker({ // マーカーの追加
      draggable: false,
      position: markerLatLng, // マーカーを立てる位置を指定
      map: map, // マーカーを立てる地図を指定
    });

    infoWindow[s] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: '<div class="museum-event-name">' + markerData[s]['name'] + '</div>'
      //この吹き出しにスタイルを加えるのであれば cssで適宜編集してください。
    });
    markerEventFunction(s); // マーカーにクリックイベントを追加
    marker[s].setMap(map);
  }
}

//谷野さんが新しく書くコードはこれより下にお願いします。
//おそらくInfoWindow(マップのピン押したら出てくるやつ)もcssやjsでいじれると思うので,以下に追記してください。

const elms = document.querySelectorAll(".event-data");

elms.forEach((elm) => {

  //イベントがクリックされたら、そのイベントのindexを取得する

  elm.addEventListener("click", () => {
    let index = [].slice.call(elms).indexOf(elm);
    console.log(index);

    //クリックされたイベントの詳細を出す関数

    const changeDisplay = function () {

      //詳細が現時点で表示されているか、address（所在地）をトリガーにして判断

      const eventPlace = document.getElementsByClassName('address_text')[index];

      const decision = document.defaultView.getComputedStyle(eventPlace, null).display;

//あとでもう少しきれいにしておきます
      if (decision === 'none') {
        //詳細表示
        document.getElementsByClassName("address_text")[index].style.display = "";
        document.getElementsByClassName("address")[index].style.display = "";
        document.getElementsByClassName("event-hp_text")[index].style.display = "";
        document.getElementsByClassName("event-hp")[index].style.display = "";
        document.getElementsByClassName("event-rate_text")[index].style.display = "";
        document.getElementsByClassName("event-rate")[index].style.display = "";
        document.getElementsByClassName("goReview")[index].style.display = "";


      } else {
        //詳細非表示
        document.getElementsByClassName("address_text")[index].style.display = "none";
        document.getElementsByClassName("address")[index].style.display = "none";
        document.getElementsByClassName("event-hp_text")[index].style.display = "none";
        document.getElementsByClassName("event-hp")[index].style.display = "none";
        document.getElementsByClassName("event-rate_text")[index].style.display = "none";
        document.getElementsByClassName("event-rate")[index].style.display = "none";
        document.getElementsByClassName("goReview")[index].style.display = "none";


      };

    }();

    //クリックされたイベントの詳細を出す関数終わり
  });


});
