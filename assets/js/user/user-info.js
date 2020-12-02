$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    //获取用户的信息并渲染页面
    getContent();
    // 重置表单的数据
    $('.layui-btn').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        getContent();
    })
    //监听提交按钮提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        //获取表单里的数据
        var text = $('.layui-form').serialize();
        //向服务器提交数据并渲染页面
        postContent(text);
    })
})


//获取用户的信息
function getContent() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            //渲染页面
            layui.form.val('formUserInfo', res.data);
        }
    })
}
//发起post请求
function postContent(text) {
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: text,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getInformation()
        }
    })
}