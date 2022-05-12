layui.config({
    base: `${SYS_CFG.ctxPath}/assets/js/`
}).extend({});

layui.use(['form', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;

    $("#account").focus().val(getCookie("account"));
    $("#password").val(getCookie("password"));
    $('#rememberMeCheckBox').prop('checked', getCookie("rememberMeCheckBox"));
    form.render();

    $(".input-item>label").on("click", function () {
        $('#rememberMeCheckBox').prop('checked', !$('#rememberMeCheckBox').prop('checked'));
        form.render();
    });

    //账号登录和手机登录切换
    $(".header-title>span").on("click", function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".switch-item").eq(index).addClass("active").siblings().removeClass("active");
    })

    //登录按钮
    form.on("submit(login)", function (data) {

        if (!data.field.password) {
            layer.msg("密码不能为空", {
                time: 2000
            });
            return false;
        }
        var $this = $(this);
        $this.text('登录中...').attr("disabled", "disabled").addClass("layui-disabled");
        if ($("#rememberMeCheckBox").prop("checked")) {
            setCookie("account", $("#account").val());
            setCookie("password", $("#password").val());
            setCookie("rememberMeCheckBox", $("#rememberMeCheckBox").prop("checked"));
        } else {
            setCookie("account", "", -1);
            setCookie("password", "", -1);
            setCookie("rememberMeCheckBox", false, -1);
        }

        $.post(`${SYS_CFG.ctxPath}/login`, data.field, function (res) {
            if (res.code === 1) {
                window.location.href = `${SYS_CFG.ctxPath}/index`;
                $this.text('登录').removeAttr("disabled").removeClass("layui-disabled");
            } else {
                layer.msg(res.message, {
                    time: 2000
                });
                $this.text('登录').removeAttr("disabled").removeClass("layui-disabled");
            }
        });
        return false;
    })
    //登录回车事件
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login-item-btn").click()
        }
    });

    //表单输入效果
    $(".loginBody .input-item").click(function (e) {
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function () {
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function () {
        $(this).parent().removeClass("layui-input-focus");
        if ($(this).val() != '') {
            $(this).parent().addClass("layui-input-active");
        } else {
            $(this).parent().removeClass("layui-input-active");
        }
    })
})

//设置cookie
function setCookie(name, value, days) {
    if (!days) {
        days = 30;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
}

//获取cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return null;
}