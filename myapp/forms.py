from django import forms


class ReviewForm(forms.Form):
    data = [
        (1, "1番目"),
        (2, "2番目"),
        (3, "3番目"),
        (4, "4番目"),
        (5, "5番目"),
    ]
    content = forms.CharField(
        label="Review",
        max_length=150,
        required=True,
        widget=forms.Textarea(
            attrs={"class": "review-content", "placeholder": "150字以内で入力してください。"}
        ),
    )
    rate = forms.ChoiceField(
        choices=data,
        required=True,
        widget=forms.RadioSelect(attrs={"class": "event-rate"}),
    )
