$(function () {
    //获取用户信息及渲染页面
    getInformation();
    //添加退出按钮点击事件函数
    leaveClick();
})
//获取用户登录信息
function getInformation() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取文本内容
    var text = user.nickname || user.username;
    $('#welcome').html(text);
    //将首字符串转化为大写
    var first = text[0].toUpperCase();
    //渲染图片
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}
//添加退出按钮点击事件
function leaveClick() {
    var layer = layui.layer;
    $('#tuichu').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //删除token的值
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            // window.location = 'login.html';
            // 关闭 confirm 询问框
            layer.close(index);
        })
    })
}