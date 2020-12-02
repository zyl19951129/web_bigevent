$(function(){
    var layer = layui.layer;
    //获取用户输入的信息并验证
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if($('[name=oldPwd]').val() === value) {
                return '原密码和新密码一样';
            }
        },
        rePwd: function(value) {
            if($('[name=newPwd]').val() !== value) {
                return '两次密码不一致';
            }
        }
    })
    // 监听修改密码提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //根据数据发起请求
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('修改密码失败');
                }
                layer.msg('修改密码成功');
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})