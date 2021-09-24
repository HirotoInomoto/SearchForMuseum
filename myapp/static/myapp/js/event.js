window.onload  = function() {

if (document.getElementById("one") === null) {
  document.getElementsByClassName("events-data")[0].innerHTML = "<p class='no-event'>開催のイベントはありません</p>"
};

};

//イベントがクリックされたらその詳細を開閉する関数開始

const elms = document.querySelectorAll(".event-data");
elms.forEach((elm) => {

  //イベントがクリックされたら、そのイベントのindexを取得する

  elm.addEventListener("click", () => {

    let index = [].slice.call(elms).indexOf(elm);
    console.log(index);
    

    //クリックされたイベントの詳細を出す関数

    const changeDisplay = (function () {

      //詳細が現時点で表示されているか、address（所在地）をトリガーにして判断

      const eventPlace = document.getElementsByClassName('address_text')[index];

      const decision = document.defaultView.getComputedStyle(eventPlace, null).display;


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

    }());

    //クリックされたイベントの詳細を出す関数終わり

  });


});


// //イベントをタッチしている時間を計算する
// let count = 0;
// let timer;
// const ua = navigator.userAgent.toLowerCase();
// const isSP = /iphone|ipod|ipad|android/.test(ua);
// // let b = document.getElementsByClassName("event-data")[index];
// const eventStart = isSP ? 'touchstart' : 'mousedown';
// const eventEnd   = isSP ? 'touchend' : 'mouseup';
// const eventLeave = isSP ? 'touchmove' : 'mouseleave';
 
// b.addEventListener(eventStart, e => {
//   e.preventDefault();
//   b.classList.add('active');
//   timer = setInterval(() => {
//     count++;
//     // console.log((count / 100) + '秒');
//   }, 10);
// })

// b.addEventListener(eventEnd, e => {
//   e.preventDefault();
//   if (count) {
//     b.classList.remove('active');
//     clearInterval(timer);
//     console.log((count / 100) + '秒長押しされました');
//     count = 0;
//   }
// });

// b.addEventListener(eventLeave, e => {
//   e.preventDefault();
//   let el;
//   el = isSP ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) : b;
//   if (!isSP || el !== b) {
//     b.classList.remove('active');
//     clearInterval(timer);
//     console.log('処理を中断');
//     count = 0;
//   }
// });


