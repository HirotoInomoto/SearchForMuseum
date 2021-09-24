const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
var btn_count = 0;
const eventDateAll = [];
//ghost-dataからデータ取得
const ghostDataContent = document.querySelectorAll("li")
// console.log(ghostDataContent);
for (item of ghostDataContent) {
    eventDateAll.push(item.textContent);
};
console.log(eventDateAll);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};
// 前の月表示
function prev() {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
    btn_count = btn_count - 1;
    // console.log(btn_count);

    if (btn_count < -3) {
        showDate.setMonth(showDate.getMonth() + 1);
        showProcess(showDate);
        btn_count = btn_count + 1;
    }
}

// 次の月表示
function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
    btn_count = btn_count + 1;
    // console.log(btn_count);

    if (btn_count > 3) {
        showDate.setMonth(showDate.getMonth() - 1);
        showProcess(showDate);
        btn_count = btn_count - 1;
    }
}


// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    let dateDetail = null;

    var calendar = createProcess(year, month);


    document.querySelector('#calendar').innerHTML = calendar;

    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    let list = document.querySelectorAll("td:not(.disabled) .data-number");
    for (item of list) {
        // console.log(item.textContent);
        let date = item.textContent;
        //djangoの出力形式に合わせる
        if (date.length === 1
            && month <= 8) {
            dateDetail = `${year}/0${month + 1}/0${date}`
        }
        else if (date.length === 1
            && month >= 8) {
            dateDetail = `${year}/${month + 1}/0${date}`

        } else if (date.length === 2
            && month <= 8) {
            dateDetail = `${year}/0${month + 1}/${date}`

        }
        else {
            dateDetail = `${year}/${month + 1}/${date}`
        }

        console.log(dateDetail);

        // console.log(item.parentNode);

        if (eventDateAll.includes(dateDetail)) {
            let td = item.parentNode;
            td.style.backgroundColor = "#23a76f";

        }

    }







}





// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);


    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + "<p class='data-number'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</p>" + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + "<p class='data-number'>" + (count - endDate) + "</p>" + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if (year == today.getFullYear()//今日
                    && month == (today.getMonth())
                    && count == today.getDate()) {
                    calendar += "<td class='today'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";
                }
//祝日対応。　後で見やすくします。

                else if (month == 0 //元日
                    && count == 1) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 0 //成人の日
                    && count == 16 - startDayOfWeek) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";
                } else if (month == 1 //建国記念日
                    && count == 11) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 1 //天皇誕生日
                    && count == 23) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 2 //春分の日 公転の誤差で確定できない　国立天文台発表の資料もとに2050年までの日付はおおよそ確定できているため、後に手打ちでする
                    && count == 21) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 3 //昭和の日
                    && count == 29) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 4 //憲法記念日
                    && count == 3) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 4 //みどりの日
                    && count == 4) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 4 //こどもの日
                    && count == 5) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 6 //海の日
                    && count == 23 - startDayOfWeek) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";
                } else if (month == 7 //山の日
                    && count == 11) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 8 //敬老の日
                    && count == 23 - startDayOfWeek) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";
                } else if (month == 8 //秋分の日 公転の誤差で確定できないか
                    && count == 23) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 9 //スポーツの日
                    && count == 16 - startDayOfWeek) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";
                } else if (month == 10 //文化の日
                    && count == 3) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else if (month == 10 //勤労感謝の日
                    && count == 23) {
                    calendar += "<td class='holiday'>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">仮</a>` + "</td>";

                } else {
                    calendar += "<td>" + "<p class='data-number'>" + count + "</p>" + `<a class='date-link' href="event/${year}/${month + 1}/${count}">あ</a>` + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}