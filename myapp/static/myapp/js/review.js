window.onload = function (){
  rateToStar();
}


//5段階評価を★にする
const rateToStar = function() {
  let rateNumber = document.getElementsByClassName("review-rate");
  for (i = 0; i < rateNumber.length; i++) {
  let rateNumberElement = rateNumber[i].innerHTML;

//   console.log(rateNumberElement);

  if(rateNumberElement == 1) {
    rateNumber[i].innerHTML= "<p>★☆☆☆☆</p>"
  } else if(rateNumberElement == 2) {
    rateNumber[i].innerHTML= "<p>★★☆☆☆</p>"
  } else if(rateNumberElement == 3) {
　　rateNumber[i].innerHTML= "<p>★★★☆☆</p>"
  } else if(rateNumberElement == 4) {
    rateNumber[i].innerHTML= "<p>★★★★☆</p>"
  } else{
    rateNumber[i].innerHTML= "<p>★★★★★</p>"
  }
  };


};

//タッチされたレビューを拡張する

const elms = document.querySelectorAll(".review-data");

elms.forEach((elm) =>{

  elm.addEventListener("click", () => {

    let index = [].slice.call(elms).indexOf(elm);
    // console.log(index);
    
    let reviewHeight = document.getElementsByClassName("review-data")[index].clientHeight;
    // console.log(reviewHeight);

    if (reviewHeight < 70){
        document.getElementsByClassName("review-data")[index].style.height= 'auto';
    } else{
        document.getElementsByClassName("review-data")[index].style.height= '67px';
    }

  })

});



//★で評価を入力

const stars = document.querySelectorAll(".star");

stars.forEach((elm) =>{

//☆をクリック
  elm.addEventListener("click", () => {

//まず全て☆にする
    for(let x = 0; x < 5; x++){
      stars[x].innerHTML = "<span>☆</span>"
      }

//選択された☆のインデックス番号を取得
    let starIndex = [].slice.call(stars).indexOf(elm);
    console.log(starIndex);
    
//選択された☆に対応するラジオボタンにチェックを入れる
    let radio = document.getElementsByName("rate");
    radio[starIndex].checked = true;    

//最初の☆から選択された☆までを★にする
    for(let x = 0; x < starIndex + 1; x++){
    stars[x].innerHTML = "<span>★</span>"
    }

  })

});





