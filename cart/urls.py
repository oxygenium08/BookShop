from django.urls import path
from .views import CartView

urlpatterns = [
    path('api/', CartView.as_view(), name='cart'),
    path('api/<int:item_id>/', CartView.as_view(), name='cart_item'),
]
