$(function(){
    var layer = layui.layer;
    //页面加载后获取数据并渲染页面（函数调用）
    getList();
    //添加按钮点击事件
    $('#btnAddCate').on('click',function(){
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    })
    //监听确认提交事件
    $('body').on('submit','.layui-form',function(e){
        e.preventDefault();
        //获取用户信息，发起请求，渲染页面
        var data = $('#form-add').serialize();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: data,
            success: function(res){
                if(res.status !==0) {
                    return layer.msg('添加数据失败');
                }
                getList();
                layer.msg('新增分类成功！')
                layer.closeAll('page');
            }
        })
    })
    // 添加修改按钮点击事件
    $('body').on('click','.btn-edit',function(){
        //获取该条信息的id数值
        var id = $(this).attr('data-id');
        //根据获取的id值发起请求，获取数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res){
                if(res.status !== 0 ) {
                    return layer.msg('获取数据失败');
                }
                //展示弹出层
                index = layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '添加文章分类',
                    content: $('#dialog-edit').html(),
                })
                //根据获取的数据渲染页面
                layui.form.val('formEdit',res.data);
            }
        })
    })
    //监听确认修改提交事件
    $('body').on('submit','#form-edit',function(){
        //获取用户修改的信息
        var text = $(this).serialize();
        //发起ajax请求，并将修改后的数据渲染到页面
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data:text,
            success: function(res){
                if(res.status !== 0) {
                    return  layer.msg('修改分类失败');
                }
                layer.msg('修改分类成功');
                //关闭弹出层
                layer.closeAll('page');
                //将数据渲染到页面
                getList();
            }
        })
    })
    //添加删除按钮点击事件
    $('body').on('click','.btn-delete',function(){
        //获取当前分类的id
        var id = $(this).attr('data-id');
        //弹出提示框
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //发起ajax请求，删除当前分类
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    console.log(res);
                    if(res.status !== 0) {
                        return layer.msg('删除分类失败');
                    }
                    layer.msg('删除分类成功');
                    //关闭弹出层
                    layer.closeAll('page');
                    //将数据渲染到页面
                    getList();
                }
            })
            layer.close(index);
        })
    })
    //获取数据和渲染页面函数
    function getList(){
        $.ajax({
            method:'GET',
            url: '/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                //渲染页面
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr);
            }
        })
    }
})