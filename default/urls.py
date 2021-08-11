from django.urls import path, re_path
from django.contrib.auth import views as auther
from default import views


urlpatterns = [
    path('', views.landing, name='landing'),
    path('register', views.register_hacker, name='hacker'),
    path('login', views.login_page, name='login'),
    path('logout/', views.logout_user, name='logout'),

    path('reset-password',
         auther.PasswordResetView.as_view(template_name="defaults/password_reset.html"), name="reset_password"),
    path('reset-password-sent',
         auther.PasswordResetDoneView.as_view(template_name="defaults/password_reset_sent.html"), name='password_reset_done'),
    path('reset/<uidb64>/<token>', auther.PasswordResetConfirmView.as_view(template_name="defaults/password_reset_form.html"),
         name='password_reset_confirm'),
    path('reset-password-success', auther.PasswordResetCompleteView.as_view(template_name="defaults/password_reset_success.html"),
         name='password_reset_complete'),
]