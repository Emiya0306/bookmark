$(document).ready(function () {
  $("#registFrom").validate({
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
      username: {
        required: true
      },
      email: {
        remote: "/user/check",
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirm: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      }
    },
    messages: {
      username: {
        required: "Please enter your name."
      },
      email: {
        remote: "The email has been registed.",
        required: "Please enter your email.",
        email: "Your email is invalid."
      },
      password: {
        required: "Please enter your password.",
        minlength: "Password must be 6 words."
      },
      confirm: {
        required: "Please enter your password.",
        minlength: "Password must be 6 words.",
        equalTo: "Password is not match."
      }
    }
  });
  $("#drag-and-drop-zone").dmUploader({
    maxFiles: 1,
    onNewFile: function(id, file){

      /*** Begins Image preview loader ***/
      if (typeof FileReader !== "undefined"){

        var reader = new FileReader();

        var img = $('#demo-files').find("img");

        reader.onload = function (e) {
          img.attr('src', e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        // Hide/Remove all Images if FileReader isn't supported
        $('#demo-files').find('.demo-image-preview').remove();
      }

    }
  });
});
