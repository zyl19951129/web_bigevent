$(function(){
    $.ajaxPrefilter(function(options){
        var Regexp = /^\/my\//;
        if(Regexp.test(options.url)) {
            options.headers = {
                Authorization: localStorage.getItem('token') || '',
            }
        };
        options.url= 'http://ajax.frontend.itheima.net' + options.url;
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token');
                // 2. 强制跳转到登录页面
                location.href = '/login.html';
            }
        }
    })
})