$(function(){
    $('#link-lg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-reg').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=repassword]').val();
            if(value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    })
    // 监听注册提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        };
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0) {
                layer.msg(res.message);
            }
            layer.msg('注册成功');
            //模拟点击事件
            $('#link_login').click();
        })
    })
    //监听登录提交事件
    $('#form-lg').on('submit',function(e){
        e.preventDefault();
        var data = {
            username: $('#form-lg [name=username]').val(),
            password: $('#form-lg [name=password]').val(),
        };
        $.post('/api/login',data,function(res){
            if(res.status !== 0) {
                layer.msg(res.message);
            }
            layer.msg('登录成功');
            localStorage.setItem('token',res.token);
            window.location = 'index.html';
        })
    })
})