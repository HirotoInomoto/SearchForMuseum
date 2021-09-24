from django.http.request import RawPostDataException
from django.shortcuts import render, redirect
from datetime import datetime, timedelta
from . import gitignore
from .models import MuseumEvent, Review
from .forms import ReviewForm

# topページアクセス時の処理


def top_view(request):
    params = {}
    return render(request, "myapp/top.html", params)


# mapページアクセス時の処理
def map_view(request):
    #  イベントはeventsとかで渡す。
    today = datetime.today().date()
    today_strf = today.strftime("%Y/%m/%d")
    print(today)
    print(today_strf)
    temporary_today_events = MuseumEvent.objects.filter(
        start_event_date__lte=today, end_event_date__gte=today
    )

    today_events = temporary_today_events.exclude(
        event_date_exception__contains=today_strf
    )
    print(today_events)

    params = {
        # + "&callback=initMap"
        "api_url": "https://maps.googleapis.com/maps/api/js?key=" + gitignore.api_key,
        "events": today_events,
    }
    return render(request, "myapp/map.html", params)


# calendarページアクセス時の処理
def calendar_view(request):
    date_list = []
    event_date_strf = []
    events = MuseumEvent.objects.all()

    for item in events:
        start_date = item.start_event_date  # 各イベントの開始日
        end_date = item.end_event_date  # 各イベントの終了日

        # レコードからevent_date_execption(カンマで区切られた文字列)取ってきて配列にする。
        if item.event_date_exception:
            event_date_exception_list_date = []
            event_date_exception_raw = item.event_date_exception
            event_exception_list_str = str(event_date_exception_raw).split(",")

            # ここからevent_exception_strをdatetimeオブジェクトにして
            for thing in event_exception_list_str:
                # datetimeオブジェクトに変換
                event_exception_date = datetime.strptime(thing, "%Y/%m/%d").date()
                # datetimeオブジェクトをリストに追加
                event_date_exception_list_date.append(event_exception_date)

        event_range = (
            end_date - start_date
        )  # 各イベントの開催期間（日数）　　datetimeの型で出てるので変換必須。ただし差分なので8/1と8/3なら2と出る。
        event_range_int = event_range.days  # 下のrangeで変換するために日数を数値に変換

        event_range_days = [
            start_date + timedelta(days=i)
            for i in range(
                event_range_int + 1
            )  # 差分のevent_range_intに対して1を足して開催日数を出している。
        ]

        # exceptionをリストに格納して一個ずつ取り出して、event_range_daysにあるか照合してもし一致すれば、削除、一致しなければ何もしない。]
        if item.event_date_exception:
            for t in event_date_exception_list_date:
                if t in event_range_days:
                    event_range_days.remove(t)

        # 日付被りをなくす。リストに同じ日付はひとつという処理を書いてる　ただし順番は
        for stuff in event_range_days:
            if stuff not in date_list:
                date_list.append(stuff)

    for item in date_list:
        event_date_strf.append(
            item.strftime("%Y/%m/%d")
        )  # date_listの中身を文字列化して新しいリストの中に格納

        event_date_strf.sort()  # 日付を降順に
    print(event_date_strf)

    params = {
        "event_date": event_date_strf,
    }
    return render(request, "myapp/calendar.html", params)


# reviewページアクセス時の処理
def review_view(request, event_name, choice):
    the_event = MuseumEvent.objects.get(title=event_name)
    reviews = Review.objects.filter(event=the_event)
    form = ReviewForm()

    params = {
        "reviews": reviews,
        "form": form,
        "event_name": event_name,
    }
    # クエリーセットの並び替え
    if choice == "b":
        params["reviews"] = reviews.order_by("date").reverse()
    else:
        if choice == "c":
            params["reviews"] = reviews.order_by("rate")

        else:
            if choice == "d":
                params["reviews"] = reviews.order_by("rate").reverse()
    # 並び替え終わり

    if request.method == "POST":
        form = ReviewForm(request.POST)
        content = request.POST["content"]
        rate = request.POST["rate"]
        if form.is_valid():
            print("有効")
            Review(event=the_event, content=content, rate=rate).save()
            params["reviews"] = Review.objects.filter(event=the_event)
            return redirect("review", event_name=event_name, choice="a")
        else:
            print(form.errors)
            print("不正な値")
            params["form"] = form  # これ入れてないせいでエラーメッセージ表示されてなかった。
            return render(request, "myapp/review.html", params)
    return render(request, "myapp/review.html", params)


# eventページアクセス時の処理
def event_view(request, year, month, day):
    the_day = datetime(year, month, day).date()
    print(the_day)
    date_strf = the_day.strftime("%Y年%m月%d日")
    the_day_strf = the_day.strftime("%Y/%m/%d")
    print(the_day_strf)
    the_day_events = MuseumEvent.objects.filter(
        start_event_date__lte=the_day, end_event_date__gte=the_day
    )
    the_day_events_detail = the_day_events.exclude(
        event_date_exception__contains=the_day_strf
    )

    real_data = the_day_events_detail.order_by("rate_average").reverse()

    print(the_day_events_detail)
    params = {
        "events": real_data,
        "date": date_strf,
    }
    return render(request, "myapp/event.html", params)


# 本当は自動化したいが、localでは実装不可能なので実験的にスクレイピングの関数を設置(scraping.htmlにアクセスで呼び出し)
# 内容自体はスクレイピングとその後のレコード追加のみで、htmlのレンダリングはurlをキーにしてこの関数を呼び出すための便宜的な書き方。
# 従ってscraping.htmlの中身はほとんど空だし、cssやjsは存在しない。
def scraping(request):
    all_events = MuseumEvent.objects.all()
    for event in all_events:
        event_review = Review.objects.filter(event=event)
        print(event_review)
        review_sum = 0
        review_average_raw = 0
        review_average = 0
        if event_review.count() != 0:
            for review in event_review:
                print(review.rate)
                review_sum = review_sum + review.rate
        if event_review.count() != 0:
            review_average_raw = review_sum / event_review.count()
            review_average = round(review_average_raw, 1)
        print(review_average_raw)
        print(review_average)
        event.rate_average = review_average
        event.save()

    return render(request, "myapp/scraping.html")
