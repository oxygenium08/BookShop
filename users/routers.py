from django.urls import path
from .viewsets import RegisterUserView, LoginAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('token/', LoginAPIView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



# {
#     "username": "yulya",
#     "email": "yulya@ma.ru",
#     "password": "yulya@ma"
# }