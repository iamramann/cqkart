$(document).ready(function (e) {
  const form = $("#forget"),
    mySpinner = $("#mySpinner"),
    email = $("#email"),
    msg = $("#msg");

  mySpinner.hide();
  $("#submit").click(function (e) {
    e.preventDefault();
    const data = form.serialize(),
      type = form.attr("method"),
      url = form.attr("action");
    if (email.val() !== "") {
      $.ajax({
        type,
        url,
        data,
        beforeSend: function () {
          $("#submit").hide();
          mySpinner.show();
        },
      })
        .done((data) => {
          const validMsg = `An email containing password reset link has been sent to ${data.email}. Please check your email to complete the process 🎉`;
          const notValidMsg = `${data.email}   is not registered with us. Please try again with a registered email address. `;
          // console.log(data.flag);
          if (data?.flag === true) {
            if (msg.hasClass("text-danger")) {
              msg.text(validMsg).removeClass("text-danger");
            }
            msg.text(validMsg).addClass("text-success");
          } else {
            if (msg.hasClass("text-success")) {
              msg.text(validMsg).removeClass("text-success");
            }
            msg.text(notValidMsg).addClass("text-danger");
          }
        })
        .fail((xhr, statusText) => {
          alert("something went wrong");
          console.log(statusText);
        })
        .always(function () {
          form.trigger("reset");
          $("#submit").show();
          mySpinner.hide();
        });
    } else {
      $("#email").focus();
    }
  });
});
