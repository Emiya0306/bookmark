$(document).ready(function () {
  $("#newBookmark").validate({
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
      title: {
        required: true,
        minlength: 2
      },
      link: {
        required: true,
        url: true
      }
    },
    messages: {
      title: {
        required: "Please enter your bookmark title.",
        minlength: "Password must be 2 words."
      },
      link: {
        required: "Please enter your link.",
        url: 'The link is invalid.You need to enter the link just like "http://", "https://".'
      }
    }
  });
})
