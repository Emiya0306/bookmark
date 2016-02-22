$(document).ready(function () {
  $("#loginFrom").validate({
    errorPlacement: function (error, element) {
      if ($(error).html()) {
        $(error).addClass("red");
        $(element)
          .parent()
          .removeClass("has-success")
          .addClass("has-error")
          .addClass("animated shake")
          .end()
          .siblings('.form-control-feedback').remove()
          .end()
          .after('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
      } else {
        $(element).siblings('.error').remove();
      }
      $(element).parent().parent().append($(error));
    },
    errorElement: "span",
    success: function (element) {
      if ($(element).is('.error')) {
        $(element)
          .siblings('.input-group')
          .removeClass("has-error")
          .removeClass("animated shake")
          .addClass("has-success")
          .children(".form-control-feedback")
          .remove();
        $(element)
          .siblings('.input-group')
          .append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
          .end()
          .remove();
      }
    },
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        required: "Please enter your email.",
        email: "Your email is invalid."
      },
      password: {
        required: "Please enter your password.",
        minlength: "Password must be 6 words."
      }
    }
  });
})
